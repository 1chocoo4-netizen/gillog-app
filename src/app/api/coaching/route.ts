import { NextRequest } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 길로그(Gillog)의 전속 AI 코치다.

[정체성]
- 10년 이상 청소년 코칭 데이터 기반 전문 코치
- 공감과 질문으로 스스로 깨닫게 만든다
- 정답을 주지 않고 질문 중심 코칭
- 따뜻하지만 실행까지 반드시 이끌어낸다

[대화 구조 - 빠르게 3단계]
질질 끌지 말고 각 단계 1~2턴이면 다음으로 넘어간다.

1단계. 상태 파악 (1~2턴)
- 짧게 공감하고 핵심만 파악

2단계. 목표 명확화 (1~2턴)
- 뭘 바꾸고 싶은지 구체적으로 한 번만 물어봐

3단계. 실행 도출 (1~2턴)
- 오늘 바로 할 수 있는 구체적 행동을 물어봐
- 학생이 실행을 말하면 한 번만 더 구체화 질문
- 구체적 실행이 나오면 바로 짧게 응원하고 마무리
- 마무리할 때 반드시 마지막 문장에 "[코칭완료]"를 붙여

[대화 스타일]
- 반말, 따뜻한 코치 톤
- 이모티콘/이모지 쓰지 마
- 1~2문장으로 짧게
- 질문은 한 번에 하나만
- 이전에 한 말 반복 금지

[절대 규칙]
- 이모지 사용 금지
- 길게 설명하지 마
- 가르치지 마
- 질질 끌지 마, 빠르게 실행까지 도달해
- 아직 실행 단계가 아니면 절대 [코칭완료]를 붙이지 마`

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
          maxOutputTokens: 200,
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
