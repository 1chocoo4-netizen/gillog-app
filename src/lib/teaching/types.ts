// 티칭 시스템 타입 정의
import { WorldKey, WorldChapter, WORLD_CONFIGS } from './worldTypes'

export type { WorldKey }
export { WORLD_CONFIGS }

export interface TeachingContent {
  id: string
  worldKey: WorldKey
  chapterKey: string
  level: number  // 1~5
  conceptTitle: string
  conceptContent: string  // 핵심 원리 설명
  thinkingQuestion: string  // 사고 질문
  actionMission: string  // 실행 미션
  xpReward: number
  energyReward: number
}

export interface TeachingProgress {
  contentId: string
  completed: boolean
  completedAt?: string
}

// 레거시 호환성을 위한 SubjectKey (이제 ChapterKey로 대체)
export type SubjectKey = string

export interface Subject {
  key: string
  label: string
  icon: string
  color: string
  gradient: string
}

// 월드별 챕터를 Subject 형태로 변환하는 헬퍼
export function getChaptersAsSubjects(worldKey: WorldKey): Subject[] {
  const worldConfig = WORLD_CONFIGS[worldKey]
  return worldConfig.chapters.map(chapter => ({
    key: chapter.key,
    label: chapter.label,
    icon: chapter.icon,
    color: chapter.color,
    gradient: chapter.gradient,
  }))
}

// 레거시 SUBJECTS (인지 월드의 챕터들)
export const SUBJECTS: Subject[] = getChaptersAsSubjects('cognition')

// 레벨 정의 (모든 월드 공통)
export const LEVELS = [
  { level: 1, name: '기초', description: '핵심 개념 이해하기' },
  { level: 2, name: '적용', description: '일상에 적용하기' },
  { level: 3, name: '심화', description: '깊이 있게 탐구하기' },
  { level: 4, name: '응용', description: '다양한 상황에 활용하기' },
  { level: 5, name: '마스터', description: '완전히 내 것으로 만들기' },
]

// 월드별 레벨 이름 가져오기
export function getLevelName(worldKey: WorldKey, level: number): string {
  const levelInfo = LEVELS.find(l => l.level === level)
  return levelInfo?.name || `Level ${level}`
}
