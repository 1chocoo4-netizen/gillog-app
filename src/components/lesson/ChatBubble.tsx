'use client'

import { motion } from 'framer-motion'

interface ChatBubbleProps {
  message: string
  isCoach?: boolean
  coachName?: string
  worldColor?: string
  delay?: number
}

export function ChatBubble({
  message,
  isCoach = true,
  coachName,
  worldColor = 'var(--gl-primary)',
  delay = 0
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className={`flex ${isCoach ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div
        className={`
          max-w-[85%] rounded-2xl px-4 py-3
          ${isCoach
            ? 'bg-[var(--gl-bg-card)] border border-[var(--gl-border)] rounded-tl-md'
            : 'text-white rounded-tr-md'
          }
        `}
        style={!isCoach ? { backgroundColor: worldColor } : {}}
      >
        {isCoach && coachName && (
          <p
            className="text-xs font-medium mb-1"
            style={{ color: worldColor }}
          >
            {coachName}
          </p>
        )}
        <p className={`text-sm leading-relaxed ${isCoach ? 'text-[var(--gl-text)]' : 'text-white'}`}>
          {message}
        </p>
      </div>
    </motion.div>
  )
}
