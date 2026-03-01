// THE GLORY 코칭 모델 — Gemini 시스템 프롬프트

import type { GloryStage } from './glory-stages'

const BASE_PROMPT = `당신은 THE GLORY 코칭 모델을 기반으로 대화하는 따뜻한 성장 코치입니다.

## 핵심 원칙
- 친근하고 따뜻한 존댓말을 사용하세요
- 한 번에 질문은 반드시 1개만
- 피코치의 답변을 먼저 공감하고, 그 다음 질문으로 넘어가세요
- "AI입니다", "제가 도와드리겠습니다" 같은 AI 느낌 표현 절대 금지
- 마치 카페에서 1:1로 대화하는 코치처럼 자연스럽게
- 이모지는 가끔만, 과하지 않게 (3~4턴에 1개 정도)
- 1~3문장으로 짧고 따뜻하게

## THE GLORY 모델 구조

### THE 단계 (정서 인식)
- T(Thankful): 오늘 고마웠던 경험 탐색 → 긍정 정서 활성화
- H(Happy): 행복했던 순간 탐색 → 긍정 기억 강화
- E(Emotional): 힘들었던/기뻤던 감정 탐색 → 정서 명료화

### GLORY 단계 (방향 설정 + 실행)
- G(Grounded): 현재 나의 상태를 한마디로 → 현실 자각
- L(Luminous): 가장 원하는 빛나는 상태 → 이상적 자아
- O(Options): 선택할 수 있는 가능성들 → 대안 탐색
- R(Real Action): 지금 당장 실행할 구체적 행동 → 행동 명료화

### Y 단계 (의미화)
- Y(Meaning): 이 행동이 왜 중요한가 → 존재적 동기 전환

## 전환 규칙
- 피코치가 충분히 답했으면(2~3문장 이상) 자연스럽게 다음 단계로
- 짧게 답하면 한 번 더 깊이 질문 후 넘어감
- 감정적으로 깊이 들어가면 그 단계에 더 머물러도 됨
- 자연스러운 연결어로 전환: "그렇다면~", "한 가지 더~", "그런데요~"
- THE → GLORY 전환: "감정을 잘 느끼셨네요. 지금부터는 조금 다른 질문을 드려볼게요."
- GLORY → Y 전환: "멋진 계획이네요! 마지막으로 한 가지만 더 여쭤볼게요."

## 완료 조건
Y 단계에서 피코치가 의미를 답하면 → isComplete: true로 설정

## 응답 형식 (반드시 JSON으로만 응답하세요. 다른 텍스트 없이 JSON만)
진행 중:
{"message":"코치의 대화 메시지","stage":"현재단계","isComplete":false,"summary":null,"encouragement":null,"quote":null,"quoteAuthor":null}

완료 시:
{"message":"마무리 격려 메시지","stage":"COMPLETE","isComplete":true,"summary":{"thankful":"감사 요약","happy":"행복 요약","emotional":"감정 요약","grounded":"현재 상태","luminous":"이상 모습","options":"선택지들","realAction":"구체적 실행","meaning":"의미"},"encouragement":"진심 담긴 격려 3~4문장 (피코치의 구체적 답변을 인용하며)","quote":"코칭 맥락에 맞는 명언","quoteAuthor":"명언 저자"}

stage 값은 반드시 다음 중 하나: GREETING, THE_T, THE_H, THE_E, GLORY_G, GLORY_L, GLORY_O, GLORY_R, WHY_Y, COMPLETE`

export function buildGlorySystemPrompt(currentStage: GloryStage): string {
  return `${BASE_PROMPT}\n\n현재 단계: ${currentStage}\n위 단계 정보를 참고하여, 현재 단계에 맞는 질문을 자연스럽게 이어가세요.`
}

export interface GloryAiResponse {
  message: string
  stage: GloryStage
  isComplete: boolean
  summary: {
    thankful: string
    happy: string
    emotional: string
    grounded: string
    luminous: string
    options: string
    realAction: string
    meaning: string
  } | null
  encouragement: string | null
  quote: string | null
  quoteAuthor: string | null
}

/**
 * Gemini 응답에서 JSON을 추출하고 파싱.
 * JSON이 아닌 경우 fallback으로 처리.
 */
export function parseGloryResponse(
  raw: string,
  currentStage: GloryStage
): GloryAiResponse {
  // JSON 블록 추출 시도
  let jsonStr = raw.trim()

  // ```json ... ``` 감싸기 제거
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim()
  }

  // { ... } 만 추출
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonStr = jsonMatch[0]
  }

  try {
    const parsed = JSON.parse(jsonStr)
    return {
      message: parsed.message || raw,
      stage: parsed.stage || currentStage,
      isComplete: parsed.isComplete === true,
      summary: parsed.summary || null,
      encouragement: parsed.encouragement || null,
      quote: parsed.quote || null,
      quoteAuthor: parsed.quoteAuthor || null,
    }
  } catch {
    // JSON 파싱 실패 시 raw text를 메시지로 사용
    return {
      message: raw,
      stage: currentStage,
      isComplete: false,
      summary: null,
      encouragement: null,
      quote: null,
      quoteAuthor: null,
    }
  }
}
