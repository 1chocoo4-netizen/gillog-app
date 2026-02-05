'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AvatarCoachProps {
  coachName?: string
  isListening?: boolean
  isSpeaking?: boolean
}

export function AvatarCoach({
  coachName = '코치',
  isListening = false,
  isSpeaking = false
}: AvatarCoachProps) {
  const [blinkState, setBlinkState] = useState(false)
  const [mouthState, setMouthState] = useState(0)
  const [headTilt, setHeadTilt] = useState(0)

  // 자연스러운 눈 깜빡임
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true)
      setTimeout(() => setBlinkState(false), 150)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  // 말할 때 입 움직임
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        setMouthState(Math.floor(Math.random() * 3))
      }, 100)
      return () => clearInterval(mouthInterval)
    } else {
      setMouthState(0)
    }
  }, [isSpeaking])

  // 자연스러운 머리 움직임
  useEffect(() => {
    const headInterval = setInterval(() => {
      setHeadTilt((Math.random() - 0.5) * 6)
    }, 2000 + Math.random() * 1000)

    return () => clearInterval(headInterval)
  }, [])

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 화상통화 프레임 */}
      <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl border-4 border-gray-300">
        {/* 비디오 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

        {/* 아바타 컨테이너 */}
        <motion.div
          className="relative aspect-[4/5] flex items-center justify-center"
          animate={{ rotate: headTilt }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          {/* 몸체 */}
          <div className="absolute bottom-0 w-full">
            <svg viewBox="0 0 200 80" className="w-full">
              {/* 어깨/상체 */}
              <ellipse cx="100" cy="80" rx="90" ry="50" fill="#4A5568" />
              {/* 목 */}
              <rect x="85" y="20" width="30" height="40" fill="#D69E7E" rx="5" />
              {/* 셔츠 칼라 */}
              <path d="M70 60 Q100 45 130 60 L125 80 L75 80 Z" fill="#2D3748" />
            </svg>
          </div>

          {/* 얼굴 */}
          <motion.div
            className="relative z-10"
            animate={{ y: isSpeaking ? [0, -2, 0] : 0 }}
            transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.3 }}
          >
            <svg viewBox="0 0 120 150" className="w-40 h-52">
              {/* 얼굴 윤곽 */}
              <ellipse cx="60" cy="70" rx="50" ry="60" fill="#E8C4A0" />

              {/* 머리카락 */}
              <path
                d="M15 55 Q10 20 60 10 Q110 20 105 55 Q100 35 60 30 Q20 35 15 55"
                fill="#1A1A2E"
              />
              <ellipse cx="60" cy="25" rx="45" ry="20" fill="#1A1A2E" />

              {/* 귀 */}
              <ellipse cx="12" cy="70" rx="8" ry="15" fill="#D4A574" />
              <ellipse cx="108" cy="70" rx="8" ry="15" fill="#D4A574" />

              {/* 눈썹 */}
              <path d="M30 50 Q40 45 50 50" stroke="#3D3D3D" strokeWidth="2" fill="none" />
              <path d="M70 50 Q80 45 90 50" stroke="#3D3D3D" strokeWidth="2" fill="none" />

              {/* 눈 */}
              <g>
                {/* 왼쪽 눈 */}
                <ellipse cx="40" cy="65" rx="12" ry={blinkState ? 1 : 8} fill="white" />
                {!blinkState && (
                  <>
                    <circle cx="40" cy="65" r="5" fill="#2D1B0E" />
                    <circle cx="42" cy="63" r="2" fill="white" />
                  </>
                )}

                {/* 오른쪽 눈 */}
                <ellipse cx="80" cy="65" rx="12" ry={blinkState ? 1 : 8} fill="white" />
                {!blinkState && (
                  <>
                    <circle cx="80" cy="65" r="5" fill="#2D1B0E" />
                    <circle cx="82" cy="63" r="2" fill="white" />
                  </>
                )}
              </g>

              {/* 코 */}
              <path
                d="M57 75 Q60 85 63 75"
                stroke="#C4956A"
                strokeWidth="2"
                fill="none"
              />

              {/* 입 */}
              <AnimatePresence mode="wait">
                {mouthState === 0 && (
                  <motion.path
                    key="closed"
                    d="M45 100 Q60 105 75 100"
                    stroke="#B85C5C"
                    strokeWidth="3"
                    fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {mouthState === 1 && (
                  <motion.ellipse
                    key="open1"
                    cx="60"
                    cy="100"
                    rx="10"
                    ry="5"
                    fill="#8B4513"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {mouthState === 2 && (
                  <motion.ellipse
                    key="open2"
                    cx="60"
                    cy="100"
                    rx="8"
                    ry="8"
                    fill="#8B4513"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>

              {/* 볼 터치 (홍조) */}
              <ellipse cx="25" cy="85" rx="10" ry="6" fill="#FFB6B6" opacity="0.4" />
              <ellipse cx="95" cy="85" rx="10" ry="6" fill="#FFB6B6" opacity="0.4" />
            </svg>
          </motion.div>
        </motion.div>

        {/* 화상통화 UI 오버레이 */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-gray-600 font-medium">LIVE</span>
        </div>

        {/* 듣는 중 인디케이터 */}
        {isListening && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-500 rounded-full"
                animate={{
                  height: [8, 20, 8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 코치 이름 */}
      <div className="text-center mt-3">
        <p className="text-lg font-semibold text-[var(--gl-text)]">{coachName}</p>
        <p className="text-sm text-[var(--gl-text-muted)]">
          {isSpeaking ? '말하는 중...' : isListening ? '듣는 중...' : 'AI 코치'}
        </p>
      </div>
    </div>
  )
}
