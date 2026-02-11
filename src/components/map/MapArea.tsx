'use client'

import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapNode } from './MapNode'
import { MapPath } from './MapPath'
import { generateDummyNodes, WORLD_TOKENS, WorldKey, MapNode as MapNodeType } from './WorldTokens'

interface MapAreaProps {
  selectedWorld: WorldKey
  onNodeClick: (node: MapNodeType) => void
  onNodeEnter: (node: MapNodeType) => void
}

const NODE_GAP = 100 // 노드 간 세로 간격
const NODE_START_Y = 20 // 첫 노드 상단 여백

export function MapArea({ selectedWorld, onNodeClick, onNodeEnter }: MapAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const nodes = useMemo(() => generateDummyNodes(), [])

  // 듀오링고 스타일 - 가운데 중심 살짝 좌우
  const getNodePosition = (index: number) => {
    const baseX = 50
    const offsetX = (index % 2 === 0 ? -5 : 5)
    const y = NODE_START_Y + index * NODE_GAP

    return { x: baseX + offsetX, y }
  }

  const nodePositions = nodes.map((_, i) => getNodePosition(i))

  // 전체 맵 높이 계산 (마지막 노드 + 노드 크기 + 라벨 + 여백)
  const totalHeight = NODE_START_Y + (nodes.length - 1) * NODE_GAP + 120

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-slate-900"
      style={{ height: totalHeight }}
    >
      <div className="relative z-10">
        {/* 경로 - 노드 사이 점선 */}
        {nodes.slice(0, -1).map((node, i) => {
          const start = nodePositions[i]
          const end = nodePositions[i + 1]
          if (!start || !end) return null

          return (
            <MapPath
              key={`path-${node.id}`}
              startX={start.x}
              startY={start.y}
              endX={end.x}
              endY={end.y}
              index={i}
            />
          )
        })}

        {/* 노드들 */}
        {nodes.map((node, i) => {
          const pos = nodePositions[i]
          const isActive = node.worldKey === selectedWorld

          return (
            <motion.div
              key={node.id}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: pos.y,
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
            >
              <MapNode
                node={node}
                isActive={isActive}
                onClick={() => onNodeClick(node)}
                onEnter={() => onNodeEnter(node)}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
