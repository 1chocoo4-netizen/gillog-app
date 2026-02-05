# 길로그 (Gillog)

AI 화상 아바타 코칭 + 성장 이력관리 웹앱

> 듀오링고처럼 게임처럼 재미있게 성장하는 나만의 여정

## 기술 스택

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS
- **Database**: SQLite + Prisma 7.x
- **Adapter**: better-sqlite3

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 데이터베이스 설정

```bash
# 마이그레이션 실행 (이미 완료됨)
npm run db:migrate

# Prisma Client 생성 (이미 완료됨)
npx prisma generate
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 주요 페이지

| 경로 | 설명 |
|------|------|
| `/login` | 로그인 페이지 |
| `/app` | 홈/맵 (메인 화면) |
| `/session/[id]` | AI 코칭 세션 |
| `/checkin` | 오늘의 체크인 |
| `/dashboard` | 성장 리포트/대시보드 |

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── login/
│   ├── app/                # 홈/맵
│   ├── session/[id]/       # 코칭 세션
│   ├── checkin/
│   └── dashboard/
├── components/
│   ├── coaching/           # 아바타, 채팅 인터페이스
│   ├── gamification/       # XP바, 스트릭, 퀘스트카드
│   └── ui/                 # 공통 UI 컴포넌트
├── lib/
│   └── prisma.ts           # Prisma 클라이언트
├── generated/
│   └── prisma/             # Prisma 생성 파일
└── types/
```

## 데이터 모델

- **User**: 사용자 (학생/코치/학부모)
- **Quest**: 퀘스트 (오늘의 미션)
- **Session**: 코칭 세션
- **Checkin**: 체크인 기록
- **Badge**: 배지
- **StatSnapshot**: 성장 지표 스냅샷

## npm 스크립트

```bash
npm run dev         # 개발 서버 실행
npm run build       # 프로덕션 빌드
npm run start       # 프로덕션 서버 실행
npm run lint        # ESLint 실행

# 데이터베이스
npm run db:migrate  # 마이그레이션 실행
npm run db:seed     # 시드 데이터 생성
npm run db:reset    # DB 리셋
npm run db:studio   # Prisma Studio (DB GUI)
```

## 더미 데이터 추가 (Prisma Studio)

```bash
npx prisma studio
```

브라우저에서 테이블을 직접 편집할 수 있습니다.

## 테스트 계정 (시드 후)

| 역할 | 이메일 |
|------|--------|
| 학생 | student@gillog.com |
| 코치 | coach@gillog.com |
| 학부모 | parent@gillog.com |

## MVP 기능

### 포함
- XP/레벨 시스템
- 스트릭 (연속 체크인)
- 오늘의 퀘스트
- 성장 지표 6개 영역 (0-4 레벨)
- AI 코칭 채팅 인터페이스
- 아바타 패널 (WebRTC 확장 대비)

### 제외 (향후 확장)
- 배지 시스템 (UI만 더미)
- 리더보드
- 실시간 영상 통화 (WebRTC)
- 푸시 알림

## 성장 지표 레벨

| 레벨 | 의미 |
|------|------|
| 0 | 시작 단계 - 아직 인식하지 못함 |
| 1 | 인식 단계 - 필요성을 알지만 실천 어려움 |
| 2 | 시도 단계 - 가끔 실천, 일관성 부족 |
| 3 | 습관 단계 - 대부분 실천, 가끔 흔들림 |
| 4 | 마스터 단계 - 자연스럽게 체화됨 |
