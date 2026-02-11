'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const WORLD_LABELS: Record<string, string> = {
  cognition: '인지',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

const WORLD_COLORS: Record<string, string> = {
  cognition: '#8b5cf6',
  selfDirected: '#06b6d4',
  habit: '#22c55e',
  attitude: '#f59e0b',
  relationship: '#ec4899',
  character: '#fb923c',
}

interface WorldData {
  worldKey: string
  count: number
  percentage: number
}

export function WorldDistributionChart({ data }: { data: WorldData[] }) {
  const chartData = data.map((d) => ({
    name: WORLD_LABELS[d.worldKey] || d.worldKey,
    value: d.count,
    color: WORLD_COLORS[d.worldKey] || '#6B7280',
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-medium text-gray-300 mb-4">월드별 분포</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6',
              }}
              formatter={(value) => [`${value}회`, '실행 횟수']}
            />
            <Legend
              formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
