'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, Sparkles, FileText, Copy, Check, FileSignature } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AuthGuard } from '@/components/AuthGuard'
import {
  ISO_30414_CRITERIA,
  JOB_CATEGORIES,
  mapWorldToISO,
  convertToFormalStyle,
  type JobCategory,
  type ISOCriteriaKey,
  type ResumeReportRequest,
} from '@/lib/resumeTemplates'
import {
  getAllExecutionRecords,
  calculateOverallStats,
  WORLD_LABELS,
  WORLD_ICONS,
  WORLD_COLORS,
  type ExecutionRecord,
} from '@/lib/executionHistory'

type Step = 'job' | 'details' | 'generating' | 'result'

function ResumeContent() {
  const router = useRouter()

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

  useEffect(() => {
    const allRecords = getAllExecutionRecords()
    setRecords(allRecords)
    setStats(calculateOverallStats())
  }, [])

  // 리포트 생성
  async function handleGenerate() {
    setStep('generating')
    setIsGenerating(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    const report = generateResumeReport(request, records)
    setGeneratedReport(report)
    setStep('result')
    setIsGenerating(false)
  }

  // ISO 30414 기반 이력서 리포트 생성
  function generateResumeReport(req: ResumeReportRequest, recs: ExecutionRecord[]): string {
    const jobInfo = JOB_CATEGORIES[req.jobCategory]

    // 월드별로 기록 분류
    const recordsByWorld: Record<string, ExecutionRecord[]> = {}
    recs.forEach(r => {
      if (!recordsByWorld[r.worldKey]) recordsByWorld[r.worldKey] = []
      recordsByWorld[r.worldKey].push(r)
    })

    // ISO 역량별로 기록 분류
    const recordsByISO: Record<ISOCriteriaKey, ExecutionRecord[]> = {} as any
    Object.keys(ISO_30414_CRITERIA).forEach(key => {
      recordsByISO[key as ISOCriteriaKey] = []
    })

    recs.forEach(r => {
      const isoKeys = mapWorldToISO(r.worldKey)
      isoKeys.forEach(isoKey => {
        recordsByISO[isoKey].push(r)
      })
    })

    // 가장 많은 활동이 있는 역량 순으로 정렬
    const sortedCriteria = Object.entries(recordsByISO)
      .filter(([_, records]) => records.length > 0)
      .sort((a, b) => b[1].length - a[1].length)

    const hasRecords = recs.length > 0
    const startDate = hasRecords ? recs.reduce((min, r) => r.date < min ? r.date : min, recs[0].date) : ''
    const endDate = hasRecords ? recs.reduce((max, r) => r.date > max ? r.date : max, recs[0].date) : ''

    return `
# 이력서용 역량 리포트
## ISO 30414 국제 인적자원 표준 기반

**희망 직무**: ${jobInfo.icon} ${jobInfo.label}
${req.targetCompany ? `**목표 기업**: ${req.targetCompany}` : ''}
${req.targetPosition ? `**목표 포지션**: ${req.targetPosition}` : ''}

---

## 역량 개발 요약

${hasRecords ? `
**성장 기간**: ${startDate} ~ ${endDate}
**총 역량 개발 활동**: ${recs.length}회
**개발 역량 영역**: ${sortedCriteria.length}개 / 10개

본 지원자는 ISO 30414 국제 인적자원 표준의 핵심 역량 영역에서 체계적인 자기계발을 수행해왔습니다.
특히 ${sortedCriteria.slice(0, 3).map(([k]) => ISO_30414_CRITERIA[k as ISOCriteriaKey].label).join(', ')} 영역에서 두드러진 성장을 보였습니다.
` : `
아직 기록된 역량 개발 활동이 없습니다.
길로그를 통해 일상의 작은 실천들을 기록하면, 체계적인 역량 리포트가 생성됩니다.
`}

---

## ISO 30414 역량별 성장 이력

${sortedCriteria.length > 0 ? sortedCriteria.map(([criteriaKey, criteriaRecords]) => {
  const criteria = ISO_30414_CRITERIA[criteriaKey as ISOCriteriaKey]
  const sortedRecs = [...criteriaRecords].sort((a, b) => a.date.localeCompare(b.date))
  const firstDate = sortedRecs[0]?.date || ''
  const lastDate = sortedRecs[sortedRecs.length - 1]?.date || ''

  return `
### ${criteria.icon} ${criteria.label} (${criteria.labelEn})

**활동 횟수**: ${criteriaRecords.length}회 | **기간**: ${firstDate} ~ ${lastDate}

**핵심 역량 설명**: ${criteria.description}

**주요 성장 활동**:
${sortedRecs.slice(-5).map(r => `• ${r.executionText} (${r.date})`).join('\n')}

**성장 스토리**:
${criteriaRecords.length >= 10
  ? `지속적이고 꾸준한 실천을 통해 ${criteria.label} 역량을 체화하였습니다. 총 ${criteriaRecords.length}회의 관련 활동을 수행하며, 이 역량을 업무에 즉시 적용할 수 있는 수준으로 발전시켰습니다.`
  : criteriaRecords.length >= 5
  ? `${criteria.label} 역량 개발을 위해 ${criteriaRecords.length}회의 활동을 수행하였으며, 기본기를 갖추고 지속적으로 발전시켜 나가고 있습니다.`
  : `${criteria.label} 역량 개발을 시작하였으며, ${criteriaRecords.length}회의 활동을 통해 기초를 다지고 있습니다.`
}
`
}).join('\n') : `
### 역량 개발 활동을 시작해보세요

ISO 30414 표준의 10가지 핵심 역량:
${Object.values(ISO_30414_CRITERIA).map(c => `• ${c.icon} ${c.label}: ${c.description}`).join('\n')}
`}

---

## 역량 통계 분석

| 역량 영역 | 활동 횟수 | 비중 |
|---------|---------|------|
${sortedCriteria.map(([k, r]) => {
  const criteria = ISO_30414_CRITERIA[k as ISOCriteriaKey]
  const percentage = Math.round((r.length / recs.length) * 100)
  return `| ${criteria.icon} ${criteria.label} | ${r.length}회 | ${percentage}% |`
}).join('\n') || '| (활동 기록 필요) | - | - |'}

---

## 기업이 원하는 보이지 않는 역량

${hasRecords ? `
본 지원자의 활동 기록을 분석한 결과, 다음과 같은 핵심 역량이 확인됩니다:

${sortedCriteria.slice(0, 5).map(([k, r], idx) => {
  const criteria = ISO_30414_CRITERIA[k as ISOCriteriaKey]
  return `**${idx + 1}. ${criteria.label}** (${r.length}회 실천)
   - ${criteria.description}
   - 대표 활동: ${r[r.length - 1]?.executionText || ''}`
}).join('\n\n')}
` : `
기업들이 중요시하는 보이지 않는 역량(Soft Skills):
1. 윤리성과 정직성 - 신뢰의 기반
2. 자기관리 능력 - 일관된 성과 창출
3. 협업과 커뮤니케이션 - 팀 시너지
4. 문제해결력 - 가치 창출
5. 성장 마인드셋 - 지속적 발전

이러한 역량들은 일상의 작은 실천에서 시작됩니다.
`}

---

## 개선 권장사항

${hasRecords ? `
현재 강점 영역: ${sortedCriteria.slice(0, 3).map(([k]) => ISO_30414_CRITERIA[k as ISOCriteriaKey].label).join(', ')}

보완 권장 영역: ${Object.keys(ISO_30414_CRITERIA)
  .filter(k => !sortedCriteria.find(([sk]) => sk === k) || recordsByISO[k as ISOCriteriaKey].length < 5)
  .slice(0, 3)
  .map(k => ISO_30414_CRITERIA[k as ISOCriteriaKey].label)
  .join(', ') || '모든 영역에서 고르게 발전 중'}
` : `
모든 역량 영역에서 활동을 시작해보세요.
매일 작은 실천이 큰 역량으로 쌓입니다.
`}

---

*본 리포트는 ISO 30414 국제 인적자원 표준을 기반으로 자동 생성되었습니다.*
*길로그 활동 기록이 많을수록 더 풍부하고 신뢰성 있는 리포트가 제공됩니다.*
`.trim()
  }

  // 복사
  function handleCopy() {
    const textToCopy = isFormalStyle
      ? convertToFormalStyle(generatedReport, 'resume')
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
    ? convertToFormalStyle(generatedReport, 'resume')
    : generatedReport

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
                <h2 className="text-white text-xl font-bold mb-2">역량 분석 중...</h2>
                <p className="text-white/50 text-sm text-center">
                  ISO 30414 기준으로 {records.length}개의 활동을 분석하고 있습니다
                </p>
              </motion.div>
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
                  <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg px-4 py-2">
                    <p className="text-violet-300 text-sm">
                      ✨ 자기소개서/이력서에 바로 사용 가능한 문체로 변환되었습니다
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
                  </div>
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

export default function ResumePage() {
  return (
    <AuthGuard>
      <ResumeContent />
    </AuthGuard>
  )
}
