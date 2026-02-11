'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'

// ========================================
// 타입 정의
// ========================================

export interface LevelData {
  level: number
  progress: Record<string, number>
}

export interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  text: string
  aiRecord?: string
  photoUrl?: string
  completed: boolean
  createdAt: string
  alarmTime?: string
  isDaily?: boolean           // 매일 반복 실행 여부
  lastCompletedDate?: string  // 마지막 완료 날짜 "YYYY-MM-DD"
}

export interface ExecutionRecord {
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
}

export interface BucketItem {
  id: string
  text: string
  completed: boolean
}

export interface MonthlyGoal {
  id: string
  text: string
  completed: boolean
}

const DEFAULT_LEVEL_DATA: LevelData = {
  level: 1,
  progress: {
    cognition: 0,
    selfDirected: 0,
    habit: 0,
    attitude: 0,
    relationship: 0,
    character: 0,
  },
}

// ========================================
// Context 정의
// ========================================

interface UserDataContextType {
  // 로딩 상태
  isLoading: boolean

  // 에너지
  energy: number
  setEnergy: (energy: number) => void
  addEnergy: (amount: number) => number
  useEnergy: (amount: number) => boolean

  // 레벨
  levelData: LevelData
  updateLevelProgress: (areaKey: string, amount?: number) => LevelData

  // 실행 항목 (투두)
  executions: ExecutionItem[]
  saveExecutions: (items: ExecutionItem[]) => void

  // 실행 기록 (히스토리)
  history: ExecutionRecord[]
  addHistoryRecord: (record: Omit<ExecutionRecord, 'id' | 'date' | 'completedAt'>) => ExecutionRecord

  // 버킷리스트
  bucketList: BucketItem[]
  saveBucketList: (items: BucketItem[]) => void

  // 월간 목표
  monthlyGoals: Record<string, MonthlyGoal[]>
  saveMonthlyGoals: (monthKey: string, goals: MonthlyGoal[]) => void
  getMonthlyGoals: (monthKey: string) => MonthlyGoal[]

  // 설문조사
  showSurvey: boolean
  surveyMilestones: number[]
  pendingMilestone: number | null
  completeMilestone: () => void
}

const UserDataContext = createContext<UserDataContextType | null>(null)

// ========================================
// Provider
// ========================================

const GROWTH_AREAS = ['cognition', 'selfDirected', 'habit', 'attitude', 'relationship', 'character']
const SURVEY_MILESTONES = [1, 100, 500]

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const [isLoading, setIsLoading] = useState(true)
  const [energy, setEnergyState] = useState(50)
  const [levelData, setLevelData] = useState<LevelData>(DEFAULT_LEVEL_DATA)
  const [executions, setExecutionsState] = useState<ExecutionItem[]>([])
  const [history, setHistoryState] = useState<ExecutionRecord[]>([])
  const [bucketList, setBucketListState] = useState<BucketItem[]>([])
  const [monthlyGoals, setMonthlyGoalsState] = useState<Record<string, MonthlyGoal[]>>({})
  const [surveyMilestones, setSurveyMilestonesState] = useState<number[]>([])
  const [showSurvey, setShowSurvey] = useState(false)
  const [pendingMilestone, setPendingMilestone] = useState<number | null>(null)

  // 디바운스 타이머
  const syncTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingSync = useRef<Record<string, unknown>>({})

  // 서버에서 데이터 로드
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      setIsLoading(false)
      return
    }

    async function loadData() {
      try {
        const res = await fetch('/api/user-data')
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()

        setEnergyState(data.energy ?? 50)

        const ld = typeof data.levelData === 'string' ? JSON.parse(data.levelData) : data.levelData
        setLevelData(ld ?? DEFAULT_LEVEL_DATA)

        const exec = typeof data.executions === 'string' ? JSON.parse(data.executions) : data.executions
        setExecutionsState(Array.isArray(exec) ? exec : [])

        const hist = typeof data.history === 'string' ? JSON.parse(data.history) : data.history
        setHistoryState(Array.isArray(hist) ? hist : [])

        const bl = typeof data.bucketList === 'string' ? JSON.parse(data.bucketList) : data.bucketList
        setBucketListState(Array.isArray(bl) ? bl : [])

        const mg = typeof data.monthlyGoals === 'string' ? JSON.parse(data.monthlyGoals) : data.monthlyGoals
        setMonthlyGoalsState(mg && typeof mg === 'object' ? mg : {})

        const sm = Array.isArray(data.surveyMilestones) ? data.surveyMilestones as number[] : []
        setSurveyMilestonesState(sm)

        // 초기 로딩 시: 미완료 마일스톤 중 도달한 것이 있으면 트리거
        const histArr = Array.isArray(hist) ? hist : []
        const nextMilestone = SURVEY_MILESTONES.find(
          m => histArr.length >= m && !sm.includes(m)
        )
        if (nextMilestone) {
          setPendingMilestone(nextMilestone)
          setTimeout(() => setShowSurvey(true), 1500)
        }
      } catch (e) {
        console.error('Failed to load user data:', e)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [status])

  // 디바운스 서버 동기화
  const syncToServer = useCallback((updates: Record<string, unknown>) => {
    if (status !== 'authenticated') return

    // 누적
    pendingSync.current = { ...pendingSync.current, ...updates }

    // 기존 타이머 취소
    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current)
    }

    // 500ms 디바운스
    syncTimerRef.current = setTimeout(async () => {
      const data = { ...pendingSync.current }
      pendingSync.current = {}

      try {
        await fetch('/api/user-data', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch (e) {
        console.error('Failed to sync:', e)
      }
    }, 500)
  }, [status])

  // 10분마다 에너지 +1 자동 회복
  useEffect(() => {
    if (status !== 'authenticated') return
    const timer = setInterval(() => {
      setEnergyState(prev => {
        if (prev >= 100) return prev
        const next = prev + 1
        syncToServer({ energy: next })
        return next
      })
    }, 10 * 60 * 1000)
    return () => clearInterval(timer)
  }, [status, syncToServer])

  // ========================================
  // 에너지 함수들
  // ========================================

  const setEnergy = useCallback((newEnergy: number) => {
    const clamped = Math.max(0, Math.min(100, newEnergy))
    setEnergyState(clamped)
    syncToServer({ energy: clamped })
  }, [syncToServer])

  const addEnergy = useCallback((amount: number) => {
    let newEnergy = 0
    setEnergyState(prev => {
      newEnergy = Math.max(0, Math.min(100, prev + amount))
      return newEnergy
    })
    // 약간의 딜레이로 상태 업데이트 후 동기화
    setTimeout(() => {
      syncToServer({ energy: newEnergy })
    }, 0)
    return newEnergy
  }, [syncToServer])

  const useEnergy = useCallback((amount: number) => {
    let success = false
    setEnergyState(prev => {
      if (prev < amount) return prev
      success = true
      const newEnergy = prev - amount
      syncToServer({ energy: newEnergy })
      return newEnergy
    })
    return success
  }, [syncToServer])

  // ========================================
  // 레벨 함수
  // ========================================

  const updateLevelProgress = useCallback((areaKey: string, amount: number = 1) => {
    let newData: LevelData = { ...DEFAULT_LEVEL_DATA }
    setLevelData(prev => {
      const updated = {
        ...prev,
        progress: { ...prev.progress },
      }
      const currentProgress = updated.progress[areaKey] || 0
      updated.progress[areaKey] = Math.min(10, currentProgress + amount)

      const allFull = GROWTH_AREAS.every(area => updated.progress[area] >= 10)
      if (allFull) {
        updated.level += 1
        GROWTH_AREAS.forEach(area => {
          updated.progress[area] = 0
        })
      }

      newData = updated
      return updated
    })

    setTimeout(() => {
      syncToServer({ levelData: newData })
    }, 0)

    return newData
  }, [syncToServer])

  // ========================================
  // 실행 항목 함수
  // ========================================

  const saveExecutions = useCallback((items: ExecutionItem[]) => {
    setExecutionsState(items)
    syncToServer({ executions: items })
  }, [syncToServer])

  // ========================================
  // 실행 기록 함수
  // ========================================

  const addHistoryRecord = useCallback((record: Omit<ExecutionRecord, 'id' | 'date' | 'completedAt'>) => {
    const now = new Date()
    const newRecord: ExecutionRecord = {
      ...record,
      id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: now.toISOString().split('T')[0],
      completedAt: now.toISOString(),
    }

    setHistoryState(prev => {
      const updated = [...prev, newRecord]
      syncToServer({ history: updated })

      // 마일스톤 도달 시 설문 트리거
      const reached = SURVEY_MILESTONES.find(
        m => updated.length >= m && !surveyMilestones.includes(m)
      )
      if (reached && !pendingMilestone) {
        setPendingMilestone(reached)
        setTimeout(() => setShowSurvey(true), 1500)
      }

      return updated
    })

    return newRecord
  }, [syncToServer, surveyMilestones, pendingMilestone])

  // ========================================
  // 버킷리스트 함수
  // ========================================

  const saveBucketList = useCallback((items: BucketItem[]) => {
    setBucketListState(items)
    syncToServer({ bucketList: items })
  }, [syncToServer])

  // ========================================
  // 월간 목표 함수
  // ========================================

  const saveMonthlyGoals = useCallback((monthKey: string, goals: MonthlyGoal[]) => {
    setMonthlyGoalsState(prev => {
      const updated = { ...prev, [monthKey]: goals }
      syncToServer({ monthlyGoals: updated })
      return updated
    })
  }, [syncToServer])

  const getMonthlyGoals = useCallback((monthKey: string) => {
    return monthlyGoals[monthKey] || []
  }, [monthlyGoals])

  // ========================================
  // 설문 완료 처리 (마일스톤 단위)
  // ========================================

  const completeMilestone = useCallback(() => {
    if (pendingMilestone === null) return
    const updated = [...surveyMilestones, pendingMilestone].sort((a, b) => a - b)
    setSurveyMilestonesState(updated)
    setShowSurvey(false)
    setPendingMilestone(null)
    syncToServer({ surveyMilestones: updated })
  }, [syncToServer, pendingMilestone, surveyMilestones])

  // ========================================
  // Context Value
  // ========================================

  const value: UserDataContextType = {
    isLoading,
    energy,
    setEnergy,
    addEnergy,
    useEnergy,
    levelData,
    updateLevelProgress,
    executions,
    saveExecutions,
    history,
    addHistoryRecord,
    bucketList,
    saveBucketList,
    monthlyGoals,
    saveMonthlyGoals,
    getMonthlyGoals,
    showSurvey,
    surveyMilestones,
    pendingMilestone,
    completeMilestone,
  }

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  )
}

// ========================================
// Hook
// ========================================

export function useUserData() {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}
