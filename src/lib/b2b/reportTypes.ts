import type { MetricScores } from './types'

/** 담당자가 작성하는 코멘트 */
export interface AdminComments {
  learning: string   // 학습 코멘트
  relationship: string // 관계 코멘트
  attitude: string   // 태도 코멘트
}

/** 성장 리포트에 필요한 전체 데이터 */
export interface GrowthReportData {
  studentName: string
  email: string
  institutionName: string
  executionCount: number
  milestone: string
  currentScores: MetricScores
  previousScores: MetricScores | null
  overallScore: number
  previousOverallScore: number | null
  insights: Record<string, string>
  comments: AdminComments
  generatedAt: string  // ISO date string
}
