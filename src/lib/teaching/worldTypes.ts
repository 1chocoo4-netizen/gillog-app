// 월드별 티칭 시스템 타입 정의

export type WorldKey = 'cognition' | 'selfDirected' | 'habit' | 'attitude' | 'relationship' | 'character'

export interface WorldChapter {
  key: string
  label: string
  icon: string
  color: string
  gradient: string
}

export interface WorldConfig {
  key: WorldKey
  label: string
  icon: string
  description: string
  color: string
  chapters: WorldChapter[]
}

// 각 월드별 챕터 구성
export const WORLD_CONFIGS: Record<WorldKey, WorldConfig> = {
  cognition: {
    key: 'cognition',
    label: '인지',
    icon: '🧠',
    description: '생각하고, 이해하고, 기억하고, 문제를 해결하는 힘',
    color: 'from-violet-500 to-purple-600',
    chapters: [
      { key: 'humanities', label: '인문', icon: '📚', color: 'from-violet-500 to-purple-600', gradient: 'from-violet-500/20 to-purple-500/20' },
      { key: 'social', label: '사회', icon: '🌍', color: 'from-blue-500 to-cyan-600', gradient: 'from-blue-500/20 to-cyan-500/20' },
      { key: 'science', label: '과학', icon: '🔬', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500/20 to-emerald-500/20' },
      { key: 'religion', label: '종교', icon: '🙏', color: 'from-amber-500 to-orange-600', gradient: 'from-amber-500/20 to-orange-500/20' },
      { key: 'philosophy', label: '철학', icon: '🤔', color: 'from-indigo-500 to-blue-600', gradient: 'from-indigo-500/20 to-blue-500/20' },
      { key: 'art', label: '예술', icon: '🎨', color: 'from-pink-500 to-rose-600', gradient: 'from-pink-500/20 to-rose-500/20' },
      { key: 'korean', label: '국어', icon: '✍️', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/20 to-rose-500/20' },
      { key: 'english', label: '영어', icon: '🔤', color: 'from-cyan-500 to-blue-600', gradient: 'from-cyan-500/20 to-blue-500/20' },
      { key: 'math', label: '수학', icon: '📐', color: 'from-teal-500 to-cyan-600', gradient: 'from-teal-500/20 to-cyan-500/20' },
    ]
  },
  selfDirected: {
    key: 'selfDirected',
    label: '자기주도',
    icon: '🎯',
    description: '스스로 목표를 세우고 계획하고 실행하는 힘',
    color: 'from-cyan-500 to-blue-600',
    chapters: [
      { key: 'goal', label: '목표설정', icon: '🎯', color: 'from-cyan-500 to-blue-600', gradient: 'from-cyan-500/20 to-blue-500/20' },
      { key: 'time', label: '시간관리', icon: '⏰', color: 'from-amber-500 to-orange-600', gradient: 'from-amber-500/20 to-orange-500/20' },
      { key: 'priority', label: '우선순위', icon: '📌', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/20 to-rose-500/20' },
      { key: 'motivation', label: '동기부여', icon: '🔥', color: 'from-orange-500 to-red-600', gradient: 'from-orange-500/20 to-red-500/20' },
      { key: 'selfAwareness', label: '자기인식', icon: '🪞', color: 'from-violet-500 to-purple-600', gradient: 'from-violet-500/20 to-purple-500/20' },
    ]
  },
  habit: {
    key: 'habit',
    label: '습관',
    icon: '🔄',
    description: '좋은 습관을 만들고 나쁜 습관을 바꾸는 힘',
    color: 'from-green-500 to-emerald-600',
    chapters: [
      { key: 'goodHabit', label: '좋은 습관 만들기', icon: '✨', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500/20 to-emerald-500/20' },
      { key: 'break', label: '나쁜 습관 끊기', icon: '✂️', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/20 to-rose-500/20' },
      { key: 'reward', label: '보상 쌓기', icon: '🎁', color: 'from-amber-500 to-orange-600', gradient: 'from-amber-500/20 to-orange-500/20' },
      { key: 'stack', label: '습관 쌓기', icon: '📚', color: 'from-violet-500 to-purple-600', gradient: 'from-violet-500/20 to-purple-500/20' },
      { key: 'environment', label: '환경설정', icon: '🏠', color: 'from-blue-500 to-cyan-600', gradient: 'from-blue-500/20 to-cyan-500/20' },
    ]
  },
  attitude: {
    key: 'attitude',
    label: '태도',
    icon: '💪',
    description: '긍정적인 마음가짐과 성장 마인드셋',
    color: 'from-amber-500 to-orange-600',
    chapters: [
      { key: 'growth', label: '성장 마인드셋', icon: '🌱', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500/20 to-emerald-500/20' },
      { key: 'curiosity', label: '호기심', icon: '🔍', color: 'from-blue-500 to-cyan-600', gradient: 'from-blue-500/20 to-cyan-500/20' },
      { key: 'grit', label: '끈기', icon: '💪', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/20 to-rose-500/20' },
      { key: 'resilience', label: '회복탄력성', icon: '🏀', color: 'from-amber-500 to-orange-600', gradient: 'from-amber-500/20 to-orange-500/20' },
      { key: 'humility', label: '겸손', icon: '🙏', color: 'from-violet-500 to-purple-600', gradient: 'from-violet-500/20 to-purple-500/20' },
      { key: 'courage', label: '용기', icon: '🦁', color: 'from-orange-500 to-red-600', gradient: 'from-orange-500/20 to-red-500/20' },
      { key: 'gratitude', label: '감사', icon: '💝', color: 'from-pink-500 to-rose-600', gradient: 'from-pink-500/20 to-rose-500/20' },
    ]
  },
  relationship: {
    key: 'relationship',
    label: '관계',
    icon: '🤝',
    description: '사람들과 건강한 관계를 맺고 유지하는 힘',
    color: 'from-pink-500 to-rose-600',
    chapters: [
      { key: 'communication', label: '소통', icon: '💬', color: 'from-pink-500 to-rose-600', gradient: 'from-pink-500/20 to-rose-500/20' },
      { key: 'empathy', label: '공감', icon: '💗', color: 'from-red-500 to-rose-600', gradient: 'from-red-500/20 to-rose-500/20' },
      { key: 'trust', label: '신뢰', icon: '🤞', color: 'from-blue-500 to-indigo-600', gradient: 'from-blue-500/20 to-indigo-500/20' },
      { key: 'support', label: '지지하기', icon: '🫂', color: 'from-cyan-500 to-blue-600', gradient: 'from-cyan-500/20 to-blue-500/20' },
      { key: 'listening', label: '경청', icon: '👂', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500/20 to-emerald-500/20' },
    ]
  },
  character: {
    key: 'character',
    label: '인성',
    icon: '❤️',
    description: '바른 인격과 좋은 관계를 만드는 힘',
    color: 'from-rose-500 to-red-600',
    chapters: [
      { key: 'love', label: '사랑', icon: '❤️', color: 'from-rose-500 to-red-600', gradient: 'from-rose-500/20 to-red-500/20' },
      { key: 'emotion', label: '감정', icon: '🎭', color: 'from-amber-500 to-orange-600', gradient: 'from-amber-500/20 to-orange-500/20' },
      { key: 'heart', label: '마음', icon: '💜', color: 'from-violet-500 to-purple-600', gradient: 'from-violet-500/20 to-purple-500/20' },
      { key: 'responsibility', label: '책임', icon: '🎖️', color: 'from-green-500 to-emerald-600', gradient: 'from-green-500/20 to-emerald-500/20' },
      { key: 'kindness', label: '친절', icon: '🤗', color: 'from-pink-500 to-rose-600', gradient: 'from-pink-500/20 to-rose-500/20' },
      { key: 'cooperation', label: '협동', icon: '🤜🤛', color: 'from-cyan-500 to-blue-600', gradient: 'from-cyan-500/20 to-blue-500/20' },
      { key: 'respect', label: '존중', icon: '🙇', color: 'from-blue-500 to-indigo-600', gradient: 'from-blue-500/20 to-indigo-500/20' },
      { key: 'service', label: '봉사', icon: '🌍', color: 'from-teal-500 to-cyan-600', gradient: 'from-teal-500/20 to-cyan-500/20' },
      { key: 'fairness', label: '공정', icon: '⚖️', color: 'from-indigo-500 to-blue-600', gradient: 'from-indigo-500/20 to-blue-500/20' },
    ]
  }
}

export function getWorldConfig(worldKey: WorldKey): WorldConfig {
  return WORLD_CONFIGS[worldKey]
}
