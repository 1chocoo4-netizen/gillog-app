// 좋은 습관 만들기 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const GOOD_HABIT_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (좋은 습관 기초) 1~10
  // ═══════════════════════════════════════

  'goodHabit-bronze-1': {
    id: 'goodHabit-bronze-1', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 1,
    title: '습관이란 무엇인가',
    cards: [
      { type: 'concept', title: '습관 = 자동 반복 행동', description: '습관이란 의식하지 않아도\n자동으로 반복하는 행동이야.\n\n양치질, 신발 신는 순서처럼\n생각 없이 하는 것들이 다 습관이지.\n우리 행동의 40% 이상이 습관이야!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '자동 반복', description: '의식 없이 반복하는 행동' },
        { icon: '🧠', label: '뇌의 절약', description: '에너지를 아끼려는 뇌의 전략' },
        { icon: '📊', label: '40%', description: '하루 행동 절반이 습관' },
        { icon: '🌱', label: '변화 가능', description: '습관은 바꿀 수 있다' },
      ]},
      { type: 'example', bad: { label: '무의식 나쁜 습관', story: '귀가 → 소파 → 폰 → 유튜브 3시간.\n매일 같은 패턴인데 인식 못 했다.' }, good: { label: '좋은 습관 인식', story: '귀가 → 손 씻기 → 숙제 30분.\n작은 습관이 쌓여 성적이 올랐다.' }},
      { type: 'ox', statement: '습관은 타고나는 것이라 바꿀 수 없다.', answer: false, feedback: '습관은 100% 만들 수 있어!\n뇌는 반복하면 뭐든 자동화해.' },
      { type: 'multipleChoice', question: '습관의 가장 큰 특징은?', options: ['매번 결심이 필요하다', '의식하지 않아도 자동으로 한다', '특별한 사람만 가진다', '한 번 하면 바로 만들어진다'], correctIndex: 1, explanation: '습관의 핵심은 "자동"이야!\n생각 없이도 하게 되는 것.' },
      { type: 'feedback', summary: '습관 = 자동으로 반복하는 행동, 바꿀 수 있다', message: '습관을 아는 것이 변화의 첫걸음!' },
      { type: 'mission', mission: '오늘 무의식적으로 한 행동 3가지 적어보기', encouragement: '인식하는 순간, 변화가 시작돼!' },
    ],
  },

  'goodHabit-bronze-2': {
    id: 'goodHabit-bronze-2', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 2,
    title: '습관의 3단계 구조',
    cards: [
      { type: 'concept', title: '신호 → 행동 → 보상', description: '모든 습관은 3단계로 작동해.\n\n1. 신호: 행동을 시작하게 하는 계기\n2. 행동: 실제로 하는 것\n3. 보상: 행동 후 얻는 만족감\n\n이 루프를 이해하면 습관을 설계할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🔔', label: '신호(Cue)', description: '습관을 시작하게 하는 트리거' },
        { icon: '🏃', label: '행동(Routine)', description: '실제로 하는 행동' },
        { icon: '🎁', label: '보상(Reward)', description: '행동 후 얻는 만족감' },
        { icon: '🔄', label: '습관 루프', description: '3단계가 반복되는 고리' },
      ]},
      { type: 'example', bad: { label: '나쁜 습관 루프', story: '스트레스(신호) → 과자(행동) → 기분 좋음(보상)\n반복되면서 살이 찌기 시작.' }, good: { label: '좋은 습관 루프', story: '알람(신호) → 스트레칭(행동) → 개운함(보상)\n매일 아침 몸이 가벼워졌다.' }},
      { type: 'ox', statement: '보상이 없어도 습관은 유지된다.', answer: false, feedback: '보상이 있어야 뇌가 반복하고 싶어 해!\n작은 보상이라도 꼭 필요해.' },
      { type: 'multipleChoice', question: '습관 루프의 올바른 순서는?', options: ['보상 → 신호 → 행동', '행동 → 보상 → 신호', '신호 → 행동 → 보상', '신호 → 보상 → 행동'], correctIndex: 2, explanation: '신호가 행동을 일으키고\n보상이 반복을 만들어!' },
      { type: 'feedback', summary: '습관 = 신호 → 행동 → 보상의 반복', message: '이 구조를 알면 습관을 만들 수 있어!' },
      { type: 'mission', mission: '내 습관 하나를 신호/행동/보상으로 분석해보기', encouragement: '분석이 되면 설계도 가능해!' },
    ],
  },

  'goodHabit-bronze-3': {
    id: 'goodHabit-bronze-3', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 3,
    title: '아주 작게 시작하기',
    cards: [
      { type: 'concept', title: '2분 규칙 - 마이크로 습관', description: '새 습관이 실패하는 이유?\n처음부터 너무 크게 시작해서야.\n\n"2분 규칙": 새 습관은 2분 이내로!\n운동 30분 → 운동화 신기\n독서 1시간 → 책 1페이지 읽기\n\n작아야 시작하기 쉬워!' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '2분 규칙', description: '새 습관은 2분 이내로 시작' },
        { icon: '🐜', label: '마이크로', description: '아주 작은 행동부터' },
        { icon: '🚪', label: '시작이 핵심', description: '시작하면 계속하게 됨' },
        { icon: '📈', label: '점진적 확장', description: '익숙해지면 조금씩 늘리기' },
      ]},
      { type: 'example', bad: { label: '큰 목표 실패', story: '"매일 1시간 운동!" 3일 만에 포기.\n너무 크니까 시작조차 싫었다.' }, good: { label: '2분 규칙 성공', story: '"운동화만 신자!" 매일 2분 시작.\n어느새 10분, 20분, 30분으로 늘었다.' }},
      { type: 'ox', statement: '습관은 처음부터 크게 시작해야 효과가 있다.', answer: false, feedback: '오히려 반대야! 작을수록 시작이 쉽고\n꾸준히 이어갈 수 있어.' },
      { type: 'multipleChoice', question: '"매일 독서하기"의 마이크로 습관은?', options: ['하루 2시간 읽기', '한 달에 책 5권', '하루 1페이지 읽기', '주말에 몰아서 읽기'], correctIndex: 2, explanation: '1페이지면 부담 없이 매일 할 수 있어!\n그게 쌓이면 어마어마한 양이 돼.' },
      { type: 'feedback', summary: '2분 규칙 = 작게 시작해서 꾸준히', message: '작은 시작이 큰 변화를 만들어!' },
      { type: 'mission', mission: '만들고 싶은 습관을 2분 버전으로 줄여보기', encouragement: '작을수록 강력해!' },
    ],
  },

  'goodHabit-bronze-4': {
    id: 'goodHabit-bronze-4', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 4,
    title: '매일 같은 시간에 하기',
    cards: [
      { type: 'concept', title: '시간 고정의 힘', description: '습관이 자리잡으려면\n"언제" 할지가 명확해야 해.\n\n"시간 되면 하자" = 안 하게 됨\n"매일 7시에 하자" = 자동으로 시작\n\n시간을 고정하면 뇌가 자동 모드로 전환해!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '시간 고정', description: '매일 같은 시간에 실행' },
        { icon: '🧠', label: '자동 모드', description: '뇌가 시간을 신호로 인식' },
        { icon: '📍', label: '장소 고정', description: '같은 장소도 효과적' },
        { icon: '🔁', label: '반복 강화', description: '고정할수록 자동화 빨라짐' },
      ]},
      { type: 'example', bad: { label: '시간 불규칙', story: '"오늘은 좀 이따가..." 매일 미루다\n결국 일주일째 운동을 안 했다.' }, good: { label: '시간 고정', story: '"매일 오후 4시 = 영어 단어 시간!"\n알람 없이도 4시가 되면 자동으로 시작.' }},
      { type: 'ox', statement: '하고 싶을 때 하는 게 자유롭고 좋다.', answer: false, feedback: '"하고 싶을 때"는 보통 안 하게 돼.\n시간을 정해야 실행력이 올라가!' },
      { type: 'multipleChoice', question: '습관을 만들 때 가장 중요한 것은?', options: ['의지력을 키우기', '매일 같은 시간에 하기', '완벽하게 하기', '다양하게 바꾸기'], correctIndex: 1, explanation: '시간 고정 = 뇌의 자동 신호!\n고정되면 생각 없이 시작하게 돼.' },
      { type: 'feedback', summary: '시간 고정 = 습관의 가장 강력한 신호', message: '"매일 O시에 한다" 이 한 문장이 핵심!' },
      { type: 'mission', mission: '새로 만들 습관의 실행 시간 정하기\n(예: 매일 오후 4시)', encouragement: '시간을 정하는 순간, 절반은 성공!' },
    ],
  },

  'goodHabit-bronze-5': {
    id: 'goodHabit-bronze-5', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 5,
    title: '습관 쌓기(Habit Stacking)',
    cards: [
      { type: 'concept', title: '기존 습관에 새 습관 붙이기', description: '새 습관을 기억하기 어렵다면?\n이미 하고 있는 습관에 붙여!\n\n공식: "OO한 후에 XX을 한다"\n\n예: "양치 후에 영단어 5개"\n기존 행동이 새 습관의 신호가 돼!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연결', description: '기존 습관 + 새 습관' },
        { icon: '📌', label: '앵커 습관', description: '이미 매일 하는 행동' },
        { icon: '➕', label: '추가', description: '앵커 뒤에 새 습관 붙이기' },
        { icon: '🔄', label: '자동화', description: '반복하면 하나의 흐름이 됨' },
      ]},
      { type: 'example', bad: { label: '연결 없는 습관', story: '"매일 스트레칭 해야지!"\n언제 할지 안 정해서 매번 까먹음.' }, good: { label: '습관 쌓기', story: '"양치 후에 스트레칭 3분!"\n양치할 때마다 자동으로 기억나서\n한 달째 매일 하고 있다.' }},
      { type: 'ox', statement: '새 습관은 혼자 독립적으로 만들어야 한다.', answer: false, feedback: '기존 습관에 붙이는 게 훨씬 쉬워!\n연결하면 기억하기도 쉽고 실행도 잘 돼.' },
      { type: 'multipleChoice', question: '습관 쌓기의 올바른 공식은?', options: ['"하고 싶을 때 한다"', '"OO한 후에 XX을 한다"', '"하루에 10개씩 새로"', '"주말에 몰아서 한다"'], correctIndex: 1, explanation: '기존 습관이 신호가 되어\n새 습관을 자연스럽게 시작!' },
      { type: 'feedback', summary: '습관 쌓기 = 기존 습관 + 새 습관 연결', message: '이미 하는 것에 붙이면 쉬워져!' },
      { type: 'mission', mission: '"___한 후에 ___을 한다" 형태로 하나 만들기', encouragement: '연결이 기억을 만들어!' },
    ],
  },

  'goodHabit-bronze-6': {
    id: 'goodHabit-bronze-6', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 6,
    title: '습관 추적하기',
    cards: [
      { type: 'concept', title: '기록과 체크의 힘', description: '습관을 기록하면 3가지 효과가 있어.\n\n1. 눈에 보이니까 동기부여\n2. 연속 기록이 유지력 UP\n3. 빠진 날을 바로 알 수 있어\n\n달력에 X표만 해도 충분해!' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '습관 트래커', description: '매일 체크하는 기록표' },
        { icon: '🔥', label: '연속 기록', description: '이어진 날짜가 동기부여' },
        { icon: '👁️', label: '시각화', description: '눈에 보이면 실천력 UP' },
        { icon: '✅', label: '체크 쾌감', description: '체크하는 순간의 성취감' },
      ]},
      { type: 'example', bad: { label: '기록 없는 습관', story: '"이번 주에 운동 했나...?"\n기억이 안 나서 했다 안 했다 반복.' }, good: { label: '습관 트래커', story: '달력에 운동한 날 X표.\n15일 연속 기록 보니까\n"끊기 싫어!" 하는 마음이 생겼다.' }},
      { type: 'ox', statement: '습관 기록은 번거롭기만 하고 효과가 없다.', answer: false, feedback: '체크 하나가 동기부여를 만들어!\n연속 기록은 강력한 유지력이야.' },
      { type: 'multipleChoice', question: '습관 추적이 효과적인 이유는?', options: ['남에게 보여주려고', '연속 기록이 동기부여가 돼서', '완벽해야 하니까', '의무감을 주려고'], correctIndex: 1, explanation: '연속 기록을 보면 "끊기 싫다"는\n강력한 동기가 생겨!' },
      { type: 'feedback', summary: '습관 추적 = 기록이 동기부여를 만든다', message: '오늘 한 체크가 내일의 동력!' },
      { type: 'mission', mission: '달력이나 노트에 습관 트래커 하나 만들기', encouragement: '첫 번째 체크를 해보자!' },
    ],
  },

  'goodHabit-bronze-7': {
    id: 'goodHabit-bronze-7', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 7,
    title: '실패해도 괜찮아',
    cards: [
      { type: 'concept', title: '절대 2번 연속 빠지지 않기', description: '누구나 빠지는 날이 있어.\n한 번 빠졌다고 끝이 아냐!\n\n핵심 규칙: "2번 연속은 안 돼!"\n1번 빠졌으면 다음 날 반드시 하기.\n\n완벽이 아니라 꾸준함이 목표야.' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '2번 규칙', description: '연속 2번 빠지지 않기' },
        { icon: '💪', label: '회복력', description: '빠져도 바로 돌아오기' },
        { icon: '❌', label: '완벽주의 X', description: '100%를 목표로 하지 않기' },
        { icon: '🔄', label: '꾸준함', description: '자주 하는 것이 완벽보다 낫다' },
      ]},
      { type: 'example', bad: { label: '완벽주의 포기', story: '"하루 빠졌으니 이미 실패야..."\n그대로 포기. 습관이 끝났다.' }, good: { label: '2번 규칙', story: '"어제 빠졌지만 오늘은 꼭!"\n다시 시작해서 연속 기록을 이어갔다.' }},
      { type: 'ox', statement: '하루라도 빠지면 습관 만들기에 실패한 것이다.', answer: false, feedback: '한 번 빠지는 건 정상이야!\n중요한 건 다음 날 바로 돌아오는 거야.' },
      { type: 'multipleChoice', question: '습관을 하루 빠졌을 때 가장 좋은 대처는?', options: ['포기하고 새 습관 시작', '다음 날 반드시 다시 하기', '벌칙을 정하기', '처음부터 다시 시작'], correctIndex: 1, explanation: '"절대 2번 연속 빠지지 않기!"\n이것만 지키면 습관은 유지돼.' },
      { type: 'feedback', summary: '실패 대처법 = 2번 연속 빠지지 않기', message: '빠져도 괜찮아. 돌아오면 돼!' },
      { type: 'mission', mission: '습관 트래커에 "빠진 날 다음 날은 반드시" 규칙 적기', encouragement: '회복이 진짜 실력이야!' },
    ],
  },

  'goodHabit-bronze-8': {
    id: 'goodHabit-bronze-8', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 8,
    title: '나쁜 습관 바꾸기',
    cards: [
      { type: 'concept', title: '대체 습관 전략', description: '나쁜 습관은 "없애기"보다\n"바꾸기"가 훨씬 효과적이야.\n\n신호는 그대로, 행동만 바꾸기!\n\n예: 스트레스(신호) →\n과자 대신 → 산책으로 바꾸기\n보상(기분 전환)은 유지!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '대체 전략', description: '나쁜 행동을 좋은 행동으로' },
        { icon: '🔔', label: '신호 유지', description: '트리거는 그대로 둠' },
        { icon: '🔀', label: '행동 교체', description: '나쁜 행동 → 좋은 행동' },
        { icon: '🎁', label: '보상 유지', description: '비슷한 만족감 유지' },
      ]},
      { type: 'example', bad: { label: '억지로 끊기', story: '"유튜브 절대 안 볼 거야!"\n3일 만에 더 오래 봄. 반동 효과.' }, good: { label: '대체 습관', story: '심심할 때(신호) → 유튜브 대신 → 책 5분.\n비슷한 만족감인데 더 유익!' }},
      { type: 'ox', statement: '나쁜 습관은 의지력으로 억지로 끊어야 한다.', answer: false, feedback: '억지로 끊으면 반동이 와!\n비슷한 보상을 주는 좋은 행동으로 바꾸자.' },
      { type: 'multipleChoice', question: '나쁜 습관을 바꾸는 가장 효과적인 방법은?', options: ['무조건 참기', '벌칙 정하기', '신호는 유지하고 행동만 바꾸기', '모든 습관 한 번에 바꾸기'], correctIndex: 2, explanation: '신호는 같으니 행동만 바꾸면\n뇌가 쉽게 받아들여!' },
      { type: 'feedback', summary: '나쁜 습관 → 신호 유지 + 행동 대체', message: '없애려 하지 말고, 바꾸자!' },
      { type: 'mission', mission: '고치고 싶은 습관 1개의 대체 행동 정하기', encouragement: '바꾸는 게 끊는 것보다 쉬워!' },
    ],
  },

  'goodHabit-bronze-9': {
    id: 'goodHabit-bronze-9', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 9,
    title: '환경의 힘',
    cards: [
      { type: 'concept', title: '환경 설계로 습관 쉽게 만들기', description: '의지력보다 환경이 더 강력해!\n\n좋은 습관 → 쉽게 만들기\n나쁜 습관 → 어렵게 만들기\n\n예: 책을 베개 위에 놓으면\n자연스럽게 읽게 되고,\n폰을 다른 방에 두면 안 보게 돼!' },
      { type: 'summary', keywords: [
        { icon: '🏠', label: '환경 설계', description: '행동을 유도하는 환경 만들기' },
        { icon: '👁️', label: '보이게', description: '좋은 것은 눈에 보이게' },
        { icon: '🙈', label: '숨기기', description: '나쁜 것은 눈에 안 보이게' },
        { icon: '🧲', label: '마찰 줄이기', description: '좋은 행동의 장벽 낮추기' },
      ]},
      { type: 'example', bad: { label: '의지력 의존', story: '"폰 안 볼 거야!" 결심했지만\n눈앞에 있으니 계속 만지게 된다.' }, good: { label: '환경 설계', story: '공부할 때 폰을 거실에 두고,\n책상엔 공부 도구만 놓았다.\n자연스럽게 집중이 됐다!' }},
      { type: 'ox', statement: '의지력이 강하면 환경은 중요하지 않다.', answer: false, feedback: '의지력은 유한한 자원이야!\n환경을 바꾸면 의지력 없이도 가능해.' },
      { type: 'multipleChoice', question: '독서 습관을 위한 환경 설계로 가장 좋은 것은?', options: ['책장에 정리해두기', '침대 머리맡에 책 놓기', '서점에 자주 가기', '독서 목표 100권 세우기'], correctIndex: 1, explanation: '눈에 보이고 바로 잡을 수 있으면\n행동이 쉬워져!' },
      { type: 'feedback', summary: '환경 설계 = 의지력 대신 환경의 힘', message: '환경을 바꾸면 행동이 바뀌어!' },
      { type: 'mission', mission: '좋은 습관을 쉽게 만들 환경 변화 1가지 실행하기', encouragement: '환경이 너를 도와줄 거야!' },
    ],
  },

  'goodHabit-bronze-10': {
    id: 'goodHabit-bronze-10', chapterKey: 'goodHabit', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 습관 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해서\n나만의 습관 루틴을 만들어보자!\n\n1. 만들 습관 정하기 (작게!)\n2. 시간·장소·앵커 습관 설정\n3. 환경 설계\n4. 트래커로 기록\n5. 2번 규칙으로 유지' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '습관 선택', description: '하나의 습관을 정하기' },
        { icon: '⏰', label: '시간·장소', description: '언제 어디서 할지 고정' },
        { icon: '🏠', label: '환경 설계', description: '쉽게 할 수 있도록 세팅' },
        { icon: '📋', label: '추적·유지', description: '기록하고 2번 규칙 적용' },
      ]},
      { type: 'example', bad: { label: '막연한 결심', story: '"좋은 습관 만들어야지!"\n뭘 언제 어떻게 할지 안 정해서\n3일 만에 까먹었다.' }, good: { label: '설계된 루틴', story: '"양치 후(앵커) 영단어 5개(2분)\n책상에 단어장 놓기(환경)\n달력에 체크(추적)"\n한 달째 매일 실천 중!' }},
      { type: 'ox', statement: '습관은 한 번에 여러 개를 만들어야 효과적이다.', answer: false, feedback: '하나씩! 하나가 자리잡으면 다음으로.\n한 번에 여러 개는 다 실패하기 쉬워.' },
      { type: 'multipleChoice', question: '습관 설계에 가장 중요한 순서는?', options: ['큰 목표 → 의지력 → 반복', '작은 시작 → 시간 고정 → 환경 설계 → 추적', '목표 100개 → 매일 전부', '남이 하는 것 따라하기'], correctIndex: 1, explanation: '작게 → 고정 → 환경 → 추적!\n이 순서가 습관 만들기의 정석이야.' },
      { type: 'apply', question: '만들고 싶은 습관을 설계해보세요.\n(습관 / 시간 / 앵커 / 환경 설계)', placeholder: '예: 매일 스트레칭 3분 / 오후 4시 / 귀가 후 / 거실에 매트 깔기' },
      { type: 'feedback', summary: '습관 루틴 = 작게 시작 + 고정 + 환경 + 추적', message: '브론즈 완료! 이제 습관 설계자야!' },
      { type: 'mission', mission: '나만의 습관 루틴 1개를 완성하고 오늘부터 시작!', encouragement: '작은 시작이 인생을 바꿔!' },
    ],
  },

}
