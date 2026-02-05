'use client'

import { useState } from 'react'

// MVP: 아바타 이미지 + 애니메이션
// 향후 확장: WebRTC 영상 통화로 대체 가능

interface AvatarPanelProps {
  avatarUrl?: string
  isActive?: boolean
  onVideoCallStart?: () => void // WebRTC 확장용
}

export function AvatarPanel({
  avatarUrl,
  isActive = true,
  onVideoCallStart,
}: AvatarPanelProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  return (
    <div className="relative h-full min-h-[300px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
      {/* 아바타 영역 - 나중에 WebRTC video element로 교체 가능 */}
      <div className="relative">
        {/* 아바타 이미지 또는 기본 아이콘 */}
        <div
          className={`w-48 h-48 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-8xl shadow-2xl transition-transform ${
            isSpeaking ? 'scale-105' : ''
          }`}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="AI Coach Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            '🤖'
          )}
        </div>

        {/* 말하는 중 인디케이터 */}
        {isSpeaking && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100" />
            <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200" />
          </div>
        )}
      </div>

      {/* 상태 표시 */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className={`w-3 h-3 rounded-full ${
            isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
          }`}
        />
        <span className="text-white text-sm">
          {isActive ? 'AI 코치 연결됨' : '연결 대기중'}
        </span>
      </div>

      {/* MVP: 음성 토글 버튼 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        <button
          onClick={() => setIsSpeaking(!isSpeaking)}
          className={`p-3 rounded-full transition ${
            isSpeaking
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-gray-600 hover:bg-gray-500'
          }`}
          title={isSpeaking ? '음소거' : '음성 시작'}
        >
          <span className="text-white text-xl">
            {isSpeaking ? '🔇' : '🔊'}
          </span>
        </button>

        {/* WebRTC 확장용 버튼 (현재는 더미) */}
        {onVideoCallStart && (
          <button
            onClick={onVideoCallStart}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 rounded-full transition"
            title="영상 통화 시작"
          >
            <span className="text-white text-xl">📹</span>
          </button>
        )}
      </div>

      {/* WebRTC 확장 안내 (개발자용 주석) */}
      {/*
        향후 WebRTC 확장 시:
        1. 이 컴포넌트에 video ref 추가
        2. getUserMedia로 카메라/마이크 접근
        3. RTCPeerConnection으로 P2P 연결
        4. 아바타 대신 실시간 영상 표시
      */}
    </div>
  )
}
