// 환경설정 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const ENVIRONMENT_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (환경설정 기초) 1~10
  // ═══════════════════════════════════════

  'environment-bronze-1': {
    id: 'environment-bronze-1', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 1,
    title: '환경이 행동을 만든다',
    cards: [
      { type: 'concept', title: '의지력보다 환경이 강하다', description: '같은 사람이라도\n환경이 달라지면 행동이 달라져.\n\n도서관에서는 자동으로 조용해지고\n침대에선 자동으로 졸리지?\n\n환경을 바꾸면 의지력 없이도\n원하는 행동을 할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🏠', label: '환경의 힘', description: '환경이 행동을 유도한다' },
        { icon: '🧠', label: '자동 반응', description: '뇌는 환경 신호에 반응' },
        { icon: '💪', label: '의지력 한계', description: '의지력은 유한한 자원' },
        { icon: '🔧', label: '설계', description: '환경을 미리 설계하기' },
      ]},
      { type: 'example', bad: { label: '의지력에만 의존', story: '"침대에서 공부해야지!"\n10분 뒤 눈이 감겼다.\n의지력으론 침대의 유혹을 못 이겼다.' }, good: { label: '환경 변경', story: '공부는 책상에서만, 침대는 수면만.\n장소를 바꿨을 뿐인데\n집중이 2배로 늘었다.' }},
      { type: 'ox', statement: '의지력만 강하면 어디서든 집중할 수 있다.', answer: false, feedback: '의지력은 한계가 있어!\n환경을 내 편으로 만드는 게 현명해.' },
      { type: 'multipleChoice', question: '환경이 행동에 미치는 영향으로 맞는 것은?', options: ['환경은 행동에 영향이 없다', '의지력만 있으면 환경은 무관하다', '환경이 행동을 자동으로 유도한다', '환경은 기분에만 영향을 준다'], correctIndex: 2, explanation: '뇌는 환경의 신호에 자동 반응해!\n좋은 환경 = 좋은 행동의 시작.' },
      { type: 'feedback', summary: '환경 > 의지력, 환경을 설계하자', message: '환경을 바꾸면 나도 바뀌어!' },
      { type: 'mission', mission: '"공부할 때 나를 방해하는 환경 요소" 3가지 적기', encouragement: '문제를 아는 것이 해결의 시작!' },
    ],
  },

  'environment-bronze-2': {
    id: 'environment-bronze-2', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 2,
    title: '책상 환경 만들기',
    cards: [
      { type: 'concept', title: '책상 위가 머릿속이다', description: '어지러운 책상 = 어지러운 머릿속.\n\n공부 시작 전 책상 정리만 해도\n집중력이 확 올라가.\n\n규칙: 책상 위에는\n"지금 할 것"만 올려놓기!\n나머지는 전부 치우자.' },
      { type: 'summary', keywords: [
        { icon: '🪑', label: '책상 정리', description: '시작 전 깨끗하게' },
        { icon: '📚', label: '필요한 것만', description: '지금 할 것만 올려놓기' },
        { icon: '🚫', label: '불필요 제거', description: '폰, 과자, 잡지 치우기' },
        { icon: '🧹', label: '매일 리셋', description: '끝나면 정리하고 마무리' },
      ]},
      { type: 'example', bad: { label: '어지러운 책상', story: '과자, 폰, 만화책, 이어폰, 지난 시험지...\n책상에 앉아도 뭘 해야 할지 모르겠다.\n손이 자꾸 과자와 폰으로 간다.' }, good: { label: '정리된 책상', story: '수학 교재 + 노트 + 필통만 올려놓았다.\n앉는 순간 "수학 풀어야지" 자동 인식.\n집중하기가 훨씬 쉬웠다.' }},
      { type: 'ox', statement: '천재는 어지러운 책상에서도 잘한다.', answer: false, feedback: '정리된 환경이 누구에게나 유리해!\n뇌의 에너지를 아껴주거든.' },
      { type: 'multipleChoice', question: '공부 전 책상 정리의 핵심 규칙은?', options: ['예쁘게 꾸미기', '지금 할 것만 올려놓기', '모든 교재 다 펼치기', '가구 배치 바꾸기'], correctIndex: 1, explanation: '"지금 필요한 것만!" 이것이 핵심.\n나머지는 시각적 방해물이야.' },
      { type: 'feedback', summary: '책상 정리 = 지금 할 것만, 나머지 치우기', message: '깨끗한 책상이 집중의 시작!' },
      { type: 'mission', mission: '지금 책상 위를 "할 것 1가지 + 도구"만 남기고 정리!', encouragement: '정리하는 데 3분이면 충분해!' },
    ],
  },

  'environment-bronze-3': {
    id: 'environment-bronze-3', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 3,
    title: '스마트폰 환경 설정',
    cards: [
      { type: 'concept', title: '폰을 내 편으로 만들기', description: '스마트폰은 방해의 90%를 차지해.\n\n하지만 없앨 수 없으니\n"설정"으로 관리하는 거야!\n\n알림 끄기, 앱 정리, 집중 모드 활용.\n설정 한 번이면 매일 효과가 지속돼.' },
      { type: 'summary', keywords: [
        { icon: '🔕', label: '알림 관리', description: '불필요한 알림 끄기' },
        { icon: '📱', label: '홈 화면', description: '학습 앱만 첫 화면에' },
        { icon: '⏰', label: '집중 모드', description: '공부 시간엔 자동 차단' },
        { icon: '📊', label: '스크린타임', description: '사용량 확인하기' },
      ]},
      { type: 'example', bad: { label: '알림 폭탄', story: '공부 중 카톡, 인스타, 유튜브 알림.\n5분마다 폰을 봤다.\n1시간 앉아있었는데 실제 공부 15분.' }, good: { label: '스마트폰 설정', story: '공부 시간엔 집중 모드 ON.\n알림 0개, 방해 0개.\n같은 1시간인데 3배 효율.' }},
      { type: 'ox', statement: '알림을 다 켜놔야 중요한 연락을 놓치지 않는다.', answer: false, feedback: '정말 급한 연락은 전화로 와!\n알림 대부분은 급하지 않아.' },
      { type: 'multipleChoice', question: '공부할 때 가장 효과적인 스마트폰 관리는?', options: ['무음만 하기', '집중 모드 + 다른 방에 두기', '뒤집어 놓기', '전원 끄기'], correctIndex: 1, explanation: '집중 모드로 알림 차단 +\n물리적 거리두기가 최고 조합!' },
      { type: 'feedback', summary: '스마트폰 설정 = 알림 관리 + 집중 모드', message: '설정 한 번이면 매일 효과!' },
      { type: 'mission', mission: '지금 폰에서 불필요한 앱 알림 5개 끄기', encouragement: '5분 투자로 매일 시간을 절약해!' },
    ],
  },

  'environment-bronze-4': {
    id: 'environment-bronze-4', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 4,
    title: '소리 환경 관리하기',
    cards: [
      { type: 'concept', title: '소리가 집중을 좌우한다', description: '시끄러운 환경에서는\n뇌가 소리를 처리하느라\n집중에 쓸 에너지가 줄어들어.\n\n완전한 무음이 정답은 아냐.\n"적당한 배경음"이 가장 효과적!\n자연 소리, 백색소음이 대표적이야.' },
      { type: 'summary', keywords: [
        { icon: '🔇', label: '소음 차단', description: '방해되는 소리 줄이기' },
        { icon: '🎧', label: '이어폰', description: '노이즈캔슬링 활용' },
        { icon: '🌊', label: '백색소음', description: '빗소리, 카페 소리 등' },
        { icon: '🎵', label: '음악 주의', description: '가사 있는 음악은 방해' },
      ]},
      { type: 'example', bad: { label: '가사 있는 음악', story: '좋아하는 노래 틀고 공부.\n따라 부르다 보니 30분이 지났다.\n공부한 게 하나도 기억 안 남.' }, good: { label: '소리 환경 설계', story: '백색소음(빗소리) 틀고 공부.\n주변 소리가 차단되니\n자연스럽게 몰입했다.' }},
      { type: 'ox', statement: '음악을 들으며 공부하면 항상 집중이 잘 된다.', answer: false, feedback: '가사가 있으면 오히려 방해!\n가사 없는 음악이나 백색소음이 효과적이야.' },
      { type: 'multipleChoice', question: '공부할 때 가장 좋은 소리 환경은?', options: ['좋아하는 노래', '완전한 무음', '적당한 백색소음이나 자연음', '친구들 대화 소리'], correctIndex: 2, explanation: '적당한 배경음이 집중력을 높여줘.\n완전 무음보다 약간의 소리가 오히려 좋아!' },
      { type: 'feedback', summary: '소리 환경 = 백색소음이 최적', message: '소리를 설계하면 집중이 달라져!' },
      { type: 'mission', mission: '백색소음 앱이나 영상 하나 찾아서\n공부할 때 10분 사용해보기', encouragement: '소리 하나로 집중이 달라질 거야!' },
    ],
  },

  'environment-bronze-5': {
    id: 'environment-bronze-5', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 5,
    title: '빛과 조명 세팅',
    cards: [
      { type: 'concept', title: '빛이 뇌에 미치는 영향', description: '어두운 곳에선 졸리고\n밝은 곳에선 각성돼.\n\n공부할 땐 밝고 차가운 빛(백색),\n쉴 땐 따뜻한 빛(노란색)이 좋아.\n\n특히 자연광이 최고!\n가능하면 창가에서 공부하자.' },
      { type: 'summary', keywords: [
        { icon: '☀️', label: '자연광', description: '가장 좋은 학습 조명' },
        { icon: '💡', label: '백색 조명', description: '집중에 효과적인 밝은 빛' },
        { icon: '🌙', label: '따뜻한 빛', description: '휴식·수면 전 적합' },
        { icon: '📐', label: '위치', description: '왼손잡이는 오른쪽, 오른손잡이는 왼쪽' },
      ]},
      { type: 'example', bad: { label: '어두운 환경', story: '방 불 끄고 스탠드 하나만 켰다.\n눈이 피로하고 졸음이 밀려왔다.\n30분 만에 포기.' }, good: { label: '밝은 환경', story: '커튼을 열어 자연광 + 밝은 스탠드.\n눈도 편하고 머리가 맑아서\n1시간이 훌쩍 지나갔다.' }},
      { type: 'ox', statement: '공부할 때 조명은 어두운 게 분위기 있어서 좋다.', answer: false, feedback: '어두우면 뇌가 수면 모드로 전환해!\n공부할 땐 밝은 조명이 필수야.' },
      { type: 'multipleChoice', question: '공부할 때 가장 좋은 조명은?', options: ['간접 조명만', '형광등만', '자연광 + 밝은 스탠드', '모니터 빛만'], correctIndex: 2, explanation: '자연광이 최고! 없으면 밝은 백색 스탠드.\n눈 건강과 집중 모두 챙길 수 있어.' },
      { type: 'feedback', summary: '조명 = 공부는 밝게, 쉴 땐 따뜻하게', message: '빛 하나 바꿔도 집중이 달라져!' },
      { type: 'mission', mission: '공부하는 곳의 조명 상태 점검하고\n밝기를 조정해보기', encouragement: '밝은 환경이 밝은 머리를 만들어!' },
    ],
  },

  'environment-bronze-6': {
    id: 'environment-bronze-6', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 6,
    title: '장소의 힘 - 공간 분리',
    cards: [
      { type: 'concept', title: '한 장소 = 한 용도', description: '뇌는 장소에 행동을 연결해.\n\n침대 = 잠 / 책상 = 공부 / 소파 = 휴식\n\n이렇게 분리하면 장소에 가기만 해도\n해당 행동 모드가 자동으로 켜져!\n\n침대에서 공부하면 둘 다 망해.' },
      { type: 'summary', keywords: [
        { icon: '🛏️', label: '침대', description: '잠과 휴식만' },
        { icon: '🪑', label: '책상', description: '공부와 작업만' },
        { icon: '🛋️', label: '소파', description: '휴식과 독서' },
        { icon: '🧠', label: '뇌 연결', description: '장소 = 행동 자동 연결' },
      ]},
      { type: 'example', bad: { label: '공간 혼용', story: '침대에서 공부, 밥, 폰, 수면 모두 해결.\n침대에 누우면 공부인지 잠인지\n뇌가 혼란. 다 중간만 했다.' }, good: { label: '공간 분리', story: '공부 = 책상, 잠 = 침대로 분리.\n책상에 앉으면 자동으로 공부 모드.\n침대에 누우면 금방 잠들었다.' }},
      { type: 'ox', statement: '한 곳에서 모든 것을 하면 효율적이다.', answer: false, feedback: '뇌가 혼란스러워져!\n장소마다 역할을 정하는 게 훨씬 효율적.' },
      { type: 'multipleChoice', question: '공간 분리가 효과적인 이유는?', options: ['깨끗해져서', '뇌가 장소와 행동을 연결하기 때문에', '남이 볼 때 좋아서', '운동량이 늘어서'], correctIndex: 1, explanation: '뇌가 "여기는 공부하는 곳"이라고\n자동 인식하면 집중이 쉬워져!' },
      { type: 'feedback', summary: '공간 분리 = 한 장소, 한 용도', message: '공간에 역할을 정해주면 뇌가 도와줘!' },
      { type: 'mission', mission: '내 공간에서 "공부 장소"와 "휴식 장소" 분리하기', encouragement: '분리하는 순간, 집중이 쉬워져!' },
    ],
  },

  'environment-bronze-7': {
    id: 'environment-bronze-7', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 7,
    title: '유혹 제거하기',
    cards: [
      { type: 'concept', title: '보이면 하게 된다', description: '과자가 보이면 먹게 되고\n폰이 보이면 만지게 돼.\n\n핵심: 유혹을 "안 보이게" 만들기!\n\n참는 게 아니라 애초에\n눈앞에서 치우는 거야.\n이게 가장 확실한 전략이야.' },
      { type: 'summary', keywords: [
        { icon: '👁️', label: '시각 신호', description: '보이면 뇌가 반응한다' },
        { icon: '🙈', label: '안 보이게', description: '유혹을 시야에서 제거' },
        { icon: '📵', label: '폰 격리', description: '다른 방이나 가방 안에' },
        { icon: '🍪', label: '간식 관리', description: '책상 주변에 두지 않기' },
      ]},
      { type: 'example', bad: { label: '유혹 방치', story: '책상 옆에 폰, 과자, 만화책.\n"안 볼 거야" 결심했지만\n5분마다 손이 갔다.' }, good: { label: '유혹 제거', story: '폰은 거실, 과자는 부엌, 만화책은 서랍.\n보이지 않으니 생각도 안 나서\n자연스럽게 공부에 집중.' }},
      { type: 'ox', statement: '유혹을 참는 훈련을 하면 의지력이 세진다.', answer: false, feedback: '참을수록 에너지가 소모돼!\n유혹을 제거하는 게 훨씬 현명해.' },
      { type: 'multipleChoice', question: '유혹 관리의 가장 효과적인 방법은?', options: ['강한 의지로 참기', '유혹을 눈에 안 보이게 치우기', '유혹과 친해지기', '벌칙 정하기'], correctIndex: 1, explanation: '안 보이면 뇌가 반응하지 않아!\n제거가 참기보다 100배 효과적.' },
      { type: 'feedback', summary: '유혹 관리 = 보이지 않게 치우기', message: '안 보이면 안 하게 된다. 이게 비결!' },
      { type: 'mission', mission: '공부 공간에서 유혹 3가지를 물리적으로 치우기', encouragement: '치우는 데 1분, 효과는 매일!' },
    ],
  },

  'environment-bronze-8': {
    id: 'environment-bronze-8', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 8,
    title: '준비물 미리 세팅하기',
    cards: [
      { type: 'concept', title: '마찰을 줄이면 시작이 쉽다', description: '공부를 미루는 이유 중 하나 =\n"준비하기 귀찮아서".\n\n전날 밤에 내일 할 것의\n준비물을 미리 세팅해두면\n다음 날 고민 없이 바로 시작!\n\n이걸 "마찰 줄이기"라고 해.' },
      { type: 'summary', keywords: [
        { icon: '🎒', label: '사전 준비', description: '전날 밤 미리 세팅' },
        { icon: '⚡', label: '즉시 시작', description: '앉자마자 바로 시작 가능' },
        { icon: '🧱', label: '마찰 제거', description: '시작의 장벽 낮추기' },
        { icon: '📐', label: '순서 고정', description: '같은 위치에 같은 도구' },
      ]},
      { type: 'example', bad: { label: '준비 안 된 상태', story: '"공부하자!" 앉았는데\n교재 어딨지? 노트 어딨지? 펜 안 나와.\n찾다가 10분, 귀찮아서 포기.' }, good: { label: '미리 세팅', story: '전날 밤 책상에 수학 교재 + 노트 펼쳐둠.\n다음 날 앉자마자 바로 시작.\n준비 시간 0분, 바로 집중!' }},
      { type: 'ox', statement: '준비물 세팅은 시간 낭비다.', answer: false, feedback: '3분 투자로 다음 날 30분을 아껴!\n가장 효율적인 시간 투자야.' },
      { type: 'multipleChoice', question: '마찰 줄이기의 핵심은?', options: ['더 열심히 노력하기', '시작의 장벽을 미리 없애기', '완벽하게 계획 세우기', '남에게 도움 요청'], correctIndex: 1, explanation: '시작하기 쉽게 만들면\n행동으로 옮기기가 훨씬 쉬워져!' },
      { type: 'feedback', summary: '미리 세팅 = 시작의 마찰 제거', message: '준비가 되면 시작이 쉬워져!' },
      { type: 'mission', mission: '오늘 밤 내일 공부할 것의 준비물 미리 책상에 세팅하기', encouragement: '3분 투자가 내일을 바꿔!' },
    ],
  },

  'environment-bronze-9': {
    id: 'environment-bronze-9', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 9,
    title: '사회적 환경 만들기',
    cards: [
      { type: 'concept', title: '함께하는 환경의 힘', description: '주변 사람도 환경이야!\n\n공부하는 친구 옆에 있으면\n자연스럽게 공부하게 되고,\n노는 친구 옆에선 놀게 돼.\n\n"누구와 함께 있는가"도\n환경 설계의 중요한 부분이야.' },
      { type: 'summary', keywords: [
        { icon: '👥', label: '사회적 환경', description: '주변 사람이 행동에 영향' },
        { icon: '📚', label: '스터디', description: '함께 공부하는 그룹' },
        { icon: '🗣️', label: '선언 효과', description: '"나 공부해!" 말하기' },
        { icon: '🤝', label: '동료 효과', description: '옆 사람을 따라하게 됨' },
      ]},
      { type: 'example', bad: { label: '방해되는 환경', story: '수다 좋아하는 친구 옆에서 공부.\n계속 말 걸려서 1시간 동안\n실제로 집중한 건 10분.' }, good: { label: '좋은 사회적 환경', story: '도서관에서 열심히 하는 친구 옆에 앉았다.\n옆에서 집중하는 모습 보니\n나도 자동으로 집중 모드가 됐다.' }},
      { type: 'ox', statement: '혼자 공부하는 게 항상 가장 효율적이다.', answer: false, feedback: '사람마다 달라! 열심히 하는 친구와\n함께하면 동기부여가 올라가기도 해.' },
      { type: 'multipleChoice', question: '사회적 환경 설계의 좋은 방법은?', options: ['혼자서만 공부하기', '집중하는 친구 옆에서 함께 공부', '친구들과 수다하며 공부', '아무나 옆에 앉기'], correctIndex: 1, explanation: '열심히 하는 사람 옆에 있으면\n자연스럽게 영향받아!' },
      { type: 'feedback', summary: '사회적 환경 = 누구와 함께하느냐도 환경', message: '좋은 사람 옆에 있으면 좋은 습관이 전염돼!' },
      { type: 'mission', mission: '함께 집중할 수 있는 친구 1명과\n스터디 시간 정해보기', encouragement: '함께하면 더 멀리 갈 수 있어!' },
    ],
  },

  'environment-bronze-10': {
    id: 'environment-bronze-10', chapterKey: 'environment', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 집중 환경 설계하기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해서\n나만의 집중 환경을 완성하자!\n\n1. 책상 정리 (필요한 것만)\n2. 폰 관리 (집중 모드 + 격리)\n3. 소리 설계 (백색소음)\n4. 조명 세팅 (밝게)\n5. 유혹 제거 (안 보이게)\n6. 준비물 미리 세팅' },
      { type: 'summary', keywords: [
        { icon: '🪑', label: '책상', description: '지금 할 것만 올려놓기' },
        { icon: '📵', label: '폰', description: '집중 모드 + 물리적 격리' },
        { icon: '🎧', label: '소리', description: '백색소음 또는 무음' },
        { icon: '💡', label: '조명', description: '밝은 조명 + 자연광' },
      ]},
      { type: 'example', bad: { label: '무계획 환경', story: '어두운 방, 어지러운 책상, 폰 알림.\n"집중 안 돼..." 매일 같은 불만.\n환경은 바꾸지 않고 의지력만 탓했다.' }, good: { label: '설계된 환경', story: '밝은 조명 + 정리된 책상 + 폰 거실\n+ 백색소음 + 준비물 세팅 완료.\n앉는 순간 자동으로 집중 모드 ON!' }},
      { type: 'ox', statement: '환경 설계는 한 번만 하면 끝이다.', answer: false, feedback: '매일 조금씩 관리해야 해!\n특히 책상 정리와 폰 세팅은 매일 리셋.' },
      { type: 'multipleChoice', question: '집중 환경 설계의 올바른 순서는?', options: ['의지력 키우기 → 환경은 나중에', '환경 정리 → 유혹 제거 → 준비물 세팅', '한 번에 완벽하게 → 유지만', '남이 해주길 기다리기'], correctIndex: 1, explanation: '정리 → 제거 → 세팅 순서가 효과적!\n매일 조금씩 리셋하는 것도 중요해.' },
      { type: 'apply', question: '나만의 집중 환경 설계도를 작성해보세요.\n(책상 / 폰 / 소리 / 조명 / 유혹 제거)', placeholder: '예: 책상-교재만 / 폰-거실 / 소리-빗소리 / 조명-스탠드+커튼 열기 / 유혹-과자 부엌으로' },
      { type: 'feedback', summary: '집중 환경 = 정리 + 격리 + 세팅의 조합', message: '브론즈 완료! 이제 환경이 너를 도와줄 거야!' },
      { type: 'mission', mission: '오늘 배운 것 중 3가지를 골라\n내 공부 공간에 바로 적용하기!', encouragement: '환경을 바꾸면 나도 바뀌어!' },
    ],
  },

}
