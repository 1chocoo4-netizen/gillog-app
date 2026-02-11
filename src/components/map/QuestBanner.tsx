'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { WORLD_TOKENS, WorldKey } from './WorldTokens'

interface QuestBannerProps {
  selectedWorld: WorldKey
  onWorldChange: (world: WorldKey) => void
}

export function QuestBanner({ selectedWorld, onWorldChange }: QuestBannerProps) {
  const worlds = Object.values(WORLD_TOKENS)
  const scrollRef = useRef<HTMLDivElement>(null)

  // 선택된 탭이 보이도록 자동 스크롤
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const activeBtn = container.querySelector('[data-active="true"]') as HTMLElement
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [selectedWorld])

  return (
    <div
      ref={scrollRef}
      className="flex gap-1.5 px-3 py-2 overflow-x-auto scrollbar-hide"
    >
      {worlds.map((world) => {
        const isSelected = world.key === selectedWorld
        return (
          <motion.button
            key={world.key}
            data-active={isSelected}
            onClick={() => onWorldChange(world.key as WorldKey)}
            className={`
              flex items-center gap-1.5 px-3 py-2 rounded-xl
              font-semibold text-[13px] whitespace-nowrap transition-all shrink-0
              ${isSelected ? 'text-white' : 'text-white/40'}
            `}
            style={{
              backgroundColor: isSelected ? world.color : 'rgba(255,255,255,0.04)',
              boxShadow: isSelected ? `0 2px 16px ${world.bgGlow}` : undefined,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-base">{world.icon}</span>
            <span>{world.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
