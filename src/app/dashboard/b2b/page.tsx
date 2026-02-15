'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Milestone, RegisteredUser, MetricEvidenceMap, PeriodMetrics } from '@/lib/b2b/types'
import { DEMO_MILESTONE_DATA, DEMO_SPARKLINE } from '@/lib/b2b/demoData'
import { METRIC_DEFINITIONS } from '@/lib/b2b/isoMapping'
import { generateAllInsights } from '@/lib/b2b/insightGenerator'
import { B2BHeader } from './components/B2BHeader'
import { B2BPlanCard } from './components/B2BPlanCard'
import { ExecutionDNARadar } from './components/ExecutionDNARadar'
import { MetricCard } from './components/MetricCard'
import { MilestoneFilter } from './components/PeriodFilter'
import { PrivacyBadge } from './components/PrivacyBadge'
import { ISOmappingTable } from './components/ISOmappingTable'
import type { CoachSubscriptionInfo } from '@/lib/subscription'
import { GrowthReportModal } from './components/GrowthReportModal'

/** 실행 횟수 → 도달한 최대 마일스톤 */
function getMaxMilestone(count: number): Milestone {
  if (count >= 1000) return '1000'
  if (count >= 500) return '500'
  if (count >= 100) return '100'
  return '5'
}

/** 실행 횟수 → 기본 선택 마일스톤 */
function getDefaultMilestone(count: number): Milestone {
  return getMaxMilestone(count)
}

export default function B2BDashboardPage() {
  const [milestone, setMilestone] = useState<Milestone>('500')
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null)

  // 기관 이름
  const [institutionName, setInstitutionName] = useState<string | null>(null)
  const [showNamePopup, setShowNamePopup] = useState(false)
  const [nameInput, setNameInput] = useState('')

  // 기관 구독 상태
  const [coachSub, setCoachSub] = useState<CoachSubscriptionInfo | null>(null)

  useEffect(() => {
    fetch('/api/b2b/subscription')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data?.subscription) setCoachSub(data.subscription) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('b2b_institution_name')
    if (saved !== null) {
      setInstitutionName(saved)
    } else {
      setShowNamePopup(true)
    }
  }, [])

  function handleSaveName() {
    const name = nameInput.trim() || '없음'
    localStorage.setItem('b2b_institution_name', name)
    setInstitutionName(name)
    setShowNamePopup(false)
  }

  function handleChangeName() {
    setNameInput(institutionName === '없음' ? '' : institutionName || '')
    setShowNamePopup(true)
  }

  // 실제 데이터 (API에서 가져옴)
  const [realCurrent, setRealCurrent] = useState<PeriodMetrics | null>(null)
  const [realPrevious, setRealPrevious] = useState<PeriodMetrics | null>(null)
  const [realEvidence, setRealEvidence] = useState<MetricEvidenceMap | null>(null)
  const [loading, setLoading] = useState(false)

  // 리포트 모달
  const [reportOpen, setReportOpen] = useState(false)

  // 메시지 전송
  const [msgOpen, setMsgOpen] = useState(false)
  const [msgText, setMsgText] = useState('')
  const [msgSending, setMsgSending] = useState(false)
  const [msgSent, setMsgSent] = useState(false)
  const [msgError, setMsgError] = useState('')

  // 실제 사용자 데이터 fetch
  const fetchRealMetrics = useCallback(async (userId: string, ms: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/b2b/metrics?userId=${userId}&milestone=${ms}`)
      if (!res.ok) {
        setRealCurrent(null)
        setRealPrevious(null)
        setRealEvidence(null)
        return
      }
      const data = await res.json()
      setRealCurrent(data.current || null)
      setRealPrevious(data.previous || null)
      setRealEvidence(data.evidence || null)
    } catch {
      setRealCurrent(null)
      setRealPrevious(null)
      setRealEvidence(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // 사용자 선택 or 마일스톤 변경 시 실제 데이터 fetch
  useEffect(() => {
    if (selectedUser) {
      fetchRealMetrics(selectedUser.userId, milestone)
    } else {
      setRealCurrent(null)
      setRealPrevious(null)
      setRealEvidence(null)
    }
  }, [selectedUser, milestone, fetchRealMetrics])

  async function handleSendMessage() {
    if (!selectedUser || !msgText.trim()) return
    setMsgSending(true)
    setMsgError('')
    try {
      const res = await fetch('/api/b2b/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toUserId: selectedUser.userId,
          fromName: '담당자',
          message: msgText.trim(),
        }),
      })
      if (res.ok) {
        setMsgSent(true)
        setMsgText('')
        setTimeout(() => { setMsgSent(false); setMsgOpen(false) }, 1500)
      } else {
        const data = await res.json().catch(() => null)
        setMsgError(data?.error || `전송 실패 (${res.status})`)
      }
    } catch (err) {
      setMsgError('네트워크 오류가 발생했습니다.')
      console.error('메시지 전송 에러:', err)
    } finally {
      setMsgSending(false)
    }
  }

  // 사용자 선택 시 마일스톤 자동 조정
  function handleSelectUser(user: RegisteredUser) {
    setSelectedUser(user)
    const ms = getDefaultMilestone(user.executionCount)
    setMilestone(ms)
  }

  // 선택된 사용자의 최대 마일스톤
  const maxMilestone = selectedUser
    ? getMaxMilestone(selectedUser.executionCount)
    : '1000' as Milestone

  // 데이터 소스: 실제 사용자면 API 데이터, 아니면 데모
  const isRealUser = selectedUser !== null
  const demoData = DEMO_MILESTONE_DATA[milestone] || DEMO_MILESTONE_DATA['5']

  const current = isRealUser && realCurrent ? realCurrent : demoData.current
  const previous = isRealUser ? realPrevious : demoData.previous
  const evidence = isRealUser ? realEvidence : null // 데모 모드에서는 증거 없음

  // 100회 미만이면 비교 없음 (현재 상태만)
  const showChange = previous !== null && parseInt(milestone) >= 100
  const effectivePrevious = showChange ? previous : null

  const overallDelta = effectivePrevious
    ? current.overallScore - effectivePrevious.overallScore
    : 0

  // 동적 인사이트 생성 (실제 점수 기반, 할루시네이션 없음)
  const insights = generateAllInsights(
    current.scores,
    effectivePrevious?.scores ?? null,
  )

  return (
    <>
      <B2BHeader
        onSelectUser={handleSelectUser}
        institutionName={institutionName}
        onChangeName={handleChangeName}
        coachPlan={coachSub?.plan ?? null}
        trialDaysLeft={coachSub?.trialDaysLeft}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        <div className="space-y-8">
          {/* 기관 플랜 카드 */}
          <B2BPlanCard subscription={coachSub} />

          {/* 선택된 사용자 배너 or 데모 배너 */}
          {selectedUser ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-3 px-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-medium text-violet-200">{selectedUser.name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    실행 {selectedUser.executionCount.toLocaleString()}회
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setMsgOpen(true); setMsgError('') }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  메시지
                </button>
                <button
                  onClick={() => setReportOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-xs font-medium rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  리포트
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-2 px-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <span className="text-xs text-indigo-300">
                데모 모드 — 리스트에서 사용자를 선택하면 실제 지표와 근거 날짜를 조회합니다
              </span>
            </div>
          )}

          {/* 로딩 표시 */}
          {loading && (
            <div className="text-center py-4">
              <span className="text-xs text-indigo-400 animate-pulse">실제 데이터를 분석하고 있습니다...</span>
            </div>
          )}

          {/* 철학 문구 */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-100 mb-2">
              실행 DNA 리포트
            </h1>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              &ldquo;실행은 성과의 DNA입니다. 8가지 역량 지표로 개인의 실행력을 과학적으로 분석합니다.&rdquo;
            </p>
          </motion.div>

          {/* 마일스톤 필터 */}
          <div className="flex justify-center">
            <MilestoneFilter
              value={milestone}
              onChange={setMilestone}
              maxMilestone={maxMilestone}
            />
          </div>

          {/* 종합 점수 요약 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{current.overallScore}</span>
              </div>
              <div>
                <div className="text-sm text-gray-400">종합 실행 지수</div>
                <div className="text-xl font-bold text-gray-100">
                  {current.overallScore}
                  <span className="text-sm text-gray-500 font-normal ml-1">/100</span>
                </div>
                {showChange ? (
                  <span
                    className={`text-sm font-medium ${
                      overallDelta > 0 ? 'text-indigo-400' : overallDelta < 0 ? 'text-slate-400' : 'text-gray-500'
                    }`}
                  >
                    {overallDelta > 0 ? '↑' : overallDelta < 0 ? '↓' : '–'} {Math.abs(overallDelta)}점
                    {effectivePrevious && ` (${effectivePrevious.period} 대비)`}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">
                    {current.period} 기준 현재 상태
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 text-sm text-gray-400 md:text-right">
              <p>
                ISO 30414 기반
                <span className="text-indigo-300 font-medium"> 8개 실행 역량 지표</span>를
                종합 분석합니다.
              </p>
              {!showChange && (
                <p className="text-xs text-gray-600 mt-1">
                  실행 100개 이상부터 성장 변화를 비교합니다.
                </p>
              )}
            </div>
          </motion.div>

          {/* 레이더 차트 */}
          <ExecutionDNARadar
            current={current.scores}
            previous={effectivePrevious?.scores ?? null}
          />

          {/* 8개 메트릭 카드 그리드 */}
          <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-4">역량별 상세 분석</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {METRIC_DEFINITIONS.map((def, i) => (
                <motion.div
                  key={def.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <MetricCard
                    metricKey={def.key}
                    current={current.scores[def.key]}
                    previous={showChange && effectivePrevious ? effectivePrevious.scores[def.key] : null}
                    insight={insights[def.key] || ''}
                    sparkline={showChange ? (DEMO_SPARKLINE[def.key] || []) : []}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ISO 매핑 테이블 — 실제 사용자만 근거 날짜 표시 */}
          <ISOmappingTable evidence={evidence} />

          {/* 프라이버시 배지 */}
          <PrivacyBadge />
        </div>
      </main>

      {/* 메시지 전송 모달 */}
      <AnimatePresence>
        {msgOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => !msgSending && setMsgOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {msgSent ? (
                <div className="p-8 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-200 font-medium">메시지가 전송되었습니다.</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedUser.name}님이 앱에 접속하면 확인할 수 있습니다.</p>
                </div>
              ) : (
                <>
                  <div className="px-5 py-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold">
                        {selectedUser.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-200">{selectedUser.name}님에게 메시지</div>
                        <div className="text-xs text-gray-500">{selectedUser.email}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <textarea
                      value={msgText}
                      onChange={(e) => setMsgText(e.target.value)}
                      placeholder="격려, 피드백 또는 안내 메시지를 작성하세요..."
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 resize-none transition-colors"
                      autoFocus
                    />
                    <p className="text-[10px] text-gray-600 mt-2">사용자가 길로그 앱에 접속하면 이 메시지가 표시됩니다.</p>
                    {msgError && (
                      <p className="text-xs text-red-400 mt-2">{msgError}</p>
                    )}
                  </div>
                  <div className="px-5 pb-5 flex gap-3">
                    <button
                      onClick={() => setMsgOpen(false)}
                      disabled={msgSending}
                      className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={msgSending || !msgText.trim()}
                      className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      {msgSending ? '전송 중...' : '전송하기'}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 성장 리포트 모달 */}
      {selectedUser && (
        <GrowthReportModal
          open={reportOpen}
          onClose={() => setReportOpen(false)}
          userId={selectedUser.userId}
          studentName={selectedUser.name}
          email={selectedUser.email}
          institutionName={institutionName || ''}
          executionCount={selectedUser.executionCount}
          milestone={milestone}
          currentScores={current.scores}
          previousScores={effectivePrevious?.scores ?? null}
          overallScore={current.overallScore}
          previousOverallScore={effectivePrevious?.overallScore ?? null}
          insights={insights}
        />
      )}

      {/* 기관 이름 입력 팝업 */}
      <AnimatePresence>
        {showNamePopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm p-6"
            >
              <div className="text-center mb-5">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">기관 이름을 입력해주세요</h3>
                <p className="text-sm text-gray-400 mt-1">헤더에 표시됩니다. 없으면 &quot;없음&quot;을 입력하세요.</p>
              </div>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                placeholder="예: 서울대학교, 삼성전자"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-colors mb-4"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors"
              >
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
