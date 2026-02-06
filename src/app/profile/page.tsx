'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy } from '@/lib/auth'

function ProfileContent() {
  const [energy, setEnergy] = useState(50)

  useEffect(() => {
    setEnergy(getUserEnergy())
  }, [])

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 상단 HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 로고/타이틀 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>

          {/* 레벨 + 에너지 */}
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

      {/* 메인 영역 - 비어있음 */}
      <div className="pt-20 pb-20">
        {/* 프로필 콘텐츠가 여기에 들어갈 수 있음 */}
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/checkin" icon="⚡" label="실행" />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
          <TabItem href="/profile" icon="👤" label="프로필" active />
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
      {active && (
        <motion.div
          layoutId="tabIndicator"
          className="absolute bottom-1 w-1 h-1 bg-white rounded-full"
        />
      )}
    </Link>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  )
}
