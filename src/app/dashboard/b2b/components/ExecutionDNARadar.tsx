'use client'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { METRIC_DEFINITIONS } from '@/lib/b2b/isoMapping'
import type { MetricScores } from '@/lib/b2b/types'

interface ExecutionDNARadarProps {
  current: MetricScores
  previous: MetricScores | null
}

export function ExecutionDNARadar({ current, previous }: ExecutionDNARadarProps) {
  const hasPrevious = previous !== null

  const data = METRIC_DEFINITIONS.map((def) => ({
    metric: def.shortLabel,
    fullLabel: def.label,
    current: current[def.key],
    previous: hasPrevious ? previous[def.key] : 0,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-300">실행 DNA 프로파일</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 rounded-full bg-indigo-500" />
            <span>현재</span>
          </div>
          {hasPrevious && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full bg-gray-600 border-dashed" style={{ borderTop: '1px dashed #6B7280' }} />
              <span>이전</span>
            </div>
          )}
        </div>
      </div>

      <div className="h-80 md:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#374151" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="metric"
              tick={(props: Record<string, unknown>) => {
                const { payload, x, y, textAnchor } = props as {
                  payload: { value: string }
                  x: number
                  y: number
                  textAnchor: string
                }
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={textAnchor as 'start' | 'middle' | 'end'}
                    fill="#a5b4fc"
                    fontSize={12}
                    fontWeight={500}
                  >
                    {payload.value}
                  </text>
                )
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              axisLine={false}
            />
            {/* 이전 기간 (점선) - 비교 데이터 있을 때만 */}
            {hasPrevious && (
              <Radar
                name="이전"
                dataKey="previous"
                stroke="#6B7280"
                fill="transparent"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
            )}
            {/* 현재 기간 (채움) */}
            <Radar
              name="현재"
              dataKey="current"
              stroke="#818cf8"
              fill="url(#radarGradient)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6',
                fontSize: '12px',
              }}
              formatter={(value) => [`${value}점`]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
