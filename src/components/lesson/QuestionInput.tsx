'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface QuestionInputProps {
  type: 'text' | 'choice' | 'scale'
  options?: string[]
  worldColor?: string
  onSubmit: (answer: string) => void
  disabled?: boolean
}

export function QuestionInput({
  type,
  options = [],
  worldColor = 'var(--gl-primary)',
  onSubmit,
  disabled = false
}: QuestionInputProps) {
  const [textValue, setTextValue] = useState('')
  const [scaleValue, setScaleValue] = useState(3)

  const handleTextSubmit = () => {
    if (textValue.trim()) {
      onSubmit(textValue.trim())
      setTextValue('')
    }
  }

  const handleChoiceSelect = (choice: string) => {
    onSubmit(choice)
  }

  const handleScaleSubmit = () => {
    onSubmit(String(scaleValue))
  }

  if (type === 'text') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
          placeholder="여기에 답변을 입력하세요..."
          disabled={disabled}
          className="
            flex-1 px-4 py-3 rounded-xl
            bg-[var(--gl-bg-card)] border border-[var(--gl-border)]
            text-[var(--gl-text)] placeholder-[var(--gl-text-muted)]
            focus:outline-none focus:ring-2 focus:ring-[var(--gl-primary)]/50
            disabled:opacity-50
          "
        />
        <Button
          variant="primary"
          onClick={handleTextSubmit}
          disabled={disabled || !textValue.trim()}
          className="px-4"
        >
          <Send className="w-5 h-5" />
        </Button>
      </motion.div>
    )
  }

  if (type === 'choice') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        {options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleChoiceSelect(option)}
            disabled={disabled}
            className="
              w-full text-left px-4 py-3 rounded-xl
              bg-[var(--gl-bg-card)] border border-[var(--gl-border)]
              text-[var(--gl-text)] font-medium
              hover:border-[var(--gl-primary)] hover:bg-[var(--gl-primary)]/5
              active:scale-[0.98] transition-all
              disabled:opacity-50 disabled:pointer-events-none
            "
          >
            {option}
          </motion.button>
        ))}
      </motion.div>
    )
  }

  if (type === 'scale') {
    const scaleLabels = ['매우 낮음', '낮음', '보통', '높음', '매우 높음']
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex justify-between px-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => setScaleValue(value)}
              disabled={disabled}
              className={`
                w-12 h-12 rounded-full font-bold text-lg
                transition-all duration-200
                ${scaleValue === value
                  ? 'text-white scale-110 shadow-lg'
                  : 'bg-[var(--gl-bg-card)] border border-[var(--gl-border)] text-[var(--gl-text-muted)] hover:border-[var(--gl-primary)]'
                }
                disabled:opacity-50 disabled:pointer-events-none
              `}
              style={scaleValue === value ? { backgroundColor: worldColor } : {}}
            >
              {value}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-[var(--gl-text-muted)]">
          {scaleLabels[scaleValue - 1]}
        </p>
        <Button
          variant="primary"
          onClick={handleScaleSubmit}
          disabled={disabled}
          fullWidth
        >
          선택 완료
        </Button>
      </motion.div>
    )
  }

  return null
}
