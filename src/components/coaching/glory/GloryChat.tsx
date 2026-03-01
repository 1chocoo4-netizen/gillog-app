'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import StageIndicator from './StageIndicator'
import CoachMessage from './CoachMessage'
import UserMessage from './UserMessage'
import CompletionCard from './CompletionCard'
import ActionRegistration from './ActionRegistration'
import type { GloryStage } from '@/lib/coaching/glory-stages'

interface Message {
  id: string
  role: 'coach' | 'user'
  content: string
  stage?: string
}

interface CompletionData {
  summary: {
    thankful: string
    happy: string
    emotional: string
    grounded: string
    luminous: string
    options: string
    realAction: string
    meaning: string
  }
  encouragement: string
  quote: string
  quoteAuthor: string
}

interface Props {
  sessionId: string
  initialMessage: string
  initialStage: GloryStage
}

export default function GloryChat({ sessionId, initialMessage, initialStage }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial', role: 'coach', content: initialMessage, stage: initialStage },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStage, setCurrentStage] = useState<GloryStage>(initialStage)
  const [isComplete, setIsComplete] = useState(false)
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading, isComplete])

  // 메시지 전송
  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading || isComplete) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      stage: currentStage,
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // textarea 높이 리셋
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      const res = await fetch('/api/coaching/glory/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: text }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()

      const coachMsg: Message = {
        id: `coach-${Date.now()}`,
        role: 'coach',
        content: data.message,
        stage: data.stage,
      }

      setMessages(prev => [...prev, coachMsg])
      setCurrentStage(data.stage as GloryStage)

      if (data.isComplete) {
        setIsComplete(true)
        setCompletionData({
          summary: data.summary,
          encouragement: data.encouragement,
          quote: data.quote,
          quoteAuthor: data.quoteAuthor,
        })
      }
    } catch {
      const errorMsg: Message = {
        id: `error-${Date.now()}`,
        role: 'coach',
        content: '잠시 연결이 불안정해요. 다시 한번 말씀해 주시겠어요?',
        stage: currentStage,
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  // Enter 전송 (Shift+Enter는 줄바꿈)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // textarea 자동 높이 조정
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="gl-screen flex flex-col bg-[var(--gl-bg)]">
      {/* 헤더 */}
      <header className="flex-shrink-0 border-b border-[var(--gl-border)] bg-[var(--gl-bg)]">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={handleGoBack}
            className="text-[var(--gl-text-muted)] hover:text-[var(--gl-text)] transition-colors text-sm"
          >
            ← 뒤로
          </button>
          <h1 className="text-sm font-bold text-[var(--gl-text)]">THE GLORY 코칭</h1>
          <div className="w-10" />
        </div>
        <StageIndicator currentStage={currentStage} />
      </header>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map(msg =>
          msg.role === 'coach' ? (
            <CoachMessage key={msg.id} content={msg.content} />
          ) : (
            <UserMessage key={msg.id} content={msg.content} />
          )
        )}

        {/* 타이핑 인디케이터 */}
        {isLoading && <CoachMessage content="" isTyping />}

        {/* 완료 카드 */}
        {isComplete && completionData && (
          <div className="pt-4 space-y-4">
            <CompletionCard
              summary={completionData.summary}
              encouragement={completionData.encouragement}
              quote={completionData.quote}
              quoteAuthor={completionData.quoteAuthor}
            />
            <ActionRegistration
              realAction={completionData.summary.realAction}
              sessionId={sessionId}
              onComplete={handleGoBack}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 border-t border-[var(--gl-border)] bg-[var(--gl-bg)] px-4 py-3 pb-[env(safe-area-inset-bottom,12px)]"
        >
          <div className="flex items-end gap-2 max-w-lg mx-auto">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              rows={1}
              disabled={isLoading}
              className="flex-1 bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-2xl px-4 py-3 text-sm text-[var(--gl-text)] placeholder:text-[var(--gl-text-muted)] focus:outline-none focus:border-[var(--gl-primary)] transition-colors resize-none disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-[var(--gl-primary)] text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:opacity-90 transition-opacity active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
