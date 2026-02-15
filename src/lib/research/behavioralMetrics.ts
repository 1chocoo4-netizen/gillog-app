// ========================================
// 행동 로그 → 25개 하위역량 점수 산출
// UserData.history (ExecutionRecord[]) 기반
// ========================================

import {
  type ResearchArea,
  type SubCompetencyId,
  AREA_TO_WORLDS,
  NORMALIZATION_BENCHMARKS,
} from './competencyFramework'

// ExecutionRecord 타입 (UserDataProvider와 동일)
interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  executionText: string
  photoUrl?: string
  energy: number
  groupId?: string
}

// ExecutionItem 타입 (현재 실행 항목)
interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  text: string
  aiRecord?: string
  completed: boolean
  createdAt: string
  alarmTime?: string
  isDaily?: boolean
  lastCompletedDate?: string
}

/** 하위역량별 행동 점수 (0~100) */
export type BehavioralScores = Record<SubCompetencyId, number>

/** 영역별 행동 종합 점수 */
export type AreaBehavioralScores = Record<ResearchArea, number>

// ========================================
// 헬퍼 함수
// ========================================

/** 횟수 기반 정규화: min(count / base, 1) * 100 */
function normCount(count: number, base: number): number {
  return Math.min(count / Math.max(base, 1), 1) * 100
}

/** 비율 기반 정규화: ratio * 100 */
function normRatio(ratio: number): number {
  return Math.min(Math.max(ratio, 0), 1) * 100
}

/** 일수 기반 정규화 */
function normDays(days: number, base: number): number {
  return Math.min(days / Math.max(base, 1), 1) * 100
}

/** 문자수 기반 정규화 */
function normChars(avgChars: number, base: number): number {
  return Math.min(avgChars / Math.max(base, 1), 1) * 100
}

/** 특정 월드의 기록만 필터 */
function filterByWorld(records: ExecutionRecord[], worldKeys: string[]): ExecutionRecord[] {
  return records.filter(r => worldKeys.includes(r.worldKey))
}

/** 연속일(streak) 계산 */
function calcStreak(records: ExecutionRecord[]): { current: number; longest: number } {
  if (records.length === 0) return { current: 0, longest: 0 }

  const dateSet = new Set(records.map(r => r.date))
  const sortedDates = Array.from(dateSet).sort()

  if (sortedDates.length === 0) return { current: 0, longest: 0 }

  let longest = 1
  let currentRun = 1

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1])
    const curr = new Date(sortedDates[i])
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

    if (Math.round(diff) === 1) {
      currentRun++
    } else {
      longest = Math.max(longest, currentRun)
      currentRun = 1
    }
  }
  longest = Math.max(longest, currentRun)

  return { current: currentRun, longest }
}

/** 텍스트 다양성 지수 (고유 텍스트 / 전체 텍스트, 0~1) */
function calcDiversity(records: ExecutionRecord[]): number {
  if (records.length === 0) return 0
  const uniqueTexts = new Set(records.map(r => r.executionText.trim().toLowerCase()))
  return uniqueTexts.size / records.length
}

/** 활동 지속 기간 (첫 기록 ~ 마지막 기록 사이 일수) */
function calcActivityDuration(records: ExecutionRecord[]): number {
  if (records.length < 2) return records.length
  const dates = records.map(r => new Date(r.date).getTime())
  const min = Math.min(...dates)
  const max = Math.max(...dates)
  return Math.max(1, Math.round((max - min) / (1000 * 60 * 60 * 24)) + 1)
}

/** AI 기록에서 특정 패턴 포함 횟수 (배운것/느낀것/놓친것) */
function countAiRecordPattern(records: ExecutionRecord[], patterns: string[]): number {
  return records.filter(r => {
    if (!r.executionText) return false
    const text = r.executionText.toLowerCase()
    return patterns.some(p => text.includes(p))
  }).length
}

// ========================================
// 25개 하위역량 행동 점수 산출
// ========================================

export function calculateBehavioralScores(
  history: ExecutionRecord[],
  executions: ExecutionItem[],
  milestoneGroup: number,
): BehavioralScores {
  const bench = NORMALIZATION_BENCHMARKS[milestoneGroup] ?? NORMALIZATION_BENCHMARKS[100]

  // 월드별 기록 분류
  const selfDirected = filterByWorld(history, AREA_TO_WORLDS.career)
  const relationship = filterByWorld(history, AREA_TO_WORLDS.community)
  const nonCogWorlds = filterByWorld(history, AREA_TO_WORLDS.nonCognitive)
  const cognition = filterByWorld(history, AREA_TO_WORLDS.learning)
  const habitRecords = filterByWorld(history, AREA_TO_WORLDS.habit)

  // 전체 streak
  const allStreak = calcStreak(history)

  // isDaily 설정 비율
  const dailyRatio = executions.length > 0
    ? executions.filter(e => e.isDaily).length / executions.length
    : 0

  // 알람 설정 비율
  const alarmRatio = executions.length > 0
    ? executions.filter(e => e.alarmTime).length / executions.length
    : 0

  // 고유 worldKey 수
  const uniqueWorlds = new Set(history.map(r => r.worldKey)).size

  // cognition subjectKey 다양성
  const cognitionSubjects = new Set(cognition.filter(r => r.subjectKey).map(r => r.subjectKey)).size
  const totalPossibleSubjects = 6 // 대략적인 과목 수

  // 실행 텍스트 평균 길이
  const avgTextLength = history.length > 0
    ? history.reduce((sum, r) => sum + (r.executionText?.length || 0), 0) / history.length
    : 0

  // 놓친것 패턴 기록 수
  const missedPatterns = countAiRecordPattern(history, ['놓친', '실패', '못했', '아쉬'])

  // 느낀것 패턴 기록 수
  const feltPatterns = countAiRecordPattern(history, ['느낀', '느꼈', '감동', '공감'])

  // 놓친것 기록 후 다음날 재개 비율
  const missedDates = history
    .filter(r => ['놓친', '실패', '못했', '아쉬'].some(p => r.executionText.includes(p)))
    .map(r => r.date)
  const missedDateSet = new Set(missedDates)
  const resumedAfterMiss = missedDates.filter(d => {
    const next = new Date(d)
    next.setDate(next.getDate() + 1)
    const nextStr = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`
    return history.some(r => r.date === nextStr)
  }).length
  const resumeRatio = missedDateSet.size > 0 ? resumedAfterMiss / missedDateSet.size : 0.5

  // 완료율 계산 함수
  const completionRate = (worldRecords: ExecutionRecord[]) => {
    if (executions.length === 0) return 0.5
    const worldExecs = executions.filter(e =>
      worldRecords.some(r => r.areaKey === e.areaKey)
    )
    if (worldExecs.length === 0) return 0.5
    return worldExecs.filter(e => e.completed).length / worldExecs.length
  }

  return {
    // 진로 (Career)
    C1: normCount(selfDirected.filter(r => r.executionText.length > 10).length, bench.countBase),
    C2: normRatio(calcDiversity(selfDirected)),
    C3: normDays(calcStreak(selfDirected).longest, bench.daysBase),
    C4: normCount(selfDirected.length, bench.countBase),
    C5: normRatio(completionRate(selfDirected)),

    // 공동체 (Community)
    M1: normCount(relationship.length, bench.countBase),
    M2: normCount(feltPatterns, bench.countBase),
    M3: normCount(relationship.filter(r => executions.some(e => e.id === r.id && e.completed)).length || relationship.length, bench.countBase),
    M4: normCount(missedPatterns, bench.countBase),
    M5: normRatio(calcDiversity(relationship)),

    // 인성 (NonCognitive)
    N1: normDays(allStreak.longest, bench.daysBase),
    N2: normRatio((dailyRatio + alarmRatio) / 2),
    N3: normCount(nonCogWorlds.length, bench.countBase),
    N4: normCount(uniqueWorlds, 6),
    N5: normDays(calcActivityDuration(history), bench.daysBase),

    // 학습 (Learning)
    L1: normCount(cognition.length, bench.countBase),
    L2: normRatio(dailyRatio),
    L3: normDays(calcStreak(cognition).longest, bench.daysBase),
    L4: normChars(avgTextLength, bench.charsBase),
    L5: normRatio(totalPossibleSubjects > 0 ? cognitionSubjects / totalPossibleSubjects : 0),

    // 습관 (Habit)
    H1: normRatio(dailyRatio),
    H2: normRatio(completionRate(habitRecords)),
    H3: normCount(habitRecords.length, bench.countBase),
    H4: normRatio(resumeRatio),
    H5: normDays(calcStreak(habitRecords).longest + calcActivityDuration(habitRecords), bench.daysBase * 2),
  }
}

/** 하위역량 점수 → 영역별 평균 점수 산출 */
export function aggregateToAreaScores(scores: BehavioralScores): AreaBehavioralScores {
  const avg = (ids: SubCompetencyId[]) => {
    const vals = ids.map(id => scores[id])
    return vals.reduce((a, b) => a + b, 0) / vals.length
  }

  return {
    career: avg(['C1', 'C2', 'C3', 'C4', 'C5']),
    community: avg(['M1', 'M2', 'M3', 'M4', 'M5']),
    nonCognitive: avg(['N1', 'N2', 'N3', 'N4', 'N5']),
    learning: avg(['L1', 'L2', 'L3', 'L4', 'L5']),
    habit: avg(['H1', 'H2', 'H3', 'H4', 'H5']),
  }
}

/** 통합 점수 산출: survey * 0.6 + behavioral * 0.4 */
export function integrateScores(
  surveyScore: number | null,
  behavioralScore: number,
): number {
  if (surveyScore == null) return behavioralScore
  return surveyScore * 0.6 + behavioralScore * 0.4
}
