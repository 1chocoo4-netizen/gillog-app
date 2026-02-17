// 수학 영역 학습 콘텐츠 (브론즈 1~10, 실버 1~10, 골드 1~10, 플래티넘 1~10, 다이아 1~10)
import type { Stage } from './lessonData'

export const MATH_STAGES: Record<string, Stage> = {

  // ═══ 브론즈 (수학 공부법 기초) 1~10 ═══

  'math-bronze-1': {
    id: 'math-bronze-1', chapterKey: 'math', tierKey: 'bronze', stageNumber: 1,
    title: '수학적 사고란 무엇인가',
    cards: [
      { type: 'concept', title: '수학적 사고의 본질', description: '수학은 단순 계산이 아니야.\n논리적으로 생각하고, 패턴을 찾고, 문제를 구조화하는 능력이야.\n\n수학적 사고 3단계:\n1) 문제 이해 — 뭘 묻는지 파악\n2) 전략 수립 — 어떻게 풀지 계획\n3) 실행·검증 — 풀고 답 확인' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '논리적 사고', description: '원인과 결과를 따지는 힘' },
        { icon: '🔍', label: '패턴 인식', description: '반복 규칙을 찾는 능력' },
        { icon: '🏗️', label: '구조화', description: '복잡한 문제를 단계별로 나누기' },
        { icon: '✅', label: '검증 습관', description: '풀이 후 답을 확인하는 태도' },
      ]},
      { type: 'example', bad: { label: '민수', story: '문제를 보자마자 공식에 대입했다.\n왜 그 공식인지 몰라서 응용 문제를 못 풀었다.' }, good: { label: '지은', story: '"뭘 구해야 하지?" 먼저 정리하고 필요한 개념을 찾아 풀었다.\n응용 문제도 풀렸다.' }},
      { type: 'ox', statement: '수학을 잘하려면 공식을 많이 외우는 것이 가장 중요하다.', answer: false, feedback: '공식 암기보다 원리 이해가 더 중요해.\n이해하면 잊어도 다시 유도할 수 있어!' },
      { type: 'multipleChoice', question: '수학적 사고의 3단계 순서로 올바른 것은?', options: ['실행 → 이해 → 전략', '이해 → 전략 → 실행·검증', '전략 → 실행 → 이해', '암기 → 반복 → 시험'], correctIndex: 1, explanation: '이해 → 전략 → 실행·검증이 올바른 순서야.' },
      { type: 'feedback', summary: '수학 = 사고하는 과목', message: '문제 풀기 전 30초만 "뭘 원하는 거지?" 생각해보자!' },
      { type: 'mission', mission: '수학 문제 1개를 골라 풀기 전에\n"묻는 것"과 "사용할 개념"을 먼저 적어보기', encouragement: '생각하는 습관이 수학 실력의 시작이야!' },
    ],
  },

  'math-bronze-2': {
    id: 'math-bronze-2', chapterKey: 'math', tierKey: 'bronze', stageNumber: 2,
    title: '개념 이해 vs 문제 풀이',
    cards: [
      { type: 'concept', title: '개념 먼저, 문제는 나중에', description: '개념 없이 문제만 푸는 건 모래 위에 집 짓기야.\n\n효과적인 순서:\n1) 교과서로 개념 읽기\n2) 자기 말로 설명해보기\n3) 기본 문제로 확인\n4) 응용 문제로 확장\n\n"남에게 설명할 수 있으면 이해한 것"이야.' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '개념 먼저', description: '정의와 원리를 먼저 이해' },
        { icon: '🗣️', label: '설명하기', description: '자기 말로 설명해보는 연습' },
        { icon: '📝', label: '기본 문제', description: '쉬운 문제부터 시작' },
        { icon: '🚀', label: '응용 확장', description: '기본 후 심화로 넘어가기' },
      ]},
      { type: 'example', bad: { label: '현우', story: '교과서 안 보고 문제집만 풀었다.\n숫자만 바뀌면 틀렸다.' }, good: { label: '소영', story: '교과서 먼저 읽고 핵심을 자기 말로 정리했다.\n문제 풀 때 개념이 자연스럽게 연결됐다.' }},
      { type: 'ox', statement: '문제를 많이 풀면 자연스럽게 개념도 이해된다.', answer: false, feedback: '문제만 풀면 패턴 암기일 뿐이야.\n개념 먼저 이해하고 문제로 확인하는 게 맞아!' },
      { type: 'multipleChoice', question: '개념 이해를 확인하는 가장 좋은 방법은?', options: ['문제를 10개 이상 풀기', '친구에게 설명해보기', '공식을 3번 쓰기', '형광펜으로 밑줄 긋기'], correctIndex: 1, explanation: '설명할 수 있으면 진짜 이해한 거야. 파인만 학습법의 핵심!' },
      { type: 'feedback', summary: '개념 이해 → 설명 → 문제 풀이', message: '개념에 시간 투자하면 문제 풀이 시간은 오히려 줄어들어!' },
      { type: 'mission', mission: '오늘 배운 수학 개념 하나를\n1분 안에 소리 내어 설명해보기', encouragement: '설명할 수 있으면 시험에서도 풀 수 있어!' },
    ],
  },

  'math-bronze-3': {
    id: 'math-bronze-3', chapterKey: 'math', tierKey: 'bronze', stageNumber: 3,
    title: '문제 풀이 전략 세우기',
    cards: [
      { type: 'concept', title: '폴리아의 4단계 문제 해결법', description: '1단계 이해: 구하는 것, 조건 파악\n2단계 계획: 어떤 방법으로 풀지\n3단계 실행: 계획대로 풀기\n4단계 반성: 답 확인, 다른 방법 검토\n\n특히 1·4단계를 건너뛰는 학생이 많아.\n천천히 읽는 것만으로도 정답률이 올라!' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '이해', description: '묻는 것과 조건을 정확히 파악' },
        { icon: '🗺️', label: '계획', description: '사용할 개념을 미리 구상' },
        { icon: '✏️', label: '실행', description: '계획에 따라 차근차근 풀기' },
        { icon: '🔄', label: '반성', description: '답 확인 + 다른 풀이법 생각' },
      ]},
      { type: 'example', bad: { label: '준호', story: '문제를 대충 읽고 바로 풀었다.\n조건을 빠뜨려서 답이 틀렸다.' }, good: { label: '예진', story: '구하는 것에 밑줄, 조건에 동그라미 치고 풀었다.\n실수가 확 줄었다.' }},
      { type: 'ox', statement: '수학 문제는 빨리 풀수록 실력이 좋은 것이다.', answer: false, feedback: '빠른 것보다 정확한 게 중요해.\n정확히 푸는 습관이 결국 속도도 올려줘!' },
      { type: 'multipleChoice', question: '폴리아 4단계 중 학생들이 가장 자주 건너뛰는 단계는?', options: ['이해와 반성', '계획과 실행', '실행과 반성', '이해와 계획'], correctIndex: 0, explanation: '대충 읽고(이해 생략) 바로 풀고 확인 안 함(반성 생략).\n이 두 단계가 정답률을 좌우해!' },
      { type: 'feedback', summary: '이해→계획→실행→반성 4단계 습관화', message: '풀기 전 30초 생각, 풀고 30초 확인. 이 1분이 정답률을 높여!' },
      { type: 'mission', mission: '수학 문제 3개를 4단계로 풀어보기:\n①구하는 것 ②사용할 개념 ③풀이 ④답 확인', encouragement: '처음엔 느려도 이 습관이 실력을 폭발시켜!' },
    ],
  },

  'math-bronze-4': {
    id: 'math-bronze-4', chapterKey: 'math', tierKey: 'bronze', stageNumber: 4,
    title: '오답 노트의 힘',
    cards: [
      { type: 'concept', title: '오답 노트 = 최고의 수학 교재', description: '틀린 문제는 "내가 모르는 것"을 알려주는 보물이야.\n\n오답 노트 작성법:\n1) 문제 적기\n2) 틀린 풀이 적기\n3) 왜 틀렸는지 분석\n4) 올바른 풀이 적기\n5) 유사 문제 1개 더 풀기\n\n핵심은 "왜 틀렸는지" 분석이야.' },
      { type: 'summary', keywords: [
        { icon: '❌', label: '틀린 풀이', description: '틀린 풀이를 그대로 기록' },
        { icon: '🔎', label: '원인 분석', description: '계산 실수·개념 부족·오독 구분' },
        { icon: '⭕', label: '올바른 풀이', description: '정확한 풀이 다시 작성' },
        { icon: '🔁', label: '유사 문제', description: '비슷한 유형으로 복습' },
      ]},
      { type: 'example', bad: { label: '태현', story: '빨간 펜으로 답만 고쳤다.\n다음 시험에서 같은 유형을 또 틀렸다.' }, good: { label: '수빈', story: '틀린 이유를 "개념 부족"으로 분류하고 다시 공부했다.\n다음 시험에서 그 유형을 완벽히 맞았다.' }},
      { type: 'ox', statement: '오답 노트는 모든 틀린 문제를 다 적어야 효과가 있다.', answer: false, feedback: '다 적으면 지쳐서 포기해.\n반복해서 틀리는 문제만 적으면 돼!' },
      { type: 'multipleChoice', question: '오답 노트에서 가장 중요한 부분은?', options: ['예쁘게 옮겨 적기', '왜 틀렸는지 원인 분석', '답 외우기', '선생님 풀이 베끼기'], correctIndex: 1, explanation: '"왜 틀렸는지" 분석해야 같은 실수를 안 해!' },
      { type: 'feedback', summary: '오답 노트 = 원인 분석 + 유사 문제', message: '오답 노트는 시험 전날 최고의 복습 자료야!' },
      { type: 'mission', mission: '최근 틀린 수학 문제 1개를 골라\n①틀린 풀이 ②원인 ③올바른 풀이 정리하기', encouragement: '오답 하나를 제대로 분석하면 유사 문제 10개가 맞아!' },
    ],
  },

  'math-bronze-5': {
    id: 'math-bronze-5', chapterKey: 'math', tierKey: 'bronze', stageNumber: 5,
    title: '수학 불안감 극복하기',
    cards: [
      { type: 'concept', title: '수학 불안(Math Anxiety)', description: '수학 문제 보면 머리가 하얘지는 경험, 있지?\n\n불안 → 편도체 활성화 → 작업 기억 방해\n→ 실력이 아니라 불안이 문제 풀이를 막는 거야!\n\n극복법:\n1) "틀려도 괜찮아" 말하기\n2) 쉬운 문제부터 자신감 쌓기\n3) 심호흡 후 문제 읽기\n4) 수학을 게임처럼 도전하기' },
      { type: 'summary', keywords: [
        { icon: '😰', label: '수학 불안', description: '머리가 하얘지는 현상' },
        { icon: '🧠', label: '작업 기억', description: '불안이 뇌의 풀이 공간을 차지' },
        { icon: '💪', label: '자신감 먼저', description: '쉬운 문제로 성공 경험 쌓기' },
        { icon: '🎮', label: '게임 마인드', description: '틀려도 다시 도전하는 태도' },
      ]},
      { type: 'example', bad: { label: '하영', story: '"나는 수학 못해"라고 믿으며 시험을 봤다.\n아는 문제도 못 풀었다.' }, good: { label: '도윤', story: '심호흡 3번 하고 쉬운 문제부터 풀었다.\n자신감이 붙으니 어려운 문제도 도전할 수 있었다.' }},
      { type: 'ox', statement: '수학 시험에서 긴장하면 실력이 없는 것이다.', answer: false, feedback: '긴장은 실력과 별개야!\n불안 관리법을 배우면 원래 실력을 발휘할 수 있어.' },
      { type: 'multipleChoice', question: '수학 불안을 극복하는 가장 효과적인 방법은?', options: ['어려운 문제 억지로 풀기', '수학 포기하기', '쉬운 문제로 자신감 키우기', '시험 안 보기'], correctIndex: 2, explanation: '작은 성공이 자신감을 만들고, 자신감이 불안을 줄여줘!' },
      { type: 'feedback', summary: '수학 불안 = 마음 문제, 실력 문제 아님', message: '불안이 실력 발휘를 막고 있던 거야.\n"할 수 있다"고 말해보자!' },
      { type: 'mission', mission: '쉬운 문제 3개 → 보통 1개 → 도전 1개 순서로 풀기\n풀 때마다 "잘했어!"라고 말하기', encouragement: '작은 성공이 쌓여 큰 자신감이 돼!' },
    ],
  },

  'math-bronze-6': {
    id: 'math-bronze-6', chapterKey: 'math', tierKey: 'bronze', stageNumber: 6,
    title: '공식의 원리 이해하기',
    cards: [
      { type: 'concept', title: '공식은 외우는 게 아니라 이해하는 것', description: '삼각형 넓이 = 밑변 × 높이 ÷ 2\n왜 ÷2? 직사각형을 대각선으로 자르면 삼각형 2개니까!\n\n공식의 이유를 알면:\n1) 잊어도 다시 유도 가능\n2) 응용 문제에 적용 가능\n3) 새 공식도 쉽게 이해\n\n"왜?"를 묻는 습관이 공식을 내 것으로 만들어줘.' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '"왜?" 질문', description: '공식이 나온 이유 생각하기' },
        { icon: '🔗', label: '유도 과정', description: '만들어지는 과정 따라가기' },
        { icon: '🎨', label: '시각화', description: '그림으로 공식 의미 확인' },
        { icon: '💡', label: '응용력', description: '원리 알면 변형 문제도 풀 수 있음' },
      ]},
      { type: 'example', bad: { label: '성민', story: 'πr²을 무작정 외웠다.\n지름이 주어진 문제에서 막혔다.' }, good: { label: '유나', story: '원을 쪼개 펼치면 직사각형(πr × r)이 된다는 원리를 이해했다.\n어떤 변형 문제도 풀 수 있었다.' }},
      { type: 'ox', statement: '수학 공식은 증명 과정을 몰라도 외우기만 하면 충분하다.', answer: false, feedback: '외우기만 하면 변형에 약해.\n원리를 알면 잊어도 다시 유도할 수 있어!' },
      { type: 'multipleChoice', question: '삼각형 넓이 공식에서 ÷2를 하는 이유는?', options: ['직사각형의 절반이니까', '변이 3개니까', '높이가 밑변의 절반이니까', '수학자가 정한 것'], correctIndex: 0, explanation: '직사각형을 대각선으로 자르면 삼각형 2개!\n직사각형 넓이 ÷ 2 = 삼각형 넓이야.' },
      { type: 'feedback', summary: '"왜?"를 알면 수학이 쉬워진다', message: '새 공식을 만나면 "왜?"를 먼저 생각하자.\n이해한 공식은 절대 안 잊어!' },
      { type: 'mission', mission: '교과서에서 공식 1개를 골라\n"왜 성립하는지" 자기 말로 설명해보기', encouragement: '"왜?"를 묻는 순간 수학이 재미있어진다!' },
    ],
  },

  'math-bronze-7': {
    id: 'math-bronze-7', chapterKey: 'math', tierKey: 'bronze', stageNumber: 7,
    title: '계산 실수 줄이기',
    cards: [
      { type: 'concept', title: '계산 실수의 유형과 대처법', description: '계산 실수는 실력 부족이 아니라 습관 문제야.\n\n주요 실수 유형:\n① 부호 실수: (-3)×(-2)=-6 (정답: +6)\n② 자리 실수: 23×4=82 (정답: 92)\n③ 옮기기 실수: 중간 계산 옮길 때 숫자 변경\n④ 단위 실수: cm와 m 혼동\n\n해결법: 한 줄 한 단계, 생략 없이, 역산 확인!' },
      { type: 'summary', keywords: [
        { icon: '➖', label: '부호 실수', description: '부호 규칙 확인' },
        { icon: '📐', label: '자릿수 실수', description: '자릿수 정렬 주의' },
        { icon: '✍️', label: '한 줄 한 단계', description: '생략 없이 차근차근 적기' },
        { icon: '🔄', label: '역산 검증', description: '답을 원래 식에 대입 확인' },
      ]},
      { type: 'example', bad: { label: '재훈', story: '암산이 빠르다며 풀이를 생략했다.\n항상 "계산 실수..."라고 했다.' }, good: { label: '민지', story: '한 줄씩 적고 마지막에 역산 확인했다.\n시험에서 계산 실수 0개!' }},
      { type: 'ox', statement: '암산을 잘하면 계산 실수를 줄일 수 있다.', answer: false, feedback: '암산 능력과 실수는 다른 문제야.\n꼼꼼히 적는 습관이 가장 확실한 방법!' },
      { type: 'multipleChoice', question: '계산 실수를 줄이는 가장 효과적인 방법은?', options: ['더 빨리 풀기', '한 줄 한 단계 + 역산 확인', '어려운 문제 많이 풀기', '계산기 사용'], correctIndex: 1, explanation: '과정 생략 없이 적고 역산으로 확인하면 실수를 잡을 수 있어!' },
      { type: 'feedback', summary: '계산 실수 = 습관으로 고치는 문제', message: '한 줄 더 적는 습관이 시험 10점을 올려줘!' },
      { type: 'mission', mission: '수학 문제 3개를 모든 계산 과정을 한 줄씩 적으며 풀기\n다 풀고 역산으로 확인하기', encouragement: '꼼꼼함이 수학 점수의 비밀 무기야!' },
    ],
  },

  'math-bronze-8': {
    id: 'math-bronze-8', chapterKey: 'math', tierKey: 'bronze', stageNumber: 8,
    title: '그래프 읽는 법',
    cards: [
      { type: 'concept', title: '그래프는 숫자의 그림이다', description: '그래프 읽을 때 확인할 5가지:\n1) 제목: 무엇을 나타낸 그래프?\n2) x축(가로): 무엇을 나타내나?\n3) y축(세로): 무엇을 나타내나?\n4) 단위: 숫자의 단위는?\n5) 추세: 올라가나, 내려가나, 일정한가?\n\n이 5가지만 확인하면 어떤 그래프든 읽을 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '축 확인', description: 'x축과 y축이 무엇인지 파악' },
        { icon: '📏', label: '단위 확인', description: 'cm, kg, 원 등 단위 파악' },
        { icon: '📈', label: '추세 파악', description: '증가/감소/일정 흐름 읽기' },
        { icon: '🔍', label: '특이점', description: '급변하는 구간이나 꺾이는 점' },
      ]},
      { type: 'example', bad: { label: '서현', story: '막대 높이만 비교했다.\n단위가 "만 원"인 걸 놓쳐 답이 10배 차이났다.' }, good: { label: '윤서', story: '제목→축→단위→추세 순서로 읽었다.\n단위를 먼저 확인해 정확한 답을 구했다.' }},
      { type: 'ox', statement: '그래프에서 가장 먼저 봐야 할 것은 가장 큰 값이다.', answer: false, feedback: '값보다 축과 단위를 먼저 확인해야 해.\n단위 모르면 숫자 의미를 알 수 없어!' },
      { type: 'multipleChoice', question: '그래프를 읽을 때 올바른 순서는?', options: ['값 비교 → 축 → 단위', '제목 → 축 → 단위 → 추세', '색깔 → 크기 → 숫자', '큰 값 → 작은 값'], correctIndex: 1, explanation: '제목 → 축 → 단위 → 추세가 정확한 그래프 읽기야!' },
      { type: 'feedback', summary: '그래프 = 제목→축→단위→추세', message: '이 순서만 기억하면 어떤 그래프든 두렵지 않아!' },
      { type: 'mission', mission: '교과서나 뉴스에서 그래프 1개를 찾아\n제목·축·단위·추세를 분석하고 한 문장으로 정리하기', encouragement: '그래프 읽기는 수학을 넘어 세상을 읽는 힘이야!' },
    ],
  },

  'math-bronze-9': {
    id: 'math-bronze-9', chapterKey: 'math', tierKey: 'bronze', stageNumber: 9,
    title: '일상 속 수학 발견하기',
    cards: [
      { type: 'concept', title: '수학은 교과서 밖에도 있다', description: '일상 속 수학 예시:\n• 마트 할인: 30% 할인이면 얼마?\n• 요리: 2인분 → 4인분 비율 조정\n• 용돈: 한 달 예산 세우기\n• 게임: 확률, 데미지 비교\n\n수학을 "시험 과목"이 아닌 "문제 해결 도구"로 보면\n훨씬 재미있어져!' },
      { type: 'summary', keywords: [
        { icon: '🛒', label: '할인 계산', description: '%할인 가격 계산' },
        { icon: '🍳', label: '비율 조정', description: '레시피 인원수 조절' },
        { icon: '💰', label: '예산 관리', description: '지출 계획에 연산 활용' },
        { icon: '🎮', label: '게임 수학', description: '확률·데미지에 숨은 수학' },
      ]},
      { type: 'example', bad: { label: '영훈', story: '"수학은 시험에서만 쓰는 거지."\n흥미가 없으니 의욕도 없었다.' }, good: { label: '하린', story: '"2+1과 30% 할인 중 뭐가 이득이지?" 계산해봤다.\n수학이 돈을 아끼게 해준다니 재미있어졌다.' }},
      { type: 'ox', statement: '일상생활에서 수학을 사용하는 경우는 거의 없다.', answer: false, feedback: '할인, 시간 관리, 요리, 게임 등 하루에도 수십 번 써.\n의식 못할 뿐이야!' },
      { type: 'multipleChoice', question: '다음 중 수학이 사용되지 않는 상황은?', options: ['할인 가격 계산', '레시피 인원수 조정', '게임 데미지 비교', '모두 수학이 쓰인다'], correctIndex: 3, explanation: '할인은 백분율, 요리는 비례, 게임은 연산과 확률이야!' },
      { type: 'feedback', summary: '수학 = 생활 도구', message: '일상에서 수학을 찾으면 공부 동기도 올라가!' },
      { type: 'mission', mission: '오늘 하루 일상에서 수학 쓰이는 순간 3가지 찾아보기', encouragement: '수학이 보이기 시작하면 세상이 다르게 보여!' },
    ],
  },

  'math-bronze-10': {
    id: 'math-bronze-10', chapterKey: 'math', tierKey: 'bronze', stageNumber: 10,
    title: '수학 학습 루틴 만들기',
    cards: [
      { type: 'concept', title: '꾸준한 수학 학습 루틴', description: '몰아서보다 매일 조금씩이 효과적이야.\n\n추천 일일 루틴 (30분):\n• 5분: 어제 복습 (오답 노트)\n• 10분: 새 개념 (교과서)\n• 10분: 문제 풀기 (기본→응용)\n• 5분: 틀린 문제 정리\n\n핵심: 매일 같은 시간, 양보다 질, 복습 후 새것!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '매일 30분', description: '매일 하는 것이 핵심' },
        { icon: '🔄', label: '복습 먼저', description: '어제 것 간단히 복습' },
        { icon: '📊', label: '기본→응용', description: '쉬운 문제 후 도전' },
        { icon: '📝', label: '오답 정리', description: '마무리는 틀린 문제 정리' },
      ]},
      { type: 'example', bad: { label: '벼락치기', story: '시험 전날 5시간 몰아서 했다.\n시험에서 기억이 안 났다.' }, good: { label: '매일 30분', story: '매일 저녁 8시에 30분 루틴을 정했다.\n시험 전엔 여유롭게 복습만 하면 됐다.' }},
      { type: 'ox', statement: '시험 전에 집중적으로 공부하는 것이 매일 조금씩보다 효과적이다.', answer: false, feedback: '벼락치기는 단기 기억뿐이야.\n매일 조금씩이 장기 기억으로 가는 지름길!' },
      { type: 'multipleChoice', question: '효과적인 수학 학습 루틴의 핵심은?', options: ['주말에 3시간씩', '매일 같은 시간 30분씩', '기분 좋을 때만', '시험 2주 전부터'], correctIndex: 1, explanation: '"매일 같은 시간"이 습관 형성에 가장 좋아. 꾸준함이 실력!' },
      { type: 'feedback', summary: '매일 30분 = 복습→학습→문제→정리', message: '브론즈 과정 완료! 기초 습관을 다졌으니\n실버에서 본격적인 수학 개념을 배워보자!' },
      { type: 'mission', mission: '나만의 수학 루틴 만들기:\n①매일 공부 시간 정하기 ②30분 배분 ③오늘 시작!', encouragement: '오늘 시작한 30분이 1년 뒤 놀라운 실력이 돼!' },
    ],
  },

  // ═══ 실버 (수와 연산) 1~10 ═══

  'math-silver-1': {
    id: 'math-silver-1', chapterKey: 'math', tierKey: 'silver', stageNumber: 1,
    title: '자연수와 정수의 세계',
    cards: [
      { type: 'concept', title: '수의 확장: 자연수 → 정수', description: '자연수: 1, 2, 3... (세는 수)\n"3 - 5 = ?" → 자연수로 답 못해.\n\n그래서 정수 탄생: ..., -2, -1, 0, 1, 2, ...\n양의 정수(+): 이익, 영상\n음의 정수(-): 손해, 영하\n0: 기준점\n\n수직선: 오른쪽 = 크다, 왼쪽 = 작다' },
      { type: 'summary', keywords: [
        { icon: '🔢', label: '자연수', description: '1, 2, 3... 세는 수' },
        { icon: '➖', label: '음의 정수', description: '0보다 작은 수' },
        { icon: '⭕', label: '0', description: '양수와 음수의 기준점' },
        { icon: '↔️', label: '수직선', description: '오른쪽이 크고 왼쪽이 작다' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"3이 1보다 크니까 -3이 -1보다 크다"\n수직선에서 -3은 -1보다 왼쪽(더 작음)이야.' }, good: { label: '올바른 이해', story: '수직선을 그려보니 -3이 -1보다 왼쪽.\n왼쪽이 더 작으니까 -3 < -1!' }},
      { type: 'ox', statement: '-5는 -2보다 크다.', answer: false, feedback: '수직선에서 -5는 -2보다 왼쪽이야.\n음수는 절댓값이 클수록 더 작아!' },
      { type: 'multipleChoice', question: '작은 것부터 순서대로 나열한 것은?', options: ['-1, 0, -3, 2', '-3, -1, 0, 2', '0, -1, -3, 2', '2, 0, -1, -3'], correctIndex: 1, explanation: '수직선 왼쪽부터: -3 → -1 → 0 → 2' },
      { type: 'feedback', summary: '자연수 → 정수로 수의 세계 확장', message: '음수를 이해하면 온도, 돈, 높이 등을 수로 표현할 수 있어!' },
      { type: 'mission', mission: '수직선에 -4, -1, 0, 3, 5를 표시하고\n크기 순서대로 나열해보기', encouragement: '수직선은 수학의 지도야!' },
    ],
  },

  'math-silver-2': {
    id: 'math-silver-2', chapterKey: 'math', tierKey: 'silver', stageNumber: 2,
    title: '분수의 이해',
    cards: [
      { type: 'concept', title: '분수 = 전체를 나눈 것의 일부', description: '피자 4조각 중 1조각 = 1/4\n\n분자(위): 가진 양 / 분모(아래): 나눈 수\n진분수: 분자 < 분모 (1/3)\n가분수: 분자 ≥ 분모 (5/3)\n대분수: 정수 + 진분수 (1⅔)\n\n비교: 통분하면 쉬워!\n1/3 vs 1/4 → 4/12 > 3/12 → 1/3이 더 커!' },
      { type: 'summary', keywords: [
        { icon: '🍕', label: '분수', description: '나눈 것의 일부를 나타내는 수' },
        { icon: '⬆️', label: '분자', description: '위의 수, 가진 양' },
        { icon: '⬇️', label: '분모', description: '아래 수, 나눈 개수' },
        { icon: '⚖️', label: '통분', description: '분모를 같게 만들어 비교' },
      ]},
      { type: 'example', bad: { label: '잘못된 비교', story: '"4가 3보다 크니까 1/4이 1/3보다 크다!"\n분모가 클수록 조각이 작아지는 걸 몰랐다.' }, good: { label: '올바른 비교', story: '피자를 그려봤다. 4등분 < 3등분 조각.\n→ 1/4 < 1/3' }},
      { type: 'ox', statement: '분모가 큰 분수가 항상 더 큰 수이다.', answer: false, feedback: '분모가 크면 조각이 더 작아져!\n1/10은 1/2보다 훨씬 작아.' },
      { type: 'multipleChoice', question: '2/5와 3/5 중 더 큰 수는?', options: ['2/5', '3/5', '같다', '비교 불가'], correctIndex: 1, explanation: '분모가 같으면 분자가 큰 쪽이 커! 3/5 > 2/5' },
      { type: 'feedback', summary: '분수 = 나눈 것의 일부, 통분으로 비교', message: '피자, 케이크로 상상하면 분수가 쉬워져!' },
      { type: 'mission', mission: '원 2개를 그려 하나는 3등분, 하나는 4등분 하고\n1/3과 1/4 크기를 눈으로 비교하기', encouragement: '그림으로 보면 분수가 한눈에 이해돼!' },
    ],
  },

  'math-silver-3': {
    id: 'math-silver-3', chapterKey: 'math', tierKey: 'silver', stageNumber: 3,
    title: '소수의 이해',
    cards: [
      { type: 'concept', title: '소수 = 분수의 다른 표현', description: '1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75\n\n소수점 자리:\n• 첫째: 1/10 (0.1)\n• 둘째: 1/100 (0.01)\n• 셋째: 1/1000 (0.001)\n\n예: 3.14 = 3 + 0.1 + 0.04\n\n주의: 0.3 ≠ 0.03 (10배 차이!)' },
      { type: 'summary', keywords: [
        { icon: '🔵', label: '소수', description: '10의 거듭제곱으로 나타낸 분수' },
        { icon: '📍', label: '소수점', description: '정수와 소수 부분 구분' },
        { icon: '🔟', label: '자릿값', description: '첫째=1/10, 둘째=1/100' },
        { icon: '🔄', label: '변환', description: '소수 ↔ 분수 자유 변환' },
      ]},
      { type: 'example', bad: { label: '잘못된 비교', story: '"15가 9보다 크니까 0.15 > 0.9!"\n자릿값을 무시한 실수.' }, good: { label: '올바른 비교', story: '0.15 = 15/100, 0.9 = 90/100\n90 > 15이니까 0.9 > 0.15!' }},
      { type: 'ox', statement: '0.5와 0.50은 다른 수이다.', answer: false, feedback: '마지막 0은 의미 없어.\n0.5 = 0.50 = 1/2 모두 같은 수!' },
      { type: 'multipleChoice', question: '0.3 + 0.07 = ?', options: ['0.10', '0.37', '0.307', '1.0'], correctIndex: 1, explanation: '0.30 + 0.07 = 0.37\n소수점 맞춰서 계산!' },
      { type: 'feedback', summary: '소수 = 분수의 10진법 표현', message: '소수와 분수를 자유롭게 쓸 수 있으면 수학이 편해져!' },
      { type: 'mission', mission: '분수→소수, 소수→분수로 바꿔보기:\n1/5=? | 3/4=? | 0.6=? | 0.125=?', encouragement: '자유자재로 바꾸는 게 수학 기본기야!' },
    ],
  },

  'math-silver-4': {
    id: 'math-silver-4', chapterKey: 'math', tierKey: 'silver', stageNumber: 4,
    title: '비와 비율',
    cards: [
      { type: 'concept', title: '비와 비율', description: '비: 두 양 비교 (남:여 = 3:5)\n비율: 비를 수로 표현 (3/8 = 37.5%)\n\n비의 성질: 양쪽에 같은 수를 곱해도 같은 비\n3:5 = 6:10 = 9:15\n\n실생활: 지도 축척, 레시피 비율, 속도 계산' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '비', description: '두 양을 ":"로 비교' },
        { icon: '📊', label: '비율', description: '비를 분수나 소수로 표현' },
        { icon: '✖️', label: '비의 성질', description: '같은 수 곱/나눠도 같은 비' },
        { icon: '🗺️', label: '실생활', description: '지도, 요리, 속도에 활용' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"남녀비 3:5에서 남자 비율 = 3/5"\n전체(8)가 아닌 여자 수(5)로 나눈 실수.' }, good: { label: '올바른 이해', story: '전체 = 3+5 = 8\n남자 비율 = 3/8, 여자 비율 = 5/8' }},
      { type: 'ox', statement: '비 2:3과 4:6은 같은 비이다.', answer: true, feedback: '2:3에 2를 곱하면 4:6. 같은 비!' },
      { type: 'multipleChoice', question: '사과 12개를 2:1로 나누면?', options: ['6, 6개', '8, 4개', '9, 3개', '10, 2개'], correctIndex: 1, explanation: '전체 3등분, 12÷3=4\n큰 쪽: 4×2=8, 작은 쪽: 4×1=4' },
      { type: 'feedback', summary: '비 = 비교, 비율 = 수치화', message: '요리, 지도, 할인 계산에 유용한 개념이야!' },
      { type: 'mission', mission: '반 친구들의 남녀 비를 구하고\n각각의 비율(%)까지 계산해보기', encouragement: '비와 비율은 세상을 수로 표현하는 도구야!' },
    ],
  },

  'math-silver-5': {
    id: 'math-silver-5', chapterKey: 'math', tierKey: 'silver', stageNumber: 5,
    title: '백분율(%) 완전 정복',
    cards: [
      { type: 'concept', title: '백분율 = 전체를 100으로 본 비율', description: '변환: 분수→% = 분자÷분모×100\n3/4 = 0.75 = 75%\n%→분수 = %÷100 (40% = 2/5)\n\n할인: 정가 10,000원 × 30% = 3,000원 할인\n시험: 80문제 중 60개 = 75%' },
      { type: 'summary', keywords: [
        { icon: '%', label: '백분율', description: '전체 100 기준 비율' },
        { icon: '🔄', label: '변환', description: '분수↔소수↔% 자유변환' },
        { icon: '🏷️', label: '할인', description: '정가 × 할인율 = 할인액' },
        { icon: '📊', label: '비율 표현', description: '점수, 달성률을 %로 표현' },
      ]},
      { type: 'example', bad: { label: '잘못된 계산', story: '"50% + 20% 추가 = 70% 할인!"\n실제: 50%할인→5,000원, 20%추가→4,000원(60%)' }, good: { label: '올바른 계산', story: '10,000 → 50%할인 → 5,000원\n5,000 → 20%할인 → 4,000원\n실제 할인율: 60%' }},
      { type: 'ox', statement: '50% 할인 후 20% 추가 할인은 총 70% 할인과 같다.', answer: false, feedback: '할인은 남은 금액에 적용!\n0.5 × 0.8 = 0.4 → 60% 할인이야.' },
      { type: 'multipleChoice', question: '40문제 중 30개 맞으면 점수는?', options: ['30%', '40%', '75%', '80%'], correctIndex: 2, explanation: '30÷40×100 = 75%!' },
      { type: 'feedback', summary: '백분율 = 생활 속 가장 많이 쓰이는 비율', message: '할인, 이자, 세금 등 돈과 관련된 모든 곳에 나와!' },
      { type: 'mission', mission: '온라인 쇼핑에서 할인 상품 3개의\n원래 가격과 할인 후 가격을 계산해보기', encouragement: '백분율 마스터 = 현명한 소비자!' },
    ],
  },

  'math-silver-6': {
    id: 'math-silver-6', chapterKey: 'math', tierKey: 'silver', stageNumber: 6,
    title: '약수와 배수',
    cards: [
      { type: 'concept', title: '약수와 배수의 관계', description: '약수: 나누어떨어지게 하는 수\n12의 약수: 1, 2, 3, 4, 6, 12\n\n배수: 그 수에 자연수를 곱한 수\n3의 배수: 3, 6, 9, 12...\n\n"3은 12의 약수" = "12는 3의 배수"\n\n약수 찾기: 쌍으로!\n12 = 1×12 = 2×6 = 3×4\n\n최대공약수: 공통 약수 중 가장 큰 것\n최소공배수: 공통 배수 중 가장 작은 것' },
      { type: 'summary', keywords: [
        { icon: '÷', label: '약수', description: '나누어떨어지게 하는 수' },
        { icon: '✖️', label: '배수', description: '그 수의 곱셈 결과' },
        { icon: '🤝', label: '최대공약수', description: '공통 약수 중 가장 큰 수' },
        { icon: '🔗', label: '최소공배수', description: '공통 배수 중 가장 작은 수' },
      ]},
      { type: 'example', bad: { label: '빠뜨림', story: '18의 약수에서 9와 18을 빠뜨렸다.' }, good: { label: '쌍으로 찾기', story: '18 = 1×18 = 2×9 = 3×6\n빠짐없이: 1, 2, 3, 6, 9, 18' }},
      { type: 'ox', statement: '1은 모든 자연수의 약수이다.', answer: true, feedback: '어떤 수든 1로 나누면 나누어떨어져!' },
      { type: 'multipleChoice', question: '12와 18의 최대공약수는?', options: ['2', '3', '6', '36'], correctIndex: 2, explanation: '공통 약수: 1, 2, 3, 6 → 최대공약수: 6' },
      { type: 'feedback', summary: '약수·배수 = 수의 관계 기초', message: '분수 통분, 공약수 등 앞으로 계속 쓰이는 개념이야!' },
      { type: 'mission', mission: '24의 약수를 모두 구하고\n24와 36의 최대공약수 찾기', encouragement: '쌍으로 찾으면 절대 빠뜨리지 않아!' },
    ],
  },

  'math-silver-7': {
    id: 'math-silver-7', chapterKey: 'math', tierKey: 'silver', stageNumber: 7,
    title: '소인수분해',
    cards: [
      { type: 'concept', title: '소수와 소인수분해', description: '소수: 1과 자신만 약수인 수 (2, 3, 5, 7, 11...)\n\n소인수분해: 수를 소수의 곱으로 표현\n60 = 2² × 3 × 5\n\n활용:\n• 약수 구하기\n• 최대공약수/최소공배수 구하기\n이 모든 게 소인수분해로 해결!' },
      { type: 'summary', keywords: [
        { icon: '⭐', label: '소수', description: '1과 자신만 약수인 수' },
        { icon: '🌳', label: '소인수분해', description: '소수의 곱으로 쪼개기' },
        { icon: '📐', label: '약수 개수', description: '지수+1을 곱하면 약수 개수' },
        { icon: '🧩', label: 'GCD/LCM', description: '소인수분해로 쉽게 구함' },
      ]},
      { type: 'example', bad: { label: '비효율적', story: '72와 90의 최대공약수를 약수 나열로 구했다.\n시간이 오래 걸렸다.' }, good: { label: '소인수분해', story: '72=2³×3², 90=2×3²×5\n공통 작은 지수: 2¹×3²=18!' }},
      { type: 'ox', statement: '1은 소수이다.', answer: false, feedback: '1은 소수 아니야! 가장 작은 소수는 2야.' },
      { type: 'multipleChoice', question: '36을 소인수분해하면?', options: ['4 × 9', '2² × 3²', '6 × 6', '2 × 3 × 6'], correctIndex: 1, explanation: '36 = 4×9 = 2²×3²\n소수의 곱으로 완전히 분해!' },
      { type: 'feedback', summary: '소인수분해 = 수학의 만능 도구', message: '약수, 최대공약수, 최소공배수를 한 방에 해결!' },
      { type: 'mission', mission: '소인수분해해보기: ①48 ②120 ③84\n48과 120의 최대공약수도 구하기', encouragement: '소인수분해는 수의 DNA를 읽는 것과 같아!' },
    ],
  },

  'math-silver-8': {
    id: 'math-silver-8', chapterKey: 'math', tierKey: 'silver', stageNumber: 8,
    title: '정수의 사칙연산',
    cards: [
      { type: 'concept', title: '음수가 포함된 계산', description: '덧셈: (+3)+(-5)=-2 (큰 절댓값 부호)\n뺄셈→덧셈: (+3)-(+5)=(+3)+(-5)=-2\n\n곱셈·나눗셈 부호 규칙:\n같은 부호 = 양수 (+×+=+, -×-=+)\n다른 부호 = 음수 (+×-=-, -×+=-)\n\n핵심: 음×음=양!' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '덧셈', description: '같은 부호: 더하기, 다른 부호: 빼기' },
        { icon: '➖', label: '뺄셈→덧셈', description: '부호 반대로 바꿔 더하기' },
        { icon: '✖️', label: '곱셈 부호', description: '같은=양수, 다른=음수' },
        { icon: '➗', label: '나눗셈', description: '곱셈과 같은 부호 규칙' },
      ]},
      { type: 'example', bad: { label: '흔한 실수', story: '(-3)×(-4)=-12라고 답했다.\n음×음=양인 걸 잊었다.' }, good: { label: '올바른 풀이', story: '음×음=양, 3×4=12\n(-3)×(-4) = +12' }},
      { type: 'ox', statement: '음수 × 음수 = 음수이다.', answer: false, feedback: '음×음=양! "빚을 없앤다"→이득으로 기억!' },
      { type: 'multipleChoice', question: '(-6)+(+4)-(-3)=?', options: ['-5', '+1', '-7', '+13'], correctIndex: 1, explanation: '(-6)+(+4)+(+3) = (-6)+(+7) = +1' },
      { type: 'feedback', summary: '정수 연산 = 부호 규칙이 핵심', message: '부호 규칙만 확실히 익히면 어떤 계산이든 OK!' },
      { type: 'mission', mission: '계산해보기:\n①(-5)+(-8) ②(+7)-(-3)\n③(-4)×(-6) ④(-20)÷(+5)', encouragement: '부호 규칙을 자동으로 적용할 때까지 연습!' },
    ],
  },

  'math-silver-9': {
    id: 'math-silver-9', chapterKey: 'math', tierKey: 'silver', stageNumber: 9,
    title: '유리수의 이해',
    cards: [
      { type: 'concept', title: '유리수 = 분수로 표현 가능한 모든 수', description: 'a/b (b≠0)로 나타낼 수 있는 수\n\n정수: -3=−3/1, 0=0/1\n분수: 1/2, -3/4\n소수: 0.5=1/2, 0.333...=1/3\n\n무리수(유리수 아님): π, √2\n(반복 없이 끝없이 이어지는 소수)\n\n자연수 ⊂ 정수 ⊂ 유리수 ⊂ 실수' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '유리수', description: '분수로 표현 가능한 모든 수' },
        { icon: '🔢', label: '포함 관계', description: '자연수 ⊂ 정수 ⊂ 유리수' },
        { icon: '🔁', label: '순환소수', description: '반복되는 소수도 유리수' },
        { icon: '♾️', label: '무리수', description: '분수로 못 나타내는 수' },
      ]},
      { type: 'example', bad: { label: '잘못된 분류', story: '"0.333...은 끝이 없으니 유리수 아니야"\n순환소수 = 1/3이니까 유리수!' }, good: { label: '올바른 분류', story: '0.333... = 1/3 → 유리수!\n핵심: "분수로 나타낼 수 있느냐"' }},
      { type: 'ox', statement: '0은 유리수가 아니다.', answer: false, feedback: '0 = 0/1이니까 유리수야!' },
      { type: 'multipleChoice', question: '유리수가 아닌 것은?', options: ['-3', '0.5', '√2', '1/7'], correctIndex: 2, explanation: '√2 = 1.41421...은 비반복 무한소수.\n분수로 못 나타내니 무리수!' },
      { type: 'feedback', summary: '유리수 = 분수로 나타낼 수 있는 수', message: '수 체계를 이해하면 수학의 전체 그림이 보여!' },
      { type: 'mission', mission: '유리수/무리수 분류하기:\n-7, 0.25, π, 2/3, √9, 0.1212...', encouragement: '수를 분류하는 눈이 수학을 체계적으로 만들어!' },
    ],
  },

  'math-silver-10': {
    id: 'math-silver-10', chapterKey: 'math', tierKey: 'silver', stageNumber: 10,
    title: '수직선과 절댓값',
    cards: [
      { type: 'concept', title: '수직선과 절댓값', description: '절댓값: 수직선에서 0까지의 거리\n|3|=3, |-3|=3, |0|=0\n\n성질:\n• 항상 0 이상\n• |a| = |-a|\n• |a×b| = |a|×|b|\n\n거리 계산: 두 점 사이 = |a-b|\n-3과 5 사이 = |-3-5| = 8' },
      { type: 'summary', keywords: [
        { icon: '↔️', label: '수직선', description: '수를 직선 위에 표현' },
        { icon: '📏', label: '절댓값', description: '0까지의 거리, 항상 0 이상' },
        { icon: '🔄', label: '대칭', description: '|a|=|-a|' },
        { icon: '📐', label: '거리 계산', description: '|a-b|로 두 점 거리 구하기' },
      ]},
      { type: 'example', bad: { label: '잘못된 이해', story: '"|-7| = -7, 원래 음수니까"\n절댓값은 항상 0 이상!' }, good: { label: '올바른 이해', story: '|-7|은 0에서 7칸 떨어져 있으니 7!' }},
      { type: 'ox', statement: '절댓값이 같으면 두 수는 같은 수이다.', answer: false, feedback: '|3|=|-3|=3이지만 3≠-3!\n0 기준 대칭인 두 수야.' },
      { type: 'multipleChoice', question: '-4와 7 사이의 거리는?', options: ['3', '4', '7', '11'], correctIndex: 3, explanation: '|-4-7|=|-11|=11\n또는 4+7=11칸!' },
      { type: 'feedback', summary: '절댓값 = 0까지의 거리', message: '실버 완료! 수와 연산을 다졌으니\n골드에서 대수와 함수로 들어가자!' },
      { type: 'mission', mission: '수직선에 -5, -2, 0, 3, 6 표시하고\n|-5|, |3|, -5와 6 사이 거리 구하기', encouragement: '수직선을 자유자재로 쓰면 어떤 수 문제도 OK!' },
    ],
  },

  // ═══ 골드 (대수와 함수) 1~10 ═══

  'math-gold-1': {
    id: 'math-gold-1', chapterKey: 'math', tierKey: 'gold', stageNumber: 1,
    title: '변수와 식',
    cards: [
      { type: 'concept', title: '변수 = 값을 담는 그릇', description: '변수: 값이 정해지지 않은 수를 문자로 표현\n사과 x원 → 3개=3x원, 5개=5x원\n\n단항식: 3x, -2y² | 다항식: 3x+2, x²-5x+6\n계수: 변수 앞 숫자(3x의 3)\n상수항: 변수 없는 항 | 차수: 가장 높은 지수\n\n동류항: 문자와 차수가 같은 항끼리만 계산\n3x+5x=8x(O) | 3x+5x²→합칠 수 없음(X)' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '변수', description: '값이 변할 수 있는 문자' },
        { icon: '🔢', label: '계수', description: '변수 앞의 숫자' },
        { icon: '📊', label: '차수', description: '변수의 가장 높은 지수' },
        { icon: '🤝', label: '동류항', description: '문자·차수 같은 항끼리만 계산' },
      ]},
      { type: 'example', bad: { label: '잘못된 계산', story: '3x+5y=8xy라고 답함.\n다른 문자끼리는 합칠 수 없어!' }, good: { label: '올바른 계산', story: '3x+2y+5x-y = 8x+y\n동류항끼리만 정리!' }},
      { type: 'ox', statement: '2x + 3x²은 5x³으로 합칠 수 있다.', answer: false, feedback: '2x는 1차, 3x²은 2차 → 동류항 아님!\n차수 다르면 합칠 수 없어.' },
      { type: 'multipleChoice', question: '4a - 2b + 3a + 5b를 정리하면?', options: ['10ab', '7a + 3b', '7a - 3b', '12ab'], correctIndex: 1, explanation: '(4a+3a)+(-2b+5b) = 7a+3b' },
      { type: 'feedback', summary: '변수로 미지수 표현, 동류항끼리만 계산', message: '변수와 식은 대수의 출발점!\n방정식, 함수까지 쭉 이어져!' },
      { type: 'mission', mission: '① 5x+3y-2x+y 정리\n② 2a²+3a-a²+5a 정리\n③ "빵 x원 4개 + 우유 y원 2개" 식으로 표현', encouragement: '변수로 세상을 표현할 수 있어!' },
    ],
  },

  'math-gold-2': {
    id: 'math-gold-2', chapterKey: 'math', tierKey: 'gold', stageNumber: 2,
    title: '일차방정식',
    cards: [
      { type: 'concept', title: '방정식 = 미지수 찾는 퍼즐', description: '방정식: 미지수가 포함된 등식\n해(근): 방정식을 참으로 만드는 값\n\n풀이 원리: 양변에 같은 연산 → 등식 유지\n\n3x+5=20 → 3x=15 → x=5\n검증: 3(5)+5=20 ✓\n\n핵심: x를 한쪽, 숫자를 반대쪽에 모은다' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '등식의 성질', description: '양변에 같은 연산 → 등식 유지' },
        { icon: '🎯', label: '해 구하기', description: 'x를 한쪽으로 이항' },
        { icon: '🔄', label: '이항', description: '반대편 이동 시 부호 반대' },
        { icon: '✅', label: '검증', description: '해를 원래 식에 대입 확인' },
      ]},
      { type: 'example', bad: { label: '이항 실수', story: '2x-3=7 → 2x=7-3=4\n이항 시 +3이 되어야 하는데 실수!' }, good: { label: '올바른 풀이', story: '2x-3=7 → 2x=10 → x=5\n검증: 2(5)-3=7 ✓' }},
      { type: 'ox', statement: '방정식에서 항을 이항하면 부호가 바뀐다.', answer: true, feedback: '이항 = 반대편으로 옮기기\n+는 -로, -는 +로 바뀌어!' },
      { type: 'multipleChoice', question: '5x - 8 = 2x + 7의 해는?', options: ['x = 1', 'x = 3', 'x = 5', 'x = 15'], correctIndex: 2, explanation: '3x=15 → x=5\n검증: 17=17 ✓' },
      { type: 'feedback', summary: '일차방정식 = 이항으로 x 분리 후 검증', message: '방정식은 수학의 핵심 도구!\n실생활 문제도 수학으로 해결 가능!' },
      { type: 'mission', mission: '풀고 검증하기:\n① 4x+3=19 ② 2x-7=x+5 ③ 3(x+2)=21', encouragement: '방정식은 미지의 세계를 여는 열쇠야!' },
    ],
  },

  'math-gold-3': {
    id: 'math-gold-3', chapterKey: 'math', tierKey: 'gold', stageNumber: 3,
    title: '부등식의 세계',
    cards: [
      { type: 'concept', title: '부등식 = 크기 비교 식', description: '부등호: <(미만) >(초과) ≤(이하) ≥(이상)\n\n풀이는 방정식과 비슷하지만 핵심 차이!\n⚠️ 음수를 곱/나누면 부등호 방향 반대!\n\n-2x>6 → x<-3 (방향 반대!)\n3x+4≤19 → 3x≤15 → x≤5\n\n해: 범위로 표현, 수직선에 표시' },
      { type: 'summary', keywords: [
        { icon: '↔️', label: '부등호', description: '<, >, ≤, ≥ 크기 관계' },
        { icon: '⚠️', label: '부호 주의', description: '음수 곱/나누면 방향 반대!' },
        { icon: '📏', label: '수직선', description: '해를 화살표로 표시' },
        { icon: '♾️', label: '무한한 해', description: '해는 범위(여러 수)' },
      ]},
      { type: 'example', bad: { label: '부등호 실수', story: '-3x<9 → x<-3이라고 답함.\n음수로 나눌 때 부등호 안 바꿈!' }, good: { label: '올바른 풀이', story: '-3x<9 → 부등호 반대!\nx>-3이 정답.' }},
      { type: 'ox', statement: '부등식에서 양변에 음수를 곱하면 부등호 방향이 바뀐다.', answer: true, feedback: '부등식의 가장 중요한 규칙!\n양수→유지, 음수→반대.' },
      { type: 'multipleChoice', question: '2x - 3 > 7의 해는?', options: ['x > 2', 'x > 5', 'x < 5', 'x > 10'], correctIndex: 1, explanation: '2x>10 → x>5\n양수로 나눴으니 방향 유지!' },
      { type: 'feedback', summary: '부등식 = 방정식 풀이 + 음수 시 부등호 반대', message: '범위를 구하는 도구!\n합격 점수, 최대 구매량 등 실생활에 유용!' },
      { type: 'mission', mission: '① 3x+2≤14 ② -4x>8\n③ "2만원으로 3000원 빵 최대 몇 개?" 부등식 풀기', encouragement: '부등식으로 가능한 범위를 찾자!' },
    ],
  },

  'math-gold-4': {
    id: 'math-gold-4', chapterKey: 'math', tierKey: 'gold', stageNumber: 4,
    title: '좌표평면의 이해',
    cards: [
      { type: 'concept', title: '좌표평면 = 수학의 지도', description: 'x축(가로)과 y축(세로)으로 이루어진 평면\n점 위치: (x, y) | 원점: (0,0)\n\n4개 사분면:\n1사분면(+,+) 2사분면(-,+)\n3사분면(-,-) 4사분면(+,-)\n\n축 위의 점은 사분면에 속하지 않아!' },
      { type: 'summary', keywords: [
        { icon: '📍', label: '좌표', description: '(x, y)로 위치 표현' },
        { icon: '➕', label: '원점', description: '(0, 0) 교차점' },
        { icon: '🗺️', label: '사분면', description: '4등분 영역' },
        { icon: '↔️', label: 'x,y 순서', description: 'x=가로, y=세로' },
      ]},
      { type: 'example', bad: { label: '좌표 혼동', story: '(3,5)를 "위로3, 오른쪽5"로 읽음.\nx와 y 순서가 반대!' }, good: { label: '올바른 읽기', story: '(3,5) = 오른쪽3, 위로5\n항상 (가로, 세로) 순서!' }},
      { type: 'ox', statement: '점 (-3, 0)은 제2사분면에 있다.', answer: false, feedback: 'y=0이면 x축 위의 점!\n축 위는 사분면에 속하지 않아.' },
      { type: 'multipleChoice', question: '점 (-2, -5)는 어느 사분면에 있는가?', options: ['제1사분면', '제2사분면', '제3사분면', '제4사분면'], correctIndex: 2, explanation: 'x음수, y음수 → (-,-) = 3사분면!' },
      { type: 'feedback', summary: '좌표평면 = (x,y)로 위치 표현하는 지도', message: '함수 그래프를 그리는 필수 개념!\n이것이 탄탄해야 함수가 쉬워져.' },
      { type: 'mission', mission: 'A(2,4) B(-3,1) C(-2,-3) D(4,-2) E(0,3)\n좌표에 표시하고 사분면(또는 축) 분류하기', encouragement: '좌표평면은 그래프 세계로 가는 관문!' },
    ],
  },

  'math-gold-5': {
    id: 'math-gold-5', chapterKey: 'math', tierKey: 'gold', stageNumber: 5,
    title: '함수란 무엇인가',
    cards: [
      { type: 'concept', title: '함수 = 입력 하나 → 출력 하나', description: '함수: x값 하나에 y값 하나가 대응\n자판기 비유: 같은 동전 → 항상 같은 음료\n\nf(x)=2x+1 → f(1)=3, f(3)=7\n\n한 x에 y가 2개 이상 → 함수 아님!\n정의역: x 범위 | 치역: y 범위' },
      { type: 'summary', keywords: [
        { icon: '🎰', label: '함수', description: '입력 하나 → 출력 하나' },
        { icon: '📥', label: '정의역', description: 'x가 될 수 있는 값' },
        { icon: '📤', label: '치역', description: 'y가 나오는 값' },
        { icon: 'f(x)', label: '함수 표현', description: 'f(x) = 식' },
      ]},
      { type: 'example', bad: { label: '혼동', story: 'x=2일 때 y=3도 y=-3도 된다면?\n→ y가 2개이므로 함수 아님!' }, good: { label: '올바른 판단', story: 'f(x)=x² → f(2)=f(-2)=4\n다른 x에서 같은 y는 OK!\n핵심: 하나의 x에 하나의 y.' }},
      { type: 'ox', statement: 'f(x) = x²에서 f(2) = f(-2)이면 함수가 아니다.', answer: false, feedback: '다른 x에서 같은 y는 가능!\n함수 아닌 건 "하나의 x에 y가 2개"인 경우.' },
      { type: 'multipleChoice', question: 'f(x) = 3x - 2일 때, f(4)의 값은?', options: ['10', '12', '14', '8'], correctIndex: 0, explanation: 'f(4) = 3(4)-2 = 10' },
      { type: 'feedback', summary: '함수 = 입력→출력 대응, f(x)로 표현', message: '함수는 수학의 핵심 개념!\n그래프, 방정식, 미적분 모두 여기서 시작.' },
      { type: 'mission', mission: 'f(x)=2x+3에서 f(0),f(1),f(2),f(-1),f(-2) 구하고\n좌표평면에 점 찍기', encouragement: '함수를 이해하면 수학 절반은 이해한 거야!' },
    ],
  },

  'math-gold-6': {
    id: 'math-gold-6', chapterKey: 'math', tierKey: 'gold', stageNumber: 6,
    title: '일차함수와 그래프',
    cards: [
      { type: 'concept', title: 'y = ax + b의 세계', description: '일차함수: y = ax + b (a≠0)\n\na(기울기): a>0 ↗ | a<0 ↘ | |a| 크면 가파름\nb(y절편): y축과 만나는 점 (0,b)\n\ny=2x+3 → 기울기2, y절편3\n기울기 = (y₂-y₁)/(x₂-x₁)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '기울기(a)', description: '기울어진 정도와 방향' },
        { icon: '📍', label: 'y절편(b)', description: 'y축과 만나는 점' },
        { icon: '↗️', label: 'a>0 증가', description: '오른쪽 위로' },
        { icon: '↘️', label: 'a<0 감소', description: '오른쪽 아래로' },
      ]},
      { type: 'example', bad: { label: '혼동', story: 'y=-2x+5에서 "기울기가 5"\nb와 a를 헷갈림!' }, good: { label: '올바른 분석', story: 'y=-2x+5 → 기울기-2, y절편5\n오른쪽 아래로 내려가는 직선.' }},
      { type: 'ox', statement: '기울기가 음수이면 그래프는 오른쪽 아래로 내려간다.', answer: true, feedback: 'a<0이면 x 커질수록 y 작아져!\n오른쪽으로 갈수록 내려가.' },
      { type: 'multipleChoice', question: 'y = 3x - 1의 y절편과 기울기는?', options: ['y절편: 3, 기울기: -1', 'y절편: -1, 기울기: 3', 'y절편: 1, 기울기: 3', 'y절편: -1, 기울기: -3'], correctIndex: 1, explanation: 'a=3(기울기), b=-1(y절편)\n(0,-1)에서 시작, 오른쪽 위로!' },
      { type: 'feedback', summary: 'y=ax+b → a=기울기, b=y절편', message: '일차함수 그래프는 항상 직선!\n기울기와 y절편만 알면 바로 그릴 수 있어.' },
      { type: 'mission', mission: '그래프 그리기:\n① y=x+2 ② y=-x+4 ③ y=2x-1\n기울기와 y절편 먼저 확인!', encouragement: '일차함수를 자유롭게 그리면 수학이 보여!' },
    ],
  },

  'math-gold-7': {
    id: 'math-gold-7', chapterKey: 'math', tierKey: 'gold', stageNumber: 7,
    title: '연립방정식',
    cards: [
      { type: 'concept', title: '미지수 2개, 식 2개', description: '연립방정식: 미지수 2개를 식 2개로 풀기\n\nx+y=10, x-y=4\n가감법: 더하면 2x=14 → x=7, y=3\n대입법: x=10-y 대입 → y=3, x=7\n\n상황에 따라 편한 방법 선택!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '연립방정식', description: '미지수 2개, 방정식 2개' },
        { icon: '➕', label: '가감법', description: '더하거나 빼서 미지수 제거' },
        { icon: '🔄', label: '대입법', description: '한 식을 정리해 대입' },
        { icon: '✅', label: '검증', description: '두 식 모두에 대입 확인' },
      ]},
      { type: 'example', bad: { label: '실수', story: 'x+y=5, 2x+y=8을 더해 3x+2y=13\n미지수가 안 사라짐!' }, good: { label: '올바른 풀이', story: '빼면: (2x+y)-(x+y)=3\nx=3, y=2' }},
      { type: 'ox', statement: '연립방정식은 항상 가감법으로만 풀어야 한다.', answer: false, feedback: '가감법, 대입법 모두 가능!\n상황에 따라 편한 걸 선택.' },
      { type: 'multipleChoice', question: '2x + y = 7, x - y = 2를 가감법으로 풀면 x는?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: '더하면 3x=9 → x=3\n검증: y=1, 3-1=2 ✓' },
      { type: 'feedback', summary: '연립방정식 = 가감법/대입법으로 풀기', message: '조건 2개로 답 찾기!\n사과·배 가격 문제도 이것으로 해결.' },
      { type: 'mission', mission: '① x+y=8, x-y=2 (가감법)\n② 2x+3y=12, x+y=5 (대입법)', encouragement: '연립방정식 마스터하면 복잡한 문제도 OK!' },
    ],
  },

  'math-gold-8': {
    id: 'math-gold-8', chapterKey: 'math', tierKey: 'gold', stageNumber: 8,
    title: '이차방정식',
    cards: [
      { type: 'concept', title: 'ax² + bx + c = 0', description: '이차방정식: 최고 차수가 2\n\n① 인수분해: x²-5x+6=0 → (x-2)(x-3)=0\n② 완전제곱: x²+6x+9=0 → (x+3)²=0\n③ 근의 공식: x=(-b±√(b²-4ac))/2a\n\n판별식 b²-4ac:\n>0: 두 근 | =0: 중근 | <0: 실수 해 없음' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '인수분해', description: '곱c, 합b인 두 수 찾기' },
        { icon: '📐', label: '근의 공식', description: '(-b±√(b²-4ac))/2a' },
        { icon: '🔍', label: '판별식', description: 'b²-4ac로 근 개수 판단' },
        { icon: '✌️', label: '해 최대 2개', description: '이차방정식의 특징' },
      ]},
      { type: 'example', bad: { label: '실수', story: 'x²=9에서 x=3만 씀.\nx=-3도 답!' }, good: { label: '올바른 풀이', story: 'x²-9=0 → (x+3)(x-3)=0\nx=3 또는 x=-3' }},
      { type: 'ox', statement: '이차방정식의 해는 항상 2개이다.', answer: false, feedback: '판별식에 따라 달라!\n>0: 2개 | =0: 1개 | <0: 없음' },
      { type: 'multipleChoice', question: 'x² - 7x + 12 = 0의 두 근은?', options: ['x = 2, 6', 'x = 3, 4', 'x = -3, -4', 'x = 1, 12'], correctIndex: 1, explanation: '곱12, 합7 → 3과 4\n(x-3)(x-4)=0' },
      { type: 'feedback', summary: '이차방정식 = 인수분해 or 근의 공식', message: '포물선의 x절편 구하기와 같아!\n이차함수와 직결되니 잘 익혀두자.' },
      { type: 'mission', mission: '① x²+5x+6=0 (인수분해)\n② x²-4=0\n③ 2x²+3x-2=0 (근의 공식)', encouragement: '이차방정식은 대수의 꽃!' },
    ],
  },

  'math-gold-9': {
    id: 'math-gold-9', chapterKey: 'math', tierKey: 'gold', stageNumber: 9,
    title: '이차함수와 포물선',
    cards: [
      { type: 'concept', title: 'y = ax²의 그래프 = 포물선', description: 'a>0: 아래볼록(U) 최솟값 | a<0: 위볼록(∩) 최댓값\n|a| 크면 좁고, 작으면 넓은 포물선\n\ny=a(x-p)²+q → 꼭짓점(p,q), 대칭축 x=p\n\ny=(x-3)²-4 → 꼭짓점(3,-4), 최솟값-4' },
      { type: 'summary', keywords: [
        { icon: '⛰️', label: '포물선', description: '이차함수 그래프 모양' },
        { icon: '📍', label: '꼭짓점', description: '최고/최저점 (p,q)' },
        { icon: '📏', label: '대칭축', description: 'x=p 수직선' },
        { icon: '↕️', label: 'a의 부호', description: '+아래볼록, -위볼록' },
      ]},
      { type: 'example', bad: { label: '오해', story: 'y=-x²+4를 "내려가는 직선"으로 착각.\n이차함수는 포물선!' }, good: { label: '올바른 분석', story: 'y=-(x-0)²+4\n꼭짓점(0,4), 위볼록, 최댓값4' }},
      { type: 'ox', statement: 'y = 2x²의 그래프는 위로 볼록한 포물선이다.', answer: false, feedback: 'a=2>0 → 아래볼록(U자)!\n양수면 아래, 음수면 위볼록.' },
      { type: 'multipleChoice', question: 'y = (x+2)² - 1의 꼭짓점은?', options: ['(2, -1)', '(-2, -1)', '(2, 1)', '(-2, 1)'], correctIndex: 1, explanation: 'p=-2, q=-1 → 꼭짓점(-2,-1)' },
      { type: 'feedback', summary: '이차함수 = 포물선, 꼭짓점·a부호가 핵심', message: '물체 궤적, 다리 아치 등\n현실에서 정말 많이 쓰이는 함수!' },
      { type: 'mission', mission: 'y=x², y=2x², y=-x² 세 그래프를\n같은 좌표평면에 그리고 비교하기', encouragement: '포물선의 비밀을 알면 세상의 곡선이 보여!' },
    ],
  },

  'math-gold-10': {
    id: 'math-gold-10', chapterKey: 'math', tierKey: 'gold', stageNumber: 10,
    title: '규칙과 패턴 찾기',
    cards: [
      { type: 'concept', title: '수학은 패턴의 학문', description: '수 패턴:\n1,4,7,10→ +3씩(등차) 일반항: 3n-2\n1,4,9,16→ 제곱수 일반항: n²\n1,1,2,3,5,8→ 피보나치\n\n전략: ①차이 ②비 ③제곱 확인 ④그림' },
      { type: 'summary', keywords: [
        { icon: '🔁', label: '등차', description: '같은 수 더하기(+3,+5...)' },
        { icon: '✖️', label: '등비', description: '같은 수 곱하기(×2,×3...)' },
        { icon: '📐', label: '도형 패턴', description: '도형 변화의 규칙' },
        { icon: '💡', label: '일반항', description: 'n번째를 n으로 표현' },
      ]},
      { type: 'example', bad: { label: '포기', story: '2,6,18,54... 차이가 불규칙이라 포기.' }, good: { label: '발견', story: '비를 확인! 6÷2=3, 18÷6=3\n×3씩 → 다음: 162' }},
      { type: 'ox', statement: '패턴을 찾으려면 반드시 공식을 알아야 한다.', answer: false, feedback: '차이나 비 관찰만으로도 패턴 발견 가능!\n관찰력이 더 중요.' },
      { type: 'multipleChoice', question: '1, 3, 6, 10, 15, ... 의 다음 수는?', options: ['18', '20', '21', '25'], correctIndex: 2, explanation: '차이: 2,3,4,5... 다음 +6\n15+6=21 (삼각수!)' },
      { type: 'feedback', summary: '패턴 찾기 = 차이→비→제곱 순서로 관찰', message: '골드 완료! 대수와 함수 기초를 다졌어.\n플래티넘에서 기하의 세계로!' },
      { type: 'mission', mission: '① 5,10,15,20,__,__\n② 2,4,8,16,__,__\n③ 1,4,9,16,25,__,__\n④ 1,1,2,3,5,__,__', encouragement: '패턴을 찾는 눈이 수학적 감각!' },
    ],
  },

  // ═══ 플래티넘 (기하와 측정) 1~10 ═══

  'math-platinum-1': {
    id: 'math-platinum-1', chapterKey: 'math', tierKey: 'platinum', stageNumber: 1,
    title: '점, 선, 면의 기본',
    cards: [
      { type: 'concept', title: '기하학의 기본 요소', description: '점: 위치만 있고 크기 없음\n선: 길이만 있음 (직선/반직선/선분)\n면: 넓이가 있음\n\n직선: 양쪽 무한 ←──→\n반직선: 한쪽만 무한 ●──→\n선분: 양쪽 끝 있음 ●──●\n\n두 직선 관계: 평행(∥), 수직(⊥), 교차' },
      { type: 'summary', keywords: [
        { icon: '•', label: '점', description: '위치만 있는 기본 요소' },
        { icon: '─', label: '선', description: '직선, 반직선, 선분' },
        { icon: '▭', label: '면', description: '넓이를 가진 영역' },
        { icon: '∥⊥', label: '평행·수직', description: '두 직선의 관계' },
      ]},
      { type: 'example', bad: { label: '혼동', story: '"선분과 직선은 같은 거 아니야?"\n선분은 끝이 있고 직선은 양쪽 무한!' }, good: { label: '올바른 구분', story: '선분: A~B까지만\n반직선: A에서 B방향 무한\n직선: 양쪽 무한' }},
      { type: 'ox', statement: '직선은 두 개의 끝점을 가진다.', answer: false, feedback: '끝점이 있는 건 선분! 직선은 양쪽 무한이야.' },
      { type: 'multipleChoice', question: '두 직선이 90°로 만나는 관계는?', options: ['평행', '수직', '교차', '대칭'], correctIndex: 1, explanation: '직각(90°)으로 만나면 수직. 기호 ⊥' },
      { type: 'feedback', summary: '점·선·면 = 기하학의 ABC', message: '이 기본 요소가 모여 모든 도형이 만들어져!' },
      { type: 'mission', mission: '주변에서 평행한 직선 3가지, 수직인 직선 3가지 찾기', encouragement: '기하학은 눈에 보이는 모든 것의 수학이야!' },
    ],
  },

  'math-platinum-2': {
    id: 'math-platinum-2', chapterKey: 'math', tierKey: 'platinum', stageNumber: 2,
    title: '각도의 이해',
    cards: [
      { type: 'concept', title: '각도 = 두 반직선이 벌린 정도', description: '예각: 0°~90° | 직각: 90° | 둔각: 90°~180°\n\n각의 관계:\n• 맞꼭지각: 서로 같다\n• 동위각/엇각: 평행선에서 성립\n• 보각: 합이 90° | 여각: 합이 180°' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '각의 종류', description: '예각, 직각, 둔각' },
        { icon: '❌', label: '맞꼭지각', description: '서로 같은 각' },
        { icon: '∥', label: '동위각·엇각', description: '평행선에서 같은 각' },
        { icon: '🔄', label: '보각·여각', description: '합이 90° 또는 180°' },
      ]},
      { type: 'example', bad: { label: '분류 실수', story: '95°를 예각이라고 답했다. 90°보다 크면 둔각!' }, good: { label: '올바른 분류', story: '95° → 90°보다 크고 180°보다 작음 → 둔각!' }},
      { type: 'ox', statement: '맞꼭지각은 항상 크기가 같다.', answer: true, feedback: '맞아! 두 직선이 만나면 맞꼭지각은 항상 같아.' },
      { type: 'multipleChoice', question: '한 각이 65°일 때 보각은?', options: ['25°', '115°', '295°', '35°'], correctIndex: 0, explanation: '보각 = 합이 90°. 90°-65°=25°' },
      { type: 'feedback', summary: '각도 = 예각/직각/둔각 + 맞꼭지각·동위각', message: '각도를 이해하면 모든 도형의 성질을 분석할 수 있어!' },
      { type: 'mission', mission: '시계에서 3시, 5시, 6시의 각도 구하기\n교실에서 예각, 직각, 둔각 각각 찾기', encouragement: '각도를 볼 수 있으면 세상의 구조가 보여!' },
    ],
  },

  'math-platinum-3': {
    id: 'math-platinum-3', chapterKey: 'math', tierKey: 'platinum', stageNumber: 3,
    title: '삼각형의 성질',
    cards: [
      { type: 'concept', title: '삼각형의 종류와 핵심 성질', description: '내각의 합 = 180° (항상!)\n\n변 기준: 정삼각형(60°×3), 이등변, 부등변\n각 기준: 예각, 직각, 둔각삼각형\n\n성립 조건: 가장 긴 변 < 나머지 두 변의 합\n3,4,8 → 8>7 불가! | 3,4,5 → 5<7 가능!' },
      { type: 'summary', keywords: [
        { icon: '🔺', label: '내각의 합', description: '항상 180°' },
        { icon: '📏', label: '변 분류', description: '정삼각형, 이등변, 부등변' },
        { icon: '📐', label: '각 분류', description: '예각, 직각, 둔각삼각형' },
        { icon: '⚠️', label: '성립 조건', description: '가장 긴 변 < 나머지 합' },
      ]},
      { type: 'example', bad: { label: '실수', story: '변 2,3,6으로 삼각형을 그리려 했다.\n6>2+3=5이므로 불가!' }, good: { label: '올바른 판단', story: '가장 긴 변(6) < 나머지 합(5)? → 6>5 불가!\n성립 조건을 먼저 확인.' }},
      { type: 'ox', statement: '삼각형의 세 각 중 둔각이 2개일 수 있다.', answer: false, feedback: '둔각 2개면 합이 180° 초과! 둔각은 최대 1개.' },
      { type: 'multipleChoice', question: '두 각이 45°, 65°일 때 나머지 각은?', options: ['60°', '70°', '80°', '90°'], correctIndex: 1, explanation: '180°-45°-65°=70°' },
      { type: 'feedback', summary: '삼각형 = 내각합 180° + 성립 조건', message: '삼각형을 잘 알면 모든 다각형을 이해할 수 있어!' },
      { type: 'mission', mission: '60°×3 정삼각형, 30-60-90 삼각형 그리기\n5,7,10으로 삼각형 되는지 확인', encouragement: '삼각형은 가장 안정적인 도형이야!' },
    ],
  },

  'math-platinum-4': {
    id: 'math-platinum-4', chapterKey: 'math', tierKey: 'platinum', stageNumber: 4,
    title: '사각형의 종류와 성질',
    cards: [
      { type: 'concept', title: '사각형 패밀리', description: '내각의 합 = 360°\n\n포함 관계:\n사다리꼴(한 쌍 평행) → 평행사변형(두 쌍)\n→ 직사각형(네 각 직각) / 마름모(네 변 같음)\n→ 정사각형(직사각형+마름모)\n\n평행사변형 성질: 대변 같고, 대각 같고, 대각선 이등분' },
      { type: 'summary', keywords: [
        { icon: '▱', label: '평행사변형', description: '두 쌍 대변이 평행' },
        { icon: '▭', label: '직사각형', description: '네 각 직각' },
        { icon: '◇', label: '마름모', description: '네 변 같음' },
        { icon: '⬜', label: '정사각형', description: '직사각형 + 마름모' },
      ]},
      { type: 'example', bad: { label: '오해', story: '"정사각형은 직사각형이 아니다"\n정사각형은 직사각형의 특수한 경우!' }, good: { label: '올바른 이해', story: '정사각형 = 직사각형(각 직각) ✓\n= 마름모(변 같음) ✓ = 평행사변형 ✓' }},
      { type: 'ox', statement: '정사각형은 마름모의 한 종류이다.', answer: true, feedback: '네 변이 같으니 마름모에 포함! 정사각형 = 직사각형 ∩ 마름모' },
      { type: 'multipleChoice', question: '평행사변형에서 한 각이 70°면 이웃각은?', options: ['70°', '90°', '110°', '180°'], correctIndex: 2, explanation: '이웃 두 각 합 = 180°. 180°-70°=110°' },
      { type: 'feedback', summary: '사각형 = 포함관계 + 각 성질', message: '포함관계를 이해하면 성질을 논리적으로 유도할 수 있어!' },
      { type: 'mission', mission: '사각형 포함관계 나무 그림 그리기\n"직사각형이면서 마름모"가 무엇인지 설명하기', encouragement: '사각형 관계를 이해하면 기하학적 사고력이 쑥!' },
    ],
  },

  'math-platinum-5': {
    id: 'math-platinum-5', chapterKey: 'math', tierKey: 'platinum', stageNumber: 5,
    title: '원의 성질',
    cards: [
      { type: 'concept', title: '원 = 한 점에서 같은 거리의 점들', description: '반지름(r), 지름(d=2r)\n원주율 π ≈ 3.14\n\n공식:\n원주 = 2πr = πd\n넓이 = πr²\n\n예) r=5: 원주=10π≈31.4, 넓이=25π≈78.5' },
      { type: 'summary', keywords: [
        { icon: '⭕', label: '원', description: '한 점에서 같은 거리의 점 집합' },
        { icon: 'π', label: '원주율', description: '원주÷지름 ≈ 3.14' },
        { icon: '📏', label: '원주', description: '2πr' },
        { icon: '📐', label: '넓이', description: 'πr²' },
      ]},
      { type: 'example', bad: { label: '혼동', story: '"r=6이면 넓이=6π" → πr²인데 πr로 계산!' }, good: { label: '올바른 계산', story: 'r=6: 원주=12π, 넓이=π×36=36π\nr을 제곱하는 걸 잊지 말기!' }},
      { type: 'ox', statement: '원의 지름은 반지름의 2배이다.', answer: true, feedback: '지름 = 2r. 중심을 지나는 가장 긴 현!' },
      { type: 'multipleChoice', question: 'r=7cm인 원의 넓이는?', options: ['14π', '49π', '7π', '21π'], correctIndex: 1, explanation: 'πr² = π×49 = 49π cm²' },
      { type: 'feedback', summary: '원 = π 핵심, 원주 2πr, 넓이 πr²', message: '원은 자연에서 가장 많이 나타나는 도형이야!' },
      { type: 'mission', mission: '동전의 지름을 재고 원주와 넓이 계산하기\n실로 원주 재서 ÷지름=π 확인', encouragement: '원은 모든 곳에 있어. 수학으로 측정해보자!' },
    ],
  },

  'math-platinum-6': {
    id: 'math-platinum-6', chapterKey: 'math', tierKey: 'platinum', stageNumber: 6,
    title: '넓이 구하기',
    cards: [
      { type: 'concept', title: '다양한 도형의 넓이 공식', description: '직사각형: 가로×세로\n삼각형: 밑변×높이÷2\n평행사변형: 밑변×높이\n사다리꼴: (윗변+아랫변)×높이÷2\n마름모: 대각선×대각선÷2\n원: πr²\n\n원리: 모든 공식은 직사각형에서 유도!\n삼각형=직사각형 절반, 평행사변형=잘라서 직사각형' },
      { type: 'summary', keywords: [
        { icon: '▭', label: '직사각형', description: '가로 × 세로' },
        { icon: '△', label: '삼각형', description: '밑변×높이÷2' },
        { icon: '▱', label: '사다리꼴', description: '(윗+아랫)×높이÷2' },
        { icon: '⭕', label: '원', description: 'πr²' },
      ]},
      { type: 'example', bad: { label: '높이 혼동', story: '평행사변형의 빗변을 높이로 사용했다.\n높이는 밑변에 수직인 거리!' }, good: { label: '올바른 계산', story: '빗변이 아닌 수직 거리가 높이!\n밑변 8, 높이 5 → 넓이 = 40' }},
      { type: 'ox', statement: '평행사변형의 넓이는 밑변 × 빗변이다.', answer: false, feedback: '밑변 × "높이"가 맞아! 높이는 수직 거리야.' },
      { type: 'multipleChoice', question: '윗변4, 아랫변8, 높이5인 사다리꼴 넓이는?', options: ['20', '30', '40', '60'], correctIndex: 1, explanation: '(4+8)×5÷2 = 60÷2 = 30' },
      { type: 'feedback', summary: '넓이 = 직사각형에서 변형하여 유도', message: '원리를 알면 어떤 도형이든 넓이를 구할 수 있어!' },
      { type: 'mission', mission: '방이나 교실 바닥의 가로·세로를 재서\n넓이(m²)를 계산해보기', encouragement: '넓이 계산은 건축, 인테리어 등 어디서나 필요!' },
    ],
  },

  'math-platinum-7': {
    id: 'math-platinum-7', chapterKey: 'math', tierKey: 'platinum', stageNumber: 7,
    title: '부피와 겉넓이',
    cards: [
      { type: 'concept', title: '3D 도형의 부피와 겉넓이', description: '직육면체: 부피=가로×세로×높이\n원기둥: 부피=πr²h\n원뿔: 부피=πr²h/3 (원기둥의 1/3)\n구: 부피=4πr³/3, 겉넓이=4πr²\n\n단위: 부피 cm³(L), 넓이 cm²' },
      { type: 'summary', keywords: [
        { icon: '📦', label: '직육면체', description: '가로×세로×높이' },
        { icon: '🥫', label: '원기둥', description: 'πr²h' },
        { icon: '🔺', label: '원뿔', description: 'πr²h/3' },
        { icon: '⚽', label: '구', description: '4πr³/3' },
      ]},
      { type: 'example', bad: { label: '단위 실수', story: '부피를 cm²로 적었다. cm²는 넓이, 부피는 cm³!' }, good: { label: '올바른 계산', story: '3×4×5 직육면체\n부피=60cm³, 겉넓이=2(12+20+15)=94cm²' }},
      { type: 'ox', statement: '원뿔 부피는 같은 원기둥의 절반이다.', answer: false, feedback: '1/2이 아니라 1/3! 물 부으면 정확히 3번 채워야 해.' },
      { type: 'multipleChoice', question: 'r=3, h=10인 원기둥 부피는?', options: ['30π', '60π', '90π', '120π'], correctIndex: 2, explanation: 'πr²h = π×9×10 = 90π cm³' },
      { type: 'feedback', summary: '부피=3D 공간, 겉넓이=표면 넓이', message: '상자, 페인트, 물통 등 실생활에 많이 쓰여!' },
      { type: 'mission', mission: '집의 직육면체 물건(상자 등) 가로·세로·높이 재서\n부피와 겉넓이 계산하기', encouragement: '3D를 수학으로 이해하는 게 기하학의 힘이야!' },
    ],
  },

  'math-platinum-8': {
    id: 'math-platinum-8', chapterKey: 'math', tierKey: 'platinum', stageNumber: 8,
    title: '합동과 닮음',
    cards: [
      { type: 'concept', title: '합동과 닮음', description: '합동(≅): 모양+크기 완전히 같음\n삼각형 합동 조건: SSS, SAS, ASA\n\n닮음(∼): 모양 같고 크기만 다름 (확대/축소)\n닮음비 a:b이면:\n• 둘레비 = a:b\n• 넓이비 = a²:b²\n• 부피비 = a³:b³\n\n닮음비 1:2 → 넓이 1:4, 부피 1:8' },
      { type: 'summary', keywords: [
        { icon: '≅', label: '합동', description: '모양+크기 완전히 같음' },
        { icon: '∼', label: '닮음', description: '모양 같고 크기만 다름' },
        { icon: '📐', label: '합동 조건', description: 'SSS, SAS, ASA' },
        { icon: '📊', label: '닮음비', description: '길이a:b→넓이a²:b²→부피a³:b³' },
      ]},
      { type: 'example', bad: { label: '오해', story: '닮음비 1:3이면 넓이도 1:3이라고 답했다.\n넓이는 제곱!' }, good: { label: '올바른 계산', story: '닮음비 1:3 → 넓이비 1:9 → 부피비 1:27' }},
      { type: 'ox', statement: '닮음비가 2:3이면 넓이비도 2:3이다.', answer: false, feedback: '넓이비=닮음비의 제곱! 2:3→4:9' },
      { type: 'multipleChoice', question: '삼각형 합동 조건이 아닌 것은?', options: ['SSS', 'SAS', 'SSA', 'ASA'], correctIndex: 2, explanation: 'SSA는 합동 조건 아님! 두 가지 삼각형이 가능해.' },
      { type: 'feedback', summary: '합동=같은 도형, 닮음=확대축소', message: '지도, 모형, 설계도에서 닮음이 쓰여!' },
      { type: 'mission', mission: '큰 사진과 작은 사진으로 닮음비 구하기\n닮음비 1:2인 정사각형 넓이비 계산', encouragement: '합동과 닮음은 수학과 현실의 다리야!' },
    ],
  },

  'math-platinum-9': {
    id: 'math-platinum-9', chapterKey: 'math', tierKey: 'platinum', stageNumber: 9,
    title: '피타고라스 정리',
    cards: [
      { type: 'concept', title: 'a² + b² = c²', description: '직각삼각형에서 빗변² = 나머지 두 변²의 합\n\n3²+4²=25=5² ✓\n\n대표: (3,4,5), (5,12,13), (8,15,17)\n\n활용: 대각선, 두 점 거리, 높이 구하기\n좌표 거리: d=√((x₂-x₁)²+(y₂-y₁)²)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '피타고라스', description: 'a²+b²=c² (직각삼각형)' },
        { icon: '📏', label: '빗변', description: '직각 맞은편 가장 긴 변' },
        { icon: '📍', label: '거리 공식', description: '좌표 두 점 사이 거리' },
        { icon: '🔢', label: '피타고라스 수', description: '(3,4,5), (5,12,13) 등' },
      ]},
      { type: 'example', bad: { label: '빗변 혼동', story: '빗변이 아닌 변에 c²을 놓았다.\n빗변=직각 맞은편 가장 긴 변!' }, good: { label: '올바른 활용', story: '두 변 6,8 → 6²+8²=100 → c=10' }},
      { type: 'ox', statement: '피타고라스 정리는 모든 삼각형에 적용된다.', answer: false, feedback: '직각삼각형에서만 성립! "직각삼각형 전용"' },
      { type: 'multipleChoice', question: '두 변이 5, 12일 때 빗변은?', options: ['15', '13', '17', '14'], correctIndex: 1, explanation: '25+144=169, √169=13' },
      { type: 'feedback', summary: '피타고라스 = 직각삼각형 핵심 도구', message: '건축, 항해, GPS 등에 쓰이는 수학의 보석!' },
      { type: 'mission', mission: '두 변 8,15의 빗변 구하기\n좌표 (1,2)와 (4,6) 사이 거리 구하기', encouragement: '가장 아름다운 정리 중 하나야!' },
    ],
  },

  'math-platinum-10': {
    id: 'math-platinum-10', chapterKey: 'math', tierKey: 'platinum', stageNumber: 10,
    title: '도형의 이동',
    cards: [
      { type: 'concept', title: '평행·대칭·회전이동', description: '평행이동: (x,y)→(x+a,y+b)\n\n대칭이동:\nx축: (x,y)→(x,-y)\ny축: (x,y)→(-x,y)\n원점: (x,y)→(-x,-y)\n\n회전이동: 90°회전 (x,y)→(-y,x)\n180°회전 = 원점 대칭\n\n이동 후 모양·크기 변하지 않음(합동)!' },
      { type: 'summary', keywords: [
        { icon: '➡️', label: '평행이동', description: '같은 방향·거리로 밀기' },
        { icon: '🪞', label: '대칭이동', description: '축/점 기준 뒤집기' },
        { icon: '🔄', label: '회전이동', description: '한 점 중심 돌리기' },
        { icon: '≅', label: '합동 유지', description: '이동 후 모양·크기 동일' },
      ]},
      { type: 'example', bad: { label: '대칭 혼동', story: '(3,4)의 x축 대칭을 (-3,4)로 답했다.\nx축 대칭은 y가 바뀜: (3,-4)!' }, good: { label: '올바른 변환', story: 'x축: (3,-4) / y축: (-3,4) / 원점: (-3,-4)' }},
      { type: 'ox', statement: '도형을 회전이동하면 크기가 변한다.', answer: false, feedback: '회전은 모양·크기 유지! 크기 변하는 건 확대/축소.' },
      { type: 'multipleChoice', question: '(2,-5)를 y축 대칭이동하면?', options: ['(2,5)', '(-2,-5)', '(-2,5)', '(5,-2)'], correctIndex: 1, explanation: 'y축 대칭: x부호만 바뀜! → (-2,-5)' },
      { type: 'feedback', summary: '도형 이동 = 평행·대칭·회전, 합동 유지', message: '플래티넘 완료! 기하 기초 완성!\n다이아에서 확률·통계에 도전하자!' },
      { type: 'mission', mission: '삼각형 A(1,1),B(4,1),C(1,3)을 그리고\nx축 대칭, 오른쪽3+위2 평행이동 그리기', encouragement: '도형 이동을 마스터하면 기하학의 달인!' },
    ],
  },

  // ═══ 다이아 (확률·통계와 응용) 1~10 ═══

  'math-diamond-1': {
    id: 'math-diamond-1', chapterKey: 'math', tierKey: 'diamond', stageNumber: 1,
    title: '자료의 정리와 표현',
    cards: [
      { type: 'concept', title: '자료 정리법', description: '① 도수분포표: 구간별 빈도 정리\n② 히스토그램: 막대그래프(간격 없음)\n③ 줄기와 잎: 원래 값 보존하며 정리\n④ 원그래프: 비율 시각화\n\n상황에 맞는 방법 선택이 중요!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '도수분포표', description: '구간별 빈도 정리' },
        { icon: '📊', label: '히스토그램', description: '막대그래프(간격 없음)' },
        { icon: '🌿', label: '줄기와 잎', description: '원래 값 보존 정리법' },
        { icon: '🥧', label: '원그래프', description: '비율 시각화' },
      ]},
      { type: 'example', bad: { label: '정리 안 함', story: '자료 30개를 나열만 하고 패턴을 못 찾음.' }, good: { label: '정리 후 분석', story: '도수분포표로 정리 → 70~80점대가 최다!' }},
      { type: 'ox', statement: '히스토그램은 막대 사이에 간격이 있다.', answer: false, feedback: '연속 자료라 간격 없음!\n간격 있는 건 일반 막대그래프.' },
      { type: 'multipleChoice', question: '원래 자료값을 보존하면서 정리할 수 있는 방법은?', options: ['히스토그램', '원그래프', '줄기와 잎 그림', '도수분포표'], correctIndex: 2, explanation: '줄기와 잎은 숫자 그대로 보존!\n73 → 줄기7, 잎3' },
      { type: 'feedback', summary: '자료 정리 = 통계의 첫 걸음', message: '정리하면 숫자 더미에서 의미가 보여!' },
      { type: 'mission', mission: '키 자료를 수집해서\n① 줄기와 잎 ② 도수분포표 ③ 히스토그램 만들기', encouragement: '자료 정리가 데이터 과학의 시작!' },
    ],
  },

  'math-diamond-2': {
    id: 'math-diamond-2', chapterKey: 'math', tierKey: 'diamond', stageNumber: 2,
    title: '대푯값: 평균, 중앙값, 최빈값',
    cards: [
      { type: 'concept', title: '자료를 대표하는 값 3가지', description: '① 평균: 합÷개수\n② 중앙값: 크기순 가운데 값\n③ 최빈값: 가장 많이 나타나는 값\n\n극단값 있으면 → 중앙값이 적합\n일반적 → 평균 | 인기 조사 → 최빈값' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '평균', description: '합÷개수' },
        { icon: '🎯', label: '중앙값', description: '가운데 값, 이상치에 강함' },
        { icon: '🏆', label: '최빈값', description: '가장 자주 나타나는 값' },
        { icon: '⚠️', label: '이상치', description: '극단값은 평균 왜곡' },
      ]},
      { type: 'example', bad: { label: '평균의 함정', story: '월급 200,200,300,300,5000 → 평균1200\n4명은 200~300인데 대표성 없음.' }, good: { label: '적절한 선택', story: '중앙값=300 → 극단값 영향 없이\n실제 상황을 더 정확히 대표.' }},
      { type: 'ox', statement: '평균이 항상 가장 좋은 대푯값이다.', answer: false, feedback: '이상치 있으면 평균 왜곡!\n상황에 맞는 대푯값 선택이 중요.' },
      { type: 'multipleChoice', question: '자료 2, 3, 3, 5, 7의 중앙값은?', options: ['3', '4', '5', '3.5'], correctIndex: 0, explanation: '5개의 가운데(3번째)=3' },
      { type: 'feedback', summary: '평균·중앙값·최빈값을 상황에 맞게 선택', message: '"평균"이 나오면 "중앙값은?" 생각하자.\n통계적 사고력이 올라가!' },
      { type: 'mission', mission: '가족/친구 용돈 조사 → 평균, 중앙값, 최빈값 구하고\n어떤 대푯값이 적절한지 판단하기', encouragement: '대푯값 구별이 통계적 사고력!' },
    ],
  },

  'math-diamond-3': {
    id: 'math-diamond-3', chapterKey: 'math', tierKey: 'diamond', stageNumber: 3,
    title: '산포도: 분산과 표준편차',
    cards: [
      { type: 'concept', title: '자료가 얼마나 흩어져 있나?', description: 'A반: 70,70,70,70,70 → 평균70, 편차 없음\nB반: 50,60,70,80,90 → 평균70, 많이 흩어짐\n\n편차=값-평균 | 분산=편차²의 평균\n표준편차=√분산\n\n작으면 집중, 크면 넓게 퍼짐' },
      { type: 'summary', keywords: [
        { icon: '📏', label: '편차', description: '값-평균' },
        { icon: '📊', label: '분산', description: '편차²의 평균' },
        { icon: 'σ', label: '표준편차', description: '√분산' },
        { icon: '🎯', label: '작을수록', description: '평균 주변에 집중' },
      ]},
      { type: 'example', bad: { label: '평균만 봄', story: '평균 80점 같다고 실력 같다고 판단.\nA: 78~82 vs B: 50~100 완전 다름!' }, good: { label: '산포도 확인', story: 'A(표준편차1.4) vs B(표준편차20)\n평균 같아도 안정성이 완전 달라!' }},
      { type: 'ox', statement: '평균이 같으면 두 자료는 같은 특성을 가진다.', answer: false, feedback: '산포도가 다를 수 있어!\n평균+표준편차 함께 봐야 진짜 특성 파악.' },
      { type: 'multipleChoice', question: '자료 4, 4, 4, 4, 4의 표준편차는?', options: ['0', '1', '4', '계산 불가'], correctIndex: 0, explanation: '모두 같으면 편차=0, 분산=0, 표준편차=0' },
      { type: 'feedback', summary: '평균+표준편차 = 자료의 완전한 요약', message: '평균="어디에 모임", 표준편차="얼마나 퍼짐"\n둘 다 봐야 자료를 완전히 파악!' },
      { type: 'mission', mission: 'A:5,5,5,5,5 vs B:1,3,5,7,9\n평균과 표준편차 구하고 차이 설명하기', encouragement: '산포도를 이해하면 데이터를 제대로 읽어!' },
    ],
  },

  'math-diamond-4': {
    id: 'math-diamond-4', chapterKey: 'math', tierKey: 'diamond', stageNumber: 4,
    title: '경우의 수',
    cards: [
      { type: 'concept', title: '가능한 결과의 개수', description: '합의 법칙(OR): a+b (버스3+지하철2=5)\n곱의 법칙(AND): a×b (상의3×하의4=12)\n\n순열(P): 순서 중요 nPr=n!/(n-r)!\n조합(C): 순서 무관 nCr=n!/r!(n-r)!' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '합의 법칙', description: '"또는"→더하기' },
        { icon: '✖️', label: '곱의 법칙', description: '"그리고"→곱하기' },
        { icon: '🔢', label: '순열(P)', description: '순서 중요한 배열' },
        { icon: '🤝', label: '조합(C)', description: '순서 무관 선택' },
      ]},
      { type: 'example', bad: { label: '합/곱 혼동', story: '상의3+하의2=5가지로 계산.\n정답: 3×2=6 (곱의 법칙!)' }, good: { label: '올바른 판단', story: 'AND→곱: 상의×하의=6가지\nOR→합: 버스+지하철=5가지' }},
      { type: 'ox', statement: '5명에서 2명을 뽑는 것(조합)과 2명을 줄 세우는 것(순열)의 결과는 같다.', answer: false, feedback: '조합 5C2=10, 순열 5P2=20\nAB와 BA를 다르게 보면 순열!' },
      { type: 'multipleChoice', question: '주사위 2개를 던질 때 나오는 경우의 수는?', options: ['12', '24', '36', '6'], correctIndex: 2, explanation: '6×6=36 (곱의 법칙)' },
      { type: 'feedback', summary: 'OR=더하기, AND=곱하기', message: '이 원칙만 기억하면 경우의 수 정확히 셀 수 있어!' },
      { type: 'mission', mission: '① 오늘 옷 조합 경우의 수 구하기\n② 가위바위보 2명/3명 경우의 수 구하기', encouragement: '경우의 수는 확률의 기초!' },
    ],
  },

  'math-diamond-5': {
    id: 'math-diamond-5', chapterKey: 'math', tierKey: 'diamond', stageNumber: 5,
    title: '확률의 기본',
    cards: [
      { type: 'concept', title: '확률 = 일어날 가능성', description: 'P = 해당 경우의 수 / 전체 경우의 수\n범위: 0≤P≤1 (0%~100%)\n\n주사위 짝수: {2,4,6}/6 = 1/2\n\n여사건: P(안 일어남)=1-P(일어남)\n비 30% → 안 비올 확률 70%' },
      { type: 'summary', keywords: [
        { icon: '🎲', label: '확률', description: '0~1 사이 가능성' },
        { icon: '📊', label: '공식', description: '해당÷전체' },
        { icon: '🔄', label: '여사건', description: '1-P(A)' },
        { icon: '⚖️', label: '동일 가능성', description: '모든 결과 같은 확률' },
      ]},
      { type: 'example', bad: { label: '오해', story: '5번 연속 앞면 → "다음은 반드시 뒷면!"\n매 시행은 독립, 과거가 미래에 영향 없어.' }, good: { label: '올바른 이해', story: '앞면 확률은 항상 1/2.\n이전 결과와 무관, 각 시행은 독립!' }},
      { type: 'ox', statement: '확률이 1/2이면 두 번 시행하면 반드시 한 번은 일어난다.', answer: false, feedback: '확률은 경향이지 확정 아님!\n2번 다 앞면도 가능. 반복할수록 1/2에 근접.' },
      { type: 'multipleChoice', question: '카드 52장에서 1장을 뽑을 때 하트가 나올 확률은?', options: ['1/13', '1/4', '1/2', '4/13'], correctIndex: 1, explanation: '하트13장/전체52장 = 1/4' },
      { type: 'feedback', summary: '확률 = 가능성 수치화, 여사건으로 반대 계산', message: '불확실한 미래를 수학으로 다루는 도구!\n날씨, 게임, 의학 등 모든 곳에 쓰여.' },
      { type: 'mission', mission: '① 주사위 3의 배수 확률 구하기\n② 실제 20번 던져서 이론 확률과 비교', encouragement: '확률은 미래 예측의 수학 마법!' },
    ],
  },

  'math-diamond-6': {
    id: 'math-diamond-6', chapterKey: 'math', tierKey: 'diamond', stageNumber: 6,
    title: '확률의 계산',
    cards: [
      { type: 'concept', title: '확률의 덧셈과 곱셈', description: '덧셈(OR): P(A∪B)=P(A)+P(B)-P(A∩B)\n배반이면 겹침 없이 그냥 더하기\n\n곱셈(AND): P(A∩B)=P(A)×P(B) (독립)\n\n독립: 서로 영향 없음\n종속: 영향 있음(비복원 추출 등)' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '덧셈', description: 'OR: 더하고 겹침 빼기' },
        { icon: '✖️', label: '곱셈', description: 'AND: 곱하기(독립)' },
        { icon: '🔀', label: '독립사건', description: '서로 영향 없는 사건' },
        { icon: '🔗', label: '종속사건', description: '서로 영향 주는 사건' },
      ]},
      { type: 'example', bad: { label: '겹침 안 뺌', story: '짝수(3/6)+3배수(2/6)=5/6\n6이 겹치는데 안 뺌!' }, good: { label: '정확한 계산', story: '3/6+2/6-1/6(겹침)=4/6=2/3' }},
      { type: 'ox', statement: '동전 던지기와 주사위 던지기는 독립사건이다.', answer: true, feedback: '서로 별개 사건이라 영향 없음 → 독립!' },
      { type: 'multipleChoice', question: '동전 2번 던져 2번 다 앞면이 나올 확률은?', options: ['1/2', '1/4', '1/8', '1'], correctIndex: 1, explanation: '1/2×1/2=1/4 (독립이므로 곱셈)' },
      { type: 'feedback', summary: 'OR=더하기(겹침빼기), AND=곱하기(독립)', message: '경우의 수 합/곱 법칙과 같은 원리!\n기본만 이해하면 복잡한 확률도 OK.' },
      { type: 'mission', mission: '① 주사위 2개 합이 7일 확률\n② 52장에서 2장 연속 하트 확률(비복원)', encouragement: '확률 계산으로 가능성을 수치화하자!' },
    ],
  },

  'math-diamond-7': {
    id: 'math-diamond-7', chapterKey: 'math', tierKey: 'diamond', stageNumber: 7,
    title: '상관관계',
    cards: [
      { type: 'concept', title: '두 변수 사이의 관계', description: '양의 상관: 같이 증가(키↑몸무게↑)\n음의 상관: 하나↑ 다른것↓(결석↑성적↓)\n상관없음: 뚜렷한 경향 없음\n\n산점도: 점으로 표시해 관계 판단\n\n⚠️ 상관관계 ≠ 인과관계!\n아이스크림↑ 익사↑ → 공통원인: 더위' },
      { type: 'summary', keywords: [
        { icon: '↗️', label: '양의 상관', description: '함께 증가' },
        { icon: '↘️', label: '음의 상관', description: '하나↑ 다른것↓' },
        { icon: '📊', label: '산점도', description: '점으로 관계 표시' },
        { icon: '⚠️', label: '상관≠인과', description: '관계≠원인!' },
      ]},
      { type: 'example', bad: { label: '인과 착각', story: '아이스크림 판매 줄이면 익사 줄어?\n상관을 인과로 착각!' }, good: { label: '올바른 판단', story: '공통 원인이 "더위"일 뿐\n상관관계가 원인-결과는 아니야.' }},
      { type: 'ox', statement: '두 변수 사이에 상관관계가 있으면 한쪽이 다른 쪽의 원인이다.', answer: false, feedback: '상관≠인과! 제3의 변수가 원인일 수 있어.' },
      { type: 'multipleChoice', question: '다음 중 음의 상관관계인 것은?', options: ['키와 몸무게', '운동 시간과 체력', '결석 횟수와 성적', '나이와 키(성장기)'], correctIndex: 2, explanation: '결석↑ 성적↓ = 음의 상관!' },
      { type: 'feedback', summary: '상관=함께 변하는 경향, 인과와 구별 필수', message: '뉴스·통계를 비판적으로 읽는 힘!\n"정말 원인인가?" 항상 질문하자.' },
      { type: 'mission', mission: '① 키-신발 vs 공부-성적 어떤 게 더 강한 상관?\n② 뉴스에서 상관vs인과 구별해보기', encouragement: '상관관계 구별은 과학적 사고의 핵심!' },
    ],
  },

  'math-diamond-8': {
    id: 'math-diamond-8', chapterKey: 'math', tierKey: 'diamond', stageNumber: 8,
    title: '수열의 기초',
    cards: [
      { type: 'concept', title: '규칙적인 수의 나열', description: '등차수열: 같은 수 더하기(공차d)\n2,5,8,11... → aₙ=a₁+(n-1)d\n합: Sₙ=n(a₁+aₙ)/2\n\n등비수열: 같은 수 곱하기(공비r)\n3,6,12,24... → aₙ=a₁×r^(n-1)\n합: Sₙ=a₁(rⁿ-1)/(r-1)\n\n가우스: 1+...+100=101×50=5050' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '등차수열', description: '같은 수 더하기(공차d)' },
        { icon: '✖️', label: '등비수열', description: '같은 수 곱하기(공비r)' },
        { icon: '📐', label: '일반항', description: 'n번째 항 공식' },
        { icon: '📊', label: '합 공식', description: '한 번에 합 구하기' },
      ]},
      { type: 'example', bad: { label: '하나씩 더함', story: '1+2+...+50 하나씩 더하다 실수.' }, good: { label: '공식 활용', story: '50×51/2=1275 한 줄로 해결!' }},
      { type: 'ox', statement: '등비수열에서 공비는 항상 양수이다.', answer: false, feedback: '공비 음수도 가능!\n1,-2,4,-8... (공비=-2)' },
      { type: 'multipleChoice', question: '등차수열 3, 7, 11, 15, ...의 10번째 항은?', options: ['39', '40', '41', '43'], correctIndex: 0, explanation: 'a₁=3, d=4\na₁₀=3+9×4=39' },
      { type: 'feedback', summary: '수열 = 규칙의 수학화, 일반항으로 구함', message: '이자 계산, 인구 증가, 프로그래밍에서도 핵심!' },
      { type: 'mission', mission: '① 등차 2,5,8...의 20번째 항과 합\n② 등비 1,2,4...의 10번째 항\n③ 1+...+100 가우스 방법', encouragement: '수열은 무한을 다루는 도구!' },
    ],
  },

  'math-diamond-9': {
    id: 'math-diamond-9', chapterKey: 'math', tierKey: 'diamond', stageNumber: 9,
    title: '논리와 증명',
    cards: [
      { type: 'concept', title: '수학적 증명의 기초', description: '명제: 참/거짓 판별 가능한 문장\n\n증명 방법:\n① 직접: 가정→논리→결론\n② 귀류법: 반대 가정→모순→참\n③ 귀납법: n=1 확인, k→k+1 증명\n\n대우: ~q→~p (원래 명제와 진리값 같음!)' },
      { type: 'summary', keywords: [
        { icon: '✅', label: '명제', description: '참/거짓 판별 문장' },
        { icon: '🔗', label: '직접 증명', description: '가정→결론 연결' },
        { icon: '❌', label: '귀류법', description: '반대 가정→모순' },
        { icon: '🔄', label: '대우', description: '~q→~p, 같은 진리값' },
      ]},
      { type: 'example', bad: { label: '예시로 증명', story: '2+4=6이니까 짝수합은 항상 짝수?\n몇 예시로는 "항상" 증명 불가.' }, good: { label: '올바른 증명', story: '짝수=2m,2n → 합=2(m+n)\nm+n은 정수 → 짝수! (직접 증명)' }},
      { type: 'ox', statement: '명제의 역이 참이면 원래 명제도 참이다.', answer: false, feedback: '역은 거짓일 수 있어!\n대우만 원래 명제와 같은 진리값.' },
      { type: 'multipleChoice', question: '"비가 오면 땅이 젖는다"의 대우는?', options: ['땅이 젖으면 비가 온다', '비가 안 오면 땅이 안 젖는다', '땅이 안 젖으면 비가 안 왔다', '땅이 젖으면 비가 안 온다'], correctIndex: 2, explanation: '대우: ~q→~p\n안 젖음→비 안 옴' },
      { type: 'feedback', summary: '증명 = 논리적으로 참을 보이는 것', message: '논리적 사고의 최고봉!\n토론, 글쓰기, 프로그래밍에도 활용.' },
      { type: 'mission', mission: '① "홀수+홀수=짝수" 직접 증명\n② "x²짝수→x짝수" 귀류법 증명', encouragement: '증명할 수 있다면 진정으로 이해한 것!' },
    ],
  },

  'math-diamond-10': {
    id: 'math-diamond-10', chapterKey: 'math', tierKey: 'diamond', stageNumber: 10,
    title: '수학의 종합 응용',
    cards: [
      { type: 'concept', title: '수학의 모든 것을 연결', description: '브론즈: 사고법 | 실버: 수와 연산\n골드: 대수와 함수 | 플래티넘: 기하\n다이아: 확률·통계·논리\n\n함수+기하=좌표기하 | 확률+대수=기대값\n통계+함수=회귀분석 | 수열+함수=미적분\n\n모든 것의 시작: "왜?"라고 질문하기' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '연결', description: '모든 분야가 서로 연결' },
        { icon: '🌐', label: '응용', description: '과학, 경제, IT의 기초' },
        { icon: '❓', label: '"왜?"', description: '수학적 사고의 시작' },
        { icon: '🚀', label: '성장', description: '기초→심화→응용' },
      ]},
      { type: 'example', bad: { label: '단절 학습', story: '각 단원 따로 공부 → 응용문제 못 풂.' }, good: { label: '연결 학습', story: '피타고라스+좌표=거리공식\n단원 연결하니 응용도 해결!' }},
      { type: 'ox', statement: '수학의 각 분야는 서로 독립적이다.', answer: false, feedback: '모두 연결된 체계!\n하나를 잘하면 다른 것도 좋아져.' },
      { type: 'multipleChoice', question: '수학적 사고에서 가장 중요한 질문은?', options: ['"이 공식은 뭐지?"', '"답이 뭐지?"', '"왜 이렇게 되지?"', '"시험에 나올까?"'], correctIndex: 2, explanation: '"왜?"가 이해를 깊게 하고\n새로운 발견으로 이끌어!' },
      { type: 'feedback', summary: '수학 = 연결된 체계, "왜?"가 시작', message: '수학 50스테이지 전체 완료!\n더 깊은 수학 세계를 탐험하자!' },
      { type: 'mission', mission: '① 좋아하는 분야 심화 문제 풀기\n② 수학 쓰이는 직업 3가지 조사\n③ 인상 깊은 개념 친구에게 설명', encouragement: '여기가 끝이 아니라 시작!\n"왜?"를 묻는 한 수학 여행은 계속돼!' },
    ],
  },
}
