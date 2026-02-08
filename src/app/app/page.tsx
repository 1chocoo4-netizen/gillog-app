'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { QuestBanner } from '@/components/map/QuestBanner'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey, MapNode } from '@/components/map/WorldTokens'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy } from '@/lib/auth'

function AppHomeContent() {
  const router = useRouter()
  const [selectedWorld, setSelectedWorld] = useState<WorldKey>('cognition')
  const [energy, setEnergy] = useState(50)

  // 사용자별 에너지 불러오기
  useEffect(() => {
    setEnergy(getUserEnergy())
  }, [])

  const handleNodeClick = (node: MapNode) => {
    // 해당 월드만 선택 (페이지 이동 없음)
    setSelectedWorld(node.worldKey)
  }

  const handleNodeEnter = (node: MapNode) => {
    // 모든 월드는 선택 화면으로 이동
    router.push(`/world/${node.worldKey}`)
  }

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

        {/* 월드 선택 배너 */}
        <QuestBanner
          selectedWorld={selectedWorld}
          onWorldChange={setSelectedWorld}
        />
      </header>

      {/* 메인 맵 영역 */}
      <div className="pt-32">
        <MapArea
          selectedWorld={selectedWorld}
          onNodeClick={handleNodeClick}
          onNodeEnter={handleNodeEnter}
        />
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/checkin" icon="⚡" label="실행" />
          <TabItem href="/app" icon="🗺️" label="월드" active />
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

export default function AppHomePage() {
  return (
    <AuthGuard>
      <AppHomeContent />
    </AuthGuard>
  )
}
