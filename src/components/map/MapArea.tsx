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

export function MapArea({ selectedWorld, onNodeClick, onNodeEnter }: MapAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 6개 노드 생성 (월드당 1개)
  const nodes = useMemo(() => generateDummyNodes(), [])

  // 노드 위치 계산 (듀오링고 스타일 - 가운데 중심 살짝 좌우)
  const getNodePosition = (index: number) => {
    const baseX = 50
    const offsetX = (index % 2 === 0 ? -4 : 4)
    const y = 16 + index * 88

    return {
      x: baseX + offsetX,
      y,
    }
  }

  const nodePositions = nodes.map((_, i) => getNodePosition(i))

  return (
    <div
      ref={containerRef}
      className="relative w-full pb-48 bg-slate-900"
    >


      {/* 노드들과 경로 */}
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
        {nodes.map((node, i) => {
          const pos = nodePositions[i]
          // selectedWorld와 일치하는 노드가 활성화
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
