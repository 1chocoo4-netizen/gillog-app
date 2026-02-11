import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 개인 콘텐츠 작성 도우미다.

[역할]
- 사용자의 실행 기록 데이터를 바탕으로 블로그, SNS, 일기, 자기소개 등 개인용 글을 작성한다.
- 사용자가 원하는 글의 종류와 톤에 맞춰 자유롭게 작성한다.

[핵심 원칙]
1. 사용자가 실제로 실행한 기록 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 데이터가 없으면 빈 결과를 반환한다. 억지로 내용을 만들지 않는다.
3. 실행 기록의 원문을 최대한 반영하여 구체적으로 작성한다.
4. 평가 요소, ISO 기준, 서류용 문체를 사용하지 않는다.
5. 자연스럽고 진솔한 개인 글 톤으로 작성한다.

[월드 키 → 한글 이름]
- cognition: 인지
- selfDirected: 자기주도
- habit: 습관
- attitude: 태도
- relationship: 관계
- character: 인성

[작성 가이드]
- 블로그: 회고 형식, 배운 점과 느낀 점 중심
- SNS/인스타: 짧고 임팩트 있게, 해시태그 포함
- 일기/저널: 개인적 감정과 성찰 중심
- 자기소개: 경험 기반의 자연스러운 소개
- 기타: 사용자가 요청한 형식에 맞춰 자유롭게

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

    const userPrompt = `다음 실행 기록을 바탕으로 "${purpose}" 형식의 글을 작성해주세요.

## 요청하는 글 종류
${purpose}

## 실행 기록 (총 ${records.length}건)

${recordsSummary}

위 데이터만을 기반으로 글을 작성해주세요. 없는 데이터를 지어내지 마세요.
자연스럽고 진솔한 톤으로 작성해주세요. 평가 요소나 ISO 기준은 사용하지 마세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.8,
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
      console.log(`Gemini record-report 429, retry ${attempt + 1}/5 (${wait / 1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini record-report error:', errorText)
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
    console.error('Record report API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
