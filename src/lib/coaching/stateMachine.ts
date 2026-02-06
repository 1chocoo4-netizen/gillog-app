/**
 * 코칭 대화 상태 머신
 * STATE → GOAL → PLAN → WRAP
 */

export type CoachingState = 'STATE' | 'GOAL' | 'PLAN' | 'WRAP'

export interface SessionState {
  sessionId: string
  currentState: CoachingState
  turnCount: number
  stateTurnCount: number  // 현재 상태에서의 턴 수
  stateHistory: CoachingState[]
  createdAt: Date
  updatedAt: Date
}

export interface ConversationTurn {
  sessionId: string
  role: 'user' | 'coach'
  content: string
  state: CoachingState
  createdAt: Date
}

export interface RunningSummary {
  sessionId: string
  summaryText: string  // 5~8줄 유지
  keyPoints: {
    currentState?: string
    desiredGoal?: string
    obstacles?: string[]
    resources?: string[]
    plannedAction?: string
  }
  updatedAt: Date
}

export interface SessionOutcome {
  sessionId: string
  stateLine: string      // 지금 내 상태 한 줄
  goalLine: string       // 내가 원하는 것 한 줄
  planLine: string       // 오늘 실행할 가장 작은 행동 1개
  checkinLine: string    // 체크인 시간/조건
  createdAt: Date
}

// 상태별 설명
export const STATE_DESCRIPTIONS: Record<CoachingState, string> = {
  STATE: '나 지금 어떤 상태지?',
  GOAL: '원하는 게 뭐지?',
  PLAN: '원하는 걸 얻기 위해 뭘 해야 하지?',
  WRAP: '세션 마무리'
}

// 상태 전환 규칙
export const STATE_TRANSITIONS: Record<CoachingState, CoachingState | null> = {
  STATE: 'GOAL',
  GOAL: 'PLAN',
  PLAN: 'WRAP',
  WRAP: null
}

/**
 * 새 세션 생성
 */
export function createSession(sessionId: string): SessionState {
  return {
    sessionId,
    currentState: 'STATE',
    turnCount: 0,
    stateTurnCount: 0,
    stateHistory: ['STATE'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

/**
 * 상태 전환 판단 (더 정교한 버전)
 */
export function evaluateTransition(
  session: SessionState,
  userMessage: string,
  coachAnalysis: {
    hasGoalClarity?: boolean
    hasPlanClarity?: boolean
    hasActionCommitment?: boolean
  }
): { shouldTransition: boolean; nextState: CoachingState | null; reason: string } {
  const { currentState, stateTurnCount } = session
  const msg = userMessage.toLowerCase()

  switch (currentState) {
    case 'STATE':
      // 목표/원하는 것 언급 시 빠르게 전환
      if (
        msg.includes('원해') ||
        msg.includes('싶어') ||
        msg.includes('하고') ||
        msg.includes('되고') ||
        msg.includes('높이') ||
        msg.includes('바꾸') ||
        msg.includes('개선') ||
        msg.includes('목표') ||
        coachAnalysis.hasGoalClarity ||
        stateTurnCount >= 2
      ) {
        return {
          shouldTransition: true,
          nextState: 'GOAL',
          reason: '목표/원하는 것 탐색으로 전환'
        }
      }
      break

    case 'GOAL':
      // 행동/계획 언급 시 빠르게 전환
      if (
        msg.includes('해볼') ||
        msg.includes('할게') ||
        msg.includes('하려') ||
        msg.includes('해야') ||
        msg.includes('분') ||
        msg.includes('시간') ||
        msg.includes('매일') ||
        msg.includes('타이머') ||
        msg.includes('방법') ||
        coachAnalysis.hasPlanClarity ||
        stateTurnCount >= 2
      ) {
        return {
          shouldTransition: true,
          nextState: 'PLAN',
          reason: '실행 계획 수립으로 전환'
        }
      }
      break

    case 'PLAN':
      // 약속/다짐 시 바로 마무리로
      if (
        msg.includes('할게') ||
        msg.includes('해볼게') ||
        msg.includes('시작') ||
        msg.includes('그렇게') ||
        msg.includes('좋아') ||
        msg.includes('알겠') ||
        coachAnalysis.hasActionCommitment ||
        stateTurnCount >= 1
      ) {
        return {
          shouldTransition: true,
          nextState: 'WRAP',
          reason: '세션 마무리로 전환'
        }
      }
      break

    case 'WRAP':
      return {
        shouldTransition: false,
        nextState: null,
        reason: '세션 완료'
      }
  }

  return {
    shouldTransition: false,
    nextState: null,
    reason: '현재 상태 유지'
  }
}

/**
 * 세션 상태 업데이트
 */
export function updateSession(
  session: SessionState,
  newState?: CoachingState
): SessionState {
  const now = new Date()

  if (newState && newState !== session.currentState) {
    return {
      ...session,
      currentState: newState,
      turnCount: session.turnCount + 1,
      stateTurnCount: 1,
      stateHistory: [...session.stateHistory, newState],
      updatedAt: now
    }
  }

  return {
    ...session,
    turnCount: session.turnCount + 1,
    stateTurnCount: session.stateTurnCount + 1,
    updatedAt: now
  }
}

/**
 * Running Summary 업데이트용 프롬프트 생성
 */
export function generateSummaryUpdatePrompt(
  existingSummary: string,
  newTurn: { role: 'user' | 'coach'; content: string }
): string {
  return `기존 요약:
${existingSummary || '(없음)'}

새로운 대화:
${newTurn.role === 'user' ? '사용자' : '코치'}: ${newTurn.content}

위 내용을 반영해서 5~8줄로 요약해줘.
핵심 포인트:
- 현재 상태/감정
- 원하는 것/목표
- 장애물
- 가진 자원/강점
- 계획된 행동`
}

/**
 * WRAP 상태일 때 SessionOutcome 생성용 프롬프트
 */
export function generateOutcomePrompt(summary: string): string {
  return `아래 대화 요약을 바탕으로 세션 결과를 JSON으로 정리해줘:

${summary}

다음 형식으로 출력해:
{
  "stateLine": "지금 내 상태 한 줄 (예: 업무 스트레스로 지쳐있지만 변화하고 싶은 마음이 있음)",
  "goalLine": "내가 원하는 것 한 줄 (예: 일과 삶의 균형을 찾고 싶음)",
  "planLine": "오늘 실행할 가장 작은 행동 1개 (예: 오늘 저녁 10분 산책하기)",
  "checkinLine": "체크인 시간/조건 (예: 내일 아침에 산책 여부 확인)"
}`
}

/**
 * 현재 상태에 맞는 코칭 방향 반환
 */
export function getStateGuidance(state: CoachingState): {
  focus: string
  avoid: string
  transitionSignals: string[]
} {
  switch (state) {
    case 'STATE':
      return {
        focus: '현재 감정/상황 탐색, 공감, 수용',
        avoid: '해결책 제시, 조언, 목표 강요',
        transitionSignals: ['원하는 것 언급', '변화 의지 표현', '충분한 감정 표현']
      }

    case 'GOAL':
      return {
        focus: '원하는 것 구체화, 동기 탐색, 비전 확장',
        avoid: '현실성 평가, 계획 강요, 부정적 피드백',
        transitionSignals: ['목표 한 문장 정리', '왜 원하는지 명확', '다음 단계 언급']
      }

    case 'PLAN':
      return {
        focus: '선택지 탐색, 장애물 다루기, 구체적 행동 약속',
        avoid: '판단, 강요, 복잡한 계획',
        transitionSignals: ['작은 행동 1개 결정', '실행 의지 표현', '체크인 동의']
      }

    case 'WRAP':
      return {
        focus: '요약, 확인, 격려, 체크인 약속',
        avoid: '새로운 주제, 추가 질문, 길게 늘이기',
        transitionSignals: ['세션 종료']
      }
  }
}

export default {
  createSession,
  evaluateTransition,
  updateSession,
  STATE_DESCRIPTIONS,
  STATE_TRANSITIONS,
  getStateGuidance
}
