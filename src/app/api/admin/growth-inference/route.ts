import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { hashUserId } from '@/lib/survey-crypto'
import { round2, mean, sd } from '@/lib/research/longitudinalEngine'
import {
  computeUserInference,
  type CheckinRecord,
  type ExecutionRecord,
  type SurveyScores,
  type GrowthState,
} from '@/lib/research/growthInference'

// ========================================
// 타입 정의
// ========================================

interface RawExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  executionText?: string
  photoUrl?: string
  energy?: number
  groupId?: string
}

// ========================================
// GET /api/admin/growth-inference
// ========================================

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 1. 병렬 Prisma 쿼리
    const [allUserData, allCheckins, allSurveyResponses] = await Promise.all([
      prisma.userData.findMany({
        select: { userId: true, history: true },
      }),
      prisma.checkin.findMany({
        select: { userId: true, mood: true, energy: true, createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.surveyResponse.findMany({
        select: {
          userHash: true,
          careerScore: true,
          communityScore: true,
          nonCognitiveScore: true,
          learningScore: true,
          habitScore: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    // 2. 체크인을 userId별로 그룹핑
    const checkinsByUser: Record<string, CheckinRecord[]> = {}
    for (const c of allCheckins) {
      if (!checkinsByUser[c.userId]) checkinsByUser[c.userId] = []
      checkinsByUser[c.userId].push({
        userId: c.userId,
        mood: c.mood,
        energy: c.energy,
        createdAt: c.createdAt.toISOString(),
      })
    }

    // 3. 설문 데이터: userHash별 최신 응답
    const surveyByHash: Record<string, SurveyScores> = {}
    for (const sr of allSurveyResponses) {
      if (!surveyByHash[sr.userHash]) {
        surveyByHash[sr.userHash] = {
          career: sr.careerScore,
          community: sr.communityScore,
          nonCognitive: sr.nonCognitiveScore,
          learning: sr.learningScore,
          habit: sr.habitScore,
        }
      }
    }

    // 4. 유저별 추론 산출
    const users: Array<{
      id: string
      inference: ReturnType<typeof computeUserInference>
      totalExecutions: number
      totalCheckins: number
      hasSurvey: boolean
    }> = []

    let usersWithCheckins = 0
    let usersWithSurveys = 0

    for (let idx = 0; idx < allUserData.length; idx++) {
      const ud = allUserData[idx]
      const hist = typeof ud.history === 'string' ? JSON.parse(ud.history) : ud.history
      const history: RawExecutionRecord[] = Array.isArray(hist) ? hist : []

      const checkins = checkinsByUser[ud.userId] || []
      const userHash = hashUserId(ud.userId)
      const surveyScores = surveyByHash[userHash] || null

      if (checkins.length > 0) usersWithCheckins++
      if (surveyScores) usersWithSurveys++

      const execRecords: ExecutionRecord[] = history.map(h => ({
        id: h.id,
        date: h.date,
        completedAt: h.completedAt,
        worldKey: h.worldKey,
        areaKey: h.areaKey,
      }))

      const inference = computeUserInference(checkins, execRecords, surveyScores)

      users.push({
        id: `R${String(idx + 1).padStart(3, '0')}`,
        inference,
        totalExecutions: history.length,
        totalCheckins: checkins.length,
        hasSurvey: surveyScores !== null,
      })
    }

    // 5. 집계 통계
    const selfRegulations = users.map(u => u.inference.selfRegulationIndex)
    const resiliences = users.map(u => u.inference.executionResilienceIndex)
    const alignments = users
      .map(u => u.inference.valueActionAlignment)
      .filter((v): v is number => v !== null)
    const recoveryScores = users.map(u => u.inference.recoveryCurveScore)

    const aggregates = {
      avgSelfRegulation: round2(mean(selfRegulations)),
      avgResilience: round2(mean(resiliences)),
      avgAlignment: alignments.length > 0 ? round2(mean(alignments)) : null,
      avgRecoveryTrend: round2(mean(recoveryScores)),
      sdSelfRegulation: round2(sd(selfRegulations)),
      sdResilience: round2(sd(resiliences)),
      sdAlignment: alignments.length > 0 ? round2(sd(alignments)) : null,
      sdRecoveryTrend: round2(sd(recoveryScores)),
      minSelfRegulation: selfRegulations.length > 0 ? round2(Math.min(...selfRegulations)) : 0,
      maxSelfRegulation: selfRegulations.length > 0 ? round2(Math.max(...selfRegulations)) : 0,
      minResilience: resiliences.length > 0 ? round2(Math.min(...resiliences)) : 0,
      maxResilience: resiliences.length > 0 ? round2(Math.max(...resiliences)) : 0,
      minAlignment: alignments.length > 0 ? round2(Math.min(...alignments)) : null,
      maxAlignment: alignments.length > 0 ? round2(Math.max(...alignments)) : null,
      minRecoveryTrend: recoveryScores.length > 0 ? round2(Math.min(...recoveryScores)) : 0,
      maxRecoveryTrend: recoveryScores.length > 0 ? round2(Math.max(...recoveryScores)) : 0,
    }

    // 5.5 상관관계 매트릭스 (Pearson)
    const corrLabels = ['자기조절', '실행탄력성', '가치-행동', '회복탄성']
    const corrArrays: (number | null)[][] = [
      selfRegulations,
      resiliences,
      users.map(u => u.inference.valueActionAlignment),
      recoveryScores,
    ]
    const corrMatrix = corrLabels.map((_, i) =>
      corrLabels.map((_, j) => {
        if (i === j) return 1
        return pearsonCorr(corrArrays[i], corrArrays[j])
      })
    )

    // 6. 성장 상태 분포
    const stateDistribution: Record<GrowthState, number> = {
      '감정 과부하': 0,
      '동기-실행 괴리': 0,
      '회복 중': 0,
      '급성장': 0,
      '정체기': 0,
      '안정적 성장': 0,
    }
    for (const u of users) {
      stateDistribution[u.inference.growthState]++
    }

    return NextResponse.json({
      users,
      aggregates,
      stateDistribution,
      metadata: {
        computedAt: new Date().toISOString(),
        totalUsers: users.length,
        usersWithCheckins,
        usersWithSurveys,
      },
      correlationMatrix: {
        labels: corrLabels,
        matrix: corrMatrix,
      },
    })
  } catch (error) {
    console.error('GET /api/admin/growth-inference error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}

// Pearson 상관계수 (null 값은 pair-wise 제거)
function pearsonCorr(a: (number | null)[], b: (number | null)[]): number {
  const pairs: [number, number][] = []
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== null && b[i] !== null) {
      pairs.push([a[i] as number, b[i] as number])
    }
  }
  if (pairs.length < 3) return 0
  const n = pairs.length
  const mA = pairs.reduce((s, p) => s + p[0], 0) / n
  const mB = pairs.reduce((s, p) => s + p[1], 0) / n
  let num = 0, dA = 0, dB = 0
  for (const [x, y] of pairs) {
    num += (x - mA) * (y - mB)
    dA += (x - mA) ** 2
    dB += (y - mB) ** 2
  }
  const den = Math.sqrt(dA * dB)
  if (den === 0) return 0
  return round2(num / den)
}
