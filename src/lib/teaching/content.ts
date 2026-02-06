// 티칭 콘텐츠 데이터
import { TeachingContent, WorldKey, WORLD_CONFIGS } from './types'

// 모든 티칭 콘텐츠
export const TEACHING_CONTENTS: TeachingContent[] = [
  // ===== 인지 월드 =====
  // 인문 챕터
  { id: 'cognition-humanities-1-1', worldKey: 'cognition', chapterKey: 'humanities', level: 1, conceptTitle: '인문학이란?', conceptContent: '인문학은 인간과 인간의 문화를 탐구하는 학문입니다.\n\n역사, 문학, 언어, 철학 등이 포함됩니다.\n\n"인간이란 무엇인가?"라는 질문에서 시작합니다.', thinkingQuestion: '인간에 대해 궁금했던 적이 있나요?', actionMission: '인간에 대한 질문 3가지 적어보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-humanities-1-2', worldKey: 'cognition', chapterKey: 'humanities', level: 1, conceptTitle: '역사의 가치', conceptContent: '역사는 과거를 통해 현재를 이해하는 것입니다.\n\n같은 실수를 반복하지 않기 위해 역사를 배웁니다.\n\n역사 속 인물들의 선택에서 교훈을 얻을 수 있습니다.', thinkingQuestion: '역사에서 배운 교훈이 있나요?', actionMission: '존경하는 역사 인물 1명과 그 이유 적기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-humanities-1-3', worldKey: 'cognition', chapterKey: 'humanities', level: 1, conceptTitle: '문학의 힘', conceptContent: '문학은 다른 사람의 삶을 간접 경험하게 해줍니다.\n\n책 한 권으로 수백 년 전 사람의 마음을 느낄 수 있습니다.\n\n문학은 공감 능력을 키워줍니다.', thinkingQuestion: '감동받은 책이나 이야기가 있나요?', actionMission: '좋아하는 책에서 인상 깊은 문장 찾아보기', xpReward: 10, energyReward: 3 },

  // 사회 챕터
  { id: 'cognition-social-1-1', worldKey: 'cognition', chapterKey: 'social', level: 1, conceptTitle: '사회란 무엇인가?', conceptContent: '사회는 사람들이 함께 모여 살아가는 집단입니다.\n\n가족, 학교, 지역사회, 국가 모두 사회입니다.\n\n사회 안에서 우리는 서로 영향을 주고받습니다.', thinkingQuestion: '내가 속한 사회는 어디인가요?', actionMission: '내가 속한 사회 3가지 적어보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-social-1-2', worldKey: 'cognition', chapterKey: 'social', level: 1, conceptTitle: '시민의 역할', conceptContent: '시민은 사회의 일원으로서 권리와 의무를 가집니다.\n\n투표, 납세, 법 준수는 시민의 기본 의무입니다.\n\n좋은 시민이 되면 사회가 더 좋아집니다.', thinkingQuestion: '좋은 시민이란 어떤 사람일까요?', actionMission: '좋은 시민의 조건 5가지 생각해보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-social-1-3', worldKey: 'cognition', chapterKey: 'social', level: 1, conceptTitle: '다양성과 공존', conceptContent: '사회에는 다양한 사람들이 함께 살아갑니다.\n\n문화, 종교, 생각이 다른 사람들과 공존하는 것이 중요합니다.\n\n다름을 인정하는 것이 성숙한 사회입니다.', thinkingQuestion: '나와 다른 사람을 만나면 어떤 마음인가요?', actionMission: '나와 다른 점을 가진 사람의 장점 찾아보기', xpReward: 10, energyReward: 3 },

  // 과학 챕터
  { id: 'cognition-science-1-1', worldKey: 'cognition', chapterKey: 'science', level: 1, conceptTitle: '과학적 사고란?', conceptContent: '과학적 사고는 관찰, 질문, 실험, 결론의 과정입니다.\n\n"왜?"라는 질문에서 시작해서 증거로 답을 찾습니다.\n\n과학은 추측이 아닌 증거를 중시합니다.', thinkingQuestion: '궁금한 것을 실험해본 적 있나요?', actionMission: '일상에서 "왜?"라는 질문 3개 만들기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-science-1-2', worldKey: 'cognition', chapterKey: 'science', level: 1, conceptTitle: '가설과 검증', conceptContent: '가설은 "아마 이럴 것이다"라는 예측입니다.\n\n가설을 세우고 실험으로 확인하는 것이 과학입니다.\n\n틀려도 괜찮습니다. 새로운 가설을 세우면 됩니다.', thinkingQuestion: '예측이 틀렸던 경험이 있나요?', actionMission: '오늘 일어날 일에 대한 가설 세우고 확인하기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-science-1-3', worldKey: 'cognition', chapterKey: 'science', level: 1, conceptTitle: '과학과 일상', conceptContent: '과학은 멀리 있지 않습니다.\n\n스마트폰, 냉장고, 의약품 모두 과학의 결과물입니다.\n\n과학을 이해하면 세상을 더 잘 이해할 수 있습니다.', thinkingQuestion: '과학이 없었다면 어떤 불편함이 있을까요?', actionMission: '오늘 사용한 과학 기술 5가지 찾아보기', xpReward: 10, energyReward: 3 },

  // 종교 챕터
  { id: 'cognition-religion-1-1', worldKey: 'cognition', chapterKey: 'religion', level: 1, conceptTitle: '종교란 무엇인가?', conceptContent: '종교는 삶의 의미와 가치를 찾는 방법 중 하나입니다.\n\n전 세계에는 다양한 종교가 있습니다.\n\n종교는 많은 사람들에게 위안과 방향을 제공합니다.', thinkingQuestion: '삶의 의미에 대해 생각해본 적 있나요?', actionMission: '삶에서 소중한 가치 3가지 적어보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-religion-1-2', worldKey: 'cognition', chapterKey: 'religion', level: 1, conceptTitle: '종교적 관용', conceptContent: '다른 종교를 가진 사람도 존중해야 합니다.\n\n종교가 다르다고 틀린 것이 아닙니다.\n\n서로 다른 믿음을 인정하는 것이 성숙함입니다.', thinkingQuestion: '다른 종교에 대해 얼마나 알고 있나요?', actionMission: '내가 모르는 종교 하나에 대해 알아보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-religion-1-3', worldKey: 'cognition', chapterKey: 'religion', level: 1, conceptTitle: '영성과 마음', conceptContent: '영성은 눈에 보이지 않는 것을 느끼는 능력입니다.\n\n명상, 기도, 자연과의 교감 등으로 영성을 키울 수 있습니다.\n\n마음의 평화는 삶의 질을 높여줍니다.', thinkingQuestion: '마음이 평화로워지는 순간은 언제인가요?', actionMission: '5분간 조용히 명상하거나 생각 정리하기', xpReward: 10, energyReward: 3 },

  // 철학 챕터
  { id: 'cognition-philosophy-1-1', worldKey: 'cognition', chapterKey: 'philosophy', level: 1, conceptTitle: '철학이란?', conceptContent: '철학은 근본적인 질문을 던지는 학문입니다.\n\n"나는 누구인가?", "좋은 삶이란?", "진실은 무엇인가?"\n\n답이 없어도 질문 자체가 가치 있습니다.', thinkingQuestion: '스스로에게 던져본 깊은 질문이 있나요?', actionMission: '나에게 중요한 질문 1개 적고 생각하기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-philosophy-1-2', worldKey: 'cognition', chapterKey: 'philosophy', level: 1, conceptTitle: '논리적 생각', conceptContent: '철학은 논리적으로 생각하는 훈련입니다.\n\n"왜?"를 계속 묻고, 근거를 찾습니다.\n\n감정이 아닌 이성으로 판단하는 연습입니다.', thinkingQuestion: '논리적으로 판단하려고 노력하나요?', actionMission: '오늘 내린 결정의 이유 3가지 적어보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-philosophy-1-3', worldKey: 'cognition', chapterKey: 'philosophy', level: 1, conceptTitle: '윤리와 도덕', conceptContent: '윤리는 옳고 그름을 구분하는 기준입니다.\n\n"이게 정말 옳은 행동인가?"라고 스스로 물어보세요.\n\n좋은 사람이 되려면 윤리적 사고가 필요합니다.', thinkingQuestion: '옳고 그름을 어떻게 판단하나요?', actionMission: '어려운 도덕적 딜레마에 대해 생각해보기', xpReward: 10, energyReward: 3 },

  // 예술 챕터
  { id: 'cognition-art-1-1', worldKey: 'cognition', chapterKey: 'art', level: 1, conceptTitle: '예술이란?', conceptContent: '예술은 생각과 감정을 표현하는 방법입니다.\n\n음악, 그림, 춤, 글 등 다양한 형태가 있습니다.\n\n누구나 예술가가 될 수 있습니다.', thinkingQuestion: '어떤 예술 활동을 좋아하나요?', actionMission: '오늘 느낀 감정을 그림이나 글로 표현하기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-art-1-2', worldKey: 'cognition', chapterKey: 'art', level: 1, conceptTitle: '예술과 감성', conceptContent: '예술은 감성을 풍부하게 만들어줍니다.\n\n아름다운 것을 보고 느끼는 능력이 커집니다.\n\n예술을 감상하면 마음이 풍요로워집니다.', thinkingQuestion: '최근에 감동받은 예술 작품이 있나요?', actionMission: '좋아하는 음악을 들으며 감정 느껴보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-art-1-3', worldKey: 'cognition', chapterKey: 'art', level: 1, conceptTitle: '창작의 즐거움', conceptContent: '무언가를 만드는 것은 큰 기쁨을 줍니다.\n\n완벽하지 않아도 괜찮습니다.\n\n중요한 것은 만드는 과정을 즐기는 것입니다.', thinkingQuestion: '무언가를 만들어본 경험이 있나요?', actionMission: '간단한 창작 활동 하나 해보기', xpReward: 10, energyReward: 3 },

  // 국어 챕터
  { id: 'cognition-korean-1-1', worldKey: 'cognition', chapterKey: 'korean', level: 1, conceptTitle: '언어의 힘', conceptContent: '언어는 생각을 전달하는 도구입니다.\n\n언어를 잘 다루면 생각도 더 정확해집니다.\n\n말과 글이 곧 그 사람의 품격입니다.', thinkingQuestion: '말이나 글로 오해가 생긴 적 있나요?', actionMission: '오늘 있었던 일을 문장 3개로 정리하기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-korean-1-2', worldKey: 'cognition', chapterKey: 'korean', level: 1, conceptTitle: '읽기의 중요성', conceptContent: '읽기는 지식을 얻는 가장 좋은 방법입니다.\n\n많이 읽을수록 어휘력과 사고력이 커집니다.\n\n하루 10분 독서도 큰 변화를 만듭니다.', thinkingQuestion: '최근에 읽은 책이 있나요?', actionMission: '오늘 짧은 글이라도 하나 읽기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-korean-1-3', worldKey: 'cognition', chapterKey: 'korean', level: 1, conceptTitle: '글쓰기 연습', conceptContent: '글을 쓰면 생각이 정리됩니다.\n\n처음엔 어색해도 쓸수록 나아집니다.\n\n일기, 메모, 감상문 모두 좋은 연습입니다.', thinkingQuestion: '글을 쓰는 것이 어렵게 느껴지나요?', actionMission: '오늘 하루를 3문장으로 기록하기', xpReward: 10, energyReward: 3 },

  // 영어 챕터
  { id: 'cognition-english-1-1', worldKey: 'cognition', chapterKey: 'english', level: 1, conceptTitle: '영어의 중요성', conceptContent: '영어는 전 세계와 소통하는 도구입니다.\n\n인터넷 정보의 대부분이 영어로 되어 있습니다.\n\n영어를 알면 더 넓은 세상을 만날 수 있습니다.', thinkingQuestion: '영어로 소통하고 싶은 마음이 있나요?', actionMission: '오늘 영어 단어 5개 외우기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-english-1-2', worldKey: 'cognition', chapterKey: 'english', level: 1, conceptTitle: '매일 조금씩', conceptContent: '언어는 매일 조금씩 하는 것이 중요합니다.\n\n하루 10분이 일주일에 한 번 1시간보다 효과적입니다.\n\n영어 노래, 영상, 책으로 즐겁게 접하세요.', thinkingQuestion: '영어를 매일 접하고 있나요?', actionMission: '오늘 영어 영상 5분 보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-english-1-3', worldKey: 'cognition', chapterKey: 'english', level: 1, conceptTitle: '실수를 두려워 말기', conceptContent: '언어 학습에서 실수는 자연스럽습니다.\n\n틀려도 말해보는 것이 중요합니다.\n\n완벽하지 않아도 소통할 수 있습니다.', thinkingQuestion: '영어로 말하는 게 두렵나요?', actionMission: '영어로 짧은 자기소개 연습하기', xpReward: 10, energyReward: 3 },

  // 수학 챕터
  { id: 'cognition-math-1-1', worldKey: 'cognition', chapterKey: 'math', level: 1, conceptTitle: '수학적 사고', conceptContent: '수학은 논리적으로 생각하는 훈련입니다.\n\n문제를 단계별로 풀어나가는 것이 핵심입니다.\n\n수학을 잘하면 다른 과목도 쉬워집니다.', thinkingQuestion: '수학이 어렵게 느껴지나요?', actionMission: '오늘 수학 문제 3개 풀어보기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-math-1-2', worldKey: 'cognition', chapterKey: 'math', level: 1, conceptTitle: '일상 속 수학', conceptContent: '수학은 일상 곳곳에 있습니다.\n\n시간 계산, 할인율, 거리 측정 모두 수학입니다.\n\n수학을 알면 생활이 더 편리해집니다.', thinkingQuestion: '오늘 수학을 사용한 적이 있나요?', actionMission: '일상에서 수학이 쓰인 예 3가지 찾기', xpReward: 10, energyReward: 3 },
  { id: 'cognition-math-1-3', worldKey: 'cognition', chapterKey: 'math', level: 1, conceptTitle: '문제 해결 전략', conceptContent: '수학 문제는 전략적으로 접근해야 합니다.\n\n문제를 잘 읽고, 무엇을 구해야 하는지 파악하세요.\n\n모르면 비슷한 문제부터 풀어보세요.', thinkingQuestion: '수학 문제를 풀 때 어떻게 접근하나요?', actionMission: '어려운 문제를 단계별로 나눠서 풀기', xpReward: 10, energyReward: 3 },

  // ===== 자기주도 월드 =====
  // 목표설정 챕터
  { id: 'selfDirected-goal-1-1', worldKey: 'selfDirected', chapterKey: 'goal', level: 1, conceptTitle: 'SMART 목표', conceptContent: '좋은 목표는 SMART합니다.\n\nSpecific(구체적), Measurable(측정 가능), Achievable(달성 가능), Relevant(관련성 있는), Time-bound(기한 있는)\n\n"열심히 공부하기"보다 "매일 수학 문제 10개 풀기"가 좋습니다.', thinkingQuestion: '지금 목표가 구체적으로 정해져 있나요?', actionMission: '이번 주 목표를 SMART하게 다시 설정하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-goal-1-2', worldKey: 'selfDirected', chapterKey: 'goal', level: 1, conceptTitle: '목표 시각화하기', conceptContent: '목표를 눈에 보이게 적어두면 달성률이 높아집니다.\n\n적어서 책상에 붙이거나, 매일 아침 읽어보세요.\n\n뇌가 목표를 계속 인식하면 행동이 따라옵니다.', thinkingQuestion: '목표를 어디에 적어두나요?', actionMission: '목표를 종이에 적어 눈에 잘 보이는 곳에 붙이기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-goal-1-3', worldKey: 'selfDirected', chapterKey: 'goal', level: 1, conceptTitle: '큰 목표와 작은 목표', conceptContent: '큰 목표는 방향을, 작은 목표는 행동을 만듭니다.\n\n1년 목표 → 한 달 목표 → 이번 주 목표 → 오늘 할 일\n\n이렇게 쪼개면 실행이 쉬워집니다.', thinkingQuestion: '장기 목표와 단기 목표가 연결되어 있나요?', actionMission: '큰 목표를 이번 주 작은 목표로 쪼개기', xpReward: 10, energyReward: 3 },

  // 계획수립 챕터
  { id: 'selfDirected-planning-1-1', worldKey: 'selfDirected', chapterKey: 'planning', level: 1, conceptTitle: '실행 가능한 계획', conceptContent: '좋은 계획은 실행 가능해야 합니다.\n\n너무 빡빡하면 포기하고, 너무 느슨하면 미루게 됩니다.\n\n"할 수 있지만 조금 도전적인" 수준이 딱 좋습니다.', thinkingQuestion: '계획을 세워도 잘 지키지 못한 경험이 있나요?', actionMission: '내일 할 일 3가지를 현실적으로 계획하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-planning-1-2', worldKey: 'selfDirected', chapterKey: 'planning', level: 1, conceptTitle: '버퍼 시간 넣기', conceptContent: '계획은 항상 예상보다 오래 걸립니다.\n\n계획할 때 여유 시간(버퍼)을 넣으세요.\n\n예상 시간의 1.5배를 잡으면 적당합니다.', thinkingQuestion: '계획이 밀린 적 자주 있나요?', actionMission: '오늘 계획에 10분씩 여유 시간 추가하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-planning-1-3', worldKey: 'selfDirected', chapterKey: 'planning', level: 1, conceptTitle: '유연한 계획', conceptContent: '완벽한 계획보다 수정 가능한 계획이 좋습니다.\n\n상황이 바뀌면 계획도 바꾸세요.\n\n계획에 얽매이지 말고, 목표에 집중하세요.', thinkingQuestion: '계획이 틀어지면 어떻게 하나요?', actionMission: '계획 B를 미리 생각해두기', xpReward: 10, energyReward: 3 },

  // 시간관리 챕터
  { id: 'selfDirected-time-1-1', worldKey: 'selfDirected', chapterKey: 'time', level: 1, conceptTitle: '시간의 주인 되기', conceptContent: '시간은 모두에게 24시간으로 공평합니다.\n\n차이는 어떻게 쓰느냐입니다.\n\n먼저 자신의 시간이 어디에 쓰이는지 파악하세요.', thinkingQuestion: '하루를 어떻게 보내고 있는지 알고 있나요?', actionMission: '오늘 시간 사용 기록하기 (1시간 단위)', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-time-1-2', worldKey: 'selfDirected', chapterKey: 'time', level: 1, conceptTitle: '시간 낭비 요인', conceptContent: 'SNS, 유튜브, 게임은 시간을 삼킵니다.\n\n"잠깐만"이 1시간이 되기 쉽습니다.\n\n타이머를 설정하거나, 특정 시간에만 하세요.', thinkingQuestion: '가장 많은 시간을 낭비하는 활동은 무엇인가요?', actionMission: '내일 SNS/유튜브 시간 30분으로 제한하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-time-1-3', worldKey: 'selfDirected', chapterKey: 'time', level: 1, conceptTitle: '황금 시간 활용', conceptContent: '집중력이 가장 높은 시간이 있습니다.\n\n보통 아침이나 밤, 사람마다 다릅니다.\n\n가장 중요한 일을 황금 시간에 하세요.', thinkingQuestion: '언제 집중이 가장 잘 되나요?', actionMission: '나의 황금 시간에 가장 어려운 공부하기', xpReward: 10, energyReward: 3 },

  // 우선순위 챕터
  { id: 'selfDirected-priority-1-1', worldKey: 'selfDirected', chapterKey: 'priority', level: 1, conceptTitle: '중요한 것 먼저', conceptContent: '모든 것을 다 할 수는 없습니다.\n\n"이게 정말 중요한가?"라고 물어보세요.\n\n중요한 것에 먼저 시간을 쓰세요.', thinkingQuestion: '할 일이 많을 때 어떻게 정하나요?', actionMission: '내일 할 일 중 가장 중요한 것 1개 먼저 끝내기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-priority-1-2', worldKey: 'selfDirected', chapterKey: 'priority', level: 1, conceptTitle: '긴급함과 중요함 구분', conceptContent: '긴급한 일과 중요한 일은 다릅니다.\n\n긴급하지만 안 중요한 일에 시간을 뺏기면 안 됩니다.\n\n중요한 일이 긴급해지기 전에 하세요.', thinkingQuestion: '급한 일만 하다가 중요한 일을 못 한 적 있나요?', actionMission: '할 일 목록을 긴급/중요로 분류하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-priority-1-3', worldKey: 'selfDirected', chapterKey: 'priority', level: 1, conceptTitle: '안 할 것 정하기', conceptContent: '무엇을 할지만큼 무엇을 안 할지도 중요합니다.\n\n시간은 한정되어 있으니까요.\n\n과감히 포기할 것을 정하세요.', thinkingQuestion: '안 해도 되는 일을 하고 있지는 않나요?', actionMission: '이번 주 안 할 것 3가지 정하기', xpReward: 10, energyReward: 3 },

  // 동기부여 챕터
  { id: 'selfDirected-motivation-1-1', worldKey: 'selfDirected', chapterKey: 'motivation', level: 1, conceptTitle: '왜 하는지 알기', conceptContent: '동기는 "왜?"에서 시작됩니다.\n\n왜 공부하는지, 왜 이 목표를 세웠는지 명확히 하세요.\n\n이유가 분명하면 힘들어도 버틸 수 있습니다.', thinkingQuestion: '지금 공부하는 이유가 무엇인가요?', actionMission: '내가 이걸 하는 이유 3가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-motivation-1-2', worldKey: 'selfDirected', chapterKey: 'motivation', level: 1, conceptTitle: '작은 성공 경험', conceptContent: '큰 목표보다 작은 성공이 동기를 줍니다.\n\n할 수 있는 것부터 하고, 성공을 느끼세요.\n\n"해냈다!"는 느낌이 다음 행동을 이끕니다.', thinkingQuestion: '최근에 작은 성공을 경험한 적 있나요?', actionMission: '오늘 확실히 할 수 있는 것 1개 완료하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-motivation-1-3', worldKey: 'selfDirected', chapterKey: 'motivation', level: 1, conceptTitle: '보상 설정하기', conceptContent: '목표를 달성하면 스스로에게 보상을 주세요.\n\n좋아하는 간식, 휴식, 게임 시간 등\n\n뇌가 "이걸 하면 좋은 일이 생긴다"고 학습합니다.', thinkingQuestion: '목표를 달성하면 어떻게 축하하나요?', actionMission: '오늘 할 일 끝내면 받을 보상 미리 정하기', xpReward: 10, energyReward: 3 },

  // 자기점검 챕터
  { id: 'selfDirected-review-1-1', worldKey: 'selfDirected', chapterKey: 'review', level: 1, conceptTitle: '매일 돌아보기', conceptContent: '하루를 돌아보는 시간이 필요합니다.\n\n"오늘 뭘 했지?", "잘한 것과 아쉬운 것은?"라고 물어보세요.\n\n5분이면 충분합니다.', thinkingQuestion: '하루를 돌아보는 습관이 있나요?', actionMission: '잠자기 전 오늘 하루 3줄로 정리하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-review-1-2', worldKey: 'selfDirected', chapterKey: 'review', level: 1, conceptTitle: '주간 점검', conceptContent: '일주일에 한 번은 전체를 점검하세요.\n\n목표 달성률, 잘한 점, 개선할 점을 확인합니다.\n\n다음 주 계획에 반영하세요.', thinkingQuestion: '주간 점검을 해본 적 있나요?', actionMission: '이번 주 목표 달성률 체크하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-review-1-3', worldKey: 'selfDirected', chapterKey: 'review', level: 1, conceptTitle: '실패에서 배우기', conceptContent: '실패는 나쁜 게 아니라 정보입니다.\n\n"왜 안 됐지?", "다음엔 어떻게 하지?"라고 분석하세요.\n\n같은 실패를 반복하지 않으면 됩니다.', thinkingQuestion: '실패했을 때 원인을 분석하나요?', actionMission: '최근 실패 경험의 원인과 대책 적기', xpReward: 10, energyReward: 3 },

  // 자원활용 챕터
  { id: 'selfDirected-resource-1-1', worldKey: 'selfDirected', chapterKey: 'resource', level: 1, conceptTitle: '나만의 자원 파악', conceptContent: '자원은 시간, 돈, 도구, 사람 등 다양합니다.\n\n내가 활용할 수 있는 자원이 무엇인지 파악하세요.\n\n없는 것보다 있는 것에 집중하세요.', thinkingQuestion: '공부에 활용할 수 있는 자원이 무엇이 있나요?', actionMission: '내가 활용 가능한 학습 자원 5가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-resource-1-2', worldKey: 'selfDirected', chapterKey: 'resource', level: 1, conceptTitle: '도움 요청하기', conceptContent: '모르면 물어보는 게 가장 빠릅니다.\n\n선생님, 친구, 인터넷 모두 자원입니다.\n\n혼자 끙끙대지 말고 도움을 요청하세요.', thinkingQuestion: '모를 때 누구에게 물어보나요?', actionMission: '모르는 것 하나를 누군가에게 질문하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-resource-1-3', worldKey: 'selfDirected', chapterKey: 'resource', level: 1, conceptTitle: '좋은 도구 활용', conceptContent: '좋은 도구는 효율을 높여줍니다.\n\n공부 앱, 타이머, 노트 방법 등을 찾아보세요.\n\n도구에 투자하는 것도 실력입니다.', thinkingQuestion: '공부할 때 어떤 도구를 사용하나요?', actionMission: '효과적인 공부 도구 하나 찾아서 써보기', xpReward: 10, energyReward: 3 },

  // 적응력 챕터
  { id: 'selfDirected-adapt-1-1', worldKey: 'selfDirected', chapterKey: 'adapt', level: 1, conceptTitle: '변화를 받아들이기', conceptContent: '계획대로 안 되는 게 당연합니다.\n\n짜증내기보다 "어떻게 하면 될까?"를 생각하세요.\n\n유연하게 대처하는 것이 진짜 실력입니다.', thinkingQuestion: '예상과 다르게 일이 진행되면 어떻게 하나요?', actionMission: '계획이 틀어졌을 때 대안 생각하기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-adapt-1-2', worldKey: 'selfDirected', chapterKey: 'adapt', level: 1, conceptTitle: '새로운 환경 적응', conceptContent: '새로운 환경은 어색하지만 기회입니다.\n\n빨리 적응하려면 적극적으로 탐색하세요.\n\n관찰하고, 질문하고, 시도하세요.', thinkingQuestion: '새로운 환경에 적응하는 데 얼마나 걸리나요?', actionMission: '익숙하지 않은 것 하나 시도해보기', xpReward: 10, energyReward: 3 },
  { id: 'selfDirected-adapt-1-3', worldKey: 'selfDirected', chapterKey: 'adapt', level: 1, conceptTitle: '피드백 수용하기', conceptContent: '피드백은 성장의 기회입니다.\n\n기분 나빠하지 말고, 무엇을 배울 수 있는지 생각하세요.\n\n피드백을 받아들이는 사람이 빨리 성장합니다.', thinkingQuestion: '비판이나 조언을 잘 받아들이나요?', actionMission: '받은 피드백 중 하나를 실제로 적용하기', xpReward: 10, energyReward: 3 },

  // ===== 습관 월드 =====
  // 습관 트리거
  { id: 'habit-trigger-1-1', worldKey: 'habit', chapterKey: 'trigger', level: 1, conceptTitle: '습관의 시작점', conceptContent: '모든 습관은 트리거(방아쇠)로 시작합니다.\n\n트리거는 시간, 장소, 감정, 직전 행동 등이 될 수 있습니다.\n\n"언제, 어디서 이 행동을 하지?"를 정하세요.', thinkingQuestion: '좋은 습관을 만들고 싶을 때 언제 시작하나요?', actionMission: '만들고 싶은 습관의 트리거 정하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-trigger-1-2', worldKey: 'habit', chapterKey: 'trigger', level: 1, conceptTitle: '기존 습관에 붙이기', conceptContent: '새 습관은 기존 습관에 붙이면 쉽습니다.\n\n"양치 후에 스트레칭", "점심 먹고 산책" 이렇게요.\n\n이미 하는 행동이 트리거가 됩니다.', thinkingQuestion: '매일 꾸준히 하는 행동이 무엇인가요?', actionMission: '기존 습관 뒤에 새 습관 붙이기', xpReward: 10, energyReward: 3 },
  { id: 'habit-trigger-1-3', worldKey: 'habit', chapterKey: 'trigger', level: 1, conceptTitle: '환경 트리거 만들기', conceptContent: '환경이 행동을 만듭니다.\n\n운동하고 싶으면 운동복을 보이는 곳에 두세요.\n\n책을 읽고 싶으면 책상 위에 책을 펴두세요.', thinkingQuestion: '환경을 바꿔서 행동이 바뀐 경험이 있나요?', actionMission: '원하는 습관을 위해 환경 하나 바꾸기', xpReward: 10, energyReward: 3 },

  // 루틴 만들기
  { id: 'habit-routine-1-1', worldKey: 'habit', chapterKey: 'routine', level: 1, conceptTitle: '아침 루틴의 힘', conceptContent: '아침을 어떻게 시작하느냐가 하루를 결정합니다.\n\n같은 순서로 같은 행동을 하면 뇌가 자동화됩니다.\n\n생각 없이도 좋은 하루를 시작할 수 있습니다.', thinkingQuestion: '아침에 일어나서 뭘 하나요?', actionMission: '내일 아침 루틴 3단계 정하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-routine-1-2', worldKey: 'habit', chapterKey: 'routine', level: 1, conceptTitle: '저녁 루틴의 힘', conceptContent: '좋은 저녁 루틴은 내일을 준비합니다.\n\n하루를 정리하고, 다음 날을 계획하세요.\n\n마음의 안정을 주고 수면의 질도 높아집니다.', thinkingQuestion: '잠자기 전에 무엇을 하나요?', actionMission: '잠자기 1시간 전 루틴 만들기', xpReward: 10, energyReward: 3 },
  { id: 'habit-routine-1-3', worldKey: 'habit', chapterKey: 'routine', level: 1, conceptTitle: '2분 규칙', conceptContent: '새 습관은 2분 이내로 시작하세요.\n\n"책 읽기" 대신 "책 1페이지 읽기"\n\n작게 시작해야 시작이라도 합니다.', thinkingQuestion: '시작이 어려워서 포기한 습관이 있나요?', actionMission: '원하는 습관을 2분 버전으로 바꾸기', xpReward: 10, energyReward: 3 },

  // 보상 설계
  { id: 'habit-reward-1-1', worldKey: 'habit', chapterKey: 'reward', level: 1, conceptTitle: '즉각적 보상', conceptContent: '뇌는 즉각적인 보상을 좋아합니다.\n\n습관 직후에 작은 보상을 주세요.\n\n"해냈다!"고 스스로 칭찬하는 것도 보상입니다.', thinkingQuestion: '습관을 실천하면 기분이 좋아지나요?', actionMission: '습관 완료 후 스스로 칭찬하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-reward-1-2', worldKey: 'habit', chapterKey: 'reward', level: 1, conceptTitle: '내재적 보상 찾기', conceptContent: '진짜 지속되는 습관은 그 자체가 보상입니다.\n\n"해야 해서" 대신 "하고 싶어서" 하게 됩니다.\n\n습관 자체의 즐거움을 찾으세요.', thinkingQuestion: '하면서 즐거운 습관이 있나요?', actionMission: '습관에서 즐거운 부분 찾아보기', xpReward: 10, energyReward: 3 },
  { id: 'habit-reward-1-3', worldKey: 'habit', chapterKey: 'reward', level: 1, conceptTitle: '보상 달력', conceptContent: '연속으로 성공하면 보상이 커지게 설계하세요.\n\n7일 연속이면 작은 선물, 30일이면 큰 선물\n\n체인을 끊지 않으려는 동기가 생깁니다.', thinkingQuestion: '연속 기록을 지키려고 노력한 적 있나요?', actionMission: '습관 연속 달성 보상 정하기', xpReward: 10, energyReward: 3 },

  // 습관 쌓기
  { id: 'habit-stack-1-1', worldKey: 'habit', chapterKey: 'stack', level: 1, conceptTitle: '습관 쌓기란?', conceptContent: '습관 쌓기는 작은 습관들을 연결하는 것입니다.\n\nA → B → C → D 순서로 자연스럽게 흐르게 합니다.\n\n아침 루틴이 좋은 예입니다.', thinkingQuestion: '연결된 습관이 있나요?', actionMission: '2개의 습관을 연결해보기', xpReward: 10, energyReward: 3 },
  { id: 'habit-stack-1-2', worldKey: 'habit', chapterKey: 'stack', level: 1, conceptTitle: '습관 체인 만들기', conceptContent: '하나씩 쌓아서 긴 체인을 만드세요.\n\n처음엔 1-2개, 익숙해지면 추가하세요.\n\n자동으로 연결되면 노력이 줄어듭니다.', thinkingQuestion: '하루에 몇 개의 좋은 습관이 있나요?', actionMission: '현재 습관 목록 적고 연결 가능한 것 찾기', xpReward: 10, energyReward: 3 },
  { id: 'habit-stack-1-3', worldKey: 'habit', chapterKey: 'stack', level: 1, conceptTitle: '삽입 포인트 찾기', conceptContent: '새 습관을 어디에 끼워넣을지가 중요합니다.\n\n기존 습관 "직후"가 가장 좋습니다.\n\n자연스러운 흐름을 만드세요.', thinkingQuestion: '새 습관을 끼워넣기 좋은 시점이 있나요?', actionMission: '새 습관의 삽입 포인트 정하기', xpReward: 10, energyReward: 3 },

  // 나쁜 습관 끊기
  { id: 'habit-break-1-1', worldKey: 'habit', chapterKey: 'break', level: 1, conceptTitle: '나쁜 습관의 트리거 찾기', conceptContent: '나쁜 습관도 트리거가 있습니다.\n\n"언제 이 행동을 하지?"를 관찰하세요.\n\n트리거를 알면 피할 수 있습니다.', thinkingQuestion: '고치고 싶은 나쁜 습관이 있나요?', actionMission: '나쁜 습관의 트리거 파악하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-break-1-2', worldKey: 'habit', chapterKey: 'break', level: 1, conceptTitle: '대체 행동 만들기', conceptContent: '나쁜 습관을 그냥 "안 하기"는 어렵습니다.\n\n대신 할 행동을 정하세요.\n\n"스마트폰 대신 책"처럼요.', thinkingQuestion: '나쁜 습관 대신 할 수 있는 게 있나요?', actionMission: '나쁜 습관의 대체 행동 정하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-break-1-3', worldKey: 'habit', chapterKey: 'break', level: 1, conceptTitle: '마찰 추가하기', conceptContent: '나쁜 습관을 어렵게 만드세요.\n\nSNS 앱 삭제, 과자 안 사기, 게임기 숨기기\n\n한 단계만 어려워도 안 하게 됩니다.', thinkingQuestion: '나쁜 습관을 더 어렵게 만들 방법이 있나요?', actionMission: '나쁜 습관에 마찰 1단계 추가하기', xpReward: 10, energyReward: 3 },

  // 습관 추적
  { id: 'habit-track-1-1', worldKey: 'habit', chapterKey: 'track', level: 1, conceptTitle: '측정의 힘', conceptContent: '측정하면 달라집니다.\n\n했는지 안 했는지 기록하세요.\n\n눈으로 보면 동기가 생깁니다.', thinkingQuestion: '습관을 기록하고 있나요?', actionMission: '습관 트래커 시작하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-track-1-2', worldKey: 'habit', chapterKey: 'track', level: 1, conceptTitle: '연속 기록', conceptContent: '연속 며칠인지 세어보세요.\n\n체인을 끊지 않으려는 마음이 생깁니다.\n\n"하루만 더"가 쌓여서 습관이 됩니다.', thinkingQuestion: '가장 오래 연속으로 유지한 습관은?', actionMission: '현재 습관의 연속 일수 확인하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-track-1-3', worldKey: 'habit', chapterKey: 'track', level: 1, conceptTitle: '주간 리뷰', conceptContent: '일주일에 한 번 습관을 돌아보세요.\n\n잘한 점, 아쉬운 점, 개선할 점을 확인합니다.\n\n꾸준히 발전하려면 점검이 필요합니다.', thinkingQuestion: '습관 실천을 점검하는 시간이 있나요?', actionMission: '이번 주 습관 실천률 계산하기', xpReward: 10, energyReward: 3 },

  // 환경 설계
  { id: 'habit-environment-1-1', worldKey: 'habit', chapterKey: 'environment', level: 1, conceptTitle: '환경이 행동을 만든다', conceptContent: '의지력보다 환경이 강합니다.\n\n좋은 환경을 만들면 좋은 습관이 쉬워집니다.\n\n환경을 설계하세요.', thinkingQuestion: '환경 때문에 나쁜 행동을 한 적 있나요?', actionMission: '공부 환경 한 가지 개선하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-environment-1-2', worldKey: 'habit', chapterKey: 'environment', level: 1, conceptTitle: '눈에 보이게 하기', conceptContent: '하고 싶은 것을 눈에 잘 보이게 두세요.\n\n물 마시기: 물병을 책상에\n\n책 읽기: 책을 침대 옆에', thinkingQuestion: '원하는 습관을 더 눈에 띄게 할 방법은?', actionMission: '습관 재료를 눈에 잘 보이는 곳에 두기', xpReward: 10, energyReward: 3 },
  { id: 'habit-environment-1-3', worldKey: 'habit', chapterKey: 'environment', level: 1, conceptTitle: '유혹 제거하기', conceptContent: '안 하고 싶은 것은 보이지 않게 하세요.\n\n과자가 없으면 안 먹고\n\n게임기가 없으면 안 합니다.', thinkingQuestion: '유혹이 되는 것들이 눈에 보이나요?', actionMission: '유혹 1개를 보이지 않는 곳에 숨기기', xpReward: 10, energyReward: 3 },

  // 정체성 변화
  { id: 'habit-identity-1-1', worldKey: 'habit', chapterKey: 'identity', level: 1, conceptTitle: '정체성 기반 습관', conceptContent: '"운동하는 사람"이 되면 운동이 쉬워집니다.\n\n행동이 아니라 정체성을 바꾸세요.\n\n"나는 ○○하는 사람이야"라고 생각하세요.', thinkingQuestion: '나는 어떤 사람이라고 생각하나요?', actionMission: '되고 싶은 정체성 한 문장으로 적기', xpReward: 10, energyReward: 3 },
  { id: 'habit-identity-1-2', worldKey: 'habit', chapterKey: 'identity', level: 1, conceptTitle: '작은 증거 쌓기', conceptContent: '정체성은 행동의 증거로 바뀝니다.\n\n한 번 책을 읽으면 "독서하는 사람"의 증거입니다.\n\n작은 행동을 쌓아서 정체성을 바꾸세요.', thinkingQuestion: '원하는 정체성의 증거가 있나요?', actionMission: '원하는 정체성의 작은 행동 하나 하기', xpReward: 10, energyReward: 3 },
  { id: 'habit-identity-1-3', worldKey: 'habit', chapterKey: 'identity', level: 1, conceptTitle: '그 사람처럼 행동하기', conceptContent: '롤모델처럼 행동해보세요.\n\n"그 사람이라면 어떻게 할까?"라고 물어보세요.\n\n행동을 따라하면 정체성이 따라옵니다.', thinkingQuestion: '닮고 싶은 사람이 있나요?', actionMission: '롤모델의 습관 하나 따라하기', xpReward: 10, energyReward: 3 },

  // ===== 태도 월드 =====
  // 성장 마인드셋
  { id: 'attitude-growth-1-1', worldKey: 'attitude', chapterKey: 'growth', level: 1, conceptTitle: '성장 마인드셋이란?', conceptContent: '능력은 고정된 게 아니라 키울 수 있습니다.\n\n"나는 원래 못해" 대신 "아직 못할 뿐이야"라고 생각하세요.\n\n노력하면 늘 수 있다고 믿는 것이 성장 마인드셋입니다.', thinkingQuestion: '능력은 타고나는 것이라고 생각하나요?', actionMission: '"아직"이라는 단어 3번 이상 사용하기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-growth-1-2', worldKey: 'attitude', chapterKey: 'growth', level: 1, conceptTitle: '실패는 학습이다', conceptContent: '실패는 끝이 아니라 과정입니다.\n\n"실패했네" 대신 "이제 어떻게 하면 되는지 알았네"라고 생각하세요.\n\n실패에서 배우면 성장합니다.', thinkingQuestion: '실패를 어떻게 받아들이나요?', actionMission: '최근 실패에서 배운 점 1가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-growth-1-3', worldKey: 'attitude', chapterKey: 'growth', level: 1, conceptTitle: '노력을 칭찬하기', conceptContent: '결과보다 과정과 노력을 칭찬하세요.\n\n"잘했어" 대신 "열심히 했네"\n\n이런 칭찬이 도전하는 마음을 키웁니다.', thinkingQuestion: '스스로를 어떻게 칭찬하나요?', actionMission: '오늘 노력한 자신을 칭찬하기', xpReward: 10, energyReward: 3 },

  // 회복탄력성
  { id: 'attitude-resilience-1-1', worldKey: 'attitude', chapterKey: 'resilience', level: 1, conceptTitle: '회복탄력성이란?', conceptContent: '어려움을 겪고도 다시 일어나는 힘입니다.\n\n넘어지지 않는 것이 아니라 넘어져도 일어나는 것입니다.\n\n이 힘은 연습으로 키울 수 있습니다.', thinkingQuestion: '힘든 일 후에 얼마나 빨리 회복하나요?', actionMission: '어려움을 극복한 경험 떠올리기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-resilience-1-2', worldKey: 'attitude', chapterKey: 'resilience', level: 1, conceptTitle: '감정 인정하기', conceptContent: '힘들면 힘들다고 인정하세요.\n\n감정을 억누르면 오히려 커집니다.\n\n"지금 내가 힘들구나"라고 받아들이세요.', thinkingQuestion: '힘들 때 감정을 표현하나요?', actionMission: '오늘 느낀 감정 3가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-resilience-1-3', worldKey: 'attitude', chapterKey: 'resilience', level: 1, conceptTitle: '작게 다시 시작하기', conceptContent: '큰 어려움 후엔 작게 시작하세요.\n\n다시 전부를 할 필요 없습니다.\n\n아주 작은 것부터 천천히 시작하세요.', thinkingQuestion: '어려움 후에 어떻게 다시 시작하나요?', actionMission: '미루던 것 작은 부분 하나 시작하기', xpReward: 10, energyReward: 3 },

  // 긍정 사고
  { id: 'attitude-positive-1-1', worldKey: 'attitude', chapterKey: 'positive', level: 1, conceptTitle: '긍정은 선택이다', conceptContent: '같은 상황도 다르게 볼 수 있습니다.\n\n부정적으로 볼 수도, 긍정적으로 볼 수도 있습니다.\n\n의식적으로 긍정적 면을 찾아보세요.', thinkingQuestion: '상황을 긍정적으로 보려고 노력하나요?', actionMission: '오늘 있었던 일의 긍정적 면 찾기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-positive-1-2', worldKey: 'attitude', chapterKey: 'positive', level: 1, conceptTitle: '감사 연습', conceptContent: '감사하면 긍정이 됩니다.\n\n매일 감사한 것 3가지를 적어보세요.\n\n작은 것이라도 괜찮습니다.', thinkingQuestion: '오늘 감사한 것이 있나요?', actionMission: '감사한 것 3가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-positive-1-3', worldKey: 'attitude', chapterKey: 'positive', level: 1, conceptTitle: '부정적 생각 바꾸기', conceptContent: '"안 돼" → "어떻게 하면 될까?"\n\n부정적 생각이 들면 질문으로 바꾸세요.\n\n해결책을 찾는 방향으로 생각하세요.', thinkingQuestion: '부정적 생각이 자주 드나요?', actionMission: '부정적 생각 하나를 질문으로 바꾸기', xpReward: 10, energyReward: 3 },

  // 끈기
  { id: 'attitude-grit-1-1', worldKey: 'attitude', chapterKey: 'grit', level: 1, conceptTitle: '끈기란?', conceptContent: '끈기는 포기하지 않고 계속하는 힘입니다.\n\n재능보다 중요한 게 끈기입니다.\n\n꾸준히 하는 사람이 결국 이깁니다.', thinkingQuestion: '포기하지 않고 끝까지 해본 적 있나요?', actionMission: '포기하고 싶은 것 하나 더 해보기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-grit-1-2', worldKey: 'attitude', chapterKey: 'grit', level: 1, conceptTitle: '작은 도전 이어가기', conceptContent: '큰 도전은 작은 도전의 연속입니다.\n\n한 번에 되지 않아도 계속 시도하세요.\n\n매일 조금씩 도전하면 언젠가 됩니다.', thinkingQuestion: '작은 도전을 꾸준히 하고 있나요?', actionMission: '작은 도전 하나 오늘 해보기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-grit-1-3', worldKey: 'attitude', chapterKey: 'grit', level: 1, conceptTitle: '장기 목표 기억하기', conceptContent: '힘들 때 왜 시작했는지 기억하세요.\n\n장기 목표를 눈에 보이는 곳에 두세요.\n\n이유가 분명하면 끈기가 생깁니다.', thinkingQuestion: '장기 목표가 무엇인가요?', actionMission: '장기 목표를 적어서 눈에 띄는 곳에 붙이기', xpReward: 10, energyReward: 3 },

  // 호기심
  { id: 'attitude-curiosity-1-1', worldKey: 'attitude', chapterKey: 'curiosity', level: 1, conceptTitle: '호기심의 힘', conceptContent: '호기심은 배움의 시작입니다.\n\n"왜?", "어떻게?"라고 물으면 세상이 재미있어집니다.\n\n궁금한 게 많을수록 많이 배웁니다.', thinkingQuestion: '최근에 궁금했던 게 있나요?', actionMission: '오늘 궁금한 것 하나 검색해보기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-curiosity-1-2', worldKey: 'attitude', chapterKey: 'curiosity', level: 1, conceptTitle: '질문하는 습관', conceptContent: '당연하게 여기지 말고 질문하세요.\n\n"왜 이렇게 되지?", "다르면 어떨까?"\n\n질문이 많으면 생각이 깊어집니다.', thinkingQuestion: '질문을 자주 하나요?', actionMission: '오늘 배운 것에 질문 3개 만들기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-curiosity-1-3', worldKey: 'attitude', chapterKey: 'curiosity', level: 1, conceptTitle: '새로운 것 시도하기', conceptContent: '같은 것만 하면 새로운 게 없습니다.\n\n가끔은 새로운 것을 시도해보세요.\n\n몰랐던 세상이 열립니다.', thinkingQuestion: '새로운 것을 시도하는 걸 좋아하나요?', actionMission: '평소 안 하던 것 하나 시도하기', xpReward: 10, energyReward: 3 },

  // 겸손
  { id: 'attitude-humility-1-1', worldKey: 'attitude', chapterKey: 'humility', level: 1, conceptTitle: '겸손이란?', conceptContent: '겸손은 자신을 낮추는 게 아닙니다.\n\n모르는 것을 인정하고 배우려는 태도입니다.\n\n겸손한 사람이 더 많이 배웁니다.', thinkingQuestion: '모른다고 인정하기 어려운가요?', actionMission: '"모르겠다"고 솔직하게 말하기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-humility-1-2', worldKey: 'attitude', chapterKey: 'humility', level: 1, conceptTitle: '다른 사람에게서 배우기', conceptContent: '모든 사람에게서 배울 것이 있습니다.\n\n나보다 잘하는 점을 찾아보세요.\n\n배움의 기회는 어디에나 있습니다.', thinkingQuestion: '다른 사람에게서 배우려 하나요?', actionMission: '누군가의 장점 하나 배우기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-humility-1-3', worldKey: 'attitude', chapterKey: 'humility', level: 1, conceptTitle: '피드백 환영하기', conceptContent: '피드백은 성장의 기회입니다.\n\n기분 나빠하지 말고 감사하세요.\n\n나를 발전시킬 힌트가 들어있습니다.', thinkingQuestion: '비판을 잘 받아들이나요?', actionMission: '피드백 받으면 "고마워"라고 말하기', xpReward: 10, energyReward: 3 },

  // 용기
  { id: 'attitude-courage-1-1', worldKey: 'attitude', chapterKey: 'courage', level: 1, conceptTitle: '용기란?', conceptContent: '용기는 두려움이 없는 게 아닙니다.\n\n두려워도 행동하는 것이 용기입니다.\n\n작은 용기가 쌓여서 큰 용기가 됩니다.', thinkingQuestion: '두려워서 못한 것이 있나요?', actionMission: '작은 두려움 하나 마주하기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-courage-1-2', worldKey: 'attitude', chapterKey: 'courage', level: 1, conceptTitle: '실패해도 괜찮아', conceptContent: '실패가 두려워 시도 안 하면 아무것도 없습니다.\n\n실패해도 괜찮습니다.\n\n시도하는 것 자체가 용기입니다.', thinkingQuestion: '실패가 무서워서 시도 안 한 적 있나요?', actionMission: '실패해도 괜찮은 것 하나 시도하기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-courage-1-3', worldKey: 'attitude', chapterKey: 'courage', level: 1, conceptTitle: '불편함 감수하기', conceptContent: '성장은 불편함 너머에 있습니다.\n\n편한 것만 하면 발전이 없습니다.\n\n조금 불편한 걸 선택하세요.', thinkingQuestion: '불편함을 피하려는 경향이 있나요?', actionMission: '조금 불편한 것 하나 선택하기', xpReward: 10, energyReward: 3 },

  // 감사
  { id: 'attitude-gratitude-1-1', worldKey: 'attitude', chapterKey: 'gratitude', level: 1, conceptTitle: '감사의 힘', conceptContent: '감사하면 행복해집니다.\n\n없는 것보다 있는 것에 집중하세요.\n\n작은 것에도 감사하면 마음이 풍요로워집니다.', thinkingQuestion: '평소에 감사함을 느끼나요?', actionMission: '오늘 감사한 것 3가지 적기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-gratitude-1-2', worldKey: 'attitude', chapterKey: 'gratitude', level: 1, conceptTitle: '감사 표현하기', conceptContent: '감사함을 느끼면 표현하세요.\n\n"고마워"라고 말하면 서로 기분이 좋아집니다.\n\n감사는 관계를 좋게 만듭니다.', thinkingQuestion: '감사함을 자주 표현하나요?', actionMission: '누군가에게 "고마워" 말하기', xpReward: 10, energyReward: 3 },
  { id: 'attitude-gratitude-1-3', worldKey: 'attitude', chapterKey: 'gratitude', level: 1, conceptTitle: '어려움 속 감사', conceptContent: '힘든 상황에서도 감사할 것이 있습니다.\n\n"이것 덕분에 ○○를 배웠다"라고 생각해보세요.\n\n어려움도 성장의 기회입니다.', thinkingQuestion: '힘들었던 경험에서 배운 게 있나요?', actionMission: '어려운 경험에서 얻은 것 찾기', xpReward: 10, energyReward: 3 },

  // ===== 표현 월드 =====
  // 말하기
  { id: 'expression-speaking-1-1', worldKey: 'expression', chapterKey: 'speaking', level: 1, conceptTitle: '명확하게 말하기', conceptContent: '좋은 말하기는 명확함입니다.\n\n결론부터, 핵심만, 간단하게 말하세요.\n\n복잡하게 말하면 상대가 이해하기 어렵습니다.', thinkingQuestion: '말할 때 핵심을 잘 전달하나요?', actionMission: '오늘 할 말을 한 문장으로 정리한 후 말하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-speaking-1-2', worldKey: 'expression', chapterKey: 'speaking', level: 1, conceptTitle: '상대를 생각하며 말하기', conceptContent: '듣는 사람 입장에서 생각하세요.\n\n상대가 알아들을 수 있게, 관심 있어 할 내용으로 말하세요.\n\n같은 말도 대상에 따라 다르게 하세요.', thinkingQuestion: '상대방 입장에서 말하려고 하나요?', actionMission: '상대가 이해하기 쉽게 설명하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-speaking-1-3', worldKey: 'expression', chapterKey: 'speaking', level: 1, conceptTitle: '자신감 있게 말하기', conceptContent: '자신감은 목소리에서 드러납니다.\n\n똑바로 보고, 적당한 크기로, 천천히 말하세요.\n\n자신감 있게 말하면 더 설득력이 생깁니다.', thinkingQuestion: '말할 때 자신감이 있나요?', actionMission: '눈을 보며 또박또박 말하기', xpReward: 10, energyReward: 3 },

  // 글쓰기
  { id: 'expression-writing-1-1', worldKey: 'expression', chapterKey: 'writing', level: 1, conceptTitle: '글쓰기의 기초', conceptContent: '좋은 글의 시작은 한 문장입니다.\n\n내가 전하고 싶은 핵심을 한 문장으로 적어보세요.\n\n그 문장을 중심으로 살을 붙이세요.', thinkingQuestion: '글 쓸 때 어디서부터 시작하나요?', actionMission: '오늘 느낀 점을 한 문장으로 적기', xpReward: 10, energyReward: 3 },
  { id: 'expression-writing-1-2', worldKey: 'expression', chapterKey: 'writing', level: 1, conceptTitle: '구조 잡기', conceptContent: '좋은 글은 구조가 있습니다.\n\n서론-본론-결론, 또는 문제-원인-해결\n\n구조를 먼저 잡으면 글쓰기가 쉬워집니다.', thinkingQuestion: '글 쓸 때 구조를 생각하나요?', actionMission: '짧은 글의 구조 3단계로 잡기', xpReward: 10, energyReward: 3 },
  { id: 'expression-writing-1-3', worldKey: 'expression', chapterKey: 'writing', level: 1, conceptTitle: '고쳐쓰기', conceptContent: '좋은 글은 고쳐쓰기에서 나옵니다.\n\n첫 번째 초안은 완벽할 필요 없습니다.\n\n쓰고 나서 다듬으세요.', thinkingQuestion: '쓴 글을 다시 읽어보나요?', actionMission: '쓴 글 다시 읽고 한 부분 고치기', xpReward: 10, energyReward: 3 },

  // 경청
  { id: 'expression-listening-1-1', worldKey: 'expression', chapterKey: 'listening', level: 1, conceptTitle: '듣기의 힘', conceptContent: '좋은 대화는 잘 듣는 것에서 시작됩니다.\n\n말하는 것보다 듣는 게 더 중요합니다.\n\n상대방의 말에 집중하세요.', thinkingQuestion: '대화할 때 상대 말에 집중하나요?', actionMission: '대화 중 끝까지 듣고 나서 말하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-listening-1-2', worldKey: 'expression', chapterKey: 'listening', level: 1, conceptTitle: '공감하며 듣기', conceptContent: '들으면서 상대의 감정을 느껴보세요.\n\n"그랬구나", "그래서 어땠어?"라고 반응하세요.\n\n공감받으면 더 말하고 싶어집니다.', thinkingQuestion: '상대의 감정에 공감하며 듣나요?', actionMission: '대화 중 공감 표현 3번 하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-listening-1-3', worldKey: 'expression', chapterKey: 'listening', level: 1, conceptTitle: '질문하며 듣기', conceptContent: '질문은 관심의 표현입니다.\n\n"그건 어떻게 된 거야?", "왜 그랬어?"라고 물어보세요.\n\n상대가 더 이야기하고 싶어집니다.', thinkingQuestion: '대화 중 질문을 많이 하나요?', actionMission: '대화 중 질문 2개 이상 하기', xpReward: 10, energyReward: 3 },

  // 비언어 표현
  { id: 'expression-nonverbal-1-1', worldKey: 'expression', chapterKey: 'nonverbal', level: 1, conceptTitle: '몸짓 언어', conceptContent: '말보다 몸짓이 더 많은 걸 전달합니다.\n\n표정, 자세, 손짓 모두 메시지입니다.\n\n말과 몸짓이 일치하면 더 신뢰가 갑니다.', thinkingQuestion: '말할 때 몸짓을 의식하나요?', actionMission: '대화 중 자세와 표정 신경 쓰기', xpReward: 10, energyReward: 3 },
  { id: 'expression-nonverbal-1-2', worldKey: 'expression', chapterKey: 'nonverbal', level: 1, conceptTitle: '눈 맞춤', conceptContent: '눈을 맞추면 신뢰가 생깁니다.\n\n피하면 자신 없어 보이고, 노려보면 위협적입니다.\n\n자연스럽게 3초 정도 보세요.', thinkingQuestion: '대화 중 눈을 잘 맞추나요?', actionMission: '대화할 때 눈 맞춤 연습하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-nonverbal-1-3', worldKey: 'expression', chapterKey: 'nonverbal', level: 1, conceptTitle: '표정 관리', conceptContent: '표정은 감정을 전달합니다.\n\n긍정적인 표정이 좋은 인상을 줍니다.\n\n미소는 가장 쉬운 소통 도구입니다.', thinkingQuestion: '평소 어떤 표정을 짓나요?', actionMission: '대화할 때 부드러운 표정 유지하기', xpReward: 10, energyReward: 3 },

  // 발표력
  { id: 'expression-presentation-1-1', worldKey: 'expression', chapterKey: 'presentation', level: 1, conceptTitle: '발표의 시작', conceptContent: '발표는 준비가 반입니다.\n\n무엇을 말할지 미리 정리하세요.\n\n핵심 메시지 3가지로 압축하세요.', thinkingQuestion: '발표 전에 어떻게 준비하나요?', actionMission: '다음 발표 핵심 내용 3가지 정리하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-presentation-1-2', worldKey: 'expression', chapterKey: 'presentation', level: 1, conceptTitle: '떨림 다루기', conceptContent: '발표 때 떨리는 건 자연스럽습니다.\n\n깊게 숨 쉬고, 천천히 시작하세요.\n\n몇 번 하면 점점 편해집니다.', thinkingQuestion: '발표할 때 많이 떨리나요?', actionMission: '발표 전 심호흡 3번 하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-presentation-1-3', worldKey: 'expression', chapterKey: 'presentation', level: 1, conceptTitle: '청중과 연결하기', conceptContent: '발표는 일방적으로 말하는 게 아닙니다.\n\n청중을 보고, 반응을 살피세요.\n\n질문을 던지거나 이야기를 나누세요.', thinkingQuestion: '발표할 때 청중과 소통하나요?', actionMission: '발표 중 청중에게 질문 하나 던지기', xpReward: 10, energyReward: 3 },

  // 설득력
  { id: 'expression-persuasion-1-1', worldKey: 'expression', chapterKey: 'persuasion', level: 1, conceptTitle: '설득의 기본', conceptContent: '설득은 강요가 아닙니다.\n\n상대가 "그럴 수 있겠네"라고 느끼게 하는 것입니다.\n\n상대의 입장에서 이유를 설명하세요.', thinkingQuestion: '누군가를 설득해본 적 있나요?', actionMission: '상대 입장에서 이유 설명하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-persuasion-1-2', worldKey: 'expression', chapterKey: 'persuasion', level: 1, conceptTitle: '근거 제시하기', conceptContent: '주장에는 근거가 있어야 합니다.\n\n"왜냐하면 ○○이기 때문이야"라고 말하세요.\n\n사실, 예시, 데이터가 설득력을 높입니다.', thinkingQuestion: '의견을 말할 때 이유를 말하나요?', actionMission: '의견에 근거 2가지 이상 붙이기', xpReward: 10, energyReward: 3 },
  { id: 'expression-persuasion-1-3', worldKey: 'expression', chapterKey: 'persuasion', level: 1, conceptTitle: '상대의 반대 예상하기', conceptContent: '좋은 설득은 반론을 미리 생각합니다.\n\n"이런 생각도 있겠지만..." 하고 인정한 후\n\n그래도 왜 내 주장이 맞는지 설명하세요.', thinkingQuestion: '상대의 반대 의견을 생각해보나요?', actionMission: '내 주장에 대한 반론 예상하고 답변 준비하기', xpReward: 10, energyReward: 3 },

  // 감정 표현
  { id: 'expression-emotion-1-1', worldKey: 'expression', chapterKey: 'emotion', level: 1, conceptTitle: '감정을 말로 표현하기', conceptContent: '감정은 말해야 전달됩니다.\n\n"나는 ○○해"라고 솔직하게 말하세요.\n\n표현하지 않으면 오해가 생깁니다.', thinkingQuestion: '감정을 잘 표현하나요?', actionMission: '오늘 느낀 감정을 말로 표현하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-emotion-1-2', worldKey: 'expression', chapterKey: 'emotion', level: 1, conceptTitle: '나 전달법', conceptContent: '"너 때문에"가 아니라 "나는 ○○해"라고 말하세요.\n\n상대를 비난하지 않고 내 감정을 전할 수 있습니다.\n\n갈등을 줄이는 방법입니다.', thinkingQuestion: '감정을 표현할 때 상대를 탓하나요?', actionMission: '"나는 ~해" 형식으로 감정 표현하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-emotion-1-3', worldKey: 'expression', chapterKey: 'emotion', level: 1, conceptTitle: '감정 조절하기', conceptContent: '감정은 표현하되, 조절도 필요합니다.\n\n화가 나면 잠시 멈추고 생각하세요.\n\n감정에 휘둘리지 않고 적절히 표현하세요.', thinkingQuestion: '감정이 격해지면 어떻게 하나요?', actionMission: '화나거나 슬플 때 3초 멈추기', xpReward: 10, energyReward: 3 },

  // 피드백
  { id: 'expression-feedback-1-1', worldKey: 'expression', chapterKey: 'feedback', level: 1, conceptTitle: '피드백 주기', conceptContent: '좋은 피드백은 구체적입니다.\n\n"잘했어" 대신 "이 부분이 잘했어"라고 말하세요.\n\n칭찬도, 개선점도 구체적으로 말하세요.', thinkingQuestion: '피드백을 줄 때 구체적으로 하나요?', actionMission: '구체적으로 피드백 주기', xpReward: 10, energyReward: 3 },
  { id: 'expression-feedback-1-2', worldKey: 'expression', chapterKey: 'feedback', level: 1, conceptTitle: '건설적 피드백', conceptContent: '비판만 하지 말고 대안을 제시하세요.\n\n"이건 별로야" 대신 "이렇게 하면 더 좋겠어"\n\n받는 사람이 발전할 수 있게 해주세요.', thinkingQuestion: '피드백 줄 때 대안을 함께 말하나요?', actionMission: '피드백에 대안 포함하기', xpReward: 10, energyReward: 3 },
  { id: 'expression-feedback-1-3', worldKey: 'expression', chapterKey: 'feedback', level: 1, conceptTitle: '피드백 받기', conceptContent: '피드백은 성장의 기회입니다.\n\n방어적으로 반응하지 말고 열린 마음으로 들으세요.\n\n"고마워, 참고할게"라고 말하세요.', thinkingQuestion: '피드백을 받으면 어떻게 반응하나요?', actionMission: '피드백 받으면 감사하다고 말하기', xpReward: 10, energyReward: 3 },

  // ===== 인성 월드 =====
  // 공감
  { id: 'character-empathy-1-1', worldKey: 'character', chapterKey: 'empathy', level: 1, conceptTitle: '공감이란?', conceptContent: '공감은 상대의 마음을 느끼는 것입니다.\n\n"내가 저 사람이라면 어떨까?"라고 생각하세요.\n\n이해하려고 노력하는 것이 공감의 시작입니다.', thinkingQuestion: '다른 사람의 마음을 자주 생각하나요?', actionMission: '누군가의 입장에서 생각해보기', xpReward: 10, energyReward: 3 },
  { id: 'character-empathy-1-2', worldKey: 'character', chapterKey: 'empathy', level: 1, conceptTitle: '공감 표현하기', conceptContent: '공감은 표현해야 전달됩니다.\n\n"그랬구나", "힘들었겠다"라고 말해주세요.\n\n공감받으면 마음이 편해집니다.', thinkingQuestion: '공감하는 말을 자주 하나요?', actionMission: '누군가에게 공감의 말 전하기', xpReward: 10, energyReward: 3 },
  { id: 'character-empathy-1-3', worldKey: 'character', chapterKey: 'empathy', level: 1, conceptTitle: '판단 보류하기', conceptContent: '공감하려면 판단을 멈춰야 합니다.\n\n"왜 저래?"가 아니라 "무슨 사정이 있겠지"라고 생각하세요.\n\n먼저 이해하려 하면 공감이 됩니다.', thinkingQuestion: '다른 사람을 쉽게 판단하나요?', actionMission: '판단하기 전에 상대 사정 생각하기', xpReward: 10, energyReward: 3 },

  // 존중
  { id: 'character-respect-1-1', worldKey: 'character', chapterKey: 'respect', level: 1, conceptTitle: '존중이란?', conceptContent: '존중은 상대를 소중히 여기는 것입니다.\n\n의견이 달라도, 상대의 존엄을 인정하세요.\n\n모든 사람은 존중받을 자격이 있습니다.', thinkingQuestion: '나와 다른 사람을 존중하나요?', actionMission: '다른 의견에도 존중하는 반응하기', xpReward: 10, energyReward: 3 },
  { id: 'character-respect-1-2', worldKey: 'character', chapterKey: 'respect', level: 1, conceptTitle: '말로 존중 표현하기', conceptContent: '존중은 말투에서 드러납니다.\n\n예의 바르게, 상대를 배려하며 말하세요.\n\n무시하거나 비꼬지 마세요.', thinkingQuestion: '말할 때 상대를 배려하나요?', actionMission: '존중하는 말투로 대화하기', xpReward: 10, energyReward: 3 },
  { id: 'character-respect-1-3', worldKey: 'character', chapterKey: 'respect', level: 1, conceptTitle: '경계 존중하기', conceptContent: '상대의 경계를 지켜주세요.\n\n싫다고 하면 그만하고, 원하지 않으면 강요하지 마세요.\n\n"안 돼"를 받아들이는 것이 존중입니다.', thinkingQuestion: '상대가 "싫어"라고 하면 멈추나요?', actionMission: '상대의 "아니오"를 존중하기', xpReward: 10, energyReward: 3 },

  // 정직
  { id: 'character-honesty-1-1', worldKey: 'character', chapterKey: 'honesty', level: 1, conceptTitle: '정직이란?', conceptContent: '정직은 진실을 말하는 것입니다.\n\n거짓말은 신뢰를 무너뜨립니다.\n\n어렵더라도 사실을 말하는 용기가 정직입니다.', thinkingQuestion: '진실을 말하기 어려운 적 있나요?', actionMission: '어려운 진실 하나 말하기', xpReward: 10, energyReward: 3 },
  { id: 'character-honesty-1-2', worldKey: 'character', chapterKey: 'honesty', level: 1, conceptTitle: '약속 지키기', conceptContent: '정직은 약속을 지키는 것이기도 합니다.\n\n한 말은 실천하세요.\n\n못 지킬 약속은 하지 마세요.', thinkingQuestion: '약속을 잘 지키나요?', actionMission: '오늘 한 약속 꼭 지키기', xpReward: 10, energyReward: 3 },
  { id: 'character-honesty-1-3', worldKey: 'character', chapterKey: 'honesty', level: 1, conceptTitle: '자기 자신에게 정직하기', conceptContent: '다른 사람보다 자신에게 먼저 정직하세요.\n\n자기 합리화하지 말고, 솔직히 인정하세요.\n\n진짜 성장은 자기 정직에서 시작됩니다.', thinkingQuestion: '자신에게 솔직한가요?', actionMission: '자기 합리화 하나 멈추기', xpReward: 10, energyReward: 3 },

  // 책임감
  { id: 'character-responsibility-1-1', worldKey: 'character', chapterKey: 'responsibility', level: 1, conceptTitle: '책임감이란?', conceptContent: '책임감은 맡은 일을 끝까지 하는 것입니다.\n\n핑계 대지 말고, 내 몫을 다하세요.\n\n책임지는 사람이 신뢰받습니다.', thinkingQuestion: '맡은 일을 끝까지 하나요?', actionMission: '맡은 일 끝까지 완료하기', xpReward: 10, energyReward: 3 },
  { id: 'character-responsibility-1-2', worldKey: 'character', chapterKey: 'responsibility', level: 1, conceptTitle: '실수 인정하기', conceptContent: '책임감은 실수를 인정하는 것입니다.\n\n남 탓하지 말고 "내가 잘못했어"라고 말하세요.\n\n인정해야 고칠 수 있습니다.', thinkingQuestion: '실수를 잘 인정하나요?', actionMission: '실수 하나 솔직히 인정하기', xpReward: 10, energyReward: 3 },
  { id: 'character-responsibility-1-3', worldKey: 'character', chapterKey: 'responsibility', level: 1, conceptTitle: '결과에 대한 책임', conceptContent: '결과에 대해 책임지세요.\n\n잘되면 내 덕, 안 되면 남 탓은 무책임합니다.\n\n어떤 결과든 내가 선택한 것입니다.', thinkingQuestion: '결과에 대해 책임지나요?', actionMission: '오늘 결과에 대해 책임지기', xpReward: 10, energyReward: 3 },

  // 친절
  { id: 'character-kindness-1-1', worldKey: 'character', chapterKey: 'kindness', level: 1, conceptTitle: '친절이란?', conceptContent: '친절은 다른 사람을 배려하는 것입니다.\n\n작은 친절이 큰 힘이 됩니다.\n\n친절은 주는 사람도 행복하게 합니다.', thinkingQuestion: '오늘 누군가에게 친절했나요?', actionMission: '누군가에게 작은 친절 베풀기', xpReward: 10, energyReward: 3 },
  { id: 'character-kindness-1-2', worldKey: 'character', chapterKey: 'kindness', level: 1, conceptTitle: '말의 친절', conceptContent: '친절은 말에서 시작됩니다.\n\n따뜻한 말 한마디가 하루를 바꿉니다.\n\n"고마워", "수고해", "괜찮아" 같은 말을 하세요.', thinkingQuestion: '따뜻한 말을 자주 하나요?', actionMission: '누군가에게 따뜻한 말 하기', xpReward: 10, energyReward: 3 },
  { id: 'character-kindness-1-3', worldKey: 'character', chapterKey: 'kindness', level: 1, conceptTitle: '눈에 보이지 않는 친절', conceptContent: '알리지 않고 하는 친절이 진짜입니다.\n\n아무도 안 볼 때도 선한 일을 하세요.\n\n보상을 바라지 않는 것이 진정한 친절입니다.', thinkingQuestion: '아무도 안 볼 때도 친절한가요?', actionMission: '남몰래 좋은 일 하나 하기', xpReward: 10, energyReward: 3 },

  // 협동
  { id: 'character-cooperation-1-1', worldKey: 'character', chapterKey: 'cooperation', level: 1, conceptTitle: '협동이란?', conceptContent: '협동은 함께 목표를 이루는 것입니다.\n\n혼자보다 함께가 더 큰 힘을 만듭니다.\n\n내 역할을 하고, 다른 사람을 돕는 것입니다.', thinkingQuestion: '팀에서 협력을 잘 하나요?', actionMission: '팀원 한 명 도와주기', xpReward: 10, energyReward: 3 },
  { id: 'character-cooperation-1-2', worldKey: 'character', chapterKey: 'cooperation', level: 1, conceptTitle: '역할 분담', conceptContent: '협동은 역할 분담에서 시작됩니다.\n\n각자 잘하는 걸 맡고, 책임지세요.\n\n모두가 자기 몫을 하면 함께 성공합니다.', thinkingQuestion: '팀에서 내 역할을 잘 하나요?', actionMission: '내 역할 끝까지 완료하기', xpReward: 10, energyReward: 3 },
  { id: 'character-cooperation-1-3', worldKey: 'character', chapterKey: 'cooperation', level: 1, conceptTitle: '의견 조율', conceptContent: '협동할 때 의견이 다를 수 있습니다.\n\n내 고집만 부리지 말고 들어보세요.\n\n함께 더 좋은 방법을 찾으세요.', thinkingQuestion: '팀에서 의견이 다를 때 어떻게 하나요?', actionMission: '다른 의견 들어보고 타협점 찾기', xpReward: 10, energyReward: 3 },

  // 공정
  { id: 'character-fairness-1-1', worldKey: 'character', chapterKey: 'fairness', level: 1, conceptTitle: '공정이란?', conceptContent: '공정은 편 가르지 않고 똑같이 대하는 것입니다.\n\n내 편이라고 봐주거나, 싫다고 불이익 주면 안 됩니다.\n\n규칙을 모두에게 공평하게 적용하세요.', thinkingQuestion: '모든 사람을 공평하게 대하나요?', actionMission: '오늘 누구에게나 공정하게 대하기', xpReward: 10, energyReward: 3 },
  { id: 'character-fairness-1-2', worldKey: 'character', chapterKey: 'fairness', level: 1, conceptTitle: '규칙 지키기', conceptContent: '공정의 시작은 규칙을 지키는 것입니다.\n\n나도 지키고, 다른 사람도 지키게 하세요.\n\n편법은 불공정입니다.', thinkingQuestion: '규칙을 잘 지키나요?', actionMission: '오늘 규칙 하나 제대로 지키기', xpReward: 10, energyReward: 3 },
  { id: 'character-fairness-1-3', worldKey: 'character', chapterKey: 'fairness', level: 1, conceptTitle: '불공정에 목소리 내기', conceptContent: '불공정을 보면 가만히 있지 마세요.\n\n옳은 일을 위해 목소리를 내세요.\n\n용기 있게 말하는 것이 공정을 지킵니다.', thinkingQuestion: '불공정한 상황에서 어떻게 하나요?', actionMission: '불공정한 것에 조용히라도 이의 제기하기', xpReward: 10, energyReward: 3 },

  // 봉사
  { id: 'character-service-1-1', worldKey: 'character', chapterKey: 'service', level: 1, conceptTitle: '봉사란?', conceptContent: '봉사는 대가 없이 남을 돕는 것입니다.\n\n작은 도움도 봉사입니다.\n\n봉사는 세상을 더 좋게 만듭니다.', thinkingQuestion: '대가 없이 누군가를 도운 적 있나요?', actionMission: '보상 없이 누군가 도와주기', xpReward: 10, energyReward: 3 },
  { id: 'character-service-1-2', worldKey: 'character', chapterKey: 'service', level: 1, conceptTitle: '가까운 곳에서 시작', conceptContent: '봉사는 가까운 곳에서 시작하세요.\n\n가족, 친구, 이웃을 먼저 도와주세요.\n\n멀리 갈 필요 없습니다.', thinkingQuestion: '가까운 사람을 돕고 있나요?', actionMission: '가족이나 친구 한 명 도와주기', xpReward: 10, energyReward: 3 },
  { id: 'character-service-1-3', worldKey: 'character', chapterKey: 'service', level: 1, conceptTitle: '재능으로 봉사하기', conceptContent: '잘하는 것으로 봉사할 수 있습니다.\n\n공부 잘하면 가르쳐주고, 그림 잘 그리면 그려주세요.\n\n내 재능이 누군가에게 도움이 됩니다.', thinkingQuestion: '잘하는 것으로 남을 도운 적 있나요?', actionMission: '내 재능으로 누군가 도와주기', xpReward: 10, energyReward: 3 },
]

// 콘텐츠 가져오기 헬퍼 함수들
export function getContentById(id: string): TeachingContent | undefined {
  return TEACHING_CONTENTS.find(c => c.id === id)
}

export function getContentsByWorldAndChapter(worldKey: WorldKey, chapterKey: string): TeachingContent[] {
  return TEACHING_CONTENTS.filter(c => c.worldKey === worldKey && c.chapterKey === chapterKey)
}

export function getContentsByLevel(chapterKey: string, level: number): TeachingContent[] {
  return TEACHING_CONTENTS.filter(c => c.chapterKey === chapterKey && c.level === level)
}

export function getContentsByWorld(worldKey: WorldKey): TeachingContent[] {
  return TEACHING_CONTENTS.filter(c => c.worldKey === worldKey)
}

// 레거시 호환성
export function getContentsBySubject(subjectKey: string): TeachingContent[] {
  return TEACHING_CONTENTS.filter(c => c.chapterKey === subjectKey)
}
