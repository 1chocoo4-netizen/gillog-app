import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

interface ExecutionRecord {
  date: string
  worldKey: string
}

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 전체 가입자 수
    const totalUsers = await prisma.user.count()

    // 전체 UserData (history 파싱용)
    const allUserData = await prisma.userData.findMany({
      select: { history: true },
    })

    // 실행 기록 집계 (executionText 제외!)
    let totalExecutions = 0
    const dailyMap: Record<string, number> = {}
    const worldMap: Record<string, number> = {}
    const activeUsers7d = new Set<number>()
    const activeUsers30d = new Set<number>()

    const now = new Date()
    const day7ago = new Date(now)
    day7ago.setDate(day7ago.getDate() - 7)
    const day30ago = new Date(now)
    day30ago.setDate(day30ago.getDate() - 30)

    allUserData.forEach((ud, idx) => {
      const records = ud.history as unknown as ExecutionRecord[]
      if (!Array.isArray(records)) return

      totalExecutions += records.length

      records.forEach((r) => {
        // 월드별 분포
        if (r.worldKey) {
          worldMap[r.worldKey] = (worldMap[r.worldKey] || 0) + 1
        }

        // 일별 추이 (최근 30일만)
        if (r.date) {
          const recordDate = new Date(r.date)
          if (recordDate >= day30ago) {
            dailyMap[r.date] = (dailyMap[r.date] || 0) + 1

            // 활성 사용자 계산
            activeUsers30d.add(idx)
            if (recordDate >= day7ago) {
              activeUsers7d.add(idx)
            }
          }
        }
      })
    })

    // 일별 추이 데이터 (30일)
    const dailyTrend: { date: string; count: number }[] = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      dailyTrend.push({ date: dateStr, count: dailyMap[dateStr] || 0 })
    }

    // 월드별 분포
    const worldDistribution = Object.entries(worldMap)
      .map(([worldKey, count]) => ({
        worldKey,
        count,
        percentage: totalExecutions > 0 ? Math.round((count / totalExecutions) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)

    // 설문 참여율
    const surveyCount = await prisma.surveyResponse.count()

    // 1인 평균 실행 횟수
    const avgExecutions = totalUsers > 0 ? Math.round((totalExecutions / totalUsers) * 10) / 10 : 0

    return NextResponse.json({
      totalUsers,
      activeUsers7d: activeUsers7d.size,
      activeUsers30d: activeUsers30d.size,
      totalExecutions,
      avgExecutions,
      surveyResponses: surveyCount,
      surveyParticipationRate: totalUsers > 0 ? Math.round((surveyCount / totalUsers) * 100) : 0,
      dailyTrend,
      worldDistribution,
    })
  } catch (error) {
    console.error('GET /api/admin/stats error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}
