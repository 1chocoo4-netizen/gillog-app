'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, Sparkles, FileText, Copy, Check, FileSignature, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/AuthGuard'
import {
  ISO_30414_CRITERIA,
  JOB_CATEGORIES,
  type JobCategory,
  type ResumeReportRequest,
} from '@/lib/resumeTemplates'
import { useUserData } from '@/lib/UserDataProvider'
import {
  calculateOverallStats,
  type ExecutionRecord,
} from '@/lib/executionHistory'

type Step = 'job' | 'details' | 'generating' | 'result'

function ResumeContent() {
  const router = useRouter()
  const { history } = useUserData()

  const [step, setStep] = useState<Step>('job')
  const [request, setRequest] = useState<ResumeReportRequest>({
    jobCategory: 'tech',
  })
  const [records, setRecords] = useState<ExecutionRecord[]>([])
  const [stats, setStats] = useState<ReturnType<typeof calculateOverallStats> | null>(null)
  const [generatedReport, setGeneratedReport] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFormalStyle, setIsFormalStyle] = useState(false)
  const [formalReport, setFormalReport] = useState<string>('')
  const [isFormalLoading, setIsFormalLoading] = useState(false)
  const [formalPrompt, setFormalPrompt] = useState<string>('')

  useEffect(() => {
    setRecords(history)
    setStats(calculateOverallStats(history))
  }, [history])

  // 리포트 생성
  async function handleGenerate() {
    setStep('generating')
    setIsGenerating(true)

    try {
      const res = await fetch('/api/resume-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobCategory: request.jobCategory,
          targetCompany: request.targetCompany,
          targetPosition: request.targetPosition,
          additionalInfo: request.additionalInfo,
          records: records.map(r => ({
            worldKey: r.worldKey,
            executionText: r.executionText,
            date: r.date,
          })),
        }),
      })

      if (!res.ok) {
        throw new Error('API 요청 실패')
      }

      const data = await res.json()
      setGeneratedReport(data.report)
      setStep('result')
    } catch (error) {
      console.error('이력서 리포트 생성 실패:', error)
      alert('좋은 리포트를 만들기 위해 시간이 필요합니다 ✨ 2분 뒤에 다시 눌러주세요!')
      setStep('details')
    } finally {
      setIsGenerating(false)
    }
  }

  // 복사
  function handleCopy() {
    const textToCopy = isFormalStyle && formalReport ? formalReport : generatedReport
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 서류용 토글 (입력창만 열기/닫기)
  function toggleFormalStyle() {
    setIsFormalStyle(!isFormalStyle)
  }

  // 서류용 프롬프트 실행
  async function handleFormalConvert(prompt: string) {
    setIsFormalLoading(true)
    try {
      const res = await fetch('/api/formal-convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'resume',
          report: generatedReport,
          prompt,
          records: records.map(r => ({
            worldKey: r.worldKey,
            executionText: r.executionText,
            date: r.date,
          })),
        }),
      })
      if (!res.ok) throw new Error('변환 실패')
      const data = await res.json()
      setFormalReport(data.result)
    } catch (error) {
      console.error('서류용 변환 실패:', error)
      alert('좋은 서류를 만들기 위해 시간이 필요합니다 ✨ 2분 뒤에 다시 눌러주세요!')
    } finally {
      setIsFormalLoading(false)
    }
  }

  // 표시할 텍스트
  const displayReport = isFormalStyle && formalReport ? formalReport : generatedReport

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              if (step === 'job') router.push('/dashboard')
              else if (step === 'details') setStep('job')
              else if (step === 'result') setStep('details')
            }}
            className="text-white/70 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로
          </button>
          <h1 className="text-white font-semibold">이력서용 리포트</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* 진행 표시 */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-slate-900/80 px-4 py-2">
        <div className="flex gap-2 max-w-lg mx-auto">
          {['job', 'details', 'result'].map((s, idx) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ['job', 'details', 'generating', 'result'].indexOf(step) >= idx
                  ? 'bg-violet-500'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 메인 영역 */}
      <div className="pt-24 pb-8 px-4 min-h-screen">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: 직무 선택 */}
            {step === 'job' && (
              <motion.div
                key="job"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-bold mb-2">희망 직무는?</h2>
                  <p className="text-white/50 text-sm">직무에 맞는 역량 리포트를 생성합니다</p>
                </div>

                {/* ISO 30414 설명 */}
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
                  <p className="text-blue-400 text-xs font-medium mb-1">ISO 30414 기반</p>
                  <p className="text-white/60 text-sm">
                    국제 인적자원 표준에 맞춰 기업이 원하는 핵심 역량을 분석합니다
                  </p>
                </div>

                {/* 활동 데이터 요약 */}
                {stats && (
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <p className="text-white/60 text-sm mb-2">📊 나의 역량 데이터</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.totalExecutions}</p>
                        <p className="text-white/40 text-xs">총 활동</p>
                      </div>
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.worldStats.length}</p>
                        <p className="text-white/40 text-xs">역량 영역</p>
                      </div>
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.currentStreak}</p>
                        <p className="text-white/40 text-xs">연속 기록</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {Object.values(JOB_CATEGORIES).map(job => (
                    <button
                      key={job.key}
                      onClick={() => {
                        setRequest(prev => ({ ...prev, jobCategory: job.key as JobCategory }))
                        setStep('details')
                      }}
                      className={`p-4 rounded-xl border transition-all ${
                        request.jobCategory === job.key
                          ? 'bg-violet-500/20 border-violet-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{job.icon}</span>
                      <span className="text-white text-sm font-medium">{job.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: 상세 정보 입력 */}
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-bold mb-2">추가 정보 (선택)</h2>
                  <p className="text-white/50 text-sm">더 맞춤화된 리포트를 받을 수 있어요</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">목표 기업</label>
                    <input
                      type="text"
                      placeholder="예: 삼성전자, 네이버"
                      value={request.targetCompany || ''}
                      onChange={e => setRequest(prev => ({ ...prev, targetCompany: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">목표 포지션</label>
                    <input
                      type="text"
                      placeholder="예: 프론트엔드 개발자, 마케팅 매니저"
                      value={request.targetPosition || ''}
                      onChange={e => setRequest(prev => ({ ...prev, targetPosition: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">추가 요청사항</label>
                    <textarea
                      placeholder="예: 리더십 경험을 강조해주세요"
                      value={request.additionalInfo || ''}
                      onChange={e => setRequest(prev => ({ ...prev, additionalInfo: e.target.value }))}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 resize-none"
                    />
                  </div>

                  {/* ISO 평가요소 미리보기 */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/60 text-sm mb-3">📋 분석될 ISO 30414 역량</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(ISO_30414_CRITERIA).slice(0, 6).map(criteria => (
                        <span
                          key={criteria.key}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                        >
                          {criteria.icon} {criteria.label}
                        </span>
                      ))}
                      <span className="px-3 py-1 bg-white/10 text-white/50 text-xs rounded-full">
                        +4개 더
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  역량 리포트 생성하기
                </button>
              </motion.div>
            )}

            {/* Step 3: 생성 중 */}
            {step === 'generating' && (
              <ResumeTimer recordCount={records.length} />
            )}

            {/* Step 4: 결과 */}
            {step === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-violet-400" />
                    <h2 className="text-white font-bold">역량 리포트</h2>
                  </div>
                  <div className="flex gap-2">
                    {/* 서류용 문체 토글 */}
                    <button
                      onClick={toggleFormalStyle}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isFormalStyle
                          ? 'bg-violet-500/30 text-violet-300'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <FileSignature className="w-4 h-4" />
                      이력서용 변환
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg text-white/70 text-sm hover:bg-white/20"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? '복사됨' : '복사'}
                    </button>
                  </div>
                </div>

                {/* 서류용 입력 영역 */}
                {isFormalStyle && (
                  <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4 space-y-3">
                    {/* 입력창 + 변환 버튼 */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="예: 이력서 양식에 맞춰서 작성해줘"
                        value={formalPrompt}
                        onChange={e => setFormalPrompt(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && formalPrompt.trim() && !isFormalLoading) {
                            handleFormalConvert(formalPrompt.trim())
                          }
                        }}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-violet-500/50"
                      />
                      <button
                        onClick={() => {
                          if (formalPrompt.trim()) handleFormalConvert(formalPrompt.trim())
                        }}
                        disabled={!formalPrompt.trim() || isFormalLoading}
                        className="px-4 py-2 rounded-lg bg-violet-500/80 text-white text-sm font-medium hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {isFormalLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        이력서용 변환
                      </button>
                    </div>

                    {/* 예시 프롬프트 */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        '이력서 양식에 맞춰서 작성해줘',
                        '자기소개서 성장과정으로 작성해줘',
                        '자기소개서 지원동기로 작성해줘',
                        '자기소개서 직무역량으로 작성해줘',
                      ].map((text) => (
                        <button
                          key={text}
                          onClick={() => {
                            setFormalPrompt(text)
                            handleFormalConvert(text)
                          }}
                          disabled={isFormalLoading}
                          className="px-3 py-1.5 rounded-full border border-white/10 text-white/30 text-xs hover:text-violet-300 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all disabled:opacity-40"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 리포트 내용 */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  {isFormalLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader2 className="w-8 h-8 text-violet-400 animate-spin mb-3" />
                      <p className="text-white/50 text-sm">당신의 역량을 이력서에 담고 있습니다</p>
                    </div>
                  ) : (
                  <div className="prose prose-invert prose-sm max-w-none">
                    {displayReport.split('\n').map((line, idx) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={idx} className="text-xl font-bold text-white mt-4 mb-2">{line.slice(2)}</h1>
                      }
                      if (line.startsWith('## ')) {
                        return <h2 key={idx} className="text-lg font-bold text-violet-400 mt-4 mb-2">{line.slice(3)}</h2>
                      }
                      if (line.startsWith('### ')) {
                        return <h3 key={idx} className="text-md font-semibold text-white/80 mt-3 mb-1">{line.slice(4)}</h3>
                      }
                      if (line.startsWith('**') && line.includes('**:')) {
                        const parts = line.split('**')
                        return <p key={idx} className="text-white/70 text-sm"><strong className="text-white">{parts[1]}</strong>:{parts[2]}</p>
                      }
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        return <li key={idx} className="text-white/70 text-sm ml-4">{line.slice(2)}</li>
                      }
                      if (line.startsWith('|')) {
                        return <p key={idx} className="text-white/60 text-xs font-mono">{line}</p>
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
                  )}
                </div>

                {/* 다시 생성 */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep('job')}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20"
                  >
                    새로 만들기
                  </button>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold"
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

const LOADING_MESSAGES = [
  '보이지 않는 당신의 성장을 보고있습니다',
  '매일의 노력이 빛나는 순간입니다',
  '당신의 이야기를 정리하고 있습니다',
  '소중한 기록들을 엮고 있습니다',
  '꾸준함이 만들어낸 결과를 담고 있습니다',
]

const TIMER_RADIUS = 54
const TIMER_CIRCUMFERENCE = 2 * Math.PI * TIMER_RADIUS

function ResumeTimer({ recordCount }: { recordCount: number }) {
  const [countdown, setCountdown] = useState(30)
  const [msgIdx, setMsgIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 0 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length)
    }, 4000)
    return () => clearInterval(msgTimer)
  }, [])

  const progress = 1 - countdown / 30

  return (
    <motion.div
      key="generating"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <div className="relative w-32 h-32 mb-8">
        <svg width="128" height="128" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={TIMER_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <circle
            cx="60" cy="60" r={TIMER_RADIUS}
            fill="none"
            stroke="url(#timerGradResume)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={TIMER_CIRCUMFERENCE}
            strokeDashoffset={TIMER_CIRCUMFERENCE * (1 - progress)}
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          <defs>
            <linearGradient id="timerGradResume" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white tabular-nums">{countdown}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-white text-lg font-medium text-center mb-2"
        >
          {LOADING_MESSAGES[msgIdx]}
        </motion.p>
      </AnimatePresence>
      <p className="text-white/30 text-xs">{recordCount}개의 활동 기록 분석 중</p>
    </motion.div>
  )
}

export default function ResumePage() {
  return (
    <AuthGuard>
      <ResumeContent />
    </AuthGuard>
  )
}
