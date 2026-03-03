export interface SurveyArea {
  key: string
  label: string
  color: string
  bgColor: string
  icon: string
  coreTheories: string[]  // 영역별 핵심 이론
}

export interface SurveyQuestion {
  id: string
  text: string
  areaKey: string
  theoreticalBasis: string   // 이론적 근거
  reference: string          // 학술 참고문헌 (저자, 연도)
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
    coreTheories: [
      'Super의 진로발달이론(Life-Span, Life-Space Theory)',
      'Holland의 RIASEC 직업흥미이론',
      'Savickas의 진로구성주의 이론(Career Construction Theory)',
      'Career Decision Self-Efficacy Scale(CDSE)',
    ],
  },
  {
    key: 'community',
    label: '공동체',
    color: '#10b981',
    bgColor: '#ecfdf5',
    icon: '🤝',
    coreTheories: [
      'Bandura 사회인지이론(Social Cognitive Theory)',
      'Vygotsky 사회문화이론(Sociocultural Theory)',
      'Social Competence Scale',
      'Civic Attitudes and Skills Questionnaire(CASQ)',
    ],
  },
  {
    key: 'nonCognitive',
    label: '인성',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    icon: '💪',
    coreTheories: [
      'Duckworth의 Grit 이론',
      'Bandura 자기효능감 이론(Self-Efficacy Theory)',
      'Dweck 성장마인드셋 이론(Growth Mindset)',
      'Rosenberg Self-Esteem Scale',
    ],
  },
  {
    key: 'learning',
    label: '학습',
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    icon: '🧠',
    coreTheories: [
      'Zimmerman 자기조절학습 이론(Self-Regulated Learning)',
      'Self-Regulated Learning(SRL) Scale',
      'Flavell 메타인지 이론(Metacognition Theory)',
    ],
  },
  {
    key: 'habit',
    label: '습관',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    icon: '📚',
    coreTheories: [
      'Baumeister 자기통제 이론(Self-Control Theory)',
      'Self-Control Scale',
      'Wood & Neal 습관형성 이론(Habit Formation Theory)',
      '시간관리 연구(Time Management Research)',
    ],
  },
]

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  // ========== 진로 탐색 (career) ==========
  {
    id: 'c1', areaKey: 'career',
    text: '나는 내가 좋아하는 일이 무엇인지 알고 있다.',
    theoreticalBasis: 'Holland 직업흥미이론 — 개인의 흥미 유형(RIASEC) 인식이 진로 선택의 기초',
    reference: 'Holland, J. L. (1997). Making vocational choices (3rd ed.). Psychological Assessment Resources.',
  },
  {
    id: 'c2', areaKey: 'career',
    text: '나는 나의 강점과 약점을 파악하고 있다.',
    theoreticalBasis: 'Super 자아개념 발달 — 자아개념(self-concept)의 형성이 진로발달의 핵심 기제',
    reference: 'Super, D. E. (1990). A life-span, life-space approach to career development. In D. Brown & L. Brooks (Eds.), Career choice and development (pp. 197-261). Jossey-Bass.',
  },
  {
    id: 'c3', areaKey: 'career',
    text: '나는 관심 있는 직업이나 분야가 있다.',
    theoreticalBasis: '진로성숙도 이론 — 진로 탐색기의 결정화(crystallization) 단계에서 특정 직업 분야에 대한 선호 형성',
    reference: 'Super, D. E. (1990). Career maturity theory.',
  },
  {
    id: 'c4', areaKey: 'career',
    text: '나는 진로를 위해 필요한 정보를 찾아본 적이 있다.',
    theoreticalBasis: 'CDSE 정보수집 하위요인 — 진로결정에 필요한 정보를 수집하는 자기효능감',
    reference: 'Betz, N. E., & Taylor, K. M. (2012). Career Decision Self-Efficacy Scale (CDSE).',
  },
  {
    id: 'c5', areaKey: 'career',
    text: '나는 미래의 나의 모습을 상상해 본 적이 있다.',
    theoreticalBasis: 'Savickas 미래지향성 — 진로구성주의에서 미래 자기(future self)의 내러티브 구성',
    reference: 'Savickas, M. L. (2013). Career construction theory and practice. In S. D. Brown & R. W. Lent (Eds.), Career development and counseling (pp. 147-183). Wiley.',
  },
  {
    id: 'c6', areaKey: 'career',
    text: '나는 진로와 관련된 경험(체험, 봉사 등)을 해본 적이 있다.',
    theoreticalBasis: '구성주의 진로적응성 — 실제 경험을 통한 진로적응성(career adaptability) 형성',
    reference: 'Savickas, M. L., & Porfeli, E. J. (2012). Career Adapt-Abilities Scale. Journal of Vocational Behavior, 80(3), 661-673.',
  },
  {
    id: 'c7', areaKey: 'career',
    text: '나는 나의 진로 목표를 세우고 있다.',
    theoreticalBasis: '진로결정 자기효능감 — 목표 설정(goal setting)이 진로결정의 핵심 과정',
    reference: 'Betz, N. E., & Taylor, K. M. (2012). CDSE.',
  },
  {
    id: 'c8', areaKey: 'career',
    text: '나는 진로 목표를 이루기 위해 노력하고 있다.',
    theoreticalBasis: 'Bandura 자기효능 — 결과기대와 자기효능감이 목표 추구 행동을 매개',
    reference: 'Bandura, A. (1997). Self-efficacy: The exercise of control. W. H. Freeman.',
  },
  {
    id: 'c9', areaKey: 'career',
    text: '나는 다양한 직업의 세계에 관심이 있다.',
    theoreticalBasis: '진로탐색 행동이론 — 진로 탐색 범위(breadth)의 확장이 정보에 기반한 의사결정 촉진',
    reference: 'Stumpf, S. A., Colarelli, S. M., & Hartman, K. (1983). Development of the Career Exploration Survey (CES). Journal of Vocational Behavior, 22(2), 191-226.',
  },
  {
    id: 'c10', areaKey: 'career',
    text: '나는 나의 진로에 대해 자신감을 가지고 있다.',
    theoreticalBasis: 'CDSE 전체 요인 — 진로결정 자기효능감의 종합적 수준',
    reference: 'Betz, N. E., & Taylor, K. M. (2012). CDSE.',
  },

  // ========== 공동체 의식 (community) ==========
  {
    id: 'm1', areaKey: 'community',
    text: '나는 친구들과 잘 어울린다.',
    theoreticalBasis: '사회적 유능감 이론 — 또래 관계 형성 및 유지 능력이 사회적 적응의 핵심 지표',
    reference: 'Rose-Krasnor, L. (1997). The nature of social competence. Social Development, 6(1), 111-135.',
  },
  {
    id: 'm2', areaKey: 'community',
    text: '나는 다른 사람의 입장에서 생각해 보려고 노력한다.',
    theoreticalBasis: 'Hoffman 공감이론 — 인지적 공감(cognitive empathy)과 조망수용(perspective-taking) 능력',
    reference: 'Hoffman, M. L. (2000). Empathy and moral development. Cambridge University Press.',
  },
  {
    id: 'm3', areaKey: 'community',
    text: '나는 우리 반(학교)의 일에 적극적으로 참여한다.',
    theoreticalBasis: '시민성 발달 이론 — 학교 공동체 참여가 시민적 역량(civic competence) 발달의 기초',
    reference: 'Flanagan, C. A. (2013). Teenage citizens: The political theories of the young. Harvard University Press.',
  },
  {
    id: 'm4', areaKey: 'community',
    text: '나는 도움이 필요한 친구를 도와준다.',
    theoreticalBasis: '친사회적 행동 이론 — 이타적 행동(altruistic behavior)과 돕기 행동(helping behavior)의 발달',
    reference: 'Eisenberg, N., Fabes, R. A., & Spinrad, T. L. (2006). Prosocial development. In W. Damon & R. M. Lerner (Eds.), Handbook of child psychology. Wiley.',
  },
  {
    id: 'm5', areaKey: 'community',
    text: '나는 규칙과 약속을 잘 지킨다.',
    theoreticalBasis: 'Kohlberg 도덕발달이론 — 인습적 도덕 추론 단계에서 사회적 규범 준수',
    reference: 'Kohlberg, L. (1984). Essays on moral development: Vol. 2. The psychology of moral development. Harper & Row.',
  },
  {
    id: 'm6', areaKey: 'community',
    text: '나는 다른 사람의 의견을 존중한다.',
    theoreticalBasis: '사회적 상호작용 이론 — 상호 존중에 기반한 대칭적 상호작용이 관계의 질 결정',
    reference: 'Vygotsky, L. S. (1978). Mind in society. Harvard University Press.',
  },
  {
    id: 'm7', areaKey: 'community',
    text: '나는 갈등이 생기면 대화로 해결하려고 한다.',
    theoreticalBasis: '사회정서학습(SEL) — CASEL의 관계 기술(relationship skills) 핵심역량',
    reference: 'CASEL. (2020). CASEL SEL framework.',
  },
  {
    id: 'm8', areaKey: 'community',
    text: '나는 우리 지역사회에 관심이 있다.',
    theoreticalBasis: '시민성·공동체 의식 — 공동체에 대한 소속감과 시민적 관심의 발달',
    reference: 'McMillan, D. W., & Chavis, D. M. (1986). Sense of community. Journal of Community Psychology, 14(1), 6-23.',
  },
  {
    id: 'm9', areaKey: 'community',
    text: '나는 함께 협력하면 더 좋은 결과를 낼 수 있다고 생각한다.',
    theoreticalBasis: '협동학습 이론 — 협력적 상호작용이 개인적·집단적 성취를 촉진',
    reference: 'Johnson, D. W., & Johnson, R. T. (2009). An educational psychology success story. Educational Researcher, 38(5), 365-379.',
  },
  {
    id: 'm10', areaKey: 'community',
    text: '나는 공정하고 정의로운 것이 중요하다고 생각한다.',
    theoreticalBasis: 'Rawls 정의윤리 — 공정으로서의 정의(justice as fairness) 원리에 대한 도덕적 판단',
    reference: 'Rawls, J. (1971). A theory of justice. Harvard University Press.',
  },

  // ========== 인성 역량 (nonCognitive) ==========
  {
    id: 'n1', areaKey: 'nonCognitive',
    text: '나는 어려운 일이 있어도 포기하지 않는다.',
    theoreticalBasis: 'Duckworth Grit — 장기 목표에 대한 열정과 인내(perseverance of effort)',
    reference: 'Duckworth, A. L., Peterson, C., Matthews, M. D., & Kelly, D. R. (2007). Grit: Perseverance and passion for long-term goals. Journal of Personality and Social Psychology, 92(6), 1087-1101.',
  },
  {
    id: 'n2', areaKey: 'nonCognitive',
    text: '나는 스스로 계획을 세우고 실천할 수 있다.',
    theoreticalBasis: '자기조절이론 — 사전숙고(forethought) 단계의 계획 수립과 수행 통제',
    reference: 'Zimmerman, B. J. (2000). Attaining self-regulation. In M. Boekaerts et al. (Eds.), Handbook of self-regulation. Academic Press.',
  },
  {
    id: 'n3', areaKey: 'nonCognitive',
    text: '나는 감정을 잘 조절할 수 있다.',
    theoreticalBasis: 'Gross 정서조절이론 — 인지적 재평가(cognitive reappraisal) 등 정서조절 전략의 활용',
    reference: 'Gross, J. J. (1998). The emerging field of emotion regulation. Review of General Psychology, 2(3), 271-299.',
  },
  {
    id: 'n4', areaKey: 'nonCognitive',
    text: '나는 새로운 것에 도전하는 것을 좋아한다.',
    theoreticalBasis: 'Dweck 성장마인드셋 — 도전을 학습 기회로 인식하는 증가적 능력관(incremental theory)',
    reference: 'Dweck, C. S. (2006). Mindset: The new psychology of success. Random House.',
  },
  {
    id: 'n5', areaKey: 'nonCognitive',
    text: '나는 실패해도 다시 시도할 수 있다.',
    theoreticalBasis: '회복탄력성(Resilience) — 역경 후 적응적 기능을 회복하는 심리적 역량',
    reference: 'Masten, A. S. (2001). Ordinary magic: Resilience processes in development. American Psychologist, 56(3), 227-238.',
  },
  {
    id: 'n6', areaKey: 'nonCognitive',
    text: '나는 하기 싫은 일도 해야 할 때 할 수 있다.',
    theoreticalBasis: '자기통제 이론 — 즉각적 충동을 억제하고 장기 목표를 위해 행동하는 역량',
    reference: 'Baumeister, R. F., Vohs, K. D., & Tice, D. M. (2007). The strength model of self-control. Current Directions in Psychological Science, 16(6), 351-355.',
  },
  {
    id: 'n7', areaKey: 'nonCognitive',
    text: '나는 나 자신을 소중하게 생각한다.',
    theoreticalBasis: 'Rosenberg 자존감 — 자신에 대한 전반적 가치 평가(global self-worth)',
    reference: 'Rosenberg, M. (1965). Society and the adolescent self-image. Princeton University Press.',
  },
  {
    id: 'n8', areaKey: 'nonCognitive',
    text: '나는 스트레스를 받을 때 나만의 해소법이 있다.',
    theoreticalBasis: 'Lazarus & Folkman Coping 이론 — 스트레스 대처(coping) 전략의 보유 및 활용',
    reference: 'Lazarus, R. S., & Folkman, S. (1984). Stress, appraisal, and coping. Springer.',
  },
  {
    id: 'n9', areaKey: 'nonCognitive',
    text: '나는 목표를 위해 꾸준히 노력하는 편이다.',
    theoreticalBasis: 'Grit Perseverance — Grit의 노력 지속성(perseverance of effort) 하위요인',
    reference: 'Duckworth, A. L., & Quinn, P. D. (2009). Development and validation of the Short Grit Scale (Grit-S). Journal of Personality Assessment, 91(2), 166-174.',
  },
  {
    id: 'n10', areaKey: 'nonCognitive',
    text: '나는 나의 성장 가능성을 믿는다.',
    theoreticalBasis: 'Dweck Growth Mindset — 능력의 가변성에 대한 암묵적 이론(implicit theory of intelligence)',
    reference: 'Dweck, C. S. (2006). Mindset: The new psychology of success. Random House.',
  },

  // ========== 학습 역량 (learning) ==========
  {
    id: 'l1', areaKey: 'learning',
    text: '나는 새로운 내용을 배우는 것이 즐겁다.',
    theoreticalBasis: 'Deci & Ryan 내재적 동기 — 자기결정성이론(SDT)의 내재적 동기(intrinsic motivation)',
    reference: 'Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits. Psychological Inquiry, 11(4), 227-268.',
  },
  {
    id: 'l2', areaKey: 'learning',
    text: '나는 모르는 것이 있으면 스스로 찾아서 공부한다.',
    theoreticalBasis: '자기주도학습 — Knowles의 자기주도학습(self-directed learning) 개념',
    reference: 'Knowles, M. S. (1975). Self-directed learning: A guide for learners and teachers. Association Press.',
  },
  {
    id: 'l3', areaKey: 'learning',
    text: '나는 수업 시간에 집중을 잘 하는 편이다.',
    theoreticalBasis: '주의집중 이론 — 학습 과정에서의 지속적 주의(sustained attention) 역량',
    reference: 'Posner, M. I., & Rothbart, M. K. (2007). Research on attention networks as a model for the integration of psychological science. Annual Review of Psychology, 58, 1-23.',
  },
  {
    id: 'l4', areaKey: 'learning',
    text: '나는 나만의 공부 방법을 알고 있다.',
    theoreticalBasis: 'Flavell 메타인지 — 자신의 인지 과정에 대한 인지적 모니터링과 전략 인식',
    reference: 'Flavell, J. H. (1979). Metacognition and cognitive monitoring. American Psychologist, 34(10), 906-911.',
  },
  {
    id: 'l5', areaKey: 'learning',
    text: '나는 배운 내용을 다른 사람에게 설명할 수 있다.',
    theoreticalBasis: '인지적 정교화 — 설명 활동을 통한 심층적 정보 처리(elaborative processing)',
    reference: 'Fiorella, L., & Mayer, R. E. (2014). Role of training in learning by teaching. Journal of Educational Psychology, 106(4), 1083-1095.',
  },
  {
    id: 'l6', areaKey: 'learning',
    text: '나는 어려운 문제도 끝까지 풀어보려고 노력한다.',
    theoreticalBasis: '학습 지속성 — 학업적 도전 상황에서의 과제 지속(task persistence)',
    reference: 'Zimmerman, B. J., & Schunk, D. H. (2011). Handbook of self-regulation of learning and performance. Routledge.',
  },
  {
    id: 'l7', areaKey: 'learning',
    text: '나는 공부 계획을 세우고 실천하는 편이다.',
    theoreticalBasis: 'SRL 계획 단계 — Zimmerman 자기조절학습의 사전숙고(forethought) 단계',
    reference: 'Zimmerman, B. J. (2000). Attaining self-regulation. Academic Press.',
  },
  {
    id: 'l8', areaKey: 'learning',
    text: '나는 실수에서 배우고 같은 실수를 반복하지 않으려 한다.',
    theoreticalBasis: '반성적 사고 — SRL의 자기성찰(self-reflection) 단계에서 오류 분석 및 전략 수정',
    reference: 'Zimmerman, B. J. (2000). Attaining self-regulation. Academic Press.',
  },
  {
    id: 'l9', areaKey: 'learning',
    text: '나는 다양한 분야에 호기심이 있다.',
    theoreticalBasis: '탐구동기 — 인식적 호기심(epistemic curiosity)이 학습 동기의 원천',
    reference: 'Litman, J. A. (2008). Interest and deprivation factors of epistemic curiosity. Personality and Individual Differences, 44(7), 1585-1595.',
  },
  {
    id: 'l10', areaKey: 'learning',
    text: '나는 학습한 내용을 실생활에 적용해 보려고 한다.',
    theoreticalBasis: '전이학습 이론 — 학습된 지식·기술의 새로운 맥락으로의 전이(transfer of learning)',
    reference: 'Perkins, D. N., & Salomon, G. (1992). Transfer of learning. International Encyclopedia of Education (2nd ed.). Pergamon Press.',
  },

  // ========== 습관 역량 (habit) ==========
  {
    id: 'h1', areaKey: 'habit',
    text: '나는 매일 일정한 시간에 일어나고 잠자리에 든다.',
    theoreticalBasis: '자기관리 행동 — 수면 위생(sleep hygiene)을 포함한 일상 자기관리 역량',
    reference: 'Bandura, A. (2005). The primacy of self-regulation in health promotion. Applied Psychology, 54(2), 245-254.',
  },
  {
    id: 'h2', areaKey: 'habit',
    text: '나는 하루 일과를 규칙적으로 보내는 편이다.',
    theoreticalBasis: '시간관리 — 시간 구조화(time structuring)와 일과 관리가 생산성 및 웰빙에 기여',
    reference: 'Macan, T. H. (1994). Time management: Test of a process model. Journal of Applied Psychology, 79(3), 381-391.',
  },
  {
    id: 'h3', areaKey: 'habit',
    text: '나는 해야 할 일을 미루지 않으려고 노력한다.',
    theoreticalBasis: 'Baumeister 자기통제 — 지연행동(procrastination)의 자기조절 실패 모형',
    reference: 'Steel, P. (2007). The nature of procrastination. Psychological Bulletin, 133(1), 65-94.',
  },
  {
    id: 'h4', areaKey: 'habit',
    text: '나는 건강을 위해 꾸준히 운동이나 활동을 한다.',
    theoreticalBasis: '건강행동 이론 — 건강신념모형(HBM)과 계획된 행동이론(TPB)의 건강 행동 실천',
    reference: 'Ajzen, I. (1991). The theory of planned behavior. Organizational Behavior and Human Decision Processes, 50(2), 179-211.',
  },
  {
    id: 'h5', areaKey: 'habit',
    text: '나는 정리정돈을 잘 하는 편이다.',
    theoreticalBasis: '실행기능 — 환경 조직화(organization)를 포함한 실행기능(executive function) 역량',
    reference: 'Diamond, A. (2013). Executive functions. Annual Review of Psychology, 64, 135-168.',
  },
  {
    id: 'h6', areaKey: 'habit',
    text: '나는 작은 일이라도 매일 꾸준히 하는 것이 있다.',
    theoreticalBasis: 'Wood & Neal 습관형성 이론 — 반복적 행동의 자동화(automatization) 과정',
    reference: 'Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed. European Journal of Social Psychology, 40(6), 998-1009.',
  },
  {
    id: 'h7', areaKey: 'habit',
    text: '나는 나쁜 습관을 고치려고 노력한 적이 있다.',
    theoreticalBasis: '행동수정 이론 — 기존 습관 루프(cue-routine-reward)의 의식적 수정 시도',
    reference: 'Wood, W., & Neal, D. T. (2007). A new look at habits and the habit-goal interface. Psychological Review, 114(4), 843-863.',
  },
  {
    id: 'h8', areaKey: 'habit',
    text: '나는 약속이나 일정을 잘 지키는 편이다.',
    theoreticalBasis: '책임감·성실성 — Big Five 성격 이론의 성실성(conscientiousness) 요인',
    reference: 'Roberts, B. W., Jackson, J. J., Fayard, J. V., Edmonds, G., & Meints, J. (2009). Conscientiousness. In M. R. Leary & R. H. Hoyle (Eds.), Handbook of individual differences in social behavior. Guilford Press.',
  },
  {
    id: 'h9', areaKey: 'habit',
    text: '나는 스마트폰 사용 시간을 스스로 조절할 수 있다.',
    theoreticalBasis: 'Baumeister 자기통제 — 디지털 미디어 사용에 대한 자기조절(self-regulation of media use)',
    reference: 'Baumeister, R. F., & Tierney, J. (2011). Willpower: Rediscovering the greatest human strength. Penguin.',
  },
  {
    id: 'h10', areaKey: 'habit',
    text: '나는 좋은 습관을 만들면 오래 유지하는 편이다.',
    theoreticalBasis: '습관 자동화 이론 — 행동의 자동화(automaticity) 달성 후 장기 유지 역량',
    reference: 'Lally, P., et al. (2010). How are habits formed. European Journal of Social Psychology, 40(6), 998-1009.',
  },
]

export function getQuestionsByArea(areaKey: string): SurveyQuestion[] {
  return SURVEY_QUESTIONS.filter(q => q.areaKey === areaKey)
}
