// ========================================
// 코칭 세션 분석 모듈
// CoachingSession[] → CoachingSignals 구조화된 시그널 추출
// ========================================

import {
  CAREER_KEYWORDS,
  COMMUNITY_KEYWORDS,
  LEARNING_KEYWORDS,
  PERSISTENCE_KEYWORDS,
  calcAnswerDepth,
  calcKeywordDensity,
} from '@/lib/ai-engine/textAnalysis'

/** 코칭 메시지 (DB 형태) */
export interface CoachingMessageData {
  role: string     // "user" | "coach"
  content: string
  order: number
  createdAt: Date | string
}

/** 코칭 세션 (DB 형태) */
export interface CoachingSessionData {
  id: string
  userId: string
  mode: string
  createdAt: Date | string
  messages: CoachingMessageData[]
}

/** 코칭 분석 결과 시그널 */
export interface CoachingSignals {
  sessionCount: number
  totalUserMessages: number
  engagementDepth: number          // 평균 사용자 메시지 길이 기반 (0-100)
  emotionalAwareness: number       // 감정 키워드 발견율 (0-100)
  goalClarity: number              // 목표 관련 키워드 포함 세션 비율 (0-100)
  actionCommitment: number         // 실행 약속 포함 세션 비율 (0-100)
  selfReflectionDepth: number      // calcAnswerDepth 재사용 평균 (0-100)
  careerMention: number            // 진로 키워드 언급 비율 (0-100)
  communityMention: number         // 공동체 키워드 언급 비율 (0-100)
  persistenceMention: number       // 습관/지속 키워드 언급 비율 (0-100)
  learningMention: number          // 학습 키워드 언급 비율 (0-100)
  sessionFrequency: number         // 최근 30일 주당 세션 수 정규화 (0-100)
  sessionCompletionRate: number    // [코칭완료] 포함 세션 비율 (0-100)
}

/** 감정 관련 키워드 */
const EMOTION_KEYWORDS = [
  '느끼', '감정', '기분', '불안', '걱정', '두려', '화가', '짜증',
  '슬프', '외로', '우울', '스트레스', '힘들', '지치', '답답',
  '행복', '기쁘', '뿌듯', '감사', '편안', '설레',
]

/** 목표/의지 관련 키워드 */
const GOAL_KEYWORDS = ['원해', '싶어', '목표', '하고', '되고', '바라', '계획']

/** 실행 약속 키워드 */
const ACTION_KEYWORDS = ['할게', '해볼게', '시작', '해봐야', '실천', '도전']

/**
 * 코칭 세션 배열에서 구조화된 시그널 추출
 */
export function analyzeCoachingSessions(
  sessions: CoachingSessionData[],
): CoachingSignals {
  if (sessions.length === 0) {
    return emptySignals()
  }

  // 사용자 메시지만 추출
  const allUserMessages = sessions.flatMap(s =>
    s.messages.filter(m => m.role === 'user').map(m => m.content),
  )

  // 전체 메시지 텍스트 (코치 포함 — [코칭완료] 탐지용)
  const allMessages = sessions.flatMap(s => s.messages.map(m => m.content))

  const totalUserMessages = allUserMessages.length

  // 1. engagementDepth: 평균 메시지 길이 기반 (0-100)
  const avgLength =
    totalUserMessages > 0
      ? allUserMessages.reduce((sum, m) => sum + m.length, 0) / totalUserMessages
      : 0
  const engagementDepth = Math.min(100, (avgLength / 150) * 100)

  // 2. emotionalAwareness: 사용자 메시지에서 감정 키워드 발견한 세션 비율
  const emotionalAwareness = calcSessionKeywordRate(sessions, EMOTION_KEYWORDS)

  // 3. goalClarity: 목표 키워드 포함 세션 비율
  const goalClarity = calcSessionKeywordRate(sessions, GOAL_KEYWORDS)

  // 4. actionCommitment: 실행 약속 포함 세션 비율
  const actionCommitment = calcSessionKeywordRate(sessions, ACTION_KEYWORDS)

  // 5. selfReflectionDepth: calcAnswerDepth 평균
  const selfReflectionDepth =
    totalUserMessages > 0
      ? allUserMessages.reduce((sum, m) => sum + calcAnswerDepth(m), 0) / totalUserMessages
      : 0

  // 6-9. 카테고리별 키워드 밀도 (세션 단위)
  const careerMention = calcSessionKeywordRate(sessions, CAREER_KEYWORDS)
  const communityMention = calcSessionKeywordRate(sessions, COMMUNITY_KEYWORDS)
  const persistenceMention = calcSessionKeywordRate(sessions, PERSISTENCE_KEYWORDS)
  const learningMention = calcSessionKeywordRate(sessions, LEARNING_KEYWORDS)

  // 10. sessionFrequency: 최근 30일 주당 세션 수 (0-100 정규화)
  const now = Date.now()
  const d30 = 30 * 24 * 60 * 60 * 1000
  const recentSessions = sessions.filter(
    s => now - new Date(s.createdAt).getTime() <= d30,
  )
  const weeksInPeriod = 30 / 7
  const sessionsPerWeek = recentSessions.length / weeksInPeriod
  // 주 3회 이상이면 100점
  const sessionFrequency = Math.min(100, (sessionsPerWeek / 3) * 100)

  // 11. sessionCompletionRate: [코칭완료] 포함 세션 비율
  const completedSessions = sessions.filter(s =>
    s.messages.some(m => m.content.includes('[코칭완료]')),
  )
  const sessionCompletionRate = (completedSessions.length / sessions.length) * 100

  return {
    sessionCount: sessions.length,
    totalUserMessages,
    engagementDepth: round(engagementDepth),
    emotionalAwareness: round(emotionalAwareness),
    goalClarity: round(goalClarity),
    actionCommitment: round(actionCommitment),
    selfReflectionDepth: round(selfReflectionDepth),
    careerMention: round(careerMention),
    communityMention: round(communityMention),
    persistenceMention: round(persistenceMention),
    learningMention: round(learningMention),
    sessionFrequency: round(sessionFrequency),
    sessionCompletionRate: round(sessionCompletionRate),
  }
}

/**
 * 세션 중 키워드를 1개 이상 포함한 사용자 메시지가 있는 세션 비율 (0-100)
 */
function calcSessionKeywordRate(
  sessions: CoachingSessionData[],
  keywords: string[],
): number {
  if (sessions.length === 0) return 0
  const matched = sessions.filter(s => {
    const userTexts = s.messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
    return userTexts.some(t => keywords.some(kw => t.includes(kw)))
  })
  return (matched.length / sessions.length) * 100
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}

function emptySignals(): CoachingSignals {
  return {
    sessionCount: 0,
    totalUserMessages: 0,
    engagementDepth: 0,
    emotionalAwareness: 0,
    goalClarity: 0,
    actionCommitment: 0,
    selfReflectionDepth: 0,
    careerMention: 0,
    communityMention: 0,
    persistenceMention: 0,
    learningMention: 0,
    sessionFrequency: 0,
    sessionCompletionRate: 0,
  }
}
