// ========================================
// AI 성장엔진 — 공동체 기여도 (Community Contribution Score)
// 가중치: relationship실행빈도(30%) + 공동체설문(25%)
//         + character/attitude참여(20%) + 공동체키워드(15%) + 텍스트다양성(10%)
// ========================================

import { round2 } from '@/lib/research/longitudinalEngine'
import { COMMUNITY_KEYWORDS, calcAvgKeywordDensity } from './textAnalysis'
import type { RawExecution } from './types'

export interface CommunityContributionInput {
  communitySurveyScore: number | null
  history: RawExecution[]
  answerTexts: string[]  // 레슨 답변 + 실행 텍스트
}

export function calcCommunityContributionScore(input: CommunityContributionInput): {
  score: number
  signals: string[]
  breakdown: Record<string, number>
} {
  const signals: string[] = []

  // 1. relationship 실행 빈도 (30%)
  const relExecs = input.history.filter(h => h.worldKey === 'relationship')
  const totalExecs = input.history.length
  const relRatio = totalExecs > 0 ? relExecs.length / totalExecs : 0
  const relFreqScore = Math.min(100, relRatio * 250)
  if (relExecs.length === 0) signals.push('관계 월드 실행 없음')

  // 2. 공동체 설문 점수 (25%)
  const surveyScore = input.communitySurveyScore ?? 50
  if (input.communitySurveyScore === null) signals.push('공동체 설문 데이터 없음')

  // 3. character/attitude 참여 (20%)
  const charAttExecs = input.history.filter(
    h => h.worldKey === 'character' || h.worldKey === 'attitude'
  )
  const charAttRatio = totalExecs > 0 ? charAttExecs.length / totalExecs : 0
  const charAttScore = Math.min(100, charAttRatio * 250)

  // 4. 답변 내 공동체 키워드 밀도 (15%)
  const keywordDensity = calcAvgKeywordDensity(input.answerTexts, COMMUNITY_KEYWORDS)
  if (input.answerTexts.length === 0) signals.push('텍스트 데이터 부족')

  // 5. 실행 텍스트 다양성 (10%)
  const relTexts = relExecs
    .map(h => (h.executionText ?? '').trim().toLowerCase())
    .filter(t => t.length > 0)
  const uniqueTexts = new Set(relTexts).size
  const diversityScore = relTexts.length > 0
    ? Math.min(100, (uniqueTexts / relTexts.length) * 100)
    : 50

  const score = round2(
    relFreqScore * 0.30 +
    surveyScore * 0.25 +
    charAttScore * 0.20 +
    keywordDensity * 0.15 +
    diversityScore * 0.10
  )

  return {
    score: Math.min(100, Math.max(0, score)),
    signals,
    breakdown: {
      relFreqScore: round2(relFreqScore),
      surveyScore: round2(surveyScore),
      charAttScore: round2(charAttScore),
      keywordDensity: round2(keywordDensity),
      diversityScore: round2(diversityScore),
    },
  }
}
