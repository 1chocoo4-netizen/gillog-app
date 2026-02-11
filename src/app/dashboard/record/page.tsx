'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, FileText, Copy, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import {
  calculateOverallStats,
  WORLD_LABELS,
  WORLD_ICONS,
  WORLD_COLORS,
  type ExecutionRecord,
} from '@/lib/executionHistory'

type Step = 'input' | 'generating' | 'result'

const WORLD_KEYS = ['cognition', 'selfDirected', 'habit', 'attitude', 'relationship', 'character'] as const

const EXAMPLE_PURPOSES = [
  '블로그',
  '인스타',
  '스레드',
  '일기',
  '저널',
  '여행',
  '자기소개',
  '에세이',
  '브런치',
  '주장하는 글',
  '논설문',
]

function RecordContent() {
  const router = useRouter()
  const { history } = useUserData()

  const [step, setStep] = useState<Step>('input')
  const [purpose, setPurpose] = useState('')
  const [selectedWorlds, setSelectedWorlds] = useState<Set<string>>(new Set(WORLD_KEYS))
  const [generatedReport, setGeneratedReport] = useState('')
  const [copied, setCopied] = useState(false)

  const [stats, setStats] = useState<ReturnType<typeof calculateOverallStats> | null>(null)
  const [filteredRecords, setFilteredRecords] = useState<ExecutionRecord[]>([])

  useEffect(() => {
    setStats(calculateOverallStats(history))
  }, [history])

  useEffect(() => {
    const filtered = history.filter(r => selectedWorlds.has(r.worldKey))
    setFilteredRecords(filtered)
  }, [history, selectedWorlds])

  function toggleWorld(key: string) {
    setSelectedWorlds(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  async function handleGenerate() {
    if (filteredRecords.length === 0 || !purpose.trim()) return

    setStep('generating')

    try {
      const res = await fetch('/api/record-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: purpose.trim(),
          records: filteredRecords.map(r => ({
            worldKey: r.worldKey,
            executionText: r.executionText,
            date: r.date,
          })),
        }),
      })

      if (!res.ok) throw new Error('API 요청 실패')

      const data = await res.json()
      setGeneratedReport(data.report)
      setStep('result')
    } catch (error) {
      console.error('기록용 리포트 생성 실패:', error)
      alert('리포트 생성에 시간이 필요합니다. 잠시 후 다시 시도해주세요!')
      setStep('input')
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(generatedReport)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleReset() {
    setPurpose('')
    setGeneratedReport('')
    setStep('input')
  }

  const worldCount = new Set(filteredRecords.map(r => r.worldKey)).size

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              if (step === 'input') router.push('/dashboard')
              else if (step === 'result') setStep('input')
            }}
            className="text-white/70 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로
          </button>
          <h1 className="text-white font-semibold">쓰기용 리포트</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-20 pb-8 px-4 min-h-screen">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {/* 입력 화면 */}
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* 글 종류 입력 */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    어떤 글을 쓰고 싶나요?
                  </label>
                  <input
                    type="text"
                    placeholder="예: 내 성실한 경험으로 블로그 글 써줘"
                    value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* 예시 버튼 */}
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PURPOSES.map(ex => (
                    <button
                      key={ex}
                      onClick={() => setPurpose(ex)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition-all ${
                        purpose === ex
                          ? 'border-cyan-500/50 bg-cyan-500/20 text-cyan-300'
                          : 'border-white/10 text-white/40 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-cyan-500/10'
                      }`}
                    >
                      {ex}
                    </button>
                  ))}
                </div>

                {/* 월드 필터 */}
                <div>
                  <label className="text-white/60 text-sm mb-2 block">영역 필터</label>
                  <div className="flex flex-wrap gap-2">
                    {WORLD_KEYS.map(key => (
                      <button
                        key={key}
                        onClick={() => toggleWorld(key)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all ${
                          selectedWorlds.has(key)
                            ? 'border-cyan-500/40 bg-cyan-500/15 text-white'
                            : 'border-white/10 text-white/30 hover:border-white/20'
                        }`}
                      >
                        <span>{WORLD_ICONS[key]}</span>
                        <span>{WORLD_LABELS[key]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 데이터 요약 */}
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/60 text-sm mb-2">나의 데이터</p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-white text-2xl font-bold">{filteredRecords.length}</p>
                      <p className="text-white/40 text-xs">선택된 기록</p>
                    </div>
                    <div>
                      <p className="text-white text-2xl font-bold">{worldCount}</p>
                      <p className="text-white/40 text-xs">영역</p>
                    </div>
                  </div>
                </div>

                {/* 기록 없음 안내 */}
                {filteredRecords.length === 0 && (
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-white/50 text-sm">실행 기록이 없습니다</p>
                    <p className="text-white/30 text-xs mt-1">코칭 세션을 완료하고 실행해보세요!</p>
                  </div>
                )}

                {/* 생성 버튼 */}
                <button
                  onClick={handleGenerate}
                  disabled={filteredRecords.length === 0 || !purpose.trim()}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5" />
                  리포트 생성하기
                </button>
              </motion.div>
            )}

            {/* 생성 중 */}
            {step === 'generating' && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh]"
              >
                <div className="relative w-24 h-24 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border-4 border-cyan-500/30 border-t-cyan-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h2 className="text-white text-xl font-bold mb-2">글을 만들고 있어요...</h2>
                <p className="text-white/50 text-sm text-center">
                  {filteredRecords.length}개의 기록을 바탕으로 작성 중입니다
                </p>
              </motion.div>
            )}

            {/* 결과 */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-white font-bold">쓰기용 리포트</h2>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg text-white/70 text-sm hover:bg-white/20"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? '복사됨' : '복사'}
                  </button>
                </div>

                {/* 리포트 내용 */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="prose prose-invert prose-sm max-w-none">
                    {generatedReport.split('\n').map((line, idx) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={idx} className="text-xl font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={idx} className="text-lg font-bold text-cyan-400 mt-4 mb-2">{line.slice(3)}</h2>
                      }
                      if (line.startsWith('### ')) {
                        return <h3 key={idx} className="text-md font-semibold text-white/80 mt-3 mb-1">{line.slice(4)}</h3>
                      }
                      if (line.startsWith('**') && line.includes('**:')) {
                        const parts = line.split('**')
                        return <p key={idx} className="text-white/70 text-sm"><strong className="text-white">{parts[1]}</strong>:{parts[2]}</p>
                      }
                      if (line.startsWith('- ') || line.startsWith('* ')) {
                        return <li key={idx} className="text-white/70 text-sm ml-4">{line.slice(2)}</li>
                      }
                      if (line.startsWith('---')) {
                        return <hr key={idx} className="border-white/10 my-4" />
                      }
                      if (line.trim() === '') {
                        return <br key={idx} />
                      }
                      return <p key={idx} className="text-white/70 text-sm">{line}</p>
                    })}
                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                      <p className="text-white/30 text-xs">리포트가 끝났습니다</p>
                    </div>
                  </div>
                </div>

                {/* 하단 버튼 */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20"
                  >
                    새로 만들기
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold"
                  >
                    완료
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

export default function RecordPage() {
  return (
    <AuthGuard>
      <RecordContent />
    </AuthGuard>
  )
}
