import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { round2, mean, sd as calcSd } from '@/lib/research/longitudinalEngine'

// 차원 키 상수 (외부 import 의존 제거)
const DIMENSION_KEYS = [
  'careerMaturity',
  'selfDirectedLearning',
  'behavioralPersistence',
  'communityContribution',
  'careerGoalConsistency',
] as const

// ========================================
// GET /api/admin/ai-engine — 대시보드 집계
// ========================================

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 1. 병렬 쿼리
    const [allSnapshots, activeRecommendations, allUserIds] = await Promise.all([
      prisma.aiDimensionSnapshot.findMany({
        orderBy: { computedAt: 'desc' },
      }),
      prisma.aiRecommendation.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.userData.findMany({ select: { userId: true } }),
    ])
    const userCount = allUserIds.length

    // 2. 유저별 최신 스냅샷만 추출
    const latestByUser: Record<string, (typeof allSnapshots)[number]> = {}
    for (const snap of allSnapshots) {
      if (!latestByUser[snap.userId]) {
        latestByUser[snap.userId] = snap
      }
    }
    const latestSnapshots = Object.values(latestByUser)

    // 3. 차원별 통계
    const dimensionStats: Record<string, {
      avg: number; stdDev: number; min: number; max: number
    }> = {}

    const dimensionValues: Record<string, number[]> = {}

    for (const key of DIMENSION_KEYS) {
      const values: number[] = []
      for (const s of latestSnapshots) {
        // 각 스냅샷에서 차원별 점수 추출
        const val = key === 'careerMaturity' ? s.careerMaturity
          : key === 'selfDirectedLearning' ? s.selfDirectedLearning
          : key === 'behavioralPersistence' ? s.behavioralPersistence
          : key === 'communityContribution' ? s.communityContribution
          : s.careerGoalConsistency
        values.push(val)
      }
      dimensionValues[key] = values
      dimensionStats[key] = {
        avg: values.length > 0 ? round2(mean(values)) : 0,
        stdDev: values.length > 0 ? round2(calcSd(values)) : 0,
        min: values.length > 0 ? round2(Math.min(...values)) : 0,
        max: values.length > 0 ? round2(Math.max(...values)) : 0,
      }
    }

    const overallValues = latestSnapshots.map(s => s.overallScore)

    // 4. 점수 분포 (10점 단위 히스토그램)
    const distributions: Record<string, number[]> = {}
    for (const key of DIMENSION_KEYS) {
      const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (const v of (dimensionValues[key] || [])) {
        const bin = Math.min(9, Math.floor(v / 10))
        bins[bin]++
      }
      distributions[key] = bins
    }

    // 5. 유저 랭킹
    const userRankings = latestSnapshots
      .map(s => ({
        userId: s.userId,
        overallScore: round2(s.overallScore),
        careerMaturity: round2(s.careerMaturity),
        selfDirectedLearning: round2(s.selfDirectedLearning),
        behavioralPersistence: round2(s.behavioralPersistence),
        communityContribution: round2(s.communityContribution),
        careerGoalConsistency: round2(s.careerGoalConsistency),
        computedAt: s.computedAt.toISOString(),
      }))
      .sort((a, b) => b.overallScore - a.overallScore)

    // 6. 추천 요약
    const recommendationSummary = {
      total: activeRecommendations.length,
      high: activeRecommendations.filter(r => r.priority === 'high').length,
      medium: activeRecommendations.filter(r => r.priority === 'medium').length,
      low: activeRecommendations.filter(r => r.priority === 'low').length,
      byDimension: {} as Record<string, number>,
    }
    for (const key of DIMENSION_KEYS) {
      recommendationSummary.byDimension[key] =
        activeRecommendations.filter(r => r.dimension === key).length
    }

    return NextResponse.json({
      dimensionStats,
      distributions,
      userRankings,
      overallStats: {
        avg: overallValues.length > 0 ? round2(mean(overallValues)) : 0,
        stdDev: overallValues.length > 0 ? round2(calcSd(overallValues)) : 0,
        min: overallValues.length > 0 ? round2(Math.min(...overallValues)) : 0,
        max: overallValues.length > 0 ? round2(Math.max(...overallValues)) : 0,
      },
      recommendationSummary,
      metadata: {
        computedAt: latestSnapshots[0]?.computedAt?.toISOString() ?? null,
        totalUsers: userCount,
        usersWithSnapshots: latestSnapshots.length,
        totalSnapshots: allSnapshots.length,
      },
    })
  } catch (error) {
    console.error('GET /api/admin/ai-engine error:', error)
    const message = error instanceof Error ? error.message : String(error)
    const stack = error instanceof Error ? error.stack : undefined
    return NextResponse.json(
      { error: 'Internal Server Error', detail: message, stack },
      { status: 500 },
    )
  }
}
