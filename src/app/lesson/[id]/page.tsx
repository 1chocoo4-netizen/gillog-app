'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { LevelBadge } from '@/components/LevelBadge'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

type CoachingState = 'STATE' | 'GOAL' | 'PLAN' | 'WRAP'

interface Message {
  role: 'user' | 'coach'
  content: string
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = useRef(`session-${params.id}-${Date.now()}`).current

  const [animationData, setAnimationData] = useState<object | null>(null)
  const [phase, setPhase] = useState<'score' | 'chat' | 'complete'>('score')
  const [selectedScore, setSelectedScore] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [coachState, setCoachState] = useState<CoachingState>('STATE')
  const [energy, setEnergy] = useState(50)
  const [planText, setPlanText] = useState<string>('')  // 실행 계획 저장

  // localStorage에서 에너지 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('gillog-energy')
    if (saved) {
      setEnergy(parseInt(saved, 10))
    }
  }, [])

  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 초기 메시지
  const initialMessage = "안녕! 여기서는 인지 학습 코칭을 시작할 거야.\n인지 능력은 생각하고, 이해하고, 기억하고, 문제를 해결하는 힘이야.\n먼저, 스스로 생각했을 때 인지 능력과 학습 능력이 10점 만점에 몇 점 정도라고 느껴?"

  // Lottie 로드
  useEffect(() => {
    fetch('/lottie/Talking Character.json')
      .then(res => res.json())
      .then(setAnimationData)
      .catch(console.error)
  }, [])

  // 스크롤 자동 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // API 호출 함수
  async function callAPI(msg: string, isFirst: boolean) {
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: msg,
          worldKey: 'cognition',
          worldLabel: '인지',
          isFirstTurn: isFirst
        })
      })

      const data = await res.json()

      // 메시지 추가
      setMessages(prev => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'coach', content: data.text }
      ])

      if (data.state) setCoachState(data.state)

      // PLAN 상태에서 사용자가 입력한 행동 계획 저장
      if (data.state === 'PLAN' || coachState === 'PLAN') {
        if (msg.length > 5) {  // 의미있는 길이의 메시지만
          setPlanText(msg)
        }
      }

      // 코치의 마무리 메시지가 나왔을 때만 완료 처리
      const coachText = data.text || ''
      const isWrapMessage =
        coachText.includes('여기까지') ||
        coachText.includes('마무리') ||
        coachText.includes('수고했어') ||
        coachText.includes('화이팅') ||
        coachText.includes('응원할게') ||
        coachText.includes('다음에 또') ||
        coachText.includes('오늘 고마워') ||
        coachText.includes('잘 했어') ||
        data.isComplete

      if (isWrapMessage) {
        setTimeout(() => {
          setPhase('complete')
        }, 3000)  // 마무리 메시지 읽을 시간 3초
      }

    } catch (err) {
      console.error('API Error:', err)
      setMessages(prev => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'coach', content: '잠시 문제가 생겼어. 다시 말해줄래?' }
      ])
    } finally {
      setLoading(false)
      // 응답 후 입력창에 포커스 유지
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 100)
    }
  }

  // 점수 확인 버튼
  function handleScoreConfirm() {
    if (!selectedScore || loading) return
    setPhase('chat')
    // 초기 메시지를 코치 메시지로 추가
    setMessages([{ role: 'coach', content: initialMessage }])
    callAPI(`${selectedScore}점`, true)
    // 채팅 화면 전환 후 입력창 포커스
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 300)
  }

  // 메시지 전송
  function handleSend() {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    callAPI(msg, false)
  }

  // 폼 제출
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleSend()
  }

  // 완료 처리
  function handleComplete() {
    const newEnergy = energy + 1
    setEnergy(newEnergy)
    localStorage.setItem('gillog-energy', String(newEnergy))

    // 실행 항목 저장 (planText가 있으면)
    if (planText) {
      const existingItems = localStorage.getItem('gillog-executions')
      const items = existingItems ? JSON.parse(existingItems) : []

      const newItem = {
        id: `exec-${Date.now()}`,
        areaKey: 'cognition',  // 현재는 인지 월드만
        text: planText,
        completed: false,
        createdAt: new Date().toISOString()
      }

      items.push(newItem)
      localStorage.setItem('gillog-executions', JSON.stringify(items))
    }

    router.push('/checkin')  // 실행 관리 페이지로 이동
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">나가기</span>
          </Link>
          <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full">
            {coachState === 'STATE' && '상태 탐색'}
            {coachState === 'GOAL' && '목표 설정'}
            {coachState === 'PLAN' && '실행 계획'}
            {coachState === 'WRAP' && '마무리'}
          </span>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 pt-16 pb-40 overflow-y-auto">
        {/* 캐릭터 (작게 상단에) */}
        <div className="flex justify-center py-4">
          <div className="w-24 h-24">
            {animationData && (
              <Lottie animationData={animationData} loop />
            )}
          </div>
        </div>

        {/* 대화 영역 */}
        <div className="px-4 space-y-3 max-w-lg mx-auto">
          {phase === 'score' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 shadow-lg"
            >
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {initialMessage}
              </p>
            </motion.div>
          )}

          {/* 대화 메시지들 */}
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-violet-500 text-white'
                      : 'bg-white text-slate-700 shadow-lg'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 로딩 표시 */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* 완료 카드 */}
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-violet-500/20 to-purple-600/20 rounded-2xl p-6 border border-violet-500/30"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" fill="currentColor" />
                <span className="text-2xl font-bold text-white">+1</span>
              </div>
              <p className="text-white/80 mb-4 text-center">번개 포인트를 획득했어요!</p>

              {/* 실행 내용 입력 */}
              <div className="mb-4">
                <p className="text-white/60 text-xs mb-2">오늘 실행할 내용을 정리해주세요</p>
                <textarea
                  value={planText}
                  onChange={(e) => setPlanText(e.target.value)}
                  placeholder="예: 10분 동안 집중해서 책 읽기"
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm"
                  rows={2}
                />
              </div>

              <button
                onClick={handleComplete}
                disabled={!planText.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold shadow-lg disabled:opacity-50"
              >
                실행 관리로 넘어가기
              </button>
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 하단 입력 */}
      {phase !== 'complete' && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-4">
          {phase === 'score' ? (
            /* 점수 선택 */
            <div className="max-w-sm mx-auto">
              <p className="text-white/60 text-xs text-center mb-3">점수를 선택해주세요</p>
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSelectedScore(n)}
                    className={`w-10 h-10 rounded-full font-bold text-sm ${
                      selectedScore === n
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {selectedScore && (
                <button
                  type="button"
                  onClick={handleScoreConfirm}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-violet-500 text-white font-bold disabled:opacity-50"
                >
                  {loading ? '생각 중...' : '확인'}
                </button>
              )}
            </div>
          ) : (
            /* 채팅 입력 */
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="메시지를 입력하세요..."
                  className="w-full bg-white/10 text-white placeholder-white/40 rounded-2xl px-4 py-3 pr-14 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  rows={1}
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 bottom-2 w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </main>
  )
}
