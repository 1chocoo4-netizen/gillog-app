'use client'

import { useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapNode } from './MapNode'
import { MapPath } from './MapPath'
import { generateDummyNodes, WORLD_TOKENS, WorldKey, MapNode as MapNodeType } from './WorldTokens'

interface MapAreaProps {
  selectedWorld: WorldKey
  onNodeClick: (node: MapNodeType) => void
}

export function MapArea({ selectedWorld, onNodeClick }: MapAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 더미 노드 생성 및 선택된 월드 필터링
  const allNodes = useMemo(() => generateDummyNodes(), [])

  // 선택된 월드의 노드들만 표시
  const nodes = useMemo(() => {
    return allNodes.filter(node => node.worldKey === selectedWorld)
  }, [allNodes, selectedWorld])

  // 노드 위치 계산 (지그재그 패턴)
  const getNodePosition = (index: number, total: number) => {
    const baseX = 50 // 중앙 기준
    const offsetX = (index % 2 === 0 ? -15 : 15) + (Math.random() - 0.5) * 10
    const y = 60 + index * 120 // 세로 간격

    return {
      x: baseX + offsetX,
      y,
    }
  }

  const nodePositions = nodes.map((_, i) => getNodePosition(i, nodes.length))

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen pb-32"
      style={{
        background: `
          linear-gradient(180deg,
            rgba(15, 23, 42, 1) 0%,
            rgba(15, 23, 42, 0.98) 50%,
            rgba(20, 30, 50, 1) 100%
          )
        `,
      }}
    >
      {/* 배경 노이즈 텍스처 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 배경 글로우 (선택된 월드 색상) */}
      <motion.div
        key={selectedWorld}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center top, ${WORLD_TOKENS[selectedWorld].bgGlow}, transparent 70%)`,
        }}
      />

      {/* 경로 SVG */}
      <div className="absolute inset-0">
        {nodes.slice(0, -1).map((node, i) => {
          const start = nodePositions[i]
          const end = nodePositions[i + 1]
          if (!start || !end) return null

          return (
            <MapPath
              key={`path-${node.id}`}
              startX={start.x * containerRef.current?.clientWidth! / 100 || start.x * 3.5}
              startY={start.y}
              endX={end.x * containerRef.current?.clientWidth! / 100 || end.x * 3.5}
              endY={end.y}
              isCompleted={node.status === 'completed'}
              index={i}
            />
          )
        })}
      </div>

      {/* 노드들 */}
      <div className="relative z-10 pt-4">
        {nodes.map((node, i) => {
          const pos = nodePositions[i]
          const isActive = node.status === 'active'

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
              />
            </motion.div>
          )
        })}
      </div>

      {/* 하단 페이드 그라데이션 */}
      <div className="fixed bottom-20 left-0 right-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10" />
    </div>
  )
}
