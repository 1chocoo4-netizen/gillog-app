// ========================================
// AI 성장엔진 — 진로성숙도 (Career Maturity Index)
// 가중치: 진로설문(25%) + selfDirected실행빈도(25%) + 진로키워드밀도(20%)
//         + 버킷리스트진로완료율(15%) + 레슨답변깊이(15%)
// 코칭 데이터 있으면 기존 88% + 코칭 12% (careerMention 60% + goalClarity 40%)
// ========================================

import { round2 } from '@/lib/research/longitudinalEngine'
import { CAREER_KEYWORDS, calcAvgKeywordDensity, calcAnswerDepth, isCareerRelated } from './textAnalysis'
import type { RawExecution, BucketItem } from './types'
import type { CoachingSignals } from '@/lib/coaching/coachingAnalyzer'

export interface CareerMaturityInput {
  careerSurveyScore: number | null   // 설문 진로 점수 (0~100), null이면 중립
  history: RawExecution[]            // 전체 실행 기록
  bucketList: BucketItem[]           // 버킷리스트
  lessonAnswerTexts: string[]        // 레슨 답변 텍스트들
  monthlyGoalTexts: string[]         // 월간 목표 텍스트들
  coachingSignals?: CoachingSignals  // 코칭 분석 시그널 (없으면 기존 로직)
}

export function calcCareerMaturityIndex(input: CareerMaturityInput): {
  score: number
  signals: string[]
  breakdown: Record<string, number>
} {
  const signals: string[] = []

  // 1. 진로 설문 점수 (25%)
  const surveyScore = input.careerSurveyScore ?? 50
  if (input.careerSurveyScore === null) signals.push('설문 데이터 없음 (중립값 적용)')

  // 2. selfDirected 월드 실행 빈도 (25%)
  const selfDirectedExecs = input.history.filter(h => h.worldKey === 'selfDirected')
  const totalExecs = input.history.length
  const selfDirectedRatio = totalExecs > 0 ? selfDirectedExecs.length / totalExecs : 0
  const execFreqScore = Math.min(100, selfDirectedRatio * 200) // 50% 이상이면 100점
  if (selfDirectedExecs.length === 0) signals.push('진로 실행 기록 없음')

  // 3. 목표/답변 내 진로 키워드 밀도 (20%)
  const allTexts = [...input.monthlyGoalTexts, ...input.lessonAnswerTexts]
  const keywordDensity = calcAvgKeywordDensity(allTexts, CAREER_KEYWORDS)
  if (allTexts.length === 0) signals.push('텍스트 데이터 부족')

  // 4. 버킷리스트 진로 항목 완료율 (15%)
  const careerBuckets = input.bucketList.filter(b => isCareerRelated(b.text))
  const completedCareer = careerBuckets.filter(b => b.completed)
  const bucketScore = careerBuckets.length > 0
    ? (completedCareer.length / careerBuckets.length) * 100
    : 50 // 진로 버킷 없으면 중립
  if (careerBuckets.length === 0) signals.push('진로 관련 버킷리스트 없음')

  // 5. 레슨 답변 깊이 (15%)
  const answerDepths = input.lessonAnswerTexts.map(t => calcAnswerDepth(t))
  const avgDepth = answerDepths.length > 0
    ? answerDepths.reduce((a, b) => a + b, 0) / answerDepths.length
    : 50

  // 가중 합산
  const baseScore = round2(
    surveyScore * 0.25 +
    execFreqScore * 0.25 +
    keywordDensity * 0.20 +
    bucketScore * 0.15 +
    avgDepth * 0.15
  )

  // 코칭 데이터 12% 가중치: careerMention(60%) + goalClarity(40%)
  const cs = input.coachingSignals
  let score: number
  if (cs && cs.sessionCount > 0) {
    const coachingScore = cs.careerMention * 0.6 + cs.goalClarity * 0.4
    score = round2(baseScore * 0.88 + coachingScore * 0.12)
    signals.push(`코칭 데이터 반영 (${cs.sessionCount}세션)`)
  } else {
    score = baseScore
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    signals,
    breakdown: {
      surveyScore: round2(surveyScore),
      execFreqScore: round2(execFreqScore),
      keywordDensity: round2(keywordDensity),
      bucketScore: round2(bucketScore),
      avgDepth: round2(avgDepth),
      ...(cs && cs.sessionCount > 0 ? { coachingScore: round2(cs.careerMention * 0.6 + cs.goalClarity * 0.4) } : {}),
    },
  }
}
