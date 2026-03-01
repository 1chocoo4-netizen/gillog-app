'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useUserData } from '@/lib/UserDataProvider'

interface Props {
  realAction: string
  sessionId: string
  onComplete: () => void
}

const AREA_CATEGORIES = [
  { value: 'cognition', label: '인지', icon: '🧠', color: '#8b5cf6' },
  { value: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { value: 'habit', label: '습관', icon: '📚', color: '#22c55e' },
  { value: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { value: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { value: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

export default function ActionRegistration({ realAction, sessionId, onComplete }: Props) {
  const router = useRouter()
  const { executions, saveExecutions } = useUserData()
  const [actionTitle, setActionTitle] = useState(realAction || '')
  const [areaKey, setAreaKey] = useState('attitude')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const handleSubmit = async () => {
    if (!actionTitle.trim() || isSubmitting) return
    setIsSubmitting(true)

    try {
      // 1. UserData.executions에 실행 항목 추가
      const newExecution = {
        id: `glory-${Date.now()}-${areaKey}`,
        areaKey,
        text: actionTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        isDaily: false,
        lessonTitle: 'THE GLORY 코칭',
      }

      saveExecutions([...executions, newExecution])

      // 2. 서버에도 세션 realAction 업데이트
      await fetch('/api/coaching/glory/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          actionTitle: actionTitle.trim(),
          category: areaKey,
        }),
      }).catch(() => {})

      setIsRegistered(true)
    } catch {
      // 에러 시에도 로컬은 저장됨
      setIsRegistered(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isRegistered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[var(--gl-success)]/10 border border-[var(--gl-success)]/20 rounded-2xl p-5 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="text-3xl mb-2"
        >
          ✅
        </motion.div>
        <p className="text-sm font-semibold text-[var(--gl-text)] mb-3">실행이 등록되었습니다!</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push('/checkin')}
            className="px-4 py-2 bg-[var(--gl-primary)] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            체크인에서 확인하기
          </button>
          <button
            onClick={onComplete}
            className="px-4 py-2 text-sm text-[var(--gl-text-muted)] font-semibold hover:text-[var(--gl-text)] transition-colors"
          >
            돌아가기
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-2xl p-5"
    >
      <h4 className="text-sm font-bold text-[var(--gl-text)] mb-4">⚡ 오늘의 실행 등록</h4>

      {/* 실행 제목 */}
      <input
        type="text"
        value={actionTitle}
        onChange={(e) => setActionTitle(e.target.value)}
        placeholder="실행할 내용을 입력하세요"
        className="w-full bg-[var(--gl-bg)] border border-[var(--gl-border)] rounded-xl px-4 py-3 text-sm text-[var(--gl-text)] placeholder:text-[var(--gl-text-muted)] focus:outline-none focus:border-[var(--gl-primary)] transition-colors mb-3"
      />

      {/* 성장 영역 선택 */}
      <p className="text-xs text-[var(--gl-text-muted)] mb-2 font-semibold">성장 영역</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {AREA_CATEGORIES.map(area => (
          <button
            key={area.value}
            onClick={() => setAreaKey(area.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              areaKey === area.value
                ? 'text-white shadow-md'
                : 'bg-[var(--gl-bg)] text-[var(--gl-text-muted)] border border-[var(--gl-border)]'
            }`}
            style={areaKey === area.value ? { backgroundColor: area.color } : undefined}
          >
            <span>{area.icon}</span>
            {area.label}
          </button>
        ))}
      </div>

      {/* 등록 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!actionTitle.trim() || isSubmitting}
        className="w-full bg-[var(--gl-primary)] text-white rounded-xl py-3 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        {isSubmitting ? '등록 중...' : '실행 등록하기'}
      </button>
    </motion.div>
  )
}
