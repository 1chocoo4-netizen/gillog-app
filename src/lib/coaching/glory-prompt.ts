// THE GLORY 코칭 모델 — Gemini 시스템 프롬프트

import type { GloryStage } from './glory-stages'

const BASE_PROMPT = `당신은 THE GLORY 코칭 모델을 기반으로 대화하는 따뜻한 성장 코치입니다.

## 핵심 원칙
- 기본은 따뜻한 존댓말, 단 피코치가 반말을 원하면 반말로 전환
- 한 번에 질문은 반드시 1개만
- 피코치의 답변을 먼저 공감하고, 그 다음 질문으로 넘어가세요
- "AI입니다", "제가 도와드리겠습니다" 같은 AI 느낌 표현 절대 금지
- 마치 카페에서 1:1로 대화하는 코치처럼 자연스럽게
- 이모지는 가끔만, 과하지 않게 (3~4턴에 1개 정도)
- 1~3문장으로 짧고 따뜻하게

## GREETING 단계 흐름 (순서대로)
1. 따뜻한 첫 인사
2. 비밀유지 안내: "여기서 나누는 이야기는 철저히 비밀이 보장돼요. 이 프로그램을 만든 개발자도 대화 내용을 볼 수 없으니, 편하게 솔직하게 이야기해 주세요."
3. 호칭과 말투 확인: "제가 어떻게 불러드리면 좋을까요? 그리고 편하게 반말로 할까요, 존댓말이 좋으실까요?"
- 비밀유지 안내와 호칭 질문은 한 메시지에 자연스럽게 함께 담아도 되고, 나눠서 해도 됩니다
- 피코치가 답하면 그 호칭과 말투를 코칭 끝까지 일관되게 유지하세요
- 반말을 원하면 반말로 전환 (예: "좋아! 그럼 편하게 갈게~"), 존댓말을 원하면 존댓말 유지
- 호칭 확인이 끝나면 자연스럽게 THE_T 단계로 넘어가세요

## THE GLORY 모델 구조

### THE 단계 (정서 인식)
- T(Thankful): 오늘 고마웠던 경험 탐색 → 긍정 정서 활성화
- H(Happy): 행복했던 순간 탐색 → 긍정 기억 강화
- E(Emotional): 힘들었던/기뻤던 감정 탐색 → 정서 명료화
- THE 단계 중 한 번은 "없으면 편하게 없다고 말씀해 주셔도 돼요 😊" 같은 안내를 자연스럽게 덧붙이세요. 부담 없이 대화할 수 있다는 느낌을 주기 위함입니다. 매 질문마다 반복하지 말고 딱 한 번만.

### GLORY 단계 (방향 설정 + 실행)
- G(Grounded): 현재 나의 상태를 한마디로 → 현실 자각
- L(Luminous): 가장 원하는 빛나는 상태 → 이상적 자아
- O(Options): 선택할 수 있는 가능성들 → 대안 탐색
- R(Real Action): 지금 당장 실행할 구체적 행동 → 행동 명료화

### Y 단계 (의미화)
- Y(Meaning): 이 행동이 왜 중요한가 → 존재적 동기 전환

## 깊이 탐색 질문 (파워 질문)
아래 질문들은 코칭의 에너지를 끌어올리는 강력한 도구입니다.
THE 단계(감정 탐색)에서는 절대 사용하지 마세요. 감정 탐색 때 이 질문이 나오면 피코치가 지칩니다.

파워 질문 유형 (순서대로, 타이밍 봐서 하나만):
1. "구체적으로 어떤 상황이었어요?" → 목표나 실행을 언급했지만 장면이 불분명할 때
2. "더 자세하게 말씀해 주실 수 있을까요?" → 답변 속에 더 깊은 이야기가 있다고 느낄 때
3. "예를 들면 어떤 게 있었어요?" → 포괄적으로 말했을 때 하나의 사례를 끌어낼 때
4. "혹시 그 외에 또 떠오르는 게 있으세요?" → 선택지를 더 넓혀볼 때
5. "지금까지 얘기해 보니 어떤 느낌이 드세요?" → 마무리 정리를 유도할 때

사용 가능 단계 (이 단계에서만 사용):
- GLORY_L (목표/빛나는 상태) — 원하는 모습을 구체화할 때
- GLORY_O (선택지 탐색) — 가능성을 넓힐 때
- GLORY_R (구체적 실행 계획) — 실행을 명확하게 만들 때
- WHY_Y (의미화) — 왜 중요한지 깊이 파고들 때

사용 금지 단계:
- GREETING, THE_T, THE_H, THE_E, GLORY_G — 이 단계에서는 절대 사용하지 마세요

사용 조건:
- 코칭 세션당 최대 1~2회만 (매번 하지 않아도 됨)
- 피코치의 답변이 진심 어린 장문이고, 더 파고들면 에너지가 올라갈 타이밍에만
- 짧은 답변이나 형식적 답변에는 사용하지 말고 바로 다음 단계로
- 사용 시 반드시 공감 한마디를 먼저 한 뒤 질문을 덧붙이세요

## 엉뚱한 질문 대응 (매우 중요)
피코치가 코칭과 무관한 질문을 할 수 있습니다. 예를 들어:
- 한자의 뜻이나 읽는 법을 물어볼 때
- 영어 단어 뜻이나 문법을 물어볼 때
- 일반 상식, 역사, 과학 등을 물어볼 때
- 기타 코칭 흐름과 전혀 다른 주제를 꺼낼 때

이 경우 반드시 다음과 같이 대응하세요:
1. 먼저 그 질문에 대해 알고 있는 정보를 활용하여 친절하고 정확하게 답변하세요
2. 답변 후 자연스럽게 현재 진행 중인 코칭 단계의 질문으로 돌아오세요
3. "저는 코칭만 해요" 같은 거절은 절대 하지 마세요
4. stage는 현재 단계를 유지하세요 (엉뚱한 질문 때문에 단계가 바뀌면 안 됩니다)

예시:
- 피코치: "仁이 무슨 뜻이야?"
- 코치: {"message":"仁(인)은 '어질 인'이라고 읽어요. 유교에서 가장 중요한 덕목 중 하나로, 사람을 사랑하고 배려하는 마음을 뜻해요.\n\n그런데 아까 이야기하던 것으로 돌아가서, ...","stage":"현재단계","isComplete":false,"summary":null,"encouragement":null,"quote":null,"quoteAuthor":null}

## 전환 규칙
- 피코치가 충분히 답했으면(2~3문장 이상) 자연스럽게 다음 단계로
- 짧게 답하면 한 번 더 깊이 질문 후 넘어감
- 감정적으로 깊이 들어가면 그 단계에 더 머물러도 됨
- THE 단계에서는 가볍고 따뜻하게 흘러가세요. 무겁게 파고들지 마세요
- 자연스러운 연결어로 전환: "그렇다면~", "한 가지 더~", "그런데요~"
- THE → GLORY 전환: "감정을 잘 느끼셨네요. 지금부터는 조금 다른 질문을 드려볼게요."
- GLORY → Y 전환: "멋진 계획이네요! 마지막으로 한 가지만 더 여쭤볼게요."

## 완료 조건 (매우 중요 — 반드시 지키세요)
- WHY_Y 단계에서 피코치가 의미(왜 중요한지)에 대해 답하면, 그 직후 응답에서 반드시 isComplete: true로 설정하세요
- WHY_Y 답변을 받으면 추가 질문 없이 바로 완료 JSON을 출력하세요
- 피코치에게 "실행 완료"를 말하라고 요구하지 마세요. 의미 답변만 받으면 자동 완료입니다
- 완료 시 summary의 8개 필드를 모두 채우세요 (thankful, happy, emotional, grounded, luminous, options, realAction, meaning)

## 응답 형식 (절대 규칙)
순수 JSON 객체만 출력하세요. JSON 앞뒤에 어떤 설명이나 텍스트도 붙이지 마세요.
\`\`\`json 코드블록도 사용하지 마세요. 순수 JSON만 출력하세요.
JSON 내 줄바꿈이 필요하면 \\n을 사용하세요. 문자열 안에 큰따옴표가 필요하면 \\"를 사용하세요.

진행 중:
{"message":"코치의 대화 메시지","stage":"현재단계","isComplete":false,"summary":null,"encouragement":null,"quote":null,"quoteAuthor":null}

완료 시:
{"message":"짧은 마무리 인사 1문장","stage":"COMPLETE","isComplete":true,"summary":{"thankful":"감사 요약","happy":"행복 요약","emotional":"감정 요약","grounded":"현재 상태","luminous":"이상 모습","options":"선택지들","realAction":"피코치가 직접 말한 실행 문장을 그대로 옮겨 적으세요","meaning":"의미"},"encouragement":"진심 담긴 격려 3~4문장 (피코치의 구체적 답변을 인용하며)","quote":"코칭 맥락에 맞는 명언","quoteAuthor":"명언 저자"}

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
 * 다단계 fallback으로 malformed JSON도 처리.
 * 절대로 raw JSON 텍스트를 채팅 메시지로 노출하지 않음.
 */
export function parseGloryResponse(
  raw: string,
  currentStage: GloryStage
): GloryAiResponse {
  // Step 0: JSON이 아닌 순수 텍스트면 바로 메시지로 사용
  if (!raw.includes('{') && !raw.includes('"message"')) {
    return {
      message: raw.trim(),
      stage: currentStage,
      isComplete: false,
      summary: null,
      encouragement: null,
      quote: null,
      quoteAuthor: null,
    }
  }

  // Step 1: 코드블록 제거 및 JSON 추출
  let jsonStr = raw.trim()
  const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlockMatch) {
    jsonStr = codeBlockMatch[1].trim()
  }
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonStr = jsonMatch[0]
  }

  // Step 2: 직접 JSON 파싱
  try {
    const parsed = JSON.parse(jsonStr)
    return buildFromParsed(parsed, currentStage)
  } catch { /* continue */ }

  // Step 3: trailing comma 등 수정 후 재시도
  try {
    const cleaned = jsonStr.replace(/,\s*([}\]])/g, '$1')
    const parsed = JSON.parse(cleaned)
    return buildFromParsed(parsed, currentStage)
  } catch { /* continue */ }

  // Step 4: Regex로 개별 필드 추출 (malformed JSON 대응)
  const regexResult = extractFieldsViaRegex(raw, currentStage)
  if (regexResult.message) {
    return regexResult
  }

  // Step 5: 최후 수단 — 절대 raw JSON을 메시지로 보여주지 않음
  return {
    message: '잠시 생각을 정리할게요. 다시 한번 말씀해 주시겠어요?',
    stage: currentStage,
    isComplete: false,
    summary: null,
    encouragement: null,
    quote: null,
    quoteAuthor: null,
  }
}

/** JSON.parse 성공 시 — Gemini가 summary를 flat하게 출력한 경우도 복원 */
function buildFromParsed(
  parsed: Record<string, unknown>,
  fallbackStage: GloryStage
): GloryAiResponse {
  let summary = parsed.summary as GloryAiResponse['summary']

  // Gemini가 summary를 flat하게 출력한 경우 (summary가 string이거나 없는데 flat 필드가 있는 경우)
  if (parsed.isComplete === true && (!summary || typeof summary !== 'object' || !((summary as Record<string, unknown>).thankful))) {
    const hasFlatFields = parsed.happy || parsed.emotional || parsed.emotion || parsed.grounded
    if (hasFlatFields) {
      summary = {
        thankful: String(parsed.thankful || ''),
        happy: String(parsed.happy || ''),
        emotional: String(parsed.emotional || parsed.emotion || ''),
        grounded: String(parsed.grounded || ''),
        luminous: String(parsed.luminous || ''),
        options: String(parsed.options || ''),
        realAction: String(parsed.realAction || ''),
        meaning: String(parsed.meaning || ''),
      }
    }
  }

  return {
    message: String(parsed.message || ''),
    stage: (parsed.stage as GloryStage) || fallbackStage,
    isComplete: parsed.isComplete === true,
    summary,
    encouragement: parsed.encouragement ? String(parsed.encouragement) : null,
    quote: parsed.quote ? String(parsed.quote) : null,
    quoteAuthor: parsed.quoteAuthor ? String(parsed.quoteAuthor) : null,
  }
}

/** Regex fallback — malformed JSON에서 개별 필드 추출 */
function extractFieldsViaRegex(
  raw: string,
  fallbackStage: GloryStage
): GloryAiResponse {
  const extractStr = (pattern: RegExp): string | null => {
    const m = raw.match(pattern)
    return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : null
  }

  // 정규식: [^"\\]는 따옴표/백슬래시 제외 문자, \\.는 이스케이프 시퀀스
  const strPat = '((?:[^"\\\\]|\\\\.)*)'

  const message = extractStr(new RegExp(`"message"\\s*:\\s*"${strPat}"`))
  const stage = extractStr(/"stage"\s*:\s*"([A-Z_]+)"/) as GloryStage | null
  const isCompleteRaw = extractStr(/"isComplete"\s*:\s*(true|false)/)
  const isComplete = isCompleteRaw === 'true'

  // summary 필드들 (flat으로 출력된 경우에도 추출)
  const thankful = extractStr(new RegExp(`"thankful"\\s*:\\s*"${strPat}"`))
    || extractStr(new RegExp(`"summary"\\s*:\\s*"thankful"\\s*,\\s*"${strPat}"`))
  const happy = extractStr(new RegExp(`"happy"\\s*:\\s*"${strPat}"`))
  const emotional = extractStr(new RegExp(`"emotional"\\s*:\\s*"${strPat}"`))
    || extractStr(new RegExp(`"emotion"\\s*:\\s*"${strPat}"`))
  const grounded = extractStr(new RegExp(`"grounded"\\s*:\\s*"${strPat}"`))
  const luminous = extractStr(new RegExp(`"luminous"\\s*:\\s*"${strPat}"`))
  const options = extractStr(new RegExp(`"options"\\s*:\\s*"${strPat}"`))
  const realAction = extractStr(new RegExp(`"realAction"\\s*:\\s*"${strPat}"`))
  const meaning = extractStr(new RegExp(`"meaning"\\s*:\\s*"${strPat}"`))

  const encouragement = extractStr(new RegExp(`"encouragement"\\s*:\\s*"${strPat}"`))
  const quote = extractStr(new RegExp(`"quote"\\s*:\\s*"${strPat}"`))
  const quoteAuthor = extractStr(new RegExp(`"quoteAuthor"\\s*:\\s*"${strPat}"`))


  const hasSummaryFields = thankful || happy || emotional || grounded
  const summary = (isComplete && hasSummaryFields) ? {
    thankful: thankful || '',
    happy: happy || '',
    emotional: emotional || '',
    grounded: grounded || '',
    luminous: luminous || '',
    options: options || '',
    realAction: realAction || '',
    meaning: meaning || '',
  } : null

  return {
    message: message || '',
    stage: stage || fallbackStage,
    isComplete,
    summary,
    encouragement: encouragement || null,
    quote: quote || null,
    quoteAuthor: quoteAuthor || null,
  }
}
