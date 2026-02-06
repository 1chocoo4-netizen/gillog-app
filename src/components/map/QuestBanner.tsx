'use client'

import { motion } from 'framer-motion'
import { WORLD_TOKENS, WorldKey } from './WorldTokens'

interface QuestBannerProps {
  selectedWorld: WorldKey
  onWorldChange: (world: WorldKey) => void
}

export function QuestBanner({ selectedWorld, onWorldChange }: QuestBannerProps) {
  const worlds = Object.values(WORLD_TOKENS)
  const current = WORLD_TOKENS[selectedWorld]

  return (
    <div className="relative px-4 py-3">
      {/* 월드 선택 탭 - 가운데 정렬 */}
      <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide pb-2">
        {worlds.map((world) => {
          const isSelected = world.key === selectedWorld
          return (
            <motion.button
              key={world.key}
              onClick={() => onWorldChange(world.key as WorldKey)}
              className={`
                relative flex items-center px-4 py-2.5 rounded-xl
                font-medium text-sm whitespace-nowrap transition-all
                ${isSelected
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/70 bg-white/5'
                }
              `}
              style={{
                backgroundColor: isSelected ? world.color : undefined,
                boxShadow: isSelected ? `0 4px 20px ${world.bgGlow}` : undefined,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <span>{world.label}</span>

              {/* 선택된 월드 인디케이터 */}
              {isSelected && (
                <motion.div
                  layoutId="worldIndicator"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${world.color}20, transparent)`,
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
