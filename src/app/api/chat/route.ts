/**
 * 코칭 대화 API 엔드포인트
 * POST /api/chat
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  CoachingState,
  createSession,
  evaluateTransition,
  updateSession,
  SessionState,
  RunningSummary,
  ConversationTurn
} from '@/lib/coaching/stateMachine'
import {
  retrieveTemplates,
  detectNumberResponse,
  getScoreFollowUp
} from '@/lib/coaching/retrieveTemplates'
import { buildSystemPrompt, buildUserPrompt, buildSummaryPrompt } from '@/lib/coaching/systemPrompt'

// 메모리 스토리지 (프로덕션에서는 DB 사용)
const sessions = new Map<string, SessionState>()
const summaries = new Map<string, RunningSummary>()
const conversations = new Map<string, ConversationTurn[]>()

interface ChatRequest {
  sessionId: string
  message: string
  worldKey?: string
  worldLabel?: string
  isFirstTurn?: boolean
}

interface ChatResponse {
  text: string
  state: CoachingState
  isComplete: boolean
  outcome?: {
    stateLine: string
    goalLine: string
    planLine: string
    checkinLine: string
  }
  debug?: {
    chosenIntents: string[]
    templatesUsed: string[]
    transitionInfo?: string
  }
}

// 다양한 응답 생성
function getRandomResponse(state: CoachingState, turnCount: number, message: string): {
  text: string
  shouldTransition: boolean
  nextState?: CoachingState
} {
  const acks = ["그렇구나", "응", "그래", "음", "아하", "오", "그러네", "알겠어"]
  const empathies = ["그럴 수 있어", "충분히 이해해", "당연하지", "그럴 만해", "맞아"]
  const transitions = ["그런데", "그럼", "근데", "그래서", "자"]

  // 상태별 질문들
  const stateQuestions: Record<CoachingState, string[][]> = {
    STATE: [
      // 턴 1: 탐색
      ["좀 더 말해줄래?", "왜 그렇게 느껴?", "뭐 때문이야?", "언제부터 그랬어?"],
      // 턴 2: 구체화
      ["그래서 가장 힘든 게 뭐야?", "제일 신경 쓰이는 건?", "핵심이 뭐야?"],
      // 턴 3+: 전환 유도
      ["그래서 어떻게 하고 싶어?", "원하는 게 뭐야?", "바라는 모습이 있어?", "뭘 바꾸고 싶어?"]
    ],
    GOAL: [
      // 턴 1: 목표 탐색
      ["구체적으로 어떤 거야?", "좀 더 자세히 말해줄래?", "그게 왜 중요해?"],
      // 턴 2: 명확화
      ["그게 이뤄지면 뭐가 달라져?", "달성하면 어떤 기분일까?", "가장 중요한 건 뭐야?"],
      // 턴 3+: 전환 유도
      ["그럼 뭘 해볼 수 있을까?", "첫 단계가 뭘까?", "시작할 수 있는 건?"]
    ],
    PLAN: [
      // 턴 1: 행동 탐색
      ["언제 할 거야?", "어떻게 할 거야?", "구체적으로 어떻게?"],
      // 턴 2: 확정
      ["오늘 할 수 있는 건?", "지금 바로 할 수 있는 건?", "첫 번째로 할 건?"],
      // 턴 3+: 마무리 유도
      ["그럼 그걸로 해볼까?", "할 수 있어?", "시작해볼래?"]
    ],
    WRAP: [
      ["정리해볼게. 오늘 할 건?", "그래서 언제 확인할까?"],
      ["잘 할 수 있어. 응원할게!", "화이팅! 다음에 또 만나"],
      ["수고했어! 오늘 고마워", "잘 했어. 다음에 또 얘기하자"]
    ]
  }

  // 사용자 메시지 분석
  const msgLength = message.length
  const hasWant = message.includes('원해') || message.includes('싶어') || message.includes('하고') || message.includes('되고') || message.includes('높이')
  const hasAction = message.includes('할게') || message.includes('해볼') || message.includes('시작') || message.includes('할 거') || message.includes('해야') || message.includes('하려')
  const hasPlan = message.includes('분') || message.includes('시간') || message.includes('언제') || message.includes('어디') || message.includes('타이머') || message.includes('매일') || message.includes('아침') || message.includes('저녁')
  const hasCommit = message.includes('할게') || message.includes('해볼게') || message.includes('시작할') || message.includes('해보겠')

  // 상태 전환 결정
  let shouldTransition = false
  let nextState: CoachingState | undefined

  if (state === 'STATE') {
    // STATE에서 원하는 것을 말하거나 2턴 이상이면 GOAL로
    if (hasWant || turnCount >= 2 || msgLength > 25) {
      shouldTransition = true
      nextState = 'GOAL'
    }
  } else if (state === 'GOAL') {
    // GOAL에서 행동 계획이나 구체적 방법을 말하면 PLAN으로
    if (hasAction || hasPlan || turnCount >= 2 || msgLength > 30) {
      shouldTransition = true
      nextState = 'PLAN'
    }
  } else if (state === 'PLAN') {
    // PLAN에서 약속/다짐이 나오면 바로 WRAP으로
    if (hasCommit || hasPlan || turnCount >= 1) {
      shouldTransition = true
      nextState = 'WRAP'
    }
  }

  // 질문 선택 (턴 수에 따라 다른 질문 세트)
  const questionSets = stateQuestions[state]
  const setIndex = Math.min(turnCount, questionSets.length - 1)
  const questions = questionSets[setIndex]
  const question = questions[Math.floor(Math.random() * questions.length)]

  const ack = acks[Math.floor(Math.random() * acks.length)]
  const empathy = empathies[Math.floor(Math.random() * empathies.length)]
  const transition = transitions[Math.floor(Math.random() * transitions.length)]

  // 전환 시에는 전환 문구 사용
  let text: string
  if (shouldTransition) {
    text = `${ack}. ${empathy}. ${transition} ${question}`
  } else {
    const patterns = [
      `${ack}. ${question}`,
      `${empathy}. ${question}`,
      `${ack}. ${transition} ${question}`
    ]
    text = patterns[Math.floor(Math.random() * patterns.length)]
  }

  return { text, shouldTransition, nextState }
}

/**
 * OpenAI 호환 LLM 호출
 */
async function callLLM(
  systemPrompt: string,
  userPrompt: string,
  state: CoachingState,
  turnCount: number,
  userMessage: string
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    // API 키 없으면 다양한 폴백 응답
    const response = getRandomResponse(state, turnCount, userMessage)
    return JSON.stringify({
      empathy: "",
      mirror: "",
      question: response.text,
      shouldTransition: response.shouldTransition,
      nextState: response.nextState
    })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('LLM call failed:', error)
    // 폴백
    return JSON.stringify({
      empathy: "응.",
      mirror: "그렇구나.",
      question: "더 말해줄래?",
      shouldTransition: false
    })
  }
}

/**
 * LLM 응답 파싱
 */
function parseCoachResponse(raw: string): {
  text: string
  shouldTransition: boolean
  nextState?: CoachingState
  outcome?: ChatResponse['outcome']
} {
  try {
    // JSON 추출 시도
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])

      // WRAP 응답
      if (parsed.summary && parsed.closing) {
        return {
          text: `${parsed.empathy || ''}\n\n📋 오늘의 정리:\n• 상태: ${parsed.summary.state}\n• 목표: ${parsed.summary.goal}\n• 행동: ${parsed.summary.action}\n• 체크인: ${parsed.summary.checkin}\n\n${parsed.closing}`,
          shouldTransition: false,
          outcome: {
            stateLine: parsed.summary.state,
            goalLine: parsed.summary.goal,
            planLine: parsed.summary.action,
            checkinLine: parsed.summary.checkin
          }
        }
      }

      // question만 있는 경우 (폴백 응답)
      if (parsed.question && !parsed.empathy && !parsed.mirror) {
        return {
          text: parsed.question,
          shouldTransition: parsed.shouldTransition || false,
          nextState: parsed.nextState as CoachingState | undefined
        }
      }

      // 일반 응답
      const text = [
        parsed.empathy,
        parsed.mirror,
        parsed.question
      ].filter(Boolean).join(' ')

      return {
        text: text || raw,
        shouldTransition: parsed.shouldTransition || false,
        nextState: parsed.nextState as CoachingState | undefined
      }
    }
  } catch (e) {
    console.error('Parse error:', e)
  }

  // 파싱 실패 시 원본 반환
  return {
    text: raw,
    shouldTransition: false
  }
}

/**
 * Running Summary 업데이트
 */
async function updateSummary(
  sessionId: string,
  userMessage: string,
  coachResponse: string
): Promise<void> {
  const existing = summaries.get(sessionId)
  const existingSummary = existing?.summaryText || ''

  // 간단한 로컬 요약 (LLM 호출 줄이기 위해)
  const newSummary = existingSummary
    ? `${existingSummary}\n- 사용자: ${userMessage.slice(0, 50)}${userMessage.length > 50 ? '...' : ''}`
    : `- 사용자: ${userMessage.slice(0, 100)}`

  summaries.set(sessionId, {
    sessionId,
    summaryText: newSummary.split('\n').slice(-8).join('\n'), // 최근 8줄만 유지
    keyPoints: {},
    updatedAt: new Date()
  })
}

/**
 * 대화 턴 저장
 */
function saveTurn(
  sessionId: string,
  role: 'user' | 'coach',
  content: string,
  state: CoachingState
): void {
  const turns = conversations.get(sessionId) || []
  turns.push({
    sessionId,
    role,
    content,
    state,
    createdAt: new Date()
  })
  // 최근 20개만 유지
  if (turns.length > 20) {
    turns.shift()
  }
  conversations.set(sessionId, turns)
}

/**
 * 최근 대화 가져오기
 */
function getRecentTurns(sessionId: string, limit: number = 10): ConversationTurn[] {
  const turns = conversations.get(sessionId) || []
  return turns.slice(-limit)
}

export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
  try {
    const body: ChatRequest = await request.json()
    const { sessionId, message, worldKey = 'cognition', worldLabel = '인지', isFirstTurn = false } = body

    // 세션 가져오기 또는 생성
    let session = sessions.get(sessionId)
    if (!session) {
      session = createSession(sessionId)
      sessions.set(sessionId, session)
    }

    // 사용자 메시지 저장
    saveTurn(sessionId, 'user', message, session.currentState)

    // 점수 응답 특별 처리
    const scoreValue = detectNumberResponse(message)
    let scoreContext = ''
    if (scoreValue !== null && isFirstTurn) {
      scoreContext = `사용자가 ${scoreValue}점을 선택했어. ${getScoreFollowUp(scoreValue)}`
    }

    // 템플릿 검색
    const templates = retrieveTemplates({
      message,
      currentState: session.currentState,
      previousAnswers: getRecentTurns(sessionId).filter(t => t.role === 'user').map(t => t.content)
    })

    // Running Summary
    const summary = summaries.get(sessionId)?.summaryText || ''

    // 최근 대화
    const recentTurns = getRecentTurns(sessionId, 10)

    // 시스템 프롬프트 생성
    const systemPrompt = buildSystemPrompt({
      worldKey,
      worldLabel,
      currentState: session.currentState,
      runningSummary: summary,
      recentTurns: recentTurns.map(t => ({ role: t.role, content: t.content })),
      retrievedTemplates: templates,
      turnCount: session.turnCount,
      stateTurnCount: session.stateTurnCount
    })

    // 사용자 프롬프트
    const userPrompt = scoreContext
      ? `${scoreContext}\n\n${buildUserPrompt(message, isFirstTurn)}`
      : buildUserPrompt(message, isFirstTurn)

    // LLM 호출
    const llmResponse = await callLLM(systemPrompt, userPrompt, session.currentState, session.stateTurnCount, message)
    console.log('LLM response:', llmResponse)

    // 응답 파싱
    const parsed = parseCoachResponse(llmResponse)
    console.log('Parsed response:', parsed)

    // 상태 전환 평가
    const transition = evaluateTransition(session, message, {
      hasGoalClarity: parsed.shouldTransition && parsed.nextState === 'GOAL',
      hasPlanClarity: parsed.shouldTransition && parsed.nextState === 'PLAN',
      hasActionCommitment: parsed.shouldTransition && parsed.nextState === 'WRAP'
    })

    // 세션 업데이트
    const newState = (transition.shouldTransition || parsed.shouldTransition)
      ? (transition.nextState || parsed.nextState)
      : undefined
    session = updateSession(session, newState)
    sessions.set(sessionId, session)

    // 코치 응답 저장
    saveTurn(sessionId, 'coach', parsed.text, session.currentState)

    // 요약 업데이트
    await updateSummary(sessionId, message, parsed.text)

    // 응답 구성
    const response: ChatResponse = {
      text: parsed.text,
      state: session.currentState,
      isComplete: session.currentState === 'WRAP' && !!parsed.outcome,
      outcome: parsed.outcome,
      debug: process.env.NODE_ENV === 'development' ? {
        chosenIntents: templates.map(t => t.intent),
        templatesUsed: templates.map(t => t.template),
        transitionInfo: transition.reason
      } : undefined
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      text: '잠시 문제가 생겼어. 다시 말해줄 수 있어?',
      state: 'STATE' as CoachingState,
      isComplete: false
    })
  }
}

/**
 * 세션 상태 조회 (디버깅용)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('sessionId')

  if (!sessionId) {
    return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
  }

  const session = sessions.get(sessionId)
  const summary = summaries.get(sessionId)
  const turns = getRecentTurns(sessionId)

  return NextResponse.json({
    session,
    summary,
    recentTurns: turns
  })
}
