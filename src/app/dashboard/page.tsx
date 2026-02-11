'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, ChevronRight, Camera, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import {
  calculateOverallStats,
  getRecentRecords,
  WORLD_LABELS,
  WORLD_ICONS,
  WORLD_COLORS,
  type OverallStats,
  type ExecutionRecord,
} from '@/lib/executionHistory'

function DashboardContent() {
  const { energy, history } = useUserData()
  const [stats, setStats] = useState<OverallStats | null>(null)
  const [recentRecords, setRecentRecords] = useState<ExecutionRecord[]>([])
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null)

  useEffect(() => {
    setStats(calculateOverallStats(history))
    setRecentRecords(getRecentRecords(history, 5))
  }, [history])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-white/60 font-medium">{energy}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-20 pb-24 px-4">
        <div className="max-w-lg mx-auto space-y-6">

          {/* 리포트 내보내기 */}
          <div className="space-y-3">
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
                    <p className="text-white/50 text-sm mt-0.5">면접 · 취업용 리포트</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/record"
              className="block w-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-2xl p-5 text-left hover:from-cyan-500/30 hover:to-teal-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">
                    ✏️
                  </div>
                  <div>
                    <h3 className="text-white font-bold">쓰기용 리포트</h3>
                    <p className="text-white/50 text-sm mt-0.5">블로그 · SNS · 개인 기록용</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>
          </div>

          {/* 월드별 성장 */}
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
                      <span className="text-white/50 text-xs">{ws.count}회</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((ws.count / 1000) * 100, 100)}%` }}
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

          {/* 최근 기록 */}
          {recentRecords.length > 0 && (
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">최근 기록</h2>
                <Link
                  href="/dashboard/history"
                  className="text-violet-400 text-sm hover:text-violet-300 flex items-center gap-1"
                >
                  더보기
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {recentRecords.map(record => (
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
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-violet-400 text-xs">+{record.energy}⚡</span>
                        {(record as ExecutionRecord & { photoUrl?: string }).photoUrl && (
                          <button
                            onClick={() => setViewingPhoto((record as ExecutionRecord & { photoUrl?: string }).photoUrl!)}
                            className="flex items-center gap-1 text-cyan-400 text-xs hover:text-cyan-300 transition-colors"
                          >
                            <Camera className="w-3 h-3" />
                            사진
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 사진 보기 모달 */}
          <AnimatePresence>
            {viewingPhoto && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setViewingPhoto(null)}
                  className="fixed inset-0 bg-black/80 z-50"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-4 z-50 flex items-center justify-center"
                >
                  <div className="relative max-w-lg w-full">
                    <button
                      onClick={() => setViewingPhoto(null)}
                      className="absolute -top-10 right-0 text-white/60 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <img
                      src={viewingPhoto}
                      alt="실행 기록 사진"
                      className="w-full rounded-xl object-contain max-h-[70vh]"
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

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

        </div>
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/checkin" icon="⚡" label="실행" />
          <TabItem href="/coaching" icon="💬" label="코칭" />
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/dashboard" icon="📊" label="리포트" active />
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
