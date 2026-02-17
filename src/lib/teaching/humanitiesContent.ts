// 인문 영역 전체 학습 콘텐츠 (브론즈~다이아)
import type { Stage } from './lessonData'

export const HUMANITIES_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (기초 학습력) 1~10
  // ═══════════════════════════════════════

  'humanities-bronze-1': {
    id: 'humanities-bronze-1', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 1,
    title: '이해하며 생각하는 힘',
    cards: [
      { type: 'concept', title: '인지 역량이란?', description: '정보를 이해하고 연결하며\n스스로 생각하는 힘이야.\n\n단순 암기가 아니라\n"왜?"라고 질문하고 깊이 이해하는 능력!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '사고력', description: '깊이 생각하는 힘' },
        { icon: '🔗', label: '연결력', description: '정보를 연결하는 힘' },
        { icon: '❓', label: '질문력', description: '좋은 질문을 만드는 힘' },
        { icon: '💡', label: '이해력', description: '핵심을 파악하는 힘' },
      ]},
      { type: 'example', bad: { label: '민수', story: '교과서를 그냥 외웠다.\n시험 끝나자 다 잊었다.' }, good: { label: '지은', story: '"왜 이렇게 될까?" 질문하며 읽었다.\n자기 말로 설명할 수 있게 됐다.' }},
      { type: 'ox', statement: '인지 역량은 타고나서 바꿀 수 없다.', answer: false, feedback: '훈련으로 키울 수 있어!\n생각하는 습관이 곧 인지 역량이야.' },
      { type: 'multipleChoice', question: '인지 역량이 높은 사람의 특징은?', options: ['무조건 많이 외운다', '남의 생각을 따른다', '스스로 질문하고 연결한다', '정답만 빨리 찾는다'], correctIndex: 2, explanation: '이해하고 연결하고 질문하는 과정이야!' },
      { type: 'feedback', summary: '인지 역량 = 이해 + 연결 + 질문', message: '오늘 한 걸음 더 성장했어!' },
      { type: 'mission', mission: '수업이나 책을 읽을 때 "왜?" 한 번 질문해보기', encouragement: '작은 질문이 큰 변화의 시작!' },
    ],
  },

  'humanities-bronze-2': {
    id: 'humanities-bronze-2', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 2,
    title: '집중력의 비밀 - 포모도로',
    cards: [
      { type: 'concept', title: '포모도로 기법이란?', description: '25분 집중 + 5분 휴식을 반복하는 방법이야.\n\n뇌는 오래 집중하기 어려워.\n짧게 끊어서 집중하면 효율이 높아져!' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '25분 집중', description: '한 가지에 몰두' },
        { icon: '☕', label: '5분 휴식', description: '뇌를 쉬게 하는 시간' },
        { icon: '🔄', label: '4세트 반복', description: '4번 후 긴 휴식' },
        { icon: '🎯', label: '단일 과제', description: '한 번에 하나만!' },
      ]},
      { type: 'example', bad: { label: '준호', story: '3시간 쉬지 않고 공부했다.\n1시간 후 집중이 흐려졌다.' }, good: { label: '수아', story: '25분 집중 + 5분 쉬기 반복.\n실제 집중 시간이 더 많았다.' }},
      { type: 'ox', statement: '집중력은 오래 유지할수록 좋다.', answer: false, feedback: '뇌는 25~30분이 집중 한계야.\n짧게 끊어 반복하는 게 효과적!' },
      { type: 'multipleChoice', question: '포모도로의 핵심 원리는?', options: ['최대한 오래 집중', '짧은 집중 + 규칙적 휴식', '쉬는 시간 없이 공부', '하루 한 과목만'], correctIndex: 1, explanation: '25분 집중 + 5분 휴식 반복이 핵심!' },
      { type: 'feedback', summary: '포모도로 = 25분 집중 + 5분 휴식', message: '오늘부터 타이머를 친구 삼아보자!' },
      { type: 'mission', mission: '25분 타이머 맞추고 한 과목에 집중해보기', encouragement: '타이머 하나가 습관을 바꿔줘!' },
    ],
  },

  'humanities-bronze-3': {
    id: 'humanities-bronze-3', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 3,
    title: '기억의 원리 - 망각곡선',
    cards: [
      { type: 'concept', title: '에빙하우스 망각곡선', description: '배운 것의 70%를 24시간 내에 잊어.\n1주일 후엔 80% 이상 사라지지.\n\n하지만 적절한 타이밍에 복습하면\n장기기억으로 바뀌어!' },
      { type: 'summary', keywords: [
        { icon: '📉', label: '망각곡선', description: '시간이 지나면 급격히 잊음' },
        { icon: '🔄', label: '복습 타이밍', description: '잊기 직전에 복습' },
        { icon: '🧠', label: '장기기억', description: '반복으로 영구 저장' },
        { icon: '📅', label: '1-3-7-30', description: '최적 복습 간격' },
      ]},
      { type: 'example', bad: { label: '현우', story: '시험 전날 밤새 벼락치기.\n일주일 후 아무것도 기억 못했다.' }, good: { label: '하은', story: '당일 10분, 3일 후 5분, 7일 후 5분 복습.\n시험 전날은 가볍게 훑기만 해도 OK.' }},
      { type: 'ox', statement: '한 번 확실히 외우면 잘 잊히지 않는다.', answer: false, feedback: '복습 없으면 빠르게 잊혀져.\n복습 타이밍이 핵심이야!' },
      { type: 'multipleChoice', question: '가장 효과적인 첫 복습 시점은?', options: ['일주일 후', '한 달 후', '24시간 이내', '시험 전날'], correctIndex: 2, explanation: '망각이 가장 빠른 24시간 이내가 핵심!' },
      { type: 'feedback', summary: '복습 타이밍이 기억의 열쇠', message: '조금씩 자주! 이것만 기억하자.' },
      { type: 'mission', mission: '오늘 배운 내용을 자기 전 5분간 떠올려보기', encouragement: '5분 복습이 5시간 벼락치기보다 강해!' },
    ],
  },

  'humanities-bronze-4': {
    id: 'humanities-bronze-4', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 4,
    title: '66일의 마법 - 습관 형성',
    cards: [
      { type: 'concept', title: '66일 습관의 법칙', description: '새 습관이 자동으로 되려면\n평균 66일이 걸려.\n\n핵심은 "작게 시작해서\n66일 꾸준히 반복"하는 거야.' },
      { type: 'summary', keywords: [
        { icon: '📆', label: '66일', description: '습관 자동화 기간' },
        { icon: '🌱', label: '작게 시작', description: '부담 없이 시작' },
        { icon: '📈', label: '점진적 확장', description: '자리잡으면 늘리기' },
        { icon: '🔁', label: '매일 반복', description: '빠짐없는 꾸준함' },
      ]},
      { type: 'example', bad: { label: '태민', story: '"매일 2시간 공부!" 선언.\n3일 만에 지쳐서 포기했다.' }, good: { label: '서연', story: '"매일 영단어 5개만" 시작.\n66일 후 자연스럽게 15개로 늘었다.' }},
      { type: 'ox', statement: '습관은 21일이면 완성된다.', answer: false, feedback: '21일은 속설이야. 연구에 따르면 평균 66일!\n조급하지 말고 꾸준히.' },
      { type: 'multipleChoice', question: '66일 공부법의 핵심은?', options: ['매일 최대한 많이', '작게 시작, 매일 반복', '66일간 10시간씩', '시험 기간에만 집중'], correctIndex: 1, explanation: '"작게 시작, 매일 반복"이 핵심!' },
      { type: 'feedback', summary: '작게 시작 + 66일 반복 = 자동 습관', message: '아주 작게 시작하면 누구나 할 수 있어!' },
      { type: 'mission', mission: '66일간 매일 할 작은 습관 하나 정하기', encouragement: '66일 후의 너는 완전 다른 사람!' },
    ],
  },

  'humanities-bronze-5': {
    id: 'humanities-bronze-5', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 5,
    title: '메모의 기술 - 코넬 노트법',
    cards: [
      { type: 'concept', title: '코넬 노트법이란?', description: '노트를 3칸으로 나눠:\n📝 오른쪽: 수업 내용 필기\n❓ 왼쪽: 핵심 키워드/질문\n📋 아래: 전체 요약' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '필기 영역', description: '핵심 내용 적기' },
        { icon: '❓', label: '키워드 영역', description: '핵심 단어와 질문' },
        { icon: '📋', label: '요약 영역', description: '2~3줄로 요약' },
        { icon: '🔄', label: '복습 활용', description: '키워드로 떠올리기' },
      ]},
      { type: 'example', bad: { label: '민재', story: '선생님 말씀 전부 받아적었다.\n뭐가 중요한지 모르겠다.' }, good: { label: '지유', story: '핵심만 적고 키워드를 뽑았다.\n키워드만 보고 복습하니 효과적!' }},
      { type: 'ox', statement: '노트 필기는 많이 쓸수록 좋다.', answer: false, feedback: '핵심을 뽑아 정리하는 게 중요해!\n"구조화"가 핵심이야.' },
      { type: 'multipleChoice', question: '코넬 노트의 3영역이 아닌 것은?', options: ['키워드 영역', '필기 영역', '감상문 영역', '요약 영역'], correctIndex: 2, explanation: '필기/키워드/요약 3칸이야!' },
      { type: 'feedback', summary: '코넬 노트 = 필기 + 키워드 + 요약', message: '정리된 노트가 최고의 복습 도구!' },
      { type: 'mission', mission: '오늘 수업 하나를 코넬 노트로 정리하기', encouragement: '정리하는 순간 이미 복습한 거야!' },
    ],
  },

  'humanities-bronze-6': {
    id: 'humanities-bronze-6', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 6,
    title: '질문의 힘',
    cards: [
      { type: 'concept', title: '좋은 질문이 좋은 학습을 만든다', description: '좋은 질문을 하면 뇌가 활성화되고\n정보를 더 깊이 처리해.\n\n"왜?", "어떻게?", "만약에?"\n이 세 질문이 학습의 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '왜?', description: '원인을 파고드는 질문' },
        { icon: '🔧', label: '어떻게?', description: '방법을 탐구하는 질문' },
        { icon: '💭', label: '만약에?', description: '가능성을 확장하는 질문' },
        { icon: '🔄', label: '다르게?', description: '새 관점을 여는 질문' },
      ]},
      { type: 'example', bad: { label: '성훈', story: '설명 듣고 고개만 끄덕였다.\n문제 풀 때 아무것도 기억 안 났다.' }, good: { label: '예린', story: '"왜 이런 결과가 나오지?" 항상 질문.\n개념이 단단히 자리잡았다.' }},
      { type: 'ox', statement: '질문이 많으면 공부를 못하는 것이다.', answer: false, feedback: '질문이 많을수록 깊이 배우는 증거야!\n질문은 학습의 엔진이야.' },
      { type: 'multipleChoice', question: '가장 깊은 학습을 이끄는 질문은?', options: ['"시험에 나와요?"', '"왜 이런 결과가 나올까?"', '"정답이 뭐예요?"', '"외울 부분이 어디예요?"'], correctIndex: 1, explanation: '"왜?" 질문이 가장 깊은 이해를 만들어!' },
      { type: 'feedback', summary: '질문 = 학습의 엔진', message: '좋은 질문이 가장 많이 배우는 비결!' },
      { type: 'mission', mission: '수업이나 독서 중 "왜?" 질문 2개 만들기', encouragement: '질문하는 습관이 천재를 만든다!' },
    ],
  },

  'humanities-bronze-7': {
    id: 'humanities-bronze-7', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 7,
    title: '읽기의 기술 - SQ3R',
    cards: [
      { type: 'concept', title: 'SQ3R 독서법', description: 'S: 먼저 훑어보기\nQ: 질문 만들기\nR: 답을 찾으며 읽기\nR: 덮고 떠올리기\nR: 전체 복습하기' },
      { type: 'summary', keywords: [
        { icon: '👀', label: 'Survey', description: '목차/제목 먼저 훑기' },
        { icon: '❓', label: 'Question', description: '제목을 질문으로' },
        { icon: '📖', label: 'Read', description: '답 찾으며 읽기' },
        { icon: '🗣️', label: 'Recite+Review', description: '떠올리기 + 복습' },
      ]},
      { type: 'example', bad: { label: '동현', story: '처음부터 끝까지 그냥 읽었다.\n뭘 읽었는지 기억이 안 난다.' }, good: { label: '소미', story: '목차 훑고 질문 만든 뒤 답 찾으며 읽었다.\n핵심이 잘 정리됐다.' }},
      { type: 'ox', statement: '책은 처음부터 순서대로 읽어야 한다.', answer: false, feedback: '먼저 전체를 훑어보고\n큰 그림 파악 후 읽는 게 효과적!' },
      { type: 'multipleChoice', question: 'SQ3R에서 기억력을 가장 높이는 단계는?', options: ['Survey', 'Question', 'Recite', 'Read'], correctIndex: 2, explanation: '직접 떠올리는 Recite가 가장 효과적!' },
      { type: 'feedback', summary: 'SQ3R = 훑기→질문→읽기→떠올리기→복습', message: '읽는 방법만 바꿔도 2배를 배워!' },
      { type: 'mission', mission: '교과서 한 단원을 SQ3R로 읽어보기', encouragement: '방법만 바꿔도 성적이 달라져!' },
    ],
  },

  'humanities-bronze-8': {
    id: 'humanities-bronze-8', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 8,
    title: '목표 설정 - SMART 원칙',
    cards: [
      { type: 'concept', title: 'SMART 목표 설정법', description: 'S: 구체적으로\nM: 측정 가능하게\nA: 달성 가능하게\nR: 관련 있게\nT: 기한을 정해서' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '구체적', description: '"수학 30분"처럼' },
        { icon: '📊', label: '측정 가능', description: '숫자로 확인' },
        { icon: '✅', label: '달성 가능', description: '현실적 수준' },
        { icon: '⏰', label: '기한 설정', description: '언제까지 명확히' },
      ]},
      { type: 'example', bad: { label: '나쁜 목표', story: '"열심히 공부하겠다."\n뭘, 얼마나, 언제까지? 막연해서 실천 불가.' }, good: { label: 'SMART 목표', story: '"금요일까지 영단어 50개.\n매일 10개씩, 틀린 건 다음 날 복습."' }},
      { type: 'ox', statement: '목표는 크고 높을수록 좋다.', answer: false, feedback: '너무 큰 목표는 포기하기 쉬워.\n달성 가능한 작은 목표부터!' },
      { type: 'multipleChoice', question: 'SMART 목표의 예시는?', options: ['열심히 공부하기', '이번 주 영단어 50개 외우기', '최고가 되기', '공부 잘하기'], correctIndex: 1, explanation: '구체적+측정가능+기한이 있는 목표!' },
      { type: 'feedback', summary: 'SMART = 구체적 + 측정가능 + 달성가능 + 기한', message: '목표를 SMART하게 세우면 실천력이 달라져!' },
      { type: 'mission', mission: 'SMART 원칙으로 이번 주 목표 하나 세우기', encouragement: '좋은 목표가 좋은 결과를 만들어!' },
    ],
  },

  'humanities-bronze-9': {
    id: 'humanities-bronze-9', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 9,
    title: '시간 관리 - 우선순위 정하기',
    cards: [
      { type: 'concept', title: '아이젠하워 매트릭스', description: '할 일을 4칸으로 나눠:\n1️⃣ 긴급+중요 → 바로 하기\n2️⃣ 중요만 → 계획 잡기\n3️⃣ 긴급만 → 빨리 처리\n4️⃣ 둘 다 아님 → 안 해도 됨' },
      { type: 'summary', keywords: [
        { icon: '🔴', label: '긴급+중요', description: '지금 바로!' },
        { icon: '🟡', label: '중요만', description: '미리 계획!' },
        { icon: '🟠', label: '긴급만', description: '빨리 처리!' },
        { icon: '⚪', label: '둘다 아님', description: '과감히 빼기!' },
      ]},
      { type: 'example', bad: { label: '재현', story: '할 일이 뒤죽박죽.\n결국 SNS만 하다 하루가 끝났다.' }, good: { label: '윤서', story: '아침에 할 일을 4칸에 나눠 적었다.\n중요한 것부터 처리하니 여유가 생겼다.' }},
      { type: 'ox', statement: '급한 일이 항상 중요한 일이다.', answer: false, feedback: '급하지만 안 중요한 일도 많아!\n구별하는 게 시간 관리의 핵심.' },
      { type: 'multipleChoice', question: '가장 먼저 집중해야 할 영역은?', options: ['긴급+안중요', '긴급+중요', '안긴급+안중요', '중요+안긴급'], correctIndex: 1, explanation: '긴급+중요를 먼저, 그 다음 중요+안긴급!' },
      { type: 'feedback', summary: '우선순위 = 긴급/중요 4칸 구분', message: '어떻게 쓰느냐가 차이를 만들어!' },
      { type: 'mission', mission: '오늘 할 일을 긴급/중요 4칸에 나눠 적기', encouragement: '정리하면 마음도 가벼워져!' },
    ],
  },

  'humanities-bronze-10': {
    id: 'humanities-bronze-10', chapterKey: 'humanities', tierKey: 'bronze', stageNumber: 10,
    title: '작은 습관의 힘 - 2분 규칙',
    cards: [
      { type: 'concept', title: '2분 규칙', description: '"새 습관은 2분 안에 끝낼 수 있는\n크기로 줄여라."\n\n"매일 책 읽기" → "매일 1페이지"\n시작의 장벽을 낮추면 누구나 할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '2분 규칙', description: '2분으로 줄이기' },
        { icon: '🚪', label: '시작이 반', description: '일단 시작하면 계속' },
        { icon: '🌱', label: '작게 시작', description: '완벽하지 않아도 OK' },
        { icon: '📈', label: '점진적 확장', description: '자연스럽게 양 증가' },
      ]},
      { type: 'example', bad: { label: '큰 목표', story: '"매일 운동 1시간!" 부담스러워서\n시작도 못하고 3일 만에 포기.' }, good: { label: '2분 규칙', story: '"팔굽혀펴기 2개"로 시작.\n하다 보니 5개, 10개... 습관 완성!' }},
      { type: 'ox', statement: '습관은 처음부터 크게 해야 한다.', answer: false, feedback: '처음부터 크면 부담 → 포기.\n작게 시작이 성공의 비결!' },
      { type: 'multipleChoice', question: '2분 규칙의 핵심은?', options: ['2분 안에 모든 걸 끝내기', '시작의 장벽을 낮추기', '2분마다 쉬기', '빠르게 공부하기'], correctIndex: 1, explanation: '시작을 쉽게 만드는 거야!' },
      { type: 'feedback', summary: '2분 규칙 = 시작의 장벽 낮추기', message: '완벽하지 않아도 괜찮아. 시작이 중요!' },
      { type: 'mission', mission: '하고 싶은 습관을 2분 버전으로 바꿔서 시작하기', encouragement: '시작이 가장 중요해!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (검증된 공부법) 1~10
  // ═══════════════════════════════════════

  'humanities-silver-1': {
    id: 'humanities-silver-1', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 1,
    title: '파인만 학습법',
    cards: [
      { type: 'concept', title: '설명할 수 있으면 진짜 아는 것', description: '1️⃣ 개념 선택\n2️⃣ 초등학생에게 설명하듯 풀기\n3️⃣ 막히는 부분 다시 공부\n4️⃣ 더 간단하게 다듬기' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '개념 선택', description: '주제 하나 정하기' },
        { icon: '👶', label: '쉽게 설명', description: '초등학생도 이해하게' },
        { icon: '🔍', label: '빈틈 찾기', description: '막히는 곳 = 모르는 곳' },
        { icon: '✂️', label: '단순화', description: '더 짧고 쉽게' },
      ]},
      { type: 'example', bad: { label: '형식적 공부', story: '어려운 용어를 그대로 외웠다.\n응용 문제가 나오자 못 풀었다.' }, good: { label: '파인만 학습법', story: '"동생에게 설명해볼까?"\n부족한 부분만 다시 공부하니 완벽히 이해.' }},
      { type: 'ox', statement: '전문 용어로 설명하면 잘 아는 것이다.', answer: false, feedback: '쉽게 설명할 수 있어야 진짜 아는 거야!' },
      { type: 'multipleChoice', question: '파인만 학습법에서 가장 중요한 단계는?', options: ['교과서 반복 읽기', '쉬운 말로 설명하기', '문제 많이 풀기', '요약 노트 만들기'], correctIndex: 1, explanation: '쉽게 설명하려 할 때 진짜 이해가 드러나!' },
      { type: 'feedback', summary: '쉽게 설명 = 진짜 이해', message: '가르치는 것이 가장 좋은 배움!' },
      { type: 'mission', mission: '오늘 배운 개념을 누군가에게 쉽게 설명하기', encouragement: '설명할 수 있으면 진짜 아는 거야!' },
    ],
  },

  'humanities-silver-2': {
    id: 'humanities-silver-2', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 2,
    title: '능동적 회상 (Active Recall)',
    cards: [
      { type: 'concept', title: '떠올리기가 최고의 학습', description: '"직접 떠올리는 것"이\n반복 읽기보다 50% 이상 효과적이야.\n\n공부 후 책 덮고\n배운 내용을 직접 떠올려봐!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '직접 떠올리기', description: '책 없이 기억해내기' },
        { icon: '📝', label: '자기 테스트', description: '스스로 문제 내고 풀기' },
        { icon: '💪', label: '인출 연습', description: '기억을 꺼내는 훈련' },
        { icon: '📈', label: '검증된 효과', description: '반복 읽기보다 50%↑' },
      ]},
      { type: 'example', bad: { label: '수동적 복습', story: '교과서를 5번 읽었다.\n시험에서 백지 상태가 됐다.' }, good: { label: '능동적 회상', story: '1번 읽고 덮은 후 핵심을 적어봤다.\n시험에서 술술 나왔다.' }},
      { type: 'ox', statement: '많이 읽으면 자연히 외워진다.', answer: false, feedback: '읽기만 하면 "안다는 착각"에 빠져.\n직접 떠올려야 진짜 기억에 남아!' },
      { type: 'multipleChoice', question: '가장 효과적인 복습 방법은?', options: ['교과서 여러 번 읽기', '형광펜 밑줄 긋기', '책 덮고 떠올려보기', '요약본 반복 보기'], correctIndex: 2, explanation: '직접 떠올리기가 가장 효과적!' },
      { type: 'feedback', summary: '떠올리기 > 반복 읽기', message: '뇌는 꺼내는 연습할 때 가장 강하게 기억해!' },
      { type: 'mission', mission: '공부 후 노트 덮고 핵심 3가지 빈 종이에 적기', encouragement: '어려울수록 효과가 큰 거야!' },
    ],
  },

  'humanities-silver-3': {
    id: 'humanities-silver-3', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 3,
    title: '간격 반복 학습법',
    cards: [
      { type: 'concept', title: '잊을 만할 때 복습하면 강해진다', description: '간격 반복은 과학적으로\n가장 효율적인 암기법이야.\n\n잊기 직전에 복습하면\n기억이 더 강하게 저장돼!\n추천: 1일→3일→7일→30일' },
      { type: 'summary', keywords: [
        { icon: '📅', label: '1일 후', description: '첫 복습' },
        { icon: '📅', label: '3일 후', description: '기억 강화' },
        { icon: '📅', label: '7일 후', description: '장기 저장' },
        { icon: '📅', label: '30일 후', description: '영구 기억' },
      ]},
      { type: 'example', bad: { label: '몰아서 공부', story: '시험 전날 200개 한꺼번에 외웠다.\n다음 날 절반도 기억 못했다.' }, good: { label: '간격 반복', story: '매일 20개 + 1/3/7일 후 복습.\n200개 다 기억나고 한 달 뒤에도 남았다.' }},
      { type: 'ox', statement: '복습은 매일 똑같이 하는 것이 가장 좋다.', answer: false, feedback: '간격을 점점 늘려가며 복습하는 게 최적!' },
      { type: 'multipleChoice', question: '간격 반복의 최적 복습 타이밍은?', options: ['완전히 잊은 후', '외운 직후', '잊기 직전', '시험 전날'], correctIndex: 2, explanation: '잊기 직전에 복습해야 뇌가 강하게 저장!' },
      { type: 'feedback', summary: '간격 반복 = 1일→3일→7일→30일', message: '타이밍만 바꿔도 기억력이 2배!' },
      { type: 'mission', mission: '이번 주 배운 것을 1-3-7일 간격 복습 계획 세우기', encouragement: '스마트한 복습이 천재의 비결!' },
    ],
  },

  'humanities-silver-4': {
    id: 'humanities-silver-4', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 4,
    title: '인터리빙 학습법',
    cards: [
      { type: 'concept', title: '섞어서 공부하면 더 효과적', description: '같은 과목만 반복하는 것보다\n여러 과목을 섞어 공부하면\n기억력과 응용력이 올라가!\n\n처음엔 어렵지만 장기적으로 효과적이야.' },
      { type: 'summary', keywords: [
        { icon: '🔀', label: '섞어 공부', description: '과목/유형 번갈아' },
        { icon: '🧠', label: '뇌 활성화', description: '전환이 뇌를 깨움' },
        { icon: '💪', label: '응용력 UP', description: '구분 능력이 향상' },
        { icon: '📈', label: '장기 효과', description: '처음엔 어렵지만 효과적' },
      ]},
      { type: 'example', bad: { label: '블로킹', story: '수학만 3시간 연속.\n비슷한 문제가 반복되니 지루하고 효과 낮음.' }, good: { label: '인터리빙', story: '수학 40분 → 영어 40분 → 국어 40분.\n전환하며 뇌가 활성화되어 효율 UP.' }},
      { type: 'ox', statement: '한 과목을 오래 파는 게 가장 좋다.', answer: false, feedback: '섞어 공부하면 기억과 응용력이 올라가!\n뇌에 적절한 자극을 줘야 해.' },
      { type: 'multipleChoice', question: '인터리빙 학습의 핵심 효과는?', options: ['한 과목 깊이 파기', '다양한 유형 구분 능력 향상', '쉬는 시간 늘리기', '속도 올리기'], correctIndex: 1, explanation: '유형을 구분하는 능력이 향상돼!' },
      { type: 'feedback', summary: '인터리빙 = 섞어서 공부 → 응용력 UP', message: '처음엔 어렵지만 효과는 확실해!' },
      { type: 'mission', mission: '오늘 공부할 때 2과목 이상 번갈아 공부하기', encouragement: '섞는 순간 뇌가 깨어나!' },
    ],
  },

  'humanities-silver-5': {
    id: 'humanities-silver-5', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 5,
    title: '정교화 전략',
    cards: [
      { type: 'concept', title: '"왜?"를 깊이 파면 기억이 깊어진다', description: '새로운 정보를 배울 때\n"왜 그럴까?" 깊이 생각하면\n기존 지식과 연결되어 기억이 강해져!\n\n이것이 정교화(Elaboration) 전략이야.' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '왜?', description: '이유를 깊이 탐구' },
        { icon: '🔗', label: '연결', description: '기존 지식과 연결' },
        { icon: '📖', label: '자기 말로', description: '재구성하여 표현' },
        { icon: '🧩', label: '예시 만들기', description: '구체적 사례 떠올리기' },
      ]},
      { type: 'example', bad: { label: '단순 암기', story: '"광합성은 빛으로 포도당을 만드는 과정"\n그냥 외웠다. 금방 까먹었다.' }, good: { label: '정교화', story: '"왜 빛이 필요하지? 에너지원이구나!"\n이유를 생각하니 자연스럽게 기억.' }},
      { type: 'ox', statement: '정보는 반복해서 읽으면 충분히 기억된다.', answer: false, feedback: '"왜?"를 생각하며 깊이 처리해야\n장기 기억으로 넘어가!' },
      { type: 'multipleChoice', question: '정교화 전략의 핵심은?', options: ['빠르게 반복 읽기', '왜?를 생각하며 깊이 처리', '핵심 단어 밑줄', '요약 노트 작성'], correctIndex: 1, explanation: '깊이 생각할수록 기억이 강해져!' },
      { type: 'feedback', summary: '정교화 = "왜?" + 연결 + 자기 말로', message: '"왜?"가 기억의 접착제야!' },
      { type: 'mission', mission: '오늘 배운 것에 "왜?" 3번 질문하고 답 찾기', encouragement: '깊이 파면 파낼수록 기억이 단단해져!' },
    ],
  },

  'humanities-silver-6': {
    id: 'humanities-silver-6', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 6,
    title: '마인드맵 활용법',
    cards: [
      { type: 'concept', title: '시각적으로 연결하며 정리', description: '마인드맵은 중심 주제에서\n가지를 뻗어나가며 정리하는 방법이야.\n\n시각적 구조가 뇌의 기억을 도와줘!\n색, 그림, 키워드를 활용하면 효과 UP.' },
      { type: 'summary', keywords: [
        { icon: '🌳', label: '중심 주제', description: '가운데에 핵심 주제' },
        { icon: '🌿', label: '가지치기', description: '하위 개념으로 확장' },
        { icon: '🎨', label: '색과 그림', description: '시각적 요소 활용' },
        { icon: '🔗', label: '연결선', description: '개념 간 관계 표시' },
      ]},
      { type: 'example', bad: { label: '줄글 정리', story: '공부 내용을 줄글로 빼곡히 적었다.\n나중에 보니 어디가 핵심인지 모르겠다.' }, good: { label: '마인드맵', story: '중심에 주제, 가지로 핵심 개념 연결.\n한눈에 전체 구조가 보였다.' }},
      { type: 'ox', statement: '마인드맵은 예쁘게 그려야 효과가 있다.', answer: false, feedback: '예쁘기보다 "연결 구조"가 핵심!\n빠르게 그려도 효과적이야.' },
      { type: 'multipleChoice', question: '마인드맵의 핵심 효과는?', options: ['예쁜 노트 만들기', '개념 간 연결 시각화', '글씨 연습', '시간 절약'], correctIndex: 1, explanation: '연결 구조를 시각적으로 보는 게 핵심!' },
      { type: 'feedback', summary: '마인드맵 = 시각적 연결 + 구조화', message: '한눈에 보이는 정리가 최고의 복습!' },
      { type: 'mission', mission: '오늘 배운 내용을 마인드맵으로 정리하기', encouragement: '그리는 과정이 곧 복습이야!' },
    ],
  },

  'humanities-silver-7': {
    id: 'humanities-silver-7', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 7,
    title: '자기설명 효과',
    cards: [
      { type: 'concept', title: '나에게 가르치면 이해가 깊어진다', description: '배운 것을 스스로 설명하면\n이해도가 크게 올라가.\n\n"이건 왜 이렇게 되지?"\n"다음 단계는 뭘까?"\n혼잣말로도 효과적이야!' },
      { type: 'summary', keywords: [
        { icon: '🗣️', label: '자기 설명', description: '스스로에게 설명' },
        { icon: '❓', label: '예측 질문', description: '다음 단계 예측하기' },
        { icon: '🔍', label: '빈틈 발견', description: '설명 못하면 모르는 것' },
        { icon: '📈', label: '이해도 UP', description: '능동적 처리 효과' },
      ]},
      { type: 'example', bad: { label: '그냥 읽기', story: '풀이를 눈으로만 따라갔다.\n비슷한 문제를 못 풀었다.' }, good: { label: '자기설명', story: '"이 단계에서 왜 이 공식을 쓰지?"\n설명하며 읽으니 응용도 가능해졌다.' }},
      { type: 'ox', statement: '혼자 공부할 때는 설명할 대상이 없어 효과가 없다.', answer: false, feedback: '자기 자신에게 설명해도 효과 동일!\n혼잣말도 훌륭한 학습법이야.' },
      { type: 'multipleChoice', question: '자기설명 효과의 핵심은?', options: ['큰 소리로 읽기', '왜?를 생각하며 단계별로 설명', '요약 노트 만들기', '반복 읽기'], correctIndex: 1, explanation: '단계마다 "왜?"를 설명하는 게 핵심!' },
      { type: 'feedback', summary: '자기설명 = 스스로 가르치며 이해 깊이기', message: '설명할 수 있으면 진짜 이해한 거야!' },
      { type: 'mission', mission: '풀이 과정을 보며 각 단계를 혼잣말로 설명하기', encouragement: '혼잣말이 성적을 올려줘!' },
    ],
  },

  'humanities-silver-8': {
    id: 'humanities-silver-8', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 8,
    title: '딥워크 - 깊은 집중',
    cards: [
      { type: 'concept', title: '방해 없는 깊은 집중의 힘', description: '칼 뉴포트의 "딥워크":\n방해 없이 한 가지에 깊이 집중하는 시간.\n\n스마트폰, SNS를 끄고\n90분~2시간 몰입하면\n보통 4시간 공부보다 효과적!' },
      { type: 'summary', keywords: [
        { icon: '🔇', label: '방해 차단', description: '스마트폰·SNS 끄기' },
        { icon: '🎯', label: '단일 과제', description: '한 가지에만 집중' },
        { icon: '⏰', label: '90분 블록', description: '깊은 집중 시간 블록' },
        { icon: '🧠', label: '깊은 처리', description: '뇌가 깊이 작동' },
      ]},
      { type: 'example', bad: { label: '얕은 공부', story: '카톡 보면서 공부 4시간.\n실제 집중은 1시간도 안 됐다.' }, good: { label: '딥워크', story: '스마트폰 끄고 90분 몰입.\n4시간 공부보다 더 많이 끝냈다.' }},
      { type: 'ox', statement: '공부는 오래 할수록 좋다.', answer: false, feedback: '시간보다 "집중의 깊이"가 중요해!\n90분 딥워크 > 4시간 산만한 공부.' },
      { type: 'multipleChoice', question: '딥워크의 핵심 조건은?', options: ['여러 일 동시에', '방해 없는 깊은 집중', '많은 시간 투자', '쉬운 과제부터'], correctIndex: 1, explanation: '방해를 차단하고 깊이 집중하는 게 핵심!' },
      { type: 'feedback', summary: '딥워크 = 방해 차단 + 깊은 집중', message: '집중의 질이 결과의 질을 결정해!' },
      { type: 'mission', mission: '스마트폰 끄고 60분 딥워크 도전하기', encouragement: '깊은 집중이 진짜 실력을 만들어!' },
    ],
  },

  'humanities-silver-9': {
    id: 'humanities-silver-9', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 9,
    title: '메타인지 - 나를 아는 공부',
    cards: [
      { type: 'concept', title: '"내가 모르는 것을 아는 것"', description: '메타인지 = 내 사고를 관찰하는 능력.\n\n"이거 진짜 알아?" 스스로 점검하면\n공부 효율이 크게 올라가.\n아는 척 넘어가는 게 가장 위험해!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 점검', description: '진짜 아는지 확인' },
        { icon: '❓', label: '모르는 것 파악', description: '약점을 인식하기' },
        { icon: '🎯', label: '전략 조절', description: '방법을 수정하기' },
        { icon: '📊', label: '효율 UP', description: '약점 집중 공략' },
      ]},
      { type: 'example', bad: { label: '착각의 함정', story: '"다 아는 것 같아" 넘어갔다.\n시험에서 안다고 생각한 부분이 틀렸다.' }, good: { label: '메타인지', story: '"이거 진짜 설명할 수 있나?" 점검.\n모르는 부분만 집중 공부하니 효율 UP.' }},
      { type: 'ox', statement: '아는 것 같으면 넘어가도 된다.', answer: false, feedback: '"아는 것 같은" 착각이 가장 위험!\n설명해보면 진짜 아는지 확인돼.' },
      { type: 'multipleChoice', question: '메타인지를 높이는 방법은?', options: ['많이 읽기', '스스로 설명해보고 점검하기', '밑줄 긋기', '요약 베끼기'], correctIndex: 1, explanation: '스스로 점검하는 습관이 메타인지의 핵심!' },
      { type: 'feedback', summary: '메타인지 = 나의 앎과 모름을 아는 것', message: '모르는 걸 아는 게 진짜 공부의 시작!' },
      { type: 'mission', mission: '공부 후 "진짜 아는지" 스스로 테스트하기', encouragement: '자기 점검이 최고의 공부법!' },
    ],
  },

  'humanities-silver-10': {
    id: 'humanities-silver-10', chapterKey: 'humanities', tierKey: 'silver', stageNumber: 10,
    title: '청킹 - 묶어서 기억하기',
    cards: [
      { type: 'concept', title: '정보를 묶으면 기억 용량이 커진다', description: '뇌는 한 번에 7±2개만 기억해.\n하지만 정보를 묶으면(청킹)\n더 많이 기억할 수 있어!\n\n예: 010-1234-5678 → 3덩어리로 묶기' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '청킹', description: '정보를 묶어서 기억' },
        { icon: '7️⃣', label: '7±2', description: '뇌의 기억 용량' },
        { icon: '🔗', label: '패턴 묶기', description: '규칙으로 연결' },
        { icon: '📈', label: '용량 확장', description: '더 많이 기억 가능' },
      ]},
      { type: 'example', bad: { label: '낱개 암기', story: '0-1-0-1-2-3-4-5-6-7-8 하나씩 외우니\n11개 숫자가 너무 어렵다.' }, good: { label: '청킹', story: '010-1234-5678 세 묶음으로.\n전화번호가 쉽게 외워진다.' }},
      { type: 'ox', statement: '기억력은 타고나는 것이라 늘릴 수 없다.', answer: false, feedback: '청킹 같은 전략을 쓰면\n누구나 기억 용량을 확장할 수 있어!' },
      { type: 'multipleChoice', question: '청킹의 핵심 원리는?', options: ['반복해서 외우기', '정보를 의미 있는 단위로 묶기', '하나씩 천천히', '소리 내어 읽기'], correctIndex: 1, explanation: '의미 단위로 묶으면 기억 용량이 커져!' },
      { type: 'feedback', summary: '청킹 = 묶어서 기억 → 용량 확장', message: '묶는 연습이 기억력의 비결!' },
      { type: 'mission', mission: '외울 것을 3~4개씩 묶어서 암기해보기', encouragement: '묶으면 외우기가 쉬워져!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (사고력 확장) 1~10
  // ═══════════════════════════════════════

  'humanities-gold-1': {
    id: 'humanities-gold-1', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 1,
    title: '비판적 사고란?',
    cards: [
      { type: 'concept', title: '의심하고 검증하는 힘', description: '주어진 정보를 그대로 믿지 않고\n근거를 확인하고 분석하는 능력이야.\n\n"이게 정말 사실일까?"\n"근거가 있는 말일까?" 이런 질문이 시작!' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '근거 확인', description: '사실인지 검증' },
        { icon: '⚖️', label: '객관적 판단', description: '감정 배제한 분석' },
        { icon: '❓', label: '질문하기', description: '당연한 것에 의문' },
        { icon: '🧠', label: '다각도 사고', description: '여러 관점으로 보기' },
      ]},
      { type: 'example', bad: { label: '무비판', story: '"인터넷에 이렇게 나왔으니 맞겠지."\n가짜 뉴스에 속았다.' }, good: { label: '비판적 사고', story: '"출처가 어디지? 근거가 있나?"\n확인하니 가짜 정보였다.' }},
      { type: 'ox', statement: '비판적 사고는 모든 것을 부정하는 것이다.', answer: false, feedback: '부정이 아니라 "근거 확인"이야!\n합리적으로 판단하는 능력이지.' },
      { type: 'multipleChoice', question: '비판적 사고의 첫 단계는?', options: ['무조건 반대하기', '근거와 출처 확인하기', '남의 말 무시하기', '직감으로 판단하기'], correctIndex: 1, explanation: '근거를 확인하는 것이 첫 단계!' },
      { type: 'feedback', summary: '비판적 사고 = 근거 확인 + 합리적 판단', message: '의심할 줄 아는 사람이 현명한 사람!' },
      { type: 'mission', mission: '오늘 본 뉴스 하나의 근거를 확인해보기', encouragement: '확인하는 습관이 판단력을 키워!' },
    ],
  },

  'humanities-gold-2': {
    id: 'humanities-gold-2', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 2,
    title: '논리적 오류 파악하기',
    cards: [
      { type: 'concept', title: '자주 빠지는 사고의 함정', description: '흑백 논리: "A 아니면 B"\n인신공격: 주장 대신 사람 공격\n다수의 오류: "모두 하니까 맞겠지"\n\n이것만 알아도 현명한 판단 가능!' },
      { type: 'summary', keywords: [
        { icon: '🔲', label: '흑백 논리', description: '중간이 없는 사고' },
        { icon: '🥊', label: '인신공격', description: '사람을 공격하는 오류' },
        { icon: '👥', label: '다수의 오류', description: '많으니까 맞다는 착각' },
        { icon: '🏔️', label: '미끄러운 경사', description: '극단적 결론 비약' },
      ]},
      { type: 'example', bad: { label: '논리 오류', story: '"다들 하니까 괜찮겠지."\n다수의 오류에 빠져 잘못된 선택.' }, good: { label: '오류 파악', story: '"많이 한다고 맞는 건 아니야."\n논리적으로 따져보고 판단했다.' }},
      { type: 'ox', statement: '많은 사람이 믿으면 사실일 가능성이 높다.', answer: false, feedback: '다수의 오류! 많이 믿는다고 사실은 아니야.\n근거를 따져봐야 해.' },
      { type: 'multipleChoice', question: '"너는 어려서 몰라"는 어떤 오류?', options: ['흑백 논리', '인신공격', '다수의 오류', '순환 논증'], correctIndex: 1, explanation: '주장이 아닌 사람(나이)을 공격하는 인신공격!' },
      { type: 'feedback', summary: '논리적 오류 = 사고의 함정을 피하는 법', message: '오류를 알면 속지 않아!' },
      { type: 'mission', mission: '대화나 뉴스에서 논리적 오류 1개 찾아보기', encouragement: '오류를 발견하면 현명해진 거야!' },
    ],
  },

  'humanities-gold-3': {
    id: 'humanities-gold-3', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 3,
    title: '창의적 문제해결 - SCAMPER',
    cards: [
      { type: 'concept', title: '7가지 변형으로 아이디어 탄생', description: 'S: 대체 / C: 결합 / A: 적용\nM: 수정 / P: 다른 용도\nE: 제거 / R: 뒤집기\n\n이 7가지만 적용하면 아이디어가 쏟아져!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '대체하기', description: '다른 것으로 바꾸기' },
        { icon: '🤝', label: '결합하기', description: '두 가지를 합치기' },
        { icon: '✂️', label: '제거하기', description: '빼면 어떻게 될까' },
        { icon: '🔀', label: '뒤집기', description: '반대로 해보기' },
      ]},
      { type: 'example', bad: { label: '고정 사고', story: '"원래 이렇게 하는 거야."\n새로운 방법을 시도하지 않았다.' }, good: { label: 'SCAMPER', story: '"이걸 결합하면?" "반대로 하면?"\n질문하니 새로운 아이디어가 나왔다.' }},
      { type: 'ox', statement: '창의력은 타고나는 것이다.', answer: false, feedback: 'SCAMPER처럼 체계적 방법으로\n누구나 창의적 사고를 할 수 있어!' },
      { type: 'multipleChoice', question: 'SCAMPER의 C는?', options: ['Create', 'Combine', 'Calculate', 'Copy'], correctIndex: 1, explanation: 'Combine(결합)! 두 가지를 합쳐보는 것!' },
      { type: 'feedback', summary: 'SCAMPER = 7가지 변형으로 창의적 사고', message: '질문을 바꾸면 답이 바뀌어!' },
      { type: 'mission', mission: '일상의 물건 하나에 SCAMPER 적용해보기', encouragement: '누구나 창의적일 수 있어!' },
    ],
  },

  'humanities-gold-4': {
    id: 'humanities-gold-4', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 4,
    title: '관점 전환의 힘',
    cards: [
      { type: 'concept', title: '같은 상황, 다른 시각', description: '비가 온다:\n농부: "비다! 농사에 좋겠다!"\n소풍 계획자: "소풍이 망했어..."\n\n관점을 바꿀 수 있으면\n더 넓게 이해하고 현명하게 판단해!' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '다른 시각', description: '상대방 입장에서 보기' },
        { icon: '🔄', label: '역지사지', description: '입장을 바꿔 생각' },
        { icon: '🌍', label: '넓은 시야', description: '여러 각도로 파악' },
        { icon: '🤝', label: '공감', description: '다른 사람 이해하기' },
      ]},
      { type: 'example', bad: { label: '고정 관점', story: '"내 생각만 맞아!"\n다른 의견을 무시하고 갈등이 생겼다.' }, good: { label: '관점 전환', story: '"상대방은 왜 그렇게 생각할까?"\n이해하니 더 좋은 해결책이 보였다.' }},
      { type: 'ox', statement: '내 관점이 가장 객관적이다.', answer: false, feedback: '누구나 편향이 있어!\n다른 관점을 인정하는 게 진짜 객관성.' },
      { type: 'multipleChoice', question: '관점 전환의 핵심 효과는?', options: ['내 주장 강화', '문제의 다양한 해결책 발견', '남을 설득하기', '갈등 피하기'], correctIndex: 1, explanation: '여러 관점으로 보면 더 좋은 답이 보여!' },
      { type: 'feedback', summary: '관점 전환 = 넓은 이해 + 현명한 판단', message: '다르게 보는 것이 지혜의 시작!' },
      { type: 'mission', mission: '의견이 다른 사람의 입장에서 생각해보기', encouragement: '이해하면 세상이 넓어져!' },
    ],
  },

  'humanities-gold-5': {
    id: 'humanities-gold-5', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 5,
    title: '문제 해결 5단계',
    cards: [
      { type: 'concept', title: '체계적으로 문제를 풀어가기', description: '1️⃣ 정의: 문제가 정확히 뭐지?\n2️⃣ 분석: 원인이 뭘까?\n3️⃣ 아이디어: 방법이 있을까?\n4️⃣ 실행: 최선을 실천!\n5️⃣ 평가: 효과가 있었나?' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '정의', description: '문제 정확히 파악' },
        { icon: '🔬', label: '분석', description: '원인 찾기' },
        { icon: '💡', label: '아이디어', description: '해결책 떠올리기' },
        { icon: '🚀', label: '실행+평가', description: '실천하고 확인' },
      ]},
      { type: 'example', bad: { label: '즉흥 해결', story: '문제가 뭔지도 모르고 행동부터.\n원인이 아닌 증상만 해결했다.' }, good: { label: '5단계', story: '먼저 문제를 정확히 정의했다.\n원인을 분석하니 해결책이 명확해졌다.' }},
      { type: 'ox', statement: '문제 해결은 빠를수록 좋다.', answer: false, feedback: '빠르기보다 "정확한 문제 정의"가 핵심!\n1단계가 가장 중요해.' },
      { type: 'multipleChoice', question: '문제 해결에서 가장 중요한 단계는?', options: ['빠른 실행', '문제 정의', '아이디어 많이 내기', '평가'], correctIndex: 1, explanation: '문제를 정확히 정의하면 절반은 해결!' },
      { type: 'feedback', summary: '문제 해결 = 정의→분석→아이디어→실행→평가', message: '정확한 질문이 정확한 답을 만들어!' },
      { type: 'mission', mission: '고민 하나를 5단계로 분석해보기', encouragement: '체계적으로 풀면 뭐든 해결돼!' },
    ],
  },

  'humanities-gold-6': {
    id: 'humanities-gold-6', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 6,
    title: '시스템 사고',
    cards: [
      { type: 'concept', title: '전체를 보는 눈', description: '개별 요소가 아닌 전체 관계를 보는 것.\n\n"성적 하락" → 표면: 공부 안 해서\n→ 시스템: 수면 부족→집중력↓→이해도↓\n\n근본 원인을 찾아야 진짜 해결!' },
      { type: 'summary', keywords: [
        { icon: '🌐', label: '전체 보기', description: '부분이 아닌 전체' },
        { icon: '🔗', label: '관계 파악', description: '요소 간 연결 이해' },
        { icon: '🔄', label: '피드백 루프', description: '원인과 결과의 순환' },
        { icon: '🎯', label: '근본 원인', description: '표면이 아닌 뿌리' },
      ]},
      { type: 'example', bad: { label: '표면적 해결', story: '"공부를 더 하자!" 시간만 늘렸다.\n근본 원인(수면 부족)은 그대로.' }, good: { label: '시스템 사고', story: '왜 집중이 안 될까? → 수면 부족 발견.\n수면을 먼저 해결하니 성적이 올랐다.' }},
      { type: 'ox', statement: '문제의 원인은 항상 눈에 보인다.', answer: false, feedback: '표면 원인 뒤에 근본 원인이 숨어있어!\n시스템으로 봐야 찾을 수 있어.' },
      { type: 'multipleChoice', question: '시스템 사고의 핵심은?', options: ['부분 최적화', '전체 관계와 근본 원인 파악', '빠른 해결', '직감적 판단'], correctIndex: 1, explanation: '전체를 보고 근본 원인을 찾는 것!' },
      { type: 'feedback', summary: '시스템 사고 = 전체를 보고 근본 원인 해결', message: '나무가 아닌 숲을 봐야 해!' },
      { type: 'mission', mission: '최근 문제의 "근본 원인"을 찾아보기', encouragement: '뿌리를 찾으면 진짜 해결돼!' },
    ],
  },

  'humanities-gold-7': {
    id: 'humanities-gold-7', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 7,
    title: '유추와 비유의 힘',
    cards: [
      { type: 'concept', title: '아는 것으로 모르는 것 이해하기', description: '유추는 이미 아는 것으로\n새로운 것을 이해하는 방법이야.\n\n"뇌는 컴퓨터와 비슷해"\n"심장은 펌프와 같아"\n비유 하나로 어려운 개념이 쏙!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '유추', description: '비슷한 것으로 연결' },
        { icon: '💡', label: '비유', description: '쉬운 것에 빗대어 설명' },
        { icon: '🧠', label: '이해 촉진', description: '어려운 것을 쉽게' },
        { icon: '📚', label: '기억 강화', description: '이미지로 기억' },
      ]},
      { type: 'example', bad: { label: '추상적 설명', story: '어려운 정의를 그대로 외웠다.\n이해 없이 외우니 금방 까먹었다.' }, good: { label: '비유 활용', story: '"DNA는 설계도 같은 거야."\n비유로 이해하니 기억에 남았다.' }},
      { type: 'ox', statement: '비유는 정확하지 않으므로 학습에 도움이 안 된다.', answer: false, feedback: '비유는 이해의 징검다리야!\n완벽하지 않아도 시작점으로 훌륭해.' },
      { type: 'multipleChoice', question: '유추가 효과적인 이유는?', options: ['정확한 정의를 대체해서', '기존 지식과 연결되어서', '쉬워 보여서', '시험에 나와서'], correctIndex: 1, explanation: '이미 아는 것과 연결하면 이해가 빨라!' },
      { type: 'feedback', summary: '유추 = 아는 것 → 모르는 것 연결', message: '좋은 비유 하나가 천 마디 설명보다 나아!' },
      { type: 'mission', mission: '어려운 개념에 비유를 하나 만들어보기', encouragement: '비유를 만들면 이미 이해한 거야!' },
    ],
  },

  'humanities-gold-8': {
    id: 'humanities-gold-8', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 8,
    title: '가설과 검증 - 과학적 사고',
    cards: [
      { type: 'concept', title: '"아마 이럴 것이다" 확인하기', description: '1️⃣ 관찰: "이상하네?"\n2️⃣ 가설: "아마 이 때문일 거야"\n3️⃣ 실험: 직접 확인\n4️⃣ 결론: 맞았나? 틀렸나?' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '관찰', description: '궁금한 점 발견' },
        { icon: '💭', label: '가설', description: '예상 답 세우기' },
        { icon: '🔬', label: '실험', description: '직접 확인하기' },
        { icon: '✅', label: '결론', description: '결과 정리' },
      ]},
      { type: 'example', bad: { label: '추측만', story: '"아마 이럴 거야" 확인 안 하고 넘겼다.\n잘못된 믿음이 굳어졌다.' }, good: { label: '과학적 사고', story: '"아침에 외우면 더 잘 될까?" 가설.\n직접 비교해보니 진짜 효과적이었다.' }},
      { type: 'ox', statement: '가설은 맞아야만 의미가 있다.', answer: false, feedback: '틀린 가설도 배움이야!\n"이건 아니구나"를 아는 것도 진전.' },
      { type: 'multipleChoice', question: '과학적 사고의 핵심은?', options: ['직감으로 판단', '가설을 세우고 검증하기', '전문가 의견 따르기', '많이 읽기'], correctIndex: 1, explanation: '가설→검증이 과학적 사고의 핵심!' },
      { type: 'feedback', summary: '과학적 사고 = 관찰→가설→실험→결론', message: '직접 확인하는 태도가 진짜 실력!' },
      { type: 'mission', mission: '공부법에 대한 가설 하나를 세우고 검증하기', encouragement: '실험하는 사람이 성장하는 사람!' },
    ],
  },

  'humanities-gold-9': {
    id: 'humanities-gold-9', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 9,
    title: '디자인 씽킹',
    cards: [
      { type: 'concept', title: '공감에서 시작하는 문제해결', description: '1️⃣ 공감: 사용자 마음 이해\n2️⃣ 정의: 진짜 문제 찾기\n3️⃣ 아이디어: 자유롭게 떠올리기\n4️⃣ 시제품: 빠르게 만들기\n5️⃣ 테스트: 써보고 개선하기' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '공감', description: '상대방 마음 이해' },
        { icon: '🎯', label: '정의', description: '진짜 문제 찾기' },
        { icon: '💡', label: '아이디어', description: '자유롭게 떠올리기' },
        { icon: '🔄', label: '시제품+테스트', description: '만들고 개선하기' },
      ]},
      { type: 'example', bad: { label: '내 기준으로', story: '내가 좋다고 생각한 걸 만들었다.\n아무도 안 썼다.' }, good: { label: '디자인 씽킹', story: '"뭘 불편해하지?" 먼저 관찰.\n진짜 필요한 해결책을 만들었다.' }},
      { type: 'ox', statement: '좋은 아이디어는 한 번에 완성된다.', answer: false, feedback: '반복적 개선이 핵심!\n실패하고 고치는 과정이 필수야.' },
      { type: 'multipleChoice', question: '디자인 씽킹의 첫 단계는?', options: ['아이디어 내기', '시제품 만들기', '공감(사용자 이해)', '문제 분석'], correctIndex: 2, explanation: '공감이 먼저! 상대의 필요를 이해해야 해.' },
      { type: 'feedback', summary: '디자인 씽킹 = 공감→정의→아이디어→시제품→테스트', message: '모든 혁신은 공감에서 시작해!' },
      { type: 'mission', mission: '주변 사람의 불편함 관찰하고 해결 아이디어 적기', encouragement: '공감하는 사람이 세상을 바꿔!' },
    ],
  },

  'humanities-gold-10': {
    id: 'humanities-gold-10', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 10,
    title: '융합적 사고 - 연결의 힘',
    cards: [
      { type: 'concept', title: '다른 분야를 연결하면 혁신 탄생', description: '스티브 잡스:\n"창의성은 연결하는 것이다."\n\n서예 수업→맥의 아름다운 폰트\n여러 분야를 연결하는 T형 인재가 강해!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연결력', description: '분야 간 공통점 찾기' },
        { icon: '🌈', label: '융합', description: '서로 다른 것 합치기' },
        { icon: '💡', label: '혁신', description: '연결에서 새로움 탄생' },
        { icon: '🔤', label: 'T형 인재', description: '깊이 + 넓이' },
      ]},
      { type: 'example', bad: { label: '칸막이 사고', story: '"수학은 수학, 과학은 과학."\n연결을 못하니 응용력이 부족.' }, good: { label: '융합 사고', story: '수학 패턴이 음악에도 있다는 걸 발견.\n두 분야가 연결되니 이해가 깊어졌다.' }},
      { type: 'ox', statement: '한 분야만 깊이 파는 것이 가장 좋다.', answer: false, feedback: '깊이도 중요하지만 연결력도 필요해!\nT형 인재가 미래에 강해.' },
      { type: 'multipleChoice', question: '융합적 사고의 핵심은?', options: ['한 분야 전문화', '다른 분야 간 연결과 통합', '모든 것을 얕게 아는 것', '트렌드 따라가기'], correctIndex: 1, explanation: '서로 다른 분야를 연결하는 것!' },
      { type: 'feedback', summary: '융합 = 서로 다른 것을 연결하면 혁신', message: '연결하는 사람이 창조하는 사람!' },
      { type: 'mission', mission: '좋아하는 두 분야의 공통점 찾아보기', encouragement: '연결이 곧 창의력이야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 플래티넘 (인문학적 사고) 1~10
  // ═══════════════════════════════════════

  'humanities-platinum-1': {
    id: 'humanities-platinum-1', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 1,
    title: '소크라테스 - 너 자신을 알라',
    cards: [
      { type: 'concept', title: '진정한 지혜의 시작', description: '소크라테스의 명언:\n"나는 내가 모른다는 것을 안다."\n\n자기가 무엇을 모르는지 아는 것,\n그것이 진정한 지혜의 시작이야.' },
      { type: 'summary', keywords: [
        { icon: '🏛️', label: '소크라테스', description: '고대 그리스 철학자' },
        { icon: '🪞', label: '자기 인식', description: '나를 아는 것' },
        { icon: '❓', label: '무지의 지', description: '모름을 아는 지혜' },
        { icon: '💡', label: '문답법', description: '질문으로 진리 탐구' },
      ]},
      { type: 'example', bad: { label: '모르면서 아는 척', story: '"나 다 알아!" 새로운 걸 배우지 않았다.\n성장이 멈췄다.' }, good: { label: '무지의 지', story: '"이 부분은 아직 잘 모르겠어."\n인정하니 배울 준비가 됐다.' }},
      { type: 'ox', statement: '모른다고 인정하면 약해 보인다.', answer: false, feedback: '모르는 걸 인정하는 것이\n진짜 용기이자 지혜의 시작!' },
      { type: 'multipleChoice', question: '소크라테스 "무지의 지"의 의미는?', options: ['아무것도 모른다', '모든 것을 안다', '모른다는 사실을 아는 것', '지식이 무의미하다'], correctIndex: 2, explanation: '내가 모른다는 사실을 아는 것이 지혜!' },
      { type: 'feedback', summary: '무지의 지 = 모르는 것을 아는 것이 시작', message: '겸손한 배움이 가장 깊은 배움!' },
      { type: 'mission', mission: '"내가 모르는 것" 3가지 정직하게 적어보기', encouragement: '인정하는 순간 성장이 시작돼!' },
    ],
  },

  'humanities-platinum-2': {
    id: 'humanities-platinum-2', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 2,
    title: '공자 - 배움의 즐거움',
    cards: [
      { type: 'concept', title: '배우고 익히면 기쁘지 아니한가', description: '논어 첫 문장:\n"學而時習之 不亦說乎"\n\n공자는 2500년 전에 이미\n"반복 학습의 즐거움"을 말했어.\n배움은 의무가 아니라 기쁨!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '공자', description: '중국 유학의 창시자' },
        { icon: '🔁', label: '時習', description: '때때로 익히기' },
        { icon: '😊', label: '즐거움', description: '배움의 기쁨' },
        { icon: '🤝', label: '벗과 함께', description: '함께 배우는 즐거움' },
      ]},
      { type: 'example', bad: { label: '의무적 공부', story: '"해야 하니까 하는 거야."\n억지로 하니 지치고 싫어졌다.' }, good: { label: '배움의 즐거움', story: '"이해되는 순간이 짜릿해!"\n즐기며 하니 자연스럽게 더 하게 됐다.' }},
      { type: 'ox', statement: '공부는 원래 힘들고 괴로운 것이다.', answer: false, feedback: '이해되는 순간의 기쁨이 있어!\n공자도 배움은 즐거운 것이라 했어.' },
      { type: 'multipleChoice', question: '논어 첫 문장의 핵심은?', options: ['열심히 공부하라', '배우고 익히면 즐겁다', '시험을 잘 보라', '많이 외워라'], correctIndex: 1, explanation: '배우고 때때로 익히면 기쁘다는 뜻!' },
      { type: 'feedback', summary: '學而時習之 = 배우고 익히면 즐겁다', message: '즐거운 배움이 최고의 배움!' },
      { type: 'mission', mission: '오늘 "이해되는 즐거움"을 느낀 순간 기록하기', encouragement: '즐기면 누구나 잘할 수 있어!' },
    ],
  },

  'humanities-platinum-3': {
    id: 'humanities-platinum-3', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 3,
    title: '스토아 철학 - 통제할 수 있는 것',
    cards: [
      { type: 'concept', title: '바꿀 수 있는 것에 집중하기', description: '스토아 철학의 핵심:\n\n❌ 바꿀 수 없는 것: 날씨, 남의 말, 과거\n✅ 바꿀 수 있는 것: 내 태도, 행동, 반응\n\n바꿀 수 있는 것에 에너지를 쓰자!' },
      { type: 'summary', keywords: [
        { icon: '❌', label: '통제 불가', description: '날씨, 남의 말, 과거' },
        { icon: '✅', label: '통제 가능', description: '내 태도, 행동, 반응' },
        { icon: '🎯', label: '집중', description: '바꿀 수 있는 것에' },
        { icon: '🧘', label: '평정심', description: '흔들리지 않는 마음' },
      ]},
      { type: 'example', bad: { label: '통제 불가에 집착', story: '"왜 비가 와!" 날씨에 화를 냈다.\n에너지만 낭비하고 기분만 나빠졌다.' }, good: { label: '스토아 사고', story: '"비는 못 바꾸지만 우산은 가져갈 수 있어."\n바꿀 수 있는 행동에 집중했다.' }},
      { type: 'ox', statement: '스토아 철학은 감정을 없애는 것이다.', answer: false, feedback: '감정을 없애는 게 아니라\n바꿀 수 있는 것에 집중하는 것!' },
      { type: 'multipleChoice', question: '스토아 철학에서 집중해야 할 것은?', options: ['남의 평가', '과거의 실수', '내 태도와 행동', '미래의 걱정'], correctIndex: 2, explanation: '내가 바꿀 수 있는 것에만 집중!' },
      { type: 'feedback', summary: '스토아 = 바꿀 수 있는 것에 에너지 집중', message: '바꿀 수 있는 것을 바꾸는 게 지혜!' },
      { type: 'mission', mission: '걱정 하나를 "바꿀 수 있는 것"으로 전환해보기', encouragement: '내 반응은 내가 선택할 수 있어!' },
    ],
  },

  'humanities-platinum-4': {
    id: 'humanities-platinum-4', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 4,
    title: '캐롤 드웩 - 성장 마인드셋',
    cards: [
      { type: 'concept', title: '"아직" 못하는 것일 뿐', description: '🔴 고정: "난 수학 못해" → 포기\n🟢 성장: "난 아직 수학이 어려워" → 도전\n\n핵심 단어는 "아직(yet)"!\n"못한다"→"아직 못한다"로 바꾸면 달라져.' },
      { type: 'summary', keywords: [
        { icon: '🔴', label: '고정 마인드셋', description: '못한다 → 포기' },
        { icon: '🟢', label: '성장 마인드셋', description: '아직 → 도전' },
        { icon: '🔑', label: '"아직"', description: '마법의 단어' },
        { icon: '📈', label: '노력 = 성장', description: '뇌는 계속 발전' },
      ]},
      { type: 'example', bad: { label: '고정', story: '"난 원래 수학 못해." 시도도 안 했다.\n결과적으로 정말 못하게 됐다.' }, good: { label: '성장', story: '"아직 어렵지만 연습하면 나아질 거야."\n꾸준히 하니 정말 실력이 올랐다.' }},
      { type: 'ox', statement: '재능이 없으면 노력해도 소용없다.', answer: false, feedback: '뇌는 훈련할수록 발전해!\n"아직"이라는 단어를 기억해.' },
      { type: 'multipleChoice', question: '성장 마인드셋의 핵심 단어는?', options: ['절대', '원래', '아직', '이미'], correctIndex: 2, explanation: '"아직"이 가능성의 문을 열어줘!' },
      { type: 'feedback', summary: '성장 마인드셋 = "못한다"→"아직 못한다"', message: '"아직"이라는 단어를 자주 쓰자!' },
      { type: 'mission', mission: '"못한다"를 "아직 못한다"로 바꿔 말해보기', encouragement: '마인드셋이 바뀌면 인생이 바뀌어!' },
    ],
  },

  'humanities-platinum-5': {
    id: 'humanities-platinum-5', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 5,
    title: '세종대왕 - 백성을 위한 혁신',
    cards: [
      { type: 'concept', title: '모든 사람이 배울 수 있도록', description: '한자는 너무 어려워서\n백성 대부분이 글을 못 읽었어.\n\n세종은 "모든 백성이 쉽게 배울 수 있는\n글자"를 만들었지. 이것이 한글!\n약자를 위한 혁신이 진정한 리더십.' },
      { type: 'summary', keywords: [
        { icon: '👑', label: '세종대왕', description: '한글 창제' },
        { icon: '📖', label: '한글', description: '쉽게 배울 수 있는 글자' },
        { icon: '❤️', label: '애민정신', description: '백성을 사랑하는 마음' },
        { icon: '💡', label: '혁신', description: '약자를 위한 변화' },
      ]},
      { type: 'example', bad: { label: '자기만 생각', story: '"나만 잘하면 돼."\n주변 사람의 어려움에 무관심했다.' }, good: { label: '세종의 마음', story: '"어떻게 하면 모두가 배울 수 있을까?"\n다른 사람을 생각하니 더 좋은 답이 나왔다.' }},
      { type: 'ox', statement: '리더는 가장 뛰어난 사람이어야 한다.', answer: false, feedback: '리더는 다른 사람을 돕는 사람이야!\n세종은 백성을 위해 혁신했어.' },
      { type: 'multipleChoice', question: '세종이 한글을 만든 이유는?', options: ['학자들을 위해', '중국과 차별화', '모든 백성이 쉽게 배우도록', '외교를 위해'], correctIndex: 2, explanation: '모든 사람이 배울 수 있도록 한 것!' },
      { type: 'feedback', summary: '세종 = 약자를 위한 혁신이 진정한 리더십', message: '남을 생각하는 것이 진짜 리더!' },
      { type: 'mission', mission: '주변에서 도움이 필요한 사람 돕기', encouragement: '작은 도움이 큰 변화를 만들어!' },
    ],
  },

  'humanities-platinum-6': {
    id: 'humanities-platinum-6', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 6,
    title: '다산 정약용 - 실천하는 지식',
    cards: [
      { type: 'concept', title: '아는 것을 행동으로 옮기자', description: '정약용은 유배 18년 동안\n500여 권의 책을 썼어!\n\n핵심: "앎은 실천을 위한 것이다."\n아무리 알아도 행동 없으면 의미 없어.' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '정약용', description: '조선 최고 실학자' },
        { icon: '✍️', label: '500권', description: '유배 중 저술' },
        { icon: '🏃', label: '실천', description: '아는 것을 행동으로' },
        { icon: '📝', label: '기록', description: '매일 기록하는 습관' },
      ]},
      { type: 'example', bad: { label: '아는 것만', story: '"알고는 있어..." 하지만 행동하지 않았다.\n결국 아무것도 바뀌지 않았다.' }, good: { label: '실천', story: '배운 것을 바로 실천했다.\n작은 행동이 쌓여 큰 변화가 됐다.' }},
      { type: 'ox', statement: '많이 알면 자연히 잘하게 된다.', answer: false, feedback: '알아도 실천 안 하면 소용없어!\n행동으로 옮겨야 진짜 내 것이 돼.' },
      { type: 'multipleChoice', question: '정약용의 핵심 사상은?', options: ['많이 읽기', '앎은 실천을 위한 것', '혼자 공부하기', '어려운 책 읽기'], correctIndex: 1, explanation: '앎의 목적은 실천이야!' },
      { type: 'feedback', summary: '다산 = 아는 것을 실천으로 옮기기', message: '오늘 배운 걸 오늘 실천하자!' },
      { type: 'mission', mission: '오늘 배운 것 하나를 바로 실천하기', encouragement: '실천이 진짜 공부야!' },
    ],
  },

  'humanities-platinum-7': {
    id: 'humanities-platinum-7', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 7,
    title: '아리스토텔레스 - 중용의 덕',
    cards: [
      { type: 'concept', title: '극단이 아닌 균형에서 최선을', description: '아리스토텔레스의 중용 사상:\n극단 사이의 적절한 균형이 최선이야.\n\n무모함↔비겁함 → 용기(중용)\n방탕↔인색 → 절제(중용)\n상황에 맞는 최적점을 찾는 것!' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '중용', description: '극단 사이의 균형' },
        { icon: '🎯', label: '최적점', description: '상황에 맞는 최선' },
        { icon: '💪', label: '용기', description: '무모함과 비겁함 사이' },
        { icon: '🧘', label: '절제', description: '균형 잡힌 삶' },
      ]},
      { type: 'example', bad: { label: '극단', story: '"밤새 공부하자!" 다음 날 탈진.\n극단적 행동은 오래 못 가.' }, good: { label: '중용', story: '적절한 공부와 휴식의 균형.\n꾸준히 유지할 수 있었다.' }},
      { type: 'ox', statement: '중용은 그냥 중간을 택하는 것이다.', answer: false, feedback: '단순 중간이 아니라\n상황에 맞는 "최적점"을 찾는 거야!' },
      { type: 'multipleChoice', question: '중용에서 "용기"란?', options: ['무모하게 행동', '아무것도 안 함', '무모함과 비겁함 사이의 균형', '남의 말 따르기'], correctIndex: 2, explanation: '극단 사이에서 상황에 맞는 최선!' },
      { type: 'feedback', summary: '중용 = 극단이 아닌 상황별 최적 균형', message: '균형 잡힌 삶이 가장 강해!' },
      { type: 'mission', mission: '생활에서 극단을 피하고 균형점 찾아보기', encouragement: '균형이 곧 지혜야!' },
    ],
  },

  'humanities-platinum-8': {
    id: 'humanities-platinum-8', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 8,
    title: '빅터 프랭클 - 삶의 의미',
    cards: [
      { type: 'concept', title: '어떤 상황에서도 의미를 찾을 수 있다', description: '나치 수용소에서 살아남은 정신과 의사.\n\n"모든 것을 빼앗길 수 있지만\n태도를 선택할 자유는 빼앗길 수 없다."\n\n의미를 찾는 사람은 버틸 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '프랭클', description: '의미 치료 창시자' },
        { icon: '🔑', label: '태도 선택', description: '상황은 못 바꿔도 태도는 가능' },
        { icon: '💡', label: '의미 찾기', description: '어디서든 의미 발견' },
        { icon: '💪', label: '회복력', description: '의미가 버티는 힘' },
      ]},
      { type: 'example', bad: { label: '의미 상실', story: '"왜 이런 일이..." 좌절만 했다.\n앞으로 나아갈 힘을 잃었다.' }, good: { label: '의미 발견', story: '"이 경험에서 뭘 배울 수 있을까?"\n의미를 찾으니 다시 일어설 수 있었다.' }},
      { type: 'ox', statement: '힘든 상황에서는 긍정적 태도가 불가능하다.', answer: false, feedback: '프랭클은 최악의 상황에서도\n태도를 선택할 수 있다고 증명했어!' },
      { type: 'multipleChoice', question: '프랭클이 강조한 "빼앗길 수 없는 것"은?', options: ['재산', '건강', '태도를 선택할 자유', '지식'], correctIndex: 2, explanation: '상황에 대한 태도는 언제나 내가 선택!' },
      { type: 'feedback', summary: '프랭클 = 어떤 상황에서도 태도는 선택 가능', message: '의미를 찾는 사람은 무엇이든 견뎌!' },
      { type: 'mission', mission: '힘든 경험에서 배운 점 하나 적어보기', encouragement: '모든 경험에는 의미가 있어!' },
    ],
  },

  'humanities-platinum-9': {
    id: 'humanities-platinum-9', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 9,
    title: '간디 - 변화는 나부터',
    cards: [
      { type: 'concept', title: '세상에서 보고 싶은 변화가 되어라', description: '간디의 명언:\n"Be the change you wish\nto see in the world."\n\n남을 바꾸려 하지 않고\n자신이 먼저 변화의 본보기가 됐어.' },
      { type: 'summary', keywords: [
        { icon: '🕊️', label: '간디', description: '인도 독립의 아버지' },
        { icon: '🪞', label: '솔선수범', description: '내가 먼저 변하기' },
        { icon: '✌️', label: '비폭력', description: '평화로운 저항' },
        { icon: '🌱', label: '나부터', description: '변화는 나에서 시작' },
      ]},
      { type: 'example', bad: { label: '남 탓', story: '"저 사람이 먼저 바뀌어야 해."\n아무도 먼저 안 바뀌니 아무 변화 없다.' }, good: { label: '나부터', story: '"내가 먼저 바뀌자."\n내가 변하니 주변도 따라 변했다.' }},
      { type: 'ox', statement: '세상을 바꾸려면 큰 힘이 필요하다.', answer: false, feedback: '간디는 한 사람의 변화로 시작했어!\n나부터 바뀌면 세상이 바뀌어.' },
      { type: 'multipleChoice', question: '간디의 핵심 메시지는?', options: ['힘으로 저항하라', '변화는 나부터 시작', '법을 바꿔라', '다수의 힘을 모아라'], correctIndex: 1, explanation: '내가 먼저 변화의 모범이 되는 것!' },
      { type: 'feedback', summary: '간디 = 변화는 나부터 시작', message: '내가 바뀌면 세상이 바뀌어!' },
      { type: 'mission', mission: '바꾸고 싶은 것을 "내가 먼저" 실천하기', encouragement: '작은 실천이 큰 변화의 씨앗!' },
    ],
  },

  'humanities-platinum-10': {
    id: 'humanities-platinum-10', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 10,
    title: '헬렌 켈러 - 한계를 넘는 의지',
    cards: [
      { type: 'concept', title: '불가능을 가능으로 바꾼 사람', description: '생후 19개월에 시각·청각을 잃었지만\n끈기로 대학 졸업, 작가, 사회운동가가 됐어.\n\n"불가능이란 아직 방법을\n모르는 것일 뿐!"' },
      { type: 'summary', keywords: [
        { icon: '👩', label: '헬렌 켈러', description: '불가능을 넘은 사람' },
        { icon: '💪', label: '끈기', description: '포기하지 않는 의지' },
        { icon: '🌟', label: '가능성', description: '한계는 마음에 있다' },
        { icon: '🤝', label: '도움', description: '설리번 선생님의 지원' },
      ]},
      { type: 'example', bad: { label: '포기', story: '"난 안 돼..." 시도도 안 하고 포기.\n가능성을 스스로 닫았다.' }, good: { label: '도전', story: '"방법을 찾아보자!"\n어려워도 포기하지 않으니 길이 보였다.' }},
      { type: 'ox', statement: '한계가 있으면 성공할 수 없다.', answer: false, feedback: '헬렌 켈러가 증명했어!\n한계는 넘을 수 있는 것이야.' },
      { type: 'multipleChoice', question: '헬렌 켈러가 보여준 핵심 가치는?', options: ['타고난 재능', '한계를 넘는 끈기와 의지', '운이 좋았음', '특별한 교육'], correctIndex: 1, explanation: '포기하지 않는 의지가 불가능을 가능으로!' },
      { type: 'feedback', summary: '헬렌 켈러 = 한계는 마음에만 존재', message: '불가능은 아직 방법을 모르는 것!' },
      { type: 'mission', mission: '"나는 안 돼"를 "방법을 찾아보자"로 바꾸기', encouragement: '네 안에 무한한 가능성이 있어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (성장과 리더십) 1~10
  // ═══════════════════════════════════════

  'humanities-diamond-1': {
    id: 'humanities-diamond-1', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 1,
    title: '자기 리더십',
    cards: [
      { type: 'concept', title: '나를 이끄는 힘', description: '자기 리더십이란\n스스로 목표를 세우고, 실행하고,\n점검하는 능력이야.\n\n남이 시켜서가 아니라\n내가 원해서 움직이는 힘!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '목표 설정', description: '스스로 방향 정하기' },
        { icon: '🏃', label: '자기 실행', description: '스스로 행동하기' },
        { icon: '🪞', label: '자기 점검', description: '스스로 돌아보기' },
        { icon: '💪', label: '주도성', description: '내가 먼저 움직이기' },
      ]},
      { type: 'example', bad: { label: '수동적', story: '"누가 시켜야 하는데..."\n스스로 시작하지 못해 늘 뒤처졌다.' }, good: { label: '자기 리더십', story: '스스로 계획 세우고 실행.\n누가 안 시켜도 꾸준히 성장했다.' }},
      { type: 'ox', statement: '리더십은 리더만 필요한 것이다.', answer: false, feedback: '자기 리더십은 누구에게나 필요해!\n나를 이끄는 힘이 모든 성공의 기본.' },
      { type: 'multipleChoice', question: '자기 리더십의 핵심은?', options: ['남을 이끌기', '스스로 목표·실행·점검', '시키는 것 잘하기', '경쟁에서 이기기'], correctIndex: 1, explanation: '스스로 이끄는 것이 자기 리더십!' },
      { type: 'feedback', summary: '자기 리더십 = 스스로 목표+실행+점검', message: '나를 이끌 수 있으면 뭐든 할 수 있어!' },
      { type: 'mission', mission: '이번 주 목표를 스스로 세우고 실행하기', encouragement: '내가 나의 리더야!' },
    ],
  },

  'humanities-diamond-2': {
    id: 'humanities-diamond-2', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 2,
    title: '감성 지능 (EQ)',
    cards: [
      { type: 'concept', title: '마음의 근육 키우기', description: 'IQ보다 EQ가 성공을 더 잘 예측해.\n\n감성 지능 4요소:\n1️⃣ 자기 인식: 내 감정 알기\n2️⃣ 자기 조절: 감정 다루기\n3️⃣ 공감: 타인 이해\n4️⃣ 관계 관리: 좋은 관계 만들기' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 인식', description: '내 감정 알아차리기' },
        { icon: '🧘', label: '자기 조절', description: '감정 다루기' },
        { icon: '❤️', label: '공감', description: '타인 마음 이해' },
        { icon: '🤝', label: '관계 관리', description: '좋은 관계 만들기' },
      ]},
      { type: 'example', bad: { label: '낮은 EQ', story: '화가 나면 바로 폭발.\n관계가 자꾸 나빠졌다.' }, good: { label: '높은 EQ', story: '"지금 화가 나는구나" 인식하고 잠시 멈춤.\n차분히 대화하니 관계가 좋아졌다.' }},
      { type: 'ox', statement: '감정은 통제할 수 없다.', answer: false, feedback: '감정도 근육처럼 훈련할 수 있어!\n인식→조절이 핵심이야.' },
      { type: 'multipleChoice', question: 'EQ의 첫 단계는?', options: ['남을 이해하기', '내 감정 인식하기', '감정 숨기기', '긍정적으로 바꾸기'], correctIndex: 1, explanation: '내 감정을 먼저 알아야 조절할 수 있어!' },
      { type: 'feedback', summary: 'EQ = 자기인식→자기조절→공감→관계관리', message: '감정을 아는 것이 성장의 시작!' },
      { type: 'mission', mission: '오늘 느낀 감정 3가지를 이름 붙여보기', encouragement: '감정을 알면 마음이 편해져!' },
    ],
  },

  'humanities-diamond-3': {
    id: 'humanities-diamond-3', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 3,
    title: '회복탄력성',
    cards: [
      { type: 'concept', title: '넘어져도 다시 일어나는 힘', description: '회복탄력성이란\n어려움 후 다시 일어나는 능력이야.\n\n강한 사람은 안 넘어지는 게 아니라\n넘어져도 다시 일어나는 사람!' },
      { type: 'summary', keywords: [
        { icon: '🌱', label: '회복', description: '다시 일어나는 힘' },
        { icon: '📚', label: '실패=배움', description: '실패에서 배우기' },
        { icon: '🤝', label: '도움 요청', description: '혼자 안 해도 돼' },
        { icon: '🌈', label: '긍정적 미래', description: '좋아질 거라 믿기' },
      ]},
      { type: 'example', bad: { label: '포기', story: '시험에서 떨어지자 "나는 안 돼."\n다시 도전하지 않았다.' }, good: { label: '회복', story: '"이번엔 아쉬웠지만 다음엔 다르게 해보자."\n실패에서 배우고 다시 도전했다.' }},
      { type: 'ox', statement: '강한 사람은 실패하지 않는다.', answer: false, feedback: '강한 사람도 실패해!\n차이는 다시 일어나는 능력이야.' },
      { type: 'multipleChoice', question: '회복탄력성이 높은 사람의 특징은?', options: ['실패를 안 한다', '감정을 숨긴다', '실패를 배움으로 본다', '혼자 해결한다'], correctIndex: 2, explanation: '실패를 배움의 기회로 보는 것!' },
      { type: 'feedback', summary: '회복탄력성 = 넘어져도 다시 일어나는 힘', message: '넘어질 때마다 더 강해져!' },
      { type: 'mission', mission: '과거 실패에서 배운 점 하나 적기', encouragement: '모든 실패는 성장의 밑거름!' },
    ],
  },

  'humanities-diamond-4': {
    id: 'humanities-diamond-4', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 4,
    title: '그릿 (GRIT) - 열정과 끈기',
    cards: [
      { type: 'concept', title: '장기 목표를 향한 열정 + 끈기', description: '성공의 가장 큰 예측 변수는\n재능도 IQ도 아닌 그릿이야.\n\nGRIT = 배짱 + 회복력\n+ 주도성 + 끈기\n재능 없어도 그릿 있으면 해낸다!' },
      { type: 'summary', keywords: [
        { icon: '🔥', label: '열정', description: '장기 목표에 대한 불꽃' },
        { icon: '💎', label: '끈기', description: '포기하지 않는 힘' },
        { icon: '📈', label: '꾸준함', description: '매일 조금씩 전진' },
        { icon: '🏆', label: '장기전', description: '결국 해내는 사람' },
      ]},
      { type: 'example', bad: { label: '재능만 믿기', story: '재능이 있어서 처음엔 잘했지만\n어려워지자 노력을 안 해서 멈췄다.' }, good: { label: '그릿', story: '재능은 보통이지만 매일 꾸준히 연습.\n결국 재능 있는 사람을 넘어섰다.' }},
      { type: 'ox', statement: '재능이 가장 중요한 성공 요인이다.', answer: false, feedback: '재능보다 열정+끈기(그릿)가\n성공을 더 잘 예측해!' },
      { type: 'multipleChoice', question: '그릿의 구성요소가 아닌 것은?', options: ['열정', '끈기', '타고난 재능', '회복력'], correctIndex: 2, explanation: '그릿은 노력의 영역이야. 재능이 아니라!' },
      { type: 'feedback', summary: 'GRIT = 열정 + 끈기 → 결국 해내는 힘', message: '포기하지 않으면 결국 해낸다!' },
      { type: 'mission', mission: '포기하고 싶을 때 "한 번만 더" 해보기', encouragement: '끈기가 천재를 이긴다!' },
    ],
  },

  'humanities-diamond-5': {
    id: 'humanities-diamond-5', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 5,
    title: '지연 만족 - 마시멜로 실험',
    cards: [
      { type: 'concept', title: '지금 참으면 더 큰 보상', description: '"지금 1개 먹거나 15분 참으면 2개"\n\n참은 아이들이 수십 년 후 더 성공했어.\n핵심은 의지력이 아니라\n유혹에서 주의를 돌리는 "전략"이야!' },
      { type: 'summary', keywords: [
        { icon: '🍬', label: '마시멜로', description: '유명한 자기통제 실험' },
        { icon: '⏳', label: '지연 만족', description: '지금 참고 나중에 더' },
        { icon: '🧠', label: '전략', description: '주의를 돌리는 방법' },
        { icon: '🏆', label: '장기 보상', description: '참을수록 큰 결과' },
      ]},
      { type: 'example', bad: { label: '즉각 만족', story: '공부 대신 게임을 선택.\n당장은 즐겁지만 시험에서 후회했다.' }, good: { label: '지연 만족', story: '"1시간만 공부하고 게임하자."\n계획대로 하니 성적도 오르고 게임도 즐겼다.' }},
      { type: 'ox', statement: '지연 만족은 순수한 의지력이다.', answer: false, feedback: '의지력보다 "전략"이 핵심!\n유혹을 피하는 환경을 만드는 거야.' },
      { type: 'multipleChoice', question: '마시멜로 실험의 핵심 교훈은?', options: ['참기만 하면 된다', '전략적으로 유혹을 관리하기', '의지력이 전부', '보상을 포기하기'], correctIndex: 1, explanation: '전략적으로 유혹을 관리하는 게 핵심!' },
      { type: 'feedback', summary: '지연 만족 = 전략적 유혹 관리 → 큰 보상', message: '전략이 의지력을 이겨!' },
      { type: 'mission', mission: '유혹이 올 때 "5분만 기다리기" 실천하기', encouragement: '참을수록 더 큰 보상이 온다!' },
    ],
  },

  'humanities-diamond-6': {
    id: 'humanities-diamond-6', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 6,
    title: '몰입 (Flow) - 최고의 집중',
    cards: [
      { type: 'concept', title: '시간도 잊는 최고의 경험', description: '플로우(Flow)란 도전과 실력이\n딱 맞을 때 빠져드는 최적 경험.\n\n너무 쉬우면 지루, 너무 어려우면 불안.\n딱 맞으면 몰입!' },
      { type: 'summary', keywords: [
        { icon: '🌊', label: '몰입', description: '시간을 잊는 집중' },
        { icon: '⚖️', label: '도전=실력', description: '딱 맞는 난이도' },
        { icon: '🎯', label: '명확한 목표', description: '뭘 할지 분명히' },
        { icon: '💬', label: '즉각 피드백', description: '바로 결과 확인' },
      ]},
      { type: 'example', bad: { label: '지루함', story: '너무 쉬운 문제만 풀었다.\n지루하고 성장이 없었다.' }, good: { label: '몰입', story: '살짝 어려운 문제에 도전.\n시간 가는 줄 모르고 몰입했다.' }},
      { type: 'ox', statement: '몰입은 저절로 되는 것이다.', answer: false, feedback: '명확한 목표 + 적절한 난이도 +\n피드백이 있으면 몰입이 가능해!' },
      { type: 'multipleChoice', question: '몰입의 핵심 조건은?', options: ['쉬운 과제', '도전과 실력이 균형', '오랜 시간 투자', '보상이 큰 과제'], correctIndex: 1, explanation: '약간 어려운 수준이 몰입을 만들어!' },
      { type: 'feedback', summary: '몰입 = 도전≈실력 + 목표 + 피드백', message: '약간 어려운 도전이 최고의 경험!' },
      { type: 'mission', mission: '살짝 어려운 과제에 도전해서 몰입 경험하기', encouragement: '몰입이 진짜 성장을 만들어!' },
    ],
  },

  'humanities-diamond-7': {
    id: 'humanities-diamond-7', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 7,
    title: '이타심의 과학',
    cards: [
      { type: 'concept', title: '남을 도우면 나도 행복해진다', description: '남을 도울 때 옥시토신이 분비되고\n행복감이 증가해.\n\n이것을 "헬퍼스 하이"라고 해.\n이타심은 과학적으로 검증된 행복 전략!' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '이타심', description: '남을 돕는 마음' },
        { icon: '🧪', label: '헬퍼스 하이', description: '도울 때 행복 호르몬' },
        { icon: '😊', label: '행복 증가', description: '돕는 사람이 더 행복' },
        { icon: '💪', label: '건강 향상', description: '봉사자 수명이 더 길다' },
      ]},
      { type: 'example', bad: { label: '이기적 사고', story: '"내 일만 하면 되지."\n점점 외로워지고 의미를 잃었다.' }, good: { label: '이타심', story: '친구 공부를 도와줬더니\n오히려 내 이해도가 깊어지고 행복해졌다.' }},
      { type: 'ox', statement: '남을 도우면 내가 손해다.', answer: false, feedback: '도움은 양쪽 모두에게 이익!\n헬퍼스 하이가 과학적 증거야.' },
      { type: 'multipleChoice', question: '이타심의 과학적 효과는?', options: ['스트레스 증가', '옥시토신 분비와 행복감 증가', '에너지 소모', '시간 낭비'], correctIndex: 1, explanation: '도울 때 행복 호르몬이 분비돼!' },
      { type: 'feedback', summary: '이타심 = 돕는 것이 곧 행복의 전략', message: '돕는 사람이 가장 행복한 사람!' },
      { type: 'mission', mission: '오늘 누군가를 한 가지 도와주기', encouragement: '작은 도움이 큰 행복을 만들어!' },
    ],
  },

  'humanities-diamond-8': {
    id: 'humanities-diamond-8', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 8,
    title: '독서의 힘 - 평생 학습',
    cards: [
      { type: 'concept', title: '다른 사람의 인생을 빌려 경험하는 법', description: '독서는:\n📚 수천 년 지혜를 몇 시간에 흡수\n🧠 사고력과 집중력 향상\n❤️ 공감 능력 발달\n\n가장 비용 대비 효과적인 자기 투자!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '독서', description: '최고의 자기 투자' },
        { icon: '🧠', label: '사고력', description: '깊이 생각하는 힘' },
        { icon: '❤️', label: '공감', description: '다른 삶 간접 경험' },
        { icon: '🌍', label: '시야 확장', description: '세상을 넓게 보기' },
      ]},
      { type: 'example', bad: { label: '독서 안 함', story: '"책 읽을 시간 없어."\nSNS에는 시간을 쓰면서 책은 안 읽었다.' }, good: { label: '독서 습관', story: '하루 20분 독서로 시작.\n1년에 20권, 시야가 넓어졌다.' }},
      { type: 'ox', statement: '독서는 시간 낭비다.', answer: false, feedback: '독서는 가장 효율적인 학습법!\n위대한 사람들의 공통점이 독서야.' },
      { type: 'multipleChoice', question: '독서의 가장 큰 효과는?', options: ['시험 점수 올리기', '간접 경험과 사고력 확장', '잠이 잘 옴', '시간 보내기'], correctIndex: 1, explanation: '다른 사람의 경험과 지혜를 흡수!' },
      { type: 'feedback', summary: '독서 = 최고의 자기 투자', message: '한 권이 인생을 바꿀 수 있어!' },
      { type: 'mission', mission: '관심 분야 책 하나 골라서 10페이지 읽기', encouragement: '10페이지가 시작이야!' },
    ],
  },

  'humanities-diamond-9': {
    id: 'humanities-diamond-9', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 9,
    title: '글쓰기의 힘',
    cards: [
      { type: 'concept', title: '생각을 정리하는 최고의 도구', description: '글을 쓰면:\n✏️ 생각이 정리돼\n🧠 이해가 깊어져\n💪 표현력이 커져\n\n머릿속 생각은 흐릿하지만\n글로 적는 순간 선명해져!' },
      { type: 'summary', keywords: [
        { icon: '✏️', label: '글쓰기', description: '생각 정리 도구' },
        { icon: '🧠', label: '이해 심화', description: '쓰면서 깊어지는 이해' },
        { icon: '🪞', label: '자기 성찰', description: '나를 돌아보기' },
        { icon: '💬', label: '표현력', description: '생각을 전달하는 힘' },
      ]},
      { type: 'example', bad: { label: '머릿속만', story: '생각이 많은데 정리가 안 됐다.\n뭘 해야 할지 혼란스러웠다.' }, good: { label: '글쓰기', story: '생각을 글로 적었더니 정리됐다.\n뭘 해야 할지 명확해졌다.' }},
      { type: 'ox', statement: '글쓰기는 작가만 필요한 능력이다.', answer: false, feedback: '글쓰기는 생각 정리 도구야!\n누구에게나 유용해.' },
      { type: 'multipleChoice', question: '글쓰기의 핵심 효과는?', options: ['맞춤법 향상', '흩어진 생각을 정리', '손 힘 기르기', '독서량 늘리기'], correctIndex: 1, explanation: '글로 적으면 생각이 선명해져!' },
      { type: 'feedback', summary: '글쓰기 = 생각을 선명하게 만드는 마법', message: '적는 순간 생각이 정리돼!' },
      { type: 'mission', mission: '오늘 느낀 점이나 배운 것을 5줄로 적기', encouragement: '5줄이 사고력을 키워줘!' },
    ],
  },

  'humanities-diamond-10': {
    id: 'humanities-diamond-10', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 10,
    title: '나만의 철학 만들기',
    cards: [
      { type: 'concept', title: '지금까지의 지혜를 통합하자', description: '50단계의 여정을 해냈어!\n학습법, 사고법, 인문학 지혜...\n\n이 모든 것을 통합해서\n"나만의 철학"을 만들 시간이야.\n나의 핵심 가치는 뭘까?' },
      { type: 'summary', keywords: [
        { icon: '🧭', label: '나침반', description: '나만의 방향 찾기' },
        { icon: '💎', label: '핵심 가치', description: '가장 중요한 것' },
        { icon: '🌟', label: '비전', description: '되고 싶은 나' },
        { icon: '📝', label: '철학 정리', description: '한 문장으로 나를 표현' },
      ]},
      { type: 'example', bad: { label: '방향 없음', story: '남들 따라 이것저것 했지만\n뭐가 중요한지 모르겠다.' }, good: { label: '나만의 철학', story: '"나는 꾸준함으로 성장하는 사람이다."\n나침반이 생기니 흔들리지 않았다.' }},
      { type: 'ox', statement: '철학은 어른만 가질 수 있다.', answer: false, feedback: '지금부터 자기 철학을 만들 수 있어!\n일찍 시작할수록 좋아.' },
      { type: 'multipleChoice', question: '나만의 철학이 필요한 이유는?', options: ['남에게 보여주기', '인생의 나침반이 되기', '시험에 도움', '자랑하기'], correctIndex: 1, explanation: '나침반이 있으면 흔들리지 않아!' },
      { type: 'feedback', summary: '나만의 철학 = 인생의 나침반', message: '50단계를 완주한 너, 정말 대단해!' },
      { type: 'mission', mission: '"나는 ___한 사람이다" 한 문장 완성하기', encouragement: '이 한 문장이 너의 나침반이 될 거야!' },
    ],
  },

}
