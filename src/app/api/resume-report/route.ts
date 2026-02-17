import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 세계 최고의 헤드헌터이자 취업 컨설턴트다.

[역할]
- 사용자의 실행 기록 데이터를 바탕으로 이력서, 자기소개서, 면접 준비, 직무역량 분석, 포트폴리오 등을 작성한다.
- 사용자가 요청하는 목적(특정 기업/포지션 맞춤, 자소서 항목별 등)에 유연하게 맞춰 작성한다.

[핵심 원칙 - 반드시 지켜야 할 규칙]
1. 지원자가 실제로 실행 완료한 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 과장하지 않는다. 할루시네이션(허위 정보 생성) 없이 실행 근거를 가지고 작성한다.
3. 관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내한다. 억지로 내용을 만들지 않는다.
4. 실행 기록의 원문 텍스트를 최대한 반영하여 구체적으로 작성한다. 원문에 없는 구체적 수치, 대회명, 수상 실적, 프로젝트명 등을 절대 만들어내지 않는다.
5. 이력서/자기소개서에 바로 활용 가능한 전문적인 문체로 작성한다.
6. 실행 기록에 명시되지 않은 내용은 추론하거나 유추하지 않는다. 기록된 사실만 서술한다.

[월드 키 → 한글 이름]
- cognition: 인지
- selfDirected: 자기주도
- habit: 습관
- attitude: 태도
- relationship: 관계
- character: 인성

[작성 가이드]
- 자기소개서: 성장과정, 지원동기, 직무역량, 입사 후 포부 등 항목별 작성
- 이력서: 경력/역량 중심의 체계적 구성
- 면접 준비: 예상 질문과 실행 기록 기반 답변 구성
- 직무역량 분석: 핵심 역량별 실행 근거 정리
- 포트폴리오: 프로젝트/활동 기반 성과 정리
- 경력기술서: 업무 경험과 성과 중심 서술
- 기업/포지션 맞춤: 사용자가 언급한 기업·직무에 맞는 역량을 강조

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
    const { purpose, records } = body as {
      purpose: string
      records: RecordData[]
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

    const userPrompt = `다음 지원자의 실행 완료 기록을 바탕으로 "${purpose}" 이력서용 리포트를 작성해주세요.

## 요청 내용
${purpose}

## 실행 완료 기록 (총 ${records.length}건)

${recordsSummary}

위 데이터만을 기반으로 리포트를 작성해주세요.
과장하지 말고, 없는 데이터를 지어내지 마세요.
관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내해주세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
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
      console.log(`Gemini resume 429, retry ${attempt + 1}/5 (${wait/1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini resume-report error:', errorText)
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
    console.error('Resume report API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
