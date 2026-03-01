'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Star, X, Lightbulb, Mic, Clock, ChevronRight } from 'lucide-react'
import { AuthGuard } from '@/components/AuthGuard'
import { LevelBadge } from '@/components/LevelBadge'
import { BottomTabBar } from '@/components/BottomTabBar'
import { useUserData } from '@/lib/UserDataProvider'
import PaywallBanner from '@/components/PaywallBanner'
import { useVoiceCoaching } from '@/lib/coaching/useVoiceCoaching'
import VoiceCoachingBar from './components/VoiceCoachingOverlay'

interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
}


function randomExecutionExample() {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
  const when = pick(['오늘 저녁까지', '오늘 자기 전까지', '오늘 오후까지', '내일 아침까지', '오늘 중으로', '이번 주 금요일까지', '오늘 밤 10시까지', '내일 점심까지'])
  const templates = [
    () => `${when} ${pick(['죽음의 수용소에서', '어린 왕자', '데미안', '미움받을 용기', '아몬드', '원씽', '습관의 힘'])} ${pick(['30페이지', '50페이지', '1챕터', '2챕터', '20페이지'])} ${pick(['밑줄 치며 정독하고', '핵심 메모하며 읽고', '비판적으로 읽고'])} ${pick(['배운 점 3가지 정리하기', '핵심 문장 5개 기록하기', '느낀 점 1페이지 쓰기', '요약 노트 작성하기'])}`,
    () => `${when} ${pick(['달리기 3km', '줄넘기 500개', '스쿼트 50개 3세트', '플랭크 3분 3세트', '팔굽혀펴기 20개 3세트', '걷기 5000보', '자전거 30분', '버피 10개 5세트'])} ${pick(['쉬지 않고 완료하고', '자세 정확하게 하고', '기록 갱신 목표로'])} ${pick(['운동 기록 남기기', '완료 인증 사진 찍기', '세트별 기록 정리하기', '컨디션 변화 기록하기'])}`,
    () => `${when} ${pick(['수학 문제 20개', '영어 단어 50개', '국어 지문 3개', '과학 개념 5단원', '코딩 문제 3개', '모의고사 1회분'])} ${pick(['오답 노트 작성하며 풀고', '시간 재며 집중해서 풀고', '틀린 부분 3번 복습하고'])} ${pick(['정답률 기록하기', '핵심 정리 노트 만들기', '오답 원인 분석 적기', '취약 유형 3가지 정리하기'])}`,
    () => `${when} ${pick(['아침 기상 후', '저녁 식사 후', '자기 전', '점심시간에'])} ${pick(['명상 15분', '일기 1페이지', '감사일기 3가지', '독서 20분', '스트레칭 10분'])} ${pick(['집중해서 마치고', '꾸준히 실천하고', '방해 없이 완료하고'])} ${pick(['체크리스트에 기록하기', '실행 완료 인증하기', '느낀 점 한 줄 남기기'])}`,
    () => `${when} ${pick(['기타 코드 3개', '피아노 곡 1절', '그림 1장', '글쓰기 500자', '사진 5장', '새 레시피 1개'])} ${pick(['30분 집중해서', '1시간 동안', '40분간 몰입해서'])} ${pick(['연습하고 기록 남기기', '완성하고 인증하기', '과정 영상 찍어두기', '배운 점 3가지 정리하기'])}`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]()
}

const COACHES = [
  { name: '김지훈 코치', emoji: '👨‍💼', spec: '자기주도학습 / 습관 설계', career: '교육심리 석사 | 코칭 경력 8년', color: 'from-cyan-500 to-blue-600', bio: '학생들이 스스로 목표를 세우고 실행하는 힘을 키울 수 있도록 돕습니다. 습관 설계와 자기주도학습 전문가로, 수백 명의 학생들과 함께해왔습니다.', method: '목표 설정 → 실행 계획 → 주간 점검 → 피드백', reviews: 127, rating: 4.9 },
  { name: '이서연 코치', emoji: '👩‍🎓', spec: '인지 / 학습전략', career: '인지과학 박사 | 코칭 경력 5년', color: 'from-violet-500 to-purple-600', bio: '어떻게 배우면 더 잘 기억하고 이해할 수 있는지 연구하고 가르칩니다. 과학적인 학습법으로 효율적인 공부를 도와드립니다.', method: '학습 진단 → 맞춤 전략 → 실전 적용 → 성과 분석', reviews: 89, rating: 4.8 },
  { name: '박준영 코치', emoji: '🧑‍🏫', spec: '태도 / 마인드셋', career: '긍정심리 전문가 | 코칭 경력 10년', color: 'from-amber-500 to-orange-600', bio: '긍정적인 마인드셋과 성장하는 태도를 기르는 것을 돕습니다. 10년간 다양한 연령대의 내담자와 함께하며 변화를 이끌어왔습니다.', method: '현재 마인드 점검 → 강점 발견 → 성장 목표 → 실천', reviews: 203, rating: 4.9 },
  { name: '최민서 코치', emoji: '👩‍💻', spec: '관계 / 소통', career: '상담심리 석사 | 코칭 경력 6년', color: 'from-pink-500 to-rose-600', bio: '건강한 관계를 맺고 유지하는 방법을 함께 찾아갑니다. 소통 능력 향상과 갈등 해결을 전문으로 합니다.', method: '관계 패턴 파악 → 소통 훈련 → 실전 연습 → 피드백', reviews: 156, rating: 4.7 },
] as const

function CoachingChat() {
  const router = useRouter()
  const { energy, addEnergy, useEnergy, executions, saveExecutions, updateLevelProgress, subscriptionInfo } = useUserData()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)

  // 무료 사용자: 하루 3메시지 제한
  const FREE_MESSAGE_LIMIT = 3
  const userMessageCount = messages.filter(m => m.role === 'user').length
  const isFreeLimited = subscriptionInfo.plan === 'free' && userMessageCount >= FREE_MESSAGE_LIMIT

  const [showTodoModal, setShowTodoModal] = useState(false)
  const [todoText, setTodoText] = useState('')
  const [todoPlaceholder] = useState(() => randomExecutionExample())
  const [chatDone, setChatDone] = useState(false)
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [showTip, setShowTip] = useState(false)
  const [showStartModal, setShowStartModal] = useState(false)
  const [coachingStarted, setCoachingStarted] = useState(false)
  const [pendingMsg, setPendingMsg] = useState('')
  const [pendingVoice, setPendingVoice] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showCoachList, setShowCoachList] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<typeof COACHES[number] | null>(null)
  const paymentTimerRef = useRef<NodeJS.Timeout | null>(null)

  // 음성 코칭
  const [voiceMode, setVoiceMode] = useState(false)
  const coachingModeRef = useRef<'text' | 'voice'>('text')
  const voice = useVoiceCoaching({
    onMessage: (role, text) => {
      addMessage(role === 'coach' ? 'coach' : 'user', text)
    },
    onComplete: () => {
      setVoiceMode(false)
      setChatDone(true)
      setTodoText('')
    },
  })

  // 기록 보기
  const [showHistory, setShowHistory] = useState(false)
  const [historyList, setHistoryList] = useState<{ id: string; mode: string; createdAt: string; messageCount: number; preview: string }[]>([])
  const [historyDetail, setHistoryDetail] = useState<{ id: string; mode: string; createdAt: string; messages: { role: string; content: string }[] } | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)
  const sessionSaved = useRef(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
    // ① 인사
    const p1 = pick([
      '안녕!', '반가워!', '안녕, 반가워!', '어서와!', '하이!', '안녕~ 만나서 반가워!',
    ])
    // ② 코칭 = 목표를 이루는 대화
    const p2 = pick([
      '코칭은 목표를 이루는 대화야.',
      '코칭은 네가 원하는 목표를 이루기 위한 대화야.',
      '여기는 네 목표를 이루는 대화를 하는 곳이야.',
      '코칭은 네 목표를 향해 나아가는 특별한 대화야.',
      '코칭은 원하는 걸 이루기 위한 대화라고 생각하면 돼.',
    ])
    // ③ 고민 해결 + 성장 찾기
    const p3 = pick([
      '문제나 고민을 해결하고, 성장하고 싶은 걸 같이 찾아볼 거야.',
      '네 고민을 풀어내고, 성장하고 싶은 방향을 함께 찾아가는 거지.',
      '고민도 해결하고, 네가 성장하고 싶은 부분을 같이 발견해 나갈 거야.',
      '문제를 풀고, 네가 진짜 성장하고 싶은 걸 찾는 시간이야.',
      '고민을 정리하고, 네가 원하는 성장의 방향을 함께 찾아볼 거야.',
    ])
    // ④ 질문으로 내면의 힘 발견
    const p4 = pick([
      '질문을 통해 네 안에 있는 힘을 끌어내고,',
      '대화 속 질문으로 네 안의 가능성을 찾아내고,',
      '질문을 주고받으면서 네 안에 숨은 힘을 발견하고,',
      '질문 하나하나가 네 안의 잠재력을 깨워줄 거야.',
      '함께 대화하면서 네 안에 있는 답을 찾아내고,',
    ])
    // ⑤ 격려와 응원
    const p5 = pick([
      '격려받고 응원받으면서',
      '힘껏 응원하고 격려하면서',
      '네 편에서 응원하고 격려하면서',
      '매 순간 격려와 응원을 받으면서',
      '든든하게 응원받으면서',
    ])
    // ⑥ 원하는 걸 이루게 도와줌
    const p6 = pick([
      '실제로 네가 원하는 걸 이룰 수 있게 도와줄게.',
      '진짜 네가 원하는 걸 이뤄낼 수 있도록 함께할게.',
      '네가 원하는 목표를 실제로 달성할 수 있게 도울 거야.',
      '네가 바라는 걸 현실로 만들 수 있게 같이 가자.',
      '네가 진짜 원하는 결과를 만들어낼 수 있도록 도와줄게.',
    ])
    // ⑦ 나만 믿어
    const p7 = pick([
      '나만 믿어!', '나한테 맡겨봐!', '나만 믿고 따라와!',
      '한번 믿어봐!', '나랑 같이하면 돼!', '내가 옆에 있을게!',
    ])
    // ⑧ 질문
    const p8 = pick([
      '혹시 고민이나 해결하고 싶은 것, 목표하는 것, 성장하고 싶은 게 있어?',
      '지금 풀고 싶은 고민이나 이루고 싶은 목표, 성장하고 싶은 게 있니?',
      '요즘 고민되는 것, 목표하는 것, 성장하고 싶은 것 있으면 말해줘!',
      '해결하고 싶은 고민이든, 이루고 싶은 목표든, 성장하고 싶은 거든 뭐든 말해봐!',
      '고민이 있어도, 목표가 있어도, 성장하고 싶은 게 있어도 다 좋아! 뭐가 있어?',
    ])
    const greeting = `${p1} ${p2} ${p3} ${p4} ${p5} ${p6} ${p7}\n\n${p8}`

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

  // chatDone이 true가 된 후 약간 딜레이를 줘서 메시지 상태가 완전히 반영된 뒤 저장
  useEffect(() => {
    if (!chatDone || sessionSaved.current) return
    const timer = setTimeout(() => {
      const msgs = messages.filter(m => m.content.trim())
      if (msgs.length === 0) return
      sessionSaved.current = true
      fetch('/api/coaching/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: coachingModeRef.current,
          messages: msgs.map(m => ({ role: m.role, content: m.content })),
        }),
      }).then(res => {
        if (!res.ok) console.error('코칭 세션 저장 실패:', res.status)
      }).catch(err => {
        console.error('코칭 세션 저장 실패:', err)
        sessionSaved.current = false // 실패시 재시도 가능하게
      })
    }, 500) // 메시지 상태 안정화 대기
    return () => clearTimeout(timer)
  }, [chatDone, messages])

  async function loadHistory() {
    setShowHistory(true)
    setHistoryDetail(null)
    setHistoryLoading(true)
    try {
      const res = await fetch('/api/coaching/sessions')
      const data = await res.json()
      if (res.ok) {
        setHistoryList(data.sessions || [])
      } else {
        console.error('코칭 기록 로드 실패:', res.status, data.error)
        setHistoryList([])
      }
    } catch (err) {
      console.error('코칭 기록 로드 에러:', err)
      setHistoryList([])
    }
    setHistoryLoading(false)
  }

  async function loadHistoryDetail(sessionId: string) {
    setHistoryLoading(true)
    try {
      const res = await fetch(`/api/coaching/sessions/${sessionId}`)
      if (res.ok) {
        const data = await res.json()
        setHistoryDetail(data)
      }
    } catch { /* ignore */ }
    setHistoryLoading(false)
  }

  async function handleSend() {
    if (!input.trim() || isTyping || chatDone) return

    // 무료 사용자 메시지 제한 체크
    if (isFreeLimited) {
      setShowPaywall(true)
      return
    }

    // 첫 메시지: 코칭 시작 확인 모달
    if (!coachingStarted) {
      setPendingMsg(input.trim())
      setShowStartModal(true)
      return
    }

    await sendMessage(input.trim())
  }

  function handleStartCoaching() {
    if (energy < 10) return

    // 에너지 차감
    addEnergy(-10)
    setCoachingStarted(true)
    setShowStartModal(false)

    // 음성 코칭 시작
    if (pendingVoice) {
      setPendingVoice(false)
      setVoiceMode(true)
      voice.start()
      return
    }

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
        }, 5000)
      }
    } catch {
      addMessage('coach', '인터넷 연결을 확인해줘!')
      setIsTyping(false)
    }

    inputRef.current?.focus()
  }

  async function handleStartVoice() {
    if (!coachingStarted) {
      setPendingVoice(true)
      setShowStartModal(true)
      return
    }
    coachingModeRef.current = 'voice'
    setVoiceMode(true)
    await voice.start()
  }

  function handleEndVoice() {
    voice.stop()
    setVoiceMode(false)
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
    <main className="h-[100dvh] bg-slate-900 flex flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-white/5 pt-safe">
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
            <button
              onClick={loadHistory}
              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              title="코칭 기록"
            >
              <Clock className="w-4 h-4 text-white/60" />
            </button>
            <LevelBadge />
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60 font-medium">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 채팅 */}
      <div className="flex-1 pt-28 pb-52 px-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-3">
          {/* THE GLORY 성장 코칭 배너 */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => router.push('/coaching/glory')}
            className="w-full bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-xl p-4 flex items-center justify-between hover:from-violet-500/30 hover:to-purple-500/30 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-sm">성장 코칭 시작하기</p>
                <p className="text-violet-300/70 text-xs">THE GLORY 모델 기반 AI 코칭</p>
              </div>
            </div>
            <span className="text-violet-400 text-lg">→</span>
          </motion.button>

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
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-base mr-2 flex-shrink-0">
                    🧑‍🏫
                  </div>
                )}
                <div className={`max-w-[78%] px-4 py-3 text-[15px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-violet-600 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white/10 text-white/90 rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-base mr-2">
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
                <p className="text-white/50 text-sm mt-1">내 보이지 않는 성장 기록을 위해 최대한 구체적으로 적어주세요</p>
              </div>

              <textarea
                value={todoText}
                onChange={e => setTodoText(e.target.value)}
                placeholder={todoPlaceholder}
                rows={3}
                autoFocus
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-violet-500/50 placeholder:text-white/30 mb-4 resize-none"
              />

              {/* 영역 선택 */}
              <p className="text-white/50 text-xs mb-2">어떤 영역의 실행인가요? (복수 선택 가능)</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { key: 'cognition', label: '인지(학습)', icon: '🧠' },
                  { key: 'selfDirected', label: '자기주도', icon: '🎯' },
                  { key: 'habit', label: '습관', icon: '📚' },
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
                <Star className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">코칭 시작하기</h3>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                <span className="text-yellow-400 font-bold text-lg">-10</span>
              </div>
              {energy < 10 ? (
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
                  disabled={energy < 10}
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
        <div className="fixed left-0 right-0 z-40 bg-slate-900 border-t border-white/5 p-3" style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}>
          <div className="max-w-md mx-auto">
            {chatDone ? (
              <button
                onClick={() => setShowTodoModal(true)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <Star className="w-4 h-4" />
                실행 등록하기
              </button>
            ) : voiceMode ? (
              <VoiceCoachingBar
                state={voice.state}
                isMuted={voice.isMuted}
                audioLevel={voice.audioLevel}
                onToggleMute={voice.toggleMute}
                onEnd={handleEndVoice}
              />
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
                  onClick={handleStartVoice}
                  disabled={isTyping}
                  className="w-12 h-12 rounded-full bg-white/10 text-white/70 flex items-center justify-center active:scale-95 transition-transform hover:bg-white/15 disabled:opacity-40"
                  title="음성 코칭"
                >
                  <Mic className="w-5 h-5" />
                </button>
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

      {/* 무료 사용자 페이월 모달 */}
      <AnimatePresence>
        {showPaywall && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaywall(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              <PaywallBanner message={`무료 코칭 ${FREE_MESSAGE_LIMIT}회를 모두 사용했습니다`} />
              <button
                onClick={() => setShowPaywall(false)}
                className="w-full py-4 text-center text-gray-400 text-sm bg-gray-900"
              >
                닫기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 기록 보기 사이드 패널 */}
      <AnimatePresence>
        {showHistory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[85%] sm:max-w-sm bg-slate-800 z-50 flex flex-col"
              style={{ height: '100dvh' }}
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0 pt-safe">
                <h3 className="text-white font-bold text-lg">
                  {historyDetail ? (
                    <button onClick={() => setHistoryDetail(null)} className="flex items-center gap-1 text-white/60 hover:text-white">
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      <span className="text-white font-bold">대화 상세</span>
                    </button>
                  ) : '코칭 기록'}
                </h3>
                <button onClick={() => setShowHistory(false)} className="text-white/40 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-safe" style={{ WebkitOverflowScrolling: 'touch' }}>
                {historyLoading ? (
                  <div className="flex items-center justify-center py-12 text-white/40">로딩 중...</div>
                ) : historyDetail ? (
                  /* 상세 대화 */
                  <div className="p-4 space-y-3 pb-32">
                    <div className="text-xs text-white/40 mb-2">
                      {new Date(historyDetail.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' '}{historyDetail.mode === 'voice' ? '(음성)' : '(텍스트)'}
                    </div>
                    {historyDetail.messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'coach' && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-xs mr-2 flex-shrink-0">
                            AI
                          </div>
                        )}
                        <div className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed break-words ${
                          msg.role === 'user'
                            ? 'bg-violet-600 text-white rounded-2xl rounded-br-sm'
                            : 'bg-white/10 text-white/90 rounded-2xl rounded-bl-sm'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : historyList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-white/40">
                    <Clock className="w-8 h-8 mb-2 opacity-30" />
                    <p className="text-sm">아직 코칭 기록이 없어요</p>
                  </div>
                ) : (
                  /* 목록 */
                  <div className="divide-y divide-white/5">
                    {historyList.map(s => (
                      <button
                        key={s.id}
                        onClick={() => loadHistoryDetail(s.id)}
                        className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white/40">
                            {new Date(s.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
                            {' '}{new Date(s.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            s.mode === 'voice' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-violet-500/20 text-violet-400'
                          }`}>
                            {s.mode === 'voice' ? '음성' : '텍스트'}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm line-clamp-2">{s.preview || '대화 내용'}</p>
                        <p className="text-white/30 text-xs mt-1">{s.messageCount}개 메시지</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="/coaching" />
    </main>
  )
}

export default function CoachingPage() {
  return (
    <AuthGuard>
      <CoachingChat />
    </AuthGuard>
  )
}
