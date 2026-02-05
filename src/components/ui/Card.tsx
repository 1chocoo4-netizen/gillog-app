'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef } from 'react'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'outlined' | 'world'
  worldColor?: string
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      worldColor,
      hoverable = false,
      padding = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      rounded-[var(--gl-radius-lg)]
      transition-all duration-200
    `

    const variants = {
      default: `
        bg-[var(--gl-bg-card)]
        shadow-[var(--gl-shadow-sm)]
      `,
      elevated: `
        bg-[var(--gl-bg-card)]
        shadow-[var(--gl-shadow-md)]
      `,
      outlined: `
        bg-[var(--gl-bg-card)]
        border-2 border-[var(--gl-border)]
      `,
      world: `
        text-white
        shadow-[var(--gl-shadow-md)]
      `,
    }

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    const hoverStyles = hoverable
      ? 'cursor-pointer hover:shadow-[var(--gl-shadow-lg)] hover:-translate-y-0.5'
      : ''

    const worldStyle = variant === 'world' && worldColor
      ? { backgroundColor: worldColor }
      : {}

    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -2 } : undefined}
        whileTap={hoverable ? { scale: 0.98 } : undefined}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${paddings[padding]}
          ${hoverStyles}
          ${className}
        `}
        style={worldStyle}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

// 카드 헤더/바디/푸터 서브컴포넌트
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-3 ${className}`}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-3 border-t border-[var(--gl-border)] ${className}`}>
      {children}
    </div>
  )
}
