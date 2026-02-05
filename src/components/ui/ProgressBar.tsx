'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0-100
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'world'
  worldColor?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  animated?: boolean
  className?: string
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'default',
  worldColor,
  size = 'md',
  showLabel = false,
  label,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const variants = {
    default: 'bg-[var(--gl-primary)]',
    success: 'bg-[var(--gl-success)]',
    warning: 'bg-[var(--gl-warning)]',
    world: '',
  }

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const trackColor = 'bg-[var(--gl-border)]'

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-sm font-medium text-[var(--gl-text)]">
            {label}
          </span>
          {showLabel && (
            <span className="text-sm text-[var(--gl-text-muted)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`
          w-full ${trackColor} rounded-full overflow-hidden
          ${sizes[size]}
        `}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: animated ? 0.5 : 0,
            ease: 'easeOut',
          }}
          className={`
            h-full rounded-full
            ${variant !== 'world' ? variants[variant] : ''}
          `}
          style={variant === 'world' && worldColor ? { backgroundColor: worldColor } : {}}
        />
      </div>
    </div>
  )
}

// 레슨 진행 상단 바 (단계 표시)
interface StepProgressProps {
  current: number
  total: number
  className?: string
}

export function StepProgress({ current, total, className = '' }: StepProgressProps) {
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: i * 0.05 }}
          className={`
            h-1.5 flex-1 rounded-full origin-left
            ${i < current
              ? 'bg-[var(--gl-primary)]'
              : i === current
                ? 'bg-[var(--gl-primary-light)]'
                : 'bg-[var(--gl-border)]'
            }
          `}
        />
      ))}
    </div>
  )
}
