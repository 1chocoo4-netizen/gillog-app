import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { round2 } from '@/lib/research/longitudinalEngine'
import { analyzeCoachingSessions, type CoachingSessionData } from '@/lib/coaching/coachingAnalyzer'

// ========================================
// GET /api/admin/ai-engine/[userId]
// 개별 유저 5차원 상세 + 히스토리
// ========================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { userId } = await params

  try {
    // 스냅샷 히스토리 + 활성 추천 + 코칭 세션 병렬 쿼리
    const [snapshots, recommendations, coachingSessions] = await Promise.all([
      prisma.aiDimensionSnapshot.findMany({
        where: { userId },
        orderBy: { computedAt: 'desc' },
        take: 20, // 최근 20개
      }),
      prisma.aiRecommendation.findMany({
        where: { userId, isActive: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.coachingSession.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 50, // 최근 50개
        select: {
          id: true,
          userId: true,
          mode: true,
          createdAt: true,
          messages: {
            select: { role: true, content: true, order: true, createdAt: true },
            orderBy: { order: 'asc' },
          },
        },
      }),
    ])

    // 코칭 분석 시그널
    const coachingSignals = coachingSessions.length > 0
      ? analyzeCoachingSessions(coachingSessions as CoachingSessionData[])
      : null

    // 코칭 타임라인 구축
    const coachingTimeline = coachingSessions.map(s => {
      const userMessages = s.messages.filter(m => m.role === 'user')
      const firstUserMsg = userMessages[0]?.content ?? ''
      const isCompleted = s.messages.some(m => m.content.includes('[코칭완료]'))
      return {
        sessionId: s.id,
        date: (s.createdAt as Date).toISOString(),
        messageCount: s.messages.length,
        userMessageCount: userMessages.length,
        preview: firstUserMsg.slice(0, 80),
        isCompleted,
        mode: s.mode,
      }
    })

    if (snapshots.length === 0) {
      return NextResponse.json({
        userId,
        latest: null,
        history: [],
        recommendations: [],
        coachingSessionCount: coachingSessions.length,
        coachingTimeline,
        coachingSignals,
        message: '아직 계산된 스냅샷이 없습니다. "재산출" 버튼을 눌러주세요.',
      })
    }

    const latest = snapshots[0]
    const history = snapshots.map(s => ({
      computedAt: s.computedAt.toISOString(),
      careerMaturity: round2(s.careerMaturity),
      selfDirectedLearning: round2(s.selfDirectedLearning),
      behavioralPersistence: round2(s.behavioralPersistence),
      communityContribution: round2(s.communityContribution),
      careerGoalConsistency: round2(s.careerGoalConsistency),
      overallScore: round2(s.overallScore),
    })).reverse() // 시간순 정렬

    // 이전 스냅샷 대비 변화
    const previous = snapshots.length >= 2 ? snapshots[1] : null
    const delta = previous ? {
      careerMaturity: round2(latest.careerMaturity - previous.careerMaturity),
      selfDirectedLearning: round2(latest.selfDirectedLearning - previous.selfDirectedLearning),
      behavioralPersistence: round2(latest.behavioralPersistence - previous.behavioralPersistence),
      communityContribution: round2(latest.communityContribution - previous.communityContribution),
      careerGoalConsistency: round2(latest.careerGoalConsistency - previous.careerGoalConsistency),
      overallScore: round2(latest.overallScore - previous.overallScore),
    } : null

    return NextResponse.json({
      userId,
      coachingSessionCount: coachingSessions.length,
      coachingTimeline,
      coachingSignals,
      latest: {
        careerMaturity: round2(latest.careerMaturity),
        selfDirectedLearning: round2(latest.selfDirectedLearning),
        behavioralPersistence: round2(latest.behavioralPersistence),
        communityContribution: round2(latest.communityContribution),
        careerGoalConsistency: round2(latest.careerGoalConsistency),
        overallScore: round2(latest.overallScore),
        dataSourceSummary: latest.dataSourceSummary,
        computedAt: latest.computedAt.toISOString(),
      },
      delta,
      history,
      recommendations: recommendations.map(r => ({
        id: r.id,
        dimension: r.dimension,
        dimensionScore: r.dimensionScore,
        type: r.type,
        priority: r.priority,
        title: r.title,
        description: r.description,
        resourceUrl: r.resourceUrl,
        createdAt: r.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error(`GET /api/admin/ai-engine/${userId} error:`, error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}
