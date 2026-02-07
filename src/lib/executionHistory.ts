// ========================================
// 실행 기록 관리 (Execution History)
// 평생 누적되는 성장 기록 시스템
// ========================================

import { getCurrentUser } from './auth'

// 실행 완료 기록 인터페이스
export interface ExecutionRecord {
  id: string
  date: string           // YYYY-MM-DD
  completedAt: string    // ISO timestamp
  worldKey: string       // 어떤 월드인지 (cognition, selfDirected, habit, attitude, relationship, character)
  areaKey: string        // 세부 영역
  subjectKey?: string    // 과목 (teaching인 경우)
  lessonTitle?: string   // 레슨 제목
  executionText: string  // 실행한 내용
  energy: number         // 획득한 에너지
}

// 일별 통계
export interface DailyStats {
  date: string
  count: number
  worldBreakdown: Record<string, number>
}

// 월드별 통계
export interface WorldStats {
  worldKey: string
  count: number
  percentage: number
}

// 전체 통계
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

// 저장소 키 생성
function getHistoryKey(): string {
  const user = getCurrentUser()
  if (!user) return 'gillog-execution-history-guest'
  return `gillog-execution-history-${user.email}`
}

// 모든 실행 기록 가져오기
export function getAllExecutionRecords(): ExecutionRecord[] {
  if (typeof window === 'undefined') return []
  const key = getHistoryKey()
  const saved = localStorage.getItem(key)
  if (!saved) return []
  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

// 실행 기록 저장
export function saveExecutionRecord(record: Omit<ExecutionRecord, 'id' | 'date' | 'completedAt'>): ExecutionRecord {
  const records = getAllExecutionRecords()
  const now = new Date()

  const newRecord: ExecutionRecord = {
    ...record,
    id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: now.toISOString().split('T')[0], // YYYY-MM-DD
    completedAt: now.toISOString(),
  }

  records.push(newRecord)

  const key = getHistoryKey()
  localStorage.setItem(key, JSON.stringify(records))

  return newRecord
}

// 오늘 날짜 문자열 (YYYY-MM-DD)
function getTodayString(): string {
  return new Date().toISOString().split('T')[0]
}

// 이번 주 시작일 (일요일)
function getThisWeekStart(): Date {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const diff = now.getDate() - dayOfWeek
  const weekStart = new Date(now)
  weekStart.setDate(diff)
  weekStart.setHours(0, 0, 0, 0)
  return weekStart
}

// 이번 달 시작일
function getThisMonthStart(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

// 연속 기록 계산
function calculateStreak(records: ExecutionRecord[]): { current: number; longest: number } {
  if (records.length === 0) return { current: 0, longest: 0 }

  // 날짜별로 그룹화
  const dateSet = new Set(records.map(r => r.date))
  const sortedDates = Array.from(dateSet).sort().reverse() // 최신순

  const today = getTodayString()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  // 현재 스트릭 계산
  let currentStreak = 0
  let checkDate = new Date()

  // 오늘 또는 어제부터 시작
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

  // 연속 날짜 카운트
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

// 최장 스트릭 계산
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

// 전체 통계 계산
export function calculateOverallStats(): OverallStats {
  const records = getAllExecutionRecords()
  const today = getTodayString()
  const weekStart = getThisWeekStart()
  const monthStart = getThisMonthStart()

  // 기본 카운트
  const todayRecords = records.filter(r => r.date === today)
  const weekRecords = records.filter(r => new Date(r.date) >= weekStart)
  const monthRecords = records.filter(r => new Date(r.date) >= monthStart)

  // 월드별 통계
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

  // 일별 통계 (최근 90일)
  const dailyMap: Record<string, DailyStats> = {}
  records.forEach(r => {
    if (!dailyMap[r.date]) {
      dailyMap[r.date] = { date: r.date, count: 0, worldBreakdown: {} }
    }
    dailyMap[r.date].count++
    dailyMap[r.date].worldBreakdown[r.worldKey] = (dailyMap[r.date].worldBreakdown[r.worldKey] || 0) + 1
  })

  const dailyStats = Object.values(dailyMap).sort((a, b) => b.date.localeCompare(a.date))

  // 스트릭 계산
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

// 특정 날짜의 기록 가져오기
export function getRecordsByDate(date: string): ExecutionRecord[] {
  const records = getAllExecutionRecords()
  return records.filter(r => r.date === date).sort((a, b) =>
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
}

// 최근 N개 기록 가져오기
export function getRecentRecords(limit: number = 20): ExecutionRecord[] {
  const records = getAllExecutionRecords()
  return records
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    .slice(0, limit)
}

// 캘린더 히트맵 데이터 생성 (최근 N일)
export function getCalendarHeatmapData(days: number = 90): { date: string; count: number; level: number }[] {
  const records = getAllExecutionRecords()
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

    // 레벨 계산 (0-4)
    let level = 0
    if (count >= 5) level = 4
    else if (count >= 3) level = 3
    else if (count >= 2) level = 2
    else if (count >= 1) level = 1

    result.push({ date: dateStr, count, level })
  }

  return result
}

// 월드 키 → 한글 라벨 변환
export const WORLD_LABELS: Record<string, string> = {
  cognition: '인지',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

// 월드 키 → 아이콘 변환
export const WORLD_ICONS: Record<string, string> = {
  cognition: '🧠',
  selfDirected: '🎯',
  habit: '🔄',
  attitude: '💪',
  relationship: '🤝',
  character: '❤️',
}

// 월드 키 → 색상 변환
export const WORLD_COLORS: Record<string, string> = {
  cognition: '#8b5cf6',
  selfDirected: '#06b6d4',
  habit: '#22c55e',
  attitude: '#f59e0b',
  relationship: '#ec4899',
  character: '#fb923c',
}

// ========================================
// 테스트용 샘플 데이터 생성
// ========================================

const SAMPLE_EXECUTIONS: Record<string, string[]> = {
  cognition: [
    '오늘 배운 수학 개념을 노트에 정리했다',
    '영어 단어 50개를 암기하고 테스트했다',
    '과학 실험 보고서를 작성했다',
    '역사 다큐멘터리를 보고 느낀점을 기록했다',
    '독서 후 핵심 내용을 마인드맵으로 정리했다',
    '모르는 개념을 검색하고 정리했다',
    '수업 시간에 질문을 3개 이상 했다',
    '복습 노트를 만들어 취약점을 파악했다',
    '문제집 한 단원을 풀고 오답 정리했다',
    '논술 주제에 대해 깊이 생각하고 글을 썼다',
  ],
  selfDirected: [
    '오늘 할 일 목록을 작성하고 우선순위를 정했다',
    '일주일 학습 계획을 세웠다',
    '스스로 정한 공부 시간을 지켰다',
    '휴대폰 사용 시간을 1시간으로 제한했다',
    '아침 6시에 일어나 자습 시간을 확보했다',
    '시험 대비 계획표를 만들었다',
    '방해 요소를 제거하고 집중 환경을 만들었다',
    '목표 대학과 학과를 조사했다',
    '나만의 공부법을 실험해봤다',
    '실패한 계획을 분석하고 수정했다',
  ],
  habit: [
    '매일 아침 10분 독서를 실천했다',
    '규칙적인 수면 시간을 유지했다',
    '운동 30분을 꾸준히 했다',
    '식사 후 양치를 바로 했다',
    '일기를 쓰고 하루를 정리했다',
    '정해진 시간에 공부를 시작했다',
    '책상 정리를 매일 했다',
    '물을 8잔 이상 마셨다',
    '계획한 시간에 잠자리에 들었다',
    '아침 스트레칭을 습관화했다',
  ],
  attitude: [
    '어려운 문제를 포기하지 않고 끝까지 풀었다',
    '실패해도 다시 도전하는 마음을 다짐했다',
    '긍정적인 자기 암시를 했다',
    '스트레스 상황에서 심호흡으로 진정했다',
    '비교하지 않고 나만의 속도로 성장하기로 했다',
    '작은 성취를 인정하고 스스로 칭찬했다',
    '힘든 상황에서도 감사할 점을 찾았다',
    '실수를 인정하고 배움의 기회로 삼았다',
    '부정적 생각이 들 때 전환하는 연습을 했다',
    '미래에 대한 희망적인 비전을 그렸다',
  ],
  relationship: [
    '친구의 고민을 경청하고 공감했다',
    '가족에게 감사 인사를 전했다',
    '모둠 활동에서 적극적으로 의견을 나눴다',
    '갈등 상황에서 먼저 사과했다',
    '동생의 숙제를 도와줬다',
    '친구에게 응원 메시지를 보냈다',
    '선생님께 인사를 먼저 드렸다',
    '새로운 친구에게 먼저 다가갔다',
    '팀 프로젝트에서 역할을 충실히 수행했다',
    '다른 사람의 의견을 존중하고 경청했다',
  ],
  character: [
    '봉사활동에 참여했다',
    '거짓말하지 않고 정직하게 말했다',
    '약속 시간을 지켰다',
    '쓰레기를 주워서 버렸다',
    '양보하고 배려하는 행동을 했다',
    '규칙을 어기지 않고 지켰다',
    '어려운 친구를 도왔다',
    '공정하게 행동했다',
    '책임감 있게 맡은 일을 완수했다',
    '예의 바르게 행동했다',
  ],
}

// 1년치 샘플 데이터 생성
export function generateSampleData(): void {
  if (typeof window === 'undefined') return

  const records: ExecutionRecord[] = []
  const worldKeys = Object.keys(SAMPLE_EXECUTIONS)
  const today = new Date()

  // 365일 동안의 데이터 생성 (하루 1-4개)
  for (let daysAgo = 365; daysAgo >= 0; daysAgo--) {
    const date = new Date(today)
    date.setDate(date.getDate() - daysAgo)
    const dateStr = date.toISOString().split('T')[0]

    // 하루에 1-4개의 실행 기록 (랜덤)
    const numRecords = Math.floor(Math.random() * 4) + 1

    for (let i = 0; i < numRecords; i++) {
      // 랜덤 월드 선택
      const worldKey = worldKeys[Math.floor(Math.random() * worldKeys.length)]
      const executions = SAMPLE_EXECUTIONS[worldKey]
      const executionText = executions[Math.floor(Math.random() * executions.length)]

      // 랜덤 시간
      const hour = Math.floor(Math.random() * 14) + 8 // 8시 ~ 22시
      const minute = Math.floor(Math.random() * 60)
      const completedAt = new Date(date)
      completedAt.setHours(hour, minute, 0, 0)

      records.push({
        id: `sample-${dateStr}-${i}-${Math.random().toString(36).substr(2, 9)}`,
        date: dateStr,
        completedAt: completedAt.toISOString(),
        worldKey,
        areaKey: worldKey,
        executionText,
        energy: 5,
      })
    }
  }

  // 저장
  const key = getHistoryKey()
  localStorage.setItem(key, JSON.stringify(records))

  // 레벨 데이터도 설정 (레벨 5)
  const levelData = {
    level: 5,
    progress: {
      cognition: 7,
      selfDirected: 8,
      habit: 6,
      attitude: 9,
      relationship: 7,
      character: 8,
    }
  }
  localStorage.setItem('gillog-level', JSON.stringify(levelData))

  console.log(`✅ ${records.length}개의 샘플 데이터 생성 완료!`)
}

// 샘플 데이터 삭제
export function clearSampleData(): void {
  if (typeof window === 'undefined') return

  const key = getHistoryKey()
  localStorage.removeItem(key)
  localStorage.removeItem('gillog-level')

  console.log('🗑️ 샘플 데이터 삭제 완료')
}
