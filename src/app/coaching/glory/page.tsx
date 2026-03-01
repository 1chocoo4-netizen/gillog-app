'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/AuthGuard'
import GloryChat from '@/components/coaching/glory/GloryChat'
import type { GloryStage } from '@/lib/coaching/glory-stages'

function GloryCoachingContent() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [initialMessage, setInitialMessage] = useState<string>('')
  const [initialStage, setInitialStage] = useState<GloryStage>('GREETING')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const startSession = async () => {
      try {
        const res = await fetch('/api/coaching/glory', {
          method: 'POST',
        })

        if (!res.ok) {
          throw new Error('세션 생성에 실패했습니다.')
        }

        const data = await res.json()
        setSessionId(data.sessionId)
        setInitialMessage(data.message)
        setInitialStage(data.stage as GloryStage)
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
      }
    }

    startSession()
  }, [])

  if (error) {
    return (
      <div className="gl-screen flex items-center justify-center bg-[var(--gl-bg)]">
        <div className="text-center px-6">
          <p className="text-[var(--gl-text-muted)] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-[var(--gl-primary)] font-semibold hover:underline"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  if (!sessionId) {
    return (
      <div className="gl-screen flex items-center justify-center bg-[var(--gl-bg)]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--gl-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[var(--gl-text-muted)]">코칭을 준비하고 있어요...</p>
        </div>
      </div>
    )
  }

  return (
    <GloryChat
      sessionId={sessionId}
      initialMessage={initialMessage}
      initialStage={initialStage}
    />
  )
}

export default function GloryCoachingPage() {
  return (
    <AuthGuard>
      <GloryCoachingContent />
    </AuthGuard>
  )
}
