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
  // 두 점 사이에 점들 생성
  const dotCount = 6
  const dots = []

  for (let i = 1; i <= dotCount; i++) {
    const t = i / (dotCount + 1)
    // 곡선 보간 (quadratic bezier 근사)
    const curveOffset = (index % 2 === 0 ? 1 : -1) * 8
    const midX = (startX + endX) / 2 + curveOffset

    // Quadratic bezier 공식
    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX
    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ((startY + endY) / 2) + t * t * endY

    dots.push({ x, y, delay: i * 0.05 })
  }

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={3}
          fill={isCompleted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1 + dot.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  )
}
