// Direct SQLite seed using better-sqlite3 (CommonJS)
const Database = require('better-sqlite3')
const { randomBytes } = require('crypto')

const db = new Database('./dev.db')

// Generate CUID-like ID
function cuid() {
  return 'c' + randomBytes(12).toString('hex').slice(0, 24)
}

// 6개 월드 데이터
const WORLDS_DATA = [
  {
    key: 'cognition',
    title: '인지',
    subtitle: '나를 이해하기',
    description: '자신의 감정, 생각, 행동 패턴을 인식하고 이해하는 능력',
    colorHex: '#8b5cf6',
    icon: '🧠',
    order: 1,
    coach: { name: '민서 코치', tagline: '네 안의 목소리를 들어볼까?', avatarSeed: 'minsu-cognition' },
    lessons: [
      { title: '나의 감정 알아차리기', subtitle: '오늘 느낀 감정은?' },
      { title: '생각 패턴 발견하기', subtitle: '자주 하는 생각들' },
      { title: '행동 돌아보기', subtitle: '나의 습관적 행동' },
      { title: '감정과 생각 연결하기', subtitle: '왜 그렇게 느꼈을까?' },
      { title: '나만의 패턴 정리하기', subtitle: '인지 월드 마무리' },
    ],
    questions: [
      { prompt: '오늘 가장 강하게 느낀 감정은 무엇인가요?', type: 'text', order: 1 },
      { prompt: '그 감정을 느꼈을 때, 어떤 생각이 들었나요?', type: 'text', order: 2 },
      { prompt: '비슷한 상황에서 자주 느끼는 감정인가요?', type: 'choice', options: ['네, 자주 느껴요', '가끔 느껴요', '처음 느꼈어요'], order: 3 },
      { prompt: '이 감정에 대해 스스로 어떻게 평가하나요?', type: 'scale', order: 4 },
    ],
  },
  {
    key: 'selfDirected',
    title: '자기주도',
    subtitle: '스스로 결정하기',
    description: '목표를 세우고 스스로 계획하며 실행하는 능력',
    colorHex: '#06b6d4',
    icon: '🎯',
    order: 2,
    coach: { name: '지우 코치', tagline: '네가 원하는 건 뭐야?', avatarSeed: 'jiwoo-selfdirected' },
    lessons: [
      { title: '나의 목표 정하기', subtitle: '무엇을 이루고 싶어?' },
      { title: '작은 목표로 나누기', subtitle: '한 걸음씩 나아가기' },
      { title: '실행 계획 세우기', subtitle: '언제, 어떻게?' },
      { title: '장애물 예상하기', subtitle: '어려움에 대비하기' },
      { title: '목표 점검하기', subtitle: '자기주도 월드 마무리' },
    ],
    questions: [
      { prompt: '이번 주에 이루고 싶은 목표가 있나요?', type: 'text', order: 1 },
      { prompt: '그 목표가 중요한 이유는 무엇인가요?', type: 'text', order: 2 },
      { prompt: '목표를 위해 첫 번째로 할 일은?', type: 'text', order: 3 },
      { prompt: '목표 달성 자신감은 어느 정도인가요?', type: 'scale', order: 4 },
    ],
  },
  {
    key: 'habit',
    title: '습관',
    subtitle: '꾸준히 실천하기',
    description: '좋은 습관을 형성하고 유지하는 능력',
    colorHex: '#22c55e',
    icon: '🔄',
    order: 3,
    coach: { name: '하린 코치', tagline: '오늘도 한 걸음!', avatarSeed: 'harin-habit' },
    lessons: [
      { title: '현재 습관 점검하기', subtitle: '나의 일상 돌아보기' },
      { title: '만들고 싶은 습관', subtitle: '새로운 시작' },
      { title: '작게 시작하기', subtitle: '2분 규칙' },
      { title: '트리거 만들기', subtitle: '습관 연결하기' },
      { title: '습관 유지하기', subtitle: '습관 월드 마무리' },
    ],
    questions: [
      { prompt: '매일 빠지지 않고 하는 일이 있나요?', type: 'text', order: 1 },
      { prompt: '새로 만들고 싶은 습관이 있다면?', type: 'text', order: 2 },
      { prompt: '습관을 유지하기 어려웠던 경험이 있나요?', type: 'text', order: 3 },
      { prompt: '꾸준함에 대한 자신감은?', type: 'scale', order: 4 },
    ],
  },
  {
    key: 'attitude',
    title: '태도',
    subtitle: '긍정적으로 바라보기',
    description: '어려움 속에서도 긍정적인 마음가짐을 유지하는 능력',
    colorHex: '#f59e0b',
    icon: '✨',
    order: 4,
    coach: { name: '서연 코치', tagline: '어떤 상황에서도 빛나는 너', avatarSeed: 'seoyeon-attitude' },
    lessons: [
      { title: '나의 시선 점검하기', subtitle: '어떻게 바라보고 있나요?' },
      { title: '다른 관점 찾기', subtitle: '새로운 시각으로' },
      { title: '감사한 것 발견하기', subtitle: '작은 것에서 시작' },
      { title: '회복력 키우기', subtitle: '다시 일어서는 힘' },
      { title: '긍정 마인드 만들기', subtitle: '태도 월드 마무리' },
    ],
    questions: [
      { prompt: '오늘 감사한 일이 있었나요?', type: 'text', order: 1 },
      { prompt: '어려운 상황에서 어떤 생각이 드나요?', type: 'text', order: 2 },
      { prompt: '힘든 일을 겪고 회복한 경험이 있나요?', type: 'text', order: 3 },
      { prompt: '전반적인 마음 상태는 어떤가요?', type: 'scale', order: 4 },
    ],
  },
  {
    key: 'expression',
    title: '표현',
    subtitle: '생각을 나누기',
    description: '자신의 생각과 감정을 명확하게 전달하는 능력',
    colorHex: '#ec4899',
    icon: '💬',
    order: 5,
    coach: { name: '도윤 코치', tagline: '네 이야기를 들려줘', avatarSeed: 'doyoon-expression' },
    lessons: [
      { title: '나의 이야기 시작하기', subtitle: '무엇을 말하고 싶어?' },
      { title: '감정 표현하기', subtitle: '느끼는 대로' },
      { title: '의견 말하기', subtitle: '나는 이렇게 생각해' },
      { title: '경청하기', subtitle: '듣는 것도 표현' },
      { title: '소통 능력 키우기', subtitle: '표현 월드 마무리' },
    ],
    questions: [
      { prompt: '오늘 누군가에게 하고 싶었던 말이 있나요?', type: 'text', order: 1 },
      { prompt: '말하기 어려웠던 적이 있다면 언제인가요?', type: 'text', order: 2 },
      { prompt: '나의 의견을 잘 전달한 경험이 있나요?', type: 'text', order: 3 },
      { prompt: '표현력에 대한 자신감은?', type: 'scale', order: 4 },
    ],
  },
  {
    key: 'character',
    title: '인성',
    subtitle: '함께 성장하기',
    description: '타인을 존중하고 책임감 있게 행동하는 능력',
    colorHex: '#6366f1',
    icon: '💜',
    order: 6,
    coach: { name: '예준 코치', tagline: '함께라서 더 빛나는 우리', avatarSeed: 'yejun-character' },
    lessons: [
      { title: '관계 돌아보기', subtitle: '나와 주변 사람들' },
      { title: '존중하기', subtitle: '다름을 인정하기' },
      { title: '책임감 키우기', subtitle: '내가 할 수 있는 일' },
      { title: '배려하기', subtitle: '작은 친절의 힘' },
      { title: '함께 성장하기', subtitle: '인성 월드 마무리' },
    ],
    questions: [
      { prompt: '최근 누군가를 도와준 적이 있나요?', type: 'text', order: 1 },
      { prompt: '고마웠던 사람이 있다면 누구인가요?', type: 'text', order: 2 },
      { prompt: '책임감을 느꼈던 경험이 있나요?', type: 'text', order: 3 },
      { prompt: '관계에 대한 만족도는?', type: 'scale', order: 4 },
    ],
  },
]

console.log('🌱 시드 데이터 생성 시작...')

// 트랜잭션으로 실행
const seedData = db.transaction(() => {
  // 기존 데이터 삭제
  db.exec(`
    DELETE FROM Answer;
    DELETE FROM ReportEntry;
    DELETE FROM LessonSession;
    DELETE FROM Question;
    DELETE FROM LessonNode;
    DELETE FROM Coach;
    DELETE FROM StatSnapshot;
    DELETE FROM RewardEvent;
    DELETE FROM UserBadge;
    DELETE FROM Checkin;
    DELETE FROM Quest;
    DELETE FROM Badge;
    DELETE FROM World;
    DELETE FROM User;
  `)
  console.log('✅ 기존 데이터 정리 완료')

  // 사용자 생성
  const userId = cuid()
  const now = new Date().toISOString()
  db.prepare(`
    INSERT INTO User (id, email, name, role, xp, level, streakDays, lastActiveAt, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(userId, 'student@gillog.com', '길로', 'student', 250, 3, 7, now, now, now)
  console.log('✅ 테스트 사용자 생성: 길로')

  // 월드 생성
  for (const worldData of WORLDS_DATA) {
    const worldId = cuid()
    db.prepare(`
      INSERT INTO World (id, key, title, subtitle, description, colorHex, icon, "order")
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(worldId, worldData.key, worldData.title, worldData.subtitle, worldData.description, worldData.colorHex, worldData.icon, worldData.order)

    // 코치 생성
    const coachId = cuid()
    db.prepare(`
      INSERT INTO Coach (id, worldId, name, tagline, avatarSeed)
      VALUES (?, ?, ?, ?, ?)
    `).run(coachId, worldId, worldData.coach.name, worldData.coach.tagline, worldData.coach.avatarSeed)

    // 레슨 노드 생성
    for (let i = 0; i < worldData.lessons.length; i++) {
      const lesson = worldData.lessons[i]
      const lessonId = cuid()
      db.prepare(`
        INSERT INTO LessonNode (id, worldId, "order", title, subtitle, isLocked, xpReward)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(lessonId, worldId, i + 1, lesson.title, lesson.subtitle, i > 0 ? 1 : 0, 20)
    }

    // 질문 생성
    for (const q of worldData.questions) {
      const questionId = cuid()
      db.prepare(`
        INSERT INTO Question (id, worldId, coachId, prompt, type, optionsJson, "order")
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).run(questionId, worldId, coachId, q.prompt, q.type, q.options ? JSON.stringify(q.options) : null, q.order)
    }

    // 성장 지표 스냅샷
    const snapshotId = cuid()
    db.prepare(`
      INSERT INTO StatSnapshot (id, userId, worldId, worldKey, level0to4, confidence0to1, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(snapshotId, userId, worldId, worldData.key, worldData.order <= 2 ? 1 : 0, 0.5, now)

    console.log(`✅ ${worldData.title} 월드 생성 완료 (코치: ${worldData.coach.name}, 레슨 ${worldData.lessons.length}개, 질문 ${worldData.questions.length}개)`)
  }

  // 배지 생성
  const badges = [
    { name: '첫 발걸음', description: '첫 레슨 완료!', category: 'special', requirement: '{"type":"lesson","count":1}' },
    { name: '3일 연속', description: '3일 연속 학습!', category: 'streak', requirement: '{"type":"streak","days":3}' },
    { name: '7일 연속', description: '7일 연속 학습!', category: 'streak', requirement: '{"type":"streak","days":7}' },
    { name: '인지 탐험가', description: '인지 월드 완료!', category: 'world', requirement: '{"type":"world","key":"cognition"}' },
    { name: '자기주도 탐험가', description: '자기주도 월드 완료!', category: 'world', requirement: '{"type":"world","key":"selfDirected"}' },
  ]

  for (const badge of badges) {
    const badgeId = cuid()
    db.prepare(`
      INSERT INTO Badge (id, name, description, category, requirement)
      VALUES (?, ?, ?, ?, ?)
    `).run(badgeId, badge.name, badge.description, badge.category, badge.requirement)
  }
  console.log(`✅ ${badges.length}개 배지 생성 완료`)
})

try {
  seedData()
  console.log('\n🎉 시드 데이터 생성 완료!')
  console.log('\n📋 테스트 계정: student@gillog.com')
  console.log('📋 6개 월드, 30개 레슨, 24개 질문 생성됨')
} catch (error) {
  console.error('❌ 시드 에러:', error)
  process.exit(1)
} finally {
  db.close()
}
