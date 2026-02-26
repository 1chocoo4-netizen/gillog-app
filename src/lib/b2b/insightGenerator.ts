// 할루시네이션 없는 객관적 인사이트 생성기
// 모든 문구는 실제 점수 데이터 + 실행/코칭/감정 맥락에 기반합니다.
import type { MetricKey } from './types'

interface InsightInput {
  key: MetricKey
  current: number
  previous: number | null  // null이면 100개 미만 (현재 상태만)
}

/** 메트릭별 맥락 데이터 (API에서 구축) */
export interface MetricContext {
  topActivities: string[]       // safe words에서 추출한 주요 활동
  streak: number                // 연속 실행일
  recentMoodAvg: number         // 최근 감정 평균 (0이면 데이터 없음)
  coachingSessionCount: number  // 코칭 세션 수
  coachingGoalClarity: number   // 코칭 goalClarity 시그널 (0-100)
  coachingEmotional: number     // 코칭 emotionalAwareness (0-100)
  coachingActionCommit: number  // 코칭 actionCommitment (0-100)
  coachingCompletion: number    // 코칭 sessionCompletionRate (0-100)
  coachingReflection: number    // 코칭 selfReflectionDepth (0-100)
  worldDistribution: Record<string, number>  // 월드별 실행 비율
  textDepthGrowing: boolean     // 글 깊이 성장 여부
  energyTrend: 'up' | 'down' | 'stable'
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

// ─── 메트릭별 맥락 문장 생성 ───

const WORLD_LABELS: Record<string, string> = {
  cognition: '학습',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

function generateContextSentence(key: MetricKey, ctx: MetricContext): string {
  const parts: string[] = []

  switch (key) {
    case 'initiative': {
      // topActivities + coachingGoalClarity
      if (ctx.topActivities.length > 0) {
        parts.push(`${ctx.topActivities.join(', ')} 활동을 실행하고 있`)
      }
      if (ctx.coachingSessionCount > 0 && ctx.coachingGoalClarity >= 30) {
        parts.push('코칭에서 목표를 탐색하는 모습이 보입니다')
      }
      if (parts.length === 0) return ''
      // 결합
      if (parts.length === 2) {
        return `${parts[0]}으며, ${parts[1]}.`
      }
      return parts[0] + (parts[0].endsWith('니다') ? '' : '습니다.')
    }

    case 'consistency': {
      // streak + coachingSessionCount
      if (ctx.streak >= 3) {
        parts.push(`${ctx.streak}일 연속 실행을 이어가고 있어 좋은 습관이 형성되고 있습니다`)
      }
      if (ctx.coachingSessionCount >= 3) {
        parts.push(`코칭에도 ${ctx.coachingSessionCount}회 참여하며 꾸준함을 보여주고 있습니다`)
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'reflectiveness': {
      // textDepthGrowing + coachingReflection
      if (ctx.textDepthGrowing) {
        parts.push('최근 기록의 깊이가 성장하고 있어 성찰 능력이 발전하고 있습니다')
      }
      if (ctx.coachingSessionCount > 0 && ctx.coachingReflection >= 40) {
        parts.push('코칭 대화에서도 자신을 깊이 돌아보는 모습이 나타납니다')
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'adaptability': {
      // worldDistribution 다양성 + 새 영역 도전
      const worlds = Object.entries(ctx.worldDistribution)
        .filter(([, v]) => v > 0)
        .sort((a, b) => b[1] - a[1])
      const worldCount = worlds.length
      if (worldCount >= 4) {
        parts.push(`${worldCount}개 영역에서 고르게 활동하며 다양한 경험을 쌓고 있습니다`)
      } else if (worldCount >= 2) {
        const topWorldNames = worlds.slice(0, 2).map(([k]) => WORLD_LABELS[k] || k)
        parts.push(`${topWorldNames.join(', ')} 영역을 중심으로 활동하고 있습니다`)
      }
      if (ctx.energyTrend === 'up') {
        parts.push('활동 에너지도 상승 추세입니다')
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'collaboration': {
      // 관계 월드 비율 + coachingEmotional
      const relRatio = (ctx.worldDistribution['relationship'] || 0) + (ctx.worldDistribution['character'] || 0)
      if (relRatio > 0) {
        parts.push('관계·인성 영역에서 실행 경험을 쌓고 있습니다')
      }
      if (ctx.coachingSessionCount > 0 && ctx.coachingEmotional >= 30) {
        parts.push('코칭에서 타인과의 관계를 돌아보는 모습이 보입니다')
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'goalClarity': {
      // coachingGoalClarity + 진로 활동 비율
      if (ctx.coachingSessionCount > 0 && ctx.coachingGoalClarity >= 40) {
        parts.push('코칭 대화에서 자신의 목표를 적극적으로 탐색하고 있습니다')
      } else if (ctx.coachingSessionCount > 0 && ctx.coachingGoalClarity >= 20) {
        parts.push('코칭을 통해 목표에 대해 생각하기 시작했습니다')
      }
      const selfDirectedRatio = ctx.worldDistribution['selfDirected'] || 0
      if (selfDirectedRatio > 0) {
        parts.push('자기주도 영역에서 실행을 이어가고 있습니다')
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'emotionalAware': {
      // recentMoodAvg + coachingEmotional
      if (ctx.recentMoodAvg >= 4) {
        parts.push('최근 정서 상태가 밝고 안정적입니다')
      } else if (ctx.recentMoodAvg >= 3) {
        parts.push('비교적 안정된 정서 상태를 유지하고 있습니다')
      } else if (ctx.recentMoodAvg > 0) {
        parts.push('최근 감정 상태가 다소 낮은 편이어서 따뜻한 격려가 도움이 될 수 있습니다')
      }
      if (ctx.coachingSessionCount > 0 && ctx.coachingEmotional >= 40) {
        parts.push('코칭에서 자신의 감정을 인식하고 표현하는 힘이 보입니다')
      }
      if (parts.length === 0) return ''
      if (parts.length === 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    case 'growthMindset': {
      // coachingCompletion + coachingActionCommit
      if (ctx.coachingSessionCount > 0 && ctx.coachingCompletion >= 50) {
        parts.push('코칭을 끝까지 완료하며 성장에 대한 의지가 뚜렷합니다')
      }
      if (ctx.coachingSessionCount > 0 && ctx.coachingActionCommit >= 40) {
        parts.push('코칭에서 실행 약속을 자주 표현하고 있습니다')
      }
      if (ctx.energyTrend === 'up') {
        parts.push('활동 에너지가 상승 추세로 긍정적인 흐름입니다')
      }
      if (parts.length === 0) return ''
      if (parts.length >= 2) return `${parts[0]}. ${parts[1]}.`
      return parts[0] + '.'
    }

    default:
      return ''
  }
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
  contexts?: Record<MetricKey, MetricContext>,
): Record<string, string> {
  const keys = Object.keys(currentScores) as MetricKey[]
  const result: Record<string, string> = {}

  for (const key of keys) {
    let base = generateInsight({
      key,
      current: currentScores[key],
      previous: previousScores ? previousScores[key] : null,
    })

    // 맥락 문장 추가 (context가 있을 때만)
    if (contexts && contexts[key]) {
      const contextSentence = generateContextSentence(key, contexts[key])
      if (contextSentence) {
        base += ' ' + contextSentence
      }
    }

    result[key] = base
  }

  return result
}
