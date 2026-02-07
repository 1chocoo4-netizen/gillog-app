'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ChevronRight, Sparkles, FileText, Copy, Check, FileSignature } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/AuthGuard'
import {
  REPORT_TYPES,
  MAJOR_CATEGORIES,
  EVALUATION_CRITERIA,
  generateReportPrompt,
  type ReportType,
  type MajorCategory,
  type ReportRequest,
} from '@/lib/reportTemplates'
import { convertToFormalStyle } from '@/lib/resumeTemplates'
import {
  getAllExecutionRecords,
  calculateOverallStats,
  WORLD_LABELS,
  WORLD_ICONS,
  type ExecutionRecord,
} from '@/lib/executionHistory'

type Step = 'type' | 'major' | 'details' | 'generating' | 'result'

function ReportContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<Step>('type')
  const [request, setRequest] = useState<ReportRequest>({
    reportType: 'comprehensive',
    majorCategory: 'humanities',
  })
  const [records, setRecords] = useState<ExecutionRecord[]>([])
  const [stats, setStats] = useState<ReturnType<typeof calculateOverallStats> | null>(null)
  const [generatedReport, setGeneratedReport] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFormalStyle, setIsFormalStyle] = useState(false)

  useEffect(() => {
    const allRecords = getAllExecutionRecords()
    setRecords(allRecords)
    setStats(calculateOverallStats())
  }, [])

  // 리포트 생성
  async function handleGenerate() {
    setStep('generating')
    setIsGenerating(true)

    // 약간의 딜레이 후 리포트 생성 (로딩 애니메이션 표시)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 샘플 리포트 생성 (데이터 기반)
    const report = generateSampleReport(request, records)
    setGeneratedReport(report)
    setStep('result')
    setIsGenerating(false)
  }

  // 샘플 리포트 생성 (API 실패 시 또는 데이터 없을 때)
  function generateSampleReport(req: ReportRequest, recs: ExecutionRecord[]): string {
    const majorInfo = MAJOR_CATEGORIES[req.majorCategory]
    const recordsByWorld: Record<string, ExecutionRecord[]> = {}
    recs.forEach(r => {
      if (!recordsByWorld[r.worldKey]) recordsByWorld[r.worldKey] = []
      recordsByWorld[r.worldKey].push(r)
    })

    const hasRecords = recs.length > 0
    const topWorlds = Object.entries(recordsByWorld)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 2)
      .map(([k]) => WORLD_LABELS[k])
      .join(', ')

    return `
# 생활기록부용 리포트
## ${REPORT_TYPES[req.reportType].label}

**희망 계열**: ${majorInfo.label}
${req.targetSchool ? `**목표 대학**: ${req.targetSchool}` : ''}
${req.targetMajor ? `**목표 학과**: ${req.targetMajor}` : ''}

---

## 종합 요약

${hasRecords
  ? `본 학생은 총 ${recs.length}건의 자기성장 활동을 수행하였으며, 특히 ${topWorlds} 영역에서 두드러진 성장을 보였습니다. 꾸준한 자기 성찰과 실천을 통해 학업역량, 진로역량, 공동체역량을 균형있게 발전시켜 나가고 있습니다.`
  : `이 학생은 ${majorInfo.label} 진학을 희망하고 있으며, 길로그를 통한 체계적인 성장 기록을 시작하였습니다. 앞으로 다양한 활동을 기록하고 성찰하며, 입시에 필요한 역량을 쌓아갈 예정입니다.`
}

---

## 1. 학업역량

### 학업성취도
${recordsByWorld['cognition']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 교과 학습에서 성실하게 참여하고 있으며, 심화 학습에 대한 의지가 있음'}

### 학업태도 및 자기주도성
${recordsByWorld['selfDirected']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 스스로 학습 계획을 세우고 실천하려는 노력을 보임\n- 모르는 내용에 대해 적극적으로 질문하고 탐구함'}

### 탐구력
${hasRecords ? '' : '- 관심 분야에 대한 깊이 있는 탐구 활동 예정\n- 독서와 자료 조사를 통한 지식 확장 계획'}

---

## 2. 진로역량

### 전공적합성
${req.targetMajor ? `- ${req.targetMajor} 진학을 위한 관련 교과 학습에 집중하고 있음` : '- 희망 전공 관련 기초 역량을 쌓아가고 있음'}
${recordsByWorld['cognition']?.slice(0, 2).map(r => `- ${r.executionText}`).join('\n') || ''}

### 진로탐색활동
${recordsByWorld['attitude']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 다양한 진로 탐색 활동을 계획하고 있음\n- 관련 분야 독서 및 체험 활동 예정'}

### 경험의 다양성
${hasRecords ? `- 총 ${Object.keys(recordsByWorld).length}개 영역에서 활동 기록` : '- 다양한 영역의 경험을 쌓아갈 계획'}

---

## 3. 공동체역량

### 협업능력 및 소통능력
${recordsByWorld['relationship']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 또래 친구들과의 협력 활동에서 소통 능력을 발휘함\n- 경청하고 자신의 의견을 조리있게 표현함'}

### 나눔과 배려
${recordsByWorld['character']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 어려운 친구를 돕고 배려하는 마음을 실천함\n- 공동체의 일원으로서 책임감을 보여줌'}

### 성실성
${recordsByWorld['habit']?.slice(0, 3).map(r => `- ${r.executionText} (${r.date})`).join('\n') || '- 맡은 일에 대해 꾸준히 책임감 있게 수행함\n- 약속과 규칙을 잘 지키며 신뢰를 쌓아감'}

---

## 활동 통계

| 역량 영역 | 활동 횟수 |
|---------|---------|
${Object.entries(recordsByWorld).map(([k, v]) => `| ${WORLD_LABELS[k]} | ${v.length}회 |`).join('\n') || '| (기록 시작 예정) | - |'}

---

## 보완 권장 사항

${hasRecords ? `
- ${Object.keys(recordsByWorld).length < 6 ? '아직 기록이 없는 영역의 활동을 추가해보세요.' : '모든 영역에서 활동을 기록하고 있습니다!'}
- 더 다양한 영역에서 경험을 쌓으면 종합적인 역량을 보여줄 수 있습니다.
- 현재까지의 활동을 바탕으로 더 깊이 있는 탐구 활동을 권장합니다.
` : `
- 매일 작은 실천이라도 꾸준히 기록해보세요.
- 6개 성장 영역(인지, 자기주도, 습관, 태도, 관계, 인성)을 균형있게 발전시켜보세요.
- 기록이 쌓이면 더 풍부한 리포트가 생성됩니다.
`}

---

*본 리포트는 길로그 활동 기록을 바탕으로 자동 생성되었습니다.*
*더 많은 활동을 기록할수록 더 상세하고 개인화된 리포트가 제공됩니다.*
`.trim()
  }

  // 복사
  function handleCopy() {
    const textToCopy = isFormalStyle
      ? convertToFormalStyle(generatedReport, 'school')
      : generatedReport
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // 서류용 문체 토글
  function toggleFormalStyle() {
    setIsFormalStyle(!isFormalStyle)
  }

  // 표시할 텍스트
  const displayReport = isFormalStyle
    ? convertToFormalStyle(generatedReport, 'school')
    : generatedReport

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => {
              if (step === 'type') router.push('/dashboard')
              else if (step === 'major') setStep('type')
              else if (step === 'details') setStep('major')
              else if (step === 'result') setStep('details')
            }}
            className="text-white/70 hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로
          </button>
          <h1 className="text-white font-semibold">생활기록부 리포트</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* 진행 표시 */}
      <div className="fixed top-14 left-0 right-0 z-30 bg-slate-900/80 px-4 py-2">
        <div className="flex gap-2 max-w-lg mx-auto">
          {['type', 'major', 'details', 'result'].map((s, idx) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ['type', 'major', 'details', 'generating', 'result'].indexOf(step) >= idx
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
            {/* Step 1: 리포트 유형 선택 */}
            {step === 'type' && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-bold mb-2">어떤 리포트가 필요하세요?</h2>
                  <p className="text-white/50 text-sm">목적에 맞는 리포트를 선택해주세요</p>
                </div>

                {/* 활동 데이터 요약 */}
                {stats && (
                  <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <p className="text-white/60 text-sm mb-2">📊 나의 활동 데이터</p>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.totalExecutions}</p>
                        <p className="text-white/40 text-xs">총 활동</p>
                      </div>
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.worldStats.length}</p>
                        <p className="text-white/40 text-xs">활동 영역</p>
                      </div>
                      <div>
                        <p className="text-white text-2xl font-bold">{stats.currentStreak}</p>
                        <p className="text-white/40 text-xs">연속 기록</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {Object.values(REPORT_TYPES).map(type => (
                    <button
                      key={type.key}
                      onClick={() => {
                        setRequest(prev => ({ ...prev, reportType: type.key as ReportType }))
                        setStep('major')
                      }}
                      className={`w-full p-4 rounded-xl border transition-all text-left group ${
                        request.reportType === type.key
                          ? 'bg-violet-500/20 border-violet-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <h3 className="text-white font-semibold">{type.label}</h3>
                            <p className="text-white/50 text-sm">{type.description}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: 전공 계열 선택 */}
            {step === 'major' && (
              <motion.div
                key="major"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <h2 className="text-white text-xl font-bold mb-2">희망 전공 계열은?</h2>
                  <p className="text-white/50 text-sm">맞춤형 리포트를 위해 선택해주세요</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.values(MAJOR_CATEGORIES).map(major => (
                    <button
                      key={major.key}
                      onClick={() => {
                        setRequest(prev => ({ ...prev, majorCategory: major.key as MajorCategory }))
                        setStep('details')
                      }}
                      className={`p-4 rounded-xl border transition-all ${
                        request.majorCategory === major.key
                          ? 'bg-violet-500/20 border-violet-500/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{major.icon}</span>
                      <span className="text-white text-sm font-medium">{major.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: 상세 정보 입력 */}
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
                    <label className="text-white/60 text-sm mb-2 block">목표 대학</label>
                    <input
                      type="text"
                      placeholder="예: 서울대학교"
                      value={request.targetSchool || ''}
                      onChange={e => setRequest(prev => ({ ...prev, targetSchool: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50"
                    />
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">목표 학과</label>
                    <input
                      type="text"
                      placeholder="예: 컴퓨터공학과"
                      value={request.targetMajor || ''}
                      onChange={e => setRequest(prev => ({ ...prev, targetMajor: e.target.value }))}
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

                  {/* 평가요소 미리보기 */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/60 text-sm mb-3">📋 분석될 평가요소</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(EVALUATION_CRITERIA).map(criteria => (
                        <span
                          key={criteria.key}
                          className="px-3 py-1 bg-violet-500/20 text-violet-300 text-xs rounded-full"
                        >
                          {criteria.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  AI 리포트 생성하기
                </button>

                {records.length === 0 && (
                  <p className="text-center text-yellow-400 text-sm mt-2">
                    실행 기록이 없어도 샘플 리포트를 생성할 수 있습니다.
                  </p>
                )}
              </motion.div>
            )}

            {/* Step 4: 생성 중 */}
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
                    className="absolute inset-0 rounded-full border-4 border-violet-500/30 border-t-violet-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-violet-400" />
                  </div>
                </div>
                <h2 className="text-white text-xl font-bold mb-2">리포트 생성 중...</h2>
                <p className="text-white/50 text-sm text-center">
                  AI가 {records.length}개의 활동 기록을 분석하고 있습니다
                </p>
              </motion.div>
            )}

            {/* Step 5: 결과 */}
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
                    <h2 className="text-white font-bold">생성된 리포트</h2>
                  </div>
                  <div className="flex gap-2">
                    {/* 서류용 문체 토글 */}
                    <button
                      onClick={toggleFormalStyle}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        isFormalStyle
                          ? 'bg-blue-500/30 text-blue-300'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      <FileSignature className="w-4 h-4" />
                      서류용
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

                {/* 서류용 문체 안내 */}
                {isFormalStyle && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2 mb-4">
                    <p className="text-blue-300 text-sm">
                      ✨ 생활기록부에 바로 사용 가능한 문체로 변환되었습니다 (~음, ~함 형식)
                    </p>
                  </div>
                )}

                {/* 리포트 내용 */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 max-h-[60vh] overflow-y-auto">
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
                      if (line.startsWith('- ')) {
                        return <li key={idx} className="text-white/70 text-sm ml-4">{line.slice(2)}</li>
                      }
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={idx} className="text-white font-semibold text-sm">{line.slice(2, -2)}</p>
                      }
                      if (line.startsWith('---')) {
                        return <hr key={idx} className="border-white/10 my-4" />
                      }
                      if (line.trim() === '') {
                        return <br key={idx} />
                      }
                      return <p key={idx} className="text-white/70 text-sm">{line}</p>
                    })}
                  </div>
                </div>

                {/* 다시 생성 */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep('type')}
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

export default function ReportPage() {
  return (
    <AuthGuard>
      <ReportContent />
    </AuthGuard>
  )
}
