'use client'

import { motion } from 'framer-motion'
import { WORLD_TOKENS, MapNode as MapNodeType } from './WorldTokens'
import { Brain } from 'lucide-react'

interface MapNodeProps {
  node: MapNodeType
  isActive: boolean
  onClick?: () => void
  onEnter?: () => void
}

export function MapNode({ node, isActive, onClick, onEnter }: MapNodeProps) {
  const world = WORLD_TOKENS[node.worldKey]

  // 노드 크기 (더 크게)
  const size = isActive ? 110 : 90

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative flex items-center justify-center
        rounded-full transition-all cursor-pointer
      `}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {/* 배경 글로우 (Active 노드만) */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${world.bgGlow}, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* 외곽 링 */}
      <div
        className={`
          absolute inset-0 rounded-full border-[3px]
          ${isActive
            ? 'border-white bg-white/20'
            : 'border-white/20 bg-white/5'
          }
        `}
        style={{
          borderColor: isActive ? world.color : undefined,
          boxShadow: isActive ? `0 0 20px ${world.bgGlow}` : undefined,
        }}
      />

      {/* 내부 원 */}
      <div
        className={`
          relative z-10 flex items-center justify-center rounded-full
          ${isActive ? 'w-20 h-20' : 'w-16 h-16'}
        `}
        style={{
          backgroundColor: isActive
            ? world.color
            : 'rgba(255,255,255,0.08)',
        }}
        onClick={(e) => {
          if (isActive && onEnter) {
            e.stopPropagation()
            onEnter()
          }
        }}
      >
        {isActive ? (
          <span className="text-white text-sm font-bold">입장하기</span>
        ) : node.worldKey === 'cognition' ? (
          <Brain className="w-8 h-8 text-white" />
        ) : (
          <span className="text-2xl">
            {world.icon}
          </span>
        )}
      </div>

      {/* Active 펄스 링 */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: world.color }}
          animate={{
            scale: [1, 1.4],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

    </motion.button>
  )
}
