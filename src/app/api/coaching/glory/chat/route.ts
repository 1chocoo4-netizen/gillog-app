import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { buildGlorySystemPrompt, parseGloryResponse } from '@/lib/coaching/glory-prompt'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

// ========================================
// POST /api/coaching/glory/chat
// THE GLORY 코칭 대화 메시지 전송
// ========================================

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { sessionId, message } = await request.json() as {
      sessionId: string
      message: string
    }

    if (!sessionId || !message?.trim()) {
      return NextResponse.json({ error: 'sessionId and message required' }, { status: 400 })
    }

    // 1. 세션 확인
    const glorySession = await prisma.glorySession.findFirst({
      where: { id: sessionId, userId: session.user.id },
    })

    if (!glorySession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (glorySession.status === 'completed') {
      return NextResponse.json({ error: 'Session already completed' }, { status: 400 })
    }

    // 2. 사용자 메시지 저장
    await prisma.gloryMessage.create({
      data: {
        sessionId,
        role: 'user',
        content: message.trim(),
        stage: glorySession.currentStage,
      },
    })

    // 3. 전체 대화 히스토리 조회
    const allMessages = await prisma.gloryMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    })

    // 4. Gemini 호출용 히스토리 구성
    const geminiContents: { role: string; parts: { text: string }[] }[] = []
    for (const msg of allMessages) {
      const role = msg.role === 'user' ? 'user' : 'model'
      // 첫 코치 메시지는 model로, Gemini에 대화 맥락으로 전달
      geminiContents.push({ role, parts: [{ text: msg.content }] })
    }

    // user/model이 연속되지 않도록 보정
    const fixedContents: typeof geminiContents = []
    let lastRole = ''
    for (const c of geminiContents) {
      if (c.role === lastRole && fixedContents.length > 0) {
        fixedContents[fixedContents.length - 1].parts[0].text += '\n' + c.parts[0].text
      } else {
        fixedContents.push(c)
        lastRole = c.role
      }
    }

    // 마지막이 user여야 함
    if (fixedContents.length === 0 || fixedContents[fixedContents.length - 1].role !== 'user') {
      return NextResponse.json({ error: 'Invalid message sequence' }, { status: 400 })
    }

    // 5. Gemini API 호출
    const currentStage = glorySession.currentStage as Parameters<typeof buildGlorySystemPrompt>[0]
    const systemPrompt = buildGlorySystemPrompt(currentStage)

    let aiResponse = {
      message: '잠시 후 다시 이야기해 주시겠어요? 제가 잠깐 생각을 정리할게요.',
      stage: currentStage,
      isComplete: false,
      summary: null as ReturnType<typeof parseGloryResponse>['summary'],
      encouragement: null as string | null,
      quote: null as string | null,
      quoteAuthor: null as string | null,
    }

    let retryCount = 0
    const maxRetries = 1

    while (retryCount <= maxRetries) {
      try {
        const response = await fetch(GEMINI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: fixedContents,
            generationConfig: { temperature: 0.85, maxOutputTokens: 1024 },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
          if (rawText) {
            aiResponse = parseGloryResponse(rawText, currentStage)
            break
          }
        }
        retryCount++
      } catch {
        retryCount++
      }
    }

    // 6. 세션 상태 업데이트
    const updateData: Record<string, unknown> = {
      currentStage: aiResponse.stage,
    }

    if (aiResponse.isComplete) {
      updateData.status = 'completed'
      updateData.completedAt = new Date()

      if (aiResponse.summary) {
        updateData.thankfulSummary = aiResponse.summary.thankful
        updateData.happySummary = aiResponse.summary.happy
        updateData.emotionalSummary = aiResponse.summary.emotional
        updateData.groundedSummary = aiResponse.summary.grounded
        updateData.luminousSummary = aiResponse.summary.luminous
        updateData.optionsSummary = aiResponse.summary.options
        updateData.realAction = aiResponse.summary.realAction
        updateData.whyMeaning = aiResponse.summary.meaning
      }
      if (aiResponse.encouragement) updateData.encouragement = aiResponse.encouragement
      if (aiResponse.quote) updateData.quote = aiResponse.quote
      if (aiResponse.quoteAuthor) updateData.quoteAuthor = aiResponse.quoteAuthor
    }

    await prisma.glorySession.update({
      where: { id: sessionId },
      data: updateData,
    })

    // 7. AI 메시지 저장
    await prisma.gloryMessage.create({
      data: {
        sessionId,
        role: 'coach',
        content: aiResponse.message,
        stage: aiResponse.stage,
        metadata: aiResponse.isComplete
          ? {
              isComplete: true,
              summary: aiResponse.summary,
              encouragement: aiResponse.encouragement,
              quote: aiResponse.quote,
              quoteAuthor: aiResponse.quoteAuthor,
            }
          : undefined,
      },
    })

    // 8. 응답 반환
    return NextResponse.json({
      message: aiResponse.message,
      stage: aiResponse.stage,
      isComplete: aiResponse.isComplete,
      summary: aiResponse.summary,
      encouragement: aiResponse.encouragement,
      quote: aiResponse.quote,
      quoteAuthor: aiResponse.quoteAuthor,
    })
  } catch (error) {
    console.error('POST /api/coaching/glory/chat error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
