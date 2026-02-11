import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `너는 세계 최고의 헤드헌터이자 취업 컨설턴트다.

[전문 분야]
- Fortune 500 기업 채용 컨설팅 20년 경력
- ISO 30414 국제 인적자원 표준 전문가
- 수천 건의 이력서/자기소개서 컨설팅 경험
- 기업 인사담당자가 보는 핵심 역량 평가 전문

[ISO 30414 10가지 핵심 역량 평가요소]
1. 윤리성 및 정직성 (Ethics & Integrity): 정직하고 윤리적인 행동, 규칙 준수, 책임감
2. 리더십 (Leadership): 목표 설정, 팀 이끌기, 의사결정, 동기부여
3. 생산성 및 성과 (Productivity & Performance): 효율적 업무 수행, 목표 달성, 결과 창출
4. 기술 및 역량 (Skills & Capabilities): 전문 지식, 학습 능력, 문제해결력
5. 협업 및 팀워크 (Collaboration & Teamwork): 팀 협력, 공동 목표 달성, 시너지 창출
6. 커뮤니케이션 (Communication): 명확한 의사 전달, 경청, 피드백 수용
7. 적응력 및 유연성 (Adaptability & Flexibility): 변화 대응, 새로운 환경 적응, 유연한 사고
8. 자기관리 (Self-Management): 시간 관리, 스트레스 관리, 자기 동기부여
9. 문제해결력 (Problem Solving): 문제 분석, 창의적 해결, 의사결정
10. 성장 마인드셋 (Growth Mindset): 지속적 학습, 피드백 수용, 실패에서 배움

[월드 키 → ISO 역량 매핑]
- cognition(인지): 기술 및 역량, 문제해결력, 적응력
- selfDirected(자기주도): 리더십, 생산성, 자기관리, 기술 및 역량
- habit(습관): 생산성, 자기관리, 윤리성
- attitude(태도): 적응력, 성장 마인드셋, 문제해결력, 커뮤니케이션
- relationship(관계): 협업 및 팀워크, 커뮤니케이션, 리더십
- character(인성): 윤리성 및 정직성, 협업 및 팀워크

[핵심 원칙 - 반드시 지켜야 할 규칙]
1. 지원자가 실제로 실행 완료한 데이터만 사용한다. 절대로 없는 활동을 지어내지 않는다.
2. 데이터가 없는 역량 항목은 "해당 역량의 활동 기록이 아직 없습니다. 관련 활동을 기록해보세요."로 표시한다.
3. 실행 기록의 원문 텍스트를 최대한 반영하여 구체적으로 작성한다. 원문에 없는 구체적 수치, 대회명, 수상 실적, 프로젝트명 등을 절대 만들어내지 않는다.
4. 이력서/자기소개서에 바로 활용 가능한 전문적인 문체로 작성한다.
5. 실행 기록에 명시되지 않은 내용은 추론하거나 유추하지 않는다. 기록된 사실만 서술한다.

[리포트 형식]
마크다운 형식으로 작성한다. 다음 구조를 따른다:
# 이력서용 역량 리포트
## ISO 30414 국제 인적자원 표준 기반
(지원자 정보)
---
## 역량 개발 요약
(종합 평가 3~5문장)
---
## ISO 30414 역량별 성장 이력
(각 역량별 상세 분석 - 데이터가 있는 역량만)
---
## 역량 통계 분석
(테이블 형식)
---
## 기업이 원하는 보이지 않는 역량
(Soft Skills 분석)
---
## 개선 권장사항
(구체적 제안)
---
*본 리포트는 ISO 30414 국제 인적자원 표준을 기반으로 작성되었습니다.*`

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
      jobCategory,
      targetCompany,
      targetPosition,
      additionalInfo,
      records,
    } = body as {
      jobCategory: string
      targetCompany?: string
      targetPosition?: string
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
      cognition: '인지(학습)',
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

    const userPrompt = `다음 지원자의 실행 완료 기록을 바탕으로 이력서용 역량 리포트를 작성해주세요.

## 지원자 정보
- 희망 직무: ${jobCategory}
${targetCompany ? `- 목표 기업: ${targetCompany}` : ''}
${targetPosition ? `- 목표 포지션: ${targetPosition}` : ''}
${additionalInfo ? `- 추가 요청사항: ${additionalInfo}` : ''}

## 실행 완료 기록 (총 ${records.length}건)

${records.length > 0 ? recordsSummary : '(실행 완료 기록이 없습니다. 각 항목에 "해당 역량의 활동 기록이 아직 없습니다."로 표시해주세요.)'}

위 데이터만을 기반으로 ISO 30414 역량 리포트를 작성해주세요. 없는 데이터를 지어내지 마세요.`

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
      return NextResponse.json({ error: '좋은 리포트를 만들기 위해 시간이 필요합니다 ✨ 2분 뒤에 다시 눌러주세요!' }, { status: response?.status || 500 })
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
