// ─── 안전 단어 사전 ───
// 실행 텍스트에서 뽑아도 개인정보가 아닌 일반적 단어들
// pattern → 힌트에 노출할 라벨

export const SAFE_WORDS: { pattern: RegExp; label: string; group: string }[] = [
  // 과목
  { pattern: /수학/, label: '수학', group: 'subject' },
  { pattern: /영어/, label: '영어', group: 'subject' },
  { pattern: /국어/, label: '국어', group: 'subject' },
  { pattern: /과학/, label: '과학', group: 'subject' },
  { pattern: /사회/, label: '사회', group: 'subject' },
  { pattern: /역사/, label: '역사', group: 'subject' },
  { pattern: /코딩|프로그래밍/, label: '코딩', group: 'subject' },
  // 학습 활동
  { pattern: /독서|책 읽|책을 읽/, label: '독서', group: 'activity' },
  { pattern: /문제.*풀|풀었|풀기/, label: '문제풀이', group: 'activity' },
  { pattern: /암기|외우|외웠/, label: '암기', group: 'activity' },
  { pattern: /노트 ?정리|필기/, label: '노트정리', group: 'activity' },
  { pattern: /발표/, label: '발표', group: 'activity' },
  // 신체·건강
  { pattern: /축구/, label: '축구', group: 'physical' },
  { pattern: /농구/, label: '농구', group: 'physical' },
  { pattern: /수영/, label: '수영', group: 'physical' },
  { pattern: /달리기|조깅|러닝/, label: '달리기', group: 'physical' },
  { pattern: /스트레칭/, label: '스트레칭', group: 'physical' },
  { pattern: /산책/, label: '산책', group: 'physical' },
  { pattern: /운동/, label: '운동', group: 'physical' },
  { pattern: /자전거/, label: '자전거', group: 'physical' },
  // 창작·취미
  { pattern: /피아노/, label: '피아노', group: 'hobby' },
  { pattern: /기타 ?연주|기타를/, label: '기타 연주', group: 'hobby' },
  { pattern: /노래/, label: '노래', group: 'hobby' },
  { pattern: /그림/, label: '그림', group: 'hobby' },
  { pattern: /만들기|공작/, label: '만들기', group: 'hobby' },
  { pattern: /요리/, label: '요리', group: 'hobby' },
  { pattern: /글쓰기|글 ?쓰/, label: '글쓰기', group: 'hobby' },
  // 생활 습관
  { pattern: /정리 ?정돈|방 ?정리|책상 ?정리/, label: '정리정돈', group: 'habit' },
  { pattern: /청소/, label: '청소', group: 'habit' },
  { pattern: /일찍 ?일어|기상/, label: '아침 기상', group: 'habit' },
  { pattern: /일기/, label: '일기', group: 'habit' },
  { pattern: /계획.*세|세.*계획|계획 ?짜/, label: '계획 세우기', group: 'habit' },
  // 관계
  { pattern: /대화/, label: '대화', group: 'relation' },
  { pattern: /양보/, label: '양보', group: 'relation' },
  { pattern: /배려/, label: '배려', group: 'relation' },
  { pattern: /봉사/, label: '봉사활동', group: 'relation' },
  { pattern: /인사/, label: '인사', group: 'relation' },
  { pattern: /칭찬/, label: '칭찬', group: 'relation' },
  { pattern: /경청|들어 ?주/, label: '경청', group: 'relation' },
  // 태도·정서
  { pattern: /도전/, label: '도전', group: 'attitude' },
  { pattern: /반성|돌아보/, label: '자기반성', group: 'attitude' },
  { pattern: /감사/, label: '감사 표현', group: 'attitude' },
  { pattern: /참[았고을]/, label: '인내', group: 'attitude' },
  { pattern: /포기.*않|끝까지/, label: '끈기', group: 'attitude' },
  { pattern: /새로[운운]|처음/, label: '새로운 도전', group: 'attitude' },
]

// 힌트 영역별 매핑: 어떤 group의 단어가 어떤 힌트에 들어가는지
export const HINT_GROUPS: Record<string, string[]> = {
  learning: ['subject', 'activity', 'hobby'],       // 학습 힌트
  relationship: ['relation', 'physical'],            // 관계 힌트 (physical은 같이 하는 활동)
  attitude: ['attitude', 'habit'],                   // 태도 힌트
}

/** 텍스트에서 {label, group} 쌍으로 안전 단어 추출 */
export function pickSafeWordsWithGroup(text: string): { label: string; group: string }[] {
  if (!text || text.length < 3) return []
  const found: { label: string; group: string }[] = []
  const seenLabels = new Set<string>()
  for (const sw of SAFE_WORDS) {
    if (sw.pattern.test(text) && !seenLabels.has(sw.label)) {
      seenLabels.add(sw.label)
      found.push({ label: sw.label, group: sw.group })
    }
  }
  return found
}

/**
 * 여러 텍스트에서 특정 group에 속하는 단어만 뽑아 빈도순 상위 N개
 */
export function getTopWordsByGroups(texts: string[], groups: string[], limit: number): string[] {
  const counts = new Map<string, number>()
  for (const t of texts) {
    for (const { label, group } of pickSafeWordsWithGroup(t)) {
      if (groups.includes(group)) {
        counts.set(label, (counts.get(label) || 0) + 1)
      }
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word)
}

/** 단어 목록 → 자연스러운 나열 ("수학, 독서 등") */
export function joinWords(words: string[]): string {
  if (words.length === 0) return ''
  if (words.length === 1) return words[0]
  return words.join(', ') + ' 등'
}
