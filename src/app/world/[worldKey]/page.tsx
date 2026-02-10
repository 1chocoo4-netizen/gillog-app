'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'

function WorldContent() {
  const router = useRouter()
  const params = useParams()
  const worldKey = params.worldKey as WorldKey
  const { energy } = useUserData()

  const worldConfig = WORLD_CONFIGS[worldKey]

  if (!worldConfig) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">월드를 찾을 수 없습니다</div>
  }

  const handleTeaching = () => {
    router.push(`/teaching/${worldKey}`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">{worldConfig.label} 월드</h1>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-24 pb-8 px-4 min-h-screen flex flex-col items-center justify-center">
        {/* 월드 아이콘 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className={`w-24 h-24 rounded-full bg-gradient-to-br ${worldConfig.color} flex items-center justify-center mb-6 shadow-lg`}
          style={{ boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)' }}
        >
          <span className="text-5xl">{worldConfig.icon}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {worldConfig.label} 월드
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm mb-10 text-center"
        >
          {worldConfig.description}
        </motion.p>

        {/* 티칭 버튼 */}
        <div className="w-full max-w-sm">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleTeaching}
            className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-5 flex items-center gap-4 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all active:scale-98"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-bold text-lg">티칭</h3>
              <p className="text-white/50 text-sm">핵심 원리 배우기</p>
            </div>
            <div className="text-cyan-400 text-2xl">→</div>
          </motion.button>
        </div>
      </div>
    </main>
  )
}

export default function WorldPage() {
  return (
    <AuthGuard>
      <WorldContent />
    </AuthGuard>
  )
}
