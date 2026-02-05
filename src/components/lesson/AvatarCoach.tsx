'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

interface AvatarCoachProps {
  coachName?: string
  isListening?: boolean
  isSpeaking?: boolean
}

export function AvatarCoach({
  coachName = '코치',
  isListening = false,
  isSpeaking = false
}: AvatarCoachProps) {
  // 애니메이션 상태
  const [blinkState, setBlinkState] = useState(false)
  const [mouthState, setMouthState] = useState<0 | 1 | 2>(0)
  const [breathPhase, setBreathPhase] = useState(0)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0, rotate: 0 })
  const [eyebrowRaise, setEyebrowRaise] = useState(0)
  const [cheekFlush, setCheekFlush] = useState(0.3)
  const [nodPhase, setNodPhase] = useState(0)

  const bodyControls = useAnimation()

  // 자연스러운 눈 깜빡임 (3-6초 랜덤)
  useEffect(() => {
    const blink = () => {
      setBlinkState(true)
      setTimeout(() => setBlinkState(false), 120)
    }

    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 3000
      return setTimeout(() => {
        blink()
        timerId = scheduleNextBlink()
      }, delay)
    }

    let timerId = scheduleNextBlink()
    return () => clearTimeout(timerId)
  }, [])

  // 호흡 애니메이션 (미세 상하 움직임)
  useEffect(() => {
    const breathInterval = setInterval(() => {
      setBreathPhase(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(breathInterval)
  }, [])

  // Idle 상태: 미세 고개 움직임
  useEffect(() => {
    if (!isSpeaking && !isListening) {
      const idleInterval = setInterval(() => {
        setHeadTilt({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2,
          rotate: (Math.random() - 0.5) * 2
        })
      }, 2500 + Math.random() * 1500)
      return () => clearInterval(idleInterval)
    }
  }, [isSpeaking, isListening])

  // Speaking 상태: 입 모양 + 고개 끄덕임 + 눈썹/볼 변화
  useEffect(() => {
    if (isSpeaking) {
      // 입 모양 변화 (3단계)
      const mouthInterval = setInterval(() => {
        setMouthState(Math.floor(Math.random() * 3) as 0 | 1 | 2)
        // 눈썹 미세 움직임
        setEyebrowRaise(Math.random() * 3)
        // 볼 홍조 변화
        setCheekFlush(0.3 + Math.random() * 0.2)
      }, 120)

      // 고개 끄덕임
      const nodInterval = setInterval(() => {
        setNodPhase(prev => (prev + 1) % 4)
      }, 400)

      return () => {
        clearInterval(mouthInterval)
        clearInterval(nodInterval)
      }
    } else {
      setMouthState(0)
      setEyebrowRaise(0)
      setCheekFlush(0.3)
      setNodPhase(0)
    }
  }, [isSpeaking])

  // Listening 상태: 귀 기울이기 + 눈동자 이동
  useEffect(() => {
    if (isListening) {
      // 귀 기울이는 자세
      setHeadTilt({ x: -5, y: 2, rotate: -3 })

      // 눈동자 미세 이동 (상대방 바라보는 느낌)
      const eyeInterval = setInterval(() => {
        setEyeOffset({
          x: (Math.random() - 0.5) * 4,
          y: (Math.random() - 0.3) * 3
        })
      }, 800)

      return () => clearInterval(eyeInterval)
    } else {
      setEyeOffset({ x: 0, y: 0 })
    }
  }, [isListening])

  // 호흡에 따른 Y 오프셋 계산
  const breathY = Math.sin(breathPhase * Math.PI / 180) * 2

  // 끄덕임에 따른 Y 오프셋
  const nodY = isSpeaking ? [0, -3, 0, 1][nodPhase] : 0

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* 화상통화 프레임 */}
      <div className="relative bg-gradient-to-b from-slate-100 to-slate-200 rounded-3xl overflow-hidden shadow-2xl border border-slate-300">
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50" />

        {/* 조명 효과 */}
        <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-gradient-to-b from-white/40 to-transparent rounded-full blur-2xl" />

        {/* 아바타 컨테이너 */}
        <motion.div
          className="relative aspect-[3/4] flex items-center justify-center pt-8"
          animate={{
            y: breathY + nodY,
            rotateX: headTilt.x,
            rotateY: headTilt.y,
            rotateZ: headTilt.rotate,
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{ perspective: 1000 }}
        >
          <svg
            viewBox="0 0 280 380"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
          >
            <defs>
              {/* 피부색 그라데이션 */}
              <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5D6C6" />
                <stop offset="50%" stopColor="#E8C4B0" />
                <stop offset="100%" stopColor="#D4A988" />
              </linearGradient>

              {/* 피부 하이라이트 */}
              <radialGradient id="skinHighlight" cx="30%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#FFF5F0" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F5D6C6" stopOpacity="0" />
              </radialGradient>

              {/* 머리카락 그라데이션 */}
              <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2D2D3A" />
                <stop offset="50%" stopColor="#1A1A24" />
                <stop offset="100%" stopColor="#0D0D12" />
              </linearGradient>

              {/* 머리카락 하이라이트 */}
              <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4A4A5A" stopOpacity="0" />
                <stop offset="50%" stopColor="#5A5A6A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#4A4A5A" stopOpacity="0" />
              </linearGradient>

              {/* 눈동자 그라데이션 */}
              <radialGradient id="irisGradient" cx="40%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#4A3728" />
                <stop offset="70%" stopColor="#2D1F14" />
                <stop offset="100%" stopColor="#1A120C" />
              </radialGradient>

              {/* 입술 그라데이션 */}
              <linearGradient id="lipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D4868A" />
                <stop offset="100%" stopColor="#B86B70" />
              </linearGradient>

              {/* 셔츠 그라데이션 */}
              <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              {/* 그림자 필터 */}
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" />
                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                <feBlend in2="SourceGraphic" />
              </filter>

              {/* 코 그림자 */}
              <linearGradient id="noseShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4A080" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C4A080" stopOpacity="0" />
                <stop offset="100%" stopColor="#C4A080" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* === 몸체 (어깨/상체) === */}
            <g transform="translate(0, 260)">
              {/* 목 */}
              <ellipse cx="140" cy="30" rx="28" ry="45" fill="url(#skinGradient)" />
              <ellipse cx="140" cy="30" rx="28" ry="45" fill="url(#skinHighlight)" />

              {/* 셔츠 */}
              <path
                d="M60 120
                   Q60 80 90 65
                   Q110 55 140 50
                   Q170 55 190 65
                   Q220 80 220 120
                   L220 140 L60 140 Z"
                fill="url(#shirtGradient)"
              />

              {/* 셔츠 칼라 */}
              <path
                d="M105 60 L140 85 L175 60 Q165 50 140 48 Q115 50 105 60"
                fill="#F1F5F9"
                stroke="#E2E8F0"
                strokeWidth="1"
              />

              {/* 칼라 라인 */}
              <path d="M140 48 L140 75" stroke="#CBD5E1" strokeWidth="1" />
            </g>

            {/* === 얼굴 === */}
            <g filter="url(#softShadow)">
              {/* 얼굴 윤곽 */}
              <ellipse cx="140" cy="155" rx="72" ry="85" fill="url(#skinGradient)" />
              <ellipse cx="140" cy="155" rx="72" ry="85" fill="url(#skinHighlight)" />

              {/* 턱 라인 (더 자연스러운 형태) */}
              <path
                d="M68 155 Q68 210 100 235 Q120 250 140 252 Q160 250 180 235 Q212 210 212 155"
                fill="url(#skinGradient)"
              />
            </g>

            {/* === 귀 === */}
            <g>
              {/* 왼쪽 귀 */}
              <ellipse cx="68" cy="160" rx="12" ry="22" fill="#E8C4B0" />
              <ellipse cx="70" cy="160" rx="7" ry="14" fill="#D4A988" opacity="0.5" />

              {/* 오른쪽 귀 */}
              <ellipse cx="212" cy="160" rx="12" ry="22" fill="#E8C4B0" />
              <ellipse cx="210" cy="160" rx="7" ry="14" fill="#D4A988" opacity="0.5" />
            </g>

            {/* === 머리카락 === */}
            <g>
              {/* 메인 헤어 */}
              <path
                d="M68 130
                   Q55 80 80 50
                   Q100 25 140 20
                   Q180 25 200 50
                   Q225 80 212 130
                   Q200 90 140 80
                   Q80 90 68 130"
                fill="url(#hairGradient)"
              />

              {/* 헤어 볼륨 상단 */}
              <ellipse cx="140" cy="45" rx="60" ry="30" fill="url(#hairGradient)" />

              {/* 헤어 하이라이트 */}
              <path
                d="M85 60 Q110 45 140 42 Q170 45 195 60"
                stroke="url(#hairHighlight)"
                strokeWidth="8"
                fill="none"
                opacity="0.6"
              />

              {/* 이마 라인 */}
              <path
                d="M78 95 Q95 85 140 82 Q185 85 202 95"
                fill="url(#hairGradient)"
              />

              {/* 옆머리 왼쪽 */}
              <path
                d="M68 130 Q60 110 65 90 Q55 120 60 160 Q62 145 68 130"
                fill="url(#hairGradient)"
              />

              {/* 옆머리 오른쪽 */}
              <path
                d="M212 130 Q220 110 215 90 Q225 120 220 160 Q218 145 212 130"
                fill="url(#hairGradient)"
              />
            </g>

            {/* === 눈썹 === */}
            <g>
              <motion.path
                d="M95 118 Q108 112 125 115"
                stroke="#3D3028"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: `M95 ${118 - eyebrowRaise} Q108 ${112 - eyebrowRaise} 125 ${115 - eyebrowRaise * 0.5}`,
                }}
                transition={{ duration: 0.1 }}
              />
              <motion.path
                d="M155 115 Q172 112 185 118"
                stroke="#3D3028"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{
                  d: `M155 ${115 - eyebrowRaise * 0.5} Q172 ${112 - eyebrowRaise} 185 ${118 - eyebrowRaise}`,
                }}
                transition={{ duration: 0.1 }}
              />
            </g>

            {/* === 눈 === */}
            <g>
              {/* 왼쪽 눈 */}
              <g transform="translate(110, 140)">
                {/* 눈 흰자 */}
                <motion.ellipse
                  cx="0"
                  cy="0"
                  rx="18"
                  ry={blinkState ? 2 : 12}
                  fill="white"
                  animate={{ ry: blinkState ? 2 : 12 }}
                  transition={{ duration: 0.08 }}
                />

                {/* 눈동자 */}
                <AnimatePresence>
                  {!blinkState && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* 홍채 */}
                      <motion.circle
                        cx={eyeOffset.x}
                        cy={eyeOffset.y}
                        r="9"
                        fill="url(#irisGradient)"
                        animate={{ cx: eyeOffset.x, cy: eyeOffset.y }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* 동공 */}
                      <motion.circle
                        cx={eyeOffset.x}
                        cy={eyeOffset.y}
                        r="4"
                        fill="#0D0D0D"
                        animate={{ cx: eyeOffset.x, cy: eyeOffset.y }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* 하이라이트 */}
                      <motion.circle
                        cx={eyeOffset.x + 3}
                        cy={eyeOffset.y - 3}
                        r="3"
                        fill="white"
                        opacity="0.9"
                        animate={{ cx: eyeOffset.x + 3, cy: eyeOffset.y - 3 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.circle
                        cx={eyeOffset.x - 2}
                        cy={eyeOffset.y + 2}
                        r="1.5"
                        fill="white"
                        opacity="0.5"
                        animate={{ cx: eyeOffset.x - 2, cy: eyeOffset.y + 2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 위 눈꺼풀 라인 */}
                <motion.path
                  d="M-18 0 Q0 -14 18 0"
                  stroke="#8B7355"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{ d: blinkState ? "M-18 0 Q0 0 18 0" : "M-18 0 Q0 -14 18 0" }}
                  transition={{ duration: 0.08 }}
                />

                {/* 속눈썹 */}
                <motion.path
                  d="M-16 -2 Q-18 -6 -20 -8 M-10 -6 Q-12 -11 -13 -14 M-2 -8 Q-2 -14 -1 -16 M6 -8 Q7 -14 9 -16 M14 -5 Q17 -10 20 -12"
                  stroke="#2D2D3A"
                  strokeWidth="1"
                  fill="none"
                  opacity={blinkState ? 0 : 0.7}
                />
              </g>

              {/* 오른쪽 눈 */}
              <g transform="translate(170, 140)">
                {/* 눈 흰자 */}
                <motion.ellipse
                  cx="0"
                  cy="0"
                  rx="18"
                  ry={blinkState ? 2 : 12}
                  fill="white"
                  animate={{ ry: blinkState ? 2 : 12 }}
                  transition={{ duration: 0.08 }}
                />

                {/* 눈동자 */}
                <AnimatePresence>
                  {!blinkState && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.circle
                        cx={eyeOffset.x}
                        cy={eyeOffset.y}
                        r="9"
                        fill="url(#irisGradient)"
                        animate={{ cx: eyeOffset.x, cy: eyeOffset.y }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.circle
                        cx={eyeOffset.x}
                        cy={eyeOffset.y}
                        r="4"
                        fill="#0D0D0D"
                        animate={{ cx: eyeOffset.x, cy: eyeOffset.y }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.circle
                        cx={eyeOffset.x + 3}
                        cy={eyeOffset.y - 3}
                        r="3"
                        fill="white"
                        opacity="0.9"
                        animate={{ cx: eyeOffset.x + 3, cy: eyeOffset.y - 3 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.circle
                        cx={eyeOffset.x - 2}
                        cy={eyeOffset.y + 2}
                        r="1.5"
                        fill="white"
                        opacity="0.5"
                        animate={{ cx: eyeOffset.x - 2, cy: eyeOffset.y + 2 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* 위 눈꺼풀 라인 */}
                <motion.path
                  d="M-18 0 Q0 -14 18 0"
                  stroke="#8B7355"
                  strokeWidth="1.5"
                  fill="none"
                  animate={{ d: blinkState ? "M-18 0 Q0 0 18 0" : "M-18 0 Q0 -14 18 0" }}
                  transition={{ duration: 0.08 }}
                />

                {/* 속눈썹 */}
                <motion.path
                  d="M16 -2 Q18 -6 20 -8 M10 -6 Q12 -11 13 -14 M2 -8 Q2 -14 1 -16 M-6 -8 Q-7 -14 -9 -16 M-14 -5 Q-17 -10 -20 -12"
                  stroke="#2D2D3A"
                  strokeWidth="1"
                  fill="none"
                  opacity={blinkState ? 0 : 0.7}
                />
              </g>
            </g>

            {/* === 코 === */}
            <g>
              {/* 코 브릿지 */}
              <path
                d="M140 130 L140 175"
                stroke="url(#noseShadow)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
              />

              {/* 코끝 */}
              <ellipse cx="140" cy="180" rx="10" ry="6" fill="#D4A988" opacity="0.4" />

              {/* 콧볼 */}
              <ellipse cx="130" cy="182" rx="6" ry="4" fill="#C4956A" opacity="0.3" />
              <ellipse cx="150" cy="182" rx="6" ry="4" fill="#C4956A" opacity="0.3" />

              {/* 코 하이라이트 */}
              <ellipse cx="140" cy="165" rx="3" ry="8" fill="white" opacity="0.2" />
            </g>

            {/* === 볼 (홍조) === */}
            <motion.ellipse
              cx="88"
              cy="175"
              rx="18"
              ry="10"
              fill="#FFB5B5"
              animate={{ opacity: cheekFlush }}
              transition={{ duration: 0.2 }}
            />
            <motion.ellipse
              cx="192"
              cy="175"
              rx="18"
              ry="10"
              fill="#FFB5B5"
              animate={{ opacity: cheekFlush }}
              transition={{ duration: 0.2 }}
            />

            {/* === 입 === */}
            <g transform="translate(140, 210)">
              <AnimatePresence mode="wait">
                {mouthState === 0 && (
                  <motion.g
                    key="closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    {/* 닫힌 입 - 미소 */}
                    <path
                      d="M-22 0 Q-10 8 0 10 Q10 8 22 0"
                      fill="url(#lipGradient)"
                    />
                    {/* 입술 라인 */}
                    <path
                      d="M-20 2 Q0 6 20 2"
                      stroke="#A85A5F"
                      strokeWidth="1"
                      fill="none"
                    />
                    {/* 입술 하이라이트 */}
                    <ellipse cx="0" cy="3" rx="8" ry="2" fill="white" opacity="0.2" />
                  </motion.g>
                )}

                {mouthState === 1 && (
                  <motion.g
                    key="half"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    {/* 반 열린 입 */}
                    <ellipse cx="0" cy="5" rx="15" ry="8" fill="#4A2C2C" />
                    {/* 윗입술 */}
                    <path
                      d="M-18 0 Q-8 -3 0 -2 Q8 -3 18 0 Q10 4 0 5 Q-10 4 -18 0"
                      fill="url(#lipGradient)"
                    />
                    {/* 아랫입술 */}
                    <path
                      d="M-15 10 Q0 16 15 10 Q10 8 0 8 Q-10 8 -15 10"
                      fill="#C47075"
                    />
                    {/* 치아 */}
                    <rect x="-10" y="1" width="20" height="6" rx="2" fill="#F8F8F8" />
                  </motion.g>
                )}

                {mouthState === 2 && (
                  <motion.g
                    key="open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                  >
                    {/* 크게 열린 입 */}
                    <ellipse cx="0" cy="8" rx="18" ry="14" fill="#3D2020" />
                    {/* 윗입술 */}
                    <path
                      d="M-22 0 Q-10 -5 0 -4 Q10 -5 22 0 Q12 6 0 7 Q-12 6 -22 0"
                      fill="url(#lipGradient)"
                    />
                    {/* 아랫입술 */}
                    <path
                      d="M-18 18 Q0 26 18 18 Q12 14 0 13 Q-12 14 -18 18"
                      fill="#C47075"
                    />
                    {/* 치아 */}
                    <rect x="-12" y="2" width="24" height="8" rx="3" fill="#F8F8F8" />
                    {/* 혀 */}
                    <ellipse cx="0" cy="16" rx="10" ry="6" fill="#D46A6A" />
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          </svg>
        </motion.div>

        {/* 화상통화 UI */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
          <span className="text-xs text-slate-500 font-medium tracking-wide">LIVE</span>
        </div>

        {/* 연결 상태 표시 */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-emerald-500 ${
                  i < 3 ? 'h-2' : 'h-3'
                } ${i < 2 ? 'h-1.5' : ''} ${i === 0 ? 'h-1' : ''}`}
                style={{ height: `${(i + 1) * 3 + 2}px` }}
              />
            ))}
          </div>
        </div>

        {/* 듣는 중 오디오 인디케이터 */}
        {isListening && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-6">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-500 rounded-full"
                animate={{
                  height: [6, 16 + Math.random() * 8, 6],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* 말하는 중 인디케이터 */}
        {isSpeaking && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-full">
              <div className="flex items-end gap-0.5 h-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    animate={{
                      height: [4, 12 + Math.random() * 4, 4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.4,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-white font-medium">말하는 중</span>
            </div>
          </div>
        )}
      </div>

      {/* 코치 이름 */}
      <div className="text-center mt-4">
        <p className="text-lg font-semibold text-[var(--gl-text)]">{coachName}</p>
        <p className="text-sm text-[var(--gl-text-muted)]">
          {isSpeaking ? '이야기하고 있어요' : isListening ? '듣고 있어요' : 'AI 코치'}
        </p>
      </div>
    </div>
  )
}
