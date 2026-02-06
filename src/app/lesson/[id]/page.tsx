'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function LessonPage() {
  const [energy] = useState(48)
  const [animationData, setAnimationData] = useState<object | null>(null)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    fetch('/lottie/Talking Character.json')
      .then(res => res.json())
      .then(data => {
        setAnimationData(data)
        // 캐릭터 등장 후 말풍선 표시
        setTimeout(() => setShowBubble(true), 800)
      })
  }, [])

  const coachMessage = "안녕! 여기서는 인지 학습 코칭을 시작할 거야.\n인지 능력은 생각하고, 이해하고, 기억하고, 문제를 해결하는 힘이야.\n먼저, 스스로 생각했을 때 인지 능력과 학습 능력이 10점 만점에 몇 점 정도라고 느껴?"

  return (
    <main className="min-h-screen bg-slate-900 overflow-hidden">
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

      {/* 메인 콘텐츠 영역 */}
      <div
        className="pt-16 min-h-screen flex flex-col items-center justify-center relative"
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
        {/* 배경 글로우 */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15), transparent 70%)',
          }}
        />

        {/* AI 코치 캐릭터 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-64 h-64"
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              className="w-full h-full"
            />
          )}
        </motion.div>

        {/* 말풍선 */}
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-20 mx-4 mt-6 max-w-sm"
          >
            {/* 말풍선 본체 */}
            <div className="relative">
              {/* 글로우 효과 */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.4), rgba(139, 92, 246, 0.3))',
                }}
              />

              {/* 메인 버블 */}
              <div
                className="relative rounded-3xl p-6 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
                  boxShadow: `
                    0 4px 6px -1px rgba(0, 0, 0, 0.1),
                    0 20px 40px -10px rgba(139, 92, 246, 0.3),
                    0 0 0 1px rgba(255,255,255,0.8) inset,
                    0 2px 0 rgba(255,255,255,1) inset
                  `,
                }}
              >
                {/* 하이라이트 라인 */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  }}
                />

                {/* 말풍선 꼬리 */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'drop-shadow(0 -2px 2px rgba(139, 92, 246, 0.1))',
                  }}
                />

                {/* 텍스트 */}
                <p className="text-slate-700 text-base leading-relaxed font-medium text-center whitespace-pre-line">
                  {coachMessage}
                </p>

                {/* 반짝이 효과 */}
                <motion.div
                  className="absolute top-3 right-4 w-2 h-2 rounded-full bg-violet-300"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-5 w-1.5 h-1.5 rounded-full bg-purple-300"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/app" icon="🗺️" label="맵" />
          <TabItem href="/checkin" icon="✅" label="체크인" />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
          <TabItem href="/profile" icon="👤" label="프로필" />
        </div>
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
        ${active ? 'text-white' : 'text-white/40 hover:text-white/60'}
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className={`text-xs font-medium ${active ? 'text-white' : 'text-white/40'}`}>
        {label}
      </span>
    </Link>
  )
}
