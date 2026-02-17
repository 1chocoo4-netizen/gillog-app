// 감사와 겸손 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const GRATITUDE_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (감사와 겸손 기초) 1~10
  // ═══════════════════════════════════════

  'gratitude-bronze-1': {
    id: 'gratitude-bronze-1', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 1,
    title: '감사란 무엇인가',
    cards: [
      { type: 'concept', title: '감사 = 있는 것을 알아차리기', description: '감사란 "없는 것"에 집중하는 대신\n"있는 것"을 알아차리는 거야.\n\n건강, 가족, 친구, 밥 한 끼...\n당연한 것은 하나도 없어.\n\n감사하는 사람이 더 행복하고\n더 건강하다는 연구 결과가 많아!' },
      { type: 'summary', keywords: [
        { icon: '🙏', label: '감사', description: '있는 것을 알아차리는 마음' },
        { icon: '😊', label: '행복 UP', description: '감사하면 행복감이 올라감' },
        { icon: '💪', label: '건강', description: '감사하는 사람이 더 건강' },
        { icon: '👁️', label: '알아차림', description: '당연한 것은 없다' },
      ]},
      { type: 'example', bad: { label: '불만 중심', story: '"왜 나만 이래? 폰도 구형이고\n방도 좁고 용돈도 적어."\n가진 것은 안 보이고 없는 것만 보였다.' }, good: { label: '감사 중심', story: '"오늘도 밥 먹을 수 있어서 감사.\n친구가 있어서 감사. 건강해서 감사."\n같은 하루인데 기분이 완전히 달랐다.' }},
      { type: 'ox', statement: '감사할 일이 있어야 감사할 수 있다.', answer: false, feedback: '특별한 일이 아니어도 감사할 수 있어!\n숨 쉬는 것, 물 마시는 것도 감사야.' },
      { type: 'multipleChoice', question: '감사의 핵심은?', options: ['큰 선물을 받았을 때 고맙다고 말하기', '없는 것 대신 있는 것을 알아차리기', '남에게 잘 보이려고 하는 것', '좋은 일이 생겨야 느끼는 것'], correctIndex: 1, explanation: '핵심은 "있는 것을 알아차리기"!\n작은 것에서도 감사를 발견할 수 있어.' },
      { type: 'feedback', summary: '감사 = 있는 것을 알아차리는 힘', message: '감사는 행복의 가장 빠른 길이야!' },
      { type: 'mission', mission: '오늘 감사한 것 3가지 적어보기', encouragement: '작은 것이라도 괜찮아. 적어보자!' },
    ],
  },

  'gratitude-bronze-2': {
    id: 'gratitude-bronze-2', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 2,
    title: '감사의 과학적 효과',
    cards: [
      { type: 'concept', title: '감사하면 뇌가 바뀐다', description: '감사는 단순한 예의가 아니야.\n과학적으로 증명된 효과들:\n\n1. 행복 호르몬(도파민, 세로토닌) 분비\n2. 스트레스 호르몬 감소\n3. 수면의 질 향상\n4. 대인관계 개선\n\n감사 일기 3주면 뇌가 달라져!' },
      { type: 'summary', keywords: [
        { icon: '🧠', label: '뇌 변화', description: '감사하면 뇌 구조가 바뀜' },
        { icon: '😄', label: '행복 호르몬', description: '도파민, 세로토닌 분비' },
        { icon: '😴', label: '수면 개선', description: '잠들기 전 감사 → 숙면' },
        { icon: '📉', label: '스트레스↓', description: '코르티솔(스트레스 호르몬) 감소' },
      ]},
      { type: 'example', bad: { label: '부정적 사고 습관', story: '매일 밤 걱정과 불만으로 잠들었다.\n수면 부족, 짜증, 성적 하락.\n악순환이 계속됐다.' }, good: { label: '감사 일기 효과', story: '매일 밤 감사한 것 3가지 적었다.\n3주 뒤 잠이 잘 오고\n아침 기분이 확 달라졌다.' }},
      { type: 'ox', statement: '감사는 기분 문제일 뿐 과학과 관계없다.', answer: false, feedback: '뇌과학으로 증명된 사실이야!\n감사하면 뇌에서 실제로 화학 변화가 일어나.' },
      { type: 'multipleChoice', question: '감사가 가져오는 과학적 효과가 아닌 것은?', options: ['행복 호르몬 분비', '스트레스 감소', '키가 커진다', '수면의 질 향상'], correctIndex: 2, explanation: '감사는 행복·스트레스·수면에 효과적!\n하지만 키와는 관계없어.' },
      { type: 'feedback', summary: '감사 = 뇌를 바꾸는 과학적 도구', message: '감사 일기 3주, 뇌가 달라지는 걸 느껴봐!' },
      { type: 'mission', mission: '오늘 밤 자기 전 감사한 것 3가지 적고 자기', encouragement: '3주만 해보면 효과를 직접 느낄 거야!' },
    ],
  },

  'gratitude-bronze-3': {
    id: 'gratitude-bronze-3', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 3,
    title: '당연한 것은 없다',
    cards: [
      { type: 'concept', title: '당연함의 함정', description: '건강, 가족, 친구, 학교...\n"당연하다"고 느끼는 순간\n소중함을 잊어버려.\n\n하지만 이 모든 것이\n사라질 수도 있다고 상상해봐.\n\n당연한 것이 얼마나 소중한지\n비로소 보이기 시작해!' },
      { type: 'summary', keywords: [
        { icon: '⚠️', label: '당연함 함정', description: '당연하다고 느끼면 감사 사라짐' },
        { icon: '💎', label: '소중함', description: '잃어봐야 아는 가치' },
        { icon: '👀', label: '새로운 눈', description: '처음 보는 것처럼 보기' },
        { icon: '🙏', label: '일상 감사', description: '작은 것에서 감사 찾기' },
      ]},
      { type: 'example', bad: { label: '당연함에 갇힘', story: '"밥 차려주는 거 당연하지."\n"건강한 거 원래 그런 거지."\n감사할 줄 모르니 불만만 늘었다.' }, good: { label: '당연함 깨기', story: '"만약 내일 걸을 수 없다면?"\n생각만으로도 지금 걸을 수 있는 게\n얼마나 감사한지 느껴졌다.' }},
      { type: 'ox', statement: '건강한 것은 당연한 것이다.', answer: false, feedback: '건강은 당연하지 않아!\n다치거나 아파본 사람은 다 알지.\n지금 건강한 것 자체가 감사할 일이야.' },
      { type: 'multipleChoice', question: '"당연함의 함정"을 깨는 가장 좋은 방법은?', options: ['"없다면?" 상상해보기', '남과 비교하기', '더 많이 갖기', '불평하기'], correctIndex: 0, explanation: '"없다면?"을 상상하면\n지금 가진 것의 소중함이 확 보여!' },
      { type: 'feedback', summary: '당연한 것은 없다 = 소중함을 알아차리기', message: '지금 이 순간이 가장 소중해!' },
      { type: 'mission', mission: '"당연하다고 생각했지만 사실 감사한 것" 5가지 적기', encouragement: '적는 순간, 세상이 달라 보일 거야!' },
    ],
  },

  'gratitude-bronze-4': {
    id: 'gratitude-bronze-4', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 4,
    title: '감사 일기 쓰기',
    cards: [
      { type: 'concept', title: '하루 5분, 인생이 달라진다', description: '감사 일기는 가장 쉽고\n가장 강력한 감사 훈련이야.\n\n방법: 매일 밤 자기 전\n감사한 것 3가지 적기.\n\n"뭐가 있을까?" 찾는 과정 자체가\n뇌를 감사 모드로 바꿔줘!' },
      { type: 'summary', keywords: [
        { icon: '📝', label: '감사 일기', description: '매일 감사 3가지 적기' },
        { icon: '🌙', label: '취침 전', description: '자기 전 5분이 최적' },
        { icon: '🔍', label: '찾는 과정', description: '찾는 것 자체가 훈련' },
        { icon: '🔄', label: '21일', description: '3주면 습관이 된다' },
      ]},
      { type: 'example', bad: { label: '걱정으로 잠들기', story: '매일 밤 내일 걱정, 오늘 후회.\n뒤척이다 늦게 잠들고\n아침에 피곤하게 일어났다.' }, good: { label: '감사 일기', story: '"1. 친구가 웃겨줘서 감사\n2. 점심이 맛있어서 감사\n3. 건강해서 감사"\n적고 나니 마음이 편안해서 바로 잠들었다.' }},
      { type: 'ox', statement: '감사 일기는 대단한 일만 써야 한다.', answer: false, feedback: '"날씨가 좋았다" 같은 작은 것도 OK!\n작은 감사가 쌓여서 큰 변화를 만들어.' },
      { type: 'multipleChoice', question: '감사 일기의 효과를 높이는 방법은?', options: ['일주일에 한 번 몰아서 쓰기', '매일 밤 구체적으로 3가지 적기', '큰 일만 골라서 쓰기', '남에게 보여주기 위해 쓰기'], correctIndex: 1, explanation: '매일 + 구체적이 핵심!\n"친구가 웃겨줘서" 처럼 구체적일수록 효과적.' },
      { type: 'feedback', summary: '감사 일기 = 매일 밤 3가지, 구체적으로', message: '오늘 밤부터 시작해보자!' },
      { type: 'mission', mission: '감사 일기 노트나 메모장을 정하고\n오늘 밤 첫 감사 3가지 적기', encouragement: '첫 번째 기록이 21일의 시작!' },
    ],
  },

  'gratitude-bronze-5': {
    id: 'gratitude-bronze-5', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 5,
    title: '감사 표현하기',
    cards: [
      { type: 'concept', title: '느끼는 것과 표현하는 것은 다르다', description: '마음속으로만 감사하면\n상대방은 모르고 나도 금방 잊어.\n\n"고마워", "감사합니다" 한마디가\n관계를 완전히 바꿔놓아.\n\n감사를 표현하면\n나도 행복하고 상대도 행복해!' },
      { type: 'summary', keywords: [
        { icon: '💬', label: '말로 표현', description: '"고마워" 직접 말하기' },
        { icon: '✉️', label: '글로 표현', description: '감사 메시지, 편지' },
        { icon: '🤝', label: '관계 강화', description: '표현하면 관계가 좋아짐' },
        { icon: '😊', label: '양방향 행복', description: '주는 사람도 받는 사람도 행복' },
      ]},
      { type: 'example', bad: { label: '표현 없는 감사', story: '엄마가 매일 도시락을 싸줬다.\n고맙긴 한데 한 번도 말 안 했다.\n엄마는 "싫은가 보다" 생각했다.' }, good: { label: '감사 표현', story: '"엄마, 도시락 맛있었어. 고마워!"\n한마디에 엄마 표정이 환해졌다.\n다음 날 더 맛있는 도시락이 왔다.' }},
      { type: 'ox', statement: '감사한 마음만 있으면 굳이 말 안 해도 된다.', answer: false, feedback: '표현해야 전달돼!\n말 안 하면 상대방은 모르는 거야.' },
      { type: 'multipleChoice', question: '감사 표현의 가장 큰 효과는?', options: ['예의 바른 사람처럼 보임', '나와 상대 모두 행복해짐', '빚진 느낌이 생김', '형식적인 인사가 됨'], correctIndex: 1, explanation: '감사 표현은 양방향 행복!\n주는 사람도 받는 사람도 기분이 좋아져.' },
      { type: 'feedback', summary: '감사 표현 = 느끼는 것 + 말로 전달하기', message: '오늘 한 명에게 "고마워" 해보자!' },
      { type: 'mission', mission: '오늘 감사한 사람 1명에게\n직접 "고마워"라고 말하기', encouragement: '한마디가 관계를 바꿀 수 있어!' },
    ],
  },

  'gratitude-bronze-6': {
    id: 'gratitude-bronze-6', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 6,
    title: '겸손이란 무엇인가',
    cards: [
      { type: 'concept', title: '겸손 = 나를 정확히 아는 것', description: '겸손은 자기를 낮추는 게 아니야.\n\n겸손 = 나의 강점도 약점도\n있는 그대로 인정하는 것.\n\n"나는 완벽하지 않아.\n하지만 성장할 수 있어."\n이게 진짜 겸손이야!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 인식', description: '있는 그대로 나를 보기' },
        { icon: '📈', label: '성장 마인드', description: '부족함을 성장 기회로' },
        { icon: '👂', label: '열린 태도', description: '다른 의견도 받아들이기' },
        { icon: '⚖️', label: '균형', description: '자신감과 겸손의 균형' },
      ]},
      { type: 'example', bad: { label: '거짓 겸손', story: '"아, 나 이런 거 못해..."\n속으로는 잘한다고 생각하면서\n겉으로만 낮추는 척. 진심이 아니었다.' }, good: { label: '진짜 겸손', story: '"수학은 잘하지만 영어는 부족해.\n영어를 더 노력해야겠다."\n솔직하게 인정하고 개선점을 찾았다.' }},
      { type: 'ox', statement: '겸손한 사람은 자기가 잘하는 것도 숨겨야 한다.', answer: false, feedback: '강점을 숨기는 건 겸손이 아니야!\n강점도 약점도 솔직히 아는 게 진짜 겸손.' },
      { type: 'multipleChoice', question: '진짜 겸손의 의미는?', options: ['항상 자기를 낮추기', '나의 강점과 약점을 있는 그대로 인정하기', '남의 말에 무조건 동의하기', '칭찬을 거부하기'], correctIndex: 1, explanation: '겸손 = 자기를 정확히 아는 것!\n낮추는 게 아니라 솔직한 거야.' },
      { type: 'feedback', summary: '겸손 = 나를 있는 그대로 인정하기', message: '솔직한 자기 인식이 겸손의 시작!' },
      { type: 'mission', mission: '나의 강점 2가지 + 부족한 점 2가지 솔직하게 적기', encouragement: '솔직함이 진짜 겸손이야!' },
    ],
  },

  'gratitude-bronze-7': {
    id: 'gratitude-bronze-7', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 7,
    title: '배움의 자세 - 모른다고 말하기',
    cards: [
      { type: 'concept', title: '"몰라요"가 성장의 시작', description: '아는 척하면 배울 수 없어.\n\n"몰라요"라고 말할 수 있는 용기 =\n배움의 문을 여는 열쇠.\n\n겸손한 사람은 질문을 두려워하지 않아.\n모르는 걸 인정해야 알 수 있거든!' },
      { type: 'summary', keywords: [
        { icon: '❓', label: '질문하기', description: '모르면 물어보는 용기' },
        { icon: '📖', label: '배움', description: '인정해야 배울 수 있다' },
        { icon: '🚫', label: '아는 척 X', description: '아는 척은 성장을 막음' },
        { icon: '🌱', label: '성장', description: '모름 인정 → 배움 → 성장' },
      ]},
      { type: 'example', bad: { label: '아는 척', story: '수업 중 이해 안 됐지만\n"다 아는데" 하며 질문 안 했다.\n시험에서 그 부분이 나와 틀렸다.' }, good: { label: '모름 인정', story: '"선생님, 이 부분 모르겠어요!"\n질문했더니 친절하게 설명해줬다.\n확실히 이해하고 시험에서 맞혔다.' }},
      { type: 'ox', statement: '모른다고 말하면 바보처럼 보인다.', answer: false, feedback: '오히려 존경받아!\n진짜 용기 있는 사람이 질문하는 거야.' },
      { type: 'multipleChoice', question: '"모른다"고 말하는 것이 중요한 이유는?', options: ['남에게 좋은 인상을 주려고', '인정해야 배울 수 있으니까', '선생님이 좋아하니까', '시간을 아끼려고'], correctIndex: 1, explanation: '모르는 걸 인정하는 순간\n배움이 시작돼!' },
      { type: 'feedback', summary: '"몰라요" = 배움의 문을 여는 열쇠', message: '질문하는 사람이 가장 빨리 성장해!' },
      { type: 'mission', mission: '오늘 모르는 것 하나를 질문해보기\n(수업, 대화, 검색 어디서든)', encouragement: '용기 있는 질문이 성장의 시작!' },
    ],
  },

  'gratitude-bronze-8': {
    id: 'gratitude-bronze-8', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 8,
    title: '비교 대신 감사하기',
    cards: [
      { type: 'concept', title: '비교는 행복의 도둑', description: '"쟤는 더 잘하는데..."\n"쟤는 더 가진 게 많은데..."\n\n비교하면 끝이 없어.\n위를 보면 항상 부족하게 느껴지거든.\n\n비교 대신 "내가 가진 것"에\n집중하면 행복이 찾아와!' },
      { type: 'summary', keywords: [
        { icon: '⚖️', label: '비교 함정', description: '비교하면 끝이 없다' },
        { icon: '📱', label: 'SNS 주의', description: 'SNS는 비교를 부추김' },
        { icon: '🙏', label: '감사로 전환', description: '비교 대신 감사에 집중' },
        { icon: '🌟', label: '나만의 길', description: '남이 아닌 어제의 나와 비교' },
      ]},
      { type: 'example', bad: { label: 'SNS 비교', story: '인스타에서 친구의 여행 사진을 봤다.\n"나는 왜 못 가지?"\n하루 종일 우울했다.' }, good: { label: '감사로 전환', story: '"부럽긴 하지만, 나도 좋은 것이 있지.\n오늘 가족과 맛있는 저녁을 먹었잖아."\n비교 대신 감사하니 마음이 편해졌다.' }},
      { type: 'ox', statement: 'SNS를 보면 다른 사람의 실제 삶을 알 수 있다.', answer: false, feedback: 'SNS는 가장 좋은 순간만 올려!\n그걸로 비교하면 불공평한 거야.' },
      { type: 'multipleChoice', question: '비교의 함정에서 벗어나는 방법은?', options: ['더 잘하려고 노력만 하기', '남이 아닌 어제의 나와 비교하기', 'SNS를 더 많이 보기', '남들을 무시하기'], correctIndex: 1, explanation: '어제의 나보다 오늘의 내가 나아졌으면\n그게 진짜 성장이야!' },
      { type: 'feedback', summary: '비교 대신 감사 = 행복의 비결', message: '남과 비교 말고, 가진 것에 감사하자!' },
      { type: 'mission', mission: '비교하고 싶은 마음이 들 때\n"대신 감사한 것 1가지" 떠올려보기', encouragement: '감사가 비교를 이길 수 있어!' },
    ],
  },

  'gratitude-bronze-9': {
    id: 'gratitude-bronze-9', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 9,
    title: '실패에서 감사 찾기',
    cards: [
      { type: 'concept', title: '실패도 감사의 대상이 될 수 있다', description: '실패하면 속상하지.\n하지만 실패 속에도 감사가 있어.\n\n"덕분에 뭘 배웠지?"\n"이 경험이 없었으면 몰랐을 것"\n\n실패를 통해 배운 것에 감사하면\n실패가 성장의 디딤돌이 돼!' },
      { type: 'summary', keywords: [
        { icon: '🔄', label: '관점 전환', description: '실패를 배움으로 보기' },
        { icon: '📚', label: '교훈', description: '실패에서 배운 것 찾기' },
        { icon: '💪', label: '회복력', description: '감사하면 빨리 회복' },
        { icon: '🌱', label: '성장 기회', description: '실패 = 성장의 씨앗' },
      ]},
      { type: 'example', bad: { label: '실패에 매몰', story: '시험에서 낮은 점수를 받았다.\n"나는 바보야. 다 틀렸어."\n자책만 하고 다음을 준비 안 했다.' }, good: { label: '실패에서 감사', story: '"이번에 약점을 알게 돼서 감사해.\n시험 전에 알았으면 고칠 수 없었을 거야."\n약점을 보완하고 다음 시험에서 성장했다.' }},
      { type: 'ox', statement: '실패에서 감사할 것은 하나도 없다.', answer: false, feedback: '실패 덕분에 배우고 성장할 수 있어!\n"덕분에 뭘 배웠지?" 이 질문이 핵심.' },
      { type: 'multipleChoice', question: '실패에서 감사를 찾는 핵심 질문은?', options: ['"누구 탓이지?"', '"왜 나만 이래?"', '"덕분에 뭘 배웠지?"', '"다음에도 실패하면?"'], correctIndex: 2, explanation: '"덕분에 배운 것"에 집중하면\n실패가 성장의 기회로 바뀌어!' },
      { type: 'feedback', summary: '실패 감사 = "덕분에 뭘 배웠지?"', message: '실패를 통해 더 강해질 수 있어!' },
      { type: 'mission', mission: '최근 실패나 아쉬운 경험에서\n"덕분에 배운 것" 1가지 적기', encouragement: '관점을 바꾸면 모든 게 감사해져!' },
    ],
  },

  'gratitude-bronze-10': {
    id: 'gratitude-bronze-10', chapterKey: 'gratitude', tierKey: 'bronze', stageNumber: 10,
    title: '감사와 겸손 루틴 만들기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n나만의 감사·겸손 루틴을 만들자!\n\n1. 아침: "당연하지 않은 것" 1가지 떠올리기\n2. 낮: 감사한 사람에게 표현하기\n3. 비교 대신 감사로 전환하기\n4. 밤: 감사 일기 3가지 적기\n5. 실패에서 배운 점 찾기' },
      { type: 'summary', keywords: [
        { icon: '🌅', label: '아침', description: '당연하지 않은 것 떠올리기' },
        { icon: '💬', label: '낮', description: '감사 표현하기' },
        { icon: '🌙', label: '밤', description: '감사 일기 3가지' },
        { icon: '🪞', label: '겸손', description: '있는 그대로 인정하기' },
      ]},
      { type: 'example', bad: { label: '배우고 안 하기', story: '감사가 중요한 건 알겠는데\n"나중에 해야지" 미루다가\n결국 아무것도 바뀌지 않았다.' }, good: { label: '루틴 실천', story: '아침: "건강해서 감사"\n점심: 친구에게 "고마워" 한마디\n밤: 감사 일기 3줄.\n한 달 뒤 확실히 더 행복해졌다.' }},
      { type: 'ox', statement: '감사와 겸손은 성격이라 바꿀 수 없다.', answer: false, feedback: '성격이 아니라 습관이야!\n매일 연습하면 누구나 키울 수 있어.' },
      { type: 'multipleChoice', question: '감사·겸손 루틴에서 가장 중요한 것은?', options: ['완벽하게 하기', '매일 조금씩 꾸준히', '한 번에 많이', '남에게 보여주기'], correctIndex: 1, explanation: '감사도 겸손도 매일 연습이 핵심!\n작은 실천이 큰 변화를 만들어.' },
      { type: 'apply', question: '나만의 감사·겸손 루틴을 설계해보세요.\n(아침 / 낮 / 밤 각각 할 것)', placeholder: '예: 아침-감사 1가지 떠올리기 / 낮-"고마워" 1번 / 밤-감사 일기 3줄' },
      { type: 'feedback', summary: '감사·겸손 루틴 = 매일 작은 감사 + 솔직한 자기인식', message: '브론즈 완료! 감사와 겸손의 여정이 시작됐어!' },
      { type: 'mission', mission: '오늘부터 감사 일기 3줄을 21일간 도전!', encouragement: '21일이면 뇌가 바뀌어. 시작해보자!' },
    ],
  },

}
