// 레슨 시스템 - 티어/스테이지 기반 학습 카드
import { HUMANITIES_STAGES } from './humanitiesContent'
import { KOREAN_STAGES } from './koreanContent'
import { ENGLISH_STAGES } from './englishContent'
import { MATH_STAGES } from './mathContent'
import { TIME_STAGES } from './timeContent'
import { GOOD_HABIT_STAGES } from './goodHabitContent'
import { SELF_AWARENESS_STAGES } from './selfAwarenessContent'
import { ENVIRONMENT_STAGES } from './environmentContent'
import { FOCUS_STAGES } from './focusContent'
import { GRATITUDE_STAGES } from './gratitudeContent'
import { COMMUNICATION_STAGES } from './communicationContent'
import { TRUST_STAGES } from './trustContent'
import { LOVE_STAGES } from './loveContent'
import { MENTAL_STAGES } from './mentalContent'

// ── 카드 타입 정의 ──

export interface ConceptCard {
  type: 'concept'
  title: string
  description: string
}

export interface SummaryCard {
  type: 'summary'
  keywords: { icon: string; label: string; description: string }[]
}

export interface ExampleCard {
  type: 'example'
  bad: { label: string; story: string }
  good: { label: string; story: string }
}

export interface ApplyCard {
  type: 'apply'
  question: string
  placeholder: string
}

export interface OXCard {
  type: 'ox'
  statement: string
  answer: boolean
  feedback: string
}

export interface MultipleChoiceCard {
  type: 'multipleChoice'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface FeedbackCard {
  type: 'feedback'
  summary: string
  message: string
}

export interface MissionCard {
  type: 'mission'
  mission: string
  encouragement: string
}

export type LessonCard =
  | ConceptCard
  | SummaryCard
  | ExampleCard
  | ApplyCard
  | OXCard
  | MultipleChoiceCard
  | FeedbackCard
  | MissionCard

// ── 티어 정의 ──

export type TierKey = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'

export interface TierConfig {
  key: TierKey
  label: string
  icon: string
  color: string
  gradient: string
  bgGlow: string
  stageCount: number
}

export const TIERS: TierConfig[] = [
  { key: 'bronze', label: '브론즈', icon: '🥉', color: 'from-amber-600 to-amber-800', gradient: 'from-amber-600/20 to-amber-800/20', bgGlow: 'rgba(217, 119, 6, 0.3)', stageCount: 10 },
  { key: 'silver', label: '실버', icon: '🥈', color: 'from-slate-400 to-slate-600', gradient: 'from-slate-400/20 to-slate-600/20', bgGlow: 'rgba(148, 163, 184, 0.3)', stageCount: 10 },
  { key: 'gold', label: '골드', icon: '🥇', color: 'from-yellow-400 to-yellow-600', gradient: 'from-yellow-400/20 to-yellow-600/20', bgGlow: 'rgba(250, 204, 21, 0.3)', stageCount: 10 },
  { key: 'platinum', label: '플래티넘', icon: '💎', color: 'from-cyan-400 to-cyan-600', gradient: 'from-cyan-400/20 to-cyan-600/20', bgGlow: 'rgba(34, 211, 238, 0.3)', stageCount: 10 },
  { key: 'diamond', label: '다이아', icon: '👑', color: 'from-violet-400 to-violet-600', gradient: 'from-violet-400/20 to-violet-600/20', bgGlow: 'rgba(167, 139, 250, 0.3)', stageCount: 10 },
]

export function getTierConfig(tierKey: TierKey): TierConfig {
  return TIERS.find(t => t.key === tierKey)!
}

// ── 스테이지 정의 ──

export interface Stage {
  id: string          // e.g., 'humanities-bronze-1'
  chapterKey: string  // e.g., 'humanities'
  tierKey: TierKey
  stageNumber: number
  title: string
  cards: LessonCard[]
}

// 스테이지 ID 파싱
export function parseStageId(stageId: string): { chapterKey: string; tierKey: TierKey; stageNumber: number } | null {
  const parts = stageId.split('-')
  if (parts.length < 3) return null
  const stageNumber = parseInt(parts[parts.length - 1])
  const tierKey = parts[parts.length - 2] as TierKey
  const chapterKey = parts.slice(0, parts.length - 2).join('-')
  if (!TIERS.find(t => t.key === tierKey) || isNaN(stageNumber)) return null
  return { chapterKey, tierKey, stageNumber }
}

// 스테이지 ID 생성
export function makeStageId(chapterKey: string, tierKey: TierKey, stageNumber: number): string {
  return `${chapterKey}-${tierKey}-${stageNumber}`
}

// ── 콘텐츠 데이터 ──
// key: stageId (e.g., 'humanities-bronze-1')

export const STAGE_CONTENT: Record<string, Stage> = {
  ...HUMANITIES_STAGES,
  ...KOREAN_STAGES,
  ...ENGLISH_STAGES,
  ...MATH_STAGES,
  ...TIME_STAGES,
  ...GOOD_HABIT_STAGES,
  ...SELF_AWARENESS_STAGES,
  ...ENVIRONMENT_STAGES,
  ...FOCUS_STAGES,
  ...GRATITUDE_STAGES,
  ...COMMUNICATION_STAGES,
  ...TRUST_STAGES,
  ...LOVE_STAGES,
  ...MENTAL_STAGES,
}

// 특정 챕터의 스테이지 가져오기
export function getStagesByChapter(chapterKey: string): Stage[] {
  return Object.values(STAGE_CONTENT).filter(s => s.chapterKey === chapterKey)
}

// 특정 스테이지 가져오기
export function getStage(stageId: string): Stage | undefined {
  return STAGE_CONTENT[stageId]
}

// ── 진행도 관리 (localStorage) ──

const PROGRESS_KEY = 'gillog-lesson-progress'

export function getCompletedStages(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(PROGRESS_KEY)
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function markStageCompleted(stageId: string): void {
  const completed = getCompletedStages()
  if (!completed.includes(stageId)) {
    completed.push(stageId)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed))
  }
}

export function isStageCompleted(stageId: string): boolean {
  return getCompletedStages().includes(stageId)
}
