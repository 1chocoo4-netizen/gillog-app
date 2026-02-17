// 멘탈 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const MENTAL_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (멘탈 기초) 1~10
  // ═══════════════════════════════════════

  'mental-bronze-1': {
    id: 'mental-bronze-1', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 1,
    title: '멘탈이란 무엇인가',
    cards: [
      { type: 'concept', title: '멘탈 = 마음의 힘', description: '멘탈이란 어려운 상황에서도\n무너지지 않고 버티는 마음의 힘이야.\n\n멘탈이 강한 사람은\n실패해도 다시 일어나고\n스트레스 속에서도 중심을 잡아.\n\n멘탈은 타고나는 게 아니라\n훈련으로 키울 수 있어!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '멘탈', description: '어려움을 견디는 마음의 힘' },
        { icon: '💪', label: '회복력', description: '무너져도 다시 일어나는 힘' },
        { icon: '🏋️', label: '훈련', description: '근육처럼 키울 수 있다' },
        { icon: '⚖️', label: '균형', description: '감정에 휘둘리지 않는 중심' },
      ]},
      { type: 'example', bad: { label: '약한 멘탈', story: '시험 한 번 망치자 "나는 끝이야."\n모든 걸 포기하고 아무것도 안 했다.\n작은 실패 하나에 전부 무너졌다.' }, good: { label: '강한 멘탈', story: '시험을 망쳤지만 "다음에 더 잘하면 돼."\n속상한 감정을 인정하고\n원인을 분석해서 다음을 준비했다.' }},
      { type: 'ox', statement: '멘탈이 강한 사람은 힘든 감정을 느끼지 않는다.', answer: false, feedback: '강한 멘탈 = 감정을 안 느끼는 게 아니야!\n느끼되, 거기에 휘둘리지 않는 거야.' },
      { type: 'multipleChoice', question: '멘탈의 핵심은?', options: ['감정을 느끼지 않기', '힘든 상황에서도 다시 일어나는 회복력', '항상 긍정적이기', '남에게 약한 모습 안 보이기'], correctIndex: 1, explanation: '핵심은 "회복력"!\n쓰러져도 다시 일어나는 힘이야.' },
      { type: 'feedback', summary: '멘탈 = 회복력, 훈련으로 키울 수 있다', message: '멘탈은 근육이야. 오늘부터 키우자!' },
      { type: 'mission', mission: '최근 멘탈이 흔들렸던 순간 1가지 적고\n"어떻게 회복했는지" 돌아보기', encouragement: '이미 회복한 경험이 있다면, 강한 거야!' },
    ],
  },

  'mental-bronze-2': {
    id: 'mental-bronze-2', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 2,
    title: '스트레스 이해하기',
    cards: [
      { type: 'concept', title: '스트레스는 적이 아니다', description: '스트레스를 무조건 나쁘다고?\n사실 적당한 스트레스는 필요해.\n\n좋은 스트레스: 시험 긴장감 → 집중력 UP\n나쁜 스트레스: 과도한 압박 → 몸과 마음 고장\n\n핵심은 스트레스를 "없애기"가 아니라\n"관리하기"야!' },
      { type: 'summary', keywords: [
        { icon: '⚡', label: '좋은 스트레스', description: '적당한 긴장 = 동기부여' },
        { icon: '🔥', label: '나쁜 스트레스', description: '과도한 압박 = 탈진' },
        { icon: '📊', label: '적정 수준', description: '너무 없어도, 많아도 안 좋음' },
        { icon: '🎮', label: '관리', description: '없애기 X, 관리하기 O' },
      ]},
      { type: 'example', bad: { label: '스트레스 방치', story: '계속 쌓이는 스트레스를 무시했다.\n어느 날 갑자기 두통, 불면, 짜증.\n몸이 먼저 경고를 보냈다.' }, good: { label: '스트레스 관리', story: '"요즘 좀 힘들다" 인정하고\n운동, 대화, 충분한 수면으로 관리.\n스트레스가 적정 수준에서 유지됐다.' }},
      { type: 'ox', statement: '스트레스는 무조건 없애야 좋다.', answer: false, feedback: '적당한 스트레스는 성장에 필요해!\n없애는 게 아니라 관리하는 거야.' },
      { type: 'multipleChoice', question: '스트레스에 대한 올바른 태도는?', options: ['무조건 피하기', '참고 견디기', '적정 수준으로 관리하기', '스트레스를 즐기기'], correctIndex: 2, explanation: '관리가 핵심! 적당히 유지하면\n오히려 성과를 높여줘.' },
      { type: 'feedback', summary: '스트레스 = 적이 아니라 관리 대상', message: '스트레스와 친해지면 더 강해져!' },
      { type: 'mission', mission: '내 스트레스 수준을 1~10점으로 체크하고\n원인 1가지 적기', encouragement: '인식이 관리의 시작이야!' },
    ],
  },

  'mental-bronze-3': {
    id: 'mental-bronze-3', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 3,
    title: '감정 다루기 기초',
    cards: [
      { type: 'concept', title: '감정은 파도, 나는 서퍼', description: '화, 슬픔, 불안 같은 감정은\n파도처럼 왔다가 가는 거야.\n\n파도를 막을 순 없지만\n올라타는 법은 배울 수 있어.\n\n핵심 3단계:\n1. 알아차리기: "지금 화가 나는구나"\n2. 받아들이기: "화가 나도 괜찮아"\n3. 흘려보내기: 심호흡, 잠시 멈추기' },
      { type: 'summary', keywords: [
        { icon: '🌊', label: '파도', description: '감정은 왔다가 가는 것' },
        { icon: '👁️', label: '알아차리기', description: '지금 내 감정 인식' },
        { icon: '🤗', label: '받아들이기', description: '어떤 감정이든 괜찮다' },
        { icon: '🧘', label: '흘려보내기', description: '심호흡, 잠시 멈추기' },
      ]},
      { type: 'example', bad: { label: '감정에 휩쓸림', story: '화가 나서 친구에게 소리쳤다.\n후회했지만 이미 관계에 금이 갔다.\n감정이 나를 지배했다.' }, good: { label: '감정 다루기', story: '"지금 화가 많이 나네." 알아차리고\n심호흡 5번. 잠시 자리를 벗어났다.\n진정되고 나서 차분하게 이야기했다.' }},
      { type: 'ox', statement: '화가 나면 바로 표현하는 게 건강하다.', answer: false, feedback: '즉각 폭발하는 건 위험해!\n알아차리고 진정한 후 표현하는 게 건강해.' },
      { type: 'multipleChoice', question: '감정 다루기의 올바른 순서는?', options: ['참기 → 폭발', '알아차리기 → 받아들이기 → 흘려보내기', '무시 → 잊기', '화내기 → 사과'], correctIndex: 1, explanation: '인식 → 수용 → 흘려보내기!\n이 3단계가 감정 관리의 기본이야.' },
      { type: 'feedback', summary: '감정 = 파도, 알아차리고 흘려보내기', message: '감정에 올라타는 서퍼가 되자!' },
      { type: 'mission', mission: '오늘 강한 감정이 올 때\n"알아차리기 → 심호흡 3번" 해보기', encouragement: '심호흡 3번이면 파도를 넘을 수 있어!' },
    ],
  },

  'mental-bronze-4': {
    id: 'mental-bronze-4', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 4,
    title: '실패를 대하는 자세',
    cards: [
      { type: 'concept', title: '실패 = 배움의 기회', description: '모든 성공한 사람은\n수많은 실패를 경험했어.\n\n에디슨: 전구 발명까지 10,000번 실패\n마이클 조던: 9,000번 이상 슛 실패\n\n실패는 끝이 아니라\n"아직 방법을 못 찾은 것".\n실패에서 배우는 사람이 결국 이겨!' },
      { type: 'summary', keywords: [
        { icon: '📚', label: '배움', description: '실패에서 교훈 찾기' },
        { icon: '🔄', label: '과정', description: '실패는 성공의 과정' },
        { icon: '💡', label: '아직', description: '"못한 게 아니라 아직인 것"' },
        { icon: '🏆', label: '성장', description: '실패가 성장의 원료' },
      ]},
      { type: 'example', bad: { label: '실패 = 끝', story: '발표에서 실수했다.\n"나는 발표를 못해. 다시는 안 해."\n기회를 스스로 닫아버렸다.' }, good: { label: '실패 = 배움', story: '발표에서 실수했다.\n"긴장 때문이었구나. 다음엔 연습을 더 하자."\n다음 발표에서 훨씬 잘했다.' }},
      { type: 'ox', statement: '실패하지 않는 것이 가장 좋다.', answer: false, feedback: '실패 없이 성장할 수 없어!\n실패를 피하면 도전도 사라져.' },
      { type: 'multipleChoice', question: '실패 후 가장 좋은 반응은?', options: ['"나는 안 돼" 포기하기', '"다시는 안 해" 회피하기', '"뭘 배웠지?" 교훈 찾기', '"남 탓이야" 전가하기'], correctIndex: 2, explanation: '"뭘 배웠지?"가 마법의 질문!\n실패를 성장으로 바꿔줘.' },
      { type: 'feedback', summary: '실패 = 끝이 아닌 배움의 기회', message: '"뭘 배웠지?" 이 질문이 멘탈을 키워!' },
      { type: 'mission', mission: '최근 실패 경험에서 "배운 것" 1가지 적기', encouragement: '배운 게 있다면 실패가 아니야!' },
    ],
  },

  'mental-bronze-5': {
    id: 'mental-bronze-5', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 5,
    title: '성장 마인드셋',
    cards: [
      { type: 'concept', title: '고정 vs 성장 마인드셋', description: '고정 마인드셋:\n"나는 원래 수학을 못해" → 포기\n\n성장 마인드셋:\n"아직 못하지만 노력하면 나아질 수 있어" → 도전\n\n"아직"이라는 단어 하나가\n인생을 바꿔!\n능력은 고정이 아니라 성장해.' },
      { type: 'summary', keywords: [
        { icon: '🧱', label: '고정', description: '"못해" = 능력은 변하지 않는다' },
        { icon: '🌱', label: '성장', description: '"아직" = 노력하면 나아진다' },
        { icon: '✨', label: '"아직"의 힘', description: '"못해"를 "아직"으로 바꾸기' },
        { icon: '🧠', label: '뇌 가소성', description: '뇌는 평생 변화할 수 있다' },
      ]},
      { type: 'example', bad: { label: '고정 마인드셋', story: '"나는 원래 영어를 못해."\n노력해봤자 안 될 거라고 생각했다.\n시도조차 하지 않았다.' }, good: { label: '성장 마인드셋', story: '"영어를 아직 잘 못하지만\n매일 단어 10개씩 하면 나아질 거야."\n3개월 뒤 확실히 실력이 올랐다.' }},
      { type: 'ox', statement: '머리가 좋은 사람만 공부를 잘한다.', answer: false, feedback: '노력과 전략이 더 중요해!\n뇌는 훈련할수록 성장하는 기관이야.' },
      { type: 'multipleChoice', question: '성장 마인드셋의 핵심 단어는?', options: ['"안 돼"', '"원래"', '"아직"', '"못해"'], correctIndex: 2, explanation: '"아직!" 이 한 단어가\n포기를 도전으로 바꿔줘!' },
      { type: 'feedback', summary: '성장 마인드셋 = "못해"를 "아직"으로', message: '"아직"을 입에 달고 다니자!' },
      { type: 'mission', mission: '"나는 OO을 못해"를\n"나는 OO을 아직 못해"로 바꿔 적기', encouragement: '"아직" 하나가 가능성을 열어!' },
    ],
  },

  'mental-bronze-6': {
    id: 'mental-bronze-6', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 6,
    title: '부정적 생각 다루기',
    cards: [
      { type: 'concept', title: '생각이 감정을 만든다', description: '같은 상황도 생각에 따라 달라져.\n\n시험 60점 →\nA: "나는 바보야" → 우울\nB: "다음엔 더 잘하면 돼" → 동기부여\n\n상황이 아니라 "생각"이 감정을 만들어.\n부정적 생각을 알아차리고\n바꾸는 연습이 멘탈의 핵심이야.' },
      { type: 'summary', keywords: [
        { icon: '💭', label: '생각', description: '상황에 대한 해석' },
        { icon: '❤️', label: '감정', description: '생각이 감정을 결정' },
        { icon: '🔄', label: '리프레이밍', description: '생각의 틀을 바꾸기' },
        { icon: '⚖️', label: '균형', description: '긍정도 부정도 아닌 현실적 생각' },
      ]},
      { type: 'example', bad: { label: '부정적 해석', story: '발표에서 한 번 더듬었다.\n"완전 망했어. 다들 비웃었을 거야."\n하루 종일 우울했다.' }, good: { label: '현실적 해석', story: '발표에서 한 번 더듬었다.\n"한 번 실수했지만 전체적으로 괜찮았어.\n다들 내용에 집중했을 거야."\n마음이 한결 편해졌다.' }},
      { type: 'ox', statement: '항상 긍정적으로 생각해야 멘탈이 강하다.', answer: false, feedback: '무조건 긍정은 현실을 무시하는 거야!\n"현실적이고 균형 잡힌 생각"이 핵심.' },
      { type: 'multipleChoice', question: '부정적 생각을 다루는 가장 좋은 방법은?', options: ['무시하기', '무조건 긍정적으로 바꾸기', '현실적이고 균형 잡힌 생각으로 바꾸기', '부정적 생각을 참기'], correctIndex: 2, explanation: '극단적 부정을 균형 잡힌 현실로!\n이게 진짜 멘탈 관리야.' },
      { type: 'feedback', summary: '생각 바꾸기 = 부정 → 현실적·균형 잡힌 생각', message: '생각을 바꾸면 감정이 바뀌어!' },
      { type: 'mission', mission: '최근 부정적 생각 1개를\n현실적이고 균형 잡힌 생각으로 바꿔보기', encouragement: '생각의 틀을 바꾸는 연습이 힘이 돼!' },
    ],
  },

  'mental-bronze-7': {
    id: 'mental-bronze-7', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 7,
    title: '비교의 함정 벗어나기',
    cards: [
      { type: 'concept', title: '남과 비교하면 멘탈이 무너진다', description: 'SNS에서 남의 화려한 모습만 보면\n"나는 왜 이럴까" 자괴감이 들어.\n\n하지만 비교는 불공평한 게임이야.\n남의 "하이라이트"와 내 "일상"을 비교하니까.\n\n비교 대상은 "어제의 나".\n어제보다 오늘 조금이라도 나아졌으면\n그게 진짜 성장이야!' },
      { type: 'summary', keywords: [
        { icon: '📱', label: 'SNS 함정', description: '남의 하이라이트만 보게 됨' },
        { icon: '⚖️', label: '불공평', description: '남의 최고 vs 내 일상' },
        { icon: '🪞', label: '어제의 나', description: '비교는 과거의 나와만' },
        { icon: '📈', label: '나의 성장', description: '조금이라도 나아졌으면 성공' },
      ]},
      { type: 'example', bad: { label: '남과 비교', story: '인스타에서 친구의 상장 사진을 봤다.\n"쟤는 잘하는데 나는 뭐지..."\n자존감이 바닥, 아무것도 하기 싫었다.' }, good: { label: '나와 비교', story: '"한 달 전의 나보다 영어 단어 200개 더 알아."\n남이 아닌 나의 성장에 집중하니\n뿌듯하고 동기부여가 됐다.' }},
      { type: 'ox', statement: '남과 비교하면 동기부여가 된다.', answer: false, feedback: '대부분 자괴감만 커져!\n"어제의 나"와 비교하는 게 건강한 동기부여야.' },
      { type: 'multipleChoice', question: '건강한 비교 대상은?', options: ['친구', '연예인', 'SNS 인플루언서', '어제의 나'], correctIndex: 3, explanation: '어제의 나보다 나아졌으면\n그게 진짜 성장!' },
      { type: 'feedback', summary: '비교 대상 = 남이 아닌 어제의 나', message: '나만의 속도로 성장하면 돼!' },
      { type: 'mission', mission: '한 달 전 나보다 나아진 점 1가지 찾기', encouragement: '분명 성장한 부분이 있을 거야!' },
    ],
  },

  'mental-bronze-8': {
    id: 'mental-bronze-8', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 8,
    title: '멘탈 회복 도구 상자',
    cards: [
      { type: 'concept', title: '멘탈이 흔들릴 때 쓰는 도구들', description: '멘탈이 무너질 때를 위해\n미리 "회복 도구"를 준비해두자.\n\n1. 심호흡: 4초 들이쉬고 4초 내쉬기\n2. 몸 움직이기: 산책, 스트레칭\n3. 대화: 신뢰하는 사람에게 말하기\n4. 글쓰기: 감정을 글로 쏟아내기\n5. 자연: 바깥 공기 쐬기\n\n위기 전에 미리 알아둬야 해!' },
      { type: 'summary', keywords: [
        { icon: '🫁', label: '심호흡', description: '4초 흡 → 4초 호, 즉각 진정' },
        { icon: '🚶', label: '몸 움직이기', description: '산책, 스트레칭으로 전환' },
        { icon: '🗣️', label: '대화', description: '신뢰하는 사람에게 말하기' },
        { icon: '📝', label: '글쓰기', description: '감정을 글로 쏟아내기' },
      ]},
      { type: 'example', bad: { label: '도구 없이 무너짐', story: '시험 결과가 나빴다.\n뭘 해야 할지 모르고\n방에 틀어박혀 며칠간 우울했다.' }, good: { label: '도구 활용', story: '시험 결과가 나빴다.\n심호흡 5번 → 밖에 나가 산책 20분 →\n친구에게 전화로 이야기.\n1시간 만에 마음이 정리됐다.' }},
      { type: 'ox', statement: '멘탈이 강한 사람은 회복 도구가 필요 없다.', answer: false, feedback: '강한 사람일수록 도구를 잘 활용해!\n도구를 아는 것이 강함이야.' },
      { type: 'multipleChoice', question: '멘탈이 흔들릴 때 가장 먼저 할 일은?', options: ['SNS 보기', '심호흡으로 몸부터 진정시키기', '혼자 참기', '게임으로 잊기'], correctIndex: 1, explanation: '심호흡이 가장 빠른 진정법!\n몸이 진정되면 마음도 따라와.' },
      { type: 'feedback', summary: '멘탈 도구 = 심호흡 + 운동 + 대화 + 글쓰기', message: '도구를 미리 알아두면 위기에 쓸 수 있어!' },
      { type: 'mission', mission: '나만의 멘탈 회복 도구 Top 3 정하기', encouragement: '미리 준비하면 위기에 강해져!' },
    ],
  },

  'mental-bronze-9': {
    id: 'mental-bronze-9', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 9,
    title: '도움 요청하는 용기',
    cards: [
      { type: 'concept', title: '혼자 감당하지 않아도 돼', description: '멘탈이 힘들 때\n"혼자 해결해야 해"라고 생각하면 더 힘들어.\n\n도움을 요청하는 건\n약한 게 아니라 용기 있는 거야.\n\n가족, 친구, 선생님, 상담사...\n내 편이 되어줄 사람이 있어.\n혼자 버티지 마!' },
      { type: 'summary', keywords: [
        { icon: '🙋', label: '도움 요청', description: '약함이 아닌 용기' },
        { icon: '👨‍👩‍👧', label: '가족', description: '가장 가까운 지지자' },
        { icon: '🤝', label: '친구', description: '같이 고민을 나눌 동료' },
        { icon: '🧑‍⚕️', label: '전문가', description: '상담사, 선생님도 도움' },
      ]},
      { type: 'example', bad: { label: '혼자 버티기', story: '계속 우울하고 힘들었지만\n"남에게 짐이 되고 싶지 않아."\n혼자 버티다가 더 심해졌다.' }, good: { label: '도움 요청', story: '"요즘 좀 힘들어." 친구에게 말했다.\n친구: "이야기해줘서 고마워. 나 있잖아."\n이야기만 했는데 마음이 훨씬 가벼워졌다.' }},
      { type: 'ox', statement: '도움을 요청하는 것은 약한 사람이 하는 것이다.', answer: false, feedback: '오히려 용기 있는 행동이야!\n강한 사람도 도움을 받아.' },
      { type: 'multipleChoice', question: '멘탈이 힘들 때 가장 좋은 행동은?', options: ['혼자 해결하려 참기', '폰으로 주의 돌리기', '신뢰하는 사람에게 이야기하기', '아무렇지 않은 척하기'], correctIndex: 2, explanation: '이야기하는 것만으로도 마음이 가벼워져!\n혼자 감당하지 않아도 돼.' },
      { type: 'feedback', summary: '도움 요청 = 약함이 아닌 용기', message: '혼자 버티지 마. 네 편이 있어!' },
      { type: 'mission', mission: '"힘들 때 이야기할 수 있는 사람" 3명 적기', encouragement: '목록이 있으면 힘들 때 바로 연락할 수 있어!' },
    ],
  },

  'mental-bronze-10': {
    id: 'mental-bronze-10', chapterKey: 'mental', tierKey: 'bronze', stageNumber: 10,
    title: '나만의 멘탈 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n나만의 멘탈 관리 루틴을 만들자!\n\n1. 감정 알아차리기 (매일)\n2. 심호흡으로 진정하기 (즉시)\n3. 부정적 생각 → 현실적 생각으로 바꾸기\n4. "아직"의 힘 활용하기\n5. 어제의 나와만 비교하기\n6. 힘들면 도움 요청하기' },
      { type: 'summary', keywords: [
        { icon: '👁️', label: '알아차림', description: '감정과 생각 인식하기' },
        { icon: '🫁', label: '심호흡', description: '즉각적 진정 도구' },
        { icon: '🌱', label: '성장 마인드', description: '"아직"으로 관점 바꾸기' },
        { icon: '🙋', label: '도움 요청', description: '혼자 버티지 않기' },
      ]},
      { type: 'example', bad: { label: '멘탈 방치', story: '멘탈 관리가 중요한 건 알겠는데\n실천은 안 했다.\n힘들 때마다 무방비로 무너졌다.' }, good: { label: '멘탈 루틴', story: '매일 아침: 감정 체크\n힘들 때: 심호흡 → 생각 바꾸기 → 산책\n정말 힘들면: 친구에게 전화.\n체계가 있으니 흔들려도 금방 회복했다.' }},
      { type: 'ox', statement: '멘탈 관리는 힘들 때만 하면 된다.', answer: false, feedback: '평소에 꾸준히 관리해야 해!\n비 오기 전에 우산을 준비하는 것처럼.' },
      { type: 'multipleChoice', question: '멘탈 루틴에서 가장 중요한 것은?', options: ['완벽하게 하기', '매일 조금씩 꾸준히', '힘들 때만 하기', '남에게 보여주기'], correctIndex: 1, explanation: '매일 조금씩이 핵심!\n꾸준한 관리가 강한 멘탈을 만들어.' },
      { type: 'apply', question: '나만의 멘탈 관리 루틴을 설계해보세요.\n(평소 / 힘들 때 / 위기 시)', placeholder: '예: 평소-감정 체크 / 힘들 때-심호흡+산책 / 위기-친구에게 연락' },
      { type: 'feedback', summary: '멘탈 루틴 = 알아차림 + 도구 + 성장 마인드 + 도움', message: '브론즈 완료! 이제 멘탈의 기본기를 갖췄어!' },
      { type: 'mission', mission: '오늘부터 아침에 감정 1줄 체크 시작하기!', encouragement: '멘탈은 근육이야. 매일 키우자!' },
    ],
  },

}
