'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import { BottomTabBar } from '@/components/BottomTabBar'
import PaywallBanner from '@/components/PaywallBanner'

function WorldTeachingContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as WorldKey

  const { energy, subscriptionInfo } = useUserData()
  const [showPaywall, setShowPaywall] = useState(false)
  const isFreeUser = subscriptionInfo.plan === 'free'

  const worldConfig = WORLD_CONFIGS[worldKey]

  if (!worldConfig) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">월드를 찾을 수 없습니다</div>
  }

  const handleChapterClick = (chapterKey: string, index: number) => {
    // 무료 사용자: 첫 레슨만 접근 가능
    if (isFreeUser && index > 0) {
      setShowPaywall(true)
      return
    }
    router.push(`/teaching/${worldKey}/${chapterKey}`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/app" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">{worldConfig.label} 학습</h1>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
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
              onClick={() => handleChapterClick(chapter.key, index)}
              className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all bg-gradient-to-br ${chapter.gradient} ${isFreeUser && index > 0 ? 'opacity-50 border-white/10' : 'border-white/20 hover:border-white/30'}`}
            >
              {/* 챕터 아이콘 */}
              <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${chapter.color}`}>
                <span className="text-2xl">{isFreeUser && index > 0 ? '🔒' : chapter.icon}</span>
              </div>

              {/* 챕터 정보 */}
              <div className="flex-1 text-left">
                <h3 className="font-bold text-sm text-white">
                  {chapter.label}
                </h3>
                {isFreeUser && index > 0 && (
                  <p className="text-xs text-white/40 mt-0.5">프리미엄 전용</p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 무료 사용자 페이월 모달 */}
      <AnimatePresence>
        {showPaywall && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaywall(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              <PaywallBanner message="이 레슨은 프리미엄 전용입니다" />
              <button
                onClick={() => setShowPaywall(false)}
                className="w-full py-4 text-center text-gray-400 text-sm bg-gray-900"
              >
                닫기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
