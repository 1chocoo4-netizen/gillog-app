// 국어 영역 학습 콘텐츠 (브론즈~다이아 50스테이지)
import type { Stage } from './lessonData'

export const KOREAN_STAGES: Record<string, Stage> = {

  // ═══ 브론즈 (기초 다지기) 1~10 ═══

  'korean-bronze-1': {
    id: 'korean-bronze-1', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 1,
    title: '공부 습관의 시작',
    cards: [
      { type: 'concept', title: '66일 법칙', description: '새 습관이 자동화되려면\n평균 66일이 걸려.\n\n처음엔 하루 10분이라도\n매일 하는 게 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '📅', label: '66일 반복', description: '습관 자동화 최소 기간' },
        { icon: '🐣', label: '작게 시작', description: '하루 10분부터' },
        { icon: '📈', label: '점진적 확대', description: '익숙해지면 양 늘리기' },
        { icon: '✅', label: '매일 체크', description: '빠짐없이 기록 유지' },
      ]},
      { type: 'example', bad: { label: '태민', story: '"하루 5시간 국어!" 선언 후\n3일 만에 지쳐서 포기했다.' }, good: { label: '유진', story: '하루 15분 지문 읽기로 시작.\n66일 후 자연스럽게 1시간씩 공부하게 됐다.' }},
      { type: 'ox', statement: '공부 습관은 처음부터 많은 양으로 시작해야 효과가 있다.', answer: false, feedback: '처음부터 많으면 번아웃이 와.\n작게 시작해서 점진적으로 늘려야 해!' },
      { type: 'multipleChoice', question: '강성태 66일 공부법의 핵심 원리는?', options: ['66시간 집중 공부하기', '매일 조금씩 반복하여 습관 만들기', '일주일에 한 번 몰아서 공부하기', '남들보다 빨리 끝내기'], correctIndex: 1, explanation: '습관은 반복으로 만들어져.\n매일 조금씩이 핵심이야.' },
      { type: 'feedback', summary: '습관 = 작게 시작 + 매일 반복 + 66일', message: '오늘 한 걸음이 66일 후의 너를 만들어!' },
      { type: 'mission', mission: '오늘부터 국어 공부 시간을 정하고 달력에 체크하기', encouragement: '작은 체크 하나가 큰 습관의 씨앗!' },
    ],
  },

  'korean-bronze-2': {
    id: 'korean-bronze-2', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 2,
    title: '어휘력의 기초',
    cards: [
      { type: 'concept', title: '한자어 구조 이해', description: '국어 어휘의 70%는 한자어야.\n\n구조를 알면 모르는 단어도 유추 가능!\n예: 不可能 = 할 수 없음' },
      { type: 'summary', keywords: [
        { icon: '🔤', label: '한자어 구조', description: '뜻글자 조합으로 의미 파악' },
        { icon: '📖', label: '맥락 독해', description: '문맥에서 어휘 뜻 유추' },
        { icon: '📝', label: '어휘 노트', description: '모르는 단어 기록 누적' },
        { icon: '🔁', label: '반복 노출', description: '다양한 글에서 반복 학습' },
      ]},
      { type: 'example', bad: { label: '수빈', story: '모르는 단어를 그냥 넘겼다.\n점점 지문이 안 읽히기 시작했다.' }, good: { label: '하준', story: '한자어를 분해해서 뜻을 유추했다.\n읽을수록 어휘가 자연스럽게 늘었다.' }},
      { type: 'ox', statement: '국어 어휘는 영어 단어처럼 무조건 외워야 한다.', answer: false, feedback: '한자어는 뜻글자 조합이라\n구조를 이해하면 훨씬 효율적이야!' },
      { type: 'multipleChoice', question: '"불가피(不可避)"의 뜻을 한자로 유추하면?', options: ['피할 수 있다', '피할 수 없다', '가능하지 않다', '바꿀 수 없다'], correctIndex: 1, explanation: '不(아닐) + 可(가할) + 避(피할)\n= 피할 수 없다는 뜻이야.' },
      { type: 'feedback', summary: '어휘력 = 한자어 구조 + 맥락 독해', message: '어휘는 국어의 기초 체력이야!' },
      { type: 'mission', mission: '오늘 읽은 글에서 모르는 단어 3개를 한자어 분해해보기', encouragement: '단어 하나를 분해하면 열 개를 얻어!' },
    ],
  },

  'korean-bronze-3': {
    id: 'korean-bronze-3', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 3,
    title: '글의 구조 파악하기',
    cards: [
      { type: 'concept', title: '글의 3대 구조', description: '모든 글에는 구조가 있어.\n\n주장-근거 / 원인-결과 / 비교-대조\n구조를 알면 핵심이 보여!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '주장-근거', description: '의견과 그 이유' },
        { icon: '🔄', label: '원인-결과', description: '왜 일어났는지' },
        { icon: '⚖️', label: '비교-대조', description: '공통점과 차이점' },
        { icon: '🗺️', label: '구조 파악', description: '글의 뼈대 먼저 잡기' },
      ]},
      { type: 'example', bad: { label: '민지', story: '지문을 처음부터 끝까지 그냥 읽었다.\n뭘 말하려는 건지 파악이 안 됐다.' }, good: { label: '재현', story: '첫 문장에서 주장, 각 문단 역할을 파악.\n전체 흐름이 한눈에 보였다.' }},
      { type: 'ox', statement: '글의 구조를 파악하면 읽는 속도가 느려진다.', answer: false, feedback: '오히려 핵심을 빠르게 찾을 수 있어\n속도와 이해도가 동시에 올라가!' },
      { type: 'multipleChoice', question: '"A 현상이 나타났다. 이는 B 때문이다." 이 글의 구조는?', options: ['주장-근거', '원인-결과', '비교-대조', '나열'], correctIndex: 1, explanation: 'B(원인) 때문에 A(결과)가 나타났으니\n원인-결과 구조야.' },
      { type: 'feedback', summary: '구조 파악 = 글의 뼈대를 먼저 읽기', message: '구조를 보는 눈이 생기면 자신감이 붙어!' },
      { type: 'mission', mission: '기사나 교과서 글 하나에서 구조를 표시해보기', encouragement: '글의 뼈대를 보는 연습, 오늘 시작!' },
    ],
  },

  'korean-bronze-4': {
    id: 'korean-bronze-4', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 4,
    title: '사실적 독해 원칙',
    cards: [
      { type: 'concept', title: '텍스트 기반 독해', description: '수능 국어 핵심 원칙:\n"지문에 쓰인 것만으로 판단하라"\n\n배경지식이 아닌 지문이 유일한 근거야.' },
      { type: 'summary', keywords: [
        { icon: '📄', label: '텍스트 중심', description: '지문 정보만 활용' },
        { icon: '🚫', label: '주관 배제', description: '내 생각 넣지 않기' },
        { icon: '🔍', label: '근거 확인', description: '선지 근거를 지문에서 찾기' },
        { icon: '✏️', label: '밑줄 습관', description: '핵심 문장에 표시' },
      ]},
      { type: 'example', bad: { label: '서진', story: '배경지식으로 판단하다가 틀렸다.\n지문에는 다른 내용이 있었다.' }, good: { label: '다영', story: '선지마다 지문에서 근거를 찾았다.\n정확한 근거로 정답을 골랐다.' }},
      { type: 'ox', statement: '내가 알고 있는 배경지식도 정답 근거로 쓸 수 있다.', answer: false, feedback: '수능 국어는 지문에 쓰인 내용만이 근거야.\n배경지식이 맞아도 지문에 없으면 안 돼!' },
      { type: 'multipleChoice', question: '사실적 독해에서 가장 중요한 원칙은?', options: ['빠르게 읽기', '배경지식 활용하기', '지문에 근거하여 판단하기', '핵심 단어 외우기'], correctIndex: 2, explanation: '사실적 독해 = 지문 기반 판단.\n근거를 반드시 지문에서 찾아야 해.' },
      { type: 'feedback', summary: '사실적 독해 = 지문이 유일한 근거', message: '밑줄 치며 읽는 습관이 정답률을 올려!' },
      { type: 'mission', mission: '지문 하나를 읽으며 핵심 문장에 밑줄 긋고 근거 찾기', encouragement: '근거 찾는 습관이 실력의 시작!' },
    ],
  },

  'korean-bronze-5': {
    id: 'korean-bronze-5', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 5,
    title: '문법 기초: 음운과 형태소',
    cards: [
      { type: 'concept', title: '음운과 형태소란?', description: '음운: 뜻을 구별하는 최소 소리 단위\n형태소: 뜻을 가진 최소 말 단위\n\n예) "먹었다" → 먹+었+다 (3개 형태소)' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운', description: '최소 소리 단위' },
        { icon: '🧩', label: '형태소', description: '뜻 가진 최소 단위' },
        { icon: '🔄', label: '음운 변동', description: '비음화 등 소리 변화' },
        { icon: '📦', label: '품사', description: '단어 기능별 분류' },
      ]},
      { type: 'example', bad: { label: '현우', story: '문법을 무조건 외우려 했다.\n시험 때마다 헷갈렸다.' }, good: { label: '소미', story: '"국물→[궁물]" 직접 발음해보며 이해.\n원리를 알으니 다른 예도 바로 풀었다.' }},
      { type: 'ox', statement: '"형태소"와 "단어"는 같은 개념이다.', answer: false, feedback: '형태소는 최소 단위, 단어는 더 큰 단위야.\n"먹었다"는 단어 1개, 형태소 3개!' },
      { type: 'multipleChoice', question: '"꽃잎"의 발음이 [꼰닙]이 되는 이유는?', options: ['된소리되기', '비음화와 첨가', 'ㄴ 첨가와 비음화', '구개음화'], correctIndex: 2, explanation: '꽃+잎 → ㄴ 첨가 → 비음화\n단계적 음운 변동이 일어나는 거야.' },
      { type: 'feedback', summary: '문법 = 원리 이해 + 직접 발음해보기', message: '문법은 외우는 게 아니라 이해하는 거야!' },
      { type: 'mission', mission: '"국물", "꽃잎", "신라" 발음해보고 음운 변동 적기', encouragement: '직접 소리 내보면 문법이 살아 움직여!' },
    ],
  },

  'korean-bronze-6': {
    id: 'korean-bronze-6', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 6,
    title: '현대시 읽기 입문',
    cards: [
      { type: 'concept', title: '시 읽기의 3단계', description: '시를 읽을 때 찾아야 할 3가지:\n\n화자의 상황 / 정서 / 태도\n이 3가지만 찾으면 시의 80%는 파악!' },
      { type: 'summary', keywords: [
        { icon: '👤', label: '화자', description: '시 속에서 말하는 사람' },
        { icon: '📍', label: '상황', description: '화자가 처한 배경' },
        { icon: '💭', label: '정서', description: '화자가 느끼는 감정' },
        { icon: '👁️', label: '태도', description: '대상 바라보는 시각' },
      ]},
      { type: 'example', bad: { label: '승현', story: '단어 하나하나에 매달리다\n전체 의미를 놓쳤다.' }, good: { label: '나연', story: '"화자는 고향을 떠나 있고(상황),\n그리움(정서), 돌아가고 싶어 해(태도)"' }},
      { type: 'ox', statement: '시의 화자와 시인(작가)은 항상 같은 인물이다.', answer: false, feedback: '화자는 시 속 가상의 인물이야.\n시인과 화자는 구별해야 해!' },
      { type: 'multipleChoice', question: '시를 읽을 때 가장 먼저 파악해야 할 것은?', options: ['표현 기법의 종류', '화자의 상황과 정서', '시의 운율 구조', '시인의 생애'], correctIndex: 1, explanation: '화자의 상황과 정서 파악이\n시 독해의 출발점이야.' },
      { type: 'feedback', summary: '시 읽기 = 화자의 상황 + 정서 + 태도', message: '3가지만 먼저 찾으면 시가 쉬워져!' },
      { type: 'mission', mission: '현대시 하나를 골라 화자의 상황·정서·태도 정리하기', encouragement: '시 한 편, 3줄 정리로 시작하자!' },
    ],
  },

  'korean-bronze-7': {
    id: 'korean-bronze-7', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 7,
    title: '소설 읽기 입문',
    cards: [
      { type: 'concept', title: '소설의 3요소', description: '소설 분석의 기본 3요소:\n\n인물(누가, 성격) / 사건(갈등) / 배경(언제, 어디)\n이걸 잡으면 소설 문제의 기본 완성!' },
      { type: 'summary', keywords: [
        { icon: '👥', label: '인물', description: '성격과 관계 파악' },
        { icon: '⭐', label: '사건', description: '일어나는 일과 갈등' },
        { icon: '🌍', label: '배경', description: '시간적·공간적 무대' },
        { icon: '🎭', label: '갈등', description: '이야기 이끄는 대립' },
      ]},
      { type: 'example', bad: { label: '지후', story: '소설을 쭉 읽고 문제를 보니\n다시 처음부터 읽어야 했다.' }, good: { label: '예원', story: '인물(○), 사건(★), 배경(_) 표시하며 읽으니\n문제 풀 때 바로 찾을 수 있었다.' }},
      { type: 'ox', statement: '소설에서 배경은 단순한 장식이라 중요하지 않다.', answer: false, feedback: '배경은 인물 심리나 분위기를 반영하고\n시대적 상황도 알려주는 중요한 요소야!' },
      { type: 'multipleChoice', question: '소설에서 "갈등"의 역할은?', options: ['독자를 지루하게 만드는 요소', '이야기를 이끌어가는 핵심 동력', '배경을 설명하는 방법', '인물의 외모를 묘사하는 기법'], correctIndex: 1, explanation: '갈등이 있어야 사건이 전개되고\n인물이 변화해. 소설의 핵심 동력!' },
      { type: 'feedback', summary: '소설 = 인물 + 사건(갈등) + 배경', message: '3요소 표시하며 읽는 습관이 기본!' },
      { type: 'mission', mission: '소설 지문 하나에서 인물·사건·배경을 표시해보기', encouragement: '표시하면서 읽으면 소설이 입체적으로 보여!' },
    ],
  },

  'korean-bronze-8': {
    id: 'korean-bronze-8', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 8,
    title: '복습과 암기의 기술',
    cards: [
      { type: 'concept', title: '3단계 트리플 암기법', description: '효과적인 암기 3단계:\n눈으로 읽기 → 소리 내서 읽기 → 손으로 쓰기\n\n공부 직후 5분 정리가 1시간 추가 공부보다 효과적!' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '시각 입력', description: '눈으로 읽으며 파악' },
        { icon: '🗣️', label: '청각 입력', description: '소리 내서 각인' },
        { icon: '✍️', label: '운동 입력', description: '손으로 쓰면서 정착' },
        { icon: '⏰', label: '5분 복습', description: '직후 5분 핵심 정리' },
      ]},
      { type: 'example', bad: { label: '승우', story: '밤새 벼락치기로 외웠다.\n시험 다음 날 아무것도 기억 안 남았다.' }, good: { label: '채은', story: '공부 후 5분 핵심 정리, 다음 날 소리로 읽기.\n시험 때 자연스럽게 떠올랐다.' }},
      { type: 'ox', statement: '한 번에 오래 반복하는 것이 여러 번 짧게 반복하는 것보다 효과적이다.', answer: false, feedback: '분산 학습(여러 번 짧게)이\n장기 기억에 훨씬 효과적이야!' },
      { type: 'multipleChoice', question: '5분 복습법을 적용하는 가장 좋은 타이밍은?', options: ['시험 전날', '공부한 직후', '일주일 후', '한 달 후'], correctIndex: 1, explanation: '공부 직후 5분 정리가 가장 효과적.\n기억이 생생할 때 정리해야 해!' },
      { type: 'feedback', summary: '암기 = 3감각 입력 + 직후 5분 복습', message: '똑똑한 공부는 양이 아니라 방법이야!' },
      { type: 'mission', mission: '오늘 공부한 내용을 5분 안에 핵심 3가지로 정리하기', encouragement: '5분 투자가 1시간의 가치를 만들어!' },
    ],
  },

  'korean-bronze-9': {
    id: 'korean-bronze-9', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 9,
    title: '요약과 정리 능력',
    cards: [
      { type: 'concept', title: '코넬 노트법', description: '노트를 3칸으로 나눠:\n왼쪽(키워드) / 오른쪽(내용 정리) / 아래(2~3줄 요약)\n\n요약할 수 있다면 진짜 이해한 거야!' },
      { type: 'summary', keywords: [
        { icon: '🔑', label: '키워드 칸', description: '핵심 단어와 질문' },
        { icon: '📝', label: '노트 칸', description: '자기 말로 정리' },
        { icon: '📋', label: '요약 칸', description: '전체를 2~3줄로 압축' },
        { icon: '🧠', label: '능동적 정리', description: '쓰면서 이해하는 과정' },
      ]},
      { type: 'example', bad: { label: '도현', story: '수업 내용을 처음부터 끝까지 받아 적었다.\n뭐가 중요한지 모르겠었다.' }, good: { label: '하연', story: '핵심만 메모하고 키워드 뽑고 3줄 요약.\n시험 전 요약만 봐도 전체가 기억났다.' }},
      { type: 'ox', statement: '좋은 노트는 수업 내용을 빠짐없이 받아 적은 것이다.', answer: false, feedback: '좋은 노트는 핵심을 자기 말로 정리한 것!\n전부 베끼면 손만 바쁘고 뇌는 쉬어.' },
      { type: 'multipleChoice', question: '코넬 노트에서 "요약 칸"의 역할은?', options: ['수업 내용을 전부 적는 공간', '전체 내용을 2~3줄로 압축하는 공간', '선생님의 말씀을 그대로 옮기는 공간', '그림을 그리는 공간'], correctIndex: 1, explanation: '요약 칸은 전체를 2~3줄로 압축하는 거야.\n이 과정에서 진짜 이해가 일어나!' },
      { type: 'feedback', summary: '정리 = 코넬 노트 + 자기 말로 요약', message: '요약할 수 있으면 이해한 거야!' },
      { type: 'mission', mission: '오늘 공부 내용을 코넬 노트 형식으로 한 페이지 정리하기', encouragement: '한 페이지 정리가 열 페이지 필기보다 강해!' },
    ],
  },

  'korean-bronze-10': {
    id: 'korean-bronze-10', chapterKey: 'korean', tierKey: 'bronze', stageNumber: 10,
    title: '문제 풀이 기초',
    cards: [
      { type: 'concept', title: '문제 먼저 읽기 전략', description: '국어 문제 풀이 기본 전략:\n\n1) 문제를 먼저 읽어라\n2) 소거법으로 틀린 선지 제거\n3) "항상/절대/모두" 극단 표현 주의!' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '문제 선독', description: '지문 전에 문제 먼저' },
        { icon: '✂️', label: '소거법', description: '틀린 선지부터 제거' },
        { icon: '⚠️', label: '극단 표현', description: '"항상/절대/모두" 주의' },
        { icon: '🔗', label: '근거 매칭', description: '선지와 지문 내용 대조' },
      ]},
      { type: 'example', bad: { label: '시우', story: '지문 다 읽고 문제를 봤다.\n다시 읽어야 해서 시간 부족.' }, good: { label: '유나', story: '문제 먼저 읽고 "주제를 찾으라는 거구나"\n필요한 정보에 집중해서 빠르게 답을 찾았다.' }},
      { type: 'ox', statement: '소거법은 정답을 확실히 모를 때만 쓰는 비효율적인 방법이다.', answer: false, feedback: '소거법은 가장 효율적인 전략 중 하나야.\n확실한 오답을 지우면 정답 확률이 올라가!' },
      { type: 'multipleChoice', question: '다음 중 오답일 확률이 높은 선지의 특징은?', options: ['"~할 수도 있다"는 표현', '"항상 ~이다"는 극단적 표현', '지문의 내용을 그대로 인용한 표현', '"~경우가 있다"는 표현'], correctIndex: 1, explanation: '"항상/절대/모두" 같은 극단적 표현은\n예외 하나만 있으면 틀리니까 오답일 확률이 높아!' },
      { type: 'feedback', summary: '문제 풀이 = 문제 선독 + 소거법 + 근거 매칭', message: '브론즈 과정 완료! 기본기가 토대가 될 거야!' },
      { type: 'mission', mission: '기출 3개를 문제 선독 + 소거법으로 풀어보기', encouragement: '기본기를 갖추면 어떤 문제든 도전 가능!' },
    ],
  },

  // ═══ 실버 (실전 응용) 1~10 ═══

  'korean-silver-1': {
    id: 'korean-silver-1', chapterKey: 'korean', tierKey: 'silver', stageNumber: 1,
    title: '비문학 구조 독해 심화',
    cards: [
      { type: 'concept', title: '구조 중심 독서법', description: '비문학은 정보량이 많아서\n구조 중심으로 읽어야 해.\n\n주제문 찾기 → 문단 관계 파악 → 전체 논지 정리' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '주제문 찾기', description: '각 문단 핵심 문장' },
        { icon: '🔗', label: '문단 관계', description: '나열/대조/인과 파악' },
        { icon: '📊', label: '정보 처리', description: '중요도별 정보 걸러내기' },
        { icon: '⭐', label: '속도 향상', description: '구조 파악으로 속도 증가' },
      ]},
      { type: 'example', bad: { label: '준서', story: '경제 지문을 한 글자도 안 빠뜨리고 읽었다.\n5분이 지나도 1문단을 못 벗어났다.' }, good: { label: '민서', story: '각 문단 첫 문장에서 핵심을 잡았다.\n전체 구조를 3분 만에 파악했다.' }},
      { type: 'ox', statement: '비문학 지문은 모든 문장을 동일한 집중도로 읽어야 한다.', answer: false, feedback: '주제문에 집중하고 예시는 빠르게 넘기는 게\n효율적이야!' },
      { type: 'multipleChoice', question: '비문학 구조 독해에서 문단의 핵심 문장은 보통 어디에 있나?', options: ['항상 마지막 문장', '주로 첫 문장이나 마지막 문장', '항상 중간 문장', '규칙이 전혀 없다'], correctIndex: 1, explanation: '주제문은 보통 문단의 처음이나 끝에 있어.\n이 위치를 먼저 확인하면 빠르게 핵심을 잡아!' },
      { type: 'feedback', summary: '구조 독해 = 주제문 + 문단 관계 + 논지 정리', message: '구조를 보는 눈이 생기면 두렵지 않아!' },
      { type: 'mission', mission: '비문학 기출 지문에서 각 문단 핵심에 밑줄 긋기', encouragement: '구조를 그리는 순간 지문이 투명해져!' },
    ],
  },

  'korean-silver-2': {
    id: 'korean-silver-2', chapterKey: 'korean', tierKey: 'silver', stageNumber: 2,
    title: '어휘력 심화',
    cards: [
      { type: 'concept', title: '한자어 네트워크', description: '같은 한자가 들어간 단어끼리 묶으면\n하나의 한자로 여러 단어를 한꺼번에 익혀!\n\n예) 自: 자율, 자립, 자발, 자연' },
      { type: 'summary', keywords: [
        { icon: '🕸️', label: '한자 네트워크', description: '같은 한자 단어 묶어 학습' },
        { icon: '📜', label: '사자성어', description: '고사 유래 핵심 표현' },
        { icon: '📚', label: '고전 어휘', description: '고전 문학 빈출 어휘' },
        { icon: '🔄', label: '유의어·반의어', description: '쌍으로 학습' },
      ]},
      { type: 'example', bad: { label: '태현', story: '사자성어를 가나다순으로 외웠다.\n시험에 안 나와서 허탈했다.' }, good: { label: '서윤', story: '"不(아닐 불)" 단어를 묶었다.\n하나의 한자로 10개 이상 정복했다.' }},
      { type: 'ox', statement: '사자성어는 무조건 많이 외우는 것이 최선이다.', answer: false, feedback: '빈출 사자성어 중심으로\n한자 의미를 이해하며 외우는 게 효과적!' },
      { type: 'multipleChoice', question: '"溫故知新(온고지신)"의 뜻은?', options: ['새로운 것을 먼저 배운다', '옛것을 익혀 새것을 안다', '따뜻한 옛 기억을 떠올린다', '새로운 지식만 추구한다'], correctIndex: 1, explanation: '溫(익힐)+故(옛)+知(알)+新(새)\n= 옛것을 익혀 새것을 안다.' },
      { type: 'feedback', summary: '어휘 심화 = 한자 네트워크 + 빈출 사자성어', message: '연결해서 외우면 기억이 오래가!' },
      { type: 'mission', mission: '한자 하나를 골라 포함된 단어 5개 이상 찾아 정리하기', encouragement: '한 글자가 열 단어를 여는 열쇠!' },
    ],
  },

  'korean-silver-3': {
    id: 'korean-silver-3', chapterKey: 'korean', tierKey: 'silver', stageNumber: 3,
    title: '문법 심화',
    cards: [
      { type: 'concept', title: '문장 구조와 음운 변동 카운팅', description: '실버 문법 핵심 2가지:\n\n문장 구조(겹문장 분석) +\n음운 변동 카운팅(변동 횟수 세기)' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '통사론', description: '문장 성분과 구조 분석' },
        { icon: '🔢', label: '음운 카운팅', description: '음운 변동 횟수 세기' },
        { icon: '🧩', label: '겹문장', description: '안은문장/이어진문장' },
        { icon: '📏', label: '문장 성분', description: '주어/목적어/서술어' },
      ]},
      { type: 'example', bad: { label: '윤성', story: '음운 변동을 직관으로 풀었다.\n"대충 비음화 같은데…" 틀렸다.' }, good: { label: '지민', story: '"꽃잎" → ㄴ 첨가 → 비음화\n단계별 카운팅으로 정확하게 맞았다.' }},
      { type: 'ox', statement: '"국물"에서 일어나는 음운 변동은 1회이다.', answer: true, feedback: '"국물"→[궁물]\nㄱ→ㅇ 비음화 1회만 일어나!' },
      { type: 'multipleChoice', question: '다음 중 안은문장의 예는?', options: ['"비가 오고 바람이 분다"', '"내가 읽은 책은 재미있다"', '"밥을 먹고 학교에 갔다"', '"하늘이 맑지만 춥다"'], correctIndex: 1, explanation: '"내가 읽은"이 "책"을 꾸미는 관형절.\n다른 문장을 안고 있으니 안은문장!' },
      { type: 'feedback', summary: '문법 심화 = 문장 구조 + 음운 변동 카운팅', message: '원리를 알면 어떤 변형도 풀 수 있어!' },
      { type: 'mission', mission: '"독립","학력","없는"의 발음과 음운 변동 카운팅하기', encouragement: '카운팅 연습이 문법 고득점의 지름길!' },
    ],
  },

  'korean-silver-4': {
    id: 'korean-silver-4', chapterKey: 'korean', tierKey: 'silver', stageNumber: 4,
    title: '현대시 심화 분석',
    cards: [
      { type: 'concept', title: '비유·상징과 어조', description: '비유: 직유(~처럼), 은유(A는 B), 의인법\n상징: 이미지가 깊은 의미를 담는 것\n\n어조와 분위기도 함께 파악해야 해!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '비유', description: '직유·은유·의인법' },
        { icon: '🔮', label: '상징', description: '이미지 속 깊은 의미' },
        { icon: '🎵', label: '어조', description: '화자의 말투와 태도' },
        { icon: '🌅', label: '분위기', description: '시 전체의 정서' },
      ]},
      { type: 'example', bad: { label: '현석', story: '"나뭇잎이 떨어진다"를 자연 묘사로만 봤다.\n상징적 의미를 못 읽었다.' }, good: { label: '서아', story: '시 전체 맥락에서 "나뭇잎"이\n소멸이나 이별을 상징한다는 걸 파악했다.' }},
      { type: 'ox', statement: '"내 마음은 호수"는 직유법이다.', answer: false, feedback: '"A는 B이다" 형식은 은유법이야.\n"~처럼"이 있어야 직유법이지!' },
      { type: 'multipleChoice', question: '시에서 "겨울"이 반복적으로 화자의 고통을 나타낸다면?', options: ['직유법', '의인법', '상징', '반어법'], correctIndex: 2, explanation: '겨울이라는 구체적 계절이\n고통이라는 추상적 의미를 담으니 상징이야!' },
      { type: 'feedback', summary: '시 심화 = 비유·상징 + 어조·분위기', message: '표현 기법을 읽으면 시가 풍부해져!' },
      { type: 'mission', mission: '현대시에서 비유 1개, 상징 1개, 어조를 찾아 정리하기', encouragement: '기법을 읽는 눈이 시의 세계를 열어줘!' },
    ],
  },

  'korean-silver-5': {
    id: 'korean-silver-5', chapterKey: 'korean', tierKey: 'silver', stageNumber: 5,
    title: '고전시가와 고전소설',
    cards: [
      { type: 'concept', title: '고전의 핵심 가치', description: '고전 문학의 반복 가치:\n충(충성) / 효(공경) / 무위자연\n\n고전소설은 권선징악 구조가 기본!' },
      { type: 'summary', keywords: [
        { icon: '⚔️', label: '충', description: '나라에 대한 충성' },
        { icon: '🙏', label: '효', description: '부모 공경과 사랑' },
        { icon: '🍃', label: '무위자연', description: '자연에 순응하는 삶' },
        { icon: '⚖️', label: '권선징악', description: '착한 사람이 복 받는 구조' },
      ]},
      { type: 'example', bad: { label: '동혁', story: '고전 지문을 현대어처럼 읽으려 했다.\n어휘를 모르니 한 줄도 이해 안 됐다.' }, good: { label: '소율', story: '핵심 고전 어휘를 먼저 익히고 읽으니\n충·효·자연이라는 주제를 바로 파악했다.' }},
      { type: 'ox', statement: '고전소설은 대부분 비극으로 끝난다.', answer: false, feedback: '한국 고전소설의 특징은\n권선징악 + 해피엔딩이야!' },
      { type: 'multipleChoice', question: '"오우가(五友歌)"에서 다섯 벗이 상징하는 것은?', options: ['다섯 친구의 우정', '자연물에 담긴 유교적 덕목', '다섯 가지 음식', '다섯 계절의 변화'], correctIndex: 1, explanation: '오우가의 수·석·송·죽·월은\n각각 유교적 덕목을 상징해!' },
      { type: 'feedback', summary: '고전 = 충·효·무위자연 + 고전 어휘', message: '핵심 가치와 어휘만 알면 패턴이 보여!' },
      { type: 'mission', mission: '시조 한 편에서 어떤 가치가 담겨 있는지 분석하기', encouragement: '고전 속 지혜는 시대를 초월해!' },
    ],
  },

  'korean-silver-6': {
    id: 'korean-silver-6', chapterKey: 'korean', tierKey: 'silver', stageNumber: 6,
    title: '화법과 작문 전략',
    cards: [
      { type: 'concept', title: '패턴 인식 전략', description: '화법·작문은 패턴만 알면 빠르게 풀어!\n\n화법: 말하기 전략/듣기 자세 평가\n작문: 목적에 맞는 표현/고쳐쓰기\n\n빠르게 풀고 비문학에 시간 확보!' },
      { type: 'summary', keywords: [
        { icon: '🎤', label: '화법', description: '말하기·듣기 전략' },
        { icon: '✏️', label: '작문', description: '글 목적과 고쳐쓰기' },
        { icon: '🔍', label: '패턴 인식', description: '반복 출제 유형 파악' },
        { icon: '⏱️', label: '시간 절약', description: '익숙한 유형은 빠르게' },
      ]},
      { type: 'example', bad: { label: '용준', story: '화법·작문을 처음부터 꼼꼼히 읽었다.\n쉬운 영역인데 15분이나 걸렸다.' }, good: { label: '수현', story: '선지 유형을 먼저 확인하고 패턴 대입.\n7분 만에 풀었다.' }},
      { type: 'ox', statement: '화법과 작문은 수능에서 가장 어려운 영역이다.', answer: false, feedback: '패턴이 정해져 있어서 가장 빠르고\n정확하게 풀 수 있는 영역이야!' },
      { type: 'multipleChoice', question: '화법·작문 문제를 빠르게 풀기 위한 전략은?', options: ['지문을 세 번 반복 읽기', '선지 유형을 먼저 파악하고 패턴 대입', '화법·작문을 마지막에 풀기', '모든 문장을 분석하기'], correctIndex: 1, explanation: '출제 패턴이 정해져 있으니\n선지 유형 먼저 확인하면 효율적!' },
      { type: 'feedback', summary: '화법·작문 = 패턴 인식 + 시간 최소화', message: '연습할수록 빠르고 정확해지는 영역!' },
      { type: 'mission', mission: '화법·작문 기출 3문제의 출제 패턴을 분류해보기', encouragement: '패턴을 외우면 시험장에서 시간을 벌어!' },
    ],
  },

  'korean-silver-7': {
    id: 'korean-silver-7', chapterKey: 'korean', tierKey: 'silver', stageNumber: 7,
    title: '문학 비평 통합',
    cards: [
      { type: 'concept', title: '보기 활용과 선지 유형', description: '<보기> 문제 풀이법:\n\n보기에서 키워드 추출 →\n작품에 대입 해석 →\n선지에서 맞는지 확인' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '<보기> 분석', description: '핵심 개념 추출 후 대입' },
        { icon: '🏷️', label: '선지 분류', description: '일치/표현법/적용 구분' },
        { icon: '🔄', label: '작품 비교', description: '공통점·차이점 분석' },
        { icon: '📊', label: '통합 사고', description: '이론+작품+선지 연결' },
      ]},
      { type: 'example', bad: { label: '주원', story: '<보기>를 대충 읽고 작품만으로 풀었다.\n보기 관점을 적용하지 못해 틀렸다.' }, good: { label: '하은', story: '<보기>에서 "이상 vs 현실 괴리" 키워드를 잡고\n작품에 대입해서 정확히 판단했다.' }},
      { type: 'ox', statement: '<보기> 문제에서 보기 내용은 무시하고 작품만으로 풀어도 된다.', answer: false, feedback: '<보기>는 해석 방향을 제시해주는 거야.\n반드시 적용해서 풀어야 해!' },
      { type: 'multipleChoice', question: '<보기> 문제를 풀 때 가장 먼저 해야 할 일은?', options: ['선지부터 읽기', '작품 전체를 다시 읽기', '<보기>에서 핵심 개념(키워드) 추출', '답을 직감으로 고르기'], correctIndex: 2, explanation: '보기의 핵심 개념을 먼저 파악해야\n작품에 적용하고 선지를 판단할 수 있어!' },
      { type: 'feedback', summary: '문학 비평 = 보기 키워드 + 작품 대입 + 선지 판단', message: '연습할수록 패턴이 보여!' },
      { type: 'mission', mission: '문학 <보기> 문제 2개에서 3단계를 의식적으로 적용하기', encouragement: '3단계를 체화하면 문학 고득점이 눈앞에!' },
    ],
  },

  'korean-silver-8': {
    id: 'korean-silver-8', chapterKey: 'korean', tierKey: 'silver', stageNumber: 8,
    title: '오답 분석과 약점 극복',
    cards: [
      { type: 'concept', title: '오답 노트 작성법', description: '성적 올리는 가장 빠른 방법:\n틀린 문제의 원인을 분류하는 것!\n\n지문 오독 / 선지 실수 / 시간 부족 / 개념 부족' },
      { type: 'summary', keywords: [
        { icon: '📓', label: '오답 노트', description: '틀린 문제와 원인 기록' },
        { icon: '🔍', label: '원인 분류', description: '오독/실수/시간/개념' },
        { icon: '🎯', label: '약점 파악', description: '반복 실수 유형 찾기' },
        { icon: '♻️', label: '재풀이', description: '틀린 문제 다시 풀기' },
      ]},
      { type: 'example', bad: { label: '인호', story: '채점만 하고 넘어갔다.\n다음에도 같은 유형에서 틀렸다.' }, good: { label: '아린', story: '오답 원인을 분류했더니 약점이 보였다.\n집중 연습하니 정답률이 올라갔다.' }},
      { type: 'ox', statement: '오답 분석보다 새 문제를 많이 푸는 것이 성적 향상에 효과적이다.', answer: false, feedback: '약점을 모르면 같은 실수를 반복해.\n오답 분석이 성적 향상의 핵심!' },
      { type: 'multipleChoice', question: '오답 원인 분류 중 "선지 분석 실수"에 해당하는 것은?', options: ['지문 내용을 잘못 이해함', '시간이 부족해서 대충 풀음', '선지의 "항상"을 놓치고 맞다고 판단함', '해당 개념을 아예 몰랐음'], correctIndex: 2, explanation: '"항상"이라는 극단 표현을 놓친 것은\n선지 분석 실수에 해당해!' },
      { type: 'feedback', summary: '오답 분석 = 원인 분류 + 약점 집중 공략', message: '틀린 문제는 약점을 보여주는 선물이야!' },
      { type: 'mission', mission: '최근 틀린 국어 문제 3개의 오답 원인을 분류해보기', encouragement: '오답 분석 한 번이 문제 10개보다 값져!' },
    ],
  },

  'korean-silver-9': {
    id: 'korean-silver-9', chapterKey: 'korean', tierKey: 'silver', stageNumber: 9,
    title: '실전 시간 관리',
    cards: [
      { type: 'concept', title: '80분 배분 전략', description: '수능 국어 80분, 45문제.\n\n화작 10분 / 문법 5분 / 문학 25분 / 비문학 40분\n막히면 표시하고 넘어가, 한 문제 3분 이상 금지!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '80분 배분', description: '영역별 시간 할당' },
        { icon: '🔢', label: '풀이 순서', description: '자신 있는 영역 먼저' },
        { icon: '⏭️', label: '스킵 전략', description: '막히면 표시하고 넘기기' },
        { icon: '🎯', label: '3분 규칙', description: '한 문제에 3분 이상 금지' },
      ]},
      { type: 'example', bad: { label: '강민', story: '비문학 첫 지문에 7분을 썼다.\n뒷부분 10문제를 찍어야 했다.' }, good: { label: '예진', story: '시간을 미리 정해놓고 타이머를 봤다.\n막히면 ★ 표시하고 넘어갔다.' }},
      { type: 'ox', statement: '어려운 문제를 끝까지 풀어야 실력이 늘어난다.', answer: false, feedback: '시험에서는 전략이 중요해.\n시간 안배가 곧 점수 관리야!' },
      { type: 'multipleChoice', question: '수능 국어에서 가장 많은 시간을 배분해야 하는 영역은?', options: ['화법·작문', '문법', '문학', '비문학'], correctIndex: 3, explanation: '비문학은 정보량이 많아\n약 40분이 필요해!' },
      { type: 'feedback', summary: '시간 관리 = 영역별 배분 + 3분 규칙', message: '시간 관리 능력은 연습으로 만들어져!' },
      { type: 'mission', mission: '기출 풀 때 영역별 소요 시간을 기록해보기', encouragement: '시간을 측정하는 순간 관리가 시작돼!' },
    ],
  },

  'korean-silver-10': {
    id: 'korean-silver-10', chapterKey: 'korean', tierKey: 'silver', stageNumber: 10,
    title: '수능 실전 모의 훈련',
    cards: [
      { type: 'concept', title: '실전 연습과 멘탈 관리', description: '실전력은 실전처럼 연습해야 길러져.\n\n80분 타이머 + 한 번에 풀기 + 오답 분석\n"나만 어려운 게 아니다" 마인드!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '실전 모의', description: '80분 타이머, 한 번에' },
        { icon: '🧘', label: '멘탈 관리', description: '당황하지 않는 마인드' },
        { icon: '📊', label: '오답 분석', description: '채점 후 반드시 분석' },
        { icon: '🏆', label: '실전 감각', description: '반복으로 체화하기' },
      ]},
      { type: 'example', bad: { label: '건우', story: '기출을 단원별로만 풀었다.\n실전 80분 집중이 안 돼 후반에 무너졌다.' }, good: { label: '시연', story: '매주 1회 실전 모의를 했다.\n3개월 후 실전 긴장감이 편안함으로 바뀌었다.' }},
      { type: 'ox', statement: '시험에서 어려운 지문을 만나면 포기하는 것이 현명하다.', answer: false, feedback: '포기가 아니라 "전략적 스킵"이야.\n아는 문제 먼저 풀고 돌아오면 돼!' },
      { type: 'multipleChoice', question: '실전 모의 훈련에서 가장 중요한 원칙은?', options: ['맞힌 문제 수만 확인하기', '시간 제한 없이 정확도만 추구하기', '80분 제한 + 시험 환경 + 오답 분석 세트로 진행', '틀릴 것 같으면 바로 답지 확인하기'], correctIndex: 2, explanation: '시간 제한 + 시험 환경 + 오답 분석\n세트로 반복해야 실전력이 길러져!' },
      { type: 'feedback', summary: '실전 = 80분 모의 + 오답 분석 + 멘탈 관리', message: '실버 과정 완료! 꾸준히 연습하면 반드시 성장!' },
      { type: 'mission', mission: '이번 주 국어 기출 1회분을 80분 실전으로 풀어보기', encouragement: '실전처럼 연습한 만큼 실전에서 빛나!' },
    ],
  },

  // ═══ 골드 (심화 응용) 1~10 ═══

  'korean-gold-1': {
    id: 'korean-gold-1', chapterKey: 'korean', tierKey: 'gold', stageNumber: 1,
    title: '비문학 경제·과학 지문 공략',
    cards: [
      { type: 'concept', title: '전문 지문 독해 전략', description: '경제: 용어 정의→원리→사례 순서로 읽기\n과학: 가설→실험→결과→해석 흐름 파악\n\n어려운 지문일수록 구조가 답을 알려줘!' },
      { type: 'summary', keywords: [
        { icon: '💰', label: '경제 지문', description: '용어→원리→사례 독해' },
        { icon: '🔬', label: '과학 지문', description: '가설→실험→결과→해석' },
        { icon: '📈', label: '수치 해석', description: '변화 방향과 비교 집중' },
        { icon: '🧪', label: '변인 통제', description: '독립/종속/통제 변인' },
      ]},
      { type: 'example', bad: { label: '정민', story: '경제 지문 용어가 어려워 첫 문단에서 멈췄다.\n뒷부분 쉬운 사례를 놓쳤다.' }, good: { label: '소윤', story: '모르는 용어는 괄호 치고 넘어갔다.\n뒷문단 사례에서 뜻을 유추해 전체를 이해했다.' }},
      { type: 'ox', statement: '경제·과학 지문은 배경지식이 없으면 절대 풀 수 없다.', answer: false, feedback: '수능 지문은 배경지식 없이도 풀 수 있게 설계돼.\n지문 안에 필요한 정보가 모두 있어!' },
      { type: 'multipleChoice', question: '과학 지문에서 가장 먼저 파악해야 할 것은?', options: ['실험 결과의 수치', '실험의 목적과 가설', '과학자의 이름', '실험 장비 종류'], correctIndex: 1, explanation: '목적과 가설을 먼저 파악해야\n실험과 결과의 의미를 이해할 수 있어!' },
      { type: 'feedback', summary: '전문 지문 = 구조 파악 + 맥락에서 유추', message: '어려운 지문일수록 구조에 의지하자!' },
      { type: 'mission', mission: '경제/과학 기출 지문에서 용어·원리·사례를 색깔로 표시하기', encouragement: '색깔 구조 잡으면 전문 지문도 두렵지 않아!' },
    ],
  },

  'korean-gold-2': {
    id: 'korean-gold-2', chapterKey: 'korean', tierKey: 'gold', stageNumber: 2,
    title: '추론적 독해',
    cards: [
      { type: 'concept', title: '행간 읽기의 기술', description: '글에 직접 쓰여 있지 않지만\n논리적으로 도출 가능한 내용을 파악하는 거야.\n\n전제 추론 / 결과 추론 / 빈칸 추론\n핵심은 "지문의 논리"를 따라가는 것!' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '전제 추론', description: '주장 성립 위한 전제' },
        { icon: '➡️', label: '결과 추론', description: '논리적 결과 파악' },
        { icon: '🔲', label: '빈칸 추론', description: '문맥에 맞는 내용 유추' },
        { icon: '⚖️', label: '논리적 근거', description: '지문 기반 추론만' },
      ]},
      { type: 'example', bad: { label: '준혁', story: '자기 생각으로 추론해서 골랐다.\n지문의 논리와 달라서 틀렸다.' }, good: { label: '은서', story: '"A이면 B이고, B이면 C이다"\n지문의 논리 구조를 따라 추론했다.' }},
      { type: 'ox', statement: '추론 문제는 자신의 배경지식과 상식으로 풀어도 된다.', answer: false, feedback: '추론도 반드시 지문의 논리에 기반해야 해.\n"나의 상식"이 아닌 "지문의 논리"를 따라가!' },
      { type: 'multipleChoice', question: '"모든 포유류는 폐로 호흡한다. 고래는 포유류이다." 추론 가능한 것은?', options: ['고래는 아가미로 호흡한다', '고래는 폐로 호흡한다', '모든 해양 생물은 포유류이다', '포유류는 모두 육지에 산다'], correctIndex: 1, explanation: '포유류→폐호흡, 고래→포유류\n따라서 고래→폐호흡. 논리적 추론!' },
      { type: 'feedback', summary: '추론 = 지문의 논리를 따라 도출', message: '추론 능력이 오르면 고난도도 정복 가능!' },
      { type: 'mission', mission: '비문학 추론 유형 2개를 지문 근거로 풀어보기', encouragement: '논리의 사슬을 따라가는 연습이 추론력을 키워!' },
    ],
  },

  'korean-gold-3': {
    id: 'korean-gold-3', chapterKey: 'korean', tierKey: 'gold', stageNumber: 3,
    title: '비판적 독해',
    cards: [
      { type: 'concept', title: '글의 논리를 평가하라', description: '비판적 독해 체크리스트:\n\n근거가 충분한가? / 논리적 비약은?\n반대 입장은? / 숨겨진 전제는?' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '근거 검증', description: '주장 뒷받침 근거 평가' },
        { icon: '⚠️', label: '논리 오류', description: '비약이나 오류 찾기' },
        { icon: '🔄', label: '반론 사고', description: '반대 입장 떠올리기' },
        { icon: '🕳️', label: '숨은 전제', description: '드러나지 않은 가정' },
      ]},
      { type: 'example', bad: { label: '태윤', story: '무비판적으로 수용하다가\n"적절하지 않은 것" 문제를 놓쳤다.' }, good: { label: '지우', story: '각 선지를 "정말 그런가?" 대조하며\n3번 선지의 논리적 비약을 찾아냈다.' }},
      { type: 'ox', statement: '비판적 독해란 글을 부정적으로 보는 것이다.', answer: false, feedback: '비판적 독해는 부정이 아니라\n"논리적으로 평가"하는 거야!' },
      { type: 'multipleChoice', question: '"A 마을 사람들은 모두 장수한다. 따라서 A 마을의 물이 건강에 좋다." 이 논증의 문제점은?', options: ['결론이 명확하지 않다', '다른 원인을 고려하지 않았다', 'A 마을이 실존하지 않는다', '장수의 정의가 모호하다'], correctIndex: 1, explanation: '식습관, 운동, 유전 등 다른 요인 가능.\n하나의 원인만으로 결론 짓는 것은 논리 오류!' },
      { type: 'feedback', summary: '비판적 독해 = 근거 검증 + 논리 평가', message: '비판적 사고는 모든 공부의 기본!' },
      { type: 'mission', mission: '뉴스나 칼럼에서 논리적 비약을 하나 찾아보기', encouragement: '비판적 눈을 기르면 어떤 글도 꿰뚫어!' },
    ],
  },

  'korean-gold-4': {
    id: 'korean-gold-4', chapterKey: 'korean', tierKey: 'gold', stageNumber: 4,
    title: '현대소설 심화 분석',
    cards: [
      { type: 'concept', title: '서술 기법과 심리 분석', description: '서술 시점: 1인칭/3인칭, 전지적/제한적\n내면 묘사: 의식의 흐름, 내적 독백\n\n행동·대화·배경에서 인물 심리를 읽어내자!' },
      { type: 'summary', keywords: [
        { icon: '👁️', label: '서술 시점', description: '1인칭/3인칭 구분' },
        { icon: '💭', label: '내면 묘사', description: '의식의 흐름, 내적 독백' },
        { icon: '📏', label: '서술 거리', description: '서술자와 인물의 거리감' },
        { icon: '🎭', label: '심리 분석', description: '행동·대화에서 심리 읽기' },
      ]},
      { type: 'example', bad: { label: '현서', story: '줄거리만 파악하고 넘어갔다.\n서술 시점 문제를 구분 못 했다.' }, good: { label: '민아', story: '"나"가 나오면 1인칭, 이름이면 3인칭.\n속마음 서술 여부로 전지적/제한적 구분.' }},
      { type: 'ox', statement: '3인칭 전지적 시점에서는 서술자가 모든 인물의 내면을 서술할 수 있다.', answer: true, feedback: '맞아! 전지적 시점의 서술자는\n모든 인물의 생각과 감정을 자유롭게 서술해.' },
      { type: 'multipleChoice', question: '"그는 창밖을 바라보며 한숨을 쉬었다. 아무도 그의 슬픔을 알지 못했다." 서술 시점은?', options: ['1인칭 주인공 시점', '1인칭 관찰자 시점', '3인칭 전지적 시점', '3인칭 관찰자 시점'], correctIndex: 2, explanation: '"그"(3인칭) + "슬픔"(내면 서술)\n= 3인칭 전지적 시점!' },
      { type: 'feedback', summary: '소설 심화 = 서술 시점 + 심리 분석', message: '서술 기법 분석이 문학 고수의 시작!' },
      { type: 'mission', mission: '현대소설 기출에서 서술 시점과 심리 변화를 정리하기', encouragement: '서술 기법을 읽으면 소설 문제 절반 해결!' },
    ],
  },

  'korean-gold-5': {
    id: 'korean-gold-5', chapterKey: 'korean', tierKey: 'gold', stageNumber: 5,
    title: '문법 종합 실전',
    cards: [
      { type: 'concept', title: '문법 통합 풀이법', description: '골드 문법은 통합 문제를 풀어야 해.\n\n음운+발음 / 형태소+품사 / 문장+문법\n기본 개념 + 단계별 풀이 순서 체화!' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운+발음', description: '음운 변동과 표준 발음' },
        { icon: '🧩', label: '형태소+품사', description: '분석과 분류 통합' },
        { icon: '📐', label: '문장+문법', description: '문장 성분과 요소 결합' },
        { icon: '🔨', label: '단어 형성', description: '파생어와 합성어 구별' },
      ]},
      { type: 'example', bad: { label: '시현', story: '문법 개념은 아는데 통합 문제에서\n뭘 먼저 해야 할지 몰라 시간만 보냈다.' }, good: { label: '유찬', story: '형태소 나누기→품사 확인→선지 대입\n단계별 풀이로 정답을 맞혔다.' }},
      { type: 'ox', statement: '"높이다"는 파생어이다.', answer: true, feedback: '"높(어근)+이(접미사)+다"\n어근에 접미사가 붙은 파생어!' },
      { type: 'multipleChoice', question: '"밤나무"의 단어 형성 방식은?', options: ['파생어', '합성어', '단일어', '준말'], correctIndex: 1, explanation: '"밤(어근)+나무(어근)"\n두 어근 결합이므로 합성어!' },
      { type: 'feedback', summary: '문법 종합 = 기본 개념 + 단계별 풀이', message: '유형별 풀이 순서를 만들어보자!' },
      { type: 'mission', mission: '문법 기출 5개의 유형을 분류해보기', encouragement: '유형 분류하면 문법 전체가 정리돼!' },
    ],
  },

  'korean-gold-6': {
    id: 'korean-gold-6', chapterKey: 'korean', tierKey: 'gold', stageNumber: 6,
    title: 'EBS 연계 학습법',
    cards: [
      { type: 'concept', title: 'EBS 연계의 원리', description: '수능은 EBS와 "같은 주제·소재"가 변형 출제돼.\n\n지문을 외우는 게 아니라\n주제와 논리를 이해하는 게 핵심!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: 'EBS 연계', description: '같은 주제의 변형 출제' },
        { icon: '🎯', label: '주제 파악', description: '외우기가 아닌 주제 이해' },
        { icon: '🔄', label: '변형 예측', description: '출제 변형 방향 예측' },
        { icon: '📖', label: '수능특강/완성', description: 'EBS 핵심 교재 집중' },
      ]},
      { type: 'example', bad: { label: '재민', story: 'EBS를 전부 외우려 했다.\n변형되어 나오니 오히려 혼란이 왔다.' }, good: { label: '하림', story: '지문마다 핵심 주제를 한 줄로 정리.\n같은 주제가 나왔을 때 빠르게 이해했다.' }},
      { type: 'ox', statement: 'EBS 연계란 EBS 교재와 동일한 지문이 수능에 나오는 것이다.', answer: false, feedback: '같은 지문이 아니라 같은 주제·소재의 변형이야.\n주제를 이해하는 게 진짜 연계 공부!' },
      { type: 'multipleChoice', question: 'EBS 연계 학습에서 가장 효과적인 방법은?', options: ['교재 전체를 여러 번 읽기', '지문 내용을 통째로 암기하기', '각 지문의 핵심 주제와 논리 구조 정리하기', 'EBS 문제의 답만 외우기'], correctIndex: 2, explanation: '핵심 주제와 논리를 이해하면\n변형되어 나와도 대응할 수 있어!' },
      { type: 'feedback', summary: 'EBS 연계 = 주제 이해 + 변형 대비', message: 'EBS는 외우는 게 아니라 이해하는 거야!' },
      { type: 'mission', mission: 'EBS 비문학 지문 3개의 핵심 주제를 한 줄로 정리하기', encouragement: '한 줄 정리가 수능 날 큰 힘이 돼!' },
    ],
  },

  'korean-gold-7': {
    id: 'korean-gold-7', chapterKey: 'korean', tierKey: 'gold', stageNumber: 7,
    title: '비문학 주제별 독해: 철학·예술',
    cards: [
      { type: 'concept', title: '철학·예술 지문 공략', description: '철학: 핵심 개념 정의 + 대비 입장(A vs B)\n예술: 사조 특징 + 평가 관점(형식 vs 내용)\n\n추상적이어도 구조로 접근하면 구체적으로 변해!' },
      { type: 'summary', keywords: [
        { icon: '🏛️', label: '철학 지문', description: '개념 정의+입장 대비' },
        { icon: '🎨', label: '예술 지문', description: '사조 특징+평가 관점' },
        { icon: '⚔️', label: '입장 대비', description: 'A vs B 논쟁 구조' },
        { icon: '📐', label: '분석 기준', description: '형식/내용 평가 기준' },
      ]},
      { type: 'example', bad: { label: '윤재', story: '"존재론"이 나오자 겁먹고 포기했다.' }, good: { label: '채원', story: '정의를 잡고 두 입장을 표로 정리하니\n명확해졌다.' }},
      { type: 'ox', statement: '철학 지문은 전문 지식이 있어야만 풀 수 있다.', answer: false, feedback: '지문에서 개념을 정의해주니까\n그 정의를 정확히 파악하면 돼!' },
      { type: 'multipleChoice', question: '철학 지문에서 두 입장이 대비될 때 가장 효과적인 독해법은?', options: ['한쪽만 집중해서 읽기', '두 입장을 표로 비교하며 정리', '어려운 용어를 사전에서 찾기', '글의 결론만 읽기'], correctIndex: 1, explanation: '표로 정리하면 공통점과 차이점이\n한눈에 보여서 가장 효과적이야!' },
      { type: 'feedback', summary: '철학·예술 = 개념 정의 + 입장 대비', message: '추상적 지문도 구조로 접근하면 구체적으로 변해!' },
      { type: 'mission', mission: '철학/예술 기출 1개에서 핵심 개념+대비 입장 표 정리하기', encouragement: '표 하나가 복잡한 지문을 정리해줘!' },
    ],
  },

  'korean-gold-8': {
    id: 'korean-gold-8', chapterKey: 'korean', tierKey: 'gold', stageNumber: 8,
    title: '문학사 흐름 정리',
    cards: [
      { type: 'concept', title: '한국 문학사의 큰 흐름', description: '1920~30: 식민지, 저항/서정\n1950: 전쟁, 혼란과 상실\n1960~70: 산업화, 민중의 삶\n1980: 민주화, 사회 비판\n1990~: 개인·일상, 실험' },
      { type: 'summary', keywords: [
        { icon: '📜', label: '1920~30년대', description: '식민지, 저항과 서정' },
        { icon: '💔', label: '1950년대', description: '전쟁의 상처와 혼란' },
        { icon: '🏭', label: '1960~70년대', description: '산업화와 소외된 민중' },
        { icon: '✊', label: '1980년대', description: '민주화와 사회 비판' },
      ]},
      { type: 'example', bad: { label: '성현', story: '모든 작품을 개별적으로 외웠다.\n시대 맥락 없이 주제 이해가 안 됐다.' }, good: { label: '하영', story: '"1970년대 작품이니 산업화 시대 소외가 주제"\n시대 맥락으로 작품을 예측하니 이해가 빨라졌다.' }},
      { type: 'ox', statement: '1980년대 한국 문학의 주된 흐름은 개인적 서정이다.', answer: false, feedback: '1980년대는 민주화 운동의 시대야.\n사회 비판이 주된 주제였지!' },
      { type: 'multipleChoice', question: '1960~70년대 한국 소설의 주요 주제는?', options: ['전쟁의 상처 극복', '산업화로 인한 농촌 해체와 소외', '식민지 저항 의식', '포스트모더니즘 실험'], correctIndex: 1, explanation: '급격한 산업화로 농촌 해체,\n도시 노동자 소외가 주요 주제야!' },
      { type: 'feedback', summary: '문학사 = 시대 배경 → 주제 예측', message: '문학사 흐름을 알면 처음 보는 작품도 읽혀!' },
      { type: 'mission', mission: '문학사 연표를 만들어 시대별 대표 작품 정리하기', encouragement: '연표 하나가 문학 전체를 조망하게 해!' },
    ],
  },

  'korean-gold-9': {
    id: 'korean-gold-9', chapterKey: 'korean', tierKey: 'gold', stageNumber: 9,
    title: '복합 지문 독해',
    cards: [
      { type: 'concept', title: '(가)+(나) 복합 지문 전략', description: '(가) 핵심 정리 → (나)와의 관계 파악\n\n보충/대비/적용 관계 구분이 핵심!\n두 지문의 "관계"가 답의 열쇠야.' },
      { type: 'summary', keywords: [
        { icon: '📄', label: '(가) 독해', description: '첫 번째 지문 핵심' },
        { icon: '📄', label: '(나) 독해', description: '두 번째 지문과 관계' },
        { icon: '🔗', label: '관계 파악', description: '보충/대비/적용 구분' },
        { icon: '⭐', label: '교차 읽기', description: '두 지문 오가며 비교' },
      ]},
      { type: 'example', bad: { label: '도윤', story: '(가)와 (나)를 따로 읽어서\n비교 문제를 전혀 풀지 못했다.' }, good: { label: '나현', story: '"(가)=이론, (나)=사례 적용"\n관계를 파악하니 비교 문제가 쉽게 풀렸다.' }},
      { type: 'ox', statement: '복합 지문에서 (가)와 (나)는 항상 반대 입장이다.', answer: false, feedback: '보충, 대비, 적용, 발전 등 다양해.\n어떤 관계인지 파악하는 게 먼저야!' },
      { type: 'multipleChoice', question: '(가)가 이론이고 (나)가 사례일 때, 이 관계는?', options: ['대비 관계', '적용 관계', '반론 관계', '나열 관계'], correctIndex: 1, explanation: '이론을 사례에 적용하는 관계야.\n핵심을 사례에 대입하며 확인하는 게 전략!' },
      { type: 'feedback', summary: '복합 지문 = (가)+(나) 관계 파악이 핵심', message: '관계를 보는 눈이 생기면 단일 지문처럼 읽혀!' },
      { type: 'mission', mission: '복합 지문 기출의 (가)와 (나) 관계를 한 줄로 정리하기', encouragement: '관계 한 줄이 풀이의 나침반이 돼!' },
    ],
  },

  'korean-gold-10': {
    id: 'korean-gold-10', chapterKey: 'korean', tierKey: 'gold', stageNumber: 10,
    title: '고난도 문제 접근법',
    cards: [
      { type: 'concept', title: '킬러 문항 대비 기초', description: '킬러 문항 접근 순서:\n\n문제 유형 파악 → 관련 부분 특정 →\n선지 하나씩 대조 → 소거법으로 좁히기' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '유형 파악', description: '무엇을 묻는지 파악' },
        { icon: '✂️', label: '정보 추리기', description: '핵심 정보만 걸러내기' },
        { icon: '🔗', label: '논리 추적', description: '추론의 사슬 따라가기' },
        { icon: '🧹', label: '선지 소거', description: '하나씩 제거하며 좁히기' },
      ]},
      { type: 'example', bad: { label: '영재', story: '킬러 문항을 보고 바로 찍었다.\n배점 높은 문제를 날렸다.' }, good: { label: '서현', story: '5분 제한으로 도전. 소거법으로 3개 제거,\n남은 2개 중 근거로 정답을 골랐다.' }},
      { type: 'ox', statement: '킬러 문항은 포기하고 다른 문제에 시간을 쓰는 것이 무조건 현명하다.', answer: false, feedback: '소거법만으로도 정답 확률을 50%까지 올릴 수 있어.\n전략적 접근이 무조건 포기보다 나아!' },
      { type: 'multipleChoice', question: '킬러 문항 접근의 첫 번째 단계는?', options: ['선지부터 읽기', '지문 전체를 다시 읽기', '문제 유형을 파악하고 묻는 것을 명확히 하기', '직감으로 답을 고르기'], correctIndex: 2, explanation: '"이 문제는 무엇을 묻는가?"를 먼저 파악해야\n필요한 정보를 효율적으로 찾을 수 있어!' },
      { type: 'feedback', summary: '고난도 = 유형 파악 + 정보 추출 + 소거법', message: '골드 과정 완료! 전략적 도전이 가능해졌어!' },
      { type: 'mission', mission: '틀렸던 고난도 문제를 전략으로 다시 풀어보기', encouragement: '킬러 정복하는 순간 등급이 바뀌어!' },
    ],
  },

  // ═══ 플래티넘 (고급 전략) 1~10 ═══

  'korean-platinum-1': {
    id: 'korean-platinum-1', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 1,
    title: '킬러 문항 집중 공략',
    cards: [
      { type: 'concept', title: '킬러 문항의 구조 해부', description: '킬러 3대 유형:\n추론 적용형 / 보기 복합형 / 문법 복합형\n\n선지를 "분절"하여 하나씩 검증하는 게 핵심!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '추론 적용형', description: '새 상황에 정보 적용' },
        { icon: '📋', label: '보기 복합형', description: '이론+작품+선지 대조' },
        { icon: '🧩', label: '문법 복합형', description: '2개 이상 개념 통합' },
        { icon: '✂️', label: '선지 분절', description: '쪼개서 하나씩 검증' },
      ]},
      { type: 'example', bad: { label: '진우', story: '선지를 통째로 읽고 판단했다.\n전반부는 맞지만 후반부가 틀린 함정에 걸렸다.' }, good: { label: '지안', story: '선지를 /로 분절해서 각 부분을 따로 검증.\n함정이 보였다.' }},
      { type: 'ox', statement: '킬러 문항의 선지가 길면 전체가 맞거나 전체가 틀린다.', answer: false, feedback: '긴 선지는 "전반부 맞고 후반부 틀린" 경우가 많아.\n분절해서 각 부분을 따로 검증해야 해!' },
      { type: 'multipleChoice', question: '킬러 문항 선지 분석에서 가장 주의할 것은?', options: ['선지의 길이', '절대적/상대적 표현 구분', '선지의 번호 순서', '한자어 수'], correctIndex: 1, explanation: '"모두/항상"(절대적)과 "주로/~할 수 있다"(상대적)\n구분하면 오답을 걸러낼 수 있어!' },
      { type: 'feedback', summary: '킬러 = 조건 정리 + 선지 분절 + 표현 구분', message: '킬러도 분석하면 패턴이 보여!' },
      { type: 'mission', mission: '킬러 문항 1개를 선지 분절법으로 다시 분석하기', encouragement: '킬러를 분해하는 순간 네가 킬러가 돼!' },
    ],
  },

  'korean-platinum-2': {
    id: 'korean-platinum-2', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 2,
    title: '비문학 기술·과학 고난도',
    cards: [
      { type: 'concept', title: '기술·과학 심층 독해', description: '과정/원리 → 순서도 그리기\n비교 → 대조 표 만들기\n수치 → 변화량과 방향 메모\n\n복잡한 정보를 시각화하면 명확해져!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '순서도', description: '과정을 화살표로 정리' },
        { icon: '📊', label: '대조 표', description: '두 기술을 비교 정리' },
        { icon: '📈', label: '수치 메모', description: '변화 방향 간략 표시' },
        { icon: '🖼️', label: '시각화', description: '복잡한 정보를 그림으로' },
      ]},
      { type: 'example', bad: { label: '현준', story: 'DNA 복제 과정을 글로만 읽었다.\n단계가 뒤섞여 순서 문제를 틀렸다.' }, good: { label: '유빈', story: '여백에 순서도를 그렸다.\n화살표로 연결하니 순서 문제가 바로 풀렸다.' }},
      { type: 'ox', statement: '기술·과학 지문에서 메모는 시간 낭비이다.', answer: false, feedback: '메모가 오히려 시간을 절약해줘!\n문제 풀 때 지문을 다시 안 읽어도 돼.' },
      { type: 'multipleChoice', question: '두 기술을 비교하는 지문의 가장 효과적인 정리법은?', options: ['따로따로 요약하기', '대조 표로 항목별 비교하기', '한 기술만 집중하기', '비교 없이 전체 요약만'], correctIndex: 1, explanation: '대조 표를 만들면 공통점과 차이점이\n한눈에 보여서 비교 문제 정답률이 올라가!' },
      { type: 'feedback', summary: '고난도 과학 = 순서도 + 대조표 + 메모', message: '시각화 습관이 고난도의 해결사!' },
      { type: 'mission', mission: '과학/기술 기출에서 순서도나 대조표를 직접 그려보기', encouragement: '그림 하나가 복잡한 지문을 정복해!' },
    ],
  },

  'korean-platinum-3': {
    id: 'korean-platinum-3', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 3,
    title: '현대시+고전시가 비교 독해',
    cards: [
      { type: 'concept', title: '작품 간 비교의 기술', description: '비교 독해 3단계:\n각 작품 화자·정서·태도 파악 →\n공통점 찾기 → 차이점 찾기\n\n소재(공통) / 정서(비슷) / 표현법(차이)' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '비교 독해', description: '공통점과 차이점 분석' },
        { icon: '📜', label: '고전시가', description: '시조·가사의 화자 정서' },
        { icon: '📝', label: '현대시', description: '현대적 표현과 기법' },
        { icon: '⚖️', label: '비교 축', description: '소재/정서/표현법 기준' },
      ]},
      { type: 'example', bad: { label: '지훈', story: '두 작품을 각각 분석했지만\n비교 문제에서 연결하지 못했다.' }, good: { label: '수아', story: '공통: 자연+그리움 / 차이: 어조\n비교표로 정리하니 바로 답이 보였다.' }},
      { type: 'ox', statement: '현대시와 고전시가는 시대가 다르므로 공통점이 있을 수 없다.', answer: false, feedback: '사랑, 이별, 자연 등 보편적 주제는\n시대를 초월해서 공유될 수 있어!' },
      { type: 'multipleChoice', question: '현대시와 고전시가 비교에서 가장 유효한 기준은?', options: ['작품의 길이', '작가의 나이', '화자의 정서와 표현 방법', '출판 연도'], correctIndex: 2, explanation: '정서(공통)와 표현 방법(차이)이\n가장 유효한 비교 기준이야!' },
      { type: 'feedback', summary: '비교 독해 = 개별 분석 + 공통점 + 차이점', message: '비교의 눈이 생기면 복합 문학 정복!' },
      { type: 'mission', mission: '현대시+고전시가 세트의 공통점·차이점 비교표 만들기', encouragement: '비교표가 복합 문학의 비밀 무기!' },
    ],
  },

  'korean-platinum-4': {
    id: 'korean-platinum-4', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 4,
    title: '서술 시점과 서사 구조 심화',
    cards: [
      { type: 'concept', title: '서사 구조의 패턴', description: '5단 구성 / 액자 구조 / 역순행 / 병렬\n\n서술 시점 심화:\n시점 변환, 서술자 개입,\n신뢰할 수 없는 서술자' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '5단 구성', description: '발단→전개→위기→절정→결말' },
        { icon: '🖼️', label: '액자 구조', description: '이야기 속 이야기' },
        { icon: '⏪', label: '역순행', description: '시간 거슬러 올라가는 구성' },
        { icon: '🔀', label: '시점 변환', description: '서술 시점이 중간에 바뀜' },
      ]},
      { type: 'example', bad: { label: '준영', story: '시간 순서가 뒤바뀌자 혼란스러웠다.\n역순행 구성이라는 걸 몰랐다.' }, good: { label: '민지', story: '"현재→과거 회상→다시 현재"\n시간 순서를 화살표로 정리해서 정확히 맞혔다.' }},
      { type: 'ox', statement: '액자 구조란 소설 안에 또 다른 이야기가 포함된 구조이다.', answer: true, feedback: '맞아! 바깥 이야기 안에 안쪽 이야기가 담긴\n액자 속 그림 같은 구조야!' },
      { type: 'multipleChoice', question: '서술자가 "독자 여러분은 이 사실을 기억해두시오"라고 말하면?', options: ['1인칭 주인공 시점', '서술자의 개입', '의식의 흐름 기법', '시점 변환'], correctIndex: 1, explanation: '서술자가 직접 독자에게 말을 거는 것은\n서술자의 개입에 해당해!' },
      { type: 'feedback', summary: '서사 심화 = 구조 패턴 + 시점 변화', message: '서사 구조를 읽으면 난이도가 확 낮아져!' },
      { type: 'mission', mission: '현대소설 기출의 서사 구조와 시점을 분석하기', encouragement: '구조를 읽으면 소설이 설계도처럼 보여!' },
    ],
  },

  'korean-platinum-5': {
    id: 'korean-platinum-5', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 5,
    title: '중세 국어와 문법 심화',
    cards: [
      { type: 'concept', title: '중세 국어의 핵심', description: '아래아(ㆍ) / 이어 적기(연철) / 방점(성조)\n\n핵심 개념이 한정적이라\n정리하면 확실한 득점원이 돼!' },
      { type: 'summary', keywords: [
        { icon: '🔤', label: '아래아(ㆍ)', description: '현대에 사라진 모음' },
        { icon: '✍️', label: '이어 적기', description: '소리나는 대로 표기' },
        { icon: '⚫', label: '방점', description: '성조 표시하는 점' },
        { icon: '📜', label: '중세 문법', description: '조사 변화 등' },
      ]},
      { type: 'example', bad: { label: '우진', story: '"옛날 글자는 모르겠어" 포기했다.\n매번 2~3점을 날렸다.' }, good: { label: '은율', story: '핵심 개념 10개를 정리했더니\n패턴이 한정적이라 금방 익혔다.' }},
      { type: 'ox', statement: '중세 국어에서 "이어 적기"란 현대의 맞춤법과 동일한 표기법이다.', answer: false, feedback: '이어 적기는 소리나는 대로 적는 방식.\n현대의 끊어 적기(분철)와 달라!' },
      { type: 'multipleChoice', question: '중세 국어 방점에서 글자 왼쪽에 점이 하나 있으면?', options: ['평성', '거성', '상성', '입성'], correctIndex: 1, explanation: '점 1개=거성, 점 2개=상성, 점 없음=평성\n이 3가지만 기억하면 돼!' },
      { type: 'feedback', summary: '중세 국어 = 핵심 10개 개념만 정리', message: '범위가 좁아서 정리하면 확실한 득점원!' },
      { type: 'mission', mission: '중세 국어 핵심 개념을 한 페이지에 정리하기', encouragement: '한 페이지로 중세 국어 완전 정복!' },
    ],
  },

  'korean-platinum-6': {
    id: 'korean-platinum-6', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 6,
    title: '매체 언어와 실용문',
    cards: [
      { type: 'concept', title: '매체·실용문 유형 공략', description: '매체: 뉴스(객관성), 광고(설득), SNS(상호작용)\n실용문: 보고서·안내문 구조와 고쳐쓰기\n\n패턴이 반복돼서 연습하면 만점 가능!' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '매체 언어', description: '매체별 특성 파악' },
        { icon: '📊', label: '자료 해석', description: '표·그래프 정보 읽기' },
        { icon: '📄', label: '실용문', description: '보고서·안내문 구조' },
        { icon: '✏️', label: '고쳐쓰기', description: '문법·표현 적절성' },
      ]},
      { type: 'example', bad: { label: '세준', story: '매체 문제를 "상식"으로 풀었다.\n매체별 특성을 정확히 몰라서 틀렸다.' }, good: { label: '다인', story: '매체별 특성을 정리해두고 적용했다.\n패턴을 알으니 빠르고 정확했다.' }},
      { type: 'ox', statement: '광고의 주된 목적은 정보를 객관적으로 전달하는 것이다.', answer: false, feedback: '광고의 목적은 "설득"이야.\n객관적 전달은 뉴스의 목적이지!' },
      { type: 'multipleChoice', question: 'SNS 매체의 가장 두드러진 특성은?', options: ['일방적 정보 전달', '쌍방향 소통과 상호작용', '객관적 사실 보도', '전문가의 심층 분석'], correctIndex: 1, explanation: 'SNS는 쌍방향 소통이 핵심!\n댓글, 공유, 반응으로 상호작용하지.' },
      { type: 'feedback', summary: '매체·실용문 = 매체별 특성 + 패턴 숙지', message: '연습량에 비례해서 점수가 오르는 영역!' },
      { type: 'mission', mission: '매체 기출 3개에서 묻는 매체 특성을 정리하기', encouragement: '매체 특성 외우면 만점이 보여!' },
    ],
  },

  'korean-platinum-7': {
    id: 'korean-platinum-7', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 7,
    title: '문학 감상 관점 비교',
    cards: [
      { type: 'concept', title: '4대 비평 관점', description: '표현론: 작가 감정→작품 반영\n구조론: 작품 자체 구조 분석\n효용론: 독자에게 미치는 영향\n반영론: 사회·역사 반영(외재적)' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: '표현론', description: '작가 감정 → 작품 반영' },
        { icon: '🔍', label: '구조론', description: '작품 구조·형식 분석' },
        { icon: '💡', label: '효용론', description: '독자에게 미치는 감동' },
        { icon: '🌍', label: '반영론', description: '사회·역사 반영' },
      ]},
      { type: 'example', bad: { label: '한별', story: '<보기>에서 "사회적 맥락" 언급인데\n표현 기법으로만 분석해서 틀렸다.' }, good: { label: '승아', story: '"당시 사회 상황을 반영" → 반영론!\n이 관점으로 해석하니 정답이 보였다.' }},
      { type: 'ox', statement: '구조론적 관점에서는 작가의 생애를 고려하여 작품을 해석한다.', answer: false, feedback: '구조론은 작품 자체만 분석해.\n작가 생애 고려는 표현론이야!' },
      { type: 'multipleChoice', question: '"이 시는 일제강점기의 민족 현실을 반영하고 있다"는 어떤 관점?', options: ['표현론', '구조론', '효용론', '반영론'], correctIndex: 3, explanation: '작품이 사회·역사적 현실을 반영한다 보는 것은\n반영론(외재적 관점)이야!' },
      { type: 'feedback', summary: '비평 관점 = 표현론/구조론/효용론/반영론', message: '4대 관점만 알면 보기 문제 절반 해결!' },
      { type: 'mission', mission: '문학 보기 기출 3개에서 적용된 비평 관점 분류하기', encouragement: '관점 구분하면 보기가 친절한 힌트가 돼!' },
    ],
  },

  'korean-platinum-8': {
    id: 'korean-platinum-8', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 8,
    title: '약점 유형 집중 훈련',
    cards: [
      { type: 'concept', title: '약점 데이터 분석', description: '최근 5회 모의고사 오답을 유형별 분류\n→ 오답률 상위 3개 유형 특정\n→ 그 유형만 최소 20문제 집중!\n\n"전체를 다 하려는" 비효율을 버려라.' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '데이터 수집', description: '5회분 오답 유형별 분류' },
        { icon: '🎯', label: '약점 특정', description: '상위 3개 유형 선별' },
        { icon: '🔨', label: '집중 훈련', description: '약점 유형 20문제 풀기' },
        { icon: '📈', label: '개선 추적', description: '훈련 전후 정답률 비교' },
      ]},
      { type: 'example', bad: { label: '혜성', story: '매번 새 모의고사만 풀었다.\n같은 유형에서 계속 틀렸다.' }, good: { label: '소희', story: '오답 분류하니 "비문학 추론형" 약점 발견.\n집중 풀이로 40%→80% 정답률 향상!' }},
      { type: 'ox', statement: '약점 훈련보다 강점을 더 강화하는 것이 성적 향상에 효과적이다.', answer: false, feedback: '강점은 향상 폭이 작아.\n약점 보완이 전체 점수를 크게 올려!' },
      { type: 'multipleChoice', question: '약점 분석의 첫 단계는?', options: ['새 문제를 많이 풀기', '최근 오답을 유형별로 분류하기', '어려운 문제만 골라 풀기', '전 범위를 처음부터 복습하기'], correctIndex: 1, explanation: '오답을 유형별로 분류하면\n어디가 약한지 객관적으로 보여!' },
      { type: 'feedback', summary: '약점 훈련 = 데이터 분류 + 상위 3유형 집중', message: '약점을 아는 것이 곧 실력이야!' },
      { type: 'mission', mission: '최근 모의고사 3회분 오답을 유형별 분류하기', encouragement: '약점을 정면으로 마주하는 것이 성장의 열쇠!' },
    ],
  },

  'korean-platinum-9': {
    id: 'korean-platinum-9', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 9,
    title: '실전 모의고사 심층 분석',
    cards: [
      { type: 'concept', title: '모의고사 분석 프레임', description: '5단계: 채점 기록 → 찍은 문제 분류 →\n소요 시간 추정 → 시간/실력 구분 →\n개선 포인트 3개 도출\n\n"찍어서 맞은 문제"도 오답으로 취급!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '채점 기록', description: '등급·점수 기록' },
        { icon: '🎲', label: '찍은 문제', description: '찍어서 맞은 것도 오답' },
        { icon: '⏱️', label: '시간 분석', description: '문제별 소요 시간' },
        { icon: '🎯', label: '개선점 도출', description: '개선 포인트 3개' },
      ]},
      { type: 'example', bad: { label: '재원', story: '"2등급이네" 하고 끝냈다.\n다음에도 비슷한 점수가 나왔다.' }, good: { label: '수빈', story: '"비문학 4문제 중 2개 시간부족, 2개 실력부족"\n구체적 대책을 세우니 다음 시험에서 올랐다.' }},
      { type: 'ox', statement: '찍어서 맞은 문제는 분석할 필요가 없다.', answer: false, feedback: '찍어서 맞은 것은 운이야.\n다음엔 틀릴 수 있으니 반드시 분석해!' },
      { type: 'multipleChoice', question: '"시간 부족"과 "실력 부족"을 구분하는 이유는?', options: ['구분할 필요가 없다', '대응 전략이 다르기 때문이다', '시간 부족은 중요하지 않아서', '실력 부족만 고치면 되어서'], correctIndex: 1, explanation: '시간 부족→속도 훈련, 실력 부족→개념 학습\n원인이 다르면 해결책도 달라야 해!' },
      { type: 'feedback', summary: '심층 분석 = 채점 + 찍은 문제 + 개선점', message: '분석하는 만큼 성장해!' },
      { type: 'mission', mission: '가장 최근 모의고사를 5단계 분석법으로 분석하기', encouragement: '심층 분석 한 번이 모의고사 3회분의 가치!' },
    ],
  },

  'korean-platinum-10': {
    id: 'korean-platinum-10', chapterKey: 'korean', tierKey: 'platinum', stageNumber: 10,
    title: '1등급 도전 종합 전략',
    cards: [
      { type: 'concept', title: '1등급을 위한 마인드셋', description: '1) 득점원 확보: 화작+문법+문학 실수 0\n2) 비문학 45분 이상 확보\n3) 킬러: 소거법 + 5분 제한\n4) 컨디션 + 멘탈 루틴' },
      { type: 'summary', keywords: [
        { icon: '💯', label: '득점원 확보', description: '화작+문법+문학 실수 제로' },
        { icon: '⏰', label: '시간 전략', description: '비문학에 45분 이상' },
        { icon: '🎯', label: '킬러 대비', description: '소거법+시간 제한' },
        { icon: '🧘', label: '멘탈 관리', description: '컨디션+심호흡 루틴' },
      ]},
      { type: 'example', bad: { label: '동현', story: '실력은 충분했지만 시험 날 긴장.\n쉬운 문제도 실수해서 등급을 놓쳤다.' }, good: { label: '서영', story: '충분한 수면 + 심호흡 3번.\n화작·문법 15분 내 완료, 비문학 45분 확보.' }},
      { type: 'ox', statement: '1등급은 모든 문제를 다 맞아야만 가능하다.', answer: false, feedback: '1등급 컷은 보통 85~90점.\n5~6문제 틀려도 가능해!\n실수를 줄이는 전략이 중요해.' },
      { type: 'multipleChoice', question: '1등급 전략의 핵심은?', options: ['모든 문제를 다 맞히기', '확실한 득점원에서 실수 없애고 비문학 시간 확보', '킬러 문항에 가장 많은 시간 투자', '어려운 문제만 집중 연습'], correctIndex: 1, explanation: '쉬운 문제에서 실수 없이 득점하고\n비문학에 충분한 시간 확보가 현실적 전략!' },
      { type: 'feedback', summary: '1등급 = 득점원 + 시간 전략 + 멘탈', message: '플래티넘 완료! 이제 다이아에서 완성하자!' },
      { type: 'mission', mission: '나만의 수능 국어 전략표 만들기', encouragement: '전략표가 있는 사람과 없는 사람은 다르다!' },
    ],
  },

  // ═══ 다이아 (최상위 완성) 1~10 ═══

  'korean-diamond-1': {
    id: 'korean-diamond-1', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 1,
    title: '최상위 독해 마스터',
    cards: [
      { type: 'concept', title: '메타 독해 전략', description: '읽으면서 동시에 자신의 읽기를 모니터링!\n\n"핵심은?" / "앞 문단과 관계?" /\n"다음에 뭐 나올까?" / "출제 포인트?"' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '메타 인지', description: '자신의 이해를 점검' },
        { icon: '🔗', label: '연결 확인', description: '문단 간 관계 실시간 파악' },
        { icon: '🔮', label: '예측 독해', description: '다음 내용 미리 예상' },
        { icon: '🎯', label: '출제 예측', description: '출제 포인트 예측' },
      ]},
      { type: 'example', bad: { label: '현기', story: '빠르게 읽었지만 "뭘 읽었지?" 하는\n순간이 많아 이해가 따라가지 못했다.' }, good: { label: '도연', story: '한 문단마다 "핵심은?" 자문했다.\n문제 풀 때 지문을 다시 안 봐도 됐다.' }},
      { type: 'ox', statement: '빠르게 읽는 것이 항상 효율적인 독해이다.', answer: false, feedback: '이해 없이 빠르면 다시 읽어야 해.\n이해하면서 읽는 속도가 진짜 속도!' },
      { type: 'multipleChoice', question: '메타 독해에서 "다음 문단 예측"의 효과는?', options: ['읽기 속도가 느려진다', '예측이 맞으면 이해 속도가 빨라진다', '예측이 틀리면 혼란스러워진다', '예측 자체가 시간 낭비이다'], correctIndex: 1, explanation: '맞으면 확인만 하면 돼서 빠르고,\n틀려도 더 깊은 이해를 만들어줘!' },
      { type: 'feedback', summary: '메타 독해 = 읽기 + 점검 + 예측 동시에', message: '읽으면서 생각하는 습관이 최상위!' },
      { type: 'mission', mission: '비문학 지문 읽으며 각 문단 "핵심 한 줄" 적어보기', encouragement: '한 줄 정리가 메타 독해의 시작!' },
    ],
  },

  'korean-diamond-2': {
    id: 'korean-diamond-2', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 2,
    title: '초고난도 비문학 독파',
    cards: [
      { type: 'concept', title: '복합 전문 지문 정복', description: '두 분야 융합 지문(경제+철학 등):\n\n접점 찾기 → 각 분야 따로 정리 → 연결\n핵심 vs 예시 vs 부연의 정보 위계 구분!' },
      { type: 'summary', keywords: [
        { icon: '🔀', label: '융합 지문', description: '두 분야 결합 복합 지문' },
        { icon: '🎯', label: '접점 파악', description: '두 분야가 만나는 지점' },
        { icon: '📊', label: '정보 위계', description: '핵심/예시/부연 구분' },
        { icon: '⭐', label: '선택적 정독', description: '핵심은 정독, 예시는 속독' },
      ]},
      { type: 'example', bad: { label: '영민', story: '두 분야를 따로 이해하려다 연결 안 됐다.\n관계 묻는 문제를 모두 틀렸다.' }, good: { label: '하율', story: '"경제 이론을 철학적으로 비판하는 구조"\n접점을 먼저 잡으니 하나의 논리로 연결됐다.' }},
      { type: 'ox', statement: '비문학 지문의 모든 문장은 동일한 중요도를 가진다.', answer: false, feedback: '핵심 문장과 부연은 중요도가 달라.\n핵심에 집중하고 부연은 필요시만 확인!' },
      { type: 'multipleChoice', question: '융합 지문에서 가장 먼저 파악해야 할 것은?', options: ['각 분야 세부 내용', '두 분야가 만나는 접점', '지문 전체 분량', '전문 용어'], correctIndex: 1, explanation: '접점을 먼저 파악하면\n전체 논지를 빠르게 이해할 수 있어!' },
      { type: 'feedback', summary: '초고난도 = 접점 파악 + 정보 위계 + 선택적 정독', message: '가장 어려운 지문도 구조로 풀려!' },
      { type: 'mission', mission: '가장 긴 비문학 기출을 접점+정보 위계로 다시 읽기', encouragement: '가장 어려운 지문 정복이 자신감을 만들어!' },
    ],
  },

  'korean-diamond-3': {
    id: 'korean-diamond-3', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 3,
    title: '문학 통합 감상',
    cards: [
      { type: 'concept', title: '장르 횡단 통합 감상', description: '현대시+고전시가 / 현대소설+고전소설 /\n시+소설 비교\n\n같은 주제를 다른 장르로 표현한 차이 분석!\n작품을 "연결"하는 능력이 만점의 열쇠.' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '장르 횡단', description: '시·소설·고전 넘나들기' },
        { icon: '📜', label: '시대 비교', description: '같은 주제의 시대별 변화' },
        { icon: '🎭', label: '장르 특성', description: '장르가 표현에 미치는 영향' },
        { icon: '🔗', label: '작품 연결', description: '여러 작품 통합 이해' },
      ]},
      { type: 'example', bad: { label: '승민', story: '현대시와 고전시가를 완전히 다른 것으로 봤다.\n비교 문제 공통점을 찾지 못했다.' }, good: { label: '예빈', story: '"둘 다 이별의 정서. 고전은 달에, 현대시는\n도시 풍경에 감정을 투영" 표현 차이를 정확히 짚었다.' }},
      { type: 'ox', statement: '현대시와 고전시가는 표현 방식이 달라 비교가 불가능하다.', answer: false, feedback: '표현은 다르지만 주제와 정서는 비교 가능!\n보편적 주제는 시대를 초월해.' },
      { type: 'multipleChoice', question: '통합 감상에서 장르 비교의 가장 유효한 기준은?', options: ['작품의 길이', '공통 주제에 대한 표현 방식의 차이', '작가의 출생 연도', '작품의 출판사'], correctIndex: 1, explanation: '같은 주제를 다른 장르에서 어떻게 표현하는지\n비교하는 것이 핵심이야!' },
      { type: 'feedback', summary: '통합 감상 = 장르 횡단 + 표현 차이', message: '작품을 연결하면 문학이 큰 그림으로 보여!' },
      { type: 'mission', mission: '같은 주제의 현대시와 고전시가 표현 차이 분석하기', encouragement: '연결의 눈이 문학 만점의 비밀!' },
    ],
  },

  'korean-diamond-4': {
    id: 'korean-diamond-4', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 4,
    title: '언어와 매체 완성',
    cards: [
      { type: 'concept', title: '언어·매체 만점 전략', description: '언어: 음운 변동 5대 유형 체화 +\n문장 구조 3초 분석 + 중세 국어 완벽\n\n매체: 특성표 암기 + 자료 해석 속도\n이 영역 만점이면 전체 등급에 여유!' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운 완벽', description: '5대 음운 변동 즉시 판별' },
        { icon: '📐', label: '문장 분석', description: '3초 안에 구조 파악' },
        { icon: '📱', label: '매체 특성', description: '매체별 특성표 숙지' },
        { icon: '💯', label: '만점 목표', description: '이 영역 실수 제로' },
      ]},
      { type: 'example', bad: { label: '태성', story: '"대충 알겠지" 하고 넘어갔다.\n애매한 문제 2개를 틀려 등급을 놓쳤다.' }, good: { label: '나영', story: '음운 유형표 30번 반복, 매체 카드 수시 확인.\n시험에서 2분 안에 정확히 풀었다.' }},
      { type: 'ox', statement: '문법·매체 영역은 감으로 풀어도 충분하다.', answer: false, feedback: '정확한 지식이 필요한 영역이야.\n감으로 풀면 애매한 선지에서 반드시 틀려!' },
      { type: 'multipleChoice', question: '문법·매체 만점을 위한 가장 효과적인 방법은?', options: ['많은 문제를 빠르게 풀기', '핵심 개념을 완벽히 체화하고 반복 확인', '어려운 문제만 골라 풀기', '기출만 보고 새 유형은 무시하기'], correctIndex: 1, explanation: '범위가 한정적이라 핵심을 완벽히 체화하면\n어떤 변형도 대응 가능!' },
      { type: 'feedback', summary: '언어·매체 = 핵심 체화 + 반복 + 실수 제로', message: '이 영역 만점이 가장 확실한 득점원!' },
      { type: 'mission', mission: '음운 변동 5대 유형 + 매체 특성표 각 1장 정리하기', encouragement: '반복이 완벽을 만들어!' },
    ],
  },

  'korean-diamond-5': {
    id: 'korean-diamond-5', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 5,
    title: '시간 단축 고급 기술',
    cards: [
      { type: 'concept', title: '초고속 풀이 시스템', description: '선지 스캔 10초 / 키워드 매칭 /\n소거 가속 15초 / 검토 시간 10분 확보\n\n70분 풀이 + 10분 검토가\n80분 풀이보다 안정적!' },
      { type: 'summary', keywords: [
        { icon: '⭐', label: '선지 스캔', description: '10초 안에 유형 파악' },
        { icon: '🔑', label: '키워드 매칭', description: '선지→지문 직접 연결' },
        { icon: '✂️', label: '소거 가속', description: '15초 안에 오답 2개 제거' },
        { icon: '🔍', label: '검토 시간', description: '10분 검토로 실수 구제' },
      ]},
      { type: 'example', bad: { label: '지호', story: '80분 꽉 채워 풀어서 검토 시간이 없었다.\n쉬운 문제 실수를 발견하지 못했다.' }, good: { label: '연서', story: '70분에 전체를 풀고 10분 검토.\n실수 2개를 찾아 수정했다. 등급이 바뀌었다.' }},
      { type: 'ox', statement: '검토 시간 없이 빠르게 푸는 것이 가장 좋은 전략이다.', answer: false, feedback: '검토 시간이 등급을 바꿀 수 있어.\n70분 풀이 + 10분 검토가 안정적!' },
      { type: 'multipleChoice', question: '시간 단축에 가장 효과적인 기술은?', options: ['모든 지문을 빠르게 읽기', '선지 키워드를 지문에서 직접 매칭하기', '어려운 문제를 먼저 풀기', '답이 확실하지 않아도 바로 넘기기'], correctIndex: 1, explanation: '키워드 매칭은 전체를 다시 읽지 않고\n필요한 부분만 찾는 핵심 기법!' },
      { type: 'feedback', summary: '시간 단축 = 스캔 + 키워드 매칭 + 검토 확보', message: '시간을 다루는 기술이 완성되면 시험이 편안!' },
      { type: 'mission', mission: '기출 1회를 70분 안에 풀고 10분 검토 실시하기', encouragement: '검토에서 찾은 실수가 곧 실력이야!' },
    ],
  },

  'korean-diamond-6': {
    id: 'korean-diamond-6', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 6,
    title: '수능 출제 원리 분석',
    cards: [
      { type: 'concept', title: '출제자의 시각으로 보기', description: '오답 제작 패턴:\n범위 변경("일부"→"모두") /\n인과 뒤집기 / 과잉 해석 / 반대 표현\n\n패턴을 알면 함정을 피할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '출제 의도', description: '출제자가 묻고 싶은 것' },
        { icon: '🔄', label: '범위 변경', description: '"일부"→"모두" 함정' },
        { icon: '↔️', label: '인과 뒤집기', description: '원인과 결과 바꾼 오답' },
        { icon: '➕', label: '과잉 해석', description: '지문에 없는 내용 추가' },
      ]},
      { type: 'example', bad: { label: '정현', story: '느낌으로 고르다가 매력적 오답에 걸렸다.' }, good: { label: '수인', story: '"범위를 바꿨네. 지문엔 일부, 선지엔 모두"\n오답 패턴을 알아서 함정을 피했다.' }},
      { type: 'ox', statement: '수능 국어 오답은 완전히 틀린 내용으로 만들어진다.', answer: false, feedback: '오답은 "살짝 바꿔서" 만들어져.\n미세한 차이를 잡아내는 게 핵심!' },
      { type: 'multipleChoice', question: '지문에 "A가 B의 한 원인"인데 선지에 "B의 유일한 원인은 A"라면?', options: ['정답이다', '오답이다 - 범위를 바꿨다', '판단할 수 없다', '정답일 가능성이 높다'], correctIndex: 1, explanation: '"한 원인"을 "유일한 원인"으로 바꾼\n대표적 범위 변경 오답 패턴!' },
      { type: 'feedback', summary: '출제 원리 = 오답 패턴 파악 + 미세한 차이 포착', message: '출제자 시각을 갖추면 문제가 투명해져!' },
      { type: 'mission', mission: '기출 5개 오답 선지의 패턴을 분류해보기', encouragement: '오답 패턴을 꿰뚫으면 함정이 보여!' },
    ],
  },

  'korean-diamond-7': {
    id: 'korean-diamond-7', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 7,
    title: '변별력 문항 정복',
    cards: [
      { type: 'concept', title: '상위 5% 변별 문항', description: '다단계 추론(3단계 이상) /\n정보 통합(여러 곳 결합) /\n적용 능력(원리→새 사례)\n\n중간 추론 과정을 반드시 메모!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '다단계 추론', description: '3단계 이상 논리 추론' },
        { icon: '🧩', label: '정보 통합', description: '여러 문단 정보 결합' },
        { icon: '🔄', label: '적용 능력', description: '원리를 새 사례에 대입' },
        { icon: '📝', label: '중간 메모', description: '추론 과정 반드시 기록' },
      ]},
      { type: 'example', bad: { label: '기현', story: '머릿속으로만 풀다 2단계에서 헷갈렸다.\n처음부터 다시 해야 해서 시간 초과.' }, good: { label: '나윤', story: '추론 과정을 여백에 적었다.\n"A→B(3문단)→C(5문단)"\n헷갈리지 않고 정확하게 답을 도출.' }},
      { type: 'ox', statement: '변별력 문항은 특별한 지식이 있어야만 풀 수 있다.', answer: false, feedback: '지문 안 정보만으로 풀 수 있어.\n차이는 추론 단계가 많다는 것뿐!' },
      { type: 'multipleChoice', question: '다단계 추론 문제의 가장 효과적인 풀이법은?', options: ['직감으로 빠르게 답 고르기', '지문을 처음부터 다시 읽기', '중간 추론 과정을 메모하며 단계별 풀기', '가장 긴 선지를 고르기'], correctIndex: 2, explanation: '중간 과정 메모로 논리가 끊기지 않아.\n3단계 이상에서는 메모가 필수!' },
      { type: 'feedback', summary: '변별 문항 = 다단계 추론 + 중간 메모', message: '변별 문항 정복하면 안정적 1등급 완성!' },
      { type: 'mission', mission: '가장 어려운 기출 1개를 메모하며 다시 풀어보기', encouragement: '가장 어려운 문제 정복이 최고의 자신감!' },
    ],
  },

  'korean-diamond-8': {
    id: 'korean-diamond-8', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 8,
    title: '실전 멘탈 마스터',
    cards: [
      { type: 'concept', title: '시험장 멘탈 컨트롤', description: '어려운 지문: "나만 어려운 게 아니다"\n시간 부족: "아는 것부터 확보"\n실수 발견: "검토에서 수정"\n긴장: 심호흡 3회 + 손 쥐었다 펴기' },
      { type: 'summary', keywords: [
        { icon: '🧘', label: '심호흡', description: '호흡으로 안정 찾기' },
        { icon: '💪', label: '자기 대화', description: '"할 수 있어" 긍정 암시' },
        { icon: '🔄', label: '전환 능력', description: '막힌 문제에서 빠르게 전환' },
        { icon: '🎯', label: '과정 집중', description: '결과 걱정 대신 현재 집중' },
      ]},
      { type: 'example', bad: { label: '준성', story: '첫 비문학이 어렵자 패닉이 왔다.\n나머지 쉬운 문제도 집중 못 해 날렸다.' }, good: { label: '수진', story: '3분 지나자 "★ 표시하고 넘어가자"\n쉬운 문제로 자신감 회복 후 돌아와 풀었다.' }},
      { type: 'ox', statement: '시험 중 긴장하는 것은 실력이 부족하다는 증거이다.', answer: false, feedback: '긴장은 자연스러운 반응이야.\n1등급도 긴장해. 차이는 다루는 기술!' },
      { type: 'multipleChoice', question: '시험 중 어려운 문제를 만났을 때 가장 좋은 대응은?', options: ['끝까지 풀기', '바로 포기', '시간 제한 두고 도전, 안 되면 표시 후 넘기기', '앞 문제 다시 확인'], correctIndex: 2, explanation: '시간 제한(3~5분) 후 표시하고 넘기는 게 최선.\n전체 시간을 지키면서 기회를 남기는 거지!' },
      { type: 'feedback', summary: '멘탈 = 심호흡 + 전환 + 과정 집중', message: '멘탈 관리도 연습으로 완성돼!' },
      { type: 'mission', mission: '다음 모의고사에서 멘탈 루틴 적용하기', encouragement: '멘탈이 강한 사람이 최후의 승자!' },
    ],
  },

  'korean-diamond-9': {
    id: 'korean-diamond-9', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 9,
    title: '파이널 시뮬레이션',
    cards: [
      { type: 'concept', title: '실전과 동일한 최종 점검', description: '수능 시간표 동일 / OMR 카드 사용 /\n핸드폰 끄기 / 연필·시계만\n\n최소 3번은 해봐야 실전 감각이 생겨!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '실전 환경', description: '수능과 동일 조건' },
        { icon: '📋', label: 'OMR 마킹', description: '마킹 시간까지 포함' },
        { icon: '🔍', label: '사후 분석', description: '시뮬레이션 후 심층 분석' },
        { icon: '🔧', label: '전략 수정', description: '분석으로 전략 미세 조정' },
      ]},
      { type: 'example', bad: { label: '민규', story: '편한 환경에서 연습해서\n실전에서 낯선 환경 적응이 안 됐다.' }, good: { label: '다혜', story: '도서관에서 시간표 그대로 시뮬레이션.\n수능 날 "연습 때와 똑같네" 하며 편안히 풀었다.' }},
      { type: 'ox', statement: '파이널 시뮬레이션은 1번만 해도 충분하다.', answer: false, feedback: '최소 3번은 해봐야 실전 감각이 생겨.\n매번 전략을 미세 조정하면서 완성!' },
      { type: 'multipleChoice', question: '파이널 시뮬레이션에서 반드시 포함해야 하는 것은?', options: ['실력 확인만', 'OMR 마킹 시간과 실전 환경 재현', '쉬운 문제만 풀기', '시간 제한 없이 정확도만'], correctIndex: 1, explanation: 'OMR 마킹(2~3분)과 실전 환경 재현으로\n진짜 실전 감각을 만들어야 해!' },
      { type: 'feedback', summary: '파이널 = 실전 환경 + 사후 분석 + 전략 수정', message: '시뮬레이션을 거칠수록 수능이 익숙해져!' },
      { type: 'mission', mission: '이번 주말 국어 파이널 시뮬레이션 1회 실시하기', encouragement: '실전처럼 연습한 만큼 실전에서 여유롭다!' },
    ],
  },

  'korean-diamond-10': {
    id: 'korean-diamond-10', chapterKey: 'korean', tierKey: 'diamond', stageNumber: 10,
    title: '수능 당일 최종 전략',
    cards: [
      { type: 'concept', title: '수능 당일 체크리스트', description: '전날: 새 공부 금지, 정리 노트만, 7~8시간 수면\n당일: 가벼운 식사, 심호흡 3회\n시험: 1분 스캔 → 풀이 순서 확인 → 마지막 5분 OMR' },
      { type: 'summary', keywords: [
        { icon: '🌙', label: '전날 관리', description: '충분한 수면+가볍게 정리' },
        { icon: '☀️', label: '당일 아침', description: '가벼운 식사+컨디션' },
        { icon: '📝', label: '시험 시작', description: '1분 스캔+풀이 순서' },
        { icon: '✅', label: '마지막 확인', description: 'OMR 마킹 최종 점검' },
      ]},
      { type: 'example', bad: { label: '성준', story: '전날 밤새 공부해서\n시험장에서 졸음이 쏟아졌다.' }, good: { label: '지영', story: '전날 10시 취침. 당일 심호흡 3번.\n평소 루틴대로 풀어 최선을 다했다.' }},
      { type: 'ox', statement: '수능 전날에 벼락치기를 하면 점수가 올라간다.', answer: false, feedback: '전날 벼락치기는 수면 부족 유발.\n충분한 수면이 최고의 공부야!' },
      { type: 'multipleChoice', question: '수능 시험 시작 직후 가장 먼저 해야 할 일은?', options: ['1번부터 바로 풀기', '전체 문제를 1분간 훑어보기', '가장 어려운 문제 찾기', '이름과 수험번호만 적기'], correctIndex: 1, explanation: '1분간 전체를 훑어보면\n문제 구성과 난이도를 파악해서\n80분을 효율적으로 쓸 수 있어!' },
      { type: 'feedback', summary: '수능 당일 = 컨디션 + 루틴 + 평소대로', message: '다이아 전 과정 완주! 정말 대단해!\n넌 충분히 준비됐어. 자신감을 갖고 도전하자!' },
      { type: 'mission', mission: '나만의 "수능 당일 체크리스트" 만들어 벽에 붙이기', encouragement: '체크리스트가 수능 당일의 안전벨트야!' },
    ],
  },

}
