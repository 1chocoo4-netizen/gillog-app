'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Zap } from 'lucide-react'
import Link from 'next/link'
import { ChatBubble } from '@/components/lesson/ChatBubble'
import { QuestionInput } from '@/components/lesson/QuestionInput'
import { RewardAnimation } from '@/components/lesson/RewardAnimation'
import { StepProgress, ProgressBar } from '@/components/ui/ProgressBar'
import { AvatarCoach } from '@/components/lesson/AvatarCoach'

// 테스트용 사용자 ID (나중에 인증으로 대체)
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

interface ChatMessage {
  id: string
  text: string
  isCoach: boolean
  questionId?: string
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const chatEndRef = useRef<HTMLDivElement>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [lessonNode, setLessonNode] = useState<LessonNode | null>(null)
  const [coach, setCoach] = useState<Coach | null>(null)
  const [world, setWorld] = useState<World | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [rewards, setRewards] = useState<{
    xp: number
    totalXp: number
    leveledUp: boolean
    newLevel: number
  } | null>(null)
  const [energy] = useState(48) // 레슨 시작 시 번개 2개 소모됨 (50 - 2 = 48)

  const lessonId = params.id as string

  // 레슨 시작
  useEffect(() => {
    async function startLesson() {
      try {
        setLoading(true)

        // lessonId가 "1"처럼 단순 숫자면 첫 번째 레슨 노드 가져오기
        // 실제 ID면 그대로 사용
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

        // 코치 인사 메시지 추가
        setTimeout(() => {
          setMessages([
            {
              id: 'greeting',
              text: `안녕! 나는 ${data.coach.name}야. ${data.coach.tagline}`,
              isCoach: true
            }
          ])

          // 첫 질문 추가
          setTimeout(() => {
            if (data.questions.length > 0) {
              setMessages(prev => [...prev, {
                id: `q-${data.questions[0].id}`,
                text: data.questions[0].prompt,
                isCoach: true,
                questionId: data.questions[0].id
              }])
            }
            setLoading(false)
          }, 800)
        }, 500)

      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다')
        setLoading(false)
      }
    }

    startLesson()
  }, [lessonId])

  // 스크롤 to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // 답변 제출
  const handleAnswer = async (answer: string) => {
    if (!sessionId || currentQuestionIndex >= questions.length) return

    const currentQuestion = questions[currentQuestionIndex]

    // 사용자 답변 추가
    setMessages(prev => [...prev, {
      id: `a-${currentQuestion.id}`,
      text: answer,
      isCoach: false
    }])

    setIsTyping(true)

    try {
      // 답변 저장
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

      // 다음 질문 또는 완료
      const nextIndex = currentQuestionIndex + 1

      setTimeout(() => {
        setIsTyping(false)

        if (nextIndex < questions.length) {
          // 코치 피드백 + 다음 질문
          const feedback = getCoachFeedback(answer)
          setMessages(prev => [...prev, {
            id: `fb-${currentQuestion.id}`,
            text: feedback,
            isCoach: true
          }])

          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: `q-${questions[nextIndex].id}`,
              text: questions[nextIndex].prompt,
              isCoach: true,
              questionId: questions[nextIndex].id
            }])
            setCurrentQuestionIndex(nextIndex)
          }, 1000)
        } else {
          // 레슨 완료
          completeLesson()
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

    setMessages(prev => [...prev, {
      id: 'complete',
      text: '정말 잘했어! 오늘 네가 나눈 이야기들이 소중한 성장의 씨앗이 될 거야.',
      isCoach: true
    }])

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
        setTimeout(() => {
          setRewards(data.rewards)
          setIsCompleted(true)
        }, 1500)
      }
    } catch (err) {
      console.error('Complete error:', err)
    }
  }

  // 코치 피드백 생성 (간단 버전)
  const getCoachFeedback = (answer: string): string => {
    const feedbacks = [
      '그렇구나, 솔직하게 이야기해줘서 고마워.',
      '좋은 생각이야! 계속 이야기해볼까?',
      '네 마음을 잘 표현했어.',
      '흥미로운 생각이네! 더 알려줄래?',
      '정말 잘하고 있어. 다음 질문도 해볼게.'
    ]
    return feedbacks[Math.floor(Math.random() * feedbacks.length)]
  }

  // 현재 질문
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

          {/* 진행률 */}
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
            isListening={!isTyping && !isCompleted && currentQuestionIndex < questions.length}
            isSpeaking={isTyping}
          />

          {/* 코치 말풍선 */}
          {messages.length > 0 && (
            <div className="mt-6 space-y-3">
              {messages.slice(-2).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-2xl max-w-[85%] ${
                    msg.isCoach
                      ? 'bg-[var(--gl-bg-card)] border border-[var(--gl-border)] mr-auto'
                      : 'bg-[var(--gl-primary)] text-white ml-auto'
                  }`}
                >
                  <p className={msg.isCoach ? 'text-[var(--gl-text)]' : 'text-white'}>
                    {msg.text}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          <div ref={chatEndRef} />
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
