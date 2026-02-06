'use client'

import { motion } from 'framer-motion'

interface MapPathProps {
  startX: number  // 퍼센트 (0-100)
  startY: number  // 픽셀
  endX: number    // 퍼센트 (0-100)
  endY: number    // 픽셀
  index: number
}

export function MapPath({ startX, startY, endX, endY, index }: MapPathProps) {
  // 두 노드 사이에 점들 생성
  const dotCount = 5
  const dots = []

  for (let i = 1; i <= dotCount; i++) {
    const t = i / (dotCount + 1)

    // 직선 보간
    const x = startX + (endX - startX) * t
    const y = startY + (endY - startY) * t

    dots.push({ x, y, delay: i * 0.05 })
  }

  return (
    <>
      {dots.map((dot, i) => (
        <motion.div
          key={`dot-${index}-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/25 pointer-events-none"
          style={{
            left: `${dot.x}%`,
            top: dot.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1 + dot.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  )
}
