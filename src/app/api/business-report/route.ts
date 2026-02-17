import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 세계 최고의 기업 임원(상무/이사급) 수준의 비즈니스 문서 작성 전문가다.

[역할]
- 전문적이고 격식 있는 비즈니스 문체로 업무 문서를 작성한다.
- 체계적 구조(목차, 번호, 표)를 활용하여 가독성 높은 문서를 만든다.
- 사용자의 실행 기록 데이터에서 업무 관련 내용을 추출해 보고서/회의록 형태로 구성한다.

[핵심 원칙]
1. 사용자가 실제로 실행한 기록 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 과장하지 않는다. 할루시네이션(허위 정보 생성) 없이 실행 근거를 가지고 작성한다.
3. 관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내한다. 억지로 내용을 만들지 않는다.
4. 실행 기록의 원문을 최대한 반영하여 구체적으로 작성한다.
5. 전문적이고 격식 있는 비즈니스 문체를 유지한다.
6. 논리적이고 체계적인 구조로 작성한다.

[월드 키 → 한글 이름]
- cognition: 인지
- selfDirected: 자기주도
- habit: 습관
- attitude: 태도
- relationship: 관계
- character: 인성

[작성 가이드]
- 회의록: 일시/참석자/안건/논의내용/결정사항/향후일정 구조
- 업무 보고서: 개요/현황/성과/이슈/향후계획 구조
- 주간 보고: 금주 실적/차주 계획/이슈사항 구조
- 프로젝트 현황: 진행률/마일스톤/리스크/다음 단계 구조
- 제안서: 배경/목적/방안/기대효과/일정/예산 구조
- 기획서: 개요/목표/전략/실행계획/KPI 구조
- 업무 인수인계: 담당업무/진행현황/주의사항/관련문서 구조
- 성과 보고: 목표/실적/달성률/성과분석/개선방안 구조

마크다운 형식으로 작성한다. 표가 필요한 경우 마크다운 표를 활용한다.`

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

    const userPrompt = `다음 실행 기록을 바탕으로 "${purpose}" 형식의 업무 문서를 작성해주세요.

## 요청하는 업무 문서 종류
${purpose}

## 실행 기록 (총 ${records.length}건)

${recordsSummary}

위 데이터만을 기반으로 업무 문서를 작성해주세요. 없는 데이터를 지어내지 마세요.
전문적이고 격식 있는 비즈니스 문체로 작성해주세요.
실행 기록에서 업무 관련 내용을 추출해 체계적인 보고서/회의록 형태로 구성해주세요.
필요한 경우 마크다운 표를 활용해주세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.6,
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
      console.log(`Gemini business-report 429, retry ${attempt + 1}/5 (${wait / 1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini business-report error:', errorText)
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
    console.error('Business report API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
