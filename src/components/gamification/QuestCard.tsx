'use client'

interface Quest {
  id: string
  title: string
  category: string
  xpReward: number
  status: 'pending' | 'in_progress' | 'completed' | 'skipped'
}

interface QuestCardProps {
  quest: Quest
}

const CATEGORY_CONFIG: Record<string, { icon: string; color: string }> = {
  attitude: { icon: '🎯', color: 'bg-red-100 text-red-600' },
  habit: { icon: '🔄', color: 'bg-orange-100 text-orange-600' },
  selfControl: { icon: '🧘', color: 'bg-yellow-100 text-yellow-600' },
  relationship: { icon: '🤝', color: 'bg-green-100 text-green-600' },
  execution: { icon: '⚡', color: 'bg-blue-100 text-blue-600' },
  expression: { icon: '💬', color: 'bg-purple-100 text-purple-600' },
}

export function QuestCard({ quest }: QuestCardProps) {
  const config = CATEGORY_CONFIG[quest.category] || {
    icon: '📋',
    color: 'bg-gray-100 text-gray-600',
  }

  const isCompleted = quest.status === 'completed'

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm border-l-4 transition ${
        isCompleted
          ? 'border-green-500 opacity-75'
          : 'border-indigo-500 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${config.color}`}
          >
            {config.icon}
          </span>
          <div>
            <h3
              className={`font-medium ${
                isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'
              }`}
            >
              {quest.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">+{quest.xpReward} XP</p>
          </div>
        </div>

        {isCompleted ? (
          <span className="text-2xl">✅</span>
        ) : (
          <button
            onClick={() => {
              // TODO: API 연동
              alert(`퀘스트 완료! +${quest.xpReward} XP`)
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            완료
          </button>
        )}
      </div>
    </div>
  )
}
