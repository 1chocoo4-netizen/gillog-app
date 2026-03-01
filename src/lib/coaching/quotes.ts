// THE GLORY 코칭 모델 — 명언 데이터

export interface Quote {
  text: string
  author: string
  category: 'emotion' | 'action' | 'meaning' | 'growth'
}

export const GLORY_QUOTES: Quote[] = [
  // 감정 (emotion)
  { text: '감정을 인정하는 것이 변화의 시작이다.', author: 'Daniel Goleman', category: 'emotion' },
  { text: '자기 감정을 이해하는 사람이 타인도 이해할 수 있다.', author: 'Daniel Goleman', category: 'emotion' },
  { text: '감정은 삶의 나침반이다. 무시하지 말고 따라가 보라.', author: 'Brené Brown', category: 'emotion' },
  { text: '취약함을 드러내는 것은 약함이 아니라 용기다.', author: 'Brené Brown', category: 'emotion' },
  { text: '마음이 가리키는 방향에 답이 있다.', author: '법정', category: 'emotion' },
  { text: '고통 속에서도 의미를 찾는 사람은 무너지지 않는다.', author: 'Viktor Frankl', category: 'emotion' },
  { text: '감사는 가장 강력한 긍정 감정이다.', author: 'Robert Emmons', category: 'emotion' },
  { text: '행복은 목적지가 아니라 여행의 방식이다.', author: 'Margaret Lee Runbeck', category: 'emotion' },

  // 실행 (action)
  { text: '작은 행동이 큰 변화를 만든다.', author: 'James Clear', category: 'action' },
  { text: '동기는 행동을 시작하게 하지만, 습관이 행동을 지속하게 한다.', author: 'Jim Ryun', category: 'action' },
  { text: '완벽한 때를 기다리지 마라. 지금이 바로 그때다.', author: 'Napoleon Hill', category: 'action' },
  { text: '1%의 개선이 쌓이면 놀라운 결과를 만든다.', author: 'James Clear', category: 'action' },
  { text: '실행 없는 비전은 꿈에 불과하고, 비전 없는 실행은 시간 낭비다.', author: 'Joel A. Barker', category: 'action' },
  { text: '목표를 향한 가장 작은 한 걸음이 가장 중요하다.', author: 'John Whitmore', category: 'action' },
  { text: '변화를 원한다면, 먼저 행동을 바꿔라.', author: 'William James', category: 'action' },
  { text: '오늘 할 수 있는 일을 내일로 미루지 마라.', author: 'Benjamin Franklin', category: 'action' },
  { text: '시작이 반이다. 나머지 반은 꾸준함이다.', author: '한국 속담', category: 'action' },
  { text: '성공은 매일 반복되는 작은 노력의 합이다.', author: 'Robert Collier', category: 'action' },

  // 의미 (meaning)
  { text: '삶의 의미를 찾는 것이 아니라, 삶에 의미를 부여하는 것이다.', author: 'Viktor Frankl', category: 'meaning' },
  { text: '인간의 가장 깊은 욕구는 의미 있는 삶을 사는 것이다.', author: 'Viktor Frankl', category: 'meaning' },
  { text: '왜(Why)를 아는 사람은 어떤 어떻게(How)도 견딜 수 있다.', author: 'Friedrich Nietzsche', category: 'meaning' },
  { text: '자기 결정이야말로 진정한 동기의 원천이다.', author: 'Edward Deci', category: 'meaning' },
  { text: '내적 동기에서 비롯된 행동이 가장 오래간다.', author: 'Edward Deci', category: 'meaning' },
  { text: '목적이 있는 삶은 방향이 있는 배와 같다.', author: 'Thomas Carlyle', category: 'meaning' },
  { text: '의미를 찾은 사람은 고통도 견딜 수 있다.', author: 'Viktor Frankl', category: 'meaning' },
  { text: '나다운 삶을 사는 것이 가장 큰 성공이다.', author: 'Ralph Waldo Emerson', category: 'meaning' },

  // 성장 (growth)
  { text: '코칭은 사람의 잠재력을 열어주는 열쇠다.', author: 'John Whitmore', category: 'growth' },
  { text: '성장은 편안함의 끝에서 시작된다.', author: 'Neale Donald Walsch', category: 'growth' },
  { text: '배움을 멈추는 순간 성장도 멈춘다.', author: 'Albert Einstein', category: 'growth' },
  { text: '어제의 나보다 나은 오늘의 내가 되는 것, 그것이 성장이다.', author: 'John C. Maxwell', category: 'growth' },
  { text: '실패는 성장의 비료다.', author: 'Carol Dweck', category: 'growth' },
  { text: '성장 마인드셋을 가진 사람은 도전을 기회로 본다.', author: 'Carol Dweck', category: 'growth' },
  { text: '자기 자신을 아는 것이 모든 지혜의 시작이다.', author: 'Aristotle', category: 'growth' },
  { text: '성찰 없는 삶은 살 가치가 없다.', author: 'Socrates', category: 'growth' },
  { text: '변화의 비밀은 낡은 것과 싸우는 데 에너지를 쏟는 것이 아니라 새것을 만드는 데 집중하는 것이다.', author: 'Socrates', category: 'growth' },
  { text: '우리가 두려워해야 할 것은 두려움 그 자체뿐이다.', author: 'Franklin D. Roosevelt', category: 'growth' },
]
