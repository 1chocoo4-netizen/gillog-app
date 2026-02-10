'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Camera, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import {
  WORLD_LABELS,
  WORLD_ICONS,
  WORLD_COLORS,
  type ExecutionRecord,
} from '@/lib/executionHistory'

function HistoryContent() {
  const { history } = useUserData()
  const [allRecords, setAllRecords] = useState<ExecutionRecord[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filtered, setFiltered] = useState<ExecutionRecord[]>([])
  const [searched, setSearched] = useState(false)
  const [viewingPhoto, setViewingPhoto] = useState<string | null>(null)

  useEffect(() => {
    const records = [...history]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    setAllRecords(records)

    // 기본: 최근 20개 표시
    setFiltered(records.slice(0, 20))
  }, [history])

  const handleSearch = () => {
    if (!startDate && !endDate) {
      setFiltered(allRecords.slice(0, 20))
      setSearched(false)
      return
    }

    const results = allRecords.filter(r => {
      if (startDate && r.date < startDate) return false
      if (endDate && r.date > endDate) return false
      return true
    })

    setFiltered(results)
    setSearched(true)
  }

  const handleReset = () => {
    setStartDate('')
    setEndDate('')
    setFiltered(allRecords.slice(0, 20))
    setSearched(false)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }

  const formatTime = (isoStr: string) => {
    const date = new Date(isoStr)
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  // 날짜별로 그룹핑
  const groupedByDate: Record<string, ExecutionRecord[]> = {}
  filtered.forEach(record => {
    if (!groupedByDate[record.date]) {
      groupedByDate[record.date] = []
    }
    groupedByDate[record.date].push(record)
  })
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a))

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">실행 기록</h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-lg mx-auto space-y-4">

          {/* 날짜 검색 */}
          <div className="bg-white/5 rounded-xl p-4 space-y-3">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <Search className="w-4 h-4 text-violet-400" />
              날짜로 검색
            </h2>
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 [color-scheme:dark]"
              />
              <span className="text-white/40 text-sm">~</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 [color-scheme:dark]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSearch}
                className="flex-1 py-2.5 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium hover:bg-violet-500/30 transition-colors"
              >
                검색
              </button>
              {searched && (
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-sm hover:text-white/70 transition-colors"
                >
                  초기화
                </button>
              )}
            </div>
          </div>

          {/* 검색 결과 요약 */}
          {searched && (
            <p className="text-white/50 text-sm px-1">
              {filtered.length > 0
                ? `${filtered.length}개의 기록을 찾았습니다`
                : '해당 기간에 실행 기록이 없습니다'}
            </p>
          )}

          {/* 날짜별 그룹 기록 */}
          <AnimatePresence>
            {sortedDates.map(date => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <p className="text-white/60 text-xs font-medium px-1 pt-2">
                  {formatDate(date)}
                </p>
                <div className="bg-white/5 rounded-xl divide-y divide-white/5">
                  {groupedByDate[date].map(record => (
                    <div key={record.id} className="flex items-start gap-3 p-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{ backgroundColor: `${WORLD_COLORS[record.worldKey]}20` }}
                      >
                        {WORLD_ICONS[record.worldKey] || '📌'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{record.executionText}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: `${WORLD_COLORS[record.worldKey]}30`, color: WORLD_COLORS[record.worldKey] }}
                          >
                            {WORLD_LABELS[record.worldKey] || record.worldKey}
                          </span>
                          <span className="text-white/30 text-xs">{formatTime(record.completedAt)}</span>
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
              </motion.div>
            ))}
          </AnimatePresence>

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
          {allRecords.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl mb-4">
                📋
              </div>
              <p className="text-white/60 text-sm">아직 실행 기록이 없습니다</p>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}

export default function HistoryPage() {
  return (
    <AuthGuard>
      <HistoryContent />
    </AuthGuard>
  )
}
