// ========================================
// 실행 기록 유틸리티 (순수 함수)
// 데이터는 UserDataProvider에서 관리
// ========================================

export interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  executionText: string
  energy: number
}

export interface DailyStats {
  date: string
  count: number
  worldBreakdown: Record<string, number>
}

export interface WorldStats {
  worldKey: string
  count: number
  percentage: number
}

export interface OverallStats {
  totalExecutions: number
  thisMonthExecutions: number
  thisWeekExecutions: number
  todayExecutions: number
  currentStreak: number
  longestStreak: number
  worldStats: WorldStats[]
  dailyStats: DailyStats[]
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

function getThisWeekStart(): Date {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diff = now.getDate() - dayOfWeek
  const weekStart = new Date(now)
  weekStart.setDate(diff)
  weekStart.setHours(0, 0, 0, 0)
  return weekStart
}

function getThisMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function calculateStreak(records: ExecutionRecord[]): { current: number; longest: number } {
  if (records.length === 0) return { current: 0, longest: 0 }

  const dateSet = new Set(records.map(r => r.date))
  const sortedDates = Array.from(dateSet).sort().reverse()

  const today = getTodayString()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  let currentStreak = 0
  let checkDate = new Date()

  if (dateSet.has(today)) {
    currentStreak = 1
    checkDate.setDate(checkDate.getDate() - 1)
  } else if (dateSet.has(yesterdayStr)) {
    currentStreak = 1
    checkDate = yesterday
    checkDate.setDate(checkDate.getDate() - 1)
  } else {
    return calculateLongestStreak(sortedDates, 0)
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0]
    if (dateSet.has(dateStr)) {
      currentStreak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return calculateLongestStreak(sortedDates, currentStreak)
}

function calculateLongestStreak(sortedDates: string[], currentStreak: number): { current: number; longest: number } {
  if (sortedDates.length === 0) return { current: currentStreak, longest: currentStreak }

  let longest = currentStreak
  let tempStreak = 1

  for (let i = 0; i < sortedDates.length - 1; i++) {
    const current = new Date(sortedDates[i])
    const next = new Date(sortedDates[i + 1])
    const diffDays = Math.floor((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      tempStreak++
    } else {
      longest = Math.max(longest, tempStreak)
      tempStreak = 1
    }
  }

  longest = Math.max(longest, tempStreak)
  return { current: currentStreak, longest }
}

// 전체 통계 계산 (데이터를 파라미터로 받음)
export function calculateOverallStats(records: ExecutionRecord[]): OverallStats {
  const today = getTodayString()
  const weekStart = getThisWeekStart()
  const monthStart = getThisMonthStart()

  const todayRecords = records.filter(r => r.date === today)
  const weekRecords = records.filter(r => new Date(r.date) >= weekStart)
  const monthRecords = records.filter(r => new Date(r.date) >= monthStart)

  const worldCounts: Record<string, number> = {}
  records.forEach(r => {
    worldCounts[r.worldKey] = (worldCounts[r.worldKey] || 0) + 1
  })

  const totalExecutions = records.length
  const worldStats: WorldStats[] = Object.entries(worldCounts).map(([worldKey, count]) => ({
    worldKey,
    count,
    percentage: totalExecutions > 0 ? Math.round((count / totalExecutions) * 100) : 0,
  })).sort((a, b) => b.count - a.count)

  const dailyMap: Record<string, DailyStats> = {}
  records.forEach(r => {
    if (!dailyMap[r.date]) {
      dailyMap[r.date] = { date: r.date, count: 0, worldBreakdown: {} }
    }
    dailyMap[r.date].count++
    dailyMap[r.date].worldBreakdown[r.worldKey] = (dailyMap[r.date].worldBreakdown[r.worldKey] || 0) + 1
  })

  const dailyStats = Object.values(dailyMap).sort((a, b) => b.date.localeCompare(a.date))

  const { current: currentStreak, longest: longestStreak } = calculateStreak(records)

  return {
    totalExecutions,
    thisMonthExecutions: monthRecords.length,
    thisWeekExecutions: weekRecords.length,
    todayExecutions: todayRecords.length,
    currentStreak,
    longestStreak,
    worldStats,
    dailyStats,
  }
}

export function getRecordsByDate(records: ExecutionRecord[], date: string): ExecutionRecord[] {
  return records.filter(r => r.date === date).sort((a, b) =>
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
}

export function getRecentRecords(records: ExecutionRecord[], limit: number = 20): ExecutionRecord[] {
  return [...records]
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, limit)
}

export function getCalendarHeatmapData(records: ExecutionRecord[], days: number = 90): { date: string; count: number; level: number }[] {
  const dateCountMap: Record<string, number> = {}
  records.forEach(r => {
    dateCountMap[r.date] = (dateCountMap[r.date] || 0) + 1
  })

  const result: { date: string; count: number; level: number }[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const count = dateCountMap[dateStr] || 0

    let level = 0
    if (count >= 5) level = 4
    else if (count >= 3) level = 3
    else if (count >= 2) level = 2
    else if (count >= 1) level = 1

    result.push({ date: dateStr, count, level })
  }

  return result
}

export const WORLD_LABELS: Record<string, string> = {
  cognition: '인지',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

export const WORLD_ICONS: Record<string, string> = {
  cognition: '🧠',
  selfDirected: '🎯',
  habit: '🔄',
  attitude: '💪',
  relationship: '🤝',
  character: '❤️',
}

export const WORLD_COLORS: Record<string, string> = {
  cognition: '#8b5cf6',
  selfDirected: '#06b6d4',
  habit: '#22c55e',
  attitude: '#f59e0b',
  relationship: '#ec4899',
  character: '#fb923c',
}
