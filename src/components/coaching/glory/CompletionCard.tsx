'use client'

import { motion } from 'framer-motion'

interface Summary {
  thankful: string
  happy: string
  emotional: string
  grounded: string
  luminous: string
  options: string
  realAction: string
  meaning: string
}

interface Props {
  summary: Summary
  encouragement: string
  quote: string
  quoteAuthor: string
}

const journeyItems = [
  { key: 'thankful', icon: '💛', label: '감사' },
  { key: 'happy', icon: '😊', label: '행복' },
  { key: 'grounded', icon: '🌱', label: '현재' },
  { key: 'luminous', icon: '✨', label: '목표' },
  { key: 'realAction', icon: '⚡', label: '실행' },
  { key: 'meaning', icon: '💎', label: '의미' },
] as const

export default function CompletionCard({ summary, encouragement, quote, quoteAuthor }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-4"
    >
      {/* 완료 헤더 */}
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-4xl mb-2"
        >
          🎉
        </motion.div>
        <h3 className="text-lg font-bold text-[var(--gl-text)]">코칭 완료!</h3>
      </div>

      {/* 코칭 여정 요약 */}
      <div className="bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-2xl p-5">
        <h4 className="text-sm font-bold text-[var(--gl-text)] mb-3">오늘의 코칭 여정</h4>
        <div className="space-y-2.5">
          {journeyItems.map(item => {
            const value = summary[item.key]
            if (!value) return null
            return (
              <div key={item.key} className="flex items-start gap-2.5">
                <span className="text-sm flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <span className="text-xs font-semibold text-[var(--gl-text-muted)]">{item.label}</span>
                  <p className="text-sm text-[var(--gl-text)] leading-relaxed">{value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 격려 메시지 */}
      {encouragement && (
        <div className="bg-[var(--gl-primary)]/10 border border-[var(--gl-primary)]/20 rounded-2xl p-5">
          <h4 className="text-sm font-bold text-[var(--gl-primary)] mb-2">💬 코치의 한마디</h4>
          <p className="text-sm text-[var(--gl-text)] leading-relaxed">{encouragement}</p>
        </div>
      )}

      {/* 명언 */}
      {quote && (
        <div className="bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-2xl p-5">
          <h4 className="text-sm font-bold text-[var(--gl-text-muted)] mb-2">📖 오늘의 명언</h4>
          <blockquote className="text-sm text-[var(--gl-text)] leading-relaxed italic">
            &ldquo;{quote}&rdquo;
          </blockquote>
          {quoteAuthor && (
            <p className="text-xs text-[var(--gl-text-muted)] mt-2 text-right">— {quoteAuthor}</p>
          )}
        </div>
      )}
    </motion.div>
  )
}
