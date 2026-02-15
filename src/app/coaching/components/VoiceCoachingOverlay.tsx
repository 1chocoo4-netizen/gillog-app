'use client'

import { motion } from 'framer-motion'
import { MicOff, Mic, PhoneOff } from 'lucide-react'
import type { VoiceState } from '@/lib/coaching/useVoiceCoaching'

interface VoiceCoachingBarProps {
  state: VoiceState
  isMuted: boolean
  audioLevel: number
  onToggleMute: () => void
  onEnd: () => void
}

const STATUS_TEXT: Record<VoiceState, string> = {
  idle: '',
  connecting: '연결 중...',
  listening: '듣고 있어요...',
  speaking: '코치가 말하는 중...',
  error: '연결 오류',
}

export default function VoiceCoachingBar({
  state,
  isMuted,
  audioLevel,
  onToggleMute,
  onEnd,
}: VoiceCoachingBarProps) {
  const pulseScale = state === 'speaking' ? 1 + audioLevel * 0.3 : 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-3"
    >
      {/* 아바타 + 펄스 */}
      <div className="relative flex-shrink-0">
        {(state === 'speaking' || state === 'listening') && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-violet-500/30"
            style={{ margin: '-4px' }}
          />
        )}
        <motion.div
          animate={{ scale: pulseScale }}
          transition={{ duration: 0.15 }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg"
        >
          <span className="select-none pointer-events-none">🧑‍🏫</span>
        </motion.div>
      </div>

      {/* 상태 텍스트 */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${
          state === 'error' ? 'text-red-400' : 'text-white/70'
        }`}>
          {STATUS_TEXT[state]}
        </p>
        {state === 'connecting' && (
          <div className="flex gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        )}
      </div>

      {/* 음소거 토글 */}
      <button
        onClick={onToggleMute}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
          isMuted
            ? 'bg-red-500/20 text-red-400'
            : 'bg-white/10 text-white/60'
        }`}
      >
        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {/* 종료 */}
      <button
        onClick={onEnd}
        className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center active:scale-95 transition-transform"
      >
        <PhoneOff className="w-5 h-5" />
      </button>
    </motion.div>
  )
}
