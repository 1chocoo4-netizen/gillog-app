'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

// Lottie를 SSR 없이 dynamic import
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface IntroCinematicProps {
  onFinish: () => void
}

// 씬 정의
const SCENES = [
  {
    id: 1,
    start: 0,
    end: 2,
    text: '당신은 지구 위 80억명 중 한 명뿐이라 소중합니다.',
  },
  {
    id: 2,
    start: 2,
    end: 5,
    text: '소중한 당신에겐 가능성과 잠재력이 있습니다.',
  },
  {
    id: 3,
    start: 5,
    end: 7.5,
    text: '가능성과 잠재력이 있는 당신은 창의적입니다.',
  },
  {
    id: 4,
    start: 7.5,
    end: 10,
    text: '지금부터, 나의 길을 저장하고 추적합니다.',
  },
  {
    id: 5,
    start: 10,
    end: 12,
    text: '그리고 나의 성장을 지켜봅니다.',
  },
]

export function IntroCinematic({ onFinish }: IntroCinematicProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const [lottieData, setLottieData] = useState<object | null>(null)
  const [lottieError, setLottieError] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // 현재 씬 계산
  const currentScene = useMemo(() => {
    return SCENES.find(s => currentTime >= s.start && currentTime < s.end) || SCENES[SCENES.length - 1]
  }, [currentTime])

  // reduced motion 체크
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    if (mediaQuery.matches) {
      // reduced motion이면 바로 Scene 5로
      setCurrentTime(10)
    }
  }, [])

  // Lottie 데이터 로드
  useEffect(() => {
    fetch('/intro/space.json')
      .then(res => res.json())
      .then(data => setLottieData(data))
      .catch(() => setLottieError(true))
  }, [])

  // 타이머 (12초 후 자동 종료)
  useEffect(() => {
    if (prefersReducedMotion) return

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= 12) {
          clearInterval(interval)
          return 12
        }
        return prev + 0.05
      })
    }, 50)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  // Scene 5에서 CTA 버튼 표시 여부
  const showCTA = currentTime >= 11

  // easeOut 트랜지션
  const textTransition = {
    duration: 0.6,
    ease: [0.25, 0.1, 0.25, 1], // easeOut
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0a0a1a]">
      {/* 우주 배경 - Lottie 또는 Fallback */}
      <div className="absolute inset-0">
        {lottieData && !lottieError ? (
          <Lottie
            animationData={lottieData}
            loop
            autoplay
            className="w-full h-full object-cover"
            style={{ position: 'absolute', inset: 0 }}
          />
        ) : (
          // Fallback: CSS 별 배경
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f1629] to-[#0a0a1a]">
            <div className="stars-fallback" />
          </div>
        )}
      </div>

      {/* 오버레이 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Scene 1: 지구 */}
        <AnimatePresence>
          {currentScene.id === 1 && (
            <motion.div
              key="earth"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={textTransition}
              className="absolute"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 shadow-2xl shadow-blue-500/30">
                {/* 지구 대륙 패턴 */}
                <div className="absolute inset-2 rounded-full overflow-hidden opacity-40">
                  <div className="absolute top-3 left-4 w-6 h-4 bg-green-400 rounded-full rotate-12" />
                  <div className="absolute top-8 right-3 w-8 h-5 bg-green-400 rounded-full -rotate-6" />
                  <div className="absolute bottom-4 left-6 w-5 h-3 bg-green-400 rounded-full" />
                </div>
                {/* 지구 광택 */}
                <div className="absolute top-2 left-3 w-8 h-8 bg-white/20 rounded-full blur-sm" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scene 2: 빛 원 확장 */}
        <AnimatePresence>
          {currentScene.id === 2 && (
            <motion.div
              key="glow"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="absolute"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-radial from-white/60 via-blue-300/30 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scene 3: Road Line */}
        <AnimatePresence>
          {currentScene.id === 3 && (
            <motion.svg
              key="road"
              width="300"
              height="100"
              viewBox="0 0 300 100"
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={textTransition}
            >
              <motion.path
                d="M 20 80 Q 80 20 150 50 T 280 30"
                fill="none"
                stroke="url(#roadGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="50%" stopColor="#A78BFA" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Scene 4: 그래프 */}
        <AnimatePresence>
          {currentScene.id === 4 && (
            <motion.svg
              key="graph"
              width="300"
              height="120"
              viewBox="0 0 300 120"
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={textTransition}
            >
              {/* 그래프 라인 */}
              <motion.polyline
                points="30,90 70,70 120,75 170,50 220,40 270,25"
                fill="none"
                stroke="url(#graphGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              {/* 데이터 포인트 */}
              {[
                { x: 30, y: 90, delay: 0.3 },
                { x: 70, y: 70, delay: 0.5 },
                { x: 120, y: 75, delay: 0.7 },
                { x: 170, y: 50, delay: 0.9 },
                { x: 220, y: 40, delay: 1.1 },
                { x: 270, y: 25, delay: 1.3 },
              ].map((point, i) => (
                <motion.circle
                  key={i}
                  cx={point.x}
                  cy={point.y}
                  r="6"
                  fill="white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: point.delay, duration: 0.3, ease: 'easeOut' }}
                />
              ))}
              <defs>
                <linearGradient id="graphGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
              </defs>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* 텍스트 */}
        <AnimatePresence mode="wait">
          <motion.p
            key={currentScene.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={textTransition}
            className="absolute bottom-[35%] text-white text-xl md:text-2xl font-medium text-center leading-relaxed max-w-md px-4"
          >
            {currentScene.text}
          </motion.p>
        </AnimatePresence>

        {/* Scene 5: CTA 버튼 */}
        <AnimatePresence>
          {showCTA && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...textTransition }}
              onClick={onFinish}
              className="absolute bottom-[20%] px-10 py-4 bg-white text-[#0a0a1a] font-bold text-lg rounded-full
                         hover:bg-white/90 active:scale-95 transition-all duration-200
                         shadow-lg shadow-white/20"
            >
              시작하기
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Skip 버튼 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onFinish}
        className="fixed bottom-6 right-6 z-20 px-4 py-2
                   text-white/60 text-sm font-medium
                   border border-white/20 rounded-full
                   hover:text-white hover:border-white/40 hover:bg-white/5
                   transition-all duration-200"
      >
        Skip
      </motion.button>

      {/* 진행 바 */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
          style={{ width: `${(currentTime / 12) * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Fallback 별 스타일 */}
      <style jsx>{`
        .stars-fallback {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 40% 70%, white, transparent),
            radial-gradient(1px 1px at 60% 20%, white, transparent),
            radial-gradient(2px 2px at 80% 50%, white, transparent),
            radial-gradient(1px 1px at 10% 80%, white, transparent),
            radial-gradient(1.5px 1.5px at 70% 90%, white, transparent),
            radial-gradient(1px 1px at 30% 50%, white, transparent),
            radial-gradient(2px 2px at 90% 10%, white, transparent);
          animation: twinkle 4s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
