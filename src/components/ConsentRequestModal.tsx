'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'

interface PendingConsent {
  id: string
  institutionId: string
  requestedAt: string
}

export function ConsentRequestModal() {
  const { data: session } = useSession()
  const [consent, setConsent] = useState<PendingConsent | null>(null)
  const [isResponding, setIsResponding] = useState(false)
  const [done, setDone] = useState(false)

  const fetchPending = useCallback(async () => {
    try {
      const res = await fetch('/api/b2b/consent/my')
      if (!res.ok) return
      const data = await res.json()
      if (data.consents && data.consents.length > 0) {
        setConsent(data.consents[0])
      }
    } catch {
      // 무시
    }
  }, [])

  useEffect(() => {
    if (!session?.user) return
    fetchPending()
  }, [session?.user, fetchPending])

  async function handleRespond(status: 'APPROVED' | 'DENIED') {
    if (!consent) return
    setIsResponding(true)

    try {
      const res = await fetch('/api/b2b/consent', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consentId: consent.id, status }),
      })

      if (res.ok) {
        setDone(true)
        setTimeout(() => {
          setConsent(null)
          setDone(false)
        }, 2000)
      }
    } catch {
      // 에러 무시
    } finally {
      setIsResponding(false)
    }
  }

  if (!consent) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* 배경 오버레이 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => !isResponding && setConsent(null)}
        />

        {/* 모달 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {done ? (
            /* 완료 화면 */
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-200 font-medium">응답이 완료되었습니다.</p>
            </div>
          ) : (
            <>
              {/* 상단 아이콘 */}
              <div className="pt-8 pb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                  </svg>
                </div>
              </div>

              {/* 본문 */}
              <div className="px-6 pb-2 text-center">
                <h2 className="text-lg font-bold text-gray-100 mb-2">
                  데이터 공유 동의 요청
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  소속 기관에서 회원님의
                  <span className="text-indigo-300 font-medium"> 실행 DNA 리포트</span>
                  열람을 요청했습니다.
                </p>
              </div>

              {/* 안내 사항 */}
              <div className="mx-6 mt-4 p-3 bg-gray-800/50 rounded-lg space-y-2">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>개인 원문(텍스트/사진)은 <strong className="text-gray-300">절대 노출되지 않습니다.</strong></span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>통계 지표(8개 역량 점수)만 공유됩니다.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <svg className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>동의는 언제든 철회할 수 있습니다.</span>
                </div>
              </div>

              {/* 버튼 */}
              <div className="p-6 flex gap-3">
                <button
                  onClick={() => handleRespond('DENIED')}
                  disabled={isResponding}
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                >
                  거부
                </button>
                <button
                  onClick={() => handleRespond('APPROVED')}
                  disabled={isResponding}
                  className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  {isResponding ? '처리 중...' : '동의하기'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
