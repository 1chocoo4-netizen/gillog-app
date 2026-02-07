'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { AuthGuard } from '@/components/AuthGuard'
import { LevelBadge } from '@/components/LevelBadge'
import { getUserEnergy, addUserEnergy, getUserProgressKey } from '@/lib/auth'
import { getLessonData, LessonStep } from '@/lib/teaching/lessonContent'

function LessonContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as string
  const lessonId = params.lessonId as string

  // lessonId 형식: humanities-ch1 → subjectKey: humanities, chapterNumber: 1
  const [subjectKey, chapterPart] = lessonId.split('-ch')
  const chapterNumber = parseInt(chapterPart) || 1

  const [energy, setEnergy] = useState(50)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [actionText, setActionText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showCharacter, setShowCharacter] = useState(false)

  const lessonData = getLessonData(subjectKey, chapterNumber)

  useEffect(() => {
    setEnergy(getUserEnergy())
    // 캐릭터 등장 애니메이션
    setTimeout(() => setShowCharacter(true), 300)
  }, [])

  if (!lessonData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white">레슨을 찾을 수 없습니다.</p>
      </div>
    )
  }

  const step = lessonData.steps[currentStep]
  const progress = ((currentStep + 1) / lessonData.steps.length) * 100

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return
    setSelectedOption(index)
  }

  const handleConfirm = () => {
    if (step.type === 'question' && step.correctIndex !== undefined) {
      const correct = selectedOption === step.correctIndex
      setIsCorrect(correct)
      setShowExplanation(true)
    } else if (step.type === 'message') {
      goToNextStep()
    }
  }

  const handleContinue = () => {
    setShowExplanation(false)
    setSelectedOption(null)
    setIsCorrect(null)
    goToNextStep()
  }

  const goToNextStep = () => {
    if (currentStep < lessonData.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // 레슨 완료
      setIsComplete(true)
    }
  }

  const handleActionSubmit = () => {
    if (!actionText.trim()) return

    // 사용자별 실행 항목 저장
    const execKey = getUserProgressKey('executions')
    if (!execKey) return

    const existingItems = localStorage.getItem(execKey)
    const items = existingItems ? JSON.parse(existingItems) : []

    const newItem = {
      id: `exec-${Date.now()}`,
      areaKey: 'cognition',
      subjectKey: subjectKey,
      lessonTitle: lessonData.title,
      text: actionText,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    items.push(newItem)
    localStorage.setItem(execKey, JSON.stringify(items))

    // 에너지 보상
    const newEnergy = addUserEnergy(5)
    setEnergy(newEnergy)

    // 완료 처리
    setIsComplete(true)
  }

  const handleComplete = () => {
    // 진행도 저장
    const progressKey = getUserProgressKey('lesson-progress')
    if (progressKey) {
      const existingProgress = localStorage.getItem(progressKey)
      const progress = existingProgress ? JSON.parse(existingProgress) : []

      const newProgress = {
        subjectKey,
        lessonId: lessonData.id,
        completedAt: new Date().toISOString(),
      }

      progress.push(newProgress)
      localStorage.setItem(progressKey, JSON.stringify(progress))
    }

    router.push('/checkin')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href={`/teaching/${worldKey}`} className="text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>

          {/* 진행 바 */}
          <div className="flex-1 mx-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: lessonData.characterColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
            <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-xs text-white/60">{energy}</span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="pt-20 pb-32 px-4 max-w-lg mx-auto">
        {!isComplete ? (
          <>
            {/* 캐릭터 */}
            <AnimatePresence>
              {showCharacter && (step.type === 'message' || step.type === 'question') && (
                <motion.div
                  initial={{ scale: 0, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: -50 }}
                  className="flex items-start gap-3 mb-6"
                >
                  {/* 캐릭터 아바타 */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                    style={{ backgroundColor: lessonData.characterColor }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    {lessonData.characterEmoji}
                  </motion.div>

                  <div>
                    <p className="text-white/60 text-xs mb-1">{lessonData.characterName}</p>
                    {step.character && (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-lg max-w-xs"
                      >
                        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                          {step.message}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 질문 카드 */}
            <AnimatePresence mode="wait">
              {step.type === 'question' && (
                <motion.div
                  key={`question-${currentStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4"
                >
                  {/* 질문 */}
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-5 mb-4">
                    <p className="text-white text-lg font-medium text-center">
                      {step.question}
                    </p>
                  </div>

                  {/* 선택지 */}
                  <div className="space-y-3">
                    {step.options?.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleOptionSelect(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedOption === index
                            ? showExplanation
                              ? isCorrect
                                ? 'border-green-500 bg-green-500/20'
                                : 'border-red-500 bg-red-500/20'
                              : 'border-violet-500 bg-violet-500/20'
                            : showExplanation && index === step.correctIndex
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              selectedOption === index
                                ? showExplanation
                                  ? isCorrect
                                    ? 'bg-green-500 text-white'
                                    : 'bg-red-500 text-white'
                                  : 'bg-violet-500 text-white'
                                : showExplanation && index === step.correctIndex
                                ? 'bg-green-500 text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {showExplanation && index === step.correctIndex ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              String.fromCharCode(65 + index)
                            )}
                          </div>
                          <span className="text-white">{option}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* 설명 카드 */}
                  <AnimatePresence>
                    {showExplanation && step.explanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <div
                          className={`p-4 rounded-xl ${
                            isCorrect ? 'bg-green-500/20' : 'bg-amber-500/20'
                          }`}
                        >
                          <p className="text-white text-sm whitespace-pre-line">
                            {step.explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* 실행 입력 */}
              {step.type === 'action' && (
                <motion.div
                  key="action"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <div className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-5 border border-violet-500/30">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-violet-400" />
                      <p className="text-violet-300 font-medium">실천하기</p>
                    </div>

                    <p className="text-white mb-4">{step.question}</p>

                    <textarea
                      value={actionText}
                      onChange={(e) => setActionText(e.target.value)}
                      placeholder={step.placeholder}
                      className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      rows={3}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* 완료 화면 */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh]"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6"
              style={{ backgroundColor: lessonData.characterColor }}
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-2">챕터 완료!</h2>
            <p className="text-white/60 text-center mb-6">
              "{lessonData.title}"를 학습했어요
            </p>

            <div className="flex items-center gap-2 bg-yellow-500/20 rounded-full px-4 py-2 mb-8">
              <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
              <span className="text-yellow-300 font-bold">+5 에너지</span>
            </div>

            {actionText && (
              <div className="bg-white/10 rounded-xl p-4 mb-6 w-full max-w-sm">
                <p className="text-white/60 text-xs mb-1">오늘의 실천</p>
                <p className="text-white">{actionText}</p>
              </div>
            )}

            <button
              onClick={handleComplete}
              className="w-full max-w-sm py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg"
            >
              실행 관리로 가기
            </button>
          </motion.div>
        )}
      </div>

      {/* 하단 버튼 */}
      {!isComplete && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-4">
          <div className="max-w-lg mx-auto">
            {step.type === 'message' && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg"
                style={{ backgroundColor: lessonData.characterColor }}
              >
                계속
              </motion.button>
            )}

            {step.type === 'question' && !showExplanation && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg disabled:opacity-50"
                style={{ backgroundColor: lessonData.characterColor }}
              >
                확인
              </motion.button>
            )}

            {step.type === 'question' && showExplanation && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg"
                style={{ backgroundColor: isCorrect ? '#22C55E' : lessonData.characterColor }}
              >
                계속
              </motion.button>
            )}

            {step.type === 'action' && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleActionSubmit}
                disabled={!actionText.trim()}
                className="w-full py-4 rounded-xl font-bold text-white shadow-lg disabled:opacity-50"
                style={{ backgroundColor: lessonData.characterColor }}
              >
                완료하기
              </motion.button>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default function LessonPage() {
  return (
    <AuthGuard>
      <LessonContent />
    </AuthGuard>
  )
}
