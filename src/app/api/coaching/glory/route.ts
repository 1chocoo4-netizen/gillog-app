import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { buildGlorySystemPrompt, parseGloryResponse } from '@/lib/coaching/glory-prompt'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

// ========================================
// POST /api/coaching/glory
// 새 THE GLORY 코칭 세션 시작
// ========================================

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. 세션 생성
    const glorySession = await prisma.glorySession.create({
      data: {
        userId: session.user.id,
        status: 'in_progress',
        currentStage: 'GREETING',
      },
    })

    // 2. Gemini로 첫 인사 메시지 생성
    const systemPrompt = buildGlorySystemPrompt('GREETING')
    const greetingInstruction = '새로운 코칭 세션이 시작되었습니다. 따뜻하게 인사하고 오늘 하루에 대해 안부를 물어보세요. 반드시 JSON 형식으로 응답하세요.'

    let coachMessage = '안녕하세요 😊 오늘 하루는 어떠셨어요? 편하게 이야기해 주세요.'
    let stage = 'GREETING'

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ role: 'user', parts: [{ text: greetingInstruction }] }],
          generationConfig: { temperature: 0.85, maxOutputTokens: 512 },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
        if (rawText) {
          const parsed = parseGloryResponse(rawText, 'GREETING')
          coachMessage = parsed.message
          stage = parsed.stage
        }
      }
    } catch {
      // Gemini 실패 시 기본 인사 사용
    }

    // 3. 첫 메시지 저장
    await prisma.gloryMessage.create({
      data: {
        sessionId: glorySession.id,
        role: 'coach',
        content: coachMessage,
        stage,
      },
    })

    return NextResponse.json({
      sessionId: glorySession.id,
      message: coachMessage,
      stage,
    })
  } catch (error) {
    console.error('POST /api/coaching/glory error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// ========================================
// GET /api/coaching/glory
// 내 THE GLORY 코칭 세션 목록
// ========================================

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    // 특정 세션 조회
    if (sessionId) {
      const glorySession = await prisma.glorySession.findFirst({
        where: { id: sessionId, userId: session.user.id },
        include: {
          messages: { orderBy: { createdAt: 'asc' } },
        },
      })

      if (!glorySession) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 })
      }

      return NextResponse.json({ session: glorySession })
    }

    // 목록 조회 (완료된 세션만, 최근 20개)
    const sessions = await prisma.glorySession.findMany({
      where: { userId: session.user.id, status: 'completed' },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        _count: { select: { messages: true } },
      },
    })

    return NextResponse.json({
      sessions: sessions.map(s => ({
        id: s.id,
        status: s.status,
        currentStage: s.currentStage,
        createdAt: s.createdAt.toISOString(),
        completedAt: s.completedAt?.toISOString() || null,
        messageCount: s._count.messages,
      })),
    })
  } catch (error) {
    console.error('GET /api/coaching/glory error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
