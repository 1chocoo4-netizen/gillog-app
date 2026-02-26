import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { calculateMetricsWithEvidence, calculateOverallScore } from '@/lib/b2b/metricCalculator'
import { hashUserId } from '@/lib/survey-crypto'
import { analyzeCoachingSessions, type CoachingSessionData } from '@/lib/coaching/coachingAnalyzer'
import { getTopWordsByGroups, HINT_GROUPS } from '@/lib/b2b/safeWords'
import type { MetricContext } from '@/lib/b2b/insightGenerator'
import type { MetricKey } from '@/lib/b2b/types'

interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  executionText: string
  photoUrl?: string
  energy: number
}

export async function GET(request: Request) {
  // 코치 인증 필요
  const coachResult = await requireCoachAPI()
  if (!coachResult) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const milestone = searchParams.get('milestone') || '5'
  const milestoneCount = parseInt(milestone) || 5

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    // 동의 확인 (현재 코치가 요청한 동의만)
    const consent = await prisma.dataConsent.findFirst({
      where: { userId, coachEmail: coachResult.coachEmail, status: 'APPROVED' },
    })

    if (!consent) {
      return NextResponse.json(
        { error: 'Data consent not approved', consentRequired: true },
        { status: 403 }
      )
    }

    // 모든 데이터 소스 병렬 조회
    const userHash = hashUserId(userId)

    const [userData, checkins, statSnapshots, reportEntries, answerData, surveyData, coachingSessions] =
      await Promise.all([
        prisma.userData.findUnique({
          where: { userId },
          select: { history: true },
        }),
        prisma.checkin.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.statSnapshot.findMany({
          where: { userId },
        }),
        prisma.reportEntry.findMany({
          where: { userId },
          select: {
            worldKey: true,
            title: true,
            summary: true,
            evidence: true,
            keywords: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.answer.findMany({
          where: { userId },
          select: {
            rawText: true,
            createdAt: true,
            session: { select: { world: { select: { key: true } } } },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.surveyResponse.findMany({
          where: { userHash },
          select: {
            milestone: true,
            careerScore: true,
            communityScore: true,
            nonCognitiveScore: true,
            totalScore: true,
            createdAt: true,
          },
          orderBy: { milestone: 'asc' },
        }),
        prisma.coachingSession.findMany({
          where: { userId },
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

    const history = (userData?.history as unknown as ExecutionRecord[]) || []
    const answers = answerData.map((a) => ({
      rawText: a.rawText,
      createdAt: a.createdAt,
      worldKey: a.session.world.key,
    }))

    // 코칭 시그널 분석
    const coachingSignals = coachingSessions.length > 0
      ? analyzeCoachingSessions(coachingSessions as CoachingSessionData[])
      : undefined

    // 현재 마일스톤 지표 계산
    const currentResult = calculateMetricsWithEvidence({
      history,
      checkins,
      statSnapshots,
      reports: reportEntries,
      answers,
      surveys: surveyData,
      milestoneCount,
      coachingSignals,
    })

    // 이전 마일스톤 지표 계산 (비교용)
    const prevMilestoneMap: Record<number, number> = {
      100: 5,
      500: 100,
      1000: 500,
    }
    const prevMilestoneCount = prevMilestoneMap[milestoneCount]
    let previousResult = null

    if (prevMilestoneCount && milestoneCount >= 100) {
      previousResult = calculateMetricsWithEvidence({
        history,
        checkins,
        statSnapshots,
        reports: reportEntries,
        answers,
        surveys: surveyData,
        milestoneCount: prevMilestoneCount,
        coachingSignals,
      })
    }

    // ─── MetricContext 구축 ───
    const sorted = [...history]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const recentRecords = sorted.filter(
      (r) => new Date(r.completedAt) >= twoWeeksAgo,
    )
    const pool = recentRecords.length >= 3 ? recentRecords : sorted.slice(0, milestoneCount)

    // topActivities: 모든 group에서 상위 3개 활동 추출
    const allTexts = pool
      .filter((r) => r.executionText?.length >= 5)
      .map((r) => r.executionText)
    const topActivities = getTopWordsByGroups(
      allTexts,
      [...HINT_GROUPS.learning, ...HINT_GROUPS.relationship, ...HINT_GROUPS.attitude],
      3,
    )

    // streak: 연속 실행일 계산
    const activeDates = new Set(pool.map((r) => r.date))
    const sortedDates = [...activeDates].sort().reverse()
    let streak = 0
    if (sortedDates.length > 0) {
      streak = 1
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const curr = new Date(sortedDates[i])
        const next = new Date(sortedDates[i + 1])
        const diff = Math.floor((curr.getTime() - next.getTime()) / (1000 * 60 * 60 * 24))
        if (diff === 1) streak++
        else break
      }
    }

    // recentMoodAvg: 최근 감정 평균
    const recentCheckins = checkins.filter((c) => new Date(c.createdAt) >= twoWeeksAgo)
    const moodPool = recentCheckins.length >= 3 ? recentCheckins : checkins.slice(0, 10)
    const recentMoodAvg = moodPool.length > 0
      ? Math.round((moodPool.reduce((s, c) => s + c.mood, 0) / moodPool.length) * 100) / 100
      : 0

    // worldDistribution: 월드별 실행 비율
    const worldDistribution: Record<string, number> = {}
    if (pool.length > 0) {
      const worldCounts: Record<string, number> = {}
      pool.forEach((r) => { worldCounts[r.worldKey] = (worldCounts[r.worldKey] || 0) + 1 })
      for (const [k, v] of Object.entries(worldCounts)) {
        worldDistribution[k] = Math.round((v / pool.length) * 100) / 100
      }
    }

    // textDepthGrowing: 전반부 vs 후반부 글 길이 비교
    const halfIdx = Math.floor(pool.length / 2)
    const firstHalf = pool.slice(halfIdx)
    const secondHalf = pool.slice(0, halfIdx)
    const firstAvgLen = firstHalf.filter((r) => r.executionText).length > 0
      ? firstHalf.reduce((s, r) => s + (r.executionText?.length || 0), 0) / firstHalf.filter((r) => r.executionText).length
      : 0
    const secondAvgLen = secondHalf.filter((r) => r.executionText).length > 0
      ? secondHalf.reduce((s, r) => s + (r.executionText?.length || 0), 0) / secondHalf.filter((r) => r.executionText).length
      : 0
    const textDepthGrowing = secondAvgLen > firstAvgLen * 1.2

    // energyTrend: 에너지 변화
    const firstEnergy = firstHalf.length > 0
      ? firstHalf.reduce((s, r) => s + (r.energy || 0), 0) / firstHalf.length : 0
    const secondEnergy = secondHalf.length > 0
      ? secondHalf.reduce((s, r) => s + (r.energy || 0), 0) / secondHalf.length : 0
    const energyTrend: 'up' | 'down' | 'stable' =
      secondEnergy > firstEnergy + 0.3 ? 'up' :
      secondEnergy < firstEnergy - 0.3 ? 'down' : 'stable'

    // 공통 MetricContext 생성 (8개 메트릭 공유)
    const sharedContext: MetricContext = {
      topActivities,
      streak,
      recentMoodAvg,
      coachingSessionCount: coachingSignals?.sessionCount ?? 0,
      coachingGoalClarity: coachingSignals?.goalClarity ?? 0,
      coachingEmotional: coachingSignals?.emotionalAwareness ?? 0,
      coachingActionCommit: coachingSignals?.actionCommitment ?? 0,
      coachingCompletion: coachingSignals?.sessionCompletionRate ?? 0,
      coachingReflection: coachingSignals?.selfReflectionDepth ?? 0,
      worldDistribution,
      textDepthGrowing,
      energyTrend,
    }

    const metricKeys: MetricKey[] = [
      'initiative', 'consistency', 'reflectiveness', 'adaptability',
      'collaboration', 'goalClarity', 'emotionalAware', 'growthMindset',
    ]
    const metricContexts: Record<string, MetricContext> = {}
    for (const k of metricKeys) {
      metricContexts[k] = sharedContext
    }

    return NextResponse.json({
      current: {
        period: `실행 ${milestoneCount.toLocaleString()}회`,
        scores: currentResult.scores,
        overallScore: calculateOverallScore(currentResult.scores),
      },
      previous: previousResult
        ? {
            period: `실행 ${prevMilestoneCount!.toLocaleString()}회`,
            scores: previousResult.scores,
            overallScore: calculateOverallScore(previousResult.scores),
          }
        : null,
      evidence: currentResult.evidence,
      metricContexts,
      isDemo: false,
    })
  } catch (error) {
    console.error('GET /api/b2b/metrics error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
