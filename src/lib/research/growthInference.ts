// ========================================
// 성장 추론 엔진
// 4대 추론 지표 + 성장 상태 분류
// ========================================

import { mean, sd, round2 } from './longitudinalEngine'
import { WORLD_TO_AREA, type ResearchArea } from './competencyFramework'

// ========================================
// Types
// ========================================

export type GrowthState =
  | '감정 과부하'
  | '동기-실행 괴리'
  | '회복 중'
  | '급성장'
  | '정체기'
  | '안정적 성장'

export interface FailureEvent {
  gapStart: string   // ISO date 'YYYY-MM-DD'
  gapEnd: string
  gapDays: number
  recoveryDays: number
  recoveryScore: number
}

export interface RecoveryCurvePoint {
  month: string        // "2024-01"
  avgRecoveryDays: number
  count: number
}

export interface InferenceResult {
  selfRegulationIndex: number          // 0~100
  executionResilienceIndex: number     // 0~100
  valueActionAlignment: number | null  // 0~100 or null
  recoveryCurveScore: number           // 0~100
  recoveryCurveTrend: 'improving' | 'declining' | 'stable'
  recoveryCurveData: RecoveryCurvePoint[]
  growthState: GrowthState
  growthStateReason: string
  failureEvents: FailureEvent[]
  signals: string[]
}

// ========================================
// 한국어 키워드 분류기 (목표 텍스트 → worldKey)
// ========================================

const AREA_KEYWORDS: Record<string, string[]> = {
  cognition: ['공부', '수학', '영어', '과학', '국어', '시험', '성적', '학습', '독서', '책'],
  selfDirected: ['진로', '꿈', '목표', '계획', '자격증', '대학', '미래', '취업'],
  habit: ['운동', '기상', '루틴', '정리', '청소', '식단', '수면', '일찍'],
  attitude: ['감사', '긍정', '인내', '끈기', '도전', '태도', '마음'],
  relationship: ['친구', '가족', '봉사', '소통', '대화', '관계', '선생님'],
  character: ['정직', '약속', '예의', '배려', '존중', '책임', '성실'],
}

export function classifyGoalArea(text: string): string | null {
  const counts: Record<string, number> = {}
  for (const [area, keywords] of Object.entries(AREA_KEYWORDS)) {
    let count = 0
    for (const kw of keywords) {
      if (text.includes(kw)) count++
    }
    if (count > 0) counts[area] = count
  }
  if (Object.keys(counts).length === 0) return null
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

// ========================================
// 목표 기반 영역 점수 추론
// ========================================

export interface GoalItem {
  text: string
  areaKey?: string  // 유저가 직접 선택한 영역 (worldKey)
}

export function deriveGoalAreaScores(goals: GoalItem[]): SurveyScores | null {
  const areaCounts: Record<ResearchArea, number> = {
    career: 0, community: 0, nonCognitive: 0, learning: 0, habit: 0,
  }

  let classified = 0
  for (const goal of goals) {
    const worldKey = goal.areaKey || classifyGoalArea(goal.text)
    if (!worldKey) continue
    const area = WORLD_TO_AREA[worldKey]
    if (!area) continue
    areaCounts[area]++
    classified++
  }

  if (classified === 0) return null

  // 빈도 → 0~100 정규화
  const max = Math.max(...Object.values(areaCounts), 1)
  return {
    career: Math.round((areaCounts.career / max) * 100),
    community: Math.round((areaCounts.community / max) * 100),
    nonCognitive: Math.round((areaCounts.nonCognitive / max) * 100),
    learning: Math.round((areaCounts.learning / max) * 100),
    habit: Math.round((areaCounts.habit / max) * 100),
  }
}

// ========================================
// Input types
// ========================================

export interface CheckinRecord {
  userId: string
  mood: number
  energy: number
  createdAt: string | Date
}

export interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
}

export interface SurveyScores {
  career: number
  community: number
  nonCognitive: number
  learning: number
  habit: number
}

// ========================================
// 1. 자기조절지수 (Self-Regulation Index)
// ========================================

export function calcSelfRegulationIndex(
  checkins: CheckinRecord[],
  executionDates: Set<string>,
): number {
  if (checkins.length === 0) return 0

  const checkinsByDate: Record<string, { mood: number; energy: number }> = {}
  for (const c of checkins) {
    const d = new Date(c.createdAt).toISOString().slice(0, 10)
    checkinsByDate[d] = { mood: c.mood, energy: c.energy }
  }

  // 1) 기분 나쁜 날(mood<=2)에도 실행한 비율 → 50% 가중
  const badMoodDays = Object.entries(checkinsByDate).filter(([, v]) => v.mood <= 2)
  const badMoodExecuted = badMoodDays.filter(([d]) => executionDates.has(d))
  const badMoodRatio = badMoodDays.length > 0
    ? badMoodExecuted.length / badMoodDays.length
    : 0.5 // 나쁜 날 없으면 중립

  // 2) 에너지 낮은 날(energy<=2)에도 실행한 비율 → 30% 가중
  const lowEnergyDays = Object.entries(checkinsByDate).filter(([, v]) => v.energy <= 2)
  const lowEnergyExecuted = lowEnergyDays.filter(([d]) => executionDates.has(d))
  const lowEnergyRatio = lowEnergyDays.length > 0
    ? lowEnergyExecuted.length / lowEnergyDays.length
    : 0.5

  // 3) 기분 변동성(sd, 낮을수록 안정) → 20% 가중
  const moods = checkins.map(c => c.mood)
  const moodSd = sd(moods)
  const stabilityScore = Math.max(0, 1 - moodSd / 2)

  const score = badMoodRatio * 50 + lowEnergyRatio * 30 + stabilityScore * 20
  return round2(Math.min(100, Math.max(0, score)))
}

// ========================================
// 2. 실행탄력성지수 (Execution Resilience Index)
// ========================================

export function detectFailureEvents(executionDates: string[]): FailureEvent[] {
  if (executionDates.length < 2) return []

  const sorted = [...executionDates].sort()
  const events: FailureEvent[] = []

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i])
    const next = new Date(sorted[i + 1])
    const gapDays = Math.round((next.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))

    if (gapDays >= 2) {
      const recoveryScore = Math.max(0, 100 - (gapDays - 2) * 10)
      events.push({
        gapStart: sorted[i],
        gapEnd: sorted[i + 1],
        gapDays,
        recoveryDays: gapDays,
        recoveryScore,
      })
    }
  }

  return events
}

export function calcExecutionResilienceIndex(failureEvents: FailureEvent[]): number {
  if (failureEvents.length === 0) return 80 // 꾸준하지만 탄력성 미검증
  const avg = mean(failureEvents.map(e => e.recoveryScore))
  return round2(Math.min(100, Math.max(0, avg)))
}

// ========================================
// 3. 가치-행동 일치도 (Value-Action Alignment)
// ========================================

export function calcValueActionAlignment(
  surveyScores: SurveyScores | null,
  executionWorldKeys: string[],
): number | null {
  if (!surveyScores) return null

  const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']

  // 설문 점수 → 순위
  const surveyValues = areas.map(a => surveyScores[a])
  const surveyRanks = rankArray(surveyValues)

  // 실행 기록 worldKey → 영역별 실행 횟수 → 순위
  const areaCounts: Record<ResearchArea, number> = {
    career: 0, community: 0, nonCognitive: 0, learning: 0, habit: 0,
  }
  for (const wk of executionWorldKeys) {
    const area = WORLD_TO_AREA[wk]
    if (area) areaCounts[area]++
  }
  const execValues = areas.map(a => areaCounts[a])
  const execRanks = rankArray(execValues)

  // Spearman 순위상관계수: rho = 1 - 6*sum(d^2) / (n*(n^2 - 1))
  const n = 5
  let sumD2 = 0
  for (let i = 0; i < n; i++) {
    sumD2 += (surveyRanks[i] - execRanks[i]) ** 2
  }
  const rho = 1 - (6 * sumD2) / (n * (n * n - 1))

  // [-1, 1] → [0, 100]
  const score = ((rho + 1) / 2) * 100
  return round2(Math.min(100, Math.max(0, score)))
}

function rankArray(values: number[]): number[] {
  const indexed = values.map((v, i) => ({ v, i }))
  indexed.sort((a, b) => b.v - a.v) // 내림차순
  const ranks = new Array(values.length)
  for (let r = 0; r < indexed.length; r++) {
    ranks[indexed[r].i] = r + 1
  }
  return ranks
}

// ========================================
// 4. 회복탄성 변화곡선 (Recovery Resilience Curve)
// ========================================

export function calcRecoveryCurve(failureEvents: FailureEvent[]): {
  score: number
  trend: 'improving' | 'declining' | 'stable'
  data: RecoveryCurvePoint[]
} {
  if (failureEvents.length === 0) {
    return { score: 50, trend: 'stable', data: [] }
  }

  // 월별 평균 회복일수
  const byMonth: Record<string, number[]> = {}
  for (const ev of failureEvents) {
    const month = ev.gapEnd.slice(0, 7)
    if (!byMonth[month]) byMonth[month] = []
    byMonth[month].push(ev.recoveryDays)
  }

  const months = Object.keys(byMonth).sort()
  const data: RecoveryCurvePoint[] = months.map(m => ({
    month: m,
    avgRecoveryDays: round2(mean(byMonth[m])),
    count: byMonth[m].length,
  }))

  if (data.length < 2) {
    return { score: 50, trend: 'stable', data }
  }

  // 선형회귀로 기울기 산출
  const xs = data.map((_, i) => i)
  const ys = data.map(d => d.avgRecoveryDays)
  const slope = linearRegressionSlope(xs, ys)

  let trend: 'improving' | 'declining' | 'stable'
  let score: number

  if (slope < -0.5) {
    trend = 'improving'
    score = Math.min(100, 50 + Math.abs(slope) * 20)
  } else if (slope > 0.5) {
    trend = 'declining'
    score = Math.max(0, 50 - slope * 20)
  } else {
    trend = 'stable'
    score = 50
  }

  return { score: round2(score), trend, data }
}

function linearRegressionSlope(xs: number[], ys: number[]): number {
  const n = xs.length
  if (n < 2) return 0
  const xMean = mean(xs)
  const yMean = mean(ys)
  let numerator = 0
  let denominator = 0
  for (let i = 0; i < n; i++) {
    numerator += (xs[i] - xMean) * (ys[i] - yMean)
    denominator += (xs[i] - xMean) ** 2
  }
  if (denominator === 0) return 0
  return numerator / denominator
}

// ========================================
// 성장 상태 분류 (Growth State Classification)
// ========================================

export function classifyGrowthState(params: {
  selfRegulation: number
  resilience: number
  alignment: number | null
  recoveryCurveTrend: 'improving' | 'declining' | 'stable'
  recentMoodAvg: number
  executionTrend: 'increasing' | 'decreasing' | 'stable'
  hasRecentFailureEvent: boolean
  hasRecoveredFromRecent: boolean
}): { state: GrowthState; reason: string } {
  const {
    selfRegulation, resilience, alignment,
    recoveryCurveTrend, recentMoodAvg, executionTrend,
    hasRecentFailureEvent, hasRecoveredFromRecent,
  } = params

  // 우선순위 1: 감정 과부하
  if (recentMoodAvg < 2.5 && executionTrend === 'decreasing') {
    return {
      state: '감정 과부하',
      reason: `최근 14일 감정 평균이 낮고(${round2(recentMoodAvg)}) 실행이 감소 추세입니다.`,
    }
  }

  // 우선순위 2: 동기-실행 괴리
  if (alignment !== null && alignment < 40 && executionTrend === 'decreasing') {
    return {
      state: '동기-실행 괴리',
      reason: `가치-행동 일치도가 낮고(${round2(alignment)}) 실행이 감소 추세입니다.`,
    }
  }

  // 우선순위 3: 회복 중
  if (hasRecentFailureEvent && hasRecoveredFromRecent) {
    return {
      state: '회복 중',
      reason: '최근 실행 공백이 있었으나 복귀하여 실행을 재개했습니다.',
    }
  }

  // 우선순위 4: 급성장
  if (selfRegulation >= 70 && resilience >= 70 && recoveryCurveTrend === 'improving' && executionTrend === 'increasing') {
    return {
      state: '급성장',
      reason: '자기조절과 탄력성이 높고, 회복력이 개선되며 실행이 증가 추세입니다.',
    }
  }

  // 우선순위 5: 정체기
  if (executionTrend === 'stable') {
    return {
      state: '정체기',
      reason: '실행 추세가 안정적이며 지표 변화가 미미합니다.',
    }
  }

  // 우선순위 6: 안정적 성장 (기본값)
  return {
    state: '안정적 성장',
    reason: '전반적으로 꾸준한 성장 패턴을 보입니다.',
  }
}

// ========================================
// 헬퍼 함수
// ========================================

export function getRecentExecutionTrend(
  executionDates: string[],
  now: Date = new Date(),
): 'increasing' | 'decreasing' | 'stable' {
  const today = now.getTime()
  const d14 = 14 * 24 * 60 * 60 * 1000

  const recent14 = executionDates.filter(d => today - new Date(d).getTime() <= d14).length
  const prev14 = executionDates.filter(d => {
    const diff = today - new Date(d).getTime()
    return diff > d14 && diff <= d14 * 2
  }).length

  if (prev14 === 0) return 'stable'
  const ratio = recent14 / prev14
  if (ratio > 1.2) return 'increasing'
  if (ratio < 0.8) return 'decreasing'
  return 'stable'
}

export function getRecentMoodAvg(
  checkins: CheckinRecord[],
  now: Date = new Date(),
): number {
  const d14 = 14 * 24 * 60 * 60 * 1000
  const recent = checkins.filter(c => now.getTime() - new Date(c.createdAt).getTime() <= d14)
  if (recent.length === 0) return 3.0
  return mean(recent.map(c => c.mood))
}

// ========================================
// 메인 추론 함수
// ========================================

export function computeUserInference(
  checkins: CheckinRecord[],
  executionRecords: ExecutionRecord[],
  surveyScores: SurveyScores | null,
  goalData?: GoalItem[],
): InferenceResult {
  // 실행 날짜 (고유 일자)
  const executionDatesSet = new Set<string>()
  for (const er of executionRecords) {
    executionDatesSet.add(er.date.slice(0, 10))
  }
  const executionDates = [...executionDatesSet].sort()

  // 1. 자기조절지수
  const selfRegulationIndex = calcSelfRegulationIndex(checkins, executionDatesSet)

  // 2. 실행탄력성지수
  const failureEvents = detectFailureEvents(executionDates)
  const executionResilienceIndex = calcExecutionResilienceIndex(failureEvents)

  // 3. 가치-행동 일치도 (설문 우선, 없으면 목표 텍스트 추론)
  const executionWorldKeys = executionRecords.map(er => er.worldKey)
  let valueActionAlignment: number | null = null
  let vaaSource: string | null = null

  if (surveyScores) {
    valueActionAlignment = calcValueActionAlignment(surveyScores, executionWorldKeys)
    vaaSource = 'VAA: 설문 기반'
  } else if (goalData && goalData.length > 0) {
    const derivedScores = deriveGoalAreaScores(goalData)
    if (derivedScores) {
      valueActionAlignment = calcValueActionAlignment(derivedScores, executionWorldKeys)
      vaaSource = 'VAA: 목표 텍스트 추론'
    }
  }

  // 4. 회복탄성 변화곡선
  const { score: recoveryCurveScore, trend: recoveryCurveTrend, data: recoveryCurveData } =
    calcRecoveryCurve(failureEvents)

  // 성장 상태 분류 보조값
  const now = new Date()
  const executionTrend = getRecentExecutionTrend(executionDates, now)
  const recentMoodAvg = getRecentMoodAvg(checkins, now)

  // 최근 14일 내 실패 이벤트
  const d14 = 14 * 24 * 60 * 60 * 1000
  const recentFailures = failureEvents.filter(
    e => now.getTime() - new Date(e.gapEnd).getTime() <= d14,
  )
  const hasRecentFailureEvent = recentFailures.length > 0
  const hasRecoveredFromRecent = hasRecentFailureEvent && executionDates.some(d => {
    const dTime = new Date(d).getTime()
    return recentFailures.some(f => dTime > new Date(f.gapEnd).getTime())
  })

  // 성장 상태 분류
  const { state: growthState, reason: growthStateReason } = classifyGrowthState({
    selfRegulation: selfRegulationIndex,
    resilience: executionResilienceIndex,
    alignment: valueActionAlignment,
    recoveryCurveTrend,
    recentMoodAvg,
    executionTrend,
    hasRecentFailureEvent,
    hasRecoveredFromRecent,
  })

  // 진단 신호
  const signals: string[] = []
  if (checkins.length === 0) signals.push('체크인 데이터 부족')
  if (executionRecords.length < 5) signals.push('실행 데이터 부족 (5건 미만)')
  if (!surveyScores) signals.push('설문 데이터 없음')
  if (vaaSource) signals.push(vaaSource)
  if (selfRegulationIndex >= 70) signals.push('높은 자기조절력')
  if (selfRegulationIndex < 30 && checkins.length > 0) signals.push('자기조절 주의 필요')
  if (executionResilienceIndex >= 80) signals.push('우수한 실행탄력성')
  if (failureEvents.length === 0 && executionDates.length > 0) signals.push('실행 공백 없음 (탄력성 미검증)')
  if (valueActionAlignment !== null && valueActionAlignment < 40) signals.push('가치-행동 괴리 감지')
  if (recoveryCurveTrend === 'improving') signals.push('회복력 개선 추세')
  if (recoveryCurveTrend === 'declining') signals.push('회복력 감소 추세')

  return {
    selfRegulationIndex,
    executionResilienceIndex,
    valueActionAlignment,
    recoveryCurveScore,
    recoveryCurveTrend,
    recoveryCurveData,
    growthState,
    growthStateReason,
    failureEvents,
    signals,
  }
}
