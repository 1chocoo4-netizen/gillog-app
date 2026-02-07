'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Zap, Check, Bell, X, Plus, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge, updateLevelProgress } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy, addUserEnergy, getUserProgressKey } from '@/lib/auth'
import { saveExecutionRecord } from '@/lib/executionHistory'

// 6개 성장 영역
const GROWTH_AREAS = [
  { key: 'cognition', label: '인지', icon: '🧠', color: '#8b5cf6' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { key: 'habit', label: '습관', icon: '🔄', color: '#22c55e' },
  { key: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { key: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { key: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

// 월드별 레슨 목록
const WORLD_LESSONS: Record<string, { key: string; title: string }[]> = {
  cognition: [
    { key: 'focus', title: '집중력 향상' },
    { key: 'memory', title: '기억력 강화' },
    { key: 'thinking', title: '비판적 사고' },
    { key: 'learning', title: '효과적인 학습법' },
    { key: 'reading', title: '독해력 향상' },
    { key: 'custom', title: '직접 입력' },
  ],
  selfDirected: [
    { key: 'goal', title: '목표 설정' },
    { key: 'planning', title: '계획 세우기' },
    { key: 'time', title: '시간 관리' },
    { key: 'motivation', title: '동기 부여' },
    { key: 'decision', title: '의사결정' },
    { key: 'custom', title: '직접 입력' },
  ],
  habit: [
    { key: 'morning', title: '아침 루틴' },
    { key: 'study', title: '공부 습관' },
    { key: 'exercise', title: '운동 습관' },
    { key: 'sleep', title: '수면 관리' },
    { key: 'routine', title: '일상 루틴' },
    { key: 'custom', title: '직접 입력' },
  ],
  attitude: [
    { key: 'positive', title: '긍정적 마인드' },
    { key: 'resilience', title: '회복탄력성' },
    { key: 'growth', title: '성장 마인드셋' },
    { key: 'stress', title: '스트레스 관리' },
    { key: 'emotion', title: '감정 조절' },
    { key: 'custom', title: '직접 입력' },
  ],
  relationship: [
    { key: 'communication', title: '소통하기' },
    { key: 'empathy', title: '공감하기' },
    { key: 'conflict', title: '갈등 해결' },
    { key: 'teamwork', title: '협업하기' },
    { key: 'listening', title: '경청하기' },
    { key: 'custom', title: '직접 입력' },
  ],
  character: [
    { key: 'honesty', title: '정직함' },
    { key: 'responsibility', title: '책임감' },
    { key: 'respect', title: '존중하기' },
    { key: 'sharing', title: '나눔과 배려' },
    { key: 'service', title: '봉사하기' },
    { key: 'custom', title: '직접 입력' },
  ],
}

interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  text: string
  completed: boolean
  createdAt: string
  alarmTime?: string
}

type AddStep = 'closed' | 'world' | 'lesson' | 'text'

function ExecutionContent() {
  const router = useRouter()
  const [energy, setEnergy] = useState(50)
  const [items, setItems] = useState<ExecutionItem[]>([])
  const [showReward, setShowReward] = useState(false)
  const [alarmModal, setAlarmModal] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState('09:00')

  // 투두 추가 관련 상태
  const [addStep, setAddStep] = useState<AddStep>('closed')
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [todoText, setTodoText] = useState('')

  // 사용자별 데이터 불러오기
  useEffect(() => {
    setEnergy(getUserEnergy())
    const execKey = getUserProgressKey('executions') || 'gillog-executions-guest'
    const savedItems = localStorage.getItem(execKey)
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems))
      } catch {
        setItems([])
      }
    }
  }, [])

  // 아이템 저장
  function saveItems(newItems: ExecutionItem[]) {
    setItems(newItems)
    const execKey = getUserProgressKey('executions') || 'gillog-executions-guest'
    localStorage.setItem(execKey, JSON.stringify(newItems))
  }

  // 체크 완료 처리
  function handleComplete(itemId: string) {
    const item = items.find(i => i.id === itemId)
    if (!item || item.completed) return

    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, completed: true } : i
    )
    saveItems(updatedItems)

    const newEnergy = addUserEnergy(5)
    setEnergy(newEnergy)

    updateLevelProgress(item.areaKey, 1)

    saveExecutionRecord({
      worldKey: item.areaKey,
      areaKey: item.areaKey,
      subjectKey: item.subjectKey,
      lessonTitle: item.lessonTitle,
      executionText: item.text,
      energy: 5,
    })

    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
      router.push('/dashboard')
    }, 1500)
  }

  // 투두 추가 완료
  function handleAddTodo() {
    if (!selectedWorld || !todoText.trim()) return

    const world = GROWTH_AREAS.find(w => w.key === selectedWorld)
    const lesson = selectedLesson !== 'custom'
      ? WORLD_LESSONS[selectedWorld]?.find(l => l.key === selectedLesson)
      : null

    const newItem: ExecutionItem = {
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      areaKey: selectedWorld,
      subjectKey: selectedLesson || undefined,
      lessonTitle: lesson?.title || (selectedLesson === 'custom' ? '직접 입력' : undefined),
      text: todoText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    saveItems([...items, newItem])

    // 초기화
    setAddStep('closed')
    setSelectedWorld(null)
    setSelectedLesson(null)
    setTodoText('')
  }

  // 알람 설정
  function handleSetAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: selectedTime } : i
    )
    saveItems(updatedItems)
    setAlarmModal(null)

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  // 알람 삭제
  function handleRemoveAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: undefined } : i
    )
    saveItems(updatedItems)
  }

  // 아이템 삭제
  function handleDeleteItem(itemId: string) {
    const updatedItems = items.filter(i => i.id !== itemId)
    saveItems(updatedItems)
  }

  // 영역별로 아이템 그룹화
  const groupedItems = GROWTH_AREAS.map(area => ({
    ...area,
    items: items.filter(item => item.areaKey === area.key)
  }))

  const activeAreas = groupedItems.filter(area =>
    area.items.some(item => !item.completed)
  )

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="text-white/70 hover:text-white">
            ← 돌아가기
          </Link>
          <h1 className="text-white font-semibold">실행 관리</h1>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <motion.span
                key={energy}
                initial={{ scale: 1.5, color: '#facc15' }}
                animate={{ scale: 1, color: 'rgba(255,255,255,0.6)' }}
                className="text-xs font-medium"
              >
                {energy}
              </motion.span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-20 pb-32 px-4">
        {activeAreas.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-4">
              ⚡
            </div>
            <p className="text-white/60 text-sm mb-2">실행 항목이 없습니다</p>
            <p className="text-white/40 text-xs mb-6">아래 + 버튼을 눌러 직접 추가해보세요!</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
            {activeAreas.map(area => (
              <div key={area.key}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{area.icon}</span>
                  <h2 className="text-white font-semibold">{area.label}</h2>
                  <span className="text-white/30 text-xs ml-auto">
                    {area.items.filter(i => !i.completed).length}개
                  </span>
                </div>

                <div className="space-y-2">
                  {area.items.filter(item => !item.completed).map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleComplete(item.id)}
                          className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center hover:bg-white/10 transition-colors mt-0.5"
                          style={{ borderColor: area.color }}
                        >
                          {item.completed && (
                            <Check className="w-4 h-4" style={{ color: area.color }} />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-white text-sm leading-relaxed">
                            {item.text}
                          </p>
                          {item.lessonTitle && (
                            <p className="text-xs mt-1" style={{ color: area.color }}>
                              📚 {item.lessonTitle}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            <p className="text-white/30 text-xs">
                              완료 시 +5 ⚡
                            </p>
                            {item.alarmTime ? (
                              <button
                                onClick={() => {
                                  setSelectedTime(item.alarmTime || '09:00')
                                  setAlarmModal(item.id)
                                }}
                                className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full"
                              >
                                <Bell className="w-3 h-3" />
                                {item.alarmTime}
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedTime('09:00')
                                  setAlarmModal(item.id)
                                }}
                                className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60"
                              >
                                <Bell className="w-3 h-3" />
                                알람
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-xs text-red-400/60 hover:text-red-400"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 플로팅 추가 버튼 */}
      <button
        onClick={() => setAddStep('world')}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-40"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* 투두 추가 모달 */}
      <AnimatePresence>
        {addStep !== 'closed' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddStep('closed')}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-hidden"
            >
              <div className="bg-slate-800 rounded-t-3xl p-6 shadow-2xl border-t border-white/10">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">
                    {addStep === 'world' && '🌍 월드 선택'}
                    {addStep === 'lesson' && '📚 레슨 선택'}
                    {addStep === 'text' && '✍️ 실행 내용'}
                  </h3>
                  <button
                    onClick={() => setAddStep('closed')}
                    className="text-white/50 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Step 1: 월드 선택 */}
                {addStep === 'world' && (
                  <div className="grid grid-cols-2 gap-3">
                    {GROWTH_AREAS.map(area => (
                      <button
                        key={area.key}
                        onClick={() => {
                          setSelectedWorld(area.key)
                          setAddStep('lesson')
                        }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                      >
                        <span className="text-2xl mb-2 block">{area.icon}</span>
                        <span className="text-white font-medium">{area.label}</span>
                        <p className="text-white/40 text-xs mt-1">
                          {WORLD_LESSONS[area.key]?.length - 1}개 레슨
                        </p>
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 2: 레슨 선택 */}
                {addStep === 'lesson' && selectedWorld && (
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                    <button
                      onClick={() => setAddStep('world')}
                      className="text-white/50 text-sm mb-2 flex items-center gap-1"
                    >
                      ← {GROWTH_AREAS.find(w => w.key === selectedWorld)?.icon} {GROWTH_AREAS.find(w => w.key === selectedWorld)?.label}
                    </button>
                    {WORLD_LESSONS[selectedWorld]?.map(lesson => (
                      <button
                        key={lesson.key}
                        onClick={() => {
                          setSelectedLesson(lesson.key)
                          setAddStep('text')
                        }}
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left flex items-center justify-between"
                      >
                        <span className="text-white">{lesson.title}</span>
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: 텍스트 입력 */}
                {addStep === 'text' && selectedWorld && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setAddStep('lesson')}
                      className="text-white/50 text-sm mb-2 flex items-center gap-1"
                    >
                      ← {GROWTH_AREAS.find(w => w.key === selectedWorld)?.icon} {
                        selectedLesson !== 'custom'
                          ? WORLD_LESSONS[selectedWorld]?.find(l => l.key === selectedLesson)?.title
                          : '직접 입력'
                      }
                    </button>

                    <div>
                      <label className="text-white/60 text-sm mb-2 block">
                        오늘 실행할 내용을 적어주세요
                      </label>
                      <textarea
                        value={todoText}
                        onChange={e => setTodoText(e.target.value)}
                        placeholder="예: 오늘 수학 문제집 10문제 풀기"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 resize-none"
                        autoFocus
                      />
                    </div>

                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/50 text-xs">
                        ⚡ 실행 완료 시 에너지 +5, 레벨 진행도가 올라갑니다
                      </p>
                    </div>

                    <button
                      onClick={handleAddTodo}
                      disabled={!todoText.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold disabled:opacity-50"
                    >
                      투두 추가하기
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 알람 설정 모달 */}
      <AnimatePresence>
        {alarmModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlarmModal(null)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[30%] z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    알람 설정
                  </h3>
                  <button
                    onClick={() => setAlarmModal(null)}
                    className="text-white/50 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/50 mb-4"
                />

                <div className="flex gap-2">
                  {items.find(i => i.id === alarmModal)?.alarmTime && (
                    <button
                      onClick={() => {
                        handleRemoveAlarm(alarmModal)
                        setAlarmModal(null)
                      }}
                      className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-semibold"
                    >
                      삭제
                    </button>
                  )}
                  <button
                    onClick={() => handleSetAlarm(alarmModal)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  >
                    저장
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl px-8 py-6 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-8 h-8 text-yellow-400" fill="currentColor" />
              <span className="text-3xl font-bold text-white">+5</span>
            </div>
            <p className="text-white/80">실행 완료!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/checkin" icon="⚡" label="실행" active />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
          <TabItem href="/profile" icon="👤" label="프로필" />
        </div>
        <div className="h-safe-area-inset-bottom" />
      </nav>
    </main>
  )
}

function TabItem({
  href,
  icon,
  label,
  active = false
}: {
  href: string
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors
        ${active
          ? 'text-white'
          : 'text-white/40 hover:text-white/60'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-white/40'}`}>
        {label}
      </span>
    </Link>
  )
}

export default function ExecutionPage() {
  return (
    <AuthGuard>
      <ExecutionContent />
    </AuthGuard>
  )
}
