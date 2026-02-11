'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import { BottomTabBar } from '@/components/BottomTabBar'

function WorldTeachingContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as WorldKey

  const { energy } = useUserData()

  const worldConfig = WORLD_CONFIGS[worldKey]

  if (!worldConfig) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">월드를 찾을 수 없습니다</div>
  }

  const handleChapterClick = (chapterKey: string) => {
    router.push(`/teaching/${worldKey}/${chapterKey}`)
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
          <h1 className="text-white font-semibold">{worldConfig.label} 학습</h1>
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
      <div className="pt-20 pb-24 px-4">
        {/* 월드 아이콘 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${worldConfig.color} flex items-center justify-center text-4xl shadow-lg`}>
            {worldConfig.icon}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white font-bold text-xl mb-1"
        >
          {worldConfig.label} 학습
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/50 text-sm mb-8"
        >
          {worldConfig.description}
        </motion.p>

        {/* 챕터 리스트 */}
        <div className="flex flex-col gap-3 max-w-md mx-auto">
          {worldConfig.chapters.map((chapter, index) => (
            <motion.button
              key={chapter.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleChapterClick(chapter.key)}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all bg-gradient-to-br ${chapter.gradient} border-white/20 hover:border-white/30`}
            >
              {/* 챕터 아이콘 */}
              <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${chapter.color}`}>
                <span className="text-2xl">{chapter.icon}</span>
              </div>

              {/* 챕터 정보 */}
              <div className="flex-1 text-left">
                <h3 className="font-bold text-sm text-white">
                  {chapter.label}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </main>
  )
}

export default function WorldTeachingPage() {
  return (
    <AuthGuard>
      <WorldTeachingContent />
    </AuthGuard>
  )
}
