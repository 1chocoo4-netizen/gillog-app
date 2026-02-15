'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import type { MetricScores } from '@/lib/b2b/types'
import type { AdminComments, GrowthReportData } from '@/lib/b2b/reportTypes'
import { GrowthReportPreview } from './GrowthReportPreview'

interface GrowthReportModalProps {
  open: boolean
  onClose: () => void
  userId: string
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

type Step = 'input' | 'preview'

export function GrowthReportModal({
  open, onClose, userId,
  studentName, email, institutionName, executionCount, milestone,
  currentScores, previousScores, overallScore, previousOverallScore, insights,
}: GrowthReportModalProps) {
  const [step, setStep] = useState<Step>('input')
  const [comments, setComments] = useState<AdminComments>({
    learning: '', relationship: '', attitude: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadDone, setDownloadDone] = useState(false)
  const [hintLoading, setHintLoading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const pdfRef = useRef<HTMLDivElement>(null)

  // 발송 관련
  const [showSendForm, setShowSendForm] = useState(false)
  const [sendEmail, setSendEmail] = useState('')
  const [sendPhone, setSendPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<'success' | 'error' | null>(null)

  function resetAndClose() {
    setStep('input')
    setComments({ learning: '', relationship: '', attitude: '' })
    setLoading(false)
    setError('')
    setDownloadDone(false)
    setHintLoading(false)
    setShowSendForm(false)
    setSendEmail('')
    setSendPhone('')
    setSending(false)
    setSendResult(null)
    onClose()
  }

  async function loadHints() {
    setHintLoading(true)
    try {
      const res = await fetch(`/api/b2b/comment-hints?userId=${userId}&milestone=${milestone}`)
      if (!res.ok) throw new Error('힌트를 불러올 수 없습니다.')
      const data = await res.json()
      setComments({
        learning: data.learning || '',
        relationship: data.relationship || '',
        attitude: data.attitude || '',
      })
    } catch {
      setError('힌트 불러오기에 실패했습니다.')
    } finally {
      setHintLoading(false)
    }
  }

  const reportData: GrowthReportData = {
    studentName,
    email,
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
      if (!pdfRef.current) throw new Error('PDF 렌더링 영역을 찾을 수 없습니다.')

      const sections = pdfRef.current.querySelectorAll<HTMLElement>('[data-pdf-page]')
      if (sections.length === 0) throw new Error('PDF 섹션을 찾을 수 없습니다.')

      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const margin = 10

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]

        // 실제 DOM 요소를 직접 캡처 (스타일 유지)
        const canvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
        })

        const imgData = canvas.toDataURL('image/png')
        const contentWidth = pdfWidth - margin * 2
        const imgHeight = (canvas.height * contentWidth) / canvas.width

        // 이미지가 페이지보다 크면 비율에 맞게 축소
        const maxHeight = pdfHeight - margin * 2
        let finalWidth = contentWidth
        let finalHeight = imgHeight
        if (imgHeight > maxHeight) {
          const ratio = maxHeight / imgHeight
          finalWidth = contentWidth * ratio
          finalHeight = maxHeight
        }

        // 수평 중앙 정렬
        const xOffset = (pdfWidth - finalWidth) / 2

        if (i > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', xOffset, margin, finalWidth, finalHeight)
      }

      pdf.save(`성장리포트_${studentName}_${new Date().toISOString().slice(0, 10)}.pdf`)
      setDownloadDone(true)
    } catch (err) {
      console.error('PDF generation error:', err)
      setError(err instanceof Error ? err.message : 'PDF 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSend() {
    if (!sendEmail.trim() && !sendPhone.trim()) return
    setSending(true)
    setSendResult(null)
    try {
      // TODO: 실제 발송 API 연결
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSendResult('success')
    } catch {
      setSendResult('error')
    } finally {
      setSending(false)
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
            onClick={() => !loading && !sending && resetAndClose()}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              step === 'preview' ? 'w-full max-w-5xl max-h-[90vh]' : 'w-full max-w-2xl max-h-[90vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 스텝 표시 + 닫기 */}
            <div className="px-5 py-3 border-b border-gray-800 flex items-center gap-3">
              {(['input', 'preview'] as Step[]).map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s ? 'bg-indigo-500 text-white' :
                    (['input', 'preview'].indexOf(step) > i) ? 'bg-indigo-500/30 text-indigo-300' :
                    'bg-gray-700 text-gray-500'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs ${step === s ? 'text-gray-200' : 'text-gray-500'}`}>
                    {s === 'input' ? '입력' : '미리보기 / 발송'}
                  </span>
                  {i < 1 && <span className="text-gray-700 text-xs">→</span>}
                </div>
              ))}
              <div className="flex-1" />
              <button
                onClick={resetAndClose}
                disabled={loading || sending}
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
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-200 mb-1">
                      {studentName}님의 성장 리포트
                    </h3>
                    <p className="text-xs text-gray-500">PDF로 다운로드하거나 이메일/문자로 발송할 수 있습니다.</p>
                  </div>
                  <button
                    onClick={loadHints}
                    disabled={hintLoading}
                    className="shrink-0 px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 disabled:bg-gray-800 text-amber-300 disabled:text-gray-500 text-xs font-medium rounded-lg transition-colors border border-amber-500/20 flex items-center gap-1.5"
                  >
                    {hintLoading ? (
                      <>
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        불러오는 중...
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        힌트 불러오기
                      </>
                    )}
                  </button>
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

            {/* Step 2: 미리보기(왼) + 발송(오) */}
            {step === 'preview' && (
              <>
              {/* PDF 캡처 전용 숨겨진 영역 (680px 고정폭, overflow 없음) */}
              <div
                ref={pdfRef}
                style={{ position: 'fixed', left: '-9999px', top: 0, width: '680px', background: '#ffffff', zIndex: -1 }}
              >
                <GrowthReportPreview data={reportData} />
              </div>

              <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                {/* 왼쪽: 미리보기 */}
                <div className="md:w-3/5 overflow-y-auto border-r border-gray-800 p-4">
                  <div ref={previewRef}>
                    <GrowthReportPreview data={reportData} />
                  </div>
                </div>

                {/* 오른쪽: 다운로드 + 발송 */}
                <div className="md:w-2/5 p-5 flex flex-col gap-4 overflow-y-auto">
                  {/* 수정 버튼 */}
                  <button
                    onClick={() => setStep('input')}
                    disabled={loading || sending}
                    className="text-xs text-gray-400 hover:text-gray-200 transition-colors self-start"
                  >
                    ← 코멘트 수정하기
                  </button>

                  {/* PDF 다운로드 */}
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      PDF 다운로드
                    </h4>
                    <button
                      onClick={handleDownloadPdf}
                      disabled={loading}
                      className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          PDF 생성 중...
                        </>
                      ) : downloadDone ? (
                        <>
                          <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          다운로드 완료
                        </>
                      ) : (
                        'PDF 다운로드'
                      )}
                    </button>
                    {error && <p className="text-xs text-red-400">{error}</p>}
                  </div>

                  {/* 발송하기 */}
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
                    <h4 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                      <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      발송하기
                    </h4>

                    {!showSendForm ? (
                      <button
                        onClick={() => setShowSendForm(true)}
                        className="w-full py-2.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 text-sm font-bold rounded-xl transition-colors border border-violet-500/30"
                      >
                        이메일 / 문자 발송
                      </button>
                    ) : sendResult === 'success' ? (
                      <div className="text-center py-3">
                        <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-sm text-emerald-300 font-medium">발송 완료</p>
                        <button
                          onClick={() => { setSendResult(null); setShowSendForm(false) }}
                          className="text-xs text-gray-400 mt-2 hover:text-gray-200"
                        >
                          닫기
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">이메일 주소</label>
                          <input
                            type="email"
                            value={sendEmail}
                            onChange={(e) => setSendEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 block mb-1">핸드폰 번호</label>
                          <input
                            type="tel"
                            value={sendPhone}
                            onChange={(e) => setSendPhone(e.target.value)}
                            placeholder="010-0000-0000"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                          />
                        </div>
                        {sendResult === 'error' && (
                          <p className="text-xs text-red-400">발송에 실패했습니다. 다시 시도해주세요.</p>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setShowSendForm(false); setSendResult(null) }}
                            disabled={sending}
                            className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-medium rounded-lg transition-colors"
                          >
                            취소
                          </button>
                          <button
                            onClick={handleSend}
                            disabled={sending || (!sendEmail.trim() && !sendPhone.trim())}
                            className="flex-1 py-2 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-700 disabled:text-gray-500 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            {sending ? '발송 중...' : '발송하기'}
                          </button>
                        </div>
                        <p className="text-[10px] text-gray-600">발송 기능은 추후 연결 예정입니다.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
