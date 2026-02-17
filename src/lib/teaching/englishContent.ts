// 영어 영역 학습 콘텐츠 (브론즈 1~10, 실버 1~10, 골드 1~10, 플래티넘 1~10, 다이아 1~10)
import type { Stage } from './lessonData'

export const ENGLISH_STAGES: Record<string, Stage> = {

  // ═══ 브론즈 (영어 공부법 기초) 1~10 ═══

  'english-bronze-1': {
    id: 'english-bronze-1', chapterKey: 'english', tierKey: 'bronze', stageNumber: 1,
    title: '영어 공부의 올바른 시작',
    cards: [
      { type: 'concept', title: '입력(Input)과 출력(Output)', description: '입력(듣기·읽기)을 충분히 쌓은 뒤\n출력(말하기·쓰기)으로 넘어가는 게 효율적!\n\n내 수준보다 약간 어려운 자료(i+1)로 공부해.' },
      { type: 'summary', keywords: [
        { icon: '👂', label: '듣기·읽기', description: '입력(Input) 훈련' },
        { icon: '🗣️', label: '말하기·쓰기', description: '출력(Output) 훈련' },
        { icon: '📊', label: '입력 우선', description: '충분한 입력이 먼저' },
        { icon: '🎯', label: 'i+1 원칙', description: '내 수준보다 약간 위' },
      ]},
      { type: 'example', bad: { label: '지민', story: '단어도 모르는데 말하기부터 했다.\n할 말이 없어서 좌절하고 포기했다.' }, good: { label: '수현', story: '매일 쉬운 팟캐스트 20분 듣기로 시작.\n3개월 뒤 귀가 트이니 말도 자연스럽게 나왔다.' }},
      { type: 'ox', statement: '영어는 처음부터 말하기 연습을 해야 빨리 는다.', answer: false, feedback: '충분한 입력 없이 출력을 강제하면 좌절만 커져.\n듣기·읽기로 기초를 쌓는 게 먼저야!' },
      { type: 'multipleChoice', question: '크라센의 "이해 가능한 입력" 이론의 핵심은?', options: ['무조건 어려운 원서 읽기', '내 수준보다 약간 위(i+1)의 자료로 학습', '원어민과 매일 대화', '문법 완벽히 외운 후 시작'], correctIndex: 1, explanation: '너무 쉬우면 성장이 없고, 너무 어려우면 학습이 안 돼.\n살짝 높은 입력이 핵심!' },
      { type: 'feedback', summary: '영어 = 입력 먼저, 출력은 자연스럽게', message: '쉬운 영어를 많이 듣고 읽는 것부터 시작!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 팟캐스트/유튜브를 찾아 10분 듣기', encouragement: '첫 10분이 영어 실력의 씨앗!' },
    ],
  },

  'english-bronze-2': {
    id: 'english-bronze-2', chapterKey: 'english', tierKey: 'bronze', stageNumber: 2,
    title: '영어 단어 암기의 과학',
    cards: [
      { type: 'concept', title: '에빙하우스 망각곡선과 간격 반복', description: '24시간 내에 67%를 잊어버려.\n\n간격 반복: 1일→3일→7일→14일→30일\n점점 간격을 늘려가며 복습하면 장기 기억!' },
      { type: 'summary', keywords: [
        { icon: '📉', label: '망각곡선', description: '24시간 내 67% 망각' },
        { icon: '🔁', label: '간격 반복', description: '점점 간격 늘려가며 복습' },
        { icon: '🧠', label: '장기 기억', description: '반복으로 단기→장기 전환' },
        { icon: '📱', label: 'Anki 활용', description: '간격 반복 자동화 앱' },
      ]},
      { type: 'example', bad: { label: '재현', story: '단어장 100개씩 외웠다.\n다음 날 70개를 까먹어 매번 처음부터.' }, good: { label: '하은', story: 'Anki에 매일 20개씩, 간격 반복 복습.\n한 달에 300개를 장기 기억시켰다.' }},
      { type: 'ox', statement: '영어 단어는 한 번에 많이 외우는 것이 가장 효율적이다.', answer: false, feedback: '매일 소량을 간격 반복하는 게\n훨씬 효율적이야!' },
      { type: 'multipleChoice', question: '간격 반복 학습법의 복습 순서는?', options: ['매일 똑같이 반복', '1일→3일→7일→14일→30일', '일주일에 한 번씩만', '한 달에 한 번 몰아서'], correctIndex: 1, explanation: '간격을 점점 늘려가며 복습하면\n뇌가 "중요한 정보"로 인식해 장기 저장!' },
      { type: 'feedback', summary: '단어 암기 = 소량 + 간격 반복 + 꾸준함', message: '하루 20개 간격 반복이면 1년에 3000개 이상!' },
      { type: 'mission', mission: 'Anki나 단어 앱에 오늘 20개 입력하고 첫 학습 시작', encouragement: '오늘 넣은 20개가 한 달 뒤 너의 무기!' },
    ],
  },

  'english-bronze-3': {
    id: 'english-bronze-3', chapterKey: 'english', tierKey: 'bronze', stageNumber: 3,
    title: '영어 듣기의 비밀: 쉐도잉',
    cards: [
      { type: 'concept', title: '쉐도잉(Shadowing) 훈련법', description: '원어민 음성을 듣고 0.5~1초 뒤에 따라 말하기!\n\n발음·억양·리듬을 동시에 훈련하고\n듣기와 말하기를 함께 향상시켜.' },
      { type: 'summary', keywords: [
        { icon: '🎧', label: '쉐도잉', description: '듣고 바로 따라 말하기' },
        { icon: '🔊', label: '연음·축약', description: 'want to→wanna 체화' },
        { icon: '🎵', label: '리듬·강세', description: '영어 강약 패턴 익히기' },
        { icon: '📈', label: '듣기+말하기', description: '두 실력 동시 향상' },
      ]},
      { type: 'example', bad: { label: '태민', story: '영어 드라마를 자막 없이 틀어놓고 멍하니 들었다.\n결국 한글 자막을 켰다.' }, good: { label: '서연', story: 'TED 1분 구간을 매일 쉐도잉.\n일주일 뒤 자연스럽게 따라갈 수 있었다.' }},
      { type: 'ox', statement: '쉐도잉은 영어 고급자만 할 수 있는 훈련법이다.', answer: false, feedback: '자기 수준에 맞는 자료를 고르면\n초보자도 충분히 할 수 있어!' },
      { type: 'multipleChoice', question: '효과적인 쉐도잉 순서는?', options: ['바로 따라 말하기→스크립트 확인', '스크립트 읽기→듣기→따라 말하기→녹음 비교', '영상 보기→자막 외우기→암기해서 말하기', '빠른 속도로 반복 듣기만'], correctIndex: 1, explanation: '스크립트로 이해→듣기→따라 말하기→녹음 비교\n이 순서가 가장 효과적!' },
      { type: 'feedback', summary: '쉐도잉 = 듣기 + 발음 + 억양을 한 번에', message: '하루 10분 쉐도잉이면 한 달 뒤 귀가 트여!' },
      { type: 'mission', mission: 'TED나 팟캐스트에서 30초 구간을 골라 3번 쉐도잉하기', encouragement: '통역사들도 이 훈련으로 시작했어!' },
    ],
  },

  'english-bronze-4': {
    id: 'english-bronze-4', chapterKey: 'english', tierKey: 'bronze', stageNumber: 4,
    title: '영어 문법, 이렇게 공부해',
    cards: [
      { type: 'concept', title: '문법은 규칙이 아니라 패턴', description: '규칙 암기 대신 예문으로 패턴을 익혀!\n\n"I have lived here for 10 years."\n패턴이 쌓이면 문법이 감각이 돼.' },
      { type: 'summary', keywords: [
        { icon: '🧩', label: '패턴 학습', description: '규칙 대신 예문으로 익히기' },
        { icon: '📝', label: '예문 중심', description: '실제 문장을 통째로' },
        { icon: '🔍', label: '상황 연결', description: '어떤 상황에서 쓰는지 맥락' },
        { icon: '✍️', label: '직접 작문', description: '배운 패턴으로 내 문장' },
      ]},
      { type: 'example', bad: { label: '민수', story: '문법책을 처음부터 끝까지 정리했다.\n영작할 때 하나도 안 떠올랐다.' }, good: { label: '유나', story: '"I have been ~ing" 예문 5개를 소리 내어 읽었다.\n비슷한 상황에서 자연스럽게 나왔다.' }},
      { type: 'ox', statement: '영어 문법은 규칙을 먼저 완벽히 외운 뒤에 문장을 만들어야 한다.', answer: false, feedback: '예문으로 패턴을 체화하는 게\n규칙 암기보다 훨씬 효과적!' },
      { type: 'multipleChoice', question: '영어 문법을 효과적으로 공부하는 방법은?', options: ['문법책 정리', '규칙 먼저 외우고 예문', '예문 통째로 익히며 패턴 체화', '문법 문제집 반복'], correctIndex: 2, explanation: '예문 속에서 패턴을 느끼는 게 핵심!\n예문→규칙 순서가 자연스러워.' },
      { type: 'feedback', summary: '문법 = 규칙 X, 예문 패턴 체화 O', message: '오늘부터 문법은 예문으로 익히자!' },
      { type: 'mission', mission: '문법 하나를 골라 예문 5개를 소리 내어 읽고 내 문장 2개 만들기', encouragement: '5개 예문이 문법의 진짜 실력이 돼!' },
    ],
  },

  'english-bronze-5': {
    id: 'english-bronze-5', chapterKey: 'english', tierKey: 'bronze', stageNumber: 5,
    title: '영어 읽기: 다독과 정독',
    cards: [
      { type: 'concept', title: '다독(Extensive Reading)의 힘', description: '다독: 쉬운 책을 많이 빠르게 읽기\n정독: 어려운 글을 천천히 분석\n\n초·중급자에게는 다독이 압도적으로 효과적!\n모르는 단어 페이지당 2~3개 이하인 책으로.' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '다독', description: '쉬운 책을 많이 재미있게' },
        { icon: '🔬', label: '정독', description: '어려운 글 천천히 분석' },
        { icon: '📖', label: 'Graded Reader', description: '수준별 영어 읽기 교재' },
        { icon: '🎯', label: '98% 이해', description: '대부분 이해 가능한 수준' },
      ]},
      { type: 'example', bad: { label: '준호', story: '해리포터 원서 1페이지마다 사전.\n10페이지에서 포기했다.' }, good: { label: '은지', story: 'Graded Reader Level 3부터 시작.\n사전 없이 술술 읽혀서 재미있었다.' }},
      { type: 'ox', statement: '영어 실력을 키우려면 어려운 원서에 도전해야 한다.', answer: false, feedback: '너무 어려운 책은 좌절만 줘.\n쉬운 책을 많이 읽는 다독이 효과적!' },
      { type: 'multipleChoice', question: '다독의 올바른 원칙은?', options: ['모르는 단어 모두 사전', '한 문장씩 번역', '98% 이해 가능한 쉬운 책을 많이', '어려운 책에 도전'], correctIndex: 2, explanation: '쉽고 재미있는 책을 많이 읽는 게 핵심!\n어휘와 문법 감각이 자연스럽게 쌓여.' },
      { type: 'feedback', summary: '읽기 실력 = 다독으로 양을 쌓기', message: '내 수준보다 쉬운 영어 책을 골라보자!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 책을 하나 골라 5페이지 읽기', encouragement: '사전 없이 읽는 쾌감을 느껴보자!' },
    ],
  },

  'english-bronze-6': {
    id: 'english-bronze-6', chapterKey: 'english', tierKey: 'bronze', stageNumber: 6,
    title: '영어 발음과 강세의 원리',
    cards: [
      { type: 'concept', title: '영어는 강세 타이밍 언어', description: '강세 있는 음절은 길고 크게,\n없는 음절은 짧고 약하게!\n\n이 리듬을 못 잡으면 원어민이 못 알아들어.' },
      { type: 'summary', keywords: [
        { icon: '🥁', label: '강세 박자', description: '강세 중심으로 리듬 흐름' },
        { icon: '📢', label: '강세 음절', description: '중요 음절은 길고 크게' },
        { icon: '🤫', label: '약화', description: '약한 음절은 /ə/로 줄어들어' },
        { icon: '🔗', label: '연음·탈락', description: 'want to→wanna 등' },
      ]},
      { type: 'example', bad: { label: '영호', story: '모든 단어를 또박또박 같은 세기로 말했다.\n원어민이 잘 못 알아들었다.' }, good: { label: '미나', story: '강세 단어를 강하게, 나머지는 빠르게.\n"Your English sounds natural!"이라는 칭찬을 받았다.' }},
      { type: 'ox', statement: '영어 발음은 모든 음절을 정확히 또박또박 말해야 좋다.', answer: false, feedback: '강세 음절만 강하게, 나머지는 약하게!\n또박또박은 오히려 부자연스러워.' },
      { type: 'multipleChoice', question: '"banana"의 올바른 강세 위치는?', options: ['BA-na-na (첫 음절)', 'ba-NA-na (두 번째)', 'ba-na-NA (마지막)', '모든 음절 동일'], correctIndex: 1, explanation: '두 번째 음절 "NA"에 강세가 와.\n영어 사전에서 강세 표시를 확인하는 습관을!' },
      { type: 'feedback', summary: '발음 = 강세 리듬 + 약화 + 연음', message: '강세만 잘 잡아도 발음이 확 좋아져!' },
      { type: 'mission', mission: '영어 문장 하나에서 강세 위치를 표시하고 리듬에 맞춰 5번 읽기', encouragement: '리듬을 타면 영어가 음악이 돼!' },
    ],
  },

  'english-bronze-7': {
    id: 'english-bronze-7', chapterKey: 'english', tierKey: 'bronze', stageNumber: 7,
    title: '영어 말하기: 청크로 말해',
    cards: [
      { type: 'concept', title: '청크(Chunk) 학습법', description: '영어를 잘하는 사람은 "덩어리(Chunk)"로 말해!\n\n"I\'d like to~" / "It depends on~"\n원어민 발화의 50~60%가 고정 청크야.' },
      { type: 'summary', keywords: [
        { icon: '🧱', label: '청크(Chunk)', description: '단어 덩어리를 통째로' },
        { icon: '⭐', label: '자동화', description: '생각 없이 바로 나오게' },
        { icon: '🔗', label: '연결', description: '청크+청크로 긴 문장' },
        { icon: '🎬', label: '실제 상황', description: '드라마에서 자주 쓰는 표현' },
      ]},
      { type: 'example', bad: { label: '동현', story: '단어를 하나씩 조합하니\n말이 끊기고 시간이 오래 걸렸다.' }, good: { label: '소희', story: '"I\'d like to go to the movies."\n청크를 통째로 외워 매끄럽게 나왔다.' }},
      { type: 'ox', statement: '영어를 잘하려면 단어를 많이 알아야지 덩어리로 외울 필요는 없다.', answer: false, feedback: '단어만 알면 조합하느라 말이 느려져.\n청크로 익히면 유창하게 말할 수 있어!' },
      { type: 'multipleChoice', question: '청크 학습의 가장 큰 장점은?', options: ['문법 몰라도 됨', '단어 적게 외워도 됨', '자동으로 입에서 나와 유창해짐', '발음 좋아짐'], correctIndex: 2, explanation: '청크의 핵심은 "자동화"!\n머릿속 조합 없이 바로 나와서 속도가 빨라져.' },
      { type: 'feedback', summary: '말하기 = 청크를 쌓아서 자동화하기', message: '오늘 단어 하나 대신 청크 하나를 외워보자!' },
      { type: 'mission', mission: '영어 청크 3개를 각각 5번씩 소리 내어 말하기', encouragement: '3개의 청크가 30개의 문장을 만들어!' },
    ],
  },

  'english-bronze-8': {
    id: 'english-bronze-8', chapterKey: 'english', tierKey: 'bronze', stageNumber: 8,
    title: '영어 쓰기: 일기부터 시작',
    cards: [
      { type: 'concept', title: '영어 일기가 쓰기 최고 훈련', description: '매일 3줄 영어 일기로 시작!\n\n뭘 했는지 / 어떤 기분이었는지 / 내일 뭘 할지\n완벽하지 않아도 돼. 쓰면서 느는 거야.' },
      { type: 'summary', keywords: [
        { icon: '📔', label: '영어 일기', description: '매일 3줄 영어로 기록' },
        { icon: '✏️', label: '쉽게 시작', description: '완벽하지 않아도 OK' },
        { icon: '🔄', label: '표현 재활용', description: '배운 단어·문법을 써보기' },
        { icon: '📈', label: '점진적 확장', description: '3줄→5줄→10줄로 늘리기' },
      ]},
      { type: 'example', bad: { label: '현석', story: '영어 에세이를 쓰려다\n첫 문장부터 막혀 30분 동안 한 줄도 못 썼다.' }, good: { label: '지은', story: '매일 3줄 영어 일기를 썼다.\n3개월 뒤 자연스럽게 10줄 이상 쓰게 됐다.' }},
      { type: 'ox', statement: '영어 쓰기는 문법이 완벽해야 시작할 수 있다.', answer: false, feedback: '완벽하지 않아도 써야 실력이 늘어!\n틀리면서 배우는 게 쓰기의 핵심.' },
      { type: 'multipleChoice', question: '영어 쓰기를 처음 시작할 때 가장 효과적인 방법은?', options: ['영어 에세이 쓰기', '매일 3줄 영어 일기', '번역기로 변환', '문법책 다 끝내고 시작'], correctIndex: 1, explanation: '짧고 쉬운 일기가 가장 부담 없고 효과적!\n매일 쓰는 습관이 실력으로 이어져.' },
      { type: 'feedback', summary: '영어 쓰기 = 매일 3줄 일기로 시작', message: '완벽하지 않아도 돼. 오늘 3줄만 써보자!' },
      { type: 'mission', mission: '오늘 하루를 영어 3줄로 적어보기', encouragement: '오늘의 3줄이 미래의 에세이가 돼!' },
    ],
  },

  'english-bronze-9': {
    id: 'english-bronze-9', chapterKey: 'english', tierKey: 'bronze', stageNumber: 9,
    title: '영어 환경 만들기: 몰입법',
    cards: [
      { type: 'concept', title: '영어 몰입 환경 만들기', description: '일상의 언어를 영어로 바꾸기!\n\n폰 언어 영어 변경 / 영어 자막 /\n영어 SNS / 셀프 토킹 / 영어 메모\n\n하루 중 영어 노출 시간이 많을수록 효과적.' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '디지털 환경', description: '폰·앱 언어를 영어로' },
        { icon: '🎬', label: '콘텐츠 전환', description: '영상·음악을 영어로' },
        { icon: '💭', label: '셀프 토킹', description: '혼자서 영어로 생각하고 말하기' },
        { icon: '⏰', label: '노출 시간', description: '하루 영어 노출 최대화' },
      ]},
      { type: 'example', bad: { label: '성호', story: '영어 공부는 학원 1시간뿐.\n나머지 23시간은 한국어만 썼다.' }, good: { label: '예진', story: '폰 언어 영어로, 유튜브는 영어 채널.\n따로 공부 안 해도 영어가 자연스러워졌다.' }},
      { type: 'ox', statement: '영어 환경은 해외에 나가야만 만들 수 있다.', answer: false, feedback: '스마트폰, 유튜브, 팟캐스트만으로도\n충분한 영어 몰입 환경을 만들 수 있어!' },
      { type: 'multipleChoice', question: '영어 몰입 환경에 해당하지 않는 것은?', options: ['폰 언어 영어로 변경', '한국어 자막으로 미드 시청', '영어 팟캐스트 듣기', '혼잣말을 영어로'], correctIndex: 1, explanation: '한국어 자막에 의존하면 영어 훈련이 안 돼.\n영어 자막이나 자막 없이가 몰입 환경!' },
      { type: 'feedback', summary: '몰입 = 일상 속 영어 노출 시간 늘리기', message: '폰 언어 하나 바꾸는 것부터 시작!' },
      { type: 'mission', mission: '오늘 영어 환경 변경 하나를 골라 바로 실행하기', encouragement: '환경을 바꾸면 습관이, 습관이 실력을 바꿔!' },
    ],
  },

  'english-bronze-10': {
    id: 'english-bronze-10', chapterKey: 'english', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 영어 학습 루틴 만들기',
    cards: [
      { type: 'concept', title: '4-Skills 데일리 루틴', description: '하루 40분(또는 20분)으로 4영역 균형 훈련:\n\n듣기 10분(쉐도잉) + 읽기 10분(다독) +\n쓰기 10분(일기) + 말하기 10분(청크)\n\n매일 하는 게 핵심이야!' },
      { type: 'summary', keywords: [
        { icon: '🎧', label: '듣기 10분', description: '쉐도잉 or 팟캐스트' },
        { icon: '📖', label: '읽기 10분', description: '다독 or 뉴스 기사' },
        { icon: '✍️', label: '쓰기 10분', description: '영어 일기 or 요약' },
        { icon: '🗣️', label: '말하기 10분', description: '셀프 토킹 or 청크' },
      ]},
      { type: 'example', bad: { label: '진우', story: '불규칙하게 몰아서 공부하니 실력이 안 늘었다.' }, good: { label: '나연', story: '매일 아침 40분 4영역 루틴.\n3개월 뒤 토익이 150점 올랐다.' }},
      { type: 'ox', statement: '영어는 하루에 한 가지 영역만 집중하는 게 효과적이다.', answer: false, feedback: '4가지를 매일 조금씩 하는 게\n뇌가 다양하게 영어를 처리하니 효과적!' },
      { type: 'multipleChoice', question: '효과적인 영어 학습 루틴의 핵심은?', options: ['주말에 몰아서', '한 영역만 파기', '매일 4영역 균형 훈련', '기분 좋을 때만'], correctIndex: 2, explanation: '매일 4영역을 골고루 훈련하면\n실력이 균형 있게 꾸준히 성장!' },
      { type: 'feedback', summary: '영어 루틴 = 매일 40분, 4영역 균형', message: '매일의 작은 루틴이 큰 변화를 만들어!' },
      { type: 'mission', mission: '나만의 영어 학습 루틴표를 만들어 내일부터 실행하기', encouragement: '루틴이 곧 실력이야!' },
    ],
  },

  // ═══ 실버 (중급 영어 전략) 1~10 ═══

  'english-silver-1': {
    id: 'english-silver-1', chapterKey: 'english', tierKey: 'silver', stageNumber: 1,
    title: '어원으로 단어 폭발시키기',
    cards: [
      { type: 'concept', title: '어원(Root) 학습법', description: '영어 단어의 60%가 라틴·그리스어 어원에서 왔어.\n\nport=나르다: transport, export, import\n어원 하나로 10개 이상 단어를 연결!' },
      { type: 'summary', keywords: [
        { icon: '🌳', label: '어원(Root)', description: '단어의 핵심 뿌리' },
        { icon: '🔗', label: '접두사', description: 'un-, re-, pre- 등' },
        { icon: '🧩', label: '접미사', description: '-tion, -ment, -able 등' },
        { icon: '💡', label: '유추 능력', description: '처음 보는 단어도 유추' },
      ]},
      { type: 'example', bad: { label: '현우', story: 'transport, export, import를 따로 외웠다.\n비슷한 단어가 항상 헷갈렸다.' }, good: { label: '소연', story: 'port=나르다를 먼저 알고 접두사만 바꿔 연결.\n한 번에 3개를 확실히 구별했다.' }},
      { type: 'ox', statement: '영어 단어는 하나하나 개별적으로 외워야 한다.', answer: false, feedback: '어원을 알면 가족처럼 연결돼.\n하나를 알면 열 개를 유추할 수 있어!' },
      { type: 'multipleChoice', question: '"incredible"의 뜻은? (in=아닌, cred=믿다, ible=할 수 있는)', options: ['믿을 수 있는', '믿을 수 없는', '다시 믿는', '함께 믿는'], correctIndex: 1, explanation: 'in(아닌)+cred(믿다)+ible(가능)\n= 믿을 수 없는 = 놀라운!' },
      { type: 'feedback', summary: '어원 = 뿌리를 알면 가지가 보인다', message: '어원 10개만 알면 100개 단어가 연결돼!' },
      { type: 'mission', mission: '어원 하나를 골라 관련 단어 5개를 어원 분해해보기', encouragement: '뿌리를 알면 숲이 보여!' },
    ],
  },

  'english-silver-2': {
    id: 'english-silver-2', chapterKey: 'english', tierKey: 'silver', stageNumber: 2,
    title: '콜로케이션: 단어의 짝꿍',
    cards: [
      { type: 'concept', title: '콜로케이션이란?', description: '자주 함께 쓰이는 단어 조합!\n\nmake a decision (O) / do a decision (X)\nheavy rain (O) / strong rain (X)\n\n콜로케이션을 알면 자연스러운 영어가 돼.' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '콜로케이션', description: '자주 함께 쓰이는 조합' },
        { icon: '✅', label: 'make/do 구별', description: 'make a mistake 등' },
        { icon: '🌧️', label: '형용사+명사', description: 'heavy rain 등 자연스러운 짝' },
        { icon: '📖', label: '사전 활용', description: '콜로케이션 사전으로 확인' },
      ]},
      { type: 'example', bad: { label: '태준', story: '"I did a big mistake." 문법은 맞지만\n원어민이 들으면 어색했다.' }, good: { label: '민서', story: '"I made a big mistake."\nmake a mistake 콜로케이션을 알아서 자연스러웠다.' }},
      { type: 'ox', statement: '문법만 맞으면 어떤 단어 조합이든 자연스럽다.', answer: false, feedback: '문법이 맞아도 콜로케이션이 틀리면 부자연스러워.\ndo가 아니라 make a mistake야!' },
      { type: 'multipleChoice', question: '올바른 콜로케이션은?', options: ['do a decision', 'make a decision', 'take a decision', 'have a decision'], correctIndex: 1, explanation: 'make a decision이 가장 일반적인 영어 콜로케이션!' },
      { type: 'feedback', summary: '콜로케이션 = 자연스러운 영어의 비밀', message: '단어를 짝꿍과 함께 외우자!' },
      { type: 'mission', mission: 'make와 do가 들어가는 콜로케이션 각 5개씩 정리하기', encouragement: '짝꿍을 아는 게 진짜 어휘력!' },
    ],
  },

  'english-silver-3': {
    id: 'english-silver-3', chapterKey: 'english', tierKey: 'silver', stageNumber: 3,
    title: '영어 뉴스로 독해력 키우기',
    cards: [
      { type: 'concept', title: '뉴스 영어 읽기 전략', description: '뉴스 기사 구조: 헤드라인→리드문(5W1H)→본문\n\n초보 추천: BBC Learning English, VOA,\nNews in Levels(수준별 같은 뉴스)' },
      { type: 'summary', keywords: [
        { icon: '📰', label: '역피라미드', description: '중요한 내용이 앞에' },
        { icon: '📋', label: '5W1H', description: 'Who,What,When,Where,Why,How' },
        { icon: '📊', label: '수준별 매체', description: 'BBC, VOA 학습용 뉴스' },
        { icon: '📝', label: '요약 연습', description: '기사를 한 줄로 요약' },
      ]},
      { type: 'example', bad: { label: '성진', story: 'CNN 기사를 읽었는데 모르는 단어 투성이.\n한 기사에 1시간이 걸려 포기했다.' }, good: { label: '유리', story: 'News in Levels에서 매일 기사 하나.\n한 달 뒤 BBC도 읽을 수 있게 됐다.' }},
      { type: 'ox', statement: '영어 뉴스는 고급자만 읽을 수 있다.', answer: false, feedback: 'BBC Learning English, VOA 같은 학습용 뉴스는\n초·중급자도 충분히 읽을 수 있어!' },
      { type: 'multipleChoice', question: '뉴스 기사 핵심을 빨리 파악하는 방법은?', options: ['전체를 꼼꼼히', '헤드라인과 리드문 먼저', '마지막 문단 먼저', '사진 설명만'], correctIndex: 1, explanation: '역피라미드 구조라서\n헤드라인과 리드문에 핵심이 다 있어!' },
      { type: 'feedback', summary: '뉴스 = 헤드라인·리드문 먼저 + 수준별 매체', message: '매일 기사 하나가 독해력의 기초 체력!' },
      { type: 'mission', mission: '학습용 뉴스 기사 하나에서 5W1H를 찾아 정리하기', encouragement: '오늘의 기사가 세상과 영어를 동시에 넓혀!' },
    ],
  },

  'english-silver-4': {
    id: 'english-silver-4', chapterKey: 'english', tierKey: 'silver', stageNumber: 4,
    title: '리스닝: 딕테이션 훈련',
    cards: [
      { type: 'concept', title: '딕테이션(Dictation)', description: '영어를 듣고 받아쓰는 정밀 듣기 훈련!\n\n전체 듣기→문장 단위 받아쓰기→\n수정→스크립트 비교→틀린 부분 분석' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: '딕테이션', description: '듣고 받아쓰는 정밀 훈련' },
        { icon: '👂', label: '취약점 발견', description: '못 듣는 부분 정확히 파악' },
        { icon: '🔗', label: '연음 인식', description: 'kind of→kinda 체화' },
        { icon: '📊', label: '오답 분석', description: '틀린 부분 패턴 파악' },
      ]},
      { type: 'example', bad: { label: '재영', story: '듣기 문제를 맞고 틀리고만 확인.\n왜 틀렸는지 분석 안 하니 같은 유형 반복 오답.' }, good: { label: '하린', story: '매일 1분 딕테이션으로 취약점 발견.\nhave의 약형 /əv/를 집중 연습했다.' }},
      { type: 'ox', statement: '딕테이션은 모든 단어를 100% 맞춰야 효과가 있다.', answer: false, feedback: '틀린 부분을 발견하고 분석하는 게 핵심!\n틀려야 배울 수 있어.' },
      { type: 'multipleChoice', question: '딕테이션의 가장 큰 효과는?', options: ['쓰기 속도 향상', '어휘력 증가', '못 듣는 부분을 파악하고 교정', '발음 교정'], correctIndex: 2, explanation: '"내가 뭘 못 듣는지" 정확히 아는 게\n딕테이션의 핵심 가치야!' },
      { type: 'feedback', summary: '딕테이션 = 듣기 취약점을 정밀 타격', message: '매일 1분이면 한 달 뒤 귀가 달라져!' },
      { type: 'mission', mission: '영어 음원 30초를 딕테이션하고 스크립트와 비교하기', encouragement: '틀린 곳이 곧 성장 포인트!' },
    ],
  },

  'english-silver-5': {
    id: 'english-silver-5', chapterKey: 'english', tierKey: 'silver', stageNumber: 5,
    title: '영영사전 활용법',
    cards: [
      { type: 'concept', title: '왜 영영사전을 써야 할까?', description: '영한사전은 1:1 대응이지만\n영영사전은 개념을 영어로 설명해줘.\n\nsee vs watch vs look의 뉘앙스 차이는\n영한사전으로 절대 알 수 없어!' },
      { type: 'summary', keywords: [
        { icon: '📕', label: '영영사전', description: '영어를 영어로 이해' },
        { icon: '🎨', label: '뉘앙스', description: '비슷한 단어의 미묘한 차이' },
        { icon: '💭', label: '영어 사고', description: '번역 없이 바로 이해' },
        { icon: '📱', label: '추천 사전', description: 'Longman, Oxford, Cambridge' },
      ]},
      { type: 'example', bad: { label: '동호', story: '"see=보다, watch=보다, look=보다"\n아무거나 써서 시험에서 계속 틀렸다.' }, good: { label: '수빈', story: '영영사전에서 see/watch/look 차이를 확인.\n정확하게 구별해서 쓸 수 있게 됐다.' }},
      { type: 'ox', statement: '초급자는 영영사전을 쓸 수 없다.', answer: false, feedback: 'Longman, Oxford Learner\'s는 쉬운 영어로 설명해서\n초·중급자도 충분히 사용 가능!' },
      { type: 'multipleChoice', question: '영영사전의 가장 큰 장점은?', options: ['빠르게 뜻 찾기', '뉘앙스와 사용법을 정확히 파악', '한국어 해석이 자세함', '발음 기호 정확'], correctIndex: 1, explanation: '뉘앙스, 사용 맥락, 예문을\n영어로 보여줘서 정확한 의미를 알 수 있어!' },
      { type: 'feedback', summary: '영영사전 = 영어를 영어로 이해하는 열쇠', message: '모르는 단어를 영영사전으로 먼저 찾아보자!' },
      { type: 'mission', mission: '비슷한 단어 한 쌍을 영영사전에서 뉘앙스 차이 정리하기', encouragement: '뉘앙스를 아는 게 진짜 영어 실력!' },
    ],
  },

  'english-silver-6': {
    id: 'english-silver-6', chapterKey: 'english', tierKey: 'silver', stageNumber: 6,
    title: '영어 시제 완전 정복',
    cards: [
      { type: 'concept', title: '12시제를 3x4로 정리', description: '시간: 과거/현재/미래\n관점: 단순/진행/완료/완료진행\n\n핵심은 각 시제가 "어떤 상황"에서 쓰이는지!\n상황의 차이를 느끼면 시제가 자연스러워져.' },
      { type: 'summary', keywords: [
        { icon: '⏰', label: '3가지 시간', description: '과거, 현재, 미래' },
        { icon: '🔍', label: '4가지 관점', description: '단순, 진행, 완료, 완료진행' },
        { icon: '🎯', label: '상황 중심', description: '어떤 상황에서 쓰는지' },
        { icon: '📊', label: '3x4 표', description: '12시제를 한눈에 정리' },
      ]},
      { type: 'example', bad: { label: '지훈', story: '시제 공식을 외웠지만\n언제 써야 하는지 몰라 매번 틀렸다.' }, good: { label: '예나', story: '각 시제별 대표 상황을 하나씩 외웠다.\n상황으로 기억하니 자연스럽게 골라 썼다.' }},
      { type: 'ox', statement: '현재완료(have p.p.)와 과거시제(V-ed)는 같은 의미다.', answer: false, feedback: '과거: 과거 사실만 / 현재완료: 현재까지 영향\n"I lost my key" vs "I have lost my key"는 달라!' },
      { type: 'multipleChoice', question: '"나는 3년째 서울에 살고 있다"를 영어로?', options: ['I lived in Seoul for 3 years.', 'I have lived in Seoul for 3 years.', 'I am living in Seoul for 3 years.', 'I was living in Seoul for 3 years.'], correctIndex: 1, explanation: '과거부터 현재까지 계속 진행 중이니\n현재완료 have lived를 써야 해!' },
      { type: 'feedback', summary: '시제 = 공식 X, 상황별 사용 O', message: '12시제 표를 그리고 대표 예문 하나씩 외우자!' },
      { type: 'mission', mission: '12시제 표를 직접 그리고 각 시제마다 대표 예문 적기', encouragement: '이 표 하나가 시제의 모든 것을 정리해줘!' },
    ],
  },

  'english-silver-7': {
    id: 'english-silver-7', chapterKey: 'english', tierKey: 'silver', stageNumber: 7,
    title: '리스닝: 예측하며 듣기',
    cards: [
      { type: 'concept', title: 'Top-Down 리스닝', description: '모든 단어를 듣지 않아도 돼!\n\n상황·맥락으로 예측 → 키워드만 포착 →\n모르는 단어는 넘기고 전체 흐름 파악' },
      { type: 'summary', keywords: [
        { icon: '⬇️', label: 'Top-Down', description: '맥락으로 예측하며 듣기' },
        { icon: '⬆️', label: 'Bottom-Up', description: '단어 하나하나 정확히' },
        { icon: '🔑', label: '키워드 포착', description: '핵심 단어만 잡아 의미 파악' },
        { icon: '🧠', label: '예측 능력', description: '나올 내용을 미리 예상' },
      ]},
      { type: 'example', bad: { label: '현석', story: '모든 단어를 다 들으려다\n한 단어 놓치면 나머지도 전부 놓쳤다.' }, good: { label: '나영', story: '문제를 먼저 읽고 예측한 뒤\n키워드만 집중해서 전체를 파악했다.' }},
      { type: 'ox', statement: '듣기를 잘하려면 모든 단어를 빠짐없이 들어야 한다.', answer: false, feedback: '원어민도 모든 단어를 다 듣지 않아.\n맥락과 키워드로 전체를 파악하는 게 자연스러운 듣기!' },
      { type: 'multipleChoice', question: 'Top-Down 리스닝의 핵심은?', options: ['모든 단어 받아쓰기', '문맥으로 예측하며 듣기', '빠른 속도로 듣기', '문법 분석하며 듣기'], correctIndex: 1, explanation: '큰 그림을 먼저 잡으면\n세부 내용도 쉽게 이해돼!' },
      { type: 'feedback', summary: '듣기 = 예측 + 키워드 + 전체 흐름', message: '예측하며 듣는 습관이 듣기를 바꿔!' },
      { type: 'mission', mission: '영어 음원 듣기 전 키워드 5개를 예측해 적고 확인하기', encouragement: '예측이 맞을수록 듣기가 쉬워져!' },
    ],
  },

  'english-silver-8': {
    id: 'english-silver-8', chapterKey: 'english', tierKey: 'silver', stageNumber: 8,
    title: '패러프레이징: 바꿔 말하기',
    cards: [
      { type: 'concept', title: '패러프레이징의 힘', description: '같은 내용을 다른 표현으로 바꿔 말하기!\n\n단어가 안 떠올라도 돌려서 설명 가능.\n같은 의미를 3가지로 말할 수 있으면 실력 UP!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '바꿔 말하기', description: '같은 의미, 다른 표현' },
        { icon: '💬', label: '돌려 설명', description: '단어 몰라도 전달 가능' },
        { icon: '📈', label: '표현력 확장', description: '여러 가지로 말하기' },
        { icon: '🎯', label: '시험 핵심', description: '동의어, 요약 문제 스킬' },
      ]},
      { type: 'example', bad: { label: '시현', story: '영어 단어가 안 떠올라\n말을 멈추고 포기했다.' }, good: { label: '윤서', story: '"refrigerator"가 안 떠올랐지만\n"the big cold box in the kitchen"으로 설명했다.' }},
      { type: 'ox', statement: '영어를 잘하려면 정확한 단어를 항상 사용해야 한다.', answer: false, feedback: '돌려서 설명하는 것도 영어 실력!\n원어민도 패러프레이징을 자주 해.' },
      { type: 'multipleChoice', question: '"He ran very fast"의 패러프레이징은?', options: ['He ran very fast.', 'He sprinted at full speed.', 'He walked quickly.', 'He was slow.'], correctIndex: 1, explanation: '"ran very fast"를 "sprinted at full speed"로 바꾸면\n같은 의미를 더 풍부하게 표현!' },
      { type: 'feedback', summary: '패러프레이징 = 여러 방법으로 말하기', message: '표현의 폭이 넓어지면 영어가 자유로워져!' },
      { type: 'mission', mission: '"The weather is very cold today"를 3가지로 바꿔 써보기', encouragement: '바꿔 말하는 연습이 진짜 표현력!' },
    ],
  },

  'english-silver-9': {
    id: 'english-silver-9', chapterKey: 'english', tierKey: 'silver', stageNumber: 9,
    title: '영어 회화: 필러와 전환 표현',
    cards: [
      { type: 'concept', title: '필러와 전환 표현', description: '필러: Well, / Actually, / I mean, /\nLet me think... (생각할 시간 벌기)\n\n전환: By the way, / Speaking of which, /\nAnyway, (화제 바꾸기)' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '필러', description: '생각할 시간을 벌어주는 표현' },
        { icon: '🔀', label: '전환 표현', description: '화제를 바꾸는 표현' },
        { icon: '🗣️', label: '유창성', description: '대화 흐름이 끊기지 않게' },
        { icon: '⚠️', label: '과용 주의', description: '너무 많으면 산만' },
      ]},
      { type: 'example', bad: { label: '재민', story: '"음... 어... 그게..." 한국어 필러가 나왔다.' }, good: { label: '하나', story: '"Well, let me think... Actually, I believe..."\n영어 필러를 자연스럽게 써서 매끄러웠다.' }},
      { type: 'ox', statement: '영어로 말할 때 "well" 같은 표현은 실력 부족의 증거다.', answer: false, feedback: '원어민도 well, you know을 자주 써.\n적절한 필러는 자연스러운 대화의 일부!' },
      { type: 'multipleChoice', question: '화제를 바꿀 때 쓰는 표현은?', options: ['I mean...', 'By the way...', 'You know...', 'Let me think...'], correctIndex: 1, explanation: '"By the way(그건 그렇고)"는\n새로운 화제로 넘어가는 전환 표현!' },
      { type: 'feedback', summary: '필러+전환 = 유창한 대화의 윤활유', message: '필러 5개만 익숙해져도 대화가 달라져!' },
      { type: 'mission', mission: '오늘 영어로 말할 때 Well, Actually, I mean 각 2번 사용하기', encouragement: '필러가 자연스러워지면 원어민처럼 들려!' },
    ],
  },

  'english-silver-10': {
    id: 'english-silver-10', chapterKey: 'english', tierKey: 'silver', stageNumber: 10,
    title: '오답 노트로 약점 공략',
    cards: [
      { type: 'concept', title: '영어 오답 노트 작성법', description: '오답 노트 구성:\n문제 → 내 답 vs 정답 → 틀린 이유 분석 →\n핵심 규칙 정리 → 유사 예문 추가\n\n같은 실수를 두 번 하지 않는 무기!' },
      { type: 'summary', keywords: [
        { icon: '📓', label: '오답 노트', description: '틀린 문제 체계적 정리' },
        { icon: '🔍', label: '원인 분석', description: '왜 틀렸는지 근본 원인' },
        { icon: '🔁', label: '패턴 발견', description: '반복 취약 유형 찾기' },
        { icon: '📈', label: '시험 전 복습', description: '약점 집중 보강' },
      ]},
      { type: 'example', bad: { label: '우진', story: '정답만 확인하고 넘어갔다.\n다음에 같은 유형을 또 틀렸다.' }, good: { label: '채원', story: '원인을 적었더니 현재완료 구별 약점 발견.\n집중 복습하니 그 유형은 다시 안 틀렸다.' }},
      { type: 'ox', statement: '오답 노트는 틀린 답만 기록하면 된다.', answer: false, feedback: '"왜 틀렸는지" 원인 분석과\n관련 규칙, 유사 예문까지 정리해야 효과적!' },
      { type: 'multipleChoice', question: '오답 노트의 가장 중요한 항목은?', options: ['문제 번호', '정답 기록', '틀린 원인 분석', '날짜 기록'], correctIndex: 2, explanation: '원인을 분석해야 같은 실수를 반복하지 않아.\n"왜?"가 오답 노트의 핵심!' },
      { type: 'feedback', summary: '오답 노트 = 같은 실수를 반복하지 않는 무기', message: '실수에서 배우는 사람이 가장 빨리 성장!' },
      { type: 'mission', mission: '최근 틀린 영어 문제 3개를 오답 노트로 작성하기', encouragement: '오늘의 오답 노트가 내일의 정답을 만들어!' },
    ],
  },



  // ═══ 골드 (고급 영어 스킬) 1~10 ═══

  'english-gold-1': {
    id: 'english-gold-1', chapterKey: 'english', tierKey: 'gold', stageNumber: 1,
    title: '영어 토론과 논리적 말하기',
    cards: [
      { type: 'concept', title: 'PREP 구조로 논리적 말하기', description: 'P-Point(주장) → R-Reason(이유) →\nE-Example(예시) → P-Point(재강조)\n\n영어 면접, 토론, 발표에서 설득력 있게 말하는 핵심 구조!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: 'Point', description: '핵심 주장을 먼저 말하기' },
        { icon: '📋', label: 'Reason', description: '이유를 논리적으로 뒷받침' },
        { icon: '📖', label: 'Example', description: '구체적 예시로 설득력 높이기' },
        { icon: '🎯', label: 'Point 반복', description: '주장을 다시 강조하며 마무리' },
      ]},
      { type: 'example', bad: { label: '성호', story: '이유와 주장이 뒤섞여\n무슨 말인지 알 수 없었다.' }, good: { label: '민지', story: 'PREP 구조로 주장→이유→예시→재강조.\n명확하고 설득력 있게 전달했다.' }},
      { type: 'ox', statement: '영어로 의견을 말할 때 이유를 먼저 말하고 주장은 나중에 해야 한다.', answer: false, feedback: '영어는 주장(Point)을 먼저, 이유(Reason)를 나중에!\n결론이 앞에 오는 두괄식이 영어 논리의 기본이야.' },
      { type: 'multipleChoice', question: 'PREP 구조의 올바른 순서는?', options: ['예시→이유→주장→재강조', '이유→주장→예시→마무리', '주장→이유→예시→주장 재강조', '예시→주장→이유→마무리'], correctIndex: 2, explanation: 'Point→Reason→Example→Point\n이 순서가 PREP 구조야!' },
      { type: 'feedback', summary: 'PREP = 주장→이유→예시→재강조', message: '이 구조 하나면 어떤 주제든 논리적으로 말할 수 있어!' },
      { type: 'mission', mission: '아무 주제나 골라 PREP 구조로 영어 4문장 작성하기', encouragement: 'PREP는 영어 말하기의 만능 프레임!' },
    ],
  },

  'english-gold-2': {
    id: 'english-gold-2', chapterKey: 'english', tierKey: 'gold', stageNumber: 2,
    title: '구동사(Phrasal Verbs) 마스터',
    cards: [
      { type: 'concept', title: '구동사란?', description: '동사+전치사/부사 = 새로운 뜻!\n\ngive up=포기하다 / figure out=알아내다\nlook forward to=기대하다 / come up with=생각해내다\n\n원어민 발화의 핵심. discover보다 find out을 선호!' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '구동사', description: '동사+전치사/부사 = 새로운 의미' },
        { icon: '🗣️', label: '일상 영어', description: '원어민이 가장 많이 쓰는 표현' },
        { icon: '📊', label: '빈도 학습', description: '자주 쓰이는 것부터 우선' },
        { icon: '🎬', label: '드라마 활용', description: '영화·드라마에서 구동사 수집' },
      ]},
      { type: 'example', bad: { label: '승우', story: '"I will discover the answer."\n문법은 맞지만 일상에서 어색했다.' }, good: { label: '다은', story: '"I will figure out the answer."\n구동사로 자연스럽게 표현했다.' }},
      { type: 'ox', statement: '구동사는 비격식적이라 시험에서는 쓸 필요가 없다.', answer: false, feedback: '토익, 수능, 토플 등 주요 시험에도 구동사 문제가 나와.\n일상 회화는 물론 시험에서도 필수!' },
      { type: 'multipleChoice', question: '"I can\'t put up with this noise."에서 put up with의 뜻은?', options: ['올려놓다', '참다/견디다', '정리하다', '포기하다'], correctIndex: 1, explanation: 'put up with = 참다, 견디다\ntolerate와 같은 뜻이지만 더 자연스러운 표현!' },
      { type: 'feedback', summary: '구동사 = 원어민 일상 영어의 핵심', message: '구동사 50개면 일상 대화의 절반을 커버!' },
      { type: 'mission', mission: '자주 쓰이는 구동사 5개를 찾아 각각 예문 만들기', encouragement: '구동사가 쌓이면 영어가 살아 움직여!' },
    ],
  },

  'english-gold-3': {
    id: 'english-gold-3', chapterKey: 'english', tierKey: 'gold', stageNumber: 3,
    title: '영작의 기본: 5형식 활용',
    cards: [
      { type: 'concept', title: '영어 5형식으로 문장 만들기', description: '1형식 S+V: "Birds fly."\n2형식 S+V+C: "She is happy."\n3형식 S+V+O: "I love music."\n4형식 S+V+O+O: "He gave me a book."\n5형식 S+V+O+C: "They made me happy."\n\n영작이 막히면 "몇 형식이지?" 생각해봐!' },
      { type: 'summary', keywords: [
        { icon: '1️⃣', label: '1형식 S+V', description: '주어와 동사만으로 완성' },
        { icon: '3️⃣', label: '3형식 S+V+O', description: '가장 많이 쓰이는 기본 구조' },
        { icon: '4️⃣', label: '4형식 S+V+O+O', description: '"누구에게 무엇을" 주는 구조' },
        { icon: '5️⃣', label: '5형식 S+V+O+C', description: '"무엇을 어떻게" 만드는 구조' },
      ]},
      { type: 'example', bad: { label: '현아', story: '한국어 순서대로 나열해\n"He me happiness gave"가 돼버렸다.' }, good: { label: '준서', story: '"누가 누구에게 무엇을 → 4형식!"\n"He gave me happiness." 형식부터 잡으니 쉬웠다.' }},
      { type: 'ox', statement: '영작을 잘하려면 한국어를 그대로 영어로 번역하면 된다.', answer: false, feedback: '한국어와 영어는 어순이 달라.\n영어 5형식 구조에 맞춰 뼈대를 먼저 잡아야 해!' },
      { type: 'multipleChoice', question: '"The news made everyone surprised."는 몇 형식?', options: ['3형식 (S+V+O)', '4형식 (S+V+O+O)', '5형식 (S+V+O+C)', '2형식 (S+V+C)'], correctIndex: 2, explanation: 'The news(S) made(V) everyone(O) surprised(C)\n목적격 보어가 있으니 5형식!' },
      { type: 'feedback', summary: '영작 = 5형식으로 뼈대 잡고 살 붙이기', message: '5형식은 영어 문장의 설계도야!' },
      { type: 'mission', mission: '5형식 각각에 해당하는 문장을 하나씩, 총 5개 영작하기', encouragement: '이 5문장이 영작의 기초 체력!' },
    ],
  },

  'english-gold-4': {
    id: 'english-gold-4', chapterKey: 'english', tierKey: 'gold', stageNumber: 4,
    title: '영어 프레젠테이션 기술',
    cards: [
      { type: 'concept', title: '영어 발표의 3단계 구조', description: '1) Opening: Hook(질문/통계)으로 관심 끌기\n2) Body: 3가지 핵심 포인트 + 근거·예시\n3) Closing: 핵심 요약 + Call to Action\n\n구조만 알면 어떤 주제든 발표 가능!' },
      { type: 'summary', keywords: [
        { icon: '🎣', label: 'Hook', description: '청중의 관심을 끄는 도입부' },
        { icon: '🔢', label: '3 Points', description: '핵심 포인트는 3개로 정리' },
        { icon: '📊', label: '근거와 예시', description: '각 포인트를 데이터·사례로 뒷받침' },
        { icon: '🎬', label: 'Call to Action', description: '마무리에 청중에게 행동 촉구' },
      ]},
      { type: 'example', bad: { label: '예림', story: '슬라이드 내용을 그대로 읽었다.\n청중은 지루해했다.' }, good: { label: '도현', story: '"Have you ever wondered...?"로 시작해 관심을 끌고\n3가지 포인트를 명확히 전달, 박수를 받았다.' }},
      { type: 'ox', statement: '영어 발표에서 가장 중요한 것은 완벽한 문법이다.', answer: false, feedback: '문법보다 구조와 전달력이 중요해.\n명확한 구조 + 자신감이 좋은 발표의 핵심!' },
      { type: 'multipleChoice', question: '영어 발표 도입부에서 가장 효과적인 방법은?', options: ['자기소개부터 길게', '질문이나 놀라운 통계로 관심 끌기', '바로 본론 진입', '사과로 시작'], correctIndex: 1, explanation: 'Hook으로 청중의 관심을 잡아야\n나머지 내용도 집중해서 들어!' },
      { type: 'feedback', summary: '발표 = Hook + 3 Points + Call to Action', message: '이 구조만 알면 어떤 주제든 발표할 수 있어!' },
      { type: 'mission', mission: '관심 있는 주제로 영어 발표 Opening 3문장 써보기', encouragement: '좋은 시작이 좋은 발표의 절반!' },
    ],
  },

  'english-gold-5': {
    id: 'english-gold-5', chapterKey: 'english', tierKey: 'gold', stageNumber: 5,
    title: '관용구와 속담 익히기',
    cards: [
      { type: 'concept', title: '영어 관용구(Idiom)의 세계', description: '단어 뜻만으로는 의미를 알 수 없는 표현!\n\npiece of cake=매우 쉽다 / break the ice=분위기 깨다\nunder the weather=몸이 안 좋다\nkill two birds with one stone=일석이조\n\n모르면 완전히 엉뚱하게 해석할 수 있으니 주의!' },
      { type: 'summary', keywords: [
        { icon: '🎭', label: '관용구(Idiom)', description: '단어 뜻과 다른 숨은 의미' },
        { icon: '📜', label: '속담(Proverb)', description: '교훈을 담은 옛말' },
        { icon: '🎬', label: '문화 배경', description: '관용구에는 영어권 문화가 담겨' },
        { icon: '📖', label: '맥락 학습', description: '상황과 함께 통째로 익히기' },
      ]},
      { type: 'example', bad: { label: '민호', story: '"It\'s raining cats and dogs"를 듣고\n"고양이와 개가 온다고?" 당황했다.' }, good: { label: '서진', story: '관용구를 상황과 함께 외웠다.\n자연스럽게 쓸 수 있게 됐다.' }},
      { type: 'ox', statement: '관용구는 단어 뜻을 합치면 전체 의미를 알 수 있다.', answer: false, feedback: '"piece of cake"이 "케이크 조각"이 아니라\n"매우 쉬운 것"인 것처럼 뜻의 합이 아니야!' },
      { type: 'multipleChoice', question: '"She\'s feeling under the weather."의 의미는?', options: ['날씨가 추워서 밖에 있다', '몸이 좋지 않다', '비를 맞고 있다', '우울한 기분이다'], correctIndex: 1, explanation: 'under the weather = 몸이 안 좋다\n날씨와는 관계없는 관용구야!' },
      { type: 'feedback', summary: '관용구 = 영어 문화가 담긴 숨은 표현', message: '관용구를 알수록 영어의 깊이가 달라져!' },
      { type: 'mission', mission: '관용구 3개를 골라 각각 상황 설명 + 예문 정리하기', encouragement: '관용구 하나가 대화의 품격을 올려!' },
    ],
  },

  'english-gold-6': {
    id: 'english-gold-6', chapterKey: 'english', tierKey: 'gold', stageNumber: 6,
    title: '영어 이메일 작성법',
    cards: [
      { type: 'concept', title: '비즈니스 이메일의 구조', description: '1) Subject: 핵심을 한 줄로\n2) Greeting: Dear Mr. Kim, / Hi John,\n3) Opening: "I\'m writing to inquire about..."\n4) Body: 핵심 내용 (짧고 명확하게)\n5) Closing: "I look forward to hearing from you."' },
      { type: 'summary', keywords: [
        { icon: '📧', label: '제목(Subject)', description: '핵심을 한 줄로 요약' },
        { icon: '👋', label: '인사(Greeting)', description: '격식/비격식에 맞게 선택' },
        { icon: '🎯', label: '목적 명시', description: '첫 문장에서 이메일 목적 밝히기' },
        { icon: '✅', label: '마무리(Closing)', description: '다음 행동을 요청하며 맺기' },
      ]},
      { type: 'example', bad: { label: '지원', story: '제목 없이 "안녕, 그 건 어떻게 됐어?"\n무례하고 불명확했다.' }, good: { label: '수현', story: 'Subject: Follow-up on Marketing Proposal\n목적→본문→마무리 구조로 명확하게 작성했다.' }},
      { type: 'ox', statement: '영어 이메일은 길수록 정성이 담겨 좋다.', answer: false, feedback: '영어 이메일은 짧고 명확한 게 좋아.\n핵심만 전달하고 불필요한 내용은 빼자!' },
      { type: 'multipleChoice', question: '비즈니스 이메일의 첫 문장으로 가장 적절한 것은?', options: ['요즘 어떻게 지내세요?', 'I\'m writing to discuss the project deadline.', '저를 기억하시나요?', '먼저 사과드립니다.'], correctIndex: 1, explanation: '목적을 바로 밝히는 게 기본이야.\n"I\'m writing to..."로 시작하면 명확해!' },
      { type: 'feedback', summary: '이메일 = 제목 + 목적 + 핵심 + 마무리', message: '좋은 이메일은 짧고 명확하고 예의 바른 거야!' },
      { type: 'mission', mission: '영어로 이메일 하나를 작성해보기 (제목~마무리 구조)', encouragement: '이메일 잘 쓰는 능력은 어디서든 무기!' },
    ],
  },

  'english-gold-7': {
    id: 'english-gold-7', chapterKey: 'english', tierKey: 'gold', stageNumber: 7,
    title: '영어 요약하기(Summarizing)',
    cards: [
      { type: 'concept', title: '효과적인 영어 요약법', description: '1) Read: 글을 읽고 핵심 파악\n2) Select: 주요 아이디어 3개 선택\n3) Rewrite: 자기 말로 다시 쓰기\n\n원문의 1/3~1/4 길이, 자기 의견 X, 자기 말로!' },
      { type: 'summary', keywords: [
        { icon: '📖', label: 'Read', description: '글을 읽고 핵심 주제 파악' },
        { icon: '✂️', label: 'Select', description: '주요 아이디어만 골라내기' },
        { icon: '✍️', label: 'Rewrite', description: '자기 말로 바꿔서 쓰기' },
        { icon: '📏', label: '1/3 규칙', description: '원문 길이의 1/3~1/4로 줄이기' },
      ]},
      { type: 'example', bad: { label: '승현', story: '원문의 문장을 그대로 복사해 붙여넣었다.\n요약이 아니라 발췌가 되었다.' }, good: { label: '지수', story: '핵심 3가지를 뽑고 자기 말로 바꿔 썼다.\n20줄을 5줄로 명확하게 요약했다.' }},
      { type: 'ox', statement: '좋은 요약은 원문의 문장을 그대로 사용하는 것이다.', answer: false, feedback: '요약은 반드시 자기 말로 바꿔 써야 해.\n원문 복사는 요약이 아니라 표절이야!' },
      { type: 'multipleChoice', question: '영어 요약에 포함하면 안 되는 것은?', options: ['원문의 핵심 주제', '주요 근거와 예시', '글쓴이의 주요 결론', '내 개인적인 의견'], correctIndex: 3, explanation: '요약에는 자기 의견을 넣으면 안 돼.\n원문의 핵심만 객관적으로 정리!' },
      { type: 'feedback', summary: '요약 = 읽기·쓰기·사고력의 종합 훈련', message: '요약 능력은 모든 영어 시험과 실무의 기본!' },
      { type: 'mission', mission: '영어 기사 하나를 읽고 핵심 3가지를 뽑아 5문장 이내로 요약', encouragement: '요약은 최고의 영어 종합 훈련!' },
    ],
  },

  'english-gold-8': {
    id: 'english-gold-8', chapterKey: 'english', tierKey: 'gold', stageNumber: 8,
    title: '문맥으로 단어 유추하기',
    cards: [
      { type: 'concept', title: 'Context Clues 전략', description: '모르는 단어도 문맥(Context)으로 유추 가능!\n\n1) 정의: "A peninsula, a land surrounded by..."\n2) 동의어: "She was elated, or extremely happy."\n3) 반의어: "Unlike his timid brother, he was bold."\n4) 예시: "Citrus fruits, such as oranges..."\n5) 일반 지식: 상식으로 추론' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '정의 단서', description: '글에서 직접 뜻을 설명' },
        { icon: '🔄', label: '동의어/반의어', description: '비슷한 말이나 반대말로 힌트' },
        { icon: '📋', label: '예시 단서', description: 'such as, for example 뒤에 힌트' },
        { icon: '🧠', label: '추론', description: '문맥 전체로 의미를 유추' },
      ]},
      { type: 'example', bad: { label: '태영', story: '모르는 단어마다 사전을 찾았다.\n독해 흐름이 끊겼다.' }, good: { label: '소미', story: '"lethargic, barely moving and sleeping all day"\n문맥으로 "기운 없는"이라고 유추, 사전 없이 독해했다.' }},
      { type: 'ox', statement: '모르는 단어는 무조건 사전에서 찾아야 정확히 알 수 있다.', answer: false, feedback: '문맥 단서로 유추하는 능력도 중요해.\n시험에서는 사전을 쓸 수 없으니까!' },
      { type: 'multipleChoice', question: '"She was jubilant, jumping and cheering with joy."에서 jubilant의 뜻은?', options: ['화난', '슬픈', '매우 기뻐하는', '피곤한'], correctIndex: 2, explanation: 'jumping and cheering with joy가 문맥 단서!\njubilant = 매우 기뻐하는!' },
      { type: 'feedback', summary: '문맥 유추 = 사전 없이 독해하는 핵심 기술', message: '문맥으로 유추하는 습관이 진짜 독해 실력!' },
      { type: 'mission', mission: '영어 글에서 모르는 단어 2개를 문맥으로 유추한 뒤 사전으로 확인', encouragement: '유추가 맞을 때의 쾌감을 느껴보자!' },
    ],
  },

  'english-gold-9': {
    id: 'english-gold-9', chapterKey: 'english', tierKey: 'gold', stageNumber: 9,
    title: '영어 듣기: 액센트 적응하기',
    cards: [
      { type: 'concept', title: '다양한 영어 액센트', description: '미국: r 발음 강함, can\'t→/kænt/\n영국: r 약함, can\'t→/kɑːnt/\n호주: 독특한 모음 변화\n인도: 고유한 리듬과 발음\n\n주요 시험은 다양한 액센트를 출제해!' },
      { type: 'summary', keywords: [
        { icon: '🇺🇸', label: '미국 영어', description: 'r 발음 강하고 캐주얼한 톤' },
        { icon: '🇬🇧', label: '영국 영어', description: 'r을 약하게, 모음이 뚜렷' },
        { icon: '🇦🇺', label: '호주 영어', description: '독특한 모음 변화와 억양' },
        { icon: '🌍', label: '다양한 노출', description: '여러 액센트를 듣는 훈련 필수' },
      ]},
      { type: 'example', bad: { label: '지민', story: '미국 영어만 들어서 토익에서\n영국 발음이 나오면 당황했다.' }, good: { label: '유진', story: 'BBC, CNN, ABC 뉴스를 번갈아 들었다.\n어떤 액센트든 자연스럽게 이해했다.' }},
      { type: 'ox', statement: '미국 영어만 잘 들으면 영어 듣기는 충분하다.', answer: false, feedback: '시험에서도 실생활에서도 다양한 액센트를 만나.\n여러 액센트에 노출되는 훈련이 필수!' },
      { type: 'multipleChoice', question: '다양한 영어 액센트에 적응하는 가장 좋은 방법은?', options: ['미국 영어만 집중', '다양한 나라의 영어 콘텐츠 번갈아 듣기', '한 가지 액센트만 마스터', '액센트 무시하고 문법만'], correctIndex: 1, explanation: '다양한 액센트에 노출될수록\n어떤 영어든 이해할 수 있는 귀가 만들어져!' },
      { type: 'feedback', summary: '액센트 적응 = 다양한 영어를 골고루 듣기', message: '세계 영어를 이해하는 귀를 만들자!' },
      { type: 'mission', mission: '미국·영국·호주 영어 영상을 각 1분씩 듣고 발음 차이 메모', encouragement: '다양한 귀를 가진 사람이 진짜 영어 고수!' },
    ],
  },

  'english-gold-10': {
    id: 'english-gold-10', chapterKey: 'english', tierKey: 'gold', stageNumber: 10,
    title: '영어 시험 전략 총정리',
    cards: [
      { type: 'concept', title: '시험 유형별 핵심 전략', description: '토익: 시간 관리 핵심, Part 5·6 빠르게 → Part 7 집중\n수능: 빈칸 추론·순서 배열 고난도, 선지 먼저 읽기\n토플/아이엘츠: 4영역 통합, 노트테이킹 필수\n\n공통: 오답 소거법 + 시간 배분 + 오답 노트' },
      { type: 'summary', keywords: [
        { icon: '⏱️', label: '시간 관리', description: '유형별 시간 배분이 승패를 가른다' },
        { icon: '❌', label: '소거법', description: '확실한 오답부터 제거하고 고르기' },
        { icon: '📝', label: '노트테이킹', description: '듣기·읽기 중 핵심을 메모' },
        { icon: '📓', label: '오답 노트', description: '틀린 유형 분석하고 집중 보강' },
      ]},
      { type: 'example', bad: { label: '우성', story: '토익 RC를 앞에서부터 꼼꼼히 풀다\nPart 7에서 시간 부족, 20문제를 찍었다.' }, good: { label: '하린', story: 'Part 5를 30초씩 빠르게 풀고 Part 7에 40분 확보.\n시간 배분으로 점수가 100점 올랐다.' }},
      { type: 'ox', statement: '영어 시험은 앞에서부터 순서대로 푸는 것이 가장 좋다.', answer: false, feedback: '쉬운 문제 빠르게 풀고\n어려운 문제에 시간 투자하는 게 효과적!' },
      { type: 'multipleChoice', question: '토익 RC에서 가장 시간을 투자해야 하는 파트는?', options: ['Part 5 (단문 빈칸)', 'Part 6 (장문 빈칸)', 'Part 7 (독해)', '모든 파트에 동일하게'], correctIndex: 2, explanation: 'Part 7이 문제 수도 많고 시간이 가장 필요해.\nPart 5·6을 빠르게 풀고 Part 7에 시간 확보!' },
      { type: 'feedback', summary: '시험 = 실력 + 전략 + 시간 관리', message: '전략만 알아도 점수가 올라갈 수 있어!' },
      { type: 'mission', mission: '내 영어 시험의 유형별 시간 배분 계획 세우기', encouragement: '전략 있는 공부가 가장 효율적!' },
    ],
  },

  // ═══ 플래티넘 (실전 영어 응용) 1~10 ═══

  'english-platinum-1': {
    id: 'english-platinum-1', chapterKey: 'english', tierKey: 'platinum', stageNumber: 1,
    title: '영어로 생각하기 훈련',
    cards: [
      { type: 'concept', title: '한→영 번역을 멈춰라', description: '영어가 느린 이유 = 한국어로 생각 후 번역!\n\n영어 사고 훈련법:\n1) 이미지 연결: apple = 빨간 과일 이미지\n2) 셀프 토킹: 일상을 영어로 중얼거리기\n3) 영영사전 사용\n4) 내면 독백: "What should I eat?"\n\n3주만 하면 간단한 생각은 영어로 바로 나와!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '영어 사고', description: '번역 없이 영어로 바로 생각' },
        { icon: '🖼️', label: '이미지 연결', description: '단어를 이미지와 직접 연결' },
        { icon: '💭', label: '내면 독백', description: '혼자 생각할 때도 영어로' },
        { icon: '⏱️', label: '3주 법칙', description: '매일 하면 3주 뒤 자연스러워져' },
      ]},
      { type: 'example', bad: { label: '동우', story: '"배고프다" → "영어로 뭐지?" → "I\'m hungry"\n매번 번역 과정을 거쳐서 말이 느렸다.' }, good: { label: '지안', story: '배가 고플 때 바로 "I\'m hungry"가 떠올랐다.\n감각→영어로 바로 연결했다.' }},
      { type: 'ox', statement: '영어를 잘하려면 한국어로 먼저 생각하고 번역하는 게 정확하다.', answer: false, feedback: '번역 과정이 있으면 속도도 느리고 부자연스러워.\n영어로 바로 생각하는 습관이 진짜 유창함!' },
      { type: 'multipleChoice', question: '"영어로 생각하기"를 위한 가장 효과적인 훈련은?', options: ['한영 사전을 자주 보기', '일상 속 셀프 토킹을 영어로', '영어 문법을 완벽히 외우기', '한국어 번역본과 원서 비교'], correctIndex: 1, explanation: '일상에서 영어로 중얼거리는 셀프 토킹이\n가장 효과적인 영어 사고 훈련!' },
      { type: 'feedback', summary: '영어 사고 = 감각→영어 직접 연결', message: '오늘부터 간단한 생각을 영어로 해보자!' },
      { type: 'mission', mission: '오늘 30분간 모든 생각을 영어로 해보기\n"What should I do next?" "I need to..."', encouragement: '30분의 영어 사고가 평생의 습관이 돼!' },
    ],
  },

  'english-platinum-2': {
    id: 'english-platinum-2', chapterKey: 'english', tierKey: 'platinum', stageNumber: 2,
    title: '고급 문법: 가정법 마스터',
    cards: [
      { type: 'concept', title: '가정법의 3가지 패턴', description: '1) 가정법 현재 (가능한 미래)\nIf it rains, I will stay home.\n\n2) 가정법 과거 (현재 반대)\nIf I were rich, I would travel.\n\n3) 가정법 과거완료 (과거 반대)\nIf I had studied harder, I would have passed.\n\n핵심: 시제를 한 칸 뒤로 → 비현실 가정!' },
      { type: 'summary', keywords: [
        { icon: '🔮', label: '가정법 현재', description: 'If+현재, will+동사원형' },
        { icon: '💭', label: '가정법 과거', description: 'If+과거, would+동사원형' },
        { icon: '⏪', label: '가정법 과거완료', description: 'If+had p.p., would have p.p.' },
        { icon: '🎯', label: '핵심', description: '시제 한 칸 뒤로 → 비현실 가정' },
      ]},
      { type: 'example', bad: { label: '성민', story: '"If I was a bird, I will fly."\n가정법인데 일반 과거+will을 써서 틀렸다.' }, good: { label: '예원', story: '"If I were a bird, I would fly."\nwere+would로 현재 반대 가정을 정확히 표현.' }},
      { type: 'ox', statement: '가정법에서 "If I was"가 문법적으로 맞다.', answer: false, feedback: '가정법에서는 주어와 관계없이 were를 써.\n"If I were..." "If he were..."가 정식 문법!' },
      { type: 'multipleChoice', question: '"더 일찍 출발했더라면 늦지 않았을 텐데"를 영어로?', options: ['If I leave earlier, I won\'t be late.', 'If I left earlier, I wouldn\'t be late.', 'If I had left earlier, I wouldn\'t have been late.', 'If I will leave earlier, I am not late.'], correctIndex: 2, explanation: '과거 반대 가정이니 가정법 과거완료:\nIf+had p.p., would have p.p.!' },
      { type: 'feedback', summary: '가정법 = 시제를 한 칸 뒤로 → 비현실 가정', message: '가정법은 영어 문법의 꽃. 이것만 알면 고급 클리어!' },
      { type: 'mission', mission: '가정법 3가지 패턴으로 각각 예문 2개씩 영작하기', encouragement: '가정법을 자유자재로 쓰면 표현이 풍부해져!' },
    ],
  },

  'english-platinum-3': {
    id: 'english-platinum-3', chapterKey: 'english', tierKey: 'platinum', stageNumber: 3,
    title: '영어 에세이 구조 잡기',
    cards: [
      { type: 'concept', title: '5단락 에세이(Five-Paragraph Essay)', description: '1단락 서론: Hook + Background + Thesis Statement\n2~4단락 본론: Topic Sentence + 근거 + 예시\n5단락 결론: 주제문 재진술 + 핵심 요약\n\nThesis Statement(주제문)이 가장 중요!\n토플, IELTS, SAT 모든 시험의 기본 구조.' },
      { type: 'summary', keywords: [
        { icon: '📌', label: 'Thesis', description: '에세이 전체 핵심 주장 한 문장' },
        { icon: '🏗️', label: '5단락 구조', description: '서론 + 본론 3개 + 결론' },
        { icon: '📝', label: 'Topic Sentence', description: '각 본론 단락의 첫 문장 = 주제' },
        { icon: '🔗', label: '연결어', description: 'First, Moreover, In conclusion' },
      ]},
      { type: 'example', bad: { label: '현아', story: '생각나는 대로 줄줄이 썼다.\n구조가 없어서 무슨 주장인지 알 수 없었다.' }, good: { label: '도윤', story: 'Thesis를 먼저 정하고 3가지 근거를 배치.\nTopic Sentence를 넣으니 구조가 명확했다.' }},
      { type: 'ox', statement: '영어 에세이는 자유롭게 쓰는 것이 가장 좋다.', answer: false, feedback: '영어 에세이는 구조가 생명!\n5단락 구조를 지켜야 논리적이고 설득력 있어.' },
      { type: 'multipleChoice', question: 'Thesis Statement의 역할은?', options: ['독자의 관심을 끄는 것', '에세이 전체의 핵심 주장을 한 문장으로 제시', '본론의 예시를 나열', '결론을 요약하는 것'], correctIndex: 1, explanation: 'Thesis는 "이 에세이에서 내가 주장하는 것"을\n한 문장으로 명확히 보여주는 거야!' },
      { type: 'feedback', summary: '에세이 = Thesis + 3 Body + Conclusion', message: '구조를 먼저 잡으면 어떤 주제든 글을 쓸 수 있어!' },
      { type: 'mission', mission: '아무 주제나 골라 에세이 아웃라인 작성하기\nThesis 1문장 + Body 3개 Topic Sentence', encouragement: '아웃라인이 좋은 에세이의 80%를 결정해!' },
    ],
  },

  'english-platinum-4': {
    id: 'english-platinum-4', chapterKey: 'english', tierKey: 'platinum', stageNumber: 4,
    title: '영어 뉴앙스: 격식 vs 비격식',
    cards: [
      { type: 'concept', title: '상황에 맞는 영어 톤(Register)', description: '격식(Formal): "Could you please..." → 비즈니스, 면접\n비격식(Informal): "Can you..." → 친구, SNS\n\n같은 뜻이라도 상황에 따라 표현이 달라져.\n맞지 않는 톤은 딱딱하거나 무례하게 들려!' },
      { type: 'summary', keywords: [
        { icon: '👔', label: 'Formal', description: '비즈니스, 공식 상황의 격식체' },
        { icon: '👕', label: 'Informal', description: '친구, 일상 대화의 비격식체' },
        { icon: '🎯', label: '상황 판단', description: '누구에게, 어디서, 어떤 목적' },
        { icon: '⚖️', label: '톤 조절', description: '같은 뜻을 상황에 맞게 표현' },
      ]},
      { type: 'example', bad: { label: '수현', story: '친구에게 "I would like to request your presence..."\n너무 격식적이라 놀림당했다.' }, good: { label: '재윤', story: '친구: "Hey, come to my party!"\n교수님: "I would like to invite you to..."\n상황에 맞게 톤을 조절했다.' }},
      { type: 'ox', statement: '영어는 항상 격식체로 말하는 것이 예의 바르다.', answer: false, feedback: '상황에 맞지 않는 격식체는 오히려 어색해.\n친구에게 격식체를 쓰면 거리감이 느껴져!' },
      { type: 'multipleChoice', question: '비즈니스 이메일에 적절한 표현은?', options: ['Hey, what\'s up?', 'I would appreciate your prompt response.', 'Get back to me ASAP!', 'Yo, need that report.'], correctIndex: 1, explanation: '비즈니스 이메일은 격식체가 기본!\n"I would appreciate..."는 정중하고 전문적!' },
      { type: 'feedback', summary: '톤 = 상황에 맞는 격식/비격식 선택', message: '톤 조절 능력은 영어 고급자의 핵심 역량!' },
      { type: 'mission', mission: '"도와줘"를 격식체와 비격식체로 각각 3가지씩 영작하기', encouragement: '같은 뜻을 여러 톤으로 표현하면 진짜 실력!' },
    ],
  },

  'english-platinum-5': {
    id: 'english-platinum-5', chapterKey: 'english', tierKey: 'platinum', stageNumber: 5,
    title: '영어 면접 완벽 대비',
    cards: [
      { type: 'concept', title: 'STAR 기법으로 면접 답변하기', description: 'S-Situation: "In my previous job, ..."\nT-Task: "I was responsible for ..."\nA-Action: "I decided to ..."\nR-Result: "As a result, ..."\n\n행동 질문에는 STAR 기법이 최고!\nAction(내가 뭘 했는지)이 핵심.' },
      { type: 'summary', keywords: [
        { icon: '📍', label: 'Situation', description: '어떤 상황이었는지 배경' },
        { icon: '🎯', label: 'Task', description: '내가 맡은 역할과 과제' },
        { icon: '🔨', label: 'Action', description: '구체적으로 어떤 행동을 했는지' },
        { icon: '📈', label: 'Result', description: '그 결과 어떤 성과가 나왔는지' },
      ]},
      { type: 'example', bad: { label: '승우', story: '"I\'m a hard worker and good at teamwork."\n구체적 사례 없이 추상적으로만 대답했다.' }, good: { label: '하은', story: 'STAR 기법으로 구체적 사례를 제시.\n면접관이 "That\'s a great example"이라고 했다.' }},
      { type: 'ox', statement: '영어 면접에서는 짧고 간단하게 답변하는 것이 가장 좋다.', answer: false, feedback: '행동 질문에는 STAR로 구체적 사례를!\n너무 짧으면 내용이 없어 보여.' },
      { type: 'multipleChoice', question: 'STAR 기법에서 가장 중요한 부분은?', options: ['Situation', 'Task', 'Action', 'Result'], correctIndex: 2, explanation: 'Action이 가장 중요!\n"내가 구체적으로 무엇을 했는지"가 핵심.' },
      { type: 'feedback', summary: '면접 = STAR로 구체적 사례를 논리적으로', message: 'STAR는 한국어 면접에서도 통하는 만능 기법!' },
      { type: 'mission', mission: '"Tell me about a challenge you overcame."에\nSTAR 기법으로 영어 답변 작성하기', encouragement: '준비된 답변이 면접의 자신감을 만들어!' },
    ],
  },

  'english-platinum-6': {
    id: 'english-platinum-6', chapterKey: 'english', tierKey: 'platinum', stageNumber: 6,
    title: '영어 뉴스 심층 분석',
    cards: [
      { type: 'concept', title: '비판적 읽기(Critical Reading)', description: '뉴스 분석 체크리스트:\n1) 사실(Fact) vs 의견(Opinion) 구별\n2) 글쓴이의 편향(Bias) 파악\n3) 근거 강도 평가 (통계? 일화?)\n4) 다른 관점 생각하기\n5) "So what?" → 왜 중요한지 판단\n\n토플·IELTS 고득점과 세상 이해에 필수!' },
      { type: 'summary', keywords: [
        { icon: '📊', label: 'Fact vs Opinion', description: '사실과 의견을 명확히 구분' },
        { icon: '🔍', label: 'Bias 파악', description: '글쓴이의 편향과 관점 인식' },
        { icon: '📋', label: '근거 평가', description: '어떤 증거로 주장을 뒷받침하는지' },
        { icon: '🤔', label: 'So What?', description: '이 정보가 왜 중요한지 판단' },
      ]},
      { type: 'example', bad: { label: '예진', story: '뉴스를 읽고 내용을 그대로 믿었다.\n한쪽 관점만 반영된 것을 몰랐다.' }, good: { label: '시우', story: 'CNN과 BBC에서 같은 사건을 비교.\n서로 다른 관점을 발견하고 비판적으로 분석했다.' }},
      { type: 'ox', statement: '뉴스 기사는 항상 객관적인 사실만 전달한다.', answer: false, feedback: '뉴스에도 글쓴이의 관점과 편향이 있을 수 있어.\n비판적으로 읽는 능력이 필요!' },
      { type: 'multipleChoice', question: '다음 중 "의견(Opinion)"에 해당하는 것은?', options: ['서울의 인구는 약 970만 명이다.', '한국은 세계에서 가장 살기 좋은 나라다.', '지구는 태양 주위를 공전한다.', '물은 100°C에서 끓는다.'], correctIndex: 1, explanation: '"가장 살기 좋은"은 주관적 판단!\n나머지는 객관적 사실이지.' },
      { type: 'feedback', summary: '비판적 읽기 = 사실과 의견 구별 + 분석', message: '읽는 것과 분석하는 것은 하늘과 땅 차이!' },
      { type: 'mission', mission: '영어 뉴스 기사 하나에서\n사실(Fact) 3개와 의견(Opinion) 2개 구별하기', encouragement: '비판적 읽기는 최고 수준의 독해력!' },
    ],
  },

  'english-platinum-7': {
    id: 'english-platinum-7', chapterKey: 'english', tierKey: 'platinum', stageNumber: 7,
    title: '고급 어휘: 학술·전문 영어',
    cards: [
      { type: 'concept', title: 'Academic Word List(AWL)', description: '일상 vs 학술 어휘:\nget→obtain / show→demonstrate\nthink→analyze / help→facilitate\nimportant→significant\n\nAWL 570개만 알면 학술 텍스트의\n약 10%를 추가로 이해 가능!\n토플, IELTS, 논문 읽기에 필수.' },
      { type: 'summary', keywords: [
        { icon: '🎓', label: 'AWL', description: '학술 영어 핵심 570단어' },
        { icon: '📈', label: '고급 표현', description: 'get→obtain 격식 어휘' },
        { icon: '📖', label: '논문 읽기', description: '학술 텍스트 이해의 기본' },
        { icon: '✍️', label: '에세이 활용', description: '격식 글쓰기에 필수' },
      ]},
      { type: 'example', bad: { label: '준호', story: '"This is very important and helps a lot."\n쉬운 단어만 써서 학술 에세이 점수가 낮았다.' }, good: { label: '채린', story: '"This is significantly crucial and facilitates..."\n학술 어휘로 에세이의 품격이 올라갔다.' }},
      { type: 'ox', statement: '학술 영어는 어려운 단어를 많이 쓸수록 좋다.', answer: false, feedback: '적절한 학술 어휘를 자연스럽게 사용하는 게 중요!\n무조건 어려운 단어는 오히려 부자연스러워.' },
      { type: 'multipleChoice', question: '"show"의 학술적 표현으로 가장 적절한 것은?', options: ['display', 'demonstrate', 'see', 'look'], correctIndex: 1, explanation: 'demonstrate는 "증명하다, 보여주다"로\n학술 텍스트에서 show 대신 자주 쓰여!' },
      { type: 'feedback', summary: '학술 어휘 = AWL 570개가 토플·IELTS의 기반', message: '일상 어휘에서 학술 어휘로 한 단계 올라가자!' },
      { type: 'mission', mission: '일상 단어 5개를 학술적 대체어로 바꿔보기\n(get, show, think, help, important)', encouragement: '어휘의 격이 올라가면 글의 격도 올라가!' },
    ],
  },

  'english-platinum-8': {
    id: 'english-platinum-8', chapterKey: 'english', tierKey: 'platinum', stageNumber: 8,
    title: '영어 토론: 반론과 양보',
    cards: [
      { type: 'concept', title: '반론과 양보(Concession)', description: '양보: "Admittedly, ..." (상대 주장 일부 인정)\n전환: "However, ..." (나의 주장은 다르다)\n재반박: "The evidence shows..." (근거로 강화)\n\n인정→전환→재반박 구조가\n일방적 주장보다 훨씬 설득력 있어!' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '양보', description: '상대 주장을 일부 인정' },
        { icon: '🔀', label: '전환', description: 'However로 방향 전환' },
        { icon: '💪', label: '재반박', description: '근거로 내 주장 강화' },
        { icon: '📊', label: '설득력', description: '양보+재반박 = 논리적 완성도 UP' },
      ]},
      { type: 'example', bad: { label: '태호', story: '"That\'s wrong. I disagree."\n무조건 부정해서 토론이 싸움이 됐다.' }, good: { label: '서은', story: '"Admittedly, your point is valid.\nHowever, the long-term benefits outweigh..."\n양보 후 재반박으로 설득력 있게 전달.' }},
      { type: 'ox', statement: '토론에서 상대 의견을 인정하면 내 주장이 약해진다.', answer: false, feedback: '오히려 인정한 뒤 재반박하면\n더 공정하고 설득력 있게 들려!' },
      { type: 'multipleChoice', question: '양보+재반박의 올바른 구조는?', options: ['반대→반대→반대', '인정→하지만→근거로 재반박', '동의→완전 동의→포기', '무시→내 주장만 반복'], correctIndex: 1, explanation: '인정→However→재반박\n이 3단계가 논리적 토론의 핵심!' },
      { type: 'feedback', summary: '토론 = 양보 + 전환 + 재반박의 3단 구조', message: '인정할 건 인정하고 반박하는 게 진짜 실력!' },
      { type: 'mission', mission: '양보+전환+재반박 구조로 영어 3문장 작성\n"Admittedly... However... In fact..."', encouragement: '이 구조를 쓰면 에세이 점수가 확 올라가!' },
    ],
  },

  'english-platinum-9': {
    id: 'english-platinum-9', chapterKey: 'english', tierKey: 'platinum', stageNumber: 9,
    title: '영어 팟캐스트 200% 활용법',
    cards: [
      { type: 'concept', title: '팟캐스트 3회전 학습법', description: '같은 에피소드를 3번 다르게 듣기!\n\n1회전: 스크립트 없이 → 전체 흐름 파악\n2회전: 스크립트 보며 → 못 들었던 부분 확인\n3회전: 스크립트 없이 다시 → 이해도 상승 체험\n\n추천: 6 Minute English(BBC), All Ears English' },
      { type: 'summary', keywords: [
        { icon: '1️⃣', label: '1회전: 귀만', description: '스크립트 없이 흐름 파악' },
        { icon: '2️⃣', label: '2회전: 눈+귀', description: '스크립트로 정밀 확인' },
        { icon: '3️⃣', label: '3회전: 귀만 다시', description: '향상된 이해도 확인' },
        { icon: '📊', label: '이해도 기록', description: '1회차 vs 3회차 비교' },
      ]},
      { type: 'example', bad: { label: '현준', story: '매일 새로운 에피소드만 들었다.\n많이 듣는 것 같지만 실력이 안 늘었다.' }, good: { label: '수아', story: '하나를 3회전으로 파고들었다.\n1회차 50%→3회차 90% 이해. 한 달 만에 귀가 트였다.' }},
      { type: 'ox', statement: '팟캐스트는 많은 에피소드를 한 번씩 듣는 것이 효과적이다.', answer: false, feedback: '하나를 깊게 3번 듣는 게\n여러 개를 얕게 듣는 것보다 훨씬 효과적!' },
      { type: 'multipleChoice', question: '3회전 학습법에서 2회전의 목적은?', options: ['전체 흐름 파악', '못 들었던 부분을 스크립트로 확인', '쉐도잉 연습', '새로운 에피소드 선택'], correctIndex: 1, explanation: '2회전은 스크립트를 보며\n1회전에서 놓친 부분을 확인하는 단계!' },
      { type: 'feedback', summary: '팟캐스트 = 양보다 깊이, 3회전으로 파기', message: '깊이 있는 반복이 진짜 듣기 실력을 만들어!' },
      { type: 'mission', mission: '팟캐스트 에피소드 하나를 3회전 학습 실행\n1회차와 3회차 이해도를 비교 기록하기', encouragement: '그 차이를 느끼는 순간, 영어가 재미있어져!' },
    ],
  },

  'english-platinum-10': {
    id: 'english-platinum-10', chapterKey: 'english', tierKey: 'platinum', stageNumber: 10,
    title: '영어 학습 정체기 돌파법',
    cards: [
      { type: 'concept', title: '플래토(Plateau) 현상 극복하기', description: '꾸준히 해도 실력이 안 느는 시기 = 플래토!\n\n원인: 같은 방법 반복 / 쉬운 것만 / 출력 부족\n\n돌파 전략:\n1) 학습 방법 변화 (새로운 자극)\n2) 난이도 한 단계 올리기\n3) 출력(말하기·쓰기) 비중 늘리기\n4) 측정 가능한 목표 설정' },
      { type: 'summary', keywords: [
        { icon: '📉', label: '플래토', description: '실력이 정체되는 시기' },
        { icon: '🔄', label: '방법 변화', description: '새로운 학습법으로 자극' },
        { icon: '📈', label: '난이도 UP', description: '안전지대를 벗어나 도전' },
        { icon: '🎯', label: '출력 강화', description: '말하기·쓰기 실전 비중 늘리기' },
      ]},
      { type: 'example', bad: { label: '지훈', story: '1년째 같은 교재와 방법으로 공부.\n어느 순간 제자리. 포기할 뻔했다.' }, good: { label: '민아', story: '듣기만 하던 것에 영어 일기와 셀프 토킹 추가.\n난이도도 올리고 한 달 만에 다시 성장.' }},
      { type: 'ox', statement: '영어 실력이 안 느는 것은 재능이 없기 때문이다.', answer: false, feedback: '플래토는 누구나 겪는 자연스러운 현상!\n학습 방법을 바꾸면 반드시 돌파 가능.' },
      { type: 'multipleChoice', question: '영어 정체기를 돌파하는 가장 효과적인 방법은?', options: ['같은 방법을 더 열심히', '잠시 영어를 쉬기', '학습 방법과 난이도를 변화시키기', '기초부터 다시 시작'], correctIndex: 2, explanation: '같은 방법의 반복이 정체의 원인!\n새로운 자극과 도전이 돌파의 열쇠.' },
      { type: 'feedback', summary: '정체기 = 방법 변화 + 난이도 UP + 출력 강화', message: '정체기는 성장의 전조! 방법을 바꾸면 반드시 돌파!' },
      { type: 'mission', mission: '현재 영어 학습 루틴을 점검하고\n바꿀 수 있는 것 3가지를 적어 실행하기', encouragement: '정체기를 넘으면 다음 레벨이 기다리고 있어!' },
    ],
  },

  // ═══ 다이아 (마스터 영어) 1~10 ═══

  'english-diamond-1': {
    id: 'english-diamond-1', chapterKey: 'english', tierKey: 'diamond', stageNumber: 1,
    title: '영어 연설 분석과 수사법',
    cards: [
      { type: 'concept', title: '위대한 영어 연설의 기술', description: '3대 수사법:\n1) 반복: "I have a dream..." - MLK\n2) 3의 법칙: "of the people, by the people, for the people"\n3) 대조: "Ask not what your country can do for you,\nask what you can do for your country." - JFK\n\n에세이, 발표, 토론에서도 활용 가능!' },
      { type: 'summary', keywords: [
        { icon: '🔁', label: '반복', description: '핵심 메시지를 반복해서 강조' },
        { icon: '3️⃣', label: '3의 법칙', description: '3개씩 나열 → 리듬감+설득력' },
        { icon: '⚖️', label: '대조', description: '반대 개념을 나란히 → 임팩트' },
        { icon: '🎤', label: '연설 분석', description: '명연설 분석하며 기법 체화' },
      ]},
      { type: 'example', bad: { label: '발표 A', story: '"우리 제품은 좋습니다. 사주세요."\n평범한 나열로 아무도 기억하지 못했다.' }, good: { label: '발표 B', story: '"Our product is faster, smarter, and simpler."\n3의 법칙으로 임팩트 있게 전달했다.' }},
      { type: 'ox', statement: '수사법은 정치 연설에서만 쓰이는 특별한 기술이다.', answer: false, feedback: '에세이, 발표, 면접, 일상 대화에서도\n설득력을 높이는 데 활용할 수 있어!' },
      { type: 'multipleChoice', question: '"Life, liberty, and the pursuit of happiness"에 쓰인 수사법은?', options: ['반복(Repetition)', '대조(Antithesis)', '3의 법칙(Rule of Three)', '은유(Metaphor)'], correctIndex: 2, explanation: '3개를 나열하는 Rule of Three!\n3은 기억에 가장 잘 남는 구조.' },
      { type: 'feedback', summary: '수사법 = 반복 + 3의 법칙 + 대조', message: '명연설을 분석하면 영어의 아름다움이 보여!' },
      { type: 'mission', mission: 'MLK 또는 Steve Jobs 연설에서\n수사법 3가지를 찾아 표시하기', encouragement: '명연설 분석이 최고의 영어 공부!' },
    ],
  },

  'english-diamond-2': {
    id: 'english-diamond-2', chapterKey: 'english', tierKey: 'diamond', stageNumber: 2,
    title: '영어 원서 읽기 전략',
    cards: [
      { type: 'concept', title: '영어 원서 완독 로드맵', description: '1단계 책 선택: 재미 최우선! 모르는 단어 5개 이하/페이지\n추천: Holes, Wonder, The Giver\n\n2단계 읽기 규칙: 하루 10~20페이지\n모르는 단어는 3번 나올 때까지 넘기기\n\n3단계 기록: 좋아하는 문장 밑줄 + 챕터별 한 줄 요약' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '책 선택', description: '재미 + 적절한 난이도가 핵심' },
        { icon: '📏', label: '하루 목표', description: '매일 10~20페이지 꾸준히' },
        { icon: '🚫', label: '사전 최소화', description: '3번 나온 단어만 찾기' },
        { icon: '📝', label: '읽기 기록', description: '밑줄 + 요약 + 페이지 기록' },
      ]},
      { type: 'example', bad: { label: '시영', story: '해리포터 원서를 샀지만\n모르는 단어마다 사전을 찾아 30페이지에서 포기.' }, good: { label: '채은', story: 'Wonder부터 시작, 모르는 단어는 넘기고 매일 15페이지.\n한 달 만에 첫 원서를 완독했다.' }},
      { type: 'ox', statement: '영어 원서를 읽을 때 모르는 단어는 반드시 사전에서 찾아야 한다.', answer: false, feedback: '모든 단어를 찾으면 흐름이 끊기고 지루해져.\n3번 이상 나오는 단어만 찾는 게 효율적!' },
      { type: 'multipleChoice', question: '영어 원서 첫 도전으로 가장 적합한 책은?', options: ['노인과 바다 원서', '해리포터 시리즈', 'Wonder 또는 Holes 같은 청소년 소설', '뉴스위크 잡지'], correctIndex: 2, explanation: '청소년 소설은 문장이 쉽고 스토리가 재미있어서\n첫 원서로 최적!' },
      { type: 'feedback', summary: '원서 = 재미있는 책 + 매일 조금씩 + 사전 최소화', message: '첫 원서 완독의 성취감은 잊을 수 없을 거야!' },
      { type: 'mission', mission: '내 수준에 맞는 영어 원서를 골라\n오늘 10페이지 읽어보기 (사전 없이 도전!)', encouragement: '첫 10페이지가 원서 완독의 시작!' },
    ],
  },

  'english-diamond-3': {
    id: 'english-diamond-3', chapterKey: 'english', tierKey: 'diamond', stageNumber: 3,
    title: '영어 속 문화와 유머 이해',
    cards: [
      { type: 'concept', title: '문화를 알아야 영어가 보인다', description: '문화 기반 표현:\n- "Break a leg!" = 행운을 빌어\n- "Elephant in the room" = 모두 알지만 말 안 하는 문제\n- "The ball is in your court" = 네 차례야\n\n영어 유머:\n- Pun(말장난): 단어의 이중 의미 활용\n- Sarcasm(빈정거림): "Oh, great!" = 안 좋다는 뜻\n\n문화를 알면 영어가 입체적으로 보여!' },
      { type: 'summary', keywords: [
        { icon: '🌍', label: '문화 맥락', description: '표현 뒤에 숨은 역사와 문화' },
        { icon: '😄', label: 'Pun', description: '단어 이중 의미를 활용한 유머' },
        { icon: '😏', label: 'Sarcasm', description: '반대로 말하는 빈정거림' },
        { icon: '🎭', label: '문화 리터러시', description: '영어권 문화 상식 쌓기' },
      ]},
      { type: 'example', bad: { label: '정우', story: '"Break a leg!"을 듣고\n"왜 다리를 부러뜨리라는 거야?" 당황했다.' }, good: { label: '소율', story: '"Break a leg"이 행운의 표현인 걸 알고\n"Thanks! I\'ll do my best!"로 자연스럽게 답했다.' }},
      { type: 'ox', statement: '"Break a leg"은 상대방을 해치라는 의미다.', answer: false, feedback: '극장 미신에서 유래한 행운의 표현!\n공연·시험 전에 "행운을 빌어!"라는 뜻.' },
      { type: 'multipleChoice', question: '"There\'s an elephant in the room"의 의미는?', options: ['방에 코끼리가 있다', '모두 알지만 아무도 말하지 않는 문제', '방이 매우 좁다', '큰 선물이 있다'], correctIndex: 1, explanation: '코끼리처럼 뻔한데 아무도 언급 안 하는 문제!\n민감한 이슈를 가리킬 때 쓰는 표현.' },
      { type: 'feedback', summary: '문화 = 영어 표현의 진짜 의미를 여는 열쇠', message: '문화를 알수록 영어가 재미있고 깊어져!' },
      { type: 'mission', mission: '영어 문화 기반 표현 3개를 찾아\n유래와 의미를 정리하고 예문 만들기', encouragement: '문화를 아는 사람이 진짜 영어 고수!' },
    ],
  },

  'english-diamond-4': {
    id: 'english-diamond-4', chapterKey: 'english', tierKey: 'diamond', stageNumber: 4,
    title: '고급 작문: 논리적 연결어',
    cards: [
      { type: 'concept', title: '연결어로 글의 흐름 만들기', description: '추가: Moreover, Furthermore, In addition\n대조: However, Nevertheless, On the other hand\n인과: Therefore, As a result, Due to\n예시: For instance, Such as\n결론: In conclusion, To sum up\n\n연결어 없는 글 = 문장의 나열\n연결어 있는 글 = 논리의 흐름!' },
      { type: 'summary', keywords: [
        { icon: '➕', label: '추가', description: 'Moreover, Furthermore' },
        { icon: '🔀', label: '대조', description: 'However, Nevertheless' },
        { icon: '➡️', label: '인과', description: 'Therefore, As a result' },
        { icon: '📋', label: '예시/결론', description: 'For instance, In conclusion' },
      ]},
      { type: 'example', bad: { label: '예시 A', story: '"Exercise is good. It reduces stress. It improves health."\n문장이 뚝뚝 끊기고 흐름이 없다.' }, good: { label: '예시 B', story: '"First, it reduces stress.\nMoreover, it improves health.\nTherefore, everyone should exercise."\n연결어로 논리적 흐름을 만들었다.' }},
      { type: 'ox', statement: '연결어를 많이 쓸수록 글이 좋아진다.', answer: false, feedback: '적재적소에 쓰는 게 중요!\n매 문장마다 넣으면 오히려 부자연스러워.' },
      { type: 'multipleChoice', question: '"운동은 건강에 좋다. ______, 정신 건강에도 도움이 된다."에 들어갈 연결어는?', options: ['However', 'Moreover', 'Therefore', 'Nevertheless'], correctIndex: 1, explanation: '앞 문장에 내용을 추가하는 거니까\nMoreover(게다가)가 적절!' },
      { type: 'feedback', summary: '연결어 = 문장 나열을 논리의 흐름으로', message: '연결어를 자유자재로 쓰면 글의 품격이 올라가!' },
      { type: 'mission', mission: '아무 주제로 5문장 영작하되\n각 문장을 다른 연결어로 연결하기', encouragement: '연결어가 자연스러워지면 네이티브 수준!' },
    ],
  },

  'english-diamond-5': {
    id: 'english-diamond-5', chapterKey: 'english', tierKey: 'diamond', stageNumber: 5,
    title: '영어 디베이트 실전',
    cards: [
      { type: 'concept', title: '영어 디베이트의 구조', description: '1) Opening: 주장 + 근거 3가지 예고\n2) Arguments: 데이터/예시로 뒷받침\n3) Rebuttal: 상대 주장 반박\n4) Closing: 핵심 요약 + 강한 마무리\n\n핵심 표현: "I firmly believe..." / "The evidence shows..."\n"My opponent claims..., however..."' },
      { type: 'summary', keywords: [
        { icon: '🎯', label: 'Opening', description: '주장 명확히 + 근거 예고' },
        { icon: '📊', label: 'Arguments', description: '데이터와 예시로 뒷받침' },
        { icon: '⚔️', label: 'Rebuttal', description: '상대 주장을 논리적으로 반박' },
        { icon: '🏆', label: 'Closing', description: '핵심 요약 + 강한 마무리' },
      ]},
      { type: 'example', bad: { label: '디베이터 A', story: '"I think this is right because... it just makes sense."\n근거 없는 주장으로 설득력이 0.' }, good: { label: '디베이터 B', story: '"First, according to a study...\nSecond, uniforms reduce bullying by 35%..."\n구조와 데이터로 강력하게 설득했다.' }},
      { type: 'ox', statement: '디베이트에서 감정적으로 호소하는 것이 가장 효과적이다.', answer: false, feedback: '디베이트는 논리와 증거가 핵심!\n감정적 호소만으로는 설득할 수 없어.' },
      { type: 'multipleChoice', question: '디베이트에서 상대 주장을 반박할 때 적절한 표현은?', options: ['"You\'re completely wrong."', '"That\'s a stupid argument."', '"My opponent raises a valid point, however the data suggests otherwise."', '"I don\'t care what you think."'], correctIndex: 2, explanation: '예의를 지키면서 논리적으로 반박하는 게\n디베이트의 핵심!' },
      { type: 'feedback', summary: '디베이트 = 논리 + 증거 + 구조 + 예의', message: '디베이트는 영어와 사고력을 동시에 키우는 최고 훈련!' },
      { type: 'mission', mission: '"학생은 스마트폰을 학교에 가져올 수 있어야 한다"\n찬/반을 정해 Opening Statement 영어로 작성', encouragement: '디베이트로 영어와 사고력이 동시에 성장!' },
    ],
  },

  'english-diamond-6': {
    id: 'english-diamond-6', chapterKey: 'english', tierKey: 'diamond', stageNumber: 6,
    title: '영어 뉴스 기사 직접 쓰기',
    cards: [
      { type: 'concept', title: '뉴스 기사 작성법', description: '뉴스 기사 5요소:\n1) Headline: 핵심을 10단어 이내로\n2) Lead: 5W1H를 첫 1~2문장에\n3) Body: 중요한 정보 순서로\n4) Quotes: 관계자 말 인용\n5) Background: 배경 정보\n\n짧고 명확한 문장 + 수동태 활용이 뉴스 영어 특징!' },
      { type: 'summary', keywords: [
        { icon: '📰', label: 'Headline', description: '핵심을 짧고 임팩트 있게' },
        { icon: '📋', label: 'Lead', description: '5W1H를 첫 문장에 담기' },
        { icon: '🔽', label: '역피라미드', description: '중요한 정보부터 순서대로' },
        { icon: '💬', label: 'Quotes', description: '인용문으로 신뢰도 높이기' },
      ]},
      { type: 'example', bad: { label: '기사 A', story: '"Something happened yesterday. It was really big."\n5W1H가 없어서 무슨 일인지 알 수 없다.' }, good: { label: '기사 B', story: '"Seoul Launches Free AI Education Program"\nHeadline과 Lead에 5W1H가 명확하다.' }},
      { type: 'ox', statement: '뉴스 기사는 글쓴이의 개인 의견을 자유롭게 넣어도 된다.', answer: false, feedback: '뉴스 기사는 객관적 사실 중심!\n의견은 사설(editorial)에서만.' },
      { type: 'multipleChoice', question: '뉴스 리드문에 반드시 포함해야 하는 것은?', options: ['글쓴이의 감상', '배경 역사', '5W1H', '광고 문구'], correctIndex: 2, explanation: '리드문에 5W1H를 담으면\n첫 문장만 읽어도 핵심을 알 수 있어!' },
      { type: 'feedback', summary: '기사 쓰기 = 읽기·쓰기·어휘의 종합 훈련', message: '기자처럼 쓰는 연습이 영어를 종합적으로 키워!' },
      { type: 'mission', mission: '관심 있는 사건을 골라\n영어 뉴스 기사 작성 (Headline + Lead + Body 5문장)', encouragement: '직접 기사를 써보면 뉴스 읽기도 더 잘 돼!' },
    ],
  },

  'english-diamond-7': {
    id: 'english-diamond-7', chapterKey: 'english', tierKey: 'diamond', stageNumber: 7,
    title: '영어 통번역의 기초',
    cards: [
      { type: 'concept', title: '통번역 기초 스킬', description: '번역 핵심 원칙:\n1) 의역 > 직역: 의미를 자연스럽게 전달\n2) 원문 충실: 빠뜨리거나 추가하지 않기\n3) 대상 독자 고려: 톤 조절\n\n통역 기초 훈련:\n1) 사이트 번역: 글 보며 즉석 번역\n2) 쉐도잉+의미 파악\n3) 노트테이킹: 핵심을 기호로 메모' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '의역', description: '자연스러운 표현으로 의미 전달' },
        { icon: '📖', label: '사이트 번역', description: '텍스트 보며 즉석 구두 번역' },
        { icon: '📝', label: '노트테이킹', description: '핵심을 기호로 빠르게 메모' },
        { icon: '🧠', label: '종합 훈련', description: '듣기+이해+표현을 동시에' },
      ]},
      { type: 'example', bad: { label: '직역', story: '"It\'s raining cats and dogs."\n→ "고양이와 개가 비처럼 온다."\n직역하면 의미가 완전히 달라진다.' }, good: { label: '의역', story: '"It\'s raining cats and dogs."\n→ "비가 억수같이 쏟아진다."\n자연스러운 한국어로 전달했다.' }},
      { type: 'ox', statement: '좋은 번역은 원문을 한 단어씩 정확히 옮기는 것이다.', answer: false, feedback: '좋은 번역은 의미를 자연스럽게 전달하는 의역!\n직역은 오히려 의미를 왜곡할 수 있어.' },
      { type: 'multipleChoice', question: '사이트 트랜슬레이션(Sight Translation)이란?', options: ['웹사이트 번역', '텍스트를 보면서 즉석 구두 번역 훈련', '자막 번역', '기계 번역 사용'], correctIndex: 1, explanation: '글을 보면서 바로 입으로 번역하는 훈련!\n읽기+이해+표현을 동시에 훈련.' },
      { type: 'feedback', summary: '통번역 = 영어 종합 실력의 최고봉', message: '통번역 훈련은 모든 영어 스킬을 극적으로 올려!' },
      { type: 'mission', mission: '영어 뉴스 기사 3문장을 골라\n의역으로 자연스러운 한국어로 번역하기', encouragement: '번역은 두 언어의 가교. 최고의 종합 훈련!' },
    ],
  },

  'english-diamond-8': {
    id: 'english-diamond-8', chapterKey: 'english', tierKey: 'diamond', stageNumber: 8,
    title: '영어 창작 글쓰기',
    cards: [
      { type: 'concept', title: 'Creative Writing 시작하기', description: 'Flash Fiction(300단어 이내 초단편)부터 시작!\n\n핵심 원칙 - Show, don\'t tell:\n"She was sad" 대신\n"Tears rolled down her cheeks\nas she stared at the empty chair."\n\nWriting Prompt를 활용하면 주제 걱정 없이 시작 가능.\n감정 묘사 훈련이 표현력을 폭발적으로 키워!' },
      { type: 'summary', keywords: [
        { icon: '✍️', label: 'Flash Fiction', description: '300단어 이내 초단편으로 시작' },
        { icon: '🎭', label: 'Show Don\'t Tell', description: '감정을 말하지 않고 보여주기' },
        { icon: '💡', label: 'Writing Prompt', description: '주제를 받아서 자유롭게 쓰기' },
        { icon: '📖', label: '다양한 장르', description: '소설, 시, 에세이 등 도전' },
      ]},
      { type: 'example', bad: { label: 'Tell', story: '"The man was very angry."\n감정을 직접 설명해서 밋밋하다.' }, good: { label: 'Show', story: '"His fists clenched. He slammed the door\nso hard the walls trembled."\n행동으로 보여줘서 생생하다.' }},
      { type: 'ox', statement: '영어 창작 글쓰기는 원어민만 할 수 있다.', answer: false, feedback: 'Flash Fiction부터 시작하면 누구나 가능!\n완벽한 문법보다 표현하려는 시도가 중요.' },
      { type: 'multipleChoice', question: '"Show, don\'t tell" 원칙에 맞는 문장은?', options: ['"She was happy."', '"She jumped up and down, laughing with tears in her eyes."', '"He felt very tired."', '"The weather was nice."'], correctIndex: 1, explanation: '감정을 행동·묘사로 보여주는 게\nShow, don\'t tell!' },
      { type: 'feedback', summary: '창작 = Show Don\'t Tell + Flash Fiction', message: '영어로 이야기를 만드는 건 가장 즐거운 공부!' },
      { type: 'mission', mission: '"The last message I received said..."\n이 문장으로 시작하는 Flash Fiction(10문장) 쓰기', encouragement: '네가 만든 이야기가 세상에 하나뿐인 작품!' },
    ],
  },

  'english-diamond-9': {
    id: 'english-diamond-9', chapterKey: 'english', tierKey: 'diamond', stageNumber: 9,
    title: '영어 협상과 설득의 기술',
    cards: [
      { type: 'concept', title: '영어 협상의 핵심 표현', description: '1) 제안: "I\'d like to propose..."\n2) 양보: "I\'m willing to... if you..."\n3) 부드러운 거절: "I appreciate the offer, but..."\n4) 합의: "Let\'s move forward with..."\n5) 시간 벌기: "Let me think about that."\n\n직접적 Yes/No보다 부드러운 표현이\n영어 비즈니스 문화의 핵심!' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '제안', description: '"I\'d like to propose..."' },
        { icon: '⚖️', label: '양보', description: '"I\'m willing to... if you..."' },
        { icon: '🙅', label: '부드러운 거절', description: '직접 No 대신 우회적 표현' },
        { icon: '✅', label: '합의', description: '"Let\'s move forward with..."' },
      ]},
      { type: 'example', bad: { label: '직접적 거절', story: '"No, too expensive. I won\'t pay that."\n직접적 거절로 상대가 불쾌해했다.' }, good: { label: '부드러운 거절', story: '"I appreciate the offer, but that\'s beyond our budget.\nWould you be open to a more competitive rate?"\n부드럽게 거절하며 대안을 제시.' }},
      { type: 'ox', statement: '영어 비즈니스에서는 직접적으로 Yes/No를 말하는 것이 좋다.', answer: false, feedback: '영어 비즈니스에서도 부드러운 표현이 중요!\n우회적 표현이 더 전문적으로 들려.' },
      { type: 'multipleChoice', question: '협상에서 시간을 벌고 싶을 때 적절한 표현은?', options: ['"I don\'t know."', '"Let me think about that and get back to you."', '"Whatever you say."', '"No comment."'], correctIndex: 1, explanation: '"Let me think about that"은 정중하게 시간을 벌면서\n전문적 인상을 주는 표현!' },
      { type: 'feedback', summary: '협상 = 제안 + 양보 + 부드러운 거절 + 합의', message: '협상 표현을 알면 비즈니스에서 자신감이 생겨!' },
      { type: 'mission', mission: '가격 협상 상황을 설정하고\n제안→거절→양보→합의 대화를 영어로 작성', encouragement: '협상 영어는 실전 비즈니스의 핵심 무기!' },
    ],
  },

  'english-diamond-10': {
    id: 'english-diamond-10', chapterKey: 'english', tierKey: 'diamond', stageNumber: 10,
    title: '평생 영어 학습자로 살기',
    cards: [
      { type: 'concept', title: '영어는 완성이 아닌 여정이다', description: '평생 학습자의 마인드셋:\n1) 완벽을 버려라: 실수는 성장의 증거\n2) 즐거움을 찾아라: 취미와 영어를 결합\n3) 꾸준함이 왕: 매일 조금씩 > 가끔 많이\n4) 측정하라: 정기적으로 실력 체크\n5) 나눠라: 가르치면 2배로 남아\n\n영어는 목적지가 아니라 여정.\n즐기는 사람이 가장 멀리 가!' },
      { type: 'summary', keywords: [
        { icon: '🌱', label: '성장 마인드셋', description: '실수를 두려워하지 않는 자세' },
        { icon: '🎮', label: '즐거움 결합', description: '취미·관심사와 영어 합치기' },
        { icon: '📊', label: '정기 측정', description: '3개월마다 실력 체크' },
        { icon: '🔄', label: '가르치며 배우기', description: '남에게 설명하면 2배로 남아' },
      ]},
      { type: 'example', bad: { label: '포기한 사람', story: '"3개월 했는데 원어민처럼 못해."\n완벽주의 때문에 포기했다.' }, good: { label: '즐기는 사람', story: '게임을 영어로, 넷플릭스를 영어 자막으로.\n공부가 아니라 생활이 되니 10년째 즐겁다.' }},
      { type: 'ox', statement: '영어를 "완벽하게" 마스터할 수 있는 사람이 있다.', answer: false, feedback: '언어에 "완벽"은 없어.\n원어민도 항상 새로운 것을 배우고 있으니까!' },
      { type: 'multipleChoice', question: '영어 학습을 평생 지속하는 가장 좋은 방법은?', options: ['매일 3시간 의무 공부', '영어를 일상과 취미에 자연스럽게 결합', '시험 점수 목표만 세우기', '원어민 수준이 될 때까지 집중'], correctIndex: 1, explanation: '영어가 공부가 아니라 생활이 되면\n평생 자연스럽게 성장할 수 있어!' },
      { type: 'feedback', summary: '영어 = 완성이 아닌 즐거운 여정', message: '여기까지 온 너는 이미 대단해. 즐기면서 걸어가자!' },
      { type: 'mission', mission: '"나만의 영어 학습 시스템"을 한 페이지로 정리\n(매일 루틴 + 주간 목표 + 월간 측정)', encouragement: '이 한 페이지가 평생 영어 성장의 설계도! 축하해!' },
    ],
  },

}
