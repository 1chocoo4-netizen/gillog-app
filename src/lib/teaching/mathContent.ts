// 수학 영역 학습 콘텐츠 (브론즈 1~10, 실버 1~10, 골드 1~10, 플래티넘 1~10, 다이아 1~10)
import type { Stage } from './lessonData'

export const MATH_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (수학 공부법 기초) 1~10
  // ═══════════════════════════════════════

  'math-bronze-1': {
    id: 'math-bronze-1',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 1,
    title: '수학적 사고란 무엇인가',
    cards: [
      { type: 'concept', title: '수학적 사고의 본질', description: '수학은 단순 계산이 아니야.\n논리적으로 생각하고, 패턴을 찾고,\n문제를 구조화하는 능력이야.\n\n수학적 사고의 3단계:\n1) 문제 이해 — 뭘 묻고 있는지 파악\n2) 전략 수립 — 어떤 방법으로 풀지 계획\n3) 실행·검증 — 풀고 나서 답이 맞는지 확인\n\n이 과정이 곧 "문제 해결력"이야.\n수학뿐 아니라 일상에서도 쓰이는 힘이지.' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '논리적 사고', description: '원인과 결과를 따지며 생각하는 힘' },
        { icon: '🔍', label: '패턴 인식', description: '반복되는 규칙을 찾아내는 능력' },
        { icon: '🏗️', label: '구조화', description: '복잡한 문제를 단계별로 나누는 기술' },
        { icon: '✅', label: '검증 습관', description: '풀이 후 반드시 답을 확인하는 태도' },
      ]},
      { type: 'example', bad: { label: '민수의 방법', story: '문제를 보자마자 공식에 숫자를 대입했다.\n왜 그 공식을 쓰는지 몰라서 비슷한 문제도 못 풀었다.' }, good: { label: '지은의 방법', story: '문제를 먼저 읽고 "뭘 구해야 하지?"를 정리했다.\n어떤 개념이 필요한지 찾은 후 풀었더니 응용 문제도 풀렸다.' }},
      { type: 'ox', statement: '수학을 잘하려면 공식을 많이 외우는 것이 가장 중요하다.', answer: false, feedback: '공식 암기보다 "왜 이 공식이 나왔는지"\n원리를 이해하는 게 더 중요해.\n이해하면 공식을 잊어도 다시 유도할 수 있어!' },
      { type: 'multipleChoice', question: '수학적 사고의 3단계 순서로 올바른 것은?', options: ['실행 → 이해 → 전략', '이해 → 전략 → 실행·검증', '전략 → 실행 → 이해', '암기 → 반복 → 시험'], correctIndex: 1, explanation: '문제를 먼저 이해하고, 풀이 전략을 세운 뒤,\n실행하고 검증하는 순서가 올바른 수학적 사고야.' },
      { type: 'feedback', summary: '수학 = 암기가 아닌 사고하는 과목', message: '오늘부터 문제를 풀기 전에 30초만 생각해보자.\n"이 문제가 뭘 원하는 거지?" 이 질문이 수학 실력의 시작이야!' },
      { type: 'mission', mission: '오늘 수학 문제 1개를 골라서\n풀기 전에 "이 문제가 묻는 것"과 "사용할 개념"을\n먼저 노트에 적어본 뒤 풀어보기', encouragement: '생각하는 습관이 수학 천재를 만든다!' },
    ],
  },

  'math-bronze-2': {
    id: 'math-bronze-2',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 2,
    title: '개념 이해 vs 문제 풀이',
    cards: [
      { type: 'concept', title: '개념 먼저, 문제는 나중에', description: '많은 학생들이 개념 공부를 건너뛰고\n바로 문제 풀이에 들어가.\n\n하지만 개념 이해 없는 문제 풀이는\n모래 위에 집 짓기와 같아.\n\n효과적인 순서:\n1) 교과서로 개념 읽기 (왜?를 생각하며)\n2) 개념을 자기 말로 설명해보기\n3) 기본 문제로 개념 확인\n4) 응용 문제로 확장\n\n"남에게 설명할 수 있으면 이해한 것"이야.' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '개념 먼저', description: '교과서의 정의와 원리를 먼저 이해하기' },
        { icon: '🗣️', label: '설명하기', description: '배운 개념을 자기 말로 설명해보는 연습' },
        { icon: '📝', label: '기본 문제', description: '개념 확인용 쉬운 문제부터 시작' },
        { icon: '🚀', label: '응용 확장', description: '기본이 되면 응용·심화로 넘어가기' },
      ]},
      { type: 'example', bad: { label: '현우의 방법', story: '교과서는 안 보고 문제집만 풀었다.\n풀이를 외워서 시험에서 숫자만 바뀌면 틀렸다.' }, good: { label: '소영의 방법', story: '새 단원은 교과서를 먼저 읽고\n핵심 개념을 노트에 자기 말로 정리했다.\n문제를 풀 때 "아, 이 개념이구나" 하고 연결되었다.' }},
      { type: 'ox', statement: '문제를 많이 풀면 자연스럽게 개념도 이해된다.', answer: false, feedback: '문제만 많이 풀면 패턴 암기는 되지만\n진짜 이해는 안 돼.\n개념을 먼저 이해하고 문제로 확인하는 게 맞아!' },
      { type: 'multipleChoice', question: '"내가 이 개념을 이해했는지" 확인하는 가장 좋은 방법은?', options: ['문제를 10개 이상 풀어본다', '친구에게 그 개념을 설명해본다', '공식을 3번 이상 쓴다', '형광펜으로 밑줄을 긋는다'], correctIndex: 1, explanation: '남에게 설명할 수 있으면 진짜 이해한 거야.\n이것이 "파인만 학습법"의 핵심이야!' },
      { type: 'feedback', summary: '개념 이해 → 자기 말로 설명 → 문제 풀이', message: '개념 이해에 시간을 투자하면\n문제 풀이 시간은 오히려 줄어들어.\n급할수록 돌아가자!' },
      { type: 'mission', mission: '오늘 배운 수학 개념 하나를\n친구나 가족에게 1분 안에 설명해보기\n(또는 혼자 소리 내어 설명해보기)', encouragement: '설명할 수 있으면, 시험에서도 풀 수 있어!' },
    ],
  },

  'math-bronze-3': {
    id: 'math-bronze-3',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 3,
    title: '문제 풀이 전략 세우기',
    cards: [
      { type: 'concept', title: '폴리아의 4단계 문제 해결법', description: '수학자 조지 폴리아가 제시한 문제 해결 4단계:\n\n1단계 — 이해: 구하는 것, 주어진 것, 조건 파악\n2단계 — 계획: 어떤 방법으로 풀지 전략 세우기\n3단계 — 실행: 계획대로 풀어보기\n4단계 — 반성: 답이 맞는지, 다른 방법은 없는지 확인\n\n특히 1단계와 4단계를 건너뛰는 학생이 많아.\n문제를 "천천히 읽는 것"만으로도 정답률이 올라!' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '이해', description: '문제가 묻는 것과 조건을 정확히 파악' },
        { icon: '🗺️', label: '계획', description: '풀이 방법과 사용할 개념을 미리 구상' },
        { icon: '✏️', label: '실행', description: '계획에 따라 차근차근 풀기' },
        { icon: '🔄', label: '반성', description: '답 확인 + 다른 풀이법 생각해보기' },
      ]},
      { type: 'example', bad: { label: '준호의 방법', story: '문제를 대충 읽고 바로 풀기 시작했다.\n조건을 빠뜨려서 계산은 맞았는데 답은 틀렸다.' }, good: { label: '예진의 방법', story: '문제를 두 번 읽고 구하는 것에 밑줄, 조건에 동그라미 쳤다.\n어떤 공식을 쓸지 정한 후 풀었더니 실수가 줄었다.' }},
      { type: 'ox', statement: '수학 문제는 빨리 풀수록 실력이 좋은 것이다.', answer: false, feedback: '빠른 것보다 정확한 것이 중요해.\n문제를 천천히 정확하게 푸는 습관이\n결국 속도도 올려줘!' },
      { type: 'multipleChoice', question: '폴리아의 문제 해결 4단계 중 학생들이 가장 자주 건너뛰는 단계는?', options: ['이해와 반성', '계획과 실행', '실행과 반성', '이해와 계획'], correctIndex: 0, explanation: '많은 학생이 문제를 대충 읽고(이해 생략) 바로 풀고,\n답 확인도 안 해(반성 생략).\n이 두 단계가 정답률을 크게 좌우해!' },
      { type: 'feedback', summary: '이해 → 계획 → 실행 → 반성, 4단계를 습관화', message: '문제를 풀기 전 30초 생각, 풀고 나서 30초 확인.\n이 1분의 투자가 정답률을 확 높여줘!' },
      { type: 'mission', mission: '수학 문제 3개를 풀되, 각 문제마다\n①구하는 것 ②사용할 개념 ③풀이 ④답 확인\n4단계를 노트에 적으며 풀어보기', encouragement: '처음엔 느려도, 이 습관이 실력을 폭발시켜!' },
    ],
  },

  'math-bronze-4': {
    id: 'math-bronze-4',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 4,
    title: '오답 노트의 힘',
    cards: [
      { type: 'concept', title: '오답 노트 = 최고의 수학 교재', description: '틀린 문제는 "내가 모르는 것"을 알려주는 보물이야.\n\n효과적인 오답 노트 작성법:\n1) 문제 다시 적기\n2) 내가 푼 풀이 적기 (틀린 그대로)\n3) 어디서 왜 틀렸는지 분석\n4) 올바른 풀이 적기\n5) 비슷한 유형 1문제 더 풀기\n\n핵심은 "왜 틀렸는지" 분석이야.\n계산 실수? 개념 부족? 문제 오독?\n원인을 알아야 같은 실수를 안 해!' },
      { type: 'summary', keywords: [
        { icon: '❌', label: '틀린 풀이', description: '내가 실제로 쓴 틀린 풀이를 기록' },
        { icon: '🔎', label: '원인 분석', description: '계산 실수·개념 부족·문제 오독 구분' },
        { icon: '⭕', label: '올바른 풀이', description: '정확한 풀이를 다시 작성' },
        { icon: '🔁', label: '유사 문제', description: '비슷한 유형으로 복습하여 완전 습득' },
      ]},
      { type: 'example', bad: { label: '태현의 방법', story: '틀린 문제는 빨간 펜으로 답만 고쳤다.\n다음 시험에서 똑같은 유형을 또 틀렸다.' }, good: { label: '수빈의 방법', story: '오답 노트에 틀린 이유를 "개념 부족"으로 분류했다.\n해당 개념을 다시 공부하고 유사 문제를 3개 더 풀었다.\n다음 시험에서 그 유형을 완벽히 맞았다.' }},
      { type: 'ox', statement: '오답 노트는 모든 틀린 문제를 다 적어야 효과가 있다.', answer: false, feedback: '모든 문제를 다 적으면 지쳐서 포기해.\n"왜 틀렸는지 모르겠는 문제"와\n"같은 유형을 반복해서 틀리는 문제"만 적으면 돼!' },
      { type: 'multipleChoice', question: '오답 노트에서 가장 중요한 부분은?', options: ['문제를 예쁘게 옮겨 적기', '왜 틀렸는지 원인 분석', '올바른 답 외우기', '선생님 풀이를 그대로 베끼기'], correctIndex: 1, explanation: '"왜 틀렸는지"를 분석해야 같은 실수를 반복하지 않아.\n원인을 모르면 오답 노트를 써도 효과가 없어!' },
      { type: 'feedback', summary: '오답 노트 = 원인 분석 + 유사 문제 복습', message: '오답 노트는 시험 전날 최고의 복습 자료가 돼.\n내 약점만 모아놓은 맞춤형 교재인 셈이야!' },
      { type: 'mission', mission: '최근에 틀린 수학 문제 1개를 골라서\n①틀린 풀이 ②원인 분석 ③올바른 풀이를\n노트에 정리해보기', encouragement: '오답 하나를 제대로 분석하면, 유사 문제 10개가 맞아!' },
    ],
  },

  'math-bronze-5': {
    id: 'math-bronze-5',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 5,
    title: '수학 불안감 극복하기',
    cards: [
      { type: 'concept', title: '수학 불안(Math Anxiety)', description: '수학 문제를 보면 머리가 하얘지는 경험, 있지?\n이게 "수학 불안(Math Anxiety)"이야.\n\n뇌 과학적으로 보면:\n불안 → 편도체 활성화 → 작업 기억 방해\n→ 실제로 문제를 못 풀게 됨\n\n즉, 실력이 없어서가 아니라\n불안감이 실력 발휘를 막는 거야!\n\n극복법:\n1) "틀려도 괜찮아"라고 스스로에게 말하기\n2) 쉬운 문제부터 시작해서 자신감 쌓기\n3) 심호흡 후 문제 읽기\n4) 수학을 게임처럼 도전으로 바라보기' },
      { type: 'summary', keywords: [
        { icon: '😰', label: '수학 불안', description: '수학 앞에서 머리가 하얘지는 현상' },
        { icon: '🧠', label: '작업 기억', description: '불안이 뇌의 문제 풀이 공간을 차지함' },
        { icon: '💪', label: '자신감 먼저', description: '쉬운 문제로 성공 경험을 쌓기' },
        { icon: '🎮', label: '게임 마인드', description: '틀려도 다시 도전하는 태도' },
      ]},
      { type: 'example', bad: { label: '하영의 경우', story: '"나는 수학을 못해"라고 믿으며 문제를 펼쳤다.\n불안해서 아는 문제도 못 풀고 시험 결과가 더 나빠졌다.' }, good: { label: '도윤의 경우', story: '시험 전에 심호흡 3번 하고 "할 수 있다"를 반복했다.\n쉬운 문제부터 풀어 자신감을 쌓으니 어려운 문제도 도전할 수 있었다.' }},
      { type: 'ox', statement: '수학 시험에서 긴장하면 실력이 없는 것이다.', answer: false, feedback: '긴장은 실력과 별개야!\n불안을 관리하는 방법을 배우면\n원래 실력을 발휘할 수 있어.' },
      { type: 'multipleChoice', question: '수학 불안을 극복하는 가장 효과적인 방법은?', options: ['어려운 문제를 억지로 많이 풀기', '수학을 아예 포기하기', '쉬운 문제로 성공 경험을 쌓으며 자신감 키우기', '시험을 안 보기'], correctIndex: 2, explanation: '작은 성공이 자신감을 만들고,\n자신감이 불안을 줄여줘.\n쉬운 것부터 차근차근이 최고의 처방이야!' },
      { type: 'feedback', summary: '수학 불안 = 실력 문제가 아닌 마음 문제', message: '네가 수학을 못하는 게 아니야.\n불안이 실력 발휘를 막고 있던 거야.\n오늘부터 "할 수 있다"고 말해보자!' },
      { type: 'mission', mission: '수학 문제 5개를 풀되,\n아주 쉬운 것 3개 → 보통 1개 → 도전 1개 순서로 풀어보기\n각 문제를 풀 때마다 "잘했어!"라고 스스로에게 말하기', encouragement: '작은 성공이 쌓여 큰 자신감이 돼!' },
    ],
  },

  'math-bronze-6': {
    id: 'math-bronze-6',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 6,
    title: '공식의 원리 이해하기',
    cards: [
      { type: 'concept', title: '공식은 외우는 게 아니라 이해하는 것', description: '삼각형 넓이 = 밑변 × 높이 ÷ 2\n\n왜 ÷2를 할까?\n직사각형의 대각선으로 자르면\n삼각형 2개가 나오니까!\n\n이처럼 공식에는 이유가 있어.\n이유를 알면:\n1) 공식을 잊어도 다시 유도 가능\n2) 응용 문제에 적용 가능\n3) 새로운 공식도 쉽게 이해\n\n"왜?"를 묻는 습관이\n수학 공식을 진짜 내 것으로 만들어줘.' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '"왜?" 질문', description: '공식이 나온 이유를 항상 생각하기' },
        { icon: '🔗', label: '유도 과정', description: '공식이 만들어지는 과정을 따라가기' },
        { icon: '🎨', label: '시각화', description: '그림이나 도형으로 공식의 의미 확인' },
        { icon: '💡', label: '응용력', description: '원리를 알면 변형 문제도 풀 수 있음' },
      ]},
      { type: 'example', bad: { label: '성민의 방법', story: '원의 넓이 = πr²을 무작정 외웠다.\n"반지름이 아니라 지름이 주어지면?" 하는 문제에서 막혔다.' }, good: { label: '유나의 방법', story: '원을 잘게 쪼개 펼치면 직사각형이 된다는 걸 이해했다.\n가로 = πr, 세로 = r → πr²이 나오는 원리를 알고 나니\n어떤 변형 문제도 풀 수 있었다.' }},
      { type: 'ox', statement: '수학 공식은 증명 과정을 몰라도 외우기만 하면 충분하다.', answer: false, feedback: '외우기만 하면 조금만 변형돼도 못 풀어.\n원리를 이해하면 공식을 잊어도\n다시 만들어낼 수 있어!' },
      { type: 'multipleChoice', question: '삼각형 넓이 공식에서 ÷2를 하는 이유는?', options: ['삼각형은 직사각형의 절반이니까', '변이 3개니까 3÷2를 반올림', '높이가 밑변의 절반이니까', '특별한 이유 없이 수학자가 정한 것'], correctIndex: 0, explanation: '직사각형을 대각선으로 자르면 삼각형 2개가 나와.\n그래서 직사각형 넓이 ÷ 2 = 삼각형 넓이야!' },
      { type: 'feedback', summary: '공식의 "왜?"를 알면 수학이 쉬워진다', message: '앞으로 새 공식을 만나면\n"왜 이렇게 되지?"를 먼저 생각해보자.\n이해한 공식은 절대 잊어버리지 않아!' },
      { type: 'mission', mission: '교과서에서 공식 1개를 골라\n"왜 이 공식이 성립하는지"를\n자기 말로 설명해보기 (그림도 그려보면 더 좋아!)', encouragement: '"왜?"를 묻는 순간, 수학이 재미있어진다!' },
    ],
  },

  'math-bronze-7': {
    id: 'math-bronze-7',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 7,
    title: '계산 실수 줄이기',
    cards: [
      { type: 'concept', title: '계산 실수의 유형과 대처법', description: '계산 실수는 "실력 부족"이 아니야.\n집중력과 습관의 문제야.\n\n주요 실수 유형:\n① 부호 실수: (-3) × (-2) = -6 (정답: +6)\n② 자리 실수: 23 × 4 = 82 (정답: 92)\n③ 옮기기 실수: 중간 계산을 옮길 때 숫자 변경\n④ 단위 실수: cm와 m을 헷갈림\n\n해결법:\n• 한 줄에 한 단계씩 쓰기\n• 중간 계산 생략하지 않기\n• 풀고 나서 역산으로 확인' },
      { type: 'summary', keywords: [
        { icon: '➖', label: '부호 실수', description: '음수×음수=양수 같은 부호 규칙 확인' },
        { icon: '📐', label: '자릿수 실수', description: '곱셈·나눗셈에서 자릿수 정렬 주의' },
        { icon: '✍️', label: '한 줄 한 단계', description: '풀이를 생략 없이 차근차근 적기' },
        { icon: '🔄', label: '역산 검증', description: '답을 원래 식에 대입해서 확인' },
      ]},
      { type: 'example', bad: { label: '재훈의 습관', story: '암산이 빠르다며 풀이를 생략했다.\n항상 "아 맞는데 계산 실수..."라고 했다.' }, good: { label: '민지의 습관', story: '모든 풀이를 한 줄씩 적고 마지막에 역산으로 확인했다.\n시험에서 계산 실수가 0개였다.' }},
      { type: 'ox', statement: '암산을 잘하면 계산 실수를 줄일 수 있다.', answer: false, feedback: '암산 능력과 계산 실수는 다른 문제야.\n풀이를 꼼꼼히 적는 습관이\n실수를 줄이는 가장 확실한 방법이야!' },
      { type: 'multipleChoice', question: '계산 실수를 줄이는 가장 효과적인 방법은?', options: ['더 빨리 풀기', '한 줄에 한 단계씩 적고 역산 확인', '어려운 계산 문제 많이 풀기', '계산기 사용하기'], correctIndex: 1, explanation: '과정을 생략하지 않고 적으면 실수를 줄이고,\n역산으로 확인하면 실수를 잡을 수 있어!' },
      { type: 'feedback', summary: '계산 실수 = 습관으로 고칠 수 있는 문제', message: '풀이를 한 줄 더 적는 습관이\n시험에서 10점을 올려줄 수 있어.\n"빨리"보다 "정확히"를 먼저 연습하자!' },
      { type: 'mission', mission: '수학 문제 3개를 풀면서\n모든 계산 과정을 한 줄씩 빠짐없이 적어보기\n다 풀고 나서 답을 원래 식에 대입해 확인하기', encouragement: '꼼꼼함이 수학 점수를 올리는 비밀 무기야!' },
    ],
  },

  'math-bronze-8': {
    id: 'math-bronze-8',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 8,
    title: '그래프 읽는 법',
    cards: [
      { type: 'concept', title: '그래프는 숫자의 그림이다', description: '그래프는 숫자와 관계를 눈으로 보여주는 도구야.\n\n그래프를 읽을 때 확인할 것:\n1) 제목: 무엇을 나타낸 그래프인가?\n2) 가로축(x축): 무엇을 나타내는가?\n3) 세로축(y축): 무엇을 나타내는가?\n4) 단위: 숫자의 단위는 무엇인가?\n5) 추세: 올라가는가, 내려가는가, 일정한가?\n\n이 5가지만 확인하면\n어떤 그래프든 읽을 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '축 확인', description: 'x축(가로)과 y축(세로)이 무엇인지 파악' },
        { icon: '📏', label: '단위 확인', description: 'cm, kg, 원 등 숫자의 단위 파악' },
        { icon: '📈', label: '추세 파악', description: '증가/감소/일정 등 전체적인 흐름 읽기' },
        { icon: '🔍', label: '특이점', description: '급격히 변하는 구간이나 꺾이는 점 찾기' },
      ]},
      { type: 'example', bad: { label: '서현의 방법', story: '그래프를 보고 막대의 높이만 비교했다.\n축의 단위가 "만 원"인 걸 놓쳐서 답이 10배 차이났다.' }, good: { label: '윤서의 방법', story: '그래프를 볼 때 항상 제목→축→단위→추세 순서로 읽었다.\n단위가 "천 명"인 걸 먼저 확인해서 정확한 답을 구했다.' }},
      { type: 'ox', statement: '그래프에서 가장 먼저 봐야 할 것은 가장 큰 값이다.', answer: false, feedback: '값을 보기 전에 축과 단위를 먼저 확인해야 해.\n단위를 모르면 숫자의 의미를 알 수 없어!' },
      { type: 'multipleChoice', question: '그래프를 읽을 때 올바른 순서는?', options: ['값 비교 → 축 확인 → 단위', '제목 → 축 → 단위 → 추세', '색깔 → 크기 → 숫자', '가장 큰 값 → 가장 작은 값'], correctIndex: 1, explanation: '제목으로 주제를 파악하고, 축과 단위를 확인한 뒤,\n전체 추세를 읽는 게 정확한 그래프 읽기야!' },
      { type: 'feedback', summary: '그래프 읽기 = 제목 → 축 → 단위 → 추세', message: '그래프 문제는 실제 시험에서 자주 나와.\n이 순서만 기억하면 어떤 그래프든 두렵지 않아!' },
      { type: 'mission', mission: '교과서나 뉴스에서 그래프 1개를 찾아\n제목·축·단위·추세를 분석해보고\n"이 그래프가 말하는 것"을 한 문장으로 정리하기', encouragement: '그래프를 읽는 능력은 수학을 넘어 세상을 읽는 힘이야!' },
    ],
  },

  'math-bronze-9': {
    id: 'math-bronze-9',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 9,
    title: '일상 속 수학 발견하기',
    cards: [
      { type: 'concept', title: '수학은 교과서 밖에도 있다', description: '수학이 일상에서 쓰이는 예시:\n\n• 마트 할인: 30% 할인이면 얼마를 내지?\n• 요리: 레시피 2인분 → 4인분으로 바꾸려면?\n• 용돈 관리: 한 달 예산 세우기\n• 게임: 확률 계산, 데미지 비교\n• 운동: 기록 비교, 속도 계산\n\n수학을 "시험 과목"이 아니라\n"문제 해결 도구"로 보면\n훨씬 재미있고 의미 있어져.\n\n일상에서 수학을 발견할수록\n수학적 감각이 자연스럽게 길러져!' },
      { type: 'summary', keywords: [
        { icon: '🛒', label: '할인 계산', description: '마트에서 %할인 가격 계산하기' },
        { icon: '🍳', label: '비율 조정', description: '레시피 인원수 조절에 비례 활용' },
        { icon: '💰', label: '예산 관리', description: '용돈·지출 계획에 사칙연산 활용' },
        { icon: '🎮', label: '게임 수학', description: '확률·데미지·경험치에 숨은 수학' },
      ]},
      { type: 'example', bad: { label: '영훈의 생각', story: '"수학은 시험에서만 쓰는 과목이지."\n흥미가 없으니 공부할 의욕도 없었다.' }, good: { label: '하린의 생각', story: '마트에서 "2+1과 30% 할인 중 뭐가 이득이지?"를 계산해봤다.\n수학이 실제로 돈을 아끼게 해준다는 걸 깨달으니 재미있어졌다.' }},
      { type: 'ox', statement: '일상생활에서 수학을 사용하는 경우는 거의 없다.', answer: false, feedback: '할인 계산, 시간 관리, 요리, 게임 등\n하루에도 수십 번 수학을 사용해.\n다만 의식하지 못할 뿐이야!' },
      { type: 'multipleChoice', question: '다음 중 수학이 사용되지 않는 상황은?', options: ['마트에서 할인 가격 계산', '요리 레시피 인원수 조정', '게임에서 데미지 비교', '이 중에 수학이 안 쓰이는 것은 없다'], correctIndex: 3, explanation: '모든 상황에 수학이 쓰여!\n할인은 백분율, 요리는 비례, 게임은 사칙연산과 확률이야.' },
      { type: 'feedback', summary: '수학 = 시험 과목이 아닌 생활 도구', message: '일상에서 수학을 찾으면\n수학이 왜 중요한지 자연스럽게 느끼게 돼.\n그러면 공부 동기도 올라가!' },
      { type: 'mission', mission: '오늘 하루 동안 일상에서 수학을 사용하는 순간 3가지를 찾아보고\n각각 어떤 수학 개념이 쓰였는지 적어보기', encouragement: '수학이 보이기 시작하면, 세상이 다르게 보여!' },
    ],
  },

  'math-bronze-10': {
    id: 'math-bronze-10',
    chapterKey: 'math',
    tierKey: 'bronze',
    stageNumber: 10,
    title: '수학 학습 루틴 만들기',
    cards: [
      { type: 'concept', title: '꾸준한 수학 학습 루틴', description: '수학은 "몰아서 공부"보다 "매일 조금씩"이 효과적이야.\n\n추천 일일 루틴 (하루 30분):\n• 5분: 어제 배운 개념 복습 (오답 노트 보기)\n• 10분: 새 개념 학습 (교과서 읽기)\n• 10분: 문제 풀기 (기본→응용)\n• 5분: 틀린 문제 정리 + 오답 노트\n\n핵심 원칙:\n1) 매일 같은 시간에 (습관화)\n2) 양보다 질 (집중해서)\n3) 어제 것 복습 후 새것 (연결)' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '매일 30분', description: '적은 시간이라도 매일 하는 것이 핵심' },
        { icon: '🔄', label: '복습 먼저', description: '새 내용 전에 어제 것을 간단히 복습' },
        { icon: '📊', label: '기본→응용', description: '쉬운 문제로 확인 후 어려운 문제 도전' },
        { icon: '📝', label: '오답 정리', description: '하루 마무리는 틀린 문제 정리로' },
      ]},
      { type: 'example', bad: { label: '시험 전 벼락치기', story: '평소엔 수학을 안 하다가 시험 전날 5시간 몰아서 공부했다.\n다 한 것 같았는데 시험에서 기억이 안 났다.' }, good: { label: '매일 30분', story: '매일 저녁 8시에 수학 30분 루틴을 정했다.\n양은 적지만 꾸준히 하니 시험 전에 여유롭게 복습만 하면 됐다.' }},
      { type: 'ox', statement: '시험 전에 집중적으로 공부하는 것이 매일 조금씩보다 효과적이다.', answer: false, feedback: '벼락치기는 단기 기억에 머물러서\n시험 끝나면 다 잊어버려.\n매일 조금씩이 장기 기억으로 가는 지름길이야!' },
      { type: 'multipleChoice', question: '효과적인 수학 학습 루틴의 핵심은?', options: ['주말에 3시간씩 몰아서', '매일 같은 시간에 30분씩 꾸준히', '기분 좋을 때만 공부', '시험 2주 전부터 시작'], correctIndex: 1, explanation: '습관은 "매일 같은 시간"일 때 가장 잘 형성돼.\n30분이면 충분해. 꾸준함이 실력을 만들어!' },
      { type: 'feedback', summary: '수학 루틴 = 매일 30분 + 복습→학습→문제→정리', message: '브론즈 과정을 마쳤어! 대단해!\n수학 공부의 기초 습관을 다졌으니\n이제 실버에서 본격적인 수학 개념을 배워보자!' },
      { type: 'mission', mission: '나만의 수학 학습 루틴을 만들어보기:\n①매일 공부할 시간 정하기\n②복습 5분 + 학습 10분 + 문제 10분 + 정리 5분\n③오늘부터 시작하기!', encouragement: '오늘 시작한 30분이 1년 뒤 놀라운 실력이 돼!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (수와 연산) 1~10
  // ═══════════════════════════════════════

  'math-silver-1': {
    id: 'math-silver-1',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 1,
    title: '자연수와 정수의 세계',
    cards: [
      { type: 'concept', title: '수의 확장: 자연수 → 정수', description: '자연수: 1, 2, 3, 4, ... (물건을 세는 수)\n\n하지만 자연수만으론 부족해!\n"3 - 5 = ?" → 자연수로 답할 수 없어.\n\n그래서 정수가 탄생했어:\n..., -3, -2, -1, 0, 1, 2, 3, ...\n\n양의 정수(+): 기온 영상, 이익, 해발 위\n음의 정수(-): 기온 영하, 손해, 해발 아래\n0: 기준점\n\n수직선에서 오른쪽 = 크다, 왼쪽 = 작다\n-3 < -1 < 0 < 2 < 5' },
      { type: 'summary', keywords: [
        { icon: '🔢', label: '자연수', description: '1, 2, 3... 물건을 셀 때 쓰는 양의 수' },
        { icon: '➖', label: '음의 정수', description: '0보다 작은 수: -1, -2, -3...' },
        { icon: '⭕', label: '0의 역할', description: '양수와 음수의 기준점' },
        { icon: '↔️', label: '수직선', description: '오른쪽이 크고, 왼쪽이 작은 수의 직선' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"마이너스 3이 마이너스 1보다 크다"\n숫자 3이 1보다 크니까 -3이 더 클 거라고 생각했다.' }, good: { label: '올바른 이해', story: '수직선을 그려보니 -3이 -1보다 왼쪽에 있었다.\n왼쪽이 더 작으니까 -3 < -1이 맞다는 걸 확인했다.' }},
      { type: 'ox', statement: '-5는 -2보다 크다.', answer: false, feedback: '수직선에서 -5는 -2보다 왼쪽에 있어.\n왼쪽이 더 작으니까 -5 < -2야.\n음수는 절댓값이 클수록 더 작아!' },
      { type: 'multipleChoice', question: '다음 수를 작은 것부터 순서대로 나열한 것은?', options: ['-1, 0, -3, 2', '-3, -1, 0, 2', '0, -1, -3, 2', '2, 0, -1, -3'], correctIndex: 1, explanation: '수직선에서 왼쪽부터: -3 → -1 → 0 → 2\n음수는 0보다 왼쪽, 양수는 0보다 오른쪽이야!' },
      { type: 'feedback', summary: '자연수 → 정수로 수의 세계가 확장된다', message: '음수를 이해하면 온도, 돈, 높이 등\n실생활의 다양한 상황을 수로 표현할 수 있어!' },
      { type: 'mission', mission: '수직선을 그리고 다음 수들을 표시해보기:\n-4, -1, 0, 3, 5\n그리고 크기 순서대로 나열해보기', encouragement: '수직선은 수학의 지도야. 이 지도를 잘 읽으면 어디든 갈 수 있어!' },
    ],
  },

  'math-silver-2': {
    id: 'math-silver-2',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 2,
    title: '분수의 이해',
    cards: [
      { type: 'concept', title: '분수 = 전체를 나눈 것의 일부', description: '피자 1판을 4조각으로 나누면\n1조각 = 1/4 (4분의 1)\n3조각 = 3/4 (4분의 3)\n\n분수의 구조:\n• 분자(위): 가진 양\n• 분모(아래): 전체를 나눈 수\n\n진분수: 분자 < 분모 (1/3, 2/5)\n가분수: 분자 ≥ 분모 (5/3, 7/4)\n대분수: 정수 + 진분수 (1⅔, 2¾)\n\n핵심: 분모가 같아야 크기 비교가 쉬워!\n1/3과 1/4 중 뭐가 더 클까?\n→ 통분하면: 4/12 > 3/12 → 1/3이 더 커!' },
      { type: 'summary', keywords: [
        { icon: '🍕', label: '분수의 뜻', description: '전체를 똑같이 나눈 것의 일부를 나타내는 수' },
        { icon: '⬆️', label: '분자', description: '위에 있는 수, 가진 양을 나타냄' },
        { icon: '⬇️', label: '분모', description: '아래에 있는 수, 나눈 개수를 나타냄' },
        { icon: '⚖️', label: '통분', description: '분모를 같게 만들어 크기를 비교하는 방법' },
      ]},
      { type: 'example', bad: { label: '잘못된 비교', story: '"1/4이 1/3보다 크지, 4가 3보다 크니까!"\n분모가 클수록 조각이 작아진다는 걸 몰랐다.' }, good: { label: '올바른 비교', story: '피자를 그려봤다. 4등분한 조각과 3등분한 조각.\n4등분한 게 더 작았다! → 1/4 < 1/3' }},
      { type: 'ox', statement: '분모가 큰 분수가 항상 더 큰 수이다.', answer: false, feedback: '분모가 크면 조각이 더 작아져!\n1/10은 1/2보다 훨씬 작아.\n피자를 10조각으로 나누면 1조각이 아주 작잖아!' },
      { type: 'multipleChoice', question: '2/5와 3/5 중 더 큰 수는?', options: ['2/5', '3/5', '같다', '비교할 수 없다'], correctIndex: 1, explanation: '분모가 같으면 분자가 큰 쪽이 더 커!\n5조각 중 3조각이 2조각보다 많으니까 3/5 > 2/5야.' },
      { type: 'feedback', summary: '분수 = 나눈 것의 일부, 통분으로 비교', message: '분수는 "나누기"의 개념이야.\n피자, 케이크, 시간 등으로 상상하면 쉬워!' },
      { type: 'mission', mission: '종이 위에 원(피자)을 2개 그리고\n하나는 3등분, 하나는 4등분 해보기\n1/3과 1/4의 크기를 눈으로 비교해보기', encouragement: '그림으로 보면 분수가 한눈에 이해돼!' },
    ],
  },

  'math-silver-3': {
    id: 'math-silver-3',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 3,
    title: '소수의 이해',
    cards: [
      { type: 'concept', title: '소수(小數) = 1보다 작은 수를 표현하는 방법', description: '소수는 분수의 다른 표현이야.\n\n1/2 = 0.5\n1/4 = 0.25\n3/4 = 0.75\n\n소수점 자리의 의미:\n• 소수 첫째 자리: 1/10 (0.1)\n• 소수 둘째 자리: 1/100 (0.01)\n• 소수 셋째 자리: 1/1000 (0.001)\n\n예: 3.14\n= 3 + 1/10 + 4/100\n= 3 + 0.1 + 0.04\n\n소수점 위치가 중요해!\n0.3 ≠ 0.03 (10배 차이!)' },
      { type: 'summary', keywords: [
        { icon: '🔵', label: '소수', description: '분수를 10의 거듭제곱으로 나타낸 것' },
        { icon: '📍', label: '소수점', description: '정수 부분과 소수 부분을 구분하는 점' },
        { icon: '🔟', label: '자릿값', description: '첫째 자리=1/10, 둘째 자리=1/100...' },
        { icon: '🔄', label: '분수 변환', description: '소수 ↔ 분수를 자유롭게 변환' },
      ]},
      { type: 'example', bad: { label: '잘못된 비교', story: '"0.15가 0.9보다 크다. 15가 9보다 크니까!"\n소수의 자릿값을 무시한 실수였다.' }, good: { label: '올바른 비교', story: '0.15 = 15/100 = 0.15\n0.9 = 9/10 = 90/100 = 0.90\n90/100 > 15/100이니까 0.9 > 0.15!' }},
      { type: 'ox', statement: '0.5와 0.50은 다른 수이다.', answer: false, feedback: '0.50의 마지막 0은 의미가 없어.\n0.5 = 0.50 = 0.500 모두 같은 수야!\n5/10 = 50/100 = 500/1000 = 1/2' },
      { type: 'multipleChoice', question: '0.3 + 0.07 = ?', options: ['0.10', '0.37', '0.307', '1.0'], correctIndex: 1, explanation: '0.3 = 0.30\n0.30 + 0.07 = 0.37\n소수끼리 더할 때는 소수점을 맞춰서 계산해!' },
      { type: 'feedback', summary: '소수 = 분수의 10진법 표현, 자릿값이 핵심', message: '소수와 분수는 같은 것의 다른 표현이야.\n둘 다 자유롭게 쓸 수 있으면 수학이 훨씬 편해져!' },
      { type: 'mission', mission: '다음 분수를 소수로, 소수를 분수로 바꿔보기:\n1/5 = ?  |  3/4 = ?  |  0.6 = ?  |  0.125 = ?', encouragement: '소수와 분수를 자유자재로 바꾸는 게 수학의 기본기야!' },
    ],
  },

  'math-silver-4': {
    id: 'math-silver-4',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 4,
    title: '비와 비율',
    cards: [
      { type: 'concept', title: '비(比)와 비율(比率)', description: '비: 두 양을 비교하는 것\n예) 남자 3명, 여자 5명 → 남:여 = 3:5\n\n비율: 비를 하나의 수로 표현\n남자의 비율 = 3/8 = 0.375 = 37.5%\n\n비의 성질:\n3:5 = 6:10 = 9:15 (양쪽에 같은 수를 곱해도 같은 비)\n\n실생활 예시:\n• 지도 축척: 1:50000 (1cm = 500m)\n• 음식 레시피: 물:쌀 = 2:1\n• 속도: 거리:시간 = 100km:2시간' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '비', description: '두 양을 ":"로 비교하는 것 (3:5)' },
        { icon: '📊', label: '비율', description: '비를 분수나 소수로 표현한 것' },
        { icon: '✖️', label: '비의 성질', description: '양쪽에 같은 수를 곱/나눠도 같은 비' },
        { icon: '🗺️', label: '실생활', description: '지도, 요리, 속도 등에서 비가 활용됨' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"남녀 비 3:5에서 남자 비율은 3/5이다"\n전체(3+5=8)가 아닌 여자 수(5)로 나눈 실수.' }, good: { label: '올바른 이해', story: '남:여 = 3:5에서 전체 = 3+5 = 8\n남자 비율 = 3/8, 여자 비율 = 5/8\n두 비율의 합 = 3/8 + 5/8 = 8/8 = 1 (100%)' }},
      { type: 'ox', statement: '비 2:3과 4:6은 같은 비이다.', answer: true, feedback: '맞아! 2:3의 양쪽에 2를 곱하면 4:6이야.\n양쪽에 같은 수를 곱해도 비는 변하지 않아!' },
      { type: 'multipleChoice', question: '사과 12개를 2:1로 나누면 각각 몇 개씩?', options: ['6개, 6개', '8개, 4개', '9개, 3개', '10개, 2개'], correctIndex: 1, explanation: '2:1이면 전체 = 2+1 = 3등분\n12 ÷ 3 = 4 (한 몫)\n큰 쪽: 4×2 = 8개, 작은 쪽: 4×1 = 4개' },
      { type: 'feedback', summary: '비 = 두 양의 비교, 비율 = 비의 수치화', message: '비와 비율은 일상 곳곳에서 쓰여.\n요리, 지도, 할인 계산 등 정말 유용한 개념이야!' },
      { type: 'mission', mission: '가족이나 반 친구들의 남녀 비를 구해보고\n각각의 비율(%)까지 계산해보기', encouragement: '비와 비율은 세상을 수로 표현하는 도구야!' },
    ],
  },

  'math-silver-5': {
    id: 'math-silver-5',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 5,
    title: '백분율(%) 완전 정복',
    cards: [
      { type: 'concept', title: '백분율 = 전체를 100으로 볼 때의 비율', description: '%(퍼센트) = per cent = 100당\n\n변환:\n분수 → %: 분자÷분모×100\n예) 3/4 = 0.75 = 75%\n\n% → 분수: %÷100\n예) 40% = 40/100 = 2/5\n\n실생활 활용:\n• 할인: 정가 10,000원의 30% 할인 = 10,000 × 0.3 = 3,000원 할인 → 7,000원\n• 시험: 80문제 중 60개 맞음 = 60/80 × 100 = 75%\n• 배터리: 100% 중 35% 남음' },
      { type: 'summary', keywords: [
        { icon: '%', label: '백분율', description: '전체를 100으로 했을 때의 비율' },
        { icon: '🔄', label: '변환', description: '분수↔소수↔백분율 자유변환' },
        { icon: '🏷️', label: '할인 계산', description: '정가 × (할인율/100) = 할인액' },
        { icon: '📊', label: '비율 표현', description: '시험 점수, 달성률 등을 %로 표현' },
      ]},
      { type: 'example', bad: { label: '잘못된 계산', story: '"50% 할인에서 추가 20% 할인이면 70% 할인이지!"\n10,000원의 50%=5,000원, 5,000원의 20%=1,000원\n실제 할인: 6,000원(60%), 70%가 아니야!' }, good: { label: '올바른 계산', story: '정가 10,000원 → 50% 할인 → 5,000원\n5,000원 → 추가 20% 할인 → 5,000×0.2=1,000원 할인\n최종: 4,000원 (60% 할인)' }},
      { type: 'ox', statement: '50% 할인 후 20% 추가 할인은 총 70% 할인과 같다.', answer: false, feedback: '할인은 남은 금액에 적용되기 때문에\n50% 할인 후 20% 추가 = 60% 할인이야.\n0.5 × 0.8 = 0.4 → 원래의 40%만 내면 돼!' },
      { type: 'multipleChoice', question: '시험 40문제 중 30개를 맞았다면 점수는?', options: ['30%', '40%', '75%', '80%'], correctIndex: 2, explanation: '30 ÷ 40 × 100 = 75%\n분자(맞은 수) ÷ 분모(전체) × 100 = 백분율!' },
      { type: 'feedback', summary: '백분율 = 비율의 생활 표현, 할인 계산에 필수', message: '백분율은 가장 많이 쓰이는 수학 개념 중 하나야.\n할인, 이자, 세금 등 돈과 관련된 거의 모든 곳에 나와!' },
      { type: 'mission', mission: '마트 전단지나 온라인 쇼핑에서 할인 상품 3개를 찾아\n각각의 원래 가격과 할인 후 가격을 계산해보기', encouragement: '백분율을 마스터하면 현명한 소비자가 될 수 있어!' },
    ],
  },

  'math-silver-6': {
    id: 'math-silver-6',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 6,
    title: '약수와 배수',
    cards: [
      { type: 'concept', title: '약수와 배수의 관계', description: '약수: 어떤 수를 나누어떨어지게 하는 수\n12의 약수: 1, 2, 3, 4, 6, 12\n\n배수: 어떤 수에 자연수를 곱한 수\n3의 배수: 3, 6, 9, 12, 15, ...\n\n약수와 배수는 짝꿍 관계야!\n"3은 12의 약수" = "12는 3의 배수"\n\n약수 찾는 법:\n12 = 1×12 = 2×6 = 3×4\n→ 약수: 1, 2, 3, 4, 6, 12\n\n최대공약수(GCD): 공통 약수 중 가장 큰 것\n최소공배수(LCM): 공통 배수 중 가장 작은 것' },
      { type: 'summary', keywords: [
        { icon: '÷', label: '약수', description: '나누어떨어지게 하는 수 (12÷3=4)' },
        { icon: '✖️', label: '배수', description: '그 수의 곱셈 결과 (3×4=12)' },
        { icon: '🤝', label: '최대공약수', description: '두 수의 공통 약수 중 가장 큰 수' },
        { icon: '🔗', label: '최소공배수', description: '두 수의 공통 배수 중 가장 작은 수' },
      ]},
      { type: 'example', bad: { label: '잘못된 방법', story: '18의 약수를 구하라는 문제에서\n1, 2, 3, 6만 찾고 9와 18을 빠뜨렸다.' }, good: { label: '올바른 방법', story: '18 = 1×18 = 2×9 = 3×6\n쌍으로 찾으니 빠짐없이 구할 수 있었다:\n1, 2, 3, 6, 9, 18' }},
      { type: 'ox', statement: '1은 모든 자연수의 약수이다.', answer: true, feedback: '맞아! 어떤 자연수든 1로 나누면 나누어떨어져.\n그래서 1은 모든 자연수의 약수야!' },
      { type: 'multipleChoice', question: '12와 18의 최대공약수는?', options: ['2', '3', '6', '36'], correctIndex: 2, explanation: '12의 약수: 1, 2, 3, 4, 6, 12\n18의 약수: 1, 2, 3, 6, 9, 18\n공통 약수: 1, 2, 3, 6 → 최대공약수: 6' },
      { type: 'feedback', summary: '약수·배수 = 수의 관계를 이해하는 기초', message: '약수와 배수는 분수 통분, 공약수 찾기 등\n앞으로 계속 쓰이는 중요한 개념이야!' },
      { type: 'mission', mission: '24의 약수를 모두 구하고\n24와 36의 최대공약수를 찾아보기\n(쌍으로 찾기 방법을 사용해보자!)', encouragement: '약수를 쌍으로 찾으면 절대 빠뜨리지 않아!' },
    ],
  },

  'math-silver-7': {
    id: 'math-silver-7',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 7,
    title: '소인수분해',
    cards: [
      { type: 'concept', title: '소수와 소인수분해', description: '소수(素數): 1과 자기 자신만 약수인 수\n2, 3, 5, 7, 11, 13, 17, 19, 23, ...\n\n소인수분해: 자연수를 소수의 곱으로 표현\n\n예) 60을 소인수분해:\n60 = 2 × 30\n   = 2 × 2 × 15\n   = 2 × 2 × 3 × 5\n   = 2² × 3 × 5\n\n소인수분해의 활용:\n• 약수 구하기\n• 최대공약수 구하기\n• 최소공배수 구하기\n\n이 모든 것이 소인수분해로 한 번에 해결돼!' },
      { type: 'summary', keywords: [
        { icon: '⭐', label: '소수', description: '1과 자신만 약수인 수 (2, 3, 5, 7...)' },
        { icon: '🌳', label: '소인수분해', description: '수를 소수의 곱으로 쪼개는 것' },
        { icon: '📐', label: '약수 개수', description: '지수+1을 곱하면 약수 개수가 나옴' },
        { icon: '🧩', label: 'GCD/LCM', description: '소인수분해로 최대공약수·최소공배수를 쉽게 구함' },
      ]},
      { type: 'example', bad: { label: '비효율적 방법', story: '72와 90의 최대공약수를 구하려고\n각각의 약수를 다 나열했다. 시간이 오래 걸렸다.' }, good: { label: '소인수분해 활용', story: '72 = 2³ × 3²\n90 = 2 × 3² × 5\n공통 소인수의 작은 지수: 2¹ × 3² = 18\n최대공약수 = 18!' }},
      { type: 'ox', statement: '1은 소수이다.', answer: false, feedback: '1은 소수가 아니야!\n소수는 "1보다 큰 자연수 중" 약수가 1과 자신뿐인 수야.\n가장 작은 소수는 2야!' },
      { type: 'multipleChoice', question: '36을 소인수분해하면?', options: ['4 × 9', '2² × 3²', '6 × 6', '2 × 3 × 6'], correctIndex: 1, explanation: '36 = 4 × 9 = 2² × 3²\n4=2², 9=3²이니까 소수의 곱으로 완전히 분해하면\n2² × 3²가 돼!' },
      { type: 'feedback', summary: '소인수분해 = 수학의 만능 도구', message: '소인수분해를 마스터하면\n약수, 최대공약수, 최소공배수를 한 방에 해결할 수 있어!' },
      { type: 'mission', mission: '다음 수를 소인수분해해보기:\n① 48  ② 120  ③ 84\n그리고 48과 120의 최대공약수를 소인수분해로 구하기', encouragement: '소인수분해는 수의 DNA를 읽는 것과 같아!' },
    ],
  },

  'math-silver-8': {
    id: 'math-silver-8',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 8,
    title: '정수의 사칙연산',
    cards: [
      { type: 'concept', title: '음수가 포함된 계산', description: '정수의 덧셈·뺄셈:\n(+3) + (+5) = +8\n(+3) + (-5) = -2 (큰 절댓값의 부호)\n(-3) + (-5) = -8\n\n뺄셈 → 덧셈으로 변환:\n(+3) - (+5) = (+3) + (-5) = -2\n(-3) - (-5) = (-3) + (+5) = +2\n\n곱셈·나눗셈의 부호 규칙:\n(+) × (+) = (+)\n(-) × (-) = (+) ← 핵심!\n(+) × (-) = (-)\n(-) × (+) = (-)\n\n같은 부호끼리 = 양수\n다른 부호끼리 = 음수' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '덧셈 규칙', description: '같은 부호: 더하고 그 부호, 다른 부호: 빼고 큰 쪽 부호' },
        { icon: '➖', label: '뺄셈→덧셈', description: '빼기를 더하기로 바꾸고 뒤 수의 부호 반대로' },
        { icon: '✖️', label: '곱셈 부호', description: '같은 부호=양수, 다른 부호=음수' },
        { icon: '➗', label: '나눗셈 부호', description: '곱셈과 같은 부호 규칙 적용' },
      ]},
      { type: 'example', bad: { label: '흔한 실수', story: '(-3) × (-4) = -12라고 답했다.\n음수끼리 곱하면 양수인 걸 잊었다.' }, good: { label: '올바른 풀이', story: '(-3) × (-4): 음×음=양, 3×4=12\n따라서 (-3) × (-4) = +12' }},
      { type: 'ox', statement: '음수 × 음수 = 음수이다.', answer: false, feedback: '음수 × 음수 = 양수야!\n"빚(-)을 없앤다(-)" → 이득(+)\n이렇게 생각하면 기억하기 쉬워!' },
      { type: 'multipleChoice', question: '(-6) + (+4) - (-3) = ?', options: ['-5', '+1', '-7', '+13'], correctIndex: 1, explanation: '(-6) + (+4) - (-3)\n= (-6) + (+4) + (+3)\n= (-6) + (+7)\n= +1' },
      { type: 'feedback', summary: '정수 연산 = 부호 규칙만 확실히 기억하면 OK', message: '부호 규칙은 수학의 교통신호 같은 거야.\n이것만 확실히 익히면 어떤 계산이든 막힘없어!' },
      { type: 'mission', mission: '다음을 계산해보기:\n① (-5) + (-8) =\n② (+7) - (-3) =\n③ (-4) × (-6) =\n④ (-20) ÷ (+5) =', encouragement: '부호 규칙을 자동으로 적용할 때까지 연습하자!' },
    ],
  },

  'math-silver-9': {
    id: 'math-silver-9',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 9,
    title: '유리수의 이해',
    cards: [
      { type: 'concept', title: '유리수 = 분수로 표현할 수 있는 모든 수', description: '유리수(有理數, rational number):\na/b (b≠0)로 나타낼 수 있는 수\n\n유리수의 범위:\n• 정수: -3 = -3/1, 0 = 0/1, 5 = 5/1\n• 분수: 1/2, -3/4, 7/3\n• 소수: 0.5 = 1/2, 0.333... = 1/3\n\n유리수가 아닌 수(무리수):\nπ = 3.14159..., √2 = 1.41421...\n(끝없이 반복 없이 이어지는 소수)\n\n수의 포함 관계:\n자연수 ⊂ 정수 ⊂ 유리수 ⊂ 실수' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '유리수', description: '분수 a/b (b≠0)로 표현 가능한 모든 수' },
        { icon: '🔢', label: '포함 관계', description: '자연수 ⊂ 정수 ⊂ 유리수' },
        { icon: '🔁', label: '순환소수', description: '0.333...처럼 반복되는 소수도 유리수' },
        { icon: '♾️', label: '무리수', description: 'π, √2처럼 분수로 못 나타내는 수' },
      ]},
      { type: 'example', bad: { label: '잘못된 분류', story: '"0.333...은 끝이 없으니까 유리수가 아니야"\n순환소수도 유리수라는 걸 몰랐다 (0.333...=1/3).' }, good: { label: '올바른 분류', story: '0.333... = 1/3이니까 유리수!\n핵심은 "분수로 나타낼 수 있느냐"야.\n순환소수는 분수로 바꿀 수 있으니 유리수!' }},
      { type: 'ox', statement: '0은 유리수가 아니다.', answer: false, feedback: '0 = 0/1로 분수로 나타낼 수 있으니\n0도 유리수야!\n유리수 = 분수로 표현 가능한 모든 수.' },
      { type: 'multipleChoice', question: '다음 중 유리수가 아닌 것은?', options: ['-3', '0.5', '√2', '1/7'], correctIndex: 2, explanation: '√2 = 1.41421356...은 끝없이 비반복적으로 이어져.\n분수로 나타낼 수 없으니 무리수야!' },
      { type: 'feedback', summary: '유리수 = 분수로 나타낼 수 있는 모든 수', message: '수의 세계는 자연수→정수→유리수로 점점 넓어져.\n이 체계를 이해하면 수학의 전체 그림이 보여!' },
      { type: 'mission', mission: '다음 수를 유리수/무리수로 분류하고\n유리수는 분수로 나타내보기:\n-7, 0.25, π, 2/3, √9, 0.1212...', encouragement: '수를 분류하는 눈이 생기면 수학이 체계적으로 보여!' },
    ],
  },

  'math-silver-10': {
    id: 'math-silver-10',
    chapterKey: 'math',
    tierKey: 'silver',
    stageNumber: 10,
    title: '수직선과 절댓값',
    cards: [
      { type: 'concept', title: '수직선과 절댓값의 관계', description: '수직선: 수를 점으로 나타낸 직선\n←──┼──┼──┼──┼──┼──→\n   -2  -1   0   1   2\n\n절댓값: 수직선에서 0까지의 거리\n|3| = 3 (0에서 오른쪽으로 3)\n|-3| = 3 (0에서 왼쪽으로 3)\n|0| = 0\n\n핵심: 절댓값은 항상 0 이상!\n\n절댓값의 성질:\n|a| ≥ 0\n|a| = |-a|\n|a × b| = |a| × |b|\n\n거리 계산에 활용:\n두 점 사이 거리 = |a - b|\n예) -3과 5 사이 거리 = |-3 - 5| = |-8| = 8' },
      { type: 'summary', keywords: [
        { icon: '↔️', label: '수직선', description: '모든 수를 직선 위에 표현하는 도구' },
        { icon: '📏', label: '절댓값', description: '0으로부터의 거리 (항상 0 이상)' },
        { icon: '🔄', label: '대칭', description: '|a| = |-a|, 부호가 달라도 절댓값은 같음' },
        { icon: '📐', label: '거리 계산', description: '두 수 사이 거리 = 절댓값 활용' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"|-7| = -7이야, 왜냐면 원래 음수니까."\n절댓값은 항상 0 이상이라는 걸 모른 채 부호를 그대로 뒀다.' }, good: { label: '올바른 이해', story: '|-7|은 수직선에서 -7이 0으로부터 얼마나 떨어져 있는지야.\n7칸 떨어져 있으니까 |-7| = 7!' }},
      { type: 'ox', statement: '절댓값이 같으면 두 수는 같은 수이다.', answer: false, feedback: '|3| = |-3| = 3\n절댓값이 같아도 부호가 다를 수 있어!\n절댓값이 같은 두 수는 0을 기준으로 대칭이야.' },
      { type: 'multipleChoice', question: '-4와 7 사이의 거리는?', options: ['3', '4', '7', '11'], correctIndex: 3, explanation: '두 수 사이 거리 = |-4 - 7| = |-11| = 11\n또는 수직선에서 -4에서 7까지 세면\n4 + 7 = 11칸이야!' },
      { type: 'feedback', summary: '절댓값 = 0까지의 거리, 항상 0 이상', message: '실버 과정을 마쳤어! 축하해!\n수와 연산의 기초를 모두 다졌으니\n골드에서 대수와 함수의 세계로 들어가자!' },
      { type: 'mission', mission: '수직선을 그리고 다음을 표시하기:\n① -5, -2, 0, 3, 6의 위치\n② |-5|와 |3|의 값\n③ -5와 6 사이의 거리', encouragement: '수직선을 자유자재로 쓸 수 있으면 어떤 수 문제도 두렵지 않아!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (대수와 함수) 1~10
  // ═══════════════════════════════════════

  'math-gold-1': {
    id: 'math-gold-1',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 1,
    title: '변수와 식',
    cards: [
      { type: 'concept', title: '변수 = 변할 수 있는 수를 담는 그릇', description: '변수(variable): 값이 정해지지 않은 수를 문자로 표현\n\n예) 사과 한 개 가격이 x원이면\n3개 가격 = 3x원, 5개 가격 = 5x원\n\n식의 종류:\n• 단항식: 3x, -2y², 5\n• 다항식: 3x + 2, x² - 5x + 6\n\n계수: 변수 앞의 숫자 (3x에서 3)\n상수항: 변수 없는 항 (3x + 2에서 2)\n차수: 변수의 가장 높은 지수 (x²의 차수: 2)\n\n동류항: 문자와 차수가 같은 항끼리 계산\n3x + 5x = 8x (O)\n3x + 5x² → 합칠 수 없음 (X)' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '변수', description: '값이 변할 수 있는 문자 (x, y, a...)' },
        { icon: '🔢', label: '계수', description: '변수 앞의 숫자 (3x의 3)' },
        { icon: '📊', label: '차수', description: '변수의 가장 높은 지수' },
        { icon: '🤝', label: '동류항', description: '문자와 차수가 같은 항끼리만 계산 가능' },
      ]},
      { type: 'example', bad: { label: '잘못된 계산', story: '3x + 5y = 8xy라고 답했다.\n다른 문자끼리는 합칠 수 없다는 걸 몰랐다.' }, good: { label: '올바른 계산', story: '3x + 2y + 5x - y\n= (3x + 5x) + (2y - y)\n= 8x + y\n동류항끼리만 정리했다.' }},
      { type: 'ox', statement: '2x + 3x²은 5x³으로 합칠 수 있다.', answer: false, feedback: '2x는 1차, 3x²은 2차로 동류항이 아니야.\n차수가 다르면 합칠 수 없어!\n2x + 3x²은 그대로가 답이야.' },
      { type: 'multipleChoice', question: '4a - 2b + 3a + 5b를 정리하면?', options: ['10ab', '7a + 3b', '7a - 3b', '12ab'], correctIndex: 1, explanation: '(4a + 3a) + (-2b + 5b)\n= 7a + 3b\n동류항끼리 모아서 계산!' },
      { type: 'feedback', summary: '변수 = 미지수를 표현하는 도구, 동류항끼리만 계산', message: '변수와 식은 대수의 출발점이야.\n이것을 이해하면 방정식, 함수까지 쭉 이어져!' },
      { type: 'mission', mission: '다음 식을 정리해보기:\n① 5x + 3y - 2x + y\n② 2a² + 3a - a² + 5a\n③ "한 개에 x원인 빵 4개와 y원인 우유 2개의 총 가격"을 식으로 표현하기', encouragement: '변수로 세상을 표현할 수 있어!' },
    ],
  },

  'math-gold-2': {
    id: 'math-gold-2',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 2,
    title: '일차방정식',
    cards: [
      { type: 'concept', title: '방정식 = 미지수의 값을 찾는 수학 퍼즐', description: '방정식: 미지수가 포함된 등식\n해(근): 방정식을 참으로 만드는 값\n\n일차방정식: 미지수의 최고 차수가 1\n\n풀이 원리: 등식의 성질\n양변에 같은 수를 더하거나, 빼거나, 곱하거나, 나눠도 등식은 유지된다.\n\n예) 3x + 5 = 20\n① 양변에 5를 빼기: 3x = 15\n② 양변을 3으로 나누기: x = 5\n\n검증: 3(5) + 5 = 15 + 5 = 20 ✓\n\n핵심: "x를 한쪽에 모으고, 숫자를 반대쪽에 모은다"' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '등식의 성질', description: '양변에 같은 연산을 하면 등식 유지' },
        { icon: '🎯', label: '해 구하기', description: 'x를 한쪽, 숫자를 반대쪽으로 이항' },
        { icon: '🔄', label: '이항', description: '반대편으로 옮길 때 부호가 바뀜' },
        { icon: '✅', label: '검증', description: '구한 해를 원래 식에 대입하여 확인' },
      ]},
      { type: 'example', bad: { label: '이항 실수', story: '2x - 3 = 7에서\n2x = 7 - 3 = 4라고 계산했다.\n-3을 이항할 때 +3이 되어야 하는데 -3으로 계산한 실수.' }, good: { label: '올바른 풀이', story: '2x - 3 = 7\n2x = 7 + 3 = 10 (이항 시 부호 반대!)\nx = 5\n검증: 2(5) - 3 = 10 - 3 = 7 ✓' }},
      { type: 'ox', statement: '방정식에서 항을 이항하면 부호가 바뀐다.', answer: true, feedback: '맞아! 이항 = 반대편으로 옮기기\n+는 -로, -는 +로 바뀌어.\n3x - 5 = 10 → 3x = 10 + 5' },
      { type: 'multipleChoice', question: '5x - 8 = 2x + 7의 해는?', options: ['x = 1', 'x = 3', 'x = 5', 'x = 15'], correctIndex: 2, explanation: '5x - 2x = 7 + 8\n3x = 15\nx = 5\n검증: 5(5)-8=17, 2(5)+7=17 ✓' },
      { type: 'feedback', summary: '일차방정식 = 이항으로 x를 분리하고 검증', message: '방정식은 수학의 핵심 도구야.\n이것을 잘 풀면 실생활 문제도 수학으로 해결할 수 있어!' },
      { type: 'mission', mission: '다음 방정식을 풀고 검증해보기:\n① 4x + 3 = 19\n② 2x - 7 = x + 5\n③ 3(x + 2) = 21', encouragement: '방정식은 미지의 세계를 여는 열쇠야!' },
    ],
  },

  'math-gold-3': {
    id: 'math-gold-3',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 3,
    title: '부등식의 세계',
    cards: [
      { type: 'concept', title: '부등식 = 크기를 비교하는 식', description: '부등호: < (미만), > (초과), ≤ (이하), ≥ (이상)\n\n일차부등식 풀이는 방정식과 비슷해.\n단, 핵심 차이가 있어!\n\n⚠️ 음수를 곱하거나 나누면 부등호 방향이 바뀐다!\n\n예) -2x > 6\n양변을 -2로 나누면: x < -3 (부등호 반대!)\n\n예) 3x + 4 ≤ 19\n3x ≤ 15\nx ≤ 5\n\n해의 표현:\nx ≤ 5 → 수직선에서 5 이하의 모든 수\n←━━━━━●\n         5' },
      { type: 'summary', keywords: [
        { icon: '↔️', label: '부등호', description: '<, >, ≤, ≥로 크기 관계 표현' },
        { icon: '⚠️', label: '부호 주의', description: '음수를 곱/나누면 부등호 방향 반대!' },
        { icon: '📏', label: '수직선 표현', description: '해를 수직선 위에 화살표로 표시' },
        { icon: '♾️', label: '무한한 해', description: '부등식의 해는 범위(여러 개의 수)' },
      ]},
      { type: 'example', bad: { label: '부등호 실수', story: '-3x < 9에서\nx < -3이라고 답했다.\n음수로 나눌 때 부등호를 안 바꾼 실수!' }, good: { label: '올바른 풀이', story: '-3x < 9\n양변을 -3으로 나누면 (부등호 반대!):\nx > -3\n수직선에서 -3보다 큰 모든 수가 해!' }},
      { type: 'ox', statement: '부등식에서 양변에 음수를 곱하면 부등호 방향이 바뀐다.', answer: true, feedback: '맞아! 이것이 부등식의 가장 중요한 규칙이야.\n양변에 양수를 곱하면 방향 유지,\n음수를 곱하면 방향이 반대로!' },
      { type: 'multipleChoice', question: '2x - 3 > 7의 해는?', options: ['x > 2', 'x > 5', 'x < 5', 'x > 10'], correctIndex: 1, explanation: '2x - 3 > 7\n2x > 10\nx > 5\n양수로 나눴으니 부등호 방향 그대로!' },
      { type: 'feedback', summary: '부등식 = 방정식 풀이 + 음수 곱/나누기 시 부등호 반대', message: '부등식은 "범위"를 구하는 도구야.\n"몇 점 이상 받아야 합격", "최대 몇 개 살 수 있나" 등\n실생활 문제에 유용해!' },
      { type: 'mission', mission: '다음 부등식을 풀고 수직선에 해를 표시해보기:\n① 3x + 2 ≤ 14\n② -4x > 8\n③ "용돈 2만원으로 1개 3,000원인 빵을 최대 몇 개 살 수 있나?" → 부등식으로 세우고 풀기', encouragement: '부등식으로 "가능한 범위"를 찾는 힘을 키우자!' },
    ],
  },

  'math-gold-4': {
    id: 'math-gold-4',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 4,
    title: '좌표평면의 이해',
    cards: [
      { type: 'concept', title: '좌표평면 = 수학의 지도', description: '좌표평면: x축(가로)과 y축(세로)으로 이루어진 평면\n\n점의 위치를 (x, y)로 표현:\n• 원점: (0, 0)\n• (3, 2): 오른쪽 3, 위로 2\n• (-2, 4): 왼쪽 2, 위로 4\n• (1, -3): 오른쪽 1, 아래 3\n\n4개의 사분면:\n제1사분면: (+, +) — 오른쪽 위\n제2사분면: (-, +) — 왼쪽 위\n제3사분면: (-, -) — 왼쪽 아래\n제4사분면: (+, -) — 오른쪽 아래\n\nx축이나 y축 위의 점은 사분면에 속하지 않아!' },
      { type: 'summary', keywords: [
        { icon: '📍', label: '좌표', description: '(x, y)로 평면 위 점의 위치 표현' },
        { icon: '➕', label: '원점', description: 'x축과 y축이 만나는 점 (0, 0)' },
        { icon: '🗺️', label: '사분면', description: '좌표평면을 4등분한 영역' },
        { icon: '↔️', label: 'x: 가로, y: 세로', description: 'x는 좌우, y는 상하 방향' },
      ]},
      { type: 'example', bad: { label: '좌표 혼동', story: '(3, 5)를 "위로 3, 오른쪽 5"로 읽었다.\nx와 y의 순서를 헷갈린 실수.' }, good: { label: '올바른 읽기', story: '(3, 5) = "오른쪽 3(x), 위로 5(y)"\n항상 (가로, 세로) 순서!\n"x가 먼저, y가 나중"으로 기억.' }},
      { type: 'ox', statement: '점 (-3, 0)은 제2사분면에 있다.', answer: false, feedback: 'y좌표가 0이면 x축 위에 있는 점이야.\n축 위의 점은 어떤 사분면에도 속하지 않아!' },
      { type: 'multipleChoice', question: '점 (-2, -5)는 어느 사분면에 있는가?', options: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'], correctIndex: 2, explanation: 'x가 음수(-), y가 음수(-)\n(-, -)는 제3사분면(왼쪽 아래)이야!' },
      { type: 'feedback', summary: '좌표평면 = (x, y)로 위치를 표현하는 수학의 지도', message: '좌표평면은 함수의 그래프를 그리는 데 필수야.\n이 개념이 탄탄해야 함수 학습이 쉬워져!' },
      { type: 'mission', mission: '좌표평면을 그리고 다음 점을 표시해보기:\nA(2, 4), B(-3, 1), C(-2, -3), D(4, -2), E(0, 3)\n각 점이 어느 사분면에 있는지(또는 축 위인지) 적기', encouragement: '좌표평면은 그래프의 세계로 가는 관문이야!' },
    ],
  },

  'math-gold-5': {
    id: 'math-gold-5',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 5,
    title: '함수란 무엇인가',
    cards: [
      { type: 'concept', title: '함수 = 입력에 대해 출력이 하나', description: '함수(function): x값 하나에 y값 하나가 대응\n\n자판기로 비유하면:\n동전(입력 x) → 음료(출력 y)\n같은 동전에 항상 같은 음료가 나와야 함수!\n\nf(x) = 2x + 1이면:\nf(1) = 2(1) + 1 = 3\nf(3) = 2(3) + 1 = 7\nf(-2) = 2(-2) + 1 = -3\n\n함수가 아닌 것:\n한 x에 y가 2개 이상 → 함수 아님!\n예) x = 2일 때 y = 3이기도 하고 y = 5이기도 하면 함수 아님\n\n정의역: x가 될 수 있는 값들\n공역/치역: y가 될 수 있는 값들' },
      { type: 'summary', keywords: [
        { icon: '🎰', label: '함수', description: '하나의 입력에 하나의 출력이 대응' },
        { icon: '📥', label: '정의역', description: 'x(입력)가 될 수 있는 값의 범위' },
        { icon: '📤', label: '치역', description: 'y(출력)가 실제로 나오는 값의 범위' },
        { icon: 'f(x)', label: '함수 표현', description: 'f(x) = 식으로 함수를 나타냄' },
      ]},
      { type: 'example', bad: { label: '함수 아닌 것을 함수로', story: '"x가 2일 때 y가 3도 되고 -3도 된다면 함수야"\nx값 하나에 y값 2개 → 함수가 아닌데 함수라고 착각.' }, good: { label: '올바른 판단', story: 'f(x) = x²에서\nf(2) = 4, f(-2) = 4\nx가 달라도 y가 같을 수는 있어!\n핵심은 "하나의 x에 하나의 y"야.' }},
      { type: 'ox', statement: 'f(x) = x²에서 f(2) = f(-2)이면 함수가 아니다.', answer: false, feedback: '다른 x에서 같은 y가 나올 수는 있어!\n함수가 아닌 건 "하나의 x에서 y가 2개 이상"인 경우야.\nf(2) = f(-2) = 4는 아무 문제없어.' },
      { type: 'multipleChoice', question: 'f(x) = 3x - 2일 때, f(4)의 값은?', options: ['10', '12', '14', '8'], correctIndex: 0, explanation: 'f(4) = 3(4) - 2 = 12 - 2 = 10\nx에 4를 대입하면 돼!' },
      { type: 'feedback', summary: '함수 = 입력 하나 → 출력 하나, f(x)로 표현', message: '함수는 수학에서 가장 중요한 개념 중 하나야.\n그래프, 방정식, 미적분까지 모두 함수에서 시작돼!' },
      { type: 'mission', mission: 'f(x) = 2x + 3에 대해\nf(0), f(1), f(2), f(-1), f(-2)를 각각 구하고\n(x, f(x))를 좌표평면에 점으로 찍어보기', encouragement: '함수를 이해하면 수학의 절반을 이해한 거야!' },
    ],
  },

  'math-gold-6': {
    id: 'math-gold-6',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 6,
    title: '일차함수와 그래프',
    cards: [
      { type: 'concept', title: 'y = ax + b의 세계', description: '일차함수: y = ax + b (a ≠ 0)\n\n• a(기울기): 그래프의 기울어진 정도\n  a > 0: 오른쪽 위로 올라감 ↗\n  a < 0: 오른쪽 아래로 내려감 ↘\n  |a|가 크면: 가파름, |a|가 작으면: 완만\n\n• b(y절편): 그래프가 y축과 만나는 점\n  y축과 (0, b)에서 만남\n\n예) y = 2x + 3\n기울기 2: 오른쪽으로 1, 위로 2씩 이동\ny절편 3: (0, 3)에서 시작\n\n기울기 = (y의 변화량)/(x의 변화량)\n= (y₂ - y₁)/(x₂ - x₁)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '기울기(a)', description: '그래프가 기울어진 정도와 방향' },
        { icon: '📍', label: 'y절편(b)', description: 'y축과 만나는 점 (0, b)' },
        { icon: '↗️', label: 'a>0 증가', description: '기울기 양수면 오른쪽 위로' },
        { icon: '↘️', label: 'a<0 감소', description: '기울기 음수면 오른쪽 아래로' },
      ]},
      { type: 'example', bad: { label: '기울기 혼동', story: 'y = -2x + 5에서 "기울기가 5"라고 답했다.\nb(y절편)와 a(기울기)를 헷갈렸다.' }, good: { label: '올바른 분석', story: 'y = -2x + 5\n기울기(a) = -2 → 오른쪽 아래로 내려가는 직선\ny절편(b) = 5 → (0, 5)에서 시작' }},
      { type: 'ox', statement: '기울기가 음수이면 그래프는 오른쪽 아래로 내려간다.', answer: true, feedback: '맞아! 기울기가 음수(a < 0)면\nx가 커질수록 y는 작아져.\n그래서 오른쪽으로 갈수록 내려가!' },
      { type: 'multipleChoice', question: 'y = 3x - 1의 y절편과 기울기는?', options: ['y절편: 3, 기울기: -1', 'y절편: -1, 기울기: 3', 'y절편: 1, 기울기: 3', 'y절편: -1, 기울기: -3'], correctIndex: 1, explanation: 'y = ax + b에서\na(기울기) = 3, b(y절편) = -1\ny축과 (0, -1)에서 만나고 오른쪽 위로 올라가는 직선!' },
      { type: 'feedback', summary: '일차함수 y=ax+b → a는 기울기, b는 y절편', message: '일차함수의 그래프는 항상 직선이야.\n기울기와 y절편만 알면 그래프를 바로 그릴 수 있어!' },
      { type: 'mission', mission: '좌표평면에 다음 일차함수의 그래프를 그려보기:\n① y = x + 2\n② y = -x + 4\n③ y = 2x - 1\n각각 기울기와 y절편을 먼저 확인하고 그리기', encouragement: '일차함수의 그래프를 자유롭게 그리면 수학이 보이기 시작해!' },
    ],
  },

  'math-gold-7': {
    id: 'math-gold-7',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 7,
    title: '연립방정식',
    cards: [
      { type: 'concept', title: '미지수 2개, 방정식 2개 = 연립방정식', description: '연립방정식: 미지수가 2개인 방정식을 2개 묶어서 풀기\n\n예) x + y = 10\n    x - y = 4\n\n풀이법 1 — 가감법:\n두 식을 더하면: 2x = 14 → x = 7\nx = 7을 대입: 7 + y = 10 → y = 3\n\n풀이법 2 — 대입법:\nx + y = 10에서 x = 10 - y\n(10 - y) - y = 4\n10 - 2y = 4\ny = 3, x = 7\n\n두 방법 모두 같은 답!\n상황에 따라 편한 것을 선택하면 돼.' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연립방정식', description: '미지수 2개를 가진 방정식 2개의 조합' },
        { icon: '➕', label: '가감법', description: '두 식을 더하거나 빼서 미지수 하나를 제거' },
        { icon: '🔄', label: '대입법', description: '한 식을 정리해 다른 식에 대입' },
        { icon: '✅', label: '검증', description: '구한 해를 두 식 모두에 대입하여 확인' },
      ]},
      { type: 'example', bad: { label: '풀이 실수', story: 'x + y = 5, 2x + y = 8에서\n두 식을 더해 3x + 2y = 13을 만들었다.\n미지수가 하나도 사라지지 않아 풀 수 없었다.' }, good: { label: '올바른 풀이', story: '두 식을 빼면(아래 - 위):\n(2x + y) - (x + y) = 8 - 5\nx = 3\n대입: 3 + y = 5 → y = 2' }},
      { type: 'ox', statement: '연립방정식은 항상 가감법으로만 풀어야 한다.', answer: false, feedback: '가감법, 대입법 모두 가능해!\n계수가 같거나 비슷하면 가감법이 편하고,\n한 변수가 이미 정리되어 있으면 대입법이 편해.' },
      { type: 'multipleChoice', question: '2x + y = 7, x - y = 2를 가감법으로 풀면 x는?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: '두 식을 더하면:\n3x = 9\nx = 3\n검증: 2(3)+y=7→y=1, 3-1=2 ✓' },
      { type: 'feedback', summary: '연립방정식 = 가감법 또는 대입법으로 미지수 찾기', message: '연립방정식은 현실의 "조건 2개로 답 찾기"와 같아.\n사과 3개+배 2개=5000원, 사과 1개+배 3개=4500원\n→ 각각의 가격을 구할 수 있어!' },
      { type: 'mission', mission: '다음 연립방정식을 풀어보기:\n① x + y = 8, x - y = 2\n② 2x + 3y = 12, x + y = 5\n하나는 가감법, 하나는 대입법으로 풀어보기', encouragement: '연립방정식을 마스터하면 복잡한 문제도 풀 수 있어!' },
    ],
  },

  'math-gold-8': {
    id: 'math-gold-8',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 8,
    title: '이차방정식',
    cards: [
      { type: 'concept', title: 'ax² + bx + c = 0의 풀이', description: '이차방정식: 미지수의 최고 차수가 2\n\n풀이법 3가지:\n\n① 인수분해:\nx² - 5x + 6 = 0\n(x - 2)(x - 3) = 0\nx = 2 또는 x = 3\n\n② 완전제곱식:\nx² + 6x + 9 = 0\n(x + 3)² = 0\nx = -3\n\n③ 근의 공식:\nx = (-b ± √(b²-4ac)) / 2a\n\nb²-4ac(판별식):\n> 0: 서로 다른 두 근\n= 0: 중근(같은 근 2개)\n< 0: 실수 근 없음' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '인수분해', description: '곱이 c, 합이 b인 두 수를 찾아 분해' },
        { icon: '📐', label: '근의 공식', description: 'x = (-b±√(b²-4ac))/2a' },
        { icon: '🔍', label: '판별식', description: 'b²-4ac로 근의 개수 판단' },
        { icon: '✌️', label: '해가 2개', description: '이차방정식의 해는 최대 2개' },
      ]},
      { type: 'example', bad: { label: '흔한 실수', story: 'x² = 9에서 x = 3만 답으로 썼다.\nx = -3도 답이라는 걸 빠뜨렸다.' }, good: { label: '올바른 풀이', story: 'x² = 9\nx² - 9 = 0\n(x+3)(x-3) = 0\nx = 3 또는 x = -3\n이차방정식은 해가 2개일 수 있어!' }},
      { type: 'ox', statement: '이차방정식의 해는 항상 2개이다.', answer: false, feedback: '판별식에 따라 달라져!\nb²-4ac > 0: 2개\nb²-4ac = 0: 1개(중근)\nb²-4ac < 0: 실수 해 없음' },
      { type: 'multipleChoice', question: 'x² - 7x + 12 = 0의 두 근은?', options: ['x = 2, 6', 'x = 3, 4', 'x = -3, -4', 'x = 1, 12'], correctIndex: 1, explanation: '곱이 12이고 합이 7인 두 수: 3과 4\n(x-3)(x-4) = 0\nx = 3 또는 x = 4' },
      { type: 'feedback', summary: '이차방정식 = 인수분해 또는 근의 공식으로 풀기', message: '이차방정식은 포물선의 x절편을 구하는 것과 같아.\n다음 단계인 이차함수와 직결되니 잘 익혀두자!' },
      { type: 'mission', mission: '다음 이차방정식을 풀어보기:\n① x² + 5x + 6 = 0 (인수분해)\n② x² - 4 = 0\n③ 2x² + 3x - 2 = 0 (근의 공식)', encouragement: '이차방정식은 대수의 꽃이야! 이걸 풀면 진짜 실력자!' },
    ],
  },

  'math-gold-9': {
    id: 'math-gold-9',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 9,
    title: '이차함수와 포물선',
    cards: [
      { type: 'concept', title: 'y = ax² + bx + c의 그래프', description: '이차함수의 그래프 = 포물선(parabola)\n\n• a > 0: 아래로 볼록 (U자) — 최솟값 있음\n• a < 0: 위로 볼록 (∩자) — 최댓값 있음\n• |a|가 크면 좁은 포물선, 작으면 넓은 포물선\n\n꼭짓점: 포물선의 가장 높은/낮은 점\ny = a(x-p)² + q 형태에서 꼭짓점: (p, q)\n\n축의 방정식: x = p (대칭축)\n\n예) y = (x-3)² - 4\n꼭짓점: (3, -4)\n축: x = 3\na = 1 > 0이므로 아래로 볼록, 최솟값 -4' },
      { type: 'summary', keywords: [
        { icon: '⛰️', label: '포물선', description: '이차함수의 그래프 모양' },
        { icon: '📍', label: '꼭짓점', description: '포물선의 최고/최저점 (p, q)' },
        { icon: '📏', label: '대칭축', description: '꼭짓점을 지나는 수직선 x=p' },
        { icon: '↕️', label: 'a의 부호', description: 'a>0: 아래볼록, a<0: 위로볼록' },
      ]},
      { type: 'example', bad: { label: '그래프 오해', story: 'y = -x² + 4에서 "a가 음수니까 아래로 내려가는 직선"이라고 생각했다.\n이차함수는 직선이 아니라 포물선이야!' }, good: { label: '올바른 분석', story: 'y = -x² + 4 = -(x-0)² + 4\n꼭짓점: (0, 4), 위로 볼록(∩)\n최댓값: 4, 대칭축: x = 0' }},
      { type: 'ox', statement: 'y = 2x²의 그래프는 위로 볼록한 포물선이다.', answer: false, feedback: 'a = 2 > 0이므로 아래로 볼록(U자)이야!\na가 양수면 아래로, 음수면 위로 볼록!' },
      { type: 'multipleChoice', question: 'y = (x+2)² - 1의 꼭짓점은?', options: ['(2, -1)', '(-2, -1)', '(2, 1)', '(-2, 1)'], correctIndex: 1, explanation: 'y = (x-(-2))² + (-1)\np = -2, q = -1\n꼭짓점: (-2, -1)' },
      { type: 'feedback', summary: '이차함수 = 포물선, 꼭짓점과 a의 부호가 핵심', message: '이차함수는 물체를 던졌을 때의 궤적, 다리의 아치 등\n현실 세계에서 정말 많이 등장하는 중요한 함수야!' },
      { type: 'mission', mission: 'y = x², y = 2x², y = -x²의 그래프를\n같은 좌표평면에 그려보기\na값에 따라 그래프가 어떻게 변하는지 비교하기', encouragement: '포물선의 비밀을 알면 세상의 곡선이 보여!' },
    ],
  },

  'math-gold-10': {
    id: 'math-gold-10',
    chapterKey: 'math',
    tierKey: 'gold',
    stageNumber: 10,
    title: '규칙과 패턴 찾기',
    cards: [
      { type: 'concept', title: '수학은 패턴의 학문이다', description: '패턴 찾기는 수학적 사고의 핵심이야.\n\n수 패턴:\n1, 4, 7, 10, ... → +3씩 증가 → 일반항: 3n - 2\n1, 4, 9, 16, ... → 제곱수 → 일반항: n²\n1, 1, 2, 3, 5, 8, ... → 앞 두 수의 합 → 피보나치\n\n도형 패턴:\n삼각형: 3, 6, 10, 15, ... → n(n+1)/2\n정사각형: 1, 4, 9, 16, ... → n²\n\n패턴 찾기 전략:\n1) 차이를 구해보기 (등차?)\n2) 비를 구해보기 (등비?)\n3) 제곱, 세제곱 관계 확인\n4) 그림으로 그려보기' },
      { type: 'summary', keywords: [
        { icon: '🔁', label: '등차 패턴', description: '같은 수만큼 더해지는 규칙 (+3, +5...)' },
        { icon: '✖️', label: '등비 패턴', description: '같은 수를 곱하는 규칙 (×2, ×3...)' },
        { icon: '📐', label: '도형 패턴', description: '도형의 개수 변화에 숨은 규칙' },
        { icon: '💡', label: '일반항', description: 'n번째 항을 n으로 표현하는 공식' },
      ]},
      { type: 'example', bad: { label: '패턴 못 찾은 경우', story: '2, 6, 18, 54, ...에서 다음 수를 못 찾았다.\n차이만 보고 일정하지 않다고 포기했다.' }, good: { label: '패턴 발견', story: '차이가 일정하지 않으니 비를 확인해봤다.\n6÷2=3, 18÷6=3, 54÷18=3 → ×3씩!\n다음 수: 54×3 = 162' }},
      { type: 'ox', statement: '패턴을 찾으려면 반드시 공식을 알아야 한다.', answer: false, feedback: '공식 없이도 차이나 비를 관찰하면 패턴을 찾을 수 있어.\n관찰력과 논리적 사고가 더 중요해!' },
      { type: 'multipleChoice', question: '1, 3, 6, 10, 15, ... 의 다음 수는?', options: ['18', '20', '21', '25'], correctIndex: 2, explanation: '차이: 2, 3, 4, 5, ...\n다음 차이: 6\n15 + 6 = 21\n이것은 삼각수 패턴이야! n(n+1)/2' },
      { type: 'feedback', summary: '패턴 찾기 = 차이→비→제곱 순서로 관찰', message: '골드 과정을 마쳤어! 대수와 함수의 기초를 다졌어.\n플래티넘에서 기하와 측정의 세계로 넘어가자!' },
      { type: 'mission', mission: '다음 패턴의 규칙을 찾고 빈칸을 채우기:\n① 5, 10, 15, 20, __, __\n② 2, 4, 8, 16, __, __\n③ 1, 4, 9, 16, 25, __, __\n④ 1, 1, 2, 3, 5, __, __', encouragement: '패턴을 찾는 눈이 곧 수학적 감각이야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 플래티넘 (기하와 측정) 1~10
  // ═══════════════════════════════════════

  'math-platinum-1': {
    id: 'math-platinum-1',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 1,
    title: '점, 선, 면의 기본',
    cards: [
      { type: 'concept', title: '기하학의 기본 요소', description: '기하학(geometry) = "땅을 측정하는 학문"\n\n기본 요소:\n• 점(point): 위치만 있고 크기 없음\n• 선(line): 점이 이동한 궤적, 길이만 있음\n• 면(plane): 선이 이동한 궤적, 넓이가 있음\n\n직선, 반직선, 선분:\n직선: 양쪽으로 무한히 뻗음 ←──────→\n반직선: 한쪽만 무한 ●──────→\n선분: 양쪽 끝이 있음 ●────────●\n\n두 직선의 관계:\n• 평행: 만나지 않음 (∥)\n• 수직: 90°로 만남 (⊥)\n• 교차: 한 점에서 만남' },
      { type: 'summary', keywords: [
        { icon: '•', label: '점', description: '위치만 있고 크기가 없는 기본 요소' },
        { icon: '─', label: '선', description: '직선, 반직선, 선분의 세 종류' },
        { icon: '▭', label: '면', description: '넓이를 가진 평평한 영역' },
        { icon: '∥⊥', label: '평행·수직', description: '두 직선의 관계: 만남/안 만남/직각' },
      ]},
      { type: 'example', bad: { label: '혼동', story: '"선분과 직선은 같은 거 아니야?"\n선분은 끝이 있고, 직선은 양쪽으로 무한한 차이를 몰랐다.' }, good: { label: '올바른 구분', story: '선분 AB: A에서 B까지만\n반직선 AB: A에서 시작해 B방향으로 무한\n직선 AB: 양쪽 무한\n각각 다른 개념!' }},
      { type: 'ox', statement: '직선은 두 개의 끝점을 가진다.', answer: false, feedback: '끝점이 있는 것은 선분이야.\n직선은 양쪽으로 무한히 뻗기 때문에 끝점이 없어!' },
      { type: 'multipleChoice', question: '두 직선이 90°로 만나는 관계를 무엇이라 하는가?', options: ['평행', '수직', '교차', '대칭'], correctIndex: 1, explanation: '두 직선이 직각(90°)으로 만나면 수직이야.\n기호로 ⊥를 사용해.' },
      { type: 'feedback', summary: '점·선·면 = 기하학의 ABC', message: '이 기본 요소들이 모여 삼각형, 원, 입체도형 등\n모든 기하 도형이 만들어져!' },
      { type: 'mission', mission: '주변에서 다음을 찾아보기:\n① 평행한 두 직선의 예시 3가지\n② 수직인 두 직선의 예시 3가지\n(힌트: 철도, 창문, 책상 등)', encouragement: '기하학은 눈에 보이는 모든 것의 수학이야!' },
    ],
  },

  'math-platinum-2': {
    id: 'math-platinum-2',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 2,
    title: '각도의 이해',
    cards: [
      { type: 'concept', title: '각도 = 두 반직선이 벌린 정도', description: '각(angle): 한 점에서 시작하는 두 반직선의 벌어진 정도\n꼭짓점: 두 반직선의 공통 시작점\n\n각의 종류:\n• 예각: 0° < θ < 90° (뾰족)\n• 직각: θ = 90° (ㄱ자)\n• 둔각: 90° < θ < 180° (넓적)\n• 평각: θ = 180° (일직선)\n\n각의 관계:\n• 맞꼭지각: 서로 같다 (X자로 만날 때)\n• 동위각/엇각: 평행선에서 성립\n  평행선 + 동위각이 같으면 → 두 직선은 평행\n\n보각: 합이 90° (30° + 60°)\n여각: 합이 180° (120° + 60°)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '각의 종류', description: '예각(<90°), 직각(90°), 둔각(>90°)' },
        { icon: '❌', label: '맞꼭지각', description: '두 직선이 만들어 서로 같은 각' },
        { icon: '∥', label: '동위각·엇각', description: '평행선에서 같은 각의 관계' },
        { icon: '🔄', label: '보각·여각', description: '합이 90°(보각) 또는 180°(여각)' },
      ]},
      { type: 'example', bad: { label: '각 분류 실수', story: '95°를 예각이라고 답했다.\n90°보다 크면 둔각인데 혼동했다.' }, good: { label: '올바른 분류', story: '95° → 90°보다 크고 180°보다 작음 → 둔각!\n각의 종류를 판단할 때는 항상 90°, 180°와 비교하자.' }},
      { type: 'ox', statement: '맞꼭지각은 항상 크기가 같다.', answer: true, feedback: '맞아! 두 직선이 만나면 맞꼭지각은 항상 같아.\n이것은 증명이 가능한 기하학의 성질이야!' },
      { type: 'multipleChoice', question: '한 각이 65°일 때 그 보각은?', options: ['25°', '115°', '295°', '35°'], correctIndex: 0, explanation: '보각은 합이 90°인 각이야.\n90° - 65° = 25°' },
      { type: 'feedback', summary: '각도 = 예각/직각/둔각, 맞꼭지각·동위각의 성질', message: '각도를 이해하면 삼각형, 다각형 등\n모든 도형의 성질을 분석할 수 있어!' },
      { type: 'mission', mission: '① 시계에서 3시, 5시, 6시일 때 시침과 분침이 이루는 각도를 구해보기\n② 교실에서 예각, 직각, 둔각의 예를 하나씩 찾아보기', encouragement: '각도를 볼 수 있으면 세상의 구조가 보여!' },
    ],
  },

  'math-platinum-3': {
    id: 'math-platinum-3',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 3,
    title: '삼각형의 성질',
    cards: [
      { type: 'concept', title: '삼각형의 종류와 핵심 성질', description: '삼각형의 내각의 합 = 180° (항상!)\n\n변의 길이에 따라:\n• 정삼각형: 세 변 같음 (60°, 60°, 60°)\n• 이등변삼각형: 두 변 같음 (밑각도 같음)\n• 부등변삼각형: 세 변 다 다름\n\n각에 따라:\n• 예각삼각형: 세 각 모두 예각\n• 직각삼각형: 한 각이 90°\n• 둔각삼각형: 한 각이 둔각\n\n삼각형 성립 조건:\n가장 긴 변 < 나머지 두 변의 합\n예) 3, 4, 8 → 8 > 3+4=7 → 삼각형 불가!\n    3, 4, 5 → 5 < 3+4=7 → 삼각형 가능!' },
      { type: 'summary', keywords: [
        { icon: '🔺', label: '내각의 합', description: '삼각형의 세 각의 합은 항상 180°' },
        { icon: '📏', label: '변에 따른 분류', description: '정삼각형, 이등변, 부등변' },
        { icon: '📐', label: '각에 따른 분류', description: '예각, 직각, 둔각삼각형' },
        { icon: '⚠️', label: '성립 조건', description: '가장 긴 변 < 나머지 두 변의 합' },
      ]},
      { type: 'example', bad: { label: '실수', story: '변의 길이가 2, 3, 6인 삼각형을 그리려고 했다.\n6 > 2+3=5이므로 삼각형이 될 수 없다는 걸 몰랐다.' }, good: { label: '올바른 판단', story: '삼각형 성립 조건 확인:\n가장 긴 변(6) < 나머지 합(2+3=5)?\n6 > 5이므로 삼각형 불가!\n성립 조건을 먼저 확인하니 시간 낭비 없음.' }},
      { type: 'ox', statement: '삼각형의 세 각 중 둔각이 2개일 수 있다.', answer: false, feedback: '둔각이 2개면 합이 180°를 넘어!\n예: 100° + 100° = 200° > 180°\n삼각형에서 둔각은 최대 1개!' },
      { type: 'multipleChoice', question: '삼각형의 두 각이 45°, 65°일 때 나머지 각은?', options: ['60°', '70°', '80°', '90°'], correctIndex: 1, explanation: '세 각의 합 = 180°\n180° - 45° - 65° = 70°' },
      { type: 'feedback', summary: '삼각형 = 내각합 180° + 성립 조건 확인', message: '삼각형은 기하학의 가장 기본적인 도형이야.\n삼각형을 잘 알면 모든 다각형을 이해할 수 있어!' },
      { type: 'mission', mission: '① 세 각이 각각 60°인 삼각형, 30°-60°-90° 삼각형을 그려보기\n② 변의 길이 5, 7, 10으로 삼각형이 되는지 확인하기\n③ 내 주변에서 삼각형 모양 3가지 찾아보기', encouragement: '삼각형은 가장 안정적인 도형이야. 다리와 건물에 많이 쓰여!' },
    ],
  },

  'math-platinum-4': {
    id: 'math-platinum-4',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 4,
    title: '사각형의 종류와 성질',
    cards: [
      { type: 'concept', title: '사각형 패밀리', description: '사각형의 내각의 합 = 360°\n\n사각형의 종류 (포함 관계):\n\n사다리꼴: 한 쌍의 대변이 평행\n  ↓\n평행사변형: 두 쌍의 대변이 각각 평행\n  ↓         ↓\n직사각형   마름모\n(네 각이 직각) (네 변이 같음)\n  ↓         ↓\n      정사각형\n(네 각 직각 + 네 변 같음)\n\n평행사변형의 성질:\n• 대변의 길이가 같다\n• 대각의 크기가 같다\n• 대각선이 서로를 이등분한다' },
      { type: 'summary', keywords: [
        { icon: '▱', label: '평행사변형', description: '두 쌍의 대변이 각각 평행' },
        { icon: '▭', label: '직사각형', description: '네 각이 모두 직각 (90°)' },
        { icon: '◇', label: '마름모', description: '네 변의 길이가 모두 같음' },
        { icon: '⬜', label: '정사각형', description: '직사각형 + 마름모 (완벽한 사각형)' },
      ]},
      { type: 'example', bad: { label: '포함관계 오해', story: '"정사각형은 직사각형이 아니다"\n정사각형은 직사각형의 특수한 경우라는 걸 몰랐다.' }, good: { label: '올바른 이해', story: '정사각형은:\n- 직사각형이다 (네 각이 직각) ✓\n- 마름모이다 (네 변이 같음) ✓\n- 평행사변형이다 ✓\n모두 맞는 말이야!' }},
      { type: 'ox', statement: '정사각형은 마름모의 한 종류이다.', answer: true, feedback: '맞아! 마름모는 네 변이 같은 사각형이고,\n정사각형도 네 변이 같으니까 마름모에 포함돼.\n정사각형 = 직사각형 ∩ 마름모!' },
      { type: 'multipleChoice', question: '평행사변형에서 한 각이 70°이면 이웃한 각은?', options: ['70°', '90°', '110°', '180°'], correctIndex: 2, explanation: '평행사변형에서 이웃한 두 각의 합 = 180°\n180° - 70° = 110°\n대각은 같고(70°), 이웃각은 보충(110°)!' },
      { type: 'feedback', summary: '사각형 = 포함관계 이해 + 각 성질 파악', message: '사각형의 포함관계를 이해하면\n성질을 외울 필요 없이 논리적으로 유도할 수 있어!' },
      { type: 'mission', mission: '① 사각형 포함관계를 나무 그림으로 그려보기\n② 교실에서 직사각형, 평행사변형, 마름모 모양을 각각 찾아보기\n③ "직사각형이면서 마름모인 사각형"은 무엇인지 설명해보기', encouragement: '사각형의 관계를 이해하면 기하학적 사고력이 쑥 올라!' },
    ],
  },

  'math-platinum-5': {
    id: 'math-platinum-5',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 5,
    title: '원의 성질',
    cards: [
      { type: 'concept', title: '원 = 한 점에서 같은 거리의 점들의 모임', description: '원의 구성 요소:\n• 중심(O): 원의 한가운데 점\n• 반지름(r): 중심에서 원 위의 점까지 거리\n• 지름(d): 원을 지나는 가장 긴 선분 = 2r\n• 원주: 원 둘레의 길이\n• 호: 원 둘레의 일부분\n• 현: 원 위 두 점을 잇는 선분\n\n원주율 π(파이):\n원주 ÷ 지름 = π ≈ 3.14159...\n\n공식:\n원주 = 2πr = πd\n원의 넓이 = πr²\n\n예) r = 5cm\n원주 = 2 × π × 5 = 10π ≈ 31.4cm\n넓이 = π × 5² = 25π ≈ 78.5cm²' },
      { type: 'summary', keywords: [
        { icon: '⭕', label: '원의 정의', description: '한 점에서 같은 거리에 있는 점들의 집합' },
        { icon: 'π', label: '원주율', description: '원주÷지름 = π ≈ 3.14' },
        { icon: '📏', label: '원주', description: '원 둘레의 길이 = 2πr' },
        { icon: '📐', label: '원의 넓이', description: 'πr² (반지름의 제곱 × π)' },
      ]},
      { type: 'example', bad: { label: '혼동', story: '"반지름이 6이면 넓이는 6π야"\n넓이 공식은 πr²인데 πr로 계산한 실수.' }, good: { label: '올바른 계산', story: 'r = 6\n원주 = 2π(6) = 12π ≈ 37.7\n넓이 = π(6²) = 36π ≈ 113.1\nr을 제곱하는 걸 잊지 않았다!' }},
      { type: 'ox', statement: '원의 지름은 반지름의 2배이다.', answer: true, feedback: '맞아! 지름 = 2 × 반지름\n지름은 원의 중심을 지나는 가장 긴 현이야.' },
      { type: 'multipleChoice', question: '반지름이 7cm인 원의 넓이는? (π 사용)', options: ['14π cm²', '49π cm²', '7π cm²', '21π cm²'], correctIndex: 1, explanation: '넓이 = πr² = π × 7² = 49π cm²\n약 153.9 cm²야!' },
      { type: 'feedback', summary: '원 = π가 핵심, 원주 2πr, 넓이 πr²', message: '원은 자연에서 가장 많이 나타나는 도형이야.\nπ는 수학에서 가장 유명한 상수이기도 해!' },
      { type: 'mission', mission: '① 동전이나 컵의 지름을 자로 재고\n원주와 넓이를 계산해보기\n② 원주를 실로 재서 원주÷지름 = π인지 확인해보기', encouragement: '원은 모든 곳에 있어. 수학으로 측정해보자!' },
    ],
  },

  'math-platinum-6': {
    id: 'math-platinum-6',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 6,
    title: '넓이 구하기',
    cards: [
      { type: 'concept', title: '다양한 도형의 넓이 공식', description: '넓이 공식 모음:\n\n직사각형: 가로 × 세로\n정사각형: 한 변 × 한 변\n삼각형: 밑변 × 높이 ÷ 2\n평행사변형: 밑변 × 높이\n사다리꼴: (윗변 + 아랫변) × 높이 ÷ 2\n마름모: 대각선 × 대각선 ÷ 2\n원: πr²\n\n왜 이런 공식이 나오는지 이해하기:\n• 삼각형 = 직사각형의 절반 (÷2)\n• 평행사변형 = 잘라서 직사각형으로\n• 사다리꼴 = 2개 붙이면 평행사변형\n\n원리를 알면 공식을 잊어도 다시 유도할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '▭', label: '직사각형', description: '가로 × 세로' },
        { icon: '△', label: '삼각형', description: '밑변 × 높이 ÷ 2' },
        { icon: '▱', label: '사다리꼴', description: '(윗변+아랫변) × 높이 ÷ 2' },
        { icon: '⭕', label: '원', description: 'πr²' },
      ]},
      { type: 'example', bad: { label: '높이 혼동', story: '평행사변형의 빗변을 높이로 사용했다.\n높이는 밑변에 수직인 거리인데 빗변과 혼동했다.' }, good: { label: '올바른 계산', story: '높이 = 밑변에서 수직으로 내린 선분의 길이\n빗변이 아니라 수직 거리가 높이야!\n밑변 8, 높이 5 → 넓이 = 8×5 = 40' }},
      { type: 'ox', statement: '평행사변형의 넓이는 밑변 × 빗변이다.', answer: false, feedback: '밑변 × "높이"가 맞아!\n높이는 빗변이 아니라 밑변에 수직인 거리야.\n평행사변형을 잘라서 직사각형으로 만들어보면 이해돼!' },
      { type: 'multipleChoice', question: '윗변 4, 아랫변 8, 높이 5인 사다리꼴의 넓이는?', options: ['20', '30', '40', '60'], correctIndex: 1, explanation: '(윗변+아랫변)×높이÷2\n= (4+8) × 5 ÷ 2\n= 12 × 5 ÷ 2\n= 30' },
      { type: 'feedback', summary: '넓이 = 기본 직사각형에서 변형하여 유도', message: '모든 넓이 공식은 직사각형에서 출발해.\n원리를 이해하면 어떤 도형이든 넓이를 구할 수 있어!' },
      { type: 'mission', mission: '방 또는 교실의 바닥 넓이를 구해보기:\n① 가로, 세로를 자로 재기\n② 넓이 계산하기 (m²)\n③ 만약 삼각형 모양의 공간이 있다면 그것도 계산해보기', encouragement: '넓이 계산은 건축, 인테리어, 농업 등 어디서나 필요해!' },
    ],
  },

  'math-platinum-7': {
    id: 'math-platinum-7',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 7,
    title: '부피와 겉넓이',
    cards: [
      { type: 'concept', title: '3D 도형의 부피와 겉넓이', description: '부피: 입체도형이 차지하는 공간의 크기\n겉넓이: 입체도형의 바깥 면의 넓이 합\n\n직육면체:\n부피 = 가로 × 세로 × 높이\n겉넓이 = 2(가로×세로 + 세로×높이 + 가로×높이)\n\n원기둥:\n부피 = πr²h (밑면 넓이 × 높이)\n겉넓이 = 2πr² + 2πrh (위아래 원 + 옆면)\n\n원뿔:\n부피 = πr²h ÷ 3 (원기둥의 1/3)\n\n구:\n부피 = 4πr³/3\n겉넓이 = 4πr²\n\n단위: 부피는 cm³ 또는 L (1L = 1000cm³)' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '직육면체', description: '부피 = 가로×세로×높이' },
        { icon: '🥫', label: '원기둥', description: '부피 = πr²h, 겉넓이 = 2πr²+2πrh' },
        { icon: '🔺', label: '원뿔', description: '부피 = πr²h/3 (원기둥의 1/3)' },
        { icon: '⚽', label: '구', description: '부피 = 4πr³/3, 겉넓이 = 4πr²' },
      ]},
      { type: 'example', bad: { label: '단위 실수', story: '부피를 cm²로 표기했다.\ncm²는 넓이 단위이고, 부피는 cm³!' }, good: { label: '올바른 계산', story: '가로 3cm, 세로 4cm, 높이 5cm 직육면체\n부피 = 3 × 4 × 5 = 60cm³\n겉넓이 = 2(12 + 20 + 15) = 94cm²\n단위를 정확히 구분!' }},
      { type: 'ox', statement: '원뿔의 부피는 같은 밑면과 높이를 가진 원기둥의 절반이다.', answer: false, feedback: '원뿔은 원기둥의 1/3이야!\n원기둥의 1/2이 아니라 1/3.\n실제로 물을 부어 확인하면 정확히 3번 채워야 해.' },
      { type: 'multipleChoice', question: '반지름 3cm, 높이 10cm인 원기둥의 부피는?', options: ['30π cm³', '60π cm³', '90π cm³', '120π cm³'], correctIndex: 2, explanation: 'V = πr²h = π × 3² × 10 = 90π cm³\n약 282.7 cm³야!' },
      { type: 'feedback', summary: '부피 = 3차원 공간 차지량, 겉넓이 = 표면의 총 넓이', message: '부피와 겉넓이는 실생활에서 정말 많이 쓰여.\n상자 만들기, 페인트 칠하기, 물통 용량 계산 등!' },
      { type: 'mission', mission: '집에 있는 직육면체 모양의 물건(상자, 필통 등)의\n가로, 세로, 높이를 재서\n부피와 겉넓이를 계산해보기', encouragement: '3D를 수학으로 이해하는 것, 그게 기하학의 힘이야!' },
    ],
  },

  'math-platinum-8': {
    id: 'math-platinum-8',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 8,
    title: '합동과 닮음',
    cards: [
      { type: 'concept', title: '합동 = 완전히 같은 도형, 닮음 = 모양이 같은 도형', description: '합동(≅): 모양과 크기가 완전히 같음\n→ 하나를 옮기면 다른 것에 딱 겹침\n\n삼각형의 합동 조건:\n• SSS: 세 변이 각각 같음\n• SAS: 두 변과 그 끼인각이 같음\n• ASA: 한 변과 양 끝각이 같음\n\n닮음(∼): 모양은 같고 크기만 다름\n→ 확대/축소한 관계\n\n닮음비: 대응하는 변의 길이의 비\n닮음비가 a:b이면\n• 둘레의 비 = a:b\n• 넓이의 비 = a²:b²\n• 부피의 비 = a³:b³\n\n예) 닮음비 1:2이면\n넓이는 1:4, 부피는 1:8!' },
      { type: 'summary', keywords: [
        { icon: '≅', label: '합동', description: '모양과 크기가 완전히 같은 도형' },
        { icon: '∼', label: '닮음', description: '모양은 같고 크기만 다른 도형' },
        { icon: '📐', label: '합동 조건', description: 'SSS, SAS, ASA (삼각형)' },
        { icon: '📊', label: '닮음비', description: '길이비 a:b → 넓이 a²:b² → 부피 a³:b³' },
      ]},
      { type: 'example', bad: { label: '닮음비 오해', story: '닮음비가 1:3이면 넓이도 1:3이라고 답했다.\n넓이는 닮음비의 제곱이라는 걸 몰랐다.' }, good: { label: '올바른 계산', story: '닮음비 1:3\n길이비 = 1:3\n넓이비 = 1²:3² = 1:9\n부피비 = 1³:3³ = 1:27' }},
      { type: 'ox', statement: '두 닮은 도형의 닮음비가 2:3이면 넓이의 비도 2:3이다.', answer: false, feedback: '넓이비 = 닮음비의 제곱!\n2:3 → 넓이비 = 4:9\n길이가 2배면 넓이는 4배가 되는 것과 같은 원리야!' },
      { type: 'multipleChoice', question: '삼각형의 합동 조건이 아닌 것은?', options: ['SSS (세 변)', 'SAS (두 변과 끼인각)', 'SSA (두 변과 끼이지 않은 각)', 'ASA (한 변과 양 끝각)'], correctIndex: 2, explanation: 'SSA는 합동 조건이 아니야!\n두 변과 끼이지 않은 각으로는\n두 가지 다른 삼각형이 만들어질 수 있어.' },
      { type: 'feedback', summary: '합동=같은 도형, 닮음=확대축소, 닮음비의 제곱/세제곱', message: '합동과 닮음은 도형의 관계를 이해하는 핵심이야.\n지도, 모형, 설계도 등 실생활에서도 닮음이 쓰여!' },
      { type: 'mission', mission: '① 같은 모양의 종이컵 2개 준비하기 (합동)\n② 큰 사진과 작은 사진으로 닮음비 구해보기\n③ 닮음비가 1:2인 두 정사각형의 넓이비 계산하기', encouragement: '합동과 닮음은 수학과 현실을 연결하는 다리야!' },
    ],
  },

  'math-platinum-9': {
    id: 'math-platinum-9',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 9,
    title: '피타고라스 정리',
    cards: [
      { type: 'concept', title: 'a² + b² = c² — 수학의 보석', description: '피타고라스 정리:\n직각삼각형에서\n빗변(c)의 제곱 = 나머지 두 변의 제곱의 합\n\na² + b² = c²\n\n예) 3, 4, 5 직각삼각형:\n3² + 4² = 9 + 16 = 25 = 5² ✓\n\n대표적인 직각삼각형:\n(3, 4, 5), (5, 12, 13), (8, 15, 17)\n\n활용:\n• 대각선 길이 구하기\n• 두 점 사이 거리 구하기\n• 높이 구하기\n\n좌표평면에서 두 점 (x₁,y₁), (x₂,y₂) 사이 거리:\nd = √((x₂-x₁)² + (y₂-y₁)²)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '피타고라스', description: 'a² + b² = c² (직각삼각형)' },
        { icon: '📏', label: '빗변', description: '직각의 맞은편에 있는 가장 긴 변' },
        { icon: '📍', label: '거리 공식', description: '좌표평면에서 두 점 사이 거리' },
        { icon: '🔢', label: '피타고라스 수', description: '(3,4,5), (5,12,13) 등의 정수 조합' },
      ]},
      { type: 'example', bad: { label: '빗변 혼동', story: '빗변이 아닌 변에 c²을 놓고 계산했다.\n빗변은 항상 직각의 맞은편이고 가장 긴 변이야.' }, good: { label: '올바른 활용', story: '직각삼각형에서 두 변이 6, 8일 때 빗변 구하기:\n6² + 8² = 36 + 64 = 100\nc² = 100, c = 10' }},
      { type: 'ox', statement: '피타고라스 정리는 모든 삼각형에 적용된다.', answer: false, feedback: '직각삼각형에서만 성립해!\n직각이 없는 삼각형에는 코사인 법칙을 사용해야 해.\n"직각삼각형 전용"이라는 걸 기억하자!' },
      { type: 'multipleChoice', question: '직각삼각형의 두 변이 5, 12일 때 빗변은?', options: ['15', '13', '17', '14'], correctIndex: 1, explanation: '5² + 12² = 25 + 144 = 169\nc = √169 = 13\n(5, 12, 13)은 유명한 피타고라스 수야!' },
      { type: 'feedback', summary: '피타고라스 정리 = 직각삼각형의 핵심 도구', message: '피타고라스 정리는 2500년 전에 발견됐지만\n지금도 건축, 항해, GPS 등에 쓰이는 수학의 보석이야!' },
      { type: 'mission', mission: '① 직각삼각형의 두 변이 8, 15일 때 빗변 구하기\n② 좌표 (1, 2)와 (4, 6) 사이 거리 구하기\n③ 교실 바닥의 대각선 길이를 피타고라스 정리로 계산해보기', encouragement: '피타고라스 정리는 수학에서 가장 아름다운 정리 중 하나야!' },
    ],
  },

  'math-platinum-10': {
    id: 'math-platinum-10',
    chapterKey: 'math',
    tierKey: 'platinum',
    stageNumber: 10,
    title: '도형의 이동',
    cards: [
      { type: 'concept', title: '평행이동, 대칭이동, 회전이동', description: '도형의 이동: 모양과 크기를 유지한 채 위치만 변경\n\n① 평행이동:\n모든 점을 같은 방향, 같은 거리만큼 이동\n(x, y) → (x+a, y+b)\n\n② 대칭이동:\nx축 대칭: (x, y) → (x, -y)\ny축 대칭: (x, y) → (-x, y)\n원점 대칭: (x, y) → (-x, -y)\n\n③ 회전이동:\n한 점을 중심으로 일정 각도만큼 회전\n90° 회전: (x, y) → (-y, x)\n180° 회전 = 원점 대칭\n\n이동 후에도 도형의 모양과 크기는 변하지 않아!\n→ 합동인 도형이 만들어져.' },
      { type: 'summary', keywords: [
        { icon: '➡️', label: '평행이동', description: '같은 방향·거리로 밀기 (x+a, y+b)' },
        { icon: '🪞', label: '대칭이동', description: '축이나 점을 기준으로 뒤집기' },
        { icon: '🔄', label: '회전이동', description: '한 점 중심으로 돌리기' },
        { icon: '≅', label: '합동 유지', description: '이동 후에도 모양·크기 동일' },
      ]},
      { type: 'example', bad: { label: '대칭 혼동', story: '점 (3, 4)의 x축 대칭을 (-3, 4)로 답했다.\nx축 대칭은 y값의 부호가 바뀌는 건데 x값을 바꿈.' }, good: { label: '올바른 변환', story: '점 (3, 4)의:\nx축 대칭: (3, -4) — y만 반대\ny축 대칭: (-3, 4) — x만 반대\n원점 대칭: (-3, -4) — 둘 다 반대' }},
      { type: 'ox', statement: '도형을 회전이동하면 크기가 변한다.', answer: false, feedback: '회전이동은 모양과 크기를 유지해!\n돌리는 것뿐이야. 합동인 도형이 만들어져.\n크기가 변하는 건 "확대/축소"야.' },
      { type: 'multipleChoice', question: '점 (2, -5)를 y축에 대해 대칭이동하면?', options: ['(2, 5)', '(-2, -5)', '(-2, 5)', '(5, -2)'], correctIndex: 1, explanation: 'y축 대칭: x좌표의 부호만 바뀜!\n(2, -5) → (-2, -5)' },
      { type: 'feedback', summary: '도형 이동 = 평행·대칭·회전, 합동 유지', message: '플래티넘 과정을 마쳤어! 기하의 기초를 완성했어.\n다이아에서 확률·통계와 종합 응용에 도전하자!' },
      { type: 'mission', mission: '좌표평면에 삼각형 A(1,1), B(4,1), C(1,3)을 그리고\n① x축 대칭이동한 삼각형\n② 오른쪽으로 3, 위로 2 평행이동한 삼각형\n각각 그려보기', encouragement: '도형의 이동을 마스터하면 기하학의 달인이야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (확률·통계와 응용) 1~10
  // ═══════════════════════════════════════

  'math-diamond-1': {
    id: 'math-diamond-1',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 1,
    title: '자료의 정리와 표현',
    cards: [
      { type: 'concept', title: '자료를 정리하는 방법', description: '통계의 첫 걸음 = 자료(데이터)를 보기 좋게 정리하기\n\n정리 방법:\n\n① 도수분포표:\n자료를 구간(계급)으로 나눠 빈도 정리\n예) 시험 점수: 60~70점 5명, 70~80점 8명...\n\n② 히스토그램:\n도수분포표를 막대그래프로 표현\n(막대 사이에 간격 없음)\n\n③ 도수분포다각형:\n히스토그램의 막대 꼭대기를 연결한 꺾은선\n\n④ 줄기와 잎 그림:\n숫자를 줄기(앞자리)와 잎(뒷자리)으로 나눔\n원래 자료를 보존하면서 정리!\n\n⑤ 원그래프/띠그래프:\n비율을 시각적으로 표현' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '도수분포표', description: '자료를 구간별로 나눠 빈도를 정리한 표' },
        { icon: '📊', label: '히스토그램', description: '도수분포표의 막대그래프 표현' },
        { icon: '🌿', label: '줄기와 잎', description: '원래 자료를 보존하는 정리법' },
        { icon: '🥧', label: '원그래프', description: '비율을 원형으로 시각화' },
      ]},
      { type: 'example', bad: { label: '정리 없이 분석', story: '자료 30개를 그대로 나열하고 특징을 찾으려 했다.\n정리하지 않으니 패턴이 안 보였다.' }, good: { label: '정리 후 분석', story: '도수분포표로 구간별 인원을 정리하니\n70~80점대가 가장 많다는 걸 한눈에 알 수 있었다.' }},
      { type: 'ox', statement: '히스토그램은 막대 사이에 간격이 있다.', answer: false, feedback: '히스토그램은 연속된 자료를 나타내므로\n막대 사이에 간격이 없어!\n간격이 있는 건 일반 막대그래프야.' },
      { type: 'multipleChoice', question: '원래 자료값을 보존하면서 정리할 수 있는 방법은?', options: ['히스토그램', '원그래프', '줄기와 잎 그림', '도수분포표'], correctIndex: 2, explanation: '줄기와 잎 그림은 숫자를 그대로 보존해!\n예: 73 → 줄기 7, 잎 3\n원래 값을 확인하면서 분포도 볼 수 있어.' },
      { type: 'feedback', summary: '자료 정리 = 통계의 첫 걸음, 상황에 맞는 방법 선택', message: '자료를 정리하면 숫자 더미 속에서\n의미 있는 정보가 보이기 시작해!' },
      { type: 'mission', mission: '반 친구들(또는 가족)의 키 자료를 수집하고\n① 줄기와 잎 그림으로 정리\n② 도수분포표 만들기\n③ 히스토그램 그리기', encouragement: '자료를 정리하는 것이 데이터 과학의 시작이야!' },
    ],
  },

  'math-diamond-2': {
    id: 'math-diamond-2',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 2,
    title: '대푯값: 평균, 중앙값, 최빈값',
    cards: [
      { type: 'concept', title: '자료를 대표하는 값 3가지', description: '대푯값: 자료 전체를 하나의 수로 요약\n\n① 평균(mean):\n모든 값의 합 ÷ 개수\n예) 3, 5, 7, 9, 11 → 합=35, 평균=7\n\n② 중앙값(median):\n크기순으로 나열했을 때 가운데 값\n예) 3, 5, 7, 9, 11 → 중앙값=7\n짝수 개면 가운데 두 수의 평균\n\n③ 최빈값(mode):\n가장 많이 나타나는 값\n예) 3, 5, 5, 7, 9 → 최빈값=5\n\n어떤 대푯값을 쓸까?\n• 극단값(이상치)이 있으면: 중앙값이 적합\n• 연봉 같은 편향 자료: 중앙값\n• 일반적인 경우: 평균\n• 인기 조사: 최빈값' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '평균', description: '(합계) ÷ (개수), 가장 흔한 대푯값' },
        { icon: '🎯', label: '중앙값', description: '크기순 가운데 값, 이상치에 강함' },
        { icon: '🏆', label: '최빈값', description: '가장 자주 나타나는 값' },
        { icon: '⚠️', label: '이상치', description: '극단적인 값은 평균을 왜곡할 수 있음' },
      ]},
      { type: 'example', bad: { label: '평균의 함정', story: '월급: 200, 200, 300, 300, 5000만원\n평균 = 1200만원 → "평균 월급이 1200만원!"이라 했지만\n실제로 4명은 200~300만원이라 대표성이 없다.' }, good: { label: '적절한 대푯값', story: '같은 자료에서 중앙값 = 300만원\n극단값(5000만)의 영향을 받지 않아\n실제 상황을 더 정확히 대표한다.' }},
      { type: 'ox', statement: '평균이 항상 가장 좋은 대푯값이다.', answer: false, feedback: '극단값(이상치)이 있으면 평균이 왜곡돼.\n이때는 중앙값이 더 적합해!\n상황에 맞는 대푯값을 선택하는 게 중요해.' },
      { type: 'multipleChoice', question: '자료 2, 3, 3, 5, 7의 중앙값은?', options: ['3', '4', '5', '3.5'], correctIndex: 0, explanation: '이미 크기순: 2, 3, 3, 5, 7\n5개이므로 가운데(3번째) 값 = 3\n중앙값 = 3!' },
      { type: 'feedback', summary: '평균·중앙값·최빈값을 상황에 맞게 선택', message: '뉴스에서 "평균"이라는 말이 나오면\n"중앙값은 얼마일까?" 생각해보자.\n통계적 사고력이 쑥 올라갈 거야!' },
      { type: 'mission', mission: '가족 구성원(또는 친구)의 용돈을 조사하고\n평균, 중앙값, 최빈값을 모두 구해보기\n어떤 대푯값이 가장 적절한지 판단해보기', encouragement: '대푯값을 구별하는 눈이 곧 통계적 사고력이야!' },
    ],
  },

  'math-diamond-3': {
    id: 'math-diamond-3',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 3,
    title: '산포도: 분산과 표준편차',
    cards: [
      { type: 'concept', title: '자료가 얼마나 흩어져 있는가?', description: '산포도: 자료가 대푯값 주변에 얼마나 퍼져 있는지\n\nA반 점수: 70, 70, 70, 70, 70 → 평균 70, 편차 없음\nB반 점수: 50, 60, 70, 80, 90 → 평균 70, 많이 흩어짐\n\n편차 = 각 값 - 평균\n분산 = 편차²의 평균\n표준편차 = √분산\n\n계산 예) 자료: 2, 4, 6, 8, 10\n평균 = 6\n편차: -4, -2, 0, 2, 4\n편차²: 16, 4, 0, 4, 16\n분산 = (16+4+0+4+16)/5 = 8\n표준편차 = √8 ≈ 2.83\n\n표준편차가 작으면 → 자료가 평균 주변에 모여 있음\n표준편차가 크면 → 자료가 넓게 퍼져 있음' },
      { type: 'summary', keywords: [
        { icon: '📏', label: '편차', description: '각 값에서 평균을 뺀 것' },
        { icon: '📊', label: '분산', description: '편차 제곱의 평균 (퍼짐의 정도)' },
        { icon: 'σ', label: '표준편차', description: '√분산, 실제 단위와 같은 퍼짐' },
        { icon: '🎯', label: '작을수록 집중', description: '표준편차가 작으면 평균 주변에 모임' },
      ]},
      { type: 'example', bad: { label: '평균만 보는 실수', story: '두 학생의 평균이 80점으로 같다며 실력이 같다고 판단했다.\nA: 78,79,80,81,82 (안정적) vs B: 50,60,100,90,100 (들쑥날쑥)\n표준편차를 보면 완전히 다르다.' }, good: { label: '산포도까지 보기', story: '평균이 같아도 표준편차가 다르면\n자료의 특성이 완전히 달라.\nA(표준편차 1.4) vs B(표준편차 20.0)\n→ B가 훨씬 불안정한 성적!' }},
      { type: 'ox', statement: '평균이 같으면 두 자료는 같은 특성을 가진다.', answer: false, feedback: '평균이 같아도 산포도가 다를 수 있어!\n평균 + 표준편차를 함께 봐야\n자료의 진짜 특성을 알 수 있어.' },
      { type: 'multipleChoice', question: '자료 4, 4, 4, 4, 4의 표준편차는?', options: ['0', '1', '4', '계산 불가'], correctIndex: 0, explanation: '모든 값이 같으면 편차가 모두 0!\n분산 = 0, 표준편차 = √0 = 0\n전혀 흩어지지 않았다는 뜻이야.' },
      { type: 'feedback', summary: '평균 + 표준편차 = 자료의 완전한 요약', message: '평균은 "어디에 모여 있나", 표준편차는 "얼마나 퍼져 있나"\n이 둘을 함께 보면 자료를 완전히 파악할 수 있어!' },
      { type: 'mission', mission: '다음 두 자료의 평균과 표준편차를 각각 구해보기:\nA: 5, 5, 5, 5, 5\nB: 1, 3, 5, 7, 9\n두 자료의 차이를 설명해보기', encouragement: '산포도를 이해하면 데이터를 제대로 읽는 눈이 생겨!' },
    ],
  },

  'math-diamond-4': {
    id: 'math-diamond-4',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 4,
    title: '경우의 수',
    cards: [
      { type: 'concept', title: '경우의 수 = 가능한 결과의 개수', description: '경우의 수를 세는 두 가지 원리:\n\n① 합의 법칙 (또는, or):\nA 또는 B → 경우의 수 = a + b\n예) 버스 3대, 지하철 2호선 → 가는 방법: 3+2 = 5가지\n\n② 곱의 법칙 (그리고, and):\nA 그리고 B → 경우의 수 = a × b\n예) 상의 3벌, 하의 4벌 → 조합: 3×4 = 12가지\n\n순열(P): 순서가 중요한 배열\nnPr = n!/(n-r)!\n예) 5명 중 3명 줄 세우기 = 5×4×3 = 60\n\n조합(C): 순서 상관없이 선택\nnCr = n!/r!(n-r)!\n예) 5명 중 3명 선택 = 10' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '합의 법칙', description: '"또는" → 경우의 수를 더하기' },
        { icon: '✖️', label: '곱의 법칙', description: '"그리고" → 경우의 수를 곱하기' },
        { icon: '🔢', label: '순열(P)', description: '순서가 중요한 배열 nPr' },
        { icon: '🤝', label: '조합(C)', description: '순서 무관한 선택 nCr' },
      ]},
      { type: 'example', bad: { label: '합/곱 혼동', story: '상의 3벌 중 1벌과 하의 2벌 중 1벌을 고르는 경우를\n3 + 2 = 5가지로 계산했다. (정답: 3 × 2 = 6가지)' }, good: { label: '올바른 판단', story: '"상의 AND 하의를 모두 선택" → 곱의 법칙!\n3 × 2 = 6가지\n"버스 OR 지하철 중 하나 선택" → 합의 법칙!\n3 + 2 = 5가지' }},
      { type: 'ox', statement: '5명에서 2명을 뽑는 것(조합)과 2명을 줄 세우는 것(순열)의 결과는 같다.', answer: false, feedback: '조합: 5C2 = 10가지 (순서 상관없음)\n순열: 5P2 = 20가지 (순서 중요)\nAB와 BA를 다르게 보면 순열, 같게 보면 조합!' },
      { type: 'multipleChoice', question: '주사위 2개를 던질 때 나오는 경우의 수는?', options: ['12', '24', '36', '6'], correctIndex: 2, explanation: '첫 번째 주사위: 6가지\n두 번째 주사위: 6가지\n두 주사위 "AND" → 곱의 법칙: 6×6 = 36가지' },
      { type: 'feedback', summary: '합의 법칙(또는=더하기), 곱의 법칙(그리고=곱하기)', message: '"또는"이면 더하고, "그리고"이면 곱한다!\n이 원칙만 기억하면 경우의 수를 정확히 셀 수 있어.' },
      { type: 'mission', mission: '① 오늘 입을 옷 조합의 경우의 수 구하기\n(상의 N벌 × 하의 M벌)\n② 가위바위보에서 나올 수 있는 모든 경우의 수 구하기\n(2명이 할 때, 3명이 할 때)', encouragement: '경우의 수는 확률의 기초이자 논리적 사고의 핵심이야!' },
    ],
  },

  'math-diamond-5': {
    id: 'math-diamond-5',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 5,
    title: '확률의 기본',
    cards: [
      { type: 'concept', title: '확률 = 어떤 사건이 일어날 가능성', description: '확률의 정의:\nP(사건) = (사건이 일어나는 경우의 수) / (전체 경우의 수)\n\n범위: 0 ≤ P ≤ 1 (또는 0% ~ 100%)\nP = 0: 절대 일어나지 않음\nP = 1: 반드시 일어남\n\n예) 주사위 1개를 던질 때\n짝수가 나올 확률:\n짝수: {2, 4, 6} → 3가지\n전체: {1,2,3,4,5,6} → 6가지\nP = 3/6 = 1/2 = 50%\n\n여사건: 사건 A가 일어나지 않을 확률\nP(A의 여사건) = 1 - P(A)\n\n예) 비올 확률 30%\n→ 안 비올 확률 = 1 - 0.3 = 0.7 = 70%' },
      { type: 'summary', keywords: [
        { icon: '🎲', label: '확률의 뜻', description: '일어날 가능성을 0~1 사이 수로 표현' },
        { icon: '📊', label: '확률 공식', description: '(해당 경우의 수)÷(전체 경우의 수)' },
        { icon: '🔄', label: '여사건', description: 'P(안 일어남) = 1 - P(일어남)' },
        { icon: '⚖️', label: '동일 가능성', description: '모든 결과가 같은 확률일 때 적용' },
      ]},
      { type: 'example', bad: { label: '확률 오해', story: '"동전을 5번 던져서 5번 다 앞이 나왔으니\n다음엔 반드시 뒤가 나와!"\n매 던지기는 독립이라 과거가 미래에 영향 없어.' }, good: { label: '올바른 이해', story: '동전의 앞면 확률은 항상 1/2.\n이전에 앞이 5번 나왔더라도\n다음 번의 확률은 여전히 1/2.\n각 시행은 독립적이야!' }},
      { type: 'ox', statement: '확률이 1/2이면 두 번 시행하면 반드시 한 번은 일어난다.', answer: false, feedback: '확률은 "경향"이지 "확정"이 아니야.\n동전을 2번 던져도 2번 다 앞면이 나올 수 있어.\n많이 반복할수록 1/2에 가까워지는 거야!' },
      { type: 'multipleChoice', question: '카드 52장에서 1장을 뽑을 때 하트가 나올 확률은?', options: ['1/13', '1/4', '1/2', '4/13'], correctIndex: 1, explanation: '하트: 13장\n전체: 52장\nP = 13/52 = 1/4 = 25%' },
      { type: 'feedback', summary: '확률 = 가능성의 수치화, 여사건으로 반대를 계산', message: '확률은 불확실한 미래를 수학으로 다루는 도구야.\n날씨 예보, 게임 전략, 의학 등 모든 곳에 쓰여!' },
      { type: 'mission', mission: '① 주사위 1개를 던질 때 3의 배수가 나올 확률 구하기\n② 실제로 주사위를 20번 던져서 결과를 기록하고\n이론적 확률과 비교해보기', encouragement: '확률은 미래를 예측하는 수학의 마법이야!' },
    ],
  },

  'math-diamond-6': {
    id: 'math-diamond-6',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 6,
    title: '확률의 계산',
    cards: [
      { type: 'concept', title: '확률의 덧셈과 곱셈', description: '확률의 덧셈 (또는, OR):\n배반사건이면: P(A∪B) = P(A) + P(B)\n배반 아니면: P(A∪B) = P(A) + P(B) - P(A∩B)\n\n예) 주사위에서 짝수 OR 3의 배수?\n짝수: {2,4,6} → 3/6\n3의 배수: {3,6} → 2/6\n둘 다: {6} → 1/6\nP = 3/6 + 2/6 - 1/6 = 4/6 = 2/3\n\n확률의 곱셈 (그리고, AND):\n독립사건이면: P(A∩B) = P(A) × P(B)\n\n예) 동전 앞 AND 주사위 6:\n= 1/2 × 1/6 = 1/12\n\n독립사건: 한 사건이 다른 사건에 영향 없음\n종속사건: 영향 있음 (비복원 추출 등)' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '확률의 덧셈', description: 'A 또는 B: P(A)+P(B)-P(A∩B)' },
        { icon: '✖️', label: '확률의 곱셈', description: 'A 그리고 B: P(A)×P(B) (독립)' },
        { icon: '🔀', label: '독립사건', description: '서로 영향을 주지 않는 사건' },
        { icon: '🔗', label: '종속사건', description: '한 사건이 다른 사건에 영향을 주는 경우' },
      ]},
      { type: 'example', bad: { label: '중복 제거 안 함', story: '짝수(3/6) 또는 3의 배수(2/6) 확률을\n3/6 + 2/6 = 5/6으로 계산.\n6이 겹치는데 빼지 않은 실수.' }, good: { label: '정확한 계산', story: '짝수∪3의 배수:\n3/6 + 2/6 - 1/6(겹침) = 4/6 = 2/3\n겹치는 부분을 빼야 정확해!' }},
      { type: 'ox', statement: '동전 던지기와 주사위 던지기는 독립사건이다.', answer: true, feedback: '맞아! 동전 결과가 주사위 결과에 영향을 주지 않아.\n서로 별개의 사건이니까 독립이야!' },
      { type: 'multipleChoice', question: '동전 2번 던져 2번 다 앞면이 나올 확률은?', options: ['1/2', '1/4', '1/8', '1'], correctIndex: 1, explanation: '첫 번째 앞면: 1/2\n두 번째 앞면: 1/2\n독립이므로: 1/2 × 1/2 = 1/4' },
      { type: 'feedback', summary: '또는=더하기(중복 빼기), 그리고=곱하기(독립일 때)', message: '확률의 덧셈과 곱셈은 경우의 수의 합/곱 법칙과 같은 원리야.\n기본 원리를 이해하면 복잡한 확률도 풀 수 있어!' },
      { type: 'mission', mission: '① 주사위 2개를 던져 합이 7이 될 확률 구하기\n② 카드 52장에서 2장을 연속으로 뽑을 때\n둘 다 하트일 확률 구하기 (비복원)', encouragement: '확률 계산을 마스터하면 세상의 가능성을 수치화할 수 있어!' },
    ],
  },

  'math-diamond-7': {
    id: 'math-diamond-7',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 7,
    title: '상관관계',
    cards: [
      { type: 'concept', title: '두 변수 사이의 관계', description: '상관관계: 두 변수가 함께 변하는 경향\n\n양의 상관관계:\n하나가 커지면 다른 것도 커짐\n예) 키와 몸무게, 공부 시간과 성적\n\n음의 상관관계:\n하나가 커지면 다른 것은 작아짐\n예) 결석 횟수와 성적\n\n상관없음:\n두 변수 사이에 뚜렷한 경향 없음\n예) 신발 사이즈와 수학 성적\n\n산점도(scatter plot):\n두 변수를 좌표평면에 점으로 표시\n→ 점들의 퍼진 모양으로 상관관계 판단\n\n⚠️ 주의: 상관관계 ≠ 인과관계!\n아이스크림 판매량과 익사 사고 수가 양의 상관\n→ 원인이 아니라 공통 원인(더위)이 있는 것!' },
      { type: 'summary', keywords: [
        { icon: '↗️', label: '양의 상관', description: '한 변수 증가 → 다른 변수도 증가' },
        { icon: '↘️', label: '음의 상관', description: '한 변수 증가 → 다른 변수 감소' },
        { icon: '📊', label: '산점도', description: '두 변수를 점으로 표시한 그래프' },
        { icon: '⚠️', label: '상관≠인과', description: '관계가 있다고 원인은 아님!' },
      ]},
      { type: 'example', bad: { label: '인과관계 착각', story: '"아이스크림을 많이 팔면 익사 사고가 늘어나니까\n아이스크림 판매를 줄여야 해!"\n상관관계를 인과관계로 착각한 오류.' }, good: { label: '올바른 판단', story: '아이스크림 판매↑, 익사↑는 양의 상관이지만\n공통 원인은 "더운 날씨"야.\n상관관계가 있다고 원인-결과는 아니야!' }},
      { type: 'ox', statement: '두 변수 사이에 상관관계가 있으면 한쪽이 다른 쪽의 원인이다.', answer: false, feedback: '상관관계 ≠ 인과관계!\n두 변수가 함께 움직여도\n제3의 변수가 원인일 수 있어.' },
      { type: 'multipleChoice', question: '다음 중 음의 상관관계인 것은?', options: ['키와 몸무게', '운동 시간과 체력', '결석 횟수와 성적', '나이와 키(성장기)'], correctIndex: 2, explanation: '결석이 많을수록 성적이 떨어지는 경향이 있어.\n하나 증가 → 다른 것 감소 = 음의 상관관계!' },
      { type: 'feedback', summary: '상관관계 = 함께 변하는 경향, 인과관계와 구별 필수', message: '상관관계를 이해하면\n뉴스, 통계, 연구 결과를 비판적으로 읽을 수 있어.\n"이것이 정말 원인인가?"를 항상 질문하자!' },
      { type: 'mission', mission: '① 키와 신발 사이즈 / 공부 시간과 성적 중\n어떤 것이 더 강한 상관관계를 가질지 예측해보기\n② 뉴스에서 "A하면 B한다"는 기사를 찾아\n상관관계인지 인과관계인지 판단해보기', encouragement: '상관관계를 구별하는 눈은 과학적 사고의 핵심이야!' },
    ],
  },

  'math-diamond-8': {
    id: 'math-diamond-8',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 8,
    title: '수열의 기초',
    cards: [
      { type: 'concept', title: '규칙적으로 나열된 수의 열', description: '수열: 일정한 규칙으로 나열된 수\n\n등차수열: 같은 수를 더하는 수열\n2, 5, 8, 11, 14, ... (공차 d = 3)\n일반항: aₙ = a₁ + (n-1)d\na₁₀ = 2 + (10-1)×3 = 29\n합: Sₙ = n(a₁ + aₙ)/2\n\n등비수열: 같은 수를 곱하는 수열\n3, 6, 12, 24, 48, ... (공비 r = 2)\n일반항: aₙ = a₁ × r^(n-1)\na₆ = 3 × 2⁵ = 96\n합: Sₙ = a₁(rⁿ-1)/(r-1)\n\n가우스의 일화:\n1+2+3+...+100 = ?\n(1+100)+(2+99)+...+(50+51)\n= 101 × 50 = 5050' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '등차수열', description: '같은 수를 더하는 수열 (공차 d)' },
        { icon: '✖️', label: '등비수열', description: '같은 수를 곱하는 수열 (공비 r)' },
        { icon: '📐', label: '일반항', description: 'n번째 항을 n으로 표현한 공식' },
        { icon: '📊', label: '합 공식', description: '수열의 합을 한 번에 구하는 공식' },
      ]},
      { type: 'example', bad: { label: '하나씩 더한 경우', story: '1+2+3+...+50을 하나씩 더해서 계산했다.\n시간이 오래 걸리고 중간에 계산 실수가 났다.' }, good: { label: '공식 활용', story: '1+2+3+...+50\n= 50 × (1+50) / 2\n= 50 × 51 / 2\n= 1275\n공식 한 줄로 해결!' }},
      { type: 'ox', statement: '등비수열에서 공비는 항상 양수이다.', answer: false, feedback: '공비가 음수일 수도 있어!\n예: 1, -2, 4, -8, 16, ... (공비 = -2)\n부호가 번갈아 바뀌는 수열이 돼.' },
      { type: 'multipleChoice', question: '등차수열 3, 7, 11, 15, ...의 10번째 항은?', options: ['39', '40', '41', '43'], correctIndex: 0, explanation: 'a₁ = 3, d = 4\na₁₀ = 3 + (10-1) × 4\n= 3 + 36 = 39' },
      { type: 'feedback', summary: '수열 = 규칙의 수학화, 일반항으로 어떤 항이든 구함', message: '수열은 패턴을 수학으로 표현하는 강력한 도구야.\n이자 계산, 인구 증가, 프로그래밍에서도 핵심적으로 쓰여!' },
      { type: 'mission', mission: '① 등차수열 2, 5, 8, 11, ...의 20번째 항과 20항까지의 합 구하기\n② 등비수열 1, 2, 4, 8, ...의 10번째 항 구하기\n③ 1+2+3+...+100을 가우스의 방법으로 계산하기', encouragement: '수열은 무한을 다루는 수학의 도구야!' },
    ],
  },

  'math-diamond-9': {
    id: 'math-diamond-9',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 9,
    title: '논리와 증명',
    cards: [
      { type: 'concept', title: '수학적 증명의 기초', description: '수학에서 "증명"이란?\n논리적으로 틀림없이 참임을 보이는 것\n\n명제: 참 또는 거짓을 판별할 수 있는 문장\n예) "모든 짝수는 2로 나누어진다" → 참\n\n증명 방법:\n\n① 직접 증명:\n가정 → 논리적 단계 → 결론\n\n② 귀류법 (모순에 의한 증명):\n결론의 반대를 가정 → 모순 발견 → 원래 결론 참\n\n③ 수학적 귀납법:\nⓐ n=1일 때 참 확인\nⓑ n=k일 때 참이면 n=k+1도 참 증명\n→ 모든 자연수에서 참!\n\n역, 이, 대우:\n명제: p → q\n역: q → p\n이: ~p → ~q\n대우: ~q → ~p (원래 명제와 진리값 같음!)' },
      { type: 'summary', keywords: [
        { icon: '✅', label: '명제', description: '참/거짓 판별 가능한 문장' },
        { icon: '🔗', label: '직접 증명', description: '가정에서 결론까지 논리적으로 연결' },
        { icon: '❌', label: '귀류법', description: '반대를 가정하여 모순을 보임' },
        { icon: '🔄', label: '대우', description: '~q→~p, 원래 명제와 같은 진리값' },
      ]},
      { type: 'example', bad: { label: '예시로 증명', story: '"2+4=6, 4+6=10이므로 짝수의 합은 항상 짝수다"\n몇 가지 예시로는 "항상"을 증명할 수 없어.' }, good: { label: '올바른 증명', story: '짝수 = 2m, 2n (m, n은 정수)\n합 = 2m + 2n = 2(m+n)\nm+n은 정수이므로 2(m+n)은 짝수\n→ 짝수의 합은 항상 짝수! (직접 증명)' }},
      { type: 'ox', statement: '명제의 역이 참이면 원래 명제도 참이다.', answer: false, feedback: '명제가 참이어도 역은 거짓일 수 있어!\n"정사각형이면 직사각형이다" → 참\n"직사각형이면 정사각형이다" → 거짓!\n대우만 원래 명제와 같은 진리값을 가져.' },
      { type: 'multipleChoice', question: '"비가 오면 땅이 젖는다"의 대우는?', options: ['땅이 젖으면 비가 온다', '비가 안 오면 땅이 안 젖는다', '땅이 안 젖으면 비가 안 왔다', '땅이 젖으면 비가 안 온다'], correctIndex: 2, explanation: '대우: ~q → ~p\n원래: 비(p) → 젖음(q)\n대우: 안 젖음(~q) → 비 안 옴(~p)\n"땅이 안 젖으면 비가 안 왔다"' },
      { type: 'feedback', summary: '증명 = 논리적으로 빈틈없이 참을 보이는 것', message: '수학적 증명은 논리적 사고의 최고봉이야.\n이 능력은 수학뿐 아니라 토론, 글쓰기, 프로그래밍에도 쓰여!' },
      { type: 'mission', mission: '① "홀수 + 홀수 = 짝수"를 직접 증명해보기\n(힌트: 홀수 = 2m+1)\n② "x²이 짝수이면 x도 짝수다"를 귀류법으로 증명해보기\n(x가 홀수라고 가정하면?)', encouragement: '증명할 수 있다면, 진정으로 이해한 것이야!' },
    ],
  },

  'math-diamond-10': {
    id: 'math-diamond-10',
    chapterKey: 'math',
    tierKey: 'diamond',
    stageNumber: 10,
    title: '수학의 종합 응용',
    cards: [
      { type: 'concept', title: '수학의 모든 것을 연결하다', description: '지금까지 배운 것을 종합하면:\n\n🥉 브론즈: 수학적 사고법과 공부 습관\n🥈 실버: 수와 연산의 기초\n🥇 골드: 대수와 함수\n💎 플래티넘: 기하와 측정\n👑 다이아: 확률·통계와 논리\n\n이 모든 것이 연결돼 있어:\n• 함수 + 기하 = 좌표기하학\n• 확률 + 대수 = 기대값 계산\n• 통계 + 함수 = 회귀분석\n• 논리 + 기하 = 기하학적 증명\n• 수열 + 함수 = 극한과 미적분\n\n수학은 독립된 단원이 아니라\n하나의 거대한 연결 체계야!\n\n그리고 이 모든 것의 시작은\n"왜?"라고 질문하는 습관이야.' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '연결', description: '수학의 모든 분야는 서로 연결되어 있음' },
        { icon: '🌐', label: '응용', description: '수학은 과학, 경제, IT 등 모든 분야의 기초' },
        { icon: '❓', label: '"왜?" 질문', description: '수학적 사고의 시작은 호기심' },
        { icon: '🚀', label: '성장', description: '기초 → 심화 → 응용으로 실력 확장' },
      ]},
      { type: 'example', bad: { label: '단절된 학습', story: '"기하는 기하, 대수는 대수"\n각 단원을 따로 공부하니 응용 문제에서 막혔다.' }, good: { label: '연결된 학습', story: '"피타고라스 + 좌표 = 거리 공식"\n"함수 + 통계 = 데이터 분석"\n단원을 연결해서 보니 응용 문제도 풀렸다!' }},
      { type: 'ox', statement: '수학의 각 분야는 서로 독립적이다.', answer: false, feedback: '수학은 하나의 연결된 체계야!\n대수, 기하, 통계, 확률이 모두 연결돼.\n하나를 잘하면 다른 것도 함께 좋아져!' },
      { type: 'multipleChoice', question: '수학적 사고에서 가장 중요한 질문은?', options: ['"이 공식은 뭐지?"', '"답이 뭐지?"', '"왜 이렇게 되지?"', '"시험에 나올까?"'], correctIndex: 2, explanation: '"왜?"라는 질문이 이해를 깊게 하고\n새로운 발견으로 이끌어.\n이것이 모든 수학적 사고의 출발점이야!' },
      { type: 'feedback', summary: '수학 = 연결된 하나의 체계, "왜?"가 시작', message: '다이아몬드 과정과 수학 전체 학습을 완료했어!\n정말 대단해! 50개의 스테이지를 모두 마쳤어.\n\n지금까지 배운 것을 기반으로\n더 깊은 수학의 세계를 탐험해나가자!\n수학은 끝이 없는 모험이야!' },
      { type: 'mission', mission: '수학 종합 미션:\n① 좋아하는 수학 분야 1개를 골라 심화 문제 풀어보기\n② "수학이 쓰이는 직업" 3가지를 조사해보기\n③ 오늘 배운 것 중 가장 인상 깊은 개념을 친구에게 설명해보기', encouragement: '수학의 마스터는 여기가 끝이 아니라 시작이야!\n"왜?"를 계속 묻는 한, 너의 수학 여행은 계속돼!' },
    ],
  },
}
