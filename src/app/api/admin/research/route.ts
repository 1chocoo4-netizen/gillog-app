import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { hashUserId } from '@/lib/survey-crypto'
import {
  RESEARCH_MILESTONES,
  SUB_COMPETENCIES,
  SUB_COMPETENCIES_BY_AREA,
  calcSubCompetencySurveyScore,
  type ResearchArea,
  type SubCompetencyId,
} from '@/lib/research/competencyFramework'
import {
  calculateBehavioralScores,
  aggregateToAreaScores,
  integrateScores,
  type BehavioralScores,
} from '@/lib/research/behavioralMetrics'
import {
  descriptive,
  round2,
  mean,
  analyzeGrowth,
  calculateSlopes,
  aggregateSubCompetencyStats,
  cohenDPaired,
  interpretCohenD,
} from '@/lib/research/longitudinalEngine'

// ========================================
// 타입 정의
// ========================================

interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  executionText: string
  photoUrl?: string
  energy: number
  groupId?: string
}

interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  text: string
  aiRecord?: string
  completed: boolean
  createdAt: string
  alarmTime?: string
  isDaily?: boolean
  lastCompletedDate?: string
}

// ========================================
// GET /api/admin/research
// ========================================

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 1. 모든 설문 응답 로드
    const allSurveyResponses = await prisma.surveyResponse.findMany({
      select: {
        userHash: true,
        milestone: true,
        careerScore: true,
        communityScore: true,
        nonCognitiveScore: true,
        learningScore: true,
        habitScore: true,
        totalScore: true,
        encryptedData: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    // 2. 모든 UserData 로드 (history + executions)
    const allUserData = await prisma.userData.findMany({
      select: {
        userId: true,
        history: true,
        executions: true,
      },
    })

    // 3. userHash 매칭: userId → sha256(userId)
    const userDataByHash: Record<string, {
      userId: string
      history: ExecutionRecord[]
      executions: ExecutionItem[]
    }> = {}

    for (const ud of allUserData) {
      const hash = hashUserId(ud.userId)
      const hist = typeof ud.history === 'string' ? JSON.parse(ud.history) : ud.history
      const exec = typeof ud.executions === 'string' ? JSON.parse(ud.executions) : ud.executions
      userDataByHash[hash] = {
        userId: ud.userId,
        history: Array.isArray(hist) ? hist : [],
        executions: Array.isArray(exec) ? exec : [],
      }
    }

    // 4. 설문 응답을 userHash별로 그룹핑
    const surveyByUser: Record<string, typeof allSurveyResponses> = {}
    for (const r of allSurveyResponses) {
      if (!surveyByUser[r.userHash]) surveyByUser[r.userHash] = []
      surveyByUser[r.userHash].push(r)
    }

    // 5. 모든 고유 사용자(설문 참여자) 수집
    const allUserHashes = new Set([
      ...Object.keys(surveyByUser),
    ])

    const MILESTONES = [...RESEARCH_MILESTONES]
    const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']

    // ========================================
    // A. 마일스톤별 하위역량 기술통계
    // ========================================

    // 사용자별, 마일스톤별 하위역량 점수 수집
    type UserMilestoneData = {
      surveyScores: Record<ResearchArea, number>
      behavioralScores: BehavioralScores | null
      subCompScores: Record<SubCompetencyId, number>
      integratedAreaScores: Record<ResearchArea, number>
    }

    const userMilestoneMap: Record<string, Record<number, UserMilestoneData>> = {}

    for (const userHash of allUserHashes) {
      const surveys = surveyByUser[userHash] || []
      const userData = userDataByHash[userHash]

      userMilestoneMap[userHash] = {}

      for (const survey of surveys) {
        const ms = survey.milestone

        // 설문 영역 점수
        const surveyScores: Record<ResearchArea, number> = {
          career: survey.careerScore,
          community: survey.communityScore,
          nonCognitive: survey.nonCognitiveScore,
          learning: survey.learningScore,
          habit: survey.habitScore,
        }

        // 행동 로그 점수 (UserData 매칭된 경우만)
        let behavioralScores: BehavioralScores | null = null
        if (userData && userData.history.length > 0) {
          behavioralScores = calculateBehavioralScores(
            userData.history,
            userData.executions,
            ms,
          )
        }

        // 하위역량 점수 산출 (설문 기반)
        const subCompScores = {} as Record<SubCompetencyId, number>
        for (const sc of SUB_COMPETENCIES) {
          // 설문 점수: 해당 영역 점수를 하위역량 문항 비율로 배분
          const areaSurveyScore = surveyScores[sc.area]
          subCompScores[sc.id] = round2(areaSurveyScore)
        }

        // 통합 영역 점수
        const integratedAreaScores = {} as Record<ResearchArea, number>
        for (const area of areas) {
          if (behavioralScores) {
            const areaBehaScores = aggregateToAreaScores(behavioralScores)
            integratedAreaScores[area] = round2(integrateScores(surveyScores[area], areaBehaScores[area]))
          } else {
            integratedAreaScores[area] = surveyScores[area]
          }
        }

        userMilestoneMap[userHash][ms] = {
          surveyScores,
          behavioralScores,
          subCompScores,
          integratedAreaScores,
        }
      }
    }

    // ========================================
    // B. 결과 집계
    // ========================================

    // B-1. 마일스톤별 하위역량 기술통계
    const subCompetencyStats: Record<number, Record<ResearchArea, Record<string, ReturnType<typeof descriptive>>>> = {}
    for (const ms of MILESTONES) {
      subCompetencyStats[ms] = {} as Record<ResearchArea, Record<string, ReturnType<typeof descriptive>>>
      for (const area of areas) {
        subCompetencyStats[ms][area] = {}
        const subComps = SUB_COMPETENCIES_BY_AREA[area]
        for (const sc of subComps) {
          const scores = Object.values(userMilestoneMap)
            .map(m => m[ms]?.subCompScores?.[sc.id])
            .filter((v): v is number => v != null)
          subCompetencyStats[ms][area][sc.id] = descriptive(scores)
        }
      }
    }

    // B-2. 마일스톤별 통합 점수
    const integratedScores = {
      surveyOnly: {} as Record<number, Record<ResearchArea, number>>,
      integrated: {} as Record<number, Record<ResearchArea, number>>,
    }

    for (const ms of MILESTONES) {
      integratedScores.surveyOnly[ms] = {} as Record<ResearchArea, number>
      integratedScores.integrated[ms] = {} as Record<ResearchArea, number>

      for (const area of areas) {
        const surveyVals = Object.values(userMilestoneMap)
          .map(m => m[ms]?.surveyScores?.[area])
          .filter((v): v is number => v != null)

        const integratedVals = Object.values(userMilestoneMap)
          .map(m => m[ms]?.integratedAreaScores?.[area])
          .filter((v): v is number => v != null)

        integratedScores.surveyOnly[ms][area] = round2(mean(surveyVals))
        integratedScores.integrated[ms][area] = round2(mean(integratedVals))
      }
    }

    // B-3. 성장률 분석 (paired)
    const growthPairs: [number, number][] = [[1, 100], [100, 500], [500, 1000], [1, 500], [1, 1000]]
    const growthAnalysis = growthPairs.map(([from, to]) => {
      const pairedUsers = Object.entries(userMilestoneMap)
        .filter(([, ms]) => ms[from] && ms[to])

      if (pairedUsers.length < 2) {
        return { from, to, n: pairedUsers.length, deltaByArea: {}, growthRateByArea: {}, cohenDByArea: {} }
      }

      const fromScores = pairedUsers.map(([, ms]) => ms[from].integratedAreaScores)
      const toScores = pairedUsers.map(([, ms]) => ms[to].integratedAreaScores)

      return analyzeGrowth(fromScores, toScores, from, to)
    })

    // B-4. 구간별 성장 기울기
    const avgScoresByMilestone: Record<number, Record<ResearchArea, number>> = {}
    for (const ms of MILESTONES) {
      avgScoresByMilestone[ms] = integratedScores.integrated[ms] || {} as Record<ResearchArea, number>
    }
    const thresholdSlopes = calculateSlopes(avgScoresByMilestone, MILESTONES)

    // B-5. 개인 성장 곡선 (비식별)
    const individualCurves = Object.entries(userMilestoneMap)
      .filter(([, ms]) => Object.keys(ms).length >= 1)
      .map(([, ms], idx) => {
        const milestoneKeys = Object.keys(ms).map(Number).sort((a, b) => a - b)
        const totalExec = Object.values(userDataByHash).find(
          ud => {
            const h = hashUserId(ud.userId)
            return Object.keys(userMilestoneMap).indexOf(h) !== -1
          }
        )?.history.length || 0

        return {
          id: `R${String(idx + 1).padStart(3, '0')}`,
          totalExecutions: totalExec,
          milestoneGroup: milestoneKeys[milestoneKeys.length - 1] || 0,
          dataPoints: milestoneKeys.map(m => ({
            milestone: m,
            survey: ms[m].surveyScores,
            behavioral: ms[m].behavioralScores
              ? aggregateToAreaScores(ms[m].behavioralScores!)
              : null,
            integrated: ms[m].integratedAreaScores,
          })),
        }
      })

    // B-6. 마일스톤 분포
    const milestoneDistribution: Record<number, number> = {}
    for (const ms of MILESTONES) {
      milestoneDistribution[ms] = Object.values(userMilestoneMap)
        .filter(m => m[ms] != null).length
    }

    // B-7. 대응표본 분석 (영역별 paired)
    const pairedAnalysis = growthPairs.map(([from, to]) => {
      const pairedUsers = Object.entries(userMilestoneMap)
        .filter(([, ms]) => ms[from] && ms[to])
      const n = pairedUsers.length

      const byArea: Record<string, {
        n: number; preMean: number; postMean: number; meanDiff: number
        cohenD: number; interpretation: string
      }> = {}

      for (const area of areas) {
        const pre = pairedUsers.map(([, ms]) => ms[from].integratedAreaScores[area])
        const post = pairedUsers.map(([, ms]) => ms[to].integratedAreaScores[area])
        const diffs = pre.map((v, i) => post[i] - v)
        const d = n >= 2 ? cohenDPaired(pre, post) : 0

        byArea[area] = {
          n,
          preMean: round2(mean(pre)),
          postMean: round2(mean(post)),
          meanDiff: round2(mean(diffs)),
          cohenD: round2(d),
          interpretation: interpretCohenD(d),
        }
      }

      return { from, to, ...byArea }
    })

    // B-8. 하위역량별 기술통계 (마일스톤별 집계)
    const subCompStatsAggregated: Record<number, ReturnType<typeof aggregateSubCompetencyStats>> = {}
    for (const ms of MILESTONES) {
      const scoresPerUser = Object.values(userMilestoneMap)
        .filter(m => m[ms])
        .map(m => m[ms].subCompScores)
      subCompStatsAggregated[ms] = aggregateSubCompetencyStats(scoresPerUser)
    }

    // ========================================
    // 응답
    // ========================================

    return NextResponse.json({
      subCompetencyStats: subCompStatsAggregated,
      integratedScores,
      growthAnalysis,
      thresholdAnalysis: { slopes: thresholdSlopes },
      individualCurves,
      pairedAnalysis,
      metadata: {
        computedAt: new Date().toISOString(),
        totalParticipants: allUserHashes.size,
        milestoneDistribution,
        milestones: MILESTONES,
        areas: areas.map(a => a),
        areaLabels: {
          career: '진로', community: '공동체', nonCognitive: '인성',
          learning: '학습', habit: '습관',
        },
      },
    })
  } catch (error) {
    console.error('GET /api/admin/research error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}
