'use client'

interface MapPathProps {
  startX: number
  startY: number
  endX: number
  endY: number
  index: number
}

export function MapPath({ startX, startY, endX, endY }: MapPathProps) {
  // 노드 중심 (외곽 원 크기/2 ≈ 40px)
  const y1 = startY + 40
  const y2 = endY + 40
  const height = y2 - y1

  if (height <= 0) return null

  const cp1y = height * 0.35
  const cp2y = height * 0.65

  return (
    <svg
      className="absolute left-0 pointer-events-none"
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      style={{ top: y1, width: '100%', height }}
    >
      <path
        d={`M ${startX} 0 C ${startX} ${cp1y} ${endX} ${cp2y} ${endX} ${height}`}
        fill="none"
        stroke="white"
        strokeOpacity="0.08"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="8 6"
      />
    </svg>
  )
}
