// 사랑 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const LOVE_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (사랑 기초) 1~10
  // ═══════════════════════════════════════

  'love-bronze-1': {
    id: 'love-bronze-1', chapterKey: 'love', tierKey: 'bronze', stageNumber: 1,
    title: '사랑이란 무엇인가',
    cards: [
      { type: 'concept', title: '사랑 = 소중히 여기는 마음', description: '사랑은 연애만을 뜻하지 않아.\n\n가족 사랑, 친구 사랑, 자기 사랑,\n이웃 사랑, 반려동물 사랑...\n\n사랑이란 누군가를\n소중히 여기고 아끼는 마음이야.\n사랑은 인생에서 가장 큰 힘이야!' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '사랑', description: '소중히 여기고 아끼는 마음' },
        { icon: '👨‍👩‍👧', label: '가족 사랑', description: '가장 가까운 사랑의 시작' },
        { icon: '🤝', label: '친구 사랑', description: '함께 성장하는 우정' },
        { icon: '🪞', label: '자기 사랑', description: '나를 소중히 여기는 것' },
      ]},
      { type: 'example', bad: { label: '사랑을 모르는 상태', story: '"사랑 같은 건 유치해."\n마음을 닫고 혼자만 살려고 했다.\n외롭고 공허한 날들이 이어졌다.' }, good: { label: '사랑을 아는 상태', story: '엄마의 도시락, 친구의 응원,\n강아지의 반가움.\n"나는 사랑받고 있구나."\n알아차리니 하루가 따뜻해졌다.' }},
      { type: 'ox', statement: '사랑은 연인 사이에서만 느끼는 감정이다.', answer: false, feedback: '가족, 친구, 자기 자신, 이웃...\n사랑은 모든 관계에 존재해!' },
      { type: 'multipleChoice', question: '사랑의 핵심은?', options: ['상대에게 선물 주기', '누군가를 소중히 여기고 아끼는 마음', '항상 함께 있기', '모든 것을 참기'], correctIndex: 1, explanation: '사랑의 본질은 "소중히 여기는 마음"!\n형태는 다양하지만 핵심은 같아.' },
      { type: 'feedback', summary: '사랑 = 소중히 여기는 마음, 다양한 형태로 존재', message: '사랑을 알아차리는 것이 첫걸음!' },
      { type: 'mission', mission: '오늘 나를 사랑해주는 사람 3명 적어보기', encouragement: '이미 많은 사랑 속에 있을 거야!' },
    ],
  },

  'love-bronze-2': {
    id: 'love-bronze-2', chapterKey: 'love', tierKey: 'bronze', stageNumber: 2,
    title: '자기 사랑 - 나를 먼저 사랑하기',
    cards: [
      { type: 'concept', title: '나를 사랑해야 남도 사랑할 수 있다', description: '빈 컵으로는 물을 줄 수 없듯\n나를 먼저 채워야 남에게 줄 수 있어.\n\n자기 사랑 = 이기적인 게 아니야.\n나의 몸, 마음, 감정을\n소중히 돌보는 것.\n\n나를 아끼는 사람이\n남도 진심으로 아낄 수 있어.' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 사랑', description: '나를 소중히 돌보기' },
        { icon: '🧘', label: '자기 돌봄', description: '몸과 마음을 챙기기' },
        { icon: '💬', label: '내면 대화', description: '나에게 따뜻하게 말하기' },
        { icon: '🚫', label: '이기적 X', description: '자기 사랑 ≠ 이기심' },
      ]},
      { type: 'example', bad: { label: '자기 비하', story: '"나는 부족해. 나는 못생겼어."\n항상 자신을 깎아내렸다.\n자신감이 바닥이고 늘 우울했다.' }, good: { label: '자기 사랑', story: '"오늘도 수고했어. 잘하고 있어."\n나에게 따뜻한 말을 건넸다.\n마음이 편안해지고 자신감이 올라왔다.' }},
      { type: 'ox', statement: '자기 사랑은 이기적인 행동이다.', answer: false, feedback: '자기 사랑은 건강한 거야!\n나를 돌봐야 다른 사람도 돌볼 수 있어.' },
      { type: 'multipleChoice', question: '자기 사랑의 올바른 예는?', options: ['남의 것을 빼앗기', '나의 감정과 건강을 소중히 챙기기', '항상 남보다 나를 먼저 챙기기', '남의 말 무시하기'], correctIndex: 1, explanation: '자기 사랑 = 나의 몸과 마음을 돌보는 것!\n이기심과는 전혀 달라.' },
      { type: 'feedback', summary: '자기 사랑 = 나를 소중히 돌보는 건강한 습관', message: '나에게 따뜻한 말 한마디 건네보자!' },
      { type: 'mission', mission: '거울을 보며 "오늘도 수고했어" 말해보기', encouragement: '나에게 하는 따뜻한 말이 하루를 바꿔!' },
    ],
  },

  'love-bronze-3': {
    id: 'love-bronze-3', chapterKey: 'love', tierKey: 'bronze', stageNumber: 3,
    title: '가족의 사랑 알아차리기',
    cards: [
      { type: 'concept', title: '가장 가까운 사랑을 발견하기', description: '가족의 사랑은 너무 가까워서\n당연하게 느껴질 때가 많아.\n\n아침에 깨워주는 것,\n밥을 차려주는 것,\n"조심히 다녀"라는 한마디.\n\n이 모든 게 사랑이야.\n알아차리는 순간 감사가 밀려와!' },
      { type: 'summary', keywords: [
        { icon: '👨‍👩‍👧', label: '가족 사랑', description: '가장 가깝고 당연한 사랑' },
        { icon: '🍚', label: '일상 속 사랑', description: '밥, 빨래, 걱정 모두 사랑' },
        { icon: '👁️', label: '알아차림', description: '당연함 속 사랑 발견하기' },
        { icon: '💬', label: '표현', description: '알아차리면 표현하기' },
      ]},
      { type: 'example', bad: { label: '당연하게 여기기', story: '"밥 차려줘서 당연하지. 원래 그런 거지."\n감사 한마디 없이 불평만 했다.\n부모님은 서운했지만 말하지 않았다.' }, good: { label: '사랑 알아차리기', story: '"엄마가 새벽에 일어나서 도시락 싸준 거구나."\n알아차리고 "엄마 고마워!" 했더니\n엄마 눈가가 촉촉해졌다.' }},
      { type: 'ox', statement: '가족은 원래 잘해줘야 하니까 감사할 필요 없다.', answer: false, feedback: '원래 그런 게 아니야!\n매일의 돌봄이 전부 사랑의 표현이야.' },
      { type: 'multipleChoice', question: '가족 사랑을 알아차리는 가장 좋은 방법은?', options: ['큰 선물을 받았을 때만', '일상의 작은 행동에서 사랑을 발견하기', '가족이 직접 말해줄 때만', '특별한 날에만'], correctIndex: 1, explanation: '밥 한 끼, 걱정 한마디, 아침에 깨워주는 것.\n일상이 전부 사랑이야!' },
      { type: 'feedback', summary: '가족 사랑 = 일상 속 당연하지 않은 사랑', message: '가장 가까운 사랑을 알아차리자!' },
      { type: 'mission', mission: '가족이 나를 위해 해주는 것 5가지 적고\n1가지에 "고마워" 표현하기', encouragement: '"고마워" 한마디가 가족을 행복하게 해!' },
    ],
  },

  'love-bronze-4': {
    id: 'love-bronze-4', chapterKey: 'love', tierKey: 'bronze', stageNumber: 4,
    title: '사랑의 5가지 언어',
    cards: [
      { type: 'concept', title: '사람마다 사랑을 느끼는 방식이 다르다', description: '사랑을 표현하고 느끼는 방식은\n사람마다 달라. 5가지가 있어.\n\n1. 인정하는 말 ("잘했어!")\n2. 함께하는 시간\n3. 선물\n4. 도움 행동 (대신 해주기)\n5. 스킨십 (하이파이브, 포옹)\n\n상대의 언어를 알면 사랑이 전달돼!' },
      { type: 'summary', keywords: [
        { icon: '🗣️', label: '인정하는 말', description: '칭찬, 격려, 감사의 말' },
        { icon: '⏰', label: '함께하는 시간', description: '같이 보내는 시간' },
        { icon: '🎁', label: '선물', description: '마음을 담은 선물' },
        { icon: '🤲', label: '도움 행동', description: '행동으로 보여주는 사랑' },
      ]},
      { type: 'example', bad: { label: '언어 불일치', story: '선물을 좋아하는 친구에게\n칭찬만 했다. 친구는 별로 감동 없었다.\n"나를 신경 안 쓰나 봐."' }, good: { label: '언어 맞추기', story: '함께하는 시간이 중요한 친구에게\n바쁘지만 점심시간을 함께 보냈다.\n친구: "오늘 정말 고마웠어!"' }},
      { type: 'ox', statement: '사랑 표현은 모든 사람에게 같은 방식이면 된다.', answer: false, feedback: '사람마다 느끼는 방식이 달라!\n상대의 사랑 언어를 아는 게 중요해.' },
      { type: 'multipleChoice', question: '사랑의 5가지 언어에 해당하지 않는 것은?', options: ['인정하는 말', '함께하는 시간', '돈 많이 쓰기', '도움 행동'], correctIndex: 2, explanation: '사랑의 언어는 비용이 아니라 마음!\n돈이 아닌 진심이 사랑을 전달해.' },
      { type: 'feedback', summary: '사랑의 언어 = 사람마다 다른 사랑 표현 방식', message: '상대의 언어를 알면 사랑이 더 잘 전달돼!' },
      { type: 'mission', mission: '나의 사랑 언어와 가족/친구의 사랑 언어 추측해보기', encouragement: '알면 관계가 확 달라져!' },
    ],
  },

  'love-bronze-5': {
    id: 'love-bronze-5', chapterKey: 'love', tierKey: 'bronze', stageNumber: 5,
    title: '친구 사이의 사랑',
    cards: [
      { type: 'concept', title: '우정도 사랑의 한 형태', description: '친구 사이의 사랑 = 우정.\n\n함께 웃고, 힘들 때 곁에 있고,\n응원하고, 솔직하게 말해주는 것.\n\n진짜 우정은 좋을 때만이 아니라\n힘들 때 곁에 있어주는 거야.\n\n좋은 친구가 되는 것도\n사랑을 실천하는 거야!' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '우정', description: '함께 성장하는 사랑' },
        { icon: '😊', label: '함께', description: '기쁠 때 함께 웃기' },
        { icon: '😢', label: '곁에', description: '힘들 때 곁에 있기' },
        { icon: '💪', label: '응원', description: '서로의 성장을 응원' },
      ]},
      { type: 'example', bad: { label: '조건부 우정', story: '잘 나갈 때만 친구로 지내다가\n힘들어지자 연락을 끊었다.\n"좋을 때만 친구였구나."' }, good: { label: '진짜 우정', story: '시험 성적이 떨어져 우울할 때\n친구가 와서 옆에 앉았다.\n"괜찮아, 나 여기 있어."\n그 한마디가 세상에서 가장 따뜻했다.' }},
      { type: 'ox', statement: '진짜 친구는 항상 재미있어야 한다.', answer: false, feedback: '재미보다 중요한 건 신뢰와 배려!\n힘들 때 곁에 있는 것이 진짜 우정이야.' },
      { type: 'multipleChoice', question: '진짜 우정의 핵심은?', options: ['항상 같이 놀기', '좋을 때나 힘들 때나 곁에 있기', '선물을 많이 주기', '비밀을 함께 만들기'], correctIndex: 1, explanation: '좋을 때도 힘들 때도 함께하는 것!\n이게 진짜 우정이야.' },
      { type: 'feedback', summary: '우정 = 좋을 때나 힘들 때나 곁에 있는 사랑', message: '좋은 친구가 되는 것도 사랑의 실천!' },
      { type: 'mission', mission: '소중한 친구 1명에게\n"고마워" 또는 응원 메시지 보내기', encouragement: '한 줄 메시지가 하루를 바꿀 수 있어!' },
    ],
  },

  'love-bronze-6': {
    id: 'love-bronze-6', chapterKey: 'love', tierKey: 'bronze', stageNumber: 6,
    title: '사랑은 행동이다',
    cards: [
      { type: 'concept', title: '마음만으로는 전달되지 않는다', description: '사랑한다고 마음속으로만 생각하면\n상대방은 모를 수 있어.\n\n사랑은 행동으로 보여줘야 해.\n\n작은 행동이라도:\n안부 문자, 도시락 나누기,\n숙제 도와주기, 안아주기.\n\n행동이 마음을 전달해!' },
      { type: 'summary', keywords: [
        { icon: '🏃', label: '행동', description: '사랑은 행동으로 보여주는 것' },
        { icon: '💬', label: '말로 표현', description: '"사랑해, 고마워" 말하기' },
        { icon: '🤲', label: '작은 실천', description: '안부, 도움, 나눔' },
        { icon: '📅', label: '매일', description: '특별한 날이 아니라 매일' },
      ]},
      { type: 'example', bad: { label: '마음만', story: '엄마가 힘들어 보였다.\n"걱정되긴 한데..." 마음만 있고\n아무것도 안 했다. 엄마는 몰랐다.' }, good: { label: '행동으로', story: '"엄마, 설거지 내가 할게!"\n작은 행동 하나에 엄마가 환하게 웃었다.\n마음이 행동이 되니 사랑이 전달됐다.' }},
      { type: 'ox', statement: '마음속으로 사랑하면 상대가 알아서 느낀다.', answer: false, feedback: '행동으로 보여줘야 전달돼!\n마음만으로는 상대가 모를 수 있어.' },
      { type: 'multipleChoice', question: '사랑을 가장 잘 전달하는 방법은?', options: ['마음속으로만 생각하기', '큰 선물 한 번 주기', '작은 행동으로 매일 표현하기', '특별한 날에만 표현하기'], correctIndex: 2, explanation: '매일의 작은 행동이 가장 큰 사랑!\n특별한 날보다 일상이 중요해.' },
      { type: 'feedback', summary: '사랑 = 마음 + 행동, 행동해야 전달된다', message: '오늘 작은 행동 하나로 사랑을 보여주자!' },
      { type: 'mission', mission: '오늘 소중한 사람에게\n사랑의 "작은 행동" 1가지 실천하기', encouragement: '작은 행동이 큰 사랑이 돼!' },
    ],
  },

  'love-bronze-7': {
    id: 'love-bronze-7', chapterKey: 'love', tierKey: 'bronze', stageNumber: 7,
    title: '사랑과 집착의 차이',
    cards: [
      { type: 'concept', title: '사랑은 자유, 집착은 구속', description: '사랑과 집착은 다른 거야.\n\n사랑: 상대의 행복을 원함\n집착: 상대를 내 뜻대로 하고 싶음\n\n사랑은 자유를 주고\n집착은 자유를 빼앗아.\n\n진짜 사랑은 상대가\n자기답게 살도록 응원하는 거야.' },
      { type: 'summary', keywords: [
        { icon: '❤️', label: '사랑', description: '상대의 행복을 진심으로 원함' },
        { icon: '⛓️', label: '집착', description: '상대를 소유하고 통제하려 함' },
        { icon: '🕊️', label: '자유', description: '사랑은 자유를 존중' },
        { icon: '🌱', label: '성장', description: '서로의 성장을 응원' },
      ]},
      { type: 'example', bad: { label: '집착', story: '"왜 다른 친구랑 놀아? 나랑만 놀아야지!"\n친구의 다른 관계를 통제하려 했다.\n결국 친구가 멀어졌다.' }, good: { label: '사랑', story: '"다른 친구들이랑도 잘 지내!\n우리도 만날 때 더 즐겁잖아."\n자유를 존중하니 관계가 더 좋아졌다.' }},
      { type: 'ox', statement: '사랑하면 항상 함께 있고 싶은 게 당연하다.', answer: false, feedback: '함께하고 싶은 마음은 자연스럽지만\n상대의 자유를 존중하는 게 진짜 사랑이야.' },
      { type: 'multipleChoice', question: '사랑과 집착의 가장 큰 차이는?', options: ['감정의 크기', '상대의 자유를 존중하느냐', '만나는 횟수', '선물의 양'], correctIndex: 1, explanation: '사랑은 자유를 주고, 집착은 자유를 빼앗아.\n이게 가장 큰 차이야!' },
      { type: 'feedback', summary: '사랑 = 자유와 행복 존중, 집착 = 통제와 소유', message: '진짜 사랑은 상대가 자유롭게 빛나도록!' },
      { type: 'mission', mission: '내 관계에서 "집착"에 가까운 행동이 있었는지 돌아보기', encouragement: '알아차리면 더 건강한 사랑을 할 수 있어!' },
    ],
  },

  'love-bronze-8': {
    id: 'love-bronze-8', chapterKey: 'love', tierKey: 'bronze', stageNumber: 8,
    title: '배려와 양보',
    cards: [
      { type: 'concept', title: '사랑의 실천 = 배려', description: '배려란 상대의 입장에서\n생각하고 행동하는 거야.\n\n"내가 이러면 상대가 어떨까?"\n이 질문이 배려의 시작!\n\n양보란 내가 조금 손해 보더라도\n상대를 위해 한 걸음 물러서는 거야.\n배려와 양보가 사랑을 완성해.' },
      { type: 'summary', keywords: [
        { icon: '💛', label: '배려', description: '상대 입장에서 생각하기' },
        { icon: '🤲', label: '양보', description: '한 걸음 물러서는 마음' },
        { icon: '🤔', label: '역지사지', description: '"상대라면 어떨까?"' },
        { icon: '⚖️', label: '균형', description: '일방적이 아닌 서로 배려' },
      ]},
      { type: 'example', bad: { label: '자기중심', story: '항상 내가 원하는 것만 주장했다.\n"내가 먼저! 내 것 먼저!"\n친구들이 하나둘 멀어졌다.' }, good: { label: '배려와 양보', story: '친구가 먹고 싶어하는 빵을 양보했다.\n"너 이거 좋아하잖아, 먹어!"\n친구: "진짜 고마워!" 관계가 더 깊어졌다.' }},
      { type: 'ox', statement: '양보하면 손해만 본다.', answer: false, feedback: '양보는 관계를 더 좋게 만들어!\n단기적 손해지만 장기적으로 큰 이득이야.' },
      { type: 'multipleChoice', question: '배려의 시작은?', options: ['남이 나에게 먼저 잘하기', '"상대 입장이라면 어떨까?" 생각하기', '모든 것을 참기', '항상 양보만 하기'], correctIndex: 1, explanation: '역지사지가 배려의 핵심!\n한 번 생각하는 것이 큰 차이를 만들어.' },
      { type: 'feedback', summary: '배려 = 상대 입장에서 생각, 양보 = 한 걸음 물러서기', message: '작은 배려가 큰 사랑을 만들어!' },
      { type: 'mission', mission: '오늘 한 번 상대 입장에서 생각하고\n양보하거나 배려하는 행동 하기', encouragement: '배려 한 번이 관계를 따뜻하게!' },
    ],
  },

  'love-bronze-9': {
    id: 'love-bronze-9', chapterKey: 'love', tierKey: 'bronze', stageNumber: 9,
    title: '상처와 회복 - 사랑 속의 아픔',
    cards: [
      { type: 'concept', title: '사랑하기 때문에 아프기도 하다', description: '소중한 사람이기 때문에\n상처를 더 크게 받기도 해.\n\n하지만 상처가 있다고\n사랑이 없는 건 아니야.\n\n중요한 건 상처를 어떻게 다루느냐.\n솔직하게 말하고, 사과하고,\n용서하는 과정이 사랑을 더 깊게 해.' },
      { type: 'summary', keywords: [
        { icon: '💔', label: '상처', description: '가까운 사이라 더 아픈 것' },
        { icon: '🗣️', label: '솔직함', description: '아픔을 솔직하게 표현' },
        { icon: '🙇', label: '사과', description: '잘못을 인정하는 용기' },
        { icon: '🤝', label: '용서', description: '관계를 회복하는 선택' },
      ]},
      { type: 'example', bad: { label: '상처 묻어두기', story: '친구가 상처 주는 말을 했다.\n속상했지만 참고 묻어뒀다.\n마음이 점점 멀어졌다.' }, good: { label: '상처 다루기', story: '"그 말이 좀 속상했어."\n솔직하게 말하니 친구가 사과했다.\n"미안, 몰랐어. 조심할게."\n오히려 더 가까워졌다.' }},
      { type: 'ox', statement: '사랑하는 사이에서는 상처받을 일이 없다.', answer: false, feedback: '가까울수록 상처도 생겨!\n중요한 건 상처를 함께 치유하는 거야.' },
      { type: 'multipleChoice', question: '사랑하는 사람에게 상처받았을 때 가장 좋은 방법은?', options: ['참고 넘어가기', '솔직하게 감정을 표현하기', '복수하기', '관계를 끊기'], correctIndex: 1, explanation: '솔직한 표현이 오해를 풀고\n관계를 더 깊게 만들어!' },
      { type: 'feedback', summary: '사랑 속 상처 = 솔직함 + 사과 + 용서로 치유', message: '상처를 다루는 법이 사랑의 깊이를 결정해!' },
      { type: 'mission', mission: '최근 속상했던 일을 떠올리고\n솔직하게 표현할 문장 만들어보기', encouragement: '솔직함이 관계를 더 강하게 해!' },
    ],
  },

  'love-bronze-10': {
    id: 'love-bronze-10', chapterKey: 'love', tierKey: 'bronze', stageNumber: 10,
    title: '사랑을 실천하는 사람 되기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n사랑을 실천하는 사람이 되자!\n\n1. 나를 먼저 사랑하기 (자기 돌봄)\n2. 가족 사랑 알아차리기\n3. 사랑의 언어로 표현하기\n4. 행동으로 보여주기 (매일 작게)\n5. 배려와 양보 실천하기\n6. 상처는 솔직하게 다루기' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 사랑', description: '나를 먼저 소중히' },
        { icon: '👨‍👩‍👧', label: '가족 사랑', description: '당연하지 않은 사랑 알아차리기' },
        { icon: '🏃', label: '행동', description: '매일 작은 행동으로 표현' },
        { icon: '💛', label: '배려', description: '상대 입장에서 생각하기' },
      ]},
      { type: 'example', bad: { label: '사랑을 모르는 상태', story: '사랑이 뭔지 알겠는데\n실천은 안 했다.\n관계는 예전과 같았다.' }, good: { label: '사랑 실천', story: '아침: 거울 보며 "오늘도 화이팅"\n점심: 친구에게 "고마워" 한마디\n저녁: 엄마에게 "맛있었어!"\n작은 실천들이 모든 관계를 바꿨다.' }},
      { type: 'ox', statement: '사랑은 느끼는 것이지 배우는 것이 아니다.', answer: false, feedback: '사랑도 배우고 연습할 수 있어!\n표현하고 실천하는 법을 익히면\n더 깊은 사랑을 할 수 있어.' },
      { type: 'multipleChoice', question: '사랑을 실천하는 가장 중요한 원칙은?', options: ['특별한 날에만 크게', '매일 작은 행동으로 꾸준히', '말로만 충분히', '내가 받는 것에 집중'], correctIndex: 1, explanation: '매일의 작은 행동이 가장 큰 사랑!\n꾸준함이 사랑의 비결이야.' },
      { type: 'apply', question: '나만의 사랑 실천 루틴을 설계해보세요.\n(자기 사랑 / 가족 / 친구 각각)', placeholder: '예: 자기-매일 칭찬 1번 / 가족-"고마워" 1번 / 친구-응원 메시지 1번' },
      { type: 'feedback', summary: '사랑 실천 = 자기 사랑 + 표현 + 행동 + 배려', message: '브론즈 완료! 사랑은 연습할수록 커져!' },
      { type: 'mission', mission: '오늘부터 매일 사랑의 행동 1가지 실천하기!', encouragement: '사랑을 실천하는 사람이 가장 행복해!' },
    ],
  },

}
