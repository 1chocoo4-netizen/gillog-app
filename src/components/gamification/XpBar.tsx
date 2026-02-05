interface XpBarProps {
  current: number
  max: number
  level: number
}

export function XpBar({ current, max, level }: XpBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600">
          레벨 {level}
        </span>
        <span className="text-sm text-gray-500">
          {current} / {max} XP
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-right">
        다음 레벨까지 {max - current} XP
      </p>
    </div>
  )
}
