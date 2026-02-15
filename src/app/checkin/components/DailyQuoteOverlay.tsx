'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DAILY_QUOTES, getDailyQuote, getUserSeed } from '@/data/dailyQuotes'

/** 로컬 시간 기준 "YYYY-MM-DD" */
function getLocalDateStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const STORAGE_KEY = 'gillog-daily-quote-shown'

const WORLD_OPTIONS = [
  { key: 'cognition', label: '인지(학습)', icon: '🧠', color: '#8b5cf6' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { key: 'habit', label: '습관', icon: '📚', color: '#22c55e' },
  { key: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { key: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { key: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

type Step = 'quote' | 'selectWorld' | 'done'

interface DailyQuoteOverlayProps {
  onRegister: (text: string, worlds: string[]) => void
}

export default function DailyQuoteOverlay({ onRegister }: DailyQuoteOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState<Step>('quote')
  const [executionText, setExecutionText] = useState('')
  const [selectedWorlds, setSelectedWorlds] = useState<string[]>([])
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)

  useEffect(() => {
    const today = getLocalDateStr()
    const lastShown = localStorage.getItem(STORAGE_KEY)
    if (lastShown === today) return

    setQuote(getDailyQuote(DAILY_QUOTES, getUserSeed()))
    setVisible(true)
  }, [])

  function handleNext() {
    if (!executionText.trim()) return
    setStep('selectWorld')
  }

  function toggleWorld(key: string) {
    setSelectedWorlds(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  function handleRegister() {
    if (selectedWorlds.length === 0) return
    localStorage.setItem(STORAGE_KEY, getLocalDateStr())
    setStep('done')
    onRegister(executionText.trim(), selectedWorlds)

    setTimeout(() => {
      setVisible(false)
    }, 2500)
  }

  function handleSkip() {
    localStorage.setItem(STORAGE_KEY, getLocalDateStr())
    setVisible(false)
  }

  if (!visible || !quote) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-md mx-4 flex flex-col items-center"
          >
            {step === 'quote' && (
              <>
                {/* 명언 */}
                <div className="text-center mb-10 px-4">
                  <p className="text-[15px] leading-relaxed text-white/90 font-medium whitespace-pre-line">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-amber-400/80 font-medium">
                    &mdash; {quote.author}
                  </p>
                </div>

                {/* 구분선 */}
                <div className="w-12 h-px bg-white/10 mb-8" />

                {/* 오늘의 실행 입력 */}
                <div className="w-full px-2">
                  <p className="text-center text-white/60 text-sm font-medium mb-4">
                    오늘의 실행은?
                  </p>
                  <input
                    type="text"
                    value={executionText}
                    onChange={(e) => setExecutionText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNext() }}
                    placeholder="오늘 실행할 한 가지를 적어보세요"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSkip}
                      className="flex-1 py-3 rounded-xl text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
                    >
                      건너뛰기
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!executionText.trim()}
                      className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      다음
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 'selectWorld' && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full px-2"
              >
                <p className="text-center text-white/60 text-sm font-medium mb-5">
                  어떤 영역에 등록할까요?
                </p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {WORLD_OPTIONS.map(w => {
                    const selected = selectedWorlds.includes(w.key)
                    return (
                      <button
                        key={w.key}
                        onClick={() => toggleWorld(w.key)}
                        className="flex flex-col items-center gap-1 py-3 rounded-xl border transition-all"
                        style={{
                          borderColor: selected ? w.color : 'rgba(255,255,255,0.08)',
                          backgroundColor: selected ? `${w.color}15` : 'rgba(255,255,255,0.03)',
                        }}
                      >
                        <span className="text-xl">{w.icon}</span>
                        <span className={`text-xs font-medium ${selected ? 'text-white' : 'text-white/50'}`}>
                          {w.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep('quote')}
                    className="flex-1 py-3 rounded-xl text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    이전
                  </button>
                  <button
                    onClick={handleRegister}
                    disabled={selectedWorlds.length === 0}
                    className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    등록
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'done' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center px-4"
              >
                <p className="text-lg text-white font-medium leading-relaxed">
                  소중한 당신의 한걸음을<br />진심으로 응원합니다
                </p>
                <div className="mt-4 text-3xl">🌟</div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
