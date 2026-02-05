'use client'

import { motion } from 'framer-motion'
import { forwardRef, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'ghost' | 'world'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  worldColor?: string
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      worldColor,
      isLoading,
      fullWidth,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center font-semibold
      transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      select-none
    `

    const variants = {
      primary: `
        bg-[var(--gl-primary)] text-white
        hover:bg-[var(--gl-primary-dark)]
        focus-visible:ring-[var(--gl-primary)]
        shadow-md hover:shadow-lg
        active:scale-[0.98]
      `,
      secondary: `
        bg-[var(--gl-bg-card)] text-[var(--gl-text)]
        border-2 border-[var(--gl-border)]
        hover:border-[var(--gl-primary)] hover:text-[var(--gl-primary)]
        focus-visible:ring-[var(--gl-primary)]
      `,
      success: `
        bg-[var(--gl-success)] text-white
        hover:bg-[var(--gl-success-dark)]
        focus-visible:ring-[var(--gl-success)]
        shadow-md hover:shadow-lg
        active:scale-[0.98]
      `,
      ghost: `
        bg-transparent text-[var(--gl-text-muted)]
        hover:bg-[var(--gl-border)] hover:text-[var(--gl-text)]
        focus-visible:ring-[var(--gl-primary)]
      `,
      world: `
        text-white shadow-md hover:shadow-lg
        active:scale-[0.98]
        focus-visible:ring-white
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-base rounded-xl gap-2',
      lg: 'px-6 py-3.5 text-lg rounded-xl gap-2',
      xl: 'px-8 py-4 text-xl rounded-2xl gap-3', // 큰 CTA용
    }

    const worldStyle = variant === 'world' && worldColor
      ? { backgroundColor: worldColor }
      : {}

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        style={worldStyle}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>잠시만요...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
