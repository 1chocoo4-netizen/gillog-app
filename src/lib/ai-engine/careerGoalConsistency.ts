// ========================================
// AI 성장엔진 — 진로목표 일관성 (Career Goal Consistency)
// 가중치: 버킷리스트진로목표안정성(30%) + 월간목표진로정렬(30%)
//         + 진로실행분기별일관성(25%) + 설문진로점수궤적(15%)
// 코칭 데이터 있으면 기존 88% + 코칭 12% (sessionCompletionRate 50% + careerMention 50%)
// ========================================

import { round2 } from '@/lib/research/longitudinalEngine'
import { isCareerRelated } from './textAnalysis'
import type { RawExecution, BucketItem, MonthlyGoalItem } from './types'
import type { CoachingSignals } from '@/lib/coaching/coachingAnalyzer'

export interface CareerGoalConsistencyInput {
  history: RawExecution[]
  bucketList: BucketItem[]
  monthlyGoals: Record<string, MonthlyGoalItem[]>  // "2026-01" → goals
  careerSurveyScores: number[]  // 시간순 설문 진로 점수들
  coachingSignals?: CoachingSignals
}

export function calcCareerGoalConsistency(input: CareerGoalConsistencyInput): {
  score: number
  signals: string[]
  breakdown: Record<string, number>
} {
  const signals: string[] = []

  // 1. 버킷리스트 진로 목표 안정성 (30%)
  // 진로 관련 버킷이 있고 유지되는지
  const careerBuckets = input.bucketList.filter(b => isCareerRelated(b.text))
  const bucketStabilityScore = careerBuckets.length > 0
    ? Math.min(100, careerBuckets.length * 25)  // 4개 이상이면 100
    : 30 // 없으면 낮은 점수
  if (careerBuckets.length === 0) signals.push('진로 관련 버킷리스트 없음')

  // 2. 월간 목표 진로 정렬 (30%)
  // 각 월의 목표 중 진로 관련 비율
  const monthKeys = Object.keys(input.monthlyGoals).sort()
  let careerGoalMonths = 0
  for (const mk of monthKeys) {
    const goals = input.monthlyGoals[mk]
    const hasCareer = goals.some(g => isCareerRelated(g.text))
    if (hasCareer) careerGoalMonths++
  }
  const monthlyAlignScore = monthKeys.length > 0
    ? (careerGoalMonths / monthKeys.length) * 100
    : 50
  if (monthKeys.length === 0) signals.push('월간 목표 데이터 없음')
  if (monthKeys.length >= 3 && careerGoalMonths === monthKeys.length) {
    signals.push('매월 진로 목표 설정 중')
  }

  // 3. 진로 실행 분기별 일관성 (25%)
  // 분기별 selfDirected 실행 비율 편차
  const careerExecs = input.history.filter(h => h.worldKey === 'selfDirected')
  const quarterCounts: Record<string, number> = {}
  for (const h of careerExecs) {
    const d = new Date(h.date)
    const q = `${d.getFullYear()}-Q${Math.ceil((d.getMonth() + 1) / 3)}`
    quarterCounts[q] = (quarterCounts[q] || 0) + 1
  }
  const quarters = Object.values(quarterCounts)
  let quarterConsistencyScore = 50
  if (quarters.length >= 2) {
    const avg = quarters.reduce((a, b) => a + b, 0) / quarters.length
    const variance = quarters.reduce((s, v) => s + (v - avg) ** 2, 0) / quarters.length
    const cv = avg > 0 ? Math.sqrt(variance) / avg : 1  // 변동계수
    quarterConsistencyScore = Math.max(0, 100 - cv * 100) // CV가 낮을수록 일관
  } else if (quarters.length === 1) {
    quarterConsistencyScore = 60  // 1분기만 있으면 중간
  } else {
    signals.push('분기별 진로 실행 데이터 부족')
  }

  // 4. 설문 진로 점수 궤적 (15%)
  // 시간에 따른 진로 점수 추세 (안정적이면 높은 점수)
  let trajectoryScore = 50
  if (input.careerSurveyScores.length >= 2) {
    const scores = input.careerSurveyScores
    const diffs = scores.slice(1).map((s, i) => s - scores[i])
    const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length
    // 안정적(변화 작음)이면 높은 점수, 급격히 하락하면 낮은 점수
    if (Math.abs(avgDiff) < 5) {
      trajectoryScore = 80  // 안정적
    } else if (avgDiff > 0) {
      trajectoryScore = 90  // 상승 추세
    } else {
      trajectoryScore = Math.max(20, 80 + avgDiff)  // 하락 추세
    }
  } else {
    if (input.careerSurveyScores.length === 0) signals.push('진로 설문 이력 없음')
  }

  const baseScore = round2(
    bucketStabilityScore * 0.30 +
    monthlyAlignScore * 0.30 +
    quarterConsistencyScore * 0.25 +
    trajectoryScore * 0.15
  )

  // 코칭 데이터 12% 가중치: sessionCompletionRate(50%) + careerMention(50%)
  const cs = input.coachingSignals
  let score: number
  if (cs && cs.sessionCount > 0) {
    const coachingScore = cs.sessionCompletionRate * 0.5 + cs.careerMention * 0.5
    score = round2(baseScore * 0.88 + coachingScore * 0.12)
    signals.push(`코칭 데이터 반영 (${cs.sessionCount}세션)`)
  } else {
    score = baseScore
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    signals,
    breakdown: {
      bucketStabilityScore: round2(bucketStabilityScore),
      monthlyAlignScore: round2(monthlyAlignScore),
      quarterConsistencyScore: round2(quarterConsistencyScore),
      trajectoryScore: round2(trajectoryScore),
      ...(cs && cs.sessionCount > 0 ? { coachingScore: round2(cs.sessionCompletionRate * 0.5 + cs.careerMention * 0.5) } : {}),
    },
  }
}
