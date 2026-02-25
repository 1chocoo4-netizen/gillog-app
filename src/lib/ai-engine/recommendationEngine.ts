// ========================================
// AI 성장엔진 — 개입 추천 엔진
// 임계값 기반 자동 추천 생성
// ========================================

import type { DimensionKey, DimensionResult, Priority, RecommendationType, ResourceItem } from './types'
import { DIMENSION_META_MAP } from './types'

/** 추천 결과 아이템 */
export interface GeneratedRecommendation {
  dimension: DimensionKey
  dimensionScore: number
  type: RecommendationType
  priority: Priority
  title: string
  description: string
  resourceUrl?: string
}

// ========================================
// 내장 리소스 DB
// ========================================

const RESOURCE_DB: ResourceItem[] = [
  // 진로성숙도
  { dimension: 'careerMaturity', title: '커리어넷 진로적성검사', description: '자신의 진로 적성을 파악하는 온라인 검사', url: 'https://www.career.go.kr' },
  { dimension: 'careerMaturity', title: '진로탐색 활동지', description: '나의 강점과 흥미를 탐색하는 워크시트 활동' },
  { dimension: 'careerMaturity', title: '직업 체험 프로그램', description: '다양한 직업을 직접 체험해보는 프로그램' },

  // 자기주도학습
  { dimension: 'selfDirectedLearning', title: '자기주도학습 가이드', description: '효과적인 학습 계획 수립 및 실행 방법' },
  { dimension: 'selfDirectedLearning', title: '공부법 콘텐츠', description: '과학적으로 검증된 학습 전략과 기억법' },
  { dimension: 'selfDirectedLearning', title: '학습 플래너 활용법', description: '체계적인 학습 관리를 위한 플래너 사용 가이드' },

  // 행동지속률
  { dimension: 'behavioralPersistence', title: '습관의 힘 (도서)', description: '찰스 두히그의 습관 형성 원리 도서' },
  { dimension: 'behavioralPersistence', title: '66일 습관 챌린지', description: '66일간 하나의 습관을 만들어가는 챌린지 프로그램' },
  { dimension: 'behavioralPersistence', title: '작은 습관의 힘', description: '작은 변화부터 시작하는 습관 형성 전략' },

  // 공동체 기여도
  { dimension: 'communityContribution', title: '1365 봉사활동', description: '지역사회 봉사활동 참여 플랫폼', url: 'https://www.1365.go.kr' },
  { dimension: 'communityContribution', title: '또래 멘토링 프로그램', description: '또래 친구와 함께하는 학습 멘토링' },
  { dimension: 'communityContribution', title: '공감 소통 워크숍', description: '타인과의 효과적인 소통 기술 향상 프로그램' },

  // 진로목표 일관성
  { dimension: 'careerGoalConsistency', title: '진로 로드맵 작성', description: '단계별 진로 계획을 세우는 로드맵 워크시트' },
  { dimension: 'careerGoalConsistency', title: '비전보드 워크숍', description: '나의 미래 비전을 시각화하는 활동' },
  { dimension: 'careerGoalConsistency', title: '진로 포트폴리오', description: '진로 탐색 과정을 기록하는 포트폴리오 만들기' },
]

// ========================================
// 추천 생성 로직
// ========================================

/** 점수 → 우선순위 결정 */
function scoreToPriority(score: number): Priority | null {
  if (score >= 70) return null        // 양호 → 조치 없음
  if (score >= 50) return 'low'       // 모니터링
  if (score >= 30) return 'medium'    // 개입 필요
  return 'high'                       // 긴급
}

/** 차원별 코칭 조정 제안 생성 */
function generateCoachingAdjust(dim: DimensionKey, score: number, priority: Priority): GeneratedRecommendation {
  const meta = DIMENSION_META_MAP[dim]
  const urgency = priority === 'high' ? '긴급' : '권장'

  const adjustMap: Record<DimensionKey, string> = {
    careerMaturity: '진로 탐색 관련 질문을 더 자주 제시하고, 구체적 직업 체험 경험을 유도하세요.',
    selfDirectedLearning: '학습 계획 수립 질문을 강화하고, 자기 평가 활동을 추가하세요.',
    behavioralPersistence: '실행 목표를 작게 나누고, 달성 시 즉각적 피드백을 제공하세요.',
    communityContribution: '관계 형성 및 공동체 참여 관련 코칭 질문을 늘려주세요.',
    careerGoalConsistency: '진로 목표를 주기적으로 점검하고, 일관성 있는 실행 계획을 수립하도록 안내하세요.',
  }

  return {
    dimension: dim,
    dimensionScore: score,
    type: 'coaching_adjust',
    priority,
    title: `[${urgency}] ${meta.label} 코칭 방향 전환`,
    description: adjustMap[dim],
  }
}

/** 차원별 리소스 추천 생성 */
function generateResourceRecommendation(dim: DimensionKey, score: number, priority: Priority): GeneratedRecommendation {
  const resources = RESOURCE_DB.filter(r => r.dimension === dim)
  const resource = resources[Math.floor(Math.random() * resources.length)] || resources[0]
  const meta = DIMENSION_META_MAP[dim]

  return {
    dimension: dim,
    dimensionScore: score,
    type: 'resource',
    priority,
    title: `${meta.label} 향상 리소스: ${resource?.title ?? '추천 콘텐츠'}`,
    description: resource?.description ?? `${meta.label} 향상을 위한 추천 콘텐츠`,
    resourceUrl: resource?.url,
  }
}

/** 코치 플래그 생성 (긴급 상황) */
function generateCoachFlag(dim: DimensionKey, score: number): GeneratedRecommendation {
  const meta = DIMENSION_META_MAP[dim]
  return {
    dimension: dim,
    dimensionScore: score,
    type: 'coach_flag',
    priority: 'high',
    title: `⚠ ${meta.label} 관리 필요`,
    description: `${meta.label} 점수가 ${score}점으로 매우 낮습니다. 코치의 직접적인 개입이 필요합니다.`,
  }
}

/** 차원 결과로부터 추천 목록 생성 */
export function generateRecommendations(dimensions: DimensionResult): GeneratedRecommendation[] {
  const recommendations: GeneratedRecommendation[] = []
  const keys: DimensionKey[] = [
    'careerMaturity',
    'selfDirectedLearning',
    'behavioralPersistence',
    'communityContribution',
    'careerGoalConsistency',
  ]

  for (const dim of keys) {
    const score = dimensions[dim]
    const priority = scoreToPriority(score)

    if (priority === null) continue // 양호 → 스킵

    // 코칭 조정 제안 (모든 우선순위)
    recommendations.push(generateCoachingAdjust(dim, score, priority))

    // 리소스 추천 (medium 이상)
    if (priority === 'medium' || priority === 'high') {
      recommendations.push(generateResourceRecommendation(dim, score, priority))
    }

    // 코치 플래그 (high만)
    if (priority === 'high') {
      recommendations.push(generateCoachFlag(dim, score))
    }
  }

  return recommendations
}

/** 리소스 DB 조회 (차원별) */
export function getResourcesForDimension(dim: DimensionKey): ResourceItem[] {
  return RESOURCE_DB.filter(r => r.dimension === dim)
}
