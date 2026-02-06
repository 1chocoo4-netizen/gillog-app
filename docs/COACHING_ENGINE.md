# 코칭 대화 엔진 문서

## 개요
길로그(Gillog) AI 코칭 대화 엔진은 ICF/KCA 코칭 원칙을 기반으로 한 상태 머신 기반 대화 시스템입니다.

## 아키텍처

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Lesson Page    │────▶│   /api/chat      │────▶│   OpenAI API    │
│  (Frontend)     │◀────│   (Backend)      │◀────│   (gpt-4o-mini) │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
              ┌─────▼─────┐         ┌─────▼─────┐
              │  State    │         │  Template │
              │  Machine  │         │  Retrieval│
              └───────────┘         └───────────┘
```

## 상태 머신 (State Machine)

### 4단계 코칭 흐름
```
STATE → GOAL → PLAN → WRAP
```

| 상태 | 설명 | 초점 |
|------|------|------|
| STATE | 나 지금 어떤 상태지? | 현재 감정/상황 탐색, 공감, 수용 |
| GOAL | 원하는 게 뭐지? | 원하는 것 구체화, 동기 탐색 |
| PLAN | 뭘 해야 하지? | 선택지 탐색, 구체적 행동 약속 |
| WRAP | 세션 마무리 | 요약, 확인, 격려, 체크인 약속 |

### 전환 조건
- **STATE → GOAL**: "원해", "하고 싶", "되고 싶", "바꾸고" 언급 또는 5턴 이상
- **GOAL → PLAN**: "어떻게", "방법", "할 수", "해볼" 언급 또는 4턴 이상
- **PLAN → WRAP**: "할게", "해볼게", "시작", "약속" 언급 또는 4턴 이상

## 환경 설정

### .env 파일 예시
```env
# OpenAI API 키 (필수)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 개발 모드 (선택)
NODE_ENV=development
```

## API 엔드포인트

### POST /api/chat

**요청 형식:**
```json
{
  "sessionId": "session-123-1234567890",
  "message": "7점",
  "worldKey": "cognition",
  "worldLabel": "인지",
  "isFirstTurn": true
}
```

**응답 형식:**
```json
{
  "text": "7점이라고 느끼는구나. 나쁘지 않은 편인데, 왜 그렇게 느껴?",
  "state": "STATE",
  "isComplete": false,
  "debug": {
    "chosenIntents": ["clarify_feeling", "explore_current"],
    "templatesUsed": ["왜 그렇게 느껴?", "더 말해줄 수 있어?"],
    "transitionInfo": "현재 상태 유지"
  }
}
```

**WRAP 완료 시 응답:**
```json
{
  "text": "오늘 정말 잘했어!\n\n📋 오늘의 정리:\n• 상태: 공부에 집중하기 어려웠음\n• 목표: 30분 집중해서 공부하기\n• 행동: 오늘 저녁 8시에 타이머 설정하고 30분 공부\n• 체크인: 내일 아침에 확인\n\n내일 다시 만나자!",
  "state": "WRAP",
  "isComplete": true,
  "outcome": {
    "stateLine": "공부에 집중하기 어려웠음",
    "goalLine": "30분 집중해서 공부하기",
    "planLine": "오늘 저녁 8시에 타이머 설정하고 30분 공부",
    "checkinLine": "내일 아침에 확인"
  }
}
```

## 로컬 테스트 방법

### 1. 첫 번째 턴 (점수 선택)
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-session-001",
    "message": "5점",
    "worldKey": "cognition",
    "worldLabel": "인지",
    "isFirstTurn": true
  }'
```

### 2. 대화 계속하기
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-session-001",
    "message": "요즘 공부에 집중이 안 돼서 그래",
    "worldKey": "cognition",
    "worldLabel": "인지",
    "isFirstTurn": false
  }'
```

### 3. 세션 상태 확인 (디버깅용)
```bash
curl "http://localhost:3000/api/chat?sessionId=test-session-001"
```

## 대화 품질 체크리스트

### ✅ 필수 확인 사항

| 항목 | 체크 |
|------|------|
| 매 응답이 2~3문장 이내인가? | ☐ |
| 공감 + 요약 + 질문 구조를 따르는가? | ☐ |
| 한 번에 질문이 1개만 있는가? | ☐ |
| 조언/해결책을 먼저 주지 않는가? | ☐ |
| 사용자 단어를 그대로 사용하는가? | ☐ |
| WRAP 단계에서 4가지 요약이 나오는가? | ☐ |

### ✅ 상태별 체크

**STATE 단계:**
- [ ] 감정/상황 탐색에 집중
- [ ] 해결책 제시 없음
- [ ] 목표 강요 없음

**GOAL 단계:**
- [ ] 원하는 것 구체화
- [ ] 현실성 평가 없음
- [ ] 비전 확장

**PLAN 단계:**
- [ ] 작은 행동 1개 결정
- [ ] 체크인 시간/방법 정하기
- [ ] 판단/강요 없음

**WRAP 단계:**
- [ ] 상태 한 줄 요약 포함
- [ ] 목표 한 줄 요약 포함
- [ ] 행동 1개 포함
- [ ] 체크인 정보 포함
- [ ] 따뜻한 마무리 인사

### ✅ 금지 사항
- ❌ 질문 2개 이상 한 번에 던지기
- ❌ 강의/훈계/장문
- ❌ "~해보는 건 어때?" 유도 질문 남발
- ❌ 사용자가 말하지 않은 내용 추측
- ❌ WRAP 없이 세션 종료

## 파일 구조

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API 엔드포인트
│   └── lesson/
│       └── [id]/
│           └── page.tsx          # 레슨 페이지
└── lib/
    └── coaching/
        ├── question_bank.json    # 질문 템플릿 (~200개)
        ├── retrieveTemplates.ts  # 템플릿 검색
        ├── stateMachine.ts       # 상태 머신
        └── systemPrompt.ts       # LLM 프롬프트
```

## 트러블슈팅

### API 키 없이 테스트
API 키가 없으면 폴백 응답이 반환됩니다:
```json
{
  "empathy": "네 마음이 느껴져.",
  "mirror": "지금 그런 상황이구나.",
  "question": "좀 더 이야기해줄 수 있어?"
}
```

### 세션이 초기화되는 경우
메모리 기반 스토리지를 사용하므로 서버 재시작 시 세션이 초기화됩니다.
프로덕션에서는 Redis 또는 DB 사용을 권장합니다.

## 확장 포인트

1. **DB 연동**: `sessions`, `summaries`, `conversations` Map을 DB로 교체
2. **다른 LLM**: `callLLM()` 함수에서 API 엔드포인트 변경
3. **새 월드 추가**: `worldKey`와 `worldLabel`로 컨텍스트 구분
4. **템플릿 확장**: `question_bank.json`에 새 intent/template 추가
