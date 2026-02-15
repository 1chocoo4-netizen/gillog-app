// ========================================
// 25개 하위역량 프레임워크 정의
// 5개 영역 x 5개 하위역량
// ========================================

/** 연구 영역 키 */
export type ResearchArea = 'career' | 'community' | 'nonCognitive' | 'learning' | 'habit'

/** 하위역량 ID */
export type SubCompetencyId =
  | 'C1' | 'C2' | 'C3' | 'C4' | 'C5'
  | 'M1' | 'M2' | 'M3' | 'M4' | 'M5'
  | 'N1' | 'N2' | 'N3' | 'N4' | 'N5'
  | 'L1' | 'L2' | 'L3' | 'L4' | 'L5'
  | 'H1' | 'H2' | 'H3' | 'H4' | 'H5'

/** 행동 지표 데이터 단위 */
export type MetricUnit = 'count' | 'ratio' | 'days' | 'diversity' | 'chars'

/** 하위역량 정의 */
export interface SubCompetency {
  id: SubCompetencyId
  area: ResearchArea
  label: string
  definition: string
  surveyQuestionIds: string[]  // 매핑되는 설문 문항 ID
  behavioralMetric: string     // 행동 로그 지표 설명
  metricUnit: MetricUnit
}

/** 연구 영역 정의 */
export interface ResearchAreaDef {
  key: ResearchArea
  label: string
  worldKeys: string[]  // 매핑되는 월드 키
  theory: string
  subCompetencies: SubCompetencyId[]
}

// ========================================
// 연구 영역 → 월드 매핑
// ========================================

export const RESEARCH_AREAS: ResearchAreaDef[] = [
  {
    key: 'career',
    label: '진로',
    worldKeys: ['selfDirected'],
    theory: 'Super 진로발달이론, SCCT',
    subCompetencies: ['C1', 'C2', 'C3', 'C4', 'C5'],
  },
  {
    key: 'community',
    label: '공동체',
    worldKeys: ['relationship'],
    theory: 'CASEL 사회정서학습, Bronfenbrenner',
    subCompetencies: ['M1', 'M2', 'M3', 'M4', 'M5'],
  },
  {
    key: 'nonCognitive',
    label: '인성',
    worldKeys: ['character', 'attitude'],
    theory: 'Lickona 인성교육론, Seligman VIA',
    subCompetencies: ['N1', 'N2', 'N3', 'N4', 'N5'],
  },
  {
    key: 'learning',
    label: '학습',
    worldKeys: ['cognition'],
    theory: 'Zimmerman 자기조절학습, Flavell 메타인지',
    subCompetencies: ['L1', 'L2', 'L3', 'L4', 'L5'],
  },
  {
    key: 'habit',
    label: '습관',
    worldKeys: ['habit'],
    theory: 'Lally 습관형성이론, SDT',
    subCompetencies: ['H1', 'H2', 'H3', 'H4', 'H5'],
  },
]

/** 영역 키 → 월드 키 매핑 (빠른 조회용) */
export const AREA_TO_WORLDS: Record<ResearchArea, string[]> = {
  career: ['selfDirected'],
  community: ['relationship'],
  nonCognitive: ['character', 'attitude'],
  learning: ['cognition'],
  habit: ['habit'],
}

/** 월드 키 → 영역 키 역매핑 */
export const WORLD_TO_AREA: Record<string, ResearchArea> = {
  selfDirected: 'career',
  relationship: 'community',
  character: 'nonCognitive',
  attitude: 'nonCognitive',
  cognition: 'learning',
  habit: 'habit',
}

// ========================================
// 25개 하위역량 정의
// ========================================

export const SUB_COMPETENCIES: SubCompetency[] = [
  // ===== 진로 (Career) =====
  {
    id: 'C1', area: 'career', label: '자기이해',
    definition: '자신의 흥미/강점/약점을 인식하고 진로와 연결하는 능력',
    surveyQuestionIds: ['c1', 'c2'],
    behavioralMetric: 'selfDirected 성찰 기록 작성 빈도',
    metricUnit: 'count',
  },
  {
    id: 'C2', area: 'career', label: '진로탐색',
    definition: '다양한 직업과 진로 경로를 능동적으로 탐색하는 행동',
    surveyQuestionIds: ['c3', 'c9'],
    behavioralMetric: 'selfDirected 실행 텍스트 다양성',
    metricUnit: 'diversity',
  },
  {
    id: 'C3', area: 'career', label: '진로설계',
    definition: '구체적 진로 목표를 설정하고 단계적 계획을 수립하는 능력',
    surveyQuestionIds: ['c5', 'c7'],
    behavioralMetric: 'selfDirected 실행 연속일(streak)',
    metricUnit: 'days',
  },
  {
    id: 'C4', area: 'career', label: '진로경험',
    definition: '진로 관련 정보를 탐색하고 실제 경험을 쌓는 행동',
    surveyQuestionIds: ['c4', 'c6'],
    behavioralMetric: 'selfDirected 실행 총 횟수',
    metricUnit: 'count',
  },
  {
    id: 'C5', area: 'career', label: '진로실행',
    definition: '설정한 진로 목표를 실제 행동으로 옮기고 자신감을 갖는 역량',
    surveyQuestionIds: ['c8', 'c10'],
    behavioralMetric: 'selfDirected 실행 완료율',
    metricUnit: 'ratio',
  },

  // ===== 공동체 (Community) =====
  {
    id: 'M1', area: 'community', label: '대인관계',
    definition: '또래와 원만한 관계를 형성하고 도움을 주고받는 능력',
    surveyQuestionIds: ['m1', 'm4'],
    behavioralMetric: 'relationship 실행 등록 빈도',
    metricUnit: 'count',
  },
  {
    id: 'M2', area: 'community', label: '공감/존중',
    definition: '타인의 입장을 이해하고 의견을 존중하는 태도',
    surveyQuestionIds: ['m2', 'm6'],
    behavioralMetric: '느낀것 기록 작성 빈도',
    metricUnit: 'count',
  },
  {
    id: 'M3', area: 'community', label: '참여/협력',
    definition: '공동체 활동에 적극 참여하고 협력하는 행동',
    surveyQuestionIds: ['m3', 'm9'],
    behavioralMetric: 'relationship 실행 완료 횟수',
    metricUnit: 'count',
  },
  {
    id: 'M4', area: 'community', label: '갈등해결',
    definition: '갈등 상황에서 대화로 해결하고 규칙을 준수하는 능력',
    surveyQuestionIds: ['m7', 'm5'],
    behavioralMetric: '놓친것 기록 작성 빈도(실패 성찰)',
    metricUnit: 'count',
  },
  {
    id: 'M5', area: 'community', label: '시민의식',
    definition: '지역사회에 관심을 갖고 공정과 정의를 추구하는 태도',
    surveyQuestionIds: ['m8', 'm10'],
    behavioralMetric: 'relationship 실행 텍스트 다양성',
    metricUnit: 'diversity',
  },

  // ===== 인성 (NonCognitive) =====
  {
    id: 'N1', area: 'nonCognitive', label: '끈기/인내',
    definition: '어려움에도 포기하지 않고 꾸준히 노력하는 역량',
    surveyQuestionIds: ['n1', 'n9'],
    behavioralMetric: '전체 실행 최장 연속일(longestStreak)',
    metricUnit: 'days',
  },
  {
    id: 'N2', area: 'nonCognitive', label: '자기주도',
    definition: '스스로 계획을 세우고 해야 할 일을 수행하는 능력',
    surveyQuestionIds: ['n2', 'n6'],
    behavioralMetric: '알람/일일반복 설정 비율',
    metricUnit: 'ratio',
  },
  {
    id: 'N3', area: 'nonCognitive', label: '정서조절',
    definition: '감정을 적절히 조절하고 스트레스를 관리하는 능력',
    surveyQuestionIds: ['n3', 'n8'],
    behavioralMetric: 'attitude+character 정서 관련 기록 빈도',
    metricUnit: 'count',
  },
  {
    id: 'N4', area: 'nonCognitive', label: '도전정신',
    definition: '새로운 것에 도전하고 실패 후 재시도하는 태도',
    surveyQuestionIds: ['n4', 'n5'],
    behavioralMetric: '신규 영역 시도 빈도(worldKey 수)',
    metricUnit: 'count',
  },
  {
    id: 'N5', area: 'nonCognitive', label: '자기존중',
    definition: '자신을 소중히 여기고 성장 가능성을 믿는 태도',
    surveyQuestionIds: ['n7', 'n10'],
    behavioralMetric: '전체 활동 지속 기간(일수)',
    metricUnit: 'days',
  },

  // ===== 학습 (Learning) =====
  {
    id: 'L1', area: 'learning', label: '학습동기',
    definition: '배움 자체에 즐거움과 호기심을 갖는 내적 동기',
    surveyQuestionIds: ['l1', 'l9'],
    behavioralMetric: 'cognition 실행 등록 빈도',
    metricUnit: 'count',
  },
  {
    id: 'L2', area: 'learning', label: '자기주도학습',
    definition: '스스로 학습 계획을 세우고 실천하는 능력',
    surveyQuestionIds: ['l2', 'l7'],
    behavioralMetric: 'cognition 자기주도적 등록 비율',
    metricUnit: 'ratio',
  },
  {
    id: 'L3', area: 'learning', label: '학습집중',
    definition: '학습에 집중하고 어려운 문제에도 끝까지 도전하는 행동',
    surveyQuestionIds: ['l3', 'l6'],
    behavioralMetric: 'cognition 실행 연속일(streak)',
    metricUnit: 'days',
  },
  {
    id: 'L4', area: 'learning', label: '메타인지',
    definition: '자신의 학습 방법을 이해하고 실수에서 배우는 능력',
    surveyQuestionIds: ['l4', 'l8'],
    behavioralMetric: '배운것 기록 텍스트 평균 길이',
    metricUnit: 'chars',
  },
  {
    id: 'L5', area: 'learning', label: '지식전이',
    definition: '배운 내용을 타인에게 설명하고 실생활에 적용하는 능력',
    surveyQuestionIds: ['l5', 'l10'],
    behavioralMetric: 'cognition 하위과목 다양성',
    metricUnit: 'diversity',
  },

  // ===== 습관 (Habit) =====
  {
    id: 'H1', area: 'habit', label: '생활규칙',
    definition: '일정한 시간에 생활하고 규칙적 일과를 유지하는 능력',
    surveyQuestionIds: ['h1', 'h2'],
    behavioralMetric: '일일반복 실행 비율',
    metricUnit: 'ratio',
  },
  {
    id: 'H2', area: 'habit', label: '실행력',
    definition: '해야 할 일을 미루지 않고 매일 꾸준히 실행하는 역량',
    surveyQuestionIds: ['h3', 'h6'],
    behavioralMetric: 'habit 실행 완료율',
    metricUnit: 'ratio',
  },
  {
    id: 'H3', area: 'habit', label: '건강관리',
    definition: '운동/활동과 환경 정리를 통해 건강을 유지하는 행동',
    surveyQuestionIds: ['h4', 'h5'],
    behavioralMetric: 'habit 실행 총 빈도',
    metricUnit: 'count',
  },
  {
    id: 'H4', area: 'habit', label: '자기통제',
    definition: '나쁜 습관을 고치고 디지털 사용을 조절하는 능력',
    surveyQuestionIds: ['h7', 'h9'],
    behavioralMetric: '놓친것 기록 후 다음날 실행 재개 비율',
    metricUnit: 'ratio',
  },
  {
    id: 'H5', area: 'habit', label: '습관유지',
    definition: '약속을 지키고 좋은 습관을 장기간 유지하는 역량',
    surveyQuestionIds: ['h8', 'h10'],
    behavioralMetric: 'habit streak + 활동 지속 일수',
    metricUnit: 'days',
  },
]

/** 영역별 하위역량 빠른 조회 */
export const SUB_COMPETENCIES_BY_AREA: Record<ResearchArea, SubCompetency[]> = {
  career: SUB_COMPETENCIES.filter(s => s.area === 'career'),
  community: SUB_COMPETENCIES.filter(s => s.area === 'community'),
  nonCognitive: SUB_COMPETENCIES.filter(s => s.area === 'nonCognitive'),
  learning: SUB_COMPETENCIES.filter(s => s.area === 'learning'),
  habit: SUB_COMPETENCIES.filter(s => s.area === 'habit'),
}

/** ID로 하위역량 조회 */
export function getSubCompetency(id: SubCompetencyId): SubCompetency | undefined {
  return SUB_COMPETENCIES.find(s => s.id === id)
}

/** 설문 문항에서 하위역량별 점수 산출 (리커트 5점 → 0~100) */
export function calcSubCompetencySurveyScore(
  answers: Record<string, number>,
  subComp: SubCompetency,
): number | null {
  const scores = subComp.surveyQuestionIds
    .map(qid => answers[qid])
    .filter((v): v is number => v != null)

  if (scores.length === 0) return null
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  // 리커트 1~5 → 0~100 변환
  return ((avg - 1) / 4) * 100
}

// ========================================
// 마일스톤 상수
// ========================================

export const RESEARCH_MILESTONES = [1, 100, 500, 1000] as const

/** 마일스톤별 정규화 기준값 */
export const NORMALIZATION_BENCHMARKS: Record<number, {
  countBase: number
  daysBase: number
  charsBase: number
}> = {
  1: { countBase: 1, daysBase: 1, charsBase: 20 },
  100: { countBase: 30, daysBase: 30, charsBase: 50 },
  500: { countBase: 100, daysBase: 90, charsBase: 80 },
  1000: { countBase: 200, daysBase: 180, charsBase: 100 },
}
