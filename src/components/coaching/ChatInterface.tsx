'use client'

import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  sessionId: string
}

// 더미 AI 응답 (나중에 실제 AI API로 대체)
const AI_RESPONSES = [
  '좋은 질문이에요! 그 생각에 대해 더 자세히 이야기해 볼까요?',
  '오늘 하루는 어땠나요? 기분이 어떠셨는지 들려주세요.',
  '그런 상황에서 그렇게 느끼는 건 자연스러운 거예요.',
  '작은 성취도 충분히 축하받을 만해요! 잘하고 있어요.',
  '다음에는 어떻게 해보고 싶으세요?',
]

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'coach',
      content: '안녕하세요! 오늘 코칭 세션을 시작할게요. 오늘 이야기하고 싶은 주제가 있나요?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // 더미 AI 응답 (나중에 실제 API 호출로 대체)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'coach',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {/* 채팅 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-gray-700 text-white rounded-bl-sm'
              }`}
            >
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'
                }`}
              >
                {message.timestamp.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="메시지를 입력하세요..."
            className="flex-1 bg-gray-700 text-white rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            전송
          </button>
        </div>

        {/* 빠른 응답 버튼 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['오늘 기분이 좋아요', '고민이 있어요', '목표를 점검하고 싶어요'].map(
            (quick) => (
              <button
                key={quick}
                onClick={() => setInput(quick)}
                className="text-sm text-gray-400 bg-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-600 transition"
              >
                {quick}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}
