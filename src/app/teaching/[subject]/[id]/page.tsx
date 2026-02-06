'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ArrowLeft, ChevronRight, Sparkles, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge, updateLevelProgress } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { getContentById } from '@/lib/teaching/content'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy, setUserEnergy, addUserEnergy, useUserEnergy, getUserProgressKey } from '@/lib/auth'

type Step = 'concept' | 'question' | 'mission' | 'complete' | 'coaching'

function ContentPageContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as WorldKey
  const contentId = params.id as string

  const [energy, setEnergy] = useState(50)
  const [step, setStep] = useState<Step>('concept')
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showReward, setShowReward] = useState(false)

  const content = getContentById(contentId)

  // 월드 설정과 챕터 정보 가져오기
  const worldConfig = WORLD_CONFIGS[worldKey]
  const chapter = worldConfig?.chapters.find(c => c.key === content?.chapterKey)

  useEffect(() => {
    setEnergy(getUserEnergy())
  }, [])

  if (!content || !worldConfig || !chapter) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">콘텐츠를 찾을 수 없습니다</div>
  }

  const handleNext = () => {
    if (step === 'concept') {
      setStep('question')
    } else if (step === 'question') {
      setStep('mission')
    } else if (step === 'mission') {
      // 완료 처리
      handleComplete()
    }
  }

  const handleComplete = () => {
    // 진행도 저장 (사용자별)
    const progressKey = getUserProgressKey('teaching-progress')
    if (progressKey) {
      const savedProgress = localStorage.getItem(progressKey)
      const progress = savedProgress ? JSON.parse(savedProgress) : []
      const existing = progress.findIndex((p: { contentId: string }) => p.contentId === contentId)
      if (existing >= 0) {
        progress[existing].completed = true
        progress[existing].completedAt = new Date().toISOString()
      } else {
        progress.push({
          contentId,
          completed: true,
          completedAt: new Date().toISOString()
        })
      }
      localStorage.setItem(progressKey, JSON.stringify(progress))
    }

    // 에너지 보상 (사용자별)
    const newEnergy = addUserEnergy(content.energyReward)
    setEnergy(newEnergy)

    // 레벨 진행도 업데이트
    updateLevelProgress(worldKey, 1)

    // 실행 미션을 실행 관리에 추가 (사용자별)
    const execKey = getUserProgressKey('executions')
    if (execKey) {
      const savedExecutions = localStorage.getItem(execKey)
      const executions = savedExecutions ? JSON.parse(savedExecutions) : []
      executions.push({
        id: `exec-${Date.now()}`,
        areaKey: worldKey,
        text: content.actionMission,
        completed: false,
        createdAt: new Date().toISOString()
      })
      localStorage.setItem(execKey, JSON.stringify(executions))
    }

    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
      setStep('complete')
    }, 1500)
  }

  const handleGoToCoaching = () => {
    // 코칭으로 이동 (사용자별 에너지 사용)
    if (useUserEnergy(2)) {
      setEnergy(getUserEnergy())
      router.push('/lesson/cognition-1')
    }
  }

  const handleFinish = () => {
    router.push(`/teaching/${worldKey}`)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href={`/teaching/${worldKey}`} className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">나가기</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{chapter.icon}</span>
            <span className="text-white font-medium text-sm">{chapter.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>

        {/* 진행 바 */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            {['concept', 'question', 'mission'].map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full ${
                  ['concept', 'question', 'mission'].indexOf(step) >= i
                    ? `bg-gradient-to-r ${chapter.color}`
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 pt-28 pb-32 px-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* STEP 1: 핵심 원리 */}
          {step === 'concept' && (
            <motion.div
              key="concept"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${chapter.gradient} text-white/80 border border-white/10`}>
                  STEP 1 · 핵심 원리
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white text-center mb-8">
                {content.conceptTitle}
              </h2>

              <div className={`bg-gradient-to-br ${chapter.gradient} border border-white/10 rounded-2xl p-6`}>
                <p className="text-white text-lg leading-relaxed whitespace-pre-line">
                  {content.conceptContent}
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: 사고 질문 */}
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${chapter.gradient} text-white/80 border border-white/10`}>
                  STEP 2 · 생각해보기
                </span>
              </div>

              <div className={`bg-gradient-to-br ${chapter.gradient} border border-white/10 rounded-2xl p-6 mb-6`}>
                <p className="text-white text-xl font-medium text-center">
                  {content.thinkingQuestion}
                </p>
              </div>

              <textarea
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="여기에 생각을 적어보세요..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />

              <p className="text-white/40 text-xs text-center mt-3">
                생각을 정리하면 더 잘 기억돼요
              </p>
            </motion.div>
          )}

          {/* STEP 3: 실행 미션 */}
          {step === 'mission' && (
            <motion.div
              key="mission"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-lg mx-auto"
            >
              <div className="text-center mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${chapter.gradient} text-white/80 border border-white/10`}>
                  STEP 3 · 오늘의 미션
                </span>
              </div>

              <div className="text-center mb-8">
                <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  실행 미션이 생성됐어요!
                </h3>
                <p className="text-white/50 text-sm">
                  실행 관리에서 완료하면 보상을 받아요
                </p>
              </div>

              <div className={`bg-gradient-to-br ${chapter.gradient} border border-white/20 rounded-2xl p-6`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chapter.color} flex items-center justify-center flex-shrink-0`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg">
                      {content.actionMission}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-white/50 text-sm flex items-center gap-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        완료 시 +5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 완료 화면 */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${chapter.color} flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/30`}
              >
                <span className="text-5xl">🎉</span>
              </motion.div>

              <h2 className="text-2xl font-bold text-white mb-2">학습 완료!</h2>
              <p className="text-white/50 mb-8">
                {content.conceptTitle}을(를) 배웠어요
              </p>

              {/* 보상 표시 */}
              <div className="flex justify-center gap-4 mb-8">
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  <span className="text-white font-bold">+{content.energyReward}</span>
                </div>
                <div className="bg-violet-500/20 border border-violet-500/30 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-violet-400 font-bold">+{content.xpReward} XP</span>
                </div>
              </div>

              {/* 코칭 연결 */}
              <div className={`bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-6 mb-4`}>
                <p className="text-white/80 mb-2">방금 배운 방법을 바로 써보려는 게 정말 좋아.</p>
                <p className="text-white/60 text-sm mb-4">{content.conceptTitle}을(를) 이해한 것 같아.</p>
                <p className="text-white font-medium">이 방법을 오늘 어디에 먼저 써볼 수 있을까?</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoToCoaching}
                  disabled={energy < 2}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <MessageCircle className="w-5 h-5" />
                  코칭으로 실천하기
                  <span className="text-white/70 text-sm flex items-center gap-1 ml-2">
                    <Zap className="w-3 h-3" />2
                  </span>
                </button>

                <button
                  onClick={handleFinish}
                  className="w-full py-3 rounded-xl bg-white/10 text-white/70 font-medium"
                >
                  다음에 하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 하단 버튼 */}
      {step !== 'complete' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-4">
          <button
            onClick={handleNext}
            disabled={step === 'question' && !selectedAnswer.trim()}
            className={`w-full py-4 rounded-xl bg-gradient-to-r ${chapter.color} text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 max-w-lg mx-auto`}
          >
            {step === 'mission' ? '미션 받고 완료하기' : '다음'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl px-12 py-8 text-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              </motion.div>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-yellow-400" fill="currentColor" />
                <span className="text-4xl font-bold text-white">+{content.energyReward}</span>
              </div>
              <p className="text-white/80">학습 완료!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function ContentPage() {
  return (
    <AuthGuard>
      <ContentPageContent />
    </AuthGuard>
  )
}
