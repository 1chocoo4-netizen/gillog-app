'use client'

import { motion } from 'framer-motion'
import { WORLD_TOKENS, MapNode as MapNodeType } from './WorldTokens'
import { Check, Star } from 'lucide-react'

interface MapNodeProps {
  node: MapNodeType
  isActive: boolean
  onClick?: () => void
}

export function MapNode({ node, isActive, onClick }: MapNodeProps) {
  const world = WORLD_TOKENS[node.worldKey]
  const isCompleted = node.status === 'completed'

  // 노드 크기 (더 크게)
  const size = isActive ? 88 : 72

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
          ${isCompleted
            ? 'border-white/30 bg-white/10'
            : isActive
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
          ${isActive ? 'w-16 h-16' : 'w-12 h-12'}
        `}
        style={{
          backgroundColor: isCompleted
            ? 'rgba(255,255,255,0.15)'
            : isActive
              ? world.color
              : 'rgba(255,255,255,0.08)',
        }}
      >
        {isCompleted ? (
          <Check className="w-5 h-5 text-white/60" />
        ) : (
          <span className={`${isActive ? 'text-2xl' : 'text-xl'}`}>
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

      {/* XP 라벨 (Active만) */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 bg-white/10 rounded-full"
        >
          <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
          <span className="text-xs text-white/80 font-medium">+{node.xp}</span>
        </motion.div>
      )}
    </motion.button>
  )
}
