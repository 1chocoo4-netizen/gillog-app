'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface MilestoneData {
  milestone: number
  count: number
  avgCareer: number
  avgCommunity: number
  avgNonCognitive: number
  avgTotal: number
}

export function MilestoneComparisonChart({ data }: { data: MilestoneData[] }) {
  const chartData = data.map((d) => ({
    name: `${d.milestone}회`,
    진로: d.avgCareer,
    공동체: d.avgCommunity,
    인성: d.avgNonCognitive,
    참여인원: d.count,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <h3 className="text-sm font-medium text-gray-300 mb-4">마일스톤별 영역 점수 비교</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6',
              }}
              formatter={(value, name) => [`${value}점`, name]}
            />
            <Legend
              formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>}
            />
            <Bar dataKey="진로" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="공동체" fill="#10B981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="인성" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
