// ========================================
// 생활기록부 리포트 템플릿
// 학생부종합전형 + 교과전형 평가요소 기반
// ========================================

// 학생부종합전형 평가요소 (2024 대입 기준)
export const EVALUATION_CRITERIA = {
  // 1. 학업역량
  academic: {
    key: 'academic',
    label: '학업역량',
    description: '학업을 충실히 수행할 수 있는 기초 수학 능력',
    subCriteria: [
      {
        key: 'achievement',
        label: '학업성취도',
        description: '전 과목 성취 수준, 학업 발전 추세',
        worldKeys: ['cognition', 'selfDirected'],
      },
      {
        key: 'attitude',
        label: '학업태도',
        description: '학업에 대한 자기주도성, 적극성, 집중력',
        worldKeys: ['selfDirected', 'attitude', 'habit'],
      },
      {
        key: 'inquiry',
        label: '탐구력',
        description: '지적 호기심, 깊이 있는 학습 경험, 탐구 활동',
        worldKeys: ['cognition', 'selfDirected'],
      },
    ],
  },

  // 2. 진로역량
  career: {
    key: 'career',
    label: '진로역량',
    description: '자신의 진로를 탐색하고 관련 역량을 기르기 위한 노력',
    subCriteria: [
      {
        key: 'suitability',
        label: '전공적합성',
        description: '전공 관련 교과 이수 및 성취, 전공 관련 활동',
        worldKeys: ['cognition', 'selfDirected'],
      },
      {
        key: 'exploration',
        label: '진로탐색활동',
        description: '진로에 대한 관심, 진로 탐색 노력, 경험',
        worldKeys: ['selfDirected', 'attitude'],
      },
      {
        key: 'diversity',
        label: '경험의 다양성',
        description: '다양한 영역의 활동 경험, 성장 과정',
        worldKeys: ['attitude', 'relationship', 'character'],
      },
    ],
  },

  // 3. 공동체역량
  community: {
    key: 'community',
    label: '공동체역량',
    description: '공동체 일원으로서 협력하며 성장하는 능력',
    subCriteria: [
      {
        key: 'collaboration',
        label: '협업능력',
        description: '공동 목표 달성을 위한 협력, 팀워크',
        worldKeys: ['relationship', 'character'],
      },
      {
        key: 'sharing',
        label: '나눔과 배려',
        description: '봉사정신, 타인 배려, 나눔 실천',
        worldKeys: ['character', 'relationship'],
      },
      {
        key: 'communication',
        label: '소통능력',
        description: '경청, 의사표현, 갈등 해결 능력',
        worldKeys: ['relationship', 'attitude'],
      },
      {
        key: 'ethics',
        label: '도덕성',
        description: '규칙 준수, 책임감, 정직함',
        worldKeys: ['character', 'habit'],
      },
      {
        key: 'diligence',
        label: '성실성',
        description: '출결, 과제 이행, 꾸준한 노력',
        worldKeys: ['habit', 'selfDirected'],
      },
    ],
  },
} as const

// 교과전형 평가요소
export const SUBJECT_CRITERIA = {
  academic_performance: {
    key: 'academic_performance',
    label: '교과 성적',
    description: '내신 등급, 원점수, 석차백분율 등',
    worldKeys: ['cognition', 'selfDirected', 'habit'],
  },
  subject_specialty: {
    key: 'subject_specialty',
    label: '세부능력 및 특기사항',
    description: '수업 참여도, 발표, 탐구활동, 과제 수행',
    worldKeys: ['cognition', 'selfDirected', 'attitude'],
  },
} as const

// 리포트 유형
export type ReportType = 'comprehensive' | 'subject' | 'activity' | 'growth'

export const REPORT_TYPES = {
  comprehensive: {
    key: 'comprehensive',
    label: '학생부종합전형용',
    description: '학업역량, 진로역량, 공동체역량 종합 분석',
    icon: '🎓',
  },
  subject: {
    key: 'subject',
    label: '교과전형용',
    description: '교과 성적 및 세부능력특기사항 중심',
    icon: '📚',
  },
  activity: {
    key: 'activity',
    label: '창의적 체험활동',
    description: '자율활동, 동아리, 봉사, 진로활동 기록',
    icon: '🌟',
  },
  growth: {
    key: 'growth',
    label: '성장스토리',
    description: '자기소개서, 면접용 성장 과정 정리',
    icon: '🌱',
  },
} as const

// 전공 계열
export const MAJOR_CATEGORIES = {
  humanities: { key: 'humanities', label: '인문계열', icon: '📖' },
  social: { key: 'social', label: '사회계열', icon: '🏛️' },
  natural: { key: 'natural', label: '자연계열', icon: '🔬' },
  engineering: { key: 'engineering', label: '공학계열', icon: '⚙️' },
  medical: { key: 'medical', label: '의약계열', icon: '🏥' },
  arts: { key: 'arts', label: '예술계열', icon: '🎨' },
  education: { key: 'education', label: '교육계열', icon: '👨‍🏫' },
  business: { key: 'business', label: '경영계열', icon: '💼' },
} as const

export type MajorCategory = keyof typeof MAJOR_CATEGORIES

// 월드 키 → 평가요소 매핑
export const WORLD_TO_CRITERIA_MAP: Record<string, string[]> = {
  cognition: ['학업성취도', '탐구력', '전공적합성'],
  selfDirected: ['학업태도', '학업성취도', '진로탐색활동', '성실성'],
  habit: ['성실성', '학업태도', '도덕성'],
  attitude: ['학업태도', '진로탐색활동', '경험의 다양성', '소통능력'],
  relationship: ['협업능력', '소통능력', '나눔과 배려'],
  character: ['나눔과 배려', '협업능력', '도덕성'],
}

// 실행 기록 → 평가요소 분류
export function categorizeExecutionByEvaluation(worldKey: string): {
  mainCategory: string
  subCriteria: string[]
} {
  switch (worldKey) {
    case 'cognition':
      return { mainCategory: '학업역량', subCriteria: ['탐구력', '학업성취도'] }
    case 'selfDirected':
      return { mainCategory: '학업역량', subCriteria: ['학업태도', '자기주도성'] }
    case 'habit':
      return { mainCategory: '공동체역량', subCriteria: ['성실성', '학업태도'] }
    case 'attitude':
      return { mainCategory: '진로역량', subCriteria: ['진로탐색활동', '경험의 다양성'] }
    case 'relationship':
      return { mainCategory: '공동체역량', subCriteria: ['협업능력', '소통능력'] }
    case 'character':
      return { mainCategory: '공동체역량', subCriteria: ['나눔과 배려', '도덕성'] }
    default:
      return { mainCategory: '기타', subCriteria: [] }
  }
}

// 리포트 요청 데이터
export interface ReportRequest {
  reportType: ReportType
  majorCategory: MajorCategory
  targetSchool?: string       // 목표 대학
  targetMajor?: string        // 목표 학과
  additionalInfo?: string     // 추가 요청사항
  focusAreas?: string[]       // 강조하고 싶은 역량
}

// 생성된 리포트
export interface GeneratedReport {
  id: string
  createdAt: string
  request: ReportRequest

  // 리포트 내용
  summary: string             // 종합 요약
  academicSection?: string    // 학업역량 섹션
  careerSection?: string      // 진로역량 섹션
  communitySection?: string   // 공동체역량 섹션

  // 활동 기반 작성
  activities: {
    category: string
    title: string
    description: string
    evaluation: string        // 평가요소 연결
  }[]

  // 성장 스토리
  growthStory?: string

  // 추천 보완 사항
  recommendations?: string[]
}

// 리포트 생성용 프롬프트 템플릿
export function generateReportPrompt(
  request: ReportRequest,
  executionRecords: { worldKey: string; executionText: string; date: string }[]
): string {
  const reportTypeInfo = REPORT_TYPES[request.reportType]
  const majorInfo = MAJOR_CATEGORIES[request.majorCategory]

  // 실행 기록을 평가요소별로 분류
  const categorizedRecords: Record<string, string[]> = {}
  executionRecords.forEach(record => {
    const { mainCategory } = categorizeExecutionByEvaluation(record.worldKey)
    if (!categorizedRecords[mainCategory]) {
      categorizedRecords[mainCategory] = []
    }
    categorizedRecords[mainCategory].push(`[${record.date}] ${record.executionText}`)
  })

  return `
당신은 대한민국 최고의 입시 컨설턴트입니다.
학생의 실제 활동 기록을 바탕으로 ${reportTypeInfo.label} 리포트를 작성해주세요.

## 학생 정보
- 희망 계열: ${majorInfo.label}
${request.targetSchool ? `- 목표 대학: ${request.targetSchool}` : ''}
${request.targetMajor ? `- 목표 학과: ${request.targetMajor}` : ''}
${request.additionalInfo ? `- 추가 요청: ${request.additionalInfo}` : ''}

## 학생 활동 기록 (평가요소별)

${Object.entries(categorizedRecords).map(([category, records]) => `
### ${category}
${records.map(r => `- ${r}`).join('\n')}
`).join('\n')}

## 작성 요청

${request.reportType === 'comprehensive' ? `
학생부종합전형 3대 평가요소에 맞춰 작성해주세요:
1. 학업역량: 학업성취도, 학업태도, 탐구력
2. 진로역량: 전공적합성, 진로탐색활동, 경험의 다양성
3. 공동체역량: 협업능력, 나눔과 배려, 소통능력, 도덕성, 성실성
` : ''}

${request.reportType === 'subject' ? `
교과전형에 맞춰 작성해주세요:
1. 교과 관련 활동 및 태도
2. 세부능력 및 특기사항에 기록할 내용
3. 학업 역량 증빙 사례
` : ''}

${request.reportType === 'activity' ? `
창의적 체험활동 4개 영역에 맞춰 작성해주세요:
1. 자율활동
2. 동아리활동
3. 봉사활동
4. 진로활동
` : ''}

${request.reportType === 'growth' ? `
자기소개서/면접용 성장 스토리를 작성해주세요:
1. 성장 과정과 변화
2. 극복한 어려움과 배운 점
3. 지원 동기로 연결되는 경험
` : ''}

리포트는 다음 형식으로 작성해주세요:
1. 종합 요약 (3-5문장)
2. 각 평가요소별 상세 내용
3. 구체적 활동 사례와 성과
4. 보완이 필요한 부분 제안

학생의 실제 활동을 바탕으로 구체적이고 설득력 있게 작성해주세요.
`.trim()
}
