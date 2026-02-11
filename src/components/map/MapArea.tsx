'use client'

import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapNode } from './MapNode'
import { MapPath } from './MapPath'
import { generateDummyNodes, WorldKey, MapNode as MapNodeType } from './WorldTokens'

interface MapAreaProps {
  selectedWorld: WorldKey
  onNodeClick: (node: MapNodeType) => void
  onNodeEnter: (node: MapNodeType) => void
}

const NODE_GAP = 120
const NODE_START_Y = 12

export function MapArea({ selectedWorld, onNodeClick, onNodeEnter }: MapAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodes = useMemo(() => generateDummyNodes(), [])

  // 듀오링고식 S자 좌우 흔들림 (왼쪽 치우침 + 큰 스윙)
  const getNodePosition = (index: number) => {
    const pattern = [35, 55, 30, 60, 35, 55] // 좌-우 패턴
    const x = pattern[index % pattern.length]
    const y = NODE_START_Y + index * NODE_GAP
    return { x, y }
  }

  const nodePositions = nodes.map((_, i) => getNodePosition(i))
  const totalHeight = NODE_START_Y + (nodes.length - 1) * NODE_GAP + 140

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: totalHeight }}
    >
      <div className="relative z-10">
        {/* 경로선 */}
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

        {/* 노드 */}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
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
