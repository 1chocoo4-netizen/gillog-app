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
      { type: 'example', bad: { label: '감정만 보기', story: '"짜증나! 동생이 시끄럽게 해서!"\n화만 내고 관계가 나빠졌다.' }, good: { label: '욕구 발견', story: '"짜증의 뒤에는 \'조용히 공부하고 싶다\'는\n욕구가 있네. 동생에게 차분히 부탁하자."\n욕구를 알고 나니 해결이 쉬웠다.' }},
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

  // ═══════════════════════════════════════
  // 플래티넘 (자기인식 고급 기법) 1~10
  // ═══════════════════════════════════════

  'selfAwareness-platinum-1': {
    id: 'selfAwareness-platinum-1', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 1,
    title: '자기 객관화 훈련',
    cards: [
      { type: 'concept', title: '3인칭으로 나를 보기', description: '감정에 빠지면 판단이 흐려져.\n\n"나는 왜 이러지?" 대신\n"영수는 왜 저러는 걸까?"\n처럼 3인칭으로 바꿔보면\n\n거리두기(self-distancing)가 되면서\n객관적 판단이 가능해져!' },
      { type: 'summary', keywords: [
        { icon: '🔭', label: '거리두기', description: '감정에서 한 발 떨어지기' },
        { icon: '👤', label: '3인칭', description: '나를 제3자처럼 관찰' },
        { icon: '🧊', label: '냉정함', description: '감정 온도를 낮춰 판단' },
        { icon: '🎯', label: '정확성', description: '객관적일수록 판단이 정확' },
      ]},
      { type: 'example', bad: { label: '감정에 빠짐', story: '"왜 나만 이런 일이 생기지!"\n분노 속에서 충동적으로 결정.\n나중에 후회했다.' }, good: { label: '자기 객관화', story: '"만약 친구가 이 상황이라면\n뭐라고 조언할까?"\n한 발 떨어지니 해결책이 보였다.' }},
      { type: 'ox', statement: '감정적일 때 중요한 결정을 내려야 한다.', answer: false, feedback: '감정이 강할 때는 판단이 왜곡돼!\n거리두기 후 결정하는 게 현명해.' },
      { type: 'multipleChoice', question: '자기 객관화에 가장 효과적인 방법은?', options: ['감정을 참기', '3인칭으로 상황을 바라보기', '빠르게 결정하기', '남에게 결정을 맡기기'], correctIndex: 1, explanation: '3인칭 시점이 감정적 거리를 만들어\n더 현명한 판단을 가능하게 해!' },
      { type: 'feedback', summary: '3인칭 시점 = 감정에서 벗어나 객관적 판단', message: '한 발 떨어지면 세상이 다르게 보여!' },
      { type: 'mission', mission: '고민될 때 "친구라면 뭐라고 조언할까?" 적용해보기', encouragement: '거리두기가 지혜의 시작이야!' },
    ],
  },

  'selfAwareness-platinum-2': {
    id: 'selfAwareness-platinum-2', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 2,
    title: '감정 세분화 고급편',
    cards: [
      { type: 'concept', title: '감정을 30가지 이상 구분하기', description: '브론즈에서 감정 라벨링을 배웠지?\n이제 더 정밀하게 나눠보자.\n\n"화남" 안에도\n분노, 짜증, 억울함, 배신감,\n좌절감, 모멸감이 있어.\n\n세밀하게 구분할수록\n감정 조절이 정밀해져!' },
      { type: 'summary', keywords: [
        { icon: '🔬', label: '세분화', description: '감정을 더 정밀하게 구분' },
        { icon: '🌈', label: '감정 스펙트럼', description: '하나의 감정에도 여러 결' },
        { icon: '🎚️', label: '강도', description: '같은 감정도 강도가 다름' },
        { icon: '💊', label: '정밀 처방', description: '정확한 감정에 맞는 대처' },
      ]},
      { type: 'example', bad: { label: '뭉뚱그린 감정', story: '"기분 나빠." 끝.\n뭐가 나쁜지 모르니\n어떻게 해야 할지도 모름.' }, good: { label: '감정 세분화', story: '"이건 화가 아니라 억울함이네.\n내 노력을 인정 안 받은 느낌.\n인정받고 싶다는 욕구구나."\n정확히 알면 대처가 달라진다.' }},
      { type: 'ox', statement: '감정을 세밀하게 나누는 것은 과민한 것이다.', answer: false, feedback: '오히려 감정 전문가의 특징이야!\n세밀할수록 조절 능력이 높아져.' },
      { type: 'multipleChoice', question: '"속상하다"를 세분화한 것으로 적절하지 않은 것은?', options: ['서운하다', '허탈하다', '배고프다', '실망했다'], correctIndex: 2, explanation: '배고프다는 신체 감각이지 감정이 아니야!\n서운함, 허탈함, 실망은 속상함의 세부 감정.' },
      { type: 'feedback', summary: '감정 세분화 = 정밀한 자기인식의 핵심', message: '감정을 정확히 알수록 나를 잘 다룰 수 있어!' },
      { type: 'mission', mission: '"화남" 카테고리에서 5가지 세부 감정 적어보기', encouragement: '감정 어휘가 곧 감정 지능이야!' },
    ],
  },

  'selfAwareness-platinum-3': {
    id: 'selfAwareness-platinum-3', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 3,
    title: '가치관 우선순위 갈등',
    cards: [
      { type: 'concept', title: '가치가 충돌할 때 어떻게 할까', description: '가치관끼리 부딪힐 때가 있어.\n\n"정직" vs "배려"\n→ 솔직히 말하면 상처줄 것 같을 때\n\n"성장" vs "안정"\n→ 도전하고 싶지만 불안할 때\n\n이때 자기인식이 깊어야\n후회 없는 선택을 할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '⚔️', label: '가치 충돌', description: '두 가치가 동시에 부딪힘' },
        { icon: '⚖️', label: '우선순위', description: '어떤 가치가 더 중요한가' },
        { icon: '🤔', label: '딜레마', description: '정답이 없는 선택의 순간' },
        { icon: '🧭', label: '기준점', description: '장기적 가치를 기준으로' },
      ]},
      { type: 'example', bad: { label: '회피', story: '성장(도전)과 안정(현재유지) 사이에서\n결정 못 하고 6개월을 흘려보냈다.' }, good: { label: '가치 우선순위 정리', story: '"장기적으로 성장이 내 1순위야.\n단기 불안은 감수하고 도전하자."\n명확한 기준으로 결정하니 후회가 없었다.' }},
      { type: 'ox', statement: '가치관이 확실하면 갈등 상황이 없다.', answer: false, feedback: '가치 간 충돌은 자연스러워!\n중요한 건 우선순위를 아는 것.' },
      { type: 'multipleChoice', question: '가치 충돌 시 가장 좋은 결정 기준은?', options: ['남들의 선택', '단기적 편안함', '장기적으로 중요한 가치', '직감만 따르기'], correctIndex: 2, explanation: '장기적 가치 기준이 후회를 줄여줘!' },
      { type: 'apply', question: '최근 두 가지 가치가 충돌한 경험이 있나요? 어떤 가치를 선택했나요?', placeholder: '가치A vs 가치B: ...\n선택한 것: ...\n이유: ...' },
      { type: 'feedback', summary: '가치 충돌 = 더 깊은 자기인식의 기회', message: '갈등은 나를 더 잘 알게 해주는 선물!' },
      { type: 'mission', mission: '나의 가치 TOP5를 적고 충돌 가능한 조합 1개 찾기', encouragement: '미리 생각하면 실전에서 흔들리지 않아!' },
    ],
  },

  'selfAwareness-platinum-4': {
    id: 'selfAwareness-platinum-4', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 4,
    title: '투사와 전이 이해하기',
    cards: [
      { type: 'concept', title: '내 감정을 남에게 씌우기', description: '투사(Projection)란\n내 감정을 남의 것으로 보는 것.\n\n내가 불안하면서\n"쟤가 날 불안하게 해"\n\n내가 질투하면서\n"쟤가 나를 질투해"\n\n알아차리면 관계가 180도 달라져!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '투사', description: '내 감정을 남에게 돌리기' },
        { icon: '🔄', label: '전이', description: '과거 감정이 현재 관계에' },
        { icon: '⚠️', label: '무의식', description: '자각 없이 자동으로 일어남' },
        { icon: '💡', label: '알아차림', description: '인식하면 관계가 좋아짐' },
      ]},
      { type: 'example', bad: { label: '투사', story: '내가 자신없는데\n"쟤가 날 무시해"라고 느낌.\n상대에게 화를 냈지만 사실 내 문제였다.' }, good: { label: '투사 인식', story: '"이 사람한테 유독 화가 나네.\n혹시 내 불안을 투사하는 건 아닐까?"\n점검하니 진짜 원인은 내 안에 있었다.' }},
      { type: 'ox', statement: '다른 사람에게 강하게 느끼는 감정은 항상 상대 때문이다.', answer: false, feedback: '투사일 수 있어! "이 감정이\n정말 상대 때문인가?" 점검이 필요해.' },
      { type: 'multipleChoice', question: '투사를 알아차리는 가장 좋은 질문은?', options: ['"저 사람이 왜 저래?"', '"이 감정이 정말 상대 때문일까, 내 안에서 온 걸까?"', '"누가 잘못한 거지?"', '"다들 저렇게 느끼지 않나?"'], correctIndex: 1, explanation: '감정의 진짜 출처를 묻는 것이 핵심!\n내 안에서 온 감정일 수 있어.' },
      { type: 'feedback', summary: '투사 인식 = 관계 갈등의 진짜 원인 찾기', message: '남 탓 전에 내 안을 먼저 보자!' },
      { type: 'mission', mission: '특정 사람에게 반복적으로 느끼는 감정이 투사인지 점검해보기', encouragement: '투사를 아는 것이 관계 지혜의 시작!' },
    ],
  },

  'selfAwareness-platinum-5': {
    id: 'selfAwareness-platinum-5', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 5,
    title: '정체성과 역할의 분리',
    cards: [
      { type: 'concept', title: '나는 역할 그 이상이다', description: '학생, 자녀, 친구, 리더...\n우리는 여러 역할을 맡아.\n\n하지만 역할 = 나 전부가 아니야!\n\n시험 망쳤다고 "나는 실패자"?\n학생 역할에서 한 번 실수한 거지\n내 전체가 실패한 게 아니야.' },
      { type: 'summary', keywords: [
        { icon: '🎭', label: '역할', description: '상황에 따라 맡는 모습' },
        { icon: '👤', label: '정체성', description: '역할을 넘어선 진짜 나' },
        { icon: '🔗', label: '동일시', description: '역할과 자신을 같다고 여김' },
        { icon: '🦋', label: '분리', description: '역할 실패 ≠ 나의 실패' },
      ]},
      { type: 'example', bad: { label: '역할 동일시', story: '반장 선거에서 떨어짐.\n"나는 리더 자격이 없는 사람이야."\n모든 자신감을 잃었다.' }, good: { label: '역할 분리', story: '"반장 역할은 못 맡았지만\n나라는 사람의 가치는 변하지 않아.\n다른 방식으로 리더십을 발휘하자."' }},
      { type: 'ox', statement: '한 분야에서 실패하면 나 자체가 실패한 것이다.', answer: false, feedback: '역할에서의 실패 ≠ 나의 실패!\n나는 수많은 역할과 가능성의 총합이야.' },
      { type: 'multipleChoice', question: '역할과 정체성을 분리하면 좋은 점은?', options: ['책임감이 줄어든다', '실패에도 자존감이 유지된다', '노력을 안 해도 된다', '역할을 무시해도 된다'], correctIndex: 1, explanation: '한 역할의 실패가 나 전체를 무너뜨리지 않아!\n자존감이 유지되면 다시 도전할 수 있어.' },
      { type: 'feedback', summary: '역할 ≠ 정체성, 실패해도 나는 괜찮다', message: '역할은 옷이야. 옷이 찢어져도 내가 사라지진 않아!' },
      { type: 'mission', mission: '내가 맡고 있는 역할 5가지와 "역할과 상관없는 나의 가치" 3가지 적기', encouragement: '역할 너머의 나를 아는 것이 진정한 자기인식!' },
    ],
  },

  'selfAwareness-platinum-6': {
    id: 'selfAwareness-platinum-6', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 6,
    title: '감정 복합체 분석',
    cards: [
      { type: 'concept', title: '한 번에 여러 감정이 온다', description: '감정은 하나만 오지 않아.\n\n졸업식: 기쁨 + 슬픔 + 불안\n고백: 설렘 + 두려움\n승진: 뿌듯함 + 부담감\n\n복합 감정을 하나하나 분리하면\n혼란스러운 마음이 정리돼!' },
      { type: 'summary', keywords: [
        { icon: '🎨', label: '복합 감정', description: '여러 감정이 동시에 존재' },
        { icon: '🧩', label: '분리', description: '각 감정을 하나씩 꺼내보기' },
        { icon: '🤷', label: '혼란', description: '복합 감정을 모르면 혼란' },
        { icon: '✅', label: '수용', description: '모순된 감정도 자연스러움' },
      ]},
      { type: 'example', bad: { label: '혼란', story: '전학 가게 됐다.\n기분이 이상한데 뭔지 모르겠다.\n혼란 속에 아무 준비도 못 했다.' }, good: { label: '복합 감정 분리', story: '"새로운 곳에 대한 설렘 + 친구와 헤어지는 슬픔\n+ 적응 못 할까 봐 불안."\n각각 분리하니 대처법이 보였다.' }},
      { type: 'ox', statement: '한 상황에서는 하나의 감정만 느껴야 정상이다.', answer: false, feedback: '여러 감정을 동시에 느끼는 게 정상이야!\n모순된 감정도 자연스러운 거야.' },
      { type: 'multipleChoice', question: '복합 감정을 다루는 첫 번째 단계는?', options: ['하나만 골라서 느끼기', '각 감정을 하나씩 이름 붙여 분리하기', '모든 감정 무시하기', '가장 강한 감정만 처리하기'], correctIndex: 1, explanation: '먼저 분리! 이름을 붙이면\n각 감정에 맞는 대처가 가능해져.' },
      { type: 'feedback', summary: '복합 감정 = 분리하면 정리된다', message: '모순된 감정도 다 괜찮아! 분리가 핵심.' },
      { type: 'mission', mission: '최근 복잡했던 감정 1개를 3가지 이상 세부 감정으로 분리해보기', encouragement: '분리하는 순간 혼란이 사라져!' },
    ],
  },

  'selfAwareness-platinum-7': {
    id: 'selfAwareness-platinum-7', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 7,
    title: '신체-감정-사고 삼각형',
    cards: [
      { type: 'concept', title: '몸·감정·생각은 연결되어 있다', description: '이 세 가지는 삼각형처럼 연결돼.\n\n생각: "나는 못해" →\n감정: 불안 →\n신체: 손 떨림, 심장 빨라짐\n\n하나를 바꾸면 나머지도 바뀌어!\n몸을 바꾸면 감정이 바뀌고\n생각을 바꾸면 몸이 편해져.' },
      { type: 'summary', keywords: [
        { icon: '🔺', label: '삼각형', description: '몸·감정·생각의 연결' },
        { icon: '💭', label: '사고', description: '생각이 감정과 몸에 영향' },
        { icon: '❤️', label: '감정', description: '감정이 생각과 몸에 영향' },
        { icon: '🏃', label: '신체', description: '몸을 바꾸면 감정이 변함' },
      ]},
      { type: 'example', bad: { label: '악순환', story: '"발표 망할 거야" (생각)\n→ 불안 (감정) → 손 떨림 (몸)\n→ "역시 나는 안 돼" (생각 강화)\n계속 나빠지는 악순환.' }, good: { label: '삼각형 활용', story: '손이 떨려? → 심호흡 (몸 변경)\n→ 불안 줄어듦 (감정 변화)\n→ "한번 해보자" (생각 전환)\n하나만 바꿔도 전체가 달라졌다.' }},
      { type: 'ox', statement: '감정을 바꾸려면 생각만 바꾸면 된다.', answer: false, feedback: '생각, 감정, 몸 중 어디서든 시작 가능!\n특히 몸을 바꾸는 게 가장 빠를 때가 많아.' },
      { type: 'multipleChoice', question: '불안할 때 가장 빠른 개입 경로는?', options: ['생각을 바꾸기', '감정을 억누르기', '신체를 바꾸기 (심호흡, 자세 등)', '아무것도 안 하기'], correctIndex: 2, explanation: '몸은 가장 직접적으로 바꿀 수 있어!\n심호흡 3번이면 즉시 변화가 시작돼.' },
      { type: 'feedback', summary: '몸·감정·생각 = 하나만 바꿔도 전체가 변한다', message: '악순환을 끊는 열쇠는 삼각형에 있어!' },
      { type: 'mission', mission: '다음에 부정적 감정이 올 때 "몸 먼저" 바꿔보기 (자세, 호흡, 표정)', encouragement: '몸이 바뀌면 마음이 따라와!' },
    ],
  },

  'selfAwareness-platinum-8': {
    id: 'selfAwareness-platinum-8', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 8,
    title: '자기 효능감 구축',
    cards: [
      { type: 'concept', title: '"나는 할 수 있다"는 근거 만들기', description: '자기 효능감 = "나는 해낼 수 있다"는\n구체적 믿음. 막연한 자신감과 달라.\n\n4가지 원천:\n1. 성공 경험 (직접 해본 것)\n2. 대리 경험 (비슷한 사람의 성공)\n3. 격려 (신뢰하는 사람의 응원)\n4. 몸 상태 (컨디션 관리)' },
      { type: 'summary', keywords: [
        { icon: '💪', label: '효능감', description: '"해낼 수 있다"는 구체적 믿음' },
        { icon: '🏆', label: '성공 경험', description: '작은 성공을 쌓아 근거 만들기' },
        { icon: '👀', label: '대리 경험', description: '비슷한 사람이 했으면 나도' },
        { icon: '📣', label: '격려', description: '신뢰하는 사람의 응원' },
      ]},
      { type: 'example', bad: { label: '낮은 효능감', story: '"어차피 못 할 거야."\n시도조차 안 하니 근거가 계속 0.\n할 수 있다는 믿음이 생길 리 없다.' }, good: { label: '효능감 구축', story: '"지난번 작은 발표를 해냈잖아.\n이번에도 할 수 있어."\n성공 경험이 자기 효능감의 근거가 됐다.' }},
      { type: 'ox', statement: '자기 효능감은 선천적인 성격이다.', answer: false, feedback: '경험으로 만드는 거야!\n작은 성공을 쌓으면 누구나 키울 수 있어.' },
      { type: 'multipleChoice', question: '자기 효능감을 가장 강하게 높이는 것은?', options: ['남의 칭찬', '직접 해낸 성공 경험', '이론 공부', '성격 바꾸기'], correctIndex: 1, explanation: '직접 해본 경험이 가장 강력한 근거!\n그래서 작은 도전부터 시작하는 게 중요해.' },
      { type: 'feedback', summary: '자기 효능감 = 작은 성공이 만드는 큰 믿음', message: '작게 시작하고 성공을 쌓아가자!' },
      { type: 'mission', mission: '과거 성공 경험 3가지를 적고 "나는 이것을 해냈다" 선언하기', encouragement: '증거가 쌓이면 믿음이 된다!' },
    ],
  },

  'selfAwareness-platinum-9': {
    id: 'selfAwareness-platinum-9', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 9,
    title: '무의식 패턴 해독',
    cards: [
      { type: 'concept', title: '반복되는 패턴에 숨은 무의식', description: '같은 유형의 사람과 갈등.\n같은 상황에서 같은 실수.\n같은 감정이 반복.\n\n이건 우연이 아니야.\n무의식적 패턴이 작동하는 거야.\n\n패턴을 발견하면\n"자동 반복"에서 벗어날 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🔁', label: '반복 패턴', description: '같은 상황이 계속 되풀이' },
        { icon: '🧠', label: '무의식', description: '의식하지 못하는 자동 프로그램' },
        { icon: '🔍', label: '패턴 발견', description: '반복에서 공통점 찾기' },
        { icon: '🔓', label: '해방', description: '알면 자동 반복에서 벗어남' },
      ]},
      { type: 'example', bad: { label: '패턴 반복', story: '매번 비슷한 유형의 친구와 갈등.\n"나는 왜 항상 이런 사람만 만나?"\n원인을 모르니 계속 반복.' }, good: { label: '패턴 해독', story: '"나는 거절을 못해서 무리한 부탁을\n받아주다가 터지는 패턴이구나!"\n패턴을 알고 나서 거절 연습을 시작했다.' }},
      { type: 'ox', statement: '같은 실수를 반복하는 건 의지가 약해서이다.', answer: false, feedback: '의지 문제가 아니라 무의식 패턴이야!\n패턴을 인식해야 바꿀 수 있어.' },
      { type: 'multipleChoice', question: '무의식 패턴을 발견하는 가장 좋은 방법은?', options: ['다른 사람 탓하기', '반복되는 상황의 공통점을 기록하고 분석하기', '생각 안 하기', '매번 환경을 바꾸기'], correctIndex: 1, explanation: '기록 + 분석! 3번 이상 반복되면\n거기에 무의식 패턴이 있다.' },
      { type: 'apply', question: '최근 반복되는 상황이나 감정 패턴이 있나요? 공통점은 무엇인가요?', placeholder: '반복 상황: ...\n공통점: ...\n숨은 패턴: ...' },
      { type: 'feedback', summary: '반복 = 무의식의 신호. 패턴을 읽으면 자유', message: '패턴을 아는 것이 자동 반복을 깨는 첫걸음!' },
      { type: 'mission', mission: '내 인생에서 3번 이상 반복된 상황을 찾고 공통점 분석하기', encouragement: '패턴을 깨는 사람이 운명을 바꿔!' },
    ],
  },

  'selfAwareness-platinum-10': {
    id: 'selfAwareness-platinum-10', chapterKey: 'selfAwareness', tierKey: 'platinum', stageNumber: 10,
    title: '자기인식 실전 통합',
    cards: [
      { type: 'concept', title: '플래티넘 기법을 일상에 녹이기', description: '지금까지 배운 고급 기법 정리:\n\n1. 자기 객관화 (3인칭)\n2. 감정 세분화 (30가지+)\n3. 투사 점검 (내 감정인가?)\n4. 역할과 정체성 분리\n5. 신체-감정-사고 삼각형\n\n핵심: 상황에 맞는 도구를 골라 쓰기!' },
      { type: 'summary', keywords: [
        { icon: '🔭', label: '객관화', description: '3인칭 거리두기' },
        { icon: '🔬', label: '세분화', description: '정밀한 감정 구분' },
        { icon: '🪞', label: '투사 점검', description: '내 감정을 남에게 씌우지 않기' },
        { icon: '🔺', label: '삼각형', description: '몸·감정·생각 중 하나 바꾸기' },
      ]},
      { type: 'example', bad: { label: '도구 방치', story: '배운 건 많지만 쓰질 않으니\n여전히 감정에 끌려다녔다.' }, good: { label: '실전 통합', story: '감정 올라옴 → 세분화(정확히 뭐지?)\n→ 투사 점검(진짜 원인은?) → 삼각형(몸 먼저!)\n상황별로 도구를 골라 쓰니 자유로워졌다.' }},
      { type: 'ox', statement: '모든 상황에 같은 기법을 써야 한다.', answer: false, feedback: '상황마다 맞는 도구가 달라!\n여러 도구를 갖고 유연하게 쓰는 게 핵심.' },
      { type: 'multipleChoice', question: '갈등 상황에서 "내 감정이 아닌 것 같다"고 느낄 때 쓸 기법은?', options: ['감정 세분화', '투사 점검', '자기 효능감', '성장 마인드셋'], correctIndex: 1, explanation: '투사일 수 있어! 내 감정의 진짜 출처를 점검해야 해.' },
      { type: 'apply', question: '가장 자주 쓸 것 같은 플래티넘 기법 TOP 3를 골라보세요.', placeholder: '1위: ...\n2위: ...\n3위: ...' },
      { type: 'feedback', summary: '상황별로 도구를 골라 쓰는 것이 진짜 실력', message: '플래티넘 완료! 자기인식의 전문가가 되어가고 있어!' },
      { type: 'mission', mission: '이번 주 매일 다른 플래티넘 기법 1개씩 실전 적용하기', encouragement: '도구를 쓸수록 자기인식이 자동화돼!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (자기인식 마스터리) 1~10
  // ═══════════════════════════════════════

  'selfAwareness-diamond-1': {
    id: 'selfAwareness-diamond-1', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 1,
    title: '알아차림의 알아차림',
    cards: [
      { type: 'concept', title: '메타-메타인지의 세계', description: '메타인지 = 생각을 생각하기.\n메타-메타인지 = 그 과정 자체를 관찰.\n\n"지금 나는 내 감정을 관찰하고 있는데\n그 관찰이 진짜 객관적인가?"\n\n관찰자도 편향이 있어.\n관찰하는 나마저 관찰하는 것.\n이것이 자기인식의 최고 단계!' },
      { type: 'summary', keywords: [
        { icon: '🔭', label: '메타-메타', description: '관찰하는 나를 관찰하기' },
        { icon: '🪞', label: '거울의 거울', description: '반영의 반영' },
        { icon: '⚠️', label: '관찰자 편향', description: '관찰자도 왜곡할 수 있다' },
        { icon: '🏔️', label: '최고 단계', description: '자기인식의 정점' },
      ]},
      { type: 'example', bad: { label: '관찰자 착각', story: '"나는 객관적으로 보고 있어."\n하지만 자기 방어 편향으로\n불편한 진실을 무의식적으로 피하고 있었다.' }, good: { label: '메타-메타인지', story: '"지금 내가 객관적이라고 느끼는 건\n혹시 방어기제는 아닐까?"\n한 겹 더 깊이 점검하니 진짜가 보였다.' }},
      { type: 'ox', statement: '자기인식이 높은 사람은 자기 편향을 완전히 없앨 수 있다.', answer: false, feedback: '완전히 없앨 순 없어!\n하지만 "있을 수 있다"는 자각이 핵심이야.' },
      { type: 'multipleChoice', question: '메타-메타인지가 필요한 이유는?', options: ['복잡하게 생각하면 멋있어서', '자기 관찰에도 편향이 있을 수 있으므로', '남에게 보여주려고', '감정을 안 느끼려고'], correctIndex: 1, explanation: '관찰자도 완벽하지 않아!\n관찰의 질을 점검하는 것이 진정한 마스터.' },
      { type: 'feedback', summary: '관찰하는 나마저 관찰하기 = 자기인식의 정점', message: '한 겹 더 깊이 들어가면 진짜가 보여!' },
      { type: 'mission', mission: '오늘 자기 관찰을 한 뒤 "이 관찰은 객관적이었나?" 한 번 더 점검하기', encouragement: '마스터는 관찰의 관찰까지 한다!' },
    ],
  },

  'selfAwareness-diamond-2': {
    id: 'selfAwareness-diamond-2', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 2,
    title: '방어기제 마스터',
    cards: [
      { type: 'concept', title: '무의식이 나를 보호하는 방식', description: '방어기제 = 마음이 불안에서\n스스로를 보호하는 무의식 전략.\n\n합리화: "어차피 안 하려 했어"\n부정: "별로 안 슬퍼"\n승화: 분노를 운동으로 전환\n\n건강한 것도, 해로운 것도 있어.\n핵심은 알아차리는 것!' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '방어기제', description: '마음의 자동 보호 시스템' },
        { icon: '🤥', label: '합리화', description: '변명으로 불안 회피' },
        { icon: '🙈', label: '부정', description: '현실을 인정하지 않음' },
        { icon: '🎨', label: '승화', description: '부정 에너지를 생산적으로 전환' },
      ]},
      { type: 'example', bad: { label: '방어기제에 지배', story: '시험 망쳤는데 "문제가 이상했어" (합리화).\n매번 변명하니 실력이 안 늘었다.' }, good: { label: '방어기제 인식', story: '"합리화하고 있네. 솔직히 준비 부족이었어."\n방어기제를 알아차리고 진짜 원인을 마주했다.' }},
      { type: 'ox', statement: '방어기제는 무조건 나쁜 것이다.', answer: false, feedback: '승화처럼 건강한 방어기제도 있어!\n문제는 해로운 기제를 모르고 쓰는 것.' },
      { type: 'multipleChoice', question: '가장 건강한 방어기제는?', options: ['부정 (안 일어난 척)', '합리화 (변명)', '승화 (에너지 전환)', '퇴행 (어린아이처럼 행동)'], correctIndex: 2, explanation: '승화는 부정적 에너지를 창작, 운동 등\n생산적 활동으로 바꾸는 건강한 기제!' },
      { type: 'feedback', summary: '방어기제 인식 = 진짜 나를 마주하는 용기', message: '알면 지배당하지 않고 선택할 수 있어!' },
      { type: 'mission', mission: '최근 변명이나 회피를 한 순간을 떠올리고 어떤 방어기제였는지 분류하기', encouragement: '방어기제를 아는 것이 진짜 용기야!' },
    ],
  },

  'selfAwareness-diamond-3': {
    id: 'selfAwareness-diamond-3', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 3,
    title: '자기 서사 재구성',
    cards: [
      { type: 'concept', title: '내 인생 이야기를 다시 쓰기', description: '우리는 각자 "내 이야기"를 갖고 있어.\n\n"나는 불운한 사람"\n"나는 늘 뒤처지는 사람"\n\n하지만 같은 사건도\n이야기 방식에 따라 의미가 달라져.\n\n"실패의 연속" → "도전의 기록"\n서사를 바꾸면 정체성이 바뀐다!' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '자기 서사', description: '내가 나에 대해 하는 이야기' },
        { icon: '✏️', label: '재구성', description: '같은 사건, 다른 의미 부여' },
        { icon: '🔄', label: '관점 전환', description: '피해자 → 주인공으로' },
        { icon: '🌟', label: '정체성', description: '이야기가 정체성을 만든다' },
      ]},
      { type: 'example', bad: { label: '부정적 서사', story: '"어릴 때 왕따당해서 나는 사회성이 없어."\n과거에 갇혀 새 관계를 시도하지 않았다.' }, good: { label: '서사 재구성', story: '"그 경험으로 사람의 아픔을 잘 이해하게 됐어.\n그래서 지금 좋은 친구가 될 수 있는 거야."\n같은 과거, 다른 의미.' }},
      { type: 'ox', statement: '과거 경험은 무조건 나를 결정한다.', answer: false, feedback: '과거 사건은 바꿀 수 없지만\n그 의미는 바꿀 수 있어! 서사의 힘이야.' },
      { type: 'multipleChoice', question: '자기 서사 재구성의 핵심은?', options: ['과거를 잊기', '과거 사건의 의미를 재해석하기', '다른 사람의 이야기 따라하기', '과거를 부정하기'], correctIndex: 1, explanation: '사건은 못 바꿔도 해석은 바꿀 수 있어!\n"상처"를 "성장의 씨앗"으로 재해석.' },
      { type: 'apply', question: '나를 힘들게 한 과거 경험 1개를 성장 관점으로 다시 써보세요.', placeholder: '사건: ...\n기존 해석: ...\n새로운 해석: ...' },
      { type: 'feedback', summary: '자기 서사 = 내 이야기를 내가 다시 쓸 수 있다', message: '나는 내 인생의 작가이자 주인공이야!' },
      { type: 'mission', mission: '"내 인생에서 가장 힘들었던 사건"을 성장 서사로 다시 한 줄 쓰기', encouragement: '이야기를 바꾸면 미래가 바뀐다!' },
    ],
  },

  'selfAwareness-diamond-4': {
    id: 'selfAwareness-diamond-4', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 4,
    title: '상황적 자기인식',
    cards: [
      { type: 'concept', title: '나는 상황에 따라 달라진다', description: '집에서의 나 ≠ 학교에서의 나\n친구 앞의 나 ≠ 어른 앞의 나\n\n이건 가식이 아니라 자연스러운 거야.\n\n핵심은 "어떤 상황에서\n어떤 나가 나오는지" 아는 것.\n상황별 나를 알면 관계가 편해져!' },
      { type: 'summary', keywords: [
        { icon: '🔀', label: '상황적', description: '맥락에 따라 달라지는 나' },
        { icon: '🎭', label: '다면성', description: '여러 모습 = 자연스러움' },
        { icon: '📊', label: '패턴 맵', description: '상황별 반응 패턴 정리' },
        { icon: '🤝', label: '관계', description: '상대에 따라 다른 나' },
      ]},
      { type: 'example', bad: { label: '혼란', story: '"친구 앞에선 밝은데 집에선 조용해.\n나는 어떤 게 진짜야?"\n정체성 혼란.' }, good: { label: '상황적 인식', story: '"친구 앞의 밝은 나도 진짜,\n집에서 조용한 나도 진짜야.\n상황에 따라 다른 면이 나오는 거지."\n모든 모습이 나라는 걸 수용.' }},
      { type: 'ox', statement: '진짜 나는 하나의 일관된 모습이어야 한다.', answer: false, feedback: '사람은 다면적이야!\n상황별로 다른 건 가식이 아니라 자연스러움.' },
      { type: 'multipleChoice', question: '상황적 자기인식이 높은 사람의 특징은?', options: ['모든 상황에서 똑같이 행동', '상황별로 다른 자신의 모습을 이해하고 수용', '항상 남에게 맞춤', '감정을 숨김'], correctIndex: 1, explanation: '다양한 나를 이해하고 수용!\n어떤 상황에서 어떤 내가 나오는지 아는 것이 핵심.' },
      { type: 'feedback', summary: '상황마다 다른 나 = 다 진짜 나', message: '다면적인 나를 수용하는 것이 성숙이야!' },
      { type: 'mission', mission: '3가지 상황(집/학교/친구)에서 각각 어떤 내가 나오는지 적어보기', encouragement: '모든 면이 나라는 걸 인정하면 편해져!' },
    ],
  },

  'selfAwareness-diamond-5': {
    id: 'selfAwareness-diamond-5', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 5,
    title: '자기 수용의 깊은 차원',
    cards: [
      { type: 'concept', title: '있는 그대로의 나를 받아들이기', description: '자기인식의 끝은 자기 수용이야.\n\n강점도, 약점도,\n밝은 면도, 어두운 면도,\n이상적 나와 현실의 나 사이 차이도.\n\n모두 포함한 것이 "나"야.\n\n바꾸려는 노력은 하되\n바꾸기 전의 나도 충분히 괜찮다.' },
      { type: 'summary', keywords: [
        { icon: '🤗', label: '수용', description: '있는 그대로 받아들이기' },
        { icon: '⚖️', label: '균형', description: '수용 + 성장 노력 동시에' },
        { icon: '💎', label: '완전함', description: '불완전한 그대로 완전하다' },
        { icon: '☮️', label: '평화', description: '자기 전쟁을 끝내기' },
      ]},
      { type: 'example', bad: { label: '자기 거부', story: '"이런 내가 싫어. 완전히 달라져야 해."\n자기와의 전쟁. 지치고 자존감 바닥.' }, good: { label: '자기 수용', story: '"완벽하진 않지만 나는 나야.\n부족한 부분도 인정하면서\n조금씩 성장하면 돼."\n평화 속에서 더 잘 성장했다.' }},
      { type: 'ox', statement: '자기 수용은 변화를 포기하는 것이다.', answer: false, feedback: '수용은 포기가 아니야!\n"지금의 나도 괜찮고, 더 나아질 수도 있다."\n이 둘은 공존해.' },
      { type: 'multipleChoice', question: '자기 수용의 핵심 태도는?', options: ['"나는 완벽해야 해"', '"나는 부족하니까 바꿔야 해"', '"지금의 나도 괜찮고, 성장도 할 수 있다"', '"나는 변할 수 없어"'], correctIndex: 2, explanation: '수용과 성장은 모순이 아니야!\n자기와 싸우지 않으면서 성장하는 것이 최선.' },
      { type: 'feedback', summary: '자기 수용 = 불완전한 나도 충분히 괜찮다', message: '나와 평화를 이루는 것이 가장 강한 힘!' },
      { type: 'mission', mission: '"지금의 내가 괜찮은 이유" 5가지 적기', encouragement: '수용이 진짜 변화의 시작점이야!' },
    ],
  },

  'selfAwareness-diamond-6': {
    id: 'selfAwareness-diamond-6', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 6,
    title: '관계 속 자기인식',
    cards: [
      { type: 'concept', title: '관계가 거울이 된다', description: '관계는 나를 비추는 거울이야.\n\n화나는 사람 → 내 그림자를 자극\n끌리는 사람 → 내 욕구를 반영\n반복되는 갈등 → 내 패턴을 보여줌\n\n모든 관계 경험이\n자기인식의 재료가 돼!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '관계 거울', description: '타인은 나를 비추는 거울' },
        { icon: '😡', label: '자극', description: '싫은 사람이 보여주는 내 그림자' },
        { icon: '💕', label: '끌림', description: '끌리는 사람이 보여주는 내 욕구' },
        { icon: '🔁', label: '패턴', description: '반복 갈등 = 내 과제' },
      ]},
      { type: 'example', bad: { label: '남 탓', story: '"저 사람이 문제야."\n모든 갈등을 상대 탓으로 돌리니\n같은 문제가 사람만 바뀌며 반복.' }, good: { label: '관계 거울', story: '"이 사람에게 유독 화가 나는 건\n내 안의 뭔가를 건드리기 때문이야."\n관계를 통해 나를 더 깊이 이해했다.' }},
      { type: 'ox', statement: '인간관계 갈등은 항상 상대방의 문제이다.', answer: false, feedback: '갈등 속에는 내 패턴도 있어!\n관계가 보여주는 나를 읽을 수 있어야 해.' },
      { type: 'multipleChoice', question: '같은 유형의 갈등이 사람만 바뀌며 반복될 때 점검할 것은?', options: ['상대방 성격', '나의 반복 패턴', '운이 나쁜 것', '환경'], correctIndex: 1, explanation: '사람이 바뀌어도 같은 갈등 = 내 패턴!\n관계가 보여주는 나의 과제야.' },
      { type: 'feedback', summary: '모든 관계는 자기인식의 재료', message: '관계 속에서 나를 읽는 것이 마스터!' },
      { type: 'mission', mission: '가장 자주 갈등하는 관계에서 "나의 패턴" 1가지 찾기', encouragement: '관계가 나를 가르쳐준다!' },
    ],
  },

  'selfAwareness-diamond-7': {
    id: 'selfAwareness-diamond-7', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 7,
    title: '시간축 자기인식',
    cards: [
      { type: 'concept', title: '과거·현재·미래의 나를 통합하기', description: '과거의 나: 어떻게 여기까지 왔는가\n현재의 나: 지금 어디에 있는가\n미래의 나: 어디로 가고 싶은가\n\n이 세 시점의 나를 연결하면\n"나는 어디서 와서 어디로 가는가"\n라는 인생 지도가 완성돼!' },
      { type: 'summary', keywords: [
        { icon: '⏪', label: '과거', description: '경험과 교훈의 축적' },
        { icon: '⏺️', label: '현재', description: '지금의 상태와 위치' },
        { icon: '⏩', label: '미래', description: '목표와 방향' },
        { icon: '🗺️', label: '인생 지도', description: '세 시점의 통합' },
      ]},
      { type: 'example', bad: { label: '분리된 시점', story: '과거 후회에 갇히고\n현재를 놓치고\n미래가 막막하다.\n세 시점이 따로 놀아 혼란.' }, good: { label: '시간축 통합', story: '"과거 실패에서 배운 것 → 현재 나의 강점 →\n미래에 활용할 방향"\n세 시점이 연결되니 인생이 읽혔다.' }},
      { type: 'ox', statement: '미래 계획만 잘 세우면 자기인식은 충분하다.', answer: false, feedback: '과거-현재-미래가 모두 연결되어야\n진짜 자기인식이야! 과거와 현재도 중요해.' },
      { type: 'multipleChoice', question: '시간축 자기인식에서 가장 중요한 것은?', options: ['과거 후회하기', '미래만 계획하기', '과거·현재·미래를 하나의 흐름으로 연결하기', '현재만 살기'], correctIndex: 2, explanation: '세 시점의 연결! 과거의 교훈 → 현재의 위치\n→ 미래의 방향이 하나의 이야기가 돼야 해.' },
      { type: 'apply', question: '과거-현재-미래의 나를 한 줄씩 정리해보세요.', placeholder: '과거의 나: ...\n현재의 나: ...\n미래의 나: ...' },
      { type: 'feedback', summary: '과거·현재·미래를 연결하면 인생 지도가 된다', message: '세 시점의 나를 통합하는 것이 지혜야!' },
      { type: 'mission', mission: '"5년 전 나 → 지금 나 → 5년 후 나"를 한 줄씩 적어 연결하기', encouragement: '시간이 만든 나를 이해하면 방향이 보여!' },
    ],
  },

  'selfAwareness-diamond-8': {
    id: 'selfAwareness-diamond-8', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 8,
    title: '자기인식과 타인 이해의 연결',
    cards: [
      { type: 'concept', title: '나를 알면 남을 이해한다', description: '자기인식의 궁극적 확장은\n타인 이해로 이어지는 거야.\n\n내 불안을 이해하면\n상대의 불안도 읽을 수 있어.\n\n내 욕구를 알면\n상대의 욕구도 공감할 수 있어.\n\n자기인식 → 공감 → 관계의 질 UP!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기인식', description: '나를 깊이 이해하기' },
        { icon: '🤝', label: '공감', description: '나의 경험으로 타인 이해' },
        { icon: '👥', label: '연결', description: '이해가 관계를 깊게 만듦' },
        { icon: '🌍', label: '확장', description: '나 → 타인 → 세상으로' },
      ]},
      { type: 'example', bad: { label: '자기만 아는 인식', story: '자기 감정은 잘 알지만\n남의 감정에는 무관심.\n관계가 일방적이 됐다.' }, good: { label: '인식의 확장', story: '"내가 무시당할 때 서운하듯\n저 사람도 지금 서운한 거구나."\n자기인식이 공감으로 확장되니 관계가 깊어졌다.' }},
      { type: 'ox', statement: '자기인식은 나만을 위한 것이다.', answer: false, feedback: '자기인식은 타인 이해의 기반이야!\n나를 알아야 남도 이해할 수 있어.' },
      { type: 'multipleChoice', question: '자기인식이 타인 이해로 확장되는 원리는?', options: ['남을 분석하기', '내 경험을 통해 상대의 감정을 유추하기', '남에게 조언하기', '감정을 숨기기'], correctIndex: 1, explanation: '내가 느껴본 감정이 있으니\n상대의 비슷한 감정을 이해할 수 있는 거야!' },
      { type: 'feedback', summary: '자기인식 → 공감 → 깊은 관계', message: '나를 아는 것이 세상을 아는 것의 시작!' },
      { type: 'mission', mission: '오늘 누군가의 행동 뒤에 숨은 감정/욕구를 "내 경험에 비춰" 추측해보기', encouragement: '자기인식이 공감이 되는 순간을 경험해봐!' },
    ],
  },

  'selfAwareness-diamond-9': {
    id: 'selfAwareness-diamond-9', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 9,
    title: '자기인식의 역설',
    cards: [
      { type: 'concept', title: '알수록 모르겠다는 깨달음', description: '진짜 자기인식의 경지는\n"나를 완전히 안다"가 아니라\n"나는 아직 모르는 게 많구나"야.\n\n소크라테스: "나는 내가 모른다는 것을 안다."\n\n겸손한 자기인식이\n가장 강력한 자기인식이야.\n이것이 자기인식의 역설!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '역설', description: '알수록 겸손해진다' },
        { icon: '🏛️', label: '소크라테스', description: '무지의 자각이 지혜' },
        { icon: '🌊', label: '무한', description: '자기인식은 끝이 없는 여정' },
        { icon: '🙏', label: '겸손', description: '모른다는 자각이 진짜 앎' },
      ]},
      { type: 'example', bad: { label: '과신', story: '"나는 나를 완벽히 알아."\n자기 확신에 빠져 피드백을 안 들음.\n성장이 멈췄다.' }, good: { label: '겸손한 인식', story: '"많이 알게 됐지만 아직 모르는 나가 있겠지."\n열린 태도로 계속 배우니 끝없이 성장.' }},
      { type: 'ox', statement: '자기인식이 완성되는 순간이 있다.', answer: false, feedback: '자기인식은 평생의 여정!\n완성이 있다고 생각하면 성장이 멈춰.' },
      { type: 'multipleChoice', question: '자기인식의 역설이 의미하는 것은?', options: ['자기인식은 불가능하다', '많이 알수록 겸손해지고, 그 겸손이 더 깊은 인식을 가능케 한다', '자기인식은 시간 낭비다', '완벽하게 알아야 의미가 있다'], correctIndex: 1, explanation: '겸손 → 열린 태도 → 더 깊은 인식\n→ 더 겸손 → 무한 성장 순환!' },
      { type: 'feedback', summary: '겸손한 자기인식이 가장 강력한 자기인식', message: '"모르는 게 있다"는 자각이 지혜의 시작!' },
      { type: 'mission', mission: '"내가 아직 모르는 나"에 대해 3가지 질문 만들기', encouragement: '좋은 질문이 있는 한 성장은 계속된다!' },
    ],
  },

  'selfAwareness-diamond-10': {
    id: 'selfAwareness-diamond-10', chapterKey: 'selfAwareness', tierKey: 'diamond', stageNumber: 10,
    title: '나를 아는 것이 세상을 바꾼다',
    cards: [
      { type: 'concept', title: '50단계 마스터 완주', description: '브론즈: 감정 알아차리기\n실버: 감정 이해·조절\n골드: 감정 활용·표현\n플래티넘: 고급 기법·패턴 해독\n다이아: 통합·철학·확장\n\n50개 레슨을 통해\n나를 아는 여정의 기반을 완성했어.\n\n이제 자기인식은 기술이 아니라\n너의 삶의 방식이야!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '인식', description: '알아차리기에서 시작' },
        { icon: '🧠', label: '이해', description: '깊이 파고들기' },
        { icon: '🛠️', label: '기술', description: '도구로 다루기' },
        { icon: '💎', label: '지혜', description: '삶의 방식으로 통합' },
      ]},
      { type: 'example', bad: { label: '수료만 하기', story: '50단계 다 들었지만\n일상에서 안 쓰면 의미 없다.\n지식만 쌓이고 변화는 없었다.' }, good: { label: '삶에 통합', story: '매 순간 감정을 알아차리고\n관계에서 패턴을 읽고\n겸손하게 계속 배우는 삶.\n자기인식이 삶 자체가 됐다.' }},
      { type: 'ox', statement: '이 과정을 마치면 더 이상 배울 것이 없다.', answer: false, feedback: '이건 끝이 아니라 진짜 시작이야!\n50단계는 평생 여정의 기반일 뿐.' },
      { type: 'multipleChoice', question: '50단계를 마친 뒤 가장 중요한 것은?', options: ['새로운 이론 공부', '배운 것을 일상에서 매일 실천하기', '남에게 가르치기만 하기', '더 이상 노력하지 않기'], correctIndex: 1, explanation: '일상 실천이 핵심! 알고 + 하는 것이\n진짜 자기인식이야.' },
      { type: 'apply', question: '50단계를 마친 지금, 나만의 자기인식 한 줄 철학을 완성해보세요.', placeholder: '나의 자기인식 철학: ...' },
      { type: 'feedback', summary: '자기인식 = 평생의 여정, 삶의 방식', message: '다이아 완료! 50단계를 완주한 너, 진짜 대단해!' },
      { type: 'mission', mission: '"나의 자기인식 마스터 선언문"을 적고 매일 보이는 곳에 두기', encouragement: '나를 아는 것이 세상을 바꾸는 첫걸음이야!' },
    ],
  },

}
