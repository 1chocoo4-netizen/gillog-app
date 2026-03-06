// THE GLORY 코칭 모델 — 단계 정의

export const GLORY_STAGES = {
  GREETING: { label: '인사', group: 'start', order: 0 },
  THE_T: { label: '감사 (Thankful)', group: 'THE', order: 1 },
  THE_H: { label: '행복 (Happy)', group: 'THE', order: 2 },
  THE_E: { label: '감정 (Emotional)', group: 'THE', order: 3 },
  TOPIC: { label: '주제 설정 (Topic)', group: 'GLORY', order: 4 },
  GLORY_G: { label: '현재자각 (Grounded)', group: 'GLORY', order: 5 },
  GLORY_L: { label: '이상설정 (Luminous)', group: 'GLORY', order: 6 },
  GLORY_O: { label: '대안탐색 (Options)', group: 'GLORY', order: 7 },
  GLORY_R: { label: '실행설계 (Real Action)', group: 'GLORY', order: 8 },
  WHY_Y: { label: '의미화 (Why)', group: 'Y', order: 9 },
  COMPLETE: { label: '완료', group: 'complete', order: 10 },
} as const

export type GloryStage = keyof typeof GLORY_STAGES

export const STAGE_ORDER: GloryStage[] = [
  'GREETING',
  'THE_T',
  'THE_H',
  'THE_E',
  'TOPIC',
  'GLORY_G',
  'GLORY_L',
  'GLORY_O',
  'GLORY_R',
  'WHY_Y',
  'COMPLETE',
]

export const STAGE_GROUPS = [
  { key: 'THE', label: 'THE', stages: ['THE_T', 'THE_H', 'THE_E'] },
  { key: 'GLORY', label: 'GLORY', stages: ['TOPIC', 'GLORY_G', 'GLORY_L', 'GLORY_O', 'GLORY_R'] },
  { key: 'Y', label: 'Y', stages: ['WHY_Y'] },
] as const

export function getNextStage(current: GloryStage): GloryStage {
  const idx = STAGE_ORDER.indexOf(current)
  if (idx === -1 || idx >= STAGE_ORDER.length - 1) return 'COMPLETE'
  return STAGE_ORDER[idx + 1]
}

export function getStageGroup(stage: GloryStage): string {
  return GLORY_STAGES[stage]?.group ?? 'start'
}

export function isStageComplete(stage: GloryStage): boolean {
  return stage === 'COMPLETE'
}

export function getStageProgress(stage: GloryStage): number {
  const idx = STAGE_ORDER.indexOf(stage)
  if (idx === -1) return 0
  return Math.round((idx / (STAGE_ORDER.length - 1)) * 100)
}
