// ISO 30414 기반 8개 실행 역량 지표 매핑
import type { MetricKey } from './types'

export interface MetricDefinition {
  key: MetricKey
  label: string
  shortLabel: string
  isoCode: string
  isoName: string
  description: string
  icon: string
}

export const METRIC_DEFINITIONS: MetricDefinition[] = [
  {
    key: 'initiative',
    label: '자기주도 실행력',
    shortLabel: '실행력',
    isoCode: '6.1',
    isoName: 'Leadership',
    description: '외부 지시 없이 스스로 과제를 설정하고 실행하는 능력',
    icon: '🚀',
  },
  {
    key: 'consistency',
    label: '실행 일관성',
    shortLabel: '일관성',
    isoCode: '8.1',
    isoName: 'Productivity',
    description: '꾸준히 반복적으로 실행하는 습관과 빈도',
    icon: '📊',
  },
  {
    key: 'reflectiveness',
    label: '성찰 깊이',
    shortLabel: '성찰',
    isoCode: '10.2',
    isoName: 'Knowledge Management',
    description: '실행 후 의미를 되돌아보고 학습하는 수준',
    icon: '🔍',
  },
  {
    key: 'adaptability',
    label: '적응적 실행',
    shortLabel: '적응력',
    isoCode: '9.1',
    isoName: 'Succession Planning',
    description: '환경 변화에 맞춰 실행 방식을 유연하게 조정하는 능력',
    icon: '🔄',
  },
  {
    key: 'collaboration',
    label: '협력적 실행',
    shortLabel: '협력',
    isoCode: '7.1',
    isoName: 'Organizational Culture',
    description: '타인과 함께 목표를 달성하는 협업 실행 역량',
    icon: '🤝',
  },
  {
    key: 'goalClarity',
    label: '목표 명확성',
    shortLabel: '목표',
    isoCode: '8.2',
    isoName: 'Workforce Availability',
    description: '명확한 목표를 설정하고 그에 맞게 실행하는 정도',
    icon: '🎯',
  },
  {
    key: 'emotionalAware',
    label: '정서 인식력',
    shortLabel: '정서',
    isoCode: '5.1',
    isoName: 'Health & Well-being',
    description: '자기 감정을 인식하고 실행에 반영하는 역량',
    icon: '💜',
  },
  {
    key: 'growthMindset',
    label: '성장 마인드셋',
    shortLabel: '성장',
    isoCode: '10.1',
    isoName: 'Training & Development',
    description: '실패를 학습 기회로 삼고 지속 성장하려는 태도',
    icon: '🌱',
  },
]

export const METRIC_MAP = Object.fromEntries(
  METRIC_DEFINITIONS.map((d) => [d.key, d])
) as Record<MetricKey, MetricDefinition>

