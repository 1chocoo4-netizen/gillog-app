// B2B 대시보드 데모용 샘플 데이터 (실행 횟수 마일스톤 기반)
import type { DemoUser, PeriodMetrics, RegisteredUser } from './types'

/**
 * 마일스톤별 데모 데이터
 * 기준: 1,000회 실행 ≈ 100점 (ISO 30414 기반 완성된 인재)
 * - 5회: 시작 단계 (종합 4~8점)
 * - 100회: 기초 형성 (종합 22~30점)
 * - 500회: 성장 중반 (종합 52~60점)
 * - 1000회: 숙련 단계 (종합 85~95점)
 */
export const DEMO_MILESTONE_DATA: Record<string, { current: PeriodMetrics; previous: PeriodMetrics | null }> = {
  '5': {
    current: {
      period: '실행 5회',
      scores: {
        initiative: 8,
        consistency: 3,
        reflectiveness: 5,
        adaptability: 4,
        collaboration: 6,
        goalClarity: 5,
        emotionalAware: 3,
        growthMindset: 10,
      },
      overallScore: 6,
    },
    previous: null,
  },
  '100': {
    current: {
      period: '실행 100회',
      scores: {
        initiative: 28,
        consistency: 22,
        reflectiveness: 20,
        adaptability: 18,
        collaboration: 25,
        goalClarity: 24,
        emotionalAware: 15,
        growthMindset: 32,
      },
      overallScore: 23,
    },
    previous: {
      period: '실행 5회',
      scores: {
        initiative: 8,
        consistency: 3,
        reflectiveness: 5,
        adaptability: 4,
        collaboration: 6,
        goalClarity: 5,
        emotionalAware: 3,
        growthMindset: 10,
      },
      overallScore: 6,
    },
  },
  '500': {
    current: {
      period: '실행 500회',
      scores: {
        initiative: 62,
        consistency: 55,
        reflectiveness: 48,
        adaptability: 52,
        collaboration: 58,
        goalClarity: 54,
        emotionalAware: 42,
        growthMindset: 65,
      },
      overallScore: 55,
    },
    previous: {
      period: '실행 100회',
      scores: {
        initiative: 28,
        consistency: 22,
        reflectiveness: 20,
        adaptability: 18,
        collaboration: 25,
        goalClarity: 24,
        emotionalAware: 15,
        growthMindset: 32,
      },
      overallScore: 23,
    },
  },
  '1000': {
    current: {
      period: '실행 1,000회',
      scores: {
        initiative: 92,
        consistency: 88,
        reflectiveness: 82,
        adaptability: 85,
        collaboration: 90,
        goalClarity: 87,
        emotionalAware: 78,
        growthMindset: 95,
      },
      overallScore: 87,
    },
    previous: {
      period: '실행 500회',
      scores: {
        initiative: 62,
        consistency: 55,
        reflectiveness: 48,
        adaptability: 52,
        collaboration: 58,
        goalClarity: 54,
        emotionalAware: 42,
        growthMindset: 65,
      },
      overallScore: 55,
    },
  },
}

export const DEMO_USER: DemoUser = {
  id: 'demo-user-001',
  name: '김실행',
  current: DEMO_MILESTONE_DATA['500'].current,
  previous: DEMO_MILESTONE_DATA['500'].previous!,
}

/** AI 인사이트 데모 (지표별 한 줄 코멘트) */
export const DEMO_INSIGHTS: Record<string, string> = {
  initiative: '자기주도 과제 설정 빈도가 꾸준히 증가하고 있습니다.',
  consistency: '주 4회 이상 실행 습관이 안정적으로 유지되고 있습니다.',
  reflectiveness: '성찰 기록의 평균 길이와 깊이가 점진적으로 향상 중입니다.',
  adaptability: '새로운 영역 실행 비율이 상승하며 유연성이 높아졌습니다.',
  collaboration: '팀 과제 참여율이 가장 높은 지표로, 강점 영역입니다.',
  goalClarity: '목표 달성률이 꾸준한 개선세를 보입니다.',
  emotionalAware: '감정 체크인 활용이 늘어나며 인식력이 향상되고 있습니다.',
  growthMindset: '가장 높은 점수! 도전적 과제 선택 비율이 85%입니다.',
}

/** 스파크라인용 추이 데모 데이터 (100회→500회 구간 성장 곡선) */
export const DEMO_SPARKLINE: Record<string, number[]> = {
  initiative: [28, 33, 38, 42, 48, 53, 58, 62],
  consistency: [22, 26, 30, 35, 40, 45, 50, 55],
  reflectiveness: [20, 24, 28, 32, 36, 40, 44, 48],
  adaptability: [18, 23, 28, 33, 38, 43, 48, 52],
  collaboration: [25, 29, 33, 38, 43, 48, 53, 58],
  goalClarity: [24, 28, 32, 36, 40, 45, 50, 54],
  emotionalAware: [15, 19, 23, 27, 31, 35, 38, 42],
  growthMindset: [32, 36, 40, 45, 50, 55, 60, 65],
}

/** 데모용 등록 사용자 리스트 */
export const DEMO_REGISTERED_USERS: RegisteredUser[] = [
  { userId: 'demo-001', name: '김실행', email: 'kim@example.com', consentStatus: 'APPROVED', executionCount: 523 },
  { userId: 'demo-002', name: '이성장', email: 'lee@example.com', consentStatus: 'APPROVED', executionCount: 128 },
  { userId: 'demo-003', name: '박도전', email: 'park@example.com', consentStatus: 'PENDING', executionCount: 45 },
  { userId: 'demo-004', name: '최꾸준', email: 'choi@example.com', consentStatus: 'APPROVED', executionCount: 7 },
]
