'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DAILY_QUOTES } from '@/data/dailyQuotes'

/** 로컬 시간 기준 "YYYY-MM-DD" */
function getLocalDateStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const STORAGE_KEY_EXEC = 'gillog-daily-quote-shown'
const STORAGE_KEY_CHECKIN = 'gillog-checkin-last-ts'
const SIX_HOURS_MS = 6 * 60 * 60 * 1000

/** 감정 체크인이 필요한지 (마지막 체크인으로부터 6시간 경과) */
function needsCheckin(): boolean {
  if (typeof window === 'undefined') return true
  const last = localStorage.getItem(STORAGE_KEY_CHECKIN)
  if (!last) return true
  return Date.now() - Number(last) >= SIX_HOURS_MS
}

const WORLD_OPTIONS = [
  { key: 'cognition', label: '인지(학습)', icon: '🧠', color: '#8b5cf6' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { key: 'habit', label: '습관', icon: '📚', color: '#22c55e' },
  { key: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { key: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { key: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

// 솔직한 청소년 감정 예시 (매번 랜덤)
const FEELING_EXAMPLES = [
  '솔직히 진짜 진짜 공부하기 귀찮고 그냥 놀고싶다',
  '오늘 아침부터 짜증나고 아무것도 하기 싫음',
  '시험 망할 거 같아서 불안하고 머리가 안 돌아감',
  '친구랑 싸워서 기분 최악이고 집중이 안 됨',
  '어제 늦게 자서 졸리고 몸이 천근만근임',
  '할 건 많은데 뭐부터 해야 할지 모르겠고 막막함',
  '그냥 오늘 하루 아무 생각 없이 쉬고 싶다',
  '유튜브 보다가 시간 다 날려서 자괴감 들고 후회됨',
  '다들 잘하는 거 같은데 나만 뒤처지는 느낌이라 우울함',
  '오늘은 왠지 기분 좋고 뭔가 할 수 있을 거 같은 느낌',
  '부모님한테 혼나서 억울하고 화남',
  '내일 발표인데 긴장돼서 손이 떨림',
  '게임하고 싶은데 참고 있으니까 답답함',
  '요즘 뭘 해도 재미없고 의욕이 바닥임',
  '운동하고 나니까 몸은 피곤한데 기분은 좀 나아짐',
  '좋아하는 사람한테 읽씹 당해서 멘탈 나감',
  '시험 끝나서 해방감 오지는데 결과가 걱정됨',
  '오늘 칭찬 받아서 기분 좋고 더 잘하고 싶음',
  '핸드폰 뺏겨서 짜증 폭발하고 억울함',
  '새벽까지 과제하느라 눈 감기는데 아직 안 끝남',
]

// mood 라벨 (1~5)
const MOOD_LABELS = [
  { value: 1, label: '최악' },
  { value: 2, label: '별로' },
  { value: 3, label: '보통' },
  { value: 4, label: '좋음' },
  { value: 5, label: '최고' },
]

const ENERGY_LABELS = [
  { value: 1, label: '바닥' },
  { value: 2, label: '낮음' },
  { value: 3, label: '보통' },
  { value: 4, label: '괜찮' },
  { value: 5, label: '충만' },
]

// 모드: feeling(감정) 또는 execution(실행)
type Mode = 'feeling' | 'execution'
type Step = 'main' | 'selectWorld' | 'done'

interface DailyQuoteOverlayProps {
  onRegister: (text: string, worlds: string[]) => void
}

export default function DailyQuoteOverlay({ onRegister }: DailyQuoteOverlayProps) {
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<Mode>('feeling')
  const [step, setStep] = useState<Step>('main')
  const [executionText, setExecutionText] = useState('')
  const [selectedWorlds, setSelectedWorlds] = useState<string[]>([])
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)

  // 감정 체크인 상태
  const [feelingText, setFeelingText] = useState('')
  const [mood, setMood] = useState(3)
  const [energy, setEnergy] = useState(3)
  const [feelingExample, setFeelingExample] = useState('')
  const [checkinSaved, setCheckinSaved] = useState(false)

  useEffect(() => {
    setQuote(DAILY_QUOTES[Math.floor(Math.random() * DAILY_QUOTES.length)])
    setFeelingExample(FEELING_EXAMPLES[Math.floor(Math.random() * FEELING_EXAMPLES.length)])
    // 감정 체크인이 필요할 때만 표시 (6시간 경과)
    if (needsCheckin()) {
      setMode('feeling')
      setVisible(true)
    }
  }, [])

  // 체크인 저장
  async function saveCheckin() {
    if (checkinSaved) return
    try {
      await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood,
          energy,
          note: feelingText.trim() || null,
        }),
      })
      setCheckinSaved(true)
      localStorage.setItem(STORAGE_KEY_CHECKIN, String(Date.now()))
    } catch {
      // 실패해도 UX 차단하지 않음
    }
  }

  // 감정 모드: "실행도 적을래" → 실행 등록 흐름
  function handleFeelingToExec() {
    saveCheckin()
    setStep('selectWorld')
  }

  // 감정 모드: "완료" → 감정만 저장하고 닫기
  function handleFeelingDone() {
    saveCheckin()
    localStorage.setItem(STORAGE_KEY_EXEC, getLocalDateStr())
    setVisible(false)
  }

  // 실행 모드: "다음" → 월드 선택
  function handleExecNext() {
    if (!executionText.trim()) return
    setStep('selectWorld')
  }

  // 실행 모드: "건너뛰기"
  function handleExecSkip() {
    localStorage.setItem(STORAGE_KEY_EXEC, getLocalDateStr())
    setVisible(false)
  }

  function toggleWorld(key: string) {
    setSelectedWorlds(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  function handleRegister() {
    if (selectedWorlds.length === 0 || !executionText.trim()) return
    localStorage.setItem(STORAGE_KEY_EXEC, getLocalDateStr())
    setStep('done')
    onRegister(executionText.trim(), selectedWorlds)
    setTimeout(() => setVisible(false), 2500)
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
            {/* ===== 감정 모드: 메인 화면 ===== */}
            {mode === 'feeling' && step === 'main' && (
              <>
                {/* 명언 */}
                <div className="text-center mb-8 px-4">
                  <p className="text-[15px] leading-relaxed text-white/90 font-medium whitespace-pre-line break-keep">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-amber-400/80 font-medium">
                    &mdash; {quote.author}
                  </p>
                </div>

                <div className="w-12 h-px bg-white/10 mb-6" />

                <div className="w-full px-2">
                  <p className="text-center text-white/80 text-sm font-semibold mb-4">
                    지금 솔직한 감정 적기
                  </p>
                  <textarea
                    value={feelingText}
                    onChange={(e) => setFeelingText(e.target.value)}
                    placeholder={feelingExample}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-colors resize-none"
                    autoFocus
                  />

                  {/* 기분 선택 */}
                  <div className="mt-4">
                    <p className="text-white/50 text-xs mb-2">지금 기분은?</p>
                    <div className="flex gap-1.5">
                      {MOOD_LABELS.map(m => (
                        <button
                          key={m.value}
                          onClick={() => setMood(m.value)}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                            mood === m.value
                              ? 'bg-violet-500/30 text-violet-300 border border-violet-500/50'
                              : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 에너지 선택 */}
                  <div className="mt-3">
                    <p className="text-white/50 text-xs mb-2">에너지 레벨은?</p>
                    <div className="flex gap-1.5">
                      {ENERGY_LABELS.map(e => (
                        <button
                          key={e.value}
                          onClick={() => setEnergy(e.value)}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                            energy === e.value
                              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50'
                              : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10'
                          }`}
                        >
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-5">
                    <button
                      onClick={handleFeelingToExec}
                      className="flex-1 py-3 rounded-xl text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
                    >
                      실행도 적을래
                    </button>
                    <button
                      onClick={handleFeelingDone}
                      className="flex-1 py-3 rounded-xl bg-violet-500 text-white text-sm font-bold hover:bg-violet-400 transition-colors"
                    >
                      완료
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ===== 실행 모드: 메인 화면 ===== */}
            {mode === 'execution' && step === 'main' && (
              <>
                {/* 명언 */}
                <div className="text-center mb-10 px-4">
                  <p className="text-[15px] leading-relaxed text-white/90 font-medium whitespace-pre-line break-keep">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-amber-400/80 font-medium">
                    &mdash; {quote.author}
                  </p>
                </div>

                <div className="w-12 h-px bg-white/10 mb-8" />

                <div className="w-full px-2">
                  <p className="text-center text-white/60 text-sm font-medium mb-4">
                    오늘의 실행은?
                  </p>
                  <input
                    type="text"
                    value={executionText}
                    onChange={(e) => setExecutionText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleExecNext() }}
                    placeholder="오늘 실행할 한 가지를 적어보세요"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleExecSkip}
                      className="flex-1 py-3 rounded-xl text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
                    >
                      건너뛰기
                    </button>
                    <button
                      onClick={handleExecNext}
                      disabled={!executionText.trim()}
                      className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      다음
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ===== 공통: 월드 선택 ===== */}
            {step === 'selectWorld' && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full px-2"
              >
                {/* 감정 모드에서 넘어온 경우 실행 입력 필요 */}
                {mode === 'feeling' && (
                  <>
                    <p className="text-center text-white/80 text-sm font-semibold mb-4">
                      오늘의 실행은?
                    </p>
                    <input
                      type="text"
                      value={executionText}
                      onChange={(e) => setExecutionText(e.target.value)}
                      placeholder="오늘 실행할 한 가지를 적어보세요"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.07] transition-colors mb-5"
                      autoFocus
                    />
                  </>
                )}

                <p className="text-center text-white/60 text-sm font-medium mb-3">
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
                    onClick={() => setStep('main')}
                    className="flex-1 py-3 rounded-xl text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
                  >
                    이전
                  </button>
                  <button
                    onClick={handleRegister}
                    disabled={selectedWorlds.length === 0 || !executionText.trim()}
                    className="flex-1 py-3 rounded-xl bg-amber-500 text-slate-900 text-sm font-bold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    등록
                  </button>
                </div>
              </motion.div>
            )}

            {/* ===== 공통: 완료 ===== */}
            {step === 'done' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center px-4"
              >
                <p className="text-lg text-white font-medium leading-relaxed">
                  {mode === 'feeling'
                    ? <>솔직한 감정, 기록했어<br />그것만으로도 대단해</>
                    : <>소중한 당신의 한걸음을<br />진심으로 응원합니다</>
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
