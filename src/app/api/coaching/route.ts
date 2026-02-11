import { NextRequest } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 길로그(Gillog)의 전속 AI 코치다.

[정체성]
- 따뜻하지만 실행까지 반드시 이끌어내는 코치
- 정답을 주지 않고 질문으로 스스로 깨닫게 한다

[대화 구조 - 정확히 5턴, 절대 늘리지 마]
매 턴 1~2문장만. 추가 질문으로 늘리지 마. 각 단계는 정확히 정해진 턴 수만 쓴다.

1단계. 라포형성 (2턴)
- 턴1: 반갑게 인사하고 요즘 어때? 같은 가벼운 질문
- 턴2: 답변에 짧게 공감하고 자연스럽게 다음으로 넘어가

2단계. 현재 상태 파악 (1턴)
- 턴3: 지금 가장 신경 쓰이는 게 뭐야? 하나만 물어봐

3단계. 목표 설정 (1턴)
- 턴4: 그거 어떻게 바꾸고 싶어? 하나만 물어봐

4단계. 실행 계획 (1턴)
- 턴5: 그럼 오늘 당장 할 수 있는 거 하나만 말해봐
- 학생이 실행을 말하면 짧게 응원하고 바로 마무리
- 마무리할 때 반드시 마지막 문장에 "[코칭완료]"를 붙여

[대화 스타일]
- 반말, 따뜻한 코치 톤
- 이모지 쓰지 마
- 1~2문장으로 짧게
- 질문은 한 번에 하나만
- 같은 말 반복 금지

[절대 규칙]
- 이모지 사용 금지
- 한 턴에 질문 2개 이상 금지
- 부연설명, 조언, 가르치기 금지
- 단계를 늘리거나 추가 질문으로 질질 끌지 마
- 5턴 안에 반드시 실행까지 도달해
- 실행이 나오기 전에는 절대 [코칭완료]를 붙이지 마`

interface ChatMessage {
  role: 'user' | 'model'
  content: string
}

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'No API key' }), { status: 500 })
  }

  try {
    const { messages } = await req.json() as { messages: ChatMessage[] }

    // user/model 교대로 변환
    const geminiContents: { role: string; parts: { text: string }[] }[] = []
    let lastRole = ''

    for (const msg of messages) {
      const role = msg.role === 'user' ? 'user' : 'model'
      if (role === lastRole && geminiContents.length > 0) {
        geminiContents[geminiContents.length - 1].parts[0].text += '\n' + msg.content
      } else {
        geminiContents.push({ role, parts: [{ text: msg.content }] })
        lastRole = role
      }
    }

    if (geminiContents.length === 0 || geminiContents[geminiContents.length - 1].role !== 'user') {
      return new Response(JSON.stringify({ message: '뭐 하고 싶어?' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(GEMINI_STREAM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.85,
          maxOutputTokens: 300,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini error:', errorText)
      return new Response(JSON.stringify({ error: 'API error' }), { status: response.status })
    }

    // SSE 스트림을 그대로 클라이언트에 전달
    const encoder = new TextEncoder()
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            controller.close()
            break
          }

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6).trim()
              if (!jsonStr) continue
              try {
                const data = JSON.parse(jsonStr)
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text
                if (text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`))
                }
              } catch {
                // skip invalid JSON
              }
            }
          }
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
