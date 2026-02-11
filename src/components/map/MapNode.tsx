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

  const outerSize = isActive ? 88 : 72
  const innerSize = isActive ? 72 : 58

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={isActive ? onEnter : onClick}
        className="relative flex items-center justify-center rounded-full cursor-pointer"
        style={{ width: outerSize, height: outerSize }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        {/* 글로우 배경 (Active) */}
        {isActive && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: outerSize + 24,
              height: outerSize + 24,
              background: `radial-gradient(circle, ${world.bgGlow}, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.7, 0.35, 0.7],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* 외곽 원 - 3D 느낌의 두꺼운 테두리 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: isActive ? `3px solid ${world.color}` : '3px solid rgba(255,255,255,0.1)',
            boxShadow: isActive
              ? `0 4px 20px ${world.bgGlow}, inset 0 2px 8px rgba(255,255,255,0.1)`
              : 'inset 0 2px 4px rgba(255,255,255,0.05)',
            background: isActive
              ? `linear-gradient(145deg, rgba(255,255,255,0.12), rgba(0,0,0,0.2))`
              : 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(0,0,0,0.15))',
          }}
        />

        {/* 내부 원 */}
        <div
          className="relative z-10 flex items-center justify-center rounded-full"
          style={{
            width: innerSize,
            height: innerSize,
            background: isActive
              ? `linear-gradient(145deg, ${world.color}, ${world.color}cc)`
              : 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
            boxShadow: isActive
              ? `0 4px 12px ${world.bgGlow}`
              : 'none',
          }}
        >
          {isActive ? (
            <div className="flex flex-col items-center">
              <span className="text-2xl leading-none mb-0.5">{world.icon}</span>
              <span className="text-white text-[10px] font-bold opacity-90">입장</span>
            </div>
          ) : (
            <span className="text-2xl">{world.icon}</span>
          )}
        </div>

        {/* 펄스 링 (Active) */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${world.color}` }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>

      {/* 라벨 */}
      <span
        className="text-xs font-semibold"
        style={{ color: isActive ? world.color : 'rgba(255,255,255,0.35)' }}
      >
        {world.label}
      </span>
    </div>
  )
}
