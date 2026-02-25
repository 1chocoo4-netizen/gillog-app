// ========================================
// AI 성장엔진 — 차원 오케스트레이터
// 5개 계산기를 호출하여 종합 결과 생성
// ========================================

import { round2, mean } from '@/lib/research/longitudinalEngine'
import { calcCareerMaturityIndex, type CareerMaturityInput } from './careerMaturityIndex'
import { calcSelfDirectedLearningIndex, type SelfDirectedLearningInput } from './selfDirectedLearningIndex'
import { calcBehavioralPersistenceRate, type BehavioralPersistenceInput } from './behavioralPersistenceRate'
import { calcCommunityContributionScore, type CommunityContributionInput } from './communityContributionScore'
import { calcCareerGoalConsistency, type CareerGoalConsistencyInput } from './careerGoalConsistency'
import type {
  DimensionKey,
  DimensionResult,
  RawExecution,
  RawExecutionItem,
  BucketItem,
  MonthlyGoalItem,
} from './types'

/** 전체 사용자 데이터 입력 */
export interface UserDataInput {
  userId: string
  history: RawExecution[]
  executions: RawExecutionItem[]
  bucketList: BucketItem[]
  monthlyGoals: Record<string, MonthlyGoalItem[]>
  // 설문 점수 (없으면 null)
  careerSurveyScore: number | null
  communitySurveyScore: number | null
  learningSurveyScore: number | null
  // 시간순 설문 진로 점수들 (일관성 추적용)
  careerSurveyScores: number[]
  // 레슨 답변 텍스트
  lessonAnswerTexts: string[]
}

/** 개별 차원 계산 결과 (상세 포함) */
export interface DimensionDetail {
  score: number
  signals: string[]
  breakdown: Record<string, number>
}

/** 전체 계산 결과 */
export interface ComputeResult {
  dimensions: DimensionResult
  details: Record<DimensionKey, DimensionDetail>
  dataSourceSummary: {
    totalExecutions: number
    totalBuckets: number
    totalMonthlyGoals: number
    hasSurvey: boolean
    lessonAnswers: number
  }
}

/** 이전 스냅샷과 비교하여 트렌드 결정 */
function determineTrend(
  current: number,
  previous: number | null,
): 'improving' | 'declining' | 'stable' {
  if (previous === null) return 'stable'
  const diff = current - previous
  if (diff > 3) return 'improving'
  if (diff < -3) return 'declining'
  return 'stable'
}

/** 5개 차원 전체 계산 */
export function computeAllDimensions(
  input: UserDataInput,
  previousOverall?: number | null,
): ComputeResult {
  // 목표 텍스트 수집
  const monthlyGoalTexts = Object.values(input.monthlyGoals)
    .flat()
    .map(g => g.text)
    .filter(t => t && t.length > 0)

  // 실행 텍스트 수집
  const execTexts = input.history
    .map(h => h.executionText ?? '')
    .filter(t => t.length > 0)

  // 1. 진로성숙도
  const careerInput: CareerMaturityInput = {
    careerSurveyScore: input.careerSurveyScore,
    history: input.history,
    bucketList: input.bucketList,
    lessonAnswerTexts: input.lessonAnswerTexts,
    monthlyGoalTexts,
  }
  const career = calcCareerMaturityIndex(careerInput)

  // 2. 자기주도학습
  const sdlInput: SelfDirectedLearningInput = {
    learningSurveyScore: input.learningSurveyScore,
    history: input.history,
    executions: input.executions,
  }
  const sdl = calcSelfDirectedLearningIndex(sdlInput)

  // 3. 행동지속률
  const bpInput: BehavioralPersistenceInput = {
    history: input.history,
    executions: input.executions,
    monthlyGoals: input.monthlyGoals,
  }
  const bp = calcBehavioralPersistenceRate(bpInput)

  // 4. 공동체 기여도
  const ccInput: CommunityContributionInput = {
    communitySurveyScore: input.communitySurveyScore,
    history: input.history,
    answerTexts: [...input.lessonAnswerTexts, ...execTexts],
  }
  const cc = calcCommunityContributionScore(ccInput)

  // 5. 진로목표 일관성
  const cgcInput: CareerGoalConsistencyInput = {
    history: input.history,
    bucketList: input.bucketList,
    monthlyGoals: input.monthlyGoals,
    careerSurveyScores: input.careerSurveyScores,
  }
  const cgc = calcCareerGoalConsistency(cgcInput)

  // 종합 점수 (5개 평균)
  const overallScore = round2(mean([
    career.score, sdl.score, bp.score, cc.score, cgc.score,
  ]))

  const trend = determineTrend(overallScore, previousOverall ?? null)

  const dimensions: DimensionResult = {
    careerMaturity: career.score,
    selfDirectedLearning: sdl.score,
    behavioralPersistence: bp.score,
    communityContribution: cc.score,
    careerGoalConsistency: cgc.score,
    overallScore,
    trend,
    signals: {
      careerMaturity: career.signals,
      selfDirectedLearning: sdl.signals,
      behavioralPersistence: bp.signals,
      communityContribution: cc.signals,
      careerGoalConsistency: cgc.signals,
    },
  }

  const details: Record<DimensionKey, DimensionDetail> = {
    careerMaturity: career,
    selfDirectedLearning: sdl,
    behavioralPersistence: bp,
    communityContribution: cc,
    careerGoalConsistency: cgc,
  }

  const allGoals = Object.values(input.monthlyGoals).flat()

  return {
    dimensions,
    details,
    dataSourceSummary: {
      totalExecutions: input.history.length,
      totalBuckets: input.bucketList.length,
      totalMonthlyGoals: allGoals.length,
      hasSurvey: input.careerSurveyScore !== null ||
                 input.communitySurveyScore !== null ||
                 input.learningSurveyScore !== null,
      lessonAnswers: input.lessonAnswerTexts.length,
    },
  }
}
