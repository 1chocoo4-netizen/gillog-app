'use client'

import { useEffect, useState } from 'react'
import { StatCard } from './components/StatCard'
import { DailyTrendChart } from './components/DailyTrendChart'
import { WorldDistributionChart } from './components/WorldDistributionChart'

interface StatsData {
  totalUsers: number
  activeUsers7d: number
  activeUsers30d: number
  totalExecutions: number
  avgExecutions: number
  surveyResponses: number
  surveyParticipationRate: number
  dailyTrend: { date: string; count: number }[]
  worldDistribution: { worldKey: string; count: number; percentage: number }[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
        }
        return res.json()
      })
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">데이터를 불러오는 중...</div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">오류: {error || '데이터 없음'}</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">대시보드</h2>
        <p className="text-sm text-gray-400 mt-1">길로그 전체 현황을 한눈에 확인합니다</p>
      </div>

      {/* 통계 카드 6개 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="전체 가입자"
          value={stats.totalUsers}
          icon="👥"
          subtitle="누적 가입자 수"
        />
        <StatCard
          title="활성 사용자 (7일)"
          value={stats.activeUsers7d}
          icon="🟢"
          subtitle="최근 7일 활동"
        />
        <StatCard
          title="활성 사용자 (30일)"
          value={stats.activeUsers30d}
          icon="📅"
          subtitle="최근 30일 활동"
        />
        <StatCard
          title="총 실행 횟수"
          value={stats.totalExecutions.toLocaleString()}
          icon="⚡"
          subtitle={`1인 평균 ${stats.avgExecutions}회`}
        />
        <StatCard
          title="설문 응답"
          value={stats.surveyResponses}
          icon="📝"
          subtitle={`참여율 ${stats.surveyParticipationRate}%`}
        />
        <StatCard
          title="월드 수"
          value={stats.worldDistribution.length}
          icon="🌍"
          subtitle="활성 월드"
        />
      </div>

      {/* 차트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyTrendChart data={stats.dailyTrend} />
        <WorldDistributionChart data={stats.worldDistribution} />
      </div>
    </div>
  )
}
