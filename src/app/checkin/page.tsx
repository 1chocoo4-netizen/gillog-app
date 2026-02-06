'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Check, Bell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge, updateLevelProgress } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy, addUserEnergy, getUserProgressKey } from '@/lib/auth'

// 6개 성장 영역
const GROWTH_AREAS = [
  { key: 'cognition', label: '인지', icon: '🧠' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯' },
  { key: 'habit', label: '습관', icon: '🔄' },
  { key: 'attitude', label: '태도', icon: '💪' },
  { key: 'expression', label: '표현', icon: '💬' },
  { key: 'character', label: '인성', icon: '❤️' },
]

interface ExecutionItem {
  id: string
  areaKey: string
  text: string
  completed: boolean
  createdAt: string
  alarmTime?: string  // HH:MM 형식
}

function ExecutionContent() {
  const [energy, setEnergy] = useState(50)
  const [items, setItems] = useState<ExecutionItem[]>([])
  const [showReward, setShowReward] = useState(false)
  const [alarmModal, setAlarmModal] = useState<string | null>(null)  // 알람 설정 중인 아이템 ID
  const [selectedTime, setSelectedTime] = useState('09:00')

  // 사용자별 데이터 불러오기
  useEffect(() => {
    setEnergy(getUserEnergy())

    const execKey = getUserProgressKey('executions')
    if (execKey) {
      const savedItems = localStorage.getItem(execKey)
      if (savedItems) {
        try {
          setItems(JSON.parse(savedItems))
        } catch {
          setItems([])
        }
      }
    }
  }, [])

  // 체크 완료 처리
  function handleComplete(itemId: string) {
    const item = items.find(i => i.id === itemId)
    if (!item || item.completed) return

    // 아이템 완료 표시
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, completed: true } : i
    )
    setItems(updatedItems)

    // 사용자별 실행 목록 저장
    const execKey = getUserProgressKey('executions')
    if (execKey) {
      localStorage.setItem(execKey, JSON.stringify(updatedItems))
    }

    // 에너지 +5 (사용자별)
    const newEnergy = addUserEnergy(5)
    setEnergy(newEnergy)

    // 레벨 진행도 업데이트
    updateLevelProgress(item.areaKey, 1)

    // 보상 표시
    setShowReward(true)
    setTimeout(() => setShowReward(false), 2000)
  }

  // 알람 설정
  function handleSetAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: selectedTime } : i
    )
    setItems(updatedItems)

    const execKey = getUserProgressKey('executions')
    if (execKey) {
      localStorage.setItem(execKey, JSON.stringify(updatedItems))
    }
    setAlarmModal(null)

    // 브라우저 알림 권한 요청
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  // 알람 삭제
  function handleRemoveAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: undefined } : i
    )
    setItems(updatedItems)

    const execKey = getUserProgressKey('executions')
    if (execKey) {
      localStorage.setItem(execKey, JSON.stringify(updatedItems))
    }
  }

  // 알람 모달 열기
  function openAlarmModal(itemId: string, currentTime?: string) {
    setSelectedTime(currentTime || '09:00')
    setAlarmModal(itemId)
  }

  // 영역별로 아이템 그룹화
  const groupedItems = GROWTH_AREAS.map(area => ({
    ...area,
    items: items.filter(item => item.areaKey === area.key)
  }))

  // 미완료 아이템이 있는 영역만 표시
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
      <div className="pt-20 pb-24 px-4">
        {activeAreas.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <p className="text-white/40 text-sm mb-2">실행 항목이 없습니다</p>
            <p className="text-white/30 text-xs">코칭 세션을 완료하면 실행 항목이 추가됩니다</p>
          </div>
        ) : (
          <div className="space-y-6 max-w-lg mx-auto">
            {activeAreas.map(area => (
              <div key={area.key}>
                {/* 영역 헤더 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{area.icon}</span>
                  <h2 className="text-white font-semibold">{area.label}</h2>
                </div>

                {/* 체크리스트 */}
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
                          className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-violet-500 flex items-center justify-center hover:bg-violet-500/20 transition-colors mt-0.5"
                        >
                          {item.completed && (
                            <Check className="w-4 h-4 text-violet-500" />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-white text-sm leading-relaxed">
                            {item.text}
                          </p>
                          <div className="flex items-center gap-3 mt-2">
                            <p className="text-white/30 text-xs">
                              완료 시 +5 ⚡
                            </p>
                            {/* 알람 표시/설정 */}
                            {item.alarmTime ? (
                              <button
                                onClick={() => openAlarmModal(item.id, item.alarmTime)}
                                className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full"
                              >
                                <Bell className="w-3 h-3" />
                                {item.alarmTime}
                              </button>
                            ) : (
                              <button
                                onClick={() => openAlarmModal(item.id)}
                                className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60"
                              >
                                <Bell className="w-3 h-3" />
                                알람 설정
                              </button>
                            )}
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

                <p className="text-white/60 text-sm mb-4">
                  실행할 시간을 설정하세요
                </p>

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
                      알람 삭제
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
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
