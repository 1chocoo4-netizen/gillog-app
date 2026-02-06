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
  const [showInput, setShowInput] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [textInput, setTextInput] = useState('')

  useEffect(() => {
    fetch('/lottie/Talking Character.json')
      .then(res => res.json())
      .then(data => {
        setAnimationData(data)
        setTimeout(() => setShowBubble(true), 800)
        setTimeout(() => setShowInput(true), 1500)
      })
  }, [])

  const coachMessage = "안녕! 여기서는 인지 학습 코칭을 시작할 거야.\n인지 능력은 생각하고, 이해하고, 기억하고, 문제를 해결하는 힘이야.\n먼저, 스스로 생각했을 때 인지 능력과 학습 능력이 10점 만점에 몇 점 정도라고 느껴?"

  const handleNumberSelect = (num: number) => {
    setSelectedNumber(num)
  }

  return (
    <main className="min-h-screen bg-slate-900 overflow-hidden flex flex-col">
      {/* 상단 HUD - 에너지 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-white font-semibold">길로그</span>
          </div>

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
        className="flex-1 pt-20 pb-48 px-4 flex flex-col items-center relative overflow-y-auto"
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
          className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15), transparent 70%)',
          }}
        />

        {/* AI 코치 캐릭터 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-48 h-48"
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
            className="relative z-20 mx-4 mt-4 max-w-sm"
          >
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
                className="relative rounded-3xl p-5 backdrop-blur-sm"
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
                {/* 말풍선 꼬리 */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  }}
                />

                <p className="text-slate-700 text-[15px] leading-relaxed font-medium text-center whitespace-pre-line">
                  {coachMessage}
                </p>

                {/* 반짝이 효과 */}
                <motion.div
                  className="absolute top-3 right-4 w-2 h-2 rounded-full bg-violet-300"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 하단 입력 영역 */}
      {showInput && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-6"
        >
          {!isConfirmed ? (
            <>
              <p className="text-white/60 text-sm text-center mb-4">점수를 선택해주세요</p>

              {/* 숫자 버튼들 - 2줄로 */}
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                {/* 1-5 */}
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <motion.button
                      key={num}
                      onClick={() => handleNumberSelect(num)}
                      className={`
                        w-12 h-12 rounded-full font-bold text-lg transition-all
                        ${selectedNumber === num
                          ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
                {/* 6-10 */}
                <div className="flex justify-center gap-3">
                  {[6, 7, 8, 9, 10].map((num) => (
                    <motion.button
                      key={num}
                      onClick={() => handleNumberSelect(num)}
                      className={`
                        w-12 h-12 rounded-full font-bold text-lg transition-all
                        ${selectedNumber === num
                          ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                          : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 확인 버튼 */}
              {selectedNumber && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setIsConfirmed(true)}
                  className="mt-6 w-full max-w-xs mx-auto block py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-violet-500/30"
                  whileTap={{ scale: 0.98 }}
                >
                  확인
                </motion.button>
              )}
            </>
          ) : (
            /* 텍스트 입력 영역 */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="생각을 자유롭게 적어주세요..."
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-2xl px-4 py-3 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 border border-white/10"
                  rows={3}
                />
                <button
                  className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}

          <div className="h-safe-area-inset-bottom" />
        </motion.div>
      )}
    </main>
  )
}
