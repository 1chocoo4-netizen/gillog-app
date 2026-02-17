// 신뢰 챕터 학습 콘텐츠 (브론즈)
import type { Stage } from './lessonData'

export const TRUST_STAGES: Record<string, Stage> = {

  // ═══════════════════════════════════════
  // 브론즈 (신뢰 기초) 1~10
  // ═══════════════════════════════════════

  'trust-bronze-1': {
    id: 'trust-bronze-1', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 1,
    title: '신뢰란 무엇인가',
    cards: [
      { type: 'concept', title: '신뢰 = 믿고 의지할 수 있는 것', description: '신뢰란 "이 사람은 나를 속이지 않을 거야"\n"약속을 지킬 거야"라는 믿음이야.\n\n신뢰는 모든 관계의 기반이야.\n친구, 가족, 선생님 모든 관계가\n신뢰 위에 세워져 있어.\n\n신뢰가 없으면 관계도 무너져.' },
      { type: 'summary', keywords: [
        { icon: '🤝', label: '신뢰', description: '상대를 믿고 의지하는 마음' },
        { icon: '🏗️', label: '관계 기반', description: '모든 관계의 토대' },
        { icon: '⏳', label: '시간', description: '쌓는 데 오래, 무너지는 건 한순간' },
        { icon: '💎', label: '가치', description: '가장 소중한 자산' },
      ]},
      { type: 'example', bad: { label: '신뢰 없는 관계', story: '비밀을 말했는데 다른 친구에게 퍼졌다.\n"다시는 속마음을 말하지 말아야지."\n관계가 겉으로만 남았다.' }, good: { label: '신뢰 있는 관계', story: '힘든 이야기를 했는데 끝까지 지켜줬다.\n"이 친구에겐 뭐든 말할 수 있어."\n더 깊은 관계가 됐다.' }},
      { type: 'ox', statement: '신뢰는 한 번 만들면 영원히 유지된다.', answer: false, feedback: '신뢰는 계속 관리해야 해!\n한 번의 배신으로 무너질 수 있어.' },
      { type: 'multipleChoice', question: '신뢰의 핵심은?', options: ['항상 좋은 말만 하기', '약속을 지키고 솔직한 것', '선물을 많이 주기', '말을 잘하는 것'], correctIndex: 1, explanation: '약속을 지키고 솔직한 것!\n이게 신뢰의 가장 기본이야.' },
      { type: 'feedback', summary: '신뢰 = 약속과 솔직함 위에 세워지는 믿음', message: '신뢰는 관계에서 가장 소중한 자산!' },
      { type: 'mission', mission: '"내가 가장 신뢰하는 사람"과 "그 이유" 적어보기', encouragement: '이유를 알면 나도 그런 사람이 될 수 있어!' },
    ],
  },

  'trust-bronze-2': {
    id: 'trust-bronze-2', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 2,
    title: '약속 지키기',
    cards: [
      { type: 'concept', title: '작은 약속이 큰 신뢰를 만든다', description: '신뢰를 쌓는 가장 확실한 방법 =\n약속을 지키는 것.\n\n대단한 약속이 아니어도 돼.\n"내일 빌려줄게" "10시에 만나자"\n이런 작은 약속을 지키는 사람이\n큰 약속도 지킬 거라고 믿어지거든.' },
      { type: 'summary', keywords: [
        { icon: '📌', label: '작은 약속', description: '작은 것부터 꼭 지키기' },
        { icon: '⏰', label: '시간 약속', description: '지각은 신뢰를 깎는다' },
        { icon: '📈', label: '축적', description: '작은 약속이 쌓여 큰 신뢰' },
        { icon: '🚫', label: '못 지킬 약속 X', description: '할 수 없으면 약속 안 하기' },
      ]},
      { type: 'example', bad: { label: '약속 어기기', story: '"내일 꼭 돌려줄게!" → 까먹음.\n"다음엔 일찍 올게!" → 또 지각.\n친구: "쟤 말은 믿을 수 없어."' }, good: { label: '약속 지키기', story: '"10시에 만나자" → 9시 55분 도착.\n"내일 돌려줄게" → 다음 날 바로 돌려줌.\n친구: "쟤는 약속하면 무조건 지켜."' }},
      { type: 'ox', statement: '작은 약속은 지키지 않아도 괜찮다.', answer: false, feedback: '작은 약속을 안 지키면\n큰 약속도 안 지킬 사람으로 보여!' },
      { type: 'multipleChoice', question: '약속 신뢰를 쌓는 가장 좋은 방법은?', options: ['큰 약속만 지키기', '모든 약속을 다 하기', '할 수 있는 약속만 하고 반드시 지키기', '약속을 안 하기'], correctIndex: 2, explanation: '못 지킬 약속은 안 하는 게 낫고\n한 약속은 반드시 지키는 게 핵심!' },
      { type: 'feedback', summary: '약속 지키기 = 신뢰를 쌓는 가장 확실한 방법', message: '작은 약속부터 꼭 지키자!' },
      { type: 'mission', mission: '오늘 한 약속을 떠올리고 반드시 지키기\n(아무리 작아도 OK)', encouragement: '약속 하나가 신뢰의 벽돌 하나!' },
    ],
  },

  'trust-bronze-3': {
    id: 'trust-bronze-3', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 3,
    title: '솔직함의 힘',
    cards: [
      { type: 'concept', title: '거짓말은 신뢰를 무너뜨린다', description: '한 번의 거짓말이 발각되면\n이전의 모든 말도 의심받게 돼.\n\n솔직함 = 불편해도 진실을 말하는 것.\n\n"실수했어, 미안해"\n이 한마디가 거짓 변명보다\n100배 더 신뢰를 지켜줘.' },
      { type: 'summary', keywords: [
        { icon: '💎', label: '솔직함', description: '불편해도 진실을 말하기' },
        { icon: '🚫', label: '거짓말 X', description: '한 번이 모든 신뢰를 깨뜨림' },
        { icon: '🙏', label: '실수 인정', description: '"미안해"가 신뢰를 지킨다' },
        { icon: '🔗', label: '일관성', description: '말과 행동이 같은 것' },
      ]},
      { type: 'example', bad: { label: '거짓 변명', story: '숙제를 안 해놓고 "아파서 못 했어요."\n나중에 거짓말이 들통났다.\n선생님은 다음 말도 의심했다.' }, good: { label: '솔직한 인정', story: '"숙제를 까먹었어요. 죄송합니다.\n내일까지 꼭 해오겠습니다."\n선생님: "솔직하게 말해줘서 고마워."' }},
      { type: 'ox', statement: '상대를 위한 거짓말은 괜찮다.', answer: false, feedback: '선의의 거짓말도 들통나면 신뢰가 깨져!\n솔직하되 표현을 부드럽게 하는 게 나아.' },
      { type: 'multipleChoice', question: '실수했을 때 신뢰를 지키는 방법은?', options: ['변명으로 넘기기', '모르는 척하기', '솔직하게 인정하고 사과하기', '남의 탓으로 돌리기'], correctIndex: 2, explanation: '솔직한 인정이 오히려 신뢰를 높여!\n실수는 누구나 하지만, 인정은 용기가 필요해.' },
      { type: 'feedback', summary: '솔직함 = 불편해도 진실, 신뢰의 핵심', message: '솔직한 한마디가 관계를 지켜줘!' },
      { type: 'mission', mission: '오늘 작은 것이라도 솔직하게 말해보기\n(불편하더라도)', encouragement: '솔직할수록 마음이 편해져!' },
    ],
  },

  'trust-bronze-4': {
    id: 'trust-bronze-4', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 4,
    title: '비밀 지키기',
    cards: [
      { type: 'concept', title: '비밀을 지키는 사람이 신뢰를 얻는다', description: '친구가 비밀을 말해줬다는 건\n나를 믿는다는 뜻이야.\n\n그 비밀을 다른 사람에게 말하면?\n그 순간 신뢰가 완전히 무너져.\n\n"나만 알고 있을게"\n이 약속을 지키는 것이\n관계의 깊이를 결정해.' },
      { type: 'summary', keywords: [
        { icon: '🤫', label: '비밀 유지', description: '들은 이야기 다른 데 말 안 하기' },
        { icon: '🔒', label: '입 무거운 사람', description: '비밀을 지키는 사람' },
        { icon: '💔', label: '배신감', description: '비밀 누설 = 신뢰 파괴' },
        { icon: '🏰', label: '안전한 사람', description: '뭐든 말할 수 있는 존재' },
      ]},
      { type: 'example', bad: { label: '비밀 누설', story: '"다른 사람한테 말하지 마" 했는데\n"야, 이거 비밀인데 알려줄게~"\n결국 반 전체가 알게 됐다.\n친구는 두 번 다시 속마음을 열지 않았다.' }, good: { label: '비밀 지키기', story: '다른 친구가 "걔 무슨 일 있어?" 물었다.\n"잘 모르겠어." 말을 아꼈다.\n비밀을 말한 친구: "역시 너는 믿을 수 있어."' }},
      { type: 'ox', statement: '"비밀인데" 하며 한 명에게만 말하는 건 괜찮다.', answer: false, feedback: '한 명에게 말하면 열 명에게 퍼져!\n비밀은 나에서 끝나야 해.' },
      { type: 'multipleChoice', question: '친구의 비밀을 지키는 것이 중요한 이유는?', options: ['나중에 약점으로 쓸 수 있어서', '비밀을 맡긴 건 나를 믿는다는 뜻이니까', '몰라야 편하니까', '관심이 없어서'], correctIndex: 1, explanation: '비밀을 말해준 건 신뢰의 표현!\n그 신뢰를 지키는 게 진짜 친구야.' },
      { type: 'feedback', summary: '비밀 지키기 = 신뢰를 지키는 것', message: '입이 무거운 사람이 가장 신뢰받아!' },
      { type: 'mission', mission: '"나는 비밀을 잘 지키는 사람인가?" 돌아보기\n(최근 남의 이야기를 옮긴 적 없는지)', encouragement: '돌아보는 것이 더 나은 사람이 되는 길!' },
    ],
  },

  'trust-bronze-5': {
    id: 'trust-bronze-5', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 5,
    title: '일관성 - 말과 행동 일치',
    cards: [
      { type: 'concept', title: '말한 대로 행동하는 사람', description: '"공부 열심히 할 거야" 하면서\n게임만 하는 사람을 믿을 수 있을까?\n\n일관성 = 말과 행동이 같은 것.\n\n말만 하고 행동이 다르면\n아무리 좋은 말도 신뢰받지 못해.\n말보다 행동이 진짜 나를 보여줘.' },
      { type: 'summary', keywords: [
        { icon: '🔗', label: '일관성', description: '말과 행동이 같은 것' },
        { icon: '🗣️', label: '말', description: '약속, 계획, 의견' },
        { icon: '🏃', label: '행동', description: '실제로 하는 것' },
        { icon: '👀', label: '관찰', description: '사람들은 행동을 본다' },
      ]},
      { type: 'example', bad: { label: '말과 행동 불일치', story: '"나는 친구를 소중히 여겨" 하면서\n약속 시간에 항상 늦고\n중요한 날에도 까먹었다.\n친구: "말만 그렇지."' }, good: { label: '일관성 있는 사람', story: '"친구 약속이 제일 중요해" 하면서\n항상 시간 맞춰 오고\n힘들 때 연락했다.\n친구: "쟤는 진심이야."' }},
      { type: 'ox', statement: '좋은 말을 많이 하면 신뢰가 쌓인다.', answer: false, feedback: '말이 아니라 행동이 신뢰를 만들어!\n말보다 행동이 일치해야 진짜 신뢰야.' },
      { type: 'multipleChoice', question: '일관성이 중요한 이유는?', options: ['규칙적으로 보여서', '말과 행동이 같아야 믿을 수 있으니까', '남들이 좋아하니까', '변화가 싫으니까'], correctIndex: 1, explanation: '사람들은 말이 아니라 행동을 봐!\n행동이 말과 같을 때 진짜 신뢰가 생겨.' },
      { type: 'feedback', summary: '일관성 = 말 = 행동, 신뢰의 기둥', message: '말한 대로 행동하는 것이 최고의 신뢰!' },
      { type: 'mission', mission: '최근 내가 한 말 vs 실제 행동이\n일치하는지 하나 점검해보기', encouragement: '점검하는 사람이 성장하는 사람!' },
    ],
  },

  'trust-bronze-6': {
    id: 'trust-bronze-6', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 6,
    title: '신뢰 통장 - 쌓기와 인출',
    cards: [
      { type: 'concept', title: '신뢰는 은행 통장과 같다', description: '신뢰를 은행 통장에 비유해보자.\n\n입금: 약속 지키기, 솔직하기, 도와주기\n출금: 거짓말, 약속 어기기, 뒷담화\n\n입금은 조금씩 쌓이지만\n출금은 한 번에 많이 빠져.\n\n잔액이 0이 되면 관계가 끝나!' },
      { type: 'summary', keywords: [
        { icon: '🏦', label: '신뢰 통장', description: '신뢰도 입금/출금이 있다' },
        { icon: '➕', label: '입금', description: '약속, 솔직, 배려, 도움' },
        { icon: '➖', label: '출금', description: '거짓말, 약속 위반, 무시' },
        { icon: '⚠️', label: '비대칭', description: '쌓긴 어렵고 무너지긴 쉬움' },
      ]},
      { type: 'example', bad: { label: '출금만 하기', story: '약속 어기기, 뒷담화, 거짓말.\n친구가 하나둘 멀어졌다.\n신뢰 통장 잔액: 0원.' }, good: { label: '꾸준한 입금', story: '약속 지키기, 비밀 지키기, 응원하기.\n매일 조금씩 입금했더니\n"너는 정말 믿을 수 있는 친구야."' }},
      { type: 'ox', statement: '신뢰는 한 번 큰 것을 하면 충분하다.', answer: false, feedback: '작은 입금이 매일 쌓여야 해!\n큰 한 방보다 꾸준한 작은 행동이 중요해.' },
      { type: 'multipleChoice', question: '신뢰 통장에서 "입금"에 해당하는 것은?', options: ['뒷담화', '약속 지키기', '거짓말', '무시하기'], correctIndex: 1, explanation: '약속 지키기는 가장 확실한 입금!\n매일 조금씩 쌓아가자.' },
      { type: 'feedback', summary: '신뢰 통장 = 매일 작은 입금이 큰 신뢰를 만든다', message: '오늘 신뢰 통장에 입금하자!' },
      { type: 'mission', mission: '오늘 누군가의 신뢰 통장에 "입금"할\n행동 1가지 실천하기', encouragement: '작은 입금이 큰 관계를 만들어!' },
    ],
  },

  'trust-bronze-7': {
    id: 'trust-bronze-7', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 7,
    title: '사과와 용서',
    cards: [
      { type: 'concept', title: '진심 어린 사과가 신뢰를 회복한다', description: '실수해서 신뢰가 깨졌다면?\n진심 어린 사과가 필요해.\n\n좋은 사과의 3단계:\n1. 잘못 인정: "내가 ~해서 잘못했어"\n2. 공감: "네가 ~한 기분이었겠다"\n3. 행동 변화: "앞으로 ~할게"\n\n변명 없는 사과가 신뢰를 다시 세워.' },
      { type: 'summary', keywords: [
        { icon: '🙇', label: '진심 사과', description: '변명 없이 잘못 인정' },
        { icon: '💛', label: '공감', description: '상대 감정 알아주기' },
        { icon: '🔄', label: '행동 변화', description: '같은 실수 반복 안 하기' },
        { icon: '🤝', label: '용서', description: '용서는 관계 회복의 선물' },
      ]},
      { type: 'example', bad: { label: '변명하는 사과', story: '"미안한데 네가 먼저 그랬잖아."\n사과 같지 않은 사과.\n친구는 더 화가 났다.' }, good: { label: '진심 사과', story: '"내가 약속을 어겨서 미안해.\n기다리면서 화났겠다.\n다음엔 꼭 미리 연락할게."\n친구: "알겠어, 다음엔 지켜줘."' }},
      { type: 'ox', statement: '"미안" 한마디만 하면 사과가 된다.', answer: false, feedback: '진짜 사과는 인정 + 공감 + 행동 변화!\n"미안"만으로는 부족할 수 있어.' },
      { type: 'multipleChoice', question: '진심 어린 사과에 꼭 들어가야 할 것은?', options: ['변명과 이유 설명', '잘못 인정 + 상대 감정 공감 + 행동 변화 약속', '"미안" 한마디만', '선물로 대신하기'], correctIndex: 1, explanation: '인정 + 공감 + 변화 약속!\n이 3가지가 진짜 사과의 조건이야.' },
      { type: 'feedback', summary: '진심 사과 = 인정 + 공감 + 행동 변화', message: '용기 있는 사과가 관계를 살려!' },
      { type: 'mission', mission: '사과해야 할 사람이 있다면\n3단계로 사과 문장 만들어보기', encouragement: '사과는 약한 게 아니라 용기 있는 거야!' },
    ],
  },

  'trust-bronze-8': {
    id: 'trust-bronze-8', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 8,
    title: '자기 신뢰 - 나를 믿기',
    cards: [
      { type: 'concept', title: '나와의 약속도 지켜야 한다', description: '남과의 약속은 지키면서\n나와의 약속은 어기는 경우가 많아.\n\n"내일부터 운동해야지" → 안 함\n"폰 줄여야지" → 그대로\n\n나와의 약속을 지키면\n자기 신뢰가 올라가고\n자신감도 따라와!' },
      { type: 'summary', keywords: [
        { icon: '🪞', label: '자기 신뢰', description: '나 자신을 믿는 힘' },
        { icon: '📌', label: '나와의 약속', description: '스스로에게 한 약속 지키기' },
        { icon: '💪', label: '자신감', description: '자기 신뢰 → 자신감 UP' },
        { icon: '🐜', label: '작게 시작', description: '지킬 수 있는 약속부터' },
      ]},
      { type: 'example', bad: { label: '나와의 약속 파기', story: '"매일 아침 운동!" → 3일 만에 포기.\n"이번엔 진짜!" → 또 포기.\n스스로를 못 믿게 됐다.' }, good: { label: '자기 신뢰 쌓기', story: '"매일 스트레칭 3분!" 작은 약속.\n7일 연속 성공. "나는 할 수 있어!"\n자기 신뢰가 올라가니 더 큰 것도 도전.' }},
      { type: 'ox', statement: '나와의 약속은 남에게 피해가 없으니 안 지켜도 된다.', answer: false, feedback: '안 지키면 자기 신뢰가 무너져!\n자신감과 실행력이 떨어지게 돼.' },
      { type: 'multipleChoice', question: '자기 신뢰를 쌓는 가장 좋은 방법은?', options: ['큰 목표 세우기', '지킬 수 있는 작은 약속부터 지키기', '남에게 선언하기', '자기 최면'], correctIndex: 1, explanation: '작은 약속을 지키면 "나는 할 수 있다"는\n믿음이 쌓여!' },
      { type: 'feedback', summary: '자기 신뢰 = 나와의 약속 지키기', message: '나를 믿는 사람이 남도 믿을 수 있어!' },
      { type: 'mission', mission: '오늘 "나와의 작은 약속" 1개 정하고 지키기\n(예: 물 3잔 마시기)', encouragement: '작은 약속 하나가 자기 신뢰의 시작!' },
    ],
  },

  'trust-bronze-9': {
    id: 'trust-bronze-9', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 9,
    title: '건강한 경계 세우기',
    cards: [
      { type: 'concept', title: '신뢰에도 경계가 필요하다', description: '누구에게나 무조건 믿고 열어주는 건\n위험할 수 있어.\n\n건강한 신뢰 = 상대의 행동을 보고\n단계적으로 신뢰를 높이는 것.\n\n"아직 잘 모르는 사람에게\n깊은 비밀을 말하지 않는 것"\n이것도 자기를 지키는 지혜야.' },
      { type: 'summary', keywords: [
        { icon: '🛡️', label: '경계', description: '나를 보호하는 기준선' },
        { icon: '📶', label: '단계적', description: '천천히 신뢰를 높이기' },
        { icon: '👀', label: '관찰', description: '상대 행동으로 판단' },
        { icon: '⚖️', label: '균형', description: '열림과 보호의 균형' },
      ]},
      { type: 'example', bad: { label: '경계 없는 신뢰', story: '만난 지 일주일 된 사람에게\n모든 비밀을 말했다.\n그 사람이 SNS에 퍼뜨렸다.' }, good: { label: '건강한 경계', story: '새 친구와 가벼운 이야기부터 시작.\n시간이 지나며 서로 약속을 잘 지키는 걸 확인.\n천천히 깊은 이야기도 나누게 됐다.' }},
      { type: 'ox', statement: '좋은 사람은 누구든 바로 100% 믿어야 한다.', answer: false, feedback: '신뢰는 시간이 필요해!\n상대의 행동을 보고 단계적으로 높이는 게 현명해.' },
      { type: 'multipleChoice', question: '건강한 경계의 의미는?', options: ['아무도 믿지 않기', '모든 사람을 바로 믿기', '상대 행동을 보고 단계적으로 신뢰하기', '남에게 냉정하게 대하기'], correctIndex: 2, explanation: '관찰 → 작은 신뢰 → 점점 깊은 신뢰.\n이게 건강한 방식이야!' },
      { type: 'feedback', summary: '건강한 경계 = 단계적으로 신뢰 쌓기', message: '나를 지키면서 관계를 키우는 지혜!' },
      { type: 'mission', mission: '내 인간관계에서 신뢰 수준을 떠올려보기\n(깊은 신뢰 / 보통 / 아직 모름)', encouragement: '관계마다 다른 수준이 자연스러운 거야!' },
    ],
  },

  'trust-bronze-10': {
    id: 'trust-bronze-10', chapterKey: 'trust', tierKey: 'bronze', stageNumber: 10,
    title: '신뢰받는 사람 되기',
    cards: [
      { type: 'concept', title: '종합 정리 및 실천', description: '지금까지 배운 것을 조합해\n신뢰받는 사람이 되어보자!\n\n1. 약속을 지킨다 (작은 것부터)\n2. 솔직하게 말한다 (변명 대신 인정)\n3. 비밀을 지킨다 (입이 무겁다)\n4. 말과 행동이 같다 (일관성)\n5. 진심으로 사과한다 (실수 인정)\n6. 나와의 약속도 지킨다 (자기 신뢰)' },
      { type: 'summary', keywords: [
        { icon: '📌', label: '약속', description: '작은 약속부터 반드시 지키기' },
        { icon: '💎', label: '솔직', description: '거짓 없이 진실되게' },
        { icon: '🔒', label: '비밀', description: '들은 이야기 끝까지 지키기' },
        { icon: '🔗', label: '일관성', description: '말한 대로 행동하기' },
      ]},
      { type: 'example', bad: { label: '신뢰 없는 사람', story: '약속 어기기, 뒷담화, 거짓말.\n주변에 아무도 남지 않았다.\n"왜 다 떠날까?" 이유를 몰랐다.' }, good: { label: '신뢰받는 사람', story: '약속 지키기 + 솔직함 + 비밀 유지.\n모두가 "쟤는 믿을 수 있어"라고 했다.\n어디서든 환영받는 사람이 됐다.' }},
      { type: 'ox', statement: '신뢰는 타고나는 것이라 노력해도 안 된다.', answer: false, feedback: '신뢰는 매일의 행동으로 만드는 거야!\n누구나 연습하면 신뢰받는 사람이 될 수 있어.' },
      { type: 'multipleChoice', question: '신뢰받는 사람이 되기 위해 가장 중요한 것은?', options: ['말을 잘하기', '매일 작은 약속을 꾸준히 지키기', '남에게 잘 보이기', '큰 일을 한 번 하기'], correctIndex: 1, explanation: '꾸준한 작은 행동이 큰 신뢰를 만들어!\n화려함보다 일관성이 핵심.' },
      { type: 'apply', question: '신뢰받는 사람이 되기 위한 나만의 실천 계획을 써보세요.\n(약속 / 솔직 / 비밀 / 일관성 중 1가지)', placeholder: '예: 이번 주 모든 시간 약속 5분 전 도착하기' },
      { type: 'feedback', summary: '신뢰 = 약속 + 솔직 + 비밀 + 일관성의 꾸준한 실천', message: '브론즈 완료! 이제 신뢰의 기본기를 갖췄어!' },
      { type: 'mission', mission: '오늘부터 "약속 지키기"를 가장 중요한 원칙으로 삼기', encouragement: '신뢰받는 사람이 가장 강한 사람이야!' },
    ],
  },

}
