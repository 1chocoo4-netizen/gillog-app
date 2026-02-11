// 국어 영역 학습 콘텐츠 (브론즈 1~10, 실버 1~10)
import type { Stage } from './lessonData'

export const KOREAN_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (기초 다지기) 1~10
  // ═══════════════════════════════════════

  'korean-bronze-1': {
    id: 'korean-bronze-1',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 1,
    title: '공부 습관의 시작',
    cards: [
      { type: 'concept', title: '66일 법칙', description: '새로운 습관이 자동화되려면\n평균 66일이 걸린다는 연구 결과가 있어.\n\n강성태 66일 공부법의 핵심은\n"작게 시작해서 크게 만들기"야.\n\n처음엔 하루 10분이라도 매일 하는 게 중요해.' },
      { type: 'summary', keywords: [
        { icon: '📅', label: '66일 반복', description: '습관이 자동화되는 최소 기간' },
        { icon: '🐣', label: '작게 시작', description: '하루 10분부터 시작하기' },
        { icon: '📈', label: '점진적 확대', description: '익숙해지면 양을 조금씩 늘리기' },
        { icon: '✅', label: '매일 체크', description: '빠짐없이 기록하며 유지하기' },
      ]},
      { type: 'example', bad: { label: '태민의 방법', story: '"오늘부터 하루 5시간 국어 공부!"\n3일 만에 지쳐서 포기했다.' }, good: { label: '유진의 방법', story: '하루 15분 지문 하나 읽기로 시작했다.\n66일 후엔 자연스럽게 1시간씩 공부하게 됐다.' }},
      { type: 'ox', statement: '공부 습관은 처음부터 많은 양으로 시작해야 효과가 있다.', answer: false, feedback: '처음부터 많은 양은 오히려 번아웃을 부르지.\n작게 시작해서 점진적으로 늘려가는 게 핵심이야!' },
      { type: 'multipleChoice', question: '강성태 66일 공부법의 핵심 원리는?', options: ['66시간 집중 공부하기', '매일 조금씩 반복하여 습관 만들기', '일주일에 한 번 몰아서 공부하기', '남들보다 빨리 끝내기'], correctIndex: 1, explanation: '습관은 반복으로 만들어져.\n매일 조금씩이라도 꾸준히 하는 게 핵심이야.' },
      { type: 'feedback', summary: '습관 = 작게 시작 + 매일 반복 + 66일', message: '오늘 한 걸음이 66일 후의 너를 만들어.\n시작이 반이야!' },
      { type: 'mission', mission: '오늘부터 국어 공부 시간을 정하고\n달력에 체크 표시 시작하기 (하루 10~15분)', encouragement: '작은 체크 하나가 큰 습관의 씨앗이야!' },
    ],
  },

  'korean-bronze-2': {
    id: 'korean-bronze-2',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 2,
    title: '어휘력의 기초',
    cards: [
      { type: 'concept', title: '한자어 구조 이해', description: '국어 어휘의 약 70%는 한자어야.\n\n한자어는 뜻글자의 조합이라서\n구조를 알면 모르는 단어도 유추할 수 있어.\n\n예: 不(아닐 불) + 可(가할 가) + 能(능할 능)\n= 불가능(할 수 없음)' },
      { type: 'summary', keywords: [
        { icon: '🔤', label: '한자어 구조', description: '뜻글자 조합으로 의미 파악' },
        { icon: '📖', label: '맥락 독해', description: '문맥 속에서 어휘 뜻 유추하기' },
        { icon: '📝', label: '어휘 노트', description: '모르는 단어를 기록하며 누적' },
        { icon: '🔁', label: '반복 노출', description: '다양한 글에서 반복 만나기' },
      ]},
      { type: 'example', bad: { label: '수빈의 방법', story: '모르는 단어가 나오면 넘어갔다.\n점점 지문이 안 읽히기 시작했다.' }, good: { label: '하준의 방법', story: '한자어를 분해해서 뜻을 유추했다.\n"무위(無爲)" → 없을 무 + 할 위 = 하지 않음\n지문을 읽을수록 어휘가 늘었다.' }},
      { type: 'ox', statement: '국어 어휘는 영어 단어처럼 무조건 외워야 한다.', answer: false, feedback: '한자어는 뜻글자 조합이라\n구조를 이해하면 훨씬 효율적으로 익힐 수 있어!' },
      { type: 'multipleChoice', question: '"불가피(不可避)"의 뜻을 한자로 유추하면?', options: ['피할 수 있다', '피할 수 없다', '가능하지 않다', '바꿀 수 없다'], correctIndex: 1, explanation: '不(아닐 불) + 可(가할 가) + 避(피할 피)\n= 피할 수 없다는 뜻이야.' },
      { type: 'feedback', summary: '어휘력 = 한자어 구조 + 맥락 독해 + 반복', message: '어휘는 국어의 기초 체력이야.\n하나씩 쌓다 보면 지문이 술술 읽힐 거야!' },
      { type: 'mission', mission: '오늘 읽은 글에서 모르는 단어 3개를 골라\n한자어 분해를 시도해보기', encouragement: '단어 하나를 분해하면 열 개를 얻는 거야!' },
    ],
  },

  'korean-bronze-3': {
    id: 'korean-bronze-3',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 3,
    title: '글의 구조 파악하기',
    cards: [
      { type: 'concept', title: '글의 3대 구조', description: '모든 글에는 구조가 있어.\n\n1) 주장-근거: "A이다. 왜냐하면 B이기 때문이다."\n2) 원인-결과: "A 때문에 B가 일어났다."\n3) 비교-대조: "A와 B는 이런 점이 같고/다르다."\n\n구조를 알면 글의 핵심이 보여!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '주장-근거', description: '필자의 의견과 그 이유' },
        { icon: '🔄', label: '원인-결과', description: '어떤 일이 왜 일어났는지' },
        { icon: '⚖️', label: '비교-대조', description: '대상 간의 공통점과 차이점' },
        { icon: '🗺️', label: '구조 파악', description: '글의 뼈대를 먼저 잡기' },
      ]},
      { type: 'example', bad: { label: '민지의 방법', story: '지문을 처음부터 끝까지 그냥 읽었다.\n뭘 말하려는 건지 파악이 안 됐다.' }, good: { label: '재현의 방법', story: '첫 문장에서 주장을 찾고,\n각 문단의 역할(근거, 예시, 반론)을 파악했다.\n글의 전체 흐름이 한눈에 보였다.' }},
      { type: 'ox', statement: '글의 구조를 파악하면 읽는 속도가 느려진다.', answer: false, feedback: '오히려 구조를 알면 핵심을 빠르게 찾을 수 있어서\n읽는 속도와 이해도가 동시에 올라가!' },
      { type: 'multipleChoice', question: '"A 현상이 나타났다. 이는 B 때문이다." 이 글의 구조는?', options: ['주장-근거', '원인-결과', '비교-대조', '나열'], correctIndex: 1, explanation: 'B(원인) 때문에 A(결과)가 나타났으니\n원인-결과 구조야.' },
      { type: 'feedback', summary: '구조 파악 = 글의 뼈대를 먼저 읽기', message: '구조를 보는 눈이 생기면\n어떤 지문이든 자신감이 생길 거야!' },
      { type: 'mission', mission: '교과서나 뉴스 기사 하나를 골라\n글의 구조(주장-근거/원인-결과/비교-대조)를 표시해보기', encouragement: '글의 뼈대를 보는 연습, 오늘 시작하자!' },
    ],
  },

  'korean-bronze-4': {
    id: 'korean-bronze-4',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 4,
    title: '사실적 독해 원칙',
    cards: [
      { type: 'concept', title: '텍스트 기반 독해', description: '수능 국어의 핵심 원칙은\n"지문에 쓰여 있는 것만으로 판단하라"야.\n\n내 배경지식이나 개인 의견이 아니라,\n글쓴이가 실제로 쓴 내용만 근거로 삼아야 해.\n\n이것을 "사실적 독해"라고 불러.' },
      { type: 'summary', keywords: [
        { icon: '📄', label: '텍스트 중심', description: '지문에 있는 정보만 활용' },
        { icon: '🚫', label: '주관 배제', description: '내 생각이나 추측 넣지 않기' },
        { icon: '🔍', label: '근거 확인', description: '선지의 근거를 지문에서 찾기' },
        { icon: '✏️', label: '밑줄 습관', description: '핵심 문장에 표시하며 읽기' },
      ]},
      { type: 'example', bad: { label: '서진의 방법', story: '"이건 내가 알기론 이렇지 않나?"\n배경지식으로 판단하다가 틀렸다.\n지문에는 다른 내용이 쓰여 있었다.' }, good: { label: '다영의 방법', story: '선지를 읽고 지문에서 근거를 찾았다.\n"3문단 2번째 문장에 이렇게 나와 있으니\n이 선지가 맞아."\n정확한 근거로 정답을 골랐다.' }},
      { type: 'ox', statement: '내가 알고 있는 배경지식도 정답 근거로 쓸 수 있다.', answer: false, feedback: '수능 국어는 "지문에 쓰인 내용"만이 근거야.\n배경지식이 아무리 맞아도 지문에 없으면 안 돼!' },
      { type: 'multipleChoice', question: '사실적 독해에서 가장 중요한 원칙은?', options: ['빠르게 읽기', '배경지식 활용하기', '지문에 근거하여 판단하기', '핵심 단어 외우기'], correctIndex: 2, explanation: '사실적 독해 = 지문 기반 판단.\n선지의 근거를 반드시 지문에서 찾아야 해.' },
      { type: 'feedback', summary: '사실적 독해 = 지문이 유일한 근거', message: '지문에 밑줄 치면서 읽는 습관이\n정답률을 크게 올려줄 거야!' },
      { type: 'mission', mission: '국어 지문 하나를 읽으며\n핵심 문장에 밑줄 긋고, 선지마다 근거를 지문에서 찾아보기', encouragement: '근거를 찾는 습관이 실력의 시작이야!' },
    ],
  },

  'korean-bronze-5': {
    id: 'korean-bronze-5',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 5,
    title: '문법 기초: 음운과 형태소',
    cards: [
      { type: 'concept', title: '음운과 형태소란?', description: '음운: 말의 뜻을 구별해주는 가장 작은 소리 단위\n예) "불"과 "물" → ㅂ과 ㅁ이 뜻을 구별\n\n형태소: 뜻을 가진 가장 작은 말 단위\n예) "먹었다" → 먹(동작) + 었(과거) + 다(종결)\n\n이 기초를 알면 문법 문제가 쉬워져!' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운', description: '뜻을 구별하는 최소 소리 단위' },
        { icon: '🧩', label: '형태소', description: '뜻을 가진 최소 단위' },
        { icon: '🔄', label: '음운 변동', description: '소리가 바뀌는 현상 (비음화 등)' },
        { icon: '📦', label: '품사', description: '단어를 기능별로 분류한 것' },
      ]},
      { type: 'example', bad: { label: '현우의 방법', story: '문법을 무조건 외우려고 했다.\n"비음화가 뭐였지…" 시험 때마다 헷갈렸다.' }, good: { label: '소미의 방법', story: '"국물 → [궁물]" 직접 발음해보며 이해했다.\nㄱ이 ㅇ으로 바뀌는 비음화!\n원리를 알으니 다른 예도 바로 풀었다.' }},
      { type: 'ox', statement: '"형태소"와 "단어"는 같은 개념이다.', answer: false, feedback: '형태소는 뜻을 가진 최소 단위이고\n단어는 형태소가 결합된 더 큰 단위야.\n"먹었다"는 하나의 단어이지만 형태소는 3개!' },
      { type: 'multipleChoice', question: '"꽃잎"의 발음이 [꼰닙]이 되는 이유는?', options: ['된소리되기', '비음화와 첨가', 'ㄴ 첨가와 비음화', '구개음화'], correctIndex: 2, explanation: '꽃 + 잎 → 꽃닢(ㄴ 첨가) → [꼰닙](비음화)\n단계적으로 음운 변동이 일어나는 거야.' },
      { type: 'feedback', summary: '문법 = 원리 이해 + 직접 발음해보기', message: '문법은 외우는 게 아니라 이해하는 거야.\n소리 내서 확인하면 훨씬 쉬워!' },
      { type: 'mission', mission: '오늘 "국물", "꽃잎", "신라"를\n직접 발음해보고 어떤 음운 변동이 일어나는지 적어보기', encouragement: '직접 소리 내보면 문법이 살아 움직여!' },
    ],
  },

  'korean-bronze-6': {
    id: 'korean-bronze-6',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 6,
    title: '현대시 읽기 입문',
    cards: [
      { type: 'concept', title: '시 읽기의 3단계', description: '시를 읽을 때 찾아야 할 3가지가 있어.\n\n1) 화자의 상황: 화자는 어디서 무엇을 하고 있는가?\n2) 화자의 정서: 화자가 느끼는 감정은 무엇인가?\n3) 화자의 태도: 대상을 어떻게 바라보고 있는가?\n\n이 3가지만 찾으면 시의 80%는 파악한 거야!' },
      { type: 'summary', keywords: [
        { icon: '👤', label: '화자', description: '시 속에서 말하는 사람' },
        { icon: '📍', label: '상황', description: '화자가 처한 배경과 맥락' },
        { icon: '💭', label: '정서', description: '화자가 느끼는 감정' },
        { icon: '👁️', label: '태도', description: '대상을 바라보는 시각' },
      ]},
      { type: 'example', bad: { label: '승현의 방법', story: '"이 시가 뭔 말인지 모르겠어…"\n단어 하나하나에 매달리다 전체를 놓쳤다.' }, good: { label: '나연의 방법', story: '"화자는 고향을 떠나 있고(상황),\n그리움을 느끼며(정서),\n돌아가고 싶어 해(태도)."\n시의 핵심을 정확히 잡았다.' }},
      { type: 'ox', statement: '시의 화자와 시인(작가)은 항상 같은 인물이다.', answer: false, feedback: '화자는 시 속에서 말하는 가상의 인물이야.\n시인이 직접 말하는 것처럼 보여도\n화자와 시인은 구별해야 해!' },
      { type: 'multipleChoice', question: '시를 읽을 때 가장 먼저 파악해야 할 것은?', options: ['표현 기법의 종류', '화자의 상황과 정서', '시의 운율 구조', '시인의 생애'], correctIndex: 1, explanation: '표현 기법보다 먼저\n화자가 어떤 상황에서 무엇을 느끼는지\n파악하는 게 시 독해의 출발점이야.' },
      { type: 'feedback', summary: '시 읽기 = 화자의 상황 + 정서 + 태도', message: '시가 어렵게 느껴졌다면\n이 3가지만 먼저 찾아보자!\n의외로 간단해질 거야.' },
      { type: 'mission', mission: '교과서나 기출 현대시 하나를 골라\n화자의 상황·정서·태도를 각각 한 줄로 정리해보기', encouragement: '시 한 편, 3줄 정리로 시작하자!' },
    ],
  },

  'korean-bronze-7': {
    id: 'korean-bronze-7',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 7,
    title: '소설 읽기 입문',
    cards: [
      { type: 'concept', title: '소설의 3요소', description: '소설을 분석할 때 기본 3요소를 먼저 찾아.\n\n1) 인물: 누가 등장하고, 성격은 어떤가?\n2) 사건: 무슨 일이 일어나고, 갈등은 무엇인가?\n3) 배경: 언제, 어디서 일어나는가?\n\n이 3요소를 잡으면 소설 문제의 기본이 완성돼!' },
      { type: 'summary', keywords: [
        { icon: '👥', label: '인물', description: '등장인물의 성격과 관계' },
        { icon: '⚡', label: '사건', description: '일어나는 일과 갈등 구조' },
        { icon: '🌍', label: '배경', description: '시간적·공간적 무대' },
        { icon: '🎭', label: '갈등', description: '이야기를 이끄는 대립 요소' },
      ]},
      { type: 'example', bad: { label: '지후의 방법', story: '소설을 처음부터 끝까지 쭉 읽었다.\n"재밌는데… 뭘 물어보는 거지?"\n문제를 보고 다시 처음부터 읽어야 했다.' }, good: { label: '예원의 방법', story: '읽으면서 인물 이름에 동그라미,\n사건 전환점에 별표, 배경 묘사에 밑줄을 쳤다.\n문제를 풀 때 필요한 부분을 바로 찾았다.' }},
      { type: 'ox', statement: '소설에서 배경은 단순한 장식이라 중요하지 않다.', answer: false, feedback: '배경은 인물의 심리나 분위기를 반영하기도 하고\n시대적 상황을 알려주기도 해.\n소설에서 배경은 매우 중요한 요소야!' },
      { type: 'multipleChoice', question: '소설에서 "갈등"의 역할은?', options: ['독자를 지루하게 만드는 요소', '이야기를 이끌어가는 핵심 동력', '배경을 설명하는 방법', '인물의 외모를 묘사하는 기법'], correctIndex: 1, explanation: '갈등이 있어야 사건이 전개되고\n인물이 변화하며 이야기가 흥미로워져.\n갈등은 소설의 핵심 동력이야!' },
      { type: 'feedback', summary: '소설 = 인물 + 사건(갈등) + 배경', message: '3요소를 표시하면서 읽는 습관이\n소설 문제 풀이의 기본이야!' },
      { type: 'mission', mission: '소설 지문 하나를 읽으며\n인물(○), 사건(★), 배경(_)을 표시해보기', encouragement: '표시하면서 읽으면 소설이 입체적으로 보여!' },
    ],
  },

  'korean-bronze-8': {
    id: 'korean-bronze-8',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 8,
    title: '복습과 암기의 기술',
    cards: [
      { type: 'concept', title: '3단계 트리플 암기법', description: '한 번 봐서 기억되는 건 없어.\n효과적인 암기에는 3단계가 필요해.\n\n1단계: 눈으로 읽기 (시각 입력)\n2단계: 소리 내서 읽기 (청각 입력)\n3단계: 손으로 쓰기 (운동 입력)\n\n3가지 감각을 쓸수록 기억이 강해져!\n그리고 5분 복습법: 공부 직후 5분 정리가\n1시간 추가 공부보다 효과적이야.' },
      { type: 'summary', keywords: [
        { icon: '👀', label: '시각 입력', description: '눈으로 읽으며 구조 파악' },
        { icon: '🗣️', label: '청각 입력', description: '소리 내서 읽어 뇌에 각인' },
        { icon: '✍️', label: '운동 입력', description: '손으로 쓰면서 완전 정착' },
        { icon: '⏰', label: '5분 복습', description: '공부 직후 5분 핵심 정리' },
      ]},
      { type: 'example', bad: { label: '승우의 방법', story: '밤새 벼락치기로 외웠다.\n시험 다음 날, 아무것도 기억나지 않았다.' }, good: { label: '채은의 방법', story: '공부 후 바로 5분간 핵심을 정리했다.\n다음 날 소리 내서 읽고, 주말에 써봤다.\n시험 때 자연스럽게 떠올랐다.' }},
      { type: 'ox', statement: '한 번에 오래 반복하는 것이 여러 번 짧게 반복하는 것보다 효과적이다.', answer: false, feedback: '분산 학습(여러 번 짧게)이\n집중 학습(한 번에 오래)보다\n장기 기억에 훨씬 효과적이야!' },
      { type: 'multipleChoice', question: '5분 복습법을 적용하는 가장 좋은 타이밍은?', options: ['시험 전날', '공부한 직후', '일주일 후', '한 달 후'], correctIndex: 1, explanation: '공부 직후 5분 정리가 가장 효과적이야.\n기억이 생생할 때 핵심을 정리하면\n장기 기억으로 넘어가는 확률이 높아져!' },
      { type: 'feedback', summary: '암기 = 3감각 입력 + 공부 직후 5분 복습', message: '똑똑한 공부는 양이 아니라 방법이야.\n오늘부터 5분 복습을 시작해보자!' },
      { type: 'mission', mission: '오늘 공부한 내용을 5분 안에\n핵심 3가지로 정리해보기', encouragement: '5분 투자가 1시간의 가치를 만들어!' },
    ],
  },

  'korean-bronze-9': {
    id: 'korean-bronze-9',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 9,
    title: '요약과 정리 능력',
    cards: [
      { type: 'concept', title: '코넬 노트법', description: '코넬 노트법은 세계적으로 검증된 정리법이야.\n\n노트를 3칸으로 나눠:\n왼쪽(키워드): 핵심 단어나 질문\n오른쪽(노트): 수업/독서 내용 정리\n아래(요약): 전체를 2~3줄로 요약\n\n정리 능력 = 이해 능력이야.\n요약할 수 있다면 진짜 이해한 거야!' },
      { type: 'summary', keywords: [
        { icon: '🔑', label: '키워드 칸', description: '핵심 단어와 질문 기록' },
        { icon: '📝', label: '노트 칸', description: '내용을 자기 말로 정리' },
        { icon: '📋', label: '요약 칸', description: '전체를 2~3줄로 압축' },
        { icon: '🧠', label: '능동적 정리', description: '쓰면서 이해하는 과정' },
      ]},
      { type: 'example', bad: { label: '도현의 방법', story: '수업 내용을 처음부터 끝까지 받아 적었다.\n나중에 보니 뭐가 중요한지 모르겠었다.' }, good: { label: '하연의 방법', story: '오른쪽에 핵심만 메모하고\n왼쪽에 키워드를 뽑고\n아래에 3줄 요약을 적었다.\n시험 전 요약만 봐도 전체가 기억났다.' }},
      { type: 'ox', statement: '좋은 노트는 수업 내용을 빠짐없이 받아 적은 것이다.', answer: false, feedback: '좋은 노트는 핵심을 자기 말로 정리한 것이야.\n전부 베끼는 건 손만 바쁘고 뇌는 쉬는 거야!' },
      { type: 'multipleChoice', question: '코넬 노트에서 "요약 칸"의 역할은?', options: ['수업 내용을 전부 적는 공간', '전체 내용을 2~3줄로 압축하는 공간', '선생님의 말씀을 그대로 옮기는 공간', '그림을 그리는 공간'], correctIndex: 1, explanation: '요약 칸은 전체 내용을 2~3줄로 압축하는 거야.\n이 과정에서 진짜 이해가 일어나!' },
      { type: 'feedback', summary: '정리 = 코넬 노트 + 자기 말로 요약', message: '요약할 수 있으면 이해한 거야.\n정리하는 습관이 성적을 바꿔줄 거야!' },
      { type: 'mission', mission: '오늘 수업이나 공부 내용을\n코넬 노트 형식으로 한 페이지 정리해보기', encouragement: '한 페이지 정리가 열 페이지 필기보다 강해!' },
    ],
  },

  'korean-bronze-10': {
    id: 'korean-bronze-10',
    chapterKey: 'korean',
    tierKey: 'bronze',
    stageNumber: 10,
    title: '문제 풀이 기초',
    cards: [
      { type: 'concept', title: '문제 먼저 읽기 전략', description: '국어 문제 풀이의 기본 전략이야.\n\n1) 문제를 먼저 읽어라\n→ 무엇을 찾아야 하는지 알고 지문을 읽으면\n   필요한 정보에 집중할 수 있어.\n\n2) 소거법을 활용하라\n→ 정답을 모르겠으면 틀린 선지부터 제거해.\n\n3) 선지 분석하라\n→ "항상", "절대", "모두" 같은 극단적 표현은\n   오답일 확률이 높아!' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '문제 선독', description: '지문 전에 문제부터 확인' },
        { icon: '✂️', label: '소거법', description: '틀린 선지부터 제거하기' },
        { icon: '⚠️', label: '극단 표현', description: '"항상/절대/모두" 주의하기' },
        { icon: '🔗', label: '근거 매칭', description: '선지와 지문 내용 대조하기' },
      ]},
      { type: 'example', bad: { label: '시우의 방법', story: '지문을 다 읽고 나서 문제를 봤다.\n"뭘 물어보는 거지?" 다시 읽어야 했다.\n시간이 부족해서 뒷문제를 못 풀었다.' }, good: { label: '유나의 방법', story: '문제를 먼저 읽고 "아, 주제를 찾으라는 거구나"\n지문에서 주제 관련 문장에 집중했다.\n빠르고 정확하게 답을 찾았다.' }},
      { type: 'ox', statement: '소거법은 정답을 확실히 모를 때만 쓰는 비효율적인 방법이다.', answer: false, feedback: '소거법은 가장 효율적인 문제 풀이 전략 중 하나야.\n확실한 오답을 지우면 정답 확률이 올라가!' },
      { type: 'multipleChoice', question: '다음 중 오답일 확률이 높은 선지의 특징은?', options: ['"~할 수도 있다"는 표현', '"항상 ~이다"는 극단적 표현', '지문의 내용을 그대로 인용한 표현', '"~경우가 있다"는 표현'], correctIndex: 1, explanation: '"항상", "절대", "모두" 같은 극단적 표현은\n예외가 하나라도 있으면 틀리니까\n오답일 확률이 높아!' },
      { type: 'feedback', summary: '문제 풀이 = 문제 선독 + 소거법 + 근거 매칭', message: '브론즈 기초 과정을 모두 마쳤어!\n이 기본기가 앞으로 모든 학습의 토대가 될 거야!' },
      { type: 'mission', mission: '국어 기출 문제 3개를 풀 때\n문제를 먼저 읽고, 소거법을 사용하며, 극단 표현을 체크해보기', encouragement: '기본기를 갖추면 어떤 문제든 자신 있게 도전할 수 있어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (실전 응용) 1~10
  // ═══════════════════════════════════════

  'korean-silver-1': {
    id: 'korean-silver-1',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 1,
    title: '비문학 구조 독해 심화',
    cards: [
      { type: 'concept', title: '구조 중심 독서법', description: '비문학 지문은 정보량이 많아서\n한 줄 한 줄 읽으면 시간이 부족해.\n\n구조 중심 독서법은:\n1) 각 문단의 핵심 문장(주제문)을 먼저 찾고\n2) 문단 간 관계(나열/대조/인과/구체화)를 파악하고\n3) 전체 글의 논지를 한 문장으로 정리하는 거야.\n\n이렇게 읽으면 속도와 정확도가 동시에 올라!' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '주제문 찾기', description: '각 문단의 핵심 문장 포착' },
        { icon: '🔗', label: '문단 관계', description: '나열/대조/인과/구체화 파악' },
        { icon: '📊', label: '정보 처리', description: '중요도에 따라 정보 걸러내기' },
        { icon: '⚡', label: '속도 향상', description: '구조 파악으로 읽기 속도 증가' },
      ]},
      { type: 'example', bad: { label: '준서의 방법', story: '경제 지문을 한 글자도 빠뜨리지 않고 읽었다.\n5분이 지나도 1문단을 벗어나지 못했다.' }, good: { label: '민서의 방법', story: '각 문단 첫 문장에서 핵심을 잡았다.\n"1문단: 정의, 2문단: 원인, 3문단: 영향, 4문단: 대안"\n전체 구조를 3분 만에 파악했다.' }},
      { type: 'ox', statement: '비문학 지문은 모든 문장을 동일한 집중도로 읽어야 한다.', answer: false, feedback: '핵심 문장과 보조 문장의 비중이 달라.\n주제문에 집중하고 예시는 빠르게 넘기는 게 효율적이야!' },
      { type: 'multipleChoice', question: '비문학 구조 독해에서 문단의 핵심 문장은 보통 어디에 있나?', options: ['항상 마지막 문장', '주로 첫 문장이나 마지막 문장', '항상 중간 문장', '규칙이 전혀 없다'], correctIndex: 1, explanation: '주제문은 보통 문단의 첫 문장이나 마지막 문장에 있어.\n이 위치를 먼저 확인하면 빠르게 핵심을 잡을 수 있지!' },
      { type: 'feedback', summary: '구조 독해 = 주제문 + 문단 관계 + 전체 논지', message: '구조를 보는 눈이 생기면\n어떤 비문학 지문도 두렵지 않을 거야!' },
      { type: 'mission', mission: '비문학 기출 지문 하나를 골라\n각 문단의 핵심 문장에 밑줄 긋고\n문단 간 관계를 화살표로 표시해보기', encouragement: '구조를 그리는 순간 지문이 투명해져!' },
    ],
  },

  'korean-silver-2': {
    id: 'korean-silver-2',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 2,
    title: '어휘력 심화',
    cards: [
      { type: 'concept', title: '한자어 네트워크', description: '실버 단계에서는 어휘를 네트워크로 학습해.\n\n같은 한자가 들어간 단어끼리 묶으면\n하나의 한자로 여러 단어를 한꺼번에 익힐 수 있어.\n\n예) 自(스스로 자)\n자율(自律), 자립(自立), 자발(自發), 자연(自然)\n\n사자성어도 이 방법으로 효율적으로 익혀보자!' },
      { type: 'summary', keywords: [
        { icon: '🕸️', label: '한자 네트워크', description: '같은 한자 포함 단어 묶어 학습' },
        { icon: '📜', label: '사자성어', description: '고사에서 유래한 핵심 표현' },
        { icon: '📚', label: '고전 어휘', description: '고전 문학에 자주 나오는 말' },
        { icon: '🔄', label: '유의어·반의어', description: '비슷한 말과 반대말 쌍으로 학습' },
      ]},
      { type: 'example', bad: { label: '태현의 방법', story: '사자성어를 가나다순으로 외웠다.\n50개를 외워도 시험에서 안 나오니 허탈했다.' }, good: { label: '서윤의 방법', story: '한자 "不(아닐 불)"이 들어간 단어를 묶었다.\n불가능, 불가피, 불합리, 불가결…\n하나의 한자로 10개 이상의 단어를 정복했다.' }},
      { type: 'ox', statement: '사자성어는 무조건 많이 외우는 것이 최선이다.', answer: false, feedback: '양보다 빈출 사자성어 중심으로 학습하고\n한자 의미를 이해하며 외우는 게 효과적이야!' },
      { type: 'multipleChoice', question: '"溫故知新(온고지신)"의 뜻으로 알맞은 것은?', options: ['새로운 것을 먼저 배운다', '옛것을 익혀 새것을 안다', '따뜻한 옛 기억을 떠올린다', '새로운 지식만 추구한다'], correctIndex: 1, explanation: '溫(익힐 온) + 故(옛 고) + 知(알 지) + 新(새 신)\n= 옛것을 익혀 새것을 안다.\n공자의 논어에서 나온 유명한 표현이야!' },
      { type: 'feedback', summary: '어휘 심화 = 한자 네트워크 + 빈출 사자성어', message: '어휘는 연결해서 외우면 기억이 오래가!\n네트워크가 넓어질수록 어휘력이 폭발적으로 증가해.' },
      { type: 'mission', mission: '한자 하나(예: 不, 自, 大)를 골라\n그 한자가 들어간 단어 5개 이상 찾아 정리해보기', encouragement: '한 글자가 열 단어를 여는 열쇠야!' },
    ],
  },

  'korean-silver-3': {
    id: 'korean-silver-3',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 3,
    title: '문법 심화',
    cards: [
      { type: 'concept', title: '문장 구조와 음운 변동 카운팅', description: '실버 문법은 두 가지가 핵심이야.\n\n1) 문장 구조(통사론)\n주어-서술어 관계, 겹문장(안은문장/이어진문장)\n→ 문장 성분을 분석하는 능력\n\n2) 음운 변동 카운팅\n한 단어에서 음운 변동이 몇 번 일어나는지\n단계별로 세는 유형이 자주 출제돼.\n\n예) "독립" → [동닙]\n비음화(ㄱ→ㅇ) + 비음화(ㄹ→ㄴ) = 2회' },
      { type: 'summary', keywords: [
        { icon: '📐', label: '통사론', description: '문장 성분과 구조 분석' },
        { icon: '🔢', label: '음운 카운팅', description: '음운 변동 횟수 세기' },
        { icon: '🧩', label: '겹문장', description: '안은문장과 이어진문장 구별' },
        { icon: '📏', label: '문장 성분', description: '주어/목적어/서술어/부사어 분석' },
      ]},
      { type: 'example', bad: { label: '윤성의 방법', story: '음운 변동을 직관으로 풀었다.\n"대충 비음화 같은데…" 하다가 틀렸다.' }, good: { label: '지민의 방법', story: '"꽃잎" → 꽃 + 잎\n1) ㄴ 첨가: 꽃닢\n2) 비음화: 꼰닢 → [꼰닙]\n단계별로 카운팅하니 정확하게 맞았다.' }},
      { type: 'ox', statement: '"국물"에서 일어나는 음운 변동은 1회이다.', answer: true, feedback: '"국물" → [궁물]\nㄱ이 ㅇ으로 바뀌는 비음화 1회만 일어나!\n정확하게 단계를 세는 게 중요해.' },
      { type: 'multipleChoice', question: '다음 중 안은문장의 예는?', options: ['"비가 오고 바람이 분다"', '"내가 읽은 책은 재미있다"', '"밥을 먹고 학교에 갔다"', '"하늘이 맑지만 춥다"'], correctIndex: 1, explanation: '"내가 읽은 책은 재미있다"에서\n"내가 읽은"이 "책"을 꾸미는 관형절이야.\n다른 문장을 안고 있으니 안은문장이지!' },
      { type: 'feedback', summary: '문법 심화 = 문장 구조 + 음운 변동 카운팅', message: '문법은 단계별로 차근차근!\n원리를 알면 어떤 변형 문제도 풀 수 있어.' },
      { type: 'mission', mission: '"독립", "학력", "없는"의 발음을 적고\n각각 음운 변동을 단계별로 카운팅해보기', encouragement: '카운팅 연습이 문법 고득점의 지름길이야!' },
    ],
  },

  'korean-silver-4': {
    id: 'korean-silver-4',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 4,
    title: '현대시 심화 분석',
    cards: [
      { type: 'concept', title: '비유·상징과 어조', description: '실버 단계에서는 표현 기법을 더 깊이 분석해.\n\n비유: 직유(~처럼), 은유(A는 B), 의인법(사물에 인격)\n상징: 특정 이미지가 깊은 의미를 담는 것\n예) "길" → 인생, "바다" → 자유/무한\n\n어조와 분위기:\n화자의 말투(비판적/그리워하는/담담한)와\n시 전체의 분위기(밝은/어두운/고요한)를 파악해야 해.' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '비유', description: '직유·은유·의인법으로 표현' },
        { icon: '🔮', label: '상징', description: '구체적 이미지 속 깊은 의미' },
        { icon: '🎵', label: '어조', description: '화자의 말투와 태도' },
        { icon: '🌅', label: '분위기', description: '시 전체의 정서적 분위기' },
      ]},
      { type: 'example', bad: { label: '현석의 방법', story: '"나뭇잎이 떨어진다"를 그냥 자연 묘사로 봤다.\n상징적 의미를 못 읽어서 해석이 얕았다.' }, good: { label: '서아의 방법', story: '"나뭇잎이 떨어진다"가 시 전체 맥락에서\n소멸이나 이별을 상징한다는 걸 파악했다.\n화자의 슬픔과 연결해서 깊이 있게 해석했다.' }},
      { type: 'ox', statement: '"내 마음은 호수"는 직유법이다.', answer: false, feedback: '"A는 B이다" 형식은 은유법이야.\n직유법은 "~처럼, ~같이"를 사용하지.\n"내 마음은 호수처럼 고요하다"가 직유법이야.' },
      { type: 'multipleChoice', question: '시에서 "겨울"이 반복적으로 등장하며 화자의 고통을 나타낸다면, 이 표현법은?', options: ['직유법', '의인법', '상징', '반어법'], correctIndex: 2, explanation: '겨울이라는 구체적 계절이\n화자의 고통이나 시련이라는 추상적 의미를 담고 있으니\n상징에 해당해!' },
      { type: 'feedback', summary: '시 심화 = 비유·상징 + 어조·분위기 분석', message: '표현 기법을 읽어내면\n시가 훨씬 풍부하게 느껴질 거야!' },
      { type: 'mission', mission: '현대시 한 편을 읽고\n비유(직유/은유) 1개, 상징 1개, 어조를 찾아 정리해보기', encouragement: '기법을 읽는 눈이 시의 세계를 열어줘!' },
    ],
  },

  'korean-silver-5': {
    id: 'korean-silver-5',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 5,
    title: '고전시가와 고전소설',
    cards: [
      { type: 'concept', title: '고전의 핵심 가치', description: '고전 문학에는 반복되는 핵심 가치가 있어.\n\n충(忠): 나라와 임금에 대한 충성\n효(孝): 부모에 대한 공경\n무위자연(無爲自然): 자연에 순응하는 삶\n\n고전시가(시조, 가사)에서는 이 가치와 함께\n자연 친화, 유교적 덕목이 자주 나와.\n\n고전소설은 권선징악(착한 사람이 복을 받음)\n구조가 기본이야.' },
      { type: 'summary', keywords: [
        { icon: '⚔️', label: '충', description: '나라에 대한 충성과 의리' },
        { icon: '🙏', label: '효', description: '부모 공경과 가족 사랑' },
        { icon: '🍃', label: '무위자연', description: '자연에 순응하며 사는 삶' },
        { icon: '⚖️', label: '권선징악', description: '착한 사람이 복을 받는 구조' },
      ]},
      { type: 'example', bad: { label: '동혁의 방법', story: '고전 지문을 현대어처럼 읽으려 했다.\n어휘를 모르니 한 줄도 이해가 안 됐다.' }, good: { label: '소율의 방법', story: '핵심 고전 어휘(~하노라, ~이여, ~랴)를\n먼저 익히고 읽으니 맥락이 잡혔다.\n충·효·자연이라는 주제를 바로 파악했다.' }},
      { type: 'ox', statement: '고전소설은 대부분 비극으로 끝난다.', answer: false, feedback: '한국 고전소설의 대표적 특징은\n권선징악 + 해피엔딩이야.\n착한 사람은 복을 받고 나쁜 사람은 벌을 받지!' },
      { type: 'multipleChoice', question: '"오우가(五友歌)"에서 다섯 벗이 상징하는 것은?', options: ['다섯 친구의 우정', '자연물에 담긴 유교적 덕목', '다섯 가지 음식', '다섯 계절의 변화'], correctIndex: 1, explanation: '오우가의 다섯 벗(수·석·송·죽·월)은\n물, 바위, 소나무, 대나무, 달로\n각각 유교적 덕목을 상징해!' },
      { type: 'feedback', summary: '고전 = 충·효·무위자연 + 고전 어휘 학습', message: '고전은 어려워 보이지만\n핵심 가치와 어휘만 알면 패턴이 보여!' },
      { type: 'mission', mission: '시조 한 편을 읽고\n어떤 가치(충/효/자연/권선징악)가 담겨 있는지 분석해보기', encouragement: '고전 속 지혜는 시대를 초월해!' },
    ],
  },

  'korean-silver-6': {
    id: 'korean-silver-6',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 6,
    title: '화법과 작문 전략',
    cards: [
      { type: 'concept', title: '패턴 인식 전략', description: '화법과 작문은 패턴만 알면 빠르게 풀 수 있어.\n\n화법 문제 패턴:\n- 말하기 전략 파악 (비유, 예시, 인용)\n- 듣기 자세 평가 (공감, 요약, 질문)\n\n작문 문제 패턴:\n- 글의 목적에 맞는 표현 선택\n- 고쳐쓰기 (문법, 어휘, 문장 연결)\n\n이 유형들은 시간을 최소화할 수 있는 영역이야.\n빠르게 풀고 비문학에 시간을 확보하자!' },
      { type: 'summary', keywords: [
        { icon: '🎤', label: '화법', description: '말하기·듣기 전략 파악' },
        { icon: '✏️', label: '작문', description: '글의 목적과 고쳐쓰기' },
        { icon: '🔍', label: '패턴 인식', description: '반복 출제 유형 파악하기' },
        { icon: '⏱️', label: '시간 절약', description: '익숙한 유형은 빠르게 처리' },
      ]},
      { type: 'example', bad: { label: '용준의 방법', story: '화법·작문 지문을 처음부터 꼼꼼히 읽었다.\n쉬운 영역인데도 15분이나 걸렸다.' }, good: { label: '수현의 방법', story: '화법·작문은 선지 유형을 먼저 확인했다.\n"말하기 전략을 묻고 있구나"\n패턴을 알고 있으니 7분 만에 풀었다.' }},
      { type: 'ox', statement: '화법과 작문은 수능에서 가장 어려운 영역이다.', answer: false, feedback: '화법과 작문은 패턴이 정해져 있어서\n가장 빠르고 정확하게 풀 수 있는 영역이야.\n여기서 시간을 아껴 비문학에 투자하는 게 전략이야!' },
      { type: 'multipleChoice', question: '화법·작문 문제를 빠르게 풀기 위한 가장 좋은 전략은?', options: ['지문을 세 번 반복 읽기', '선지 유형을 먼저 파악하고 패턴 대입', '화법·작문을 마지막에 풀기', '모든 문장을 분석하기'], correctIndex: 1, explanation: '화법·작문은 출제 패턴이 정해져 있어.\n선지 유형을 먼저 확인하면 필요한 정보만\n효율적으로 찾을 수 있어!' },
      { type: 'feedback', summary: '화법·작문 = 패턴 인식 + 시간 최소화', message: '화법·작문은 연습할수록\n빠르고 정확해지는 영역이야!' },
      { type: 'mission', mission: '화법·작문 기출 3문제를 풀며\n각 문제의 출제 패턴(말하기 전략/고쳐쓰기 등)을 분류해보기', encouragement: '패턴을 외우면 시험장에서 시간을 벌 수 있어!' },
    ],
  },

  'korean-silver-7': {
    id: 'korean-silver-7',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 7,
    title: '문학 비평 통합',
    cards: [
      { type: 'concept', title: '보기 활용과 선지 유형', description: '수능 문학에서 <보기>가 주어지는 문제는\n핵심 고득점 유형이야.\n\n<보기> 활용법:\n1) 보기에서 핵심 개념(키워드)을 먼저 추출\n2) 그 개념을 작품에 대입하여 해석\n3) 선지에서 보기의 개념과 작품이 맞는지 확인\n\n선지 유형 분류:\n- 내용 일치/불일치\n- 표현법 확인\n- 보기 적용 해석\n\n유형을 알면 풀이 속도가 빨라져!' },
      { type: 'summary', keywords: [
        { icon: '📋', label: '<보기> 분석', description: '핵심 개념 추출 후 작품 대입' },
        { icon: '🏷️', label: '선지 분류', description: '일치/표현법/보기적용 구분' },
        { icon: '🔄', label: '작품 비교', description: '두 작품 간 공통점·차이점' },
        { icon: '📊', label: '통합 사고', description: '이론 + 작품 + 선지 연결' },
      ]},
      { type: 'example', bad: { label: '주원의 방법', story: '<보기>를 대충 읽고 작품만으로 풀었다.\n보기에서 제시한 관점을 적용하지 못해 틀렸다.' }, good: { label: '하은의 방법', story: '<보기>에서 "이상 vs 현실의 괴리"를 키워드로 잡았다.\n작품에서 이상과 현실에 해당하는 부분을 찾고\n선지를 정확하게 판단했다.' }},
      { type: 'ox', statement: '<보기> 문제에서 보기 내용은 무시하고 작품만으로 풀어도 된다.', answer: false, feedback: '<보기>는 작품 해석의 방향을 제시해주는 거야.\n보기의 관점을 반드시 적용해서 풀어야 해!' },
      { type: 'multipleChoice', question: '<보기> 문제를 풀 때 가장 먼저 해야 할 일은?', options: ['선지부터 읽기', '작품 전체를 다시 읽기', '<보기>에서 핵심 개념(키워드) 추출', '답을 직감으로 고르기'], correctIndex: 2, explanation: '<보기>의 핵심 개념을 먼저 파악해야\n작품에 적용하고 선지를 판단할 수 있어.\n키워드 추출이 첫 번째 단계야!' },
      { type: 'feedback', summary: '문학 비평 = <보기> 키워드 + 작품 대입 + 선지 판단', message: '<보기> 문제는 연습할수록 패턴이 보여.\n꾸준히 기출을 풀어보자!' },
      { type: 'mission', mission: '문학 <보기> 문제 2개를 풀며\n보기 키워드 → 작품 대입 → 선지 판단\n3단계를 의식적으로 적용해보기', encouragement: '3단계를 체화하면 문학 고득점이 눈앞에!' },
    ],
  },

  'korean-silver-8': {
    id: 'korean-silver-8',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 8,
    title: '오답 분석과 약점 극복',
    cards: [
      { type: 'concept', title: '오답 노트 작성법', description: '성적을 올리는 가장 빠른 방법은\n틀린 문제를 분석하는 거야.\n\n오답 노트 작성법:\n1) 틀린 문제를 붙여넣기\n2) 왜 틀렸는지 원인 분류\n   - 지문 오독 / 선지 분석 실수 / 시간 부족 / 개념 부족\n3) 다시 풀어보고 정리\n\n같은 유형에서 반복 실수하면\n그것이 네 약점이야. 약점만 잡으면 점수가 올라!' },
      { type: 'summary', keywords: [
        { icon: '📓', label: '오답 노트', description: '틀린 문제와 원인을 기록' },
        { icon: '🔍', label: '원인 분류', description: '오독/실수/시간/개념 구분' },
        { icon: '🎯', label: '약점 파악', description: '반복 실수 유형 찾기' },
        { icon: '♻️', label: '재풀이', description: '틀린 문제 다시 풀어보기' },
      ]},
      { type: 'example', bad: { label: '인호의 방법', story: '모의고사를 풀고 채점만 했다.\n"아, 3번 틀렸네" 하고 넘어갔다.\n다음에도 같은 유형에서 틀렸다.' }, good: { label: '아린의 방법', story: '오답 노트에 원인을 적었다.\n"비문학 기술 지문에서 선지 오독이 많네"\n그 유형만 집중 연습하니 정답률이 올라갔다.' }},
      { type: 'ox', statement: '오답 분석보다 새 문제를 많이 푸는 것이 성적 향상에 효과적이다.', answer: false, feedback: '새 문제를 많이 풀어도 약점을 모르면\n같은 실수를 반복해.\n오답 분석이 성적 향상의 핵심이야!' },
      { type: 'multipleChoice', question: '오답 원인 분류 중 "선지 분석 실수"에 해당하는 것은?', options: ['지문 내용을 잘못 이해함', '시간이 부족해서 대충 풀음', '선지의 "항상"을 놓치고 맞다고 판단함', '해당 개념을 아예 몰랐음'], correctIndex: 2, explanation: '선지에 있는 "항상"이라는 극단 표현을 놓친 것은\n선지 분석 실수에 해당해.\n선지를 꼼꼼히 읽는 습관이 필요해!' },
      { type: 'feedback', summary: '오답 분석 = 원인 분류 + 약점 집중 공략', message: '틀린 문제는 선물이야.\n약점을 보여주는 가장 좋은 교재이거든!' },
      { type: 'mission', mission: '최근 틀린 국어 문제 3개를 골라\n오답 원인(오독/실수/시간/개념)을 분류해보기', encouragement: '오답 분석 한 번이 문제 10개 푸는 것보다 값져!' },
    ],
  },

  'korean-silver-9': {
    id: 'korean-silver-9',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 9,
    title: '실전 시간 관리',
    cards: [
      { type: 'concept', title: '80분 배분 전략', description: '수능 국어는 80분, 45문제.\n시간 관리가 곧 점수야!\n\n추천 시간 배분:\n화법·작문: 10분 (1~5번)\n문법: 5분 (6~10번)\n문학: 25분 (11~24번)\n비문학: 40분 (25~45번)\n\n풀이 순서도 중요해.\n자신 있는 영역부터 → 어려운 영역 순서로.\n막히면 표시하고 넘어가, 절대 한 문제에 3분 이상 쓰지 마!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '80분 배분', description: '영역별 시간 할당 전략' },
        { icon: '🔢', label: '풀이 순서', description: '자신 있는 영역 → 어려운 영역' },
        { icon: '⏭️', label: '스킵 전략', description: '막히면 표시하고 넘어가기' },
        { icon: '🎯', label: '3분 규칙', description: '한 문제에 3분 이상 쓰지 않기' },
      ]},
      { type: 'example', bad: { label: '강민의 방법', story: '비문학 첫 지문에서 7분을 썼다.\n뒷부분 10문제를 찍어야 했다.\n시간 관리 실패로 실력보다 낮은 점수를 받았다.' }, good: { label: '예진의 방법', story: '화법·작문(10분) → 문법(5분) → 문학(25분) → 비문학(40분)\n시간을 미리 정해놓고 타이머를 봤다.\n막히는 문제는 ★ 표시하고 넘어갔다.\n시간이 남아서 ★ 문제를 다시 풀 수 있었다.' }},
      { type: 'ox', statement: '어려운 문제를 끝까지 풀어야 실력이 늘어난다.', answer: false, feedback: '시험에서는 전략이 중요해.\n어려운 문제에 매달리면 쉬운 문제를 놓쳐.\n시간 안배가 곧 점수 관리야!' },
      { type: 'multipleChoice', question: '수능 국어에서 가장 많은 시간을 배분해야 하는 영역은?', options: ['화법·작문', '문법', '문학', '비문학'], correctIndex: 3, explanation: '비문학은 지문이 길고 정보량이 많아\n가장 많은 시간(약 40분)이 필요해.\n여기서 시간을 확보하는 게 핵심 전략이야!' },
      { type: 'feedback', summary: '시간 관리 = 영역별 배분 + 3분 규칙 + 스킵', message: '시간 관리 능력은 연습으로 만들어져.\n모의고사를 풀 때마다 시간을 체크해보자!' },
      { type: 'mission', mission: '기출 문제를 풀 때 영역별 소요 시간을 기록해보기\n(화법작문 ○분, 문법 ○분, 문학 ○분, 비문학 ○분)', encouragement: '시간을 측정하는 순간부터 관리가 시작돼!' },
    ],
  },

  'korean-silver-10': {
    id: 'korean-silver-10',
    chapterKey: 'korean',
    tierKey: 'silver',
    stageNumber: 10,
    title: '수능 실전 모의 훈련',
    cards: [
      { type: 'concept', title: '실전 연습과 멘탈 관리', description: '실전력은 실전처럼 연습해야 길러져.\n\n실전 모의 훈련 원칙:\n1) 80분 타이머를 켜고 한 번에 풀기\n2) 풀이 중 절대 답지 보지 않기\n3) 시험 환경과 동일하게 (조용한 곳, 정해진 시간)\n4) 채점 후 반드시 오답 분석하기\n\n멘탈 관리:\n- 어려운 지문이 나와도 당황하지 마\n- "나만 어려운 게 아니다" 마인드\n- 모르는 건 넘기고 아는 것부터 확보하기' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '실전 모의', description: '80분 타이머, 한 번에 풀기' },
        { icon: '🧘', label: '멘탈 관리', description: '당황하지 않는 마인드셋' },
        { icon: '📊', label: '오답 분석', description: '채점 후 반드시 분석하기' },
        { icon: '🏆', label: '실전 감각', description: '반복 훈련으로 체화하기' },
      ]},
      { type: 'example', bad: { label: '건우의 방법', story: '기출을 단원별로만 풀었다.\n실전에서 80분 집중이 안 돼서\n후반부에 집중력이 무너졌다.' }, good: { label: '시연의 방법', story: '매주 1회 실전 모의를 했다.\n80분 타이머, 조용한 장소, 풀이 후 오답 분석.\n3개월 후 실전 긴장감이 편안함으로 바뀌었다.' }},
      { type: 'ox', statement: '시험에서 어려운 지문을 만나면 포기하는 것이 현명하다.', answer: false, feedback: '포기가 아니라 "전략적 스킵"이야.\n표시해두고 나중에 다시 돌아오는 거지.\n아는 문제를 먼저 다 풀고 돌아오면 돼!' },
      { type: 'multipleChoice', question: '실전 모의 훈련에서 가장 중요한 원칙은?', options: ['맞힌 문제 수만 확인하기', '시간 제한 없이 정확도만 추구하기', '80분 제한 + 시험 환경 + 오답 분석 세트로 진행', '틀릴 것 같으면 바로 답지 확인하기'], correctIndex: 2, explanation: '실전력은 시간 제한 + 시험 환경 + 오답 분석을\n세트로 반복해야 길러져.\n이 3가지가 실전 훈련의 핵심이야!' },
      { type: 'feedback', summary: '실전 = 80분 모의 + 오답 분석 + 멘탈 관리', message: '실버 과정을 모두 마쳤어! 대단해!\n기초와 실전 전략을 모두 갖추었으니\n이제 꾸준히 연습하면 반드시 성장할 거야!' },
      { type: 'mission', mission: '이번 주에 국어 기출 1회분을\n80분 타이머를 켜고 실전처럼 풀어보기\n풀이 후 오답 분석까지!', encouragement: '실전처럼 연습한 만큼 실전에서 빛날 거야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (심화 응용) 1~10
  // ═══════════════════════════════════════

  'korean-gold-1': {
    id: 'korean-gold-1',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 1,
    title: '비문학 경제·과학 지문 공략',
    cards: [
      { type: 'concept', title: '전문 지문 독해 전략', description: '골드 단계부터는 전문 분야 지문을 공략해.\n\n경제 지문 핵심:\n- 용어 정의 → 원리 → 사례 순서로 읽기\n- 그래프/수치가 나오면 변화 방향에 집중\n\n과학 지문 핵심:\n- 실험 설계(조건/변인)를 구조화하기\n- "가설 → 실험 → 결과 → 해석" 흐름 파악\n\n어려운 지문일수록 구조가 답을 알려줘!' },
      { type: 'summary', keywords: [
        { icon: '💰', label: '경제 지문', description: '용어→원리→사례 순서로 독해' },
        { icon: '🔬', label: '과학 지문', description: '가설→실험→결과→해석 구조' },
        { icon: '📈', label: '수치 해석', description: '변화 방향과 비교에 집중' },
        { icon: '🧪', label: '변인 통제', description: '독립/종속/통제 변인 구분' },
      ]},
      { type: 'example', bad: { label: '정민의 방법', story: '경제 지문에서 용어가 어려워\n첫 문단에서 멈춰버렸다.\n뒷부분의 쉬운 사례를 놓쳤다.' }, good: { label: '소윤의 방법', story: '모르는 용어는 괄호 치고 넘어갔다.\n뒷문단 사례에서 용어 뜻을 유추했다.\n다시 앞으로 돌아오니 전체가 이해됐다.' }},
      { type: 'ox', statement: '경제·과학 지문은 배경지식이 없으면 절대 풀 수 없다.', answer: false, feedback: '수능 지문은 배경지식 없이도 풀 수 있게 설계돼.\n지문 안에 필요한 정보가 모두 들어 있어!\n구조를 따라가면 답을 찾을 수 있어.' },
      { type: 'multipleChoice', question: '과학 지문에서 실험 내용을 읽을 때 가장 먼저 파악해야 할 것은?', options: ['실험 결과의 수치', '실험의 목적과 가설', '과학자의 이름', '실험 장비 종류'], correctIndex: 1, explanation: '실험의 목적과 가설을 먼저 파악해야\n실험 설계와 결과의 의미를 이해할 수 있어.\n"왜 이 실험을 했는가?"가 출발점이야!' },
      { type: 'feedback', summary: '전문 지문 = 구조 파악 + 용어는 맥락에서 유추', message: '어려운 지문일수록 구조에 의지하자.\n구조가 잡히면 내용이 따라와!' },
      { type: 'mission', mission: '경제 또는 과학 기출 지문 1개를 골라\n용어 정의·원리·사례를 색깔별로 표시해보기', encouragement: '색깔로 구조를 잡으면 전문 지문도 두렵지 않아!' },
    ],
  },

  'korean-gold-2': {
    id: 'korean-gold-2',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 2,
    title: '추론적 독해',
    cards: [
      { type: 'concept', title: '행간 읽기의 기술', description: '추론적 독해는 글에 직접 쓰여 있지 않지만\n논리적으로 도출할 수 있는 내용을 파악하는 거야.\n\n추론의 3가지 유형:\n1) 전제 추론: "이 주장이 성립하려면 뭐가 필요하지?"\n2) 결과 추론: "이것이 사실이면 어떤 결과가 나올까?"\n3) 빈칸 추론: 문맥상 어떤 내용이 들어가야 할까?\n\n핵심은 "지문의 논리"를 따라가는 거야.\n상상이 아닌 논리적 추론이어야 해!' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '전제 추론', description: '주장이 성립하기 위한 전제 찾기' },
        { icon: '➡️', label: '결과 추론', description: '논리적으로 따라오는 결과 파악' },
        { icon: '🔲', label: '빈칸 추론', description: '문맥에 맞는 내용 유추하기' },
        { icon: '⚖️', label: '논리적 근거', description: '상상이 아닌 지문 기반 추론' },
      ]},
      { type: 'example', bad: { label: '준혁의 방법', story: '"아마 이럴 것 같은데…"\n자기 생각으로 추론해서 선지를 골랐다.\n지문의 논리와 달라서 틀렸다.' }, good: { label: '은서의 방법', story: '"A이면 B이고, B이면 C이다.\n그러면 A이면 C이다."\n지문의 논리 구조를 따라 추론했다.\n정확한 근거로 답을 골랐다.' }},
      { type: 'ox', statement: '추론 문제는 자신의 배경지식과 상식으로 풀어도 된다.', answer: false, feedback: '추론도 반드시 지문의 논리에 기반해야 해.\n"나의 상식"이 아니라 "지문의 논리"를 따라가는 거야!' },
      { type: 'multipleChoice', question: '"모든 포유류는 폐로 호흡한다. 고래는 포유류이다." 이 전제에서 추론 가능한 것은?', options: ['고래는 아가미로 호흡한다', '고래는 폐로 호흡한다', '모든 해양 생물은 포유류이다', '포유류는 모두 육지에 산다'], correctIndex: 1, explanation: '포유류 → 폐호흡, 고래 → 포유류\n따라서 고래 → 폐호흡.\n이것이 논리적 추론이야!' },
      { type: 'feedback', summary: '추론 = 지문의 논리를 따라 도출하기', message: '추론 능력이 올라가면\n고난도 문제도 논리로 정복할 수 있어!' },
      { type: 'mission', mission: '비문학 문제에서 "추론" 유형 2개를 풀며\n지문에서 근거를 찾아 화살표로 연결해보기', encouragement: '논리의 사슬을 따라가는 연습이 추론력을 키워!' },
    ],
  },

  'korean-gold-3': {
    id: 'korean-gold-3',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 3,
    title: '비판적 독해',
    cards: [
      { type: 'concept', title: '글의 논리를 평가하라', description: '비판적 독해는 글의 주장과 근거를\n객관적으로 평가하는 능력이야.\n\n비판적 독해의 체크리스트:\n1) 근거가 주장을 충분히 뒷받침하는가?\n2) 논리적 비약이나 오류는 없는가?\n3) 반대 입장은 어떤 것이 있을까?\n4) 숨겨진 전제는 무엇인가?\n\n이 능력이 있으면 "적절하지 않은 것" 유형\n문제를 정확하게 풀 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🔍', label: '근거 검증', description: '주장을 뒷받침하는 근거 평가' },
        { icon: '⚠️', label: '논리 오류', description: '비약이나 오류 찾아내기' },
        { icon: '🔄', label: '반론 사고', description: '반대 입장 떠올려보기' },
        { icon: '🕳️', label: '숨은 전제', description: '드러나지 않은 가정 찾기' },
      ]},
      { type: 'example', bad: { label: '태윤의 방법', story: '"글쓴이가 이렇게 말했으니 맞겠지"\n무비판적으로 수용하다가\n"적절하지 않은 것" 문제를 놓쳤다.' }, good: { label: '지우의 방법', story: '각 선지를 읽으며 "정말 그런가?"\n지문의 근거와 대조했다.\n3번 선지의 논리적 비약을 찾아냈다.' }},
      { type: 'ox', statement: '비판적 독해란 글을 부정적으로 보는 것이다.', answer: false, feedback: '비판적 독해는 부정이 아니라\n"논리적으로 평가"하는 거야.\n맞는 부분은 인정하고, 약한 부분을 찾아내는 거지!' },
      { type: 'multipleChoice', question: '"A 마을 사람들은 모두 장수한다. 따라서 A 마을의 물이 건강에 좋다." 이 논증의 문제점은?', options: ['결론이 명확하지 않다', '다른 원인을 고려하지 않았다', 'A 마을이 실존하지 않는다', '장수의 정의가 모호하다'], correctIndex: 1, explanation: '장수 원인이 물 외에 식습관, 운동, 유전 등\n다른 요인일 수도 있어.\n하나의 원인만으로 결론 짓는 것은 논리적 오류야!' },
      { type: 'feedback', summary: '비판적 독해 = 근거 검증 + 논리 평가', message: '비판적 사고는 국어뿐 아니라\n모든 공부의 기본이야!' },
      { type: 'mission', mission: '뉴스 기사나 칼럼 하나를 읽으며\n근거가 약한 부분이나 논리적 비약을 하나 찾아보기', encouragement: '비판적 눈을 기르면 어떤 글도 꿰뚫어볼 수 있어!' },
    ],
  },

  'korean-gold-4': {
    id: 'korean-gold-4',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 4,
    title: '현대소설 심화 분석',
    cards: [
      { type: 'concept', title: '서술 기법과 심리 분석', description: '현대소설 심화에서는 서술 기법을 깊이 분석해.\n\n핵심 서술 기법:\n1) 서술 시점: 1인칭/3인칭, 전지적/제한적\n2) 내면 묘사: 의식의 흐름, 내적 독백\n3) 서술 거리: 서술자와 인물 간의 거리\n\n인물 심리 분석:\n- 행동으로 드러나는 심리\n- 대화 속 감정 변화\n- 배경과 심리의 연결 (비 오는 날 = 우울)' },
      { type: 'summary', keywords: [
        { icon: '👁️', label: '서술 시점', description: '1인칭/3인칭, 전지적/제한적' },
        { icon: '💭', label: '내면 묘사', description: '의식의 흐름과 내적 독백' },
        { icon: '📏', label: '서술 거리', description: '서술자와 인물 사이의 거리감' },
        { icon: '🎭', label: '심리 분석', description: '행동·대화·배경에서 심리 읽기' },
      ]},
      { type: 'example', bad: { label: '현서의 방법', story: '소설을 줄거리만 파악하고 넘어갔다.\n서술 시점을 묻는 문제에서\n1인칭과 3인칭 구분을 못 했다.' }, good: { label: '민아의 방법', story: '"나"가 나오면 1인칭, 인물 이름이면 3인칭.\n서술자가 인물의 속마음을 아는지(전지적)\n모르는지(제한적)를 바로 체크했다.' }},
      { type: 'ox', statement: '3인칭 전지적 시점에서는 서술자가 모든 인물의 내면을 서술할 수 있다.', answer: true, feedback: '맞아! 3인칭 전지적 시점의 서술자는\n신처럼 모든 인물의 생각과 감정을\n자유롭게 서술할 수 있어.' },
      { type: 'multipleChoice', question: '"그는 창밖을 바라보며 한숨을 쉬었다. 아무도 그의 슬픔을 알지 못했다." 이 문장의 서술 시점은?', options: ['1인칭 주인공 시점', '1인칭 관찰자 시점', '3인칭 전지적 시점', '3인칭 관찰자 시점'], correctIndex: 2, explanation: '"그"를 사용하므로 3인칭이고,\n"슬픔을 알지 못했다"처럼 내면을 서술하므로\n전지적 시점이야!' },
      { type: 'feedback', summary: '소설 심화 = 서술 시점 + 심리 분석', message: '서술 기법을 읽어내면\n소설 문제의 절반은 해결된 거야!' },
      { type: 'mission', mission: '현대소설 기출 지문 하나를 읽고\n서술 시점과 인물 심리 변화를 정리해보기', encouragement: '서술 기법 분석이 문학 고수의 시작이야!' },
    ],
  },

  'korean-gold-5': {
    id: 'korean-gold-5',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 5,
    title: '문법 종합 실전',
    cards: [
      { type: 'concept', title: '문법 통합 풀이법', description: '골드 문법은 개별 개념이 아닌\n통합 문제를 풀어야 해.\n\n출제 빈출 통합 유형:\n1) 음운 변동 + 표준 발음법\n2) 형태소 분석 + 품사 분류\n3) 문장 성분 + 문법 요소(피동/사동/높임)\n4) 단어 형성법(파생어/합성어)\n\n핵심 전략: 기본 개념을 정확히 이해하고\n유형별 풀이 순서를 체화하는 거야.' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운+발음', description: '음운 변동과 표준 발음 연계' },
        { icon: '🧩', label: '형태소+품사', description: '형태소 분석과 품사 분류 통합' },
        { icon: '📐', label: '문장+문법', description: '문장 성분과 문법 요소 결합' },
        { icon: '🔨', label: '단어 형성', description: '파생어와 합성어 구별' },
      ]},
      { type: 'example', bad: { label: '시현의 방법', story: '문법 개념은 다 알지만\n통합 문제에서 뭘 먼저 해야 할지 몰라\n시간만 보내다 틀렸다.' }, good: { label: '유찬의 방법', story: '"이 문제는 형태소 분석부터 하자"\n풀이 순서를 정하고 단계별로 접근했다.\n1) 형태소 나누기 → 2) 품사 확인 → 3) 선지 대입\n체계적으로 풀어서 정답을 맞혔다.' }},
      { type: 'ox', statement: '"높이다"는 파생어이다.', answer: true, feedback: '"높(어근) + 이(접미사) + 다"\n어근에 접미사가 붙어 만들어진 파생어야!\n합성어는 어근+어근 결합이고, 이것과 구별해야 해.' },
      { type: 'multipleChoice', question: '"밤나무"의 단어 형성 방식은?', options: ['파생어', '합성어', '단일어', '준말'], correctIndex: 1, explanation: '"밤(어근) + 나무(어근)"\n두 개의 어근이 결합했으므로 합성어야.\n파생어는 어근+접사 결합이지!' },
      { type: 'feedback', summary: '문법 종합 = 기본 개념 + 단계별 풀이 순서', message: '문법은 개념 이해 + 풀이 연습이 핵심이야.\n유형별로 풀이 순서를 만들어보자!' },
      { type: 'mission', mission: '문법 기출 문제 5개를 풀며\n각 문제의 유형(음운/형태소/문장/단어형성)을 분류해보기', encouragement: '유형을 분류하면 문법 전체가 정리돼!' },
    ],
  },

  'korean-gold-6': {
    id: 'korean-gold-6',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 6,
    title: 'EBS 연계 학습법',
    cards: [
      { type: 'concept', title: 'EBS 연계의 원리', description: '수능은 EBS 교재와 연계 출제돼.\n하지만 "같은 지문"이 나오는 게 아니라\n"같은 주제·소재"가 변형되어 나와.\n\nEBS 연계 학습법:\n1) EBS 지문의 핵심 주제와 논리를 파악\n2) 같은 주제를 다른 관점에서 읽어보기\n3) EBS에서 배운 개념이 어떻게 변형될지 예측\n\n지문을 외우는 게 아니라\n주제와 논리를 이해하는 게 핵심이야!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: 'EBS 연계', description: '같은 주제·소재의 변형 출제' },
        { icon: '🎯', label: '주제 파악', description: '지문 외우기가 아닌 주제 이해' },
        { icon: '🔄', label: '변형 예측', description: '출제 변형 방향 예측하기' },
        { icon: '📖', label: '수능특강/완성', description: 'EBS 핵심 교재 집중 학습' },
      ]},
      { type: 'example', bad: { label: '재민의 방법', story: 'EBS 교재를 전부 외우려고 했다.\n수능에서 변형되어 나오니\n외운 내용이 오히려 혼란을 줬다.' }, good: { label: '하림의 방법', story: 'EBS 지문마다 핵심 주제를 한 줄로 정리했다.\n수능에서 같은 주제가 다른 지문으로 나왔을 때\n익숙한 개념이라 빠르게 이해했다.' }},
      { type: 'ox', statement: 'EBS 연계란 EBS 교재와 동일한 지문이 수능에 나오는 것이다.', answer: false, feedback: '연계는 "같은 주제·소재"의 변형 출제야.\n같은 지문이 아니라 같은 핵심 개념이 나오는 거지!\n주제와 논리를 이해하는 게 진짜 연계 공부야.' },
      { type: 'multipleChoice', question: 'EBS 연계 학습에서 가장 효과적인 방법은?', options: ['교재 전체를 여러 번 읽기', '지문 내용을 통째로 암기하기', '각 지문의 핵심 주제와 논리 구조 정리하기', 'EBS 문제의 답만 외우기'], correctIndex: 2, explanation: '핵심 주제와 논리를 이해하면\n수능에서 변형되어 나와도 대응할 수 있어.\n이것이 진정한 연계 학습이야!' },
      { type: 'feedback', summary: 'EBS 연계 = 주제 이해 + 변형 대비', message: 'EBS는 외우는 게 아니라 이해하는 거야.\n주제를 잡으면 연계의 진짜 효과가 나타나!' },
      { type: 'mission', mission: 'EBS 수능특강 비문학 지문 3개의\n핵심 주제를 각각 한 줄로 정리해보기', encouragement: '한 줄 정리가 수능 날 큰 힘이 돼!' },
    ],
  },

  'korean-gold-7': {
    id: 'korean-gold-7',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 7,
    title: '비문학 주제별 독해: 철학·예술',
    cards: [
      { type: 'concept', title: '철학·예술 지문 공략', description: '철학과 예술 지문은 추상적이라 어렵게 느껴지지만\n독해 공식이 있어.\n\n철학 지문:\n- 핵심 개념의 정의를 먼저 잡기\n- 대비되는 입장(A vs B)을 구분하기\n- 각 입장의 근거와 한계 파악\n\n예술 지문:\n- 예술 사조/운동의 특징 파악\n- 작품 분석의 기준(형식 vs 내용) 확인\n- 평가 관점(긍정적/비판적) 구분' },
      { type: 'summary', keywords: [
        { icon: '🏛️', label: '철학 지문', description: '개념 정의 + 대비 입장 구분' },
        { icon: '🎨', label: '예술 지문', description: '사조 특징 + 평가 관점 파악' },
        { icon: '⚔️', label: '입장 대비', description: 'A vs B 논쟁 구조 정리' },
        { icon: '📐', label: '분석 기준', description: '형식과 내용의 평가 기준 구분' },
      ]},
      { type: 'example', bad: { label: '윤재의 방법', story: '철학 지문에서 "존재론"이 나오자\n겁먹고 읽기를 포기했다.' }, good: { label: '채원의 방법', story: '"존재론 = 존재에 대한 탐구"로 정의를 잡고\n플라톤 입장 vs 아리스토텔레스 입장을\n표로 정리하며 읽으니 명확해졌다.' }},
      { type: 'ox', statement: '철학 지문은 전문 지식이 있어야만 풀 수 있다.', answer: false, feedback: '수능 철학 지문은 배경지식 없이도 풀 수 있어.\n지문에서 개념을 정의해주니까\n그 정의를 정확히 파악하면 돼!' },
      { type: 'multipleChoice', question: '철학 지문에서 두 입장이 대비될 때 가장 효과적인 독해법은?', options: ['한쪽 입장만 집중해서 읽기', '두 입장을 표로 비교하며 정리', '어려운 용어를 사전에서 찾기', '글의 결론만 읽기'], correctIndex: 1, explanation: '대비되는 두 입장을 표로 정리하면\n공통점과 차이점이 한눈에 보여.\n이것이 철학 지문의 가장 효과적인 독해법이야!' },
      { type: 'feedback', summary: '철학·예술 = 개념 정의 + 입장 대비 + 관점 파악', message: '추상적인 지문도 구조로 접근하면\n구체적으로 변해!' },
      { type: 'mission', mission: '철학 또는 예술 기출 지문 1개를 읽고\n핵심 개념 정의 + 대비 입장을 표로 정리해보기', encouragement: '표 하나가 복잡한 지문을 정리해줘!' },
    ],
  },

  'korean-gold-8': {
    id: 'korean-gold-8',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 8,
    title: '문학사 흐름 정리',
    cards: [
      { type: 'concept', title: '한국 문학사의 큰 흐름', description: '문학 작품을 시대별로 이해하면\n작품의 배경과 주제를 더 깊이 파악할 수 있어.\n\n핵심 흐름:\n1920~30년대: 식민지 현실, 저항/감상적 서정\n1940~50년대: 해방·전쟁, 혼란과 상실\n1960~70년대: 산업화, 농촌 해체, 민중의 삶\n1980년대: 민주화 운동, 사회 비판\n1990년대~: 개인·일상, 다양한 실험\n\n시대 배경을 알면 작품 해석이 더 풍부해져!' },
      { type: 'summary', keywords: [
        { icon: '📜', label: '1920~30년대', description: '식민지 현실, 저항과 서정' },
        { icon: '💔', label: '1950년대', description: '전쟁의 상처와 혼란' },
        { icon: '🏭', label: '1960~70년대', description: '산업화와 소외된 민중' },
        { icon: '✊', label: '1980년대', description: '민주화와 사회 비판' },
      ]},
      { type: 'example', bad: { label: '성현의 방법', story: '모든 작품을 개별적으로 외웠다.\n시대적 맥락을 몰라서\n"이 작품이 왜 이런 주제인지" 이해 못 했다.' }, good: { label: '하영의 방법', story: '"이 소설이 1970년대 작품이니까\n산업화 시대 소외된 노동자가 주제겠구나"\n시대 맥락으로 작품을 예측하니 이해가 빨라졌다.' }},
      { type: 'ox', statement: '1980년대 한국 문학의 주된 흐름은 개인적 서정이다.', answer: false, feedback: '1980년대는 민주화 운동의 시대야.\n사회 비판과 민중의 삶이 문학의 주된 주제였지.\n개인적 서정은 1990년대 이후에 두드러져!' },
      { type: 'multipleChoice', question: '다음 중 1960~70년대 한국 소설의 주요 주제는?', options: ['전쟁의 상처 극복', '산업화로 인한 농촌 해체와 소외', '식민지 저항 의식', '포스트모더니즘 실험'], correctIndex: 1, explanation: '1960~70년대는 급격한 산업화로\n농촌이 해체되고 도시 노동자가 소외되던 시기야.\n이 시대 소설은 이런 현실을 반영하고 있어!' },
      { type: 'feedback', summary: '문학사 = 시대 배경 → 주제 예측 → 작품 이해', message: '문학사 흐름을 알면\n처음 보는 작품도 시대로 읽을 수 있어!' },
      { type: 'mission', mission: '한국 문학사 연표를 만들어\n시대별 대표 작품 1개씩 정리해보기', encouragement: '연표 하나가 문학 전체를 조망하게 해줘!' },
    ],
  },

  'korean-gold-9': {
    id: 'korean-gold-9',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 9,
    title: '복합 지문 독해',
    cards: [
      { type: 'concept', title: '(가)+(나) 복합 지문 전략', description: '수능에서 자주 나오는 복합 지문!\n두 개의 지문을 비교·연결하는 유형이야.\n\n복합 지문 전략:\n1) (가)를 먼저 읽고 핵심 정리\n2) (나)를 읽으며 (가)와의 관계 파악\n   - 보충 관계: (나)가 (가)를 구체화\n   - 대비 관계: (가)와 (나)가 다른 입장\n   - 적용 관계: (가)의 이론을 (나)에 적용\n3) 문제에서 묻는 관계를 정확히 파악\n\n두 지문의 "관계"가 답의 열쇠야!' },
      { type: 'summary', keywords: [
        { icon: '📄', label: '(가) 독해', description: '첫 번째 지문의 핵심 파악' },
        { icon: '📄', label: '(나) 독해', description: '두 번째 지문과 관계 연결' },
        { icon: '🔗', label: '관계 파악', description: '보충/대비/적용 관계 구분' },
        { icon: '⚡', label: '교차 읽기', description: '두 지문을 오가며 비교' },
      ]},
      { type: 'example', bad: { label: '도윤의 방법', story: '(가)와 (나)를 따로따로 읽었다.\n두 지문의 관계를 파악하지 못해\n비교 문제를 전혀 풀지 못했다.' }, good: { label: '나현의 방법', story: '(가)를 읽고 "(가)는 A이론 설명"\n(나)를 읽으며 "(나)는 A이론의 사례 적용"\n관계를 파악하니 비교 문제가 쉽게 풀렸다.' }},
      { type: 'ox', statement: '복합 지문에서 (가)와 (나)는 항상 반대 입장이다.', answer: false, feedback: '(가)와 (나)의 관계는 다양해.\n보충, 대비, 적용, 발전 등\n어떤 관계인지 파악하는 게 먼저야!' },
      { type: 'multipleChoice', question: '복합 지문에서 (가)가 이론이고 (나)가 사례일 때, 이 관계는?', options: ['대비 관계', '적용 관계', '반론 관계', '나열 관계'], correctIndex: 1, explanation: '(가)의 이론을 (나)의 사례에 적용하는 관계야.\n이럴 때는 이론의 핵심을 사례에 대입하며\n맞는지 확인하는 게 풀이 전략이야!' },
      { type: 'feedback', summary: '복합 지문 = (가)+(나) 관계 파악이 핵심', message: '관계를 보는 눈이 생기면\n복합 지문도 단일 지문처럼 읽혀!' },
      { type: 'mission', mission: '복합 지문 기출 1세트를 풀며\n(가)와 (나)의 관계를 한 줄로 정리해보기', encouragement: '관계 한 줄이 문제 풀이의 나침반이 돼!' },
    ],
  },

  'korean-gold-10': {
    id: 'korean-gold-10',
    chapterKey: 'korean',
    tierKey: 'gold',
    stageNumber: 10,
    title: '고난도 문제 접근법',
    cards: [
      { type: 'concept', title: '킬러 문항 대비 기초', description: '고난도 문제(킬러 문항)에 겁먹지 마!\n어렵게 보이지만 풀이 전략이 있어.\n\n킬러 문항 공통 특징:\n1) 정보량이 많다 → 핵심만 추려라\n2) 선지가 복잡하다 → 하나씩 분해하라\n3) 추론을 요구한다 → 논리 사슬을 따라가라\n\n접근 순서:\n① 문제 유형 파악 (뭘 묻는가?)\n② 지문에서 관련 부분 특정\n③ 선지를 하나씩 지문과 대조\n④ 소거법으로 정답 좁히기' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '유형 파악', description: '문제가 무엇을 묻는지 정확히 파악' },
        { icon: '✂️', label: '정보 추려내기', description: '핵심 정보만 걸러내기' },
        { icon: '🔗', label: '논리 추적', description: '추론의 사슬을 따라가기' },
        { icon: '🧹', label: '선지 소거', description: '하나씩 제거하며 좁히기' },
      ]},
      { type: 'example', bad: { label: '영재의 방법', story: '킬러 문항을 보고 "이건 못 풀어" 하고\n바로 찍었다. 배점이 높은 문제를 날렸다.' }, good: { label: '서현의 방법', story: '5분 제한을 두고 도전했다.\n선지를 하나씩 분석해 3개를 소거하고\n남은 2개 중 지문 근거로 정답을 골랐다.' }},
      { type: 'ox', statement: '킬러 문항은 포기하고 다른 문제에 시간을 쓰는 것이 무조건 현명하다.', answer: false, feedback: '킬러 문항도 3~5분 안에 접근해볼 가치가 있어.\n소거법만으로도 정답 확률을 50%까지 올릴 수 있거든!\n무조건 포기보다는 전략적 접근이 낫지.' },
      { type: 'multipleChoice', question: '킬러 문항에 접근할 때 가장 효과적인 첫 번째 단계는?', options: ['선지부터 읽기', '지문 전체를 다시 읽기', '문제 유형을 파악하고 묻는 것을 명확히 하기', '직감으로 답을 고르기'], correctIndex: 2, explanation: '"이 문제는 무엇을 묻고 있는가?"를 먼저 파악해야\n필요한 정보를 효율적으로 찾을 수 있어.\n유형 파악이 킬러 문항 공략의 첫 걸음이야!' },
      { type: 'feedback', summary: '고난도 문제 = 유형 파악 + 정보 추출 + 소거법', message: '골드 과정을 모두 마쳤어! 대단해!\n이제 고난도 문제에도 전략적으로 도전할 수 있어!' },
      { type: 'mission', mission: '최근 모의고사에서 틀렸던 고난도 문제 1개를\n오늘의 전략(유형 파악→정보 추출→소거법)으로 다시 풀어보기', encouragement: '킬러 문항을 정복하는 순간 등급이 바뀌어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 플래티넘 (고급 전략) 1~10
  // ═══════════════════════════════════════

  'korean-platinum-1': {
    id: 'korean-platinum-1',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 1,
    title: '킬러 문항 집중 공략',
    cards: [
      { type: 'concept', title: '킬러 문항의 구조 해부', description: '플래티넘부터는 킬러 문항을 본격적으로 해부해.\n\n킬러 문항의 3대 유형:\n1) 비문학 추론형: 지문 정보를 새로운 상황에 적용\n2) 문학 <보기> 복합형: 이론 + 작품 + 선지 삼중 대조\n3) 문법 복합 추론형: 2개 이상 문법 개념 통합\n\n공략 핵심:\n- 문제의 "조건"을 먼저 정리 (뭘 묻고, 뭘 전제하는가)\n- 선지를 "분절"하여 하나씩 검증\n- "절대적 표현"과 "상대적 표현" 구분' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: '추론 적용형', description: '지문 정보를 새 상황에 적용' },
        { icon: '📋', label: '보기 복합형', description: '이론+작품+선지 삼중 대조' },
        { icon: '🧩', label: '문법 복합형', description: '2개 이상 문법 개념 통합' },
        { icon: '✂️', label: '선지 분절', description: '선지를 쪼개서 하나씩 검증' },
      ]},
      { type: 'example', bad: { label: '진우의 방법', story: '킬러 문항의 선지를 통째로 읽고 판단했다.\n선지 전반부는 맞지만 후반부가 틀린 함정에\n매번 걸렸다.' }, good: { label: '지안의 방법', story: '선지를 / 로 분절했다.\n"A라는 점에서 / B를 의미한다"\n전반부(A 검증) → 후반부(B 검증)\n쪼개서 확인하니 함정이 보였다.' }},
      { type: 'ox', statement: '킬러 문항의 선지가 길면 전체가 맞거나 전체가 틀린다.', answer: false, feedback: '긴 선지는 "전반부는 맞고 후반부가 틀린" 경우가 많아.\n선지를 분절해서 각 부분을 따로 검증해야 해!' },
      { type: 'multipleChoice', question: '킬러 문항에서 선지를 분석할 때 가장 주의해야 할 것은?', options: ['선지의 길이', '선지의 절대적/상대적 표현 구분', '선지의 번호 순서', '선지에 쓰인 한자어 수'], correctIndex: 1, explanation: '"모두", "항상", "절대" 같은 절대적 표현과\n"주로", "대체로", "~할 수 있다" 같은 상대적 표현을\n구분하면 오답을 걸러낼 수 있어!' },
      { type: 'feedback', summary: '킬러 공략 = 조건 정리 + 선지 분절 + 표현 구분', message: '킬러 문항도 분석하면 패턴이 보여.\n무서워하지 말고 분해해보자!' },
      { type: 'mission', mission: '최근 수능/모의고사 킬러 문항 1개를\n선지 분절법으로 다시 분석해보기', encouragement: '킬러를 분해하는 순간 네가 킬러가 돼!' },
    ],
  },

  'korean-platinum-2': {
    id: 'korean-platinum-2',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 2,
    title: '비문학 기술·과학 고난도',
    cards: [
      { type: 'concept', title: '기술·과학 지문 심층 독해', description: '기술·과학 고난도 지문은 정보가 밀집되어 있어.\n\n심층 독해 전략:\n1) 과정/원리 지문: 단계별 순서도 그리기\n   A → B → C → D (화살표로 연결)\n2) 비교 지문: 대조 표 만들기\n   기술A vs 기술B (장단점 비교)\n3) 수치/그래프 지문: 변화량과 방향 메모\n   증가↑ 감소↓ 비례∝ 반비례∝⁻¹\n\n복잡한 정보를 시각화하면 명확해져!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '순서도', description: '과정을 단계별 화살표로 정리' },
        { icon: '📊', label: '대조 표', description: '두 기술/이론을 비교 정리' },
        { icon: '📈', label: '수치 메모', description: '변화 방향과 크기 간략 표시' },
        { icon: '🖼️', label: '시각화', description: '복잡한 정보를 그림으로 정리' },
      ]},
      { type: 'example', bad: { label: '현준의 방법', story: 'DNA 복제 과정 지문을 글로만 읽었다.\n단계가 뒤섞여서 순서를 묻는 문제를 틀렸다.' }, good: { label: '유빈의 방법', story: '여백에 순서도를 그렸다.\n"풀림→프라이머→합성→연결"\n화살표로 연결하니 순서 문제가 바로 풀렸다.' }},
      { type: 'ox', statement: '기술·과학 지문에서 메모는 시간 낭비이다.', answer: false, feedback: '오히려 메모가 시간을 절약해줘!\n순서도나 대조표를 만들면\n문제를 풀 때 지문을 다시 읽지 않아도 돼.' },
      { type: 'multipleChoice', question: '두 기술을 비교하는 지문에서 가장 효과적인 정리법은?', options: ['두 기술을 따로따로 요약하기', '대조 표를 만들어 항목별로 비교하기', '한 기술만 집중해서 읽기', '비교 없이 전체 요약만 하기'], correctIndex: 1, explanation: '대조 표를 만들면\n두 기술의 공통점과 차이점이 한눈에 보여.\n비교 문제의 정답률이 크게 올라가!' },
      { type: 'feedback', summary: '고난도 과학 = 순서도 + 대조표 + 수치 메모', message: '시각화 습관이 고난도 지문의 해결사야.\n연습하면 자연스럽게 할 수 있게 돼!' },
      { type: 'mission', mission: '과학/기술 기출 지문 1개를 읽으며\n순서도 또는 대조표를 직접 그려보기', encouragement: '그림 하나가 복잡한 지문을 정복해줘!' },
    ],
  },

  'korean-platinum-3': {
    id: 'korean-platinum-3',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 3,
    title: '현대시+고전시가 비교 독해',
    cards: [
      { type: 'concept', title: '작품 간 비교의 기술', description: '수능에서 현대시와 고전시가를\n함께 제시하고 비교하는 유형이 자주 나와.\n\n비교 독해 3단계:\n1) 각 작품의 화자·정서·태도를 먼저 파악\n2) 공통점 찾기: 같은 정서? 같은 소재? 같은 주제?\n3) 차이점 찾기: 표현법? 시대적 배경? 화자의 태도?\n\n핵심 비교 축:\n- 소재(자연, 님, 이별) → 같을 수 있음\n- 정서(그리움, 한탄) → 비슷할 수 있음\n- 표현법(비유, 상징) → 차이가 있음' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '비교 독해', description: '두 작품의 공통점과 차이점 분석' },
        { icon: '📜', label: '고전시가', description: '시조·가사의 화자와 정서 파악' },
        { icon: '📝', label: '현대시', description: '현대적 표현과 기법 분석' },
        { icon: '⚖️', label: '비교 축', description: '소재/정서/표현법 기준으로 대비' },
      ]},
      { type: 'example', bad: { label: '지훈의 방법', story: '두 작품을 각각 분석했지만\n공통점과 차이점을 연결하지 못해\n비교 문제에서 매번 헤맸다.' }, good: { label: '수아의 방법', story: '(가) 현대시: 자연 → 그리움 → 담담한 어조\n(나) 시조: 자연 → 그리움 → 탄식의 어조\n공통: 자연+그리움 / 차이: 어조\n비교표로 정리하니 바로 답이 보였다.' }},
      { type: 'ox', statement: '현대시와 고전시가는 시대가 다르므로 공통점이 있을 수 없다.', answer: false, feedback: '시대는 달라도 사랑, 이별, 자연 등\n보편적 주제와 정서는 공유할 수 있어.\n이 공통점을 찾는 것이 비교 독해의 핵심이야!' },
      { type: 'multipleChoice', question: '현대시와 고전시가를 비교할 때 가장 유효한 비교 기준은?', options: ['작품의 길이', '작가의 나이', '화자의 정서와 표현 방법', '출판 연도'], correctIndex: 2, explanation: '화자의 정서(공통)와 표현 방법(차이)이\n시대를 초월한 가장 유효한 비교 기준이야.\n이 축으로 정리하면 선지가 명확해져!' },
      { type: 'feedback', summary: '비교 독해 = 개별 분석 + 공통점 + 차이점 정리', message: '비교의 눈이 생기면\n복합 문학 문제가 정복돼!' },
      { type: 'mission', mission: '현대시+고전시가 기출 세트 1개를 풀며\n공통점과 차이점을 비교표로 정리해보기', encouragement: '비교표가 복합 문학의 비밀 무기야!' },
    ],
  },

  'korean-platinum-4': {
    id: 'korean-platinum-4',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 4,
    title: '서술 시점과 서사 구조 심화',
    cards: [
      { type: 'concept', title: '서사 구조의 패턴', description: '소설의 서사 구조에는 반복되는 패턴이 있어.\n\n핵심 서사 구조:\n1) 발단-전개-위기-절정-결말 (5단 구성)\n2) 액자 구조: 이야기 속 이야기\n3) 역순행 구성: 결말 → 과거 → 현재\n4) 병렬 구성: 두 이야기가 교차\n\n서술 시점 심화:\n- 시점 변환: 중간에 시점이 바뀌는 경우\n- 서술자의 개입: 서술자가 의견을 표현\n- 신뢰할 수 없는 서술자: 서술자의 말을 의심해야 하는 경우' },
      { type: 'summary', keywords: [
        { icon: '📖', label: '5단 구성', description: '발단→전개→위기→절정→결말' },
        { icon: '🖼️', label: '액자 구조', description: '이야기 속 이야기 구조' },
        { icon: '⏪', label: '역순행', description: '시간을 거슬러 올라가는 구성' },
        { icon: '🔀', label: '시점 변환', description: '서술 시점이 중간에 바뀌는 기법' },
      ]},
      { type: 'example', bad: { label: '준영의 방법', story: '소설의 시간 순서가 뒤바뀌자\n혼란스러워서 내용을 놓쳤다.\n역순행 구성이라는 걸 몰랐다.' }, good: { label: '민지의 방법', story: '"현재 → 과거 회상 → 다시 현재"\n시간 순서를 화살표로 정리했다.\n역순행 구성임을 파악하고\n서술 기법 문제를 정확히 맞혔다.' }},
      { type: 'ox', statement: '액자 구조란 소설 안에 또 다른 이야기가 포함된 구조이다.', answer: true, feedback: '맞아! 액자 구조는 바깥 이야기(외부 이야기) 안에\n안쪽 이야기(내부 이야기)가 담긴 구조야.\n마치 액자 속에 그림이 있는 것처럼!' },
      { type: 'multipleChoice', question: '소설에서 서술자가 "독자 여러분은 이 사실을 기억해두시오"라고 말할 때, 이것은?', options: ['1인칭 주인공 시점', '서술자의 개입', '의식의 흐름 기법', '시점 변환'], correctIndex: 1, explanation: '서술자가 직접 독자에게 말을 거는 것은\n서술자의 개입에 해당해.\n이야기 흐름에 서술자의 의견이나 안내가 들어간 거야!' },
      { type: 'feedback', summary: '서사 심화 = 구조 패턴 + 시점 변화 분석', message: '서사 구조를 읽는 눈이 생기면\n소설 문제의 난이도가 확 낮아져!' },
      { type: 'mission', mission: '현대소설 기출 1개를 읽고\n서사 구조(5단구성/액자/역순행)와 시점을 분석해보기', encouragement: '구조를 읽으면 소설이 설계도처럼 보여!' },
    ],
  },

  'korean-platinum-5': {
    id: 'korean-platinum-5',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 5,
    title: '중세 국어와 문법 심화',
    cards: [
      { type: 'concept', title: '중세 국어의 핵심', description: '수능 문법에서 중세 국어는 고난도 영역이야.\n\n알아야 할 핵심 개념:\n1) 아래아(ㆍ): 현대에 사라진 모음\n2) 이어 적기(연철): 소리나는 대로 적기\n   예) "무를" (현대: 물을)\n3) 방점: 글자 옆의 점으로 성조 표시\n   거성(점 1개), 상성(점 2개), 평성(점 없음)\n4) 주격 조사 "이" 외에 "ㅣ" 사용\n\n중세 국어는 외울 게 한정적이야.\n핵심 개념만 정리하면 고득점 가능!' },
      { type: 'summary', keywords: [
        { icon: '🔤', label: '아래아(ㆍ)', description: '현대에 사라진 중세 모음' },
        { icon: '✍️', label: '이어 적기', description: '소리나는 대로 적는 표기법' },
        { icon: '⚫', label: '방점', description: '성조를 표시하는 점' },
        { icon: '📜', label: '중세 문법', description: '주격 조사, 관형격 조사 변화' },
      ]},
      { type: 'example', bad: { label: '우진의 방법', story: '중세 국어 문제를 보고\n"옛날 글자는 모르겠어" 하고 포기했다.\n매번 2~3점을 날렸다.' }, good: { label: '은율의 방법', story: '중세 국어 핵심 개념 10개를 정리했다.\n아래아, 이어적기, 방점, 주격조사 등\n패턴이 한정적이라 금방 익혔고\n문법 만점을 받았다.' }},
      { type: 'ox', statement: '중세 국어에서 "이어 적기"란 현대의 맞춤법과 동일한 표기법이다.', answer: false, feedback: '이어 적기(연철)는 소리나는 대로 적는 방식이야.\n현대 맞춤법의 끊어 적기(분철)와 달라.\n예) 중세: "무를" → 현대: "물을"' },
      { type: 'multipleChoice', question: '중세 국어의 방점에서 글자 왼쪽에 점이 하나 있으면?', options: ['평성', '거성', '상성', '입성'], correctIndex: 1, explanation: '점 1개 = 거성(높은 소리)\n점 2개 = 상성(낮았다 높아지는 소리)\n점 없음 = 평성(낮은 소리)\n이 3가지만 기억하면 돼!' },
      { type: 'feedback', summary: '중세 국어 = 핵심 10개 개념만 정리하면 정복', message: '중세 국어는 범위가 좁아서\n정리하면 확실한 득점원이 돼!' },
      { type: 'mission', mission: '중세 국어 핵심 개념(아래아, 이어적기, 방점, 조사 변화)을\n한 페이지에 정리해보기', encouragement: '한 페이지 정리로 중세 국어 완전 정복!' },
    ],
  },

  'korean-platinum-6': {
    id: 'korean-platinum-6',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 6,
    title: '매체 언어와 실용문',
    cards: [
      { type: 'concept', title: '매체·실용문 유형 공략', description: '화법·작문·매체 영역은 최근 출제 비중이 높아졌어.\n\n매체 언어 핵심:\n1) 뉴스·광고·SNS 등 매체별 특성 파악\n2) 정보 전달의 의도와 효과 분석\n3) 매체 자료(표/그래프/이미지)의 정보 해석\n\n실용문 핵심:\n- 보고서, 제안서, 안내문 등의 구조\n- 글의 목적에 맞는 표현 평가\n- 고쳐쓰기의 적절성 판단\n\n이 영역은 패턴이 반복돼서 연습하면 만점이 가능해!' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '매체 언어', description: '뉴스·광고·SNS 등 매체 특성' },
        { icon: '📊', label: '자료 해석', description: '표·그래프에서 정보 읽기' },
        { icon: '📄', label: '실용문', description: '보고서·안내문 등 실용 글' },
        { icon: '✏️', label: '고쳐쓰기', description: '문법·표현의 적절성 판단' },
      ]},
      { type: 'example', bad: { label: '세준의 방법', story: '매체 문제를 "상식"으로 풀었다.\n매체별 특성을 정확히 몰라서\n"적절하지 않은 것" 문제를 틀렸다.' }, good: { label: '다인의 방법', story: '매체별 특성(뉴스=객관성, 광고=설득, SNS=상호작용)을\n정리해두고 문제에 적용했다.\n패턴을 알으니 빠르고 정확하게 풀었다.' }},
      { type: 'ox', statement: '광고의 주된 목적은 정보를 객관적으로 전달하는 것이다.', answer: false, feedback: '광고의 주된 목적은 "설득"이야.\n상품이나 서비스를 긍정적으로 인식하게 만드는 게 핵심이지.\n객관적 정보 전달은 뉴스의 목적이야!' },
      { type: 'multipleChoice', question: 'SNS 매체의 가장 두드러진 특성은?', options: ['일방적 정보 전달', '쌍방향 소통과 상호작용', '객관적 사실 보도', '전문가의 심층 분석'], correctIndex: 1, explanation: 'SNS는 쌍방향 소통이 핵심 특성이야.\n댓글, 공유, 반응 등을 통해\n정보 생산자와 수용자가 상호작용하지!' },
      { type: 'feedback', summary: '매체·실용문 = 매체별 특성 + 패턴 숙지', message: '매체 영역은 연습량에 비례해서 점수가 올라.\n가성비 좋은 영역이야!' },
      { type: 'mission', mission: '매체 기출 문제 3개를 풀며\n각 문제에서 묻는 매체 특성을 정리해보기', encouragement: '매체 특성을 외우면 만점이 보여!' },
    ],
  },

  'korean-platinum-7': {
    id: 'korean-platinum-7',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 7,
    title: '문학 감상 관점 비교',
    cards: [
      { type: 'concept', title: '4대 비평 관점', description: '문학 <보기>에서 자주 나오는 비평 관점이야.\n\n1) 내재적 관점\n- 표현론: 작가의 감정·사상이 작품에 반영\n- 구조론: 작품 자체의 구조·형식 분석\n- 효용론: 독자에게 미치는 영향·감동\n\n2) 외재적 관점\n- 반영론: 작품이 사회·역사를 반영\n\n<보기>에서 어떤 관점을 제시하는지\n파악하면 선지 판단이 쉬워져!' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: '표현론', description: '작가의 감정·사상 → 작품 반영' },
        { icon: '🔍', label: '구조론', description: '작품 자체의 구조·형식 분석' },
        { icon: '💡', label: '효용론', description: '독자에게 미치는 감동과 영향' },
        { icon: '🌍', label: '반영론', description: '작품이 사회·역사를 반영' },
      ]},
      { type: 'example', bad: { label: '한별의 방법', story: '<보기>에서 "사회적 맥락"을 언급하는데\n작품의 표현 기법으로만 분석했다.\n관점이 맞지 않아 틀렸다.' }, good: { label: '승아의 방법', story: '<보기>에서 "당시 사회 상황을 반영"이라는\n키워드를 잡았다. → 반영론!\n이 관점에서 작품을 해석하니 정답이 보였다.' }},
      { type: 'ox', statement: '구조론적 관점에서는 작가의 생애를 고려하여 작품을 해석한다.', answer: false, feedback: '구조론은 작품 자체의 구조와 형식만 분석해.\n작가의 생애를 고려하는 것은 표현론이야!\n관점별 차이를 정확히 구분하자.' },
      { type: 'multipleChoice', question: '"이 시는 일제강점기의 민족 현실을 반영하고 있다"는 어떤 비평 관점인가?', options: ['표현론', '구조론', '효용론', '반영론'], correctIndex: 3, explanation: '작품이 사회·역사적 현실을 반영한다고 보는 것은\n반영론(외재적 관점)이야.\n시대적 맥락과 작품을 연결하는 관점이지!' },
      { type: 'feedback', summary: '비평 관점 = 표현론/구조론/효용론/반영론', message: '4대 관점만 정확히 알면\n<보기> 문제의 절반은 해결!' },
      { type: 'mission', mission: '문학 <보기> 기출 3개에서\n각각 어떤 비평 관점이 적용되었는지 분류해보기', encouragement: '관점을 구분하면 <보기>가 친절한 힌트가 돼!' },
    ],
  },

  'korean-platinum-8': {
    id: 'korean-platinum-8',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 8,
    title: '약점 유형 집중 훈련',
    cards: [
      { type: 'concept', title: '약점 데이터 분석', description: '플래티넘 수준에서는 약점을 데이터로 관리해.\n\n약점 분석 시스템:\n1) 최근 5회 모의고사 오답을 모아\n2) 유형별 분류 (비문학/문학/문법/화작)\n3) 세부 분류 (추론/적용/비교/사실적독해 등)\n4) 오답률이 높은 상위 3개 유형 특정\n5) 그 유형만 집중 풀이 (최소 20문제)\n\n"전체를 다 하려는" 비효율을 버리고\n"약점만 집중 공략"하는 전략으로 전환해!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: '데이터 수집', description: '5회분 오답 유형별 분류' },
        { icon: '🎯', label: '약점 특정', description: '오답률 상위 3개 유형 선별' },
        { icon: '🔨', label: '집중 훈련', description: '약점 유형 최소 20문제 풀기' },
        { icon: '📈', label: '개선 추적', description: '훈련 전후 정답률 비교' },
      ]},
      { type: 'example', bad: { label: '혜성의 방법', story: '매번 새로운 모의고사만 풀었다.\n같은 유형에서 계속 틀리는데\n원인을 분석하지 않았다.' }, good: { label: '소희의 방법', story: '5회분 오답을 분류했더니\n"비문학 추론형"에서 70% 틀리고 있었다.\n추론형만 30문제 집중 풀이했더니\n정답률이 40% → 80%로 올라갔다.' }},
      { type: 'ox', statement: '약점 훈련보다 강점을 더 강화하는 것이 성적 향상에 효과적이다.', answer: false, feedback: '강점은 이미 높은 정답률이라 향상 폭이 작아.\n약점을 보완하면 전체 점수가 크게 올라가!\n약점 집중이 가성비 최고의 전략이야.' },
      { type: 'multipleChoice', question: '약점 분석에서 가장 먼저 해야 할 단계는?', options: ['새 문제를 많이 풀기', '최근 오답을 유형별로 분류하기', '어려운 문제만 골라 풀기', '전 범위를 처음부터 복습하기'], correctIndex: 1, explanation: '약점을 파악하려면 먼저 데이터가 필요해.\n최근 오답을 유형별로 분류하면\n어디가 약한지 객관적으로 보여!' },
      { type: 'feedback', summary: '약점 훈련 = 데이터 분류 + 상위 3유형 집중', message: '약점을 아는 것이 실력이야.\n객관적 분석이 주관적 노력보다 강해!' },
      { type: 'mission', mission: '최근 모의고사 3회분의 오답을\n유형별로 분류하고 상위 약점 3개를 찾아보기', encouragement: '약점을 정면으로 마주하는 용기가 성장의 열쇠야!' },
    ],
  },

  'korean-platinum-9': {
    id: 'korean-platinum-9',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 9,
    title: '실전 모의고사 심층 분석',
    cards: [
      { type: 'concept', title: '모의고사 분석 프레임', description: '단순 채점이 아닌 심층 분석을 해야 해.\n\n모의고사 분석 5단계:\n1) 채점 후 등급·원점수 기록\n2) 틀린 문제 + 찍어서 맞은 문제 분류\n3) 각 문제별 소요 시간 추정\n4) 시간이 부족했는지 / 실력이 부족했는지 구분\n5) 다음 시험 개선 포인트 3개 도출\n\n"찍어서 맞은 문제"도 오답으로 취급해!\n진짜 실력을 객관적으로 파악하는 게 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '채점 기록', description: '등급·원점수·영역별 점수 기록' },
        { icon: '🎲', label: '찍은 문제', description: '찍어서 맞은 것도 오답 처리' },
        { icon: '⏱️', label: '시간 분석', description: '문제별 소요 시간 추정' },
        { icon: '🎯', label: '개선점 도출', description: '다음 시험 개선 포인트 3개' },
      ]},
      { type: 'example', bad: { label: '재원의 방법', story: '모의고사를 풀고 "2등급이네" 하고 끝냈다.\n뭘 고쳐야 하는지 모른 채\n다음 모의고사도 비슷한 점수가 나왔다.' }, good: { label: '수빈의 방법', story: '분석표를 만들었다.\n"비문학 4문제 중 2개는 시간 부족, 2개는 실력 부족"\n시간 부족 → 속도 훈련 / 실력 부족 → 개념 복습\n구체적 대책을 세우니 다음 시험에서 올랐다.' }},
      { type: 'ox', statement: '찍어서 맞은 문제는 맞은 것이므로 분석할 필요가 없다.', answer: false, feedback: '찍어서 맞은 것은 운이지 실력이 아니야.\n다음에는 틀릴 수 있으니\n반드시 오답과 같이 분석해야 해!' },
      { type: 'multipleChoice', question: '모의고사 분석에서 "시간 부족"과 "실력 부족"을 구분하는 이유는?', options: ['구분할 필요가 없다', '대응 전략이 다르기 때문이다', '시간 부족은 중요하지 않아서', '실력 부족만 고치면 되어서'], correctIndex: 1, explanation: '시간 부족 → 속도 훈련 필요\n실력 부족 → 개념 학습 필요\n원인이 다르면 해결책도 달라야 효과적이야!' },
      { type: 'feedback', summary: '심층 분석 = 채점 + 찍은 문제 분류 + 개선점 도출', message: '분석하는 만큼 성장해.\n모의고사는 실력 측정 도구가 아니라 성장 도구야!' },
      { type: 'mission', mission: '가장 최근 모의고사를 5단계 분석법으로\n심층 분석해보기 (찍은 문제 포함)', encouragement: '심층 분석 한 번이 모의고사 3회분의 가치를 만들어!' },
    ],
  },

  'korean-platinum-10': {
    id: 'korean-platinum-10',
    chapterKey: 'korean',
    tierKey: 'platinum',
    stageNumber: 10,
    title: '1등급 도전 종합 전략',
    cards: [
      { type: 'concept', title: '1등급을 위한 마인드셋', description: '1등급은 실력만으로 되는 게 아니야.\n전략과 멘탈이 함께 필요해.\n\n1등급 종합 전략:\n1) 확실한 득점원 확보: 화작+문법+문학 = 실수 0\n2) 비문학 시간 확보: 45분 이상 비문학에 투자\n3) 킬러 문항 대비: 소거법 + 5분 제한\n4) 컨디션 관리: 시험 전날 컨디션이 5점을 좌우\n5) 멘탈 루틴: 시험 시작 전 심호흡 3번\n\n플래티넘 과정을 마친 너는\n이미 1등급을 향한 준비가 되어 있어!' },
      { type: 'summary', keywords: [
        { icon: '💯', label: '득점원 확보', description: '화작+문법+문학 실수 제로' },
        { icon: '⏰', label: '시간 전략', description: '비문학에 45분 이상 확보' },
        { icon: '🎯', label: '킬러 대비', description: '소거법+시간 제한으로 공략' },
        { icon: '🧘', label: '멘탈 관리', description: '컨디션+심호흡 루틴' },
      ]},
      { type: 'example', bad: { label: '동현의 방법', story: '실력은 충분했지만\n시험 날 긴장해서 쉬운 문제도 실수했다.\n컨디션과 멘탈 관리를 소홀히 한 결과였다.' }, good: { label: '서영의 방법', story: '시험 전날 충분히 자고\n시험 시작 전 심호흡 3번.\n화작·문법을 15분 안에 끝내고\n비문학에 45분을 투자했다.\n킬러도 소거법으로 정답을 골랐다.' }},
      { type: 'ox', statement: '1등급은 모든 문제를 다 맞아야만 가능하다.', answer: false, feedback: '1등급 컷은 보통 85~90점 내외야.\n5~6문제를 틀려도 1등급이 가능해.\n완벽보다는 실수를 줄이는 전략이 중요해!' },
      { type: 'multipleChoice', question: '1등급 전략에서 가장 중요한 핵심은?', options: ['모든 문제를 다 맞히기', '확실한 득점원에서 실수를 없애고 비문학 시간 확보', '킬러 문항에 가장 많은 시간 투자', '어려운 문제만 집중 연습'], correctIndex: 1, explanation: '쉬운 문제에서 실수 없이 득점하고\n비문학에 충분한 시간을 확보하는 것이\n1등급의 가장 현실적인 전략이야!' },
      { type: 'feedback', summary: '1등급 = 득점원 확보 + 시간 전략 + 멘탈 관리', message: '플래티넘 과정을 모두 마쳤어! 정말 대단해!\n이제 다이아 과정에서 최상위 실력을 완성하자!' },
      { type: 'mission', mission: '나만의 수능 국어 전략표를 만들어보기\n(영역별 시간 배분 + 풀이 순서 + 멘탈 루틴)', encouragement: '전략표가 있는 사람과 없는 사람의 차이는 크다!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (최상위 완성) 1~10
  // ═══════════════════════════════════════

  'korean-diamond-1': {
    id: 'korean-diamond-1',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 1,
    title: '최상위 독해 마스터',
    cards: [
      { type: 'concept', title: '메타 독해 전략', description: '다이아 수준의 독해는 "메타 독해"야.\n읽으면서 동시에 자신의 읽기를 모니터링하는 거지.\n\n메타 독해 체크리스트:\n1) "지금 읽은 문단의 핵심은?" → 대답 못하면 다시 읽기\n2) "이 문단은 앞 문단과 어떤 관계?" → 연결고리 확인\n3) "다음 문단에는 뭐가 나올까?" → 예측하며 읽기\n4) "이 부분에서 문제가 나올까?" → 출제 포인트 예측\n\n읽기 자체를 전략적으로 통제하는 것이\n최상위 독해의 핵심이야!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '메타 인지', description: '읽으면서 자신의 이해를 점검' },
        { icon: '🔗', label: '연결 확인', description: '문단 간 관계를 실시간 파악' },
        { icon: '🔮', label: '예측 독해', description: '다음 내용을 미리 예상하며 읽기' },
        { icon: '🎯', label: '출제 예측', description: '문제 출제 포인트를 예측' },
      ]},
      { type: 'example', bad: { label: '현기의 방법', story: '지문을 빠르게 읽었지만\n"뭘 읽었지?" 하는 순간이 많았다.\n속도는 빨라도 이해가 따라가지 못했다.' }, good: { label: '도연의 방법', story: '한 문단 읽을 때마다 "핵심은 뭐지?" 자문했다.\n대답 못하면 다시 읽었다.\n느린 것 같지만 문제 풀이 때 지문을 다시 안 봐도 됐다.' }},
      { type: 'ox', statement: '빠르게 읽는 것이 항상 효율적인 독해이다.', answer: false, feedback: '빠르게 읽어도 이해하지 못하면\n문제 풀이 때 다시 읽어야 해서 오히려 비효율적이야.\n이해하면서 읽는 속도가 진짜 속도야!' },
      { type: 'multipleChoice', question: '메타 독해에서 "다음 문단 예측"의 효과는?', options: ['읽기 속도가 느려진다', '예측이 맞으면 이해 속도가 빨라진다', '예측이 틀리면 혼란스러워진다', '예측 자체가 시간 낭비이다'], correctIndex: 1, explanation: '예측이 맞으면 확인만 하면 되니 빠르게 읽히고,\n틀려도 "왜 달랐지?"라는 질문이\n더 깊은 이해를 만들어줘!' },
      { type: 'feedback', summary: '메타 독해 = 읽기 + 점검 + 예측을 동시에', message: '독해의 최상위 경지는\n읽으면서 생각하는 습관이야!' },
      { type: 'mission', mission: '비문학 지문을 읽으며\n각 문단마다 "핵심 한 줄"을 여백에 적어보기', encouragement: '한 줄 정리가 메타 독해의 시작이야!' },
    ],
  },

  'korean-diamond-2': {
    id: 'korean-diamond-2',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 2,
    title: '초고난도 비문학 독파',
    cards: [
      { type: 'concept', title: '복합 전문 지문 정복', description: '다이아 비문학은 두 분야가 융합된 지문이야.\n예: 경제+철학, 과학+기술, 법+윤리\n\n복합 지문 정복 전략:\n1) 두 분야의 접점을 찾아라\n   "경제 이론을 철학적으로 분석한다" 같은 접점\n2) 각 분야의 논리를 따로 정리한 뒤 연결\n3) 선지에서 두 분야의 관계를 묻는 부분에 집중\n\n또한 지문 길이가 길어질수록\n"정보의 위계(중요도)"를 구분하는 능력이 필수야.\n핵심 vs 예시 vs 부연을 구분해!' },
      { type: 'summary', keywords: [
        { icon: '🔀', label: '융합 지문', description: '두 분야가 결합된 복합 지문' },
        { icon: '🎯', label: '접점 파악', description: '두 분야가 만나는 핵심 지점' },
        { icon: '📊', label: '정보 위계', description: '핵심/예시/부연의 중요도 구분' },
        { icon: '⚡', label: '선택적 정독', description: '핵심은 정독, 예시는 속독' },
      ]},
      { type: 'example', bad: { label: '영민의 방법', story: '경제+철학 융합 지문에서\n두 분야를 따로 이해하려다 연결이 안 됐다.\n두 분야의 관계를 묻는 문제를 모두 틀렸다.' }, good: { label: '하율의 방법', story: '"이 지문은 경제 이론을 철학적으로 비판하는 구조"\n접점을 먼저 잡고 읽으니\n두 분야가 하나의 논리로 연결됐다.' }},
      { type: 'ox', statement: '비문학 지문의 모든 문장은 동일한 중요도를 가진다.', answer: false, feedback: '핵심 문장(주제문)과 부연(예시, 설명)은\n중요도가 달라. 핵심에 집중하고\n부연은 필요할 때만 확인하는 게 전략이야!' },
      { type: 'multipleChoice', question: '융합 지문에서 가장 먼저 파악해야 할 것은?', options: ['각 분야의 세부 내용', '두 분야가 만나는 접점(연결고리)', '지문의 전체 분량', '각 분야의 전문 용어'], correctIndex: 1, explanation: '접점을 먼저 파악하면\n"왜 이 두 분야를 함께 다루는가?"가 명확해지고\n전체 논지를 빠르게 이해할 수 있어!' },
      { type: 'feedback', summary: '초고난도 = 접점 파악 + 정보 위계 + 선택적 정독', message: '가장 어려운 지문도\n구조로 접근하면 반드시 풀려!' },
      { type: 'mission', mission: '최근 수능/모의고사의 가장 긴 비문학 지문을\n접점 파악 + 정보 위계 표시로 다시 읽어보기', encouragement: '가장 어려운 지문을 정복한 경험이 자신감을 만들어!' },
    ],
  },

  'korean-diamond-3': {
    id: 'korean-diamond-3',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 3,
    title: '문학 통합 감상',
    cards: [
      { type: 'concept', title: '장르 횡단 통합 감상', description: '최상위 문학 실력은 장르를 넘나드는 통합 감상이야.\n\n통합 감상 전략:\n1) 현대시 + 고전시가: 시대별 정서 표현 비교\n2) 현대소설 + 고전소설: 서사 구조와 가치관 비교\n3) 시 + 소설: 같은 주제를 다른 장르로 표현한 차이\n\n핵심 질문:\n- 같은 정서를 다르게 표현한 이유는?\n- 시대에 따라 가치관이 어떻게 변했는가?\n- 장르의 특성이 표현에 어떤 영향을 주었는가?\n\n작품을 "연결"하는 능력이 만점의 열쇠야!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '장르 횡단', description: '시·소설·고전을 넘나드는 감상' },
        { icon: '📜', label: '시대 비교', description: '같은 주제의 시대별 변화 분석' },
        { icon: '🎭', label: '장르 특성', description: '장르가 표현에 미치는 영향' },
        { icon: '🔗', label: '작품 연결', description: '여러 작품을 통합적으로 이해' },
      ]},
      { type: 'example', bad: { label: '승민의 방법', story: '현대시와 고전시가를 완전히 다른 것으로 봤다.\n비교 문제에서 공통점을 전혀 찾지 못했다.' }, good: { label: '예빈의 방법', story: '"둘 다 이별의 정서를 다루고 있어.\n고전시가는 자연물(달)에 감정을 투영하고\n현대시는 도시 풍경에 투영했어."\n장르와 시대에 따른 표현 차이를 정확히 짚었다.' }},
      { type: 'ox', statement: '현대시와 고전시가는 표현 방식이 달라 비교가 불가능하다.', answer: false, feedback: '표현 방식은 다르지만 주제와 정서는 비교 가능해.\n"이별", "자연", "사랑" 같은 보편적 주제는\n시대를 초월하거든!' },
      { type: 'multipleChoice', question: '통합 감상에서 장르 간 비교의 가장 유효한 기준은?', options: ['작품의 길이', '공통 주제에 대한 표현 방식의 차이', '작가의 출생 연도', '작품의 출판사'], correctIndex: 1, explanation: '같은 주제를 다른 장르에서 어떻게 표현하는지\n비교하는 것이 통합 감상의 핵심이야.\n주제는 같되 표현의 차이를 분석하는 거지!' },
      { type: 'feedback', summary: '통합 감상 = 장르 횡단 + 시대 비교 + 표현 차이', message: '작품을 연결하는 눈이 열리면\n문학이 하나의 큰 그림으로 보여!' },
      { type: 'mission', mission: '같은 주제(예: 이별)를 다룬 현대시와 고전시가를\n하나씩 골라 표현 차이를 분석해보기', encouragement: '연결의 눈이 문학 만점의 비밀이야!' },
    ],
  },

  'korean-diamond-4': {
    id: 'korean-diamond-4',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 4,
    title: '언어와 매체 완성',
    cards: [
      { type: 'concept', title: '언어·매체 만점 전략', description: '언어와 매체 영역은 만점이 가능한 영역이야.\n\n언어(문법) 완성 전략:\n1) 음운 변동 5대 유형을 완벽히 체화\n2) 문장 구조 분석을 3초 안에 완료\n3) 중세 국어 핵심 10개 개념 완벽 숙지\n\n매체 완성 전략:\n1) 매체 특성 표 완벽 암기\n2) 자료 해석(표/그래프) 빠른 읽기 훈련\n3) 고쳐쓰기 문법 규칙 정리\n\n이 영역에서 만점을 받으면\n전체 등급에 큰 여유가 생겨!' },
      { type: 'summary', keywords: [
        { icon: '🔊', label: '음운 완벽', description: '5대 음운 변동 즉시 판별' },
        { icon: '📐', label: '문장 분석', description: '3초 안에 문장 구조 파악' },
        { icon: '📱', label: '매체 특성', description: '매체별 특성표 완벽 숙지' },
        { icon: '💯', label: '만점 목표', description: '이 영역에서 실수 제로' },
      ]},
      { type: 'example', bad: { label: '태성의 방법', story: '문법과 매체를 "대충 알겠지" 하고 넘어갔다.\n시험에서 애매한 문제 2개를 틀려\n원하는 등급에 미치지 못했다.' }, good: { label: '나영의 방법', story: '음운 변동 유형표를 만들어 30번 반복했다.\n매체 특성도 카드로 만들어 수시로 확인했다.\n시험에서 문법·매체 전 문제를 2분 안에 정확히 풀었다.' }},
      { type: 'ox', statement: '문법·매체 영역은 감으로 풀어도 충분하다.', answer: false, feedback: '문법·매체는 정확한 지식이 필요한 영역이야.\n감으로 풀면 애매한 선지에서 반드시 틀려.\n확실한 지식으로 100% 정답을 노려야 해!' },
      { type: 'multipleChoice', question: '문법·매체에서 만점을 위한 가장 효과적인 방법은?', options: ['많은 문제를 빠르게 풀기', '핵심 개념을 완벽히 체화하고 반복 확인', '어려운 문제만 골라 풀기', '기출만 보고 새 유형은 무시하기'], correctIndex: 1, explanation: '문법·매체는 범위가 한정적이야.\n핵심 개념을 완벽히 체화하면\n어떤 변형 문제도 대응할 수 있어!' },
      { type: 'feedback', summary: '언어·매체 완성 = 핵심 체화 + 반복 + 실수 제로', message: '이 영역 만점은 가장 확실한 득점원이야.\n완벽히 준비하자!' },
      { type: 'mission', mission: '음운 변동 5대 유형과 매체 특성표를\n각각 1장으로 정리하고 매일 1번씩 확인해보기', encouragement: '반복이 완벽을 만들어!' },
    ],
  },

  'korean-diamond-5': {
    id: 'korean-diamond-5',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 5,
    title: '시간 단축 고급 기술',
    cards: [
      { type: 'concept', title: '초고속 풀이 시스템', description: '다이아 수준에서는 시간을 "단축"해서\n검토 시간을 확보하는 게 핵심이야.\n\n시간 단축 기술:\n1) 선지 선독 강화: 문제+선지를 10초 안에 스캔\n   → 무엇을 찾아야 하는지 명확화\n2) 키워드 매칭: 선지 키워드를 지문에서 직접 찾기\n   → 전체를 다시 읽지 않기\n3) 소거 가속: 확실한 오답 2개를 15초 안에 제거\n4) 검토 시간 확보: 전체 풀이 70분 + 검토 10분\n\n검토 시간이 있으면\n실수로 틀리는 문제를 구제할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '⚡', label: '선지 스캔', description: '10초 안에 문제 유형 파악' },
        { icon: '🔑', label: '키워드 매칭', description: '선지→지문 직접 연결' },
        { icon: '✂️', label: '소거 가속', description: '15초 안에 확실한 오답 2개 제거' },
        { icon: '🔍', label: '검토 시간', description: '10분 검토로 실수 구제' },
      ]},
      { type: 'example', bad: { label: '지호의 방법', story: '모든 문제를 80분 꽉 채워 풀었다.\n검토 시간이 없어서\n쉬운 문제에서 한 실수를 발견하지 못했다.' }, good: { label: '연서의 방법', story: '화작 8분, 문법 5분, 문학 22분, 비문학 35분.\n70분 만에 전체를 풀고\n10분 검토에서 실수 2개를 찾아 수정했다.\n그 2개가 등급을 바꿨다.' }},
      { type: 'ox', statement: '검토 시간 없이 빠르게 푸는 것이 가장 좋은 전략이다.', answer: false, feedback: '검토 시간이 등급을 바꿀 수 있어.\n70분 풀이 + 10분 검토가\n80분 풀이보다 안정적인 전략이야!' },
      { type: 'multipleChoice', question: '시간 단축을 위해 가장 효과적인 기술은?', options: ['모든 지문을 빠르게 읽기', '선지 키워드를 지문에서 직접 매칭하기', '어려운 문제를 먼저 풀기', '답이 확실하지 않아도 바로 넘기기'], correctIndex: 1, explanation: '키워드 매칭은 지문 전체를 다시 읽지 않고\n필요한 부분만 찾아가는 기술이야.\n시간을 크게 절약해주는 핵심 기법이야!' },
      { type: 'feedback', summary: '시간 단축 = 선지 스캔 + 키워드 매칭 + 검토 확보', message: '시간을 다루는 기술이 완성되면\n시험이 편안해져!' },
      { type: 'mission', mission: '기출 1회분을 70분 안에 풀고\n10분 검토로 답을 수정한 문제를 기록해보기', encouragement: '검토에서 찾아낸 실수가 곧 실력이야!' },
    ],
  },

  'korean-diamond-6': {
    id: 'korean-diamond-6',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 6,
    title: '수능 출제 원리 분석',
    cards: [
      { type: 'concept', title: '출제자의 시각으로 보기', description: '최상위 전략은 "출제자의 의도"를 읽는 거야.\n\n출제 원리:\n1) 정답은 반드시 지문에 근거가 있다\n2) 오답은 "살짝 바꾸기"로 만든다\n   - 범위 변경: "일부"를 "모두"로\n   - 인과 뒤집기: 원인과 결과를 바꿈\n   - 과잉 해석: 지문에 없는 내용 추가\n   - 반대 표현: 긍정을 부정으로\n3) 매력적 오답은 "그럴듯하지만 틀린" 선지\n\n오답을 만드는 패턴을 알면\n함정을 피할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '출제 의도', description: '출제자가 묻고 싶은 것 파악' },
        { icon: '🔄', label: '범위 변경', description: '"일부"→"모두" 식의 함정' },
        { icon: '↔️', label: '인과 뒤집기', description: '원인과 결과를 바꾼 오답' },
        { icon: '➕', label: '과잉 해석', description: '지문에 없는 내용을 추가한 오답' },
      ]},
      { type: 'example', bad: { label: '정현의 방법', story: '선지를 읽고 "맞는 것 같은데…"\n느낌으로 고르다가 매력적 오답에 걸렸다.' }, good: { label: '수인의 방법', story: '"이 선지는 범위를 바꿨네. 지문엔 일부라 했는데\n선지에 모두라고 써있으니 오답이야."\n오답 제작 패턴을 알아서 함정을 피했다.' }},
      { type: 'ox', statement: '수능 국어 오답은 완전히 틀린 내용으로 만들어진다.', answer: false, feedback: '오답은 "살짝 바꿔서" 만들어져.\n거의 맞지만 범위, 인과, 표현이 미세하게 달라.\n이 미세한 차이를 잡아내는 게 핵심이야!' },
      { type: 'multipleChoice', question: '지문에 "A가 B의 한 원인이 된다"고 했는데, 선지에 "B의 유일한 원인은 A이다"라고 되어 있다면?', options: ['정답이다', '오답이다 - 범위를 바꿨다', '판단할 수 없다', '정답일 가능성이 높다'], correctIndex: 1, explanation: '"한 원인"을 "유일한 원인"으로 바꿨어.\n이것이 대표적인 범위 변경 오답 패턴이야.\n"한"과 "유일한"의 차이를 놓치면 안 돼!' },
      { type: 'feedback', summary: '출제 원리 = 오답 제작 패턴 파악 + 미세한 차이 포착', message: '출제자의 시각을 갖추면\n문제가 투명하게 보여!' },
      { type: 'mission', mission: '기출 문제 5개의 오답 선지를 분석하며\n각각 어떤 오답 패턴(범위/인과/과잉/반대)인지 분류해보기', encouragement: '오답 패턴을 꿰뚫으면 함정이 보여!' },
    ],
  },

  'korean-diamond-7': {
    id: 'korean-diamond-7',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 7,
    title: '변별력 문항 정복',
    cards: [
      { type: 'concept', title: '상위 5% 변별 문항', description: '변별력 문항은 상위권을 가르는 문제야.\n대부분 비문학 마지막 문제나 문학 <보기> 문제에서 나와.\n\n변별 문항의 특징:\n1) 다단계 추론 요구: A→B→C 3단계 이상\n2) 정보 통합 요구: 지문 여러 곳의 정보를 결합\n3) 적용 능력 요구: 원리를 새로운 사례에 적용\n\n정복 전략:\n- 급하지 않게 차분히 논리를 따라가기\n- 중간 추론 과정을 반드시 메모\n- "한 단계씩" 확인하며 진행\n- 5분 넘으면 표시하고 넘어가기' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '다단계 추론', description: '3단계 이상의 논리적 추론' },
        { icon: '🧩', label: '정보 통합', description: '여러 문단의 정보를 결합' },
        { icon: '🔄', label: '적용 능력', description: '원리를 새 사례에 대입' },
        { icon: '📝', label: '중간 메모', description: '추론 과정을 반드시 기록' },
      ]},
      { type: 'example', bad: { label: '기현의 방법', story: '변별 문항에서 머릿속으로만 풀었다.\n3단계 추론 중 2단계에서 헷갈려\n처음부터 다시 해야 했다. 시간 초과.' }, good: { label: '나윤의 방법', story: '여백에 추론 과정을 적었다.\n"A→B(3문단 근거) → C(5문단 근거)"\n중간 단계를 기록하니 헷갈리지 않고\n정확하게 답을 도출했다.' }},
      { type: 'ox', statement: '변별력 문항은 특별한 지식이 있어야만 풀 수 있다.', answer: false, feedback: '변별력 문항도 지문 안의 정보만으로 풀 수 있어.\n차이는 "추론 단계"가 많다는 거야.\n차분하게 단계를 밟으면 반드시 풀려!' },
      { type: 'multipleChoice', question: '다단계 추론 문제에서 가장 효과적인 풀이법은?', options: ['직감으로 빠르게 답을 고르기', '지문을 처음부터 다시 읽기', '중간 추론 과정을 메모하며 단계별로 풀기', '가장 긴 선지를 고르기'], correctIndex: 2, explanation: '중간 과정을 메모하면\n논리가 끊기지 않고 정확하게 이어져.\n특히 3단계 이상 추론에서는 메모가 필수야!' },
      { type: 'feedback', summary: '변별 문항 = 다단계 추론 + 중간 메모 + 차분함', message: '변별력 문항을 정복하면\n안정적 1등급이 완성돼!' },
      { type: 'mission', mission: '최근 수능의 가장 어려운 문제 1개를\n중간 추론 과정을 메모하며 다시 풀어보기', encouragement: '가장 어려운 문제를 정복한 자신감이 최고의 무기야!' },
    ],
  },

  'korean-diamond-8': {
    id: 'korean-diamond-8',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 8,
    title: '실전 멘탈 마스터',
    cards: [
      { type: 'concept', title: '시험장 멘탈 컨트롤', description: '최상위권은 실력이 비슷해.\n승부는 멘탈에서 갈려.\n\n시험장 멘탈 컨트롤:\n1) 어려운 지문 만나면: "나만 어려운 게 아니다"\n   → 모두에게 어렵다면 틀려도 등급에 영향 적음\n2) 시간이 부족할 때: "아는 것부터 확보하자"\n   → 남은 문제 중 풀 수 있는 것 먼저\n3) 실수를 발견했을 때: "수정하면 된다"\n   → 검토 시간에 고치면 됨\n4) 긴장될 때: 심호흡 3회 + 손 쥐었다 펴기\n\n멘탈이 무너지면 실력의 50%도 발휘 못해.\n멘탈 관리도 훈련으로 만들어지는 능력이야!' },
      { type: 'summary', keywords: [
        { icon: '🧘', label: '심호흡', description: '긴장 시 호흡으로 안정 찾기' },
        { icon: '💪', label: '자기 대화', description: '"괜찮아, 할 수 있어" 긍정 암시' },
        { icon: '🔄', label: '전환 능력', description: '막힌 문제에서 빠르게 전환' },
        { icon: '🎯', label: '과정 집중', description: '결과 걱정 대신 현재에 집중' },
      ]},
      { type: 'example', bad: { label: '준성의 방법', story: '첫 비문학 지문이 어렵자 패닉이 왔다.\n"이러다 다 틀리면 어쩌지?"\n나머지 쉬운 문제도 집중을 못 해 날렸다.' }, good: { label: '수진의 방법', story: '어려운 지문에서 3분이 지나자\n"★ 표시하고 넘어가자"\n쉬운 문제를 먼저 풀어 자신감을 회복하고\n나중에 돌아와서 차분히 풀었다.' }},
      { type: 'ox', statement: '시험 중 긴장하는 것은 실력이 부족하다는 증거이다.', answer: false, feedback: '긴장은 자연스러운 반응이야.\n1등급 학생들도 긴장해.\n차이는 긴장을 다루는 기술이 있느냐야!' },
      { type: 'multipleChoice', question: '시험 중 어려운 문제를 만났을 때 가장 좋은 대응은?', options: ['끝까지 풀려고 노력하기', '바로 포기하고 찍기', '시간 제한을 두고 도전, 안 되면 표시하고 넘어가기', '앞의 문제를 다시 확인하기'], correctIndex: 2, explanation: '시간 제한(3~5분)을 두고 도전하되\n안 되면 표시하고 넘어가는 게 최선이야.\n전체 시간을 지키면서 기회를 남기는 거지!' },
      { type: 'feedback', summary: '멘탈 = 심호흡 + 전환 능력 + 과정 집중', message: '멘탈 관리도 연습으로 완성돼.\n모의고사에서 의식적으로 훈련하자!' },
      { type: 'mission', mission: '다음 모의고사에서 멘탈 루틴을 적용해보기\n(시작 전 심호흡 3회, 막히면 ★ 표시 후 넘기기)', encouragement: '멘탈이 강한 사람이 최후의 승자야!' },
    ],
  },

  'korean-diamond-9': {
    id: 'korean-diamond-9',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 9,
    title: '파이널 시뮬레이션',
    cards: [
      { type: 'concept', title: '실전과 동일한 최종 점검', description: '수능 직전 파이널 시뮬레이션은\n실전과 완전히 동일한 조건으로 진행해.\n\n파이널 시뮬레이션 규칙:\n1) 수능 시간표와 동일하게 실시\n2) 실제 OMR 카드 사용\n3) 풀이 후 답안 마킹 시간까지 포함\n4) 연필/지우개/시계만 준비\n5) 핸드폰 완전 끄기\n\n시뮬레이션 후 분석:\n- 시간 배분은 적절했는가?\n- 멘탈 흔들린 순간은 언제였는가?\n- 실수한 문제의 원인은 무엇인가?\n- 수정할 전략 포인트는?' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '실전 환경', description: '수능과 동일한 조건으로 실시' },
        { icon: '📋', label: 'OMR 마킹', description: '답안 마킹 시간까지 포함' },
        { icon: '🔍', label: '사후 분석', description: '시뮬레이션 후 심층 분석' },
        { icon: '🔧', label: '전략 수정', description: '분석 결과로 전략 미세 조정' },
      ]},
      { type: 'example', bad: { label: '민규의 방법', story: '파이널 연습을 편한 환경에서 했다.\n실전에서 낯선 환경에 적응이 안 돼\n평소 실력의 80%만 발휘했다.' }, good: { label: '다혜의 방법', story: '도서관에서 수능 시간표 그대로 시뮬레이션했다.\nOMR 마킹, 시계 확인까지 연습.\n수능 날 "연습 때와 똑같네" 하며 편안하게 풀었다.' }},
      { type: 'ox', statement: '파이널 시뮬레이션은 1번만 해도 충분하다.', answer: false, feedback: '최소 3번은 해봐야 실전 감각이 생겨.\n시뮬레이션 때마다 전략을 미세 조정하면서\n최적의 풀이 루틴을 완성하는 거야!' },
      { type: 'multipleChoice', question: '파이널 시뮬레이션에서 반드시 포함해야 하는 것은?', options: ['실력 확인만 하면 됨', 'OMR 마킹 시간과 실전 환경 재현', '쉬운 문제만 골라 풀기', '시간 제한 없이 정확도만 확인'], correctIndex: 1, explanation: 'OMR 마킹 시간과 실전 환경을 재현해야\n진짜 실전 감각이 만들어져.\n마킹에도 2~3분이 필요하다는 걸 체험해야 해!' },
      { type: 'feedback', summary: '파이널 = 실전 환경 재현 + 사후 분석 + 전략 수정', message: '시뮬레이션을 거칠수록\n수능이 더 익숙해져!' },
      { type: 'mission', mission: '이번 주말 수능 시간표에 맞춰\n국어 파이널 시뮬레이션 1회를 실시해보기', encouragement: '실전처럼 연습한 만큼 실전에서 여유롭다!' },
    ],
  },

  'korean-diamond-10': {
    id: 'korean-diamond-10',
    chapterKey: 'korean',
    tierKey: 'diamond',
    stageNumber: 10,
    title: '수능 당일 최종 전략',
    cards: [
      { type: 'concept', title: '수능 당일 체크리스트', description: '모든 준비의 마지막, 수능 당일 전략이야.\n\n전날:\n- 새로운 공부 금지, 정리 노트만 훑어보기\n- 7~8시간 충분한 수면\n- 준비물 체크 (수험표, 신분증, 연필, 시계)\n\n당일 아침:\n- 가벼운 식사, 카페인 적당량\n- 시험장 도착 후 심호흡 3회\n\n시험 중:\n- 시작 후 1분: 전체 문제 훑어보기\n- 나의 풀이 순서와 시간 배분 확인\n- 마지막 5분: OMR 마킹 확인\n\n너는 이미 충분히 준비됐어.\n평소 연습한 대로만 하면 돼!' },
      { type: 'summary', keywords: [
        { icon: '🌙', label: '전날 관리', description: '충분한 수면 + 가볍게 정리' },
        { icon: '☀️', label: '당일 아침', description: '가벼운 식사 + 컨디션 관리' },
        { icon: '📝', label: '시험 시작', description: '1분 스캔 + 풀이 순서 확인' },
        { icon: '✅', label: '마지막 확인', description: 'OMR 마킹 최종 점검' },
      ]},
      { type: 'example', bad: { label: '성준의 방법', story: '수능 전날 밤새 공부했다.\n시험장에서 졸음이 쏟아져\n실력의 절반도 발휘하지 못했다.' }, good: { label: '지영의 방법', story: '전날 정리 노트만 30분 훑어보고 10시에 잤다.\n당일 아침 가볍게 먹고 심호흡 3번.\n시험 시작 후 평소 루틴대로 풀었다.\n연습 때와 같은 컨디션으로 최선을 다했다.' }},
      { type: 'ox', statement: '수능 전날에 벼락치기를 하면 점수가 올라간다.', answer: false, feedback: '전날 벼락치기는 수면 부족을 유발해\n오히려 집중력을 떨어뜨려.\n전날은 충분한 수면이 최고의 공부야!' },
      { type: 'multipleChoice', question: '수능 시험 시작 직후 가장 먼저 해야 할 일은?', options: ['1번부터 바로 풀기 시작', '전체 문제를 1분간 훑어보기', '가장 어려운 문제 찾기', '이름과 수험번호만 적기'], correctIndex: 1, explanation: '1분간 전체를 훑어보면\n문제 구성과 난이도를 파악할 수 있어.\n풀이 전략을 세우고 시작하는 게\n80분을 가장 효율적으로 쓰는 방법이야!' },
      { type: 'feedback', summary: '수능 당일 = 컨디션 + 루틴 + 평소대로', message: '다이아 전 과정을 완주했어! 정말 대단해!\n\n브론즈부터 다이아까지,\n습관 → 기초 → 실전 → 전략 → 완성까지\n모든 과정을 마쳤어.\n\n너는 충분히 준비됐어.\n자신감을 갖고 도전하자!' },
      { type: 'mission', mission: '나만의 "수능 당일 체크리스트"를 만들어\n벽에 붙여두기 (준비물 + 시간표 + 멘탈 루틴)', encouragement: '체크리스트가 수능 당일의 안전벨트야!\n넌 할 수 있어!' },
    ],
  },

}
