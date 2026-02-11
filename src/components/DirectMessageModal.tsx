'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  fromName: string
  message: string
  createdAt: string
}

export function DirectMessageModal() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)

  // B2B 대시보드에서는 메시지 알림 비활성화
  const isB2BPage = pathname?.startsWith('/dashboard/b2b')

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/b2b/message')
      if (!res.ok) return
      const data = await res.json()
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages)
        setCurrentIdx(0)
      }
    } catch {}
  }, [])

  useEffect(() => {
    if (!session?.user || isB2BPage) return
    fetchMessages()
  }, [session?.user, isB2BPage, fetchMessages])

  async function handleRead(messageId: string) {
    try {
      await fetch('/api/b2b/message', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId }),
      })
    } catch {}

    const remaining = messages.filter((m) => m.id !== messageId)
    setMessages(remaining)
    if (currentIdx >= remaining.length) setCurrentIdx(0)
  }

  if (messages.length === 0 || isB2BPage) return null

  const msg = messages[currentIdx]
  if (!msg) return null

  const date = new Date(msg.createdAt)
  const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* 배경 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* 모달 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        >
          {/* 헤더 */}
          <div className="px-5 pt-6 pb-3 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">새로운 메시지가 도착했습니다</p>
            {messages.length > 1 && (
              <p className="text-[10px] text-gray-600 mt-0.5">{currentIdx + 1} / {messages.length}</p>
            )}
          </div>

          {/* 메시지 내용 */}
          <div className="px-5 pb-4">
            <div className="bg-gray-800/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-indigo-300">{msg.fromName}</span>
                <span className="text-[10px] text-gray-600">{dateStr}</span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="px-5 pb-5">
            <button
              onClick={() => handleRead(msg.id)}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors"
            >
              확인
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
