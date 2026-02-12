// 영어 영역 학습 콘텐츠 (브론즈 1~10, 실버 1~10, 골드 1~10, 플래티넘 1~10, 다이아 1~10)
import type { Stage } from './lessonData'

export const ENGLISH_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (영어 공부법 기초) 1~10
  // ═══════════════════════════════════════

  'english-bronze-1': {
    id: 'english-bronze-1',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 1,
    title: '영어 공부의 올바른 시작',
    cards: [
      { type: 'concept', title: '입력(Input)과 출력(Output)', description: '영어 실력은 두 축으로 나뉘어.\n\n입력(Input): 듣기, 읽기 → 영어를 받아들이는 능력\n출력(Output): 말하기, 쓰기 → 영어를 표현하는 능력\n\n초보자는 입력을 충분히 쌓은 뒤\n출력으로 넘어가는 게 효율적이야.\n\n언어학자 크라센(Krashen)의 "이해 가능한 입력" 이론이 바로 이거야.' },
      { type: 'summary', keywords: [
        { icon: '👂', label: '듣기·읽기', description: '영어를 받아들이는 입력(Input) 훈련' },
        { icon: '🗣️', label: '말하기·쓰기', description: '영어를 표현하는 출력(Output) 훈련' },
        { icon: '📊', label: '입력 우선', description: '충분한 입력이 쌓여야 자연스러운 출력이 나와' },
        { icon: '🎯', label: 'i+1 원칙', description: '내 수준보다 약간 어려운 자료로 공부하기' },
      ]},
      { type: 'example', bad: { label: '지민의 방법', story: '단어도 잘 모르는데 원어민에게 말하기 연습부터 했다.\n할 말이 없어서 매번 좌절하고 포기했다.' }, good: { label: '수현의 방법', story: '매일 쉬운 영어 팟캐스트 20분 듣기로 시작했다.\n3개월 뒤 귀가 트이기 시작하니 말도 자연스럽게 나왔다.' }},
      { type: 'ox', statement: '영어는 처음부터 말하기 연습을 해야 빨리 는다.', answer: false, feedback: '충분한 입력 없이 출력을 강제하면\n좌절만 커져. 듣기·읽기로 기초를 쌓은 뒤\n말하기·쓰기로 넘어가는 게 효과적이야!' },
      { type: 'multipleChoice', question: '크라센의 "이해 가능한 입력" 이론의 핵심은?', options: ['무조건 어려운 원서 읽기', '내 수준보다 약간 위(i+1)의 자료로 학습하기', '원어민과 매일 대화하기', '문법을 완벽히 외운 후 시작하기'], correctIndex: 1, explanation: '크라센의 핵심은 "이해 가능한 수준보다 살짝 높은 입력"이야.\n너무 쉬우면 성장이 없고, 너무 어려우면 학습이 안 돼.' },
      { type: 'feedback', summary: '영어 = 입력 먼저 쌓고, 출력은 자연스럽게', message: '오늘부터 쉬운 영어를 많이 듣고 읽는 것부터 시작해보자.\n입력이 넘치면 출력은 자동으로 따라와!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 팟캐스트나 유튜브 채널 하나를 찾아서\n오늘 10분 이상 들어보기', encouragement: '첫 10분이 영어 실력의 씨앗이야!' },
    ],
  },

  'english-bronze-2': {
    id: 'english-bronze-2',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 2,
    title: '영어 단어 암기의 과학',
    cards: [
      { type: 'concept', title: '에빙하우스 망각곡선과 간격 반복', description: '사람은 새로운 정보를 24시간 내에 67% 잊어버려.\n이것이 에빙하우스의 망각곡선이야.\n\n이걸 이기는 방법이 "간격 반복(Spaced Repetition)"이야.\n\n1일 후 → 3일 후 → 7일 후 → 14일 후 → 30일 후\n점점 간격을 늘려가며 복습하면\n장기 기억으로 넘어가게 돼.\n\nAnki 같은 앱이 이 원리를 활용한 거야.' },
      { type: 'summary', keywords: [
        { icon: '📉', label: '망각곡선', description: '24시간 내 67%를 잊는 뇌의 특성' },
        { icon: '🔁', label: '간격 반복', description: '점점 간격을 늘려가며 복습하는 학습법' },
        { icon: '🧠', label: '장기 기억', description: '반복 복습으로 단기→장기 기억 전환' },
        { icon: '📱', label: 'Anki/앱 활용', description: '간격 반복을 자동화하는 플래시카드 앱' },
      ]},
      { type: 'example', bad: { label: '재현의 방법', story: '단어장을 앞에서부터 100개씩 외웠다.\n다음 날 확인하면 70개를 까먹어서 매번 처음부터 다시 했다.' }, good: { label: '하은의 방법', story: 'Anki에 매일 20개씩 넣고 간격 반복으로 복습했다.\n하루 15분 투자로 한 달에 300개를 장기 기억시켰다.' }},
      { type: 'ox', statement: '영어 단어는 한 번에 많이 외우는 것이 가장 효율적이다.', answer: false, feedback: '한 번에 많이 외우면 대부분 잊어버려.\n매일 소량을 간격 반복하는 게 훨씬 효율적이야!' },
      { type: 'multipleChoice', question: '간격 반복 학습법의 복습 순서로 올바른 것은?', options: ['매일 똑같이 반복', '1일→3일→7일→14일→30일', '일주일에 한 번씩만 복습', '한 달에 한 번 몰아서 복습'], correctIndex: 1, explanation: '간격을 점점 늘려가며 복습하면\n뇌가 "이건 중요한 정보구나"라고 인식해서\n장기 기억으로 저장해!' },
      { type: 'feedback', summary: '단어 암기 = 소량 + 간격 반복 + 꾸준함', message: '하루 20개씩 간격 반복이면\n1년에 3,000개 이상을 확실히 외울 수 있어!' },
      { type: 'mission', mission: 'Anki 또는 단어 앱을 설치하고\n오늘 외울 단어 20개를 입력해서 첫 학습 시작하기', encouragement: '오늘 넣은 20개가 한 달 뒤 너의 무기가 돼!' },
    ],
  },

  'english-bronze-3': {
    id: 'english-bronze-3',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 3,
    title: '영어 듣기의 비밀: 쉐도잉',
    cards: [
      { type: 'concept', title: '쉐도잉(Shadowing) 훈련법', description: '쉐도잉은 원어민의 음성을 듣고\n0.5~1초 뒤에 따라 말하는 훈련법이야.\n\n왜 효과적일까?\n1) 발음·억양·리듬을 동시에 훈련\n2) 듣기와 말하기를 함께 향상\n3) 영어의 연음·축약을 체화\n\n일본의 영어교육학자 쿠도 타이키가\n체계화한 방법으로, 통역사들의 기본 훈련이기도 해.' },
      { type: 'summary', keywords: [
        { icon: '🎧', label: '쉐도잉', description: '듣고 바로 따라 말하는 훈련법' },
        { icon: '🔊', label: '연음·축약', description: 'want to→wanna 같은 실제 발음 체화' },
        { icon: '🎵', label: '리듬·강세', description: '영어 특유의 강약 패턴 익히기' },
        { icon: '📈', label: '듣기+말하기', description: '두 가지 실력을 동시에 향상' },
      ]},
      { type: 'example', bad: { label: '태민의 방법', story: '영어 드라마를 자막 없이 틀어놓고 멍하니 들었다.\n뭐라고 하는지 모르겠어서 결국 한글 자막을 켰다.' }, good: { label: '서연의 방법', story: 'TED 강연 1분 구간을 골라 매일 쉐도잉했다.\n처음엔 더듬었지만 일주일 뒤 자연스럽게 따라갈 수 있었다.\n듣기 시험 점수도 같이 올랐다.' }},
      { type: 'ox', statement: '쉐도잉은 영어 고급자만 할 수 있는 훈련법이다.', answer: false, feedback: '쉐도잉은 자기 수준에 맞는 자료를 고르면\n초보자도 충분히 할 수 있어.\n쉬운 동화나 느린 팟캐스트부터 시작하면 돼!' },
      { type: 'multipleChoice', question: '효과적인 쉐도잉 순서로 올바른 것은?', options: ['바로 따라 말하기 → 스크립트 확인', '스크립트 읽기 → 듣기 → 따라 말하기 → 녹음 비교', '영상 보기 → 자막 외우기 → 암기해서 말하기', '빠른 속도로 반복 듣기만 하기'], correctIndex: 1, explanation: '스크립트로 내용을 먼저 이해하고\n듣기→따라 말하기→녹음 비교 순서가 가장 효과적이야.' },
      { type: 'feedback', summary: '쉐도잉 = 듣기 + 발음 + 억양을 한 번에 훈련', message: '하루 10분 쉐도잉이면\n한 달 뒤 귀가 확 트이는 걸 느낄 거야!' },
      { type: 'mission', mission: 'TED, 유튜브, 또는 팟캐스트에서 30초~1분 구간을 골라\n스크립트를 보며 3번 쉐도잉 해보기', encouragement: '통역사들도 이 훈련으로 시작했어!' },
    ],
  },

  'english-bronze-4': {
    id: 'english-bronze-4',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 4,
    title: '영어 문법, 이렇게 공부해',
    cards: [
      { type: 'concept', title: '문법은 규칙이 아니라 패턴이다', description: '영어 문법을 "규칙 암기"로 접근하면 지루하고 효과도 낮아.\n\n더 좋은 방법은 "패턴 인식"이야.\n\n예를 들어 현재완료를 이렇게 외우지 마:\n"have + p.p.는 과거부터 현재까지..."\n\n대신 이런 예문을 통째로 익혀:\n"I have lived here for 10 years."\n"She has never been to Japan."\n\n패턴이 쌓이면 문법이 감각이 돼.' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '패턴 학습', description: '규칙 암기 대신 예문으로 패턴 익히기' },
        { icon: '📝', label: '예문 중심', description: '문법 규칙보다 실제 문장을 통째로 익혀' },
        { icon: '🔍', label: '상황 연결', description: '어떤 상황에서 쓰는지 맥락과 함께 학습' },
        { icon: '✍️', label: '직접 작문', description: '배운 패턴으로 내 문장 만들어보기' },
      ]},
      { type: 'example', bad: { label: '민수의 방법', story: '문법책을 처음부터 끝까지 정리했다.\n규칙은 외웠는데 영작할 때 하나도 안 떠올랐다.' }, good: { label: '유나의 방법', story: '"I have been ~ing" 패턴이 나오는 예문 5개를 소리 내어 읽었다.\n비슷한 상황에서 자연스럽게 "I have been studying..."이 나왔다.' }},
      { type: 'ox', statement: '영어 문법은 규칙을 먼저 완벽히 외운 뒤에 문장을 만들어야 한다.', answer: false, feedback: '예문을 통째로 익히면서 패턴을 체화하는 게\n규칙 암기보다 훨씬 효과적이야.\n문법은 감각이지 시험이 아니야!' },
      { type: 'multipleChoice', question: '영어 문법을 효과적으로 공부하는 방법은?', options: ['문법책을 처음부터 끝까지 정리하기', '규칙을 먼저 외우고 예문 찾기', '예문을 통째로 익히며 패턴 체화하기', '문법 문제집을 반복 풀기'], correctIndex: 2, explanation: '예문 속에서 패턴을 느끼는 게 핵심이야.\n규칙→예문이 아니라 예문→규칙 순서가 자연스러워.' },
      { type: 'feedback', summary: '문법 = 규칙 암기 X, 예문 패턴 체화 O', message: '오늘부터 문법은 예문으로 익히자.\n패턴이 쌓이면 영어가 감각이 돼!' },
      { type: 'mission', mission: '오늘 배운 문법 하나(현재완료, 가정법 등)를 골라\n그 문법이 들어간 예문 5개를 소리 내어 읽고\n나만의 문장 2개 만들어보기', encouragement: '5개 예문이 문법의 진짜 실력이 돼!' },
    ],
  },

  'english-bronze-5': {
    id: 'english-bronze-5',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 5,
    title: '영어 읽기: 다독과 정독',
    cards: [
      { type: 'concept', title: '다독(Extensive Reading)의 힘', description: '영어 읽기에는 두 가지 방법이 있어.\n\n다독: 쉬운 책을 많이, 빠르게 읽기\n정독: 어려운 글을 천천히 분석하며 읽기\n\n연구에 따르면 초·중급자에게는 다독이 압도적으로 효과적이야.\n\n다독의 핵심 규칙:\n1) 모르는 단어가 페이지당 2~3개 이하인 책\n2) 사전 없이 술술 읽을 수 있는 수준\n3) 재미있는 내용으로 고르기\n\n이렇게 읽으면 어휘·문법·독해가 동시에 늘어!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '다독', description: '쉬운 책을 많이, 빠르게, 재미있게 읽기' },
        { icon: '🔬', label: '정독', description: '어려운 글을 천천히 분석하며 읽기' },
        { icon: '📖', label: 'Graded Reader', description: '수준별 영어 읽기 교재 활용' },
        { icon: '🎯', label: '98% 이해', description: '페이지 대부분을 이해할 수 있는 수준으로' },
      ]},
      { type: 'example', bad: { label: '준호의 방법', story: '해리포터 원서를 사서 1페이지마다 사전을 찾았다.\n10페이지에서 포기했다. 영어 읽기가 싫어졌다.' }, good: { label: '은지의 방법', story: 'Oxford Graded Reader Level 3부터 시작했다.\n사전 없이도 술술 읽혀서 재미있었다.\n한 달에 5권을 읽으니 자연스럽게 실력이 올랐다.' }},
      { type: 'ox', statement: '영어 실력을 키우려면 어려운 원서에 도전해야 한다.', answer: false, feedback: '너무 어려운 책은 좌절만 줘.\n쉬운 책을 많이 읽는 "다독"이\n초·중급자에겐 훨씬 효과적이야!' },
      { type: 'multipleChoice', question: '다독(Extensive Reading)의 올바른 원칙은?', options: ['모르는 단어를 모두 사전에서 찾으며 읽기', '한 문장씩 번역하며 천천히 읽기', '98% 이해 가능한 쉬운 책을 재미있게 많이 읽기', '가능한 한 어려운 책에 도전하기'], correctIndex: 2, explanation: '다독의 핵심은 "쉽고 재미있는 책을 많이 읽기"야.\n자연스럽게 어휘와 문법 감각이 쌓여!' },
      { type: 'feedback', summary: '읽기 실력 = 다독으로 양을 쌓는 것이 핵심', message: '오늘부터 내 수준보다 쉬운 영어 책을 골라보자.\n재미있으면 영어가 즐거워져!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 책(Graded Reader, 웹소설, 만화 등)을\n하나 골라서 오늘 5페이지 이상 읽어보기', encouragement: '사전 없이 읽는 쾌감을 느껴보자!' },
    ],
  },

  'english-bronze-6': {
    id: 'english-bronze-6',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 6,
    title: '영어 발음과 강세의 원리',
    cards: [
      { type: 'concept', title: '영어는 강세 타이밍 언어', description: '한국어는 모든 음절을 비슷한 길이로 발음하지만\n영어는 "강세 박자(Stress-timed)" 언어야.\n\n즉, 강세 있는 음절은 길고 크게,\n강세 없는 음절은 짧고 약하게 발음해.\n\n예) ba-NA-na (바나나) → "NA"가 강하고 길어\n예) I want to GO → "GO"가 강하고 나머지는 약해\n\n이 리듬을 못 잡으면\n아무리 단어를 정확히 발음해도 원어민이 못 알아들어.' },
      { type: 'summary', keywords: [
        { icon: '🥁', label: '강세 박자', description: '영어는 강세 중심으로 리듬이 흘러' },
        { icon: '📢', label: '강세 음절', description: '중요한 음절은 길고 크고 높게' },
        { icon: '🤫', label: '약화(Reduction)', description: '약한 음절은 /ə/ 소리로 줄어들어' },
        { icon: '🔗', label: '연음·탈락', description: 'want to→wanna, going to→gonna' },
      ]},
      { type: 'example', bad: { label: '영호의 방법', story: '"아 이 원트 투 고 투 더 스토어"\n모든 단어를 또박또박 같은 세기로 말했다.\n원어민이 잘 못 알아들었다.' }, good: { label: '미나의 방법', story: '"I WANT to GO to the STORE"\n강세 단어를 강하게, 나머지를 빠르게 말했다.\n원어민이 "Your English sounds natural!"이라고 했다.' }},
      { type: 'ox', statement: '영어 발음은 모든 음절을 정확히 또박또박 말해야 좋다.', answer: false, feedback: '영어는 강세 있는 음절만 강하게, 나머지는 약하게!\n또박또박 말하면 오히려 부자연스러워 들려.' },
      { type: 'multipleChoice', question: '"banana"의 올바른 강세 위치는?', options: ['BA-na-na (첫 음절)', 'ba-NA-na (두 번째 음절)', 'ba-na-NA (마지막 음절)', '모든 음절 동일'], correctIndex: 1, explanation: 'banana는 두 번째 음절 "NA"에 강세가 와.\n영어 사전에서 강세 표시(ˈ)를 확인하는 습관을 들이자!' },
      { type: 'feedback', summary: '발음 = 강세 리듬 + 약화 + 연음이 핵심', message: '단어 하나하나보다 리듬을 잡는 게 먼저야.\n강세만 잘 잡아도 발음이 확 좋아져!' },
      { type: 'mission', mission: '좋아하는 영어 노래나 대사 한 문장을 골라\n강세 위치를 표시하고 리듬에 맞춰 5번 소리 내어 읽기', encouragement: '리듬을 타면 영어가 음악이 돼!' },
    ],
  },

  'english-bronze-7': {
    id: 'english-bronze-7',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 7,
    title: '영어 말하기: 청크로 말해',
    cards: [
      { type: 'concept', title: '청크(Chunk) 학습법', description: '영어를 잘하는 사람은 단어를 하나씩 조합하지 않아.\n"덩어리(Chunk)"로 말해.\n\n예를 들어:\n"I\'d like to~" (저는 ~하고 싶어요)\n"It depends on~" (그건 ~에 달려 있어요)\n"The thing is~" (사실은요~)\n\n이런 청크를 많이 알수록\n머릿속에서 조합하지 않고 바로 입에서 나와.\n\n연구에 따르면 원어민 발화의 약 50~60%가\n이런 고정된 청크로 이루어져 있어.' },
      { type: 'summary', keywords: [
        { icon: '🧱', label: '청크(Chunk)', description: '단어 덩어리를 통째로 익히기' },
        { icon: '⚡', label: '자동화', description: '생각 없이 바로 입에서 나오게 반복' },
        { icon: '🔗', label: '연결', description: '청크 + 청크를 이어서 긴 문장 만들기' },
        { icon: '🎬', label: '실제 상황', description: '드라마·영화에서 자주 쓰는 표현 수집' },
      ]},
      { type: 'example', bad: { label: '동현의 방법', story: '"나는... 원하다... 가다... 영화관..."\n단어를 하나씩 떠올려 조합하니\n말이 끊기고 시간이 오래 걸렸다.' }, good: { label: '소희의 방법', story: '"I\'d like to go to the movies."\n청크를 통째로 외워서 말하니\n한 번에 매끄럽게 나왔다.' }},
      { type: 'ox', statement: '영어를 잘하려면 단어를 많이 알아야지 덩어리로 외울 필요는 없다.', answer: false, feedback: '단어만 알면 조합하느라 말이 느려져.\n청크를 통째로 익히면 유창하게 말할 수 있어!' },
      { type: 'multipleChoice', question: '청크(Chunk) 학습의 가장 큰 장점은?', options: ['문법을 몰라도 되니까', '단어를 적게 외워도 되니까', '생각 없이 자동으로 입에서 나와 유창해지니까', '발음이 좋아지니까'], correctIndex: 2, explanation: '청크 학습의 핵심은 "자동화"야.\n덩어리로 익히면 머릿속 조합 없이 바로 나와서\n말하는 속도가 빨라져!' },
      { type: 'feedback', summary: '말하기 = 청크를 많이 쌓아서 자동화하기', message: '오늘부터 단어 하나 대신 청크 하나를 외워보자.\n10개만 쌓여도 대화가 달라져!' },
      { type: 'mission', mission: '오늘 영어 청크 3개를 골라 각각 5번씩 소리 내어 말하기\n예: "I\'d like to~" / "It depends on~" / "The thing is~"', encouragement: '3개의 청크가 30개의 문장을 만들어줘!' },
    ],
  },

  'english-bronze-8': {
    id: 'english-bronze-8',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 8,
    title: '영어 쓰기: 일기부터 시작',
    cards: [
      { type: 'concept', title: '영어 일기가 쓰기의 최고 훈련', description: '영어 쓰기 실력을 키우는 가장 좋은 방법은\n매일 짧은 영어 일기를 쓰는 거야.\n\n왜 효과적일까?\n1) 내 이야기라서 동기부여가 높아\n2) 매일 쓰니까 습관이 돼\n3) 배운 단어·문법을 실제로 사용해봐\n4) 틀려도 부담이 없어\n\n3줄 일기로 시작해:\n- 오늘 뭘 했는지 (What I did)\n- 어떤 기분이었는지 (How I felt)\n- 내일 뭘 할 건지 (What I will do)' },
      { type: 'summary', keywords: [
        { icon: '📔', label: '영어 일기', description: '매일 3줄 영어로 하루를 기록하기' },
        { icon: '✏️', label: '쉽게 시작', description: '완벽한 문장이 아니어도 괜찮아' },
        { icon: '🔄', label: '표현 재활용', description: '배운 단어·문법을 일기에서 써보기' },
        { icon: '📈', label: '점진적 확장', description: '3줄 → 5줄 → 10줄로 서서히 늘리기' },
      ]},
      { type: 'example', bad: { label: '현석의 방법', story: '"영어 에세이를 써야지!"\n첫 문장부터 막혀서 30분 동안 한 줄도 못 썼다.\n영어 쓰기가 두려워졌다.' }, good: { label: '지은의 방법', story: '매일 자기 전 3줄 영어 일기를 썼다.\n"Today I ate pizza. It was yummy. Tomorrow I will study math."\n3개월 뒤 자연스럽게 10줄 이상 쓰게 됐다.' }},
      { type: 'ox', statement: '영어 쓰기는 문법이 완벽해야 시작할 수 있다.', answer: false, feedback: '문법이 완벽하지 않아도 써야 실력이 늘어!\n틀리면서 배우는 게 쓰기의 핵심이야.' },
      { type: 'multipleChoice', question: '영어 쓰기를 처음 시작할 때 가장 효과적인 방법은?', options: ['영어 에세이 쓰기 연습', '매일 3줄 영어 일기 쓰기', '번역기로 한국어를 영어로 바꾸기', '영어 문법책을 다 끝내고 시작하기'], correctIndex: 1, explanation: '짧고 쉬운 영어 일기가 가장 부담 없고 효과적이야.\n매일 쓰는 습관이 실력으로 이어져!' },
      { type: 'feedback', summary: '영어 쓰기 = 매일 3줄 일기로 시작', message: '완벽하지 않아도 돼.\n오늘부터 3줄만 써보자!' },
      { type: 'mission', mission: '오늘 하루를 영어 3줄로 적어보기\n1) What I did today\n2) How I felt\n3) What I will do tomorrow', encouragement: '오늘의 3줄이 미래의 에세이가 돼!' },
    ],
  },

  'english-bronze-9': {
    id: 'english-bronze-9',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 9,
    title: '영어 환경 만들기: 몰입법',
    cards: [
      { type: 'concept', title: '영어 몰입 환경(Immersion) 만들기', description: '해외에 나가지 않아도 영어 환경을 만들 수 있어.\n\n핵심은 "일상의 언어를 영어로 바꾸기"야.\n\n1) 스마트폰 언어를 영어로 변경\n2) 유튜브·넷플릭스를 영어 자막으로\n3) SNS에서 영어 계정 팔로우\n4) 혼잣말을 영어로 (셀프 토킹)\n5) 일기·메모를 영어로\n\n하루 중 영어에 노출되는 시간이 많을수록\n뇌가 "영어가 필요한 환경"이라고 인식해서\n학습 효율이 급격히 올라가.' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '디지털 환경', description: '스마트폰·앱 언어를 영어로 전환' },
        { icon: '🎬', label: '콘텐츠 전환', description: '영상·음악·팟캐스트를 영어로' },
        { icon: '💭', label: '셀프 토킹', description: '혼자서 영어로 생각하고 말하기' },
        { icon: '⏰', label: '노출 시간', description: '하루 영어 노출 시간을 최대한 늘리기' },
      ]},
      { type: 'example', bad: { label: '성호의 방법', story: '영어 공부는 학원 1시간이 전부였다.\n나머지 23시간은 한국어만 쓰니\n배운 것도 금방 잊어버렸다.' }, good: { label: '예진의 방법', story: '폰 언어를 영어로 바꾸고, 유튜브는 영어 채널만 봤다.\n지하철에서 영어 팟캐스트를 들었다.\n따로 공부 안 해도 영어가 자연스러워졌다.' }},
      { type: 'ox', statement: '영어 환경은 해외에 나가야만 만들 수 있다.', answer: false, feedback: '스마트폰, 유튜브, 팟캐스트만으로도\n충분한 영어 몰입 환경을 만들 수 있어!' },
      { type: 'multipleChoice', question: '다음 중 영어 몰입 환경 만들기에 해당하지 않는 것은?', options: ['스마트폰 언어를 영어로 변경', '한국어 자막으로 미드 시청', '영어 팟캐스트 듣기', '혼잣말을 영어로 하기'], correctIndex: 1, explanation: '한국어 자막에 의존하면 영어 듣기 훈련이 안 돼.\n영어 자막이나 자막 없이 보는 게 몰입 환경이야!' },
      { type: 'feedback', summary: '몰입 = 일상 속 영어 노출 시간 늘리기', message: '작은 변화부터 시작해보자.\n폰 언어 하나 바꾸는 것부터!' },
      { type: 'mission', mission: '오늘 바로 실행할 수 있는 영어 환경 변경 하나를 골라 실행하기\n(폰 언어 영어로 / 유튜브 영어 채널 구독 / 셀프 토킹 5분)', encouragement: '환경을 바꾸면 습관이 바뀌고, 습관이 실력을 바꿔!' },
    ],
  },

  'english-bronze-10': {
    id: 'english-bronze-10',
    chapterKey: 'english',
    tierKey: 'bronze',
    stageNumber: 10,
    title: '나만의 영어 학습 루틴 만들기',
    cards: [
      { type: 'concept', title: '4-Skills 데일리 루틴', description: '영어의 4가지 영역을 매일 골고루 훈련하는\n루틴을 만들면 실력이 균형 있게 성장해.\n\n추천 데일리 루틴 (하루 40분):\n\n🎧 듣기 10분: 팟캐스트 쉐도잉\n📖 읽기 10분: 다독 (Graded Reader)\n✍️ 쓰기 10분: 영어 일기 3~5줄\n🗣️ 말하기 10분: 셀프 토킹 or 청크 연습\n\n매일 40분이 부담되면 20분으로 줄여도 돼.\n중요한 건 매일 하는 거야.\n작게 시작해서 습관으로 만들자!' },
      { type: 'summary', keywords: [
        { icon: '🎧', label: '듣기 10분', description: '쉐도잉 or 팟캐스트' },
        { icon: '📖', label: '읽기 10분', description: '다독 or 뉴스 기사' },
        { icon: '✍️', label: '쓰기 10분', description: '영어 일기 or 요약 쓰기' },
        { icon: '🗣️', label: '말하기 10분', description: '셀프 토킹 or 청크 연습' },
      ]},
      { type: 'example', bad: { label: '진우의 방법', story: '월요일에 문법 2시간, 수요일에 단어 2시간...\n불규칙하게 몰아서 공부하니 실력이 늘지 않았다.' }, good: { label: '나연의 방법', story: '매일 아침 40분 루틴을 정했다.\n듣기·읽기·쓰기·말하기를 10분씩.\n3개월 뒤 토익 점수가 150점이나 올랐다.' }},
      { type: 'ox', statement: '영어는 하루에 한 가지 영역만 집중해서 공부하는 게 효과적이다.', answer: false, feedback: '4가지 영역을 매일 조금씩 하는 게\n한 가지를 몰아서 하는 것보다 훨씬 효과적이야.\n뇌가 다양한 방식으로 영어를 처리하니까!' },
      { type: 'multipleChoice', question: '효과적인 영어 학습 루틴의 핵심 원칙은?', options: ['주말에 몰아서 많이 하기', '한 가지 영역만 파고들기', '매일 4영역(듣기·읽기·쓰기·말하기)을 균형 있게', '기분 좋을 때만 하기'], correctIndex: 2, explanation: '매일 4영역을 골고루 훈련하면\n실력이 균형 있게, 꾸준히 성장해!' },
      { type: 'feedback', summary: '영어 루틴 = 매일 40분, 4영역 균형 훈련', message: '지금까지 배운 모든 것을 루틴으로 만들자.\n매일의 작은 루틴이 큰 변화를 만들어!' },
      { type: 'mission', mission: '나만의 영어 학습 루틴표를 만들어보기\n시간대, 각 영역별 구체적인 활동, 소요 시간을 정해서\n내일부터 바로 실행할 수 있게 적기', encouragement: '루틴이 곧 실력이야. 오늘 만든 루틴이 너를 바꿔줄 거야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 실버 (중급 영어 전략) 1~10
  // ═══════════════════════════════════════

  'english-silver-1': {
    id: 'english-silver-1', chapterKey: 'english', tierKey: 'silver', stageNumber: 1,
    title: '어원으로 단어 폭발시키기',
    cards: [
      { type: 'concept', title: '어원(Root) 학습법', description: '영어 단어의 60% 이상이 라틴어·그리스어 어원에서 왔어.\n\n어원을 알면 처음 보는 단어도 뜻을 유추할 수 있어.\n\n예) port = 나르다\ntransport (trans+port) = 건너서 나르다 = 운송\nexport (ex+port) = 밖으로 나르다 = 수출\nimport (im+port) = 안으로 나르다 = 수입\n\n어원 하나로 10개 이상의 단어를 연결할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🌳', label: '어원(Root)', description: '단어의 핵심 의미를 담은 뿌리' },
        { icon: '🔗', label: '접두사', description: 'un-, re-, pre- 등 앞에 붙는 의미 조각' },
        { icon: '🧩', label: '접미사', description: '-tion, -ment, -able 등 뒤에 붙는 조각' },
        { icon: '💡', label: '유추 능력', description: '처음 보는 단어도 뜻을 추측할 수 있어' },
      ]},
      { type: 'example', bad: { label: '현우의 방법', story: 'transport, export, import를 각각 따로 외웠다.\n비슷한 단어가 나오면 항상 헷갈렸다.' }, good: { label: '소연의 방법', story: 'port=나르다를 먼저 알고, 접두사만 바꿔 연결했다.\ntrans(건너)+port, ex(밖)+port, im(안)+port\n한 번에 3개를 확실히 구별했다.' }},
      { type: 'ox', statement: '영어 단어는 하나하나 개별적으로 외워야 한다.', answer: false, feedback: '어원을 알면 단어들이 가족처럼 연결돼.\n하나를 알면 열 개를 유추할 수 있어!' },
      { type: 'multipleChoice', question: '"incredible"의 뜻을 어원으로 분석하면? (in=아닌, cred=믿다, ible=할 수 있는)', options: ['믿을 수 있는', '믿을 수 없는', '다시 믿는', '함께 믿는'], correctIndex: 1, explanation: 'in(아닌) + cred(믿다) + ible(할 수 있는)\n= 믿을 수 없는 = 놀라운, 대단한!' },
      { type: 'feedback', summary: '어원 = 단어의 뿌리를 알면 가지가 보인다', message: '어원 10개만 알면 100개 이상의 단어가 연결돼!' },
      { type: 'mission', mission: '오늘 어원 하나(port, duct, spect 등)를 골라\n관련 단어 5개를 찾아 어원 분해해보기', encouragement: '뿌리를 알면 숲이 보여!' },
    ],
  },

  'english-silver-2': {
    id: 'english-silver-2', chapterKey: 'english', tierKey: 'silver', stageNumber: 2,
    title: '콜로케이션: 단어의 짝꿍',
    cards: [
      { type: 'concept', title: '콜로케이션(Collocation)이란?', description: '영어에는 자주 함께 쓰이는 단어 조합이 있어.\n이걸 콜로케이션(Collocation)이라고 해.\n\n예) make a decision (O) / do a decision (X)\n예) heavy rain (O) / strong rain (X)\n예) fast food (O) / quick food (X)\n\n문법적으로 맞아도 원어민이 쓰지 않는 조합이 있어.\n콜로케이션을 알면 자연스러운 영어가 돼!' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '콜로케이션', description: '자주 함께 쓰이는 단어 조합' },
        { icon: '✅', label: 'make/do 구별', description: 'make a mistake, do homework 등' },
        { icon: '🌧️', label: '형용사+명사', description: 'heavy rain, strong wind 등 자연스러운 짝' },
        { icon: '📖', label: '사전 활용', description: '콜로케이션 사전으로 자연스러운 조합 확인' },
      ]},
      { type: 'example', bad: { label: '태준의 방법', story: '"I did a big mistake yesterday."\n문법은 맞지만 원어민이 들으면 어색했다.' }, good: { label: '민서의 방법', story: '"I made a big mistake yesterday."\nmake a mistake라는 콜로케이션을 알고 있어서\n자연스러운 문장을 만들었다.' }},
      { type: 'ox', statement: '문법만 맞으면 어떤 단어 조합이든 자연스러운 영어이다.', answer: false, feedback: '문법이 맞아도 콜로케이션이 틀리면 부자연스러워.\ndo a mistake가 아니라 make a mistake야!' },
      { type: 'multipleChoice', question: '다음 중 올바른 콜로케이션은?', options: ['do a decision', 'make a decision', 'take a decision', 'have a decision'], correctIndex: 1, explanation: 'make a decision이 가장 일반적인 영어 콜로케이션이야.\n영국 영어에서는 take a decision도 쓰지만 make가 기본!' },
      { type: 'feedback', summary: '콜로케이션 = 자연스러운 영어의 비밀', message: '단어를 혼자가 아니라 짝꿍과 함께 외우자!' },
      { type: 'mission', mission: 'make와 do가 들어가는 콜로케이션을 각각 5개씩 찾아 정리하기\n예) make: a mistake, a decision / do: homework, exercise', encouragement: '짝꿍을 아는 게 진짜 어휘력이야!' },
    ],
  },

  'english-silver-3': {
    id: 'english-silver-3', chapterKey: 'english', tierKey: 'silver', stageNumber: 3,
    title: '영어 뉴스로 독해력 키우기',
    cards: [
      { type: 'concept', title: '뉴스 영어 읽기 전략', description: '영어 뉴스는 독해력을 키우는 최고의 자료야.\n\n뉴스 기사의 구조를 알면 읽기가 쉬워져:\n1) 헤드라인: 핵심 내용 요약 (be동사, 관사 생략)\n2) 리드문: 첫 1~2문장에 육하원칙(5W1H)\n3) 본문: 세부 내용을 중요도 순서로\n\n초보자 추천 매체:\n- BBC Learning English (쉬운 영어)\n- VOA Learning English (느린 속도)\n- News in Levels (수준별 같은 뉴스)' },
      { type: 'summary', keywords: [
        { icon: '📰', label: '역피라미드 구조', description: '중요한 내용이 앞에, 세부사항이 뒤에' },
        { icon: '📋', label: '5W1H', description: 'Who, What, When, Where, Why, How' },
        { icon: '📊', label: '수준별 매체', description: 'BBC, VOA 등 학습용 뉴스부터 시작' },
        { icon: '📝', label: '요약 연습', description: '기사를 읽고 한 줄로 요약하기' },
      ]},
      { type: 'example', bad: { label: '성진의 방법', story: 'CNN 기사를 읽었는데 모르는 단어 투성이였다.\n한 기사 읽는 데 1시간이 걸려서 포기했다.' }, good: { label: '유리의 방법', story: 'News in Levels에서 Level 2 기사를 매일 하나씩 읽었다.\n리드문에서 핵심을 파악하고, 모르는 단어 3개만 정리했다.\n한 달 뒤 BBC 기사도 읽을 수 있게 됐다.' }},
      { type: 'ox', statement: '영어 뉴스는 고급자만 읽을 수 있다.', answer: false, feedback: 'BBC Learning English, VOA 같은 학습용 뉴스는\n초·중급자도 충분히 읽을 수 있어!' },
      { type: 'multipleChoice', question: '영어 뉴스 기사에서 핵심 내용을 가장 빨리 파악하는 방법은?', options: ['기사 전체를 꼼꼼히 읽기', '헤드라인과 리드문(첫 1~2문장)을 먼저 읽기', '마지막 문단을 먼저 읽기', '사진 설명만 읽기'], correctIndex: 1, explanation: '뉴스는 역피라미드 구조라서\n헤드라인과 리드문에 핵심이 다 있어!' },
      { type: 'feedback', summary: '뉴스 읽기 = 헤드라인·리드문 먼저 + 수준별 매체', message: '매일 기사 하나가 독해력의 기초 체력이 돼!' },
      { type: 'mission', mission: 'BBC Learning English 또는 News in Levels에서\n기사 하나를 골라 5W1H를 찾아 정리하기', encouragement: '오늘의 기사 하나가 세상과 영어를 동시에 넓혀줘!' },
    ],
  },

  'english-silver-4': {
    id: 'english-silver-4', chapterKey: 'english', tierKey: 'silver', stageNumber: 4,
    title: '리스닝: 딕테이션 훈련',
    cards: [
      { type: 'concept', title: '딕테이션(Dictation)이란?', description: '딕테이션은 영어를 듣고 받아쓰는 훈련이야.\n\n왜 효과적일까?\n1) 정확히 듣지 못하는 부분을 발견할 수 있어\n2) 연음·축약·탈락을 인식하게 돼\n3) 듣기+쓰기+문법을 동시에 훈련\n\n딕테이션 순서:\n① 전체 듣기 (대략적 이해)\n② 문장 단위로 끊어서 받아쓰기\n③ 다시 들으며 수정\n④ 스크립트와 비교\n⑤ 틀린 부분 분석 및 반복' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: '딕테이션', description: '듣고 받아쓰는 정밀 듣기 훈련' },
        { icon: '👂', label: '취약점 발견', description: '못 듣는 부분을 정확히 파악' },
        { icon: '🔗', label: '연음 인식', description: 'kind of→kinda 같은 연결을 체화' },
        { icon: '📊', label: '오답 분석', description: '틀린 부분을 분석해서 패턴 파악' },
      ]},
      { type: 'example', bad: { label: '재영의 방법', story: '듣기 문제를 많이 풀었지만 맞고 틀리고만 확인했다.\n왜 틀렸는지 분석하지 않으니 같은 유형에서 계속 틀렸다.' }, good: { label: '하린의 방법', story: '매일 1분 분량을 딕테이션 했다.\n"I should have"를 "I should of"로 적은 걸 발견하고\nhave의 약형 /əv/ 발음을 집중 연습했다.' }},
      { type: 'ox', statement: '딕테이션은 모든 단어를 100% 맞춰야 효과가 있다.', answer: false, feedback: '틀린 부분을 발견하고 분석하는 것이 딕테이션의 핵심이야.\n틀려야 배울 수 있어!' },
      { type: 'multipleChoice', question: '딕테이션의 가장 큰 효과는?', options: ['쓰기 속도 향상', '어휘력 증가', '못 듣는 부분을 정확히 파악하고 교정', '발음 교정'], correctIndex: 2, explanation: '딕테이션의 핵심 가치는 "내가 뭘 못 듣는지" 정확히 아는 거야.\n문제를 알아야 고칠 수 있으니까!' },
      { type: 'feedback', summary: '딕테이션 = 듣기 취약점을 정밀 타격', message: '매일 1분 딕테이션이면 한 달 뒤 귀가 달라져!' },
      { type: 'mission', mission: '영어 음원 30초를 골라 딕테이션 해보기\n받아쓴 후 스크립트와 비교하고 틀린 부분 3개 분석하기', encouragement: '틀린 곳이 곧 성장 포인트야!' },
    ],
  },

  'english-silver-5': {
    id: 'english-silver-5', chapterKey: 'english', tierKey: 'silver', stageNumber: 5,
    title: '영영사전 활용법',
    cards: [
      { type: 'concept', title: '왜 영영사전을 써야 할까?', description: '영한사전은 "apple = 사과"로 1:1 대응시키지만\n영영사전은 "a round fruit with red or green skin"처럼\n영어로 개념을 설명해줘.\n\n영영사전의 장점:\n1) 영어로 생각하는 습관이 생겨\n2) 뉘앙스 차이를 정확히 알 수 있어\n3) 새로운 표현을 자연스럽게 익혀\n\nsee vs watch vs look의 차이,\nbig vs large vs huge의 뉘앙스를\n영한사전으로는 절대 알 수 없어.' },
      { type: 'summary', keywords: [
        { icon: '📕', label: '영영사전', description: '영어를 영어로 이해하는 훈련' },
        { icon: '🎨', label: '뉘앑스', description: '비슷한 단어의 미묘한 차이를 구별' },
        { icon: '💭', label: '영어 사고', description: '한국어 번역 없이 바로 이해하기' },
        { icon: '📱', label: '추천 사전', description: 'Longman, Oxford, Cambridge 등' },
      ]},
      { type: 'example', bad: { label: '동호의 방법', story: '"see = 보다, watch = 보다, look = 보다"\n셋 다 같은 뜻이라고 생각하고 아무거나 썼다.\n시험에서 계속 틀렸다.' }, good: { label: '수빈의 방법', story: 'Longman 영영사전에서 확인했다.\nsee: notice with eyes (자연스럽게 눈에 들어옴)\nwatch: look at for a period (의도적으로 지켜봄)\nlook: direct your eyes (시선을 돌림)\n정확하게 구별해서 쓸 수 있게 됐다.' }},
      { type: 'ox', statement: '초급자는 영영사전을 쓸 수 없다.', answer: false, feedback: 'Longman이나 Oxford Learner\'s는 쉬운 영어로 설명해서\n초·중급자도 충분히 사용할 수 있어!' },
      { type: 'multipleChoice', question: '영영사전의 가장 큰 장점은?', options: ['빠르게 뜻을 찾을 수 있다', '단어의 뉘앙스와 사용법을 정확히 알 수 있다', '한국어 해석이 자세하다', '발음 기호가 정확하다'], correctIndex: 1, explanation: '영영사전은 단어의 뉘앙스, 사용 맥락, 예문을\n영어로 보여줘서 정확한 의미를 알 수 있어!' },
      { type: 'feedback', summary: '영영사전 = 영어를 영어로 이해하는 열쇠', message: '오늘부터 모르는 단어를 영영사전으로 먼저 찾아보자!' },
      { type: 'mission', mission: '비슷한 단어 한 쌍(see/watch, big/large, say/tell 등)을\n영영사전에서 찾아 뉘앙스 차이를 정리해보기', encouragement: '뉘앙스를 아는 게 진짜 영어 실력이야!' },
    ],
  },

  'english-silver-6': {
    id: 'english-silver-6', chapterKey: 'english', tierKey: 'silver', stageNumber: 6,
    title: '영어 시제 완전 정복',
    cards: [
      { type: 'concept', title: '12시제를 3x4로 정리하기', description: '영어 시제는 복잡해 보이지만\n3가지 시간 × 4가지 관점으로 정리하면 쉬워.\n\n시간: 과거 / 현재 / 미래\n관점: 단순 / 진행 / 완료 / 완료진행\n\n핵심은 각 시제가 "어떤 상황"에서 쓰이는지야.\n\n현재완료 vs 과거:\nI lost my key. (잃어버렸다 - 과거 사실)\nI have lost my key. (잃어버렸다 - 지금도 없다)\n\n상황의 차이를 느끼면 시제가 자연스러워져!' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '3가지 시간', description: '과거, 현재, 미래' },
        { icon: '🔍', label: '4가지 관점', description: '단순, 진행, 완료, 완료진행' },
        { icon: '🎯', label: '상황 중심', description: '규칙이 아니라 어떤 상황에서 쓰는지' },
        { icon: '📊', label: '3x4 표', description: '12시제를 한 눈에 정리하기' },
      ]},
      { type: 'example', bad: { label: '지훈의 방법', story: '시제 공식을 외웠다.\n"현재완료 = have + p.p."\n하지만 언제 써야 하는지 몰라서 매번 틀렸다.' }, good: { label: '예나의 방법', story: '각 시제별 대표 상황을 하나씩 외웠다.\n"I have lived here since 2020."\n"2020년부터 지금까지 살고 있다"는 현재완료!\n상황으로 기억하니 자연스럽게 골라 쓸 수 있었다.' }},
      { type: 'ox', statement: '현재완료(have p.p.)와 과거시제(V-ed)는 같은 의미다.', answer: false, feedback: '과거시제는 과거의 사실만 말하지만\n현재완료는 과거의 일이 현재까지 영향을 미칠 때 써.\n"I lost my key"와 "I have lost my key"는 달라!' },
      { type: 'multipleChoice', question: '"나는 3년째 서울에 살고 있다"를 영어로 옮기면?', options: ['I lived in Seoul for 3 years.', 'I have lived in Seoul for 3 years.', 'I am living in Seoul for 3 years.', 'I was living in Seoul for 3 years.'], correctIndex: 1, explanation: '과거부터 현재까지 계속 진행 중인 상황은\n현재완료 have lived를 써야 해!' },
      { type: 'feedback', summary: '시제 = 공식 암기 X, 상황별 사용 O', message: '12시제를 표로 정리하고 각각 대표 예문 하나씩 외우자!' },
      { type: 'mission', mission: '12시제 표를 직접 그리고\n각 시제마다 대표 예문 하나씩 적어보기', encouragement: '이 표 하나가 시제의 모든 것을 정리해줘!' },
    ],
  },

  'english-silver-7': {
    id: 'english-silver-7', chapterKey: 'english', tierKey: 'silver', stageNumber: 7,
    title: '리스닝 전략: 예측하며 듣기',
    cards: [
      { type: 'concept', title: 'Top-Down 리스닝', description: '듣기를 잘하는 사람은 모든 단어를 듣는 게 아니라\n"예측하며" 들어.\n\nTop-Down 리스닝 전략:\n1) 상황·맥락으로 내용 예측\n2) 키워드만 집중해서 포착\n3) 모르는 단어는 넘기고 전체 흐름 파악\n\n예) 공항 안내 방송 → 출발·도착·게이트·지연 관련 예측\n\n반대로 Bottom-Up은 단어 하나하나를 정확히 듣는 거야.\n두 전략을 상황에 맞게 번갈아 쓰는 게 핵심!' },
      { type: 'summary', keywords: [
        { icon: '⬇️', label: 'Top-Down', description: '맥락과 배경지식으로 예측하며 듣기' },
        { icon: '⬆️', label: 'Bottom-Up', description: '단어·소리 하나하나를 정확히 듣기' },
        { icon: '🔑', label: '키워드 포착', description: '핵심 단어만 잡아서 전체 의미 파악' },
        { icon: '🧠', label: '예측 능력', description: '상황에서 나올 내용을 미리 예상' },
      ]},
      { type: 'example', bad: { label: '현석의 방법', story: '모든 단어를 다 들으려고 집중했다.\n한 단어를 못 알아들으면 머리가 멈추고\n그 뒤 내용도 전부 놓쳤다.' }, good: { label: '나영의 방법', story: '문제를 먼저 읽고 어떤 정보가 나올지 예측했다.\n키워드만 집중해서 들으니\n모르는 단어가 있어도 전체 내용을 파악할 수 있었다.' }},
      { type: 'ox', statement: '듣기를 잘하려면 모든 단어를 하나도 빠짐없이 들어야 한다.', answer: false, feedback: '원어민도 모든 단어를 다 듣지 않아.\n맥락과 키워드로 전체 의미를 파악하는 게 자연스러운 듣기야!' },
      { type: 'multipleChoice', question: 'Top-Down 리스닝의 핵심은?', options: ['모든 단어를 정확히 받아쓰기', '문맥과 상황으로 내용을 예측하며 듣기', '최대한 빠른 속도로 듣기', '문법 구조를 분석하며 듣기'], correctIndex: 1, explanation: 'Top-Down은 큰 그림을 먼저 잡는 거야.\n맥락으로 예측하면 세부 내용도 쉽게 이해할 수 있어!' },
      { type: 'feedback', summary: '듣기 = 예측 + 키워드 포착 + 전체 흐름 파악', message: '예측하며 듣는 습관이 듣기 실력을 완전히 바꿔줘!' },
      { type: 'mission', mission: '영어 음원을 듣기 전에 주제를 보고\n나올 키워드 5개를 예측해 적은 뒤 들어보기\n실제로 몇 개가 나왔는지 확인하기', encouragement: '예측이 맞을수록 듣기가 쉬워져!' },
    ],
  },

  'english-silver-8': {
    id: 'english-silver-8', chapterKey: 'english', tierKey: 'silver', stageNumber: 8,
    title: '패러프레이징: 바꿔 말하기',
    cards: [
      { type: 'concept', title: '패러프레이징(Paraphrasing)의 힘', description: '패러프레이징은 같은 내용을 다른 표현으로 바꿔 말하는 거야.\n\n이 능력이 중요한 이유:\n1) 단어가 떠오르지 않을 때 돌려서 설명 가능\n2) 표현의 폭이 넓어져\n3) 시험에서 핵심 스킬 (동의어 문제, 요약 등)\n\n예) "She is very smart."\n→ "She is incredibly intelligent."\n→ "She has a brilliant mind."\n→ "She picks things up really fast."\n\n같은 의미를 3가지 이상으로 말할 수 있으면\n영어 실력이 한 단계 올라간 거야.' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '바꿔 말하기', description: '같은 의미를 다른 표현으로' },
        { icon: '💬', label: '돌려 설명', description: '단어가 안 떠올라도 설명으로 전달' },
        { icon: '📈', label: '표현력 확장', description: '한 가지를 여러 가지로 말하기' },
        { icon: '🎯', label: '시험 핵심', description: '동의어, 요약, 영작 문제의 기본 스킬' },
      ]},
      { type: 'example', bad: { label: '시현의 방법', story: '"그건... 뭐라고 하지..."\n영어 단어가 떠오르지 않아서 말을 멈추고 포기했다.' }, good: { label: '윤서의 방법', story: '"refrigerator"가 떠오르지 않았지만\n"the big cold box in the kitchen"이라고 설명했다.\n대화가 끊기지 않고 자연스럽게 이어졌다.' }},
      { type: 'ox', statement: '영어를 잘하려면 정확한 단어를 항상 사용해야 한다.', answer: false, feedback: '돌려서 설명하는 능력도 영어 실력이야.\n원어민도 단어가 안 떠오르면 패러프레이징 해!' },
      { type: 'multipleChoice', question: '"He ran very fast"를 패러프레이징한 것은?', options: ['He ran very fast.', 'He sprinted at full speed.', 'He walked quickly.', 'He was slow.'], correctIndex: 1, explanation: '"ran very fast"를 "sprinted at full speed"로 바꾸면\n같은 의미를 더 풍부하게 표현할 수 있어!' },
      { type: 'feedback', summary: '패러프레이징 = 한 가지를 여러 방법으로 말하기', message: '표현의 폭이 넓어지면 영어가 자유로워져!' },
      { type: 'mission', mission: '아래 문장을 3가지 다른 방식으로 바꿔 써보기\n"The weather is very cold today."', encouragement: '바꿔 말하는 연습이 진짜 표현력을 키워!' },
    ],
  },

  'english-silver-9': {
    id: 'english-silver-9', chapterKey: 'english', tierKey: 'silver', stageNumber: 9,
    title: '영어 회화: 필러와 전환 표현',
    cards: [
      { type: 'concept', title: '필러(Filler)와 전환 표현', description: '원어민은 대화할 때 "빈 시간"을 채우는 표현을 써.\n이걸 필러(Filler)라고 해.\n\n자연스러운 필러:\n- Well, ... / You know, ...\n- I mean, ... / Let me think...\n- Actually, ... / Basically, ...\n\n전환 표현:\n- By the way, ... (그건 그렇고)\n- Speaking of which, ... (말이 나온 김에)\n- Anyway, ... (어쨌든)\n\n이 표현들을 자연스럽게 쓰면\n말하기가 훨씬 유창해 보여!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '필러(Filler)', description: '생각할 시간을 벌어주는 자연스러운 표현' },
        { icon: '🔀', label: '전환 표현', description: '화제를 바꾸거나 정리하는 표현' },
        { icon: '🗣️', label: '유창성', description: '대화 흐름이 끊기지 않게 연결' },
        { icon: '⚠️', label: '과용 주의', description: '너무 많이 쓰면 오히려 산만해져' },
      ]},
      { type: 'example', bad: { label: '재민의 방법', story: '"What do you think about..."\n"음... 어... 그게..."\n한국어 필러가 나와서 어색해졌다.' }, good: { label: '하나의 방법', story: '"What do you think about..."\n"Well, let me think... Actually, I believe..."\n영어 필러를 자연스럽게 써서 대화가 매끄러웠다.' }},
      { type: 'ox', statement: '영어로 말할 때 "um", "well" 같은 표현은 실력이 부족한 것이다.', answer: false, feedback: '원어민도 well, you know, I mean을 자주 써.\n적절한 필러 사용은 자연스러운 대화의 일부야!' },
      { type: 'multipleChoice', question: '대화 중 화제를 바꿀 때 사용하는 표현은?', options: ['I mean...', 'By the way...', 'You know...', 'Let me think...'], correctIndex: 1, explanation: '"By the way(그건 그렇고)"는\n자연스럽게 새로운 화제로 넘어가는 전환 표현이야.' },
      { type: 'feedback', summary: '필러와 전환 = 유창한 대화의 윤활유', message: '필러 5개만 익숙해져도 대화가 완전히 달라져!' },
      { type: 'mission', mission: '오늘 영어로 말할 때 필러 3개를 의식적으로 써보기\nWell, / Actually, / I mean, 을 각각 2번 이상 사용하기', encouragement: '필러가 자연스러워지면 원어민처럼 들려!' },
    ],
  },

  'english-silver-10': {
    id: 'english-silver-10', chapterKey: 'english', tierKey: 'silver', stageNumber: 10,
    title: '오답 노트로 약점 공략',
    cards: [
      { type: 'concept', title: '영어 오답 노트 작성법', description: '같은 유형에서 반복해서 틀린다면\n오답 노트가 필요해.\n\n효과적인 오답 노트 구성:\n1) 문제/상황: 어떤 문제를 틀렸는지\n2) 내 답 vs 정답: 뭘 선택했고 뭐가 맞았는지\n3) 틀린 이유: 왜 틀렸는지 분석\n4) 핵심 규칙: 관련 문법/어휘 정리\n5) 유사 예문: 같은 패턴의 예문 추가\n\n오답 노트를 시험 전에 복습하면\n같은 실수를 반복하지 않게 돼.' },
      { type: 'summary', keywords: [
        { icon: '📓', label: '오답 노트', description: '틀린 문제를 체계적으로 정리' },
        { icon: '🔍', label: '원인 분석', description: '왜 틀렸는지 근본 원인 파악' },
        { icon: '🔁', label: '패턴 발견', description: '반복되는 취약 유형 찾기' },
        { icon: '📈', label: '시험 전 복습', description: '약점을 집중 보강하는 효율적 방법' },
      ]},
      { type: 'example', bad: { label: '우진의 방법', story: '틀린 문제의 정답만 확인하고 넘어갔다.\n다음 시험에서 같은 유형을 또 틀렸다.\n"이거 지난번에도 틀렸는데..."를 반복했다.' }, good: { label: '채원의 방법', story: '틀린 문제마다 오답 노트에 원인을 적었다.\n"현재완료 vs 과거 구별에서 자주 틀림" 패턴을 발견하고\n집중 복습했더니 그 유형은 다시 안 틀렸다.' }},
      { type: 'ox', statement: '오답 노트는 틀린 답만 기록하면 된다.', answer: false, feedback: '틀린 답뿐 아니라 "왜 틀렸는지" 원인을 분석하고\n관련 규칙과 유사 예문까지 정리해야 효과적이야!' },
      { type: 'multipleChoice', question: '오답 노트의 가장 중요한 항목은?', options: ['문제 번호', '정답 기록', '틀린 원인 분석', '날짜 기록'], correctIndex: 2, explanation: '틀린 원인을 분석해야 같은 실수를 반복하지 않아.\n"왜?"가 오답 노트의 핵심이야!' },
      { type: 'feedback', summary: '오답 노트 = 같은 실수를 두 번 하지 않는 무기', message: '실수에서 배우는 사람이 가장 빨리 성장해!' },
      { type: 'mission', mission: '최근 틀린 영어 문제 3개를 골라\n오답 노트를 작성해보기 (틀린 이유 + 핵심 규칙 + 유사 예문)', encouragement: '오늘의 오답 노트가 내일의 정답을 만들어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 골드 (고급 영어 스킬) 1~10
  // ═══════════════════════════════════════

  'english-gold-1': {
    id: 'english-gold-1', chapterKey: 'english', tierKey: 'gold', stageNumber: 1,
    title: '영어 토론과 논리적 말하기',
    cards: [
      { type: 'concept', title: 'PREP 구조로 논리적 말하기', description: '영어로 의견을 말할 때\nPREP 구조를 쓰면 논리적으로 들려.\n\nP - Point (주장): "I think remote work is better."\nR - Reason (이유): "Because it saves commuting time."\nE - Example (예시): "For example, I save 2 hours daily."\nP - Point (재강조): "That\'s why I prefer remote work."\n\n이 구조를 쓰면 영어 면접, 토론, 발표에서\n설득력 있게 말할 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '💬', label: 'Point', description: '핵심 주장을 먼저 말하기' },
        { icon: '📋', label: 'Reason', description: '이유를 논리적으로 뒷받침' },
        { icon: '📖', label: 'Example', description: '구체적 예시로 설득력 높이기' },
        { icon: '🎯', label: 'Point 반복', description: '주장을 다시 강조하며 마무리' },
      ]},
      { type: 'example', bad: { label: '성호의 방법', story: '"음... 재택근무가... 좋은 것 같아요... 왜냐하면..."\n이유와 주장이 뒤섞여서 무슨 말인지 알 수 없었다.' }, good: { label: '민지의 방법', story: '"I believe remote work is more productive.\nBecause employees can focus without office distractions.\nFor instance, a Stanford study showed 13% higher productivity.\nSo, remote work clearly benefits both companies and workers."\nPREP 구조로 명확하고 설득력 있게 전달했다.' }},
      { type: 'ox', statement: '영어로 의견을 말할 때 이유를 먼저 말하고 주장은 나중에 해야 한다.', answer: false, feedback: '영어는 주장(Point)을 먼저, 이유(Reason)를 나중에!\n결론이 앞에 오는 두괄식이 영어 논리의 기본이야.' },
      { type: 'multipleChoice', question: 'PREP 구조의 올바른 순서는?', options: ['예시→이유→주장→재강조', '이유→주장→예시→마무리', '주장→이유→예시→주장 재강조', '예시→주장→이유→마무리'], correctIndex: 2, explanation: 'Point(주장)→Reason(이유)→Example(예시)→Point(재강조)\n이 순서가 PREP 구조야!' },
      { type: 'feedback', summary: 'PREP = 주장→이유→예시→재강조', message: '이 구조 하나만 익히면 어떤 주제든 논리적으로 말할 수 있어!' },
      { type: 'mission', mission: '아무 주제나 하나 골라 PREP 구조로 영어 4문장 작성하기\n예) "학교 급식" / "SNS 사용" / "독서의 중요성"', encouragement: 'PREP는 영어 말하기의 만능 프레임이야!' },
    ],
  },

  'english-gold-2': {
    id: 'english-gold-2', chapterKey: 'english', tierKey: 'gold', stageNumber: 2,
    title: '구동사(Phrasal Verbs) 마스터',
    cards: [
      { type: 'concept', title: '구동사란?', description: '구동사(Phrasal Verb)는 동사 + 전치사/부사 조합으로\n새로운 뜻이 되는 표현이야.\n\n예) give up = 포기하다 (give + up)\n예) look forward to = 기대하다\n예) figure out = 알아내다\n예) come up with = 생각해내다\n\n원어민은 격식체보다 구동사를 훨씬 많이 써.\ndiscover보다 find out,\ntolerate보다 put up with을 선호해.\n\n구동사를 알아야 원어민의 일상 대화를 이해할 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '구동사', description: '동사 + 전치사/부사 = 새로운 의미' },
        { icon: '🗣️', label: '일상 영어', description: '원어민이 실제로 가장 많이 쓰는 표현' },
        { icon: '📊', label: '빈도 학습', description: '자주 쓰이는 것부터 우선 학습' },
        { icon: '🎬', label: '드라마 활용', description: '영화·드라마에서 구동사 수집하기' },
      ]},
      { type: 'example', bad: { label: '승우의 방법', story: '"I will discover the answer."\n문법적으로 맞지만 일상에서는 어색하게 들렸다.' }, good: { label: '다은의 방법', story: '"I will figure out the answer."\n구동사를 써서 자연스러운 표현을 했다.\n원어민 친구가 "You sound natural!"이라고 했다.' }},
      { type: 'ox', statement: '구동사는 비격식적이라 시험에서는 쓸 필요가 없다.', answer: false, feedback: '토익, 수능, 토플 등 주요 시험에서도 구동사 문제가 나와.\n일상 회화는 물론 시험에서도 필수야!' },
      { type: 'multipleChoice', question: '"I can\'t put up with this noise."에서 put up with의 뜻은?', options: ['올려놓다', '참다/견디다', '정리하다', '포기하다'], correctIndex: 1, explanation: 'put up with = 참다, 견디다\ntolerate와 같은 뜻이지만 더 자연스러운 일상 표현이야.' },
      { type: 'feedback', summary: '구동사 = 원어민 일상 영어의 핵심', message: '구동사 50개만 알면 일상 대화의 절반을 커버할 수 있어!' },
      { type: 'mission', mission: '자주 쓰이는 구동사 5개를 찾아\n각각 예문을 만들고 소리 내어 읽어보기\n(give up, figure out, look forward to, come up with, put up with)', encouragement: '구동사가 쌓이면 영어가 살아 움직여!' },
    ],
  },

  'english-gold-3': {
    id: 'english-gold-3', chapterKey: 'english', tierKey: 'gold', stageNumber: 3,
    title: '영작의 기본: 5형식 활용',
    cards: [
      { type: 'concept', title: '영어 5형식으로 문장 만들기', description: '모든 영어 문장은 5가지 형식 중 하나야.\n\n1형식: S+V (주어+동사) "Birds fly."\n2형식: S+V+C (주격보어) "She is happy."\n3형식: S+V+O (목적어) "I love music."\n4형식: S+V+O+O (간접+직접목적어) "He gave me a book."\n5형식: S+V+O+C (목적격보어) "They made me happy."\n\n영작할 때 막히면 "이 문장은 몇 형식이지?" 생각해봐.\n뼈대를 잡으면 나머지는 살을 붙이면 돼.' },
      { type: 'summary', keywords: [
        { icon: '1️⃣', label: '1형식 S+V', description: '주어와 동사만으로 완성' },
        { icon: '3️⃣', label: '3형식 S+V+O', description: '가장 많이 쓰이는 기본 구조' },
        { icon: '4️⃣', label: '4형식 S+V+O+O', description: '"누구에게 무엇을" 주는 구조' },
        { icon: '5️⃣', label: '5형식 S+V+O+C', description: '"무엇을 어떻게" 만드는 구조' },
      ]},
      { type: 'example', bad: { label: '현아의 방법', story: '"그가 나에게 행복을 줬다"를 영작하려는데\n단어를 한국어 순서대로 나열해버렸다.\n"He me happiness gave"가 돼버렸다.' }, good: { label: '준서의 방법', story: '"누가 누구에게 무엇을 → 4형식!"\n"He gave me happiness."\n형식 구조를 먼저 떠올리니 영작이 쉬웠다.' }},
      { type: 'ox', statement: '영작을 잘하려면 한국어를 그대로 영어로 번역하면 된다.', answer: false, feedback: '한국어와 영어는 어순이 달라.\n영어 5형식 구조에 맞춰 뼈대를 먼저 잡아야 해!' },
      { type: 'multipleChoice', question: '"The news made everyone surprised."는 몇 형식?', options: ['3형식 (S+V+O)', '4형식 (S+V+O+O)', '5형식 (S+V+O+C)', '2형식 (S+V+C)'], correctIndex: 2, explanation: 'The news(S) made(V) everyone(O) surprised(C)\n목적어 everyone을 surprised 상태로 만들었으니 5형식!' },
      { type: 'feedback', summary: '영작 = 5형식으로 뼈대를 잡고 살 붙이기', message: '5형식은 영어 문장의 설계도야. 이걸 알면 어떤 문장이든 만들 수 있어!' },
      { type: 'mission', mission: '5형식 각각에 해당하는 문장을 하나씩, 총 5개 영작해보기', encouragement: '이 5문장이 영작의 기초 체력이 돼!' },
    ],
  },

  'english-gold-4': {
    id: 'english-gold-4', chapterKey: 'english', tierKey: 'gold', stageNumber: 4,
    title: '영어 프레젠테이션 기술',
    cards: [
      { type: 'concept', title: '영어 발표의 3단계 구조', description: '영어 프레젠테이션의 황금 구조:\n\n1) Opening (도입)\n- Hook: 질문, 통계, 인용으로 주의 끌기\n- "Did you know that 70% of...?"\n- 발표 목적과 순서 안내\n\n2) Body (본론)\n- 3가지 핵심 포인트\n- 각 포인트마다 근거와 예시\n- "First... Second... Third..."\n\n3) Closing (마무리)\n- 핵심 요약\n- Call to Action (행동 촉구)\n- "In conclusion... I encourage you to..."' },
      { type: 'summary', keywords: [
        { icon: '🎣', label: 'Hook', description: '청중의 관심을 끄는 도입부' },
        { icon: '🔢', label: '3 Points', description: '핵심 포인트는 3개로 정리' },
        { icon: '📊', label: '근거와 예시', description: '각 포인트를 데이터·사례로 뒷받침' },
        { icon: '🎬', label: 'Call to Action', description: '마무리에 청중에게 행동을 촉구' },
      ]},
      { type: 'example', bad: { label: '예림의 방법', story: '슬라이드 내용을 그대로 읽었다.\n청중은 지루해했고 핵심이 뭔지 알 수 없었다.' }, good: { label: '도현의 방법', story: '"Have you ever wondered why...?"로 시작해 관심을 끌었다.\n3가지 포인트를 명확히 전달하고\n"So, starting today, let\'s..."로 마무리했다.\n청중이 박수를 쳤다.' }},
      { type: 'ox', statement: '영어 발표에서 가장 중요한 것은 완벽한 문법이다.', answer: false, feedback: '문법보다 구조와 전달력이 중요해.\n명확한 구조 + 자신감 있는 전달이 좋은 발표의 핵심이야!' },
      { type: 'multipleChoice', question: '영어 발표의 도입부(Opening)에서 가장 효과적인 방법은?', options: ['자기소개부터 길게 하기', '질문이나 놀라운 통계로 관심 끌기', '바로 본론으로 들어가기', '사과로 시작하기'], correctIndex: 1, explanation: 'Hook으로 청중의 관심을 잡아야\n나머지 내용도 집중해서 들어!' },
      { type: 'feedback', summary: '영어 발표 = Hook + 3 Points + Call to Action', message: '이 구조만 알면 어떤 주제든 발표할 수 있어!' },
      { type: 'mission', mission: '관심 있는 주제로 영어 발표 Opening 3문장을 써보기\n(Hook + 발표 주제 소개 + 순서 안내)', encouragement: '좋은 시작이 좋은 발표의 절반이야!' },
    ],
  },

  'english-gold-5': {
    id: 'english-gold-5', chapterKey: 'english', tierKey: 'gold', stageNumber: 5,
    title: '관용구와 속담 익히기',
    cards: [
      { type: 'concept', title: '영어 관용구(Idiom)의 세계', description: '관용구는 단어 뜻만으로는 의미를 알 수 없는 표현이야.\n\n자주 쓰이는 관용구:\n- It\'s a piece of cake (매우 쉽다)\n- Break the ice (어색한 분위기를 깨다)\n- Hit the nail on the head (정확히 말하다)\n- Under the weather (몸이 안 좋다)\n- Kill two birds with one stone (일석이조)\n\n관용구를 알면 원어민의 대화, 드라마,\n뉴스를 더 깊이 이해할 수 있어.\n모르면 완전히 엉뚱하게 해석할 수 있으니 주의!' },
      { type: 'summary', keywords: [
        { icon: '🎭', label: '관용구(Idiom)', description: '단어 뜻과 다른 숨은 의미가 있는 표현' },
        { icon: '📜', label: '속담(Proverb)', description: '교훈을 담은 옛말 (Actions speak louder...)' },
        { icon: '🎬', label: '문화 배경', description: '관용구에는 영어권 문화가 담겨 있어' },
        { icon: '📖', label: '맥락 학습', description: '상황과 함께 통째로 익히기' },
      ]},
      { type: 'example', bad: { label: '민호의 방법', story: '"It\'s raining cats and dogs"를 듣고\n"고양이와 개가 비처럼 온다고?" 당황했다.' }, good: { label: '서진의 방법', story: '관용구를 상황과 함께 외웠다.\n"비가 엄청 올 때 → It\'s raining cats and dogs"\n자연스럽게 쓸 수 있게 됐다.' }},
      { type: 'ox', statement: '관용구는 단어 뜻을 합치면 전체 의미를 알 수 있다.', answer: false, feedback: '관용구는 단어 뜻의 합이 아니야.\n"piece of cake"이 "케이크 조각"이 아니라 "매우 쉬운 것"인 것처럼!' },
      { type: 'multipleChoice', question: '"She\'s feeling under the weather."의 의미는?', options: ['날씨가 추워서 밖에 있다', '몸이 좋지 않다', '비를 맞고 있다', '우울한 기분이다'], correctIndex: 1, explanation: 'under the weather = 몸이 안 좋다, 컨디션이 나쁘다\n날씨와는 관계없는 관용구야!' },
      { type: 'feedback', summary: '관용구 = 영어 문화가 담긴 숨은 표현', message: '관용구를 알수록 영어의 깊이가 달라져!' },
      { type: 'mission', mission: '오늘 관용구 3개를 골라\n각각 상황 설명 + 예문을 적어 정리하기', encouragement: '관용구 하나가 대화의 품격을 올려줘!' },
    ],
  },

  'english-gold-6': {
    id: 'english-gold-6', chapterKey: 'english', tierKey: 'gold', stageNumber: 6,
    title: '영어 이메일 작성법',
    cards: [
      { type: 'concept', title: '비즈니스 이메일의 구조', description: '영어 이메일은 명확한 구조를 따라야 해.\n\n1) Subject Line: 핵심을 한 줄로\n"Meeting Request: Q4 Budget Review"\n\n2) Greeting: 상대에 맞는 인사\n"Dear Mr. Kim," (격식) / "Hi John," (비격식)\n\n3) Opening: 목적을 바로 밝히기\n"I\'m writing to inquire about..."\n\n4) Body: 핵심 내용 (짧고 명확하게)\n\n5) Closing: 다음 행동 + 맺음말\n"I look forward to hearing from you."\n"Best regards, / Sincerely,"' },
      { type: 'summary', keywords: [
        { icon: '📧', label: '제목(Subject)', description: '핵심을 한 줄로 요약' },
        { icon: '👋', label: '인사(Greeting)', description: '격식/비격식에 맞게 선택' },
        { icon: '🎯', label: '목적 명시', description: '첫 문장에서 이메일 목적을 밝히기' },
        { icon: '✅', label: '마무리(Closing)', description: '다음 행동을 요청하며 맺기' },
      ]},
      { type: 'example', bad: { label: '지원의 이메일', story: '제목 없이, "안녕, 나 지원이야.\n그 건 어떻게 됐어? 답장 줘."\n무례하고 불명확한 이메일이었다.' }, good: { label: '수현의 이메일', story: 'Subject: Follow-up on Marketing Proposal\nDear Ms. Lee,\nI hope this email finds you well.\nI\'m writing to follow up on the marketing proposal we discussed.\nCould you let me know your decision by Friday?\nBest regards, Suhyun\n명확하고 예의 바른 이메일이었다.' }},
      { type: 'ox', statement: '영어 이메일은 길수록 정성이 담겨 좋다.', answer: false, feedback: '영어 이메일은 짧고 명확한 게 좋아.\n핵심만 전달하고 불필요한 내용은 빼자!' },
      { type: 'multipleChoice', question: '비즈니스 이메일의 첫 문장으로 가장 적절한 것은?', options: ['요즘 어떻게 지내세요?', 'I\'m writing to discuss the project deadline.', '저를 기억하시나요?', '먼저 사과드립니다.'], correctIndex: 1, explanation: '비즈니스 이메일은 목적을 바로 밝히는 게 기본이야.\n"I\'m writing to..."로 시작하면 명확해!' },
      { type: 'feedback', summary: '이메일 = 제목 + 목적 + 핵심 + 마무리', message: '좋은 이메일은 짧고 명확하고 예의 바른 거야!' },
      { type: 'mission', mission: '영어로 이메일 하나를 작성해보기\n(회의 요청, 감사, 문의 등 상황을 정하고\n제목-인사-목적-본문-마무리 구조로)', encouragement: '이메일 잘 쓰는 능력은 어디서든 무기가 돼!' },
    ],
  },

  'english-gold-7': {
    id: 'english-gold-7', chapterKey: 'english', tierKey: 'gold', stageNumber: 7,
    title: '영어 요약하기(Summarizing)',
    cards: [
      { type: 'concept', title: '효과적인 영어 요약법', description: '영어 요약은 독해·쓰기·사고력을 동시에 키워.\n\n요약의 3단계:\n1) Read & Understand: 글을 읽고 핵심 파악\n2) Select: 주요 아이디어 3개를 선택\n3) Rewrite: 자기 말로 다시 쓰기 (패러프레이징)\n\n좋은 요약의 기준:\n- 원문의 1/3~1/4 길이\n- 핵심 내용만 포함\n- 자기 의견은 넣지 않기\n- 자기 말로 바꿔 쓰기 (복사 금지)\n\n요약 능력은 토플, IELTS는 물론\n실무에서도 핵심 역량이야.' },
      { type: 'summary', keywords: [
        { icon: '📖', label: 'Read', description: '글을 읽고 핵심 주제 파악' },
        { icon: '✂️', label: 'Select', description: '주요 아이디어만 골라내기' },
        { icon: '✍️', label: 'Rewrite', description: '자기 말로 바꿔서 쓰기' },
        { icon: '📏', label: '1/3 규칙', description: '원문 길이의 1/3~1/4로 줄이기' },
      ]},
      { type: 'example', bad: { label: '승현의 요약', story: '원문의 문장을 그대로 복사해서 붙여넣었다.\n요약이 아니라 발췌가 되어버렸다.' }, good: { label: '지수의 요약', story: '핵심 3가지를 뽑고 자기 말로 바꿔 썼다.\n원문 20줄을 5줄로 명확하게 요약했다.' }},
      { type: 'ox', statement: '좋은 요약은 원문의 문장을 그대로 사용하는 것이다.', answer: false, feedback: '요약은 반드시 자기 말로 바꿔 써야 해.\n원문 복사는 요약이 아니라 표절이야!' },
      { type: 'multipleChoice', question: '영어 요약에 포함하면 안 되는 것은?', options: ['원문의 핵심 주제', '주요 근거와 예시', '글쓴이의 주요 결론', '내 개인적인 의견'], correctIndex: 3, explanation: '요약에는 자기 의견을 넣으면 안 돼.\n원문의 핵심만 객관적으로 정리하는 거야!' },
      { type: 'feedback', summary: '요약 = 읽기·쓰기·사고력의 종합 훈련', message: '요약 능력은 모든 영어 시험과 실무의 기본이야!' },
      { type: 'mission', mission: '영어 기사나 글 하나를 읽고\n핵심 3가지를 뽑아 5문장 이내로 요약해보기', encouragement: '요약은 최고의 영어 종합 훈련이야!' },
    ],
  },

  'english-gold-8': {
    id: 'english-gold-8', chapterKey: 'english', tierKey: 'gold', stageNumber: 8,
    title: '문맥으로 단어 유추하기',
    cards: [
      { type: 'concept', title: 'Context Clues 전략', description: '모르는 단어가 나와도 문맥(Context)으로 유추할 수 있어.\n\n5가지 문맥 단서:\n1) 정의: "A peninsula, a land surrounded by water on three sides, ..."\n2) 동의어: "She was elated, or extremely happy."\n3) 반의어: "Unlike his timid brother, he was bold."\n4) 예시: "Citrus fruits, such as oranges and lemons, ..."\n5) 일반 지식: 상식으로 추론\n\n시험에서 모르는 단어가 나와도\n이 5가지 단서를 찾으면 뜻을 유추할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '정의 단서', description: '글에서 직접 뜻을 설명하는 경우' },
        { icon: '🔄', label: '동의어/반의어', description: '비슷한 말이나 반대말로 힌트' },
        { icon: '📋', label: '예시 단서', description: 'such as, for example 뒤에 힌트' },
        { icon: '🧠', label: '추론', description: '문맥 전체로 의미를 유추' },
      ]},
      { type: 'example', bad: { label: '태영의 방법', story: '모르는 단어가 나오면 바로 사전을 찾았다.\n독해 흐름이 끊기고 시험에서는 사전도 못 써서 당황했다.' }, good: { label: '소미의 방법', story: '"The dog was lethargic, barely moving and sleeping all day."\nbarely moving + sleeping all day로\nlethargic = "기운 없는"이라고 유추했다.\n사전 없이도 독해가 가능했다.' }},
      { type: 'ox', statement: '모르는 단어는 무조건 사전에서 찾아야 정확히 알 수 있다.', answer: false, feedback: '문맥 단서로 유추하는 능력도 중요해.\n시험에서는 사전을 쓸 수 없으니까!' },
      { type: 'multipleChoice', question: '"She was jubilant, jumping and cheering with joy."에서 jubilant의 뜻은?', options: ['화난', '슬픈', '매우 기뻐하는', '피곤한'], correctIndex: 2, explanation: 'jumping and cheering with joy가 문맥 단서야.\n즐겁게 뛰고 환호하는 → jubilant = 매우 기뻐하는!' },
      { type: 'feedback', summary: '문맥 유추 = 사전 없이 독해하는 핵심 기술', message: '문맥으로 유추하는 습관이 진짜 독해 실력이야!' },
      { type: 'mission', mission: '영어 글을 읽다가 모르는 단어 2개를\n문맥 단서로 뜻을 유추한 뒤\n사전에서 확인해보기 (맞았는지 체크)', encouragement: '유추가 맞을 때의 쾌감을 느껴보자!' },
    ],
  },

  'english-gold-9': {
    id: 'english-gold-9', chapterKey: 'english', tierKey: 'gold', stageNumber: 9,
    title: '영어 듣기: 액센트 적응하기',
    cards: [
      { type: 'concept', title: '다양한 영어 액센트', description: '영어는 전 세계에서 쓰이기 때문에\n다양한 액센트가 존재해.\n\n주요 액센트:\n- American English: rhotic(r 발음), "can\'t"→/kænt/\n- British English: non-rhotic, "can\'t"→/kɑːnt/\n- Australian English: "today"→/tədaɪ/ 느낌\n- Indian English: 독특한 리듬과 t/d 발음\n\n토익, 토플, IELTS 등 주요 시험은\n다양한 액센트를 출제하기 때문에\n여러 액센트에 노출되는 게 중요해.' },
      { type: 'summary', keywords: [
        { icon: '🇺🇸', label: '미국 영어', description: 'r 발음이 강하고 캐주얼한 톤' },
        { icon: '🇬🇧', label: '영국 영어', description: 'r을 약하게, 모음이 뚜렷' },
        { icon: '🇦🇺', label: '호주 영어', description: '독특한 모음 변화와 억양' },
        { icon: '🌍', label: '다양한 노출', description: '여러 액센트를 듣는 훈련이 필수' },
      ]},
      { type: 'example', bad: { label: '지민의 방법', story: '미국 영어만 들어서 토익 리스닝에서\n영국 발음이 나오면 당황해서 놓쳤다.' }, good: { label: '유진의 방법', story: 'BBC(영국), CNN(미국), ABC(호주) 뉴스를 번갈아 들었다.\n시험에서 어떤 액센트가 나와도 자연스럽게 이해했다.' }},
      { type: 'ox', statement: '미국 영어만 잘 들으면 영어 듣기는 충분하다.', answer: false, feedback: '시험에서도 실생활에서도 다양한 액센트를 만나.\n여러 액센트에 노출되는 훈련이 필수야!' },
      { type: 'multipleChoice', question: '다양한 영어 액센트에 적응하는 가장 좋은 방법은?', options: ['미국 영어만 집중 학습', '다양한 나라의 영어 콘텐츠를 번갈아 듣기', '한 가지 액센트를 완벽히 마스터하기', '액센트는 무시하고 문법만 공부하기'], correctIndex: 1, explanation: '다양한 액센트에 노출될수록\n어떤 영어든 이해할 수 있는 귀가 만들어져!' },
      { type: 'feedback', summary: '액센트 적응 = 다양한 영어를 골고루 듣기', message: '세계 영어를 이해하는 귀를 만들자!' },
      { type: 'mission', mission: '미국·영국·호주 영어 영상을 각각 하나씩 찾아\n1분씩 듣고 발음 차이를 메모해보기', encouragement: '다양한 귀를 가진 사람이 진짜 영어 고수야!' },
    ],
  },

  'english-gold-10': {
    id: 'english-gold-10', chapterKey: 'english', tierKey: 'gold', stageNumber: 10,
    title: '영어 시험 전략 총정리',
    cards: [
      { type: 'concept', title: '시험 유형별 핵심 전략', description: '영어 시험마다 핵심 전략이 달라.\n\n토익(TOEIC):\n- 시간 관리가 핵심 (LC 45분, RC 75분)\n- Part 5·6은 빠르게, Part 7에 시간 투자\n\n수능 영어:\n- 빈칸 추론과 순서 배열이 고난도\n- 선지를 먼저 읽고 지문에서 근거 찾기\n\n토플(TOEFL)/아이엘츠(IELTS):\n- 4영역 통합형 (듣기·읽기·쓰기·말하기)\n- 노트테이킹이 필수\n\n공통: 오답 소거법 + 시간 배분 + 오답 노트' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '시간 관리', description: '유형별 시간 배분이 승패를 가른다' },
        { icon: '❌', label: '소거법', description: '확실한 오답부터 제거하고 고르기' },
        { icon: '📝', label: '노트테이킹', description: '듣기·읽기 중 핵심을 메모' },
        { icon: '📓', label: '오답 노트', description: '틀린 유형을 분석하고 집중 보강' },
      ]},
      { type: 'example', bad: { label: '우성의 방법', story: '토익 RC를 앞에서부터 꼼꼼히 풀었다.\nPart 7에서 시간이 부족해 20문제를 찍었다.' }, good: { label: '하린의 방법', story: 'Part 5를 1문제 30초로 빠르게 풀고\nPart 7에 40분을 확보했다.\n시간 배분 전략으로 점수가 100점 올랐다.' }},
      { type: 'ox', statement: '영어 시험은 앞에서부터 순서대로 푸는 것이 가장 좋다.', answer: false, feedback: '시험마다 전략이 달라.\n쉬운 문제부터 빠르게 풀고\n어려운 문제에 시간을 투자하는 게 효과적이야!' },
      { type: 'multipleChoice', question: '토익 RC에서 가장 시간을 투자해야 하는 파트는?', options: ['Part 5 (단문 빈칸)', 'Part 6 (장문 빈칸)', 'Part 7 (독해)', '모든 파트에 동일하게'], correctIndex: 2, explanation: 'Part 7이 가장 문제 수도 많고 시간이 필요해.\nPart 5·6을 빠르게 풀고 Part 7에 시간을 확보하자!' },
      { type: 'feedback', summary: '시험 = 실력 + 전략 + 시간 관리', message: '전략을 아는 것만으로도 점수가 올라갈 수 있어!' },
      { type: 'mission', mission: '내가 준비하는 영어 시험의 유형별 시간 배분 계획을 세우고\n약한 유형 3개를 파악해서 집중 보강 계획 적어보기', encouragement: '전략 있는 공부가 가장 효율적인 공부야!' },
    ],
  },

  // ═══════════════════════════════════════
  // 플래티넘 (실전 영어 응용) 1~10
  // ═══════════════════════════════════════

  'english-platinum-1': {
    id: 'english-platinum-1', chapterKey: 'english', tierKey: 'platinum', stageNumber: 1,
    title: '영어로 생각하기 훈련',
    cards: [
      { type: 'concept', title: '한→영 번역을 멈춰라', description: '영어가 느린 이유는 한국어로 생각한 뒤\n영어로 번역하기 때문이야.\n\n"영어로 생각하기" 훈련법:\n1) 이미지 연결: apple을 "사과"가 아닌 빨간 과일 이미지로\n2) 셀프 토킹: 일상을 영어로 중얼거리기\n3) 영영사전 사용: 영어→한국어 경로 차단\n4) 영어 일기: 처음부터 영어로 구상\n5) 내면 독백: "What should I eat?" 식으로 생각\n\n처음엔 어색하지만 3주만 하면\n간단한 생각은 영어로 바로 나오기 시작해.' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '영어 사고', description: '한국어 번역 없이 영어로 바로 생각' },
        { icon: '🖼️', label: '이미지 연결', description: '단어를 번역이 아닌 이미지와 연결' },
        { icon: '💭', label: '내면 독백', description: '혼자 생각할 때도 영어로' },
        { icon: '⏱️', label: '3주 법칙', description: '매일 하면 3주 뒤부터 자연스러워져' },
      ]},
      { type: 'example', bad: { label: '동우의 방법', story: '"배고프다" → "배고프다는 영어로 뭐지?" → "hungry" → "I\'m hungry."\n매번 번역 과정을 거쳐서 말이 느렸다.' }, good: { label: '지안의 방법', story: '배가 고플 때 바로 "I\'m hungry"가 떠올랐다.\n한국어를 거치지 않고 감각→영어로 바로 연결했다.' }},
      { type: 'ox', statement: '영어를 잘하려면 한국어로 먼저 생각하고 번역하는 게 정확하다.', answer: false, feedback: '번역 과정이 있으면 속도도 느리고 부자연스러워.\n영어로 바로 생각하는 습관이 진짜 유창함이야!' },
      { type: 'multipleChoice', question: '"영어로 생각하기"를 위한 가장 효과적인 훈련은?', options: ['한영 사전을 자주 보기', '일상 속 셀프 토킹을 영어로 하기', '영어 문법을 완벽히 외우기', '한국어 번역본과 영어 원서를 비교하기'], correctIndex: 1, explanation: '일상에서 영어로 중얼거리는 셀프 토킹이\n가장 효과적인 영어 사고 훈련이야!' },
      { type: 'feedback', summary: '영어 사고 = 번역 없이 감각→영어 직접 연결', message: '오늘부터 간단한 생각을 영어로 해보자!' },
      { type: 'mission', mission: '오늘 하루 중 30분을 정해서\n모든 생각을 영어로 해보기 (셀프 토킹)\n"What should I do next?" "I need to..."', encouragement: '30분의 영어 사고가 평생의 습관이 돼!' },
    ],
  },

  'english-platinum-2': {
    id: 'english-platinum-2', chapterKey: 'english', tierKey: 'platinum', stageNumber: 2,
    title: '고급 문법: 가정법 마스터',
    cards: [
      { type: 'concept', title: '가정법의 3가지 패턴', description: '가정법은 "만약 ~라면"이라는 가정을 표현해.\n\n1) 가정법 현재 (실현 가능한 미래)\nIf it rains, I will stay home.\n비가 오면 집에 있을 거야.\n\n2) 가정법 과거 (현재 반대 가정)\nIf I were rich, I would travel the world.\n부자라면 세계여행을 할 텐데. (지금은 부자가 아님)\n\n3) 가정법 과거완료 (과거 반대 가정)\nIf I had studied harder, I would have passed.\n더 열심히 공부했더라면 합격했을 텐데. (실제론 안 함)' },
      { type: 'summary', keywords: [
        { icon: '🔮', label: '가정법 현재', description: 'If + 현재, will + 동사원형 (가능한 미래)' },
        { icon: '💭', label: '가정법 과거', description: 'If + 과거, would + 동사원형 (현재 반대)' },
        { icon: '⏪', label: '가정법 과거완료', description: 'If + had p.p., would have p.p. (과거 반대)' },
        { icon: '🎯', label: '핵심', description: '시제를 한 칸 뒤로 → 비현실 가정' },
      ]},
      { type: 'example', bad: { label: '성민의 실수', story: '"If I was a bird, I will fly."\n가정법인데 일반 과거+will을 써서 틀렸다.' }, good: { label: '예원의 답변', story: '"If I were a bird, I would fly."\nwere + would로 현재 반대 가정을 정확히 표현했다.' }},
      { type: 'ox', statement: '가정법에서 "If I was"가 문법적으로 맞다.', answer: false, feedback: '가정법에서는 주어와 관계없이 were를 써.\n"If I were..." "If he were..."가 정식 문법이야!' },
      { type: 'multipleChoice', question: '"더 일찍 출발했더라면 늦지 않았을 텐데"를 영어로?', options: ['If I leave earlier, I won\'t be late.', 'If I left earlier, I wouldn\'t be late.', 'If I had left earlier, I wouldn\'t have been late.', 'If I will leave earlier, I am not late.'], correctIndex: 2, explanation: '과거에 일어나지 않은 일의 반대 가정이니\n가정법 과거완료: If + had p.p., would have p.p.!' },
      { type: 'feedback', summary: '가정법 = 시제를 한 칸 뒤로 보내면 비현실 가정', message: '가정법은 영어 문법의 꽃이야. 이것만 알면 고급 문법 클리어!' },
      { type: 'mission', mission: '가정법 3가지 패턴으로 각각 예문 2개씩, 총 6문장 영작하기', encouragement: '가정법을 자유자재로 쓰면 영어 표현이 풍부해져!' },
    ],
  },

  'english-platinum-3': {
    id: 'english-platinum-3', chapterKey: 'english', tierKey: 'platinum', stageNumber: 3,
    title: '영어 에세이 구조 잡기',
    cards: [
      { type: 'concept', title: '5단락 에세이(Five-Paragraph Essay)', description: '영어 에세이의 기본 구조는 5단락이야.\n\n1단락: Introduction (서론)\n- Hook (관심 끌기)\n- Background (배경)\n- Thesis Statement (주제문) ← 가장 중요!\n\n2~4단락: Body (본론) × 3\n- 각 단락마다 Topic Sentence + 근거 + 예시\n\n5단락: Conclusion (결론)\n- 주제문 재진술\n- 핵심 요약\n- Final Thought (마지막 메시지)\n\n이 구조는 토플, IELTS, SAT 등 모든 시험의 기본이야.' },
      { type: 'summary', keywords: [
        { icon: '📌', label: 'Thesis', description: '에세이 전체의 핵심 주장 한 문장' },
        { icon: '🏗️', label: '5단락 구조', description: '서론 + 본론 3개 + 결론' },
        { icon: '📝', label: 'Topic Sentence', description: '각 본론 단락의 첫 문장 = 그 단락의 주제' },
        { icon: '🔗', label: '연결어', description: 'First, Moreover, In conclusion 등' },
      ]},
      { type: 'example', bad: { label: '현아의 에세이', story: '생각나는 대로 줄줄이 썼다.\n구조가 없어서 무슨 주장인지 알 수 없었다.' }, good: { label: '도윤의 에세이', story: 'Thesis를 먼저 정하고 3가지 근거를 배치했다.\n각 단락에 Topic Sentence를 넣으니\n읽는 사람이 구조를 바로 파악할 수 있었다.' }},
      { type: 'ox', statement: '영어 에세이는 자유롭게 쓰는 것이 가장 좋다.', answer: false, feedback: '영어 에세이는 구조가 생명이야.\n5단락 구조를 지켜야 논리적이고 설득력 있는 글이 돼!' },
      { type: 'multipleChoice', question: 'Thesis Statement의 역할은?', options: ['독자의 관심을 끄는 것', '에세이 전체의 핵심 주장을 한 문장으로 제시', '본론의 예시를 나열하는 것', '결론을 요약하는 것'], correctIndex: 1, explanation: 'Thesis Statement는 "이 에세이에서 내가 주장하는 것"을\n한 문장으로 명확히 보여주는 거야!' },
      { type: 'feedback', summary: '에세이 = Thesis + 3 Body + Conclusion', message: '구조를 먼저 잡으면 어떤 주제든 글을 쓸 수 있어!' },
      { type: 'mission', mission: '아무 주제나 골라 에세이 아웃라인을 작성하기\nThesis 1문장 + Body 3개 Topic Sentence + Conclusion 1문장', encouragement: '아웃라인이 좋은 에세이의 80%를 결정해!' },
    ],
  },

  'english-platinum-4': {
    id: 'english-platinum-4', chapterKey: 'english', tierKey: 'platinum', stageNumber: 4,
    title: '영어 뉴앙스: 격식 vs 비격식',
    cards: [
      { type: 'concept', title: '상황에 맞는 영어 톤(Register)', description: '같은 뜻이라도 상황에 따라 표현이 달라져.\n\n격식(Formal):\n- "I would like to request..." (요청드립니다)\n- "Could you please..." (해주시겠습니까)\n- 비즈니스, 공식 문서, 면접\n\n비격식(Informal):\n- "Can you..." (해줄 수 있어?)\n- "I wanna..." (나 ~하고 싶어)\n- 친구, SNS, 캐주얼 대화\n\n상황에 맞지 않는 톤을 쓰면\n너무 딱딱하거나 무례하게 들릴 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '👔', label: 'Formal', description: '비즈니스, 공식 상황의 격식체' },
        { icon: '👕', label: 'Informal', description: '친구, 일상 대화의 비격식체' },
        { icon: '🎯', label: '상황 판단', description: '누구에게, 어디서, 어떤 목적인지' },
        { icon: '⚖️', label: '톤 조절', description: '같은 뜻을 상황에 맞게 표현' },
      ]},
      { type: 'example', bad: { label: '수현의 실수', story: '친구에게 "I would like to request your presence at my birthday party."\n너무 격식적이라 친구가 놀림당했다.' }, good: { label: '재윤의 표현', story: '친구에게: "Hey, come to my birthday party!"\n교수님에게: "I would like to invite you to..."\n상황에 맞게 톤을 조절했다.' }},
      { type: 'ox', statement: '영어는 항상 격식체로 말하는 것이 예의 바르다.', answer: false, feedback: '상황에 맞지 않는 격식체는 오히려 어색해.\n친구에게 격식체를 쓰면 거리감이 느껴져!' },
      { type: 'multipleChoice', question: '비즈니스 이메일에 적절한 표현은?', options: ['Hey, what\'s up?', 'I would appreciate your prompt response.', 'Get back to me ASAP!', 'Yo, need that report.'], correctIndex: 1, explanation: '비즈니스 이메일은 격식체가 기본!\n"I would appreciate..."는 정중하고 전문적인 표현이야.' },
      { type: 'feedback', summary: '톤 = 상황에 맞는 격식/비격식 표현 선택', message: '톤 조절 능력은 영어 고급자의 핵심 역량이야!' },
      { type: 'mission', mission: '"도와줘"를 격식체와 비격식체로 각각 3가지씩 영작하기\n예) Could you help me? / Give me a hand!', encouragement: '같은 뜻을 여러 톤으로 표현할 수 있으면 진짜 실력이야!' },
    ],
  },

  'english-platinum-5': {
    id: 'english-platinum-5', chapterKey: 'english', tierKey: 'platinum', stageNumber: 5,
    title: '영어 면접 완벽 대비',
    cards: [
      { type: 'concept', title: 'STAR 기법으로 면접 답변하기', description: '영어 면접의 행동 질문에는 STAR 기법이 최고야.\n\nS - Situation (상황): "In my previous job, ..."\nT - Task (과제): "I was responsible for ..."\nA - Action (행동): "I decided to ... / I implemented ..."\nR - Result (결과): "As a result, ... / This led to ..."\n\n예) "Tell me about a time you solved a problem."\nS: "When I was a team leader, we missed a deadline."\nT: "I needed to reorganize the schedule."\nA: "I broke tasks into daily goals and held check-ins."\nR: "We completed the project 2 days early."' },
      { type: 'summary', keywords: [
        { icon: '📍', label: 'Situation', description: '어떤 상황이었는지 배경 설명' },
        { icon: '🎯', label: 'Task', description: '내가 맡은 역할과 과제' },
        { icon: '🔨', label: 'Action', description: '구체적으로 어떤 행동을 했는지' },
        { icon: '📈', label: 'Result', description: '그 결과 어떤 성과가 나왔는지' },
      ]},
      { type: 'example', bad: { label: '승우의 답변', story: '"I\'m a hard worker and I\'m good at teamwork."\n구체적인 사례 없이 추상적으로만 대답했다.' }, good: { label: '하은의 답변', story: 'STAR 기법으로 구체적 사례를 제시했다.\n면접관이 "That\'s a great example"이라고 했다.' }},
      { type: 'ox', statement: '영어 면접에서는 짧고 간단하게 답변하는 것이 가장 좋다.', answer: false, feedback: '행동 질문에는 STAR 기법으로 구체적 사례를 들어야 해.\n너무 짧으면 내용이 없어 보여!' },
      { type: 'multipleChoice', question: 'STAR 기법에서 가장 중요한 부분은?', options: ['Situation (상황)', 'Task (과제)', 'Action (행동)', 'Result (결과)'], correctIndex: 2, explanation: 'Action이 가장 중요해!\n"내가 구체적으로 무엇을 했는지"가 면접관이 알고 싶은 핵심이야.' },
      { type: 'feedback', summary: '면접 = STAR로 구체적 사례를 논리적으로', message: 'STAR 기법은 한국어 면접에서도 통하는 만능 기법이야!' },
      { type: 'mission', mission: '"Tell me about a challenge you overcame."에 대해\nSTAR 기법으로 영어 답변을 작성하고 소리 내어 연습하기', encouragement: '준비된 답변이 면접의 자신감을 만들어!' },
    ],
  },

  'english-platinum-6': {
    id: 'english-platinum-6', chapterKey: 'english', tierKey: 'platinum', stageNumber: 6,
    title: '영어 뉴스 심층 분석',
    cards: [
      { type: 'concept', title: '비판적 읽기(Critical Reading)', description: '뉴스를 그냥 읽는 것과 분석하며 읽는 것은 달라.\n\n비판적 읽기 체크리스트:\n1) 사실(Fact) vs 의견(Opinion) 구별하기\n2) 글쓴이의 입장과 편향(Bias) 파악하기\n3) 근거의 강도 평가하기 (통계? 전문가? 일화?)\n4) 다른 관점은 없는지 생각하기\n5) "So what?" → 이 정보가 왜 중요한지 판단\n\n이 능력은 토플·IELTS 고득점은 물론\n실제 세상을 이해하는 데 필수야.' },
      { type: 'summary', keywords: [
        { icon: '📊', label: 'Fact vs Opinion', description: '사실과 의견을 명확히 구분하기' },
        { icon: '🔍', label: 'Bias 파악', description: '글쓴이의 편향과 관점 인식' },
        { icon: '📋', label: '근거 평가', description: '어떤 증거로 주장을 뒷받침하는지' },
        { icon: '🤔', label: 'So What?', description: '이 정보가 왜 중요한지 판단' },
      ]},
      { type: 'example', bad: { label: '예진의 방법', story: '뉴스 기사를 읽고 내용을 그대로 믿었다.\n나중에 그 기사가 한쪽 관점만 반영한 것을 알았다.' }, good: { label: '시우의 방법', story: '같은 사건을 CNN과 BBC에서 비교해 읽었다.\n서로 다른 관점을 발견하고 비판적으로 분석했다.' }},
      { type: 'ox', statement: '뉴스 기사는 항상 객관적인 사실만 전달한다.', answer: false, feedback: '뉴스에도 글쓴이의 관점과 편향이 있을 수 있어.\n비판적으로 읽는 능력이 필요해!' },
      { type: 'multipleChoice', question: '다음 중 "의견(Opinion)"에 해당하는 것은?', options: ['서울의 인구는 약 970만 명이다.', '한국은 세계에서 가장 살기 좋은 나라다.', '지구는 태양 주위를 공전한다.', '물은 100°C에서 끓는다.'], correctIndex: 1, explanation: '"가장 살기 좋은"은 주관적 판단이야.\n나머지는 객관적 사실이지!' },
      { type: 'feedback', summary: '비판적 읽기 = 사실과 의견을 구별하고 분석하기', message: '읽는 것과 분석하는 것은 하늘과 땅 차이야!' },
      { type: 'mission', mission: '영어 뉴스 기사 하나를 읽고\n사실(Fact) 3개와 의견(Opinion) 2개를 구별해서 적기', encouragement: '비판적 읽기는 최고 수준의 독해력이야!' },
    ],
  },

  'english-platinum-7': {
    id: 'english-platinum-7', chapterKey: 'english', tierKey: 'platinum', stageNumber: 7,
    title: '고급 어휘: 학술·전문 영어',
    cards: [
      { type: 'concept', title: 'Academic Word List(AWL)', description: '학술 영어에는 일상과 다른 어휘가 있어.\n\nAcademic Word List(AWL)는\n대학 교재에 자주 나오는 570개 단어 모음이야.\n\n일상 vs 학술 어휘 비교:\n- get → obtain, acquire\n- show → demonstrate, illustrate\n- think → analyze, evaluate\n- help → facilitate, contribute to\n- important → significant, crucial\n\nAWL 570개만 알면 학술 텍스트의\n약 10%를 추가로 이해할 수 있어.\n토플, IELTS, 논문 읽기에 필수야.' },
      { type: 'summary', keywords: [
        { icon: '🎓', label: 'AWL', description: '학술 영어 핵심 570단어 리스트' },
        { icon: '📈', label: '고급 표현', description: 'get→obtain처럼 격식 있는 어휘' },
        { icon: '📖', label: '논문 읽기', description: '학술 텍스트 이해의 기본 어휘' },
        { icon: '✍️', label: '에세이 활용', description: '격식 있는 글쓰기에 필수' },
      ]},
      { type: 'example', bad: { label: '준호의 에세이', story: '"This is very important and it helps a lot."\n쉬운 단어만 써서 학술 에세이 점수가 낮았다.' }, good: { label: '채린의 에세이', story: '"This is significantly crucial and facilitates the process."\n학술 어휘를 활용해서 에세이의 품격이 올라갔다.' }},
      { type: 'ox', statement: '학술 영어는 어려운 단어를 많이 쓸수록 좋다.', answer: false, feedback: '적절한 학술 어휘를 자연스럽게 사용하는 게 중요해.\n무조건 어려운 단어를 쓰면 오히려 부자연스러워!' },
      { type: 'multipleChoice', question: '"show"의 학술적 표현으로 가장 적절한 것은?', options: ['display', 'demonstrate', 'see', 'look'], correctIndex: 1, explanation: 'demonstrate는 "증명하다, 보여주다"로\n학술 텍스트에서 show 대신 자주 쓰이는 어휘야.' },
      { type: 'feedback', summary: '학술 어휘 = AWL 570개가 토플·IELTS의 기반', message: '일상 어휘에서 학술 어휘로 한 단계 올라가보자!' },
      { type: 'mission', mission: '일상 단어 5개를 골라 학술적 대체어를 찾아보기\n(get, show, think, help, important)', encouragement: '어휘의 격이 올라가면 글의 격도 올라가!' },
    ],
  },

  'english-platinum-8': {
    id: 'english-platinum-8', chapterKey: 'english', tierKey: 'platinum', stageNumber: 8,
    title: '영어 토론: 반론과 양보',
    cards: [
      { type: 'concept', title: '반론(Counterargument)과 양보(Concession)', description: '설득력 있는 영어 토론/에세이에는\n반론을 인정하고 재반박하는 기술이 필요해.\n\n양보(Concession):\n"It is true that... / Admittedly, ..."\n상대 주장을 일부 인정\n\n전환(Transition):\n"However, ... / Nevertheless, ..."\n하지만 나의 주장은 다르다고 전환\n\n재반박(Rebuttal):\n"The evidence shows that... / In reality, ..."\n근거로 내 주장을 강화\n\n이 구조를 쓰면 일방적 주장보다\n훨씬 논리적이고 설득력 있어 보여.' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '양보(Concession)', description: '상대 주장을 일부 인정하기' },
        { icon: '🔀', label: '전환(Transition)', description: 'However, Nevertheless로 방향 전환' },
        { icon: '💪', label: '재반박(Rebuttal)', description: '근거를 들어 내 주장 강화' },
        { icon: '📊', label: '설득력', description: '양보+재반박 = 논리적 완성도 UP' },
      ]},
      { type: 'example', bad: { label: '태호의 토론', story: '"That\'s wrong. I disagree."\n상대 의견을 무조건 부정해서\n토론이 싸움이 됐다.' }, good: { label: '서은의 토론', story: '"Admittedly, your point about cost is valid.\nHowever, the long-term benefits outweigh the initial investment.\nResearch shows that..."\n양보 후 재반박으로 설득력 있게 전달했다.' }},
      { type: 'ox', statement: '토론에서 상대 의견을 인정하면 내 주장이 약해진다.', answer: false, feedback: '오히려 상대 의견을 인정한 뒤 재반박하면\n더 공정하고 설득력 있게 들려!' },
      { type: 'multipleChoice', question: '양보+재반박의 올바른 구조는?', options: ['반대→반대→반대', '인정→하지만→근거로 재반박', '동의→완전 동의→포기', '무시→내 주장만 반복'], correctIndex: 1, explanation: '인정(Concession) → However(전환) → 재반박(Rebuttal)\n이 3단계가 논리적 토론의 핵심 구조야!' },
      { type: 'feedback', summary: '토론 = 양보 + 전환 + 재반박의 3단 구조', message: '인정할 건 인정하고 반박하는 게 진짜 실력이야!' },
      { type: 'mission', mission: '아무 주제나 골라서\n양보+전환+재반박 구조의 영어 3문장 작성하기\n"Admittedly... However... In fact..."', encouragement: '이 구조를 쓰면 에세이 점수가 확 올라가!' },
    ],
  },

  'english-platinum-9': {
    id: 'english-platinum-9', chapterKey: 'english', tierKey: 'platinum', stageNumber: 9,
    title: '영어 팟캐스트 200% 활용법',
    cards: [
      { type: 'concept', title: '팟캐스트 3회전 학습법', description: '같은 에피소드를 3번 다르게 들으면 효과가 극대화돼.\n\n1회전: 자막/스크립트 없이 듣기\n→ 전체 흐름과 주제를 파악\n→ 이해도를 %로 기록\n\n2회전: 스크립트를 보며 듣기\n→ 못 들었던 부분 확인\n→ 모르는 표현 정리\n\n3회전: 스크립트 없이 다시 듣기\n→ 이전에 못 들었던 부분이 들리는 체험\n→ 이해도 상승을 확인\n\n추천: 6 Minute English(BBC), All Ears English' },
      { type: 'summary', keywords: [
        { icon: '1️⃣', label: '1회전: 귀만', description: '스크립트 없이 전체 흐름 파악' },
        { icon: '2️⃣', label: '2회전: 눈+귀', description: '스크립트 보며 정밀 확인' },
        { icon: '3️⃣', label: '3회전: 귀만 다시', description: '향상된 이해도 확인' },
        { icon: '📊', label: '이해도 기록', description: '1회차 vs 3회차 비교로 성장 확인' },
      ]},
      { type: 'example', bad: { label: '현준의 방법', story: '매일 새로운 에피소드만 들었다.\n많이 듣는 것 같지만 실력이 잘 안 늘었다.' }, good: { label: '수아의 방법', story: '하나의 에피소드를 3회전으로 파고들었다.\n1회차 50% → 3회차 90% 이해.\n매주 이렇게 하니 한 달 만에 귀가 확 트였다.' }},
      { type: 'ox', statement: '팟캐스트는 많은 에피소드를 한 번씩 듣는 것이 효과적이다.', answer: false, feedback: '하나를 깊게 3번 듣는 게\n여러 개를 얕게 듣는 것보다 훨씬 효과적이야!' },
      { type: 'multipleChoice', question: '3회전 학습법에서 2회전의 목적은?', options: ['전체 흐름 파악', '못 들었던 부분을 스크립트로 확인', '쉐도잉 연습', '새로운 에피소드 선택'], correctIndex: 1, explanation: '2회전은 스크립트를 보며 1회전에서 놓친 부분을 확인하고\n모르는 표현을 정리하는 단계야!' },
      { type: 'feedback', summary: '팟캐스트 = 양보다 깊이, 3회전으로 파고들기', message: '깊이 있는 반복이 진짜 듣기 실력을 만들어!' },
      { type: 'mission', mission: '팟캐스트 에피소드 하나를 골라 3회전 학습 실행하기\n1회차 이해도와 3회차 이해도를 기록해서 비교하기', encouragement: '그 차이를 느끼는 순간, 영어가 재미있어져!' },
    ],
  },

  'english-platinum-10': {
    id: 'english-platinum-10', chapterKey: 'english', tierKey: 'platinum', stageNumber: 10,
    title: '영어 학습 정체기 돌파법',
    cards: [
      { type: 'concept', title: '플래토(Plateau) 현상 극복하기', description: '영어를 꾸준히 해도 어느 순간 실력이 안 느는 것 같은 시기가 와.\n이걸 "플래토(Plateau) 현상"이라고 해.\n\n플래토의 원인:\n1) 같은 방법만 반복 (comfort zone에 머물기)\n2) 충분한 난이도 올림 없이 쉬운 것만\n3) 출력(말하기·쓰기) 연습 부족\n\n돌파 전략:\n1) 학습 방법 변화 (새로운 자극)\n2) 난이도 한 단계 올리기\n3) 출력 비중 늘리기 (실전 사용)\n4) 측정 가능한 목표 설정 (시험 등)\n5) 영어 사용 환경 바꾸기' },
      { type: 'summary', keywords: [
        { icon: '📉', label: '플래토', description: '실력이 정체되는 것처럼 느껴지는 시기' },
        { icon: '🔄', label: '방법 변화', description: '새로운 학습법으로 자극 주기' },
        { icon: '📈', label: '난이도 UP', description: '안전지대를 벗어나 도전하기' },
        { icon: '🎯', label: '출력 강화', description: '말하기·쓰기 실전 비중 늘리기' },
      ]},
      { type: 'example', bad: { label: '지훈의 상황', story: '1년째 같은 교재와 방법으로 공부했다.\n처음엔 늘었지만 어느 순간 제자리.\n"나는 영어에 소질이 없나 봐" 포기할 뻔했다.' }, good: { label: '민아의 전략', story: '정체기를 인식하고 전략을 바꿨다.\n듣기만 하던 것에 영어 일기와 셀프 토킹을 추가.\n난이도도 한 단계 올리고 토플 목표를 정했다.\n한 달 만에 다시 실력이 오르기 시작했다.' }},
      { type: 'ox', statement: '영어 실력이 안 느는 것은 재능이 없기 때문이다.', answer: false, feedback: '플래토는 누구나 겪는 자연스러운 현상이야.\n학습 방법을 바꾸면 반드시 돌파할 수 있어!' },
      { type: 'multipleChoice', question: '영어 정체기를 돌파하는 가장 효과적인 방법은?', options: ['같은 방법을 더 열심히 반복', '잠시 영어를 쉬기', '학습 방법과 난이도를 변화시키기', '기초부터 다시 시작하기'], correctIndex: 2, explanation: '같은 방법의 반복이 정체의 원인이니\n새로운 자극과 도전이 돌파의 열쇠야!' },
      { type: 'feedback', summary: '정체기 = 방법 변화 + 난이도 UP + 출력 강화', message: '정체기는 성장의 전조야. 방법을 바꾸면 반드시 돌파할 수 있어!' },
      { type: 'mission', mission: '현재 내 영어 학습 루틴을 점검하고\n바꿀 수 있는 것 3가지를 적어 내일부터 실행하기', encouragement: '정체기를 넘으면 다음 레벨이 기다리고 있어!' },
    ],
  },

  // ═══════════════════════════════════════
  // 다이아 (마스터 영어) 1~10
  // ═══════════════════════════════════════

  'english-diamond-1': {
    id: 'english-diamond-1', chapterKey: 'english', tierKey: 'diamond', stageNumber: 1,
    title: '영어 연설 분석과 수사법',
    cards: [
      { type: 'concept', title: '위대한 영어 연설의 기술', description: '역사적 영어 연설에는 강력한 수사법이 숨어 있어.\n\n3대 수사법:\n1) 반복(Repetition): 핵심 구절을 반복\n"I have a dream..." - MLK\n\n2) 3의 법칙(Rule of Three): 3개씩 나열\n"Government of the people, by the people, for the people"\n\n3) 대조(Antithesis): 반대 개념 병치\n"Ask not what your country can do for you,\nask what you can do for your country." - JFK\n\n이 기법들은 에세이, 발표, 토론에서도 활용할 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '🔁', label: '반복', description: '핵심 메시지를 반복해서 강조' },
        { icon: '3️⃣', label: '3의 법칙', description: '3개씩 나열하면 리듬감과 설득력 UP' },
        { icon: '⚖️', label: '대조', description: '반대 개념을 나란히 놓아 임팩트 강화' },
        { icon: '🎤', label: '연설 분석', description: '명연설을 분석하며 기법을 체화' },
      ]},
      { type: 'example', bad: { label: '발표 A', story: '"우리 제품은 좋습니다. 사주세요."\n평범한 문장의 나열로 아무도 기억하지 못했다.' }, good: { label: '발표 B', story: '"Our product is faster, smarter, and simpler."\n3의 법칙을 써서 임팩트 있게 전달했다.\n청중이 "faster, smarter, simpler"를 기억했다.' }},
      { type: 'ox', statement: '수사법은 정치 연설에서만 쓰이는 특별한 기술이다.', answer: false, feedback: '수사법은 에세이, 발표, 면접, 일상 대화에서도\n설득력을 높이는 데 활용할 수 있어!' },
      { type: 'multipleChoice', question: '"Life, liberty, and the pursuit of happiness"에 쓰인 수사법은?', options: ['반복(Repetition)', '대조(Antithesis)', '3의 법칙(Rule of Three)', '은유(Metaphor)'], correctIndex: 2, explanation: '3개를 나열하는 Rule of Three!\n3이라는 숫자는 기억에 가장 잘 남는 구조야.' },
      { type: 'feedback', summary: '수사법 = 반복 + 3의 법칙 + 대조로 설득력 UP', message: '명연설을 분석하면 영어의 아름다움이 보여!' },
      { type: 'mission', mission: 'MLK "I Have a Dream" 또는 Steve Jobs 스탠포드 연설을\n읽거나 듣고 수사법 3가지를 찾아 표시하기', encouragement: '위대한 연설을 분석하는 것 자체가 최고의 영어 공부야!' },
    ],
  },

  'english-diamond-2': {
    id: 'english-diamond-2', chapterKey: 'english', tierKey: 'diamond', stageNumber: 2,
    title: '영어 원서 읽기 전략',
    cards: [
      { type: 'concept', title: '영어 원서 완독 로드맵', description: '영어 원서를 끝까지 읽으려면 전략이 필요해.\n\n1단계: 책 선택\n- 관심 있는 장르 (재미 최우선!)\n- 페이지당 모르는 단어 5개 이하\n- 추천: Holes, Wonder, The Giver\n\n2단계: 읽기 규칙\n- 하루 10~20페이지 목표\n- 모르는 단어는 3번 나올 때까지 넘기기\n- 사전은 최소한만 (흐름 유지)\n\n3단계: 기록\n- 좋아하는 문장 밑줄\n- 챕터별 한 줄 요약\n- 읽은 페이지 수 기록으로 동기부여' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '책 선택', description: '재미 + 적절한 난이도가 핵심' },
        { icon: '📏', label: '하루 목표', description: '매일 10~20페이지 꾸준히' },
        { icon: '🚫', label: '사전 최소화', description: '3번 나온 단어만 찾기' },
        { icon: '📝', label: '읽기 기록', description: '밑줄 + 요약 + 페이지 기록' },
      ]},
      { type: 'example', bad: { label: '시영의 시도', story: '해리포터 원서 1권을 샀지만\n모르는 단어마다 사전을 찾아서\n30페이지에서 포기했다.' }, good: { label: '채은의 전략', story: 'Wonder(줄거리가 쉽고 감동적)부터 시작했다.\n모르는 단어는 넘기고 매일 15페이지씩.\n한 달 만에 첫 원서를 완독하고\n두 번째 책으로 넘어갔다.' }},
      { type: 'ox', statement: '영어 원서를 읽을 때 모르는 단어는 반드시 사전에서 찾아야 한다.', answer: false, feedback: '모든 단어를 찾으면 흐름이 끊기고 지루해져.\n3번 이상 나오는 단어만 찾는 게 효율적이야!' },
      { type: 'multipleChoice', question: '영어 원서 첫 도전으로 가장 적합한 책은?', options: ['노인과 바다 (Hemingway 원서)', '해리포터 시리즈', 'Wonder 또는 Holes 같은 청소년 소설', '뉴스위크 잡지'], correctIndex: 2, explanation: '청소년 소설은 문장이 비교적 쉽고 스토리가 재미있어서\n첫 원서로 최적이야!' },
      { type: 'feedback', summary: '원서 = 재미있는 책 + 매일 조금씩 + 사전 최소화', message: '첫 원서 완독의 성취감은 잊을 수 없을 거야!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 원서 하나를 골라서\n오늘 10페이지 읽어보기 (사전 없이 도전!)', encouragement: '첫 10페이지가 원서 완독의 시작이야!' },
    ],
  },

  'english-diamond-3': {
    id: 'english-diamond-3', chapterKey: 'english', tierKey: 'diamond', stageNumber: 3,
    title: '영어 속 문화와 유머 이해',
    cards: [
      { type: 'concept', title: '문화를 알아야 영어가 보인다', description: '영어에는 문화적 맥락 없이 이해할 수 없는 표현이 많아.\n\n문화 기반 표현들:\n- "Break a leg!" = 행운을 빌어 (극장 미신에서 유래)\n- "It\'s raining cats and dogs" = 폭우 (17세기 런던 유래)\n- "The ball is in your court" = 네 차례야 (테니스에서)\n- "Elephant in the room" = 모두 알지만 말 안 하는 문제\n\n영어 유머 이해:\n- Pun (말장난): "I\'m reading a book on anti-gravity. It\'s impossible to put down."\n- Sarcasm (빈정거림): "Oh, great!" = 사실은 안 좋다는 뜻\n\n문화를 알면 영어가 입체적으로 보여!' },
      { type: 'summary', keywords: [
        { icon: '🌍', label: '문화 맥락', description: '표현 뒤에 숨은 역사와 문화' },
        { icon: '😄', label: 'Pun(말장난)', description: '단어의 이중 의미를 활용한 유머' },
        { icon: '😏', label: 'Sarcasm', description: '반대로 말하는 빈정거림 이해' },
        { icon: '🎭', label: '문화 리터러시', description: '영어권 문화 상식을 쌓기' },
      ]},
      { type: 'example', bad: { label: '정우의 당황', story: '미국 친구가 "Break a leg!"이라고 해서\n"왜 다리를 부러뜨리라는 거야?" 당황했다.' }, good: { label: '소율의 이해', story: '"Break a leg"이 행운을 비는 표현인 걸 알고 있었다.\n"Thanks! I\'ll do my best!"로 자연스럽게 답했다.' }},
      { type: 'ox', statement: '"Break a leg"은 상대방을 해치라는 의미다.', answer: false, feedback: '극장 미신에서 유래한 행운의 표현이야.\n공연이나 시험 전에 "행운을 빌어!"라는 뜻이지!' },
      { type: 'multipleChoice', question: '"There\'s an elephant in the room"의 의미는?', options: ['방에 코끼리가 있다', '모두 알지만 아무도 말하지 않는 문제가 있다', '방이 매우 좁다', '큰 선물이 있다'], correctIndex: 1, explanation: '코끼리처럼 크고 뻔한데 아무도 언급하지 않는 문제!\n민감한 이슈를 가리킬 때 쓰는 표현이야.' },
      { type: 'feedback', summary: '문화 = 영어 표현의 진짜 의미를 여는 열쇠', message: '문화를 알수록 영어가 재미있고 깊어져!' },
      { type: 'mission', mission: '영어 문화 기반 표현 3개를 찾아서\n유래와 의미를 정리하고 예문 만들어보기', encouragement: '문화를 아는 사람이 진짜 영어 고수야!' },
    ],
  },

  'english-diamond-4': {
    id: 'english-diamond-4', chapterKey: 'english', tierKey: 'diamond', stageNumber: 4,
    title: '고급 작문: 논리적 연결어',
    cards: [
      { type: 'concept', title: '연결어(Transition Words)로 글의 흐름 만들기', description: '좋은 영어 글은 문장과 문장이 논리적으로 연결돼 있어.\n\n추가: Moreover, Furthermore, In addition\n대조: However, On the other hand, Nevertheless\n원인: Because, Due to, As a result\n예시: For instance, Such as, Specifically\n결론: In conclusion, Therefore, To sum up\n순서: First, Next, Finally\n\n연결어 없이 쓴 글은 문장의 나열이고,\n연결어를 쓴 글은 논리의 흐름이야.\n\n에세이 점수를 가르는 핵심 요소 중 하나가\n바로 이 연결어 사용이야.' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '추가', description: 'Moreover, Furthermore, In addition' },
        { icon: '🔀', label: '대조', description: 'However, Nevertheless, On the other hand' },
        { icon: '➡️', label: '인과', description: 'Therefore, As a result, Due to' },
        { icon: '📋', label: '예시/결론', description: 'For instance, In conclusion, To sum up' },
      ]},
      { type: 'example', bad: { label: '예시 A', story: '"Exercise is good. It reduces stress. It improves health."\n문장이 뚝뚝 끊기고 논리적 흐름이 없다.' }, good: { label: '예시 B', story: '"Exercise is beneficial for multiple reasons.\nFirst, it significantly reduces stress levels.\nMoreover, it improves overall physical health.\nTherefore, everyone should exercise regularly."\n연결어로 흐름이 자연스럽고 논리적이다.' }},
      { type: 'ox', statement: '연결어를 많이 쓸수록 글이 좋아진다.', answer: false, feedback: '적재적소에 쓰는 게 중요해.\n매 문장마다 연결어를 넣으면 오히려 부자연스러워!' },
      { type: 'multipleChoice', question: '"운동은 건강에 좋다. ______, 정신 건강에도 도움이 된다."에 들어갈 연결어는?', options: ['However', 'Moreover', 'Therefore', 'Nevertheless'], correctIndex: 1, explanation: '앞 문장에 내용을 추가하는 거니까\nMoreover(게다가)가 적절해!' },
      { type: 'feedback', summary: '연결어 = 문장의 나열을 논리의 흐름으로 바꾸는 도구', message: '연결어를 자유자재로 쓰면 글의 품격이 확 올라가!' },
      { type: 'mission', mission: '아무 주제로 5문장 영작하되\n각 문장을 다른 연결어로 연결해보기', encouragement: '연결어가 자연스러워지면 네이티브 수준의 글이야!' },
    ],
  },

  'english-diamond-5': {
    id: 'english-diamond-5', chapterKey: 'english', tierKey: 'diamond', stageNumber: 5,
    title: '영어 디베이트 실전',
    cards: [
      { type: 'concept', title: '영어 디베이트의 구조', description: '영어 디베이트(Debate)는 논리적 사고와 표현을 동시에 훈련해.\n\n기본 구조:\n1) Opening Statement: 주장 + 근거 3가지 예고\n2) Arguments: 각 근거를 데이터/예시로 뒷받침\n3) Rebuttal: 상대 주장 반박\n4) Closing Statement: 핵심 요약 + 강한 마무리\n\n유용한 디베이트 표현:\n- "I firmly believe that..."\n- "The evidence clearly shows..."\n- "My opponent claims..., however..."\n- "For all these reasons, I urge you to..."' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: 'Opening', description: '주장을 명확히 + 근거 3가지 예고' },
        { icon: '📊', label: 'Arguments', description: '데이터와 예시로 근거 뒷받침' },
        { icon: '⚔️', label: 'Rebuttal', description: '상대 주장의 약점을 논리적으로 반박' },
        { icon: '🏆', label: 'Closing', description: '핵심 요약 + 강한 마무리' },
      ]},
      { type: 'example', bad: { label: '디베이터 A', story: '"I think this is right because... um... it just makes sense."\n근거 없는 주장으로 설득력이 0이었다.' }, good: { label: '디베이터 B', story: '"I firmly believe school uniforms should be required.\nFirst, according to a 2023 study...\nSecond, uniforms reduce bullying by 35%...\nFinally, they save families $500 annually..."\n구조와 데이터로 강력하게 설득했다.' }},
      { type: 'ox', statement: '디베이트에서 감정적으로 호소하는 것이 가장 효과적이다.', answer: false, feedback: '디베이트는 논리와 증거가 핵심이야.\n감정적 호소만으로는 설득할 수 없어!' },
      { type: 'multipleChoice', question: '디베이트에서 상대 주장을 반박할 때 적절한 표현은?', options: ['"You\'re completely wrong."', '"That\'s a stupid argument."', '"My opponent raises a valid point, however the data suggests otherwise."', '"I don\'t care what you think."'], correctIndex: 2, explanation: '예의를 지키면서 논리적으로 반박하는 게\n디베이트의 핵심이야!' },
      { type: 'feedback', summary: '디베이트 = 논리 + 증거 + 구조 + 예의', message: '디베이트는 영어와 사고력을 동시에 키우는 최고의 훈련이야!' },
      { type: 'mission', mission: '"학생들은 스마트폰을 학교에 가져올 수 있어야 한다"\n찬성 또는 반대를 정해 Opening Statement를 영어로 작성하기', encouragement: '디베이트를 하면 영어와 사고력이 동시에 폭발적으로 성장해!' },
    ],
  },

  'english-diamond-6': {
    id: 'english-diamond-6', chapterKey: 'english', tierKey: 'diamond', stageNumber: 6,
    title: '영어 뉴스 기사 직접 쓰기',
    cards: [
      { type: 'concept', title: '뉴스 기사 작성법', description: '영어 뉴스 기사를 직접 써보면\n읽기·쓰기·어휘가 동시에 성장해.\n\n뉴스 기사의 5가지 요소:\n1) Headline: 핵심을 10단어 이내로\n2) Lead: 5W1H를 첫 1~2문장에\n3) Body: 중요한 정보 순서로 배치\n4) Quotes: 관계자의 말 인용\n5) Background: 배경 정보 제공\n\n뉴스 영어의 특징:\n- 짧고 명확한 문장\n- 수동태 활용 ("was arrested" 등)\n- 과거·현재 시제 혼용\n- 인용문에 "said" 동사 활용' },
      { type: 'summary', keywords: [
        { icon: '📰', label: 'Headline', description: '핵심을 짧고 임팩트 있게' },
        { icon: '📋', label: 'Lead(리드문)', description: '5W1H를 첫 문장에 담기' },
        { icon: '🔽', label: '역피라미드', description: '중요한 정보부터 순서대로' },
        { icon: '💬', label: 'Quotes', description: '인용문으로 신뢰도 높이기' },
      ]},
      { type: 'example', bad: { label: '기사 A', story: '"Something happened yesterday. It was really big. Many people were there."\n5W1H가 없어서 무슨 일인지 알 수 없다.' }, good: { label: '기사 B', story: '"Seoul Launches Free AI Education Program for Students\nThe Seoul Metropolitan Government announced Monday a new free AI education program for 10,000 middle school students, starting September."\nHeadline과 Lead가 명확하다.' }},
      { type: 'ox', statement: '뉴스 기사는 글쓴이의 개인 의견을 자유롭게 넣어도 된다.', answer: false, feedback: '뉴스 기사(보도)는 객관적 사실 중심이야.\n의견은 사설(editorial)에서만 쓸 수 있어!' },
      { type: 'multipleChoice', question: '뉴스 기사의 리드문(Lead)에 반드시 포함해야 하는 것은?', options: ['글쓴이의 감상', '배경 역사', '5W1H (누가, 무엇을, 언제, 어디서, 왜, 어떻게)', '광고 문구'], correctIndex: 2, explanation: '리드문에 5W1H를 담으면\n독자가 첫 문장만 읽어도 핵심을 알 수 있어!' },
      { type: 'feedback', summary: '기사 쓰기 = 읽기·쓰기·어휘의 종합 훈련', message: '기자처럼 쓰는 연습이 영어 실력을 종합적으로 키워줘!' },
      { type: 'mission', mission: '최근 관심 있는 사건을 골라\n영어 뉴스 기사를 작성해보기 (Headline + Lead + Body 5문장)', encouragement: '직접 기사를 써보면 뉴스 읽기도 더 잘 돼!' },
    ],
  },

  'english-diamond-7': {
    id: 'english-diamond-7', chapterKey: 'english', tierKey: 'diamond', stageNumber: 7,
    title: '영어 통번역의 기초',
    cards: [
      { type: 'concept', title: '통번역 기초 스킬', description: '통번역(통역+번역)은 영어 최고 수준의 스킬이야.\n\n번역의 핵심 원칙:\n1) 의역 > 직역: 의미를 자연스럽게 전달\n2) 원문 충실: 의미를 빠뜨리거나 추가하지 않기\n3) 대상 독자 고려: 누가 읽을지에 맞춰 톤 조절\n\n통역 기초 훈련:\n1) 사이트 트랜슬레이션: 글을 보며 즉석 번역\n2) 쉐도잉+의미 파악: 따라 말하며 뜻 이해\n3) 노트테이킹: 핵심만 기호로 빠르게 메모\n\n이 훈련은 통번역사가 아니어도\n영어 종합 실력을 극적으로 올려줘.' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '의역', description: '자연스러운 표현으로 의미 전달' },
        { icon: '📖', label: '사이트 번역', description: '텍스트를 보며 즉석 구두 번역' },
        { icon: '📝', label: '노트테이킹', description: '핵심을 기호로 빠르게 메모' },
        { icon: '🧠', label: '종합 훈련', description: '듣기+이해+표현을 동시에' },
      ]},
      { type: 'example', bad: { label: '직역 예시', story: '"It\'s raining cats and dogs."\n→ "고양이와 개가 비처럼 온다."\n직역하면 의미가 완전히 달라진다.' }, good: { label: '의역 예시', story: '"It\'s raining cats and dogs."\n→ "비가 억수같이 쏟아진다."\n의미를 자연스러운 한국어로 전달했다.' }},
      { type: 'ox', statement: '좋은 번역은 원문을 한 단어씩 정확히 옮기는 것이다.', answer: false, feedback: '좋은 번역은 의미를 자연스럽게 전달하는 의역이야.\n직역은 오히려 의미를 왜곡할 수 있어!' },
      { type: 'multipleChoice', question: '사이트 트랜슬레이션(Sight Translation)이란?', options: ['웹사이트를 번역하는 것', '텍스트를 보면서 즉석으로 구두 번역하는 훈련', '자막 번역', '기계 번역 사용'], correctIndex: 1, explanation: '글을 보면서 바로 입으로 번역하는 훈련이야.\n읽기+이해+표현을 동시에 훈련할 수 있어!' },
      { type: 'feedback', summary: '통번역 = 영어 종합 실력의 최고봉', message: '통번역 훈련은 모든 영어 스킬을 극적으로 올려줘!' },
      { type: 'mission', mission: '영어 뉴스 기사 3문장을 골라\n의역으로 자연스러운 한국어로 번역해보기', encouragement: '번역은 두 언어의 가교야. 최고의 종합 훈련이지!' },
    ],
  },

  'english-diamond-8': {
    id: 'english-diamond-8', chapterKey: 'english', tierKey: 'diamond', stageNumber: 8,
    title: '영어 창작 글쓰기',
    cards: [
      { type: 'concept', title: 'Creative Writing 시작하기', description: '영어로 창작 글을 쓰는 것은 최고 수준의 표현 훈련이야.\n\n창작 글쓰기 유형:\n1) Short Story (단편 소설)\n2) Poetry (시)\n3) Personal Essay (개인 에세이)\n4) Flash Fiction (초단편 - 300단어 이내)\n\n시작 팁:\n- Flash Fiction부터 시작 (부담 적음)\n- Writing Prompt 활용 (주제를 받아서 쓰기)\n- Show, don\'t tell: "She was sad" 대신\n  "Tears rolled down her cheeks as she stared at the empty chair."\n\n감정을 묘사하는 훈련이 영어 표현력을 폭발적으로 키워.' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: 'Flash Fiction', description: '300단어 이내 초단편으로 부담 없이 시작' },
        { icon: '🎭', label: 'Show Don\'t Tell', description: '감정을 직접 말하지 않고 보여주기' },
        { icon: '💡', label: 'Writing Prompt', description: '주제를 받아서 자유롭게 쓰기' },
        { icon: '📖', label: '다양한 장르', description: '소설, 시, 에세이 등 도전하기' },
      ]},
      { type: 'example', bad: { label: 'Tell(설명)', story: '"The man was very angry."\n감정을 직접 설명해서 밋밋하다.' }, good: { label: 'Show(묘사)', story: '"His fists clenched, veins bulging on his neck.\nHe slammed the door so hard the walls trembled."\n감정을 행동으로 보여줘서 생생하다.' }},
      { type: 'ox', statement: '영어 창작 글쓰기는 원어민만 할 수 있다.', answer: false, feedback: '짧은 Flash Fiction부터 시작하면 누구나 할 수 있어.\n완벽한 문법보다 표현하려는 시도가 중요해!' },
      { type: 'multipleChoice', question: '"Show, don\'t tell" 원칙에 맞는 문장은?', options: ['"She was happy."', '"She jumped up and down, laughing with tears in her eyes."', '"He felt very tired."', '"The weather was nice."'], correctIndex: 1, explanation: '감정을 직접 말하지 않고 행동·묘사로 보여주는 게\nShow, don\'t tell이야!' },
      { type: 'feedback', summary: '창작 = Show Don\'t Tell + Flash Fiction으로 시작', message: '영어로 이야기를 만드는 건 가장 즐거운 공부야!' },
      { type: 'mission', mission: 'Writing Prompt: "The last message I received said..."\n이 문장으로 시작하는 Flash Fiction(10문장)을 영어로 써보기', encouragement: '네가 만든 이야기가 세상에 하나뿐인 영어 작품이야!' },
    ],
  },

  'english-diamond-9': {
    id: 'english-diamond-9', chapterKey: 'english', tierKey: 'diamond', stageNumber: 9,
    title: '영어 협상과 설득의 기술',
    cards: [
      { type: 'concept', title: '영어 협상의 핵심 표현', description: '비즈니스 협상에서 쓰이는 영어 기술을 알아보자.\n\n1) 제안하기:\n"I\'d like to propose..." / "What if we..."\n\n2) 양보하기:\n"I\'m willing to... if you..." / "We could consider..."\n\n3) 거절하기 (부드럽게):\n"I appreciate the offer, but..." / "That\'s not quite what we had in mind."\n\n4) 합의하기:\n"I think we can agree on..." / "Let\'s move forward with..."\n\n5) 시간 벌기:\n"Let me think about that." / "Could we revisit this later?"\n\n직접적인 Yes/No보다 부드러운 표현이\n영어 비즈니스 문화의 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '제안', description: '"I\'d like to propose..." 제안하기' },
        { icon: '⚖️', label: '양보', description: '"I\'m willing to... if you..." 조건부 양보' },
        { icon: '🙅', label: '부드러운 거절', description: '직접 No 대신 우회적 표현' },
        { icon: '✅', label: '합의', description: '"Let\'s move forward with..." 합의 도출' },
      ]},
      { type: 'example', bad: { label: '직접적 거절', story: '"No, that\'s too expensive. I won\'t pay that."\n직접적 거절로 상대방이 불쾌해했다.' }, good: { label: '부드러운 거절', story: '"I appreciate the offer, but that\'s slightly beyond our budget.\nWould you be open to discussing a more competitive rate?"\n부드럽게 거절하면서 대안을 제시했다.' }},
      { type: 'ox', statement: '영어 비즈니스에서는 직접적으로 Yes/No를 말하는 것이 좋다.', answer: false, feedback: '영어 비즈니스 문화에서도 부드러운 표현이 중요해.\n직접적 거절보다 우회적 표현이 더 전문적으로 들려!' },
      { type: 'multipleChoice', question: '협상에서 시간을 벌고 싶을 때 적절한 표현은?', options: ['"I don\'t know."', '"Let me think about that and get back to you."', '"Whatever you say."', '"No comment."'], correctIndex: 1, explanation: '"Let me think about that"은 정중하게 시간을 벌면서\n전문적인 인상을 주는 표현이야!' },
      { type: 'feedback', summary: '협상 = 제안 + 양보 + 부드러운 거절 + 합의', message: '영어 협상 표현을 알면 비즈니스에서 자신감이 생겨!' },
      { type: 'mission', mission: '가격 협상 상황을 설정하고\n제안→거절→양보→합의까지의 대화를 영어로 작성해보기', encouragement: '협상 영어는 실전 비즈니스의 핵심 무기야!' },
    ],
  },

  'english-diamond-10': {
    id: 'english-diamond-10', chapterKey: 'english', tierKey: 'diamond', stageNumber: 10,
    title: '평생 영어 학습자로 살기',
    cards: [
      { type: 'concept', title: '영어는 완성이 아닌 여정이다', description: '영어 학습에는 "완료"가 없어.\n원어민도 매일 새로운 표현을 배워.\n\n평생 학습자의 마인드셋:\n1) 완벽을 버려라: 실수는 성장의 증거\n2) 즐거움을 찾아라: 취미와 영어를 결합\n3) 꾸준함이 왕이다: 매일 조금씩 > 가끔 많이\n4) 측정하라: 정기적으로 실력을 체크\n5) 나눠라: 배운 것을 남에게 가르치면 2배로 남아\n\n지금까지 배운 50가지 전략을 자신에게 맞게 조합해서\n나만의 영어 학습 시스템을 만들자.\n\n영어는 목적지가 아니라 여정이야.\n그 여정을 즐기는 사람이 결국 가장 멀리 가.' },
      { type: 'summary', keywords: [
        { icon: '🌱', label: '성장 마인드셋', description: '실수를 두려워하지 않는 자세' },
        { icon: '🎮', label: '즐거움 결합', description: '취미·관심사와 영어를 합치기' },
        { icon: '📊', label: '정기 측정', description: '3개월마다 실력 체크하기' },
        { icon: '🔄', label: '가르치며 배우기', description: '배운 것을 남에게 설명하면 2배' },
      ]},
      { type: 'example', bad: { label: '포기한 사람', story: '"3개월 했는데 아직도 원어민처럼 못해.\n나는 영어 체질이 아닌가 봐."\n완벽주의 때문에 포기했다.' }, good: { label: '즐기는 사람', story: '좋아하는 게임을 영어로, 넷플릭스를 영어 자막으로,\n요리 레시피를 영어로 찾아봤다.\n공부가 아니라 생활이 되니\n10년이 지나도 영어가 즐거웠다.' }},
      { type: 'ox', statement: '영어를 "완벽하게" 마스터할 수 있는 사람이 있다.', answer: false, feedback: '언어에 "완벽"은 없어.\n원어민도 항상 새로운 것을 배우고 있으니까.\n완벽 대신 꾸준함을 목표로 하자!' },
      { type: 'multipleChoice', question: '영어 학습을 평생 지속하는 가장 좋은 방법은?', options: ['매일 3시간 이상 의무적으로 공부하기', '영어를 일상과 취미에 자연스럽게 결합하기', '시험 점수 목표만 세우기', '원어민 수준이 될 때까지 집중하기'], correctIndex: 1, explanation: '영어가 공부가 아니라 생활이 되면\n평생 자연스럽게 성장할 수 있어!' },
      { type: 'feedback', summary: '영어 = 완성이 아닌 즐거운 여정', message: '여기까지 온 너는 이미 대단해.\n앞으로도 즐기면서 계속 걸어가자!' },
      { type: 'mission', mission: '지금까지 배운 전략을 바탕으로\n"나만의 영어 학습 시스템"을 한 페이지로 정리하기\n(매일 루틴 + 주간 목표 + 월간 측정 방법)', encouragement: '이 한 페이지가 평생 영어 성장의 설계도야. 축하해!' },
    ],
  },

}
