// ========================================
// 이력서용 리포트 템플릿
// ISO 30414 국제 인적 자원 표준 기반
// ========================================

// ISO 30414 기반 개인 역량 평가요소
export const ISO_30414_CRITERIA = {
  // 1. 윤리성 및 정직성
  ethics: {
    key: 'ethics',
    label: '윤리성 및 정직성',
    labelEn: 'Ethics & Integrity',
    description: '정직하고 윤리적인 행동, 규칙 준수, 책임감',
    icon: '⚖️',
    worldKeys: ['character', 'habit'],
    keywords: ['정직', '책임', '규칙', '약속', '신뢰', '도덕'],
  },

  // 2. 리더십
  leadership: {
    key: 'leadership',
    label: '리더십',
    labelEn: 'Leadership',
    description: '목표 설정, 팀 이끌기, 의사결정, 동기부여',
    icon: '👑',
    worldKeys: ['selfDirected', 'relationship'],
    keywords: ['리더', '이끌', '결정', '목표', '팀', '주도'],
  },

  // 3. 생산성 및 성과
  productivity: {
    key: 'productivity',
    label: '생산성 및 성과',
    labelEn: 'Productivity & Performance',
    description: '효율적 업무 수행, 목표 달성, 결과 창출',
    icon: '📈',
    worldKeys: ['selfDirected', 'habit'],
    keywords: ['완료', '달성', '성과', '효율', '계획', '실행'],
  },

  // 4. 기술 및 역량
  skills: {
    key: 'skills',
    label: '기술 및 역량',
    labelEn: 'Skills & Capabilities',
    description: '전문 지식, 학습 능력, 문제해결력',
    icon: '🎯',
    worldKeys: ['cognition', 'selfDirected'],
    keywords: ['학습', '공부', '탐구', '분석', '이해', '지식'],
  },

  // 5. 협업 및 팀워크
  collaboration: {
    key: 'collaboration',
    label: '협업 및 팀워크',
    labelEn: 'Collaboration & Teamwork',
    description: '팀 협력, 공동 목표 달성, 시너지 창출',
    icon: '🤝',
    worldKeys: ['relationship', 'character'],
    keywords: ['협력', '팀', '함께', '도움', '모둠', '협동'],
  },

  // 6. 커뮤니케이션
  communication: {
    key: 'communication',
    label: '커뮤니케이션',
    labelEn: 'Communication',
    description: '명확한 의사 전달, 경청, 피드백 수용',
    icon: '💬',
    worldKeys: ['relationship', 'attitude'],
    keywords: ['소통', '대화', '발표', '경청', '표현', '전달'],
  },

  // 7. 적응력 및 유연성
  adaptability: {
    key: 'adaptability',
    label: '적응력 및 유연성',
    labelEn: 'Adaptability & Flexibility',
    description: '변화 대응, 새로운 환경 적응, 유연한 사고',
    icon: '🔄',
    worldKeys: ['attitude', 'cognition'],
    keywords: ['변화', '적응', '도전', '새로운', '극복', '전환'],
  },

  // 8. 자기관리
  selfManagement: {
    key: 'selfManagement',
    label: '자기관리',
    labelEn: 'Self-Management',
    description: '시간 관리, 스트레스 관리, 자기 동기부여',
    icon: '⏰',
    worldKeys: ['habit', 'selfDirected'],
    keywords: ['시간', '관리', '습관', '꾸준', '매일', '규칙'],
  },

  // 9. 문제해결력
  problemSolving: {
    key: 'problemSolving',
    label: '문제해결력',
    labelEn: 'Problem Solving',
    description: '문제 분석, 창의적 해결, 의사결정',
    icon: '💡',
    worldKeys: ['cognition', 'attitude'],
    keywords: ['문제', '해결', '분석', '방법', '찾', '시도'],
  },

  // 10. 성장 마인드셋
  growthMindset: {
    key: 'growthMindset',
    label: '성장 마인드셋',
    labelEn: 'Growth Mindset',
    description: '지속적 학습, 피드백 수용, 실패에서 배움',
    icon: '🌱',
    worldKeys: ['attitude', 'selfDirected'],
    keywords: ['성장', '배움', '발전', '개선', '노력', '도전'],
  },
} as const

export type ISOCriteriaKey = keyof typeof ISO_30414_CRITERIA

// 직무 카테고리
export const JOB_CATEGORIES = {
  tech: { key: 'tech', label: 'IT/개발', icon: '💻' },
  business: { key: 'business', label: '경영/기획', icon: '📊' },
  marketing: { key: 'marketing', label: '마케팅/홍보', icon: '📣' },
  design: { key: 'design', label: '디자인', icon: '🎨' },
  finance: { key: 'finance', label: '금융/회계', icon: '💰' },
  hr: { key: 'hr', label: '인사/총무', icon: '👥' },
  sales: { key: 'sales', label: '영업/서비스', icon: '🤝' },
  research: { key: 'research', label: '연구/R&D', icon: '🔬' },
} as const

export type JobCategory = keyof typeof JOB_CATEGORIES

// 이력서 리포트 요청
export interface ResumeReportRequest {
  jobCategory: JobCategory
  targetCompany?: string
  targetPosition?: string
  additionalInfo?: string
  focusSkills?: ISOCriteriaKey[]
}

// 월드 → ISO 역량 매핑
export function mapWorldToISO(worldKey: string): ISOCriteriaKey[] {
  const mapping: Record<string, ISOCriteriaKey[]> = {
    cognition: ['skills', 'problemSolving', 'adaptability'],
    selfDirected: ['leadership', 'productivity', 'selfManagement', 'skills'],
    habit: ['productivity', 'selfManagement', 'ethics'],
    attitude: ['adaptability', 'growthMindset', 'problemSolving', 'communication'],
    relationship: ['collaboration', 'communication', 'leadership'],
    character: ['ethics', 'collaboration'],
  }
  return mapping[worldKey] || []
}

// 서류용 문체 변환 (자기소개서/이력서 스타일)
export function convertToFormalStyle(text: string, type: 'resume' | 'school'): string {
  if (type === 'resume') {
    // 이력서/자기소개서 문체
    return text
      .replace(/했다/g, '하였습니다')
      .replace(/했습니다/g, '하였습니다')
      .replace(/됐다/g, '되었습니다')
      .replace(/했어요/g, '하였습니다')
      .replace(/- /g, '• ')
      .replace(/보였다/g, '보였습니다')
      .replace(/쌓았다/g, '쌓았습니다')
      .replace(/있다/g, '있습니다')
      .replace(/없다/g, '없습니다')
      .replace(/이다/g, '입니다')
  } else {
    // 학교 생활기록부 문체
    return text
      .replace(/했다/g, '하였음')
      .replace(/했습니다/g, '하였음')
      .replace(/됐다/g, '되었음')
      .replace(/있다/g, '있음')
      .replace(/없다/g, '없음')
      .replace(/이다/g, '임')
      .replace(/보였다/g, '보임')
      .replace(/- /g, '○ ')
  }
}

// 역량별 성장 스토리 생성
export function generateCompetencyStory(
  criteriaKey: ISOCriteriaKey,
  records: { executionText: string; date: string }[]
): string {
  const criteria = ISO_30414_CRITERIA[criteriaKey]

  if (records.length === 0) {
    return `${criteria.label} 영역에서의 활동 기록이 필요합니다.`
  }

  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date))
  const firstRecord = sortedRecords[0]
  const lastRecord = sortedRecords[sortedRecords.length - 1]
  const totalCount = records.length

  return `
### ${criteria.icon} ${criteria.label} (${criteria.labelEn})

**성장 기간**: ${firstRecord.date} ~ ${lastRecord.date}
**총 활동 횟수**: ${totalCount}회

**주요 활동 내역**:
${sortedRecords.slice(-5).map(r => `• ${r.executionText} (${r.date})`).join('\n')}

**역량 요약**:
${totalCount}회의 꾸준한 실천을 통해 ${criteria.description} 역량을 체계적으로 발전시켜 왔습니다.
`.trim()
}
