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

  // ═══════════════════════════════════════
  // 플래티넘 (프로 시간관리 전략) 1~10
  // ═══════════════════════════════════════

  'time-platinum-1': {
    id: 'time-platinum-1', chapterKey: 'time', tierKey: 'platinum', stageNumber: 1,
    title: '시간 ROI 분석법',
    cards: [
      { type: 'concept', title: '투자 대비 수익으로 보는 시간', description: '돈에 ROI(투자수익률)가 있듯\n시간에도 ROI가 있어.\n\n1시간 투자했을 때\n가장 큰 가치를 돌려주는 활동이\n네 "높은 ROI" 활동이야.' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '시간 ROI', description: '투자 시간 대비 얻는 가치' },
        { icon: '💎', label: '고ROI 활동', description: '1시간에 큰 변화를 만드는 일' },
        { icon: '🗑️', label: '저ROI 활동', description: '시간만 쓰고 결과가 없는 일' },
        { icon: '🔀', label: '재배치', description: '저ROI → 고ROI로 시간 이동' },
      ]},
      { type: 'example', bad: { label: '시간 낭비형', story: '시험 범위 전체를 밑줄만 치며 3시간.\n결국 기억나는 건 거의 없다.' }, good: { label: 'ROI 분석형', story: '시험에 잘 나오는 유형 20개를 1시간 풀고\n틀린 것만 30분 복습. 핵심만 잡았다.' }},
      { type: 'ox', statement: '오래 공부하면 무조건 성적이 오른다.', answer: false, feedback: '시간의 양보다 질이 중요해!\n고ROI 활동에 집중하는 게 핵심.' },
      { type: 'multipleChoice', question: '시간 ROI가 가장 높은 학습법은?', options: ['교과서 전체 읽기', '오답 노트 집중 복습', '필기 예쁘게 정리', '친구와 수다하며 공부'], correctIndex: 1, explanation: '오답 복습은 약점을 정확히 보강해서 ROI가 높아!' },
      { type: 'apply', question: '지난 일주일 중 시간 ROI가 가장 높았던 활동과 낮았던 활동은?', placeholder: '높은 ROI: / 낮은 ROI: ...' },
      { type: 'feedback', summary: '시간 ROI = 같은 시간, 최고의 결과', message: '양이 아닌 질로 승부하자!' },
      { type: 'mission', mission: '이번 주 활동 3가지를 ROI 기준으로 평가하기', encouragement: '분석할 줄 아는 사람이 시간을 지배한다!' },
    ],
  },

  'time-platinum-2': {
    id: 'time-platinum-2', chapterKey: 'time', tierKey: 'platinum', stageNumber: 2,
    title: '울트라디안 리듬 활용',
    cards: [
      { type: 'concept', title: '90분 주기의 비밀', description: '우리 뇌는 90분 집중 → 20분 휴식\n주기를 반복해. "울트라디안 리듬"이야.\n\n이 리듬을 무시하면 집중력이 뚝.\n리듬에 맞추면 하루가 달라져!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '90분 집중', description: '뇌의 최적 집중 단위' },
        { icon: '☕', label: '20분 휴식', description: '리듬 회복 시간' },
        { icon: '🔄', label: '3~4사이클', description: '하루 최대 집중 사이클' },
        { icon: '📉', label: '리듬 무시', description: '집중력 급락, 피로 누적' },
      ]},
      { type: 'example', bad: { label: '무한 집중파', story: '4시간 연속 공부. 뒷부분은\n눈만 움직이고 머리는 안 돌아갔다.' }, good: { label: '리듬 활용파', story: '90분 공부 → 20분 산책 → 90분 공부.\n총 시간은 적은데 흡수한 건 더 많다.' }},
      { type: 'ox', statement: '오래 앉아있을수록 집중력이 높아진다.', answer: false, feedback: '90분이 지나면 뇌 효율이 급락해.\n쉬어야 다시 집중할 수 있어!' },
      { type: 'multipleChoice', question: '울트라디안 리듬에 맞는 학습법은?', options: ['5시간 연속 공부', '90분 공부 + 20분 휴식 반복', '15분마다 쉬기', '졸릴 때만 쉬기'], correctIndex: 1, explanation: '90+20 사이클이 뇌의 자연 리듬에 딱 맞아!' },
      { type: 'feedback', summary: '90분 집중 + 20분 휴식 = 최적 리듬', message: '뇌 리듬을 타면 공부가 쉬워진다!' },
      { type: 'mission', mission: '내일 오전에 90분 집중 + 20분 휴식 1사이클 해보기', encouragement: '한 번 해보면 차이를 바로 느낄 거야!' },
    ],
  },

  'time-platinum-3': {
    id: 'time-platinum-3', chapterKey: 'time', tierKey: 'platinum', stageNumber: 3,
    title: '의사결정 피로 관리',
    cards: [
      { type: 'concept', title: '결정도 에너지를 소모한다', description: '하루에 결정을 35,000번 한다고 해.\n"뭐 먹지?" "뭐 입지?"도 결정이야.\n\n결정이 쌓이면 뇌가 지쳐서\n정작 중요한 결정에서 실수해.' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '결정 피로', description: '결정할수록 뇌 에너지 감소' },
        { icon: '👔', label: '루틴화', description: '반복 결정은 자동화' },
        { icon: '🌅', label: '아침 결정', description: '중요 결정은 아침에' },
        { icon: '📋', label: '사전 결정', description: '미리 정해놓으면 에너지 절약' },
      ]},
      { type: 'example', bad: { label: '결정 과부하', story: '아침부터 옷, 메뉴, 카페 고민.\n오후엔 지쳐서 공부 계획을 대충 세웠다.' }, good: { label: '결정 절약', story: '옷은 전날 준비, 점심은 고정 메뉴.\n아침 에너지를 공부 계획에 집중 투자.' }},
      { type: 'ox', statement: '작은 결정은 에너지를 소모하지 않는다.', answer: false, feedback: '작은 결정도 쌓이면 큰 피로가 돼!\n스티브 잡스가 매일 같은 옷 입은 이유야.' },
      { type: 'multipleChoice', question: '의사결정 피로를 줄이는 방법은?', options: ['매 순간 신중하게 결정', '반복적인 일은 루틴으로 자동화', '결정을 다 미루기', '남에게 모두 맡기기'], correctIndex: 1, explanation: '반복 결정 루틴화 → 중요한 결정에 에너지 집중!' },
      { type: 'feedback', summary: '작은 결정 자동화 → 중요한 결정에 집중', message: '에너지를 아끼는 것도 시간관리야!' },
      { type: 'mission', mission: '매일 반복되는 결정 3가지를 루틴으로 고정하기', encouragement: '결정을 줄이면 실행력이 올라가!' },
    ],
  },

  'time-platinum-4': {
    id: 'time-platinum-4', chapterKey: 'time', tierKey: 'platinum', stageNumber: 4,
    title: '시간 감사 일기',
    cards: [
      { type: 'concept', title: '잘 쓴 시간을 기록하자', description: '시간관리 = 부족한 시간 쥐어짜기?\n아니야! 잘 쓴 시간을 인식하는 거야.\n\n"오늘 시간을 잘 쓴 순간"을\n기록하면 긍정적 패턴이 강화돼.' },
      { type: 'summary', keywords: [
        { icon: '📓', label: '시간 감사', description: '잘 쓴 시간에 감사하기' },
        { icon: '✨', label: '긍정 강화', description: '잘한 패턴이 반복됨' },
        { icon: '🔍', label: '패턴 발견', description: '나의 최적 시간 발견' },
        { icon: '😊', label: '만족감', description: '시간관리 스트레스 감소' },
      ]},
      { type: 'example', bad: { label: '자책형', story: '"오늘도 시간 낭비했어..."\n매일 자책만 하다 시간관리 자체를 포기.' }, good: { label: '감사형', story: '"오전에 1시간 집중한 게 뿌듯하다!"\n다음 날도 오전 집중을 자연스럽게 반복.' }},
      { type: 'ox', statement: '시간관리를 잘하려면 항상 부족한 점을 반성해야 한다.', answer: false, feedback: '반성만 하면 지침! 잘한 것도 기록해야\n동기부여가 유지돼.' },
      { type: 'multipleChoice', question: '시간 감사 일기의 핵심 효과는?', options: ['완벽한 하루를 만들기', '잘한 패턴을 인식하고 반복하기', '남과 비교하기', '반성할 점 찾기'], correctIndex: 1, explanation: '잘한 것을 인식하면 뇌가 자동으로 반복하려 해!' },
      { type: 'feedback', summary: '잘 쓴 시간 기록 → 긍정 패턴 강화', message: '오늘 잘한 것에 집중하자!' },
      { type: 'mission', mission: '오늘 밤 "시간을 잘 쓴 순간 2가지" 적어보기', encouragement: '감사하면 더 잘하게 돼!' },
    ],
  },

  'time-platinum-5': {
    id: 'time-platinum-5', chapterKey: 'time', tierKey: 'platinum', stageNumber: 5,
    title: '전략적 게으름',
    cards: [
      { type: 'concept', title: '똑똑하게 쉬는 기술', description: '"열심히"만 하는 건 전략이 아니야.\n진짜 프로는 "전략적으로 쉰다".\n\n쉬는 것도 생산성의 일부야.\n회복 없이 성과 없다!' },
      { type: 'summary', keywords: [
        { icon: '🛋️', label: '전략적 쉼', description: '계획된 휴식 시간' },
        { icon: '🔋', label: '에너지 충전', description: '쉬어야 다시 달릴 수 있다' },
        { icon: '🧘', label: '능동적 휴식', description: '산책, 명상 등 회복 활동' },
        { icon: '⚠️', label: '과로 경고', description: '쉬지 않으면 번아웃' },
      ]},
      { type: 'example', bad: { label: '쉼 없는 사람', story: '매일 12시간 공부. 3주 뒤 번아웃.\n일주일 내내 아무것도 못 했다.' }, good: { label: '전략적 쉼', story: '8시간 공부 + 운동 1시간 + 취미 30분.\n3개월간 꾸준히 유지, 성적도 상승.' }},
      { type: 'ox', statement: '쉬는 시간은 시간 낭비다.', answer: false, feedback: '쉼은 투자야! 쉬어야 집중력이 회복되고\n장기적으로 더 많이 할 수 있어.' },
      { type: 'multipleChoice', question: '전략적 쉼의 핵심은?', options: ['하루 종일 쉬기', '계획된 시간에 회복 활동하기', '피곤할 때만 쉬기', '놀기 = 쉬기'], correctIndex: 1, explanation: '계획된 쉼이 무계획 쉼보다 회복력이 3배!' },
      { type: 'feedback', summary: '전략적 쉼 = 생산성의 숨은 무기', message: '잘 쉬는 사람이 잘 일한다!' },
      { type: 'mission', mission: '이번 주 "회복 시간" 3개를 미리 캘린더에 넣기', encouragement: '쉼도 계획이야. 네 에너지를 지키자!' },
    ],
  },

  'time-platinum-6': {
    id: 'time-platinum-6', chapterKey: 'time', tierKey: 'platinum', stageNumber: 6,
    title: '환경 설계 전략',
    cards: [
      { type: 'concept', title: '환경이 행동을 결정한다', description: '의지력에 기대지 마.\n환경을 바꾸면 행동이 바뀌어.\n\n공부 환경을 설계하면\n시간관리가 자동으로 돼.' },
      { type: 'summary', keywords: [
        { icon: '🏠', label: '공간 설계', description: '공부 전용 공간 만들기' },
        { icon: '📱', label: '방해 차단', description: '알림 끄기, 앱 숨기기' },
        { icon: '👁️', label: '단서 노출', description: '할 일 목록 보이게 두기' },
        { icon: '🚫', label: '유혹 제거', description: '방해물을 물리적으로 치우기' },
      ]},
      { type: 'example', bad: { label: '유혹 환경', story: '침대에서 핸드폰 옆에 두고 공부.\n10분마다 알림 확인, 결국 포기.' }, good: { label: '설계된 환경', story: '핸드폰 다른 방에 두고 책상에 할 일 목록만.\n자연스럽게 2시간 집중 완료.' }},
      { type: 'ox', statement: '의지력만 강하면 어디서든 집중할 수 있다.', answer: false, feedback: '의지력은 한계가 있어!\n환경을 바꾸는 게 더 확실하고 쉬워.' },
      { type: 'multipleChoice', question: '집중 환경 설계의 핵심은?', options: ['더 열심히 참기', '방해물 제거 + 할 일 노출', '카페에서만 공부', '음악 크게 틀기'], correctIndex: 1, explanation: '유혹 제거하고 할 일을 눈에 띄게!\n의지력 필요 없는 시스템.' },
      { type: 'feedback', summary: '환경 설계 = 의지력 없이도 집중', message: '환경을 바꾸면 습관이 따라와!' },
      { type: 'mission', mission: '공부할 때 핸드폰 놓을 "다른 장소"를 정하기', encouragement: '환경 하나만 바꿔도 집중력 2배!' },
    ],
  },

  'time-platinum-7': {
    id: 'time-platinum-7', chapterKey: 'time', tierKey: 'platinum', stageNumber: 7,
    title: '월간 시간 감사',
    cards: [
      { type: 'concept', title: '한 달을 돌아보는 힘', description: '주간 리뷰보다 더 넓은 시야로\n한 달을 돌아보자.\n\n"이번 달 시간을 어디에 썼는가?"\n패턴이 보이면 다음 달이 달라져.' },
      { type: 'summary', keywords: [
        { icon: '📅', label: '월간 리뷰', description: '한 달의 시간 사용 돌아보기' },
        { icon: '📈', label: '성장 측정', description: '지난달 대비 변화 확인' },
        { icon: '🎯', label: '목표 점검', description: '목표 달성률 체크' },
        { icon: '🔧', label: '시스템 조정', description: '안 맞는 부분 수정' },
      ]},
      { type: 'example', bad: { label: '무계획 반복', story: '매달 같은 실수 반복.\n"다음 달은 다르겠지" → 변한 건 없다.' }, good: { label: '월간 리뷰어', story: '매달 말일 30분 리뷰.\n"아침 공부가 효과 좋았다" 발견 → 다음 달 강화.' }},
      { type: 'ox', statement: '월간 리뷰는 시간 낭비다.', answer: false, feedback: '30분 리뷰가 다음 달 30시간을 아껴줘!\n가장 ROI 높은 활동이야.' },
      { type: 'multipleChoice', question: '월간 리뷰에서 가장 중요한 질문은?', options: ['얼마나 바빴는가', '뭐가 효과 있었고 뭘 바꿀 것인가', '몇 시간 공부했는가', '남들은 뭘 했는가'], correctIndex: 1, explanation: '효과 있는 것은 유지, 없는 것은 제거!\n이 질문이 핵심이야.' },
      { type: 'feedback', summary: '월간 리뷰 = 다음 달의 성공을 설계', message: '돌아보는 사람만이 앞으로 나아간다!' },
      { type: 'mission', mission: '이번 달을 돌아보며 "잘한 것 3가지 + 바꿀 것 1가지" 적기', encouragement: '한 달에 30분, 인생이 달라지는 습관!' },
    ],
  },

  'time-platinum-8': {
    id: 'time-platinum-8', chapterKey: 'time', tierKey: 'platinum', stageNumber: 8,
    title: '선제적 시간 확보',
    cards: [
      { type: 'concept', title: '먼저 넣어야 들어간다', description: '바쁜 일정에 중요한 일을 끼워넣지 마.\n중요한 일을 "먼저" 캘린더에 넣어.\n\n이걸 "빅 록(Big Rock) 원칙"이라 해.\n큰 돌을 먼저 넣어야 다 들어가!' },
      { type: 'summary', keywords: [
        { icon: '🪨', label: '빅 록', description: '가장 중요한 일을 먼저 배치' },
        { icon: '📅', label: '선제 예약', description: '중요 일정을 먼저 캘린더에' },
        { icon: '🛡️', label: '시간 보호', description: '예약한 시간은 양보 안 함' },
        { icon: '⏳', label: '자투리', description: '남은 시간에 소소한 일 배치' },
      ]},
      { type: 'example', bad: { label: '끼워넣기', story: '매일 바쁘다가 "시간 나면 공부"\n→ 시간은 결코 나지 않았다.' }, good: { label: '선제 확보', story: '매주 일요일 "화목 오전 = 수학 공부"\n미리 확보. 다른 일정이 생겨도 거절.' }},
      { type: 'ox', statement: '중요한 일은 빈 시간이 생기면 하면 된다.', answer: false, feedback: '빈 시간은 안 생겨!\n중요한 일은 먼저 예약해야 해.' },
      { type: 'multipleChoice', question: '빅 록 원칙의 핵심은?', options: ['모든 일을 다 하기', '중요한 일을 먼저 시간 확보', '급한 일 먼저', '빈 시간에 채워넣기'], correctIndex: 1, explanation: '큰 돌(중요한 일)을 먼저 넣어야 다 들어가!' },
      { type: 'feedback', summary: '중요한 일 = 먼저 시간 확보', message: '기다리지 마, 먼저 잡아!' },
      { type: 'mission', mission: '다음 주 "가장 중요한 활동 2가지"를 캘린더에 먼저 넣기', encouragement: '선제 확보한 시간이 진짜 네 시간!' },
    ],
  },

  'time-platinum-9': {
    id: 'time-platinum-9', chapterKey: 'time', tierKey: 'platinum', stageNumber: 9,
    title: '거절의 기술',
    cards: [
      { type: 'concept', title: '노(No)는 시간관리 최강 기술', description: '"응" 하나가 내 시간 1시간을 가져가.\n\n모든 요청에 "Yes"하면\n정작 내 목표에 쓸 시간이 없어.\n예의 바른 거절은 자기 보호야!' },
      { type: 'summary', keywords: [
        { icon: '🚫', label: '거절', description: '모든 요청에 Yes 하지 않기' },
        { icon: '⚖️', label: '기준', description: '내 목표에 도움 되는가?' },
        { icon: '🤝', label: '예의 바른 No', description: '"지금은 어렵지만..."' },
        { icon: '🎯', label: '집중', description: '거절해야 중요한 것에 집중' },
      ]},
      { type: 'example', bad: { label: '예스맨', story: '친구 부탁, 동아리, 알바 전부 수락.\n정작 시험 공부 시간은 0시간.' }, good: { label: '전략적 거절', story: '"이번 주는 시험 기간이라 어려워!"\n거절한 덕에 공부 시간 확보.' }},
      { type: 'ox', statement: '모든 부탁을 들어줘야 좋은 사람이다.', answer: false, feedback: '내 시간을 지키는 것도 책임이야.\n거절 = 내 목표를 위한 선택!' },
      { type: 'multipleChoice', question: '거절 시 가장 좋은 방법은?', options: ['무시하기', '이유 설명 + 대안 제시', '화내기', '거짓말로 피하기'], correctIndex: 1, explanation: '"지금은 어렵지만 다음에!" 같이\n이유 + 대안이 가장 효과적.' },
      { type: 'feedback', summary: '거절 = 내 시간을 지키는 기술', message: 'No라고 말할 줄 아는 사람이 성공한다!' },
      { type: 'mission', mission: '이번 주 불필요한 요청 1개에 정중히 거절 연습하기', encouragement: '거절은 이기적이 아니라 전략적인 거야!' },
    ],
  },

  'time-platinum-10': {
    id: 'time-platinum-10', chapterKey: 'time', tierKey: 'platinum', stageNumber: 10,
    title: '몰입 트리거 시스템',
    cards: [
      { type: 'concept', title: '몰입을 의도적으로 유발하기', description: '몰입(Flow)은 운이 아니야.\n특정 조건을 만들면 의도적으로\n몰입 상태에 들어갈 수 있어.\n\n이걸 "몰입 트리거"라고 해.' },
      { type: 'summary', keywords: [
        { icon: '🎵', label: '음악 트리거', description: '특정 음악 = 집중 모드 시작' },
        { icon: '☕', label: '의식 트리거', description: '커피 한 잔 = 공부 시작 신호' },
        { icon: '📍', label: '장소 트리거', description: '특정 장소 = 집중 장소' },
        { icon: '⏱️', label: '시간 트리거', description: '같은 시간 = 자동 집중' },
      ]},
      { type: 'example', bad: { label: '의지력 의존', story: '"집중해야지..." 매번 의지로 시작.\n30분 걸려야 겨우 몰입. 지침.' }, good: { label: '트리거 시스템', story: '이어폰 끼고 + 로파이 음악 + 타이머 시작.\n3분 만에 자동으로 집중 모드 진입.' }},
      { type: 'ox', statement: '몰입은 타고나는 능력이다.', answer: false, feedback: '몰입은 만드는 거야!\n트리거를 반복하면 몸이 기억해.' },
      { type: 'multipleChoice', question: '몰입 트리거로 가장 효과적인 것은?', options: ['매번 새로운 환경', '특정 음악+장소+시간 반복', '의지력으로 참기', '카페인 대량 섭취'], correctIndex: 1, explanation: '반복되는 신호가 뇌에 "집중 모드" 스위치를 만들어!' },
      { type: 'apply', question: '나만의 몰입 트리거를 3가지 정해보세요.', placeholder: '예: 이어폰 끼기, 책상 정리, 타이머 시작...' },
      { type: 'feedback', summary: '몰입 트리거 = 의도적 집중 시스템', message: '플래티넘 완료! 이제 프로 시간관리자!' },
      { type: 'mission', mission: '나만의 몰입 트리거 3가지를 정하고 내일 실험하기', encouragement: '트리거를 반복하면 집중이 습관이 돼!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (마스터 시간관리) 1~10
  // ═══════════════════════════════════════

  'time-diamond-1': {
    id: 'time-diamond-1', chapterKey: 'time', tierKey: 'diamond', stageNumber: 1,
    title: '시간 철학 - 크로노스와 카이로스',
    cards: [
      { type: 'concept', title: '두 종류의 시간', description: '그리스인은 시간을 두 가지로 봤어.\n\n크로노스(Chronos) = 시계 시간\n카이로스(Kairos) = 의미 있는 순간\n\n진짜 시간관리는 카이로스를\n늘리는 거야.' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '크로노스', description: '물리적 시간 (1시간, 2시간)' },
        { icon: '✨', label: '카이로스', description: '의미 있는 충만한 순간' },
        { icon: '🎯', label: '질문', description: '"이 시간이 의미 있었나?"' },
        { icon: '💫', label: '목표', description: '카이로스적 시간을 늘리기' },
      ]},
      { type: 'example', bad: { label: '크로노스만', story: '하루 14시간 공부. 빽빽한 스케줄.\n그런데 왜 공허하지? 의미가 없다.' }, good: { label: '카이로스 추구', story: '6시간만 공부했지만 "이해됐다!" 느낀 순간,\n친구와 깊은 대화. 하루가 충만하다.' }},
      { type: 'ox', statement: '시간을 잘 쓰는 것은 매 초를 빽빽하게 채우는 것이다.', answer: false, feedback: '빽빽하게 채우는 건 크로노스적 접근.\n의미 있는 순간(카이로스)을 만드는 게 핵심!' },
      { type: 'multipleChoice', question: '카이로스적 시간관리란?', options: ['매 분 계획하기', '의미 있는 순간을 의도적으로 만들기', '시간을 최대한 아끼기', '바쁘게 사는 것'], correctIndex: 1, explanation: '양이 아닌 의미! 카이로스를 늘리는 게 마스터.' },
      { type: 'feedback', summary: '시간의 양보다 의미 = 카이로스', message: '진짜 시간 부자는 의미 있는 순간이 많은 사람!' },
      { type: 'mission', mission: '오늘 하루 중 "가장 의미 있었던 순간" 1가지 적기', encouragement: '카이로스를 의식하면 삶의 질이 바뀐다!' },
    ],
  },

  'time-diamond-2': {
    id: 'time-diamond-2', chapterKey: 'time', tierKey: 'diamond', stageNumber: 2,
    title: '역방향 스케줄링',
    cards: [
      { type: 'concept', title: '끝에서부터 계획하기', description: '일반: 오늘부터 → 시험일까지\n역방향: 시험일부터 → 오늘까지\n\n끝에서 역으로 계획하면\n"언제 뭘 끝내야 하는지" 선명해져.' },
      { type: 'summary', keywords: [
        { icon: '🏁', label: '최종 기한', description: '목표 달성일 먼저 정하기' },
        { icon: '⬅️', label: '역산', description: '마감에서 오늘로 거꾸로' },
        { icon: '📌', label: '마일스톤', description: '중간 체크포인트 설정' },
        { icon: '📐', label: '현실적', description: '실제 필요 시간 계산' },
      ]},
      { type: 'example', bad: { label: '앞에서부터', story: '"시험까지 3주니까 여유 있지"\n→ 마지막 3일에 벼락치기.' }, good: { label: '역방향', story: '"시험 D-1은 복습만. D-7은 모의고사.\nD-14까지 전 범위 1회독." 촘촘한 계획 완성.' }},
      { type: 'ox', statement: '계획은 항상 오늘부터 시작해야 한다.', answer: false, feedback: '끝에서부터 역산하면\n각 단계가 명확해져서 더 효과적!' },
      { type: 'multipleChoice', question: '역방향 스케줄링의 첫 단계는?', options: ['오늘 할 일 정하기', '최종 기한을 정하고 거꾸로 계획', '남들 계획 참고하기', '일단 시작하기'], correctIndex: 1, explanation: '끝을 정하면 과정이 보여! 역방향이 핵심.' },
      { type: 'apply', question: '다가오는 중요 일정을 역방향으로 계획해보세요.', placeholder: 'D-day: / D-7: / D-14: ...' },
      { type: 'feedback', summary: '역방향 계획 = 끝에서부터 촘촘하게', message: '끝을 알면 길이 보인다!' },
      { type: 'mission', mission: '다음 시험/과제를 역방향으로 D-day 계획 세우기', encouragement: '프로는 항상 끝에서부터 계획한다!' },
    ],
  },

  'time-diamond-3': {
    id: 'time-diamond-3', chapterKey: 'time', tierKey: 'diamond', stageNumber: 3,
    title: '시간 자산 포트폴리오',
    cards: [
      { type: 'concept', title: '시간도 분산 투자하라', description: '돈을 한 곳에만 투자하면 위험하듯\n시간도 분산 투자해야 해.\n\n공부, 관계, 건강, 취미, 성장.\n"시간 포트폴리오"를 관리하자!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '학습', description: '성적/지식 (40%)' },
        { icon: '🤝', label: '관계', description: '친구/가족 (20%)' },
        { icon: '💪', label: '건강', description: '운동/수면 (20%)' },
        { icon: '🎨', label: '성장/취미', description: '독서/취미 (20%)' },
      ]},
      { type: 'example', bad: { label: '올인 투자', story: '공부에만 100% 시간 투입.\n성적은 올랐지만 친구 없고 건강 나빠짐.' }, good: { label: '포트폴리오', story: '공부 40% + 운동 20% + 친구 20% + 독서 20%.\n균형 잡힌 생활, 지속가능한 성장.' }},
      { type: 'ox', statement: '시간을 한 가지에 올인하는 게 가장 효율적이다.', answer: false, feedback: '단기적으론 효율적이지만 장기적으로 번아웃!\n균형 잡힌 분산이 지속 가능해.' },
      { type: 'multipleChoice', question: '시간 포트폴리오의 핵심은?', options: ['공부에만 집중', '여러 영역에 균형 있게 분산', '쉬는 시간 최소화', '남들과 같은 비율'], correctIndex: 1, explanation: '균형 = 지속가능한 성장의 비밀!' },
      { type: 'apply', question: '나의 이상적인 시간 포트폴리오 비율을 정해보세요.', placeholder: '학습 __% / 관계 __% / 건강 __% / 취미 __%' },
      { type: 'feedback', summary: '시간 포트폴리오 = 균형 잡힌 시간 분산', message: '한쪽에 치우치지 않는 게 마스터의 비결!' },
      { type: 'mission', mission: '이번 주 시간 포트폴리오 비율을 정하고 지켜보기', encouragement: '균형이 곧 지속가능한 성장이야!' },
    ],
  },

  'time-diamond-4': {
    id: 'time-diamond-4', chapterKey: 'time', tierKey: 'diamond', stageNumber: 4,
    title: '시간 복리 효과',
    cards: [
      { type: 'concept', title: '매일 1%가 만드는 기적', description: '매일 1% 성장하면\n1년 뒤 37배가 돼. 복리 효과야.\n\n반대로 매일 1% 게으르면\n1년 뒤 거의 0에 가까워져.' },
      { type: 'summary', keywords: [
        { icon: '📈', label: '복리', description: '작은 것이 쌓여 거대해진다' },
        { icon: '1️⃣', label: '1% 룰', description: '매일 조금씩만 성장' },
        { icon: '🗓️', label: '365일', description: '1.01^365 = 37.8배' },
        { icon: '⚠️', label: '역복리', description: '0.99^365 = 0.03배' },
      ]},
      { type: 'example', bad: { label: '한 방에', story: '"나중에 한꺼번에 하지"\n시험 전날 벼락치기 → 결과는 늘 아쉬움.' }, good: { label: '복리 성장', story: '매일 영어 단어 10개 × 300일 = 3,000개.\n큰 노력 없이 어느새 어휘왕.' }},
      { type: 'ox', statement: '매일 30분 공부는 의미가 없다.', answer: false, feedback: '30분 × 365일 = 182시간!\n복리 효과로 엄청난 차이를 만들어.' },
      { type: 'multipleChoice', question: '시간 복리의 핵심 조건은?', options: ['하루에 많이 하기', '매일 작더라도 꾸준히 하기', '가끔 한 번에 몰아서', '재능이 있어야'], correctIndex: 1, explanation: '양보다 꾸준함! 매일 작은 실행이 복리를 만들어.' },
      { type: 'feedback', summary: '매일 1% = 1년 뒤 37배', message: '오늘의 작은 실행이 내일의 나를 만든다!' },
      { type: 'mission', mission: '"매일 15분 투자할 성장 활동" 1가지 정하기', encouragement: '15분이 1년 뒤 기적을 만든다!' },
    ],
  },

  'time-diamond-5': {
    id: 'time-diamond-5', chapterKey: 'time', tierKey: 'diamond', stageNumber: 5,
    title: '에너지 맵핑',
    cards: [
      { type: 'concept', title: '시간이 아닌 에너지를 관리하라', description: '같은 1시간이라도\n에너지가 높을 때 vs 낮을 때\n생산성이 5배 차이나.\n\n나의 에너지 패턴을 알면\n시간 배치가 완전히 달라져.' },
      { type: 'summary', keywords: [
        { icon: '🔋', label: '에너지 곡선', description: '하루 중 에너지 높낮이 파악' },
        { icon: '🌅', label: '골든 타임', description: '에너지 최고 시간대' },
        { icon: '📊', label: '매칭', description: '어려운 일 ↔ 높은 에너지' },
        { icon: '🌙', label: '로우 타임', description: '쉬운 일 ↔ 낮은 에너지' },
      ]},
      { type: 'example', bad: { label: '시간만 관리', story: '오후 2시에 수학 공부 배치.\n매일 졸면서 풀다가 포기.' }, good: { label: '에너지 맵핑', story: '오전 10시가 골든 타임 발견!\n수학을 10시로 옮기니 집중력 5배.' }},
      { type: 'ox', statement: '어떤 시간이든 의지만 있으면 같은 효율이다.', answer: false, feedback: '뇌 에너지는 시간대마다 달라!\n골든 타임에 어려운 일을 해야 효율적.' },
      { type: 'multipleChoice', question: '에너지 맵핑 후 가장 먼저 해야 할 것은?', options: ['에너지 낮을 때 더 노력하기', '골든 타임에 가장 어려운 일 배치', '에너지와 상관없이 계획대로', '항상 같은 시간에 공부'], correctIndex: 1, explanation: '골든 타임 × 어려운 일 = 최고 효율!' },
      { type: 'apply', question: '나의 골든 타임(에너지 최고 시간대)은 언제인가요?', placeholder: '예: 오전 9~11시, 저녁 7~9시...' },
      { type: 'feedback', summary: '에너지 맵핑 = 시간의 질을 극대화', message: '시간이 아닌 에너지를 관리하는 게 마스터!' },
      { type: 'mission', mission: '3일간 시간대별 에너지 레벨(1~5) 기록하기', encouragement: '내 에너지 패턴을 알면 게임 체인저!' },
    ],
  },

  'time-diamond-6': {
    id: 'time-diamond-6', chapterKey: 'time', tierKey: 'diamond', stageNumber: 6,
    title: '시간 위임과 자동화',
    cards: [
      { type: 'concept', title: '모든 걸 직접 할 필요 없다', description: '마스터는 모든 걸 혼자 안 해.\n\n위임할 수 있는 건 위임하고\n자동화할 수 있는 건 자동화해서\n핵심에만 시간을 쓴다.' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '위임', description: '남이 더 잘하는 일은 맡기기' },
        { icon: '🤖', label: '자동화', description: '반복 작업은 시스템으로' },
        { icon: '🎯', label: '핵심 집중', description: '나만 할 수 있는 일에 집중' },
        { icon: '⏰', label: '시간 창출', description: '위임/자동화로 시간 확보' },
      ]},
      { type: 'example', bad: { label: '혼자 다 하기', story: '조별 과제 전부 혼자.\n잘했지만 자기 공부 시간 0.' }, good: { label: '전략적 위임', story: '역할 분담: 자료조사는 친구, 발표자료는 나.\n각자 잘하는 걸 맡으니 빠르고 좋았다.' }},
      { type: 'ox', statement: '책임감 있는 사람은 모든 걸 혼자 해야 한다.', answer: false, feedback: '진짜 책임감은 최고 결과를 만드는 것!\n위임이 더 좋은 결과를 만들 때도 있어.' },
      { type: 'multipleChoice', question: '위임 시 가장 중요한 기준은?', options: ['귀찮은 일 떠넘기기', '상대가 더 잘하거나 성장할 수 있는 일', '모든 일을 공평하게', '내가 싫은 일만'], correctIndex: 1, explanation: '위임 = 적재적소! 각자 잘하는 걸 맡기는 게 핵심.' },
      { type: 'feedback', summary: '위임/자동화 → 핵심에만 집중', message: '혼자 다 하지 마. 함께하면 더 멀리 간다!' },
      { type: 'mission', mission: '이번 주 할 일 중 "남에게 부탁하거나 자동화할 것" 1가지 찾기', encouragement: '나만 할 수 있는 일에 집중하자!' },
    ],
  },

  'time-diamond-7': {
    id: 'time-diamond-7', chapterKey: 'time', tierKey: 'diamond', stageNumber: 7,
    title: '안티프래질 시간관리',
    cards: [
      { type: 'concept', title: '변수에 강한 시간관리', description: '완벽한 계획은 없어.\n예상치 못한 일은 반드시 생겨.\n\n안티프래질 = 혼란 속에서\n오히려 더 강해지는 시스템.\n변수를 환영하는 시간관리!' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '여유분', description: '계획의 20%는 빈칸으로' },
        { icon: '🔄', label: '유연성', description: '변할 수 있는 유연한 구조' },
        { icon: '📋', label: 'Plan B', description: '대안 계획 항상 준비' },
        { icon: '💪', label: '적응력', description: '변수를 성장 기회로' },
      ]},
      { type: 'example', bad: { label: '완벽 계획', story: '분 단위 계획. 친구가 갑자기 전화.\n계획 틀어지자 전체 포기.' }, good: { label: '안티프래질', story: '시간블록 사이 30분 버퍼.\n갑작스런 일이 생겨도 버퍼로 흡수. OK.' }},
      { type: 'ox', statement: '좋은 계획은 빈틈이 없어야 한다.', answer: false, feedback: '빈틈 없는 계획은 깨지기 쉬워!\n20% 여유가 오히려 강한 계획이야.' },
      { type: 'multipleChoice', question: '안티프래질 시간관리의 핵심은?', options: ['변수를 완전히 없애기', '여유분을 두고 유연하게 대응', '계획을 안 세우기', '변수가 생기면 포기하기'], correctIndex: 1, explanation: '여유분 + 유연성 = 변수에도 무너지지 않는 시스템!' },
      { type: 'feedback', summary: '20% 여유 = 무너지지 않는 시스템', message: '변수를 두려워하지 마. 여유가 너를 지켜줘!' },
      { type: 'mission', mission: '내일 계획에 "빈 시간 30분"을 의도적으로 넣기', encouragement: '여유 있는 계획이 진짜 강한 계획이야!' },
    ],
  },

  'time-diamond-8': {
    id: 'time-diamond-8', chapterKey: 'time', tierKey: 'diamond', stageNumber: 8,
    title: '미래의 나에게 시간 선물',
    cards: [
      { type: 'concept', title: '현재의 행동은 미래의 선물', description: '지금 귀찮은 일을 해두면\n미래의 내가 감사해.\n\n"미래의 나에게 시간을 선물한다"\n이 마인드가 시간관리 최고 원칙!' },
      { type: 'summary', keywords: [
        { icon: '🎁', label: '미래 선물', description: '지금 하면 미래가 편해진다' },
        { icon: '⏳', label: '선행 투자', description: '미리 해두는 습관' },
        { icon: '🧠', label: '미래 자아', description: '미래의 나를 진짜 사람으로 상상' },
        { icon: '🙏', label: '과거 감사', description: '과거의 내가 해둔 것에 감사' },
      ]},
      { type: 'example', bad: { label: '미루기 대장', story: '"내일의 내가 하겠지"\n→ 내일의 나도 미루기 → 악순환.' }, good: { label: '미래 선물러', story: '"미래의 내가 고마워할 거야!"\n오늘 밤 내일 준비물 챙겨둠 → 아침이 여유로움.' }},
      { type: 'ox', statement: '미래는 어차피 불확실하니 현재만 즐기면 된다.', answer: false, feedback: '현재를 즐기면서도 미래를 챙길 수 있어!\n작은 선행이 미래를 편하게 만들어.' },
      { type: 'multipleChoice', question: '"미래의 나에게 선물하기"의 예시로 적절한 것은?', options: ['과제를 시험 전날로 미루기', '전날 밤 내일 준비물 챙겨두기', '오늘만 재밌게 보내기', '계획 안 세우고 자유롭게'], correctIndex: 1, explanation: '지금 5분 투자가 내일의 30분을 아껴줘!' },
      { type: 'feedback', summary: '지금의 5분 = 미래의 30분', message: '미래의 내가 고마워할 행동을 하자!' },
      { type: 'mission', mission: '"미래의 나에게 줄 선물" 1가지를 오늘 실행하기', encouragement: '지금의 수고가 미래의 여유가 돼!' },
    ],
  },

  'time-diamond-9': {
    id: 'time-diamond-9', chapterKey: 'time', tierKey: 'diamond', stageNumber: 9,
    title: '시간관리 코칭 능력',
    cards: [
      { type: 'concept', title: '가르치면 2배 배운다', description: '진짜 마스터는 남을 도와.\n\n네가 배운 시간관리 기술을\n친구에게 알려주면\n네 실력도 2배 올라가.\n가르치는 게 최고의 학습이야.' },
      { type: 'summary', keywords: [
        { icon: '🧑‍🏫', label: '가르치기', description: '설명하면 이해가 깊어짐' },
        { icon: '🤝', label: '함께 성장', description: '친구와 같이 시간관리' },
        { icon: '💡', label: '재발견', description: '가르치다 새로운 인사이트' },
        { icon: '🌱', label: '리더십', description: '도움을 주는 영향력' },
      ]},
      { type: 'example', bad: { label: '혼자만', story: '좋은 시간관리 방법을 알아도 혼자만 씀.\n동기부여가 점점 떨어짐.' }, good: { label: '코칭 리더', story: '친구에게 타임블로킹을 설명해줌.\n설명하다 보니 나도 더 잘 이해하게 됨!' }},
      { type: 'ox', statement: '완벽하게 알아야만 남을 가르칠 수 있다.', answer: false, feedback: '70%만 알아도 가르칠 수 있어!\n가르치면서 나머지 30%도 채워져.' },
      { type: 'multipleChoice', question: '시간관리를 남에게 가르치면 좋은 이유는?', options: ['우월감을 느끼려고', '설명하면서 내 이해도도 깊어지니까', '남을 통제하려고', '과제로 내주려고'], correctIndex: 1, explanation: '가르치기 = 최고의 학습법! 설명하면 2배 배워.' },
      { type: 'apply', question: '친구에게 가장 알려주고 싶은 시간관리 기술은?', placeholder: '예: 타임블로킹, 2분 룰, 아침 루틴...' },
      { type: 'feedback', summary: '가르치기 = 최고의 학습 + 리더십', message: '네 지식을 나누면 함께 성장해!' },
      { type: 'mission', mission: '친구 1명에게 배운 시간관리 기술 하나 알려주기', encouragement: '나누면 2배가 된다!' },
    ],
  },

  'time-diamond-10': {
    id: 'time-diamond-10', chapterKey: 'time', tierKey: 'diamond', stageNumber: 10,
    title: '시간관리 마스터 선언',
    cards: [
      { type: 'concept', title: '50단계를 완주한 너에게', description: '브론즈부터 다이아까지\n50개의 레슨을 모두 마쳤어.\n\n시간의 기초부터 철학까지.\n이제 너는 시간관리 마스터야.\n배운 걸 삶에 녹여내자!' },
      { type: 'summary', keywords: [
        { icon: '🥉', label: '기초', description: '시간 기록, 우선순위, To-Do' },
        { icon: '🥈', label: '전략', description: '아이젠하워, 타임블로킹, SMART' },
        { icon: '🥇', label: '실전', description: '딥 워크, 습관 스태킹, 80/20' },
        { icon: '💎👑', label: '마스터', description: 'ROI, 에너지, 카이로스, 복리' },
      ]},
      { type: 'example', bad: { label: '배우기만', story: '50개 레슨 다 들었지만\n실천은 하나도 안 함. 달라진 건 없다.' }, good: { label: '실천 마스터', story: '매일 1가지씩 적용. 6개월 뒤\n시간관리가 자연스러운 습관이 됐다!' }},
      { type: 'ox', statement: '시간관리를 배우면 끝이다.', answer: false, feedback: '배움은 시작일 뿐! 실천하고 조정하고\n반복해야 진짜 내 것이 돼.' },
      { type: 'multipleChoice', question: '시간관리 마스터의 핵심은?', options: ['모든 기술을 한 번에 쓰기', '나에게 맞는 것을 실천하며 발전시키기', '남들과 같은 방법 쓰기', '더 많은 이론 공부'], correctIndex: 1, explanation: '나만의 시스템을 실천하고 진화시키는 것!\n그게 마스터야.' },
      { type: 'apply', question: '시간관리 마스터로서 나의 각오를 한 문장으로!', placeholder: '예: 나는 매일 의미 있는 시간을 만드는 사람이다.' },
      { type: 'feedback', summary: '배움 → 실천 → 습관 → 마스터', message: '축하해! 다이아 완료! 진짜 시간관리 마스터!' },
      { type: 'mission', mission: '"나의 시간관리 철학" 한 문장을 적고 책상에 붙이기', encouragement: '50단계를 완주한 너는 이미 마스터야!' },
    ],
  },

}
