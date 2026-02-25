// ========================================
// AI 성장엔진 — 한국어 키워드 분석
// ========================================

/** 진로 관련 키워드 */
export const CAREER_KEYWORDS = [
  '진로', '꿈', '목표', '계획', '자격증', '대학', '미래',
  '취업', '직업', '인턴', '전공', '면접', '포트폴리오',
  '커리어', '적성', '흥미',
]

/** 공동체 관련 키워드 */
export const COMMUNITY_KEYWORDS = [
  '봉사', '도움', '친구', '가족', '소통', '관계', '협력',
  '나눔', '배려', '존중', '멘토', '선생님', '동아리',
  '팀', '함께',
]

/** 학습 관련 키워드 */
export const LEARNING_KEYWORDS = [
  '공부', '학습', '수학', '영어', '과학', '독서', '시험',
  '성적', '과제', '복습', '예습', '수업',
]

/** 습관/지속 관련 키워드 */
export const PERSISTENCE_KEYWORDS = [
  '매일', '꾸준', '루틴', '습관', '반복', '계속', '유지',
  '일찍', '규칙', '운동',
]

/** 텍스트 내 키워드 밀도 계산 (0~100) */
export function calcKeywordDensity(text: string, keywords: string[]): number {
  if (!text || text.length === 0) return 0
  let count = 0
  for (const kw of keywords) {
    if (text.includes(kw)) count++
  }
  // 키워드 대비 발견률 → 0~100
  return Math.min(100, (count / keywords.length) * 100)
}

/** 여러 텍스트의 평균 키워드 밀도 */
export function calcAvgKeywordDensity(texts: string[], keywords: string[]): number {
  if (texts.length === 0) return 0
  const densities = texts.map(t => calcKeywordDensity(t, keywords))
  return densities.reduce((a, b) => a + b, 0) / densities.length
}

/** 텍스트가 진로 관련인지 판별 */
export function isCareerRelated(text: string): boolean {
  return CAREER_KEYWORDS.some(kw => text.includes(kw))
}

/** 텍스트가 공동체 관련인지 판별 */
export function isCommunityRelated(text: string): boolean {
  return COMMUNITY_KEYWORDS.some(kw => text.includes(kw))
}

/** 답변 텍스트 깊이 점수 (길이 + 키워드 조합, 0~100) */
export function calcAnswerDepth(text: string): number {
  if (!text) return 0
  const lengthScore = Math.min(50, (text.length / 200) * 50)
  const hasReflection = ['느낀', '배운', '깨달', '생각', '이유'].some(kw => text.includes(kw))
  const reflectionBonus = hasReflection ? 25 : 0
  const hasSpecific = ['때문', '예를 들어', '구체적', '실제로'].some(kw => text.includes(kw))
  const specificBonus = hasSpecific ? 25 : 0
  return Math.min(100, lengthScore + reflectionBonus + specificBonus)
}
