'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { GoogleGenAI, Modality, type Session, type LiveServerMessage } from '@google/genai'
import {
  float32ToPcm16,
  encodeBase64,
  resampleTo16kHz,
  AudioPlaybackQueue,
} from './audioUtils'

export type VoiceState = 'idle' | 'connecting' | 'listening' | 'speaking' | 'error'

const VOICE_SYSTEM_PROMPT = `너는 길로그(Gillog)의 전속 AI 음성 코치다.

[정체성]
- 따뜻하지만 실행까지 반드시 이끌어내는 코치
- 정답을 주지 않고 질문으로 스스로 깨닫게 한다

[중요]
- 반드시 한국어로만 대화해. 영어 절대 금지.
- 음성 대화이므로 짧고 자연스럽게 말해.
- 내부 사고 과정, 메모, 분석 텍스트를 절대 출력하지 마. 사용자에게 말할 내용만 출력해.

[첫 인사]
세션이 시작되면 먼저 이렇게 인사해:
"안녕! 반가워! 코칭은 네가 원하는 목표를 이루기 위한 대화야. 고민을 해결하고, 성장하고 싶은 걸 같이 찾아볼 거야. 혹시 고민이나 해결하고 싶은 것, 목표하는 것, 성장하고 싶은 게 있어?"
위 내용을 자연스럽게 변형해서 말해.

[대화 구조 - 3턴]
사용자가 목표/고민을 말한 뒤:

1턴. 현실 코칭 질문
- 짧게 공감하고 칭찬/격려 한마디 후, 지금 상황에 대한 질문 하나만
- 예: "그걸 고민하고 있다는 것 자체가 대단해. 지금 그게 어떤 상태야?"

2턴. 목표 설정 질문
- 답변을 받고 노력을 인정해주고, 어떻게 바꾸고 싶은지 질문 하나만
- 예: "잘 생각했어! 그럼 어떻게 되면 좋겠어?"

3턴. 실행 질문 + 마무리
- 오늘 당장 할 수 있는 실행 하나를 물어봐
- 사용자가 실행을 말하면 힘차게 칭찬하고, 아래 명언 목록에서 맥락에 맞는 명언을 하나 골라 인용하며 마무리
- 매번 다른 명언을 사용해. 같은 명언 반복 금지
- 마무리 응답의 맨 마지막에 반드시 "코칭 완료!"라고 말해
- 예: "멋지다! 꼭 해낼 수 있어. '천 리 길도 한 걸음부터'라는 말처럼, 오늘 그 한 걸음을 내딛는 거야. 응원할게! 코칭 완료!"

[명언 목록 - 맥락에 맞는 것을 골라 사용, 총 100개 이상]
실행/시작: "천 리 길도 한 걸음부터" | "시작이 반이다" | "지금이 가장 빠른 때다" | "완벽한 때는 오지 않는다. 지금이 그 때다" | "작은 한 걸음이 위대한 여정의 시작이다" | "오늘 심은 씨앗이 내일의 숲이 된다" | "행동은 두려움을 치료하는 약이다" | "생각만 하는 사람은 꿈만 꾸고, 행동하는 사람은 현실을 만든다" | "망설이는 동안 누군가는 이미 시작했다" | "못하는 게 아니라 안 하는 거다" | "첫 발을 내딛는 순간, 길은 이미 반쯤 만들어진 거야" | "완벽하지 않아도 괜찮아, 일단 시작하면 돼"
노력/성장: "오늘의 땀은 내일의 보석이 된다" | "꾸준함은 재능을 이긴다" | "성장은 불편함 속에서 일어난다" | "매일 1퍼센트씩 나아지면 1년 뒤엔 37배가 된다" | "다이아몬드는 압력 속에서 만들어진다" | "나무가 크려면 뿌리가 깊어야 한다" | "실력은 반복의 다른 이름이다" | "노력은 배신하지 않는다" | "성장통 없이 자란 나무는 없다" | "오르막길이 힘든 건 올라가고 있다는 증거야" | "어제보다 나은 오늘이면 충분하다" | "땀 흘린 만큼 빛나는 날이 온다"
도전/용기: "넘어진 횟수보다 일어선 횟수가 중요하다" | "할 수 있다고 믿는 사람이 결국 해낸다" | "실패는 성공의 어머니다" | "용기란 두려움이 없는 게 아니라, 두려워도 나아가는 것이다" | "위험을 감수하지 않으면 아무것도 얻을 수 없다" | "불가능은 도전하지 않는 자의 변명이다" | "안전지대를 벗어나는 순간 성장이 시작된다" | "두려움은 잠깐이지만 후회는 영원하다" | "도전하지 않으면 변하는 것은 아무것도 없다" | "실패해도 괜찮아, 도전한 것 자체가 용기야" | "새로운 시도가 새로운 나를 만든다"
습관/꾸준함: "습관이 운명을 만든다" | "매일 조금씩이 결국 큰 차이를 만든다" | "물방울이 바위를 뚫는다" | "하루를 지배하는 자가 인생을 지배한다" | "위대함은 한 번의 행동이 아니라 습관에서 온다" | "반복은 배신하지 않는다" | "꾸준히 하면 못할 게 없다" | "오늘 하루가 모여 인생이 된다" | "작은 습관이 큰 기적을 만든다" | "매일 한 줄이 모이면 한 권의 책이 된다" | "루틴을 지키는 사람이 결국 이긴다" | "꾸준함이 천재를 만든다"
목표/꿈: "목표가 있는 사람은 길을 잃지 않는다" | "꿈을 크게 꾸면 이루지 못해도 위대한 곳에 도달한다" | "별을 향해 쏘면 달에는 닿는다" | "꿈은 도망가지 않는다. 도망가는 건 언제나 자기 자신이다" | "어디로 가는지 알면 세상이 길을 열어준다" | "목표를 적는 순간 꿈이 계획이 된다" | "원하는 것을 명확히 아는 사람이 결국 얻는다" | "꿈이 있는 사람은 나이가 들지 않는다" | "간절히 원하면 온 우주가 도와준다" | "목표가 뚜렷하면 방법은 반드시 나타난다"
자기믿음: "네 안에 답이 있다" | "자신을 믿는 순간 어떻게 살아야 하는지 알게 된다" | "너는 네가 생각하는 것보다 훨씬 강하다" | "가장 큰 적은 자기 의심이다" | "나를 가장 잘 아는 사람은 나 자신이다" | "스스로를 믿는 것이 성공의 첫 번째 비밀이다" | "나를 과소평가하지 마" | "남과 비교하지 마, 어제의 나와 비교해" | "네가 포기하지 않으면 아무도 널 멈출 수 없어" | "자기 확신이 최고의 무기다" | "넌 충분히 잘하고 있어"
공부/학습: "배움에는 왕도가 없다" | "아는 것이 힘이다" | "오늘 배운 것이 내일의 나를 만든다" | "배움을 멈추는 순간 성장도 멈춘다" | "한 권의 책이 인생을 바꿀 수 있다" | "모르는 것을 아는 것이 진짜 앎의 시작이다" | "공부는 미래의 나에게 보내는 선물이다" | "지식은 아무도 빼앗을 수 없는 재산이다" | "호기심이 세상을 바꾼다" | "한 번 더 읽는 사람이 결국 이해하는 사람이다" | "오늘의 공부가 내일의 자유를 만든다"
관계/소통: "듣는 것이 최고의 소통이다" | "진심은 반드시 통한다" | "함께 가면 멀리 갈 수 있다" | "말 한마디가 천 냥 빚을 갚는다" | "좋은 관계는 서로의 성장을 돕는다" | "먼저 손 내미는 사람이 관계를 바꾼다" | "이해받고 싶으면 먼저 이해하라" | "작은 관심이 큰 신뢰를 만든다" | "사람은 혼자 빛나는 게 아니라 함께 빛나는 거야" | "따뜻한 말 한마디가 하루를 바꾼다"
극복/회복: "비 온 뒤에 땅이 굳는다" | "겨울이 오면 봄이 멀지 않다" | "상처가 별이 되는 날이 온다" | "어둠이 깊을수록 별은 더 빛난다" | "폭풍 뒤에 무지개가 뜬다" | "넘어져도 다시 일어서면 된다" | "힘든 시간이 강한 사람을 만든다" | "위기는 기회의 다른 이름이다" | "포기하지 않으면 실패는 없다" | "고통은 지나가지만 포기는 영원히 남는다" | "무릎 꿇은 것은 더 높이 뛰기 위함이다"
시간/집중: "시간은 누구에게나 공평하다" | "지금 이 순간에 집중하면 미래가 바뀐다" | "오늘은 내 남은 인생의 첫날이다" | "시간은 되돌릴 수 없지만 오늘은 만들 수 있다" | "몰입하는 순간 불가능이 사라진다" | "가장 소중한 자원은 시간이다"

[대화 스타일]
- 반말, 따뜻한 코치 톤
- 이모지 쓰지 마
- 1~2문장으로 짧게
- 질문은 한 번에 하나만
- 반드시 한국어로만 대화
- 적절한 타이밍에 칭찬과 격려를 해줘

[절대 규칙]
- 영어 출력 금지
- 내부 사고/분석 텍스트 출력 금지
- 라포형성 질문 금지 (요즘 어때, 잘 지내, 기분이 어때 등)
- 한 턴에 질문 2개 이상 금지
- 부연설명, 조언, 가르치기 금지`

interface UseVoiceCoachingOptions {
  onMessage?: (role: 'user' | 'coach', text: string) => void
  onComplete?: () => void
}

interface UseVoiceCoachingReturn {
  state: VoiceState
  isMuted: boolean
  audioLevel: number
  start: () => Promise<void>
  stop: () => void
  toggleMute: () => void
}

export function useVoiceCoaching(options?: UseVoiceCoachingOptions): UseVoiceCoachingReturn {
  const [state, setState] = useState<VoiceState>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  const isMutedRef = useRef(false)
  const stateRef = useRef<VoiceState>('idle')
  const onMessageRef = useRef(options?.onMessage)
  const onCompleteRef = useRef(options?.onComplete)

  useEffect(() => {
    onMessageRef.current = options?.onMessage
  }, [options?.onMessage])

  useEffect(() => {
    onCompleteRef.current = options?.onComplete
  }, [options?.onComplete])

  const sessionRef = useRef<Session | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const playbackRef = useRef<AudioPlaybackQueue | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const levelTimerRef = useRef<number | null>(null)
  const coachTextRef = useRef('')
  const coachTranscriptRef = useRef('')
  const userTranscriptRef = useRef('')

  function updateState(s: VoiceState) {
    stateRef.current = s
    setState(s)
  }

  const start = useCallback(async () => {
    try {
      updateState('connecting')

      // 1. 토큰 가져오기
      const tokenRes = await fetch('/api/coaching/voice-token', { method: 'POST' })
      if (!tokenRes.ok) throw new Error('Token fetch failed')
      const { apiKey } = await tokenRes.json()

      // 2. 마이크 권한
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      })
      streamRef.current = stream

      // 3. 재생 큐
      playbackRef.current = new AudioPlaybackQueue((playing) => {
        if (playing) updateState('speaking')
        else updateState('listening')
      })

      // 4. SDK로 Live 세션 연결
      const ai = new GoogleGenAI({ apiKey })

      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-latest',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
          systemInstruction: VOICE_SYSTEM_PROMPT,
          thinkingConfig: { thinkingBudget: 0 },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            console.log('[Voice] WebSocket 연결됨')
          },
          onmessage: (msg: LiveServerMessage) => {
            console.log('[Voice] 메시지 수신:', Object.keys(msg))

            // 모델 응답 (오디오)
            if (msg.serverContent?.modelTurn?.parts) {
              for (const part of msg.serverContent.modelTurn.parts!) {
                if (part.inlineData?.mimeType?.startsWith('audio/')) {
                  playbackRef.current?.enqueue(part.inlineData.data as string)
                }
                if (part.text) {
                  coachTextRef.current += part.text
                }
              }
            }

            // 사용자 음성 전사 (축적만 하고, turnComplete에서 한 번에 표시)
            if (msg.serverContent?.inputTranscription?.text) {
              userTranscriptRef.current += msg.serverContent.inputTranscription.text
            }

            // 코치 음성 전사 (축적만 하고, turnComplete에서 한 번에 표시)
            if (msg.serverContent?.outputTranscription?.text) {
              coachTranscriptRef.current += msg.serverContent.outputTranscription.text
            }

            // 턴 완료 → 축적된 전사를 한 메시지로 표시
            if (msg.serverContent?.turnComplete) {
              // 사용자 메시지 먼저 표시
              const userText = userTranscriptRef.current.trim()
              if (userText) {
                onMessageRef.current?.('user', userText)
                userTranscriptRef.current = ''
              }

              // 코치 메시지: 전사 우선, 없으면 텍스트 파트
              const rawText = coachTranscriptRef.current || coachTextRef.current
              // "코칭 완료" 음성 감지 (띄어쓰기 무관)
              const completePattern = /코칭\s*완료/
              const isComplete = completePattern.test(rawText)
              const displayText = rawText.replace(/코칭\s*완료!?/g, '').trim()

              if (displayText) {
                onMessageRef.current?.('coach', displayText)
              }

              coachTranscriptRef.current = ''
              coachTextRef.current = ''

              // 코칭 완료 감지 → 자동 종료
              if (isComplete) {
                setTimeout(() => {
                  cleanup()
                  updateState('idle')
                  onCompleteRef.current?.()
                }, 2000)
                return
              }

              updateState('listening')
            }

            // 인터럽트
            if (msg.serverContent?.interrupted) {
              playbackRef.current?.clear()
              coachTextRef.current = ''
              coachTranscriptRef.current = ''
              userTranscriptRef.current = ''
            }
          },
          onerror: (e: ErrorEvent) => {
            console.error('[Voice] 에러:', e)
            updateState('error')
          },
          onclose: (e: CloseEvent) => {
            console.log('[Voice] 연결 종료, code:', e.code, 'reason:', e.reason)
            cleanup()
            if (stateRef.current !== 'idle') {
              updateState('error')
            }
          },
        },
      })

      sessionRef.current = session

      // connect() 완료 후 = 세션 준비 완료
      console.log('[Voice] 세션 준비 완료, 마이크 시작')
      updateState('listening')
      startMicCapture(stream)

      // 코치가 먼저 인사하도록 트리거
      session.sendClientContent({
        turns: '코칭 시작해줘',
        turnComplete: true,
      })
    } catch (err) {
      console.error('[Voice] 시작 에러:', err)
      updateState('error')
      cleanup()
    }
  }, [])

  function startMicCapture(stream: MediaStream) {
    const audioCtx = new AudioContext({ sampleRate: 16000 })
    // PWA standalone 모드에서 AudioContext가 suspended 상태일 수 있음
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    audioCtxRef.current = audioCtx
    console.log('[Voice] 마이크 샘플레이트:', audioCtx.sampleRate)

    const source = audioCtx.createMediaStreamSource(stream)

    // 오디오 레벨 분석
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    analyserRef.current = analyser

    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    function updateLevel() {
      analyser.getByteFrequencyData(dataArray)
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) sum += dataArray[i]
      const avg = sum / dataArray.length / 255
      setAudioLevel(avg)
      levelTimerRef.current = requestAnimationFrame(updateLevel)
    }
    updateLevel()

    // ScriptProcessor로 PCM 캡처
    const processor = audioCtx.createScriptProcessor(4096, 1, 1)
    processorRef.current = processor

    source.connect(processor)
    processor.connect(audioCtx.destination)

    processor.onaudioprocess = (e) => {
      if (!sessionRef.current) return
      if (isMutedRef.current) return

      const inputData = e.inputBuffer.getChannelData(0)
      const resampled = resampleTo16kHz(inputData, audioCtx.sampleRate)
      const pcm16 = float32ToPcm16(resampled)
      const base64 = encodeBase64(pcm16.buffer as ArrayBuffer)

      try {
        sessionRef.current.sendRealtimeInput({
          audio: {
            mimeType: 'audio/pcm;rate=16000',
            data: base64,
          },
        })
      } catch {
        // 세션 닫힌 경우 무시
      }
    }
  }

  const stop = useCallback(() => {
    cleanup()
    updateState('idle')
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev
      isMutedRef.current = newMuted
      if (streamRef.current) {
        streamRef.current.getAudioTracks().forEach(track => {
          track.enabled = !newMuted
        })
      }
      return newMuted
    })
  }, [])

  function cleanup() {
    if (levelTimerRef.current) {
      cancelAnimationFrame(levelTimerRef.current)
      levelTimerRef.current = null
    }
    if (processorRef.current) {
      processorRef.current.disconnect()
      processorRef.current = null
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (sessionRef.current) {
      try { sessionRef.current.close() } catch { /* ignore */ }
      sessionRef.current = null
    }
    if (playbackRef.current) {
      playbackRef.current.close()
      playbackRef.current = null
    }
    coachTextRef.current = ''
    coachTranscriptRef.current = ''
    userTranscriptRef.current = ''
    setAudioLevel(0)
  }

  return { state, isMuted, audioLevel, start, stop, toggleMute }
}
