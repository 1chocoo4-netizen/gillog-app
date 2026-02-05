interface StreakBadgeProps {
  days: number
}

export function StreakBadge({ days }: StreakBadgeProps) {
  const isOnFire = days >= 7

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-full ${
        isOnFire
          ? 'bg-gradient-to-r from-orange-400 to-red-500 text-white'
          : 'bg-gray-100 text-gray-700'
      }`}
    >
      <span className="text-xl">{isOnFire ? '🔥' : '📅'}</span>
      <span className="font-bold">{days}일</span>
      {isOnFire && <span className="text-xs">연속!</span>}
    </div>
  )
}
