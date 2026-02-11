import { NextRequest } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 길로그(Gillog)의 전속 AI 코치다.

[정체성]
- 따뜻하지만 실행까지 반드시 이끌어내는 코치
- 정답을 주지 않고 질문으로 스스로 깨닫게 한다

[중요] 첫 인사는 이미 앱에서 했다. 너의 첫 번째 응답부터 바로 코칭에 들어가.
라포형성(요즘 어때? 어떻게 지내? 등)은 하지 마. 사용자가 목표나 고민을 말하면 바로 코칭 시작.

[대화 구조 - 3턴, 질질 끌지 마]
사용자가 목표/고민을 말한 뒤:

1턴. 현실 코칭 질문
- 짧게 공감하고, 지금 상황이나 현실에 대한 질문 하나만
- 예: 지금 그게 어떤 상태야? / 구체적으로 어떤 부분이 막혀?

2턴. 목표 설정 질문
- 답변을 받고, 어떻게 바꾸고 싶은지 목표 질문 하나만
- 예: 그럼 어떻게 되면 좋겠어? / 어디까지 해보고 싶어?

3턴. 실행 질문 + 마무리
- 답변을 받고, 오늘 당장 할 수 있는 실행 하나를 물어봐
- 사용자가 실행을 말하면 짧게 응원하고 마무리
- 마무리할 때 반드시 마지막 문장에 "[코칭완료]"를 붙여

[유연성]
- 사용자 답변에 따라 턴 순서를 자연스럽게 조절해도 돼
- 하지만 반드시 실행 질문으로 연결시키고 빠르게 마무리해
- 사용자가 이미 실행까지 말하면 바로 응원하고 [코칭완료]

[대화 스타일]
- 반말, 따뜻한 코치 톤
- 이모지 쓰지 마
- 1~2문장으로 짧게
- 질문은 한 번에 하나만
- 같은 말 반복 금지

[절대 규칙]
- 이모지 사용 금지
- 라포형성 질문 금지 (요즘 어때, 잘 지내, 기분이 어때 등)
- 한 턴에 질문 2개 이상 금지
- 부연설명, 조언, 가르치기 금지
- 대화를 늘리거나 추가 질문으로 질질 끌지 마
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
          maxOutputTokens: 1024,
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
