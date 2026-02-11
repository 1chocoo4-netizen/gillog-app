'use client'

import { motion } from 'framer-motion'
import { WORLD_TOKENS, WorldKey } from './WorldTokens'

interface QuestBannerProps {
  selectedWorld: WorldKey
  onWorldChange: (world: WorldKey) => void
}

export function QuestBanner({ selectedWorld, onWorldChange }: QuestBannerProps) {
  const worlds = Object.values(WORLD_TOKENS)

  return (
    <div className="px-2 py-2">
      <div className="flex justify-center gap-1">
        {worlds.map((world) => {
          const isSelected = world.key === selectedWorld
          return (
            <motion.button
              key={world.key}
              onClick={() => onWorldChange(world.key as WorldKey)}
              className={`
                relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg
                font-medium text-xs whitespace-nowrap transition-all
                ${isSelected
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/60'
                }
              `}
              style={{
                backgroundColor: isSelected ? world.color : 'rgba(255,255,255,0.05)',
                boxShadow: isSelected ? `0 2px 12px ${world.bgGlow}` : undefined,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <span className="text-sm">{world.icon}</span>
              <span>{world.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
