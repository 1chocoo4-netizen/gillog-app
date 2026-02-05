const GROWTH_AREAS = [
  { key: 'attitude', label: '태도', icon: '🎯', color: 'bg-red-500' },
  { key: 'habit', label: '습관', icon: '🔄', color: 'bg-orange-500' },
  { key: 'selfControl', label: '자기조절', icon: '🧘', color: 'bg-yellow-500' },
  { key: 'relationship', label: '관계', icon: '🤝', color: 'bg-green-500' },
  { key: 'execution', label: '실행력', icon: '⚡', color: 'bg-blue-500' },
  { key: 'expression', label: '표현', icon: '💬', color: 'bg-purple-500' },
]

export default function DashboardPage() {
  // 더미 데이터
  const stats = {
    attitude: 3.2,
    habit: 2.8,
    selfControl: 2.5,
    relationship: 3.5,
    execution: 2.1,
    expression: 3.0,
  }

  const weeklyProgress = {
    totalXp: 320,
    questsCompleted: 12,
    sessionsAttended: 2,
    checkins: 5,
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-800">성장 리포트</h1>
          <p className="text-sm text-gray-500">이번 주 나의 성장 현황</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* 주간 요약 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            이번 주 요약
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-indigo-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-indigo-600">
                {weeklyProgress.totalXp}
              </p>
              <p className="text-sm text-gray-600">획득 XP</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {weeklyProgress.questsCompleted}
              </p>
              <p className="text-sm text-gray-600">완료 퀘스트</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">
                {weeklyProgress.sessionsAttended}
              </p>
              <p className="text-sm text-gray-600">코칭 세션</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-orange-600">
                {weeklyProgress.checkins}
              </p>
              <p className="text-sm text-gray-600">체크인</p>
            </div>
          </div>
        </section>

        {/* 성장 지표 차트 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            성장 지표 (0~4)
          </h2>
          <div className="space-y-4">
            {GROWTH_AREAS.map(({ key, label, icon, color }) => {
              const value = stats[key as keyof typeof stats]
              const percentage = (value / 4) * 100
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-700">
                      {icon} {label}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {value.toFixed(1)} / 4
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* 레벨 설명 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            레벨 가이드
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold">
                0
              </span>
              <span className="text-gray-600">시작 단계 - 아직 인식하지 못함</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center font-bold text-red-600">
                1
              </span>
              <span className="text-gray-600">인식 단계 - 필요성을 알지만 실천 어려움</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center font-bold text-yellow-600">
                2
              </span>
              <span className="text-gray-600">시도 단계 - 가끔 실천, 일관성 부족</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                3
              </span>
              <span className="text-gray-600">습관 단계 - 대부분 실천, 가끔 흔들림</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                4
              </span>
              <span className="text-gray-600">마스터 단계 - 자연스럽게 체화됨</span>
            </div>
          </div>
        </section>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex justify-around py-3">
          <a href="/app" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <span className="text-xl">🏠</span>
            <span className="text-xs mt-1">홈</span>
          </a>
          <a href="/checkin" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <span className="text-xl">✅</span>
            <span className="text-xs mt-1">체크인</span>
          </a>
          <a href="/session/new" className="flex flex-col items-center text-gray-500 hover:text-indigo-600">
            <span className="text-xl">🎯</span>
            <span className="text-xs mt-1">코칭</span>
          </a>
          <a href="/dashboard" className="flex flex-col items-center text-indigo-600">
            <span className="text-xl">📊</span>
            <span className="text-xs mt-1">리포트</span>
          </a>
        </div>
      </nav>
    </main>
  )
}
