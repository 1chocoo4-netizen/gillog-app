'use client'

import { STAGE_GROUPS, STAGE_ORDER } from '@/lib/coaching/glory-stages'
import type { GloryStage } from '@/lib/coaching/glory-stages'

interface Props {
  currentStage: GloryStage
}

export default function StageIndicator({ currentStage }: Props) {
  const currentIdx = STAGE_ORDER.indexOf(currentStage)

  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4">
      {STAGE_GROUPS.map((group, gi) => {
        const groupStages = group.stages as readonly string[]
        const groupStartIdx = STAGE_ORDER.indexOf(groupStages[0] as GloryStage)
        const groupEndIdx = STAGE_ORDER.indexOf(groupStages[groupStages.length - 1] as GloryStage)

        const isActive = currentIdx >= groupStartIdx && currentIdx <= groupEndIdx
        const isCompleted = currentIdx > groupEndIdx
        const isPending = currentIdx < groupStartIdx

        return (
          <div key={group.key} className="flex items-center gap-2">
            {gi > 0 && (
              <div
                className={`w-6 h-[2px] rounded transition-colors duration-500 ${
                  isCompleted || isActive
                    ? 'bg-[var(--gl-primary)]'
                    : 'bg-[var(--gl-border)]'
                }`}
              />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isCompleted
                    ? 'bg-[var(--gl-primary)] text-white'
                    : isActive
                    ? 'bg-[var(--gl-primary)] text-white ring-2 ring-[var(--gl-primary)]/30 ring-offset-1 ring-offset-[var(--gl-bg)]'
                    : 'bg-[var(--gl-bg-card)] text-[var(--gl-text-muted)] border border-[var(--gl-border)]'
                }`}
              >
                {isCompleted ? '✓' : gi + 1}
              </div>
              <span
                className={`text-xs font-semibold transition-colors duration-300 ${
                  isActive
                    ? 'text-[var(--gl-primary)]'
                    : isPending
                    ? 'text-[var(--gl-text-muted)]'
                    : 'text-[var(--gl-text-secondary)]'
                }`}
              >
                {group.label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
