'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, Star, X } from 'lucide-react'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'

// 월드별 코치 아바타
const COACH_AVATARS: Record<string, { avatar: string; style: string }> = {
  cognition: { avatar: '👩‍🎓', style: 'from-violet-500 to-purple-600' },
  selfDirected: { avatar: '🧑‍💼', style: 'from-cyan-500 to-blue-600' },
  habit: { avatar: '👩‍🔬', style: 'from-green-500 to-emerald-600' },
  character: { avatar: '👩‍🎨', style: 'from-orange-500 to-amber-600' },
  relationship: { avatar: '🧑‍🤝‍🧑', style: 'from-pink-500 to-rose-600' },
  career: { avatar: '👨‍🚀', style: 'from-indigo-500 to-blue-600' },
}

interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
}

type Phase = 'explore' | 'goal' | 'action' | 'done'

function CoachingChat() {
  const router = useRouter()
  const params = useParams()
  const worldKey = (params.worldKey as string) || 'cognition'
  const coach = COACH_AVATARS[worldKey] || COACH_AVATARS.cognition

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [phase, setPhase] = useState<Phase>('explore')
  const [phaseTurn, setPhaseTurn] = useState(0) // 현재 단계 내 턴 수
  const { energy, addEnergy, executions, saveExecutions, updateLevelProgress } = useUserData()

  // 투두 입력 모달
  const [showTodoModal, setShowTodoModal] = useState(false)
  const [todoText, setTodoText] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // 다양한 인사말
    const greetings = [
      '안녕~ 오늘 하루 어땠어?',
      '왔구나! 요즘 어때?',
      '반가워~ 오늘 기분은?',
      '안녕! 무슨 생각해?',
      '헤이~ 뭐하다 왔어?',
      '오 왔네! 오늘 뭐했어?',
    ]
    const greeting = greetings[Math.floor(Math.random() * greetings.length)]

    setTimeout(() => {
      addMessage('coach', greeting)
    }, 500)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function addMessage(role: 'user' | 'coach', content: string) {
    setMessages(prev => [...prev, {
      id: `${role}-${Date.now()}-${Math.random()}`,
      role,
      content,
    }])
  }

  function generateResponse(userMsg: string, currentPhase: Phase, currentPhaseTurn: number): string {
    const msg = userMsg.toLowerCase()
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

    // 키워드 추출
    const keywords = {
      study: msg.includes('공부') || msg.includes('시험') || msg.includes('학교') || msg.includes('수업'),
      tired: msg.includes('피곤') || msg.includes('힘들') || msg.includes('지쳐') || msg.includes('졸려'),
      stress: msg.includes('스트레스') || msg.includes('짜증') || msg.includes('화나') || msg.includes('싫'),
      friend: msg.includes('친구') || msg.includes('애들') || msg.includes('관계'),
      family: msg.includes('엄마') || msg.includes('아빠') || msg.includes('부모') || msg.includes('집'),
      game: msg.includes('게임') || msg.includes('유튜브') || msg.includes('폰'),
      good: msg.includes('좋') || msg.includes('잘') || msg.includes('재밌') || msg.includes('행복'),
      exercise: msg.includes('운동') || msg.includes('헬스') || msg.includes('달리'),
      sleep: msg.includes('잠') || msg.includes('자') || msg.includes('늦게'),
      ready: msg.includes('싶') || msg.includes('원해') || msg.includes('되고') || msg.includes('하고') || msg.includes('해볼'),
    }

    // 사용자 말에 맞춘 반응
    let reaction = ''
    if (keywords.study) reaction = pick(['공부 얘기구나', '아 학교 때문에?', '공부... 쉽지 않지'])
    else if (keywords.tired) reaction = pick(['피곤하구나...', '아 지쳤어?', '휴식 필요하겠다'])
    else if (keywords.stress) reaction = pick(['스트레스 받았구나 ㅠ', '아 그거 짜증나지', '힘들었겠다'])
    else if (keywords.friend) reaction = pick(['친구 얘기네', '아 애들이랑?', '관계가 좀 그래?'])
    else if (keywords.family) reaction = pick(['집에서?', '가족 얘기구나', '부모님이랑?'])
    else if (keywords.game) reaction = pick(['ㅋㅋ 게임했어?', '폰 많이 봤구나', '유튜브 재밌지~'])
    else if (keywords.good) reaction = pick(['오 좋았어?', '다행이다~', '잘됐네!'])
    else if (keywords.exercise) reaction = pick(['운동! 좋지', '헬스?', '몸 움직이는 거 좋아'])
    else if (keywords.sleep) reaction = pick(['잠이 부족해?', '늦게 잤구나', '수면 중요한데'])
    else reaction = pick(['오 그랬구나', '아 진짜?', '응응', '그렇구나~', '오~'])

    // ===== 1단계: 현재 상태 파악 (3-4턴) =====
    if (currentPhase === 'explore') {
      const exploreQuestions = [
        // 턴 1-2: 더 깊이 탐색
        ['좀 더 얘기해줄래?', '그래서 어떤 느낌이야?', '언제부터 그랬어?', '왜 그런 거 같아?'],
        ['그게 제일 힘든 거야?', '다른 건 없어?', '그래서 기분이 어때?'],
        // 턴 3-4: 목표로 전환 유도
        ['그럼 어떻게 되면 좋겠어?', '바꾸고 싶은 게 있어?', '원하는 게 뭐야?'],
        ['자 그럼 목표를 정해볼까?', '뭘 바꾸면 좋을까?']
      ]

      const questionSet = exploreQuestions[Math.min(currentPhaseTurn, 3)]
      const question = pick(questionSet)

      // 3턴 이상이고 목표 관련 키워드 있으면 다음 단계로
      if (currentPhaseTurn >= 2 && keywords.ready) {
        setTimeout(() => { setPhase('goal'); setPhaseTurn(0) }, 100)
        return `${reaction} 좋아! 그럼 구체적인 목표를 정해보자. 어떻게 되고 싶어?`
      }
      // 4턴 되면 강제 전환
      if (currentPhaseTurn >= 3) {
        setTimeout(() => { setPhase('goal'); setPhaseTurn(0) }, 100)
        return `${reaction} 알겠어! 이제 목표를 정해볼까? 뭘 바꾸고 싶어?`
      }

      return `${reaction} ${question}`
    }

    // ===== 2단계: 목표 설정 (3-4턴) =====
    if (currentPhase === 'goal') {
      const goalQuestions = [
        // 턴 1-2: 목표 구체화
        ['그게 이뤄지면 뭐가 달라져?', '왜 그게 중요해?', '구체적으로 어떤 거야?'],
        ['진짜 원하는 게 뭐야?', '최종 목표는?', '그래서 어떤 모습이 되고 싶어?'],
        // 턴 3-4: 실행으로 전환
        ['좋아! 그럼 오늘 뭐 해볼 수 있어?', '첫 번째로 할 수 있는 건?'],
        ['이제 행동으로 옮겨볼까? 오늘 할 거 하나만!']
      ]

      const questionSet = goalQuestions[Math.min(currentPhaseTurn, 3)]
      const question = pick(questionSet)

      // 3턴 이상이고 실행 관련 키워드
      if (currentPhaseTurn >= 2 && (msg.includes('할') || msg.includes('해볼') || msg.includes('시작'))) {
        setTimeout(() => { setPhase('action'); setPhaseTurn(0) }, 100)
        return `${reaction} 좋아! 그럼 오늘 당장 해볼 거 하나만 정해보자!`
      }
      // 4턴 되면 강제 전환
      if (currentPhaseTurn >= 3) {
        setTimeout(() => { setPhase('action'); setPhaseTurn(0) }, 100)
        return `${reaction} 목표 정해졌다! 이제 오늘 할 수 있는 거 하나만 말해봐!`
      }

      return `${reaction} ${question}`
    }

    // ===== 3단계: 실행 설정 (3-4턴) =====
    if (currentPhase === 'action') {
      const actionQuestions = [
        ['뭘 해볼 수 있을까?', '오늘 할 수 있는 건?', '첫 번째로 할 건 뭐야?'],
        ['그거 언제 할 거야?', '몇 분 동안?', '좀 더 구체적으로!'],
        ['오케이! 정리하면 뭐 할 거야?', '그래서 오늘의 할 일은?'],
      ]

      // 구체적인 실행 계획이 있으면 완료
      const hasTime = msg.includes('분') || msg.includes('시간') || msg.includes('시')
      const hasAction = msg.includes('할게') || msg.includes('해볼게') || msg.includes('하기')

      if (userMsg.length > 8 && (hasTime || hasAction || currentPhaseTurn >= 2)) {
        setTodoText(userMsg)
        setTimeout(() => {
          setPhase('done')
          setShowTodoModal(true)
        }, 100)
        return pick([
          `"${userMsg}" 완전 좋아! 👏 할 수 있어!`,
          `오 "${userMsg}"! 이거다! 화이팅!`,
          `"${userMsg}" 좋은데? 오늘 꼭 해보자!`
        ])
      }

      const questionSet = actionQuestions[Math.min(currentPhaseTurn, 2)]
      return `${reaction} ${pick(questionSet)}`
    }

    return reaction
  }

  async function handleSend() {
    if (!input.trim() || isTyping || phase === 'done') return

    const userMsg = input.trim()
    addMessage('user', userMsg)
    setInput('')
    const currentPhaseTurn = phaseTurn
    setPhaseTurn(prev => prev + 1)
    setIsTyping(true)

    await new Promise(r => setTimeout(r, 600 + Math.random() * 600))

    addMessage('coach', generateResponse(userMsg, phase, currentPhaseTurn))
    setIsTyping(false)
    inputRef.current?.focus()
  }

  // 투두 저장하고 실행 페이지로 이동
  function handleSaveTodo() {
    if (!todoText.trim()) return

    const newItems = [...executions]
    newItems.push({
      id: `coach-${Date.now()}`,
      areaKey: worldKey,
      lessonTitle: '코칭',
      text: todoText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    })

    saveExecutions(newItems)
    updateLevelProgress(worldKey, 1)
    addEnergy(5)

    setShowTodoModal(false)
    router.push('/checkin')
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/coaching" className="p-2 -ml-2 text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${coach.style} flex items-center justify-center text-xl shadow-lg`}>
            {coach.avatar}
          </div>
          <div className="flex items-center gap-1 bg-white/5 rounded-full px-2.5 py-1">
            <Star className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" />
            <span className="text-xs text-white/60">{energy}</span>
          </div>
        </div>
      </header>

      {/* 채팅 */}
      <div className="flex-1 pt-20 pb-40 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'coach' && (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${coach.style} flex items-center justify-center text-sm mr-2 flex-shrink-0`}>
                    {coach.avatar}
                  </div>
                )}
                <div className={`max-w-[75%] px-4 py-2.5 text-[15px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white/10 text-white rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${coach.style} flex items-center justify-center text-sm mr-2`}>
                {coach.avatar}
              </div>
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 투두 입력 모달 */}
      <AnimatePresence>
        {showTodoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowTodoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">실행할 일 추가</h3>
                <button onClick={() => setShowTodoModal(false)} className="text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
                placeholder="오늘 할 일을 적어주세요"
                autoFocus
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-white/30 mb-4"
              />

              <button
                onClick={handleSaveTodo}
                disabled={!todoText.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-50"
              >
                실행에 추가하기 ⭐+5
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 입력창 */}
      {!showTodoModal && (
        <div className="fixed bottom-16 left-0 right-0 bg-slate-900 border-t border-white/5 p-3">
          <div className="max-w-md mx-auto flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
              placeholder={phase === 'done' ? '완료!' : '메시지...'}
              disabled={isTyping || phase === 'done'}
              className="flex-1 bg-white/10 text-white rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-white/30 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping || phase === 'done'}
              className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <NavItem href="/checkin" icon="⭐" label="실행" />
          <NavItem href="/coaching" icon="💬" label="코칭" />
          <NavItem href="/app" icon="🗺️" label="월드" />
          <NavItem href="/dashboard" icon="📊" label="리포트" />
        </div>
      </nav>
    </main>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-6 py-1 text-white/40 hover:text-white/60">
      <span className="text-xl">{icon}</span>
      <span className="text-xs">{label}</span>
    </Link>
  )
}

export default function CoachingPage() {
  return (
    <AuthGuard>
      <CoachingChat />
    </AuthGuard>
  )
}
