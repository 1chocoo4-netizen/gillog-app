'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'

export default function LessonPage() {
  const [energy] = useState(48)

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 상단 HUD - 에너지 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 로고/타이틀 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>

          {/* 에너지 게이지 */}
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
      </header>

      {/* 메인 콘텐츠 영역 (빈 공간) */}
      <div
        className="pt-16 min-h-screen"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(15, 23, 42, 1) 0%,
              rgba(15, 23, 42, 0.98) 50%,
              rgba(20, 30, 50, 1) 100%
            )
          `,
        }}
      >
        {/* 배경 노이즈 텍스처 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/app" icon="🗺️" label="맵" />
          <TabItem href="/checkin" icon="✅" label="체크인" />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
          <TabItem href="/profile" icon="👤" label="프로필" />
        </div>
        {/* iOS 홈 인디케이터 영역 */}
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
