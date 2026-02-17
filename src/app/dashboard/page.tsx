'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, ChevronRight, Camera, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { BottomTabBar } from '@/components/BottomTabBar'
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
    <main className="h-[100dvh] bg-slate-900 overflow-hidden">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5 pt-safe">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-[11px]">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-20 h-2.5 bg-white/10 rounded-full overflow-hidden">
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
      <div className="h-full pt-28 pb-28 px-4 overflow-y-auto">
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">생활기록부 리포트</h3>
                      <span className="text-yellow-400 text-xs font-medium">⭐-5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-0.5">대입 · 학교 제출용</p>
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">이력서 리포트</h3>
                      <span className="text-yellow-400 text-xs font-medium">⭐-5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-0.5">면접 · 취업용 리포트</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/marketing"
              className="block w-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-2xl p-5 text-left hover:from-orange-500/30 hover:to-amber-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">
                    📣
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">마케팅 리포트</h3>
                      <span className="text-yellow-400 text-xs font-medium">⭐-5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-0.5">영업 · 홍보 · 광고용</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
              </div>
            </Link>

            <Link
              href="/dashboard/business"
              className="block w-full bg-gradient-to-br from-slate-500/20 to-gray-500/20 border border-slate-500/30 rounded-2xl p-5 text-left hover:from-slate-500/30 hover:to-gray-500/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-500/20 flex items-center justify-center text-2xl">
                    📋
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">업무 리포트</h3>
                      <span className="text-yellow-400 text-xs font-medium">⭐-5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-0.5">보고서 · 회의록 · 업무 문서</p>
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
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold">글쓰기 리포트</h3>
                      <span className="text-yellow-400 text-xs font-medium">⭐-5</span>
                    </div>
                    <p className="text-white/60 text-sm mt-0.5">블로그 · SNS · 개인 기록용</p>
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
                        <span className="text-white/50 text-xs">{formatDate(record.date)}</span>
                        <span className="text-white/30 text-xs">·</span>
                        <span className="text-violet-400 text-xs">+{record.energy}⭐</span>
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

      <BottomTabBar activeTab="/dashboard" />
    </main>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
