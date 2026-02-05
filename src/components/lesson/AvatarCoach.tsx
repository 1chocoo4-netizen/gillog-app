'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [blinkState, setBlinkState] = useState(0) // 0: open, 1: closing, 2: closed, 3: opening
  const [mouthOpenness, setMouthOpenness] = useState(0) // 0-1 continuous
  const [breathPhase, setBreathPhase] = useState(0)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [headPose, setHeadPose] = useState({ rotateY: 0, rotateX: 0, rotateZ: 0 })
  const [eyebrowOffset, setEyebrowOffset] = useState(0)
  const [microExpression, setMicroExpression] = useState(0)

  // 자연스러운 눈 깜빡임 (불규칙한 타이밍)
  useEffect(() => {
    const blink = () => {
      setBlinkState(1)
      setTimeout(() => setBlinkState(2), 50)
      setTimeout(() => setBlinkState(3), 100)
      setTimeout(() => setBlinkState(0), 150)
    }

    const scheduleNextBlink = () => {
      // 자연스러운 깜빡임: 2-5초 + 가끔 연속 깜빡임
      const baseDelay = 2500 + Math.random() * 2500
      const doubleBlink = Math.random() < 0.2

      return setTimeout(() => {
        blink()
        if (doubleBlink) {
          setTimeout(blink, 300)
        }
        timerId = scheduleNextBlink()
      }, baseDelay)
    }

    let timerId = scheduleNextBlink()
    return () => clearTimeout(timerId)
  }, [])

  // 호흡 애니메이션
  useEffect(() => {
    let frame: number
    const animate = () => {
      setBreathPhase(prev => (prev + 0.8) % 360)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Idle 미세 움직임
  useEffect(() => {
    if (!isSpeaking && !isListening) {
      const interval = setInterval(() => {
        setHeadPose({
          rotateY: (Math.random() - 0.5) * 4,
          rotateX: (Math.random() - 0.5) * 2,
          rotateZ: (Math.random() - 0.5) * 1.5
        })
        setPupilOffset({
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 2
        })
        setMicroExpression(Math.random())
      }, 3000 + Math.random() * 2000)
      return () => clearInterval(interval)
    }
  }, [isSpeaking, isListening])

  // Speaking 애니메이션
  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        // 자연스러운 입 움직임 (연속적)
        setMouthOpenness(0.3 + Math.random() * 0.7)
        setEyebrowOffset(Math.random() * 2)
        setMicroExpression(Math.random())
      }, 80)

      const headInterval = setInterval(() => {
        setHeadPose({
          rotateY: (Math.random() - 0.5) * 6,
          rotateX: -2 + Math.random() * 4,
          rotateZ: (Math.random() - 0.5) * 2
        })
      }, 300)

      return () => {
        clearInterval(mouthInterval)
        clearInterval(headInterval)
      }
    } else {
      setMouthOpenness(0)
      setEyebrowOffset(0)
    }
  }, [isSpeaking])

  // Listening 애니메이션
  useEffect(() => {
    if (isListening) {
      setHeadPose({ rotateY: 8, rotateX: 3, rotateZ: -2 })

      const eyeInterval = setInterval(() => {
        setPupilOffset({
          x: -2 + Math.random() * 2,
          y: Math.random() * 2
        })
      }, 600)

      return () => clearInterval(eyeInterval)
    }
  }, [isListening])

  const breathY = Math.sin(breathPhase * Math.PI / 180) * 1.5
  const breathScale = 1 + Math.sin(breathPhase * Math.PI / 180) * 0.003

  // 눈 열림 정도 계산
  const eyeOpenness = useMemo(() => {
    switch(blinkState) {
      case 0: return 1
      case 1: return 0.5
      case 2: return 0.05
      case 3: return 0.7
      default: return 1
    }
  }, [blinkState])

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 화상통화 프레임 */}
      <div className="relative bg-gradient-to-b from-neutral-100 to-neutral-200 rounded-2xl overflow-hidden shadow-2xl">
        {/* 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100" />

        {/* 부드러운 조명 효과 */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-white/30 rounded-full blur-3xl" />

        {/* 아바타 컨테이너 */}
        <motion.div
          className="relative aspect-[3/4]"
          animate={{
            y: breathY,
            rotateY: headPose.rotateY,
            rotateX: headPose.rotateX,
            rotateZ: headPose.rotateZ,
            scale: breathScale,
          }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d', perspective: 800 }}
        >
          <svg viewBox="0 0 400 520" className="w-full h-full">
            <defs>
              {/* 피부 베이스 */}
              <radialGradient id="skinBase" cx="50%" cy="35%" r="65%" fx="45%" fy="30%">
                <stop offset="0%" stopColor="#FCEEE8" />
                <stop offset="30%" stopColor="#F5DDD3" />
                <stop offset="60%" stopColor="#E8CBBE" />
                <stop offset="100%" stopColor="#D4B5A5" />
              </radialGradient>

              {/* 피부 서브서피스 스캐터링 효과 */}
              <radialGradient id="skinSSS" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#FFE4DC" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFE4DC" stopOpacity="0" />
              </radialGradient>

              {/* 얼굴 음영 */}
              <linearGradient id="faceShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A090" stopOpacity="0" />
                <stop offset="100%" stopColor="#B8927F" stopOpacity="0.3" />
              </linearGradient>

              {/* 턱 아래 그림자 */}
              <linearGradient id="jawShadow" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#C4A090" stopOpacity="0" />
                <stop offset="70%" stopColor="#A8887A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8B7065" stopOpacity="0.5" />
              </linearGradient>

              {/* 코 그림자 */}
              <linearGradient id="noseShadowL" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#C4A090" stopOpacity="0" />
                <stop offset="100%" stopColor="#B08878" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="noseShadowR" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4A090" stopOpacity="0" />
                <stop offset="100%" stopColor="#B08878" stopOpacity="0.25" />
              </linearGradient>

              {/* 눈 주변 음영 */}
              <radialGradient id="eyeSocketShadow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#D4B8A8" stopOpacity="0" />
                <stop offset="100%" stopColor="#C4A090" stopOpacity="0.3" />
              </radialGradient>

              {/* 홍채 */}
              <radialGradient id="irisGradient" cx="35%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#6B4423" />
                <stop offset="40%" stopColor="#4A2F15" />
                <stop offset="70%" stopColor="#3D2510" />
                <stop offset="100%" stopColor="#1A0F08" />
              </radialGradient>

              {/* 홍채 패턴 */}
              <radialGradient id="irisPattern" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#8B5A2B" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#5C3D1E" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3D2510" stopOpacity="0" />
              </radialGradient>

              {/* 공막 (흰자) */}
              <radialGradient id="scleraGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8F6F4" />
                <stop offset="100%" stopColor="#EBE5E0" />
              </radialGradient>

              {/* 입술 */}
              <linearGradient id="upperLip" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C8888B" />
                <stop offset="50%" stopColor="#B87578" />
                <stop offset="100%" stopColor="#A86568" />
              </linearGradient>
              <linearGradient id="lowerLip" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D49598" />
                <stop offset="40%" stopColor="#C88588" />
                <stop offset="100%" stopColor="#B87578" />
              </linearGradient>

              {/* 머리카락 */}
              <linearGradient id="hairBase" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1C1612" />
                <stop offset="50%" stopColor="#0F0B08" />
                <stop offset="100%" stopColor="#050302" />
              </linearGradient>
              <linearGradient id="hairHighlight" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#3D3028" stopOpacity="0" />
                <stop offset="50%" stopColor="#4A3D30" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3D3028" stopOpacity="0" />
              </linearGradient>

              {/* 옷 */}
              <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FAFAFA" />
                <stop offset="100%" stopColor="#E8E8E8" />
              </linearGradient>

              {/* 필터들 */}
              <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              </filter>
              <filter id="skinTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.15" />
              </filter>
            </defs>

            {/* ===== 목 ===== */}
            <g>
              <ellipse cx="200" cy="420" rx="45" ry="70" fill="url(#skinBase)" />
              <ellipse cx="200" cy="420" rx="45" ry="70" fill="url(#jawShadow)" />
            </g>

            {/* ===== 상체/옷 ===== */}
            <g>
              <path
                d="M100 520 Q100 460 140 440 Q170 425 200 420 Q230 425 260 440 Q300 460 300 520 L300 550 L100 550 Z"
                fill="url(#shirtGradient)"
              />
              {/* 칼라 */}
              <path
                d="M155 440 L200 475 L245 440"
                fill="none"
                stroke="#E0E0E0"
                strokeWidth="2"
              />
              <path d="M200 420 L200 465" stroke="#D8D8D8" strokeWidth="1" />
            </g>

            {/* ===== 얼굴 베이스 ===== */}
            <g filter="url(#shadow)">
              {/* 얼굴 메인 형태 */}
              <path
                d="M115 200
                   Q105 170 110 140
                   Q115 100 145 70
                   Q175 45 200 42
                   Q225 45 255 70
                   Q285 100 290 140
                   Q295 170 285 200
                   Q285 260 265 300
                   Q250 340 230 360
                   Q210 378 200 380
                   Q190 378 170 360
                   Q150 340 135 300
                   Q115 260 115 200"
                fill="url(#skinBase)"
              />

              {/* SSS 효과 */}
              <path
                d="M115 200
                   Q105 170 110 140
                   Q115 100 145 70
                   Q175 45 200 42
                   Q225 45 255 70
                   Q285 100 290 140
                   Q295 170 285 200
                   Q285 260 265 300
                   Q250 340 230 360
                   Q210 378 200 380
                   Q190 378 170 360
                   Q150 340 135 300
                   Q115 260 115 200"
                fill="url(#skinSSS)"
              />

              {/* 오른쪽 얼굴 음영 */}
              <path
                d="M200 42
                   Q225 45 255 70
                   Q285 100 290 140
                   Q295 170 285 200
                   Q285 260 265 300
                   Q250 340 230 360
                   Q210 378 200 380
                   L200 42"
                fill="url(#faceShadow)"
              />
            </g>

            {/* ===== 귀 ===== */}
            <g>
              {/* 왼쪽 귀 */}
              <ellipse cx="112" cy="210" rx="15" ry="28" fill="#E8CBBE" />
              <ellipse cx="115" cy="210" rx="10" ry="20" fill="#D4B5A5" opacity="0.5" />
              <path d="M108 195 Q115 200 112 215 Q108 225 110 230" stroke="#C4A090" strokeWidth="1.5" fill="none" opacity="0.5" />

              {/* 오른쪽 귀 */}
              <ellipse cx="288" cy="210" rx="15" ry="28" fill="#E8CBBE" />
              <ellipse cx="285" cy="210" rx="10" ry="20" fill="#D4B5A5" opacity="0.5" />
              <path d="M292 195 Q285 200 288 215 Q292 225 290 230" stroke="#C4A090" strokeWidth="1.5" fill="none" opacity="0.5" />
            </g>

            {/* ===== 머리카락 ===== */}
            <g>
              {/* 메인 헤어 매스 */}
              <path
                d="M108 160
                   Q95 120 105 80
                   Q115 45 150 25
                   Q180 10 200 8
                   Q220 10 250 25
                   Q285 45 295 80
                   Q305 120 292 160
                   Q280 120 200 105
                   Q120 120 108 160"
                fill="url(#hairBase)"
              />

              {/* 헤어 볼륨 */}
              <ellipse cx="200" cy="50" rx="80" ry="42" fill="url(#hairBase)" />

              {/* 하이라이트 */}
              <path
                d="M130 55 Q160 35 200 32 Q240 35 270 55"
                stroke="url(#hairHighlight)"
                strokeWidth="15"
                fill="none"
                opacity="0.5"
              />

              {/* 이마 라인 */}
              <path
                d="M118 115 Q140 100 200 95 Q260 100 282 115"
                fill="url(#hairBase)"
              />

              {/* 왼쪽 옆머리 */}
              <path
                d="M108 160 Q98 130 105 100 Q95 140 100 180 Q102 200 108 190 Q106 175 108 160"
                fill="url(#hairBase)"
              />

              {/* 오른쪽 옆머리 */}
              <path
                d="M292 160 Q302 130 295 100 Q305 140 300 180 Q298 200 292 190 Q294 175 292 160"
                fill="url(#hairBase)"
              />

              {/* 앞머리 디테일 */}
              <path d="M145 95 Q150 80 155 95" stroke="#1C1612" strokeWidth="4" fill="none" opacity="0.7" />
              <path d="M165 92 Q172 75 178 92" stroke="#1C1612" strokeWidth="5" fill="none" opacity="0.7" />
              <path d="M190 90 Q200 72 210 90" stroke="#1C1612" strokeWidth="6" fill="none" opacity="0.7" />
              <path d="M222 92 Q228 75 235 92" stroke="#1C1612" strokeWidth="5" fill="none" opacity="0.7" />
              <path d="M245 95 Q250 80 255 95" stroke="#1C1612" strokeWidth="4" fill="none" opacity="0.7" />
            </g>

            {/* ===== 눈썹 ===== */}
            <g>
              <motion.path
                d={`M138 ${168 - eyebrowOffset} Q155 ${160 - eyebrowOffset} 178 ${165 - eyebrowOffset * 0.5}`}
                stroke="#2D2318"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                animate={{ d: `M138 ${168 - eyebrowOffset} Q155 ${160 - eyebrowOffset} 178 ${165 - eyebrowOffset * 0.5}` }}
              />
              <motion.path
                d={`M222 ${165 - eyebrowOffset * 0.5} Q245 ${160 - eyebrowOffset} 262 ${168 - eyebrowOffset}`}
                stroke="#2D2318"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                animate={{ d: `M222 ${165 - eyebrowOffset * 0.5} Q245 ${160 - eyebrowOffset} 262 ${168 - eyebrowOffset}` }}
              />
            </g>

            {/* ===== 눈 ===== */}
            <g>
              {/* 왼쪽 눈 */}
              <g transform="translate(158, 195)">
                {/* 눈두덩 음영 */}
                <ellipse cx="0" cy="-5" rx="28" ry="20" fill="url(#eyeSocketShadow)" />

                {/* 공막 (흰자) */}
                <motion.ellipse
                  cx="0"
                  cy="0"
                  rx="24"
                  ry={18 * eyeOpenness}
                  fill="url(#scleraGradient)"
                  animate={{ ry: 18 * eyeOpenness }}
                  transition={{ duration: 0.05 }}
                />

                {/* 눈동자 영역 클리핑 */}
                <clipPath id="eyeClipL">
                  <motion.ellipse
                    cx="0"
                    cy="0"
                    rx="24"
                    ry={18 * eyeOpenness}
                    animate={{ ry: 18 * eyeOpenness }}
                    transition={{ duration: 0.05 }}
                  />
                </clipPath>

                <g clipPath="url(#eyeClipL)">
                  {/* 홍채 */}
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="13"
                    fill="url(#irisGradient)"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* 홍채 패턴 */}
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="13"
                    fill="url(#irisPattern)"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* 홍채 테두리 */}
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="12.5"
                    fill="none"
                    stroke="#1A0F08"
                    strokeWidth="1"
                    opacity="0.5"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* 동공 */}
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="5"
                    fill="#000000"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* 하이라이트 */}
                  <motion.circle
                    cx={pupilOffset.x + 5}
                    cy={pupilOffset.y - 5}
                    r="4"
                    fill="white"
                    opacity="0.95"
                    animate={{ cx: pupilOffset.x + 5, cy: pupilOffset.y - 5 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x - 3}
                    cy={pupilOffset.y + 4}
                    r="2"
                    fill="white"
                    opacity="0.4"
                    animate={{ cx: pupilOffset.x - 3, cy: pupilOffset.y + 4 }}
                    transition={{ duration: 0.2 }}
                  />
                </g>

                {/* 위 눈꺼풀 */}
                <motion.path
                  d={`M-24 0 Q0 ${-20 * eyeOpenness} 24 0`}
                  stroke="#6B5344"
                  strokeWidth="2"
                  fill="none"
                  animate={{ d: `M-24 0 Q0 ${-20 * eyeOpenness} 24 0` }}
                  transition={{ duration: 0.05 }}
                />

                {/* 쌍꺼풀 라인 */}
                <motion.path
                  d={`M-20 ${-8 * eyeOpenness} Q0 ${-18 * eyeOpenness} 20 ${-8 * eyeOpenness}`}
                  stroke="#C4A090"
                  strokeWidth="1"
                  fill="none"
                  opacity={eyeOpenness > 0.5 ? 0.4 : 0}
                  animate={{ d: `M-20 ${-8 * eyeOpenness} Q0 ${-18 * eyeOpenness} 20 ${-8 * eyeOpenness}` }}
                  transition={{ duration: 0.05 }}
                />

                {/* 아래 눈꺼풀 */}
                <path d="M-22 2 Q0 8 22 2" stroke="#9B8070" strokeWidth="0.8" fill="none" opacity="0.4" />

                {/* 속눈썹 */}
                <motion.g opacity={eyeOpenness > 0.3 ? 1 : 0}>
                  <path d="M-20 -3 Q-22 -10 -24 -14" stroke="#1A1512" strokeWidth="1.2" fill="none" />
                  <path d="M-14 -8 Q-15 -16 -14 -20" stroke="#1A1512" strokeWidth="1.3" fill="none" />
                  <path d="M-6 -11 Q-5 -20 -3 -24" stroke="#1A1512" strokeWidth="1.4" fill="none" />
                  <path d="M2 -12 Q4 -21 7 -25" stroke="#1A1512" strokeWidth="1.4" fill="none" />
                  <path d="M10 -10 Q14 -18 18 -22" stroke="#1A1512" strokeWidth="1.3" fill="none" />
                  <path d="M18 -6 Q23 -12 26 -15" stroke="#1A1512" strokeWidth="1.2" fill="none" />
                </motion.g>
              </g>

              {/* 오른쪽 눈 */}
              <g transform="translate(242, 195)">
                <ellipse cx="0" cy="-5" rx="28" ry="20" fill="url(#eyeSocketShadow)" />

                <motion.ellipse
                  cx="0"
                  cy="0"
                  rx="24"
                  ry={18 * eyeOpenness}
                  fill="url(#scleraGradient)"
                  animate={{ ry: 18 * eyeOpenness }}
                  transition={{ duration: 0.05 }}
                />

                <clipPath id="eyeClipR">
                  <motion.ellipse
                    cx="0"
                    cy="0"
                    rx="24"
                    ry={18 * eyeOpenness}
                    animate={{ ry: 18 * eyeOpenness }}
                    transition={{ duration: 0.05 }}
                  />
                </clipPath>

                <g clipPath="url(#eyeClipR)">
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="13"
                    fill="url(#irisGradient)"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="13"
                    fill="url(#irisPattern)"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="12.5"
                    fill="none"
                    stroke="#1A0F08"
                    strokeWidth="1"
                    opacity="0.5"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x}
                    cy={pupilOffset.y}
                    r="5"
                    fill="#000000"
                    animate={{ cx: pupilOffset.x, cy: pupilOffset.y }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x + 5}
                    cy={pupilOffset.y - 5}
                    r="4"
                    fill="white"
                    opacity="0.95"
                    animate={{ cx: pupilOffset.x + 5, cy: pupilOffset.y - 5 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.circle
                    cx={pupilOffset.x - 3}
                    cy={pupilOffset.y + 4}
                    r="2"
                    fill="white"
                    opacity="0.4"
                    animate={{ cx: pupilOffset.x - 3, cy: pupilOffset.y + 4 }}
                    transition={{ duration: 0.2 }}
                  />
                </g>

                <motion.path
                  d={`M-24 0 Q0 ${-20 * eyeOpenness} 24 0`}
                  stroke="#6B5344"
                  strokeWidth="2"
                  fill="none"
                  animate={{ d: `M-24 0 Q0 ${-20 * eyeOpenness} 24 0` }}
                  transition={{ duration: 0.05 }}
                />

                <motion.path
                  d={`M-20 ${-8 * eyeOpenness} Q0 ${-18 * eyeOpenness} 20 ${-8 * eyeOpenness}`}
                  stroke="#C4A090"
                  strokeWidth="1"
                  fill="none"
                  opacity={eyeOpenness > 0.5 ? 0.4 : 0}
                  animate={{ d: `M-20 ${-8 * eyeOpenness} Q0 ${-18 * eyeOpenness} 20 ${-8 * eyeOpenness}` }}
                  transition={{ duration: 0.05 }}
                />

                <path d="M-22 2 Q0 8 22 2" stroke="#9B8070" strokeWidth="0.8" fill="none" opacity="0.4" />

                <motion.g opacity={eyeOpenness > 0.3 ? 1 : 0}>
                  <path d="M20 -3 Q22 -10 24 -14" stroke="#1A1512" strokeWidth="1.2" fill="none" />
                  <path d="M14 -8 Q15 -16 14 -20" stroke="#1A1512" strokeWidth="1.3" fill="none" />
                  <path d="M6 -11 Q5 -20 3 -24" stroke="#1A1512" strokeWidth="1.4" fill="none" />
                  <path d="M-2 -12 Q-4 -21 -7 -25" stroke="#1A1512" strokeWidth="1.4" fill="none" />
                  <path d="M-10 -10 Q-14 -18 -18 -22" stroke="#1A1512" strokeWidth="1.3" fill="none" />
                  <path d="M-18 -6 Q-23 -12 -26 -15" stroke="#1A1512" strokeWidth="1.2" fill="none" />
                </motion.g>
              </g>
            </g>

            {/* ===== 코 ===== */}
            <g>
              {/* 코 브릿지 왼쪽 음영 */}
              <path
                d="M192 170 Q188 210 185 245 Q183 255 188 260"
                fill="url(#noseShadowL)"
                opacity="0.6"
              />
              {/* 코 브릿지 오른쪽 하이라이트 */}
              <path
                d="M208 170 Q212 210 215 245 Q217 255 212 260"
                fill="url(#noseShadowR)"
                opacity="0.4"
              />

              {/* 코끝 */}
              <ellipse cx="200" cy="262" rx="14" ry="10" fill="#E0C0AC" />

              {/* 콧볼 */}
              <ellipse cx="186" cy="268" rx="10" ry="7" fill="#D8B8A4" />
              <ellipse cx="214" cy="268" rx="10" ry="7" fill="#D8B8A4" />

              {/* 콧구멍 */}
              <ellipse cx="190" cy="268" rx="4" ry="3" fill="#8B6B5B" opacity="0.5" />
              <ellipse cx="210" cy="268" rx="4" ry="3" fill="#8B6B5B" opacity="0.5" />

              {/* 코 하이라이트 */}
              <ellipse cx="200" cy="240" rx="4" ry="15" fill="white" opacity="0.15" />
            </g>

            {/* ===== 볼 ===== */}
            <g>
              <motion.ellipse
                cx="140"
                cy="255"
                rx="25"
                ry="15"
                fill="#FFBCBC"
                opacity={0.2 + microExpression * 0.15}
                animate={{ opacity: 0.2 + microExpression * 0.15 }}
                transition={{ duration: 0.2 }}
              />
              <motion.ellipse
                cx="260"
                cy="255"
                rx="25"
                ry="15"
                fill="#FFBCBC"
                opacity={0.2 + microExpression * 0.15}
                animate={{ opacity: 0.2 + microExpression * 0.15 }}
                transition={{ duration: 0.2 }}
              />
            </g>

            {/* ===== 입 ===== */}
            <g transform="translate(200, 310)">
              <motion.g
                animate={{ scaleY: 1 + mouthOpenness * 0.3 }}
                style={{ originY: '0%' }}
              >
                {/* 윗입술 */}
                <motion.path
                  d={`M-28 0
                      Q-20 ${-4 - mouthOpenness * 2} -8 ${-3 - mouthOpenness * 3}
                      Q0 ${-6 - mouthOpenness * 2} 8 ${-3 - mouthOpenness * 3}
                      Q20 ${-4 - mouthOpenness * 2} 28 0
                      Q15 ${4 + mouthOpenness * 8} 0 ${5 + mouthOpenness * 10}
                      Q-15 ${4 + mouthOpenness * 8} -28 0`}
                  fill="url(#upperLip)"
                  animate={{
                    d: `M-28 0
                        Q-20 ${-4 - mouthOpenness * 2} -8 ${-3 - mouthOpenness * 3}
                        Q0 ${-6 - mouthOpenness * 2} 8 ${-3 - mouthOpenness * 3}
                        Q20 ${-4 - mouthOpenness * 2} 28 0
                        Q15 ${4 + mouthOpenness * 8} 0 ${5 + mouthOpenness * 10}
                        Q-15 ${4 + mouthOpenness * 8} -28 0`
                  }}
                  transition={{ duration: 0.05 }}
                />

                {/* 입술 중앙선 (큐피드 보우) */}
                <path
                  d="M-8 -2 Q0 -6 8 -2"
                  stroke="#9B6568"
                  strokeWidth="1"
                  fill="none"
                  opacity="0.5"
                />

                {/* 입 안쪽 (열렸을 때) */}
                {mouthOpenness > 0.1 && (
                  <motion.ellipse
                    cx="0"
                    cy={8 + mouthOpenness * 12}
                    rx={15 + mouthOpenness * 8}
                    ry={mouthOpenness * 15}
                    fill="#4A2020"
                    animate={{
                      cy: 8 + mouthOpenness * 12,
                      rx: 15 + mouthOpenness * 8,
                      ry: mouthOpenness * 15
                    }}
                    transition={{ duration: 0.05 }}
                  />
                )}

                {/* 치아 (열렸을 때) */}
                {mouthOpenness > 0.2 && (
                  <motion.rect
                    x={-12 - mouthOpenness * 3}
                    y={3 + mouthOpenness * 4}
                    width={24 + mouthOpenness * 6}
                    height={mouthOpenness * 10}
                    rx="2"
                    fill="#F5F5F0"
                    animate={{
                      x: -12 - mouthOpenness * 3,
                      y: 3 + mouthOpenness * 4,
                      width: 24 + mouthOpenness * 6,
                      height: mouthOpenness * 10
                    }}
                    transition={{ duration: 0.05 }}
                  />
                )}

                {/* 아랫입술 */}
                <motion.path
                  d={`M-26 ${6 + mouthOpenness * 15}
                      Q0 ${16 + mouthOpenness * 20} 26 ${6 + mouthOpenness * 15}
                      Q15 ${4 + mouthOpenness * 12} 0 ${5 + mouthOpenness * 10}
                      Q-15 ${4 + mouthOpenness * 12} -26 ${6 + mouthOpenness * 15}`}
                  fill="url(#lowerLip)"
                  animate={{
                    d: `M-26 ${6 + mouthOpenness * 15}
                        Q0 ${16 + mouthOpenness * 20} 26 ${6 + mouthOpenness * 15}
                        Q15 ${4 + mouthOpenness * 12} 0 ${5 + mouthOpenness * 10}
                        Q-15 ${4 + mouthOpenness * 12} -26 ${6 + mouthOpenness * 15}`
                  }}
                  transition={{ duration: 0.05 }}
                />

                {/* 입술 하이라이트 */}
                <ellipse cx="0" cy={10 + mouthOpenness * 10} rx="10" ry="3" fill="white" opacity="0.15" />
              </motion.g>
            </g>

            {/* ===== 얼굴 하이라이트 ===== */}
            <g>
              {/* 이마 하이라이트 */}
              <ellipse cx="200" cy="130" rx="40" ry="20" fill="white" opacity="0.08" />
              {/* 코 옆 하이라이트 */}
              <ellipse cx="165" cy="235" rx="15" ry="25" fill="white" opacity="0.05" />
              <ellipse cx="235" cy="235" rx="15" ry="25" fill="white" opacity="0.05" />
            </g>
          </svg>
        </motion.div>

        {/* UI 오버레이 */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] text-slate-500 font-medium tracking-wider">LIVE</span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-0.5">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-0.5 bg-green-500 rounded-full" style={{ height: i * 3 + 2 }} />
          ))}
        </div>

        {/* 상태 인디케이터 */}
        {(isListening || isSpeaking) && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="flex items-end gap-0.5 h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-0.5 rounded-full ${isListening ? 'bg-blue-400' : 'bg-white'}`}
                    animate={{ height: [3, 12 + Math.random() * 6, 3] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-white/90">
                {isSpeaking ? '말하는 중' : '듣고 있어요'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 이름 */}
      <div className="text-center mt-3">
        <p className="font-semibold text-[var(--gl-text)]">{coachName}</p>
        <p className="text-sm text-[var(--gl-text-muted)]">AI 코치</p>
      </div>
    </div>
  )
}
