'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy } from '@/lib/auth'

function DashboardContent() {
  const [energy, setEnergy] = useState(50)

  // 사용자별 에너지 불러오기
  useEffect(() => {
    setEnergy(getUserEnergy())
  }, [])

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="text-white/70 hover:text-white">
            ← 돌아가기
          </Link>
          <h1 className="text-white font-semibold">리포트</h1>
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
        <div className="max-w-lg mx-auto space-y-4">
          {/* 생활기록부용 리포트 */}
          <button
            className="w-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6 text-left hover:from-blue-500/30 hover:to-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-3xl">
                📚
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">생활기록부용 리포트</h3>
                <p className="text-white/50 text-sm mt-1">학교 제출용 성장 기록</p>
              </div>
            </div>
          </button>

          {/* 이력서용 리포트 */}
          <button
            className="w-full bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-6 text-left hover:from-violet-500/30 hover:to-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-violet-500/20 flex items-center justify-center text-3xl">
                💼
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">이력서용 리포트</h3>
                <p className="text-white/50 text-sm mt-1">면접 · 취업용 역량 기록</p>
              </div>
            </div>
          </button>
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
