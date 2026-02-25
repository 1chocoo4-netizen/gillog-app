// ========================================
// AI 성장엔진 — 자기주도학습지수 (Self-Directed Learning Index)
// 가중치: 일별실행일관성(30%) + cognition참여율(25%) + 학습설문(20%)
//         + 알람자기설정비율(15%) + 월드다양성(10%)
// ========================================

import { round2 } from '@/lib/research/longitudinalEngine'
import type { RawExecution, RawExecutionItem } from './types'

export interface SelfDirectedLearningInput {
  learningSurveyScore: number | null  // 학습 설문 점수 (0~100)
  history: RawExecution[]             // 전체 실행 기록
  executions: RawExecutionItem[]      // 현재 실행 항목
}

export function calcSelfDirectedLearningIndex(input: SelfDirectedLearningInput): {
  score: number
  signals: string[]
  breakdown: Record<string, number>
} {
  const signals: string[] = []

  // 1. 일별 실행 일관성 (30%) — 최근 30일 중 실행일 비율
  const now = Date.now()
  const d30 = 30 * 24 * 60 * 60 * 1000
  const recentDates = new Set(
    input.history
      .filter(h => now - new Date(h.date).getTime() <= d30)
      .map(h => h.date.slice(0, 10))
  )
  const consistencyScore = Math.min(100, (recentDates.size / 30) * 100)
  if (recentDates.size === 0) signals.push('최근 30일 실행 기록 없음')

  // 2. cognition 월드 참여율 (25%)
  const cognitionExecs = input.history.filter(h => h.worldKey === 'cognition')
  const totalExecs = input.history.length
  const cognitionRatio = totalExecs > 0 ? cognitionExecs.length / totalExecs : 0
  const cognitionScore = Math.min(100, cognitionRatio * 200)
  if (cognitionExecs.length === 0) signals.push('학습(cognition) 실행 없음')

  // 3. 학습 설문 점수 (20%)
  const surveyScore = input.learningSurveyScore ?? 50
  if (input.learningSurveyScore === null) signals.push('학습 설문 데이터 없음')

  // 4. 알람 자기 설정 비율 (15%)
  const totalItems = input.executions.length
  const alarmItems = input.executions.filter(e => e.alarmTime).length
  const alarmScore = totalItems > 0 ? (alarmItems / totalItems) * 100 : 50
  if (totalItems === 0) signals.push('실행 항목 없음')

  // 5. 월드 다양성 (10%) — 고유 월드 참여 수 / 전체 월드 수(6)
  const uniqueWorlds = new Set(input.history.map(h => h.worldKey)).size
  const diversityScore = Math.min(100, (uniqueWorlds / 6) * 100)

  const score = round2(
    consistencyScore * 0.30 +
    cognitionScore * 0.25 +
    surveyScore * 0.20 +
    alarmScore * 0.15 +
    diversityScore * 0.10
  )

  return {
    score: Math.min(100, Math.max(0, score)),
    signals,
    breakdown: {
      consistencyScore: round2(consistencyScore),
      cognitionScore: round2(cognitionScore),
      surveyScore: round2(surveyScore),
      alarmScore: round2(alarmScore),
      diversityScore: round2(diversityScore),
    },
  }
}
