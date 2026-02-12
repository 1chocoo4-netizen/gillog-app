'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function ParentalConsentModal({ isOpen, onClose, onComplete }: Props) {
  const { update } = useSession()
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit() {
    if (!agreed || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'parental' }),
      })
      if (res.ok) {
        setDone(true)
        await update()
        setTimeout(() => {
          onComplete()
          setDone(false)
          setAgreed(false)
        }, 2000)
      }
    } catch {
      // 에러 무시
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] overflow-y-auto">
          {/* 배경 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !submitting && onClose()}
          />

          {/* 스크롤 + 중앙 정렬 래퍼 */}
          <div className="min-h-full flex items-center justify-center p-4">
          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm my-4"
          >
            {done ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-200 font-bold text-lg">부모님 동의 완료</p>
                <p className="text-gray-400 text-sm mt-1">감사합니다!</p>
              </div>
            ) : (
              <>
                {/* 상단 아이콘 */}
                <div className="pt-8 pb-2 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                </div>

                {/* 핵심 안내 - 제일 큰 글씨 */}
                <div className="px-6 pt-2 pb-4">
                  <h2 className="text-center text-lg font-bold text-gray-100 mb-4">
                    보호자(법정대리인) 동의서
                  </h2>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 space-y-3">
                    <p className="text-xl font-extrabold text-blue-300 text-center leading-snug">
                      모든 데이터는<br />
                      학습용과 생활기록부<br />
                      작성용으로만 사용됩니다
                    </p>
                    <div className="w-12 h-0.5 mx-auto bg-blue-500/30 rounded-full" />
                    <p className="text-lg font-bold text-blue-200 text-center leading-snug">
                      철저히 비공개로 관리되며<br />
                      그 누구도 개인이 올린<br />
                      데이터에 접근하지 못합니다
                    </p>
                  </div>
                </div>

                {/* 상세 약관 */}
                <div className="mx-6 mb-4 space-y-3">
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-3 text-xs text-gray-400 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">1</span>
                      <div>
                        <p className="font-semibold text-gray-300 mb-1">수집 항목 및 목적</p>
                        <p>자녀의 학습 실행 기록, AI 코칭 내용, 성장 리포트 데이터를 수집하며, 이는 <strong className="text-gray-200">오직 자기주도 학습 지원</strong>과 <strong className="text-gray-200">생활기록부 작성 참고 자료</strong> 생성 목적으로만 사용됩니다.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">2</span>
                      <div>
                        <p className="font-semibold text-gray-300 mb-1">데이터 비공개 보장</p>
                        <p>자녀가 입력한 모든 텍스트, 사진, 기록물은 <strong className="text-gray-200">암호화하여 저장</strong>됩니다. 서비스 운영자를 포함한 <strong className="text-gray-200">어떤 제3자도 개인 데이터에 접근할 수 없습니다.</strong></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">3</span>
                      <div>
                        <p className="font-semibold text-gray-300 mb-1">제3자 제공 금지</p>
                        <p>보호자의 명시적 추가 동의 없이는 어떠한 기관, 기업, 개인에게도 자녀의 데이터를 제공하지 않습니다.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">4</span>
                      <div>
                        <p className="font-semibold text-gray-300 mb-1">열람·삭제 권리</p>
                        <p>보호자 또는 자녀는 언제든지 데이터의 열람, 수정, 삭제를 요청할 수 있으며, 회원 탈퇴 시 모든 데이터는 <strong className="text-gray-200">즉시 영구 삭제</strong>됩니다.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold mt-0.5">5</span>
                      <div>
                        <p className="font-semibold text-gray-300 mb-1">동의 철회</p>
                        <p>본 동의는 언제든지 철회할 수 있으며, 철회 시 해당 서비스 이용이 제한될 수 있습니다.</p>
                      </div>
                    </div>
                  </div>

                  {/* 동의 체크 */}
                  <label className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer accent-blue-500"
                    />
                    <span className="text-sm text-gray-200 font-medium">
                      위 내용을 확인하였으며, 보호자로서 동의합니다 <span className="text-red-400">(필수)</span>
                    </span>
                  </label>
                </div>

                {/* 버튼 */}
                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={submitting}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                  >
                    나중에
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!agreed || submitting}
                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    {submitting ? '처리 중...' : '동의 완료'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
