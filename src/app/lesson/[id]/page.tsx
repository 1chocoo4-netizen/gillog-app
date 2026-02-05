'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2, Zap } from 'lucide-react'
import Link from 'next/link'
import { QuestionInput } from '@/components/lesson/QuestionInput'
import { RewardAnimation } from '@/components/lesson/RewardAnimation'
import { StepProgress, ProgressBar } from '@/components/ui/ProgressBar'
import { AvatarCoach } from '@/components/lesson/AvatarCoach'

const TEST_USER_ID = 'cf6c1304a8ab9217fbd59aa1e'

interface Question {
  id: string
  prompt: string
  type: 'text' | 'choice' | 'scale'
  optionsJson: string | null
  order: number
}

interface Coach {
  id: string
  name: string
  tagline: string
  avatarSeed: string
}

interface LessonNode {
  id: string
  title: string
  subtitle: string | null
  xpReward: number
  worldId: string
}

interface World {
  id: string
  key: string
  title: string
  colorHex: string
  icon: string
}

// ICF/KCA 기반 코칭 피드백 생성
function generateCoachingResponse(
  userAnswer: string,
  previousAnswers: string[],
  questionContext: string
): string {
  const answerLength = userAnswer.length
  const keywords = extractKeywords(userAnswer)

  // 짧은 답변 (20자 미만) - 더 쉬운 질문으로
  if (answerLength < 20) {
    const shortResponses = [
      `${keywords[0] || '그것'}에 대해 조금 더 이야기해줄 수 있어?`,
      `음, 그렇구나. 그때 어떤 기분이 들었어?`,
      `${keywords[0] || '그 순간'}이 떠오르는구나. 왜 그런 것 같아?`,
    ]
    return shortResponses[Math.floor(Math.random() * shortResponses.length)]
  }

  // 중간 길이 답변 (20-80자)
  if (answerLength < 80) {
    const midResponses = [
      `${keywords[0] || '그것'}이 중요했구나. 그래서 어떻게 했어?`,
      `그 마음이 느껴져. 그때 무슨 생각이 들었어?`,
      `${keywords[0] || '그 경험'}을 통해 뭘 알게 됐어?`,
      `그렇구나. 지금은 어떻게 느껴져?`,
    ]
    return midResponses[Math.floor(Math.random() * midResponses.length)]
  }

  // 긴 답변 (80자 이상) - 깊게 파고들기
  const deepResponses = [
    `${keywords[0] || '그것'}이 네게 정말 의미 있었구나. 그중에서 가장 기억에 남는 건 뭐야?`,
    `많이 생각해봤구나. 그래서 앞으로는 어떻게 하고 싶어?`,
    `솔직하게 나눠줘서 고마워. 그 경험이 너를 어떻게 바꿨어?`,
  ]
  return deepResponses[Math.floor(Math.random() * deepResponses.length)]
}

// 사용자 답변에서 키워드 추출
function extractKeywords(text: string): string[] {
  const words = text.split(/[\s,\.!?]+/).filter(w => w.length > 1)
  // 의미있는 단어 우선
  const meaningfulWords = words.filter(w =>
    !['그래서', '그런데', '하지만', '그리고', '나는', '저는', '것', '거', '수'].includes(w)
  )
  return meaningfulWords.slice(0, 3)
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [lessonNode, setLessonNode] = useState<LessonNode | null>(null)
  const [coach, setCoach] = useState<Coach | null>(null)
  const [world, setWorld] = useState<World | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [coachMessage, setCoachMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [previousAnswers, setPreviousAnswers] = useState<string[]>([])
  const [rewards, setRewards] = useState<{
    xp: number
    totalXp: number
    leveledUp: boolean
    newLevel: number
  } | null>(null)
  const [energy] = useState(48)

  const lessonId = params.id as string

  // 레슨 시작
  useEffect(() => {
    async function startLesson() {
      try {
        setLoading(true)

        const response = await fetch('/api/lesson/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonNodeId: lessonId,
            userId: TEST_USER_ID
          })
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || '레슨을 시작할 수 없습니다')
        }

        const data = await response.json()
        setSessionId(data.session.id)
        setLessonNode(data.lessonNode)
        setCoach(data.coach)
        setWorld(data.world)
        setQuestions(data.questions)

        // 코치 인사 + 첫 질문 (한 번에)
        setTimeout(() => {
          if (data.questions.length > 0) {
            setCoachMessage(data.questions[0].prompt)
          }
          setLoading(false)
        }, 500)

      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다')
        setLoading(false)
      }
    }

    startLesson()
  }, [lessonId])

  // 답변 제출
  const handleAnswer = async (answer: string) => {
    if (!sessionId || currentQuestionIndex >= questions.length) return

    const currentQuestion = questions[currentQuestionIndex]
    setPreviousAnswers(prev => [...prev, answer])
    setIsTyping(true)

    try {
      await fetch('/api/lesson/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          questionId: currentQuestion.id,
          userId: TEST_USER_ID,
          answer
        })
      })

      const nextIndex = currentQuestionIndex + 1

      // 코칭 피드백 생성 후 다음 질문
      setTimeout(() => {
        if (nextIndex < questions.length) {
          // ICF 코칭 원칙에 따른 피드백 + 다음 질문
          const feedback = generateCoachingResponse(answer, previousAnswers, currentQuestion.prompt)
          setCoachMessage(feedback)

          // 피드백 후 다음 질문으로
          setTimeout(() => {
            setCoachMessage(questions[nextIndex].prompt)
            setCurrentQuestionIndex(nextIndex)
            setIsTyping(false)
          }, 2500)
        } else {
          // 레슨 완료
          setCoachMessage('오늘 솔직하게 나눠줘서 고마워. 네 이야기가 소중해.')
          setTimeout(() => {
            completeLesson()
          }, 2000)
        }
      }, 1000)

    } catch (err) {
      setIsTyping(false)
      console.error('Answer error:', err)
    }
  }

  // 레슨 완료
  const completeLesson = async () => {
    if (!sessionId) return

    try {
      const response = await fetch('/api/lesson/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          userId: TEST_USER_ID
        })
      })

      if (response.ok) {
        const data = await response.json()
        setRewards(data.rewards)
        setIsCompleted(true)
      }
    } catch (err) {
      console.error('Complete error:', err)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  const currentOptions = currentQuestion?.optionsJson
    ? JSON.parse(currentQuestion.optionsJson)
    : []

  if (loading) {
    return (
      <div className="gl-screen bg-[var(--gl-bg)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--gl-primary)] mx-auto mb-4" />
          <p className="text-[var(--gl-text-muted)]">레슨을 준비하고 있어요...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="gl-screen bg-[var(--gl-bg)] flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-[var(--gl-danger)] mb-4">{error}</p>
          <Link href="/app" className="text-[var(--gl-primary)] underline">
            돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="gl-screen bg-[var(--gl-bg)] flex flex-col">
      {/* 상단 번개 게이지 */}
      <div className="sticky top-0 z-30 bg-[var(--gl-bg-card)] border-b border-[var(--gl-border)] px-4 py-2">
        <div className="gl-container flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--gl-primary)] flex items-center justify-center">
            <span className="text-white font-bold text-xs">Lv.1</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 text-sm font-medium text-[var(--gl-text)]">
              <Zap className="w-4 h-4 text-[var(--gl-accent)]" />
              <span>{energy} / 100</span>
            </div>
            <ProgressBar
              value={energy}
              max={100}
              size="sm"
              animated={false}
            />
          </div>
        </div>
      </div>

      {/* 레슨 헤더 */}
      <header
        className="sticky top-[52px] z-20 px-4 py-3 border-b"
        style={{
          backgroundColor: world?.colorHex || 'var(--gl-primary)',
          borderColor: 'transparent'
        }}
      >
        <div className="gl-container">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/app" className="text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-white font-bold">{lessonNode?.title}</h1>
            </div>
            <span className="text-2xl">{world?.icon || '📚'}</span>
          </div>

          <StepProgress
            current={currentQuestionIndex + 1}
            total={questions.length}
            activeColor="white"
          />
        </div>
      </header>

      {/* 콘텐츠 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="gl-container">
          {/* AI 아바타 코치 */}
          <AvatarCoach
            coachName={coach?.name || '코치'}
            isListening={!isTyping && !isCompleted}
            isSpeaking={isTyping}
          />

          {/* 코치 말풍선 - 하나만 표시 */}
          <AnimatePresence mode="wait">
            {coachMessage && (
              <motion.div
                key={coachMessage}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div
                  className="relative bg-white rounded-2xl p-5 shadow-lg border border-[var(--gl-border)] max-w-[90%] mx-auto"
                >
                  {/* 말풍선 꼬리 */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-[var(--gl-border)] rotate-45" />

                  <p className="text-[var(--gl-text)] text-center text-lg leading-relaxed">
                    {coachMessage}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 입력 영역 */}
      {!isCompleted && currentQuestion && (
        <div className="sticky bottom-0 bg-[var(--gl-bg)] border-t border-[var(--gl-border)] px-4 py-4">
          <div className="gl-container">
            <QuestionInput
              type={currentQuestion.type as 'text' | 'choice' | 'scale'}
              options={currentOptions}
              worldColor={world?.colorHex}
              onSubmit={handleAnswer}
              disabled={isTyping}
            />
          </div>
        </div>
      )}

      {/* 보상 애니메이션 */}
      {rewards && (
        <RewardAnimation
          isVisible={isCompleted}
          xpEarned={rewards.xp}
          totalXp={rewards.totalXp}
          leveledUp={rewards.leveledUp}
          newLevel={rewards.newLevel}
          worldColor={world?.colorHex}
          onComplete={() => router.push('/app')}
        />
      )}
    </main>
  )
}
