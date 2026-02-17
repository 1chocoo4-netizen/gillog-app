// 소통 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const COMMUNICATION_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (소통 기초) 1~10
  // ═══════════════════════════════════════

  'communication-bronze-1': {
    id: 'communication-bronze-1', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 1,
    title: '소통이란 무엇인가',
    cards: [
      { type: 'concept', title: '소통 = 마음을 주고받는 것', description: '소통은 단순히 말하는 게 아니야.\n\n내 생각과 감정을 전달하고\n상대의 생각과 감정을 이해하는 것.\n\n잘 말하는 것 + 잘 듣는 것\n= 진짜 소통이야!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '소통', description: '생각과 감정을 주고받기' },
        { icon: '🗣️', label: '전달', description: '내 마음을 정확히 표현' },
        { icon: '👂', label: '경청', description: '상대의 마음을 이해' },
        { icon: '🤝', label: '연결', description: '소통이 관계를 만든다' },
      ]},
      { type: 'example', bad: { label: '일방적 대화', story: '자기 얘기만 30분 했다.\n상대방은 한마디도 못 하고\n"다음엔 안 만나야지" 생각했다.' }, good: { label: '진짜 소통', story: '내 이야기도 하고 상대 이야기도 들었다.\n서로의 생각을 알게 되니\n더 가까워진 느낌이 들었다.' }},
      { type: 'ox', statement: '말을 잘하면 소통을 잘하는 것이다.', answer: false, feedback: '말하기는 소통의 절반이야!\n잘 듣는 것이 나머지 절반.' },
      { type: 'multipleChoice', question: '소통의 핵심은?', options: ['말을 많이 하기', '어려운 단어 쓰기', '생각과 감정을 주고받기', '상대를 설득하기'], correctIndex: 2, explanation: '소통 = 주고받기!\n전달하고 이해하는 양방향이 핵심이야.' },
      { type: 'feedback', summary: '소통 = 말하기 + 듣기, 양방향 교류', message: '좋은 소통이 좋은 관계를 만들어!' },
      { type: 'mission', mission: '오늘 대화에서 "내가 얼마나 듣고 있는지" 관찰하기', encouragement: '알아차리는 것이 첫걸음!' },
    ],
  },

  'communication-bronze-2': {
    id: 'communication-bronze-2', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 2,
    title: '경청의 힘',
    cards: [
      { type: 'concept', title: '듣는 것이 최고의 소통 기술', description: '대부분 "잘 말하기"를 배우려 하지만\n진짜 소통의 비결은 "잘 듣기"야.\n\n경청 = 상대의 말에 온전히 집중하기.\n\n잘 들어주면 상대방이\n"이 사람은 나를 존중해"라고 느껴.\n관계가 확 달라져!' },
      { type: 'summary', keywords: [
        { icon: '👂', label: '경청', description: '상대 말에 온전히 집중' },
        { icon: '👀', label: '눈 맞춤', description: '눈을 보며 듣기' },
        { icon: '📵', label: '폰 내려놓기', description: '방해 요소 제거' },
        { icon: '💛', label: '존중', description: '경청 = 상대를 존중하는 것' },
      ]},
      { type: 'example', bad: { label: '겉으로만 듣기', story: '친구가 고민을 말하는데\n폰을 보면서 "응, 응" 했다.\n친구: "넌 내 얘기에 관심 없구나."' }, good: { label: '진짜 경청', story: '폰을 내려놓고 눈을 보며 들었다.\n"그래서 어떻게 됐어?" 궁금해했다.\n친구: "너한테 얘기하니까 마음이 편해져."' }},
      { type: 'ox', statement: '듣는 동안 다음에 할 말을 준비하는 게 좋다.', answer: false, feedback: '그러면 지금 상대 말에 집중 못 해!\n먼저 완전히 듣고, 그 다음에 생각해도 돼.' },
      { type: 'multipleChoice', question: '경청의 가장 중요한 태도는?', options: ['빠르게 조언하기', '상대 말에 온전히 집중하기', '더 재미있는 이야기로 바꾸기', '문제 해결책 바로 제시하기'], correctIndex: 1, explanation: '온전히 집중하는 게 핵심!\n조언은 다 듣고 나서 해도 돼.' },
      { type: 'feedback', summary: '경청 = 상대 말에 온전히 집중, 최고의 소통 기술', message: '잘 듣는 사람이 가장 인기 있어!' },
      { type: 'mission', mission: '오늘 누군가와 대화할 때\n폰 내려놓고 눈 보며 끝까지 들어보기', encouragement: '경청 한 번이 관계를 바꿔!' },
    ],
  },

  'communication-bronze-3': {
    id: 'communication-bronze-3', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 3,
    title: '나-전달법(I-Message)',
    cards: [
      { type: 'concept', title: '"너 때문에" 대신 "내가 느끼기에"', description: '갈등 상황에서 "너는 왜 맨날!"이라고 하면\n상대방이 방어적이 돼.\n\n나-전달법: "나는 OO할 때 OO하게 느꼈어."\n\n주어를 "너"에서 "나"로 바꾸면\n비난 없이 내 마음을 전달할 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🙋', label: '나-전달법', description: '"나는 ~할 때 ~하게 느꼈어"' },
        { icon: '🚫', label: '너-전달법 X', description: '"너는 왜 맨날!" = 비난' },
        { icon: '❤️', label: '감정 전달', description: '비난 없이 마음을 표현' },
        { icon: '🛡️', label: '방어 감소', description: '상대가 방어하지 않게 됨' },
      ]},
      { type: 'example', bad: { label: '너-전달법', story: '"너는 왜 맨날 약속에 늦어?!"\n친구가 화났다. "나도 바빴거든!"\n싸움으로 번졌다.' }, good: { label: '나-전달법', story: '"나는 혼자 기다릴 때 서운했어."\n친구: "미안, 그런 기분이었구나.\n다음엔 미리 연락할게."' }},
      { type: 'ox', statement: '"너 때문에 화났어"는 좋은 소통 방법이다.', answer: false, feedback: '"너 때문에"는 비난으로 들려!\n"나는 ~ 때 화가 났어"가 효과적이야.' },
      { type: 'multipleChoice', question: '나-전달법의 올바른 예시는?', options: ['"너 때문에 기분 나빠"', '"너는 항상 그래"', '"나는 기다릴 때 불안했어"', '"너만 생각하지"'], correctIndex: 2, explanation: '"나는"으로 시작하고 감정을 말하면\n상대가 공격이 아닌 마음으로 받아들여!' },
      { type: 'feedback', summary: '나-전달법 = "나는 ~할 때 ~하게 느꼈어"', message: '주어만 바꿔도 대화가 달라져!' },
      { type: 'mission', mission: '최근 속상했던 상황을 나-전달법으로 다시 써보기\n"나는 ___할 때 ___하게 느꼈어"', encouragement: '"나"로 시작하는 연습이 소통을 바꿔!' },
    ],
  },

  'communication-bronze-4': {
    id: 'communication-bronze-4', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 4,
    title: '공감하며 듣기',
    cards: [
      { type: 'concept', title: '해결 전에 공감 먼저', description: '친구가 고민을 말할 때\n바로 해결책을 제시하면?\n"그건 네가 잘못한 거잖아"\n→ 상대방은 이해받지 못한 느낌.\n\n먼저 감정에 공감하는 게 핵심!\n"그래서 속상했겠다" 이 한마디가\n모든 해결책보다 강력해.' },
      { type: 'summary', keywords: [
        { icon: '💛', label: '공감', description: '상대 감정을 알아주기' },
        { icon: '🔁', label: '반영', description: '"속상했겠다" 감정 반영하기' },
        { icon: '🚫', label: '조언 자제', description: '바로 해결 X, 공감 먼저' },
        { icon: '🤗', label: '안전감', description: '공감받으면 마음이 열림' },
      ]},
      { type: 'example', bad: { label: '조언부터', story: '친구: "시험 망쳤어..."\n"그러니까 일찍 공부했어야지."\n친구는 더 속상해서 입을 다물었다.' }, good: { label: '공감 먼저', story: '친구: "시험 망쳤어..."\n"열심히 준비했는데 속상하겠다."\n친구: "응, 진짜 속상해." → 마음을 열었다.' }},
      { type: 'ox', statement: '고민을 들으면 빨리 해결책을 줘야 한다.', answer: false, feedback: '대부분의 사람은 해결보다\n공감을 먼저 원해!\n"속상했겠다" 한마디면 충분해.' },
      { type: 'multipleChoice', question: '친구가 "오늘 발표 망쳤어"라고 할 때 가장 좋은 반응은?', options: ['"다음에 잘하면 되지"', '"긴장했겠다, 많이 속상하지?"', '"연습을 더 했어야지"', '"그래? 나도 망한 적 있어"'], correctIndex: 1, explanation: '감정을 알아주는 게 최고의 반응!\n공감 후에 조언해도 늦지 않아.' },
      { type: 'feedback', summary: '공감 = 해결 전에 감정 먼저 알아주기', message: '"속상했겠다" 한마디가 가장 큰 위로!' },
      { type: 'mission', mission: '오늘 누군가의 이야기를 들을 때\n조언 대신 "그랬구나, ~했겠다" 공감해보기', encouragement: '공감 한마디가 마음의 문을 열어!' },
    ],
  },

  'communication-bronze-5': {
    id: 'communication-bronze-5', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 5,
    title: '비언어적 소통',
    cards: [
      { type: 'concept', title: '말보다 큰 메시지 - 표정, 몸짓, 목소리', description: '소통의 90% 이상이\n말이 아닌 "비언어"로 전달돼.\n\n표정, 눈 맞춤, 몸짓, 목소리 톤.\n\n"괜찮아"라고 말하면서\n표정이 어두우면?\n상대는 말이 아닌 표정을 믿어.' },
      { type: 'summary', keywords: [
        { icon: '😊', label: '표정', description: '가장 강력한 비언어 신호' },
        { icon: '👀', label: '눈 맞춤', description: '관심과 존중의 표현' },
        { icon: '🤲', label: '몸짓', description: '팔짱 = 거부, 고개 끄덕 = 동의' },
        { icon: '🔊', label: '목소리 톤', description: '같은 말도 톤에 따라 다름' },
      ]},
      { type: 'example', bad: { label: '비언어 불일치', story: '"화 안 났어." 하면서\n팔짱 끼고 눈도 안 마주쳤다.\n상대: "분명 화났는데..."' }, good: { label: '비언어 일치', story: '"고마워!" 하면서\n눈을 보고 밝은 표정으로 말했다.\n진심이 전해져서 상대도 기분이 좋았다.' }},
      { type: 'ox', statement: '말의 내용이 소통에서 가장 중요하다.', answer: false, feedback: '내용은 10% 미만!\n표정·톤·몸짓이 90% 이상의 메시지를 전달해.' },
      { type: 'multipleChoice', question: '비언어적 소통에 해당하지 않는 것은?', options: ['미소 짓기', '팔짱 끼기', '카톡 문자 보내기', '고개 끄덕이기'], correctIndex: 2, explanation: '문자는 언어적 소통이야!\n표정·몸짓·눈 맞춤이 비언어적 소통.' },
      { type: 'feedback', summary: '비언어 소통 = 표정+눈+몸짓+톤이 90%', message: '말과 표정이 같을 때 신뢰가 생겨!' },
      { type: 'mission', mission: '오늘 대화할 때 상대의 표정과 몸짓 관찰하기\n(어떤 비언어 신호가 보이는지)', encouragement: '보이지 않던 것이 보이기 시작할 거야!' },
    ],
  },

  'communication-bronze-6': {
    id: 'communication-bronze-6', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 6,
    title: '대화를 망치는 습관',
    cards: [
      { type: 'concept', title: '이것만 안 해도 소통이 좋아진다', description: '대화를 망치는 4가지 습관:\n\n1. 끊기: 상대 말 끊고 내 말하기\n2. 무시: 폰 보며 건성으로 듣기\n3. 판단: "그건 네가 잘못한 거야"\n4. 비교: "나는 더 힘들었어"\n\n이 4가지만 안 해도\n소통 능력이 확 올라가!' },
      { type: 'summary', keywords: [
        { icon: '✂️', label: '말 끊기', description: '상대 말 중간에 끼어들기' },
        { icon: '📵', label: '무시', description: '딴짓하며 건성으로 듣기' },
        { icon: '⚖️', label: '판단', description: '바로 옳고 그름 따지기' },
        { icon: '🔄', label: '비교', description: '"나는 더 ~" 자기 이야기로 전환' },
      ]},
      { type: 'example', bad: { label: '4가지 다 하기', story: '친구: "요즘 힘들어서-"\n"아, 그거? 나도! 근데 너보다 내가 더-"\n(끊기+비교+무시)\n친구는 다시 말하지 않았다.' }, good: { label: '나쁜 습관 제거', story: '끝까지 듣고 / 폰 내려놓고 /\n판단 안 하고 / 내 이야기로 안 돌리고.\n"그랬구나" 한마디에 친구가 편해했다.' }},
      { type: 'ox', statement: '말 끊기는 열정적인 대화의 표시다.', answer: false, feedback: '상대에겐 "내 말은 중요하지 않다"로 느껴져!\n끝까지 들은 후 말해도 늦지 않아.' },
      { type: 'multipleChoice', question: '대화를 망치는 습관이 아닌 것은?', options: ['상대 말 끊기', '끝까지 듣고 공감하기', '판단하며 듣기', '"나는 더 힘들었어" 비교하기'], correctIndex: 1, explanation: '끝까지 듣고 공감하기는 좋은 습관!\n나머지 3가지가 대화를 망치는 습관이야.' },
      { type: 'feedback', summary: '끊기·무시·판단·비교, 4가지만 안 해도 달라진다', message: '나쁜 습관 하나만 줄여도 관계가 좋아져!' },
      { type: 'mission', mission: '오늘 대화에서 4가지 중\n내가 자주 하는 나쁜 습관 1가지 찾기', encouragement: '알아차리면 바꿀 수 있어!' },
    ],
  },

  'communication-bronze-7': {
    id: 'communication-bronze-7', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 7,
    title: '질문하는 기술',
    cards: [
      { type: 'concept', title: '좋은 질문이 좋은 대화를 만든다', description: '질문에는 두 종류가 있어.\n\n닫힌 질문: "재미있었어?" → "응."\n열린 질문: "뭐가 가장 재미있었어?" → 이야기 시작!\n\n열린 질문은 상대가 더 많이\n이야기할 수 있도록 문을 열어줘.\n대화가 풍성해지는 비결이야.' },
      { type: 'summary', keywords: [
        { icon: '🔒', label: '닫힌 질문', description: '"응/아니" 로 끝나는 질문' },
        { icon: '🔓', label: '열린 질문', description: '"어떻게, 무엇, 왜" 질문' },
        { icon: '💬', label: '대화 확장', description: '열린 질문이 대화를 살림' },
        { icon: '🤔', label: '관심 표현', description: '질문 = 너에게 관심 있어' },
      ]},
      { type: 'example', bad: { label: '닫힌 질문만', story: '"오늘 좋았어?" → "응."\n"밥 먹었어?" → "응."\n대화가 끝. 어색한 침묵.' }, good: { label: '열린 질문', story: '"오늘 뭐가 가장 재밌었어?"\n→ 친구가 신나게 이야기 시작.\n자연스럽게 30분 대화가 이어졌다.' }},
      { type: 'ox', statement: '질문을 많이 하면 상대가 부담스러워한다.', answer: false, feedback: '진심 어린 질문은 관심의 표현!\n부담이 아니라 "이 사람이 나에게 관심 있구나" 느낌.' },
      { type: 'multipleChoice', question: '열린 질문의 예시는?', options: ['"시험 잘 봤어?"', '"밥 먹었어?"', '"시험 어떤 게 어려웠어?"', '"숙제 했어?"'], correctIndex: 2, explanation: '"어떤, 무엇, 어떻게"가 들어간 질문이\n상대의 이야기를 끌어내!' },
      { type: 'feedback', summary: '열린 질문 = 대화의 문을 여는 열쇠', message: '"어떻게, 무엇, 왜"로 질문해보자!' },
      { type: 'mission', mission: '오늘 대화에서 닫힌 질문 1개를\n열린 질문으로 바꿔서 해보기', encouragement: '질문 하나가 대화를 살릴 수 있어!' },
    ],
  },

  'communication-bronze-8': {
    id: 'communication-bronze-8', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 8,
    title: '갈등 상황에서 소통하기',
    cards: [
      { type: 'concept', title: '싸우지 않고 해결하는 법', description: '갈등은 나쁜 게 아니야.\n의견이 다른 건 자연스러운 거야.\n\n핵심은 "어떻게 다루느냐".\n\n1. 감정이 뜨거울 땐 잠시 멈추기\n2. 나-전달법으로 내 마음 표현\n3. 상대 입장 들어보기\n4. 함께 해결책 찾기' },
      { type: 'summary', keywords: [
        { icon: '⏸️', label: '멈추기', description: '화날 때 즉시 반응 X' },
        { icon: '🙋', label: '나-전달법', description: '비난 없이 마음 표현' },
        { icon: '👂', label: '상대 입장', description: '상대 이야기도 들어보기' },
        { icon: '🤝', label: '함께 해결', description: '이기는 게 아니라 함께 풀기' },
      ]},
      { type: 'example', bad: { label: '감정적 반응', story: '"너 때문이야!" 화가 나서 소리쳤다.\n상대도 소리치기 시작.\n문제는 안 풀리고 관계만 나빠졌다.' }, good: { label: '갈등 소통', story: '"잠깐, 좀 진정하고 이야기하자."\n"나는 약속 안 지켜져서 서운했어."\n"너는 어떻게 느꼈어?"\n함께 다음 방법을 찾았다.' }},
      { type: 'ox', statement: '갈등을 피하는 것이 가장 좋은 방법이다.', answer: false, feedback: '피하면 쌓여서 더 커져!\n차분하게 이야기하는 것이 진짜 해결이야.' },
      { type: 'multipleChoice', question: '갈등 상황에서 첫 번째로 해야 할 것은?', options: ['바로 내 의견 말하기', '상대를 비난하기', '감정이 뜨거우면 잠시 멈추기', '무시하고 넘어가기'], correctIndex: 2, explanation: '뜨거운 감정에서 한 말은 후회하기 쉬워!\n잠시 멈추고 진정한 후 대화하자.' },
      { type: 'feedback', summary: '갈등 소통 = 멈추기 → 나-전달법 → 경청 → 함께 해결', message: '싸움이 아니라 대화로 풀 수 있어!' },
      { type: 'mission', mission: '최근 갈등 상황을 떠올리고\n4단계로 다시 대화해보기 (상상으로)', encouragement: '연습하면 실전에서도 할 수 있어!' },
    ],
  },

  'communication-bronze-9': {
    id: 'communication-bronze-9', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 9,
    title: '온라인 소통 예절',
    cards: [
      { type: 'concept', title: '문자에는 표정이 없다', description: '카톡, DM, 댓글...\n온라인 소통은 비언어가 없어.\n\n"알겠어" → 진심? 짜증? 냉소?\n같은 말도 받는 사람마다 다르게 느껴.\n\n온라인에선 더 신중하고\n더 친절하게 쓰는 게 중요해!' },
      { type: 'summary', keywords: [
        { icon: '📱', label: '온라인 소통', description: '문자·카톡·SNS 대화' },
        { icon: '😶', label: '표정 없음', description: '비언어 신호가 전달 안 됨' },
        { icon: '🤔', label: '오해 위험', description: '의도와 다르게 해석될 수 있음' },
        { icon: '💛', label: '친절하게', description: '더 신중하고 따뜻하게 쓰기' },
      ]},
      { type: 'example', bad: { label: '차가운 문자', story: '"ㅇㅇ" "ㅋ" "알겠어"\n친구: "혹시 나한테 화났나?"\n화난 게 아닌데 오해가 생겼다.' }, good: { label: '따뜻한 문자', story: '"알겠어! ㅎㅎ" "고마워 😊"\n같은 내용인데 느낌이 완전히 다르다.\n오해 없이 좋은 관계 유지.' }},
      { type: 'ox', statement: '온라인에서는 짧게 쓰는 게 항상 효율적이다.', answer: false, feedback: '너무 짧으면 차갑게 느껴질 수 있어!\n상황에 맞게 따뜻함을 담아 쓰자.' },
      { type: 'multipleChoice', question: '온라인 소통에서 가장 주의할 점은?', options: ['빠르게 답장하기', '오해가 생기지 않도록 신중하게 쓰기', '이모티콘 많이 쓰기', '짧게 쓰기'], correctIndex: 1, explanation: '표정이 없으니 의도와 다르게 읽힐 수 있어.\n보내기 전 한 번 더 읽어보자!' },
      { type: 'feedback', summary: '온라인 소통 = 더 신중하고 더 따뜻하게', message: '보내기 전 "상대가 어떻게 느낄까?" 한 번 생각!' },
      { type: 'mission', mission: '오늘 보낸 메시지 3개를 다시 읽고\n"상대가 어떻게 느꼈을지" 생각해보기', encouragement: '한 번 점검하는 습관이 오해를 막아!' },
    ],
  },

  'communication-bronze-10': {
    id: 'communication-bronze-10', chapterKey: 'communication', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 소통 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n나만의 소통 루틴을 만들자!\n\n1. 경청: 폰 내려놓고 눈 보며 듣기\n2. 공감: "그랬구나" 먼저\n3. 나-전달법: "나는 ~할 때 ~했어"\n4. 열린 질문: "어떻게, 무엇" 질문\n5. 나쁜 습관 하나씩 줄이기' },
      { type: 'summary', keywords: [
        { icon: '👂', label: '경청', description: '끝까지 집중해서 듣기' },
        { icon: '💛', label: '공감', description: '감정을 먼저 알아주기' },
        { icon: '🙋', label: '나-전달법', description: '"나는" 으로 마음 표현' },
        { icon: '🔓', label: '열린 질문', description: '대화를 풍성하게 만들기' },
      ]},
      { type: 'example', bad: { label: '배우고 안 하기', story: '소통이 중요한 건 알겠는데\n실제 대화에서는 까먹고\n예전처럼 행동했다.' }, good: { label: '루틴 실천', story: '하루 1번 경청 연습 + 공감 한마디 +\n나-전달법 1회 적용.\n한 달 뒤 친구들이 "너 달라졌다!"고 했다.' }},
      { type: 'ox', statement: '소통 능력은 성격이라 바꿀 수 없다.', answer: false, feedback: '소통은 기술이야!\n연습하면 누구나 좋아질 수 있어.' },
      { type: 'multipleChoice', question: '소통 루틴에서 가장 중요한 것은?', options: ['한 번에 다 바꾸기', '매일 하나씩 꾸준히 연습', '이론만 알기', '남이 먼저 바뀌길 기다리기'], correctIndex: 1, explanation: '매일 작은 연습이 큰 변화를 만들어!\n한 가지씩 꾸준히 하자.' },
      { type: 'apply', question: '나만의 소통 루틴을 설계해보세요.\n(경청 / 공감 / 표현 각각 할 것)', placeholder: '예: 경청-폰 내려놓기 / 공감-"그랬구나" 1일 1회 / 표현-나-전달법 연습' },
      { type: 'feedback', summary: '소통 루틴 = 경청 + 공감 + 나-전달법 + 열린 질문', message: '브론즈 완료! 이제 소통의 기본기를 갖췄어!' },
      { type: 'mission', mission: '오늘부터 하루 1번\n경청 + 공감 한마디 실천하기', encouragement: '소통이 달라지면 관계가 달라져!' },
    ],
  },

}
