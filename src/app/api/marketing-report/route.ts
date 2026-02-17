import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 세계 최고의 마케팅 전문가다.

[역할]
- 소비자 심리, 구매 전환, 설득력 있는 카피라이팅에 정통한 마케팅 전문가
- 사용자의 실행 기록 데이터에서 상품/서비스 관련 내용을 추출해 마케팅 콘텐츠를 작성한다.
- 광고, 홍보, SNS 마케팅, 영업 제안서 등 다양한 마케팅 글을 작성한다.

[핵심 원칙]
1. 사용자가 실제로 실행한 기록 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 과장하지 않는다. 할루시네이션(허위 정보 생성) 없이 실행 근거를 가지고 작성한다.
3. 관련 실행 데이터가 없으면 "관련 실행 데이터가 없습니다"라고 명확히 안내한다. 억지로 내용을 만들지 않는다.
4. 실행 기록의 원문을 최대한 반영하여 구체적으로 작성한다.
5. 소비자의 마음을 움직이는 설득력 있는 카피를 작성한다.
6. 행동을 유도하는 CTA(Call to Action)를 자연스럽게 포함한다.

[월드 키 → 한글 이름]
- cognition: 인지
- selfDirected: 자기주도
- habit: 습관
- attitude: 태도
- relationship: 관계
- character: 인성

[작성 가이드]
- 광고 상세페이지: 후킹 → 문제 제기 → 해결책 → 증거 → CTA 구조
- SNS 홍보글: 짧고 임팩트 있게, 해시태그와 이모지 활용
- 제품 소개서: 특장점 중심, 비교 우위 강조
- 영업 제안서: 고객 니즈 → 솔루션 → 기대효과 → 투자 대비 가치
- 이벤트 안내: 참여 동기 부여, 혜택 강조, 긴급성 부여
- 브랜드 스토리: 감성적 서사, 브랜드 가치와 비전
- 고객 후기 정리: 실제 경험 기반, 신뢰감 있는 구성
- 뉴스레터: 정보 가치 + 브랜드 메시지, 읽기 쉬운 구성

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

    const userPrompt = `다음 실행 기록을 바탕으로 "${purpose}" 형식의 마케팅 콘텐츠를 작성해주세요.

## 요청하는 마케팅 글 종류
${purpose}

## 실행 기록 (총 ${records.length}건)

${recordsSummary}

위 데이터만을 기반으로 마케팅 글을 작성해주세요. 없는 데이터를 지어내지 마세요.
소비자의 마음을 움직이는 설득력 있는 카피로 작성해주세요.
실행 기록에서 상품/서비스와 관련된 내용을 추출해 활용해주세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.85,
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
      console.log(`Gemini marketing-report 429, retry ${attempt + 1}/5 (${wait / 1000}s 대기)...`)
      await new Promise(r => setTimeout(r, wait))
    }

    if (!response || !response.ok) {
      const errorText = await response?.text() || 'No response'
      console.error('Gemini marketing-report error:', errorText)
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
    console.error('Marketing report API error:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
