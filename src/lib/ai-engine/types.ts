// ========================================
// AI 성장엔진 — 타입 정의
// ========================================

/** 5개 메타 차원 키 */
export type DimensionKey =
  | 'careerMaturity'
  | 'selfDirectedLearning'
  | 'behavioralPersistence'
  | 'communityContribution'
  | 'careerGoalConsistency'

/** 차원별 결과 */
export interface DimensionResult {
  careerMaturity: number
  selfDirectedLearning: number
  behavioralPersistence: number
  communityContribution: number
  careerGoalConsistency: number
  overallScore: number
  trend: 'improving' | 'declining' | 'stable'
  signals: Record<DimensionKey, string[]>
}

/** 추천 유형 */
export type RecommendationType = 'coaching_adjust' | 'resource' | 'coach_flag'

/** 우선순위 */
export type Priority = 'high' | 'medium' | 'low'

/** 추천 규칙 */
export interface RecommendationRule {
  dimension: DimensionKey
  threshold: number
  priority: Priority
  type: RecommendationType
  title: string
  description: string
  resourceUrl?: string
}

/** 리소스 아이템 */
export interface ResourceItem {
  title: string
  description: string
  url?: string
  dimension: DimensionKey
}

/** 차원 메타 정보 */
export interface DimensionMeta {
  key: DimensionKey
  label: string
  color: string
  description: string
}

/** 5개 차원 메타 정의 */
export const DIMENSION_META: DimensionMeta[] = [
  {
    key: 'careerMaturity',
    label: '진로성숙도',
    color: '#3B82F6',
    description: '진로에 대한 준비도와 탐색 수준',
  },
  {
    key: 'selfDirectedLearning',
    label: '자기주도학습',
    color: '#8B5CF6',
    description: '자기 주도적 학습 및 참여 수준',
  },
  {
    key: 'behavioralPersistence',
    label: '행동지속률',
    color: '#F59E0B',
    description: '꾸준한 실행과 습관 유지 정도',
  },
  {
    key: 'communityContribution',
    label: '공동체 기여도',
    color: '#22C55E',
    description: '공동체 활동 참여와 관계 기여 수준',
  },
  {
    key: 'careerGoalConsistency',
    label: '진로목표 일관성',
    color: '#EC4899',
    description: '진로 목표의 안정성과 정렬도',
  },
]

/** 차원 키 → 메타 빠른 조회 */
export const DIMENSION_META_MAP: Record<DimensionKey, DimensionMeta> = Object.fromEntries(
  DIMENSION_META.map(m => [m.key, m])
) as Record<DimensionKey, DimensionMeta>

/** 모든 차원 키 배열 */
export const ALL_DIMENSION_KEYS: DimensionKey[] = [
  'careerMaturity',
  'selfDirectedLearning',
  'behavioralPersistence',
  'communityContribution',
  'careerGoalConsistency',
]

/** 실행 기록 (UserData.history 파싱용) */
export interface RawExecution {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  executionText?: string
  energy?: number
  groupId?: string
}

/** 실행 항목 (UserData.executions 파싱용) */
export interface RawExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  text: string
  completed: boolean
  createdAt: string
  alarmTime?: string
  isDaily?: boolean
  lastCompletedDate?: string
}

/** 버킷리스트 아이템 */
export interface BucketItem {
  id: string
  text: string
  areaKey?: string
  completed?: boolean
  createdAt?: string
}

/** 월간목표 아이템 */
export interface MonthlyGoalItem {
  text: string
  areaKey?: string
  completed?: boolean
}
