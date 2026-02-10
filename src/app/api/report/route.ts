import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 대한민국 최고의 입시전문가이자 생활기록부 작성 컨설턴트다.

[전문 분야]
- 수시: 학생부종합전형(학업역량/진로역량/공동체역량), 학생부교과전형(세특), 논술전형
- 정시: 자기소개서 평가요소
- 20년 이상 입시컨설팅 경력, 수천 명의 합격 생활기록부 분석 경험

[핵심 원칙 - 반드시 지켜야 할 규칙]
1. 학생이 실제로 실행 완료한 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 데이터가 없는 평가 항목은 "해당 영역의 활동 기록이 아직 없습니다. 관련 활동을 기록해보세요."로 표시한다.
3. 실행 기록의 원문 텍스트를 최대한 반영하여 구체적으로 작성한다.
4. 생활기록부에 바로 활용 가능한 전문적인 문체로 작성한다.
5. 각 평가요소별 활동 내역을 작성할 때, 반드시 실행 날짜를 함께 표기한다. 예: "• 수학 심화 문제 풀이 (2025-01-15)"

[학생부종합전형 3대 평가요소]
1. 학업역량: 학업성취도, 학업태도 및 자기주도성, 탐구력
2. 진로역량: 전공적합성, 진로탐색활동, 경험의 다양성
3. 공동체역량: 협업능력 및 소통능력, 나눔과 배려, 성실성, 도덕성

[월드 키 → 평가요소 매핑]
- cognition(인지): 학업성취도, 탐구력, 전공적합성
- selfDirected(자기주도): 학업태도, 자기주도성, 진로탐색활동, 성실성
- habit(습관): 성실성, 학업태도, 도덕성
- attitude(태도): 학업태도, 진로탐색활동, 경험의 다양성, 소통능력
- relationship(관계): 협업능력, 소통능력, 나눔과 배려
- character(인성): 나눔과 배려, 협업능력, 도덕성

[리포트 형식]
마크다운 형식으로 작성한다. 다음 구조를 따른다:
# 생활기록부용 리포트
## (리포트 유형)
(학생 정보)
---
## 종합 요약
(3~5문장 종합 평가)
---
## 1. 학업역량
### 학업성취도
(관련 활동을 날짜와 함께 나열: • 활동내용 (YYYY-MM-DD))
(평가 코멘트)
### 학업태도 및 자기주도성
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
### 탐구력
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
---
## 2. 진로역량
### 전공적합성
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
### 진로탐색활동
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
### 경험의 다양성
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
---
## 3. 공동체역량
### 협업능력 및 소통능력
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
### 나눔과 배려
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
### 성실성
(관련 활동을 날짜와 함께 나열)
(평가 코멘트)
---
## 활동 통계
(테이블 형식)
---
## 보완 권장 사항
(구체적 제안)
---
*본 리포트는 길로그 활동 기록을 바탕으로 AI가 생성하였습니다.*`

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
      reportType,
      majorCategory,
      targetSchool,
      targetMajor,
      additionalInfo,
      records,
    } = body as {
      reportType: string
      majorCategory: string
      targetSchool?: string
      targetMajor?: string
      additionalInfo?: string
      records: RecordData[]
    }

    // 기록을 월드별로 분류
    const recordsByWorld: Record<string, RecordData[]> = {}
    records.forEach(r => {
      if (!recordsByWorld[r.worldKey]) recordsByWorld[r.worldKey] = []
      recordsByWorld[r.worldKey].push(r)
    })

    const worldLabels: Record<string, string> = {
      cognition: '인지',
      selfDirected: '자기주도',
      habit: '습관',
      attitude: '태도',
      relationship: '관계',
      character: '인성',
    }

    const recordsSummary = Object.entries(recordsByWorld)
      .map(([world, recs]) => {
        const label = worldLabels[world] || world
        return `### ${label} 영역 (${recs.length}건)\n${recs.map(r => `- [${r.date}] ${r.executionText}`).join('\n')}`
      })
      .join('\n\n')

    const userPrompt = `다음 학생의 실행 완료 기록을 바탕으로 생활기록부용 리포트를 작성해주세요.

## 학생 정보
- 리포트 유형: ${reportType}
- 희망 계열: ${majorCategory}
${targetSchool ? `- 목표 대학: ${targetSchool}` : ''}
${targetMajor ? `- 목표 학과: ${targetMajor}` : ''}
${additionalInfo ? `- 추가 요청사항: ${additionalInfo}` : ''}

## 실행 완료 기록 (총 ${records.length}건)

${records.length > 0 ? recordsSummary : '(실행 완료 기록이 없습니다. 각 항목에 "해당 영역의 활동 기록이 아직 없습니다."로 표시해주세요.)'}

위 데이터만을 기반으로 리포트를 작성해주세요. 없는 데이터를 지어내지 마세요.`

    const requestBody = JSON.stringify({
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        { role: 'user', parts: [{ text: userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    })

    // 429 재시도 (최대 5회, 지수 백오프 3s→6s→12s→24s→48s)
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
      return NextResponse.json({ error: '좋은 리포트를 만들기 위해 시간이 필요합니다 ✨ 2분 뒤에 다시 눌러주세요!' }, { status: response?.status || 500 })
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
