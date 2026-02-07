'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Flame, Calendar, TrendingUp, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy } from '@/lib/auth'
import {
  calculateOverallStats,
  getCalendarHeatmapData,
  getRecentRecords,
  getRecordsByDate,
  generateSampleData,
  clearSampleData,
  WORLD_LABELS,
  WORLD_ICONS,
  WORLD_COLORS,
  type OverallStats,
  type ExecutionRecord,
} from '@/lib/executionHistory'

function DashboardContent() {
  const [energy, setEnergy] = useState(50)
  const [stats, setStats] = useState<OverallStats | null>(null)
  const [heatmapData, setHeatmapData] = useState<{ date: string; count: number; level: number }[]>([])
  const [recentRecords, setRecentRecords] = useState<ExecutionRecord[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [dateRecords, setDateRecords] = useState<ExecutionRecord[]>([])

  const loadData = () => {
    setEnergy(getUserEnergy())
    setStats(calculateOverallStats())
    setHeatmapData(getCalendarHeatmapData(84)) // 12주
    setRecentRecords(getRecentRecords(10))
  }

  useEffect(() => {
    loadData()
  }, [])

  // 샘플 데이터 생성
  const handleGenerateSample = () => {
    generateSampleData()
    loadData()
    window.location.reload()
  }

  // 샘플 데이터 삭제
  const handleClearSample = () => {
    clearSampleData()
    loadData()
    window.location.reload()
  }

  // 날짜 선택 시 해당 날짜 기록 표시
  useEffect(() => {
    if (selectedDate) {
      setDateRecords(getRecordsByDate(selectedDate))
    }
  }, [selectedDate])

  // 히트맵 레벨별 색상
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-white/5'
      case 1: return 'bg-violet-500/30'
      case 2: return 'bg-violet-500/50'
      case 3: return 'bg-violet-500/70'
      case 4: return 'bg-violet-500'
      default: return 'bg-white/5'
    }
  }

  // 날짜 포맷
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  // 시간 포맷
  const formatTime = (isoStr: string) => {
    const date = new Date(isoStr)
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="text-white/70 hover:text-white">
            ← 돌아가기
          </Link>
          <h1 className="text-white font-semibold">성장 리포트</h1>
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
        <div className="max-w-lg mx-auto space-y-6">

          {/* 요약 통계 카드 */}
          {stats && (
            <div className="grid grid-cols-2 gap-3">
              {/* 총 실행 */}
              <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-violet-400" />
                  <span className="text-white/60 text-xs">총 실행</span>
                </div>
                <p className="text-white text-2xl font-bold">{stats.totalExecutions}</p>
              </div>

              {/* 연속 기록 */}
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-white/60 text-xs">연속 기록</span>
                </div>
                <p className="text-white text-2xl font-bold">{stats.currentStreak}일</p>
                <p className="text-white/40 text-xs mt-1">최장 {stats.longestStreak}일</p>
              </div>

              {/* 이번 주 */}
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/60 text-xs">이번 주</span>
                </div>
                <p className="text-white text-2xl font-bold">{stats.thisWeekExecutions}</p>
              </div>

              {/* 오늘 */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-white/60 text-xs">오늘</span>
                </div>
                <p className="text-white text-2xl font-bold">{stats.todayExecutions}</p>
              </div>
            </div>
          )}

          {/* 캘린더 히트맵 */}
          <div className="bg-white/5 rounded-xl p-4">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-400" />
              실행 캘린더
            </h2>

            {/* 히트맵 그리드 (7행 x 12주) */}
            <div className="overflow-x-auto">
              <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-max">
                {heatmapData.map((day, idx) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      w-4 h-4 rounded-sm transition-all
                      ${getLevelColor(day.level)}
                      ${selectedDate === day.date ? 'ring-2 ring-white' : ''}
                      hover:ring-1 hover:ring-white/50
                    `}
                    title={`${formatDate(day.date)}: ${day.count}회`}
                  />
                ))}
              </div>
            </div>

            {/* 범례 */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <span className="text-white/40 text-xs">적음</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div key={level} className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`} />
              ))}
              <span className="text-white/40 text-xs">많음</span>
            </div>
          </div>

          {/* 선택한 날짜의 기록 */}
          <AnimatePresence>
            {selectedDate && dateRecords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white/5 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">{formatDate(selectedDate)} 기록</h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-white/40 text-xs hover:text-white"
                  >
                    닫기
                  </button>
                </div>
                <div className="space-y-2">
                  {dateRecords.map(record => (
                    <div key={record.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <span className="text-xl">{WORLD_ICONS[record.worldKey] || '📌'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm line-clamp-2">{record.executionText}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${WORLD_COLORS[record.worldKey]}30`, color: WORLD_COLORS[record.worldKey] }}
                          >
                            {WORLD_LABELS[record.worldKey]}
                          </span>
                          <span className="text-white/30 text-xs">{formatTime(record.completedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 월드별 통계 */}
          {stats && stats.worldStats.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-white font-semibold mb-4">월드별 성장</h2>
              <div className="space-y-3">
                {stats.worldStats.map(ws => (
                  <div key={ws.worldKey}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/80 text-sm flex items-center gap-2">
                        <span>{WORLD_ICONS[ws.worldKey] || '📌'}</span>
                        <span>{WORLD_LABELS[ws.worldKey] || ws.worldKey}</span>
                      </span>
                      <span className="text-white/50 text-xs">{ws.count}회 ({ws.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ws.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: WORLD_COLORS[ws.worldKey] || '#8b5cf6' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 최근 실행 기록 */}
          {recentRecords.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4">
              <h2 className="text-white font-semibold mb-4">최근 기록</h2>
              <div className="space-y-3">
                {recentRecords.slice(0, 5).map(record => (
                  <div key={record.id} className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                      style={{ backgroundColor: `${WORLD_COLORS[record.worldKey]}20` }}
                    >
                      {WORLD_ICONS[record.worldKey] || '📌'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm line-clamp-2">{record.executionText}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/40 text-xs">{formatDate(record.date)}</span>
                        <span className="text-white/30 text-xs">•</span>
                        <span className="text-violet-400 text-xs">+{record.energy}⚡</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 빈 상태 */}
          {stats && stats.totalExecutions === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-4">
                📊
              </div>
              <p className="text-white/60 text-sm mb-2">아직 실행 기록이 없습니다</p>
              <p className="text-white/40 text-xs">코칭 세션을 완료하고 실행해보세요!</p>
            </div>
          )}

          {/* 리포트 내보내기 버튼 */}
          <div className="space-y-3 pt-4">
            <Link
              href="/dashboard/report"
              className="block w-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-5 text-left hover:from-blue-500/30 hover:to-cyan-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-2xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-white font-bold">생활기록부용 리포트</h3>
                    <p className="text-white/50 text-sm mt-0.5">대입 · 학교 제출용</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/resume"
              className="block w-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-5 text-left hover:from-violet-500/30 hover:to-purple-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-2xl">
                    💼
                  </div>
                  <div>
                    <h3 className="text-white font-bold">이력서용 리포트</h3>
                    <p className="text-white/50 text-sm mt-0.5">면접 · 취업용 역량 기록</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>
          </div>

          {/* 테스트용 버튼 (개발용) */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/30 text-xs text-center mb-3">🛠️ 테스트용</p>
            <div className="flex gap-2">
              <button
                onClick={handleGenerateSample}
                className="flex-1 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-500/30"
              >
                1년치 샘플 데이터 생성
              </button>
              <button
                onClick={handleClearSample}
                className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/30"
              >
                데이터 초기화
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/checkin" icon="⚡" label="실행" />
          <TabItem href="/dashboard" icon="📊" label="리포트" active />
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

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
