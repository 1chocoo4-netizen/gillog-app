// ========================================
// AI 성장엔진 — 행동지속률 (Behavioral Persistence Rate)
// 가중치: 최장연속실행(25%) + 일일과제완료율30일(25%)
//         + 월간목표달성률(20%) + 실행갭빈도역수(15%) + habit월드지속(15%)
// 코칭 데이터 있으면 기존 88% + 코칭 12% (actionCommitment 40% + sessionFrequency 30% + persistenceMention 30%)
// ========================================

import { round2 } from '@/lib/research/longitudinalEngine'
import type { RawExecution, RawExecutionItem, MonthlyGoalItem } from './types'
import type { CoachingSignals } from '@/lib/coaching/coachingAnalyzer'

export interface BehavioralPersistenceInput {
  history: RawExecution[]
  executions: RawExecutionItem[]
  monthlyGoals: Record<string, MonthlyGoalItem[]>  // "2026-01" → goals
  coachingSignals?: CoachingSignals
}

/** 연속 실행일 계산 */
function calcLongestStreak(history: RawExecution[]): number {
  if (history.length === 0) return 0
  const dates = [...new Set(history.map(h => h.date.slice(0, 10)))].sort()
  if (dates.length === 0) return 0

  let longest = 1
  let current = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diff = Math.round((curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 1) {
      current++
    } else {
      longest = Math.max(longest, current)
      current = 1
    }
  }
  return Math.max(longest, current)
}

/** 실행 갭(2일 이상 공백) 빈도 */
function calcGapCount(history: RawExecution[]): number {
  const dates = [...new Set(history.map(h => h.date.slice(0, 10)))].sort()
  let gaps = 0
  for (let i = 1; i < dates.length; i++) {
    const diff = Math.round(
      (new Date(dates[i]).getTime() - new Date(dates[i - 1]).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diff >= 2) gaps++
  }
  return gaps
}

export function calcBehavioralPersistenceRate(input: BehavioralPersistenceInput): {
  score: number
  signals: string[]
  breakdown: Record<string, number>
} {
  const signals: string[] = []

  // 1. 최장 연속 실행 (25%) — 30일 기준 정규화
  const longestStreak = calcLongestStreak(input.history)
  const streakScore = Math.min(100, (longestStreak / 30) * 100)
  if (longestStreak === 0) signals.push('연속 실행 기록 없음')
  if (longestStreak >= 14) signals.push(`우수한 연속실행: ${longestStreak}일`)

  // 2. 일일과제 완료율 (최근 30일) (25%)
  const now = Date.now()
  const d30 = 30 * 24 * 60 * 60 * 1000
  const dailyExecs = input.executions.filter(e => e.isDaily)
  const recentCompleted = dailyExecs.filter(e => {
    if (!e.lastCompletedDate) return false
    return now - new Date(e.lastCompletedDate).getTime() <= d30
  }).length
  const dailyCompletionScore = dailyExecs.length > 0
    ? (recentCompleted / dailyExecs.length) * 100
    : 50
  if (dailyExecs.length === 0) signals.push('일일반복 과제 없음')

  // 3. 월간목표 달성률 (20%)
  const allGoals = Object.values(input.monthlyGoals).flat()
  const completedGoals = allGoals.filter(g => g.completed).length
  const goalScore = allGoals.length > 0
    ? (completedGoals / allGoals.length) * 100
    : 50
  if (allGoals.length === 0) signals.push('월간 목표 없음')

  // 4. 실행 갭 빈도 역수 (15%) — 갭이 적을수록 높은 점수
  const gapCount = calcGapCount(input.history)
  const activeDays = new Set(input.history.map(h => h.date.slice(0, 10))).size
  const gapInverseScore = activeDays > 0
    ? Math.max(0, 100 - (gapCount / activeDays) * 200)
    : 50
  if (gapCount > 5) signals.push(`실행 공백 ${gapCount}회 감지`)

  // 5. habit 월드 지속 (15%)
  const habitExecs = input.history.filter(h => h.worldKey === 'habit')
  const habitDates = new Set(habitExecs.map(h => h.date.slice(0, 10)))
  const habitStreakScore = habitDates.size > 0
    ? Math.min(100, (habitDates.size / 30) * 100)
    : 50
  if (habitExecs.length === 0) signals.push('습관 월드 실행 없음')

  const baseScore = round2(
    streakScore * 0.25 +
    dailyCompletionScore * 0.25 +
    goalScore * 0.20 +
    gapInverseScore * 0.15 +
    habitStreakScore * 0.15
  )

  // 코칭 데이터 12% 가중치: actionCommitment(40%) + sessionFrequency(30%) + persistenceMention(30%)
  const cs = input.coachingSignals
  let score: number
  if (cs && cs.sessionCount > 0) {
    const coachingScore = cs.actionCommitment * 0.4 + cs.sessionFrequency * 0.3 + cs.persistenceMention * 0.3
    score = round2(baseScore * 0.88 + coachingScore * 0.12)
    signals.push(`코칭 데이터 반영 (${cs.sessionCount}세션)`)
  } else {
    score = baseScore
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    signals,
    breakdown: {
      streakScore: round2(streakScore),
      dailyCompletionScore: round2(dailyCompletionScore),
      goalScore: round2(goalScore),
      gapInverseScore: round2(gapInverseScore),
      habitStreakScore: round2(habitStreakScore),
      ...(cs && cs.sessionCount > 0 ? { coachingScore: round2(cs.actionCommitment * 0.4 + cs.sessionFrequency * 0.3 + cs.persistenceMention * 0.3) } : {}),
    },
  }
}
