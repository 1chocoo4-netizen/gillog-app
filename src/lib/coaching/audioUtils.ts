/** Float32Array → PCM 16-bit Int16Array */
export function float32ToPcm16(float32: Float32Array): Int16Array {
  const pcm16 = new Int16Array(float32.length)
  for (let i = 0; i < float32.length; i++) {
    const s = Math.max(-1, Math.min(1, float32[i]))
    pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff
  }
  return pcm16
}

/** PCM 16-bit Int16Array → Float32Array */
export function pcm16ToFloat32(pcm16: Int16Array): Float32Array {
  const float32 = new Float32Array(pcm16.length)
  for (let i = 0; i < pcm16.length; i++) {
    float32[i] = pcm16[i] / (pcm16[i] < 0 ? 0x8000 : 0x7fff)
  }
  return float32
}

/** ArrayBuffer → base64 문자열 */
export function encodeBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

/** base64 문자열 → ArrayBuffer */
export function decodeBase64(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

/** 브라우저 sampleRate → 16kHz 리샘플링 */
export function resampleTo16kHz(float32: Float32Array, sourceSampleRate: number): Float32Array {
  if (sourceSampleRate === 16000) return float32

  const ratio = sourceSampleRate / 16000
  const newLength = Math.round(float32.length / ratio)
  const result = new Float32Array(newLength)

  for (let i = 0; i < newLength; i++) {
    const srcIndex = i * ratio
    const lower = Math.floor(srcIndex)
    const upper = Math.min(lower + 1, float32.length - 1)
    const frac = srcIndex - lower
    result[i] = float32[lower] * (1 - frac) + float32[upper] * frac
  }

  return result
}

/**
 * Gemini 24kHz PCM 오디오 재생 큐
 * 수신된 오디오 청크를 순서대로 이어서 재생
 */
export class AudioPlaybackQueue {
  private ctx: AudioContext
  private queue: Float32Array[] = []
  private isPlaying = false
  private nextStartTime = 0
  private onPlayStateChange?: (playing: boolean) => void

  constructor(ctx: AudioContext, onPlayStateChange?: (playing: boolean) => void) {
    this.ctx = ctx
    this.onPlayStateChange = onPlayStateChange
  }

  /** base64 PCM 24kHz 데이터를 큐에 추가 */
  enqueue(base64Pcm: string) {
    const buffer = decodeBase64(base64Pcm)
    const pcm16 = new Int16Array(buffer)
    const float32 = pcm16ToFloat32(pcm16)
    this.queue.push(float32)
    if (!this.isPlaying) {
      this.playNext()
    }
  }

  private playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false
      this.onPlayStateChange?.(false)
      return
    }

    this.isPlaying = true
    this.onPlayStateChange?.(true)

    const float32 = this.queue.shift()!
    const audioBuffer = this.ctx.createBuffer(1, float32.length, 24000)
    audioBuffer.getChannelData(0).set(float32)

    const source = this.ctx.createBufferSource()
    source.buffer = audioBuffer
    source.connect(this.ctx.destination)

    const now = this.ctx.currentTime
    const startTime = Math.max(now, this.nextStartTime)
    source.start(startTime)
    this.nextStartTime = startTime + audioBuffer.duration

    source.onended = () => {
      this.playNext()
    }
  }

  /** 재생 중지 및 큐 비우기 */
  clear() {
    this.queue = []
    this.isPlaying = false
    this.nextStartTime = 0
    this.onPlayStateChange?.(false)
  }

  /** AudioContext 해제 */
  async close() {
    this.clear()
    await this.ctx.close()
  }
}
