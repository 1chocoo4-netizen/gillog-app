'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Star, Check, Plus, X, Lightbulb, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { BottomTabBar } from '@/components/BottomTabBar'
import { useUserData } from '@/lib/UserDataProvider'

interface MonthlyGoal {
  id: string
  text: string
  completed: boolean
}

interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  text: string
  aiRecord?: string
  completed: boolean
  createdAt: string
  alarmTime?: string
}

const GROWTH_AREAS: Record<string, { label: string; icon: string; color: string }> = {
  cognition: { label: '인지(학습)', icon: '🧠', color: '#8b5cf6' },
  selfDirected: { label: '자기주도', icon: '🎯', color: '#06b6d4' },
  habit: { label: '습관', icon: '📚', color: '#22c55e' },
  attitude: { label: '태도', icon: '💪', color: '#f59e0b' },
  relationship: { label: '관계', icon: '🤝', color: '#ec4899' },
  character: { label: '인성', icon: '❤️', color: '#fb923c' },
}

function getMonthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}`
}

function MonthlyContent() {
  const router = useRouter()
  const { energy, addEnergy, history, executions, monthlyGoals, saveMonthlyGoals, getMonthlyGoals, addHistoryRecord } = useUserData()
  const [currentDate] = useState(new Date())
  const [goals, setGoals] = useState<MonthlyGoal[]>([
    { id: '1', text: '', completed: false },
    { id: '2', text: '', completed: false },
    { id: '3', text: '', completed: false },
  ])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthKey = getMonthKey(year, month)
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  // 달력 데이터 생성
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const todayDate = today.getDate()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  // 실행 기록에서 해당 월의 날짜별 카운트
  const [dayCounts, setDayCounts] = useState<Record<number, number>>({})

  // 선택된 날짜 & 해당 날짜의 미완료 실행 아이템
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [dayExecutions, setDayExecutions] = useState<ExecutionItem[]>([])
  const [showTip, setShowTip] = useState(false)

  useEffect(() => {
    // 월 목표 불러오기
    const savedGoals = getMonthlyGoals(monthKey)
    if (savedGoals.length > 0) {
      setGoals(savedGoals)
    }

    // 실행 기록에서 날짜별 카운트
    const counts: Record<number, number> = {}
    history.forEach(r => {
      if (r.date.startsWith(monthKey)) {
        const day = parseInt(r.date.split('-')[2])
        counts[day] = (counts[day] || 0) + 1
      }
    })
    setDayCounts(counts)
  }, [monthKey, history, getMonthlyGoals])

  function handleSaveGoals(newGoals: MonthlyGoal[]) {
    setGoals(newGoals)
    saveMonthlyGoals(monthKey, newGoals)
  }

  function handleGoalTextChange(id: string, text: string) {
    const updated = goals.map(g => g.id === id ? { ...g, text } : g)
    handleSaveGoals(updated)
  }

  function handleGoalComplete(id: string) {
    const goal = goals.find(g => g.id === id)
    if (!goal || goal.completed || !goal.text.trim()) return

    const updated = goals.map(g => g.id === id ? { ...g, completed: true } : g)
    handleSaveGoals(updated)

    addEnergy(10)

    addHistoryRecord({
      worldKey: 'selfDirected',
      areaKey: 'selfDirected',
      lessonTitle: '월 목표 달성',
      executionText: `[월 목표] ${goal.text}`,
      energy: 10,
    })

    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  function handleAddGoal() {
    const newGoal: MonthlyGoal = {
      id: `goal-${Date.now()}`,
      text: '',
      completed: false,
    }
    handleSaveGoals([...goals, newGoal])
  }

  function handleDeleteGoal(id: string) {
    const updated = goals.filter(g => g.id !== id)
    handleSaveGoals(updated)
  }

  // 날짜 클릭 시 해당 날짜의 미완료 실행 아이템 로드
  function handleDayClick(day: number) {
    if (selectedDay === day) {
      setSelectedDay(null)
      setDayExecutions([])
      return
    }

    setSelectedDay(day)

    const dateStr = `${monthKey}-${String(day).padStart(2, '0')}`

    const filtered = executions.filter(item => {
      if (item.completed) return false
      const itemDate = item.createdAt.split('T')[0]
      return itemDate === dateStr
    })

    setDayExecutions(filtered)
  }

  // 달력 셀 생성
  const calendarCells = []
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && day === todayDate
    const count = dayCounts[day] || 0
    const hasRecord = count > 0
    const isSelected = selectedDay === day

    calendarCells.push(
      <button
        key={day}
        onClick={() => handleDayClick(day)}
        className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative transition-all ${
          isSelected
            ? 'bg-violet-500 text-white font-bold ring-2 ring-violet-400'
            : isToday
            ? 'bg-violet-500/30 text-white font-bold'
            : hasRecord
            ? 'bg-white/10 text-white hover:bg-white/15'
            : 'text-white/40 hover:bg-white/5'
        }`}
      >
        {day}
        {hasRecord && !isSelected && (
          <div className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-violet-400" />
        )}
      </button>
    )
  }

  const activeGoals = goals.filter(g => !g.completed)
  const completedGoals = goals.filter(g => g.completed)

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/checkin/bucket" className="flex items-center gap-1 hover:scale-105 transition-transform">
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white/50 text-xs font-medium">버킷리스트</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-white font-semibold">월간 목표</h1>
            <button
              onClick={() => setShowTip(true)}
              className="relative w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 text-[6px] text-slate-900 font-bold flex items-center justify-center">?</span>
            </button>
          </div>
          <Link href="/checkin" className="flex items-center gap-1 hover:scale-105 transition-transform">
            <span className="text-white/50 text-xs font-medium">실행</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </header>

      {/* 메인 */}
      <div className="pt-20 pb-24 px-4">
        <div className="max-w-md mx-auto">
          {/* 월 표시 */}
          <div className="text-center mb-4">
            <h2 className="text-white font-bold text-xl">{year}년 {monthNames[month]}</h2>
          </div>

          {/* 월 목표 (위로) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-white font-bold text-lg mb-3">
              {monthNames[month]} 목표
            </h3>

            <div className="space-y-3">
              {activeGoals.map((goal, i) => (
                <div
                  key={goal.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleGoalComplete(goal.id)}
                      disabled={!goal.text.trim()}
                      className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        goal.text.trim()
                          ? 'border-violet-500 hover:bg-violet-500/20'
                          : 'border-white/20'
                      }`}
                    />

                    <div className="flex-1">
                      <input
                        type="text"
                        value={goal.text}
                        onChange={e => handleGoalTextChange(goal.id, e.target.value)}
                        placeholder="목표를 입력하세요"
                        className="w-full bg-transparent text-white placeholder:text-white/25 focus:outline-none text-sm"
                      />
                    </div>

                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {completedGoals.map(goal => (
                <div
                  key={goal.id}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-green-400 font-medium text-sm line-through flex-1">{goal.text}</p>
                    <span className="text-green-400 text-xs font-medium">+10</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 추가 버튼 */}
            <button
              onClick={handleAddGoal}
              className="w-full mt-3 py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white/60 hover:border-white/30 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              목표 추가하기
            </button>

            <p className="text-white/30 text-xs text-center mt-3">
              목표를 달성하면 리포트에 기록되고 +10 에너지를 받아요
            </p>
          </motion.div>

          {/* 달력 (아래로) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-4"
          >
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="text-center text-white/30 text-xs font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            {/* 날짜 */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells}
            </div>
          </motion.div>

          {/* 선택된 날짜의 미완료 실행 아이템 */}
          <AnimatePresence>
            {selectedDay !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 bg-white/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-sm">
                      {month + 1}월 {selectedDay}일 미완료 실행
                    </h4>
                    <button onClick={() => { setSelectedDay(null); setDayExecutions([]) }} className="text-white/30 hover:text-white/60">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {dayExecutions.length === 0 ? (
                    <p className="text-white/30 text-sm text-center py-4">
                      이 날짜에 미완료 실행이 없습니다
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {dayExecutions.map(item => {
                        const area = GROWTH_AREAS[item.areaKey]
                        return (
                          <div key={item.id} className="bg-white/5 rounded-xl p-3">
                            <div className="flex items-start gap-2">
                              <span className="text-sm">{area?.icon || '⭐'}</span>
                              <div className="flex-1">
                                <span className="text-xs font-medium" style={{ color: area?.color || '#8b5cf6' }}>
                                  {area?.label || '기타'}
                                </span>
                                <p className="text-white text-sm mt-1 whitespace-pre-line">{item.text}</p>
                                {item.lessonTitle && (
                                  <p className="text-xs mt-1" style={{ color: area?.color || '#8b5cf6' }}>
                                    📚 {item.lessonTitle}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 도움말 모달 */}
      <AnimatePresence>
        {showTip && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTip(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-20 z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-5 shadow-2xl border border-amber-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold">목표 설정 팁</h3>
                  </div>
                  <button onClick={() => setShowTip(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-amber-500/10 rounded-xl p-4 mb-4">
                  <p className="text-amber-300 font-medium text-sm text-center">
                    작은 실행들이 모여 성과를 만듭니다
                  </p>
                </div>

                <h4 className="text-white font-bold text-sm mb-3">SMART 기법으로 목표 세우기</h4>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">S</span>
                    <div>
                      <p className="text-white text-sm font-medium">Specific - 구체적으로</p>
                      <p className="text-white/40 text-xs">무엇을, 어떻게 할지 명확하게</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">M</span>
                    <div>
                      <p className="text-white text-sm font-medium">Measurable - 측정 가능하게</p>
                      <p className="text-white/40 text-xs">숫자나 기준으로 확인할 수 있게</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">A</span>
                    <div>
                      <p className="text-white text-sm font-medium">Achievable - 달성 가능하게</p>
                      <p className="text-white/40 text-xs">노력하면 이룰 수 있는 수준으로</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">R</span>
                    <div>
                      <p className="text-white text-sm font-medium">Relevant - 의미 있게</p>
                      <p className="text-white/40 text-xs">나에게 중요한 목표인지 확인</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-xs font-bold text-rose-400">T</span>
                    <div>
                      <p className="text-white text-sm font-medium">Time-bound - 기한을 정해서</p>
                      <p className="text-white/40 text-xs">언제까지 달성할지 정하기</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 rounded-xl p-3">
                  <p className="text-white/40 text-xs">
                    예시: &quot;이번 달 안에 매일 30분 영어 공부하기&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="/checkin" />
    </main>
  )
}

export default function MonthlyPage() {
  return (
    <AuthGuard>
      <MonthlyContent />
    </AuthGuard>
  )
}
