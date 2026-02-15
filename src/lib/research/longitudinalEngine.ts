// ========================================
// 종단 분석 통계 엔진
// growth/route.ts 통계 함수 재사용 + 확장
// ========================================

import type { ResearchArea, SubCompetencyId } from './competencyFramework'

// ========================================
// 기술통계 함수 (growth/route.ts에서 추출)
// ========================================

export function mean(arr: number[]): number {
  if (arr.length === 0) return 0
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

export function sd(arr: number[]): number {
  if (arr.length < 2) return 0
  const m = mean(arr)
  const variance = arr.reduce((sum, x) => sum + (x - m) ** 2, 0) / (arr.length - 1)
  return Math.sqrt(variance)
}

export function median(arr: number[]): number {
  if (arr.length === 0) return 0
  const sorted = [...arr].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

export function quartiles(arr: number[]): { q1: number; q3: number } {
  if (arr.length === 0) return { q1: 0, q3: 0 }
  const sorted = [...arr].sort((a, b) => a - b)
  const q1Idx = Math.floor(sorted.length * 0.25)
  const q3Idx = Math.floor(sorted.length * 0.75)
  return { q1: sorted[q1Idx], q3: sorted[q3Idx] }
}

export function round2(n: number): number {
  return Math.round(n * 100) / 100
}

// Cohen's d for paired samples
export function cohenDPaired(pre: number[], post: number[]): number {
  if (pre.length < 2 || pre.length !== post.length) return 0
  const diffs = pre.map((v, i) => post[i] - v)
  const meanDiff = mean(diffs)
  const sdDiff = sd(diffs)
  if (sdDiff === 0) return 0
  return meanDiff / sdDiff
}

export function interpretCohenD(d: number): string {
  const abs = Math.abs(d)
  if (abs < 0.2) return '무시할 수준'
  if (abs < 0.5) return '작은 효과'
  if (abs < 0.8) return '중간 효과'
  return '큰 효과'
}

// ========================================
// 기술통계 구조체
// ========================================

export interface DescriptiveStats {
  n: number
  mean: number
  sd: number
  median: number
  min: number
  max: number
  q1: number
  q3: number
}

export function descriptive(arr: number[]): DescriptiveStats {
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
// 성장률 분석
// ========================================

export interface GrowthAnalysisResult {
  from: number
  to: number
  n: number
  deltaByArea: Record<ResearchArea, number>
  growthRateByArea: Record<ResearchArea, number>
  cohenDByArea: Record<ResearchArea, { d: number; interpretation: string }>
}

export function analyzeGrowth(
  fromScores: Record<ResearchArea, number>[],
  toScores: Record<ResearchArea, number>[],
  from: number,
  to: number,
): GrowthAnalysisResult {
  const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']
  const n = Math.min(fromScores.length, toScores.length)

  const deltaByArea = {} as Record<ResearchArea, number>
  const growthRateByArea = {} as Record<ResearchArea, number>
  const cohenDByArea = {} as Record<ResearchArea, { d: number; interpretation: string }>

  for (const area of areas) {
    const pre = fromScores.slice(0, n).map(s => s[area])
    const post = toScores.slice(0, n).map(s => s[area])
    const diffs = pre.map((v, i) => post[i] - v)

    const meanDelta = mean(diffs)
    deltaByArea[area] = round2(meanDelta)

    const preMean = mean(pre)
    growthRateByArea[area] = preMean > 0 ? round2((meanDelta / preMean) * 100) : 0

    const d = cohenDPaired(pre, post)
    cohenDByArea[area] = { d: round2(d), interpretation: interpretCohenD(d) }
  }

  return { from, to, n, deltaByArea, growthRateByArea, cohenDByArea }
}

// ========================================
// 구간별 성장 기울기 (임계점 탐지)
// ========================================

export interface SlopeResult {
  from: number
  to: number
  area: ResearchArea
  slope: number         // 기울기 (점수변화 / 실행횟수변화)
  acceleration: number  // 가속도 (이전 구간 대비)
  trend: 'accelerating' | 'decelerating' | 'steady'
}

export function calculateSlopes(
  milestoneScores: Record<number, Record<ResearchArea, number>>,
  milestones: number[],
): SlopeResult[] {
  const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']
  const results: SlopeResult[] = []

  for (const area of areas) {
    let prevSlope: number | null = null

    for (let i = 0; i < milestones.length - 1; i++) {
      const from = milestones[i]
      const to = milestones[i + 1]
      const fromScore = milestoneScores[from]?.[area] ?? 0
      const toScore = milestoneScores[to]?.[area] ?? 0

      const executionDiff = to - from
      const scoreDiff = toScore - fromScore
      const slope = executionDiff > 0 ? round2(scoreDiff / executionDiff * 100) : 0

      let acceleration = 0
      let trend: SlopeResult['trend'] = 'steady'

      if (prevSlope !== null) {
        acceleration = round2(slope - prevSlope)
        if (acceleration > 0.01) trend = 'accelerating'
        else if (acceleration < -0.01) trend = 'decelerating'
      }

      results.push({ from, to, area, slope, acceleration, trend })
      prevSlope = slope
    }
  }

  return results
}

// ========================================
// 하위역량 기술통계 집계
// ========================================

export type SubCompetencyStatsMap = Record<SubCompetencyId, DescriptiveStats>

export function aggregateSubCompetencyStats(
  scoresPerUser: Record<SubCompetencyId, number>[],
): SubCompetencyStatsMap {
  const allIds: SubCompetencyId[] = [
    'C1', 'C2', 'C3', 'C4', 'C5',
    'M1', 'M2', 'M3', 'M4', 'M5',
    'N1', 'N2', 'N3', 'N4', 'N5',
    'L1', 'L2', 'L3', 'L4', 'L5',
    'H1', 'H2', 'H3', 'H4', 'H5',
  ]

  const result = {} as SubCompetencyStatsMap
  for (const id of allIds) {
    const vals = scoresPerUser
      .map(s => s[id])
      .filter((v): v is number => v != null && !isNaN(v))
    result[id] = descriptive(vals)
  }
  return result
}
