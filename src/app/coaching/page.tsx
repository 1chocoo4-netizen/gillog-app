'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Zap, X, Lightbulb } from 'lucide-react'
import { AuthGuard } from '@/components/AuthGuard'
import { LevelBadge } from '@/components/LevelBadge'
import { useUserData } from '@/lib/UserDataProvider'

interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
}


const COACHES = [
  { name: '김지훈 코치', emoji: '👨‍💼', spec: '자기주도학습 / 습관 설계', career: '교육심리 석사 | 코칭 경력 8년', color: 'from-cyan-500 to-blue-600', bio: '학생들이 스스로 목표를 세우고 실행하는 힘을 키울 수 있도록 돕습니다. 습관 설계와 자기주도학습 전문가로, 수백 명의 학생들과 함께해왔습니다.', method: '목표 설정 → 실행 계획 → 주간 점검 → 피드백', reviews: 127, rating: 4.9 },
  { name: '이서연 코치', emoji: '👩‍🎓', spec: '인지 / 학습전략', career: '인지과학 박사 | 코칭 경력 5년', color: 'from-violet-500 to-purple-600', bio: '어떻게 배우면 더 잘 기억하고 이해할 수 있는지 연구하고 가르칩니다. 과학적인 학습법으로 효율적인 공부를 도와드립니다.', method: '학습 진단 → 맞춤 전략 → 실전 적용 → 성과 분석', reviews: 89, rating: 4.8 },
  { name: '박준영 코치', emoji: '🧑‍🏫', spec: '태도 / 마인드셋', career: '긍정심리 전문가 | 코칭 경력 10년', color: 'from-amber-500 to-orange-600', bio: '긍정적인 마인드셋과 성장하는 태도를 기르는 것을 돕습니다. 10년간 다양한 연령대의 내담자와 함께하며 변화를 이끌어왔습니다.', method: '현재 마인드 점검 → 강점 발견 → 성장 목표 → 실천', reviews: 203, rating: 4.9 },
  { name: '최민서 코치', emoji: '👩‍💻', spec: '관계 / 소통', career: '상담심리 석사 | 코칭 경력 6년', color: 'from-pink-500 to-rose-600', bio: '건강한 관계를 맺고 유지하는 방법을 함께 찾아갑니다. 소통 능력 향상과 갈등 해결을 전문으로 합니다.', method: '관계 패턴 파악 → 소통 훈련 → 실전 연습 → 피드백', reviews: 156, rating: 4.7 },
] as const

function CoachingChat() {
  const router = useRouter()
  const { energy, addEnergy, useEnergy, executions, saveExecutions, updateLevelProgress } = useUserData()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const [showTodoModal, setShowTodoModal] = useState(false)
  const [todoText, setTodoText] = useState('')
  const [chatDone, setChatDone] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [showTip, setShowTip] = useState(false)
  const [showStartModal, setShowStartModal] = useState(false)
  const [coachingStarted, setCoachingStarted] = useState(false)
  const [pendingMsg, setPendingMsg] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCoachList, setShowCoachList] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[number] | null>(null)
  const paymentTimerRef = useRef<NodeJS.Timeout | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

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

  async function handleSend() {
    if (!input.trim() || isTyping || chatDone) return

    // 첫 메시지: 코칭 시작 확인 모달
    if (!coachingStarted) {
      setPendingMsg(input.trim())
      setShowStartModal(true)
      return
    }

    await sendMessage(input.trim())
  }

  function handleStartCoaching() {
    if (energy < 20) return

    // 에너지 차감
    addEnergy(-20)
    setCoachingStarted(true)
    setShowStartModal(false)

    // 보류된 메시지 전송
    if (pendingMsg) {
      sendMessage(pendingMsg)
      setPendingMsg('')
    }
  }

  async function sendMessage(userMsg: string) {
    addMessage('user', userMsg)
    setInput('')
    setIsTyping(true)

    // 대화 히스토리 구성
    const chatHistory = [...messages, { id: '', role: 'user' as const, content: userMsg }]
      .map(m => ({ role: m.role === 'user' ? 'user' : 'model', content: m.content }))

    try {
      const res = await fetch('/api/coaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      })

      if (!res.ok) {
        if (res.status === 429) {
          addMessage('coach', '잠깐, 요청이 좀 많아서 그래. 1분만 기다렸다가 다시 보내줘!')
        } else {
          addMessage('coach', '연결이 잠깐 끊겼어. 다시 보내줘!')
        }
        setIsTyping(false)
        return
      }

      // 스트리밍 수신
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      const coachMsgId = `coach-${Date.now()}-${Math.random()}`

      // 빈 메시지 먼저 추가
      setMessages(prev => [...prev, { id: coachMsgId, role: 'coach', content: '' }])
      setIsTyping(false)

      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.text) {
                fullText += data.text
                const currentText = fullText
                setMessages(prev =>
                  prev.map(m => m.id === coachMsgId ? { ...m, content: currentText } : m)
                )
              }
            } catch {
              // skip
            }
          }
        }
      }

      // 스트리밍 완료 후 [코칭완료] 태그 감지
      if (fullText.includes('[코칭완료]')) {
        // 태그 제거해서 표시
        const cleanText = fullText.replace('[코칭완료]', '').trim()
        setMessages(prev =>
          prev.map(m => m.id === coachMsgId ? { ...m, content: cleanText } : m)
        )
        setTodoText(userMsg)
        setChatDone(true)
        setTimeout(() => {
          setShowTodoModal(true)
        }, 1500)
      }
    } catch {
      addMessage('coach', '인터넷 연결을 확인해줘!')
      setIsTyping(false)
    }

    inputRef.current?.focus()
  }

  function handleSaveTodo() {
    if (!todoText.trim() || selectedAreas.length === 0) return

    const newItems = [...executions]

    for (const areaKey of selectedAreas) {
      newItems.push({
        id: `coach-${Date.now()}-${areaKey}`,
        areaKey,
        lessonTitle: '코칭',
        text: todoText.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      })
      updateLevelProgress(areaKey, 1)
    }

    saveExecutions(newItems)
    addEnergy(5)

    setShowTodoModal(false)
    router.push('/checkin')
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-16" />
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">코칭</span>
            <button
              onClick={() => setShowTip(true)}
              className="relative w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 text-[6px] text-slate-900 font-bold flex items-center justify-center">?</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <div className="flex items-center gap-1">
                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${energy}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-white/60 font-medium">{energy}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 채팅 */}
      <div className="flex-1 pt-20 pb-40 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-3">
          {/* 실제 코치 연결 배너 */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              setShowPaymentModal(true)
              if (paymentTimerRef.current) clearTimeout(paymentTimerRef.current)
              paymentTimerRef.current = setTimeout(() => {
                setShowPaymentModal(false)
                setShowCoachList(true)
              }, 3000)
            }}
            className="w-full bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-500/30 rounded-xl p-4 flex items-center justify-between hover:from-sky-500/30 hover:to-cyan-500/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center">
                <span className="text-lg">👨‍🏫</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">실제 코치 연결하기</p>
                <p className="text-sky-300/70 text-xs">전문 코치와 1:1 코칭</p>
              </div>
            </div>
            <span className="text-sky-400 text-lg">→</span>
          </motion.button>

          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'coach' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                    🧑‍🏫
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm mr-2">
                🧑‍🏫
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

      {/* 실행 등록 모달 */}
      <AnimatePresence>
        {showTodoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-violet-500/20 relative"
              onClick={e => e.stopPropagation()}
            >
              {/* X 닫기 버튼 */}
              <button
                onClick={() => setShowTodoModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-3">
                  🧑‍🏫
                </div>
                <h3 className="text-white font-bold text-lg">코칭 완료</h3>
                <p className="text-white/50 text-sm mt-1">실행할 내용을 등록하세요</p>
              </div>

              <textarea
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
                placeholder="코칭에서 정한 실행 내용을 적어주세요"
                rows={3}
                autoFocus
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-white/30 mb-4 resize-none"
              />

              {/* 영역 선택 */}
              <p className="text-white/50 text-xs mb-2">어떤 영역의 실행인가요? (복수 선택 가능)</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { key: 'cognition', label: '인지', icon: '🧠' },
                  { key: 'selfDirected', label: '자기주도', icon: '🎯' },
                  { key: 'habit', label: '습관', icon: '🔄' },
                  { key: 'attitude', label: '태도', icon: '💪' },
                  { key: 'relationship', label: '관계', icon: '🤝' },
                  { key: 'character', label: '인성', icon: '❤️' },
                ].map(area => (
                  <button
                    key={area.key}
                    onClick={() => setSelectedAreas(prev =>
                      prev.includes(area.key)
                        ? prev.filter(k => k !== area.key)
                        : [...prev, area.key]
                    )}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedAreas.includes(area.key)
                        ? 'bg-violet-500 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    {area.icon} {area.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleSaveTodo}
                disabled={!todoText.trim() || selectedAreas.length === 0}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-50 active:scale-[0.98] transition-transform"
              >
                {selectedAreas.length > 1 ? `${selectedAreas.length}개 영역에 실행 등록하기` : '실행 등록하기'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 결제 모달 */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-16 px-4 overflow-y-auto pb-8"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-3xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-6">
                {/* 타이틀 */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl mx-auto mb-3">
                    👨‍🏫
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">실제 코칭 전문가를 만나보세요</h3>
                  <p className="text-white/50 text-sm">전문 코치가 직접 1:1로 코칭해드립니다</p>
                </div>

                {/* 1회 결제 */}
                <div className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-2xl p-5 mb-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-bold text-lg">1회 코칭</span>
                    <span className="text-white font-bold text-2xl">50,000원</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-violet-400">1.</span>
                      <span className="text-white/80 text-sm">1시간 코칭</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-violet-400">2.</span>
                      <span className="text-white/80 text-sm">일주일간 실행 관리 알림 코치에게 전달</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-violet-400">3.</span>
                      <span className="text-white/80 text-sm">실행력 향상</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPaymentProcessing(true)
                      setTimeout(() => {
                        setPaymentProcessing(false)
                        setShowPaymentModal(false)
                        setShowCoachList(true)
                      }, 3000)
                    }}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold active:scale-[0.98] transition-transform disabled:opacity-70"
                  >
                    {paymentProcessing ? '결제 처리 중...' : '50,000원 결제하기'}
                  </button>
                </div>

                {/* 한달 결제 */}
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    25% 할인
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-bold text-lg">한달 코칭</span>
                    <div className="text-right">
                      <span className="text-white/40 text-sm line-through mr-2">200,000원</span>
                      <span className="text-amber-300 font-bold text-2xl">150,000원</span>
                    </div>
                  </div>
                  <p className="text-amber-300/60 text-xs mb-4">매주 1회 코칭 + 매일 실행 관리</p>
                  <button
                    onClick={() => {
                      setPaymentProcessing(true)
                      setTimeout(() => {
                        setPaymentProcessing(false)
                        setShowPaymentModal(false)
                        setShowCoachList(true)
                      }, 3000)
                    }}
                    disabled={paymentProcessing}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold active:scale-[0.98] transition-transform disabled:opacity-70"
                  >
                    {paymentProcessing ? '결제 처리 중...' : '150,000원 결제하기'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 코치 리스트 모달 */}
      <AnimatePresence>
        {showCoachList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-16 px-4 overflow-y-auto pb-8"
            onClick={() => setShowCoachList(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-3xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-6">
                <div className="text-center mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">전문 코치 리스트</h3>
                  <p className="text-white/50 text-sm">원하는 코치를 선택해주세요</p>
                </div>

                <div className="space-y-3">
                  {COACHES.map((coach, i) => (
                    <motion.button
                      key={coach.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => {
                        setShowCoachList(false)
                        setSelectedCoach(coach)
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${coach.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {coach.emoji}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-bold">{coach.name}</p>
                        <p className="text-white/60 text-sm">{coach.spec}</p>
                        <p className="text-white/40 text-xs mt-0.5">{coach.career}</p>
                      </div>
                      <span className="text-white/30 text-lg">→</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 코치 프로필 모달 */}
      <AnimatePresence>
        {selectedCoach && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-16 px-4 overflow-y-auto pb-8"
            onClick={() => setSelectedCoach(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-800 rounded-3xl w-full max-w-md"
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 py-6">
                {/* 프로필 상단 */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedCoach.color} flex items-center justify-center text-4xl mb-3`}>
                    {selectedCoach.emoji}
                  </div>
                  <h3 className="text-white font-bold text-xl">{selectedCoach.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{selectedCoach.career}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-yellow-400 text-sm">{'★'} {selectedCoach.rating}</span>
                    <span className="text-white/30">|</span>
                    <span className="text-white/50 text-sm">리뷰 {selectedCoach.reviews}개</span>
                  </div>
                </div>

                {/* 전문 분야 */}
                <div className="bg-white/5 rounded-xl p-4 mb-3">
                  <p className="text-white/40 text-xs mb-1">전문 분야</p>
                  <p className="text-white font-medium">{selectedCoach.spec}</p>
                </div>

                {/* 소개 */}
                <div className="bg-white/5 rounded-xl p-4 mb-3">
                  <p className="text-white/40 text-xs mb-1">소개</p>
                  <p className="text-white/80 text-sm leading-relaxed">{selectedCoach.bio}</p>
                </div>

                {/* 코칭 방식 */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <p className="text-white/40 text-xs mb-1">코칭 방식</p>
                  <p className="text-white/80 text-sm">{selectedCoach.method}</p>
                </div>

                {/* 하단 버튼 */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCoach(null)}
                    className="flex-1 py-3 rounded-xl bg-[#FEE500] text-[#3C1E1E] font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-1.5"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.48 3 2 6.54 2 10.86c0 2.78 1.86 5.22 4.65 6.6-.15.53-.96 3.41-1 3.56 0 .1.04.2.13.25.06.03.12.04.18.02.24-.04 2.79-1.83 3.95-2.63.68.1 1.38.15 2.09.15 5.52 0 10-3.54 10-7.86S17.52 3 12 3z"/></svg>
                    무료 문의하기
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCoach(null)
                      setShowPaymentModal(true)
                    }}
                    className={`flex-1 py-3 rounded-xl bg-gradient-to-r ${selectedCoach.color} text-white font-bold active:scale-[0.98] transition-transform`}
                  >
                    결제하기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 도움말 모달 */}
      <AnimatePresence>
        {showTip && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTip(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-16 z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-5 shadow-2xl border border-amber-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold">코칭이란?</h3>
                  </div>
                  <button onClick={() => setShowTip(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-sm leading-relaxed">
                  <p className="text-white/90">
                    코칭은 <span className="text-amber-300 font-medium">&apos;목적이 있는 대화&apos;</span>입니다.
                  </p>
                  <p className="text-white/70">
                    질문과 공감을 통해 내 안에 있는 답을 스스로 발견하고, 작은 실행으로 변화를 만들어가는 과정입니다.
                  </p>
                  <p className="text-white/70">
                    공부, 친구, 연애, 재정, 건강, 관계, 사업, 진로, 정체성, 가족 등 오늘 해결하고 싶은 고민이나, 성장하고 싶은 목표가 있다면 부담 없이 편하게 이야기해 보세요.
                  </p>
                  <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
                    <p className="text-white/80">
                      길로그 AI 코치는 당신의 이야기를 듣고, 함께 정리하며, 지금 할 수 있는 가장 좋은 한 걸음을 찾아드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 코칭 시작 모달 */}
      <AnimatePresence>
        {showStartModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowStartModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-2xl p-6 w-full max-w-xs border border-violet-500/20 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">코칭 시작하기</h3>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-yellow-400 font-bold text-lg">-20</span>
              </div>
              {energy < 20 ? (
                <p className="text-red-400 text-sm mb-4">에너지가 부족합니다 (현재: {energy})</p>
              ) : (
                <p className="text-white/50 text-sm mb-4">현재 에너지: {energy}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowStartModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 text-white/60 font-medium active:scale-[0.98] transition-transform"
                >
                  취소
                </button>
                <button
                  onClick={handleStartCoaching}
                  disabled={energy < 20}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold disabled:opacity-40 active:scale-[0.98] transition-transform"
                >
                  시작하기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 입력창 / 실행 등록 버튼 */}
      {!showTodoModal && (
        <div className="fixed bottom-16 left-0 right-0 bg-slate-900 border-t border-white/5 p-3">
          <div className="max-w-md mx-auto">
            {chatDone ? (
              <button
                onClick={() => setShowTodoModal(true)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Zap className="w-4 h-4" />
                실행 등록하기
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
                  placeholder="메시지..."
                  disabled={isTyping}
                  className="flex-1 bg-white/10 text-white rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-white/30 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <NavItem href="/checkin" icon="⚡" label="실행" />
          <NavItem href="/coaching" icon="💬" label="코칭" active />
          <NavItem href="/app" icon="🗺️" label="월드" />
          <NavItem href="/dashboard" icon="📊" label="리포트" />
        </div>
      </nav>
    </main>
  )
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: string; label: string; active?: boolean }) {
  return (
    <Link href={href} className={`flex flex-col items-center gap-1 px-6 py-1 ${active ? 'text-white' : 'text-white/40 hover:text-white/60'}`}>
      <span className="text-xl">{icon}</span>
      <span className={`text-xs ${active ? 'font-medium' : ''}`}>{label}</span>
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
