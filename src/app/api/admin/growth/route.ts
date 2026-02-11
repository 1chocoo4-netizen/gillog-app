import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

// ========================================
// 통계 유틸 함수
// ========================================

function mean(arr: number[]): number {
  if (arr.length === 0) return 0
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function sd(arr: number[]): number {
  if (arr.length < 2) return 0
  const m = mean(arr)
  const variance = arr.reduce((sum, x) => sum + (x - m) ** 2, 0) / (arr.length - 1)
  return Math.sqrt(variance)
}

function median(arr: number[]): number {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function quartiles(arr: number[]): { q1: number; q3: number } {
  if (arr.length === 0) return { q1: 0, q3: 0 }
  const sorted = [...arr].sort((a, b) => a - b)
  const q1Idx = Math.floor(sorted.length * 0.25)
  const q3Idx = Math.floor(sorted.length * 0.75)
  return { q1: sorted[q1Idx], q3: sorted[q3Idx] }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// Cohen's d for paired samples
function cohenDPaired(pre: number[], post: number[]): number {
  if (pre.length < 2 || pre.length !== post.length) return 0
  const diffs = pre.map((v, i) => post[i] - v)
  const meanDiff = mean(diffs)
  const sdDiff = sd(diffs)
  if (sdDiff === 0) return 0
  return meanDiff / sdDiff
}

// 효과크기 해석
function interpretCohenD(d: number): string {
  const abs = Math.abs(d)
  if (abs < 0.2) return '무시할 수준'
  if (abs < 0.5) return '작은 효과'
  if (abs < 0.8) return '중간 효과'
  return '큰 효과'
}

interface DescriptiveStats {
  n: number
  mean: number
  sd: number
  median: number
  min: number
  max: number
  q1: number
  q3: number
}

function descriptive(arr: number[]): DescriptiveStats {
  if (arr.length === 0) return { n: 0, mean: 0, sd: 0, median: 0, min: 0, max: 0, q1: 0, q3: 0 }
  const { q1: q1Val, q3: q3Val } = quartiles(arr)
  return {
    n: arr.length,
    mean: round2(mean(arr)),
    sd: round2(sd(arr)),
    median: round2(median(arr)),
    min: round2(Math.min(...arr)),
    max: round2(Math.max(...arr)),
    q1: round2(q1Val),
    q3: round2(q3Val),
  }
}

// ========================================
// API 핸들러
// ========================================

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 전체 설문 데이터 (encryptedData 제외!)
    const allResponses = await prisma.surveyResponse.findMany({
      select: {
        userHash: true,
        milestone: true,
        careerScore: true,
        communityScore: true,
        nonCognitiveScore: true,
        totalScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    // ========================================
    // 1. 마일스톤별 기술통계 (Descriptive Statistics)
    // ========================================
    const MILESTONES = [5, 100, 500]
    const areas = ['career', 'community', 'nonCognitive', 'total'] as const
    type Area = typeof areas[number]

    const scoreKey: Record<Area, 'careerScore' | 'communityScore' | 'nonCognitiveScore' | 'totalScore'> = {
      career: 'careerScore',
      community: 'communityScore',
      nonCognitive: 'nonCognitiveScore',
      total: 'totalScore',
    }

    const descriptiveByMilestone: Record<number, Record<Area, DescriptiveStats>> = {}

    for (const ms of MILESTONES) {
      const msResponses = allResponses.filter((r) => r.milestone === ms)
      descriptiveByMilestone[ms] = {} as Record<Area, DescriptiveStats>
      for (const area of areas) {
        const scores = msResponses.map((r) => r[scoreKey[area]])
        descriptiveByMilestone[ms][area] = descriptive(scores)
      }
    }

    // ========================================
    // 2. 대응표본 분석 (Paired Sample Analysis)
    //    같은 userHash가 여러 마일스톤에 응답한 경우 추적
    // ========================================
    const userMilestoneMap: Record<string, Record<number, {
      career: number; community: number; nonCognitive: number; total: number
    }>> = {}

    for (const r of allResponses) {
      if (!userMilestoneMap[r.userHash]) {
        userMilestoneMap[r.userHash] = {}
      }
      userMilestoneMap[r.userHash][r.milestone] = {
        career: r.careerScore,
        community: r.communityScore,
        nonCognitive: r.nonCognitiveScore,
        total: r.totalScore,
      }
    }

    // 대응표본 쌍 생성: 5→100, 100→500, 5→500
    const pairs: [number, number][] = [[5, 100], [100, 500], [5, 500]]

    const pairedAnalysis = pairs.map(([from, to]) => {
      // 두 마일스톤 모두 완료한 사용자 찾기
      const pairedUsers = Object.entries(userMilestoneMap)
        .filter(([, ms]) => ms[from] && ms[to])

      const n = pairedUsers.length

      const result: Record<Area, {
        n: number
        preMean: number
        postMean: number
        meanDiff: number
        sdDiff: number
        cohenD: number
        interpretation: string
      }> = {} as typeof result

      for (const area of areas) {
        const preScores = pairedUsers.map(([, ms]) => ms[from][area])
        const postScores = pairedUsers.map(([, ms]) => ms[to][area])
        const diffs = preScores.map((v, i) => postScores[i] - v)
        const d = cohenDPaired(preScores, postScores)

        result[area] = {
          n,
          preMean: round2(mean(preScores)),
          postMean: round2(mean(postScores)),
          meanDiff: round2(mean(diffs)),
          sdDiff: round2(sd(diffs)),
          cohenD: round2(d),
          interpretation: interpretCohenD(d),
        }
      }

      return { from, to, ...result }
    })

    // ========================================
    // 3. 참여자 추적 퍼널 (Attrition Funnel)
    // ========================================
    const uniqueUsers = new Set(allResponses.map((r) => r.userHash))
    const usersAt5 = new Set(allResponses.filter((r) => r.milestone === 5).map((r) => r.userHash))
    const usersAt100 = new Set(allResponses.filter((r) => r.milestone === 100).map((r) => r.userHash))
    const usersAt500 = new Set(allResponses.filter((r) => r.milestone === 500).map((r) => r.userHash))

    // 연속 참여 추적
    const usersAt5and100 = [...usersAt5].filter((h) => usersAt100.has(h))
    const usersAt100and500 = [...usersAt100].filter((h) => usersAt500.has(h))
    const usersAllThree = [...usersAt5].filter((h) => usersAt100.has(h) && usersAt500.has(h))

    const attritionFunnel = {
      totalParticipants: uniqueUsers.size,
      milestone5: { n: usersAt5.size, rate: 100 },
      milestone100: {
        n: usersAt100.size,
        retentionFrom5: usersAt5.size > 0 ? round2((usersAt5and100.length / usersAt5.size) * 100) : 0,
        pairedWith5: usersAt5and100.length,
      },
      milestone500: {
        n: usersAt500.size,
        retentionFrom100: usersAt100.size > 0 ? round2((usersAt100and500.length / usersAt100.size) * 100) : 0,
        pairedWith100: usersAt100and500.length,
      },
      completedAll: usersAllThree.length,
      overallRetention: usersAt5.size > 0 ? round2((usersAllThree.length / usersAt5.size) * 100) : 0,
    }

    // ========================================
    // 4. 점수 분포 (히스토그램용)
    // ========================================
    const bins = [
      { label: '0-20', min: 0, max: 20 },
      { label: '20-40', min: 20, max: 40 },
      { label: '40-60', min: 40, max: 60 },
      { label: '60-80', min: 60, max: 80 },
      { label: '80-100', min: 80, max: 101 },
    ]

    const distribution: Record<number, Record<Area, { label: string; count: number }[]>> = {}

    for (const ms of MILESTONES) {
      const msResponses = allResponses.filter((r) => r.milestone === ms)
      distribution[ms] = {} as Record<Area, { label: string; count: number }[]>
      for (const area of areas) {
        const scores = msResponses.map((r) => r[scoreKey[area]])
        distribution[ms][area] = bins.map((bin) => ({
          label: bin.label,
          count: scores.filter((s) => s >= bin.min && s < bin.max).length,
        }))
      }
    }

    // ========================================
    // 5. 개인 궤적 데이터 (비식별)
    //    대응표본에 해당하는 사용자들의 마일스톤별 총점 변화
    // ========================================
    const trajectories = Object.entries(userMilestoneMap)
      .filter(([, ms]) => Object.keys(ms).length >= 2)
      .map(([hash, ms], idx) => ({
        id: `P${String(idx + 1).padStart(3, '0')}`, // P001, P002... (비식별)
        milestones: Object.entries(ms)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([milestone, scores]) => ({
            milestone: Number(milestone),
            ...scores,
          })),
      }))

    return NextResponse.json({
      descriptiveByMilestone,
      pairedAnalysis,
      attritionFunnel,
      distribution,
      trajectories,
      metadata: {
        totalResponses: allResponses.length,
        uniqueParticipants: uniqueUsers.size,
        dataCollectionRange: allResponses.length > 0
          ? {
              from: allResponses[0].createdAt,
              to: allResponses[allResponses.length - 1].createdAt,
            }
          : null,
        milestones: MILESTONES,
        areas: ['진로(career)', '공동체(community)', '인성(nonCognitive)', '총점(total)'],
      },
    })
  } catch (error) {
    console.error('GET /api/admin/growth error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
