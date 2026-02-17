// 집중과 몰입 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const FOCUS_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (집중과 몰입 기초) 1~10
  // ═══════════════════════════════════════

  'focus-bronze-1': {
    id: 'focus-bronze-1', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 1,
    title: '집중이란 무엇인가',
    cards: [
      { type: 'concept', title: '집중 = 하나에 모으기', description: '집중이란 "지금 이 순간"\n하나의 일에 주의를 모으는 것.\n\n뇌는 한 번에 하나만 깊이 처리해.\n여러 개를 동시에 하면\n어느 것도 제대로 못 해.\n\n집중은 재능이 아니라 기술이야!' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '주의 집중', description: '하나에 정신을 모으기' },
        { icon: '🧠', label: '단일 처리', description: '뇌는 한 번에 하나만 깊이' },
        { icon: '🎯', label: '기술', description: '연습하면 누구나 향상' },
        { icon: '⏱️', label: '시간 효율', description: '집중 1시간 > 멍한 3시간' },
      ]},
      { type: 'example', bad: { label: '분산된 주의', story: '교과서 + 카톡 + 유튜브.\n3시간 앉아있었는데\n기억나는 게 하나도 없다.' }, good: { label: '집중한 시간', story: '폰 끄고 수학에만 30분 집중.\n문제 15개 풀고 다 이해했다.\n3시간 앉아있던 때보다 성과가 컸다.' }},
      { type: 'ox', statement: '집중력은 타고나는 것이라 바꿀 수 없다.', answer: false, feedback: '집중력은 근육처럼 훈련 가능해!\n작은 연습부터 시작하면 돼.' },
      { type: 'multipleChoice', question: '집중의 핵심은?', options: ['오래 앉아있기', '하나에 주의를 모으기', '동시에 여러 일 하기', '쉬지 않고 계속하기'], correctIndex: 1, explanation: '핵심은 "하나에 모으기"!\n시간보다 주의의 질이 중요해.' },
      { type: 'feedback', summary: '집중 = 하나에 주의를 모으는 기술', message: '집중력은 키울 수 있어. 오늘부터 시작!' },
      { type: 'mission', mission: '오늘 10분 동안 한 가지 일에만 집중해보기', encouragement: '10분이면 충분해. 시작이 반이야!' },
    ],
  },

  'focus-bronze-2': {
    id: 'focus-bronze-2', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 2,
    title: '집중을 방해하는 것들',
    cards: [
      { type: 'concept', title: '집중의 적을 알아야 이긴다', description: '집중을 방해하는 3대 요소:\n\n1. 외부 방해: 소음, 알림, 주변 사람\n2. 내부 방해: 걱정, 잡생각, 감정\n3. 신체 방해: 졸림, 배고픔, 피로\n\n적을 알아야 대응할 수 있어!\n나를 가장 방해하는 게 뭔지 찾아보자.' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '외부 방해', description: '알림, 소음, 주변 환경' },
        { icon: '💭', label: '내부 방해', description: '잡생각, 걱정, 감정' },
        { icon: '😴', label: '신체 방해', description: '졸림, 배고픔, 피로' },
        { icon: '🛡️', label: '대응', description: '원인별 다른 해결법' },
      ]},
      { type: 'example', bad: { label: '방해 요소 방치', story: '폰 알림 + 걱정되는 일 + 수면 부족.\n3가지가 겹치니 10분도 집중 못 했다.\n뭐가 문제인지도 모른 채 자책만.' }, good: { label: '방해 요소 파악', story: '"집중 안 되는 이유가 뭐지?\n아, 폰 알림 때문이네."\n알림 끄고 나니 바로 집중이 됐다.' }},
      { type: 'ox', statement: '집중이 안 되면 의지력 부족 탓이다.', answer: false, feedback: '방해 요소 때문인 경우가 훨씬 많아!\n의지력 탓 전에 원인을 찾아보자.' },
      { type: 'multipleChoice', question: '집중 방해 요소에 해당하지 않는 것은?', options: ['스마트폰 알림', '충분한 수면', '걱정과 잡생각', '주변 소음'], correctIndex: 1, explanation: '충분한 수면은 오히려 집중을 도와줘!\n나머지는 모두 집중을 방해하는 요소야.' },
      { type: 'feedback', summary: '집중 방해 = 외부 + 내부 + 신체, 원인부터 파악', message: '원인을 알면 해결은 쉬워!' },
      { type: 'mission', mission: '나의 집중 방해 요소 Top 3 적고\n각각 해결 방법 1가지 적기', encouragement: '적을 아는 것이 이기는 첫걸음!' },
    ],
  },

  'focus-bronze-3': {
    id: 'focus-bronze-3', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 3,
    title: '뽀모도로 기법',
    cards: [
      { type: 'concept', title: '25분 집중 + 5분 휴식', description: '뽀모도로 기법은 세계적으로\n가장 유명한 집중법이야.\n\n25분 집중 → 5분 휴식 → 반복\n4번 하면 15~30분 긴 휴식.\n\n"25분만!" 생각하면\n시작이 부담 없어져!' },
      { type: 'summary', keywords: [
        { icon: '🍅', label: '뽀모도로', description: '25분 집중 + 5분 휴식' },
        { icon: '⏱️', label: '타이머', description: '시간을 정해서 집중' },
        { icon: '🔄', label: '반복', description: '4회 후 긴 휴식' },
        { icon: '💪', label: '부담↓', description: '"25분만" = 시작이 쉬움' },
      ]},
      { type: 'example', bad: { label: '끝없는 공부', story: '"2시간 공부하자!" 시작.\n30분 만에 지쳐서 폰 봄.\n쉬는 시간이 없으니 몸이 먼저 포기.' }, good: { label: '뽀모도로', story: '"25분만 집중!" 타이머 세팅.\n25분 몰입 → 5분 스트레칭.\n4세트 하니 2시간이 훌쩍!\n전혀 지치지 않았다.' }},
      { type: 'ox', statement: '뽀모도로는 반드시 25분이어야 한다.', answer: false, feedback: '처음엔 15분이나 20분도 OK!\n자기에게 맞는 시간을 찾으면 돼.' },
      { type: 'multipleChoice', question: '뽀모도로 기법의 핵심은?', options: ['최대한 오래 집중', '정해진 시간 집중 + 짧은 휴식 반복', '쉬지 않고 끝까지', '하고 싶을 때만 집중'], correctIndex: 1, explanation: '집중과 휴식의 리듬이 핵심!\n뇌가 지치기 전에 쉬어야 오래 갈 수 있어.' },
      { type: 'feedback', summary: '뽀모도로 = 25분 집중 + 5분 휴식 반복', message: '"25분만!"이 마법의 주문!' },
      { type: 'mission', mission: '뽀모도로 1세트 도전!\n(타이머 25분 → 집중 → 5분 휴식)', encouragement: '1세트만 해보면 효과를 느낄 거야!' },
    ],
  },

  'focus-bronze-4': {
    id: 'focus-bronze-4', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 4,
    title: '시작의 기술 - 5초 룰',
    cards: [
      { type: 'concept', title: '5, 4, 3, 2, 1 - 시작!', description: '집중에서 가장 어려운 건\n"시작하기"야.\n\n5초 룰: 하고 싶지 않을 때\n"5, 4, 3, 2, 1" 카운트다운 후\n무조건 시작!\n\n5초 안에 움직이면\n뇌가 변명할 틈이 없어.' },
      { type: 'summary', keywords: [
        { icon: '5️⃣', label: '5초 룰', description: '카운트다운 후 즉시 시작' },
        { icon: '🚀', label: '즉시 행동', description: '생각 전에 몸을 움직이기' },
        { icon: '🧠', label: '변명 차단', description: '뇌가 핑계 댈 시간 없앰' },
        { icon: '🏃', label: '시작이 반', description: '일단 시작하면 계속하게 됨' },
      ]},
      { type: 'example', bad: { label: '시작 미루기', story: '"5분만 더 쉬고..." → "10분만..." → "내일 하자."\n생각하는 시간이 길수록\n결국 안 하게 된다.' }, good: { label: '5초 룰', story: '"공부하기 싫다..."\n"5, 4, 3, 2, 1 - 시작!"\n책 펼치고 1문제 풀었더니\n어느새 30분 동안 집중하고 있었다.' }},
      { type: 'ox', statement: '기분이 좋을 때만 집중을 시작할 수 있다.', answer: false, feedback: '기분과 상관없이 시작할 수 있어!\n시작하면 오히려 기분이 좋아져.' },
      { type: 'multipleChoice', question: '5초 룰이 효과적인 이유는?', options: ['충분히 생각할 시간을 줘서', '뇌가 변명할 틈을 없애서', '5초가 마법의 시간이라서', '남에게 보여주기 좋아서'], correctIndex: 1, explanation: '5초 안에 행동하면 뇌가\n"안 하는 이유"를 만들 시간이 없어!' },
      { type: 'feedback', summary: '5초 룰 = 카운트다운으로 즉시 시작', message: '생각보다 행동이 먼저! 5, 4, 3, 2, 1!' },
      { type: 'mission', mission: '미루고 있던 일 하나에 5초 룰 적용해보기', encouragement: '5초가 인생을 바꿀 수 있어!' },
    ],
  },

  'focus-bronze-5': {
    id: 'focus-bronze-5', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 5,
    title: '싱글태스킹의 힘',
    cards: [
      { type: 'concept', title: '한 번에 하나만!', description: '멀티태스킹은 효율적이지 않아.\n뇌가 전환할 때마다\n에너지와 시간을 잃어.\n\n한 번에 "딱 하나"에만 집중하면\n속도가 빨라지고 결과도 좋아져.\n이게 싱글태스킹이야!' },
      { type: 'summary', keywords: [
        { icon: '1️⃣', label: '하나만', description: '한 번에 한 가지에 집중' },
        { icon: '🔀', label: '전환 비용', description: '바꿀 때마다 시간 손실' },
        { icon: '🧠', label: '깊은 처리', description: '하나에 집중해야 깊이 이해' },
        { icon: '⚡', label: '속도 UP', description: '하나씩 하면 오히려 빨라' },
      ]},
      { type: 'example', bad: { label: '멀티태스킹', story: '수학 풀면서 카톡 답장 + 음악 가사.\n2시간 후 수학 5문제, 카톡 30개, 노래 가사만 기억.\n수학은 하나도 이해 못 했다.' }, good: { label: '싱글태스킹', story: '"지금은 수학만!" 다른 건 다 닫았다.\n1시간에 20문제, 전부 이해 완료.\n남은 시간에 카톡 답장하니 둘 다 완벽.' }},
      { type: 'ox', statement: '동시에 여러 일을 하면 시간을 아낄 수 있다.', answer: false, feedback: '오히려 시간이 더 걸려!\n전환 비용 때문에 하나씩이 더 빨라.' },
      { type: 'multipleChoice', question: '싱글태스킹의 가장 큰 장점은?', options: ['할 일이 줄어든다', '깊이 집중해서 품질과 속도가 올라간다', '편하게 쉴 수 있다', '남에게 좋은 인상을 준다'], correctIndex: 1, explanation: '하나에 집중하면 이해도·속도 모두 UP!\n결국 전체 시간도 아끼게 돼.' },
      { type: 'feedback', summary: '싱글태스킹 = 한 번에 하나, 결국 더 빠르다', message: '느려 보여도 하나씩이 진짜 빠른 길!' },
      { type: 'mission', mission: '30분 동안 "딱 하나"에만 집중하기\n(다른 앱·창 모두 닫기)', encouragement: '하나에 집중하는 30분을 경험해봐!' },
    ],
  },

  'focus-bronze-6': {
    id: 'focus-bronze-6', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 6,
    title: '휴식도 기술이다',
    cards: [
      { type: 'concept', title: '잘 쉬어야 잘 집중한다', description: '집중의 비밀은 "잘 쉬는 것".\n\n뇌는 계속 쓰면 과열돼.\n적절한 휴식이 집중을 재충전해줘.\n\n좋은 휴식: 산책, 스트레칭, 눈 감기\n나쁜 휴식: 폰 보기, SNS (뇌가 안 쉼!)' },
      { type: 'summary', keywords: [
        { icon: '🔋', label: '재충전', description: '휴식이 집중 에너지를 채움' },
        { icon: '🚶', label: '좋은 휴식', description: '산책, 스트레칭, 눈 감기' },
        { icon: '📱', label: '나쁜 휴식', description: '폰, SNS는 뇌가 안 쉼' },
        { icon: '⏱️', label: '타이밍', description: '50분마다 10분 쉬기' },
      ]},
      { type: 'example', bad: { label: '폰으로 휴식', story: '"5분만 쉬자" → 인스타 → 유튜브.\n30분이 지나도 더 피곤해졌다.\n폰은 뇌를 쉬게 하지 않았다.' }, good: { label: '진짜 휴식', story: '5분간 창밖 보며 스트레칭.\n눈을 감고 심호흡 3번.\n돌아와서 집중이 새로 시작된 느낌!' }},
      { type: 'ox', statement: '휴식 시간에 폰을 보면 효과적으로 쉴 수 있다.', answer: false, feedback: '폰은 뇌에 새로운 자극을 줘서\n오히려 더 피로해져!' },
      { type: 'multipleChoice', question: '집중 사이 가장 효과적인 휴식은?', options: ['유튜브 쇼츠 보기', '카톡 답장하기', '스트레칭 + 물 마시기', 'SNS 피드 확인'], correctIndex: 2, explanation: '몸을 움직이고 뇌를 쉬게 하는 게 진짜 휴식!\n폰은 쉬는 게 아니야.' },
      { type: 'feedback', summary: '좋은 휴식 = 뇌가 쉬는 것 (폰 X)', message: '잘 쉬어야 잘 집중해!' },
      { type: 'mission', mission: '다음 공부 쉬는 시간에 폰 대신\n스트레칭 5분 해보기', encouragement: '진짜 휴식을 경험해보자!' },
    ],
  },

  'focus-bronze-7': {
    id: 'focus-bronze-7', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 7,
    title: '몰입이란 무엇인가',
    cards: [
      { type: 'concept', title: '시간이 사라지는 경험', description: '게임할 때 3시간이 10분처럼\n느껴진 적 있지? 그게 "몰입"이야.\n\n몰입 = 집중의 최고 단계.\n하는 일 자체에 완전히 빠져들어\n시간, 걱정, 주변이 사라지는 상태.\n\n공부에서도 가능해!' },
      { type: 'summary', keywords: [
        { icon: '🌊', label: '몰입(Flow)', description: '완전히 빠져드는 상태' },
        { icon: '⏰', label: '시간 왜곡', description: '시간이 빨리 흐르는 느낌' },
        { icon: '😊', label: '즐거움', description: '과정 자체가 보상' },
        { icon: '📈', label: '최고 성과', description: '몰입 시 퍼포먼스 최대' },
      ]},
      { type: 'example', bad: { label: '집중 못 하는 공부', story: '"아, 지루해... 언제 끝나지?"\n시계만 10번 봤다.\n1시간이 10시간처럼 느껴졌다.' }, good: { label: '몰입 경험', story: '수학 문제가 딱 맞는 난이도였다.\n하나 풀면 다음이 궁금해지고...\n정신 차리니 1시간이 지나 있었다!' }},
      { type: 'ox', statement: '몰입은 게임에서만 가능하다.', answer: false, feedback: '공부, 운동, 악기, 그림 등\n어떤 활동에서든 가능해!\n조건만 맞으면 돼.' },
      { type: 'multipleChoice', question: '몰입 상태의 특징이 아닌 것은?', options: ['시간이 빨리 간다', '하는 일에 완전히 빠져든다', '지루하고 힘들다', '최고의 성과를 낸다'], correctIndex: 2, explanation: '몰입은 즐겁고 에너지가 넘치는 상태!\n지루한 건 몰입이 아니야.' },
      { type: 'feedback', summary: '몰입 = 집중의 최고 단계, 누구나 가능', message: '몰입의 조건을 알면 만들 수 있어!' },
      { type: 'mission', mission: '최근에 시간 가는 줄 모르고 빠져든 경험 적기', encouragement: '그 경험이 몰입이야. 다시 만들 수 있어!' },
    ],
  },

  'focus-bronze-8': {
    id: 'focus-bronze-8', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 8,
    title: '몰입의 조건 만들기',
    cards: [
      { type: 'concept', title: '몰입은 조건이 있다', description: '몰입은 운이 아니라 조건이야.\n\n1. 명확한 목표: 뭘 할지 분명히\n2. 적절한 난이도: 너무 쉽지도 어렵지도 않게\n3. 즉각적 피드백: 맞았는지 바로 확인\n4. 방해 없는 환경: 외부 자극 차단\n\n이 4가지가 맞으면 몰입이 시작돼!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '명확한 목표', description: '"이 문제 10개 풀기"처럼 구체적' },
        { icon: '⚖️', label: '적절한 난이도', description: '살짝 어려운 게 최적' },
        { icon: '📊', label: '즉각 피드백', description: '맞고 틀림을 바로 확인' },
        { icon: '🔇', label: '방해 제거', description: '외부 자극 차단' },
      ]},
      { type: 'example', bad: { label: '조건 불충분', story: '"공부하자" 막연한 목표.\n너무 어려운 문제만 풀다 좌절.\n폰 알림도 계속 울려. 몰입 불가.' }, good: { label: '조건 충족', story: '"수학 15번~25번 풀기" 명확한 목표.\n적당히 도전적인 난이도.\n바로 답 확인 + 폰 끄기.\n어느새 몰입!' }},
      { type: 'ox', statement: '몰입은 쉬운 일을 할 때 잘 일어난다.', answer: false, feedback: '너무 쉬우면 지루해져!\n"살짝 어려운" 수준이 몰입 최적 지점이야.' },
      { type: 'multipleChoice', question: '몰입을 만드는 가장 중요한 조건은?', options: ['좋아하는 과목만 하기', '명확한 목표 + 적절한 난이도', '오래 앉아있기', '보상 약속하기'], correctIndex: 1, explanation: '뭘 할지 명확하고 + 살짝 어려우면\n뇌가 자동으로 몰입 모드에 들어가!' },
      { type: 'feedback', summary: '몰입 조건 = 명확한 목표 + 적절 난이도 + 피드백 + 환경', message: '조건을 맞추면 몰입은 자연스럽게 따라와!' },
      { type: 'mission', mission: '다음 공부에 몰입 4조건 하나씩 세팅해보기', encouragement: '조건만 갖추면 몰입이 찾아와!' },
    ],
  },

  'focus-bronze-9': {
    id: 'focus-bronze-9', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 9,
    title: '집중력 훈련법',
    cards: [
      { type: 'concept', title: '집중 근육을 키우자', description: '집중력은 근육처럼 훈련할 수 있어!\n\n1단계: 5분 집중 → 짧은 휴식\n2단계: 15분 집중 → 점차 늘리기\n3단계: 25분+ 자연스럽게 유지\n\n매일 조금씩 늘리면\n한 달 뒤 집중력이 확 달라져!' },
      { type: 'summary', keywords: [
        { icon: '💪', label: '근육 비유', description: '집중도 훈련하면 강해짐' },
        { icon: '🐣', label: '작게 시작', description: '5분부터 시작 OK' },
        { icon: '📈', label: '점진적', description: '매일 조금씩 시간 늘리기' },
        { icon: '🧘', label: '명상', description: '호흡에 집중하는 연습' },
      ]},
      { type: 'example', bad: { label: '무리한 도전', story: '"오늘부터 2시간 집중!"\n30분 만에 포기. 자책.\n다음 날은 시도조차 안 했다.' }, good: { label: '점진적 훈련', story: '1주차: 10분 집중.\n2주차: 15분 집중.\n한 달 뒤: 30분 자연스럽게 집중.\n작게 시작했더니 어느새 늘어나 있었다.' }},
      { type: 'ox', statement: '집중력 훈련은 처음부터 오래 해야 효과가 있다.', answer: false, feedback: '작게 시작하는 게 핵심!\n5분도 훌륭한 시작이야.' },
      { type: 'multipleChoice', question: '집중력을 키우는 가장 좋은 방법은?', options: ['처음부터 2시간 도전', '매일 조금씩 시간을 늘리기', '의지력으로 버티기', '하루만 집중 연습하기'], correctIndex: 1, explanation: '근육처럼 점진적으로!\n5분 → 10분 → 15분... 매일 조금씩.' },
      { type: 'feedback', summary: '집중력 훈련 = 작게 시작, 매일 조금씩 늘리기', message: '오늘의 5분이 한 달 뒤 1시간이 돼!' },
      { type: 'mission', mission: '이번 주 집중 훈련 계획 세우기\n(시작 시간: _분, 매일 _분씩 증가)', encouragement: '작은 시작이 큰 집중력을 만들어!' },
    ],
  },

  'focus-bronze-10': {
    id: 'focus-bronze-10', chapterKey: 'focus', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 집중 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n나만의 집중 루틴을 완성하자!\n\n1. 방해 요소 제거 (폰 끄기)\n2. 목표 정하기 (구체적으로)\n3. 5초 룰로 시작\n4. 뽀모도로로 리듬 잡기\n5. 진짜 휴식으로 재충전\n6. 반복하며 집중력 키우기' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '방해 제거', description: '폰·소음·유혹 차단' },
        { icon: '🎯', label: '목표 설정', description: '구체적으로 정하기' },
        { icon: '🍅', label: '뽀모도로', description: '25분 + 5분 리듬' },
        { icon: '🔋', label: '진짜 휴식', description: '폰 없이 뇌 쉬기' },
      ]},
      { type: 'example', bad: { label: '무계획 집중', story: '"열심히 공부하자!"\n뭘, 얼마나, 어떻게 할지 안 정해서\n30분 만에 방황 시작.' }, good: { label: '집중 루틴', story: '폰 끄기 → "수학 10문제" 목표 →\n5초 룰로 시작 → 25분 집중 →\n스트레칭 5분 휴식 → 반복.\n2시간이 알차게 채워졌다!' }},
      { type: 'ox', statement: '집중 루틴은 한 번 정하면 절대 바꾸면 안 된다.', answer: false, feedback: '나에게 맞게 계속 조정하는 게 좋아!\n해보고 안 맞으면 수정하면 돼.' },
      { type: 'multipleChoice', question: '효과적인 집중 루틴의 순서는?', options: ['일단 시작 → 나중에 계획', '방해 제거 → 목표 설정 → 집중 → 휴식', '오래 앉기 → 의지력으로 버티기', '계획만 세우기 → 내일 실행'], correctIndex: 1, explanation: '제거 → 설정 → 집중 → 휴식!\n이 리듬이 최고의 집중 루틴이야.' },
      { type: 'apply', question: '나만의 집중 루틴을 설계해보세요.\n(방해 제거 / 목표 / 집중 시간 / 휴식 방법)', placeholder: '예: 폰 거실에 두기 / 수학 10문제 / 뽀모도로 25분 / 스트레칭 5분' },
      { type: 'feedback', summary: '집중 루틴 = 제거 + 목표 + 리듬 + 휴식', message: '브론즈 완료! 이제 집중의 기술자야!' },
      { type: 'mission', mission: '오늘 나만의 집중 루틴으로 뽀모도로 2세트 도전!', encouragement: '집중은 기술이야. 연습할수록 강해져!' },
    ],
  },

}
