'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      onFinish()
      return
    }

    const timer = setTimeout(onFinish, 3000)
    return () => clearTimeout(timer)
  }, [onFinish])

  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#0a0a1a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* SVG 길(Path) - S자 커브 with 6 world colors */}
      <svg
        width="240"
        height="120"
        viewBox="0 0 240 120"
        className="absolute top-[28%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="splashPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />    {/* violet */}
            <stop offset="20%" stopColor="#06B6D4" />   {/* cyan */}
            <stop offset="40%" stopColor="#22C55E" />   {/* green */}
            <stop offset="60%" stopColor="#F59E0B" />   {/* amber */}
            <stop offset="80%" stopColor="#EC4899" />   {/* pink */}
            <stop offset="100%" stopColor="#F97316" />  {/* orange */}
          </linearGradient>
        </defs>
        <motion.path
          d="M 20 100 Q 60 10, 120 55 T 220 20"
          fill="none"
          stroke="url(#splashPathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>

      {/* "G" 로고 - 보라색 그라데이션 원형 */}
      <motion.div
        className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-500/30"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="text-white text-4xl font-bold select-none" style={{ fontFamily: 'Pretendard, sans-serif' }}>
          G
        </span>
      </motion.div>

      {/* "길로그" 텍스트 */}
      <motion.h1
        className="mt-5 text-white text-3xl font-bold tracking-tight select-none"
        style={{ fontFamily: 'Pretendard, sans-serif' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        길로그
      </motion.h1>

      {/* 전체 페이드아웃 */}
      <motion.div
        className="absolute inset-0 bg-[#0a0a1a] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5, ease: 'easeIn' }}
      />
    </motion.div>
  )
}
