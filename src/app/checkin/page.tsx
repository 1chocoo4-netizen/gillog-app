'use client'

import { useState } from 'react'

const MOOD_EMOJIS = ['😢', '😔', '😐', '🙂', '😄']
const ENERGY_EMOJIS = ['🔋', '🪫', '⚡', '💪', '🚀']

const GROWTH_AREAS = [
  { key: 'attitude', label: '태도', icon: '🎯' },
  { key: 'habit', label: '습관', icon: '🔄' },
  { key: 'selfControl', label: '자기조절', icon: '🧘' },
  { key: 'relationship', label: '관계', icon: '🤝' },
  { key: 'execution', label: '실행력', icon: '⚡' },
  { key: 'expression', label: '표현', icon: '💬' },
]

export default function CheckinPage() {
  const [mood, setMood] = useState(3)
  const [energy, setEnergy] = useState(3)
  const [note, setNote] = useState('')
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 연동
    console.log({ mood, energy, note, scores })
    alert('체크인 완료! +20 XP')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* 헤더 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <a href="/app" className="text-gray-600 hover:text-gray-800 mr-4">
            ←
          </a>
          <h1 className="text-xl font-bold text-gray-800">오늘의 체크인</h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* 기분 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            오늘 기분이 어때요?
          </h2>
          <div className="flex justify-between">
            {MOOD_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setMood(index + 1)}
                className={`text-4xl p-2 rounded-full transition ${
                  mood === index + 1
                    ? 'bg-green-100 scale-125'
                    : 'hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>

        {/* 에너지 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            에너지 레벨은?
          </h2>
          <div className="flex justify-between">
            {ENERGY_EMOJIS.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setEnergy(index + 1)}
                className={`text-4xl p-2 rounded-full transition ${
                  energy === index + 1
                    ? 'bg-yellow-100 scale-125'
                    : 'hover:bg-gray-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>

        {/* 성장 지표 자가평가 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            오늘의 성장 점검
          </h2>
          <div className="space-y-4">
            {GROWTH_AREAS.map(({ key, label, icon }) => (
              <div key={key}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">
                    {icon} {label}
                  </span>
                  <span className="text-sm text-gray-500">
                    {scores[key] ?? '-'} / 4
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setScores({ ...scores, [key]: level })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                        scores[key] === level
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 메모 */}
        <section className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            오늘 하루 한 줄
          </h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="오늘 느낀 것, 배운 것, 감사한 것..."
            className="w-full p-4 border border-gray-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </section>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition shadow-lg"
        >
          체크인 완료하기 ✨
        </button>
      </form>
    </main>
  )
}
