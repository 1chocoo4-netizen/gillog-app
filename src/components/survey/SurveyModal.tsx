'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import {
  SURVEY_AREAS,
  SURVEY_QUESTIONS,
  LIKERT_LABELS,
  getQuestionsByArea,
} from '@/lib/surveyQuestions'

interface SurveyScores {
  career: number
  community: number
  nonCognitive: number
  total: number
}

type Step = 'consent' | 'questions' | 'submitting' | 'result'

const QUESTIONS_PER_PAGE = 5

export function SurveyModal({
  onComplete,
  milestone,
}: {
  onComplete: () => void
  milestone: number
}) {
  const [step, setStep] = useState<Step>('consent')
  const [agreed, setAgreed] = useState(false)
  const [currentAreaIndex, setCurrentAreaIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [scores, setScores] = useState<SurveyScores | null>(null)

  const currentArea = SURVEY_AREAS[currentAreaIndex]
  const currentAreaQuestions = getQuestionsByArea(currentArea?.key ?? '')
  const totalPages = Math.ceil(currentAreaQuestions.length / QUESTIONS_PER_PAGE)
  const pageQuestions = currentAreaQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  )

  // 전체 진행도
  const totalAnswered = Object.keys(answers).length
  const totalQuestions = SURVEY_QUESTIONS.length
  const overallProgress = (totalAnswered / totalQuestions) * 100

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const canGoNext = pageQuestions.every(q => answers[q.id] !== undefined)

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1)
    } else if (currentAreaIndex < SURVEY_AREAS.length - 1) {
      setCurrentAreaIndex(prev => prev + 1)
      setCurrentPage(0)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1)
    } else if (currentAreaIndex > 0) {
      setCurrentAreaIndex(prev => prev - 1)
      const prevAreaQuestions = getQuestionsByArea(SURVEY_AREAS[currentAreaIndex - 1].key)
      setCurrentPage(Math.ceil(prevAreaQuestions.length / QUESTIONS_PER_PAGE) - 1)
    }
  }

  const handleSubmit = async () => {
    setStep('submitting')
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, milestone }),
      })
      const data = await res.json()
      if (data.success) {
        setScores(data.scores)
        setStep('result')
      } else {
        alert(data.error || '제출에 실패했습니다. 다시 시도해주세요.')
        setStep('questions')
      }
    } catch {
      alert('네트워크 오류가 발생했습니다.')
      setStep('questions')
    }
  }

  const isLastPage =
    currentAreaIndex === SURVEY_AREAS.length - 1 && currentPage === totalPages - 1

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* ========== 동의 화면 ========== */}
        {step === 'consent' && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                나의 성장 설문조사
              </h2>
              <p className="text-sm text-gray-500">
                {milestone}회 실행을 달성한 당신, 정말 대단해요!
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3 text-sm text-gray-600">
              <p>이 설문은 <strong>진로 탐색</strong>, <strong>공동체 의식</strong>, <strong>인성 역량</strong> 3개 영역의 자기 성찰 질문으로 구성되어 있어요.</p>
              <p>총 <strong>30문항</strong>이며, 약 5~10분 정도 소요됩니다.</p>
              <p>정답은 없어요. 지금 느끼는 그대로 솔직하게 답해주세요.</p>
              <p className="text-xs text-gray-400">
                응답은 암호화되어 안전하게 저장되며, 개인정보는 수집되지 않습니다.
              </p>
            </div>

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">
                위 안내를 읽었으며, 설문에 참여하는 것에 동의합니다.
              </span>
            </label>

            <button
              onClick={() => setStep('questions')}
              disabled={!agreed}
              className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              시작하기
            </button>
          </div>
        )}

        {/* ========== 문항 화면 ========== */}
        {step === 'questions' && currentArea && (
          <div className="p-6">
            {/* 헤더 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{currentArea.icon}</span>
                <h2 className="text-lg font-bold" style={{ color: currentArea.color }}>
                  {currentArea.label}
                </h2>
                <span className="text-xs text-gray-400 ml-auto">
                  {currentAreaIndex + 1} / {SURVEY_AREAS.length} 영역
                </span>
              </div>

              {/* 전체 진행 바 */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: currentArea.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 text-right">
                {totalAnswered} / {totalQuestions} 문항 완료
              </p>
            </div>

            {/* 문항 리스트 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentAreaIndex}-${currentPage}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {pageQuestions.map((q, idx) => {
                  const questionNumber =
                    currentAreaIndex * 10 + currentPage * QUESTIONS_PER_PAGE + idx + 1
                  return (
                    <div key={q.id} className="space-y-2">
                      <p className="text-sm font-medium text-gray-800">
                        <span className="text-gray-400 mr-1">Q{questionNumber}.</span>
                        {q.text}
                      </p>
                      <div className="flex gap-1.5">
                        {LIKERT_LABELS.map((label, i) => {
                          const value = i + 1
                          const isSelected = answers[q.id] === value
                          return (
                            <button
                              key={value}
                              onClick={() => handleAnswer(q.id, value)}
                              className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all border-2 ${
                                isSelected
                                  ? 'text-white border-transparent shadow-md scale-105'
                                  : 'text-gray-500 bg-gray-50 border-transparent hover:border-gray-200'
                              }`}
                              style={
                                isSelected
                                  ? { backgroundColor: currentArea.color }
                                  : undefined
                              }
                              title={label}
                            >
                              {value}
                            </button>
                          )
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-300 px-1">
                        <span>{LIKERT_LABELS[0]}</span>
                        <span>{LIKERT_LABELS[4]}</span>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {/* 네비게이션 버튼 */}
            <div className="flex justify-between mt-6 gap-3">
              <button
                onClick={handleBack}
                disabled={currentAreaIndex === 0 && currentPage === 0}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center gap-1 px-6 py-2.5 rounded-xl text-sm font-medium text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                style={
                  canGoNext
                    ? { backgroundColor: currentArea.color }
                    : undefined
                }
              >
                {isLastPage ? '제출하기' : '다음'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========== 제출 중 ========== */}
        {step === 'submitting' && (
          <div className="p-12 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full mx-auto mb-4"
            />
            <p className="text-gray-500 text-sm">응답을 저장하고 있어요...</p>
          </div>
        )}

        {/* ========== 결과 화면 ========== */}
        {step === 'result' && scores && (
          <div className="p-6">
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-3" />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">설문 완료!</h2>
              <p className="text-sm text-gray-500">나의 성장 현황을 확인해보세요</p>
            </div>

            {/* 총점 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 text-white text-center mb-6"
            >
              <p className="text-sm opacity-80 mb-1">종합 성장 점수</p>
              <p className="text-4xl font-bold">{scores.total}<span className="text-lg opacity-70">점</span></p>
            </motion.div>

            {/* 영역별 바 */}
            <div className="space-y-4 mb-6">
              {SURVEY_AREAS.map((area, i) => {
                const score = scores[area.key as keyof SurveyScores] as number
                return (
                  <motion.div
                    key={area.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {area.icon} {area.label}
                      </span>
                      <span
                        className="text-sm font-bold"
                        style={{ color: area.color }}
                      >
                        {score}점
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: area.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* 성장 격려 문구 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bg-amber-50 rounded-xl p-4 mb-6"
            >
              <p className="text-sm text-amber-800">
                {scores.total >= 80
                  ? '🌟 놀라운 성장을 보여주고 있어요! 지금처럼 꾸준히 나아가면 더 멋진 나를 만날 수 있을 거예요.'
                  : scores.total >= 60
                  ? '🌱 착실하게 성장하고 있어요! 아직 발전할 영역이 있다는 건 그만큼 가능성이 크다는 뜻이에요.'
                  : scores.total >= 40
                  ? '🌿 성장의 씨앗이 싹트고 있어요! 지금 이 순간 설문에 참여한 것 자체가 자기 성찰의 첫걸음이에요.'
                  : '🌻 모든 성장은 작은 한 걸음부터 시작해요. 당신이 여기 있다는 것 자체가 멋진 시작이에요!'}
              </p>
            </motion.div>

            <button
              onClick={onComplete}
              className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
            >
              확인
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
