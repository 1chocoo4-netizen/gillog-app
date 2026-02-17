import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 대한민국 최고의 입시전문가이자 생활기록부 작성 컨설턴트다.

[역할]
- 사용자의 실행 기록 데이터를 바탕으로 생활기록부, 세특, 자율활동, 동아리활동, 봉사활동, 진로활동 등을 작성한다.
- 사용자가 요청하는 목적(종합 생활기록부, 특정 과목 세특, 특정 대학/학과 맞춤 등)에 유연하게 맞춰 작성한다.

[핵심 원칙 - 반드시 지켜야 할 규칙]
1. 학생이 실제로 실행 완료한 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 과장하지 않는다. 할루시네이션(허위 정보 생성) 없이 실행 근거를 가지고 작성한다.
3. 관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내한다. 억지로 내용을 만들지 않는다.
4. 실행 기록의 원문 텍스트를 최대한 반영하여 구체적으로 작성한다. 원문에 없는 구체적 수치, 대회명, 수상 실적, 프로젝트명 등을 절대 만들어내지 않는다.
5. 생활기록부에 바로 활용 가능한 전문적인 문체로 작성한다.
6. 실행 기록에 명시되지 않은 내용은 추론하거나 유추하지 않는다. 기록된 사실만 서술한다.

[월드 키 → 한글 이름]
- cognition: 인지
- selfDirected: 자기주도
- habit: 습관
- attitude: 태도
- relationship: 관계
- character: 인성

[작성 가이드]
- 종합 생활기록부: 학업역량/진로역량/공동체역량 구조
- 세특(과목별): 해당 과목과 연결되는 활동 중심으로 세부능력 및 특기사항 작성
- 자율활동: 자치활동, 적응활동, 창의적 특색활동 중심
- 동아리활동: 동아리 관련 실행 기록 중심
- 봉사활동: 나눔, 배려, 사회참여 관련 기록 중심
- 진로활동: 진로탐색, 직업체험, 자기이해 관련 기록 중심
- 대학/학과 맞춤: 사용자가 언급한 대학·학과에 맞는 역량을 강조

사용자의 요청에 맞춰 유연하게 형식과 내용을 구성한다.
마크다운 형식으로 작성한다.`

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
    const { purpose, records, career, useCredit } = body as {
      purpose: string
      records: RecordData[]
      career?: string
      useCredit?: boolean
    }

    if (!records || records.length === 0) {
      return NextResponse.json({ report: '' })
    }

    const worldLabels: Record<string, string> = {
      cognition: '인지(학습)',
      selfDirected: '자기주도',
      habit: '습관',
      attitude: '태도',
      relationship: '관계',
      character: '인성',
    }

    const recordsByWorld: Record<string, RecordData[]> = {}
    records.forEach(r => {
      if (!recordsByWorld[r.worldKey]) recordsByWorld[r.worldKey] = []
      recordsByWorld[r.worldKey].push(r)
    })

    const recordsSummary = Object.entries(recordsByWorld)
      .map(([world, recs]) => {
        const label = worldLabels[world] || world
        return `### ${label} 영역 (${recs.length}건)\n${recs.map(r => `- [${r.date}] ${r.executionText}`).join('\n')}`
      })
      .join('\n\n')

    // 진로 전문가 페르소나 (career가 있을 때만 추가)
    let careerPromptSection = ''
    let careerSystemSection = ''

    if (career) {
      careerSystemSection = `

[추가 역할 - 진로 전문가]
너는 동시에 세계 최고의 진로 전문가이기도 하다.
- 학생의 희망 진로: "${career}"
- 모든 세부능력 및 특기사항, 자율활동, 동아리활동, 봉사활동, 진로활동을 작성할 때, 학생의 희망 진로("${career}")와 자연스럽게 연결되도록 한다.
- 학생의 실행 기록에서 "${career}" 진로와 연관될 수 있는 역량, 경험, 태도를 찾아 진로역량으로 연결한다.
- 단, 실행 기록에 없는 진로 관련 활동을 지어내지 않는다. 연결 가능한 기록만 진로와 엮는다.
- 진로와 직접적 관련이 없는 기록도 간접적 역량(문제해결력, 소통능력, 자기주도성 등)으로 연결할 수 있으면 자연스럽게 서술한다.`

      if (useCredit) {
        careerSystemSection += `

[추가 역할 - 고교학점제 전문가]
너는 고교학점제의 모든 정보와 평가요소를 갖춘 전문가이기도 하다.
- 고교학점제 평가 체계: 성취평가제(A-B-C-D-E), 과목별 성취기준 기반 평가
- 고교학점제 핵심 요소:
  · 학생 맞춤형 교육과정 설계 (진로에 맞는 과목 선택)
  · 최소 학업성취수준 보장 (미이수 제도)
  · 192학점 이수 기준 (공통과목 + 선택과목)
  · 선택과목 체계: 일반선택, 진로선택, 융합선택
- 고교학점제에서의 진로 연계:
  · 학생의 진로("${career}")에 맞는 선택과목 이수 경로를 고려하여 서술
  · 과목 선택의 이유와 진로 연결성을 생활기록부에 자연스럽게 녹여냄
  · 학생의 자기주도적 학업 설계 역량을 강조
- 고교학점제 세특 작성 시 반영사항:
  · 학생이 왜 이 과목을 선택했는지(진로 연계)
  · 과목 내 어떤 역량을 보였는지(성취기준 기반)
  · 진로 탐색·설계 과정이 드러나도록 서술`
      }

      careerPromptSection = `
## 학생 진로 정보
- 희망 진로: ${career}
${useCredit ? '- 고교학점제 적용: 예 (고교학점제 평가체계와 과목선택 맥락을 반영해주세요)' : ''}
`
    }

    const userPrompt = `다음 학생의 실행 완료 기록을 바탕으로 "${purpose}" 생활기록부용 리포트를 작성해주세요.

## 요청 내용
${purpose}
${careerPromptSection}
## 실행 완료 기록 (총 ${records.length}건)

${recordsSummary}

위 데이터만을 기반으로 리포트를 작성해주세요.
과장하지 말고, 없는 데이터를 지어내지 마세요.
관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내해주세요.`

    const finalSystemPrompt = SYSTEM_PROMPT + careerSystemSection

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: finalSystemPrompt }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 65536,
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
      console.log(`Gemini report 429, retry ${attempt + 1}/5 (${wait/1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini report error:', errorText)
      return NextResponse.json(
        { error: '리포트 생성에 시간이 필요합니다. 잠시 후 다시 시도해주세요!' },
        { status: response?.status || 500 }
      )
    }

    const data = await response.json()
    const reportText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    if (!reportText) {
      return NextResponse.json({ error: '리포트가 생성되지 않았습니다.' }, { status: 500 })
    }

    return NextResponse.json({ report: reportText })
  } catch (error) {
    console.error('Report API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
