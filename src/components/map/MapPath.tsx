'use client'

interface MapPathProps {
  startX: number
  startY: number
  endX: number
  endY: number
  index: number
}

export function MapPath({ startX, startY, endX, endY }: MapPathProps) {
  const y1 = startY + 45
  const y2 = endY + 45
  const height = y2 - y1

  // S자 곡선 컨트롤 포인트 (x: 0~100 좌표계)
  const cp1y = height * 0.4
  const cp2y = height * 0.6

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
        strokeOpacity="0.15"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="6 4"
      />
    </svg>
  )
}
