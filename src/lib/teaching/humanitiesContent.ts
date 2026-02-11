// 인문 영역 전체 학습 콘텐츠 (브론즈 2 ~ 다이아 10)
import type { Stage } from './lessonData'

export const HUMANITIES_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (기초 학습력) 1~10
  // ═══════════════════════════════════════

  'humanities-bronze-1': {
    id: 'humanities-bronze-1',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 1,
    title: '이해하며 생각하는 힘',
    cards: [
      { type: 'concept', title: '인지 역량이란?', description: '인지 역량이란, 정보를 이해하고 연결하며\n스스로 생각하는 힘이야.\n\n단순히 외우는 게 아니라,\n"왜?"라고 질문하고 깊이 이해하는 능력이지.' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '사고력', description: '깊이 생각하는 힘' },
        { icon: '🔗', label: '연결력', description: '정보를 연결하는 힘' },
        { icon: '❓', label: '질문력', description: '좋은 질문을 만드는 힘' },
        { icon: '💡', label: '이해력', description: '핵심을 파악하는 힘' },
      ]},
      { type: 'example', bad: { label: '민수의 방법', story: '교과서를 그냥 외웠다.\n시험이 끝나자 다 잊어버렸다.' }, good: { label: '지은이의 방법', story: '"왜 이렇게 될까?" 하고 질문하며 읽었다.\n자기 말로 설명할 수 있게 됐다.' }},
      { type: 'ox', statement: '인지 역량은 타고나는 것이라 바꿀 수 없다.', answer: false, feedback: '인지 역량은 훈련으로 키울 수 있어!\n생각하는 습관이 곧 인지 역량이야.' },
      { type: 'multipleChoice', question: '인지 역량이 높은 사람의 특징은?', options: ['무조건 많이 외운다', '남의 생각을 그대로 따른다', '스스로 질문하고 연결하며 이해한다', '정답만 빨리 찾는다'], correctIndex: 2, explanation: '인지 역량은 단순 암기가 아니라,\n이해하고 연결하고 질문하는 과정이야.' },
      { type: 'feedback', summary: '인지 역량 = 이해 + 연결 + 질문', message: '너는 이미 생각하는 힘을 가지고 있어.\n오늘 한 걸음 더 성장했어!' },
      { type: 'mission', mission: '오늘 하루, 수업이나 책을 읽을 때\n"왜?" 라고 한 번 질문해보기', encouragement: '작은 질문 하나가 큰 변화의 시작이야!' },
    ],
  },

  'humanities-bronze-2': {
    id: 'humanities-bronze-2',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 2,
    title: '집중력의 비밀 - 포모도로',
    cards: [
      {
        type: 'concept',
        title: '포모도로 기법이란?',
        description: '25분 집중 + 5분 휴식을 반복하는 시간 관리법이야.\n\n이탈리아어로 "토마토"라는 뜻인데,\n토마토 모양 타이머에서 유래했어.\n\n뇌는 한 번에 오래 집중하기 어렵거든.\n짧게 끊어서 집중하면 훨씬 효율이 높아져!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '⏱️', label: '25분 집중', description: '한 가지에만 몰두하는 시간' },
          { icon: '☕', label: '5분 휴식', description: '뇌를 쉬게 하는 리셋 타임' },
          { icon: '🔄', label: '4세트 반복', description: '4번 하면 긴 휴식 15~30분' },
          { icon: '🎯', label: '단일 과제', description: '한 번에 하나만 집중!' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '준호의 방법',
          story: '3시간 동안 쉬지 않고 공부했다.\n1시간 지나자 집중이 안 되고\n나머지 2시간은 멍하니 보냈다.',
        },
        good: {
          label: '수아의 방법',
          story: '25분 타이머를 맞추고 공부했다.\n5분 쉬고 다시 25분.\n2시간 동안 실제로 집중한 시간이 더 많았다.',
        },
      },
      {
        type: 'ox',
        statement: '집중력은 오래 유지할수록 좋다.',
        answer: false,
        feedback: '뇌는 보통 25~30분이 집중의 한계야.\n짧게 끊어서 반복하는 게 훨씬 효과적이야!',
      },
      {
        type: 'multipleChoice',
        question: '포모도로 기법의 핵심 원리는?',
        options: [
          '최대한 오래 집중한다',
          '짧은 집중과 규칙적 휴식을 반복한다',
          '쉬는 시간 없이 공부한다',
          '하루에 한 과목만 공부한다',
        ],
        correctIndex: 1,
        explanation: '25분 집중 + 5분 휴식의 반복이\n포모도로의 핵심이야.\n뇌에게 적절한 리듬을 주는 거지!',
      },
      {
        type: 'feedback',
        summary: '포모도로 = 25분 집중 + 5분 휴식 반복',
        message: '집중력은 근육처럼 훈련할 수 있어.\n오늘부터 타이머를 친구 삼아보자!',
      },
      {
        type: 'mission',
        mission: '오늘 공부할 때 25분 타이머를 맞추고\n한 과목에만 집중해보기',
        encouragement: '작은 타이머 하나가 공부 습관을 바꿔줄 거야!',
      },
    ],
  },

  'humanities-bronze-3': {
    id: 'humanities-bronze-3',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 3,
    title: '기억의 원리 - 망각곡선',
    cards: [
      {
        type: 'concept',
        title: '에빙하우스 망각곡선',
        description: '독일 심리학자 에빙하우스가 발견한 사실:\n\n배운 것의 70%를 24시간 내에 잊어버려.\n1주일 후엔 80% 이상 사라지지.\n\n하지만! 적절한 타이밍에 복습하면\n기억이 점점 강해져서 장기기억으로 바뀌어.',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📉', label: '망각곡선', description: '시간이 지나면 기억이 급격히 줄어듦' },
          { icon: '🔄', label: '복습 타이밍', description: '잊기 직전에 복습하면 효과 극대화' },
          { icon: '🧠', label: '장기기억', description: '반복 복습으로 영구 저장' },
          { icon: '📅', label: '1-3-7-30', description: '1일, 3일, 7일, 30일 후 복습' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '현우의 방법',
          story: '시험 전날 밤새 벼락치기를 했다.\n시험은 어떻게든 봤지만\n일주일 후 아무것도 기억나지 않았다.',
        },
        good: {
          label: '하은이의 방법',
          story: '배운 당일 10분, 3일 후 5분, 일주일 후 5분 복습했다.\n시험 전날은 가볍게 훑기만 해도 다 기억났다.',
        },
      },
      {
        type: 'ox',
        statement: '한 번 확실히 외우면 잘 잊히지 않는다.',
        answer: false,
        feedback: '아무리 열심히 외워도 복습하지 않으면\n빠르게 잊혀져. 복습이 핵심이야!',
      },
      {
        type: 'multipleChoice',
        question: '가장 효과적인 첫 번째 복습 시점은?',
        options: [
          '일주일 후',
          '한 달 후',
          '24시간 이내',
          '시험 전날',
        ],
        correctIndex: 2,
        explanation: '망각이 가장 빠른 24시간 이내에\n첫 복습을 하면 기억 유지율이 크게 올라가!',
      },
      {
        type: 'feedback',
        summary: '복습 타이밍이 기억의 열쇠',
        message: '벼락치기보다 조금씩 자주!\n이것만 기억해도 공부가 달라져.',
      },
      {
        type: 'mission',
        mission: '오늘 배운 내용을\n자기 전에 5분간 떠올려보기',
        encouragement: '5분의 복습이 5시간의 벼락치기보다 강해!',
      },
    ],
  },

  'humanities-bronze-4': {
    id: 'humanities-bronze-4',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 4,
    title: '66일의 마법 - 습관 형성',
    cards: [
      {
        type: 'concept',
        title: '66일 습관의 법칙',
        description: '런던 대학교 연구 결과,\n새로운 습관이 자동으로 되려면\n평균 66일이 걸려.\n\n강성태 공부법에서도 강조하는 것:\n"작게 시작해서 66일 꾸준히 하면\n뇌가 자동으로 움직인다."',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📆', label: '66일', description: '습관이 자동화되는 평균 기간' },
          { icon: '🌱', label: '작게 시작', description: '부담 없이 시작하는 것이 핵심' },
          { icon: '📈', label: '점진적 확장', description: '습관이 자리 잡으면 조금씩 늘리기' },
          { icon: '🔁', label: '매일 반복', description: '하루도 빠지지 않는 꾸준함' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '태민의 방법',
          story: '"매일 2시간 공부하겠다!" 선언했지만\n3일 만에 지쳐서 포기했다.\n이것을 매달 반복했다.',
        },
        good: {
          label: '서연이의 방법',
          story: '"매일 영단어 5개만 외우자" 시작했다.\n66일이 지나자 습관이 되어\n자연스럽게 10개, 15개로 늘렸다.',
        },
      },
      {
        type: 'ox',
        statement: '습관은 21일이면 완성된다.',
        answer: false,
        feedback: '21일은 오래된 속설이야.\n실제 연구에 따르면 평균 66일이 걸려.\n조급해하지 말고 꾸준히 가자!',
      },
      {
        type: 'multipleChoice',
        question: '66일 공부법의 핵심 원칙은?',
        options: [
          '매일 최대한 많이 공부한다',
          '작게 시작해서 매일 꾸준히 반복한다',
          '66일간 하루도 쉬지 않고 10시간 한다',
          '시험 기간에만 집중적으로 한다',
        ],
        correctIndex: 1,
        explanation: '핵심은 "작게 시작, 매일 반복"이야.\n부담을 줄이고 꾸준함을 유지하는 거지!',
      },
      {
        type: 'feedback',
        summary: '작게 시작 + 66일 반복 = 자동 습관',
        message: '작심삼일은 목표가 너무 커서야.\n아주 작게 시작하면 누구나 할 수 있어!',
      },
      {
        type: 'mission',
        mission: '앞으로 66일 동안 매일 할\n아주 작은 공부 습관 하나 정하기\n(예: 영단어 3개, 수학 1문제)',
        encouragement: '66일 후의 너는 지금과 완전히 다른 사람이야!',
      },
    ],
  },

  'humanities-bronze-5': {
    id: 'humanities-bronze-5',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 5,
    title: '메모의 기술 - 코넬 노트법',
    cards: [
      {
        type: 'concept',
        title: '코넬 노트법이란?',
        description: '미국 코넬 대학교에서 개발한 노트법이야.\n\n노트를 3칸으로 나눠:\n📝 오른쪽 넓은 칸: 수업 내용 필기\n❓ 왼쪽 좁은 칸: 핵심 키워드/질문\n📋 아래 칸: 전체 요약\n\n이렇게 정리하면 복습이 훨씬 쉬워져!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📝', label: '필기 영역', description: '수업 중 핵심 내용 적기' },
          { icon: '❓', label: '키워드 영역', description: '핵심 단어와 질문 정리' },
          { icon: '📋', label: '요약 영역', description: '전체 내용을 2~3줄로 요약' },
          { icon: '🔄', label: '복습 활용', description: '키워드만 보고 내용 떠올리기' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '민재의 방법',
          story: '선생님 말씀을 전부 받아적었다.\n나중에 보니 뭐가 중요한지 모르겠고\n복습할 엄두가 안 났다.',
        },
        good: {
          label: '지유의 방법',
          story: '코넬 노트로 핵심만 적고 키워드를 뽑았다.\n복습할 때 왼쪽 키워드만 보고\n오른쪽을 가리며 떠올리니 효과적이었다.',
        },
      },
      {
        type: 'ox',
        statement: '노트 필기는 많이 쓸수록 좋다.',
        answer: false,
        feedback: '많이 쓰는 것보다 핵심을 뽑아 정리하는 게 중요해.\n코넬 노트법은 "구조화"가 핵심이야!',
      },
      {
        type: 'multipleChoice',
        question: '코넬 노트의 3영역이 아닌 것은?',
        options: [
          '핵심 키워드 영역',
          '수업 내용 필기 영역',
          '개인 감상문 영역',
          '전체 요약 영역',
        ],
        correctIndex: 2,
        explanation: '코넬 노트는 필기/키워드/요약 3칸이야.\n감상문은 포함되지 않아!',
      },
      {
        type: 'feedback',
        summary: '코넬 노트 = 필기 + 키워드 + 요약',
        message: '정리된 노트는 최고의 복습 도구야.\n오늘부터 노트를 3칸으로 나눠보자!',
      },
      {
        type: 'mission',
        mission: '오늘 수업 하나를\n코넬 노트 형식으로 정리해보기',
        encouragement: '정리하는 순간 이미 한 번 복습한 거야!',
      },
    ],
  },

  'humanities-bronze-6': {
    id: 'humanities-bronze-6',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 6,
    title: '질문의 힘',
    cards: [
      {
        type: 'concept',
        title: '좋은 질문이 좋은 학습을 만든다',
        description: '아인슈타인은 이렇게 말했어:\n"중요한 것은 질문을 멈추지 않는 것이다."\n\n좋은 질문을 하면 뇌가 활성화되고\n정보를 더 깊이 처리하게 돼.\n\n"왜?", "어떻게?", "만약에?"\n이 세 가지 질문이 학습의 핵심이야.',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '❓', label: '왜?', description: '원인과 이유를 파고드는 질문' },
          { icon: '🔧', label: '어떻게?', description: '방법과 과정을 탐구하는 질문' },
          { icon: '💭', label: '만약에?', description: '가능성을 확장하는 질문' },
          { icon: '🔄', label: '다르게?', description: '새로운 관점을 여는 질문' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '성훈의 방법',
          story: '선생님이 설명하면 고개만 끄덕였다.\n질문 없이 넘어갔더니\n막상 문제를 풀 때 아무것도 기억나지 않았다.',
        },
        good: {
          label: '예린이의 방법',
          story: '"왜 이런 결과가 나오지?" 항상 질문했다.\n질문에 답을 찾는 과정에서\n개념이 머릿속에 단단히 자리잡았다.',
        },
      },
      {
        type: 'ox',
        statement: '질문이 많으면 공부를 못하는 것이다.',
        answer: false,
        feedback: '오히려 질문이 많을수록 깊이 배우고 있다는 증거야!\n질문은 학습의 엔진이야.',
      },
      {
        type: 'multipleChoice',
        question: '가장 깊은 학습을 이끄는 질문은?',
        options: [
          '"이거 시험에 나와요?"',
          '"왜 이런 결과가 나올까?"',
          '"정답이 뭐예요?"',
          '"외워야 할 부분이 어디예요?"',
        ],
        correctIndex: 1,
        explanation: '"왜?"라는 질문이 가장 깊은 이해를 만들어.\n이유를 알면 응용도 할 수 있거든!',
      },
      {
        type: 'feedback',
        summary: '질문 = 학습의 엔진',
        message: '좋은 질문을 만드는 사람이\n결국 가장 많이 배우는 사람이야!',
      },
      {
        type: 'mission',
        mission: '오늘 수업이나 독서 중\n"왜?"라는 질문 2개 만들어보기',
        encouragement: '질문하는 습관이 천재를 만든다!',
      },
    ],
  },

  'humanities-bronze-7': {
    id: 'humanities-bronze-7',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 7,
    title: '읽기의 기술 - SQ3R',
    cards: [
      {
        type: 'concept',
        title: 'SQ3R 독서법이란?',
        description: '미국 교육학자가 만든 5단계 독서법이야.\n\nS - Survey: 먼저 훑어보기\nQ - Question: 질문 만들기\nR - Read: 답을 찾으며 읽기\nR - Recite: 덮고 떠올리기\nR - Review: 전체 복습하기\n\n그냥 읽는 것보다 2배 이상 효과적이야!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '👀', label: 'Survey', description: '목차, 제목, 그림 먼저 훑기' },
          { icon: '❓', label: 'Question', description: '제목을 질문으로 바꾸기' },
          { icon: '📖', label: 'Read', description: '질문의 답을 찾으며 읽기' },
          { icon: '🗣️', label: 'Recite & Review', description: '덮고 떠올리기 + 전체 복습' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '동현의 방법',
          story: '교과서를 처음부터 끝까지 그냥 읽었다.\n읽긴 했는데 뭘 읽었는지\n기억이 잘 나지 않았다.',
        },
        good: {
          label: '소미의 방법',
          story: '먼저 목차를 훑고 질문을 만든 뒤\n답을 찾으며 읽었다.\n덮고 떠올리니 핵심이 잘 정리됐다.',
        },
      },
      {
        type: 'ox',
        statement: '책은 처음부터 끝까지 순서대로 읽어야 한다.',
        answer: false,
        feedback: '먼저 전체를 훑어보고(Survey)\n큰 그림을 파악한 후 읽는 게 더 효과적이야!',
      },
      {
        type: 'multipleChoice',
        question: 'SQ3R에서 가장 기억력을 높이는 단계는?',
        options: [
          'Survey (훑어보기)',
          'Question (질문 만들기)',
          'Recite (덮고 떠올리기)',
          'Read (읽기)',
        ],
        correctIndex: 2,
        explanation: '직접 떠올리는 Recite 단계가\n기억 정착에 가장 효과적이야!\n뇌가 능동적으로 작동하거든.',
      },
      {
        type: 'feedback',
        summary: 'SQ3R = 훑기→질문→읽기→떠올리기→복습',
        message: '읽기 전에 준비하고, 읽은 후에 정리하면\n같은 시간에 2배를 배울 수 있어!',
      },
      {
        type: 'mission',
        mission: '교과서 한 단원을\nSQ3R 5단계로 읽어보기',
        encouragement: '읽는 방법만 바꿔도 성적이 달라져!',
      },
    ],
  },

  'humanities-bronze-8': {
    id: 'humanities-bronze-8',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 8,
    title: '목표 설정 - SMART 원칙',
    cards: [
      {
        type: 'concept',
        title: 'SMART 목표 설정법',
        description: '막연한 목표는 실패하기 쉬워.\nSMART 원칙으로 구체적으로 세우자!\n\nS - Specific: 구체적으로\nM - Measurable: 측정 가능하게\nA - Achievable: 달성 가능하게\nR - Relevant: 관련 있게\nT - Time-bound: 기한을 정해서',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🎯', label: '구체적', description: '"열심히"가 아닌 "수학 30분"' },
          { icon: '📊', label: '측정 가능', description: '숫자로 확인할 수 있게' },
          { icon: '✅', label: '달성 가능', description: '현실적으로 할 수 있는 수준' },
          { icon: '⏰', label: '기한 설정', description: '언제까지 할지 명확하게' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '나쁜 목표',
          story: '"이번 학기 열심히 공부하겠다."\n→ 뭘, 얼마나, 언제까지?\n너무 막연해서 실천할 수 없었다.',
        },
        good: {
          label: '좋은 목표 (SMART)',
          story: '"이번 주 금요일까지 영단어 50개 외우기.\n매일 10개씩, 틀린 것은 다음 날 복습."\n→ 구체적이라 바로 실천할 수 있었다.',
        },
      },
      {
        type: 'ox',
        statement: '목표는 크고 높을수록 좋다.',
        answer: false,
        feedback: '너무 큰 목표는 포기하기 쉬워.\n달성 가능한 작은 목표부터 쌓아가는 게 좋아!',
      },
      {
        type: 'multipleChoice',
        question: 'SMART 목표의 예시는?',
        options: [
          '열심히 공부하기',
          '이번 주 영단어 50개 외우기',
          '최고가 되기',
          '공부를 잘하기',
        ],
        correctIndex: 1,
        explanation: '"이번 주 영단어 50개"는\n구체적이고, 측정 가능하고, 기한이 있는\nSMART 목표야!',
      },
      {
        type: 'feedback',
        summary: 'SMART = 구체적 + 측정가능 + 달성가능 + 기한',
        message: '목표를 SMART하게 세우면\n실천력이 완전히 달라져!',
      },
      {
        type: 'mission',
        mission: 'SMART 원칙으로\n이번 주 학습 목표 하나 세우기',
        encouragement: '좋은 목표가 좋은 결과를 만들어!',
      },
    ],
  },

  'humanities-bronze-9': {
    id: 'humanities-bronze-9',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 9,
    title: '시간 관리 - 우선순위 정하기',
    cards: [
      {
        type: 'concept',
        title: '아이젠하워 매트릭스',
        description: '미국 대통령 아이젠하워가 사용한 방법이야.\n\n할 일을 4칸으로 나눠:\n\n1️⃣ 긴급 + 중요 → 지금 바로 하기\n2️⃣ 중요하지만 안 긴급 → 계획 잡기\n3️⃣ 긴급하지만 안 중요 → 빨리 처리하기\n4️⃣ 둘 다 아님 → 안 해도 됨',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🔴', label: '긴급+중요', description: '지금 바로! (내일 시험)' },
          { icon: '🟡', label: '중요만', description: '미리 계획! (장기 목표)' },
          { icon: '🟠', label: '긴급만', description: '빨리 처리! (잡무)' },
          { icon: '⚪', label: '둘다 아님', description: '과감히 빼기! (시간낭비)' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '재현의 하루',
          story: '할 일이 쌓여서 뭐부터 할지 모르겠다.\n급한 것도, 중요한 것도 뒤죽박죽.\n결국 SNS만 하다가 하루가 끝났다.',
        },
        good: {
          label: '윤서의 하루',
          story: '아침에 할 일을 4칸에 나눠 적었다.\n중요한 것부터 처리하니\n시간이 남아 여유까지 생겼다.',
        },
      },
      {
        type: 'ox',
        statement: '급한 일이 항상 중요한 일이다.',
        answer: false,
        feedback: '급하지만 안 중요한 일도 많아!\n중요한 일을 구별하는 게 시간 관리의 핵심이야.',
      },
      {
        type: 'multipleChoice',
        question: '가장 먼저 집중해야 할 영역은?',
        options: [
          '긴급하지만 중요하지 않은 일',
          '긴급하고 중요한 일',
          '긴급하지도 중요하지도 않은 일',
          '중요하지만 긴급하지 않은 일',
        ],
        correctIndex: 1,
        explanation: '긴급하고 중요한 일을 먼저 처리하고,\n그 다음 "중요하지만 긴급하지 않은 일"에\n시간을 투자하는 게 현명한 거야!',
      },
      {
        type: 'feedback',
        summary: '우선순위 = 긴급/중요 4칸 구분',
        message: '시간은 모두에게 24시간.\n어떻게 쓰느냐가 차이를 만들어!',
      },
      {
        type: 'mission',
        mission: '오늘 할 일을 긴급/중요 기준으로\n4칸에 나눠 적어보기',
        encouragement: '정리하는 순간 마음도 가벼워져!',
      },
    ],
  },

  'humanities-bronze-10': {
    id: 'humanities-bronze-10',
    chapterKey: 'humanities',
    tierKey: 'bronze',
    stageNumber: 10,
    title: '작은 습관의 힘 - 2분 규칙',
    cards: [
      {
        type: 'concept',
        title: '2분 규칙',
        description: '제임스 클리어의 「아주 작은 습관의 힘」에서\n나온 강력한 원칙이야.\n\n"새로운 습관을 시작할 때\n2분 안에 끝낼 수 있는 크기로 줄여라."\n\n예: "매일 책 읽기" → "매일 1페이지 읽기"\n시작의 장벽을 낮추면 누구나 할 수 있어!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '⏱️', label: '2분 규칙', description: '2분 안에 끝낼 수 있게 줄이기' },
          { icon: '🚪', label: '시작이 반', description: '일단 시작하면 계속하게 돼' },
          { icon: '🌱', label: '작게 시작', description: '완벽하지 않아도 괜찮아' },
          { icon: '📈', label: '점진적 확장', description: '자연스럽게 양이 늘어남' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '큰 목표의 함정',
          story: '"매일 운동 1시간!" 선언했지만\n너무 부담스러워서 시작도 못하고\n3일 만에 포기했다.',
        },
        good: {
          label: '2분 규칙 적용',
          story: '"매일 팔굽혀펴기 2개"로 시작했다.\n2개만 하려 했는데 하다 보니 5개, 10개...\n어느새 운동이 습관이 되었다.',
        },
      },
      {
        type: 'ox',
        statement: '습관을 만들려면 처음부터 크게 해야 한다.',
        answer: false,
        feedback: '처음부터 크면 부담이 되어 포기하기 쉬워.\n아주 작게 시작하는 게 성공의 비결이야!',
      },
      {
        type: 'multipleChoice',
        question: '2분 규칙의 핵심 원리는?',
        options: [
          '2분 안에 모든 것을 끝내는 것',
          '시작의 장벽을 최대한 낮추는 것',
          '2분마다 쉬는 것',
          '빠르게 공부하는 것',
        ],
        correctIndex: 1,
        explanation: '핵심은 시작을 쉽게 만드는 거야.\n일단 시작하면 계속하게 되거든!',
      },
      {
        type: 'feedback',
        summary: '2분 규칙 = 시작의 장벽 낮추기',
        message: '브론즈 마지막 단계까지 왔어!\n작은 습관들이 모여 큰 변화를 만들어.',
      },
      {
        type: 'mission',
        mission: '하고 싶은 습관을 2분 버전으로 바꿔서\n오늘 당장 시작하기\n(예: 책 1페이지, 영단어 3개)',
        encouragement: '완벽하지 않아도 괜찮아. 시작이 가장 중요해!',
      },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (검증된 공부법) 1~10
  // ═══════════════════════════════════════

  'humanities-silver-1': {
    id: 'humanities-silver-1',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 1,
    title: '파인만 학습법',
    cards: [
      {
        type: 'concept',
        title: '설명할 수 있으면 진짜 아는 것',
        description: '노벨 물리학상 수상자 리처드 파인만의 학습법이야.\n\n1️⃣ 개념을 선택한다\n2️⃣ 초등학생에게 설명하듯 쉽게 풀어본다\n3️⃣ 막히는 부분을 찾아 다시 공부한다\n4️⃣ 더 간단하게 다듬는다\n\n어려운 말 없이 설명할 수 있으면 진짜 이해한 거야!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📚', label: '개념 선택', description: '배울 주제를 하나 정하기' },
          { icon: '👶', label: '쉽게 설명', description: '초등학생도 이해하게 풀어쓰기' },
          { icon: '🔍', label: '빈틈 찾기', description: '막히는 부분 = 모르는 부분' },
          { icon: '✂️', label: '단순화', description: '더 짧고 쉽게 다듬기' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '형식적 공부',
          story: '교과서의 어려운 용어를 그대로 외웠다.\n시험에서 응용 문제가 나오자\n전혀 풀 수 없었다.',
        },
        good: {
          label: '파인만 학습법',
          story: '"광합성을 동생에게 설명해볼까?"\n쉬운 말로 풀어보니 내가 뭘 모르는지 보였다.\n부족한 부분만 다시 공부하니 완벽히 이해됐다.',
        },
      },
      {
        type: 'ox',
        statement: '어려운 전문 용어로 설명할 수 있으면 잘 아는 것이다.',
        answer: false,
        feedback: '전문 용어를 쓰면 진짜 이해를 숨길 수 있어.\n쉽게 설명할 수 있어야 진짜 아는 거야!',
      },
      {
        type: 'multipleChoice',
        question: '파인만 학습법에서 가장 중요한 단계는?',
        options: [
          '교과서를 반복해서 읽기',
          '쉬운 말로 설명해보기',
          '문제를 많이 풀기',
          '요약 노트를 만들기',
        ],
        correctIndex: 1,
        explanation: '쉽게 설명하려고 시도할 때\n내가 진짜 아는 것과 모르는 것이 드러나.\n그게 파인만 학습법의 핵심이야!',
      },
      {
        type: 'feedback',
        summary: '쉽게 설명 = 진짜 이해',
        message: '파인만은 이렇게 말했어:\n"쉽게 설명할 수 없다면, 아직 이해하지 못한 것이다."',
      },
      {
        type: 'mission',
        mission: '오늘 배운 개념 하나를\n친구나 가족에게 쉽게 설명해보기',
        encouragement: '가르치는 것이 가장 좋은 배움이야!',
      },
    ],
  },

  'humanities-silver-2': {
    id: 'humanities-silver-2',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 2,
    title: '능동적 회상 (Active Recall)',
    cards: [
      {
        type: 'concept',
        title: '떠올리는 것이 최고의 학습',
        description: '많은 학생이 교과서를 반복해서 읽어.\n하지만 연구에 따르면 "직접 떠올리는 것"이\n반복 읽기보다 50% 이상 효과적이야.\n\n방법은 간단해:\n📖 공부한 후 책을 덮고\n🧠 배운 내용을 직접 떠올려봐.\n\n이것이 "능동적 회상"이야!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🧠', label: '직접 떠올리기', description: '책 없이 기억해내는 연습' },
          { icon: '📝', label: '자기 테스트', description: '스스로 문제 내고 풀어보기' },
          { icon: '💪', label: '인출 연습', description: '기억을 꺼내는 훈련' },
          { icon: '📈', label: '검증된 효과', description: '반복 읽기보다 50%↑ 효과' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '수동적 복습',
          story: '교과서를 5번이나 읽었다.\n읽을 때는 다 아는 것 같았는데\n시험에서 백지 상태가 됐다.',
        },
        good: {
          label: '능동적 회상',
          story: '1번 읽고 책을 덮은 후 핵심 내용을 적어봤다.\n빈칸이 있으면 다시 확인하고 또 덮고 떠올렸다.\n시험에서 술술 나왔다.',
        },
      },
      {
        type: 'ox',
        statement: '많이 읽으면 자연히 외워진다.',
        answer: false,
        feedback: '읽기만 하면 "안다는 착각"에 빠지기 쉬워.\n직접 떠올려봐야 진짜 기억에 남아!',
      },
      {
        type: 'multipleChoice',
        question: '가장 효과적인 복습 방법은?',
        options: [
          '교과서를 여러 번 읽기',
          '형광펜으로 밑줄 긋기',
          '책을 덮고 직접 떠올려보기',
          '요약본을 반복해서 보기',
        ],
        correctIndex: 2,
        explanation: '직접 떠올리기(인출 연습)가\n모든 학습법 중 가장 효과적이라는 게\n수많은 연구로 증명됐어!',
      },
      {
        type: 'feedback',
        summary: '떠올리기 > 반복 읽기',
        message: '뇌는 "꺼내는 연습"을 할 때\n가장 강하게 기억해. 오늘부터 실천해봐!',
      },
      {
        type: 'mission',
        mission: '오늘 공부 후 노트를 덮고\n핵심 내용 3가지를 빈 종이에 적어보기',
        encouragement: '떠올리기가 어려울수록 효과가 크다는 뜻이야!',
      },
    ],
  },

  'humanities-silver-3': {
    id: 'humanities-silver-3',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 3,
    title: '간격 반복 학습법',
    cards: [
      {
        type: 'concept',
        title: '잊을 만할 때 복습하면 기억이 강해진다',
        description: '간격 반복(Spaced Repetition)은\n과학적으로 가장 효율적인 암기법이야.\n\n핵심 원리:\n완전히 잊기 전, 약간 흐려질 때 복습하면\n기억이 더 강하게 저장돼.\n\n추천 간격: 1일 → 3일 → 7일 → 30일',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📅', label: '1일 후', description: '첫 복습 - 기억률 급상승' },
          { icon: '📅', label: '3일 후', description: '두 번째 복습 - 기억 강화' },
          { icon: '📅', label: '7일 후', description: '세 번째 복습 - 장기 저장' },
          { icon: '📅', label: '30일 후', description: '최종 복습 - 영구 기억' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '몰아서 공부',
          story: '시험 전날 영단어 200개를 한꺼번에 외웠다.\n시험 다음 날 절반도 기억 못했다.',
        },
        good: {
          label: '간격 반복',
          story: '매일 20개씩 외우고, 1일/3일/7일 후 복습했다.\n시험 때 200개가 다 기억났고 한 달 뒤에도 남았다.',
        },
      },
      {
        type: 'ox',
        statement: '복습은 매일 똑같이 하는 것이 가장 좋다.',
        answer: false,
        feedback: '매일 같은 양을 반복하는 건 비효율적이야.\n간격을 점점 늘려가며 복습하는 게 최적이야!',
      },
      {
        type: 'multipleChoice',
        question: '간격 반복에서 최적의 복습 타이밍은?',
        options: [
          '완전히 잊어버린 후',
          '외운 직후 바로',
          '약간 흐려질 때 (잊기 직전)',
          '시험 전날',
        ],
        correctIndex: 2,
        explanation: '잊기 직전에 복습하면\n뇌가 "이건 중요한 정보구나!"라고 판단해서\n더 강하게 저장해!',
      },
      {
        type: 'feedback',
        summary: '간격 반복 = 1일→3일→7일→30일',
        message: '같은 시간을 쓰더라도\n타이밍만 바꾸면 기억력이 2배가 돼!',
      },
      {
        type: 'mission',
        mission: '이번 주 배운 것을\n1-3-7일 간격 복습 계획 세우기',
        encouragement: '스마트한 복습이 천재의 비결이야!',
      },
    ],
  },

  'humanities-silver-4': {
    id: 'humanities-silver-4',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 4,
    title: '인터리빙 학습법',
    cards: [
      {
        type: 'concept',
        title: '섞어서 공부하면 더 효과적',
        description: '수학만 3시간 하는 것보다\n수학 1시간 + 영어 1시간 + 과학 1시간이\n실제 시험에서 더 좋은 성적을 만들어.\n\n이것을 "인터리빙"이라고 해.\n\n뇌가 다양한 유형을 구분하는 훈련이 되면서\n실전 적용력이 훨씬 높아지거든!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🔀', label: '과목 섞기', description: '다양한 과목을 번갈아 공부' },
          { icon: '🧩', label: '문제 섞기', description: '비슷한 유형만 풀지 않기' },
          { icon: '🧠', label: '구분 능력', description: '뇌의 판단력이 강해짐' },
          { icon: '📊', label: '실전 효과', description: '시험에서 더 좋은 결과' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '블록 학습',
          story: '같은 유형의 수학 문제만 30개 풀었다.\n다 맞아서 자신감이 생겼는데\n시험에서 유형이 섞이니 헷갈렸다.',
        },
        good: {
          label: '인터리빙 학습',
          story: '다양한 유형의 수학 문제를 섞어서 풀었다.\n처음엔 어려웠지만\n시험에서 어떤 유형이든 구분할 수 있게 됐다.',
        },
      },
      {
        type: 'ox',
        statement: '한 과목을 오래 집중하는 것이 가장 효과적이다.',
        answer: false,
        feedback: '한 가지만 반복하면 "잘하는 착각"이 생겨.\n섞어서 공부해야 진짜 실력이 늘어!',
      },
      {
        type: 'multipleChoice',
        question: '인터리빙 학습의 가장 큰 효과는?',
        options: [
          '공부 시간이 줄어든다',
          '한 과목을 깊이 마스터한다',
          '다양한 상황에서 적용하는 힘이 커진다',
          '집중력이 오래 간다',
        ],
        correctIndex: 2,
        explanation: '인터리빙은 뇌의 "전이 능력"을 키워.\n다양한 상황에 지식을 적용하는 힘이\n시험에서 빛을 발해!',
      },
      {
        type: 'feedback',
        summary: '섞어서 공부 = 실전에서 강해짐',
        message: '처음엔 어렵게 느껴지지만\n그 어려움이 바로 진짜 학습이야!',
      },
      {
        type: 'mission',
        mission: '오늘 공부할 때\n2과목 이상 번갈아 공부해보기',
        encouragement: '어렵게 느껴질수록 뇌가 성장하고 있다는 증거!',
      },
    ],
  },

  'humanities-silver-5': {
    id: 'humanities-silver-5',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 5,
    title: '정교화 전략',
    cards: [
      {
        type: 'concept',
        title: '"왜?"를 깊이 파면 기억이 깊어진다',
        description: '정교화(Elaboration)란\n새 정보를 기존 지식과 연결하는 거야.\n\n방법은 간단해:\n"왜 이런 결과가 나올까?"\n"이것은 내가 아는 무엇과 비슷할까?"\n"실생활에서 어디에 쓰일까?"\n\n이렇게 깊이 파고들면 기억이 단단해져!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '❓', label: '이유 찾기', description: '"왜?" 질문으로 깊이 파기' },
          { icon: '🔗', label: '연결 짓기', description: '이미 아는 것과 연결하기' },
          { icon: '🌍', label: '실생활 적용', description: '일상에서의 쓰임 찾기' },
          { icon: '💡', label: '자기 관련짓기', description: '내 경험과 연결하면 최강' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '표면적 공부',
          story: '"물은 100도에서 끓는다" 사실만 외웠다.\n"산 위에서 라면이 안 익는 이유는?" 물어보니\n대답하지 못했다.',
        },
        good: {
          label: '정교화 학습',
          story: '"물이 100도에서 끓는 이유는 뭘까?"\n"기압이 낮으면 어떻게 될까?" 파고들었다.\n산에서 라면이 덜 익는 이유도 자연스럽게 이해됐다.',
        },
      },
      {
        type: 'ox',
        statement: '사실만 정확히 외우면 충분하다.',
        answer: false,
        feedback: '사실만 외우면 응용을 못 해.\n"왜?"를 함께 이해해야 진짜 지식이야!',
      },
      {
        type: 'multipleChoice',
        question: '정교화의 핵심 질문은?',
        options: [
          '"이거 시험에 나올까?"',
          '"왜 이런 결과가 나올까?"',
          '"몇 번 반복해야 할까?"',
          '"어디에 밑줄 그을까?"',
        ],
        correctIndex: 1,
        explanation: '"왜?"라는 질문이 정교화의 핵심이야.\n이유를 이해하면 기억도 오래가고 응용도 돼!',
      },
      {
        type: 'feedback',
        summary: '정교화 = 왜 + 연결 + 적용',
        message: '한 걸음 더 깊이 파고들면\n같은 시간에 10배 더 배울 수 있어!',
      },
      {
        type: 'mission',
        mission: '오늘 배운 사실 하나에\n"왜?"를 3번 연속 물어보기',
        encouragement: '"왜?"를 파고들수록 진짜 전문가에 가까워져!',
      },
    ],
  },

  'humanities-silver-6': {
    id: 'humanities-silver-6',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 6,
    title: '마인드맵 활용법',
    cards: [
      {
        type: 'concept',
        title: '시각적으로 연결하며 정리하기',
        description: '마인드맵은 토니 부잔이 만든 사고 정리법이야.\n\n📌 가운데에 핵심 주제를 놓고\n🌿 가지를 뻗으며 관련 내용을 연결해.\n🎨 색상, 이미지, 키워드를 활용하면\n뇌의 양쪽 반구를 모두 사용하게 돼!\n\n텍스트만 나열하는 것보다 기억이 3배 오래가!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🌳', label: '중심 주제', description: '가운데에 핵심 키워드 배치' },
          { icon: '🌿', label: '가지 확장', description: '관련 내용을 방사형으로 연결' },
          { icon: '🎨', label: '색상 활용', description: '영역별 색을 다르게 사용' },
          { icon: '🔗', label: '관계 파악', description: '정보 간 연결 고리 발견' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '줄글 노트',
          story: '수업 내용을 한 줄 한 줄 받아적었다.\n나중에 보니 뭐가 중요하고\n무엇이 어떻게 연결되는지 모르겠다.',
        },
        good: {
          label: '마인드맵 노트',
          story: '중심에 "조선시대"를 쓰고 정치/경제/문화로 가지를 뻗었다.\n한눈에 전체 구조가 보이니\n시험 때 머릿속에 지도가 떠올랐다.',
        },
      },
      {
        type: 'ox',
        statement: '마인드맵은 예쁘게 그리는 것이 핵심이다.',
        answer: false,
        feedback: '예쁘게 그리는 게 아니라\n정보 간 관계를 파악하는 게 핵심이야!\n간단하게라도 연결 구조를 만들어봐.',
      },
      {
        type: 'multipleChoice',
        question: '마인드맵의 가장 큰 장점은?',
        options: [
          '글씨를 적게 쓸 수 있다',
          '정보 간 관계를 한눈에 파악한다',
          '그림 실력이 늘어난다',
          '시간이 절약된다',
        ],
        correctIndex: 1,
        explanation: '마인드맵의 최대 강점은\n정보들의 관계와 구조를 시각적으로 볼 수 있다는 거야!',
      },
      {
        type: 'feedback',
        summary: '마인드맵 = 시각적 연결로 기억력 3배',
        message: '복잡한 내용도 마인드맵으로 정리하면\n전체 그림이 한눈에 보여!',
      },
      {
        type: 'mission',
        mission: '오늘 수업 내용 하나를\n마인드맵으로 정리해보기',
        encouragement: '그리는 과정 자체가 최고의 복습이야!',
      },
    ],
  },

  'humanities-silver-7': {
    id: 'humanities-silver-7',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 7,
    title: '자기설명 효과',
    cards: [
      {
        type: 'concept',
        title: '나에게 가르치면 이해가 깊어진다',
        description: '자기설명 효과(Self-Explanation Effect)란\n새 내용을 스스로에게 설명하면\n이해가 훨씬 깊어지는 현상이야.\n\n"이 공식이 이렇게 되는 이유는..."\n"이 단계에서 저 단계로 가는 논리는..."\n\n혼자서 풀이 과정을 설명해보면\n빈틈이 바로 보여!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🗣️', label: '소리내어 설명', description: '혼자 중얼거리며 설명하기' },
          { icon: '🔍', label: '빈틈 발견', description: '설명 못하는 부분 = 모르는 부분' },
          { icon: '✅', label: '이해 점검', description: '진짜 이해했는지 확인' },
          { icon: '📈', label: '깊은 학습', description: '표면이 아닌 깊은 이해' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '넘기기식 공부',
          story: '수학 문제를 풀고 답만 맞으면 넘겼다.\n비슷한 문제가 나왔는데\n풀이 과정이 기억나지 않았다.',
        },
        good: {
          label: '자기설명 공부',
          story: '문제를 풀고 "왜 이렇게 풀었지?"라고\n자기에게 풀이 과정을 설명했다.\n다른 유형도 논리적으로 접근할 수 있게 됐다.',
        },
      },
      {
        type: 'ox',
        statement: '문제를 많이 풀기만 하면 실력이 늘어난다.',
        answer: false,
        feedback: '양만 늘리면 같은 실수를 반복할 수 있어.\n풀이 과정을 설명할 수 있어야 진짜 실력이야!',
      },
      {
        type: 'multipleChoice',
        question: '자기설명의 가장 좋은 타이밍은?',
        options: [
          '시험 직전',
          '새로운 개념을 배운 직후',
          '한 달 후 복습할 때',
          '숙제할 때',
        ],
        correctIndex: 1,
        explanation: '새 개념을 배운 직후에\n바로 자기 설명을 하면\n이해가 가장 깊게 자리잡아!',
      },
      {
        type: 'feedback',
        summary: '자기에게 설명 = 가장 깊은 이해',
        message: '혼자 설명하는 게 부끄럽다면\n마음속으로 해도 효과 있어!',
      },
      {
        type: 'mission',
        mission: '오늘 푼 문제 하나의\n풀이 과정을 소리 내어 설명해보기',
        encouragement: '설명할 수 있으면 시험도 문제없어!',
      },
    ],
  },

  'humanities-silver-8': {
    id: 'humanities-silver-8',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 8,
    title: '딥워크 - 깊은 집중',
    cards: [
      {
        type: 'concept',
        title: '방해 없는 깊은 집중의 힘',
        description: '조지타운 대학 칼 뉴포트 교수의 연구:\n\n"딥워크(Deep Work)란\n인지적으로 어려운 작업에\n방해 없이 깊이 집중하는 것."\n\n현대인은 평균 11분마다 방해받는다고 해.\n다시 집중하려면 25분이 걸리고!\n\n딥워크를 하면 같은 시간에 2~3배 성과!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📵', label: '방해 차단', description: '스마트폰, 알림 끄기' },
          { icon: '🎯', label: '깊은 집중', description: '하나에만 완전히 몰두' },
          { icon: '⏰', label: '몰입 시간', description: '최소 1시간 확보하기' },
          { icon: '🧠', label: '인지적 성장', description: '뇌의 능력이 진짜 커짐' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '얕은 집중',
          story: '공부하다 카톡 확인, 유튜브 잠깐...\n2시간 앉아있었는데 실제로\n집중한 시간은 30분도 안 됐다.',
        },
        good: {
          label: '딥워크',
          story: '스마트폰을 다른 방에 두고 1시간 공부했다.\n엄청나게 집중이 되어서\n보통 3시간 걸리는 양을 끝냈다.',
        },
      },
      {
        type: 'ox',
        statement: '멀티태스킹이 공부 효율을 높인다.',
        answer: false,
        feedback: '뇌는 멀티태스킹을 못 해!\n빠르게 전환하는 것뿐인데\n매번 집중력이 분산돼 효율이 떨어져.',
      },
      {
        type: 'multipleChoice',
        question: '딥워크의 가장 큰 적은?',
        options: [
          '어려운 문제',
          '부족한 재능',
          '스마트폰 알림',
          '짧은 공부 시간',
        ],
        correctIndex: 2,
        explanation: '스마트폰 알림 하나로도 집중이 끊겨.\n다시 몰입하려면 25분이 걸려!\n가장 큰 적은 "방해"야.',
      },
      {
        type: 'feedback',
        summary: '딥워크 = 방해 차단 + 깊은 집중',
        message: '하루 1시간의 딥워크가\n3시간의 산만한 공부보다 강해!',
      },
      {
        type: 'mission',
        mission: '오늘 공부 시작 전\n스마트폰을 다른 방에 두고\n1시간 깊게 집중해보기',
        encouragement: '딥워크 1시간이면 세상이 달라져!',
      },
    ],
  },

  'humanities-silver-9': {
    id: 'humanities-silver-9',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 9,
    title: '메타인지 - 나를 아는 공부',
    cards: [
      {
        type: 'concept',
        title: '"내가 모르는 것을 아는 것"',
        description: '메타인지(Metacognition)란\n"내 생각에 대해 생각하는 것"이야.\n\n공부 잘하는 학생의 공통점:\n자기가 뭘 알고, 뭘 모르는지 정확히 알아.\n\n"이 부분은 확실히 알겠어"\n"이 부분은 아직 헷갈려"\n이걸 구분할 수 있으면 최고 효율로 공부할 수 있어!',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '🪞', label: '자기 점검', description: '내가 뭘 아는지 확인하기' },
          { icon: '🎯', label: '모르는 것 파악', description: '부족한 부분을 정확히 찾기' },
          { icon: '🔄', label: '전략 수정', description: '안 되면 방법을 바꾸기' },
          { icon: '📋', label: '학습 계획', description: '약한 부분에 시간 집중' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '무작정 공부',
          story: '"다 아는 것 같은데?" 하며 시험을 봤다.\n막상 시험에서 모르는 문제가 많았다.\n아는 것과 모르는 것을 구분 못했다.',
        },
        good: {
          label: '메타인지 공부',
          story: '공부 후 "이건 확실, 이건 애매, 이건 모름"으로\n분류했다. 모르는 것만 집중 공부하니\n같은 시간에 2배 효과를 봤다.',
        },
      },
      {
        type: 'ox',
        statement: '공부는 무조건 오래 하면 된다.',
        answer: false,
        feedback: '오래 하는 것보다 약한 부분을 정확히 파악해서\n집중 공격하는 게 훨씬 효율적이야!',
      },
      {
        type: 'multipleChoice',
        question: '메타인지가 높은 학생의 특징은?',
        options: [
          '모든 과목을 잘한다',
          '자기가 뭘 모르는지 정확히 안다',
          '수업 시간에 많이 발표한다',
          '책을 많이 읽는다',
        ],
        correctIndex: 1,
        explanation: '자기가 뭘 모르는지 정확히 아는 것!\n그래야 부족한 곳에 시간을 집중할 수 있어.',
      },
      {
        type: 'feedback',
        summary: '메타인지 = 나의 학습 상태를 아는 능력',
        message: '최고의 학생은 "뭘 모르는지 아는 학생"이야.\n오늘부터 자기 점검을 시작해봐!',
      },
      {
        type: 'mission',
        mission: '시험 범위에서\n"확실히 아는 것 / 애매한 것 / 모르는 것"\n3개씩 적어보기',
        encouragement: '모르는 걸 인정하는 게 실력 향상의 첫 걸음!',
      },
    ],
  },

  'humanities-silver-10': {
    id: 'humanities-silver-10',
    chapterKey: 'humanities',
    tierKey: 'silver',
    stageNumber: 10,
    title: '청킹 - 묶어서 기억하기',
    cards: [
      {
        type: 'concept',
        title: '정보를 묶으면 기억 용량이 커진다',
        description: '사람의 단기 기억은 7±2개가 한계야.\n\n하지만 "청킹(Chunking)"으로\n정보를 의미 있는 덩어리로 묶으면\n기억할 수 있는 양이 크게 늘어나!\n\n예: 01012345678 → 010-1234-5678\n11자리 숫자가 3덩어리로!\n\n패턴을 찾아 묶는 것이 핵심이야.',
      },
      {
        type: 'summary',
        keywords: [
          { icon: '📦', label: '묶어 기억', description: '정보를 의미 있는 덩어리로' },
          { icon: '🔍', label: '패턴 찾기', description: '공통점이나 규칙 발견' },
          { icon: '🏷️', label: '의미 부여', description: '무의미한 정보에 뜻 만들기' },
          { icon: '🧱', label: '구조화', description: '체계적으로 정리하기' },
        ],
      },
      {
        type: 'example',
        bad: {
          label: '낱개 암기',
          story: '역사 연도를 하나하나 따로 외웠다.\n너무 많아서 금방 헷갈리고\n순서도 뒤죽박죽이 됐다.',
        },
        good: {
          label: '청킹 암기',
          story: '"임진왜란→병자호란→영조→정조"를\n시대 흐름으로 묶어서 외웠다.\n한 덩어리가 다음 덩어리를 떠올리게 해줬다.',
        },
      },
      {
        type: 'ox',
        statement: '사람의 단기 기억은 무한하다.',
        answer: false,
        feedback: '단기 기억은 7±2개가 한계야!\n하지만 청킹으로 묶으면 실질적 용량이 늘어나.',
      },
      {
        type: 'multipleChoice',
        question: '청킹의 예시가 아닌 것은?',
        options: [
          '전화번호를 3-4-4자리로 나누기',
          '역사를 시대별로 묶어 외우기',
          '한 글자씩 따로 외우기',
          '영단어를 주제별로 묶어 외우기',
        ],
        correctIndex: 2,
        explanation: '한 글자씩 따로 외우는 건 청킹의 반대야!\n의미 있게 묶어야 기억이 쉬워져.',
      },
      {
        type: 'feedback',
        summary: '청킹 = 정보를 덩어리로 묶어 기억',
        message: '실버 완료! 이제 검증된 공부법의 마스터야.\n골드에서는 사고력을 확장해볼 거야!',
      },
      {
        type: 'mission',
        mission: '외워야 할 것을\n3~4개씩 의미 있는 묶음으로 정리해보기',
        encouragement: '묶는 순간 기억력이 3배로 뛰어!',
      },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (사고력 확장) 1~10
  // ═══════════════════════════════════════

  'humanities-gold-1': {
    id: 'humanities-gold-1', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 1,
    title: '비판적 사고란?',
    cards: [
      { type: 'concept', title: '의심하고 검증하는 힘', description: '비판적 사고란\n주어진 정보를 그대로 믿지 않고\n근거를 확인하고 분석하는 능력이야.\n\n"이게 정말 사실일까?"\n"근거가 있는 말일까?"\n"다른 시각은 없을까?"\n\n이런 질문을 하는 것이 비판적 사고의 시작이야!' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '근거 확인', description: '사실인지 출처를 확인' },
        { icon: '⚖️', label: '다각도 분석', description: '여러 관점에서 살펴보기' },
        { icon: '🧪', label: '논리적 판단', description: '감정이 아닌 논리로 판단' },
        { icon: '❓', label: '건강한 의심', description: '무조건 믿지 않는 태도' },
      ]},
      { type: 'example', bad: { label: '무비판적 수용', story: '"○○이 몸에 좋다"는 글을 보고 바로 믿었다.\n나중에 광고성 기사였다는 걸 알았다.' }, good: { label: '비판적 사고', story: '"정말일까?" 의심하고 출처를 확인했다.\n전문가 의견과 연구 결과를 찾아보니\n과장된 내용이라는 걸 알 수 있었다.' }},
      { type: 'ox', statement: '비판적 사고는 무조건 반대하는 것이다.', answer: false, feedback: '비판적 사고는 "반대"가 아니라 "검증"이야.\n근거를 확인하고 합리적으로 판단하는 거야!' },
      { type: 'multipleChoice', question: '비판적 사고의 첫 단계는?', options: ['무조건 반대하기', '감정적으로 판단하기', '근거가 있는지 확인하기', '다수 의견 따르기'], correctIndex: 2, explanation: '근거 확인이 첫 걸음이야.\n"어떤 증거가 있지?"라고 물어보는 거야!' },
      { type: 'feedback', summary: '비판적 사고 = 근거 확인 + 다각도 분석', message: '비판적 사고는 현대 사회의 필수 능력이야.\n가짜뉴스 시대에 너를 지켜줄 방패!' },
      { type: 'mission', mission: '오늘 본 뉴스나 정보 하나의\n출처와 근거를 확인해보기', encouragement: '의심하는 것이 더 현명해지는 길이야!' },
    ],
  },

  'humanities-gold-2': {
    id: 'humanities-gold-2', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 2,
    title: '논리적 오류 파악하기',
    cards: [
      { type: 'concept', title: '자주 빠지는 사고의 함정', description: '우리는 무의식적으로 논리적 오류에 빠져.\n\n대표적인 오류들:\n🔲 흑백 논리: "A 아니면 B" (중간은?)\n🥊 인신공격: 주장이 아닌 사람을 공격\n🏔️ 미끄러운 경사면: "이러면 저런 최악이!"\n👥 다수의 오류: "모두 하니까 맞겠지"\n\n이것만 알아도 현명한 판단을 할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🔲', label: '흑백 논리', description: 'A 아니면 B만 있다는 착각' },
        { icon: '🥊', label: '인신공격', description: '주장이 아닌 사람을 비난' },
        { icon: '🏔️', label: '미끄러운 경사면', description: '과장된 연쇄 결론' },
        { icon: '👥', label: '다수의 오류', description: '많은 사람이 하면 옳다는 착각' },
      ]},
      { type: 'example', bad: { label: '논리적 오류에 빠진 대화', story: '"공부를 안 하면 대학 못 가고,\n대학 못 가면 좋은 직장 못 잡고,\n결국 불행해질 거야!"\n→ 미끄러운 경사면 오류' }, good: { label: '논리적 사고', story: '"공부를 못하면 다른 길도 있어.\n각 단계는 별개의 문제이고\n다양한 가능성을 열어두자."\n→ 과장 없이 합리적 판단' }},
      { type: 'ox', statement: '다수가 동의하면 항상 옳다.', answer: false, feedback: '다수의 의견이라고 항상 옳은 건 아니야.\n역사적으로 다수가 틀린 경우가 많았어!' },
      { type: 'multipleChoice', question: '"저 사람은 학생이니까 뭘 알겠어"는 어떤 오류?', options: ['흑백 논리', '미끄러운 경사면', '인신공격 오류', '다수의 오류'], correctIndex: 2, explanation: '주장의 내용이 아니라 "사람의 특성"을 공격하는\n인신공격 오류야!' },
      { type: 'feedback', summary: '논리적 오류 = 무의식적 사고 함정', message: '오류를 알면 속지 않아.\n더 현명한 판단을 할 수 있게 돼!' },
      { type: 'mission', mission: '대화나 뉴스에서\n논리적 오류 하나 찾아보기', encouragement: '찾을수록 사고력이 날카로워져!' },
    ],
  },

  'humanities-gold-3': {
    id: 'humanities-gold-3', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 3,
    title: '창의적 문제해결 - SCAMPER',
    cards: [
      { type: 'concept', title: '7가지 변형으로 새 아이디어 탄생', description: 'SCAMPER는 기존 것을 7가지로 바꿔보는 방법이야.\n\nS - 대체하기 (Substitute)\nC - 결합하기 (Combine)\nA - 적용하기 (Adapt)\nM - 수정하기 (Modify)\nP - 다른 용도 (Put to other use)\nE - 제거하기 (Eliminate)\nR - 뒤집기 (Reverse)\n\n이 7가지만 적용하면 아이디어가 쏟아져!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '대체/결합', description: '바꾸거나 합쳐보기' },
        { icon: '🔧', label: '적용/수정', description: '다른 곳에 적용하거나 변형' },
        { icon: '✂️', label: '제거/뒤집기', description: '빼보거나 거꾸로 해보기' },
        { icon: '💡', label: '다른 용도', description: '완전히 다른 쓰임 찾기' },
      ]},
      { type: 'example', bad: { label: '고정된 사고', story: '"원래 이렇게 하는 거야" 하며\n기존 방식만 반복했다.\n새로운 해결책을 찾지 못했다.' }, good: { label: 'SCAMPER 적용', story: '문제를 SCAMPER로 분석했다.\n"이 과정을 제거하면?" "순서를 뒤집으면?"\n완전히 새로운 해결책을 발견했다!' }},
      { type: 'ox', statement: '창의력은 타고나는 것이다.', answer: false, feedback: '창의력은 훈련 가능해!\nSCAMPER 같은 도구를 쓰면 누구나 창의적이 될 수 있어.' },
      { type: 'multipleChoice', question: 'SCAMPER의 C(Combine)의 의미는?', options: ['복사하기', '결합하기', '비교하기', '계산하기'], correctIndex: 1, explanation: 'Combine = 결합하기!\n서로 다른 것을 합치면 새로운 것이 탄생해.' },
      { type: 'feedback', summary: 'SCAMPER = 7가지 변형으로 아이디어 폭발', message: '창의력은 재능이 아니라 습관이야.\nSCAMPER를 쓰면 누구나 창의적이 될 수 있어!' },
      { type: 'mission', mission: '일상의 불편한 점 하나를\nSCAMPER 7가지 중 하나로 해결해보기', encouragement: '세상을 바꾼 발명들도 다 이렇게 시작됐어!' },
    ],
  },

  'humanities-gold-4': {
    id: 'humanities-gold-4', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 4,
    title: '관점 전환의 힘',
    cards: [
      { type: 'concept', title: '같은 상황, 완전히 다른 시각', description: '같은 사건도 관점에 따라 완전히 다르게 보여.\n\n비가 온다:\n🌾 농부: "비다! 농사에 좋겠다!"\n🏖️ 소풍 계획자: "비다... 소풍이 망했어..."\n\n관점을 바꿀 수 있는 사람은\n더 넓게 이해하고 더 현명하게 판단할 수 있어.\n이것이 "역지사지"의 힘이야!' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '역지사지', description: '상대방 입장에서 생각해보기' },
        { icon: '🔄', label: '관점 전환', description: '다른 각도로 바라보기' },
        { icon: '🌈', label: '다양성 이해', description: '정답이 하나가 아님을 인정' },
        { icon: '🤝', label: '공감 능력', description: '상대를 이해하는 힘' },
      ]},
      { type: 'example', bad: { label: '한쪽 시각', story: '"선생님이 나만 혼냈어. 너무 불공평해!"\n자기 입장에서만 생각하니\n화만 커지고 해결이 안 됐다.' }, good: { label: '관점 전환', story: '"선생님은 왜 그렇게 하셨을까?"\n선생님 입장에서 생각하니\n내가 수업 방해를 했었다는 걸 깨달았다.' }},
      { type: 'ox', statement: '내가 옳으면 상대는 반드시 틀린 것이다.', answer: false, feedback: '둘 다 맞을 수 있어!\n관점이 다를 뿐이지. 세상은 흑백이 아니야.' },
      { type: 'multipleChoice', question: '관점 전환에 가장 좋은 질문은?', options: ['"왜 나만 이런 일이?"', '"상대는 왜 그렇게 생각할까?"', '"누가 잘못한 거지?"', '"어떻게 이길 수 있을까?"'], correctIndex: 1, explanation: '상대의 이유를 궁금해하는 것이\n관점 전환의 시작이야!' },
      { type: 'feedback', summary: '관점 전환 = 더 넓은 이해', message: '세상에는 다양한 시각이 있어.\n관점을 넓히면 더 현명해질 수 있어!' },
      { type: 'mission', mission: '의견이 다른 사람의 입장에서\n3분간 생각해보기', encouragement: '이해의 폭이 넓어질수록 지혜도 커져!' },
    ],
  },

  'humanities-gold-5': {
    id: 'humanities-gold-5', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 5,
    title: '문제 해결 5단계',
    cards: [
      { type: 'concept', title: '체계적으로 문제를 풀어가는 방법', description: '복잡한 문제도 5단계로 나누면 풀 수 있어!\n\n1️⃣ 정의: 문제가 정확히 뭐지?\n2️⃣ 분석: 원인이 뭘까?\n3️⃣ 아이디어: 어떤 방법이 있을까?\n4️⃣ 실행: 최선의 방법을 실천!\n5️⃣ 평가: 효과가 있었나?\n\n가장 중요한 건 1단계! 문제를 정확히 정의하는 것.' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '1. 정의', description: '문제를 명확히 파악하기' },
        { icon: '🔍', label: '2. 분석', description: '원인과 맥락 살피기' },
        { icon: '💡', label: '3. 아이디어', description: '가능한 해결책 나열' },
        { icon: '🚀', label: '4~5. 실행/평가', description: '실행 후 결과 점검' },
      ]},
      { type: 'example', bad: { label: '충동적 해결', story: '성적이 떨어졌다. "무조건 밤새 공부하자!"\n원인도 파악 안 하고 무작정 달려들어\n똑같은 실수를 반복했다.' }, good: { label: '5단계 해결', story: '"성적이 왜 떨어졌지?" (정의)\n"집중력 문제? 이해 부족?" (분석)\n"포모도로+능동적 회상" (아이디어)\n실행 후 성적이 올랐다! (실행+평가)' }},
      { type: 'ox', statement: '문제를 빨리 해결하는 것이 가장 좋다.', answer: false, feedback: '빨리보다 정확히! 문제를 잘못 정의하면\n아무리 열심히 해도 엉뚱한 결과가 나와.' },
      { type: 'multipleChoice', question: '문제 해결에서 가장 중요한 첫 단계는?', options: ['바로 해결책을 실행한다', '남에게 도움을 요청한다', '문제를 정확히 정의한다', '비슷한 사례를 찾아본다'], correctIndex: 2, explanation: '문제를 정확히 아는 것이 반은 해결한 것!\n"뭐가 문제인가?"를 먼저 명확히 해야 해.' },
      { type: 'feedback', summary: '문제 해결 = 정의→분석→아이디어→실행→평가', message: '체계적으로 접근하면\n어떤 복잡한 문제도 풀 수 있어!' },
      { type: 'mission', mission: '현재 겪고 있는 고민 하나를\n5단계로 분석해보기', encouragement: '문제를 정리하는 순간 답이 보이기 시작해!' },
    ],
  },

  'humanities-gold-6': {
    id: 'humanities-gold-6', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 6,
    title: '시스템 사고',
    cards: [
      { type: 'concept', title: '전체를 보는 눈', description: '시스템 사고란\n개별 요소가 아니라 전체 관계와 흐름을 보는 것이야.\n\n예: "성적이 떨어졌다"\n❌ 표면: "공부를 안 해서"\n✅ 시스템: 수면 부족 → 집중력 하락 → 이해도 저하 → 흥미 감소 → 더 안 하게 됨\n\n근본 원인을 찾아야 진짜 해결이 돼!' },
      { type: 'summary', keywords: [
        { icon: '🌐', label: '전체 보기', description: '부분이 아닌 전체 그림 파악' },
        { icon: '🔗', label: '연결 고리', description: '요소들 간의 관계 발견' },
        { icon: '🔄', label: '피드백 루프', description: '원인→결과→원인의 순환' },
        { icon: '🌱', label: '근본 원인', description: '증상이 아닌 뿌리 찾기' },
      ]},
      { type: 'example', bad: { label: '증상만 치료', story: '"피곤하니까 에너지드링크 마시자."\n근본 원인인 수면 부족은 그대로고\n점점 더 피곤해지는 악순환에 빠졌다.' }, good: { label: '시스템 사고', story: '"왜 피곤하지?" → 늦게 자니까 → 왜? → 스마트폰\n스마트폰 사용을 줄이자 수면이 좋아지고\n전체적인 컨디션이 회복됐다.' }},
      { type: 'ox', statement: '복잡한 문제는 부분으로 나눠서만 풀면 된다.', answer: false, feedback: '부분만 보면 전체 그림을 놓칠 수 있어.\n부분들이 어떻게 연결되는지도 봐야 해!' },
      { type: 'multipleChoice', question: '시스템 사고의 핵심은?', options: ['가장 큰 문제만 집중하기', '요소들 간의 관계와 패턴 파악', '문제를 최대한 단순화하기', '전문가에게 맡기기'], correctIndex: 1, explanation: '요소들이 어떻게 연결되고 영향을 주는지\n그 관계를 파악하는 게 시스템 사고야!' },
      { type: 'feedback', summary: '시스템 사고 = 전체 관계를 보는 능력', message: '나무만 보지 말고 숲을 봐!\n전체를 볼 수 있으면 진짜 해결책이 보여.' },
      { type: 'mission', mission: '학교나 일상의 문제 하나를\n원인→결과의 연결 고리로 그려보기', encouragement: '전체 그림이 보이면 해결책도 보여!' },
    ],
  },

  'humanities-gold-7': {
    id: 'humanities-gold-7', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 7,
    title: '유추와 비유의 힘',
    cards: [
      { type: 'concept', title: '아는 것으로 모르는 것을 이해하기', description: '유추(Analogy)는\n이미 아는 것을 활용해 새로운 것을 이해하는 거야.\n\n예:\n🧠 "뇌는 컴퓨터와 비슷해"\n❤️ "심장은 펌프와 같아"\n🌐 "인터넷은 거미줄처럼 연결되어 있어"\n\n비유를 잘 쓰면 어려운 개념도\n한 방에 이해할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '비유하기', description: '친숙한 것과 비교하기' },
        { icon: '💡', label: '이해 촉진', description: '복잡한 것이 쉬워짐' },
        { icon: '🧠', label: '기억 강화', description: '이미지와 연결되어 오래 기억' },
        { icon: '🌉', label: '다리 놓기', description: '아는 것과 모르는 것 연결' },
      ]},
      { type: 'example', bad: { label: '추상적 암기', story: '"DNA는 디옥시리보핵산으로 유전정보를 담고..."\n어려운 용어만 나열하니 이해가 안 됐다.' }, good: { label: '비유 활용', story: '"DNA는 요리 레시피 같은 거야.\n레시피대로 요리하면 음식이 만들어지듯\nDNA대로 단백질이 만들어져."\n한 번에 이해됐다!' }},
      { type: 'ox', statement: '비유는 정확하지 않으므로 학습에 방해된다.', answer: false, feedback: '비유는 100% 정확하지 않아도 괜찮아.\n이해의 출발점으로 최고의 도구야!' },
      { type: 'multipleChoice', question: '좋은 비유의 조건은?', options: ['최대한 복잡할 것', '아는 것과 새로운 것의 공통점이 있을 것', '전문 용어를 많이 사용할 것', '추상적일 것'], correctIndex: 1, explanation: '좋은 비유는 이미 아는 것과\n새로 배울 것 사이의 공통점을 연결하는 거야!' },
      { type: 'feedback', summary: '비유 = 아는 것 → 모르는 것 이해의 다리', message: '비유를 잘 만들 수 있으면\n어떤 어려운 것도 설명할 수 있어!' },
      { type: 'mission', mission: '어려운 개념 하나를\n일상적인 비유로 바꿔보기', encouragement: '비유를 만드는 순간 진짜 이해가 시작돼!' },
    ],
  },

  'humanities-gold-8': {
    id: 'humanities-gold-8', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 8,
    title: '가설과 검증 - 과학적 사고',
    cards: [
      { type: 'concept', title: '"아마 이럴 것이다" 확인하기', description: '과학적 사고의 핵심:\n\n1️⃣ 관찰: "이상하네?"\n2️⃣ 가설: "아마 이 때문일 거야"\n3️⃣ 실험: 직접 확인해보기\n4️⃣ 결론: 맞았나? 틀렸나?\n\n일상에서도 쓸 수 있어!\n"영단어를 아침에 외우면 더 잘 외울까?"\n→ 직접 해보고 확인하는 거야.' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '관찰', description: '궁금한 현상 발견하기' },
        { icon: '💭', label: '가설', description: '"아마 이럴 것이다" 예측' },
        { icon: '🧪', label: '실험', description: '직접 확인해보기' },
        { icon: '📊', label: '결론', description: '결과 분석하고 배우기' },
      ]},
      { type: 'example', bad: { label: '느낌으로 판단', story: '"아침형 인간이 성공한다던데?"\n확인도 안 하고 무조건 일찍 일어났다.\n오히려 더 피곤해졌다.' }, good: { label: '가설-검증', story: '"나는 아침이 효율적일까?"\n1주일 아침 공부, 1주일 저녁 공부를 비교했다.\n나는 저녁이 더 효율적이라는 걸 발견했다!' }},
      { type: 'ox', statement: '가설이 틀리면 실패한 것이다.', answer: false, feedback: '틀린 가설도 귀한 배움이야!\n"이건 아니구나"를 알게 된 것 자체가 성공이야.' },
      { type: 'multipleChoice', question: '과학적 사고의 핵심은?', options: ['전문가 말을 따르기', '직감으로 결정하기', '증거로 확인하는 것', '많이 읽는 것'], correctIndex: 2, explanation: '과학적 사고의 핵심은 "직접 확인"이야.\n증거 없는 판단은 그냥 추측이야!' },
      { type: 'feedback', summary: '과학적 사고 = 가설 → 검증 → 배움', message: '일상에서도 가설을 세우고 검증하면\n더 현명한 선택을 할 수 있어!' },
      { type: 'mission', mission: '궁금한 것 하나를 가설로 세우고\n직접 실험해서 확인해보기', encouragement: '작은 실험이 큰 발견으로 이어져!' },
    ],
  },

  'humanities-gold-9': {
    id: 'humanities-gold-9', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 9,
    title: '디자인 씽킹',
    cards: [
      { type: 'concept', title: '공감에서 시작하는 문제해결', description: '스탠퍼드 d.school의 5단계 혁신 방법론:\n\n1️⃣ 공감: 사용자의 마음 이해하기\n2️⃣ 정의: 진짜 문제 찾기\n3️⃣ 아이디어: 자유롭게 해결책 떠올리기\n4️⃣ 시제품: 빠르게 만들어보기\n5️⃣ 테스트: 실제로 써보고 개선하기\n\n핵심은 "사용자"부터 시작하는 것이야!' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '공감', description: '상대의 필요와 감정 이해' },
        { icon: '🎯', label: '문제 정의', description: '진짜 문제 발견하기' },
        { icon: '💡', label: '아이디어', description: '자유롭게 많이 떠올리기' },
        { icon: '🔄', label: '시제품+테스트', description: '빠르게 만들고 개선하기' },
      ]},
      { type: 'example', bad: { label: '내 기준으로', story: '"내가 좋다고 생각하는 걸 만들자!"\n만들었는데 아무도 안 쓴다.\n사용자의 필요를 몰랐기 때문이다.' }, good: { label: '디자인 씽킹', story: '"친구들이 뭘 불편해하지?" 먼저 관찰했다.\n진짜 필요한 것을 발견하고\n그에 맞는 해결책을 만들었다.' }},
      { type: 'ox', statement: '좋은 아이디어는 한 번에 완성된다.', answer: false, feedback: '최고의 아이디어도 반복적 개선을 통해 완성돼.\n실패하고 고치는 과정이 필수야!' },
      { type: 'multipleChoice', question: '디자인 씽킹의 첫 단계는?', options: ['아이디어 내기', '시제품 만들기', '공감(사용자 이해)', '문제 분석'], correctIndex: 2, explanation: '공감이 먼저야!\n사용자의 진짜 필요를 이해해야\n좋은 해결책이 나올 수 있어.' },
      { type: 'feedback', summary: '디자인 씽킹 = 공감 → 정의 → 아이디어 → 시제품 → 테스트', message: '세상의 모든 혁신은 공감에서 시작해.\n누군가의 불편함에 관심을 기울여봐!' },
      { type: 'mission', mission: '주변 사람의 불편함 하나를 관찰하고\n해결 아이디어 3개 적어보기', encouragement: '공감하는 사람이 세상을 바꾸는 사람이야!' },
    ],
  },

  'humanities-gold-10': {
    id: 'humanities-gold-10', chapterKey: 'humanities', tierKey: 'gold', stageNumber: 10,
    title: '융합적 사고 - 연결의 힘',
    cards: [
      { type: 'concept', title: '서로 다른 분야를 연결하면 혁신이 탄생', description: '스티브 잡스는 이렇게 말했어:\n"창의성은 연결하는 것이다."\n\n서예 수업 → 맥 컴퓨터의 아름다운 폰트\n음악 + 기술 → 아이팟\n\n한 분야만 깊이 파는 I형 인재보다\n여러 분야를 연결하는 T형 인재가\n미래에 더 강해!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연결력', description: '다른 분야 간 공통점 찾기' },
        { icon: '📚', label: '다양한 관심', description: '여러 분야에 호기심 갖기' },
        { icon: '🌐', label: 'T자형 인재', description: '넓은 교양 + 깊은 전문성' },
        { icon: '✨', label: '혁신', description: '연결에서 새 가치 탄생' },
      ]},
      { type: 'example', bad: { label: '칸막이 사고', story: '"수학은 수학, 국어는 국어."\n과목을 완전히 분리해서 공부하니\n실생활 문제에 지식을 적용하지 못했다.' }, good: { label: '융합적 사고', story: '역사 시간에 배운 경제 원리를\n수학 그래프로 표현하고\n국어 에세이로 정리했다.\n모든 과목이 연결되어 깊이 이해됐다.' }},
      { type: 'ox', statement: '하나만 잘하면 충분하다.', answer: false, feedback: '하나를 깊이 파되 다른 분야와 연결할 줄 알면\n훨씬 강력한 전문가가 될 수 있어!' },
      { type: 'multipleChoice', question: '스티브 잡스가 강조한 창의성의 핵심은?', options: ['천재적 재능', '기술과 인문학의 연결', '끊임없는 경쟁', '완벽주의'], correctIndex: 1, explanation: '잡스는 "기술과 인문학의 교차점"에서\n혁신이 태어난다고 했어.\n연결이 곧 창의성이야!' },
      { type: 'feedback', summary: '융합 = 연결 = 혁신 = 창의성', message: '골드 완료! 사고력의 레벨이 올라갔어.\n플래티넘에서는 인문학의 지혜를 만나자!' },
      { type: 'mission', mission: '좋아하는 두 분야의\n공통점이나 연결점 찾아보기', encouragement: '연결하는 순간 네 안에서 혁신이 시작돼!' },
    ],
  },

  // ═══════════════════════════════════════
  // 플래티넘 (인문학 지혜) 1~10
  // ═══════════════════════════════════════

  'humanities-platinum-1': {
    id: 'humanities-platinum-1', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 1,
    title: '소크라테스 - 너 자신을 알라',
    cards: [
      { type: 'concept', title: '진정한 지혜의 시작', description: '고대 그리스 철학자 소크라테스.\n델포이 신전에 새겨진 말:\n\n"γνῶθι σεαυτόν" (너 자신을 알라)\n\n소크라테스는 이렇게 말했어:\n"나는 내가 모른다는 것을 안다."\n\n자기가 무엇을 모르는지 아는 것,\n그것이 진정한 지혜의 시작이야.' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 인식', description: '나의 강점과 약점 알기' },
        { icon: '🤔', label: '무지의 지혜', description: '모른다는 것을 아는 겸손' },
        { icon: '💭', label: '내면 탐구', description: '나는 어떤 사람인가 성찰' },
        { icon: '🌱', label: '성장의 시작', description: '자기 인식이 성장의 출발점' },
      ]},
      { type: 'example', bad: { label: '자만의 함정', story: '"나는 다 알아!" 하며 배우기를 멈췄다.\n모르는 것이 쌓이는 줄도 모르고\n점점 뒤처지게 되었다.' }, good: { label: '겸손한 지혜', story: '"이 부분은 아직 잘 모르겠어."\n솔직히 인정하고 질문하니\n오히려 더 빠르게 성장할 수 있었다.' }},
      { type: 'ox', statement: '가장 현명한 사람은 모든 것을 아는 사람이다.', answer: false, feedback: '소크라테스에 따르면\n"자기가 모른다는 것을 아는 사람"이\n가장 현명한 사람이야!' },
      { type: 'multipleChoice', question: '소크라테스가 말한 진정한 지혜는?', options: ['많은 지식을 암기하는 것', '자기가 모른다는 걸 아는 것', '토론에서 이기는 것', '책을 많이 읽는 것'], correctIndex: 1, explanation: '"무지의 지혜" - 내가 모른다는 걸 아는 것이\n배움과 성장의 시작이야!' },
      { type: 'feedback', summary: '너 자신을 알라 = 성장의 첫 걸음', message: '2500년 전 지혜가 오늘도 유효해.\n나를 아는 것에서 모든 성장이 시작돼!' },
      { type: 'mission', mission: '"나는 어떤 사람인가?"\n5분간 자유롭게 적어보기', encouragement: '자기를 아는 사람이 세상을 아는 사람이야!' },
    ],
  },

  'humanities-platinum-2': {
    id: 'humanities-platinum-2', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 2,
    title: '공자 - 배움의 즐거움',
    cards: [
      { type: 'concept', title: '배우고 때때로 익히면 기쁘지 아니한가', description: '논어(論語) 첫 문장:\n"學而時習之 不亦說乎"\n(배우고 때때로 익히면 기쁘지 아니한가)\n\n공자는 2500년 전에 이미\n"반복 학습의 즐거움"을 말했어.\n\n배움은 의무가 아니라 기쁨이 될 수 있어.\n실천할 때 진짜 기쁨이 찾아온다는 뜻이야.' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '학(學)', description: '배우기 - 새로운 것 받아들이기' },
        { icon: '🔄', label: '습(習)', description: '익히기 - 반복하며 체화하기' },
        { icon: '😊', label: '열(悅)', description: '기쁨 - 깨달음의 즐거움' },
        { icon: '🤝', label: '인(仁)', description: '사람을 사랑하는 마음' },
      ]},
      { type: 'example', bad: { label: '의무로서의 공부', story: '"공부는 해야 하니까 하는 거야."\n억지로 하니 고통스럽고\n시험이 끝나면 다 잊어버렸다.' }, good: { label: '즐거움으로서의 공부', story: '"이걸 알게 되다니 신기하다!"\n배우는 것 자체를 즐기니\n자연스럽게 더 깊이 파게 됐다.' }},
      { type: 'ox', statement: '공자는 타고난 천재였다.', answer: false, feedback: '공자는 "나는 태어나면서 안 것이 아니라\n옛것을 좋아하여 열심히 구한 사람이다"라고 했어.\n노력의 사람이었지!' },
      { type: 'multipleChoice', question: '논어 첫 문장의 핵심 의미는?', options: ['공부는 고통스러운 것이다', '배움을 실천하면 기쁘다', '시험 성적이 중요하다', '혼자 공부하는 것이 최고다'], correctIndex: 1, explanation: '배우고(學) 익히면(習) 기쁘다(悅)!\n지식을 실제로 써먹을 때 진짜 기쁨이 와.' },
      { type: 'feedback', summary: '배움 + 실천 = 기쁨', message: '공자의 가르침:\n배움은 의무가 아니라 삶의 기쁨이야!' },
      { type: 'mission', mission: '오늘 배운 것을 즐겁게 실천하는 방법\n하나 찾아보기', encouragement: '배움의 기쁨을 아는 사람이 진짜 공부 고수야!' },
    ],
  },

  'humanities-platinum-3': {
    id: 'humanities-platinum-3', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 3,
    title: '스토아 철학 - 통제할 수 있는 것',
    cards: [
      { type: 'concept', title: '내가 바꿀 수 있는 것에 집중하기', description: '스토아 철학의 핵심:\n\n"바꿀 수 없는 것에 괴로워하지 말고\n바꿀 수 있는 것에 집중하라."\n\n❌ 바꿀 수 없는 것: 날씨, 남의 말, 과거\n✅ 바꿀 수 있는 것: 내 태도, 내 행동, 내 반응\n\n에픽테토스가 말했어:\n"중요한 건 일어난 일이 아니라\n그에 대한 네 반응이다."' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '통제 가능', description: '내 태도, 행동, 노력에 집중' },
        { icon: '🧘', label: '반응 선택', description: '상황이 아닌 반응을 선택' },
        { icon: '⏰', label: '현재 집중', description: '과거/미래 대신 지금에 집중' },
        { icon: '💪', label: '내면의 힘', description: '외부가 아닌 내면에서 답 찾기' },
      ]},
      { type: 'example', bad: { label: '통제 불가에 집착', story: '"왜 비가 와서 소풍을 망치는 거야!"\n바꿀 수 없는 날씨에 화를 내며\n하루를 망쳐버렸다.' }, good: { label: '스토아적 반응', story: '"비가 오네. 실내에서 재미있게 보내자!"\n바꿀 수 없는 건 받아들이고\n내가 할 수 있는 것에 집중했다.' }},
      { type: 'ox', statement: '모든 상황은 내가 통제할 수 있다.', answer: false, feedback: '모든 걸 통제할 순 없어.\n하지만 내 "반응"은 항상 선택할 수 있어!\n그것이 스토아 철학의 핵심이야.' },
      { type: 'multipleChoice', question: '스토아 철학의 핵심은?', options: ['모든 것을 참고 견디기', '내가 통제할 수 있는 것에 집중', '감정을 없애기', '운명에 순응하기'], correctIndex: 1, explanation: '참는 게 아니라 "선택"하는 거야.\n바꿀 수 있는 것에 에너지를 쓰는 거지!' },
      { type: 'feedback', summary: '스토아 = 바꿀 수 있는 것에 집중', message: '이 원칙 하나만 기억해도\n스트레스가 절반으로 줄어들 거야!' },
      { type: 'mission', mission: '오늘 걱정거리 중\n내가 바꿀 수 있는 것 1개에 집중하기', encouragement: '내 반응을 선택할 수 있다면 이미 강한 사람이야!' },
    ],
  },

  'humanities-platinum-4': {
    id: 'humanities-platinum-4', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 4,
    title: '캐롤 드웩 - 성장 마인드셋',
    cards: [
      { type: 'concept', title: '"아직" 못하는 것일 뿐', description: '스탠퍼드 대학 캐롤 드웩 교수의 연구:\n\n🔴 고정 마인드셋:\n"난 수학 못해" → 피하고, 포기\n\n🟢 성장 마인드셋:\n"난 아직 수학이 어려워" → 노력하고, 도전\n\n핵심 단어는 "아직(yet)"!\n"못한다"가 아니라 "아직 못한다"로 바꾸면\n뇌의 태도가 완전히 달라져.' },
      { type: 'summary', keywords: [
        { icon: '🌱', label: '성장 가능', description: '능력은 노력으로 키울 수 있다' },
        { icon: '💪', label: '노력 중시', description: '재능보다 노력이 중요' },
        { icon: '📚', label: '실패=배움', description: '실패는 성장의 기회' },
        { icon: '✨', label: 'Yet(아직)', description: '"못한다" → "아직 못한다"' },
      ]},
      { type: 'example', bad: { label: '고정 마인드셋', story: '"수학 시험 60점... 난 원래 수학 못해."\n포기하고 수학 공부를 아예 안 했다.\n성적은 더 떨어졌다.' }, good: { label: '성장 마인드셋', story: '"수학 시험 60점... 아직 부족하지만 더 노력하면 돼."\n틀린 문제를 분석하고 다시 풀었다.\n다음 시험에서 80점을 받았다.' }},
      { type: 'ox', statement: '지능은 태어날 때 정해진다.', answer: false, feedback: '뇌는 평생 변화하고 성장해!\n노력하면 새로운 신경회로가 만들어져.\n이것을 "신경가소성"이라고 해.' },
      { type: 'multipleChoice', question: '성장 마인드셋의 핵심 단어는?', options: ['천재', '재능', '아직(yet)', '완벽'], correctIndex: 2, explanation: '"아직"이라는 한 단어가 마법이야.\n"못해"를 "아직 못해"로 바꾸면\n뇌가 도전 모드로 전환돼!' },
      { type: 'feedback', summary: '성장 마인드셋 = "아직" 못하는 것일 뿐', message: '너의 능력은 고정된 게 아니야.\n노력할 때마다 뇌가 진짜로 성장해!' },
      { type: 'mission', mission: '"못한다"고 생각하는 것 하나를\n"아직"을 붙여 다시 말해보기', encouragement: '"아직"이라는 한 마디가 미래를 바꿔!' },
    ],
  },

  'humanities-platinum-5': {
    id: 'humanities-platinum-5', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 5,
    title: '세종대왕 - 백성을 위한 혁신',
    cards: [
      { type: 'concept', title: '모든 사람이 배울 수 있도록', description: '세종대왕은 왜 한글을 만들었을까?\n\n당시 백성의 대부분은 글을 못 읽었어.\n한자는 너무 어려워서 배우기 힘들었지.\n\n세종은 생각했어:\n"모든 백성이 쉽게 배울 수 있는\n글자가 있어야 한다."\n\n약자를 위해 혁신한 것.\n이것이 진정한 리더십이야!' },
      { type: 'summary', keywords: [
        { icon: '👑', label: '민본정신', description: '백성이 근본이라는 생각' },
        { icon: '📝', label: '한글 창제', description: '쉽고 과학적인 문자 발명' },
        { icon: '🔬', label: '실용주의', description: '실제 도움이 되는 학문 추구' },
        { icon: '💪', label: '끈기', description: '반대에도 포기하지 않는 의지' },
      ]},
      { type: 'example', bad: { label: '기득권 유지', story: '양반들은 한자를 독점하고 싶었다.\n"백성이 글을 알면 다스리기 어렵다"\n변화를 거부했다.' }, good: { label: '혁신적 리더십', story: '세종은 반대에도 굳건했다.\n"백성이 글을 알아야 스스로 성장한다"\n모두를 위한 글자를 만들었다.' }},
      { type: 'ox', statement: '한글은 세종대왕이 혼자 만들었다.', answer: false, feedback: '세종이 주도했지만\n집현전 학자들과 함께 연구하고 완성했어.\n위대한 성과도 협력의 결과야!' },
      { type: 'multipleChoice', question: '세종대왕의 한글 창제의 핵심 가치는?', options: ['왕의 권위를 높이기 위해', '모든 사람이 배울 수 있게', '다른 나라에 자랑하기 위해', '학자들의 연구 성과를 위해'], correctIndex: 1, explanation: '"나라 말이 중국과 달라 백성이 쓸 수 없으니..."\n모든 사람의 배움을 위한 혁신이었어!' },
      { type: 'feedback', summary: '세종 = 약자를 위한 혁신적 리더십', message: '진정한 리더는 가장 약한 사람을 위해\n행동하는 사람이야.' },
      { type: 'mission', mission: '"누군가를 돕기 위해\n내가 할 수 있는 작은 일" 생각해보기', encouragement: '작은 배려가 누군가에겐 큰 혁신이야!' },
    ],
  },

  'humanities-platinum-6': {
    id: 'humanities-platinum-6', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 6,
    title: '다산 정약용 - 실천하는 지식',
    cards: [
      { type: 'concept', title: '아는 것을 행동으로 옮기자', description: '조선 최고의 실학자 정약용.\n유배 18년 동안 무려 500여 권의 책을 썼어!\n\n그의 핵심 사상:\n"앎은 실천을 위한 것이다."\n\n아무리 많이 알아도\n행동으로 옮기지 않으면 의미가 없어.\n\n매일 기록하고, 배운 것을 실천한\n다산의 삶이 이것을 증명해.' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '기록 습관', description: '매일 배운 것을 기록하기' },
        { icon: '🏃', label: '실천 우선', description: '아는 것을 행동으로 옮기기' },
        { icon: '🔬', label: '실학 정신', description: '실제 도움이 되는 학문' },
        { icon: '📚', label: '끊임없는 학습', description: '어떤 상황에서도 배움을 멈추지 않기' },
      ]},
      { type: 'example', bad: { label: '앎에 머무름', story: '"운동이 건강에 좋다"는 걸 안다.\n하지만 실제로 운동은 안 한다.\n아는 것과 하는 것의 간극이 크다.' }, good: { label: '실천하는 앎', story: '"운동이 좋다는 걸 알았으니 오늘부터 걷자!"\n매일 15분 걷기를 시작했다.\n알고 실천하니 진짜 변화가 일어났다.' }},
      { type: 'ox', statement: '많이 알면 자연히 실천하게 된다.', answer: false, feedback: '아는 것과 실천하는 것은 완전히 다른 영역이야.\n의식적으로 행동으로 옮겨야 해!' },
      { type: 'multipleChoice', question: '정약용이 유배 18년간 500권을 쓸 수 있었던 이유는?', options: ['천재적 재능', '편안한 환경', '끊임없는 기록과 실천 정신', '많은 조수의 도움'], correctIndex: 2, explanation: '매일 기록하고 실천하는 습관!\n어려운 상황에서도 멈추지 않는\n실학 정신이 그를 위대하게 만들었어.' },
      { type: 'feedback', summary: '다산 정약용 = 앎 + 실천 + 기록', message: '배운 것을 기록하고 실천하는 것.\n이것이 진짜 공부의 완성이야!' },
      { type: 'mission', mission: '오늘 배운 것 하나를\n실제 행동으로 옮겨보기', encouragement: '실천하는 순간 지식이 지혜로 변해!' },
    ],
  },

  'humanities-platinum-7': {
    id: 'humanities-platinum-7', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 7,
    title: '아리스토텔레스 - 중용의 덕',
    cards: [
      { type: 'concept', title: '극단이 아닌 균형에서 최선을 찾기', description: '아리스토텔레스의 "중용(mesotes)" 사상:\n\n극단 사이의 적절한 균형이 최고의 선택이야.\n\n예시:\n무모함 ←→ 비겁함 → 용기(중용)\n방탕 ←→ 인색함 → 절제(중용)\n\n"중간"이 아니라\n상황에 맞는 "최적점"을 찾는 것이\n중용의 진짜 의미야.' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '중용', description: '극단 사이의 최적점 찾기' },
        { icon: '🎯', label: '균형', description: '과하지도 부족하지도 않게' },
        { icon: '🧘', label: '절제', description: '적절한 때 적절한 행동' },
        { icon: '💡', label: '실천적 지혜', description: '상황에 맞는 판단력' },
      ]},
      { type: 'example', bad: { label: '극단적 선택', story: '"공부만 하겠어!" 하루 16시간 공부.\n결국 번아웃이 와서\n한 달간 아무것도 못 했다.' }, good: { label: '중용의 실천', story: '"공부도 하고 쉼도 필요해."\n적절히 공부하고 적절히 쉬니\n꾸준히 오래갈 수 있었다.' }},
      { type: 'ox', statement: '항상 중간을 선택하면 된다.', answer: false, feedback: '중용은 "산술적 중간"이 아니야!\n상황에 맞는 최적의 선택을 하는 거야.\n때로는 과감한 용기가 중용이 될 수도 있어.' },
      { type: 'multipleChoice', question: '용기의 중용은?', options: ['무모함과 비겁함 사이의 적절한 용기', '항상 중간만 선택하는 것', '감정을 느끼지 않는 것', '위험을 피하는 것'], correctIndex: 0, explanation: '무모한 것도, 비겁한 것도 아닌\n상황에 맞는 적절한 용기가 중용이야!' },
      { type: 'feedback', summary: '중용 = 상황에 맞는 최적의 균형', message: '극단은 쉽지만 균형은 어려워.\n균형을 찾을 수 있는 사람이 진짜 강한 사람이야!' },
      { type: 'mission', mission: '오늘 극단적 생각이 들 때\n균형 잡힌 선택을 해보기', encouragement: '균형은 연습할수록 자연스러워져!' },
    ],
  },

  'humanities-platinum-8': {
    id: 'humanities-platinum-8', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 8,
    title: '빅터 프랭클 - 삶의 의미',
    cards: [
      { type: 'concept', title: '어떤 상황에서도 의미를 찾을 수 있다', description: '빅터 프랭클은 나치 수용소에서 살아남은 정신과 의사야.\n\n그곳에서 그는 발견했어:\n"모든 것을 빼앗길 수 있지만\n주어진 상황에 대한 태도를 선택할 자유는\n빼앗길 수 없다."\n\n가장 어두운 곳에서도\n의미를 찾는 사람은 버틸 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '의미 추구', description: '어떤 상황에서도 의미 찾기' },
        { icon: '🎯', label: '태도 선택', description: '상황은 못 바꿔도 태도는 선택' },
        { icon: '💪', label: '고난 극복', description: '의미가 있으면 버틸 수 있다' },
        { icon: '❤️', label: '로고테라피', description: '의미 치료 - 의미가 치유의 힘' },
      ]},
      { type: 'example', bad: { label: '의미 상실', story: '"왜 공부해야 하지? 의미 없어."\n목적 없이 흘러가니\n모든 것이 공허하게 느껴졌다.' }, good: { label: '의미 발견', story: '"이 공부가 미래의 나를 만든다."\n작은 것에서도 의미를 찾으니\n힘든 일도 견딜 수 있는 힘이 생겼다.' }},
      { type: 'ox', statement: '행복한 환경이 있어야 의미 있는 삶을 살 수 있다.', answer: false, feedback: '프랭클은 가장 끔찍한 환경에서도 의미를 찾았어.\n의미는 환경이 아니라 내면에서 찾는 거야!' },
      { type: 'multipleChoice', question: '프랭클이 수용소에서 발견한 것은?', options: ['탈출 방법', '어떤 상황에서도 태도를 선택할 자유', '분노의 힘', '복수의 의미'], correctIndex: 1, explanation: '"마지막 자유는 태도를 선택할 자유"\n이것이 프랭클의 가장 큰 발견이야.' },
      { type: 'feedback', summary: '의미를 찾는 자가 가장 강하다', message: '니체의 말처럼 "왜 살아야 하는지 아는 사람은\n어떤 상황도 견딜 수 있다."' },
      { type: 'mission', mission: '힘든 경험에서 배운 것이나\n의미 하나를 적어보기', encouragement: '고난 속에서 피는 꽃이 가장 아름다워!' },
    ],
  },

  'humanities-platinum-9': {
    id: 'humanities-platinum-9', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 9,
    title: '간디 - 변화는 나부터',
    cards: [
      { type: 'concept', title: '세상에서 보고 싶은 변화가 되어라', description: '마하트마 간디의 명언:\n"Be the change you wish to see in the world."\n(세상에서 보고 싶은 변화가 되어라)\n\n간디는 남을 바꾸려 하지 않았어.\n자기 자신이 먼저 변화의 본보기가 됐지.\n\n비폭력으로 영국 제국에 맞선 것도\n"내가 먼저 평화로운 사람이 되겠다"는\n솔선수범의 정신이었어.' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '솔선수범', description: '남에게 요구하기 전에 내가 먼저' },
        { icon: '☮️', label: '비폭력', description: '폭력 없이 진실의 힘으로' },
        { icon: '💎', label: '진실의 힘', description: '진심은 결국 통한다' },
        { icon: '🌱', label: '작은 실천', description: '거대한 변화도 한 걸음부터' },
      ]},
      { type: 'example', bad: { label: '남 탓하기', story: '"학교가 바뀌어야 해! 선생님이 바뀌어야 해!"\n남이 먼저 바뀌길 기다렸지만\n아무것도 변하지 않았다.' }, good: { label: '나부터 시작', story: '"내가 먼저 열심히 하고, 친절하게 대하자."\n내가 변하니 주변도 조금씩 변했다.\n한 사람의 변화가 파급 효과를 일으켰다.' }},
      { type: 'ox', statement: '한 사람의 행동은 세상을 바꿀 수 없다.', answer: false, feedback: '간디, 넬슨 만델라, 마틴 루터 킹...\n한 사람의 용기 있는 행동이 역사를 바꿨어!' },
      { type: 'multipleChoice', question: '간디의 비폭력 운동이 성공한 핵심 이유는?', options: ['군사적 힘이 있어서', '스스로 변화의 본보기가 되었기 때문', '영국이 약해서', '많은 돈이 있어서'], correctIndex: 1, explanation: '간디는 말로만 하지 않고\n자신이 먼저 실천했어.\n그 진정성이 수억 명을 움직였지!' },
      { type: 'feedback', summary: '변화는 나부터 시작된다', message: '세상을 바꾸고 싶다면\n먼저 내가 그 변화가 되자!' },
      { type: 'mission', mission: '바꾸고 싶은 것 하나를\n내가 먼저 실천해보기', encouragement: '너의 작은 변화가 세상을 바꾸는 시작이야!' },
    ],
  },

  'humanities-platinum-10': {
    id: 'humanities-platinum-10', chapterKey: 'humanities', tierKey: 'platinum', stageNumber: 10,
    title: '헬렌 켈러 - 한계를 넘는 의지',
    cards: [
      { type: 'concept', title: '불가능을 가능으로 바꾼 사람', description: '헬렌 켈러는 생후 19개월에\n시각과 청각을 모두 잃었어.\n\n하지만 설리번 선생님의 도움과\n본인의 끈기로\n대학을 졸업하고, 작가가 되고,\n사회운동가로 활동했지.\n\n"나의 한계가 곧 세상의 한계는 아니다."\n불가능이란 아직 방법을 모르는 것일 뿐!' },
      { type: 'summary', keywords: [
        { icon: '🔥', label: '도전 정신', description: '불가능에 도전하는 용기' },
        { icon: '👩‍🏫', label: '멘토의 힘', description: '좋은 스승이 인생을 바꾼다' },
        { icon: '💪', label: '한계 돌파', description: '장벽을 뛰어넘는 의지' },
        { icon: '🙏', label: '감사', description: '가진 것에 감사하는 마음' },
      ]},
      { type: 'example', bad: { label: '한계에 멈춤', story: '"나는 ○○을 못하니까 안 해."\n한계를 정해두고 시도조차 하지 않았다.\n가능성의 문을 스스로 닫아버렸다.' }, good: { label: '한계 돌파', story: '"어렵지만 방법을 찾아보자."\n도움을 받고 꾸준히 노력하니\n불가능하다고 생각한 것을 해냈다.' }},
      { type: 'ox', statement: '장애가 있으면 성공할 수 없다.', answer: false, feedback: '헬렌 켈러, 스티븐 호킹, 베토벤...\n한계를 넘어 위대한 업적을 남긴 사람들이 많아!' },
      { type: 'multipleChoice', question: '헬렌 켈러 성공의 핵심 요인은?', options: ['뛰어난 지능', '부유한 환경', '끈기와 좋은 스승(설리번 선생)', '운이 좋아서'], correctIndex: 2, explanation: '본인의 끈기와 설리번 선생님의 헌신!\n의지와 좋은 멘토의 조합이 불가능을 가능하게 했어.' },
      { type: 'feedback', summary: '한계 = 아직 방법을 못 찾은 것', message: '플래티넘 완료! 인문학의 지혜를 배웠어.\n다이아에서는 통합적 성장을 시작해!' },
      { type: 'mission', mission: '"불가능하다" 생각했던 것 하나에\n다시 도전하는 작은 행동 시작하기', encouragement: '네가 생각하는 한계는 진짜 한계가 아니야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (통합적 성장) 1~10
  // ═══════════════════════════════════════

  'humanities-diamond-1': {
    id: 'humanities-diamond-1', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 1,
    title: '자기 리더십',
    cards: [
      { type: 'concept', title: '나를 이끄는 힘', description: '리더십은 반장이나 사장만의 것이 아니야.\n\n자기 리더십이란\n스스로 목표를 세우고\n스스로 실행하고\n스스로 점검하는 능력이야.\n\n남이 시켜서가 아니라\n내가 원해서 움직이는 힘.\n\n이것이 모든 성공의 기본이야!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '비전 설정', description: '내가 가고 싶은 방향 정하기' },
        { icon: '📋', label: '자기 관리', description: '시간, 감정, 건강 스스로 관리' },
        { icon: '🏃', label: '실행력', description: '계획을 행동으로 옮기는 힘' },
        { icon: '🤝', label: '자기 약속', description: '나와의 약속을 지키는 신뢰' },
      ]},
      { type: 'example', bad: { label: '타인 의존', story: '"엄마가 시켜서 공부하고, 선생님이 시켜서 했다."\n혼자가 되니 뭘 해야 할지 모르고\n아무것도 하지 못했다.' }, good: { label: '자기 리더십', story: '"내가 원하는 미래를 위해 오늘 이것을 하자."\n스스로 계획하고 실행하니\n누가 보든 안 보든 꾸준히 성장했다.' }},
      { type: 'ox', statement: '리더십은 리더만 필요한 능력이다.', answer: false, feedback: '모든 사람에게 "자기 리더십"이 필요해!\n자기 인생의 리더는 바로 나 자신이야.' },
      { type: 'multipleChoice', question: '자기 리더십의 시작은?', options: ['남에게 지시하기', '자신과의 약속을 지키는 것', '경쟁에서 이기기', '많은 지식 쌓기'], correctIndex: 1, explanation: '나와의 약속을 지키는 것이 첫 걸음!\n작은 약속부터 지키면 자기 신뢰가 쌓여.' },
      { type: 'feedback', summary: '자기 리더십 = 나 자신을 이끄는 힘', message: '다이아몬드의 첫 걸음!\n내 인생의 주인공은 바로 나야.' },
      { type: 'mission', mission: '오늘 나 자신과의 약속 하나를\n정하고 반드시 지키기', encouragement: '작은 약속을 지키는 사람이 큰 인생을 만들어!' },
    ],
  },

  'humanities-diamond-2': {
    id: 'humanities-diamond-2', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 2,
    title: '감성 지능 (EQ)',
    cards: [
      { type: 'concept', title: '마음의 근육 키우기', description: '다니엘 골먼의 연구:\nIQ보다 EQ(감성 지능)가 성공을 더 잘 예측해.\n\n감성 지능 4요소:\n1️⃣ 자기 인식: 내 감정 알아차리기\n2️⃣ 자기 조절: 감정을 적절히 다루기\n3️⃣ 공감: 다른 사람의 마음 이해하기\n4️⃣ 관계 관리: 좋은 관계 만들기\n\n감정도 근육처럼 훈련할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 인식', description: '지금 내 감정이 뭔지 알기' },
        { icon: '🧘', label: '자기 조절', description: '감정에 휘둘리지 않기' },
        { icon: '❤️', label: '공감', description: '타인의 마음 이해하기' },
        { icon: '🤝', label: '관계 관리', description: '건강한 인간관계 만들기' },
      ]},
      { type: 'example', bad: { label: '낮은 EQ', story: '화가 나서 친구에게 소리를 질렀다.\n후회했지만 이미 관계가 깨졌다.\n감정에 휘둘린 결과였다.' }, good: { label: '높은 EQ', story: '"지금 화가 나는구나" 감정을 인식했다.\n잠시 멈추고 심호흡 후 차분히 말하니\n갈등을 해결하고 관계도 더 좋아졌다.' }},
      { type: 'ox', statement: 'IQ가 높으면 인생에서 반드시 성공한다.', answer: false, feedback: '연구에 따르면 성공의 80%는 EQ와 관련돼.\nIQ보다 감정을 다루는 능력이 더 중요해!' },
      { type: 'multipleChoice', question: '감성 지능이 높은 사람의 특징은?', options: ['감정을 느끼지 않는다', '항상 긍정적이다', '자기 감정을 정확히 인식하고 적절히 표현한다', '남의 감정을 무시한다'], correctIndex: 2, explanation: '감정을 없애는 게 아니라\n인식하고 적절히 다루는 것이 핵심이야!' },
      { type: 'feedback', summary: 'EQ = 감정을 이해하고 다루는 능력', message: '감정은 적이 아니라 나의 신호야.\n그 신호를 잘 읽을 수 있으면 인생이 달라져!' },
      { type: 'mission', mission: '오늘 느낀 감정 3개를\n이름 붙여 적어보기', encouragement: '감정에 이름을 붙이면 힘이 줄어들어!' },
    ],
  },

  'humanities-diamond-3': {
    id: 'humanities-diamond-3', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 3,
    title: '회복탄력성',
    cards: [
      { type: 'concept', title: '넘어져도 다시 일어나는 힘', description: '회복탄력성(Resilience)이란\n어려움을 겪은 후 다시 원래 상태로\n돌아오는 능력이야.\n\n중요한 건:\n강한 사람은 안 넘어지는 게 아니라\n넘어져도 다시 일어나는 사람이야.\n\n회복탄력성이 높은 사람의 특징:\n✅ 실패를 배움으로 봄\n✅ 주변에 도움을 요청할 수 있음\n✅ 긍정적 미래를 상상할 수 있음' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '회복력', description: '넘어져도 다시 일어나기' },
        { icon: '☀️', label: '낙관성', description: '어두운 터널 끝에 빛이 있다' },
        { icon: '💪', label: '자기 효능감', description: '"나는 해낼 수 있다"는 믿음' },
        { icon: '🤝', label: '사회적 지지', description: '도움을 요청할 수 있는 용기' },
      ]},
      { type: 'example', bad: { label: '무너짐', story: '시험에서 나쁜 점수를 받았다.\n"나는 안 돼..." 하며 포기했다.\n점점 더 나빠지는 악순환에 빠졌다.' }, good: { label: '회복탄력성', story: '시험에서 나쁜 점수를 받았다.\n"다음엔 이 부분을 더 공부하자."\n실패를 분석하고 다시 도전하니 성적이 올랐다.' }},
      { type: 'ox', statement: '강한 사람은 힘든 일에 흔들리지 않는다.', answer: false, feedback: '누구나 힘든 일에 흔들려.\n진짜 강한 사람은 흔들린 후 다시 일어나는 사람이야!' },
      { type: 'multipleChoice', question: '회복탄력성이 높은 사람의 특징은?', options: ['절대 실패하지 않는다', '감정을 느끼지 않는다', '실패를 성장의 기회로 본다', '혼자서 모든 것을 해결한다'], correctIndex: 2, explanation: '실패에서 배울 점을 찾는 것!\n이것이 회복탄력성의 핵심이야.' },
      { type: 'feedback', summary: '회복탄력성 = 다시 일어나는 힘', message: '넘어지지 않는 것이 중요한 게 아니야.\n몇 번이든 다시 일어나는 것이 진짜야!' },
      { type: 'mission', mission: '최근 실패나 어려움에서\n배운 점 1개 적어보기', encouragement: '실패에서 배우는 사람은 절대 지지 않아!' },
    ],
  },

  'humanities-diamond-4': {
    id: 'humanities-diamond-4', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 4,
    title: '그릿 (GRIT) - 열정과 끈기',
    cards: [
      { type: 'concept', title: '장기적 목표를 향한 열정 + 끈기', description: '펜실베이니아 대학 앤절라 더크워스 교수:\n\n"성공의 가장 큰 예측 변수는\n재능도, IQ도 아닌 그릿(GRIT)이다."\n\nGRIT = Guts(배짱) + Resilience(회복력)\n+ Initiative(주도성) + Tenacity(끈기)\n\n재능 있어도 그릿 없으면 멈추고,\n재능 없어도 그릿 있으면 결국 해낸다!' },
      { type: 'summary', keywords: [
        { icon: '🔥', label: '열정', description: '진심으로 좋아하는 것에 몰두' },
        { icon: '⛓️', label: '끈기', description: '어려워도 포기하지 않는 힘' },
        { icon: '🎯', label: '장기 목표', description: '멀리 보고 꾸준히 전진' },
        { icon: '💎', label: '꾸준함', description: '매일의 작은 노력이 쌓임' },
      ]},
      { type: 'example', bad: { label: '재능만 의존', story: '처음엔 재능으로 쉽게 했다.\n어려워지자 "내 재능은 여기까지인가" 포기.\n결국 끈기 있는 사람에게 뒤처졌다.' }, good: { label: '그릿', story: '처음엔 느렸지만 포기하지 않았다.\n매일 조금씩, 1년, 2년...\n결국 재능 있던 사람보다 더 높이 올라갔다.' }},
      { type: 'ox', statement: '재능이 없으면 노력해도 소용없다.', answer: false, feedback: '더크워스 교수의 연구:\n노력은 재능의 2배 가치가 있어!\n재능×노력=기술, 기술×노력=성취. 노력이 2번 들어가!' },
      { type: 'multipleChoice', question: '앤절라 더크워스의 그릿 공식은?', options: ['재능 × 기회', '열정 × 끈기', 'IQ × 노력', '환경 × 운'], correctIndex: 1, explanation: '그릿 = 열정(Passion) × 끈기(Perseverance)\n좋아하는 것을 꾸준히 하는 것이 성공의 열쇠야!' },
      { type: 'feedback', summary: '그릿 = 열정 × 끈기 = 성공', message: '재능보다 중요한 것은 포기하지 않는 마음이야.\n매일의 작은 노력이 기적을 만든다!' },
      { type: 'mission', mission: '1년 후 목표와\n그것을 위한 오늘의 한 걸음 적기', encouragement: '오늘의 한 걸음이 1년 후 기적이 돼!' },
    ],
  },

  'humanities-diamond-5': {
    id: 'humanities-diamond-5', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 5,
    title: '지연 만족 - 마시멜로 실험',
    cards: [
      { type: 'concept', title: '지금의 유혹을 참으면 더 큰 보상', description: '스탠퍼드 대학의 유명한 실험:\n\n"지금 마시멜로 1개를 먹거나\n15분 참으면 2개를 줄게."\n\n참은 아이들은 수십 년 후\n더 높은 성적, 더 좋은 건강, 더 안정된 삶!\n\n핵심은 "의지력"이 아니라 "전략"이야.\n유혹에서 주의를 돌리는 방법을 쓴 거야.' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '자기 통제', description: '즉각적 유혹을 조절하는 힘' },
        { icon: '🔮', label: '장기적 사고', description: '미래의 더 큰 보상을 상상' },
        { icon: '🧠', label: '전략 사용', description: '유혹에서 주의를 돌리는 방법' },
        { icon: '⚡', label: '의지력 관리', description: '의지력도 에너지처럼 관리' },
      ]},
      { type: 'example', bad: { label: '즉각적 만족', story: '공부해야 하는데 게임이 하고 싶다.\n"잠깐만"이라며 시작한 게임이 3시간.\n시험 전날 밤새는 악순환이 반복됐다.' }, good: { label: '지연 만족', story: '"지금 참으면 시험 끝나고 마음껏 할 수 있어."\n공부 끝낸 후 게임이 더 즐겁다는 걸 알았다.\n참은 후의 보상이 2배로 달콤했다.' }},
      { type: 'ox', statement: '의지력은 무한하다.', answer: false, feedback: '의지력도 에너지처럼 쓰면 줄어들어!\n그래서 "전략"이 중요해.\n유혹 자체를 멀리하는 게 가장 좋은 방법이야.' },
      { type: 'multipleChoice', question: '마시멜로 실험에서 참은 아이들의 공통점은?', options: ['마시멜로를 싫어했다', '유혹에서 주의를 돌리는 전략을 사용했다', '의지력이 태생적으로 강했다', '어른이 시켜서 참았다'], correctIndex: 1, explanation: '참은 아이들은 다른 곳을 보거나 노래를 불렀어.\n의지력이 아니라 전략이 핵심이야!' },
      { type: 'feedback', summary: '지연 만족 = 전략 + 더 큰 보상', message: '참는 게 아니라 전략적으로 선택하는 거야.\n미래의 나에게 선물을 주는 것!' },
      { type: 'mission', mission: '오늘 하나의 유혹을 30분 참아보고\n느낀 점 적기', encouragement: '30분을 참을 수 있으면 무엇이든 할 수 있어!' },
    ],
  },

  'humanities-diamond-6': {
    id: 'humanities-diamond-6', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 6,
    title: '몰입 (Flow) - 최고의 집중',
    cards: [
      { type: 'concept', title: '시간도 잊는 최고의 경험', description: '미하이 칙센트미하이의 연구:\n\n"플로우(Flow)"란\n도전과 실력이 딱 맞을 때\n시간도 잊고 빠져드는 최적 경험이야.\n\n조건:\n✅ 명확한 목표\n✅ 즉각적 피드백\n✅ 도전 ≈ 실력 (약간 높은 난이도)\n\n너무 쉬우면 지루하고\n너무 어려우면 불안하고\n딱 맞으면 몰입!' },
      { type: 'summary', keywords: [
        { icon: '🌊', label: '플로우', description: '시간도 잊는 완전한 몰입' },
        { icon: '⚖️', label: '도전-실력 균형', description: '약간 어려운 적절한 난이도' },
        { icon: '🎯', label: '명확한 목표', description: '뭘 해야 하는지 확실히 아는 상태' },
        { icon: '🔄', label: '즉각 피드백', description: '잘하고 있는지 바로 알 수 있음' },
      ]},
      { type: 'example', bad: { label: '지루함/불안', story: '너무 쉬운 문제를 반복하니 지루했다.\n너무 어려운 문제를 하니 불안했다.\n둘 다 집중이 안 됐다.' }, good: { label: '몰입 상태', story: '"약간 어렵지만 해볼 만한" 수준을 찾았다.\n도전하니 시간 가는 줄 모르고 빠져들었다.\n끝나고 나니 엄청난 성취감이 밀려왔다.' }},
      { type: 'ox', statement: '몰입은 특별한 사람만 경험할 수 있다.', answer: false, feedback: '누구나 몰입을 경험할 수 있어!\n적절한 난이도를 찾는 것이 핵심이야.' },
      { type: 'multipleChoice', question: '몰입 상태에 들어가려면?', options: ['최대한 쉬운 것부터 시작', '자기 실력보다 약간 높은 도전', '어려운 것만 계속하기', '동시에 여러 과제 하기'], correctIndex: 1, explanation: '실력보다 약간 높은 도전!\n이 "약간"이 몰입의 마법 공식이야.' },
      { type: 'feedback', summary: '몰입 = 적절한 도전 + 명확한 목표', message: '몰입을 자주 경험하는 사람이\n가장 행복하고 성장도 빠르다는 연구 결과가 있어!' },
      { type: 'mission', mission: '공부할 때 "약간 어렵지만 해볼 만한"\n수준을 찾아서 도전해보기', encouragement: '몰입의 순간을 맛보면 공부가 즐거워져!' },
    ],
  },

  'humanities-diamond-7': {
    id: 'humanities-diamond-7', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 7,
    title: '이타심의 과학',
    cards: [
      { type: 'concept', title: '남을 도우면 나도 행복해진다', description: '뇌과학 연구 결과:\n남을 도울 때 옥시토신이 분비되고\n행복감이 증가해.\n\n이것을 "헬퍼스 하이(Helper\'s High)"라고 해.\n\n봉사자들의 수명이 더 길고\n우울증이 적고\n삶의 만족도가 높다는 연구도 있어.\n\n이타심은 손해가 아니라\n과학적으로 검증된 행복의 전략이야!' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '옥시토신', description: '남을 도울 때 나오는 행복 호르몬' },
        { icon: '🔄', label: '선순환', description: '도우면 행복 → 더 도움 → 더 행복' },
        { icon: '🤝', label: '사회적 연결', description: '도움은 관계를 강화' },
        { icon: '🌟', label: '의미감', description: '누군가에게 도움이 된다는 보람' },
      ]},
      { type: 'example', bad: { label: '자기만 챙기기', story: '"내 것만 잘하면 돼" 하며 살았다.\n성적은 좋았지만 친구가 없고\n왠지 공허한 느낌이 들었다.' }, good: { label: '나눔 실천', story: '모르는 친구에게 공부법을 알려줬다.\n감사하다는 말에 가슴이 따뜻해지고\n가르치면서 나도 더 잘 이해하게 됐다.' }},
      { type: 'ox', statement: '남을 도우면 내가 손해 본다.', answer: false, feedback: '과학은 정반대를 말해!\n도움을 주면 행복 호르몬이 나오고\n건강도 좋아지고 관계도 강해져.' },
      { type: 'multipleChoice', question: '이타적 행동이 가져오는 효과는?', options: ['에너지가 줄어든다', '스트레스가 늘어난다', '옥시토신 분비와 행복감 증가', '시간만 낭비된다'], correctIndex: 2, explanation: '남을 도울 때 뇌에서 옥시토신이 나와.\n이것이 행복감과 유대감을 만들어 줘!' },
      { type: 'feedback', summary: '이타심 = 과학적으로 검증된 행복 전략', message: '남을 도우면 나도 행복해져.\n나눔은 빼기가 아니라 더하기야!' },
      { type: 'mission', mission: '오늘 주변 사람에게\n도움이 되는 작은 일 하나 하기', encouragement: '작은 친절이 세상을 따뜻하게 해!' },
    ],
  },

  'humanities-diamond-8': {
    id: 'humanities-diamond-8', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 8,
    title: '독서의 힘 - 평생 학습',
    cards: [
      { type: 'concept', title: '다른 사람의 인생을 빌려 경험하는 법', description: '워런 버핏은 매일 5~6시간 책을 읽어.\n빌 게이츠는 1년에 50권을 읽어.\n\n독서는:\n📚 수천 년의 지혜를 몇 시간에 흡수\n🧠 사고력과 집중력 향상\n❤️ 공감 능력 발달\n🌍 간접 경험의 폭 확대\n\n한 권의 책이 인생을 바꿀 수 있어.\n가장 비용 대비 효과적인 자기 투자야!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '간접 경험', description: '수천 년의 지혜를 빌려 경험' },
        { icon: '🧠', label: '사고 확장', description: '다양한 관점과 깊은 사고력' },
        { icon: '❤️', label: '공감 능력', description: '다른 사람의 삶을 이해' },
        { icon: '📈', label: '평생 학습', description: '학교 밖에서도 계속 성장' },
      ]},
      { type: 'example', bad: { label: '독서 기피', story: '"책은 재미없어. 영상이 더 좋아."\n짧은 콘텐츠만 보다 보니\n집중력이 떨어지고 깊은 사고가 안 됐다.' }, good: { label: '독서 습관', story: '하루 20분 독서를 시작했다.\n처음엔 어려웠지만 점점 재미가 붙었고\n1년 후 생각의 깊이가 완전히 달라졌다.' }},
      { type: 'ox', statement: '요즘 시대에 독서는 비효율적이다.', answer: false, feedback: '영상은 넓게 알려주지만 독서는 깊게 생각하게 해.\n둘 다 중요하지만 깊은 사고를 원한다면 독서가 최고야!' },
      { type: 'multipleChoice', question: '독서가 주는 가장 큰 효과는?', options: ['시험 점수 상승', '다양한 관점과 깊은 사고력', '빠른 정보 획득', '암기력 향상'], correctIndex: 1, explanation: '독서의 진짜 힘은 다양한 관점을 얻고\n깊이 생각하는 능력을 키우는 것이야!' },
      { type: 'feedback', summary: '독서 = 가장 효과적인 자기 투자', message: '"오늘의 나를 만든 것은 책이다."\n- 에이브러햄 링컨' },
      { type: 'mission', mission: '관심 있는 분야의 책 한 권을 골라\n오늘 10페이지만 읽어보기', encouragement: '10페이지가 인생을 바꾸는 첫 걸음이야!' },
    ],
  },

  'humanities-diamond-9': {
    id: 'humanities-diamond-9', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 9,
    title: '글쓰기의 힘',
    cards: [
      { type: 'concept', title: '생각을 정리하는 최고의 도구', description: '글을 쓰면:\n\n✏️ 흩어진 생각이 정리돼\n🧠 이해가 깊어져\n💪 표현력이 커져\n🪞 자기 성찰이 돼\n\n"나는 글을 쓰기 위해 생각하는 것이 아니라\n생각하기 위해 글을 쓴다."\n\n머릿속 생각은 흐릿하지만\n글로 적는 순간 선명해져.\n이것이 글쓰기의 마법이야!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '생각 정리', description: '흩어진 생각을 구조화' },
        { icon: '💡', label: '이해 심화', description: '쓰면서 더 깊이 이해' },
        { icon: '🗣️', label: '표현력', description: '내 생각을 명확히 전달' },
        { icon: '📔', label: '기록 습관', description: '성장의 발자취를 남기기' },
      ]},
      { type: 'example', bad: { label: '머릿속에만', story: '"그냥 머릿속으로 생각하면 되지."\n복잡한 고민이 맴돌기만 하고\n정리가 안 돼서 스트레스만 쌓였다.' }, good: { label: '글로 정리', story: '고민을 노트에 적어봤다.\n적다 보니 문제가 명확해지고\n해결책도 자연스럽게 떠올랐다.' }},
      { type: 'ox', statement: '글을 잘 쓰려면 타고나야 한다.', answer: false, feedback: '글쓰기는 100% 훈련 가능한 능력이야!\n매일 조금씩 쓰면 누구나 잘 쓸 수 있어.' },
      { type: 'multipleChoice', question: '글쓰기의 가장 큰 효과는?', options: ['글씨가 예뻐진다', '흩어진 생각을 구조화한다', '단어를 많이 외우게 된다', '시험 점수가 오른다'], correctIndex: 1, explanation: '글쓰기의 최대 장점은 생각을 정리하고\n구조화하는 것이야. 쓰면서 생각이 선명해져!' },
      { type: 'feedback', summary: '글쓰기 = 생각을 정리하는 최고의 도구', message: '매일 3줄 쓰는 것부터 시작해봐.\n작은 기록이 큰 지혜가 돼!' },
      { type: 'mission', mission: '오늘 하루를\n3줄로 요약하는 일기 써보기', encouragement: '3줄이면 충분해. 쓰는 게 중요해!' },
    ],
  },

  'humanities-diamond-10': {
    id: 'humanities-diamond-10', chapterKey: 'humanities', tierKey: 'diamond', stageNumber: 10,
    title: '나만의 철학 만들기',
    cards: [
      { type: 'concept', title: '지금까지의 지혜를 통합하자', description: '브론즈부터 다이아까지\n50단계의 여정을 해냈어!\n\n학습법, 사고법, 인문학 지혜, 성장 전략...\n이 모든 것을 통합해서\n"나만의 철학"을 만들 시간이야.\n\n나의 핵심 가치는 뭘까?\n나는 어떤 사람이 되고 싶을까?\n\n이 질문에 답할 수 있다면\n너만의 나침반이 완성되는 거야!' },
      { type: 'summary', keywords: [
        { icon: '🧭', label: '가치관 정립', description: '내가 가장 중요하게 생각하는 것' },
        { icon: '📜', label: '인생 철학', description: '나만의 원칙과 기준' },
        { icon: '💎', label: '핵심 가치', description: '어떤 상황에서도 변하지 않을 것' },
        { icon: '🌟', label: '방향 설정', description: '내 인생의 나침반' },
      ]},
      { type: 'example', bad: { label: '남의 기준', story: '"다들 이렇게 하니까 나도..."\n남의 기준으로 살다 보니\n행복하지도, 성공하지도 못했다.\n나만의 방향이 없었기 때문이다.' }, good: { label: '나의 철학', story: '"나는 성장, 배려, 꾸준함을 가장 중요하게 여겨."\n이 세 가지를 기준으로 결정을 내리니\n흔들리지 않고 나만의 길을 갈 수 있었다.' }},
      { type: 'ox', statement: '철학은 철학자만 하는 것이다.', answer: false, feedback: '모든 사람에게 자기만의 철학이 필요해!\n"나는 뭘 중요하게 여기는가?"\n이 질문이 바로 철학의 시작이야.' },
      { type: 'multipleChoice', question: '나만의 철학을 만드는 첫 단계는?', options: ['어려운 철학 책 읽기', '유명한 사람 따라하기', '내가 중요하게 생각하는 가치 3개 정하기', '모든 것을 의심하기'], correctIndex: 2, explanation: '핵심 가치를 정하는 것이 첫 걸음!\n나의 나침반이 될 3가지를 골라봐.' },
      { type: 'feedback', summary: '나만의 철학 = 인생의 나침반', message: '축하해! 다이아몬드 마지막 단계를 완료했어!\n50단계의 여정을 통해 너는 이미\n엄청나게 성장한 사람이야!' },
      { type: 'mission', mission: '"나의 핵심 가치 3가지"를 적어\n눈에 보이는 곳에 붙이기', encouragement: '이 3가지가 너의 인생을 이끌어줄 거야!\n정말 대단해, 여기까지 온 너를 응원해!' },
    ],
  },
}
