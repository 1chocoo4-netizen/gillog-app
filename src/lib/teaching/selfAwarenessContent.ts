// 자기인식 챕터 학습 콘텐츠 (브론즈)
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

}
