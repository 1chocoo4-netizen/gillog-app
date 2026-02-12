'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

export function TermsConsentModal() {
  const { data: session, update } = useSession()
  const [show, setShow] = useState(false)
  const [termsChecked, setTermsChecked] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  // 약관 펼치기
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const checkConsent = useCallback(async () => {
    try {
      const res = await fetch('/api/consent')
      if (!res.ok) return
      const data = await res.json()
      if (!data.termsAgreed) {
        setShow(true)
      }
    } catch {
      // 무시
    }
  }, [])

  useEffect(() => {
    if (!session?.user) return
    // 세션에 이미 동의 정보가 있으면 API 호출 불필요
    if (session.user.termsAgreed) return
    checkConsent()
  }, [session?.user, checkConsent])

  async function handleAgree() {
    if (!termsChecked || !privacyChecked || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'terms' }),
      })
      if (res.ok) {
        setDone(true)
        // 세션 갱신
        await update()
        setTimeout(() => setShow(false), 1200)
      }
    } catch {
      // 에러 무시
    } finally {
      setSubmitting(false)
    }
  }

  if (!show) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* 배경 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* 모달 */}
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
              <p className="text-gray-400 text-sm mt-1">길로그에 오신 것을 환영합니다</p>
            </div>
          ) : (
            <>
              {/* 상단 아이콘 */}
              <div className="pt-8 pb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                </div>
              </div>

              {/* 제목 */}
              <div className="px-6 pb-2 text-center">
                <h2 className="text-lg font-bold text-gray-100 mb-1">서비스 이용 동의</h2>
                <p className="text-sm text-gray-400">길로그 서비스 이용을 위해 아래 약관에 동의해주세요.</p>
              </div>

              {/* 약관 체크 영역 */}
              <div className="mx-6 mt-4 space-y-3">
                {/* 서비스 이용약관 */}
                <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
                  <label className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsChecked}
                      onChange={() => setTermsChecked(!termsChecked)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer accent-violet-500"
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
                          <p className="font-semibold text-gray-300">제1조 (목적)</p>
                          <p>이 약관은 길로그(이하 &quot;서비스&quot;)의 이용 조건 및 절차, 이용자와 서비스 제공자의 권리·의무를 규정합니다.</p>
                          <p className="font-semibold text-gray-300">제2조 (서비스 내용)</p>
                          <p>길로그는 청소년의 자기주도 학습 실행 기록, AI 코칭, 성장 리포트 작성을 지원하는 비영리 교육 서비스입니다.</p>
                          <p className="font-semibold text-gray-300">제3조 (이용자 의무)</p>
                          <p>이용자는 타인의 개인정보를 도용하거나 부정한 목적으로 서비스를 이용할 수 없습니다.</p>
                          <p className="font-semibold text-gray-300">제4조 (서비스 변경 및 중단)</p>
                          <p>서비스 제공자는 운영상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.</p>
                          <p className="font-semibold text-gray-300">제5조 (면책)</p>
                          <p>무료로 제공되는 서비스이므로, 서비스 이용으로 발생하는 어떠한 손해에 대해서도 법적 책임을 지지 않습니다.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 개인정보 수집·이용 동의 */}
                <div className="bg-gray-800/50 rounded-xl border border-white/5 overflow-hidden">
                  <label className="flex items-center gap-3 px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyChecked}
                      onChange={() => setPrivacyChecked(!privacyChecked)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-violet-500 focus:ring-violet-500 focus:ring-offset-0 cursor-pointer accent-violet-500"
                    />
                    <span className="text-sm text-gray-200 font-medium flex-1">
                      개인정보 수집·이용 동의 <span className="text-red-400">(필수)</span>
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
                          <p className="font-semibold text-gray-300">1. 수집하는 개인정보 항목</p>
                          <p>- Google 계정 정보 (이름, 이메일, 프로필 사진)</p>
                          <p>- 서비스 이용 기록 (실행 기록, 코칭 대화, 성장 리포트)</p>
                          <p className="font-semibold text-gray-300">2. 수집·이용 목적</p>
                          <p>- 학습 실행 기록 및 성장 분석 제공</p>
                          <p>- 생활기록부 작성 지원 자료 생성</p>
                          <p>- 서비스 개선 및 통계 분석 (비식별화)</p>
                          <p className="font-semibold text-gray-300">3. 보유 및 이용 기간</p>
                          <p>회원 탈퇴 시까지 보유하며, 탈퇴 즉시 파기합니다.</p>
                          <p className="font-semibold text-gray-300">4. 제3자 제공</p>
                          <p>이용자의 명시적 동의 없이는 어떠한 제3자에게도 개인정보를 제공하지 않습니다.</p>
                          <p className="font-semibold text-gray-300">5. 데이터 보안</p>
                          <p>모든 데이터는 암호화하여 저장하며, 개인이 올린 원문 데이터는 철저히 비공개로 관리됩니다.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="mx-6 mt-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <p className="text-xs text-violet-300 leading-relaxed text-center">
                  동의 후 <strong>무료 1일 체험</strong>이 제공됩니다.
                </p>
              </div>

              {/* 동의 버튼 */}
              <div className="p-6">
                <button
                  onClick={handleAgree}
                  disabled={!termsChecked || !privacyChecked || submitting}
                  className="w-full py-3.5 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors"
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
