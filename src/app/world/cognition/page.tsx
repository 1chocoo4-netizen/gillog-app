'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft, BookOpen, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'

export default function CognitionWorldPage() {
  const router = useRouter()
  const [energy, setEnergy] = useState(50)

  useEffect(() => {
    const saved = localStorage.getItem('gillog-energy')
    if (saved) {
      setEnergy(parseInt(saved, 10))
    }
  }, [])

  const handleTeaching = () => {
    router.push('/teaching')
  }

  const handleCoaching = () => {
    if (energy >= 2) {
      const newEnergy = energy - 2
      setEnergy(newEnergy)
      localStorage.setItem('gillog-energy', String(newEnergy))
      router.push('/lesson/cognition-1')
    }
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
          <h1 className="text-white font-semibold">인지 월드</h1>
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
          className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30"
        >
          <span className="text-5xl">🧠</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          인지 월드
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-sm mb-10 text-center"
        >
          생각하고, 이해하고, 기억하고, 문제를 해결하는 힘
        </motion.p>

        {/* 선택 버튼들 */}
        <div className="w-full max-w-sm space-y-4">
          {/* 티칭 버튼 */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
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

          {/* 코칭 버튼 */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleCoaching}
            disabled={energy < 2}
            className="w-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-5 flex items-center gap-4 hover:from-violet-500/30 hover:to-purple-500/30 transition-all active:scale-98 disabled:opacity-50"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-white font-bold text-lg">코칭</h3>
              <p className="text-white/50 text-sm">1:1 대화로 성장하기</p>
            </div>
            <div className="flex items-center gap-1 text-violet-400">
              <Zap className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">2</span>
            </div>
          </motion.button>
        </div>

        {/* 안내 문구 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/30 text-xs mt-8 text-center"
        >
          티칭으로 배우고, 코칭으로 실천해보세요
        </motion.p>
      </div>
    </main>
  )
}
