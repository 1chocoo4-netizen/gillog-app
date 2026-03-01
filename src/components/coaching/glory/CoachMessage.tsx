'use client'

import { motion } from 'framer-motion'

interface Props {
  content: string
  isTyping?: boolean
}

export default function CoachMessage({ content, isTyping }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex items-start gap-2.5 max-w-[85%]"
    >
      {/* 코치 아바타 */}
      <div className="w-8 h-8 rounded-full bg-[var(--gl-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-sm">G</span>
      </div>

      {/* 말풍선 */}
      <div className="bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-2xl rounded-tl-md px-4 py-3">
        {isTyping ? (
          <div className="flex items-center gap-1 py-1 px-1">
            <span className="w-2 h-2 bg-[var(--gl-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-[var(--gl-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-[var(--gl-text-muted)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <p className="text-sm text-[var(--gl-text)] leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        )}
      </div>
    </motion.div>
  )
}
