/**
 * 코칭 질문 템플릿 검색 시스템
 * - 현재 상태(STATE/GOAL/PLAN/WRAP)에 맞는 템플릿 필터링
 * - 사용자 메시지에서 키워드/감정 추출
 * - 관련 템플릿 5개 선택
 */

import questionBank from './question_bank.json'

export type CoachingState = 'STATE' | 'GOAL' | 'PLAN' | 'WRAP'

export interface RetrievedTemplate {
  category: CoachingState
  intent: string
  intentDescription: string
  template: string
  relevanceScore: number
}

export interface UserContext {
  message: string
  currentState: CoachingState
  previousAnswers?: string[]
  sessionSummary?: string
}

// 감정 키워드 추출
function extractEmotions(text: string): string[] {
  const emotionWords = questionBank.emotion_words
  return emotionWords.filter(emotion => text.includes(emotion.replace('한', '').replace('는', '')))
}

// 주제 키워드 추출
function extractTopics(text: string): string[] {
  const topics: string[] = []
  const topicKeywords = questionBank.topic_keywords as Record<string, string[]>

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      topics.push(topic)
    }
  }
  return topics
}

// 숫자 응답 감지 (점수 응답)
function detectNumberResponse(text: string): number | null {
  if (!text) return null
  const match = text.match(/(\d+)점?/)
  if (match) {
    const num = parseInt(match[1])
    if (num >= 1 && num <= 10) return num
  }
  // 한글 숫자도 체크
  const koreanNumbers: Record<string, number> = {
    '일': 1, '이': 2, '삼': 3, '사': 4, '오': 5,
    '육': 6, '칠': 7, '팔': 8, '구': 9, '십': 10,
    '하나': 1, '둘': 2, '셋': 3, '넷': 4, '다섯': 5,
    '여섯': 6, '일곱': 7, '여덟': 8, '아홉': 9, '열': 10
  }
  for (const [word, num] of Object.entries(koreanNumbers)) {
    if (text.includes(word)) return num
  }
  return null
}

// 답변 길이 분석
function analyzeAnswerLength(text: string): 'short' | 'medium' | 'long' {
  const length = text.length
  if (length < 15) return 'short'
  if (length < 60) return 'medium'
  return 'long'
}

// 의도(intent) 선택 로직
function selectIntents(
  state: CoachingState,
  emotions: string[],
  topics: string[],
  answerLength: 'short' | 'medium' | 'long',
  hasNumber: boolean
): string[] {
  const category = questionBank.categories[state]
  if (!category) return []

  const intents = Object.keys(category.intents)
  const selected: string[] = []

  switch (state) {
    case 'STATE':
      if (answerLength === 'short') {
        // 짧은 답변 → 더 탐색
        selected.push('explore_current', 'clarify_feeling')
      } else if (emotions.length > 0) {
        // 감정이 있으면 명확화
        selected.push('clarify_feeling', 'understand_context')
      } else {
        // 일반적인 탐색
        selected.push('explore_current', 'understand_context')
      }
      if (hasNumber) {
        // 점수를 말했으면 이유 물어보기
        selected.push('clarify_feeling')
      }
      break

    case 'GOAL':
      if (answerLength === 'short') {
        selected.push('explore_desire', 'clarify_goal')
      } else {
        selected.push('clarify_goal', 'check_motivation')
      }
      break

    case 'PLAN':
      if (answerLength === 'short') {
        selected.push('explore_options', 'identify_resources')
      } else {
        selected.push('commit_action', 'create_accountability')
      }
      break

    case 'WRAP':
      selected.push('summarize_state', 'summarize_goal', 'confirm_action', 'set_checkin')
      break
  }

  return [...new Set(selected)].slice(0, 3)
}

// 템플릿에서 변수 치환
function fillTemplate(template: string, context: {
  emotions: string[]
  topics: string[]
  userWords: string[]
}): string {
  let filled = template

  // {emotion_word} 치환
  if (context.emotions.length > 0) {
    filled = filled.replace('{emotion_word}', context.emotions[0])
  } else {
    filled = filled.replace('{emotion_word}', '그런')
  }

  // {topic} 치환
  if (context.topics.length > 0) {
    const topicKeywords = questionBank.topic_keywords as Record<string, string[]>
    const topicWord = topicKeywords[context.topics[0]]?.[0] || '그것'
    filled = filled.replace('{topic}', topicWord)
  } else {
    filled = filled.replace('{topic}', '그것')
  }

  // {obstacle} 치환
  filled = filled.replace('{obstacle}', '그 어려움')

  // {time} 치환
  filled = filled.replace('{time}', '저녁')

  return filled
}

/**
 * 메인 검색 함수: 사용자 컨텍스트에 맞는 템플릿 5개 반환
 */
export function retrieveTemplates(context: UserContext): RetrievedTemplate[] {
  const { message, currentState, previousAnswers = [] } = context

  // 키워드 추출
  const emotions = extractEmotions(message)
  const topics = extractTopics(message)
  const hasNumber = detectNumberResponse(message) !== null
  const answerLength = analyzeAnswerLength(message)
  const userWords = message.split(/[\s,\.!?]+/).filter(w => w.length > 1)

  // 의도 선택
  const selectedIntents = selectIntents(currentState, emotions, topics, answerLength, hasNumber)

  // 템플릿 수집
  const templates: RetrievedTemplate[] = []
  const category = questionBank.categories[currentState]

  if (!category) return []

  for (const intentKey of selectedIntents) {
    const intent = (category.intents as Record<string, { description: string; templates: string[] }>)[intentKey]
    if (!intent) continue

    for (const template of intent.templates) {
      const filled = fillTemplate(template, { emotions, topics, userWords })

      // 관련성 점수 계산 (간단 버전)
      let score = 1.0
      if (emotions.length > 0 && template.includes('{emotion_word}')) score += 0.5
      if (topics.length > 0 && template.includes('{topic}')) score += 0.5
      if (hasNumber && intentKey === 'clarify_feeling') score += 1.0

      templates.push({
        category: currentState,
        intent: intentKey,
        intentDescription: intent.description,
        template: filled,
        relevanceScore: score
      })
    }
  }

  // 점수순 정렬 후 상위 5개 반환
  return templates
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5)
}

/**
 * 점수 응답에 대한 특별 후속 질문 생성
 */
export function getScoreFollowUp(score: number): string {
  if (score <= 3) {
    return '좀 낮은 편이네. 왜 그렇게 느껴?'
  } else if (score <= 5) {
    return '중간쯤이구나. 뭐가 좀 아쉬워?'
  } else if (score <= 7) {
    return '괜찮은 편이네. 더 높아지려면 뭐가 필요할까?'
  } else if (score <= 9) {
    return '꽤 높네! 그 자신감은 어디서 와?'
  } else {
    return '10점! 대단한데? 뭐가 그렇게 자신 있어?'
  }
}

/**
 * 상태 전환 판단
 */
export function shouldTransitionState(
  currentState: CoachingState,
  message: string,
  turnCount: number
): CoachingState | null {
  const lowerMessage = message.toLowerCase()

  switch (currentState) {
    case 'STATE':
      // 목표/원하는 것 언급 시 GOAL로
      if (
        lowerMessage.includes('원해') ||
        lowerMessage.includes('하고 싶') ||
        lowerMessage.includes('되고 싶') ||
        lowerMessage.includes('바꾸고') ||
        turnCount >= 4
      ) {
        return 'GOAL'
      }
      break

    case 'GOAL':
      // 목표가 명확해지면 PLAN으로
      if (
        lowerMessage.includes('할 거') ||
        lowerMessage.includes('해볼') ||
        lowerMessage.includes('시도') ||
        lowerMessage.includes('방법') ||
        turnCount >= 4
      ) {
        return 'PLAN'
      }
      break

    case 'PLAN':
      // 행동이 정해지면 WRAP으로
      if (
        lowerMessage.includes('할게') ||
        lowerMessage.includes('시작할') ||
        lowerMessage.includes('해볼게') ||
        turnCount >= 4
      ) {
        return 'WRAP'
      }
      break

    case 'WRAP':
      // WRAP은 최종 상태
      return null
  }

  return null
}

export { detectNumberResponse, extractEmotions, extractTopics, analyzeAnswerLength }
