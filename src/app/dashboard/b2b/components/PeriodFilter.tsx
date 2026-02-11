'use client'

import type { Milestone } from '@/lib/b2b/types'

const MILESTONES: { value: Milestone; label: string }[] = [
  { value: '5', label: '실행 5개' },
  { value: '100', label: '실행 100개' },
  { value: '500', label: '실행 500개' },
  { value: '1000', label: '실행 1,000개' },
]

interface MilestoneFilterProps {
  value: Milestone
  onChange: (milestone: Milestone) => void
  maxMilestone?: Milestone
}

/** 실행 횟수에 따라 활성화 가능한 마일스톤을 결정 */
const MILESTONE_ORDER: Milestone[] = ['5', '100', '500', '1000']

export function MilestoneFilter({ value, onChange, maxMilestone }: MilestoneFilterProps) {
  const maxIdx = maxMilestone ? MILESTONE_ORDER.indexOf(maxMilestone) : MILESTONE_ORDER.length - 1

  return (
    <div className="flex gap-1 bg-gray-900 rounded-lg p-1 border border-gray-800">
      {MILESTONES.map((m, idx) => {
        const disabled = idx > maxIdx
        return (
          <button
            key={m.value}
            onClick={() => !disabled && onChange(m.value)}
            disabled={disabled}
            className={`px-3 py-1.5 text-sm rounded-md transition-all ${
              disabled
                ? 'text-gray-600 cursor-not-allowed'
                : value === m.value
                  ? 'bg-indigo-500/20 text-indigo-300 font-medium'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
            }`}
          >
            {m.label}
          </button>
        )
      })}
    </div>
  )
}
