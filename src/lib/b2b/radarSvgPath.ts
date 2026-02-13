import type { MetricKey, MetricScores } from './types'

const METRIC_ORDER: MetricKey[] = [
  'initiative', 'consistency', 'reflectiveness', 'adaptability',
  'collaboration', 'goalClarity', 'emotionalAware', 'growthMindset',
]

/** 레이더 차트 꼭짓점 좌표 계산 */
function polarToCartesian(
  cx: number, cy: number, radius: number, angleIndex: number, total: number,
): { x: number; y: number } {
  const angle = (2 * Math.PI * angleIndex) / total - Math.PI / 2
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  }
}

/** 8각형 그리드 라인 좌표 배열 (배경 격자) */
export function getGridPolygonPoints(
  cx: number, cy: number, radius: number,
): string {
  return METRIC_ORDER.map((_, i) => {
    const { x, y } = polarToCartesian(cx, cy, radius, i, 8)
    return `${x},${y}`
  }).join(' ')
}

/** 점수 기반 레이더 폴리곤 좌표 */
export function getScorePolygonPoints(
  scores: MetricScores, cx: number, cy: number, maxRadius: number,
): string {
  return METRIC_ORDER.map((key, i) => {
    const ratio = (scores[key] || 0) / 100
    const { x, y } = polarToCartesian(cx, cy, maxRadius * ratio, i, 8)
    return `${x},${y}`
  }).join(' ')
}

/** 각 축 라벨의 위치 좌표 */
export function getLabelPositions(
  cx: number, cy: number, radius: number,
): { key: MetricKey; x: number; y: number }[] {
  return METRIC_ORDER.map((key, i) => {
    const { x, y } = polarToCartesian(cx, cy, radius, i, 8)
    return { key, x, y }
  })
}

/** 축 라인 좌표 (중심 → 꼭짓점) */
export function getAxisLines(
  cx: number, cy: number, radius: number,
): { x1: number; y1: number; x2: number; y2: number }[] {
  return METRIC_ORDER.map((_, i) => {
    const { x, y } = polarToCartesian(cx, cy, radius, i, 8)
    return { x1: cx, y1: cy, x2: x, y2: y }
  })
}

export { METRIC_ORDER }
