'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { QuestBanner } from '@/components/map/QuestBanner'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey, MapNode } from '@/components/map/WorldTokens'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'

function AppHomeContent() {
  const router = useRouter()
  const [selectedWorld, setSelectedWorld] = useState<WorldKey>('cognition')
  const { energy } = useUserData()

  const handleNodeClick = (node: MapNode) => {
    setSelectedWorld(node.worldKey)
  }

  const handleNodeEnter = (node: MapNode) => {
    router.push(`/teaching/${node.worldKey}`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 상단 HUD */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-2.5">
          {/* 로고 */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">G</span>
            </div>
            <span className="text-white font-semibold text-sm">길로그</span>
          </div>

          {/* 레벨 + 에너지 */}
          <div className="flex items-center gap-2">
            <LevelBadge />
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[11px] text-white/50 font-medium">{energy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 월드 선택 탭 */}
        <QuestBanner
          selectedWorld={selectedWorld}
          onWorldChange={setSelectedWorld}
        />
      </header>

      {/* 메인 맵 영역 */}
      <div className="pt-28 pb-20">
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
          <TabItem href="/coaching" icon="💬" label="코칭" />
          <TabItem href="/app" icon="🗺️" label="월드" active />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
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
        flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors min-w-[56px]
        ${active
          ? 'text-white'
          : 'text-white/40 hover:text-white/60'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-[10px] font-semibold ${active ? 'text-white' : 'text-white/50'}`}>
        {label}
      </span>
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
