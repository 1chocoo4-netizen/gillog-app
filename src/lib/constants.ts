// ========================================
// 길로그 상수 정의 (Gillog Constants)
// ========================================

// 6개 성장 월드 정의
export const WORLDS = {
  cognition: {
    key: 'cognition',
    title: '인지',
    subtitle: '나를 이해하기',
    description: '자신의 감정, 생각, 행동 패턴을 인식하고 이해하는 능력',
    color: 'var(--gl-world-cognition)',
    colorHex: '#8b5cf6',
    icon: '🧠',
    order: 1,
  },
  selfDirected: {
    key: 'selfDirected',
    title: '자기주도',
    subtitle: '스스로 결정하기',
    description: '목표를 세우고 스스로 계획하며 실행하는 능력',
    color: 'var(--gl-world-selfdirected)',
    colorHex: '#06b6d4',
    icon: '🎯',
    order: 2,
  },
  habit: {
    key: 'habit',
    title: '습관',
    subtitle: '꾸준히 실천하기',
    description: '좋은 습관을 형성하고 유지하는 능력',
    color: 'var(--gl-world-habit)',
    colorHex: '#22c55e',
    icon: '🔄',
    order: 3,
  },
  attitude: {
    key: 'attitude',
    title: '태도',
    subtitle: '긍정적으로 바라보기',
    description: '어려움 속에서도 긍정적인 마음가짐을 유지하는 능력',
    color: 'var(--gl-world-attitude)',
    colorHex: '#f59e0b',
    icon: '✨',
    order: 4,
  },
  expression: {
    key: 'expression',
    title: '표현',
    subtitle: '생각을 나누기',
    description: '자신의 생각과 감정을 명확하게 전달하는 능력',
    color: 'var(--gl-world-expression)',
    colorHex: '#ec4899',
    icon: '💬',
    order: 5,
  },
  character: {
    key: 'character',
    title: '인성',
    subtitle: '함께 성장하기',
    description: '타인을 존중하고 책임감 있게 행동하는 능력',
    color: 'var(--gl-world-character)',
    colorHex: '#6366f1',
    icon: '💜',
    order: 6,
  },
} as const

export type WorldKey = keyof typeof WORLDS

// 월드 배열 (순서대로)
export const WORLDS_ARRAY = Object.values(WORLDS).sort((a, b) => a.order - b.order)

// 레벨 정의 (0-4)
export const LEVELS = {
  0: {
    level: 0,
    title: '씨앗',
    description: '아직 인식하지 못하는 단계',
    color: '#9ca3af',
  },
  1: {
    level: 1,
    title: '새싹',
    description: '필요성을 알지만 실천이 어려운 단계',
    color: '#fcd34d',
  },
  2: {
    level: 2,
    title: '줄기',
    description: '가끔 실천하지만 일관성이 부족한 단계',
    color: '#a3e635',
  },
  3: {
    level: 3,
    title: '꽃봉오리',
    description: '대부분 실천하며 가끔 흔들리는 단계',
    color: '#4ade80',
  },
  4: {
    level: 4,
    title: '열매',
    description: '자연스럽게 체화된 단계',
    color: '#10b981',
  },
} as const

export type LevelKey = keyof typeof LEVELS

// XP 설정
export const XP_CONFIG = {
  lessonComplete: 20,    // 레슨 완료
  perfectLesson: 10,     // 보너스: 모든 질문 답변
  checkinBonus: 5,       // 일일 체크인 보너스
  streakBonus: 15,       // 스트릭 보너스 (7일마다)
  levelUpXp: [           // 레벨업에 필요한 총 XP
    0,    // 레벨 1
    100,  // 레벨 2
    250,  // 레벨 3
    500,  // 레벨 4
    850,  // 레벨 5
    1300, // 레벨 6
    1900, // 레벨 7
    2700, // 레벨 8
    3700, // 레벨 9
    5000, // 레벨 10
  ],
}

// 코치 기본 데이터
export const DEFAULT_COACHES = {
  cognition: {
    name: '민서 코치',
    tagline: '네 안의 목소리를 들어볼까?',
    avatarSeed: 'minsu-cognition',
  },
  selfDirected: {
    name: '지우 코치',
    tagline: '네가 원하는 건 뭐야?',
    avatarSeed: 'jiwoo-selfdirected',
  },
  habit: {
    name: '하린 코치',
    tagline: '오늘도 한 걸음!',
    avatarSeed: 'harin-habit',
  },
  attitude: {
    name: '서연 코치',
    tagline: '어떤 상황에서도 빛나는 너',
    avatarSeed: 'seoyeon-attitude',
  },
  expression: {
    name: '도윤 코치',
    tagline: '네 이야기를 들려줘',
    avatarSeed: 'doyoon-expression',
  },
  character: {
    name: '예준 코치',
    tagline: '함께라서 더 빛나는 우리',
    avatarSeed: 'yejun-character',
  },
}

// 질문 타입
export const QUESTION_TYPES = {
  text: '서술형',
  choice: '선택형',
  scale: '척도형',
} as const

export type QuestionType = keyof typeof QUESTION_TYPES

// 보상 타입
export const REWARD_TYPES = {
  xp: 'XP 획득',
  streak: '스트릭 달성',
  badge: '배지 획득',
  unlock: '잠금 해제',
  levelUp: '레벨업',
} as const

export type RewardType = keyof typeof REWARD_TYPES

// 애니메이션 설정
export const ANIMATION = {
  fast: { duration: 0.15 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  spring: { type: 'spring', stiffness: 300, damping: 25 },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
}

// 메시지/카피
export const MESSAGES = {
  welcome: '"당신의 애씀과 성장을 응원합니다"',
  lessonStart: '좋아, 시작해볼까?',
  lessonComplete: '멋져! 오늘도 한 걸음 성장했어',
  streakContinue: '연속 기록 유지 중!',
  levelUp: '레벨업! 대단해!',
  encouragement: [
    '잘하고 있어!',
    '조금만 더 힘내자!',
    '넌 할 수 있어!',
    '벌써 이만큼 왔어!',
    '포기하지 마!',
  ],
}
