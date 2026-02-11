'use client'

import { motion } from 'framer-motion'
import { WORLD_TOKENS, MapNode as MapNodeType } from './WorldTokens'

interface MapNodeProps {
  node: MapNodeType
  isActive: boolean
  onClick?: () => void
  onEnter?: () => void
}

export function MapNode({ node, isActive, onClick, onEnter }: MapNodeProps) {
  const world = WORLD_TOKENS[node.worldKey]

  const size = isActive ? 80 : 64

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.button
        onClick={onClick}
        className="relative flex items-center justify-center rounded-full transition-all cursor-pointer"
        style={{ width: size, height: size }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {/* 배경 글로우 (Active만) */}
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
            absolute inset-0 rounded-full border-2
            ${isActive
              ? 'bg-white/15'
              : 'border-white/15 bg-white/5'
            }
          `}
          style={{
            borderColor: isActive ? world.color : undefined,
            boxShadow: isActive ? `0 0 16px ${world.bgGlow}` : undefined,
          }}
        />

        {/* 내부 원 */}
        <div
          className={`
            relative z-10 flex items-center justify-center rounded-full
            ${isActive ? 'w-14 h-14' : 'w-11 h-11'}
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
            <span className="text-white text-[11px] font-bold">입장</span>
          ) : (
            <span className="text-xl">{world.icon}</span>
          )}
        </div>

        {/* Active 펄스 링 */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: world.color }}
            animate={{
              scale: [1, 1.35],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.button>

      {/* 월드 라벨 */}
      <span
        className={`text-[11px] font-medium ${isActive ? 'text-white' : 'text-white/40'}`}
        style={{ color: isActive ? world.color : undefined }}
      >
        {world.label}
      </span>
    </div>
  )
}
