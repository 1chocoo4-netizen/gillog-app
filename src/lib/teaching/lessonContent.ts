// 듀오링고 스타일 레슨 콘텐츠 정의

export interface LessonStep {
  type: 'message' | 'question' | 'action'
  character?: string  // 캐릭터 대사일 경우
  message?: string    // 표시할 메시지
  question?: string   // 질문
  options?: string[]  // 선택지
  correctIndex?: number  // 정답 인덱스 (선택형일 경우)
  explanation?: string   // 정답 후 설명
  placeholder?: string   // 텍스트 입력 placeholder
}

export interface LessonData {
  id: string
  subjectKey: string
  chapterNumber: number
  title: string
  characterName: string
  characterEmoji: string
  characterColor: string  // 캐릭터 테마 색상
  steps: LessonStep[]
}

// 인문 Chapter 1: 사실과 해석은 다르다
export const HUMANITIES_CHAPTER_1: LessonData = {
  id: 'humanities-ch1',
  subjectKey: 'humanities',
  chapterNumber: 1,
  title: '사실과 해석은 다르다',
  characterName: '소피아',
  characterEmoji: '📚',
  characterColor: '#8B5CF6',  // violet
  steps: [
    {
      type: 'message',
      character: '소피아',
      message: '안녕! 나는 인문학을 안내하는 소피아야. 📚\n\n오늘은 정말 중요한 것을 알려줄게.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '바로 "사실"과 "해석"은 다르다는 거야!',
    },
    {
      type: 'message',
      character: '소피아',
      message: '예를 들어볼게.\n\n🌧️ "비가 온다"\n\n이건 사실이야. 누가 봐도 같은 현상이지.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '하지만...\n\n😢 "비가 와서 우울하다"\n☔ "비가 와서 시원하다"\n\n이건 해석이야! 같은 비를 보고도 사람마다 다르게 느끼거든.',
    },
    {
      type: 'question',
      question: '다음 중 "사실"은 어떤 것일까?',
      options: [
        '오늘 날씨가 좋다',
        '기온이 25도이다',
        '친구가 착하다',
        '이 음식이 맛있다',
      ],
      correctIndex: 1,
      explanation: '정답! 🎉\n\n"기온이 25도이다"는 객관적으로 측정 가능한 사실이야.\n\n나머지는 모두 개인의 판단이 들어간 해석이지.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '왜 이게 중요할까?\n\n우리는 종종 자신의 "해석"을 "사실"이라고 착각해.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '"걔가 나를 무시했어" ← 이건 사실일까, 해석일까?\n\n사실은 "걔가 인사를 안 했다"일 수 있어.\n"무시했다"는 내 해석이지.',
    },
    {
      type: 'question',
      question: '"친구가 나를 싫어하는 것 같아"는 무엇일까?',
      options: [
        '사실이다',
        '해석이다',
      ],
      correctIndex: 1,
      explanation: '맞아! 👏\n\n"~것 같다"가 들어가면 대부분 해석이야.\n\n친구의 진짜 마음은 물어봐야 알 수 있지.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '사실과 해석을 구분하면...\n\n✨ 오해가 줄어들어\n✨ 더 객관적으로 생각할 수 있어\n✨ 감정에 휘둘리지 않아',
    },
    {
      type: 'question',
      question: '오늘 배운 것을 언제 활용할 수 있을까?',
      options: [
        '친구와 다툴 때',
        '뉴스를 볼 때',
        '감정이 상할 때',
        '위의 모든 상황',
      ],
      correctIndex: 3,
      explanation: '완벽해! 🌟\n\n모든 상황에서 "이건 사실인가, 내 해석인가?"를 생각해보면 도움이 돼.',
    },
    {
      type: 'message',
      character: '소피아',
      message: '자, 이제 실천할 시간이야!\n\n오늘 하루 동안 "내가 한 해석"을 하나 찾아볼까?',
    },
    {
      type: 'action',
      question: '오늘 실천할 것을 적어줘',
      placeholder: '예: 오늘 있었던 일 중 "사실"과 "내 해석"을 구분해보기',
    },
  ],
}

// 과목별 레슨 데이터 맵
export const LESSON_DATA: Record<string, LessonData[]> = {
  humanities: [HUMANITIES_CHAPTER_1],
  // 다른 과목들도 추가 가능
}

export function getLessonData(subjectKey: string, chapterNumber: number): LessonData | null {
  const lessons = LESSON_DATA[subjectKey]
  if (!lessons) return null
  return lessons.find(l => l.chapterNumber === chapterNumber) || null
}
