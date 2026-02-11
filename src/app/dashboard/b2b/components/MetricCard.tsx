'use client'

import { motion } from 'framer-motion'
import type { MetricKey } from '@/lib/b2b/types'
import { METRIC_MAP } from '@/lib/b2b/isoMapping'

interface MetricCardProps {
  metricKey: MetricKey
  current: number
  previous: number | null  // null이면 현재 상태만 표시
  insight: string
  sparkline: number[]
}

export function MetricCard({
  metricKey,
  current,
  previous,
  insight,
  sparkline,
}: MetricCardProps) {
  const def = METRIC_MAP[metricKey]
  const showChange = previous !== null
  const delta = showChange ? current - previous : 0
  const deltaPercent = showChange && previous > 0 ? Math.round((delta / previous) * 100) : 0
  const isUp = delta > 0

  // 스파크라인 SVG 경로 생성
  const sparklinePath = (() => {
    if (sparkline.length < 2) return ''
    const max = Math.max(...sparkline)
    const min = Math.min(...sparkline)
    const range = max - min || 1
    const width = 80
    const height = 24
    const step = width / (sparkline.length - 1)

    return sparkline
      .map((v, i) => {
        const x = i * step
        const y = height - ((v - min) / range) * height
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ')
  })()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-xl p-5 border border-gray-800 transition-colors"
    >
      {/* 상단: 아이콘 + 지표명 + ISO 뱃지 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{def.icon}</span>
          <div>
            <div className="text-sm font-medium text-gray-200">{def.label}</div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
              ISO {def.isoCode}
            </span>
          </div>
        </div>
        {/* 미니 스파크라인 */}
        {sparkline.length >= 2 && (
          <svg width="80" height="24" className="flex-shrink-0">
            <path
              d={sparklinePath}
              fill="none"
              stroke="#818cf8"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* 중단: 점수 + 변화율 */}
      <div className="flex items-end gap-3 mb-3">
        <span className="text-3xl font-bold text-gray-100">{current}</span>
        <span className="text-sm text-gray-500">/100</span>
        {showChange ? (
          <span
            className={`ml-auto text-sm font-medium ${
              isUp ? 'text-indigo-400' : delta < 0 ? 'text-slate-400' : 'text-gray-500'
            }`}
          >
            {isUp ? '↑' : delta < 0 ? '↓' : '–'} {Math.abs(delta)}점
            <span className="text-xs ml-1 text-gray-500">
              ({isUp ? '+' : ''}{deltaPercent}%)
            </span>
          </span>
        ) : (
          <span className="ml-auto text-xs text-gray-600">현재 상태</span>
        )}
      </div>

      {/* 프로그레스바 */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${current}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>

      {/* AI 인사이트 */}
      <p className="text-xs text-gray-400 leading-relaxed">{insight}</p>
    </motion.div>
  )
}
