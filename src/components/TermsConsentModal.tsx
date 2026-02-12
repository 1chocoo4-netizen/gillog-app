'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── 개인 앱 약관 ───
const INDIVIDUAL_TERMS = [
  { title: '제1조 (목적)', body: '이 약관은 길로그(이하 "서비스")의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리·의무를 규정합니다.' },
  { title: '제2조 (서비스 내용)', body: '길로그는 청소년의 자기주도 학습 실행 기록, AI 코칭, 성장 리포트 작성을 지원하는 교육 서비스입니다.' },
  { title: '제3조 (이용자 의무)', body: '이용자는 타인의 개인정보를 도용하거나 부정한 목적으로 서비스를 이용할 수 없습니다.' },
  { title: '제4조 (서비스 변경 및 중단)', body: '서비스 제공자는 운영상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.' },
  { title: '제5조 (면책)', body: '서비스 제공자는 천재지변, 시스템 장애 등 불가항력으로 인한 서비스 중단 및 이용 장애에 대해 책임을 지지 않습니다. 유료 서비스의 경우 별도의 환불 정책에 따릅니다.' },
]

const INDIVIDUAL_PRIVACY = [
  { title: '1. 수집하는 개인정보 항목', body: '- Google 계정 정보 (이름, 이메일, 프로필 사진)\n- 서비스 이용 기록 (실행 기록, 코칭 대화, 성장 리포트)' },
  { title: '2. 수집·이용 목적', body: '- 학습 실행 기록 및 성장 분석 제공\n- 생활기록부 작성 지원 자료 생성\n- 서비스 개선 및 통계 분석 (비식별화)' },
  { title: '3. 보유 및 이용 기간', body: '회원 탈퇴 시까지 보유하며, 탈퇴 즉시 파기합니다.' },
  { title: '4. 제3자 제공', body: '이용자의 명시적 동의 없이는 어떠한 제3자에게도 개인정보를 제공하지 않습니다.' },
  { title: '5. 데이터 보안', body: '모든 데이터는 암호화하여 저장하며, 개인이 올린 원문 데이터는 철저히 비공개로 관리됩니다.' },
]

// ─── B2B 관리자 약관 ───
const B2B_TERMS = [
  { title: '제1조 (목적)', body: '이 약관은 길로그 기관/코치 관리 서비스(이하 "관리 서비스")의 이용 조건 및 절차를 규정합니다.' },
  { title: '제2조 (서비스 내용)', body: '관리 서비스는 교육 기관 및 코치가 소속 학생의 실행 DNA 리포트를 열람하고, 학습 성장을 지원하기 위한 B2B 대시보드를 제공합니다.' },
  { title: '제3조 (관리자 의무)', body: '관리자는 열람 권한을 부여받은 학생 데이터를 교육 목적 외에 사용하거나 제3자에게 유출해서는 안 됩니다. 학생의 개인 원문 데이터(텍스트, 사진)에는 접근할 수 없으며, 통계 지표만 열람 가능합니다.' },
  { title: '제4조 (데이터 접근 범위)', body: '관리자는 학생이 명시적으로 동의한 경우에만 해당 학생의 ISO 30414 기반 8개 역량 점수(통계 데이터)를 열람할 수 있습니다. 학생은 언제든 동의를 철회할 수 있으며, 철회 시 즉시 열람이 중단됩니다.' },
  { title: '제5조 (서비스 변경 및 면책)', body: '서비스 제공자는 운영상 필요에 따라 서비스를 변경하거나 중단할 수 있습니다. 천재지변, 시스템 장애 등 불가항력으로 인한 장애에 대해 책임을 지지 않습니다.' },
]

const B2B_PRIVACY = [
  { title: '1. 수집하는 개인정보 항목', body: '- 관리자 Google 계정 정보 (이름, 이메일, 프로필 사진)\n- 기관 정보 (기관명)\n- 관리 활동 기록 (학생 등록, 리포트 조회, 메시지 발송 이력)' },
  { title: '2. 수집·이용 목적', body: '- 기관/코치 본인 인증 및 관리 권한 부여\n- 학생 실행 DNA 리포트 열람 서비스 제공\n- 서비스 개선 및 부정 이용 방지' },
  { title: '3. 학생 데이터 처리', body: '관리자가 열람하는 학생 데이터는 학생 본인의 동의를 받은 통계 지표에 한정됩니다. 학생의 개인 원문(텍스트, 사진, 기록물)은 관리자에게 제공되지 않으며, 서비스 운영자를 포함한 어떤 제3자도 접근할 수 없습니다.' },
  { title: '4. 보유 및 이용 기간', body: '관리자 탈퇴 시까지 보유하며, 탈퇴 즉시 관리 활동 기록을 파기합니다. 학생 데이터는 학생 계정에 귀속되며 관리자 탈퇴와 무관합니다.' },
  { title: '5. 데이터 보안', body: '모든 통신은 암호화(HTTPS)로 보호되며, 관리자의 접근 이력은 감사 로그로 기록됩니다.' },
]

export function TermsConsentModal() {
  const { data: session, update, status } = useSession()
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [isAdult, setIsAdult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  // B2B 페이지 여부
  const isB2B = pathname?.startsWith('/dashboard/b2b') || pathname?.startsWith('/coach-verify')

  useEffect(() => {
    // 세션 로딩 중이면 대기
    if (status !== 'authenticated') return
    if (!session?.user) return
    // 세션에서 이미 동의 확인되면 스킵
    if (session.user.termsAgreed === true) return
    // 세션에서 false면 바로 표시
    if (session.user.termsAgreed === false) {
      setShow(true)
      return
    }
    // undefined인 경우 (세션에 필드 자체가 없을 때) API로 재확인
    fetch('/api/consent')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && !data.termsAgreed) setShow(true)
      })
      .catch(() => {
        // API도 실패하면 안전하게 모달 표시
        setShow(true)
      })
  }, [status, session?.user])

  async function handleAgree() {
    if (!termsChecked || !privacyChecked || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'terms', isAdult: isAdult || isB2B }),
      })
      if (res.ok) {
        setDone(true)
        await update()
        setTimeout(() => setShow(false), 1200)
      }
    } catch {} finally {
      setSubmitting(false)
    }
  }

  if (!show) return null

  const terms = isB2B ? B2B_TERMS : INDIVIDUAL_TERMS
  const privacy = isB2B ? B2B_PRIVACY : INDIVIDUAL_PRIVACY

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {done ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-200 font-medium">동의가 완료되었습니다!</p>
              <p className="text-gray-400 text-sm mt-1">
                {isB2B ? '관리 서비스에 오신 것을 환영합니다' : '길로그에 오신 것을 환영합니다'}
              </p>
            </div>
          ) : (
            <>
              {/* 상단 아이콘 */}
              <div className="pt-8 pb-4 flex justify-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isB2B ? 'bg-indigo-500/20' : 'bg-violet-500/20'}`}>
                  <svg className={`w-8 h-8 ${isB2B ? 'text-indigo-400' : 'text-violet-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                </div>
              </div>

              {/* 제목 */}
              <div className="px-6 pb-2 text-center">
                <h2 className="text-lg font-bold text-gray-100 mb-1">
                  {isB2B ? '기관/코치 서비스 이용 동의' : '서비스 이용 동의'}
                </h2>
                <p className="text-sm text-gray-400">
                  {isB2B ? '길로그 관리 서비스 이용을 위해 아래 약관에 동의해주세요.' : '길로그 서비스 이용을 위해 아래 약관에 동의해주세요.'}
                </p>
              </div>

              {/* 약관 체크 영역 */}
              <div className="mx-6 mt-4 space-y-3">
                {/* 이용약관 */}
                <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
                  <label className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={() => setTermsChecked(!termsChecked)}
                      className={`w-5 h-5 rounded border-gray-600 bg-gray-700 focus:ring-offset-0 cursor-pointer ${isB2B ? 'text-indigo-500 focus:ring-indigo-500 accent-indigo-500' : 'text-violet-500 focus:ring-violet-500 accent-violet-500'}`}
                    />
                    <span className="text-sm text-gray-200 font-medium flex-1">
                      서비스 이용약관 동의 <span className="text-red-400">(필수)</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setTermsOpen(!termsOpen) }}
                      className="text-xs text-gray-500 hover:text-gray-300"
                    >
                      {termsOpen ? '접기' : '보기'}
                    </button>
                  </label>
                  <AnimatePresence>
                    {termsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 text-xs text-gray-400 leading-relaxed max-h-32 overflow-y-auto space-y-2">
                          {terms.map((t, i) => (
                            <div key={i}>
                              <p className="font-semibold text-gray-300">{t.title}</p>
                              <p className="whitespace-pre-line">{t.body}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 개인정보 처리방침 */}
                <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
                  <label className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={() => setPrivacyChecked(!privacyChecked)}
                      className={`w-5 h-5 rounded border-gray-600 bg-gray-700 focus:ring-offset-0 cursor-pointer ${isB2B ? 'text-indigo-500 focus:ring-indigo-500 accent-indigo-500' : 'text-violet-500 focus:ring-violet-500 accent-violet-500'}`}
                    />
                    <span className="text-sm text-gray-200 font-medium flex-1">
                      개인정보 처리방침 동의 <span className="text-red-400">(필수)</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); setPrivacyOpen(!privacyOpen) }}
                      className="text-xs text-gray-500 hover:text-gray-300"
                    >
                      {privacyOpen ? '접기' : '보기'}
                    </button>
                  </label>
                  <AnimatePresence>
                    {privacyOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 text-xs text-gray-400 leading-relaxed max-h-32 overflow-y-auto space-y-2">
                          {privacy.map((p, i) => (
                            <div key={i}>
                              <p className="font-semibold text-gray-300">{p.title}</p>
                              <p className="whitespace-pre-line">{p.body}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 성인 여부 - 개인 앱에서만 */}
              {!isB2B && (
                <div className="mx-6 mt-3">
                  <label className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAdult}
                      onChange={() => setIsAdult(!isAdult)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer accent-violet-500"
                    />
                    <span className="text-sm text-gray-200 font-medium">
                      만 18세 이상입니다 <span className="text-gray-500">(선택)</span>
                    </span>
                  </label>
                  {!isAdult && (
                    <p className="text-[11px] text-gray-500 mt-1.5 px-1">
                      미성년자는 무료 1일 체험 후 보호자 동의가 필요합니다.
                    </p>
                  )}
                </div>
              )}

              {/* 동의 버튼 */}
              <div className="p-6">
                <button
                  onClick={handleAgree}
                  disabled={!termsChecked || !privacyChecked || submitting}
                  className={`w-full py-3.5 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors ${isB2B ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-violet-500 hover:bg-violet-600'}`}
                >
                  {submitting ? '처리 중...' : '동의하고 시작하기'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
