/**
 * ICF (International Coaching Federation) + KCA (한국코치협회) 기반
 * 전문 코칭 질문 데이터베이스
 *
 * ICF 핵심역량 8가지 기반:
 * 1. 윤리적 실천 (Demonstrates Ethical Practice)
 * 2. 코칭 마인드셋 (Embodies a Coaching Mindset)
 * 3. 합의 수립 및 유지 (Establishes and Maintains Agreements)
 * 4. 신뢰와 안전 조성 (Cultivates Trust and Safety)
 * 5. 현존 유지 (Maintains Presence)
 * 6. 적극적 경청 (Listens Actively)
 * 7. 인식 환기 (Evokes Awareness)
 * 8. 성장 촉진 (Facilitates Client Growth)
 */

// 코칭 질문 카테고리
export type QuestionCategory =
  | 'awareness'      // 인식/자각
  | 'exploration'    // 탐색
  | 'goal'           // 목표 설정
  | 'reality'        // 현실 파악
  | 'options'        // 대안 탐색
  | 'will'           // 의지/실행
  | 'values'         // 가치관
  | 'strengths'      // 강점
  | 'obstacles'      // 장애물
  | 'emotions'       // 감정
  | 'perspective'    // 관점 전환
  | 'action'         // 행동
  | 'reflection'     // 성찰
  | 'learning'       // 학습
  | 'growth'         // 성장

export interface CoachingQuestion {
  id: string
  category: QuestionCategory
  question: string
  followUp?: string[]  // 후속 질문들
  context?: string     // 언제 사용하면 좋은지
}

// ============================================
// ICF + KCA 기반 코칭 질문 데이터베이스
// ============================================

export const COACHING_QUESTIONS: CoachingQuestion[] = [
  // ========== 인식/자각 (Awareness) ==========
  {
    id: 'awareness-1',
    category: 'awareness',
    question: '지금 이 순간 어떤 감정을 느끼고 있어?',
    followUp: ['그 감정이 어디서 오는 것 같아?', '그 감정을 몸으로 느낀다면 어디에서 느껴져?'],
    context: '감정 인식이 필요할 때'
  },
  {
    id: 'awareness-2',
    category: 'awareness',
    question: '이 상황에서 네가 가장 중요하게 여기는 건 뭐야?',
    followUp: ['왜 그게 중요한 것 같아?', '그것이 충족되면 어떤 변화가 있을까?'],
  },
  {
    id: 'awareness-3',
    category: 'awareness',
    question: '스스로에 대해 새롭게 발견한 게 있다면 뭐야?',
    followUp: ['그 발견이 앞으로 어떤 영향을 줄 것 같아?'],
  },
  {
    id: 'awareness-4',
    category: 'awareness',
    question: '지금 네 안에서 무슨 일이 일어나고 있어?',
  },
  {
    id: 'awareness-5',
    category: 'awareness',
    question: '이 경험이 너에게 어떤 의미가 있어?',
  },
  {
    id: 'awareness-6',
    category: 'awareness',
    question: '네가 진정으로 원하는 게 뭔지 알고 있어?',
  },
  {
    id: 'awareness-7',
    category: 'awareness',
    question: '이 상황을 한 발짝 물러서서 본다면 어떻게 보여?',
  },
  {
    id: 'awareness-8',
    category: 'awareness',
    question: '네 마음 깊은 곳에서는 뭐라고 말하고 있어?',
  },

  // ========== 탐색 (Exploration) ==========
  {
    id: 'exploration-1',
    category: 'exploration',
    question: '좀 더 자세히 이야기해줄 수 있어?',
  },
  {
    id: 'exploration-2',
    category: 'exploration',
    question: '그때 어떤 생각이 들었어?',
  },
  {
    id: 'exploration-3',
    category: 'exploration',
    question: '구체적인 예를 들어줄 수 있어?',
  },
  {
    id: 'exploration-4',
    category: 'exploration',
    question: '그게 너에게 어떤 영향을 미쳤어?',
  },
  {
    id: 'exploration-5',
    category: 'exploration',
    question: '그 상황에서 다른 사람들은 어떻게 반응했어?',
  },
  {
    id: 'exploration-6',
    category: 'exploration',
    question: '만약 그 일이 다시 일어난다면 어떻게 하고 싶어?',
  },

  // ========== 목표 설정 (Goal) ==========
  {
    id: 'goal-1',
    category: 'goal',
    question: '가장 이루고 싶은 게 뭐야?',
    followUp: ['그걸 이루면 어떤 기분일 것 같아?', '언제까지 이루고 싶어?'],
  },
  {
    id: 'goal-2',
    category: 'goal',
    question: '1년 후 가장 이상적인 모습은 어떤 거야?',
  },
  {
    id: 'goal-3',
    category: 'goal',
    question: '이 목표가 달성되면 네 삶에 어떤 변화가 생길까?',
  },
  {
    id: 'goal-4',
    category: 'goal',
    question: '정말로 원하는 것과 해야 한다고 생각하는 것 중 어떤 거야?',
  },
  {
    id: 'goal-5',
    category: 'goal',
    question: '이 목표를 10점 만점으로 평가한다면 몇 점이야?',
    followUp: ['10점이 되려면 뭐가 필요해?'],
  },
  {
    id: 'goal-6',
    category: 'goal',
    question: '5년 후 너는 어떤 사람이 되어 있고 싶어?',
  },
  {
    id: 'goal-7',
    category: 'goal',
    question: '이 목표가 네 삶의 다른 부분들과 어떻게 연결되어 있어?',
  },

  // ========== 현실 파악 (Reality) ==========
  {
    id: 'reality-1',
    category: 'reality',
    question: '지금 현재 상황은 어때?',
  },
  {
    id: 'reality-2',
    category: 'reality',
    question: '목표와 현재 사이의 거리는 얼마나 된다고 느껴?',
  },
  {
    id: 'reality-3',
    category: 'reality',
    question: '지금까지 시도해본 것들은 뭐가 있어?',
    followUp: ['그중에서 효과가 있었던 건 뭐야?'],
  },
  {
    id: 'reality-4',
    category: 'reality',
    question: '현재 가장 큰 도전은 뭐야?',
  },
  {
    id: 'reality-5',
    category: 'reality',
    question: '지금 활용할 수 있는 자원은 뭐가 있어?',
  },
  {
    id: 'reality-6',
    category: 'reality',
    question: '이 상황에서 네가 통제할 수 있는 건 뭐고, 없는 건 뭐야?',
  },

  // ========== 대안 탐색 (Options) ==========
  {
    id: 'options-1',
    category: 'options',
    question: '다른 방법이 있다면 뭐가 있을까?',
  },
  {
    id: 'options-2',
    category: 'options',
    question: '만약 제한이 없다면 어떻게 하고 싶어?',
  },
  {
    id: 'options-3',
    category: 'options',
    question: '네가 존경하는 사람이라면 이 상황에서 어떻게 할 것 같아?',
  },
  {
    id: 'options-4',
    category: 'options',
    question: '가능한 선택지들을 모두 나열해본다면?',
    followUp: ['그중에서 가장 끌리는 건 뭐야?'],
  },
  {
    id: 'options-5',
    category: 'options',
    question: '완전히 다른 관점에서 본다면 어떤 해결책이 보여?',
  },
  {
    id: 'options-6',
    category: 'options',
    question: '만약 실패해도 괜찮다면 뭘 시도해보고 싶어?',
  },
  {
    id: 'options-7',
    category: 'options',
    question: '가장 대담한 선택은 뭘까?',
  },

  // ========== 의지/실행 (Will) ==========
  {
    id: 'will-1',
    category: 'will',
    question: '그래서 뭘 하기로 결정했어?',
  },
  {
    id: 'will-2',
    category: 'will',
    question: '첫 번째 단계는 뭐야?',
    followUp: ['언제 시작할 거야?'],
  },
  {
    id: 'will-3',
    category: 'will',
    question: '이걸 실행할 의지가 10점 만점에 몇 점이야?',
    followUp: ['10점이 되려면 뭐가 필요해?'],
  },
  {
    id: 'will-4',
    category: 'will',
    question: '누가 너를 도와줄 수 있어?',
  },
  {
    id: 'will-5',
    category: 'will',
    question: '방해가 될 수 있는 건 뭐고, 어떻게 대처할 거야?',
  },
  {
    id: 'will-6',
    category: 'will',
    question: '스스로에게 어떤 약속을 할 수 있어?',
  },
  {
    id: 'will-7',
    category: 'will',
    question: '이번 주에 할 수 있는 작은 행동 하나는 뭐야?',
  },

  // ========== 가치관 (Values) ==========
  {
    id: 'values-1',
    category: 'values',
    question: '네 삶에서 가장 중요한 가치는 뭐야?',
    followUp: ['그 가치는 지금 삶에서 얼마나 실현되고 있어?'],
  },
  {
    id: 'values-2',
    category: 'values',
    question: '이 선택이 네 가치관과 일치해?',
  },
  {
    id: 'values-3',
    category: 'values',
    question: '네가 절대 포기하지 않을 것은 뭐야?',
  },
  {
    id: 'values-4',
    category: 'values',
    question: '가장 의미 있었던 순간은 언제였어?',
    followUp: ['그때 어떤 가치가 충족되었던 것 같아?'],
  },
  {
    id: 'values-5',
    category: 'values',
    question: '네가 되고 싶은 사람의 핵심 특성은 뭐야?',
  },

  // ========== 강점 (Strengths) ==========
  {
    id: 'strengths-1',
    category: 'strengths',
    question: '네가 잘하는 건 뭐야?',
  },
  {
    id: 'strengths-2',
    category: 'strengths',
    question: '어려움을 극복했던 경험을 떠올려봐. 그때 어떤 강점을 사용했어?',
  },
  {
    id: 'strengths-3',
    category: 'strengths',
    question: '다른 사람들이 너에게 자주 칭찬하는 건 뭐야?',
  },
  {
    id: 'strengths-4',
    category: 'strengths',
    question: '할 때 시간 가는 줄 모르는 활동은 뭐야?',
  },
  {
    id: 'strengths-5',
    category: 'strengths',
    question: '네 강점을 이 상황에 어떻게 활용할 수 있을까?',
  },

  // ========== 장애물 (Obstacles) ==========
  {
    id: 'obstacles-1',
    category: 'obstacles',
    question: '무엇이 너를 막고 있어?',
  },
  {
    id: 'obstacles-2',
    category: 'obstacles',
    question: '그 두려움의 정체는 뭐야?',
    followUp: ['최악의 경우는 뭐고, 그게 일어날 확률은 얼마나 돼?'],
  },
  {
    id: 'obstacles-3',
    category: 'obstacles',
    question: '스스로에게 어떤 제한을 두고 있어?',
  },
  {
    id: 'obstacles-4',
    category: 'obstacles',
    question: '그 믿음은 어디서 온 거야? 정말 사실이야?',
  },
  {
    id: 'obstacles-5',
    category: 'obstacles',
    question: '이 장애물을 기회로 바꾼다면?',
  },
  {
    id: 'obstacles-6',
    category: 'obstacles',
    question: '과거에 비슷한 장애물을 어떻게 넘었어?',
  },

  // ========== 감정 (Emotions) ==========
  {
    id: 'emotions-1',
    category: 'emotions',
    question: '그 감정을 한 단어로 표현한다면?',
  },
  {
    id: 'emotions-2',
    category: 'emotions',
    question: '그 감정이 너에게 무슨 메시지를 전하고 있는 것 같아?',
  },
  {
    id: 'emotions-3',
    category: 'emotions',
    question: '지금 필요한 건 뭐야?',
  },
  {
    id: 'emotions-4',
    category: 'emotions',
    question: '그 감정을 느끼는 게 괜찮다고 스스로에게 허락한다면?',
  },
  {
    id: 'emotions-5',
    category: 'emotions',
    question: '감정의 강도가 10점 만점에 몇 점이야?',
    followUp: ['그 강도를 조금 낮추려면 뭐가 도움이 될까?'],
  },

  // ========== 관점 전환 (Perspective) ==========
  {
    id: 'perspective-1',
    category: 'perspective',
    question: '10년 후의 네가 지금의 너에게 해줄 조언은 뭘까?',
  },
  {
    id: 'perspective-2',
    category: 'perspective',
    question: '상대방의 입장에서 보면 어떻게 보일까?',
  },
  {
    id: 'perspective-3',
    category: 'perspective',
    question: '이 상황에서 얻을 수 있는 교훈이 있다면?',
  },
  {
    id: 'perspective-4',
    category: 'perspective',
    question: '만약 이게 다 잘 풀린다고 확신한다면 지금 뭘 하겠어?',
  },
  {
    id: 'perspective-5',
    category: 'perspective',
    question: '가장 친한 친구에게 조언한다면 뭐라고 할 거야?',
  },
  {
    id: 'perspective-6',
    category: 'perspective',
    question: '이 경험을 성장의 기회로 본다면?',
  },

  // ========== 행동 (Action) ==========
  {
    id: 'action-1',
    category: 'action',
    question: '지금 당장 할 수 있는 가장 작은 행동은 뭐야?',
  },
  {
    id: 'action-2',
    category: 'action',
    question: '내일 아침에 가장 먼저 할 일은 뭐야?',
  },
  {
    id: 'action-3',
    category: 'action',
    question: '어떻게 진행 상황을 확인할 거야?',
  },
  {
    id: 'action-4',
    category: 'action',
    question: '실패하더라도 시도해볼 가치가 있는 건 뭐야?',
  },
  {
    id: 'action-5',
    category: 'action',
    question: '지금 하고 있는 것 중에 멈춰야 할 건 뭐야?',
  },

  // ========== 성찰 (Reflection) ==========
  {
    id: 'reflection-1',
    category: 'reflection',
    question: '오늘 대화를 통해 어떤 깨달음을 얻었어?',
  },
  {
    id: 'reflection-2',
    category: 'reflection',
    question: '가장 기억에 남는 건 뭐야?',
  },
  {
    id: 'reflection-3',
    category: 'reflection',
    question: '스스로에 대해 새롭게 알게 된 게 있어?',
  },
  {
    id: 'reflection-4',
    category: 'reflection',
    question: '이 경험을 한 문장으로 정리한다면?',
  },
  {
    id: 'reflection-5',
    category: 'reflection',
    question: '다음에는 어떻게 다르게 해보고 싶어?',
  },

  // ========== 학습 (Learning) ==========
  {
    id: 'learning-1',
    category: 'learning',
    question: '이 경험에서 배운 게 있다면 뭐야?',
  },
  {
    id: 'learning-2',
    category: 'learning',
    question: '가장 효과적으로 배우는 방법은 뭐야?',
  },
  {
    id: 'learning-3',
    category: 'learning',
    question: '새로운 기술이나 지식 중에 배우고 싶은 건 뭐야?',
  },
  {
    id: 'learning-4',
    category: 'learning',
    question: '실수에서 얻은 교훈은 뭐야?',
  },
  {
    id: 'learning-5',
    category: 'learning',
    question: '누구에게서 배우고 싶어?',
  },

  // ========== 성장 (Growth) ==========
  {
    id: 'growth-1',
    category: 'growth',
    question: '지난 1년간 가장 크게 성장한 부분은 뭐야?',
  },
  {
    id: 'growth-2',
    category: 'growth',
    question: '앞으로 어떤 사람이 되고 싶어?',
  },
  {
    id: 'growth-3',
    category: 'growth',
    question: '성장을 위해 기꺼이 불편함을 감수할 수 있는 건 뭐야?',
  },
  {
    id: 'growth-4',
    category: 'growth',
    question: '네 잠재력을 100% 발휘한다면 어떤 모습일까?',
  },
  {
    id: 'growth-5',
    category: 'growth',
    question: '성장의 다음 단계는 뭐라고 생각해?',
  },
]

// ============================================
// 인지 능력 전용 코칭 질문
// ============================================

export const COGNITION_QUESTIONS: CoachingQuestion[] = [
  {
    id: 'cog-1',
    category: 'awareness',
    question: '새로운 정보를 접할 때 어떻게 이해하려고 해?',
    followUp: ['그 방법이 효과적이라고 느껴?'],
  },
  {
    id: 'cog-2',
    category: 'learning',
    question: '가장 집중이 잘 되는 시간대와 환경은 어때?',
  },
  {
    id: 'cog-3',
    category: 'awareness',
    question: '문제를 해결할 때 주로 어떤 방식으로 접근해?',
  },
  {
    id: 'cog-4',
    category: 'exploration',
    question: '기억력을 높이기 위해 사용하는 방법이 있어?',
  },
  {
    id: 'cog-5',
    category: 'reflection',
    question: '복잡한 개념을 이해할 때 어떤 점이 어려워?',
  },
  {
    id: 'cog-6',
    category: 'strengths',
    question: '사고력이나 판단력이 뛰어나다고 느낀 순간은 언제였어?',
  },
  {
    id: 'cog-7',
    category: 'goal',
    question: '인지 능력 중에서 가장 키우고 싶은 건 뭐야?',
  },
  {
    id: 'cog-8',
    category: 'action',
    question: '두뇌 훈련을 위해 해볼 수 있는 활동은 뭐가 있을까?',
  },
]

// ============================================
// 유틸리티 함수들
// ============================================

/**
 * 카테고리별로 랜덤 질문 가져오기
 */
export function getRandomQuestion(category?: QuestionCategory): CoachingQuestion {
  const questions = category
    ? COACHING_QUESTIONS.filter(q => q.category === category)
    : COACHING_QUESTIONS
  return questions[Math.floor(Math.random() * questions.length)]
}

/**
 * 사용자 답변에 따른 후속 질문 생성
 */
export function getFollowUpQuestion(
  previousAnswer: string,
  currentCategory: QuestionCategory
): CoachingQuestion {
  const answerLength = previousAnswer.length

  // 짧은 답변 - 더 탐색적인 질문
  if (answerLength < 20) {
    const explorationQuestions = COACHING_QUESTIONS.filter(
      q => q.category === 'exploration' || q.category === 'awareness'
    )
    return explorationQuestions[Math.floor(Math.random() * explorationQuestions.length)]
  }

  // 감정적 키워드 포함 - 감정 관련 질문
  const emotionalKeywords = ['힘들', '어려', '슬프', '화가', '불안', '걱정', '기쁘', '행복']
  if (emotionalKeywords.some(keyword => previousAnswer.includes(keyword))) {
    const emotionQuestions = COACHING_QUESTIONS.filter(q => q.category === 'emotions')
    return emotionQuestions[Math.floor(Math.random() * emotionQuestions.length)]
  }

  // 목표 관련 키워드 - 행동/의지 질문
  const goalKeywords = ['하고 싶', '되고 싶', '목표', '계획', '원해']
  if (goalKeywords.some(keyword => previousAnswer.includes(keyword))) {
    const actionQuestions = COACHING_QUESTIONS.filter(
      q => q.category === 'will' || q.category === 'action'
    )
    return actionQuestions[Math.floor(Math.random() * actionQuestions.length)]
  }

  // 기본: 성찰 또는 관점 전환 질문
  const reflectionQuestions = COACHING_QUESTIONS.filter(
    q => q.category === 'reflection' || q.category === 'perspective'
  )
  return reflectionQuestions[Math.floor(Math.random() * reflectionQuestions.length)]
}

/**
 * 세션 시작 인사 메시지
 */
export function getSessionGreeting(worldKey: string): string {
  const greetings: Record<string, string> = {
    cognition: '안녕! 여기서는 인지 학습 코칭을 시작할 거야.\n인지 능력은 생각하고, 이해하고, 기억하고, 문제를 해결하는 힘이야.',
    selfDirected: '안녕! 여기서는 자기주도 학습 코칭을 시작할 거야.\n스스로 목표를 세우고 실천하는 힘을 키워볼 거야.',
    habit: '안녕! 여기서는 습관 형성 코칭을 시작할 거야.\n좋은 습관이 좋은 결과를 만들어.',
    attitude: '안녕! 여기서는 태도 코칭을 시작할 거야.\n어떤 마음가짐으로 세상을 바라보는지가 중요해.',
    expression: '안녕! 여기서는 표현력 코칭을 시작할 거야.\n네 생각과 감정을 잘 전달하는 방법을 배워볼 거야.',
    character: '안녕! 여기서는 인성 코칭을 시작할 거야.\n좋은 사람이 되는 건 평생의 여정이야.',
  }
  return greetings[worldKey] || greetings.cognition
}

/**
 * 코칭 피드백 생성 (ICF 원칙 기반)
 */
export function generateCoachingFeedback(
  userAnswer: string,
  questionCategory: QuestionCategory
): string {
  const answerLength = userAnswer.length

  // 짧은 답변에 대한 반응
  const shortResponses = [
    '응, 조금 더 이야기해줄 수 있어?',
    '그렇구나. 어떤 느낌이 들어?',
    '음, 좀 더 자세히 들려줄래?',
  ]

  // 중간 길이 답변에 대한 반응
  const midResponses = [
    '네 이야기가 느껴져. 그래서 어떻게 하고 싶어?',
    '솔직하게 나눠줘서 고마워. 그때 뭘 배웠어?',
    '그랬구나. 지금은 어떻게 느껴?',
  ]

  // 긴 답변에 대한 반응
  const longResponses = [
    '정말 많이 생각해봤구나. 그중에서 가장 중요한 건 뭐야?',
    '깊이 있는 이야기야. 앞으로 어떻게 하고 싶어?',
    '너의 성장이 느껴져. 다음 단계는 뭐라고 생각해?',
  ]

  if (answerLength < 20) {
    return shortResponses[Math.floor(Math.random() * shortResponses.length)]
  } else if (answerLength < 80) {
    return midResponses[Math.floor(Math.random() * midResponses.length)]
  } else {
    return longResponses[Math.floor(Math.random() * longResponses.length)]
  }
}

export default COACHING_QUESTIONS
