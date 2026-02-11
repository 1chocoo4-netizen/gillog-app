export interface SurveyArea {
  key: string
  label: string
  color: string
  bgColor: string
  icon: string
}

export interface SurveyQuestion {
  id: string
  text: string
  areaKey: string
}

export const LIKERT_LABELS = [
  '전혀 그렇지 않다',
  '그렇지 않다',
  '보통이다',
  '그렇다',
  '매우 그렇다',
] as const

export const SURVEY_AREAS: SurveyArea[] = [
  {
    key: 'career',
    label: '진로',
    color: '#6366f1',
    bgColor: '#eef2ff',
    icon: '🧭',
  },
  {
    key: 'community',
    label: '공동체',
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: '🤝',
  },
  {
    key: 'nonCognitive',
    label: '인성',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    icon: '💪',
  },
]

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // ========== 진로 탐색 (career) ==========
  { id: 'c1', areaKey: 'career', text: '나는 내가 좋아하는 일이 무엇인지 알고 있다.' },
  { id: 'c2', areaKey: 'career', text: '나는 나의 강점과 약점을 파악하고 있다.' },
  { id: 'c3', areaKey: 'career', text: '나는 관심 있는 직업이나 분야가 있다.' },
  { id: 'c4', areaKey: 'career', text: '나는 진로를 위해 필요한 정보를 찾아본 적이 있다.' },
  { id: 'c5', areaKey: 'career', text: '나는 미래의 나의 모습을 상상해 본 적이 있다.' },
  { id: 'c6', areaKey: 'career', text: '나는 진로와 관련된 경험(체험, 봉사 등)을 해본 적이 있다.' },
  { id: 'c7', areaKey: 'career', text: '나는 나의 진로 목표를 세우고 있다.' },
  { id: 'c8', areaKey: 'career', text: '나는 진로 목표를 이루기 위해 노력하고 있다.' },
  { id: 'c9', areaKey: 'career', text: '나는 다양한 직업의 세계에 관심이 있다.' },
  { id: 'c10', areaKey: 'career', text: '나는 나의 진로에 대해 자신감을 가지고 있다.' },

  // ========== 공동체 의식 (community) ==========
  { id: 'm1', areaKey: 'community', text: '나는 친구들과 잘 어울린다.' },
  { id: 'm2', areaKey: 'community', text: '나는 다른 사람의 입장에서 생각해 보려고 노력한다.' },
  { id: 'm3', areaKey: 'community', text: '나는 우리 반(학교)의 일에 적극적으로 참여한다.' },
  { id: 'm4', areaKey: 'community', text: '나는 도움이 필요한 친구를 도와준다.' },
  { id: 'm5', areaKey: 'community', text: '나는 규칙과 약속을 잘 지킨다.' },
  { id: 'm6', areaKey: 'community', text: '나는 다른 사람의 의견을 존중한다.' },
  { id: 'm7', areaKey: 'community', text: '나는 갈등이 생기면 대화로 해결하려고 한다.' },
  { id: 'm8', areaKey: 'community', text: '나는 우리 지역사회에 관심이 있다.' },
  { id: 'm9', areaKey: 'community', text: '나는 함께 협력하면 더 좋은 결과를 낼 수 있다고 생각한다.' },
  { id: 'm10', areaKey: 'community', text: '나는 공정하고 정의로운 것이 중요하다고 생각한다.' },

  // ========== 인성 역량 (nonCognitive) ==========
  { id: 'n1', areaKey: 'nonCognitive', text: '나는 어려운 일이 있어도 포기하지 않는다.' },
  { id: 'n2', areaKey: 'nonCognitive', text: '나는 스스로 계획을 세우고 실천할 수 있다.' },
  { id: 'n3', areaKey: 'nonCognitive', text: '나는 감정을 잘 조절할 수 있다.' },
  { id: 'n4', areaKey: 'nonCognitive', text: '나는 새로운 것에 도전하는 것을 좋아한다.' },
  { id: 'n5', areaKey: 'nonCognitive', text: '나는 실패해도 다시 시도할 수 있다.' },
  { id: 'n6', areaKey: 'nonCognitive', text: '나는 하기 싫은 일도 해야 할 때 할 수 있다.' },
  { id: 'n7', areaKey: 'nonCognitive', text: '나는 나 자신을 소중하게 생각한다.' },
  { id: 'n8', areaKey: 'nonCognitive', text: '나는 스트레스를 받을 때 나만의 해소법이 있다.' },
  { id: 'n9', areaKey: 'nonCognitive', text: '나는 목표를 위해 꾸준히 노력하는 편이다.' },
  { id: 'n10', areaKey: 'nonCognitive', text: '나는 나의 성장 가능성을 믿는다.' },
]

export function getQuestionsByArea(areaKey: string): SurveyQuestion[] {
  return SURVEY_QUESTIONS.filter(q => q.areaKey === areaKey)
}
