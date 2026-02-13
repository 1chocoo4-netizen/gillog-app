'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MetricScores } from '@/lib/b2b/types'
import type { AdminComments, GrowthReportData } from '@/lib/b2b/reportTypes'
import { GrowthReportPreview } from './GrowthReportPreview'

interface GrowthReportModalProps {
  open: boolean
  onClose: () => void
  studentName: string
  email: string
  institutionName: string
  executionCount: number
  milestone: string
  currentScores: MetricScores
  previousScores: MetricScores | null
  overallScore: number
  previousOverallScore: number | null
  insights: Record<string, string>
}

type Step = 'input' | 'preview' | 'result'

export function GrowthReportModal({
  open, onClose,
  studentName, email, institutionName, executionCount, milestone,
  currentScores, previousScores, overallScore, previousOverallScore, insights,
}: GrowthReportModalProps) {
  const [step, setStep] = useState<Step>('input')
  const [comments, setComments] = useState<AdminComments>({
    learning: '', relationship: '', attitude: '',
  })
  const [recipientEmail, setRecipientEmail] = useState(email)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function resetAndClose() {
    setStep('input')
    setComments({ learning: '', relationship: '', attitude: '' })
    setRecipientEmail(email)
    setLoading(false)
    setError('')
    setSuccess(false)
    onClose()
  }

  const reportData: GrowthReportData = {
    studentName,
    email: recipientEmail,
    institutionName,
    executionCount,
    milestone,
    currentScores,
    previousScores,
    overallScore,
    previousOverallScore,
    insights,
    comments,
    generatedAt: new Date().toISOString(),
  }

  async function handleDownloadPdf() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/b2b/growth-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || `PDF 생성 실패 (${res.status})`)
      }
      const data = await res.json()
      // base64 → blob → download
      const byteChars = atob(data.pdf)
      const byteArray = new Uint8Array(byteChars.length)
      for (let i = 0; i < byteChars.length; i++) {
        byteArray[i] = byteChars.charCodeAt(i)
      }
      const blob = new Blob([byteArray], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `성장리포트_${studentName}_${new Date().toISOString().slice(0, 10)}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      setSuccess(true)
      setStep('result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !loading && resetAndClose()}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 스텝 표시 */}
            <div className="px-5 py-3 border-b border-gray-800 flex items-center gap-3">
              {(['input', 'preview', 'result'] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s ? 'bg-indigo-500 text-white' :
                    (['input', 'preview', 'result'].indexOf(step) > i) ? 'bg-indigo-500/30 text-indigo-300' :
                    'bg-gray-700 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs ${step === s ? 'text-gray-200' : 'text-gray-500'}`}>
                    {s === 'input' ? '입력' : s === 'preview' ? '미리보기' : '완료'}
                  </span>
                  {i < 2 && <span className="text-gray-700 text-xs">→</span>}
                </div>
              ))}
              <div className="flex-1" />
              <button
                onClick={resetAndClose}
                disabled={loading}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step 1: 입력 */}
            {step === 'input' && (
              <div className="overflow-y-auto p-5 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-200 mb-1">
                    {studentName}님의 성장 리포트
                  </h3>
                  <p className="text-xs text-gray-500">PDF로 다운로드할 수 있는 성장 리포트를 생성합니다.</p>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">학습 영역 코멘트</label>
                  <textarea
                    value={comments.learning}
                    onChange={(e) => setComments(prev => ({ ...prev, learning: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                    placeholder="학습 관련 피드백을 작성하세요..."
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">관계 영역 코멘트</label>
                  <textarea
                    value={comments.relationship}
                    onChange={(e) => setComments(prev => ({ ...prev, relationship: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                    placeholder="관계 관련 피드백을 작성하세요..."
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1">태도 영역 코멘트</label>
                  <textarea
                    value={comments.attitude}
                    onChange={(e) => setComments(prev => ({ ...prev, attitude: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 resize-none transition-colors"
                    placeholder="태도 관련 피드백을 작성하세요..."
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={resetAndClose}
                    className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setStep('preview')}
                    className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    미리보기
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: 미리보기 */}
            {step === 'preview' && (
              <div className="overflow-y-auto flex-1">
                <div className="p-4">
                  <GrowthReportPreview data={reportData} />
                </div>
                <div className="sticky bottom-0 p-4 bg-gray-900 border-t border-gray-800 flex gap-3">
                  <button
                    onClick={() => setStep('input')}
                    disabled={loading}
                    className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium rounded-xl transition-colors"
                  >
                    수정하기
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={loading}
                    className="flex-1 py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        PDF 생성 중...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF 다운로드
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="px-4 pb-3">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: 완료 */}
            {step === 'result' && (
              <div className="p-8 text-center">
                {success ? (
                  <>
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-200 font-medium">PDF가 다운로드되었습니다!</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {studentName}님의 성장 리포트가 생성되었습니다.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="mt-4 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      닫기
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-200 font-medium">오류가 발생했습니다.</p>
                    <p className="text-xs text-red-400 mt-1">{error}</p>
                    <button
                      onClick={() => setStep('preview')}
                      className="mt-4 px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium rounded-xl transition-colors"
                    >
                      돌아가기
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
