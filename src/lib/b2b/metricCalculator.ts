// 실제 데이터에서 8개 실행 역량 지표를 계산하는 엔진
// 기준: 1,000회 실행 = 100점 (ISO 30414 기반 완성된 인재)
// 모든 증거 날짜는 실제 DB 레코드의 createdAt에서만 추출
import type { MetricScores, MetricKey, EvidenceDate, MetricEvidenceMap } from './types'

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

interface CheckinRecord {
  mood: number
  energy: number
  note: string | null
  createdAt: Date
}

interface StatSnapshotRecord {
  worldKey: string
  level0to4: number
  confidence0to1: number
}

interface ReportRecord {
  worldKey: string
  title: string
  summary: string
  evidence: string | null
  keywords: string | null
  createdAt: Date
}

interface AnswerRecord {
  rawText: string
  createdAt: Date
  worldKey: string
}

interface SurveyRecord {
  milestone: number
  careerScore: number
  communityScore: number
  nonCognitiveScore: number
  totalScore: number
  createdAt: Date
}

export interface CalculatorInput {
  history: ExecutionRecord[]
  checkins: CheckinRecord[]
  statSnapshots: StatSnapshotRecord[]
  reports: ReportRecord[]
  answers: AnswerRecord[]
  surveys: SurveyRecord[]
  milestoneCount: number
}

export interface CalculatorResult {
  scores: MetricScores
  evidence: MetricEvidenceMap
}

/** worldKey → 한글 월드명 */
const WORLD_LABELS: Record<string, string> = {
  cognition: '인지(학습)',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

/** 0~100 범위 클램핑 */
function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)))
}

/** Date → "YYYY-MM-DD" */
function toDateStr(d: Date | string): string {
  const dt = typeof d === 'string' ? new Date(d) : d
  return dt.toISOString().split('T')[0]
}

/**
 * 성장 곡선: 실행 횟수에 따른 성숙도 계수 (0.0 ~ 1.0)
 * 1,000회에서 1.0에 도달하도록 설계
 * 초반에는 느리게, 중반부터 가속, 후반에 수렴
 */
function maturityFactor(execCount: number): number {
  // 로그 곡선: ln(1 + count) / ln(1001) → 0~1
  return Math.min(Math.log(1 + execCount) / Math.log(1001), 1)
}

/**
 * 실제 사용자 데이터에서 8개 실행 역량 지표를 계산합니다.
 *
 * 점수 기준:
 * - 1,000회 실행 시 최대 100점 도달 가능 (ISO 30414 완성된 인재)
 * - 5회: ~3~10점, 100회: ~15~35점, 500회: ~45~65점, 1000회: ~80~95점
 * - 실행만으로는 충분하지 않고, 질적 요소(텍스트 깊이, 사진, 설문, 리포트)가 높을수록 상한 도달
 */
export function calculateMetricsWithEvidence(input: CalculatorInput): CalculatorResult {
  const { history, checkins, statSnapshots, reports, answers, surveys, milestoneCount } = input

  const sortedHistory = [...history].sort(
    (a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime()
  )
  const milestoneRecords = sortedHistory.slice(0, milestoneCount)
  const totalRecords = milestoneRecords.length

  // cutoff: N번째 실행의 완료 시각
  const cutoffDate = milestoneRecords.length > 0
    ? new Date(milestoneRecords[milestoneRecords.length - 1].completedAt)
    : new Date()

  const filteredCheckins = checkins.filter((c) => new Date(c.createdAt) <= cutoffDate)
  const filteredReports = reports.filter((r) => new Date(r.createdAt) <= cutoffDate)
  const filteredAnswers = answers.filter((a) => new Date(a.createdAt) <= cutoffDate)
  const filteredSurveys = surveys.filter((s) => s.milestone <= milestoneCount)

  // 성숙도 계수 (1,000회 = 1.0)
  const mf = maturityFactor(totalRecords)

  const evidence: MetricEvidenceMap = {
    initiative: [],
    consistency: [],
    reflectiveness: [],
    adaptability: [],
    collaboration: [],
    goalClarity: [],
    emotionalAware: [],
    growthMindset: [],
  }

  // 설문 (해당 마일스톤까지의 최신)
  const latestSurvey = filteredSurveys.length > 0
    ? filteredSurveys.reduce((best, s) => (s.milestone > best.milestone ? s : best), filteredSurveys[0])
    : null

  // ====================================================
  // 1. 자기주도 실행력 (initiative)
  // 실행 다양성 + 사진 능동 기록 + 설문 진로
  // ====================================================
  const uniqueWorlds = new Set(milestoneRecords.map((r) => r.worldKey))
  const diversityRaw = Math.min(uniqueWorlds.size / 6, 1)  // 0~1
  const photoRecords = milestoneRecords.filter((r) => r.photoUrl)
  const photoRate = totalRecords > 0 ? photoRecords.length / totalRecords : 0
  const careerRaw = latestSurvey ? latestSurvey.careerScore / 100 : 0

  // 질적 점수 (0~1) × 성숙도 계수 → 최종 점수
  const initiativeQuality = diversityRaw * 0.4 + photoRate * 0.25 + careerRaw * 0.35
  const initiative = clamp(initiativeQuality * mf * 100)

  const worldFirstDates = new Map<string, string>()
  milestoneRecords.forEach((r) => {
    if (!worldFirstDates.has(r.worldKey)) {
      worldFirstDates.set(r.worldKey, r.date)
      evidence.initiative.push({ date: r.date, source: 'execution', label: WORLD_LABELS[r.worldKey] || r.worldKey })
    }
  })
  photoRecords.forEach((r) => {
    evidence.initiative.push({ date: r.date, source: 'photo', label: WORLD_LABELS[r.worldKey] || r.worldKey })
  })
  if (latestSurvey) {
    evidence.initiative.push({
      date: toDateStr(latestSurvey.createdAt),
      source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }

  // ====================================================
  // 2. 실행 일관성 (consistency)
  // 실행일 밀도 + 체크인 동시 수행율
  // ====================================================
  const uniqueDates = new Set(milestoneRecords.map((r) => r.date))
  const firstDate = milestoneRecords[0]
    ? new Date(milestoneRecords[0].completedAt) : new Date()
  const spanDays = Math.max(
    Math.ceil((cutoffDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)), 1
  )
  const executionDensity = Math.min(uniqueDates.size / spanDays, 1) // 0~1

  const checkinDates = new Set(filteredCheckins.map((c) => toDateStr(c.createdAt)))
  const checkinOverlap = [...uniqueDates].filter((d) => checkinDates.has(d)).length
  const checkinSync = uniqueDates.size > 0 ? checkinOverlap / uniqueDates.size : 0

  const consistencyQuality = executionDensity * 0.7 + checkinSync * 0.3
  const consistency = clamp(consistencyQuality * mf * 100)

  // 날짜별 대표 월드 매핑
  const dateWorldMap = new Map<string, string>()
  milestoneRecords.forEach((r) => {
    if (!dateWorldMap.has(r.date)) dateWorldMap.set(r.date, r.worldKey)
  })
  uniqueDates.forEach((d) => {
    const wk = dateWorldMap.get(d) || ''
    evidence.consistency.push({ date: d, source: 'execution', label: WORLD_LABELS[wk] || wk })
  })
  filteredCheckins.forEach((c) => {
    const d = toDateStr(c.createdAt)
    if (uniqueDates.has(d)) {
      evidence.consistency.push({ date: d, source: 'checkin' })
    }
  })

  // ====================================================
  // 3. 성찰 깊이 (reflectiveness)
  // 텍스트 깊이 + 리포트 + 답변 + 설문 인성
  // ====================================================
  const avgTextLength = totalRecords > 0
    ? milestoneRecords.reduce((sum, r) => sum + (r.executionText?.length || 0), 0) / totalRecords : 0
  const textDepth = Math.min(avgTextLength / 300, 1) // 300자 이상이면 풀 스코어

  const reportRichness = filteredReports.length > 0
    ? Math.min(filteredReports.length / 10, 1) : 0
  const reportsWithEv = filteredReports.filter((r) => r.evidence && r.evidence.length > 20)
  const reportDepth = filteredReports.length > 0
    ? reportsWithEv.length / filteredReports.length : 0

  const avgAnswerLen = filteredAnswers.length > 0
    ? filteredAnswers.reduce((sum, a) => sum + a.rawText.length, 0) / filteredAnswers.length : 0
  const answerDepth = Math.min(avgAnswerLen / 200, 1)

  const reflectSurvey = latestSurvey ? latestSurvey.nonCognitiveScore / 100 : 0

  const reflectivenessQuality = textDepth * 0.35 + reportRichness * 0.15 + reportDepth * 0.15 + answerDepth * 0.15 + reflectSurvey * 0.2
  const reflectiveness = clamp(reflectivenessQuality * mf * 100)

  milestoneRecords
    .filter((r) => r.executionText && r.executionText.length > 50)
    .forEach((r) => { evidence.reflectiveness.push({ date: r.date, source: 'execution', label: WORLD_LABELS[r.worldKey] || r.worldKey }) })
  filteredReports.forEach((r) => {
    evidence.reflectiveness.push({ date: toDateStr(r.createdAt), source: 'report' })
  })
  filteredAnswers
    .filter((a) => a.rawText.length > 30)
    .forEach((a) => { evidence.reflectiveness.push({ date: toDateStr(a.createdAt), source: 'execution', label: WORLD_LABELS[a.worldKey] || a.worldKey }) })
  if (latestSurvey) {
    evidence.reflectiveness.push({
      date: toDateStr(latestSurvey.createdAt), source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }

  // ====================================================
  // 4. 적응적 실행 (adaptability)
  // 전반부 vs 후반부 영역 확장 + 영역 커버리지
  // ====================================================
  const allTimeWorlds = new Set(milestoneRecords.map((r) => r.worldKey))
  const halfIdx = Math.floor(milestoneRecords.length / 2)
  const firstHalf = milestoneRecords.slice(0, halfIdx)
  const secondHalf = milestoneRecords.slice(halfIdx)
  const firstHalfWorlds = new Set(firstHalf.map((r) => r.worldKey))
  const newInSecondHalf = new Set(
    secondHalf.filter((r) => !firstHalfWorlds.has(r.worldKey)).map((r) => r.worldKey)
  )

  const expansionRate = newInSecondHalf.size / 6 // 0~1
  const coverageRate = allTimeWorlds.size / 6     // 0~1

  const adaptabilityQuality = expansionRate * 0.5 + coverageRate * 0.5
  const adaptability = clamp(adaptabilityQuality * mf * 100)

  const seenWorlds = new Set<string>()
  milestoneRecords.forEach((r) => {
    if (!seenWorlds.has(r.worldKey)) {
      seenWorlds.add(r.worldKey)
      evidence.adaptability.push({ date: r.date, source: 'execution', label: WORLD_LABELS[r.worldKey] || r.worldKey })
    }
  })

  // ====================================================
  // 5. 협력적 실행 (collaboration)
  // relationship 영역 비율 + 설문 공동체 + 리포트 협력 키워드
  // ====================================================
  const collabRecords = milestoneRecords.filter((r) => r.worldKey === 'relationship')
  const collabRate = totalRecords > 0 ? Math.min(collabRecords.length / totalRecords * 3, 1) : 0

  const communityRaw = latestSurvey ? latestSurvey.communityScore / 100 : 0

  const collabKeywords = ['협력', '함께', '팀', '소통', '관계', '배려', '존중']
  const collabReports = filteredReports.filter((r) =>
    collabKeywords.some((kw) => r.summary.includes(kw) || (r.keywords && r.keywords.includes(kw)))
  )
  const collabReportRate = filteredReports.length > 0
    ? Math.min(collabReports.length / filteredReports.length, 1) : 0

  const collaborationQuality = collabRate * 0.35 + communityRaw * 0.35 + collabReportRate * 0.3
  const collaboration = clamp(collaborationQuality * mf * 100)

  collabRecords.forEach((r) => { evidence.collaboration.push({ date: r.date, source: 'execution', label: WORLD_LABELS[r.worldKey] || r.worldKey }) })
  collabReports.forEach((r) => { evidence.collaboration.push({ date: toDateStr(r.createdAt), source: 'report' }) })
  if (latestSurvey) {
    evidence.collaboration.push({
      date: toDateStr(latestSurvey.createdAt), source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }

  // ====================================================
  // 6. 목표 명확성 (goalClarity)
  // StatSnapshot confidence + 설문 진로 + 리포트 목표 키워드
  // ====================================================
  const avgConfidence = statSnapshots.length > 0
    ? statSnapshots.reduce((sum, s) => sum + s.confidence0to1, 0) / statSnapshots.length : 0

  const goalCareerRaw = latestSurvey ? latestSurvey.careerScore / 100 : 0

  const goalKeywords = ['목표', '계획', '달성', '실천', '도전', '성취']
  const goalReports = filteredReports.filter((r) =>
    goalKeywords.some((kw) => r.summary.includes(kw) || (r.keywords && r.keywords.includes(kw)))
  )
  const goalReportRate = filteredReports.length > 0
    ? Math.min(goalReports.length / filteredReports.length, 1) : 0

  const goalClarityQuality = avgConfidence * 0.35 + goalCareerRaw * 0.35 + goalReportRate * 0.3
  const goalClarity = clamp(goalClarityQuality * mf * 100)

  goalReports.forEach((r) => { evidence.goalClarity.push({ date: toDateStr(r.createdAt), source: 'report' }) })
  if (latestSurvey) {
    evidence.goalClarity.push({
      date: toDateStr(latestSurvey.createdAt), source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }

  // ====================================================
  // 7. 정서 인식력 (emotionalAware)
  // 체크인 빈도 + 노트 깊이 + 설문 인성 + 리포트 정서 키워드
  // ====================================================
  const checkinDensity = Math.min(filteredCheckins.length / Math.max(totalRecords * 0.5, 1), 1)
  const noteDepth = filteredCheckins.length > 0
    ? filteredCheckins.filter((c) => c.note && c.note.length > 10).length / filteredCheckins.length : 0

  const emotionSurvey = latestSurvey ? latestSurvey.nonCognitiveScore / 100 : 0

  const emotionKeywords = ['감정', '느낌', '기분', '마음', '스트레스', '행복', '걱정', '불안']
  const emotionReports = filteredReports.filter((r) =>
    emotionKeywords.some((kw) => r.summary.includes(kw) || (r.keywords && r.keywords.includes(kw)))
  )
  const emotionReportRate = filteredReports.length > 0
    ? Math.min(emotionReports.length / filteredReports.length, 1) : 0

  const emotionalAwareQuality = checkinDensity * 0.3 + noteDepth * 0.25 + emotionSurvey * 0.25 + emotionReportRate * 0.2
  const emotionalAware = clamp(emotionalAwareQuality * mf * 100)

  filteredCheckins.forEach((c) => { evidence.emotionalAware.push({ date: toDateStr(c.createdAt), source: 'checkin' }) })
  emotionReports.forEach((r) => { evidence.emotionalAware.push({ date: toDateStr(r.createdAt), source: 'report' }) })
  if (latestSurvey) {
    evidence.emotionalAware.push({
      date: toDateStr(latestSurvey.createdAt), source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }

  // ====================================================
  // 8. 성장 마인드셋 (growthMindset)
  // StatSnapshot level + 실행 추세 + 설문 종합 + 리포트 성장 키워드
  // ====================================================
  const avgLevel = statSnapshots.length > 0
    ? statSnapshots.reduce((sum, s) => sum + s.level0to4, 0) / statSnapshots.length : 0
  const levelRaw = avgLevel / 4 // 0~1

  const trendPositive = secondHalf.length >= firstHalf.length ? 1 : 0.4

  const surveyGrowth = latestSurvey ? latestSurvey.totalScore / 100 : 0

  const growthKeywords = ['성장', '발전', '개선', '노력', '도전', '변화', '배움']
  const growthReports = filteredReports.filter((r) =>
    growthKeywords.some((kw) => r.summary.includes(kw) || (r.keywords && r.keywords.includes(kw)))
  )
  const growthReportRate = filteredReports.length > 0
    ? Math.min(growthReports.length / filteredReports.length, 1) : 0

  const growthMindsetQuality = levelRaw * 0.25 + trendPositive * 0.2 + surveyGrowth * 0.3 + growthReportRate * 0.25
  const growthMindset = clamp(growthMindsetQuality * mf * 100)

  growthReports.forEach((r) => { evidence.growthMindset.push({ date: toDateStr(r.createdAt), source: 'report' }) })
  if (latestSurvey) {
    evidence.growthMindset.push({
      date: toDateStr(latestSurvey.createdAt), source: 'survey',
      label: `설문(${latestSurvey.milestone}회)`,
    })
  }
  if (secondHalf.length >= firstHalf.length && secondHalf.length > 0) {
    secondHalf.slice(-3).forEach((r) => {
      evidence.growthMindset.push({ date: r.date, source: 'execution', label: WORLD_LABELS[r.worldKey] || r.worldKey })
    })
  }

  // ====================================================
  // 증거 후처리: 중복 제거 + 최신순 정렬
  // ====================================================
  for (const key of Object.keys(evidence) as MetricKey[]) {
    const seen = new Set<string>()
    evidence[key] = evidence[key]
      .filter((e) => {
        const uid = `${e.date}-${e.source}-${e.label || ''}`
        if (seen.has(uid)) return false
        seen.add(uid)
        return true
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }

  return {
    scores: {
      initiative, consistency, reflectiveness, adaptability,
      collaboration, goalClarity, emotionalAware, growthMindset,
    },
    evidence,
  }
}

/** 기존 호환용 (증거 없이 점수만) */
export function calculateMetrics(input: {
  history: ExecutionRecord[]
  checkins: CheckinRecord[]
  statSnapshots: StatSnapshotRecord[]
  periodDays: number
}): MetricScores {
  const result = calculateMetricsWithEvidence({
    history: input.history,
    checkins: input.checkins,
    statSnapshots: input.statSnapshots,
    reports: [],
    answers: [],
    surveys: [],
    milestoneCount: input.history.length,
  })
  return result.scores
}

/** 종합 점수 계산 (8개 평균) */
export function calculateOverallScore(scores: MetricScores): number {
  const values = Object.values(scores) as number[]
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}
