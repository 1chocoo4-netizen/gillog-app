// 시간관리 챕터 전체 학습 콘텐츠 (브론즈~골드)
import type { Stage } from './lessonData'

export const TIME_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (기초 시간관리) 1~10
  // ═══════════════════════════════════════

  'time-bronze-1': {
    id: 'time-bronze-1', chapterKey: 'time', tierKey: 'bronze', stageNumber: 1,
    title: '시간관리란 무엇인가',
    cards: [
      { type: 'concept', title: '시간은 모두에게 공평하다', description: '하루 24시간, 누구에게나 똑같아.\n\n하지만 결과가 다른 이유는?\n"시간을 어떻게 쓰느냐"의 차이야.' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '24시간', description: '모두에게 동일한 시간' },
        { icon: '🎯', label: '선택', description: '뭐에 쓸지 결정하는 것' },
        { icon: '📈', label: '효율', description: '같은 시간, 더 많은 성과' },
        { icon: '🔑', label: '습관', description: '기술이자 습관' },
      ]},
      { type: 'example', bad: { label: '태민이의 하루', story: '핸드폰 → 유튜브 → SNS\n하루가 끝났는데 한 게 없다.' }, good: { label: '서윤이의 하루', story: '할 일 3가지를 적고 순서대로 끝냄.\n저녁에는 여유롭게 쉬었다.' }},
      { type: 'ox', statement: '시간관리는 타고나는 능력이다.', answer: false, feedback: '누구나 배울 수 있는 기술이야!\n작은 습관부터 시작하면 돼.' },
      { type: 'multipleChoice', question: '시간관리의 핵심은?', options: ['시간을 아끼는 것', '빈틈없이 바쁘게 사는 것', '중요한 일에 시간을 쓰는 것', '잠을 줄이는 것'], correctIndex: 2, explanation: '바쁘게 사는 게 아니라\n중요한 일에 "의도적으로" 쓰는 거야.' },
      { type: 'feedback', summary: '시간관리 = 중요한 일에 의도적으로 시간 쓰기', message: '오늘부터 한 가지만 바꿔보자!' },
      { type: 'mission', mission: '"오늘 시간을 가장 많이 쓴 3가지" 적어보기', encouragement: '기록이 변화의 시작이야!' },
    ],
  },

  'time-bronze-2': {
    id: 'time-bronze-2', chapterKey: 'time', tierKey: 'bronze', stageNumber: 2,
    title: '하루 24시간 분석하기',
    cards: [
      { type: 'concept', title: '내 시간은 어디로?', description: '시간관리 첫 단계 =\n내가 시간을 어디에 쓰는지 아는 것.\n\n기록해보면 생각보다\n빈 시간이 많다는 걸 알게 돼.' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '시간 기록', description: '한 일을 모두 적기' },
        { icon: '🔍', label: '분석', description: '어디에 많이 썼는지 파악' },
        { icon: '🕳️', label: '시간 누수', description: '모르게 흘러가는 시간' },
        { icon: '💡', label: '인식', description: '알아야 바꿀 수 있다' },
      ]},
      { type: 'example', bad: { label: '민재의 착각', story: '"공부할 시간이 없어."\n기록해보니 스마트폰 4시간이었다.' }, good: { label: '하은이의 발견', story: '3일간 30분 단위로 기록했더니\n활용 가능한 빈 시간이 3시간이나 됐다.' }},
      { type: 'ox', statement: '바쁜 사람일수록 시간 기록이 필요 없다.', answer: false, feedback: '바쁠수록 기록이 더 필요해!\n어디서 시간이 새는지 찾아야 하거든.' },
      { type: 'multipleChoice', question: '시간 기록의 가장 큰 효과는?', options: ['남에게 보여주기 좋다', '시간 사용 패턴을 파악한다', '공부 시간이 자동으로 늘어난다', '계획을 안 세워도 된다'], correctIndex: 1, explanation: '패턴을 알면 어디를 개선할지 명확해져!' },
      { type: 'feedback', summary: '시간관리의 시작 = 시간 기록', message: '모르면 바꿀 수 없어. 기록이 시작이야!' },
      { type: 'mission', mission: '오늘 1시간 단위로 뭘 했는지 적어보기', encouragement: '완벽하지 않아도 OK. 적기만 하면 돼!' },
    ],
  },

  'time-bronze-3': {
    id: 'time-bronze-3', chapterKey: 'time', tierKey: 'bronze', stageNumber: 3,
    title: '우선순위 정하기',
    cards: [
      { type: 'concept', title: '중요한 것 먼저!', description: '할 일이 많을 때 답은\n"가장 중요한 것 먼저" 하는 거야.\n\n급한 일과 중요한 일은 달라.\n중요한 것부터 처리하는 게 핵심!' },
      { type: 'summary', keywords: [
        { icon: '🥇', label: '중요도', description: '장기적 영향이 큰 일' },
        { icon: '🚨', label: '긴급도', description: '당장 처리할 일' },
        { icon: '📋', label: '순서', description: '중요 → 급한 → 나머지' },
        { icon: '❌', label: '포기', description: '안 해도 되는 건 버리기' },
      ]},
      { type: 'example', bad: { label: '지훈이의 실수', story: '카톡, 게임, 유튜브만 했더니\n내일 시험 공부를 못 했다.' }, good: { label: '예린이의 선택', story: '시험 공부 2시간 먼저 끝내고\n나머지는 나중에. 마음이 편했다.' }},
      { type: 'ox', statement: '급한 일이 곧 중요한 일이다.', answer: false, feedback: '카톡은 급하지만 중요하지 않을 수 있어.\n시험 공부는 급하지 않아도 중요하지.' },
      { type: 'multipleChoice', question: '다음 중 가장 먼저 해야 할 일은?', options: ['친구 카톡 답장', '내일 발표 준비', 'SNS 알림 확인', '방 정리'], correctIndex: 1, explanation: '발표 준비가 가장 중요하고 영향이 커!' },
      { type: 'feedback', summary: '우선순위 = 중요한 일을 먼저', message: '"지금 가장 중요한 게 뭐지?" 이 질문이 핵심!' },
      { type: 'mission', mission: '할 일 목록 적고 중요한 순서대로 번호 매기기', encouragement: '순서를 정하는 것만으로 절반은 성공!' },
    ],
  },

  'time-bronze-4': {
    id: 'time-bronze-4', chapterKey: 'time', tierKey: 'bronze', stageNumber: 4,
    title: 'To-Do 리스트의 힘',
    cards: [
      { type: 'concept', title: '할 일 목록 만들기', description: '머릿속에만 두면 까먹거나 미루게 돼.\n\n적으면 뇌가 기억 대신\n실행에 에너지를 쓸 수 있어.\n가장 강력한 시간관리 도구야.' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '적기', description: '종이나 앱에 모두 적기' },
        { icon: '✅', label: '체크', description: '끝내면 체크, 성취감!' },
        { icon: '3️⃣', label: '3개 룰', description: '핵심은 3개로 제한' },
        { icon: '🌙', label: '전날 밤', description: '자기 전에 내일 할 일 적기' },
      ]},
      { type: 'example', bad: { label: '수현이', story: '머릿속으로만 생각하다가\n결국 하나도 시작 못 했다.' }, good: { label: '도윤이', story: '전날 밤 할 일 3개를 적었다.\n아침에 바로 시작, 하나씩 체크!' }},
      { type: 'ox', statement: 'To-Do 리스트는 최대한 많이 적어야 한다.', answer: false, feedback: '많으면 부담만 돼.\n핵심 3개에 집중하자!' },
      { type: 'multipleChoice', question: '가장 효과적인 To-Do 리스트 사용법은?', options: ['20개 이상 빈틈없이', '핵심 3개 + 우선순위', '생각날 때마다 아무 때나', '한 달치를 한 번에'], correctIndex: 1, explanation: '핵심 3개에 집중하는 게 가장 효과적!' },
      { type: 'feedback', summary: 'To-Do = 적기 + 우선순위 + 체크', message: '적는 순간 실행력이 올라가!' },
      { type: 'mission', mission: '오늘 밤 내일 할 일 3가지 적어보기', encouragement: '3개만! 작게 시작하자.' },
    ],
  },

  'time-bronze-5': {
    id: 'time-bronze-5', chapterKey: 'time', tierKey: 'bronze', stageNumber: 5,
    title: '데드라인의 힘',
    cards: [
      { type: 'concept', title: '마감이 집중력을 만든다', description: '시험 전날 갑자기 집중 잘 되는 경험,\n해본 적 있지? 이게 "데드라인 효과"야.\n\n스스로 마감을 정하면\n미루는 습관을 이길 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '⏳', label: '마감 효과', description: '데드라인이 집중력 UP' },
        { icon: '🧠', label: '뇌의 반응', description: '압박이 도파민 분비 촉진' },
        { icon: '🎯', label: '자기 마감', description: '스스로 마감 설정하기' },
        { icon: '⚡', label: '긴장감', description: '적당한 압박 = 높은 성과' },
      ]},
      { type: 'example', bad: { label: '현서', story: '"내일 하자" 미루다가\n발표 전날 급하게 만든 PPT는 엉망.' }, good: { label: '유나', story: '"금요일까지 완성!" 자기 마감 설정.\n매일 조금씩 해서 여유롭게 끝냈다.' }},
      { type: 'ox', statement: '마감이 없으면 더 자유롭게 잘할 수 있다.', answer: false, feedback: '마감 없으면 대부분 미루게 돼.\n적당한 마감이 실행력을 높여줘!' },
      { type: 'multipleChoice', question: '자기 마감의 효과는?', options: ['스트레스만 늘어남', '미루는 습관을 줄여줌', '완벽주의를 키움', '자유 시간이 줄어듦'], correctIndex: 1, explanation: '"언제까지" 명확하면 미루지 않게 돼!' },
      { type: 'feedback', summary: '마감 = 집중력의 스위치', message: '마감을 나를 위한 도구로 활용하자!' },
      { type: 'mission', mission: '할 일 하나에 "OO일 OO시까지" 마감 정하기', encouragement: '마감을 정하는 순간, 이미 시작한 거야!' },
    ],
  },

  'time-bronze-6': {
    id: 'time-bronze-6', chapterKey: 'time', tierKey: 'bronze', stageNumber: 6,
    title: '아침 루틴의 힘',
    cards: [
      { type: 'concept', title: '하루의 시작을 설계하라', description: '아침을 어떻게 시작하느냐가\n그날 전체를 결정해.\n\n폰부터 보면 끌려다니고,\n루틴을 하면 주도적으로 보낼 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '🌅', label: '아침', description: '하루의 톤을 결정' },
        { icon: '📵', label: '폰 금지', description: '30분은 폰 안 보기' },
        { icon: '🔄', label: '반복', description: '같은 순서로 매일' },
        { icon: '🧘', label: '작게', description: '5분이라도 매일 하기' },
      ]},
      { type: 'example', bad: { label: '지수', story: '알람 끄자마자 인스타 30분.\n허둥지둥 나가서 하루 종일 정신없었다.' }, good: { label: '민지', story: '물 한 잔 + 스트레칭 5분 + 할 일 3개 적기.\n아침부터 뭔가 해낸 기분!' }},
      { type: 'ox', statement: '아침 루틴은 1시간 이상 해야 효과 있다.', answer: false, feedback: '5분이라도 OK!\n중요한 건 "매일 하는 것"이야.' },
      { type: 'multipleChoice', question: '좋은 아침 루틴의 조건은?', options: ['활동을 최대한 많이', '짧고 간단, 매일 반복 가능', '매일 다른 활동', '기상 후 바로 공부'], correctIndex: 1, explanation: '매일 할 수 있어야 해. 짧고 간단한 게 오래 가!' },
      { type: 'feedback', summary: '아침 루틴 = 하루를 주도하는 스위치', message: '내일 아침, 폰 대신 물 한 잔으로!' },
      { type: 'mission', mission: '아침 루틴 3단계 정하기\n(예: 물 → 스트레칭 → 할 일 적기)', encouragement: '아침을 바꾸면 하루가 바뀌어!' },
    ],
  },

  'time-bronze-7': {
    id: 'time-bronze-7', chapterKey: 'time', tierKey: 'bronze', stageNumber: 7,
    title: '시간 도둑 - 스마트폰',
    cards: [
      { type: 'concept', title: '스마트폰이 시간을 훔친다', description: '청소년 하루 평균 스마트폰 4~5시간.\n\n"잠깐만" 하고 본 게 1시간.\n스마트폰은 시간을 뺏도록 설계돼 있어.\n인식이 첫 번째 방어야.' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '무의식 사용', description: '습관적으로 폰을 드는 것' },
        { icon: '🔔', label: '알림 함정', description: '알림이 집중을 끊음' },
        { icon: '⏱️', label: '스크린타임', description: '실제 사용량 확인' },
        { icon: '🛡️', label: '의도적 사용', description: '목적 있게 쓰기' },
      ]},
      { type: 'example', bad: { label: '승우', story: '"5분만" → 쇼츠 시작 →\n정신 차려보니 1시간 30분.' }, good: { label: '서현', story: '공부할 때 폰을 다른 방에 뒀다.\n끝나고 확인해도 급한 건 없었다.' }},
      { type: 'ox', statement: '스마트폰을 옆에 두고 안 보면 된다.', answer: false, feedback: '보이기만 해도 집중력이 떨어져!\n보이지 않는 곳에 두는 게 효과적.' },
      { type: 'multipleChoice', question: '가장 효과적인 스마트폰 관리법은?', options: ['의지력으로 참기', '물리적으로 멀리 두기', '알림을 자주 확인', '항상 무음'], correctIndex: 1, explanation: '물리적 거리가 가장 확실한 방법!' },
      { type: 'feedback', summary: '스마트폰 관리 = 물리적 거리 + 의도적 사용', message: '폰을 내가 컨트롤하는 도구로 바꾸자!' },
      { type: 'mission', mission: '스크린타임 확인 후 가장 오래 쓴 앱 3개 적기', encouragement: '아는 것이 힘이야!' },
    ],
  },

  'time-bronze-8': {
    id: 'time-bronze-8', chapterKey: 'time', tierKey: 'bronze', stageNumber: 8,
    title: '자투리 시간 활용법',
    cards: [
      { type: 'concept', title: '5분도 소중한 시간', description: '버스 10분, 수업 전 5분, 점심 후 15분...\n모으면 하루 1~2시간!\n\n큰 시간 없다고 포기하지 말고\n작은 시간부터 활용하는 게 비결이야.' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '5분 활용', description: '단어 5개, 한 문단 읽기' },
        { icon: '🧩', label: '조각 시간', description: '이동·대기·쉬는 시간' },
        { icon: '📚', label: '준비물', description: '단어장 등 항상 휴대' },
        { icon: '🔢', label: '누적 효과', description: '30분×365일 = 182시간' },
      ]},
      { type: 'example', bad: { label: '준영', story: '버스에서 매일 쇼츠 40분.\n1년이면 243시간을 쇼츠에 쓴 셈.' }, good: { label: '소은', story: '버스에서 영단어 10개씩.\n1년이면 3,650단어를 외운 셈!' }},
      { type: 'ox', statement: '5분으로는 아무것도 할 수 없다.', answer: false, feedback: '5분이면 단어 5개, 수학 문제 1개, 책 2페이지!' },
      { type: 'multipleChoice', question: '자투리 시간 활용의 핵심은?', options: ['큰 과제를 자투리에', '미리 할 일 정해두고 실행', '자투리엔 무조건 쉬기', '30분 이상만 활용'], correctIndex: 1, explanation: '미리 정해두면 고민 없이 바로 시작!' },
      { type: 'feedback', summary: '자투리 시간 = 미리 정한 작은 과제 실행', message: '작은 시간도 모이면 큰 차이!' },
      { type: 'mission', mission: '자투리 시간용 "5분 과제" 3개 정하기', encouragement: '5분의 기적을 경험해보자!' },
    ],
  },

  'time-bronze-9': {
    id: 'time-bronze-9', chapterKey: 'time', tierKey: 'bronze', stageNumber: 9,
    title: '주간 계획 세우기',
    cards: [
      { type: 'concept', title: '일주일을 한눈에', description: '하루 계획만 세우면 큰 그림을 놓쳐.\n\n주간 계획으로 시험·과제·약속을\n미리 파악하고 시간을 배분하자.\n일요일 밤 10분이면 충분해!' },
      { type: 'summary', keywords: [
        { icon: '📅', label: '주간 보기', description: '한 주 전체를 한눈에' },
        { icon: '🎯', label: '주간 목표', description: '핵심 3가지 정하기' },
        { icon: '⚖️', label: '균형', description: '공부·운동·휴식 균형' },
        { icon: '🔄', label: '리뷰', description: '매주 돌아보기' },
      ]},
      { type: 'example', bad: { label: '재현', story: '수요일에야 금요일 시험을 알았다.\n매일 허둥지둥.' }, good: { label: '은비', story: '일요일 10분 주간 계획.\n시험·과제를 미리 파악하고 분량을 나눴다.' }},
      { type: 'ox', statement: '주간 계획은 시간이 오래 걸려 비효율적이다.', answer: false, feedback: '10분이면 충분해!\n그 10분이 한 주를 효율적으로 만들어.' },
      { type: 'multipleChoice', question: '주간 계획 세우기 가장 좋은 시점은?', options: ['월요일 점심', '매일 아침', '일요일 저녁 또는 월요일 아침', '금요일 오후'], correctIndex: 2, explanation: '새 주 시작 전에 세우면 미리 설계 가능!' },
      { type: 'feedback', summary: '주간 계획 = 10분으로 한 주 설계', message: '주간 계획 하나면 매일 아침이 편해져!' },
      { type: 'mission', mission: '일요일에 다음 주 계획 세워보기', encouragement: '10분이면 충분해. 한번 해보자!' },
    ],
  },

  'time-bronze-10': {
    id: 'time-bronze-10', chapterKey: 'time', tierKey: 'bronze', stageNumber: 10,
    title: '미루기의 심리학',
    cards: [
      { type: 'concept', title: '왜 우리는 미루는 걸까?', description: '미루기는 게으름이 아니라 "감정의 문제"야.\n\n어렵거나 불안한 일을 피하고 싶은 마음.\n"일단 시작"하는 게 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '😰', label: '감정 회피', description: '불안을 피하려는 본능' },
        { icon: '🏔️', label: '과제 크기', description: '크면 시작이 어려움' },
        { icon: '👟', label: '2분 시작', description: '2분만 하면 계속하게 됨' },
        { icon: '🎯', label: '쪼개기', description: '작은 단계로 나누기' },
      ]},
      { type: 'example', bad: { label: '준호', story: '"완벽하게 해야지" → 부담 → 미룸\n마감 직전에 대충 끝냈다.' }, good: { label: '소희', story: '"5분만 해보자" → 시작했더니\n어느새 30분 동안 집중하고 있었다.' }},
      { type: 'ox', statement: '미루는 것은 게으른 사람만 한다.', answer: false, feedback: '누구나 미뤄! 뇌가 불편함을\n피하려는 자연스러운 반응이야.' },
      { type: 'multipleChoice', question: '미루기를 이기는 가장 효과적인 방법은?', options: ['의지력으로 참기', '마감 직전까지 기다리기', '일단 2분만 시작해보기', '다른 사람에게 부탁'], correctIndex: 2, explanation: '시작하면 뇌가 작업 모드에 들어가서\n계속하게 돼!' },
      { type: 'feedback', summary: '미루기 극복 = 쪼개기 + 일단 시작', message: '시작하는 것 자체가 이미 승리야!' },
      { type: 'mission', mission: '미루던 일 하나, "딱 5분만" 해보기', encouragement: '5분이면 놀라운 일이 생길 거야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (심화 시간관리 전략) 1~10
  // ═══════════════════════════════════════

  'time-silver-1': {
    id: 'time-silver-1', chapterKey: 'time', tierKey: 'silver', stageNumber: 1,
    title: '아이젠하워 매트릭스',
    cards: [
      { type: 'concept', title: '긴급 vs 중요 - 4사분면', description: '모든 일을 4가지로 분류해:\n\n1: 긴급+중요 → 즉시 실행\n2: 중요+비긴급 → 계획 실행\n3: 긴급+비중요 → 최소화\n4: 비긴급+비중요 → 제거\n\n핵심은 2사분면에 시간 쓰기!' },
      { type: 'summary', keywords: [
        { icon: '🔴', label: '1사분면', description: '긴급+중요: 시험, 마감' },
        { icon: '🟢', label: '2사분면', description: '중요+비긴급: 복습, 운동' },
        { icon: '🟡', label: '3사분면', description: '긴급+비중요: 알림, 카톡' },
        { icon: '⚪', label: '4사분면', description: '둘 다 아님: 무의미 웹서핑' },
      ]},
      { type: 'example', bad: { label: '정우', story: '카톡(3)과 유튜브(4)로 하루를 보내고\n시험 준비는 못 했다.' }, good: { label: '하린', story: '4사분면으로 분류 후 1→2 순서로.\n3,4는 쉬는 시간에만 했다.' }},
      { type: 'ox', statement: '2사분면(중요+비긴급)은 나중에 해도 된다.', answer: false, feedback: '미루면 1사분면(긴급)이 돼버려!\n평소에 2사분면에 투자하는 게 핵심.' },
      { type: 'multipleChoice', question: '2사분면에 해당하는 것은?', options: ['내일 마감 과제', '매일 30분 영어', '친구의 급한 카톡', '유튜브 추천'], correctIndex: 1, explanation: '당장 급하지 않지만 장기적으로 매우 중요!' },
      { type: 'feedback', summary: '아이젠하워 = 2사분면에 집중하기', message: '오늘의 2사분면이 내일의 성공!' },
      { type: 'mission', mission: '오늘 할 일을 4사분면으로 분류해보기', encouragement: '분류만 해도 뭘 먼저 할지 명확해져!' },
    ],
  },

  'time-silver-2': {
    id: 'time-silver-2', chapterKey: 'time', tierKey: 'silver', stageNumber: 2,
    title: '파킨슨의 법칙',
    cards: [
      { type: 'concept', title: '시간이 늘면 일도 늘어난다', description: '"일은 주어진 시간만큼 늘어난다."\n\n1주일 주면 1주일 걸리고,\n3시간 주면 3시간에 끝내게 돼.\n짧은 시간 설정이 집중력의 열쇠!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '시간 제한', description: '적으면 집중도 상승' },
        { icon: '🎈', label: '팽창 효과', description: '많으면 일이 불필요하게 늘어남' },
        { icon: '🏃', label: '타이트하게', description: '빠듯한 시간이 최고 효율' },
        { icon: '⚡', label: '데드라인', description: '짧은 마감 = 집중력 UP' },
      ]},
      { type: 'example', bad: { label: '성민', story: '"주말이니까 시간 많아" 느긋하게 시작.\n일요일 밤까지 숙제를 질질 끌었다.' }, good: { label: '지은', story: '"수학 1시간, 영어 30분!" 타이머 세팅.\n2시간 만에 모두 끝내고 나머지는 자유!' }},
      { type: 'ox', statement: '시간이 충분하면 더 좋은 결과를 낸다.', answer: false, feedback: '오히려 집중력이 떨어져!\n적당한 시간 제한이 퀄리티를 높여.' },
      { type: 'multipleChoice', question: '파킨슨 법칙 활용법은?', options: ['시간을 넉넉하게', '시간 제한 + 타이머', '계획 없이 자유롭게', '한 번에 오래 집중'], correctIndex: 1, explanation: '시간 제한을 두면 뇌가 자동으로 효율적으로 일해!' },
      { type: 'feedback', summary: '파킨슨 법칙 = 시간을 줄이면 효율 UP', message: '넉넉한 시간이 항상 좋은 건 아냐!' },
      { type: 'mission', mission: '할 일 하나에 "OO분 안에!" 타이머 도전', encouragement: '타이트한 시간이 집중의 마법을 부려!' },
    ],
  },

  'time-silver-3': {
    id: 'time-silver-3', chapterKey: 'time', tierKey: 'silver', stageNumber: 3,
    title: '타임 블로킹',
    cards: [
      { type: 'concept', title: '시간을 블록으로 나누자', description: '"9시~10시 수학, 10시~10시반 영어"\n미리 시간표를 짜는 거야.\n\n"지금 뭐 하지?" 고민이 사라지고\n정해진 시간에 바로 실행 가능!' },
      { type: 'summary', keywords: [
        { icon: '🧱', label: '블록 단위', description: '30분~1시간으로 나누기' },
        { icon: '📋', label: '사전 배정', description: '각 블록에 할 일 정하기' },
        { icon: '🚫', label: '고민 제거', description: '"뭐 하지?" 시간 없애기' },
        { icon: '🔄', label: '유연성', description: '블록 사이 여유 두기' },
      ]},
      { type: 'example', bad: { label: '민수', story: '"수학이랑 영어 해야지" 막연하게 생각.\n뭐부터 할지 모르고 시간만 흘렀다.' }, good: { label: '채원', story: '전날 밤 블록 계획: 4시 수학 / 5시 영어.\n고민 없이 바로 시작!' }},
      { type: 'ox', statement: '타임 블로킹은 매분 매초 계획해야 한다.', answer: false, feedback: '핵심 시간만 정하면 돼.\n모든 걸 계획하면 오히려 지쳐!' },
      { type: 'multipleChoice', question: '타임 블로킹의 가장 큰 장점은?', options: ['매 순간 바쁘게', '고민 시간 줄이고 바로 실행', '남에게 보여주기 좋음', '자유 시간 없어짐'], correctIndex: 1, explanation: '고민이 사라지면 바로 실행할 수 있어!' },
      { type: 'feedback', summary: '타임 블로킹 = 시간에 할 일 미리 배정', message: '계획은 자유를 빼앗는 게 아니라 만들어줘!' },
      { type: 'mission', mission: '내일 방과 후를 1시간 블록으로 계획하기', encouragement: '블록 하나만 지켜도 성공!' },
    ],
  },

  'time-silver-4': {
    id: 'time-silver-4', chapterKey: 'time', tierKey: 'silver', stageNumber: 4,
    title: '2분 룰',
    cards: [
      { type: 'concept', title: '2분이면 바로 하자', description: '2분 이내에 끝나는 일은\n미루지 말고 바로 처리!\n\n간단한 답장, 정리, 메모 같은 것들.\n미루면 쌓여서 큰 부담이 돼.' },
      { type: 'summary', keywords: [
        { icon: '⚡', label: '즉시 실행', description: '2분 이내 일은 바로!' },
        { icon: '📥', label: '쌓임 방지', description: '작은 일 쌓이면 스트레스' },
        { icon: '🧹', label: '정리 효과', description: '잡일 처리 후 중요한 일에 집중' },
        { icon: '✅', label: '성취감', description: '작은 완료가 동기부여' },
      ]},
      { type: 'example', bad: { label: '유진', story: '"나중에" 미룬 작은 일들이\n일주일 뒤 20개가 됐다.' }, good: { label: '시우', story: '"2분이면 되겠다!" 바로 처리.\n항상 할 일 목록이 깔끔.' }},
      { type: 'ox', statement: '작은 일도 계획에 넣어 나중에 해야 한다.', answer: false, feedback: '2분이면 끝나는 건 계획에 넣지 말고 바로!' },
      { type: 'multipleChoice', question: '2분 룰 적용하기 좋은 상황은?', options: ['수학 문제 풀기', '발표 자료 만들기', '선생님 메시지 답장', '영어 에세이'], correctIndex: 2, explanation: '답장은 2분이면 끝나! 바로 처리하자.' },
      { type: 'feedback', summary: '2분 룰 = 2분이면 지금 바로!', message: '작은 실행이 머릿속을 깔끔하게!' },
      { type: 'mission', mission: '미루던 작은 일 3개 바로 처리하기', encouragement: '3개만 하면 머리가 가벼워질 거야!' },
    ],
  },

  'time-silver-5': {
    id: 'time-silver-5', chapterKey: 'time', tierKey: 'silver', stageNumber: 5,
    title: '배치 처리법',
    cards: [
      { type: 'concept', title: '비슷한 일은 모아서!', description: '다른 일로 바꿀 때마다\n뇌가 모드를 전환해서 비효율적이야.\n\n비슷한 일을 묶어서 한 번에!\n이걸 "배치 처리(Batching)"라고 해.' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '묶음 처리', description: '비슷한 일 모아서 처리' },
        { icon: '🧠', label: '전환 비용', description: '바꿀 때 드는 에너지' },
        { icon: '⏱️', label: '시간 절약', description: '전환 시간 줄여 효율 UP' },
        { icon: '🎯', label: '집중도', description: '같은 종류에 깊이 집중' },
      ]},
      { type: 'example', bad: { label: '은호', story: '수학 10분 → 카톡 → 영어 15분 → 인스타\n과목 왔다 갔다, 집중 안 됨.' }, good: { label: '수빈', story: '4시~5시 수학, 5시~6시 영어.\n과목별로 묶으니 깊게 집중!' }},
      { type: 'ox', statement: '과목을 번갈아 하면 지루하지 않아 좋다.', answer: false, feedback: '자주 바꾸면 집중이 깨져!\n최소 30분~1시간 한 과목에 집중!' },
      { type: 'multipleChoice', question: '배치 처리의 핵심은?', options: ['다양하게 번갈아', '비슷한 일 묶어서 전환 줄이기', '좋아하는 것부터', '하루 종일 한 가지만'], correctIndex: 1, explanation: '전환을 줄이면 효율이 확 올라가!' },
      { type: 'feedback', summary: '배치 처리 = 비슷한 일 묶어서 집중', message: '전환을 줄이면 집중이 깊어져!' },
      { type: 'mission', mission: '내일 공부를 과목별 시간 블록으로 배치하기', encouragement: '묶음의 힘을 경험해보자!' },
    ],
  },

  'time-silver-6': {
    id: 'time-silver-6', chapterKey: 'time', tierKey: 'silver', stageNumber: 6,
    title: '에너지 관리',
    cards: [
      { type: 'concept', title: '시간보다 에너지를 관리하라', description: '아침 1시간과 밤 1시간은 달라.\n\n에너지 높을 때 어려운 일,\n낮을 때 쉬운 일을 하면\n같은 시간으로 2배 성과!' },
      { type: 'summary', keywords: [
        { icon: '🔋', label: '에너지 피크', description: '집중력 최고 시간대' },
        { icon: '📉', label: '에너지 저점', description: '점심 후 등 피로한 시간' },
        { icon: '🧠', label: '어려운 일', description: '높을 때 → 수학, 암기' },
        { icon: '📝', label: '쉬운 일', description: '낮을 때 → 정리, 복습' },
      ]},
      { type: 'example', bad: { label: '태경', story: '아침에 쉬운 것만, 밤에 수학.\n피곤해서 집중 안 되고 틀리기만.' }, good: { label: '윤서', story: '에너지 높은 아침에 수학.\n졸릴 때 가벼운 정리. 효율 2배!' }},
      { type: 'ox', statement: '에너지는 하루 종일 비슷하게 유지된다.', answer: false, feedback: '오르내려! 보통 오전이 가장 높고\n점심 후에 떨어져.' },
      { type: 'multipleChoice', question: '에너지 피크에 해야 할 일은?', options: ['SNS 확인', '책상 정리', '가장 어려운 과목', '가벼운 독서'], correctIndex: 2, explanation: '피크 때 어려운 일 = 최고 효율!' },
      { type: 'feedback', summary: '에너지 관리 = 높을 때 어려운 일', message: '내 에너지 패턴을 알면 시간 2배 활용!' },
      { type: 'mission', mission: '이번 주 "언제 집중이 잘 되는지" 기록하기', encouragement: '나를 아는 것이 최고의 전략!' },
    ],
  },

  'time-silver-7': {
    id: 'time-silver-7', chapterKey: 'time', tierKey: 'silver', stageNumber: 7,
    title: '멀티태스킹의 함정',
    cards: [
      { type: 'concept', title: '동시에 하면 더 느려진다', description: '뇌는 한 번에 하나만 집중 가능.\n멀티태스킹은 빠르게 전환할 뿐인데,\n전환마다 에너지와 시간을 잃어.\n\n한 가지에 집중하는 게 결국 더 빨라!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '단일 처리', description: '하나만 깊이 집중 가능' },
        { icon: '🔀', label: '전환 비용', description: '전환 시 회복에 15분' },
        { icon: '📉', label: '효율 저하', description: '멀티태스킹 시 -40%' },
        { icon: '🎯', label: '싱글태스킹', description: '하나씩 끝내고 다음' },
      ]},
      { type: 'example', bad: { label: '동현', story: '수학 + 유튜브 + 카톡 동시에.\n2시간에 문제 5개.' }, good: { label: '유진', story: '폰 끄고 수학에만 집중.\n1시간에 문제 15개!' }},
      { type: 'ox', statement: '멀티태스킹을 잘하면 더 효율적이다.', answer: false, feedback: '누구에게나 비효율적이야.\n"잘한다" 느낌과 실제 결과는 달라!' },
      { type: 'multipleChoice', question: '멀티태스킹이 비효율적인 이유는?', options: ['게으르기 때문에', '전환할 때 에너지·시간 소모', '완벽하려 해서', '쉬는 시간 부족'], correctIndex: 1, explanation: '전환마다 뇌가 리셋되면서 손실 발생!' },
      { type: 'feedback', summary: '싱글태스킹 > 멀티태스킹', message: '한 번에 하나! 느려 보여도 결국 더 빨라.' },
      { type: 'mission', mission: '30분 동안 한 과목에만 집중해보기 (폰 끄기!)', encouragement: '30분 깊은 집중이 2시간 멀티를 이겨!' },
    ],
  },

  'time-silver-8': {
    id: 'time-silver-8', chapterKey: 'time', tierKey: 'silver', stageNumber: 8,
    title: '버퍼 타임의 중요성',
    cards: [
      { type: 'concept', title: '계획에 여유를 넣자', description: '빈틈없는 시간표는 깨지기 쉬워.\n\n블록 사이에 10~15분 여유를 넣으면\n계획이 틀어져도 복구 가능!\n이게 "버퍼 타임"이야.' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '버퍼', description: '예상 밖 상황 대비 여유' },
        { icon: '⏱️', label: '10~15분', description: '블록 사이 완충 시간' },
        { icon: '🔄', label: '복구력', description: '틀어져도 회복 가능' },
        { icon: '😌', label: '여유', description: '마음도 편해짐' },
      ]},
      { type: 'example', bad: { label: '재민', story: '빈틈없이 짠 계획.\n수학 10분 밀리자 하루 전체가 무너졌다.' }, good: { label: '다은', story: '블록마다 10분 버퍼.\n조금 밀려도 다음 블록에 영향 없었다.' }},
      { type: 'ox', statement: '빈틈없는 계획이 가장 효율적이다.', answer: false, feedback: '빈틈없으면 깨지기 쉬워!\n여유 있는 계획이 실제로 더 잘 지켜져.' },
      { type: 'multipleChoice', question: '버퍼 타임이 필요한 이유는?', options: ['놀 시간 확보', '예상 밖 상황에도 계획 유지', '공부 시간 줄이기', '보여주기 좋아서'], correctIndex: 1, explanation: '완벽한 계획은 없어. 버퍼가 있어야 현실에서 작동!' },
      { type: 'feedback', summary: '버퍼 타임 = 계획의 안전장치', message: '여유를 넣는 건 현명한 전략이야!' },
      { type: 'mission', mission: '시간표 짤 때 블록 사이 10분 버퍼 넣기', encouragement: '여유 있는 계획이 실천하는 계획!' },
    ],
  },

  'time-silver-9': {
    id: 'time-silver-9', chapterKey: 'time', tierKey: 'silver', stageNumber: 9,
    title: '주간 리뷰의 힘',
    cards: [
      { type: 'concept', title: '되돌아봐야 성장한다', description: '계획만 세우고 돌아보지 않으면\n같은 실수를 반복해.\n\n매주 15분, 잘한 것·부족한 것·개선점\n정리하면 다음 주가 달라져!' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '되돌아보기', description: '이번 주 뭘 했는지 점검' },
        { icon: '✅', label: '잘한 점', description: '스스로 칭찬할 것' },
        { icon: '📝', label: '개선점', description: '다음 주 바꿀 것' },
        { icon: '🔄', label: '매주 반복', description: '일요일 저녁 15분' },
      ]},
      { type: 'example', bad: { label: '지환', story: '매주 계획만 세우고 돌아보지 않음.\n같은 문제가 반복됐다.' }, good: { label: '서아', story: '매주 일요일 15분 리뷰.\n"수학 시간 부족" → 다음 주 늘림 → 성적 UP.' }},
      { type: 'ox', statement: '바빴으면 리뷰할 시간이 없다.', answer: false, feedback: '바빴을수록 리뷰가 더 필요해!\n15분이면 충분하고 다음 주를 살려줘.' },
      { type: 'multipleChoice', question: '주간 리뷰에서 가장 중요한 질문은?', options: ['몇 시간 공부했나?', '남보다 잘했나?', '뭐가 잘됐고 뭘 개선할까?', '얼마나 바빴나?'], correctIndex: 2, explanation: '잘한 건 유지, 부족한 건 개선. 이게 핵심!' },
      { type: 'feedback', summary: '주간 리뷰 = 15분으로 다음 주 업그레이드', message: '되돌아보는 사람만 진짜 성장해!' },
      { type: 'mission', mission: '일요일 15분 리뷰: 잘한 것 3개, 개선할 것 1개', encouragement: '15분이 성장의 비밀이야!' },
    ],
  },

  'time-silver-10': {
    id: 'time-silver-10', chapterKey: 'time', tierKey: 'silver', stageNumber: 10,
    title: 'SMART 목표 설정법',
    cards: [
      { type: 'concept', title: '목표도 기술이 필요하다', description: '"열심히 하자!" 는 실천이 어려워.\n\nSMART 목표의 5가지 조건:\nS 구체적 / M 측정 가능\nA 달성 가능 / R 관련 있는 / T 기한 있는' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: 'Specific', description: '"수학 1단원 문제 풀기"' },
        { icon: '📏', label: 'Measurable', description: '"문제 20개"' },
        { icon: '✅', label: 'Achievable', description: '"1시간이면 가능"' },
        { icon: '⏰', label: 'Time-bound', description: '"금요일까지"' },
      ]},
      { type: 'example', bad: { label: '나쁜 목표', story: '"영어 열심히 하기"\n→ 뭘 해야 할지, 언제까지인지 모름.' }, good: { label: 'SMART 목표', story: '"금요일까지 영어 단어 60개 외우기"\n→ 매일 12개씩, 명확하고 실천 가능!' }},
      { type: 'ox', statement: '"더 열심히 공부하겠다"는 좋은 목표이다.', answer: false, feedback: '너무 막연해! "매일 수학 10개 풀기"\n같이 구체적이어야 해.' },
      { type: 'multipleChoice', question: 'SMART 목표에 가장 가까운 것은?', options: ['영어 잘하기', '이번 주 영어 단어 50개 외우기', '공부 많이 하기', '성적 올리기'], correctIndex: 1, explanation: '구체적 + 측정 가능 + 기한 = SMART!' },
      { type: 'feedback', summary: 'SMART = 구체적+측정+달성+관련+기한', message: '막연한 결심 대신 SMART 목표로!' },
      { type: 'mission', mission: '목표 하나를 SMART 방식으로 다시 써보기', encouragement: '좋은 목표가 좋은 결과를 만들어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (응용 시간관리 실전) 1~10
  // ═══════════════════════════════════════

  'time-gold-1': {
    id: 'time-gold-1', chapterKey: 'time', tierKey: 'gold', stageNumber: 1,
    title: '80/20 파레토 법칙',
    cards: [
      { type: 'concept', title: '20%가 80%를 만든다', description: '결과의 80%는 원인의 20%에서 나와.\n\n모든 걸 똑같이 할 필요 없어.\n핵심 20%를 찾아 집중하면\n80%의 성과를 얻을 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '80/20', description: '핵심 20%가 80% 결과' },
        { icon: '🎯', label: '핵심 파악', description: '효과 큰 활동 찾기' },
        { icon: '✂️', label: '비핵심 제거', description: '효과 없는 활동 줄이기' },
        { icon: '⚡', label: '레버리지', description: '적은 노력, 큰 효과' },
      ]},
      { type: 'example', bad: { label: '현지', story: '모든 과목에 똑같은 시간 배분.\n잘하는 과목에도 같은 시간이라 비효율.' }, good: { label: '준서', story: '약점 과목 수학에 시간 2배 투자.\n핵심 개념 20%에 집중 → 전체 성적 UP.' }},
      { type: 'ox', statement: '모든 과목에 동일한 시간이 효율적이다.', answer: false, feedback: '약한 부분, 핵심 부분에 더 집중하는 게 효율적!' },
      { type: 'multipleChoice', question: '파레토 법칙의 공부 적용법은?', options: ['모든 문제 다 풀기', '핵심 개념과 빈출 유형에 집중', '쉬운 것부터 천천히', '모든 과목 같은 시간'], correctIndex: 1, explanation: '빈출 20%에 집중하면 성적 80% 올릴 수 있어!' },
      { type: 'feedback', summary: '파레토 = 핵심 20%에 집중', message: '모든 걸 다 하려 말고 핵심에 집중!' },
      { type: 'mission', mission: '공부 중인 과목에서 "핵심 20%" 적어보기', encouragement: '핵심을 아는 것이 진짜 공부의 시작!' },
    ],
  },

  'time-gold-2': {
    id: 'time-gold-2', chapterKey: 'time', tierKey: 'gold', stageNumber: 2,
    title: '딥 워크 - 깊은 집중',
    cards: [
      { type: 'concept', title: '깊은 집중이 천재를 만든다', description: '방해 없이 한 가지에 깊이 몰입하는 것\n= 딥 워크(Deep Work).\n\n딥 워크 1시간이\n얕은 일 3시간을 이겨!' },
      { type: 'summary', keywords: [
        { icon: '🏊', label: '딥 워크', description: '방해 없이 깊이 집중' },
        { icon: '🏖️', label: '얕은 일', description: '알림 확인 등 집중 불필요' },
        { icon: '🔕', label: '환경 세팅', description: '알림 끄기, 조용한 곳' },
        { icon: '⏱️', label: '시간 확보', description: '최소 1시간 연속 블록' },
      ]},
      { type: 'example', bad: { label: '얕은 공부', story: '카톡 → 확인 → 공부 → 인스타 → 반복.\n3시간 앉아있었지만 실제 집중 30분.' }, good: { label: '딥 워크', story: '폰 비행기 모드, 도서관 조용한 자리.\n90분 몰입으로 평소 3시간 분량 완료.' }},
      { type: 'ox', statement: '오래 앉아있으면 딥 워크다.', answer: false, feedback: '시간이 아니라 집중의 질이야!\n방해 없이 몰입해야 진짜 딥 워크.' },
      { type: 'multipleChoice', question: '딥 워크의 가장 중요한 조건은?', options: ['오래 앉아있기', '방해 제거 + 한 가지 집중', '여러 과목 동시에', '음악 틀어놓기'], correctIndex: 1, explanation: '방해 제거 + 한 가지 집중 = 딥 워크 핵심!' },
      { type: 'feedback', summary: '딥 워크 = 방해 제거 + 깊은 집중', message: '깊이 집중하는 능력이 최고의 경쟁력!' },
      { type: 'mission', mission: '1시간 딥 워크 시도 (폰 끄기, 한 과목, 조용한 곳)', encouragement: '깊은 1시간이 인생을 바꿀 수 있어!' },
    ],
  },

  'time-gold-3': {
    id: 'time-gold-3', chapterKey: 'time', tierKey: 'gold', stageNumber: 3,
    title: '나만의 루틴 설계',
    cards: [
      { type: 'concept', title: '하루를 시스템으로', description: '매일 "뭐 하지?" 고민하면\n의지력이 거기에 소모돼.\n\n아침+공부+저녁 루틴 3개를 설계하면\n고민 없이 자동으로 움직여!' },
      { type: 'summary', keywords: [
        { icon: '🌅', label: '아침 루틴', description: '기상→물→스트레칭→계획' },
        { icon: '📚', label: '공부 루틴', description: '집중→복습→정리' },
        { icon: '🌙', label: '저녁 루틴', description: '리뷰→내일 계획→취침' },
        { icon: '⚙️', label: '자동화', description: '고민 없이 움직이는 시스템' },
      ]},
      { type: 'example', bad: { label: '결심만', story: '"열심히 해야지!" 뭘 어떻게 할지 안 정함.\n결심은 3일 만에 사라졌다.' }, good: { label: '시스템', story: '"6시 기상→물→계획→학교→귀가→공부2h→운동"\n정해진 대로 움직이니 고민이 없었다.' }},
      { type: 'ox', statement: '루틴은 자유를 빼앗는다.', answer: false, feedback: '오히려 루틴이 자유를 만들어줘!\n고민 시간을 아껴서 하고 싶은 걸 할 수 있어.' },
      { type: 'multipleChoice', question: '좋은 루틴의 조건은?', options: ['매일 다르게', '실천 가능한 수준으로 단순하게', '활동을 최대한 많이', '주말에만'], correctIndex: 1, explanation: '단순하고 실천 가능해야 오래 지속돼!' },
      { type: 'feedback', summary: '루틴 = 고민 없이 움직이는 자동 시스템', message: '의지력 대신 시스템을 만들자!' },
      { type: 'mission', mission: '"방과 후 루틴" 3단계 설계하기', encouragement: '루틴이 정해지면 매일이 편해져!' },
    ],
  },

  'time-gold-4': {
    id: 'time-gold-4', chapterKey: 'time', tierKey: 'gold', stageNumber: 4,
    title: '시험 기간 전략적 시간관리',
    cards: [
      { type: 'concept', title: '시험 기간 시간 전략', description: '"다 해야 해!" 하면 불안만 커져.\n\n전략: 범위 파악 → 난이도 확인\n→ 약점에 더 많은 시간\n→ 시험일부터 거꾸로 계획!' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '범위 파악', description: '전 과목 범위 정리' },
        { icon: '⚖️', label: '시간 배분', description: '약한 과목에 더 투자' },
        { icon: '🔙', label: '역순 계획', description: '시험일부터 거꾸로' },
        { icon: '🔄', label: '복습', description: '전날은 전체 훑어보기' },
      ]},
      { type: 'example', bad: { label: '불안한 공부', story: '좋아하는 과목만 하다가\n어려운 과목은 벼락치기.' }, good: { label: '전략적 공부', story: '시험 2주 전, 거꾸로 일별 분량 배정.\n매일 정해진 만큼만 하니 불안 감소!' }},
      { type: 'ox', statement: '시험 전날 밤새면 성적이 오른다.', answer: false, feedback: '수면 부족은 기억력·집중력을 떨어뜨려.\n미리 계획하고 전날은 일찍 자는 게 나아!' },
      { type: 'multipleChoice', question: '시험 기간 시간관리 핵심은?', options: ['모든 과목 동일 시간', '범위 파악 + 역순 계획', '좋아하는 과목부터', '전날 몰아서'], correctIndex: 1, explanation: '역순 계획은 매일 뭘 할지 명확하게 알려줘!' },
      { type: 'feedback', summary: '시험 전략 = 범위 파악 + 역순 계획 + 약점 집중', message: '계획이 불안을 줄이고 실력을 올려!' },
      { type: 'mission', mission: '다음 시험 때 역순 일별 공부 분량 정하기', encouragement: '전략 있는 공부가 실력 있는 결과!' },
    ],
  },

  'time-gold-5': {
    id: 'time-gold-5', chapterKey: 'time', tierKey: 'gold', stageNumber: 5,
    title: '큰 과제 쪼개기',
    cards: [
      { type: 'concept', title: '코끼리도 한 입씩', description: '큰 과제가 막막한 이유 =\n어디서 시작해야 할지 모르기 때문.\n\n해결: 30분 이내 단위로 쪼개기!\n작은 단계는 시작하기 쉬워.' },
      { type: 'summary', keywords: [
        { icon: '🐘', label: '큰 과제', description: '막막하고 시작이 어려운 일' },
        { icon: '✂️', label: '쪼개기', description: '30분 이내로 분해' },
        { icon: '1️⃣', label: '첫 단계', description: '가장 쉬운 것부터' },
        { icon: '📈', label: '진행감', description: '작은 완료 = 동기부여' },
      ]},
      { type: 'example', bad: { label: '막막함', story: '"보고서 써야 하는데..." 부담.\n계속 미루다 마감 전날 급하게.' }, good: { label: '쪼개기', story: '주제(10분)→자료(20분)→개요(15분)→본문(30분)\n하나씩 완료할 때마다 뿌듯!' }},
      { type: 'ox', statement: '큰 과제는 한 번에 끝내야 잘한다.', answer: false, feedback: '한 번에 하려면 시작이 어려워!\n여러 날 조금씩이 퀄리티도 높아.' },
      { type: 'multipleChoice', question: '과제 쪼개기의 핵심 기준은?', options: ['과목별로', '30분 이내 크기로', '어려운 순서대로', '한 페이지씩'], correctIndex: 1, explanation: '30분 이내가 시작하기 쉽고 성취감도 있어!' },
      { type: 'feedback', summary: '큰 과제 = 작은 단계들의 합', message: '쪼개면 시작하기 쉬워져!' },
      { type: 'mission', mission: '미루던 큰 과제를 5단계 이하로 쪼개기', encouragement: '쪼개는 순간 "할 수 있겠다!" 느낌!' },
    ],
  },

  'time-gold-6': {
    id: 'time-gold-6', chapterKey: 'time', tierKey: 'gold', stageNumber: 6,
    title: '습관 스태킹',
    cards: [
      { type: 'concept', title: '기존 습관에 새 습관 붙이기', description: '새 습관이 어려운 건 "기억하기".\n\n공식: "OO한 후에 XX을 한다"\n예: "양치 후에 영단어 5개"\n\n이미 하는 행동이 신호가 돼서\n자연스럽게 새 습관이 시작돼!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연결', description: '기존 + 새 습관 붙이기' },
        { icon: '📌', label: '기존 습관', description: '이미 매일 하는 행동' },
        { icon: '✨', label: '새 습관', description: '새로 만들고 싶은 행동' },
        { icon: '🔄', label: '자동화', description: '반복하면 의식 없이 실행' },
      ]},
      { type: 'example', bad: { label: '의지력만', story: '"매일 영단어!" 하지만 언제 할지 안 정함.\n매번 까먹고 안 하게 됐다.' }, good: { label: '습관 스태킹', story: '"양치 후에 영단어 5개!"\n양치할 때마다 자동으로 생각나서\n한 달 뒤 150개 완성.' }},
      { type: 'ox', statement: '새 습관은 의지력만 있으면 된다.', answer: false, feedback: '의지력은 한계가 있어!\n환경과 시스템이 더 효과적.' },
      { type: 'multipleChoice', question: '습관 스태킹의 올바른 공식은?', options: ['하고 싶을 때', '"OO 후에 XX" 형태로 연결', '하루 10개 새 습관', '매주 다른 습관'], correctIndex: 1, explanation: '기존 습관이 "신호"가 돼서 자동으로 시작!' },
      { type: 'feedback', summary: '습관 스태킹 = 기존 + 새 습관 연결', message: '이미 하는 것에 붙이면 훨씬 쉬워!' },
      { type: 'mission', mission: '"___한 후에 ___을 한다" 형태로 적기', encouragement: '작은 연결이 큰 변화를 만들어!' },
    ],
  },

  'time-gold-7': {
    id: 'time-gold-7', chapterKey: 'time', tierKey: 'gold', stageNumber: 7,
    title: '시간 감각 키우기',
    cards: [
      { type: 'concept', title: '시간을 느끼는 연습', description: '시간 감각 없으면 계획이 매번 틀어져.\n\n"예상 시간"을 먼저 적고\n"실제 시간"과 비교하는 연습!\n반복하면 시간 추정이 정확해져.' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '예상', description: '걸릴 시간 먼저 추정' },
        { icon: '⏱️', label: '측정', description: '실제 걸린 시간 기록' },
        { icon: '📊', label: '비교', description: '예상 vs 실제 차이 분석' },
        { icon: '🔄', label: '교정', description: '반복하면 정확해짐' },
      ]},
      { type: 'example', bad: { label: '감각 없이', story: '"수학 20분이면 되겠지"\n실제 1시간. 다음 계획 다 밀림.' }, good: { label: '감각 훈련', story: '"예상 20분" 기록 → 실제 45분.\n다음엔 "40~50분"으로 수정 → 계획 정확!' }},
      { type: 'ox', statement: '시간 감각은 타고나는 것이다.', answer: false, feedback: '훈련으로 키울 수 있어!\n예상→측정→비교를 반복하면 돼.' },
      { type: 'multipleChoice', question: '시간 감각 키우는 방법은?', options: ['항상 시계 보기', '예상 시간 적고 실제와 비교', '감으로 하기', '시간 신경 안 쓰기'], correctIndex: 1, explanation: '예상과 실제를 비교하면 뇌가 자동 교정!' },
      { type: 'feedback', summary: '시간 감각 = 예상→측정→비교→교정', message: '정확한 시간 감각이 모든 계획의 기반!' },
      { type: 'mission', mission: '할 일 3개에 예상 시간 적고 실제와 비교하기', encouragement: '차이가 클수록 배우는 게 많아!' },
    ],
  },

  'time-gold-8': {
    id: 'time-gold-8', chapterKey: 'time', tierKey: 'gold', stageNumber: 8,
    title: '방해 요소 관리 전략',
    cards: [
      { type: 'concept', title: '집중 환경을 설계하라', description: '의지력으로 참는 건 한계가 있어.\n\n방해 자체가 안 일어나도록\n환경을 미리 설계하는 게 답!\n환경이 행동을 만들어.' },
      { type: 'summary', keywords: [
        { icon: '🏠', label: '물리적', description: '정리된 책상, 필요한 것만' },
        { icon: '📵', label: '디지털', description: '알림 끄기, 앱 차단' },
        { icon: '👥', label: '사회적', description: '"공부 중" 알리기' },
        { icon: '🔧', label: '사전 설계', description: '의지력 대신 환경으로' },
      ]},
      { type: 'example', bad: { label: '의지력 의존', story: '"폰 안 볼 거야!" 결심.\n알림 올 때마다 참기 어려워 10분 만에 실패.' }, good: { label: '환경 설계', story: '폰을 다른 방에, 책상엔 공부만.\n알림을 모르니 자연스럽게 집중.' }},
      { type: 'ox', statement: '의지력이 강하면 어디서든 집중 가능하다.', answer: false, feedback: '의지력은 유한한 자원!\n환경을 바꾸는 게 훨씬 효과적.' },
      { type: 'multipleChoice', question: '집중 환경 설계의 핵심은?', options: ['더 열심히 참기', '의지력 훈련', '방해 요소 물리적 제거', '방해 무시 연습'], correctIndex: 2, explanation: '제거가 최고! 참는 것보다 없애는 게 확실.' },
      { type: 'feedback', summary: '환경 설계 = 의지력 대신 시스템', message: '환경이 너를 도와주게 만들자!' },
      { type: 'mission', mission: '공부 환경 방해 요소 3개 + 해결책 적기', encouragement: '환경을 바꾸면 행동이 바뀌어!' },
    ],
  },

  'time-gold-9': {
    id: 'time-gold-9', chapterKey: 'time', tierKey: 'gold', stageNumber: 9,
    title: '완벽주의 벗어나기',
    cards: [
      { type: 'concept', title: '완벽보다 완료가 낫다', description: '완벽주의 → 시작이 두려움 → 미룸\n→ 시간 부족 → 오히려 대충.\n\n80%로 빨리 완성하고 수정하면\n시간도 아끼고 결과도 좋아!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '완료 우선', description: '일단 끝내는 게 중요' },
        { icon: '📝', label: '초안 먼저', description: '80%로 빨리, 수정은 나중' },
        { icon: '⏰', label: '시간 절약', description: '100%에 드는 시간이 3배' },
        { icon: '🔄', label: '반복 개선', description: '완성→수정→개선이 효율적' },
      ]},
      { type: 'example', bad: { label: '완벽주의', story: '첫 문장 완벽해야 해 → 30분 고침\n시간 다 지나 한 페이지도 못 씀.' }, good: { label: '완료 우선', story: '"일단 끝까지!" 대충이라도 초안 완성.\n그 다음 수정하니 훨씬 빠르고 잘 됨.' }},
      { type: 'ox', statement: '완벽하게 하려는 것은 항상 좋다.', answer: false, feedback: '완벽을 추구하다 시작도 못 하는 게 문제!\n80% 완성 후 수정이 더 나아.' },
      { type: 'multipleChoice', question: '"완벽보다 완료" 전략의 핵심은?', options: ['대충 하기', '80%로 완성 후 수정으로 올리기', '검토 안 하기', '시간 무한정 쓰기'], correctIndex: 1, explanation: '80% 완성 후 수정이 처음부터 100% 노리는 것보다 효과적!' },
      { type: 'feedback', summary: '완벽보다 완료 → 수정으로 완성도 UP', message: '일단 시작하고 일단 끝내자!' },
      { type: 'mission', mission: '미루던 과제를 "80% 수준으로 일단 끝내기"', encouragement: '끝내는 것 자체가 이미 승리!' },
    ],
  },

  'time-gold-10': {
    id: 'time-gold-10', chapterKey: 'time', tierKey: 'gold', stageNumber: 10,
    title: '나만의 시간관리 시스템',
    cards: [
      { type: 'concept', title: '나에게 맞는 시스템', description: '지금까지 배운 도구들 중\n나에게 맞는 3~4개를 골라서\n"나만의 시스템"을 만들어보자.\n\n모든 걸 다 할 필요 없어!\n조합하면 강력한 시스템이 돼.' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '조합', description: '나에게 맞는 것 선택' },
        { icon: '🔧', label: '커스터마이징', description: '내 상황에 맞게 조정' },
        { icon: '🔄', label: '실험', description: '해보고 수정 반복' },
        { icon: '📈', label: '성장', description: '점점 나은 시스템으로' },
      ]},
      { type: 'example', bad: { label: '도구 수집가', story: '모든 방법 다 해보려다\n하나도 제대로 못 하고 원점.' }, good: { label: '시스템 설계자', story: '아침 루틴 + 타임블로킹 + 주간 리뷰\n3가지를 조합해 나만의 시스템 완성!' }},
      { type: 'ox', statement: '시간관리는 한 가지 방법만 쓰면 된다.', answer: false, feedback: '한 가지로는 부족해.\n3~4가지 조합이 완성된 시스템!' },
      { type: 'multipleChoice', question: '나만의 시스템 만들기 첫 단계는?', options: ['유명한 방법 따라하기', '나에게 맞는 도구를 골라 조합', '남이 하는 대로', '완벽한 시스템 한 번에'], correctIndex: 1, explanation: '나에게 맞는 걸 골라 조합하는 게 핵심!' },
      { type: 'apply', question: '가장 효과적이었던 시간관리 도구 3가지를 골라보세요.', placeholder: '예: 아침 루틴, 타임블로킹, 2분 룰...' },
      { type: 'feedback', summary: '나만의 시스템 = 나에게 맞는 도구 3~4개 조합', message: '골드 완료! 이제 시간관리 마스터!' },
      { type: 'mission', mission: '3가지 골라 "나의 시간관리 시스템" 정리하기', encouragement: '네가 만든 시스템이 최고의 시스템!' },
    ],
  },

}
