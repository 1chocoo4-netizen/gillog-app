import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { hashUserId } from '@/lib/survey-crypto'
import { computeAllDimensions, type UserDataInput } from '@/lib/ai-engine/dimensionEngine'
import { generateRecommendations } from '@/lib/ai-engine/recommendationEngine'
import type {
  RawExecution,
  RawExecutionItem,
  BucketItem,
  MonthlyGoalItem,
} from '@/lib/ai-engine/types'

// ========================================
// POST /api/admin/ai-engine/compute
// 전체 사용자 배치 재산출 → 스냅샷 저장 + 추천 생성
// ========================================

export async function POST() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 1. 전체 데이터 병렬 조회
    const [allUserData, allAnswers, allSurveys, existingSnapshots, allCoachingMessages] = await Promise.all([
      prisma.userData.findMany({
        select: {
          userId: true,
          history: true,
          executions: true,
          bucketList: true,
          monthlyGoals: true,
        },
      }),
      prisma.answer.findMany({
        select: { userId: true, rawText: true },
      }),
      prisma.surveyResponse.findMany({
        select: {
          userHash: true,
          careerScore: true,
          communityScore: true,
          learningScore: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'asc' },
      }),
      // 각 유저의 가장 최근 스냅샷 (트렌드 비교용)
      prisma.aiDimensionSnapshot.findMany({
        orderBy: { computedAt: 'desc' },
      }),
      // 코칭 대화 중 사용자 메시지만 조회
      prisma.coachingMessage.findMany({
        where: { role: 'user' },
        select: { content: true, session: { select: { userId: true } } },
      }),
    ])

    // 유저별 최신 스냅샷 맵
    const prevSnapshotMap = new Map<string, number>()
    for (const snap of existingSnapshots) {
      if (!prevSnapshotMap.has(snap.userId)) {
        prevSnapshotMap.set(snap.userId, snap.overallScore)
      }
    }

    // 답변 텍스트를 userId별 그룹핑
    const answersByUser: Record<string, string[]> = {}
    for (const a of allAnswers) {
      if (!answersByUser[a.userId]) answersByUser[a.userId] = []
      if (a.rawText) answersByUser[a.userId].push(a.rawText)
    }

    // 코칭 대화 텍스트를 userId별 그룹핑 → 답변에 합산
    for (const cm of allCoachingMessages) {
      const uid = cm.session.userId
      if (!answersByUser[uid]) answersByUser[uid] = []
      if (cm.content) answersByUser[uid].push(cm.content)
    }

    // 설문 데이터를 userHash별 그룹핑
    const surveyByHash: Record<string, {
      career: number | null; community: number | null; learning: number | null
      careerScores: number[]
    }> = {}
    for (const sr of allSurveys) {
      if (!surveyByHash[sr.userHash]) {
        surveyByHash[sr.userHash] = {
          career: null, community: null, learning: null, careerScores: [],
        }
      }
      const entry = surveyByHash[sr.userHash]
      // 최신 점수 갱신
      entry.career = sr.careerScore
      entry.community = sr.communityScore
      entry.learning = sr.learningScore
      entry.careerScores.push(sr.careerScore)
    }

    // 2. 유저별 계산 + DB 저장
    let computed = 0
    let recommendationsCreated = 0

    for (const ud of allUserData) {
      try {
        // JSON 파싱
        const history: RawExecution[] = parseJson(ud.history, [])
        const executions: RawExecutionItem[] = parseJson(ud.executions, [])
        const bucketList: BucketItem[] = parseJson(ud.bucketList, [])
        const rawMonthly = parseJson(ud.monthlyGoals, {})
        const monthlyGoals: Record<string, MonthlyGoalItem[]> =
          rawMonthly && typeof rawMonthly === 'object' ? rawMonthly : {}

        const userHash = hashUserId(ud.userId)
        const survey = surveyByHash[userHash]
        const lessonAnswerTexts = answersByUser[ud.userId] || []

        const input: UserDataInput = {
          userId: ud.userId,
          history,
          executions,
          bucketList,
          monthlyGoals,
          careerSurveyScore: survey?.career ?? null,
          communitySurveyScore: survey?.community ?? null,
          learningSurveyScore: survey?.learning ?? null,
          careerSurveyScores: survey?.careerScores ?? [],
          lessonAnswerTexts,
        }

        const previousOverall = prevSnapshotMap.get(ud.userId) ?? null
        const result = computeAllDimensions(input, previousOverall)

        // 스냅샷 저장
        await prisma.aiDimensionSnapshot.create({
          data: {
            userId: ud.userId,
            careerMaturity: result.dimensions.careerMaturity,
            selfDirectedLearning: result.dimensions.selfDirectedLearning,
            behavioralPersistence: result.dimensions.behavioralPersistence,
            communityContribution: result.dimensions.communityContribution,
            careerGoalConsistency: result.dimensions.careerGoalConsistency,
            overallScore: result.dimensions.overallScore,
            dataSourceSummary: JSON.stringify(result.dataSourceSummary),
          },
        })

        // 기존 활성 추천 비활성화
        await prisma.aiRecommendation.updateMany({
          where: { userId: ud.userId, isActive: true },
          data: { isActive: false },
        })

        // 새 추천 생성
        const recommendations = generateRecommendations(result.dimensions)
        if (recommendations.length > 0) {
          await prisma.aiRecommendation.createMany({
            data: recommendations.map(r => ({
              userId: ud.userId,
              dimension: r.dimension,
              dimensionScore: r.dimensionScore,
              type: r.type,
              priority: r.priority,
              title: r.title,
              description: r.description,
              resourceUrl: r.resourceUrl ?? null,
            })),
          })
          recommendationsCreated += recommendations.length
        }

        computed++
      } catch (userError) {
        console.error(`AI Engine compute error for user ${ud.userId}:`, userError)
      }
    }

    return NextResponse.json({
      success: true,
      computed,
      recommendationsCreated,
      totalUsers: allUserData.length,
      computedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('POST /api/admin/ai-engine/compute error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseJson(value: any, fallback: any): any {
  if (typeof value === 'string') {
    try { return JSON.parse(value) } catch { return fallback }
  }
  return value ?? fallback
}
