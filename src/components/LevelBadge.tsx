'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, Mail, ClipboardCheck, Gift, ShieldCheck, ShieldOff, CalendarCheck } from 'lucide-react'
import { useUserData } from '@/lib/UserDataProvider'
import { useSession, signOut } from 'next-auth/react'
import SubscriptionBadge from '@/components/SubscriptionBadge'
import { ParentalConsentModal } from '@/components/ParentalConsentModal'

interface SurveyResult {
  milestone: number
  careerScore: number
  communityScore: number
  nonCognitiveScore: number
  learningScore: number
  habitScore: number
  totalScore: number
  createdAt: string
}

const AREA_CONFIG = [
  { key: 'careerScore' as const, label: '진로', color: '#6366f1', icon: '🧭' },
  { key: 'communityScore' as const, label: '공동체', color: '#10b981', icon: '🤝' },
  { key: 'nonCognitiveScore' as const, label: '인성', color: '#f59e0b', icon: '💪' },
  { key: 'learningScore' as const, label: '학습', color: '#8b5cf6', icon: '📖' },
  { key: 'habitScore' as const, label: '습관', color: '#22c55e', icon: '🔄' },
]

export function LevelBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const { levelData, subscriptionInfo, refreshSubscription, history } = useUserData()
  const { data: session, update } = useSession()
  const [surveyResults, setSurveyResults] = useState<SurveyResult[]>([])
  const [surveyLoading, setSurveyLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // 부모님 동의
  const [showParentalModal, setShowParentalModal] = useState(false)
  const [revoking, setRevoking] = useState(false)

  async function handleRevokeParental() {
    if (!confirm('부모님(보호자) 동의를 철회하시겠습니까?\n철회 시 서비스 이용이 제한됩니다.')) return
    setRevoking(true)
    try {
      const res = await fetch('/api/consent', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'parental' }) })
      if (res.ok) await update()
    } catch {} finally {
      setRevoking(false)
    }
  }

  async function handleRevokeTerms() {
    if (!confirm('개인정보 동의를 철회하시겠습니까?\n철회 시 서비스 이용이 제한됩니다.')) return
    setRevoking(true)
    try {
      const res = await fetch('/api/consent', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'terms' }) })
      if (res.ok) await update()
    } catch {} finally {
      setRevoking(false)
    }
  }

  // 쿠폰 관련
  const [couponCode, setCouponCode] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [couponError, setCouponError] = useState(false)
  const [couponSubmitting, setCouponSubmitting] = useState(false)

  async function handleCouponRedeem() {
    if (!couponCode.trim() || couponSubmitting) return
    setCouponSubmitting(true)
    setCouponMsg('')
    setCouponError(false)

    try {
      const res = await fetch('/api/coupons/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setCouponMsg(data.message)
        setCouponError(false)
        setCouponCode('')
        refreshSubscription()
      } else {
        setCouponMsg(data.error || '쿠폰 적용 실패')
        setCouponError(true)
      }
    } catch {
      setCouponMsg('네트워크 오류')
      setCouponError(true)
    } finally {
      setCouponSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    setSurveyLoading(true)
    fetch('/api/survey')
      .then(res => res.json())
      .then(data => setSurveyResults(data.results ?? []))
      .catch(() => {})
      .finally(() => setSurveyLoading(false))
  }, [isOpen])

  const handleLogout = () => {
    if (confirm('정말 로그아웃 하시겠습니까?')) {
      signOut({ callbackUrl: '/login' })
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch('/api/user-data', { method: 'DELETE' })
      if (res.ok) {
        signOut({ callbackUrl: '/login' })
      } else {
        alert('탈퇴 처리 중 오류가 발생했습니다.')
      }
    } catch {
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform overflow-hidden"
      >
        {session?.user?.image ? (
          <img src={session.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          (session?.user?.name || '?').charAt(0)
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[20%] z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl shadow-2xl border border-white/10 max-h-[70vh] flex flex-col overflow-hidden">
                {/* 닫기 버튼 */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white p-1 z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* 스크롤 가능 영역 */}
                <div className="p-6 pb-0 overflow-y-auto flex-1">

                {/* 프로필 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center overflow-hidden mb-3">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="프로필" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-white text-3xl font-bold">
                        {(session?.user?.name || '?').charAt(0)}
                      </span>
                    )}
                  </div>
                  <p className="text-white font-bold text-lg">{session?.user?.name || '사용자'}</p>
                  <div className="mt-2">
                    <SubscriptionBadge info={subscriptionInfo} />
                  </div>
                  {session?.user?.email && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <Mail className="w-3.5 h-3.5 text-white/40" />
                      <p className="text-white/40 text-sm">{session.user.email}</p>
                    </div>
                  )}

                  {/* 총 접속일수 */}
                  <div className="flex items-center gap-1.5 mt-3 px-3 py-2 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <CalendarCheck className="w-4 h-4 text-violet-400" />
                    <span className="text-violet-300 text-sm font-semibold">
                      총 {new Set(history.map(r => r.date)).size}일 접속
                    </span>
                  </div>
                </div>

                {/* 개인정보 동의 상태 */}
                {session?.user?.termsAgreed && (
                  <div className="mt-4 flex items-center justify-between gap-2 px-3 py-2.5 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-violet-400 text-xs font-medium">개인정보 동의 완료</span>
                    </div>
                    <button
                      onClick={handleRevokeTerms}
                      disabled={revoking}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-medium transition-colors disabled:opacity-50 flex-shrink-0"
                    >
                      <ShieldOff className="w-3 h-3" />
                      철회
                    </button>
                  </div>
                )}

                {/* 설문조사 결과 */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 mb-3">
                    <ClipboardCheck className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-white/80 text-xs font-semibold">설문조사 결과</span>
                  </div>

                  {surveyLoading ? (
                    <p className="text-white/30 text-xs text-center py-3">불러오는 중...</p>
                  ) : surveyResults.length === 0 ? (
                    <p className="text-white/30 text-xs text-center py-3">아직 설문 결과가 없습니다</p>
                  ) : (
                    <div className="space-y-4">
                      {surveyResults.map((result) => (
                        <div key={result.milestone} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-medium text-violet-300 bg-violet-500/15 px-1.5 py-0.5 rounded-full">
                              {result.milestone}회 달성
                            </span>
                            <span className="text-[10px] text-white/25">
                              {new Date(result.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                          </div>

                          {AREA_CONFIG.map((area) => (
                            <div key={area.key} className="space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-white/50">{area.icon} {area.label}</span>
                                <span className="text-[11px] text-white/70 font-medium">{result[area.key]}점</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: area.color }}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result[area.key]}%` }}
                                  transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          ))}

                          <div className="flex items-center justify-between pt-1 border-t border-white/5">
                            <span className="text-[11px] text-white/50">종합</span>
                            <span className="text-xs font-bold text-white">{result.totalScore}점</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 쿠폰 입력 */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-1.5 mb-3">
                    <Gift className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-white/80 text-xs font-semibold">쿠폰 등록</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="쿠폰 코드 입력"
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500"
                      onKeyDown={e => e.key === 'Enter' && handleCouponRedeem()}
                    />
                    <button
                      onClick={handleCouponRedeem}
                      disabled={couponSubmitting}
                      className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
                    >
                      {couponSubmitting ? '...' : '적용'}
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`mt-2 text-xs ${couponError ? 'text-red-400' : 'text-green-400'}`}>
                      {couponMsg}
                    </p>
                  )}
                </div>

                {/* 부모님(보호자) 동의 */}
                <div className="mt-5 pt-4 border-t border-white/10 pb-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-white/80 text-xs font-semibold">보호자 동의</span>
                  </div>
                  {session?.user?.parentalConsent ? (
                    <div className="flex items-center justify-between gap-2 px-3 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        <span className="text-emerald-400 text-xs font-medium">부모님 동의 완료</span>
                      </div>
                      <button
                        onClick={handleRevokeParental}
                        disabled={revoking}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[10px] font-medium transition-colors disabled:opacity-50 flex-shrink-0"
                      >
                        <ShieldOff className="w-3 h-3" />
                        철회
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowParentalModal(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs font-medium hover:bg-blue-500/20 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      부모님(보호자) 동의하기
                    </button>
                  )}
                </div>

                </div>

                {/* 하단 고정 영역 */}
                <div className="p-6 pt-2 flex-shrink-0">
                  {/* 로그아웃 */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    로그아웃
                  </button>

                  {/* 탈퇴하기 */}
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="w-full mt-3 text-center text-white/30 text-xs hover:text-red-400 transition-colors"
                  >
                    탈퇴하기
                  </button>
                </div>

                {/* 탈퇴 확인 모달 */}
                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="bg-slate-800 rounded-2xl p-6 mx-4 max-w-xs w-full border border-red-500/20 shadow-2xl"
                      >
                        <p className="text-white font-semibold text-center mb-3">정말 탈퇴하시겠습니까?</p>
                        <p className="text-white/50 text-xs text-center leading-relaxed mb-5">
                          모든 데이터는 지워지고 영구 삭제됩니다.<br />
                          이 작업은 되돌릴 수 없습니다.
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setShowDeleteConfirm(false)}
                            className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-sm font-medium hover:bg-white/15 transition-colors"
                          >
                            취소
                          </button>
                          <button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="flex-1 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
                          >
                            {isDeleting ? '처리 중...' : '탈퇴하기'}
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ParentalConsentModal
        isOpen={showParentalModal}
        onClose={() => setShowParentalModal(false)}
        onComplete={() => setShowParentalModal(false)}
      />
    </>
  )
}
