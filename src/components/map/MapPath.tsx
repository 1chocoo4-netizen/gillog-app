'use client'

import { motion } from 'framer-motion'

interface MapPathProps {
  startX: number
  startY: number
  endX: number
  endY: number
  isCompleted: boolean
  index: number
}

export function MapPath({ startX, startY, endX, endY, isCompleted, index }: MapPathProps) {
  // 곡선 경로 계산 (S자 커브)
  const midY = (startY + endY) / 2
  const curveOffset = (index % 2 === 0 ? 1 : -1) * 40

  const pathD = `
    M ${startX} ${startY}
    Q ${startX + curveOffset} ${midY}, ${endX} ${endY}
  `

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`pathGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isCompleted ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)'} />
          <stop offset="100%" stopColor={isCompleted ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'} />
        </linearGradient>
      </defs>

      {/* 점선 경로 */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#pathGradient-${index})`}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="8 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.05,
          ease: 'easeOut',
        }}
      />
    </svg>
  )
}
