// 6개 월드 토큰 정의
export const WORLD_TOKENS = {
  cognition: {
    key: 'cognition',
    label: '인지',
    icon: '🧠',
    color: '#A78BFA', // violet
    bgGlow: 'rgba(167, 139, 250, 0.3)',
    order: 1,
  },
  selfDirected: {
    key: 'selfDirected',
    label: '자기주도',
    icon: '🎯',
    color: '#38BDF8', // sky blue
    bgGlow: 'rgba(56, 189, 248, 0.3)',
    order: 2,
  },
  habit: {
    key: 'habit',
    label: '습관',
    icon: '🔁',
    color: '#4ADE80', // green
    bgGlow: 'rgba(74, 222, 128, 0.3)',
    order: 3,
  },
  attitude: {
    key: 'attitude',
    label: '태도',
    icon: '🙂',
    color: '#FBBF24', // amber
    bgGlow: 'rgba(251, 191, 36, 0.3)',
    order: 4,
  },
  expression: {
    key: 'expression',
    label: '표현',
    icon: '💬',
    color: '#F472B6', // pink
    bgGlow: 'rgba(244, 114, 182, 0.3)',
    order: 5,
  },
  character: {
    key: 'character',
    label: '인성',
    icon: '🤝',
    color: '#FB923C', // orange
    bgGlow: 'rgba(251, 146, 60, 0.3)',
    order: 6,
  },
} as const

export type WorldKey = keyof typeof WORLD_TOKENS

export const WORLD_ORDER: WorldKey[] = [
  'cognition',
  'selfDirected',
  'habit',
  'attitude',
  'expression',
  'character',
]

// 더미 노드 데이터 생성
export interface MapNode {
  id: string
  worldKey: WorldKey
  type: 'lesson' | 'checkpoint' | 'boss'
  status: 'completed' | 'active' | 'locked'
  title: string
  xp: number
  order: number
}

export function generateDummyNodes(): MapNode[] {
  const nodes: MapNode[] = []
  let order = 0

  WORLD_ORDER.forEach((worldKey, worldIndex) => {
    // 각 월드당 5개 노드
    for (let i = 0; i < 5; i++) {
      order++
      const isFirst = worldIndex === 0 && i === 0
      const isSecond = worldIndex === 0 && i === 1

      nodes.push({
        id: `node-${order}`,
        worldKey,
        type: i === 4 ? 'checkpoint' : 'lesson',
        status: isFirst ? 'completed' : isSecond ? 'active' : 'locked',
        title: `${WORLD_TOKENS[worldKey].label} ${i + 1}`,
        xp: 20 + i * 5,
        order,
      })
    }
  })

  return nodes
}
