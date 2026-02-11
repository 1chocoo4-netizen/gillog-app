import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { calculateMetricsWithEvidence, calculateOverallScore } from '@/lib/b2b/metricCalculator'
import { hashUserId } from '@/lib/survey-crypto'

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

    const [userData, checkins, statSnapshots, reportEntries, answerData, surveyData] =
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
      ])

    const history = (userData?.history as unknown as ExecutionRecord[]) || []
    const answers = answerData.map((a) => ({
      rawText: a.rawText,
      createdAt: a.createdAt,
      worldKey: a.session.world.key,
    }))

    // 현재 마일스톤 지표 계산
    const currentResult = calculateMetricsWithEvidence({
      history,
      checkins,
      statSnapshots,
      reports: reportEntries,
      answers,
      surveys: surveyData,
      milestoneCount,
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
      })
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
      isDemo: false,
    })
  } catch (error) {
    console.error('GET /api/b2b/metrics error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
