'use client'

import { motion } from 'framer-motion'

interface Props {
  content: string
}

export default function UserMessage({ content }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex justify-end"
    >
      <div className="max-w-[80%] bg-[var(--gl-primary)] text-white rounded-2xl rounded-tr-md px-4 py-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </motion.div>
  )
}
