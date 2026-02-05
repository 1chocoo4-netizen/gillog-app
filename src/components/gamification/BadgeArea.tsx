// MVP에서는 더미 배지 표시
// 나중에 실제 배지 시스템으로 확장

const DUMMY_BADGES = [
  { id: '1', name: '첫 발걸음', icon: '🌱', earned: true },
  { id: '2', name: '3일 연속', icon: '🔥', earned: true },
  { id: '3', name: '7일 연속', icon: '⭐', earned: false },
  { id: '4', name: '퀘스트 마스터', icon: '🏆', earned: false },
  { id: '5', name: '성찰의 달인', icon: '🧠', earned: false },
]

export function BadgeArea() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {DUMMY_BADGES.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center p-3 rounded-lg transition ${
              badge.earned
                ? 'bg-yellow-50'
                : 'bg-gray-100 opacity-50 grayscale'
            }`}
            title={badge.name}
          >
            <span className="text-3xl">{badge.icon}</span>
            <span
              className={`text-xs mt-1 ${
                badge.earned ? 'text-gray-700' : 'text-gray-400'
              }`}
            >
              {badge.name}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 text-center">
        배지를 모아 성장을 기록하세요!
      </p>
    </div>
  )
}
