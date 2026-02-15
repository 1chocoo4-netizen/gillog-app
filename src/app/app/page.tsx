'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { QuestBanner } from '@/components/map/QuestBanner'
import { MapArea } from '@/components/map/MapArea'
import { WorldKey, MapNode } from '@/components/map/WorldTokens'
import { AuthGuard } from '@/components/AuthGuard'
import { BottomTabBar } from '@/components/BottomTabBar'
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
      {/* 상단 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-white/5">
        {/* 로고 + 에너지 바 */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-bold text-base">길로그</span>
          </div>

          <div className="flex items-center gap-2.5">
            <LevelBadge />
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1.5">
                <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-white/50 font-semibold tabular-nums">{energy}</span>
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

      {/* 맵 영역 */}
      <div className="pt-[120px] pb-24">
        <MapArea
          selectedWorld={selectedWorld}
          onNodeClick={handleNodeClick}
          onNodeEnter={handleNodeEnter}
        />
      </div>

      <BottomTabBar activeTab="/app" />
    </main>
  )
}

export default function AppHomePage() {
  return (
    <AuthGuard>
      <AppHomeContent />
    </AuthGuard>
  )
}
