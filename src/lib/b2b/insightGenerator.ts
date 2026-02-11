// 할루시네이션 없는 객관적 인사이트 생성기
// 모든 문구는 실제 점수 데이터에만 기반합니다.
import type { MetricKey } from './types'

interface InsightInput {
  key: MetricKey
  current: number
  previous: number | null  // null이면 100개 미만 (현재 상태만)
}

const METRIC_LABELS: Record<MetricKey, string> = {
  initiative: '자기주도 실행력',
  consistency: '실행 일관성',
  reflectiveness: '성찰 깊이',
  adaptability: '적응적 실행',
  collaboration: '협력적 실행',
  goalClarity: '목표 명확성',
  emotionalAware: '정서 인식력',
  growthMindset: '성장 마인드셋',
}

/** 점수 등급 판정 (객관적) */
function getLevel(score: number): 'start' | 'developing' | 'stable' | 'strong' | 'excellent' {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'strong'
  if (score >= 40) return 'stable'
  if (score >= 20) return 'developing'
  return 'start'
}

const LEVEL_DESC: Record<string, string> = {
  start: '시작 단계',
  developing: '발전 단계',
  stable: '안정 단계',
  strong: '우수 단계',
  excellent: '탁월 단계',
}

/**
 * 100개 미만: 현재 상태 기반 객관적 설명 + 격려
 * 점수와 등급만 언급하며, 존재하지 않는 행동을 추측하지 않습니다.
 */
function generateCurrentOnlyInsight(key: MetricKey, current: number): string {
  const label = METRIC_LABELS[key]
  const level = getLevel(current)
  const levelText = LEVEL_DESC[level]

  if (level === 'start') {
    return `${label} ${current}점으로 ${levelText}입니다. 실행을 이어가면 자연스럽게 성장합니다.`
  }
  if (level === 'developing') {
    return `${label} ${current}점, ${levelText}에 있습니다. 꾸준한 실행이 쌓이고 있습니다.`
  }
  if (level === 'stable') {
    return `${label} ${current}점으로 ${levelText}에 도달했습니다. 좋은 흐름입니다.`
  }
  if (level === 'strong') {
    return `${label} ${current}점, ${levelText}입니다. 실행이 잘 이루어지고 있습니다.`
  }
  return `${label} ${current}점으로 ${levelText}입니다. 높은 수준을 유지하고 있습니다.`
}

/**
 * 100개 이상: 성장 변화 추이 기반 설명 + 격려
 * 실제 점수 차이만 언급합니다.
 */
function generateGrowthInsight(key: MetricKey, current: number, previous: number): string {
  const delta = current - previous
  const absDelta = Math.abs(delta)
  const percent = previous > 0 ? Math.round((delta / previous) * 100) : 0

  if (delta > 15) {
    return `${absDelta}점 상승(${percent > 0 ? '+' : ''}${percent}%)으로 큰 폭의 성장입니다. 실행의 결과가 잘 나타나고 있습니다.`
  }
  if (delta > 5) {
    return `${absDelta}점 상승하며 꾸준히 성장하고 있습니다. 지금의 실행 흐름이 잘 이어지고 있습니다.`
  }
  if (delta > 0) {
    return `${absDelta}점 소폭 상승했습니다. 조금씩이라도 나아가는 것이 의미 있습니다.`
  }
  if (delta === 0) {
    return `이전과 동일한 ${current}점을 유지하고 있습니다. 안정적인 수준입니다.`
  }
  if (delta > -5) {
    return `${absDelta}점 소폭 변동이 있습니다. 자연스러운 변동 범위이며 걱정할 수준은 아닙니다.`
  }
  return `${absDelta}점 변화가 있습니다. 실행 패턴을 점검해 보면 새로운 방향을 찾을 수 있습니다.`
}

/** 메트릭 카드에 표시할 인사이트 텍스트 생성 */
export function generateInsight(input: InsightInput): string {
  const { key, current, previous } = input

  if (previous === null) {
    return generateCurrentOnlyInsight(key, current)
  }

  return generateGrowthInsight(key, current, previous)
}

/** 8개 지표 전체 인사이트를 한 번에 생성 */
export function generateAllInsights(
  currentScores: Record<MetricKey, number>,
  previousScores: Record<MetricKey, number> | null,
): Record<string, string> {
  const keys = Object.keys(currentScores) as MetricKey[]
  const result: Record<string, string> = {}

  for (const key of keys) {
    result[key] = generateInsight({
      key,
      current: currentScores[key],
      previous: previousScores ? previousScores[key] : null,
    })
  }

  return result
}
