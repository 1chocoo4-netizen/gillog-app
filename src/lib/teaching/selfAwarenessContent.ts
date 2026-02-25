// 자기인식 챕터 학습 콘텐츠 (브론즈~골드)
import type { Stage } from './lessonData'

export const SELF_AWARENESS_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (자기인식 기초) 1~10
  // ═══════════════════════════════════════

  'selfAwareness-bronze-1': {
    id: 'selfAwareness-bronze-1', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 1,
    title: '자기인식이란 무엇인가',
    cards: [
      { type: 'concept', title: '나를 아는 것이 시작이다', description: '자기인식이란\n나의 감정, 생각, 행동을\n스스로 알아차리는 능력이야.\n\n"지금 내가 왜 화가 났지?"\n이 질문을 할 수 있다면\n이미 자기인식이 시작된 거야!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기인식', description: '나 자신을 객관적으로 보기' },
        { icon: '💭', label: '생각 알기', description: '내가 뭘 생각하는지 인식' },
        { icon: '❤️', label: '감정 알기', description: '내가 뭘 느끼는지 인식' },
        { icon: '🔑', label: '성장 열쇠', description: '알아야 바꿀 수 있다' },
      ]},
      { type: 'example', bad: { label: '무의식적 반응', story: '화가 나서 친구에게 소리쳤다.\n왜 화가 났는지도 모르고\n관계만 나빠졌다.' }, good: { label: '자기인식', story: '"지금 내가 화난 건 무시당한 느낌 때문이구나."\n감정을 알아차리고 차분하게 말했다.' }},
      { type: 'ox', statement: '자기인식은 어른이 되면 자동으로 생긴다.', answer: false, feedback: '자동으로 생기지 않아!\n의식적으로 연습해야 키울 수 있어.' },
      { type: 'multipleChoice', question: '자기인식의 핵심은?', options: ['남들이 나를 어떻게 보는지 아는 것', '내 감정·생각·행동을 스스로 알아차리는 것', '항상 자신감을 갖는 것', '남보다 잘하는 것을 아는 것'], correctIndex: 1, explanation: '핵심은 "스스로 알아차리기"야!\n나를 객관적으로 볼 수 있는 능력.' },
      { type: 'feedback', summary: '자기인식 = 나의 감정·생각·행동을 알아차리기', message: '나를 아는 것이 모든 성장의 시작!' },
      { type: 'mission', mission: '"지금 내 기분은 OO이다" 하루 3번 적어보기', encouragement: '알아차리는 순간, 변화가 시작돼!' },
    ],
  },

  'selfAwareness-bronze-2': {
    id: 'selfAwareness-bronze-2', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 2,
    title: '감정에 이름 붙이기',
    cards: [
      { type: 'concept', title: '감정 어휘력이 핵심이다', description: '"기분이 별로야"만으로는 부족해.\n\n실망? 서운함? 짜증? 불안?\n감정에 정확한 이름을 붙이면\n뇌가 감정을 조절하기 시작해.\n\n이걸 "감정 라벨링"이라고 해!' },
      { type: 'summary', keywords: [
        { icon: '🏷️', label: '감정 라벨링', description: '감정에 정확한 이름 붙이기' },
        { icon: '📖', label: '감정 어휘', description: '다양한 감정 단어 알기' },
        { icon: '🧠', label: '뇌 진정', description: '이름 붙이면 감정이 줄어듦' },
        { icon: '🎯', label: '정확성', description: '구체적일수록 효과적' },
      ]},
      { type: 'example', bad: { label: '모호한 감정', story: '"짜증나." 그게 전부.\n왜 짜증나는지, 뭘 느끼는지 모름.\n계속 불쾌한 상태가 이어졌다.' }, good: { label: '감정 라벨링', story: '"이건 짜증이 아니라 서운함이네.\n친구가 약속을 깜빡한 게 서운한 거야."\n감정이 정리되니 마음이 편해졌다.' }},
      { type: 'ox', statement: '감정은 "좋다/나쁘다" 두 가지면 충분하다.', answer: false, feedback: '감정은 수십 가지야!\n구체적으로 알수록 다루기 쉬워져.' },
      { type: 'multipleChoice', question: '감정 라벨링의 효과는?', options: ['감정을 없앤다', '감정의 강도를 줄여준다', '남에게 보여주기 좋다', '감정을 참게 해준다'], correctIndex: 1, explanation: '이름을 붙이면 뇌의 감정 영역 활동이\n줄어들어 자연스럽게 진정돼!' },
      { type: 'feedback', summary: '감정 라벨링 = 정확한 이름이 감정을 다스린다', message: '"지금 내 감정은 OO이다" 연습해보자!' },
      { type: 'mission', mission: '감정 단어 10개 적어보기\n(기쁨, 설렘, 불안, 서운함, 뿌듯함...)', encouragement: '감정 어휘가 많을수록 나를 잘 알 수 있어!' },
    ],
  },

  'selfAwareness-bronze-3': {
    id: 'selfAwareness-bronze-3', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 3,
    title: '생각과 감정 구분하기',
    cards: [
      { type: 'concept', title: '생각 ≠ 감정', description: '많은 사람이 생각과 감정을 헷갈려.\n\n생각: "쟤가 날 싫어하나 봐" (해석)\n감정: "불안하다, 서운하다" (느낌)\n\n생각은 사실이 아닐 수 있어!\n감정과 생각을 구분하면\n불필요한 걱정이 줄어들어.' },
      { type: 'summary', keywords: [
        { icon: '💭', label: '생각', description: '머릿속 해석, 판단, 예측' },
        { icon: '❤️', label: '감정', description: '몸과 마음에서 느끼는 것' },
        { icon: '⚠️', label: '착각 주의', description: '생각을 사실로 믿기 쉬움' },
        { icon: '🔍', label: '구분 연습', description: '분리하면 객관적이 됨' },
      ]},
      { type: 'example', bad: { label: '생각 = 사실 착각', story: '"선생님이 나만 미워해." (생각)\n우울하고 학교 가기 싫어졌다.\n실제론 선생님은 모두에게 엄격했다.' }, good: { label: '생각과 감정 분리', story: '"속상한 감정이 드네." (감정 인식)\n"선생님이 미워한다는 건 내 생각이지\n사실인지는 모르겠다." (생각 점검)' }},
      { type: 'ox', statement: '내가 느끼는 것이 곧 사실이다.', answer: false, feedback: '감정은 진짜지만, 그 원인에 대한\n생각은 사실이 아닐 수 있어!' },
      { type: 'multipleChoice', question: '다음 중 "감정"에 해당하는 것은?', options: ['"쟤가 날 무시했어"', '"불안하다"', '"다음에도 틀릴 거야"', '"내가 부족해서 그래"'], correctIndex: 1, explanation: '나머지는 모두 "생각(해석)"이야.\n"불안하다"만 감정이야!' },
      { type: 'feedback', summary: '생각 ≠ 감정, 구분하면 객관적이 된다', message: '생각을 사실로 믿기 전에 한 번 점검!' },
      { type: 'mission', mission: '오늘 불편한 상황에서 "생각"과 "감정" 따로 적기', encouragement: '분리하는 순간, 마음이 가벼워져!' },
    ],
  },

  'selfAwareness-bronze-4': {
    id: 'selfAwareness-bronze-4', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 4,
    title: '나의 강점 발견하기',
    cards: [
      { type: 'concept', title: '못하는 것보다 잘하는 것에 집중', description: '대부분 "나는 뭐가 부족해"만 생각해.\n\n하지만 누구에게나 강점이 있어!\n잘하는 것, 좋아하는 것,\n남들보다 쉽게 하는 것 = 강점.\n\n강점을 알면 자신감이 올라가!' },
      { type: 'summary', keywords: [
        { icon: '💪', label: '강점', description: '잘하고, 좋아하고, 쉬운 것' },
        { icon: '⚡', label: '에너지', description: '할 때 에너지가 올라가는 것' },
        { icon: '🏆', label: '성취', description: '남보다 쉽게 해내는 것' },
        { icon: '🔍', label: '발견', description: '의식적으로 찾아야 보인다' },
      ]},
      { type: 'example', bad: { label: '약점만 보기', story: '"수학 못해, 운동 못해, 발표 못해..."\n자신감이 바닥. 뭘 해도 안 될 것 같다.' }, good: { label: '강점 발견', story: '"그림 그리면 시간 가는 줄 몰라.\n이야기를 잘 만들어낸대."\n강점을 알고 나니 자신감이 생겼다.' }},
      { type: 'ox', statement: '강점은 대단한 재능이 있어야 한다.', answer: false, feedback: '꼭 대단할 필요 없어!\n남들보다 조금 더 쉽게, 더 즐겁게\n하는 것이면 그게 강점이야.' },
      { type: 'multipleChoice', question: '강점을 찾는 가장 좋은 질문은?', options: ['"남들이 뭘 잘한다고 하지?"', '"할 때 에너지가 올라가는 건?"', '"가장 높은 점수를 받은 과목은?"', '"유명한 사람들은 뭘 잘하지?"'], correctIndex: 1, explanation: '에너지가 올라가는 활동 = 진짜 강점!\n점수보다 에너지와 몰입이 핵심이야.' },
      { type: 'feedback', summary: '강점 = 에너지 올라가고 쉽게 하는 것', message: '약점 보완보다 강점 발휘가 10배 효과적!' },
      { type: 'mission', mission: '"할 때 즐겁고 에너지가 올라가는 것" 3가지 적기', encouragement: '강점을 아는 것이 자신감의 시작!' },
    ],
  },

  'selfAwareness-bronze-5': {
    id: 'selfAwareness-bronze-5', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 5,
    title: '나의 가치관 알기',
    cards: [
      { type: 'concept', title: '내가 정말 중요하게 생각하는 것', description: '가치관이란 "나에게 정말 중요한 것".\n\n어떤 사람은 "정직"이 최우선,\n어떤 사람은 "자유"가 최우선.\n\n내 가치관을 알면\n선택과 결정이 명확해지고\n후회가 줄어들어!' },
      { type: 'summary', keywords: [
        { icon: '⭐', label: '가치관', description: '나에게 중요한 것의 순서' },
        { icon: '🧭', label: '나침반', description: '선택의 기준이 됨' },
        { icon: '💎', label: '다양성', description: '사람마다 다르고 다 괜찮음' },
        { icon: '🎯', label: '명확성', description: '알면 선택이 쉬워짐' },
      ]},
      { type: 'example', bad: { label: '가치관 모름', story: '친구들 따라 학원 다니고\n남들 하는 대로만 했다.\n"내가 진짜 원하는 게 뭐지?" 공허함.' }, good: { label: '가치관 인식', story: '"나는 창의성과 자유가 중요해."\n그래서 미술부를 선택하고\n자기만의 시간도 확보했다.' }},
      { type: 'ox', statement: '가치관은 모든 사람이 같아야 한다.', answer: false, feedback: '사람마다 다 달라! 그리고 다 괜찮아.\n중요한 건 "나의" 가치관을 아는 것.' },
      { type: 'multipleChoice', question: '가치관을 아는 것이 중요한 이유는?', options: ['남에게 자랑하려고', '선택과 결정이 명확해져서', '모두 같은 가치관을 가지려고', '점수를 올리려고'], correctIndex: 1, explanation: '가치관을 알면 "이게 나한테 맞아"라는\n확신이 생기고 후회가 줄어!' },
      { type: 'feedback', summary: '가치관 = 내 선택의 나침반', message: '나에게 중요한 것을 아는 것이 힘이야!' },
      { type: 'mission', mission: '중요한 가치 5가지 적고 순위 매겨보기\n(예: 정직, 자유, 우정, 성장, 재미...)', encouragement: '내 나침반을 만드는 시간이야!' },
    ],
  },

  'selfAwareness-bronze-6': {
    id: 'selfAwareness-bronze-6', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 6,
    title: '감정 일기 쓰기',
    cards: [
      { type: 'concept', title: '쓰면 보인다', description: '감정을 글로 쓰면 3가지가 달라져.\n\n1. 감정이 정리된다\n2. 패턴이 보인다\n3. 스트레스가 줄어든다\n\n하루 5분, 오늘 느낀 감정과\n그 이유를 적는 것만으로 충분해!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '감정 일기', description: '감정과 이유를 짧게 기록' },
        { icon: '🧹', label: '정리 효과', description: '쓰면 머릿속이 깔끔해짐' },
        { icon: '🔍', label: '패턴 발견', description: '반복되는 감정을 찾게 됨' },
        { icon: '💆', label: '스트레스↓', description: '쓰기만 해도 감정 해소' },
      ]},
      { type: 'example', bad: { label: '감정 억누르기', story: '속상한 일이 있어도 꾹 참았다.\n쌓이다 결국 한 번에 폭발.\n주변 사람들도 놀랐다.' }, good: { label: '감정 일기', story: '"오늘 발표에서 실수해서 창피했다.\n실수가 두려운 게 아니라\n남의 시선이 무서운 거였구나."\n쓰고 나니 한결 편해졌다.' }},
      { type: 'ox', statement: '감정 일기는 길게 써야 효과가 있다.', answer: false, feedback: '3~5줄이면 충분해!\n"감정 + 이유" 이것만 적어도 OK.' },
      { type: 'multipleChoice', question: '감정 일기의 가장 큰 효과는?', options: ['글쓰기 실력 향상', '감정 패턴 인식과 스트레스 해소', '남에게 보여주기', '기억력 향상'], correctIndex: 1, explanation: '쓰면 감정이 정리되고\n나도 몰랐던 패턴이 보여!' },
      { type: 'feedback', summary: '감정 일기 = 5분 쓰기로 감정 정리', message: '쓰는 것만으로 마음이 가벼워져!' },
      { type: 'mission', mission: '오늘 밤 감정 일기 쓰기\n(오늘의 감정 + 왜 그랬는지)', encouragement: '5분이면 충분해. 시작해보자!' },
    ],
  },

  'selfAwareness-bronze-7': {
    id: 'selfAwareness-bronze-7', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 7,
    title: '몸의 신호 읽기',
    cards: [
      { type: 'concept', title: '몸이 먼저 말해준다', description: '감정은 몸에서 먼저 나타나.\n\n긴장 → 어깨가 올라감\n불안 → 배가 아픔\n화남 → 얼굴이 뜨거워짐\n\n몸의 신호를 알아차리면\n감정이 폭발하기 전에\n대처할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🫀', label: '몸 신호', description: '감정이 몸에 나타나는 것' },
        { icon: '🔔', label: '조기 경보', description: '감정보다 몸이 먼저 반응' },
        { icon: '🧘', label: '바디 스캔', description: '몸 상태를 의식적으로 확인' },
        { icon: '⏱️', label: '빠른 대응', description: '몸 신호로 미리 대처' },
      ]},
      { type: 'example', bad: { label: '신호 무시', story: '계속 어깨가 뭉치고 두통이 왔지만\n무시하고 공부만 했다.\n결국 시험 전날 몸살이 났다.' }, good: { label: '몸 신호 인식', story: '"어깨가 올라가 있네. 긴장하고 있구나."\n심호흡 3번 하고 어깨를 내렸다.\n금방 편해졌다.' }},
      { type: 'ox', statement: '감정은 머리에서만 느끼는 것이다.', answer: false, feedback: '감정은 몸 전체에서 나타나!\n심장 두근, 배 아픔, 손 떨림 모두 감정 신호야.' },
      { type: 'multipleChoice', question: '몸의 신호를 읽는 것이 중요한 이유는?', options: ['건강 검진을 대신하려고', '감정이 커지기 전에 알아차릴 수 있어서', '운동 능력을 키우려고', '남에게 설명하려고'], correctIndex: 1, explanation: '몸이 먼저 경고해줘!\n알아차리면 감정 폭발을 막을 수 있어.' },
      { type: 'feedback', summary: '몸 신호 = 감정의 조기 경보 시스템', message: '몸이 보내는 메시지에 귀 기울이자!' },
      { type: 'mission', mission: '지금 몸 상태 체크하기\n(어깨, 턱, 배, 손에 힘이 들어가 있나?)', encouragement: '알아차리는 것만으로 긴장이 풀려!' },
    ],
  },

  'selfAwareness-bronze-8': {
    id: 'selfAwareness-bronze-8', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 8,
    title: '자동 사고 알아차리기',
    cards: [
      { type: 'concept', title: '무의식적 생각 패턴', description: '우리 머릿속엔 자동으로 떠오르는\n생각이 있어. 이걸 "자동 사고"라 해.\n\n"나는 항상 실패해"\n"다들 날 싫어할 거야"\n\n이런 생각은 자동이라 사실처럼 느껴지지만\n대부분 왜곡된 거야.\n알아차리는 게 첫걸음!' },
      { type: 'summary', keywords: [
        { icon: '⚡', label: '자동 사고', description: '무의식적으로 떠오르는 생각' },
        { icon: '🔮', label: '왜곡', description: '사실이 아닌 경우가 많음' },
        { icon: '🏷️', label: '흑백 사고', description: '"항상", "절대" 같은 극단' },
        { icon: '🛑', label: '멈추기', description: '알아차리면 멈출 수 있다' },
      ]},
      { type: 'example', bad: { label: '자동 사고에 빠짐', story: '시험 하나 못 봤다.\n"나는 공부에 소질이 없어."\n자동 사고를 사실로 믿고 포기했다.' }, good: { label: '자동 사고 포착', story: '"또 이 생각이네. 한 번 못 본 걸로\n소질이 없다고 단정하는 건 과장이야."\n생각을 점검하고 다음을 준비했다.' }},
      { type: 'ox', statement: '머릿속에 떠오르는 생각은 다 사실이다.', answer: false, feedback: '자동 사고는 "습관적 해석"이지\n사실이 아닌 경우가 많아!' },
      { type: 'multipleChoice', question: '자동 사고의 특징이 아닌 것은?', options: ['자동으로 떠오른다', '항상 정확하다', '"항상", "절대" 같은 극단적 표현이 많다', '사실처럼 느껴진다'], correctIndex: 1, explanation: '자동 사고는 자동으로 떠오르고\n사실처럼 느껴지지만, 정확하지 않은 경우가 많아!' },
      { type: 'feedback', summary: '자동 사고 = 자동이지만 사실이 아닐 수 있다', message: '"이 생각, 진짜일까?" 한 번 멈추고 점검!' },
      { type: 'mission', mission: '오늘 부정적 생각이 떠올랐을 때\n"이건 사실일까, 자동 사고일까?" 점검하기', encouragement: '알아차리는 것이 바꾸는 것의 시작!' },
    ],
  },

  'selfAwareness-bronze-9': {
    id: 'selfAwareness-bronze-9', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 9,
    title: '나는 어떤 사람인가',
    cards: [
      { type: 'concept', title: '자기 이해의 다섯 가지 질문', description: '나를 깊이 이해하려면\n이 5가지를 알아야 해.\n\n1. 뭘 할 때 행복한가?\n2. 뭘 할 때 에너지가 나는가?\n3. 무엇을 중요하게 여기는가?\n4. 어떤 상황에서 힘들어하는가?\n5. 어떤 사람이 되고 싶은가?' },
      { type: 'summary', keywords: [
        { icon: '😊', label: '행복 기준', description: '나를 행복하게 하는 것' },
        { icon: '⚡', label: '에너지원', description: '나에게 힘을 주는 것' },
        { icon: '⭐', label: '가치관', description: '중요하게 여기는 것' },
        { icon: '🎯', label: '방향', description: '되고 싶은 모습' },
      ]},
      { type: 'example', bad: { label: '남과 비교', story: '"친구는 수학 잘하는데 나는..."\n항상 남과 비교만 하니\n자기가 뭘 좋아하는지도 모르겠다.' }, good: { label: '자기 탐색', story: '"나는 글 쓸 때 행복하고\n사람들과 대화할 때 에너지가 나."\n나만의 기준이 생기니 비교가 줄었다.' }},
      { type: 'ox', statement: '자기 이해는 한 번이면 끝이다.', answer: false, feedback: '나는 계속 변해! 정기적으로\n나에 대해 생각하는 시간이 필요해.' },
      { type: 'multipleChoice', question: '자기 이해를 깊게 하는 가장 좋은 방법은?', options: ['성격 테스트만 하기', '남들 의견에 맞추기', '스스로에게 질문하고 답해보기', '생각하지 않기'], correctIndex: 2, explanation: '좋은 질문이 좋은 자기 이해를 만들어!\n스스로 물어보는 습관이 핵심이야.' },
      { type: 'feedback', summary: '자기 이해 = 좋은 질문을 나에게 던지기', message: '나를 아는 것이 가장 큰 무기야!' },
      { type: 'mission', mission: '5가지 질문에 각각 한 줄씩 답해보기', encouragement: '이 답이 나만의 설명서가 돼!' },
    ],
  },

  'selfAwareness-bronze-10': {
    id: 'selfAwareness-bronze-10', chapterKey: 'selfAwareness', tierKey: 'bronze', stageNumber: 10,
    title: '나를 알아가는 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '자기인식은 한 번이 아니라\n"매일 조금씩"이 핵심이야.\n\n배운 것을 조합해서\n나만의 자기인식 루틴을 만들자!\n\n1. 감정 라벨링 (수시로)\n2. 몸 신호 체크 (하루 2회)\n3. 감정 일기 (저녁 5분)\n4. 자동 사고 점검 (필요시)' },
      { type: 'summary', keywords: [
        { icon: '🏷️', label: '라벨링', description: '감정에 이름 붙이기' },
        { icon: '🫀', label: '몸 체크', description: '몸 신호 알아차리기' },
        { icon: '📝', label: '감정 일기', description: '하루 5분 기록하기' },
        { icon: '🛑', label: '사고 점검', description: '자동 사고 알아차리기' },
      ]},
      { type: 'example', bad: { label: '배우고 안 하기', story: '자기인식이 중요한 건 알겠는데\n"나중에 해야지" 미루다가\n결국 아무것도 안 했다.' }, good: { label: '루틴 실천', story: '아침: 몸 상태 체크\n낮: 감정 라벨링 연습\n밤: 감정 일기 3줄\n한 달 뒤 스스로를 훨씬 잘 이해하게 됐다.' }},
      { type: 'ox', statement: '자기인식은 특별한 시간을 내야만 할 수 있다.', answer: false, feedback: '일상 속에서 잠깐잠깐 할 수 있어!\n감정 라벨링은 10초면 충분하고\n감정 일기는 5분이면 돼.' },
      { type: 'multipleChoice', question: '자기인식 루틴에서 가장 중요한 것은?', options: ['완벽하게 하기', '매일 조금씩 꾸준히', '한 번에 오래', '남에게 보여주기'], correctIndex: 1, explanation: '하루 5분이라도 매일 하면\n한 달 뒤 완전히 달라져!' },
      { type: 'apply', question: '나만의 자기인식 루틴을 설계해보세요.\n(아침 / 낮 / 저녁에 할 것)', placeholder: '예: 아침-몸 상태 체크 / 낮-감정 라벨링 / 밤-감정 일기 3줄' },
      { type: 'feedback', summary: '자기인식 루틴 = 매일 조금씩 나를 알아가기', message: '브론즈 완료! 이제 나를 아는 여정이 시작됐어!' },
      { type: 'mission', mission: '오늘부터 "감정 일기 3줄" 시작하기!', encouragement: '나를 아는 것이 모든 성장의 기반이야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (자기인식 심화) 1~10
  // ═══════════════════════════════════════

  'selfAwareness-silver-1': {
    id: 'selfAwareness-silver-1', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 1,
    title: '인지 왜곡 12가지',
    cards: [
      { type: 'concept', title: '뇌가 현실을 왜곡하는 방식', description: '우리 뇌는 현실을 있는 그대로\n보지 않아. 자동으로 왜곡해.\n\n"흑백 사고, 과잉 일반화, 독심술..."\n이런 패턴을 알면\n왜곡에 속지 않게 돼!' },
      { type: 'summary', keywords: [
        { icon: '⬛', label: '흑백 사고', description: '전부 아니면 전무' },
        { icon: '🔄', label: '과잉 일반화', description: '한 번이 "항상"이 됨' },
        { icon: '🔮', label: '독심술', description: '상대 마음을 단정' },
        { icon: '📉', label: '긍정 무시', description: '좋은 건 무시, 나쁜 것만 확대' },
      ]},
      { type: 'example', bad: { label: '인지 왜곡에 빠짐', story: '발표에서 한 번 실수.\n"나는 항상 망해." (과잉 일반화)\n"다들 날 웃겼을 거야." (독심술)\n사실은 아무도 신경 안 썼다.' }, good: { label: '왜곡 인식', story: '"한 번 실수 = 항상 망친다? 과장이네."\n"다들 웃긴다는 건 내 추측이지 사실이 아냐."\n왜곡을 알아차리니 마음이 편해졌다.' }},
      { type: 'ox', statement: '"항상 실패한다"는 생각은 정확한 사실일 가능성이 높다.', answer: false, feedback: '"항상"이라는 단어 자체가 과잉 일반화!\n한두 번의 경험을 전부로 확대한 거야.' },
      { type: 'multipleChoice', question: '"친구가 인사를 안 했으니 나를 싫어하는 거야"는 어떤 인지 왜곡?', options: ['흑백 사고', '과잉 일반화', '독심술', '긍정 무시'], correctIndex: 2, explanation: '상대 마음을 증거 없이 단정하는 건 독심술!\n못 봤을 수도 있잖아.' },
      { type: 'feedback', summary: '인지 왜곡 = 뇌의 자동 필터. 알면 안 속는다', message: '왜곡을 알아차리는 것이 지혜의 시작!' },
      { type: 'mission', mission: '오늘 부정적 생각 1개를 골라 "어떤 왜곡인지" 분류하기', encouragement: '이름을 붙이면 힘이 약해져!' },
    ],
  },

  'selfAwareness-silver-2': {
    id: 'selfAwareness-silver-2', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 2,
    title: '감정의 파도 타기',
    cards: [
      { type: 'concept', title: '감정은 파도처럼 온다', description: '감정은 영원하지 않아.\n파도처럼 올라왔다 내려가.\n\n평균 90초면 감정의 생화학적 반응이\n사라진대. 핵심은 "버티기"야.\n\n억누르지 말고, 파도를 타듯\n올라오면 지켜보고 내려가길 기다려.' },
      { type: 'summary', keywords: [
        { icon: '🌊', label: '감정 파도', description: '올라왔다 반드시 내려간다' },
        { icon: '⏱️', label: '90초 법칙', description: '감정 반응은 90초면 지나감' },
        { icon: '🧘', label: '관찰', description: '감정을 판단 없이 지켜보기' },
        { icon: '🚫', label: '억누르기 금지', description: '참으면 더 커진다' },
      ]},
      { type: 'example', bad: { label: '감정 억누르기', story: '화가 났지만 꾹 참았다.\n참고 참다가 갑자기 폭발.\n더 큰 문제가 됐다.' }, good: { label: '파도 타기', story: '"지금 화가 올라오고 있어. 괜찮아."\n90초 동안 깊게 호흡하며 지켜봤다.\n화가 자연스럽게 내려갔다.' }},
      { type: 'ox', statement: '강한 감정은 즉시 해결해야 한다.', answer: false, feedback: '즉시 반응하면 후회할 때가 많아!\n90초만 기다리면 감정이 자연히 줄어들어.' },
      { type: 'multipleChoice', question: '감정의 파도를 잘 타는 방법은?', options: ['감정을 꾹 참기', '바로 표현하기', '판단 없이 관찰하며 지나가길 기다리기', '무시하기'], correctIndex: 2, explanation: '관찰 + 기다림 = 가장 건강한 감정 관리법!' },
      { type: 'feedback', summary: '감정 = 파도. 억누르지 말고 타라', message: '모든 감정은 반드시 지나간다!' },
      { type: 'mission', mission: '다음에 강한 감정이 올 때 90초 호흡하며 관찰하기', encouragement: '파도를 탈 줄 아는 사람이 강한 사람!' },
    ],
  },

  'selfAwareness-silver-3': {
    id: 'selfAwareness-silver-3', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 3,
    title: '내면의 비판자 다루기',
    cards: [
      { type: 'concept', title: '머릿속 비판 목소리', description: '머릿속에 나를 깎아내리는\n목소리가 있지 않아?\n\n"넌 못해" "또 실패할 거야"\n이걸 "내면의 비판자"라 해.\n\n이 목소리는 내가 아니야!\n습관적 사고 패턴일 뿐이야.' },
      { type: 'summary', keywords: [
        { icon: '👹', label: '내면 비판자', description: '나를 깎아내리는 내면의 목소리' },
        { icon: '🔊', label: '습관적', description: '자동으로 반복되는 패턴' },
        { icon: '🙅', label: '나 ≠ 비판자', description: '그 목소리는 내가 아니다' },
        { icon: '💬', label: '대화하기', description: '비판자에게 답해주기' },
      ]},
      { type: 'example', bad: { label: '비판자에게 지배당함', story: '"넌 할 수 없어"라는 목소리에\n그대로 동의. "맞아, 난 못해."\n시도조차 하지 않았다.' }, good: { label: '비판자와 대화', story: '"또 그 목소리네. 고마운데\n한 번도 안 해봤잖아?\n일단 해보고 판단할게." 시도했고 해냈다.' }},
      { type: 'ox', statement: '내면의 비판 목소리는 진실을 말해주는 것이다.', answer: false, feedback: '비판자는 "보호 본능"에서 나와.\n위험을 피하려는 거지 진실이 아니야!' },
      { type: 'multipleChoice', question: '내면의 비판자를 다루는 가장 좋은 방법은?', options: ['무시하기', '동의하기', '알아차리고 다른 관점으로 답해주기', '화내기'], correctIndex: 2, explanation: '알아차리기 + 다른 관점 제시!\n"그 말은 사실이 아니야"라고 답해줘.' },
      { type: 'feedback', summary: '내면 비판자 = 나의 일부지만 진실은 아니다', message: '비판자의 말에 동의하지 않아도 돼!' },
      { type: 'mission', mission: '내면 비판자의 말 1개를 적고, 친구에게 말하듯 반박해보기', encouragement: '비판자에게 답하는 연습이 자존감을 키워!' },
    ],
  },

  'selfAwareness-silver-4': {
    id: 'selfAwareness-silver-4', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 4,
    title: '감정 트리거 맵 만들기',
    cards: [
      { type: 'concept', title: '뭐가 내 감정을 건드리는가', description: '특정 상황에서 감정이 확 올라오지?\n그 상황이 "감정 트리거"야.\n\n트리거를 알면\n감정에 끌려다니지 않고\n미리 대비할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '트리거', description: '감정을 촉발하는 특정 상황' },
        { icon: '🗺️', label: '맵', description: '나의 트리거를 정리한 지도' },
        { icon: '🔄', label: '패턴', description: '반복되는 상황 → 반복되는 감정' },
        { icon: '🛡️', label: '대비', description: '알면 미리 준비할 수 있다' },
      ]},
      { type: 'example', bad: { label: '트리거 모름', story: '왜인지 모르게 월요일마다 짜증.\n이유를 몰라서 계속 반복.' }, good: { label: '트리거 발견', story: '"월요일 아침 회의에서 발표할 때\n불안이 올라오는구나!"\n알고 나니 미리 준비해서 불안이 줄었다.' }},
      { type: 'ox', statement: '감정이 갑자기 올라오는 것은 통제할 수 없다.', answer: false, feedback: '트리거를 알면 "예상"할 수 있어!\n예상하면 대비하고, 대비하면 반응이 달라져.' },
      { type: 'multipleChoice', question: '감정 트리거 맵을 만들려면?', options: ['감정을 참기', '강한 감정이 든 상황을 기록하고 패턴 찾기', '감정을 안 느끼기', '남 탓하기'], correctIndex: 1, explanation: '기록 → 패턴 발견 → 대비!\n이 3단계가 트리거 맵의 핵심.' },
      { type: 'apply', question: '최근 감정이 크게 올라온 상황 2가지와 그때 느낀 감정을 적어보세요.', placeholder: '상황1: ... 감정: ...\n상황2: ... 감정: ...' },
      { type: 'feedback', summary: '트리거를 알면 감정에 끌려다니지 않는다', message: '내 감정의 지도를 그려보자!' },
      { type: 'mission', mission: '이번 주 강한 감정이 든 순간 3개를 기록하고 공통점 찾기', encouragement: '패턴을 발견하면 게임 체인저!' },
    ],
  },

  'selfAwareness-silver-5': {
    id: 'selfAwareness-silver-5', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 5,
    title: '자기 자비 연습',
    cards: [
      { type: 'concept', title: '나에게 친절하기', description: '실수했을 때 나에게 뭐라고 해?\n"바보같이..." "왜 이것밖에..."\n\n만약 친구가 같은 실수를 하면\n뭐라고 할 거야? 위로하겠지.\n\n나에게도 그렇게 대해줘.\n이걸 "자기 자비"라고 해.' },
      { type: 'summary', keywords: [
        { icon: '💛', label: '자기 자비', description: '나에게 친절하게 대하기' },
        { icon: '🤗', label: '위로', description: '실수해도 괜찮다고 말하기' },
        { icon: '👫', label: '친구 기준', description: '친구에게 하듯 나에게' },
        { icon: '🌱', label: '성장', description: '자비가 회복력을 키운다' },
      ]},
      { type: 'example', bad: { label: '자기 비난', story: '시험 망쳤다.\n"역시 난 안 돼. 바보야."\n자책에 빠져 다음 시험도 포기.' }, good: { label: '자기 자비', story: '"실수할 수 있어. 누구나 그래.\n다음에 더 잘하면 돼."\n마음이 편해지니 다음 시험 준비에 집중.' }},
      { type: 'ox', statement: '자기 자비는 자기 합리화와 같다.', answer: false, feedback: '자기 합리화 = 변명\n자기 자비 = 인정하되 자책하지 않기\n완전히 다른 거야!' },
      { type: 'multipleChoice', question: '자기 자비 연습의 핵심은?', options: ['실수를 무시하기', '실수를 인정하되 자책 대신 위로하기', '실수를 남 탓하기', '실수를 절대 안 하기'], correctIndex: 1, explanation: '인정 + 위로가 핵심! 실수는 성장의 재료야.' },
      { type: 'feedback', summary: '자기 자비 = 나에게 좋은 친구가 되기', message: '나에게 가장 친절한 사람은 나 자신이어야 해!' },
      { type: 'mission', mission: '오늘 실수나 아쉬운 일에 "친구에게 하듯" 위로 한 줄 적기', encouragement: '자비가 자존감의 진짜 뿌리야!' },
    ],
  },

  'selfAwareness-silver-6': {
    id: 'selfAwareness-silver-6', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 6,
    title: '조하리의 창',
    cards: [
      { type: 'concept', title: '나를 보는 4가지 영역', description: '조하리의 창(Johari Window)은\n나를 4가지 영역으로 본다.\n\n1. 열린 영역: 나도 남도 아는 나\n2. 숨은 영역: 나만 아는 나\n3. 맹점: 남만 아는 나\n4. 미지: 아무도 모르는 나\n\n맹점을 줄이면 자기인식이 높아져!' },
      { type: 'summary', keywords: [
        { icon: '🪟', label: '열린 영역', description: '나도 남도 아는 부분' },
        { icon: '🙈', label: '숨은 영역', description: '나만 아는 속마음' },
        { icon: '👁️', label: '맹점', description: '남은 알지만 나는 모르는 부분' },
        { icon: '❓', label: '미지', description: '아직 발견되지 않은 나' },
      ]},
      { type: 'example', bad: { label: '맹점 방치', story: '본인은 리더십이 강하다고 생각.\n하지만 친구들은 "독단적"이라 느낌.\n피드백을 안 들으니 계속 반복.' }, good: { label: '맹점 줄이기', story: '"내가 모르는 나를 알려줄래?"\n친구에게 물어보니 "가끔 말이 세"\n알게 돼서 조절할 수 있게 됐다.' }},
      { type: 'ox', statement: '나 자신에 대해 나보다 더 잘 아는 사람은 없다.', answer: false, feedback: '맹점이 있어! 남들이 보는 나와\n내가 보는 나는 다를 수 있어.' },
      { type: 'multipleChoice', question: '조하리의 창에서 자기인식을 높이려면?', options: ['숨은 영역을 더 숨기기', '맹점을 줄이기 위해 피드백 받기', '미지 영역을 무시하기', '열린 영역을 줄이기'], correctIndex: 1, explanation: '피드백으로 맹점을 줄이면\n열린 영역이 넓어지고 자기인식이 높아져!' },
      { type: 'feedback', summary: '맹점 줄이기 = 피드백으로 자기인식 UP', message: '남이 보는 나를 알면 성장이 빨라져!' },
      { type: 'mission', mission: '친한 친구 1명에게 "내 장점과 고칠 점 하나씩" 물어보기', encouragement: '용기 있는 질문이 맹점을 없앤다!' },
    ],
  },

  'selfAwareness-silver-7': {
    id: 'selfAwareness-silver-7', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 7,
    title: '감정과 욕구의 연결',
    cards: [
      { type: 'concept', title: '모든 감정 뒤에는 욕구가 있다', description: '화가 나는 건 "존중받고 싶어서".\n슬픈 건 "연결되고 싶어서".\n불안한 건 "안전하고 싶어서".\n\n감정 뒤의 욕구를 알면\n진짜 원하는 것을 찾을 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '감정', description: '표면에 보이는 느낌' },
        { icon: '🎯', label: '욕구', description: '감정 뒤에 숨은 진짜 바람' },
        { icon: '🔗', label: '연결', description: '감정 → 욕구 찾기' },
        { icon: '💡', label: '해결', description: '욕구를 알면 해결이 보인다' },
      ]},
      { type: 'example', bad: { label: '감정만 보기', story: '"짜증나! 동생이 시끄럽게 해서!"\n화만 내고 관계가 나빠졌다.' }, good: { label: '욕구 발견', story: '"짜증의 뒤에는 '조용히 공부하고 싶다'는\n욕구가 있네. 동생에게 차분히 부탁하자."\n욕구를 알고 나니 해결이 쉬웠다.' }},
      { type: 'ox', statement: '감정을 느끼면 원인이 바로 명확하다.', answer: false, feedback: '감정의 표면 원인과 진짜 욕구는 달라!\n한 단계 더 파고들어야 진짜 이유를 알 수 있어.' },
      { type: 'multipleChoice', question: '"친구가 약속을 어겨서 화가 났다"에서 숨은 욕구는?', options: ['복수하고 싶다', '존중받고 싶다 / 중요하게 여겨지고 싶다', '혼자 있고 싶다', '더 바빠지고 싶다'], correctIndex: 1, explanation: '약속 어김 → 나를 중요하게 여기지 않는다는 느낌\n→ "존중받고 싶다"는 욕구!' },
      { type: 'feedback', summary: '감정 뒤의 욕구를 찾으면 해결이 보인다', message: '"진짜 원하는 게 뭐지?" 이 질문이 핵심!' },
      { type: 'mission', mission: '최근 강한 감정 1개를 골라 뒤에 숨은 욕구 찾기', encouragement: '욕구를 아는 것이 진짜 자기인식!' },
    ],
  },

  'selfAwareness-silver-8': {
    id: 'selfAwareness-silver-8', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 8,
    title: '성장 마인드셋 vs 고정 마인드셋',
    cards: [
      { type: 'concept', title: '능력은 변할 수 있다', description: '고정 마인드셋: "재능은 타고나는 거야"\n성장 마인드셋: "노력하면 키울 수 있어"\n\n실패했을 때\n고정: "난 원래 못해" → 포기\n성장: "아직 못하는 거야" → 도전\n\n마인드셋 하나가 인생을 바꿔!' },
      { type: 'summary', keywords: [
        { icon: '🪨', label: '고정', description: '"난 원래 이래" 변할 수 없다' },
        { icon: '🌱', label: '성장', description: '"아직 못하는 거야" 변할 수 있다' },
        { icon: '💪', label: '노력', description: '노력이 능력을 만든다' },
        { icon: '🔑', label: '"아직"', description: '"아직"이라는 한 마디의 힘' },
      ]},
      { type: 'example', bad: { label: '고정 마인드셋', story: '영어 시험 60점.\n"나는 영어 재능이 없어."\n공부를 포기했다.' }, good: { label: '성장 마인드셋', story: '영어 시험 60점.\n"아직 60점이야. 방법을 바꿔보자."\n단어장 바꾸고 다음 시험 78점!' }},
      { type: 'ox', statement: '재능이 없으면 노력해도 소용없다.', answer: false, feedback: '뇌는 계속 변해! (신경가소성)\n노력하면 실제로 능력이 성장해.' },
      { type: 'multipleChoice', question: '성장 마인드셋의 핵심 단어는?', options: ['"원래"', '"아직"', '"절대"', '"항상"'], correctIndex: 1, explanation: '"못한다"가 아니라 "아직 못한다"!\n"아직"이 가능성을 열어줘.' },
      { type: 'feedback', summary: '"아직" = 성장 마인드셋의 마법 단어', message: '못하는 게 아니라 아직 못하는 거야!' },
      { type: 'mission', mission: '"나는 OO을 못해" → "나는 아직 OO을 못해"로 3개 바꿔보기', encouragement: '"아직"을 붙이면 세상이 달라져!' },
    ],
  },

  'selfAwareness-silver-9': {
    id: 'selfAwareness-silver-9', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 9,
    title: '자기 대화의 힘',
    cards: [
      { type: 'concept', title: '하루 6만 번의 혼잣말', description: '우리는 하루에 약 6만 번\n속으로 혼잣말을 해.\n\n그 중 80%가 부정적이라면?\n하루 종일 나를 깎아내리는 셈이야.\n\n자기 대화를 바꾸면\n감정, 행동, 결과가 달라져!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '자기 대화', description: '머릿속 혼잣말' },
        { icon: '📊', label: '6만 번', description: '하루 평균 혼잣말 횟수' },
        { icon: '🔄', label: '전환', description: '부정 → 건설적으로 바꾸기' },
        { icon: '💪', label: '효과', description: '자기 대화가 행동을 결정' },
      ]},
      { type: 'example', bad: { label: '부정적 자기 대화', story: '"이거 절대 못 해" "나는 부족해"\n시작 전부터 지쳐서 아무것도 안 했다.' }, good: { label: '건설적 자기 대화', story: '"어렵지만 한 단계씩 해보자"\n"전에도 해냈잖아, 이번에도 할 수 있어"\n실제로 완성했다!' }},
      { type: 'ox', statement: '속으로 하는 말은 실제 결과에 영향을 주지 않는다.', answer: false, feedback: '자기 대화는 뇌에 직접 영향!\n긍정적 말을 하면 도파민이 분비돼서\n실제 수행 능력이 올라가.' },
      { type: 'multipleChoice', question: '자기 대화를 바꾸는 가장 좋은 방법은?', options: ['무조건 긍정적으로', '부정적 말을 알아차리고 건설적으로 전환', '생각을 안 하기', '남의 말로 대체'], correctIndex: 1, explanation: '알아차리기 + 건설적 전환!\n"못해" → "어렵지만 해볼 수 있어"' },
      { type: 'feedback', summary: '자기 대화 전환 = 행동과 결과가 바뀐다', message: '내가 나에게 하는 말이 내 인생을 만들어!' },
      { type: 'mission', mission: '오늘 부정적 혼잣말 1개를 잡아서 건설적으로 바꿔보기', encouragement: '말을 바꾸면 마음이 바뀌고, 행동이 바뀐다!' },
    ],
  },

  'selfAwareness-silver-10': {
    id: 'selfAwareness-silver-10', chapterKey: 'selfAwareness', tierKey: 'silver', stageNumber: 10,
    title: '감정 조절 도구 상자',
    cards: [
      { type: 'concept', title: '나만의 감정 조절 키트', description: '지금까지 배운 감정 관리 도구를\n정리해보자. 상황마다 쓸 도구가 달라.\n\n급할 때: 호흡법, 90초 기다리기\n평소: 감정 일기, 트리거 맵\n깊이: 인지 왜곡 점검, 욕구 찾기\n\n도구 상자에 넣어두면 언제든 꺼내 쓸 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🧰', label: '도구 상자', description: '상황별 감정 조절 도구 모음' },
        { icon: '🚨', label: '응급', description: '호흡법, 90초 기다리기' },
        { icon: '📝', label: '일상', description: '감정 일기, 라벨링' },
        { icon: '🔍', label: '심층', description: '왜곡 점검, 욕구 탐색' },
      ]},
      { type: 'example', bad: { label: '도구 없음', story: '화가 나면 소리 지르고\n슬프면 이불 속에 숨고\n매번 같은 패턴 반복.' }, good: { label: '도구 상자 활용', story: '화가 날 때: 심호흡 + 90초\n슬플 때: 감정 일기 + 자기 자비\n상황마다 도구를 꺼내 써서 유연하게 대처.' }},
      { type: 'ox', statement: '감정 조절 방법은 하나만 알면 충분하다.', answer: false, feedback: '상황마다 다른 도구가 필요해!\n여러 도구를 가지고 있어야 유연해져.' },
      { type: 'multipleChoice', question: '감정이 갑자기 폭발할 때 가장 먼저 쓸 도구는?', options: ['감정 일기 쓰기', '트리거 맵 분석', '심호흡 + 90초 기다리기', '인지 왜곡 점검'], correctIndex: 2, explanation: '급할 땐 즉각 도구! 호흡으로 진정 먼저.\n분석은 그 다음에.' },
      { type: 'apply', question: '나만의 감정 조절 도구 상자를 정리해보세요.', placeholder: '급할 때: ...\n평소: ...\n깊이 생각할 때: ...' },
      { type: 'feedback', summary: '감정 조절 도구 상자 = 상황별 맞춤 대응', message: '실버 완료! 이제 감정의 주인은 너야!' },
      { type: 'mission', mission: '감정 조절 도구 3가지를 적어 손이 닿는 곳에 두기', encouragement: '도구를 가진 사람은 흔들리지 않아!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (자기인식 응용·실전) 1~10
  // ═══════════════════════════════════════

  'selfAwareness-gold-1': {
    id: 'selfAwareness-gold-1', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 1,
    title: '메타인지 - 생각을 생각하기',
    cards: [
      { type: 'concept', title: '생각 위의 생각', description: '메타인지란\n"내가 지금 뭘 생각하고 있는지"\n생각하는 능력이야.\n\n공부할 때 "이해하고 있나?"\n대화할 때 "지금 감정적이진 않나?"\n\n한 발 물러서 자신을 관찰하는 것.\n성적 상위 1%의 비밀 무기야!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '메타인지', description: '생각에 대한 생각' },
        { icon: '👁️', label: '관찰자 시점', description: '한 발 물러서 나를 보기' },
        { icon: '📚', label: '학습 효과', description: '모르는 것을 아는 능력' },
        { icon: '🏆', label: '상위 1%', description: '메타인지가 성적을 결정' },
      ]},
      { type: 'example', bad: { label: '메타인지 없음', story: '3시간 공부했는데 시험에서 전혀 못 풀었다.\n"열심히 했는데 왜?"\n사실 읽기만 했지 이해 확인을 안 했다.' }, good: { label: '메타인지 활용', story: '공부 중 "이거 설명할 수 있나?" 자문.\n설명 못 하는 부분만 다시 공부.\n시간은 절반, 성적은 올라갔다.' }},
      { type: 'ox', statement: '열심히 공부하면 메타인지는 필요 없다.', answer: false, feedback: '열심히 + 메타인지 = 효율적 학습!\n"내가 뭘 모르는지 아는 것"이 핵심.' },
      { type: 'multipleChoice', question: '메타인지적 학습의 예시는?', options: ['교과서를 처음부터 끝까지 읽기', '"이 부분을 친구에게 설명할 수 있나?" 자문하기', '형광펜으로 밑줄 긋기', '공부 시간을 늘리기'], correctIndex: 1, explanation: '설명할 수 있는지 확인 = 메타인지!\n이해도를 스스로 점검하는 거야.' },
      { type: 'feedback', summary: '메타인지 = "내가 뭘 아는지 아는 것"', message: '아는 척이 아닌 진짜 아는 것을 구분하자!' },
      { type: 'mission', mission: '공부할 때 "이거 설명할 수 있나?" 3번 자문해보기', encouragement: '메타인지 한 번이면 공부법이 달라져!' },
    ],
  },

  'selfAwareness-gold-2': {
    id: 'selfAwareness-gold-2', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 2,
    title: '감정 지능(EQ) 키우기',
    cards: [
      { type: 'concept', title: 'IQ보다 중요한 EQ', description: '감정 지능(EQ)은\n감정을 인식하고, 이해하고,\n관리하고, 활용하는 능력이야.\n\n연구에 따르면 성공의 80%는\nIQ가 아닌 EQ가 결정해.\n\nEQ는 선천적이 아니야.\n훈련으로 키울 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '인식', description: '감정을 알아차리기' },
        { icon: '🧠', label: '이해', description: '왜 그런 감정인지 파악' },
        { icon: '🎮', label: '관리', description: '감정을 적절히 조절' },
        { icon: '⚡', label: '활용', description: '감정을 동기부여로 전환' },
      ]},
      { type: 'example', bad: { label: '낮은 EQ', story: '화가 나자마자 친구에게 폭발.\n후회했지만 이미 관계가 틀어졌다.' }, good: { label: '높은 EQ', story: '화가 올라옴 → "화의 원인은 뭐지?" →\n"실은 서운했구나" → 차분하게 감정 전달.\n관계가 오히려 더 깊어졌다.' }},
      { type: 'ox', statement: 'EQ가 높은 사람은 감정을 느끼지 않는다.', answer: false, feedback: 'EQ가 높은 사람도 모든 감정을 느껴!\n차이는 감정에 끌려가느냐 관리하느냐야.' },
      { type: 'multipleChoice', question: 'EQ의 4가지 요소가 아닌 것은?', options: ['감정 인식', '감정 활용', '감정 억제', '감정 관리'], correctIndex: 2, explanation: '억제가 아니라 관리!\nEQ는 감정을 없애는 게 아니라 잘 다루는 거야.' },
      { type: 'feedback', summary: 'EQ = 감정을 잘 다루는 능력, 훈련 가능!', message: 'EQ를 키우면 관계도 성과도 달라진다!' },
      { type: 'mission', mission: '오늘 감정이 올라온 순간 "인식→이해→관리" 3단계 실천하기', encouragement: 'EQ는 연습할수록 높아져!' },
    ],
  },

  'selfAwareness-gold-3': {
    id: 'selfAwareness-gold-3', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 3,
    title: '나의 그림자 인정하기',
    cards: [
      { type: 'concept', title: '내 안의 어두운 면', description: '칼 융은 "그림자"라고 했어.\n내가 인정하고 싶지 않은\n나의 한 면을 말해.\n\n질투, 게으름, 이기심...\n인정하지 않으면 더 커져.\n인정하면 오히려 힘이 약해져!' },
      { type: 'summary', keywords: [
        { icon: '🌑', label: '그림자', description: '인정하기 싫은 나의 면' },
        { icon: '👤', label: '인정', description: '있다고 인정하면 힘이 줄어듦' },
        { icon: '🔄', label: '통합', description: '그림자도 나의 일부' },
        { icon: '💪', label: '성장', description: '인정이 성숙의 시작' },
      ]},
      { type: 'example', bad: { label: '그림자 부정', story: '"나는 절대 질투 안 해!"\n친구가 잘되면 모르게 뒷담화.\n부정할수록 더 나쁜 행동으로 나왔다.' }, good: { label: '그림자 인정', story: '"솔직히 좀 질투가 나네.\n그래도 괜찮아, 자연스러운 감정이야."\n인정하니 오히려 진심으로 축하해줄 수 있었다.' }},
      { type: 'ox', statement: '좋은 사람은 부정적인 면이 없다.', answer: false, feedback: '모든 사람에게 그림자가 있어!\n좋은 사람은 그림자를 인정하는 사람이야.' },
      { type: 'multipleChoice', question: '그림자를 다루는 가장 건강한 방법은?', options: ['완전히 없애기', '있다고 인정하고 관찰하기', '남에게 투사하기', '무시하기'], correctIndex: 1, explanation: '인정 + 관찰! 그림자를 인정하면\n그것에 지배당하지 않게 돼.' },
      { type: 'feedback', summary: '그림자 인정 = 진짜 자기인식의 깊이', message: '어두운 면까지 포함한 것이 진짜 나야!' },
      { type: 'mission', mission: '내가 인정하기 싫은 나의 한 면을 솔직하게 적어보기', encouragement: '인정하는 순간 그것은 더 이상 널 지배하지 않아!' },
    ],
  },

  'selfAwareness-gold-4': {
    id: 'selfAwareness-gold-4', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 4,
    title: '회복탄력성의 비밀',
    cards: [
      { type: 'concept', title: '넘어져도 다시 일어나는 힘', description: '회복탄력성 = 어려운 상황에서\n다시 일어나는 능력.\n\n타고나는 게 아니야!\n자기인식 + 감정 조절 +\n긍정적 자기 대화 = 회복탄력성.\n\n지금까지 배운 게 다 여기에 연결돼!' },
      { type: 'summary', keywords: [
        { icon: '🦾', label: '회복탄력성', description: '역경에서 돌아오는 힘' },
        { icon: '🧱', label: '3요소', description: '자기인식 + 감정조절 + 긍정대화' },
        { icon: '📈', label: '성장', description: '역경이 성장의 기회가 됨' },
        { icon: '🏋️', label: '훈련', description: '근육처럼 키울 수 있다' },
      ]},
      { type: 'example', bad: { label: '낮은 회복탄력성', story: '대회에서 떨어졌다.\n"역시 나는 안 돼." 6개월간 아무것도 안 했다.' }, good: { label: '높은 회복탄력성', story: '대회에서 떨어졌다.\n"아쉽지만, 뭘 개선할 수 있을까?"\n피드백 정리 후 다음 대회 입상!' }},
      { type: 'ox', statement: '회복탄력성은 타고나는 성격이다.', answer: false, feedback: '근육처럼 훈련으로 키워!\n자기인식이 높을수록 회복이 빨라.' },
      { type: 'multipleChoice', question: '회복탄력성을 높이는 핵심은?', options: ['실패를 안 하기', '자기인식 + 감정조절 + 성장 마인드셋', '남 탓하기', '감정을 안 느끼기'], correctIndex: 1, explanation: '실패를 아예 안 할 순 없어!\n넘어져도 배우고 일어나는 게 핵심.' },
      { type: 'feedback', summary: '회복탄력성 = 자기인식이 만드는 최고의 능력', message: '넘어지는 건 실패가 아니야. 안 일어나는 게 실패!' },
      { type: 'mission', mission: '최근 실패/좌절 경험에서 "배운 것 1가지" 적기', encouragement: '배운 게 있다면 실패가 아니야!' },
    ],
  },

  'selfAwareness-gold-5': {
    id: 'selfAwareness-gold-5', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 5,
    title: '나의 핵심 신념 탐색',
    cards: [
      { type: 'concept', title: '무의식의 믿음이 삶을 결정한다', description: '핵심 신념이란\n나, 세상, 미래에 대한 깊은 믿음.\n\n"나는 사랑받을 자격이 있다" (건강)\n"나는 부족한 존재다" (제한적)\n\n대부분 어릴 때 형성돼.\n알아차리면 바꿀 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🏛️', label: '핵심 신념', description: '무의식적으로 가진 깊은 믿음' },
        { icon: '🔍', label: '탐색', description: '반복 패턴에서 신념 찾기' },
        { icon: '⚠️', label: '제한 신념', description: '나를 가로막는 신념' },
        { icon: '🔄', label: '변환', description: '알면 바꿀 수 있다' },
      ]},
      { type: 'example', bad: { label: '제한 신념', story: '"나는 사람들 앞에서 말 못해."\n이 신념 때문에 발표 기회를\n10년간 피했다.' }, good: { label: '신념 탐색', story: '"이 믿음은 초등학교 때 놀림받아서 생겼구나.\n지금의 나는 달라. 한 번 도전해보자."\n첫 발표를 성공적으로 해냈다.' }},
      { type: 'ox', statement: '핵심 신념은 절대 바뀌지 않는다.', answer: false, feedback: '신념은 "학습된 것"이라 "재학습" 가능!\n알아차리고 새로운 경험을 하면 바뀌어.' },
      { type: 'multipleChoice', question: '제한 신념을 발견하는 가장 좋은 방법은?', options: ['남에게 물어보기', '"항상 피하는 것"이나 "반복되는 패턴" 살펴보기', '성격 검사 하기', '책 읽기'], correctIndex: 1, explanation: '반복되는 회피나 패턴 뒤에\n제한 신념이 숨어있을 확률이 높아!' },
      { type: 'apply', question: '혹시 반복적으로 피하는 상황이나 "나는 OO 못해"라는 생각이 있나요?', placeholder: '예: 나는 사람들 앞에서... / 나는 수학을...' },
      { type: 'feedback', summary: '핵심 신념을 알면 삶의 패턴이 보인다', message: '제한 신념을 찾아내는 것이 진짜 자유의 시작!' },
      { type: 'mission', mission: '"나는 OO 못해/안 돼"라고 자주 하는 말 1개를 적고 그 기원 생각해보기', encouragement: '알아차리면 반은 이미 해결된 거야!' },
    ],
  },

  'selfAwareness-gold-6': {
    id: 'selfAwareness-gold-6', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 6,
    title: '마음챙김과 현재에 머물기',
    cards: [
      { type: 'concept', title: '지금 이 순간에 집중', description: '마음은 끊임없이 과거와 미래를 오가.\n\n"저번에 왜 그랬지..." (과거 후회)\n"내일 시험 어떡하지..." (미래 걱정)\n\n마음챙김 = 현재에 주의를 두는 것.\n지금 여기에 집중하면\n불안과 걱정이 줄어들어!' },
      { type: 'summary', keywords: [
        { icon: '🧘', label: '마음챙김', description: '현재 순간에 주의를 기울이기' },
        { icon: '⬅️', label: '과거', description: '후회에 에너지 낭비' },
        { icon: '➡️', label: '미래', description: '걱정에 에너지 낭비' },
        { icon: '⭕', label: '현재', description: '유일하게 바꿀 수 있는 시간' },
      ]},
      { type: 'example', bad: { label: '과거+미래 방황', story: '수업 중인데 머릿속은\n"어제 실수한 것" + "다음 주 발표 걱정".\n정작 수업 내용은 하나도 못 들었다.' }, good: { label: '마음챙김', story: '"지금 수업에 집중하자."\n잡생각이 올 때마다 부드럽게 현재로 돌아옴.\n수업 내용이 잘 들어왔다.' }},
      { type: 'ox', statement: '마음챙김은 생각을 완전히 비우는 것이다.', answer: false, feedback: '생각을 비우는 게 아니라\n생각이 와도 판단 없이 알아차리고\n현재로 돌아오는 거야!' },
      { type: 'multipleChoice', question: '마음챙김 중 잡생각이 떠오르면?', options: ['자책하기', '억지로 없애기', '알아차리고 부드럽게 현재로 돌아오기', '포기하기'], correctIndex: 2, explanation: '잡생각은 자연스러운 거야!\n알아차리고 돌아오는 것 자체가 훈련.' },
      { type: 'feedback', summary: '마음챙김 = 현재에 부드럽게 머무르기', message: '지금 이 순간이 유일하게 내가 바꿀 수 있는 시간!' },
      { type: 'mission', mission: '식사할 때 음식 맛에만 집중하며 5분 마음챙김 연습', encouragement: '작은 순간부터 시작하면 충분해!' },
    ],
  },

  'selfAwareness-gold-7': {
    id: 'selfAwareness-gold-7', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 7,
    title: '가치 기반 의사결정',
    cards: [
      { type: 'concept', title: '내 가치관으로 결정하기', description: '선택의 순간에 기준이 뭐야?\n\n남의 눈치? 분위기? 유행?\n\n자기인식이 높은 사람은\n"내 가치관에 맞는가?"로 결정해.\n이러면 후회가 사라져!' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '의사결정', description: '매일 수많은 선택의 순간' },
        { icon: '🧭', label: '가치 기준', description: '내 가치관을 기준으로 판단' },
        { icon: '🚫', label: '외부 기준', description: '남의 기준으로 사는 삶' },
        { icon: '😌', label: '후회 감소', description: '내 기준으로 결정하면 후회 ↓' },
      ]},
      { type: 'example', bad: { label: '남의 기준', story: '"다들 이과 가니까 나도..."\n적성에 안 맞아 1년간 힘들었다.' }, good: { label: '가치 기반', story: '"나는 창의성과 소통이 중요해.\n문과가 더 맞는 것 같아."\n확신을 갖고 선택하니 후회가 없었다.' }},
      { type: 'ox', statement: '좋은 결정은 항상 남들과 같은 선택이다.', answer: false, feedback: '나에게 좋은 결정 = 나의 가치관에 맞는 결정!\n남들과 다를 수 있고, 그래도 괜찮아.' },
      { type: 'multipleChoice', question: '가치 기반 의사결정의 핵심 질문은?', options: ['"남들은 어떻게 했지?"', '"이것이 내 가치관에 맞는가?"', '"가장 쉬운 방법은?"', '"실패하면 어쩌지?"'], correctIndex: 1, explanation: '내 가치관이 나침반! 이 질문 하나면 충분해.' },
      { type: 'feedback', summary: '가치 기반 결정 = 후회 없는 삶', message: '내 기준으로 사는 사람이 가장 강하다!' },
      { type: 'mission', mission: '다음 고민될 때 "내 가치관 TOP 3에 맞는가?" 체크하기', encouragement: '내 나침반을 믿고 걸어가자!' },
    ],
  },

  'selfAwareness-gold-8': {
    id: 'selfAwareness-gold-8', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 8,
    title: '스트레스와 친구 되기',
    cards: [
      { type: 'concept', title: '스트레스는 적이 아니다', description: '스트레스가 해로운 건\n"스트레스가 해롭다고 믿을 때"야!\n\n하버드 연구: 스트레스를\n"도움이 된다"고 생각한 사람은\n건강 문제가 줄어들었어.\n\n스트레스 = 몸이 도전에\n준비하는 신호야!' },
      { type: 'summary', keywords: [
        { icon: '💪', label: '챌린지 반응', description: '스트레스 = 도전 준비 신호' },
        { icon: '🧠', label: '인식 전환', description: '해롭다 → 도움이 된다' },
        { icon: '❤️', label: '유스트레스', description: '좋은 스트레스도 있다' },
        { icon: '⚡', label: '에너지', description: '스트레스가 집중력을 높여준다' },
      ]},
      { type: 'example', bad: { label: '스트레스 = 적', story: '시험 전 긴장.\n"스트레스받아 죽겠다..."\n불안이 더 커져서 집중 못 함.' }, good: { label: '스트레스 = 준비 신호', story: '시험 전 긴장.\n"몸이 시험 준비하고 있구나! 좋은 신호야."\n긴장을 에너지로 바꿔서 집중력 UP.' }},
      { type: 'ox', statement: '모든 스트레스는 건강에 해롭다.', answer: false, feedback: '적당한 스트레스(유스트레스)는 성장에 필수!\n해롭다고 "믿는 것"이 더 해로워.' },
      { type: 'multipleChoice', question: '스트레스에 대한 가장 건강한 태도는?', options: ['완전히 없애기', '몸이 도전에 준비하는 신호로 받아들이기', '참고 무시하기', '항상 피하기'], correctIndex: 1, explanation: '인식 전환만으로 스트레스 반응이 달라져!\n"이건 준비 신호야" = 게임 체인저.' },
      { type: 'feedback', summary: '스트레스 인식 전환 = 해롭다 → 준비 신호', message: '스트레스와 싸우지 말고 친구가 되자!' },
      { type: 'mission', mission: '다음에 긴장될 때 "몸이 준비하고 있구나" 말해보기', encouragement: '한 마디가 스트레스의 질을 바꿔!' },
    ],
  },

  'selfAwareness-gold-9': {
    id: 'selfAwareness-gold-9', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 9,
    title: '감정 표현의 기술',
    cards: [
      { type: 'concept', title: 'I-Message로 진심 전하기', description: '감정을 표현하는 건 중요하지만\n방법이 핵심이야.\n\n"너 때문에 화나!" (You-Message)\n→ 상대가 방어적이 됨\n\n"나는 OO할 때 OO한 감정이 들어"\n(I-Message) → 진심이 전달됨!' },
      { type: 'summary', keywords: [
        { icon: '🚫', label: 'You-Message', description: '"너 때문에~" 공격적 표현' },
        { icon: '✅', label: 'I-Message', description: '"나는~" 감정 중심 표현' },
        { icon: '📝', label: '공식', description: '상황 + 감정 + 바람' },
        { icon: '🤝', label: '효과', description: '갈등 ↓, 이해 ↑' },
      ]},
      { type: 'example', bad: { label: 'You-Message', story: '"너는 맨날 약속 어기잖아!"\n친구가 화가 나서 싸움이 됐다.' }, good: { label: 'I-Message', story: '"약속이 취소되니까 나는 좀 서운해.\n미리 말해주면 좋겠어."\n친구가 미안해하며 이해했다.' }},
      { type: 'ox', statement: '감정을 솔직하게 말하면 관계가 나빠진다.', answer: false, feedback: 'I-Message로 말하면 오히려 좋아져!\n핵심은 "어떻게 말하느냐"야.' },
      { type: 'multipleChoice', question: 'I-Message의 올바른 구조는?', options: ['"너 때문이야"', '"상황 + 나의 감정 + 바라는 것"', '"모두가 그렇게 생각해"', '"넌 항상 그래"'], correctIndex: 1, explanation: '"OO할 때 나는 OO한 감정이 들어. OO해주면 좋겠어."\n이 공식이 I-Message!' },
      { type: 'apply', question: '최근 갈등 상황을 I-Message로 바꿔 표현해보세요.', placeholder: '상황: ... 감정: ... 바람: ...' },
      { type: 'feedback', summary: 'I-Message = 감정을 건강하게 전달하는 기술', message: '진심은 방법이 맞아야 전달된다!' },
      { type: 'mission', mission: '이번 주 한 번 I-Message로 감정 표현하기', encouragement: '연습하면 자연스러워져!' },
    ],
  },

  'selfAwareness-gold-10': {
    id: 'selfAwareness-gold-10', chapterKey: 'selfAwareness', tierKey: 'gold', stageNumber: 10,
    title: '나만의 자기인식 철학',
    cards: [
      { type: 'concept', title: '30단계를 마치며', description: '브론즈: 감정 알아차리기\n실버: 감정 이해하고 조절하기\n골드: 감정 활용하고 표현하기\n\n30개 레슨을 통해\n너는 자기인식의 기본을 완성했어.\n\n이제 배운 것을 나만의 철학으로\n정리할 시간이야!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '인식', description: '감정·생각·행동 알아차리기' },
        { icon: '🧠', label: '이해', description: '왜곡, 트리거, 욕구 파악' },
        { icon: '🎮', label: '조절', description: '파도 타기, 도구 상자' },
        { icon: '💬', label: '표현', description: 'I-Message, 가치 기반' },
      ]},
      { type: 'example', bad: { label: '배우고 멈추기', story: '30개 레슨 다 들었지만\n일상에서 적용하지 않았다.\n1개월 뒤 다 잊어버렸다.' }, good: { label: '철학으로 삶에', story: '"나를 아는 것이 모든 성장의 시작이다."\n매일 5분 자기인식 루틴을 지키며\n점점 더 나를 깊이 이해하게 됐다.' }},
      { type: 'ox', statement: '자기인식을 완전히 마스터할 수 있다.', answer: false, feedback: '자기인식은 평생의 여정이야!\n완성이 아닌 계속되는 탐험.' },
      { type: 'multipleChoice', question: '자기인식의 궁극적 목표는?', options: ['완벽한 사람 되기', '나를 깊이 이해하고 성장해나가기', '감정을 안 느끼기', '남에게 인정받기'], correctIndex: 1, explanation: '완벽이 아닌 이해와 성장!\n자기인식은 끝이 없는 여정이야.' },
      { type: 'apply', question: '나만의 자기인식 철학을 한 문장으로 정리해보세요.', placeholder: '예: "나를 아는 것이 세상을 아는 첫걸음이다"' },
      { type: 'feedback', summary: '자기인식 = 평생의 여정, 끝없는 성장', message: '골드 완료! 자기인식의 기본을 마스터했어!' },
      { type: 'mission', mission: '"나의 자기인식 선언문" 한 문장을 적고 매일 보기', encouragement: '30단계를 완주한 너, 정말 대단해!' },
    ],
  },

}
