// 영어 영역 학습 콘텐츠 (브론즈 1~10)
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

}
