import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SCHOOL_SYSTEM_PROMPT = `너는 교육부 학교생활기록부 작성 전문가다.

[전문성]
- 교육부 학교생활기록부 기재요령 완벽 숙지
- 세부능력 및 특기사항(세특) 작성 20년 경력
- 수천 건의 생활기록부 작성/검수 경험

[문체 규칙 - 반드시 지켜야 할 규칙]
1. 교육부 생활기록부 공식 문체를 사용한다: ~음, ~함, ~임, ~보임, ~나타남 종결어미
2. 3인칭 관찰자 시점으로 작성한다: "해당 학생은~", "~하는 모습을 보임"
3. 구체적인 활동 내용과 날짜를 반드시 포함한다
4. 실행 기록에 있는 데이터만 사용한다. 절대로 없는 활동이나 성과를 지어내지 않는다
5. 과장하지 않는다. 사실 그대로를 교육부 문체로 서술한다
6. 데이터가 없으면 "해당 영역의 기록이 없음"으로 표기한다
7. 원문에 없는 대회명, 수상 실적, 프로젝트명, 구체적 수치를 절대 만들어내지 않는다
8. 실행 기록에 명시되지 않은 내용은 추론하거나 유추하지 않는다

[세특 작성 시 추가 규칙]
- 해당 교과의 관점에서 학생의 역량을 서술한다
- 교과 수업 중 보인 태도, 탐구 활동, 발표, 과제 수행 등을 구체적으로 기술한다
- 실행 기록의 원문 텍스트와 날짜를 근거로 활용한다
- 세특은 한 문단(3~5문장)으로 작성한다`

const RESUME_SYSTEM_PROMPT = `너는 대기업 인사팀 출신 이력서/자기소개서 작성 전문가다.

[전문성]
- 삼성, SK, LG, 현대 등 대기업 공채 이력서 심사 15년 경력
- 수천 건의 합격 이력서/자기소개서 컨설팅 경험
- 대기업 이력서 양식과 평가 기준 완벽 숙지

[문체 규칙 - 반드시 지켜야 할 규칙]
1. 대기업 이력서/자기소개서 공식 문체를 사용한다: ~하였습니다, ~했습니다, ~입니다
2. 1인칭 시점으로 작성한다: "저는~", "~한 경험이 있습니다"
3. STAR 기법을 활용한다: 상황(Situation) → 과제(Task) → 행동(Action) → 결과(Result)
4. 구체적인 활동 내용과 날짜를 반드시 포함한다
5. 실행 기록에 있는 데이터만 사용한다. 절대로 없는 활동이나 성과를 지어내지 않는다
6. 과장하지 않는다. 사실 그대로를 전문적인 문체로 서술한다
7. 데이터가 없으면 "해당 역량의 기록이 없습니다"로 표기한다
8. 원문에 없는 대회명, 수상 실적, 프로젝트명, 구체적 수치를 절대 만들어내지 않는다
9. 실행 기록에 명시되지 않은 내용은 추론하거나 유추하지 않는다

[이력서 양식 작성 시 추가 규칙]
- 역량별로 구분하여 작성한다
- 각 항목은 핵심 역량 키워드 + 구체적 사례로 구성한다
- 실행 기록의 원문 텍스트와 날짜를 근거로 활용한다
- 한 항목당 2~4문장으로 간결하게 작성한다`

interface RecordData {
  worldKey: string
  executionText: string
  date: string
}

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: 'API 키가 설정되지 않았습니다.' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const {
      type,
      report,
      prompt,
      records,
    } = body as {
      type: 'school' | 'resume'
      report: string
      prompt: string
      records: RecordData[]
    }

    const systemPrompt = type === 'school' ? SCHOOL_SYSTEM_PROMPT : RESUME_SYSTEM_PROMPT

    const worldLabels: Record<string, string> = {
      cognition: '인지',
      selfDirected: '자기주도',
      habit: '습관',
      attitude: '태도',
      relationship: '관계',
      character: '인성',
    }

    const recordsSummary = records.length > 0
      ? records.map(r => `- [${r.date}] (${worldLabels[r.worldKey] || r.worldKey}) ${r.executionText}`).join('\n')
      : '(실행 기록 없음)'

    const userPrompt = `다음은 리포트와 학생/지원자의 원본 실행 기록입니다.

## 리포트
${report}

## 원본 실행 기록 (총 ${records.length}건)
${recordsSummary}

## 요청
${prompt}

[중요 - 할루시네이션 금지 규칙]
1. 위의 원본 실행 기록에 있는 데이터만 근거로 사용하세요.
2. 절대로 없는 활동, 대회명, 수상 실적, 프로젝트명, 수치를 지어내지 마세요.
3. 날짜도 실행 기록의 날짜를 그대로 사용하세요.
4. 실행 기록에 없는 내용은 추론하거나 유추하지 마세요. 기록된 사실만 서술하세요.
5. 데이터가 부족한 영역은 억지로 채우지 말고 "해당 기록 없음"으로 표기하세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 8192,
      },
    })

    let response: Response | null = null
    for (let attempt = 0; attempt < 5; attempt++) {
      response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      })
      if (response.status !== 429) break
      const wait = 3000 * Math.pow(2, attempt)
      console.log(`Gemini formal 429, retry ${attempt + 1}/5 (${wait/1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini formal-convert error:', errorText)
      return NextResponse.json({ error: '좋은 서류를 만들기 위해 시간이 필요합니다 ✨ 2분 뒤에 다시 눌러주세요!' }, { status: response?.status || 500 })
    }

    const data = await response.json()
    const convertedText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    if (!convertedText) {
      return NextResponse.json({ error: '변환 결과가 없습니다.' }, { status: 500 })
    }

    return NextResponse.json({ result: convertedText })
  } catch (error) {
    console.error('Formal convert API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
