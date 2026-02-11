// B2B 실행 DNA 대시보드 타입 정의

export interface MetricScores {
  initiative: number      // 자기주도 실행력
  consistency: number     // 실행 일관성
  reflectiveness: number  // 성찰 깊이
  adaptability: number    // 적응적 실행
  collaboration: number   // 협력적 실행
  goalClarity: number     // 목표 명확성
  emotionalAware: number  // 정서 인식력
  growthMindset: number   // 성장 마인드셋
}

export type MetricKey = keyof MetricScores

export interface PeriodMetrics {
  period: string
  scores: MetricScores
  overallScore: number
}

export interface DemoUser {
  id: string
  name: string
  current: PeriodMetrics
  previous: PeriodMetrics
}

/** 실행 횟수 기반 마일스톤 */
export type Milestone = '5' | '100' | '500' | '1000'

export interface MetricChange {
  key: MetricKey
  current: number
  previous: number
  delta: number
  deltaPercent: number
}

/** 지표별 증거 날짜 */
export interface EvidenceDate {
  date: string        // "2026-01-15"
  source: 'execution' | 'survey' | 'checkin' | 'report' | 'photo'
  label?: string      // "설문(5회)" 등
}

/** 8개 지표별 증거 날짜 모음 */
export type MetricEvidenceMap = Record<MetricKey, EvidenceDate[]>

/** 등록된 사용자 (동의 완료) */
export interface RegisteredUser {
  userId: string
  name: string
  email: string
  consentStatus: string
  executionCount: number
}
