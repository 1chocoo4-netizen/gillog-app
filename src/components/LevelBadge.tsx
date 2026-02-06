'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// 6개 성장 영역
const GROWTH_AREAS = [
  { key: 'cognition', label: '인지', icon: '🧠' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯' },
  { key: 'habit', label: '습관', icon: '🔄' },
  { key: 'attitude', label: '태도', icon: '💪' },
  { key: 'expression', label: '표현', icon: '💬' },
  { key: 'character', label: '인성', icon: '❤️' },
]

export interface LevelData {
  level: number
  progress: Record<string, number>  // 각 영역별 진행도 (0~10)
}

const DEFAULT_LEVEL_DATA: LevelData = {
  level: 1,
  progress: {
    cognition: 0,
    selfDirected: 0,
    habit: 0,
    attitude: 0,
    expression: 0,
    character: 0,
  }
}

export function LevelBadge() {
  const [isOpen, setIsOpen] = useState(false)
  const [levelData, setLevelData] = useState<LevelData>(DEFAULT_LEVEL_DATA)

  // localStorage에서 레벨 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('gillog-level')
    if (saved) {
      try {
        setLevelData(JSON.parse(saved))
      } catch {
        setLevelData(DEFAULT_LEVEL_DATA)
      }
    }
  }, [])

  // 레벨 계산: 모든 영역이 10이면 레벨업
  const calculateLevel = (progress: Record<string, number>): number => {
    const allFull = GROWTH_AREAS.every(area => progress[area.key] >= 10)
    if (allFull) {
      // 모든 영역 리셋하고 레벨업
      return levelData.level + 1
    }
    return levelData.level
  }

  return (
    <>
      {/* 레벨 뱃지 */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-bold shadow-lg hover:scale-105 transition-transform"
      >
        {levelData.level}
      </button>

      {/* 레벨 정보 모달 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />

            {/* 모달 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[20%] z-50 max-w-md mx-auto max-h-[70vh] overflow-y-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{levelData.level}</span>
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">레벨 {levelData.level}</h2>
                      <p className="text-white/50 text-xs">6개 영역 모두 채우면 레벨업!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/50 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 성장 영역 목록 */}
                <div className="space-y-4">
                  {GROWTH_AREAS.map(area => (
                    <div key={area.key}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm flex items-center gap-2">
                          <span>{area.icon}</span>
                          <span>{area.label}</span>
                        </span>
                        <span className="text-white/50 text-xs">
                          {levelData.progress[area.key] || 0}/10
                        </span>
                      </div>
                      {/* 10칸 진행 바 */}
                      <div className="flex gap-1">
                        {Array.from({ length: 10 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 h-3 rounded-sm transition-colors ${
                              idx < (levelData.progress[area.key] || 0)
                                ? 'bg-gradient-to-r from-violet-500 to-purple-500'
                                : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 안내 문구 */}
                <p className="text-white/40 text-xs text-center mt-6">
                  코칭 세션을 완료하면 해당 영역이 채워집니다
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// 레벨 데이터 업데이트 유틸리티 함수
export function updateLevelProgress(areaKey: string, amount: number = 1): LevelData {
  const saved = localStorage.getItem('gillog-level')
  let data: LevelData = saved ? JSON.parse(saved) : DEFAULT_LEVEL_DATA

  // 진행도 업데이트
  const currentProgress = data.progress[areaKey] || 0
  data.progress[areaKey] = Math.min(10, currentProgress + amount)

  // 레벨업 체크
  const allFull = GROWTH_AREAS.every(area => data.progress[area.key] >= 10)
  if (allFull) {
    // 레벨업하고 진행도 리셋
    data.level += 1
    GROWTH_AREAS.forEach(area => {
      data.progress[area.key] = 0
    })
  }

  localStorage.setItem('gillog-level', JSON.stringify(data))
  return data
}
