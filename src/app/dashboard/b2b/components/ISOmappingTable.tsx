'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { METRIC_DEFINITIONS } from '@/lib/b2b/isoMapping'
import type { MetricKey, MetricEvidenceMap, EvidenceDate } from '@/lib/b2b/types'

const SOURCE_LABELS: Record<string, string> = {
  execution: '실행',
  survey: '설문',
  checkin: '체크인',
  report: '리포트',
  photo: '사진',
}

const SOURCE_COLORS: Record<string, string> = {
  execution: 'text-indigo-400',
  survey: 'text-amber-400',
  checkin: 'text-emerald-400',
  report: 'text-violet-400',
  photo: 'text-cyan-400',
}

/** 날짜를 YY/MM/DD 형식으로 */
function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  return `${y.slice(2)}/${m}/${d}`
}

/** 증거 날짜를 컴팩트 텍스트로 요약 (접힌 상태) — 월드별 그룹핑 */
function summarizeEvidence(dates: EvidenceDate[]): string {
  if (dates.length === 0) return '—'
  const parts: string[] = []

  // 실행 증거: 월드별 그룹핑 (인지 3 · 자기주도 2)
  const execEntries = dates.filter((d) => d.source === 'execution')
  if (execEntries.length > 0) {
    const worldCounts = new Map<string, number>()
    execEntries.forEach((e) => {
      const label = e.label || '실행'
      worldCounts.set(label, (worldCounts.get(label) || 0) + 1)
    })
    worldCounts.forEach((count, label) => {
      parts.push(`${label} ${count}`)
    })
  }

  // 사진 증거: 월드별 그룹핑
  const photoEntries = dates.filter((d) => d.source === 'photo')
  if (photoEntries.length > 0) {
    parts.push(`사진 ${photoEntries.length}`)
  }

  if (dates.some((d) => d.source === 'survey')) parts.push('설문')
  if (dates.some((d) => d.source === 'report')) parts.push('리포트')
  if (dates.some((d) => d.source === 'checkin')) parts.push('체크인')
  return parts.join(' · ')
}

function EvidenceRow({ metricKey, dates }: { metricKey: MetricKey; dates: EvidenceDate[] }) {
  const [expanded, setExpanded] = useState(false)
  const def = METRIC_DEFINITIONS.find((d) => d.key === metricKey)!
  const summary = summarizeEvidence(dates)

  return (
    <>
      <tr className="border-b border-gray-800/50">
        <td className="py-2.5 text-gray-200">
          <span className="mr-1.5">{def.icon}</span>
          {def.label}
        </td>
        <td className="py-2.5">
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
            {def.isoCode}
          </span>
        </td>
        <td className="py-2.5 text-gray-400">{def.isoName}</td>
        <td className="py-2.5">
          <button
            onClick={() => dates.length > 0 && setExpanded(!expanded)}
            className="flex items-center gap-1 text-gray-400 hover:text-gray-200 transition-colors"
            disabled={dates.length === 0}
          >
            <span className="text-[10px]">{summary}</span>
            {dates.length > 0 && (
              <svg
                className={`w-3 h-3 text-gray-500 transition-transform flex-shrink-0 ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
        </td>
      </tr>
      <AnimatePresence>
        {expanded && dates.length > 0 && (
          <tr>
            <td colSpan={4} className="p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-2 bg-gray-800/30 flex flex-wrap gap-1.5">
                  {dates.map((ev, i) => (
                    <span
                      key={`${ev.date}-${ev.source}-${i}`}
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-mono bg-gray-800 ${SOURCE_COLORS[ev.source] || 'text-gray-400'}`}
                    >
                      {ev.label
                        ? `${ev.label} ${formatDate(ev.date)}`
                        : `${SOURCE_LABELS[ev.source] || ev.source} ${formatDate(ev.date)}`}
                    </span>
                  ))}
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  )
}

interface Props {
  evidence?: MetricEvidenceMap | null
}

export function ISOmappingTable({ evidence }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const totalEvidenceCount = evidence
    ? Object.values(evidence).reduce((sum, arr) => sum + arr.length, 0)
    : 0

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-indigo-400">📋</span>
          <span className="font-medium">ISO 30414 매핑 테이블</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
            8개 지표
          </span>
          {totalEvidenceCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400">
              근거 {totalEvidenceCount}건
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              {/* 범례 */}
              {evidence && (
                <div className="flex flex-wrap gap-3 mb-3 pb-2 border-b border-gray-800">
                  {(['execution', 'survey', 'report', 'checkin', 'photo'] as const).map((src) => (
                    <span key={src} className={`text-[10px] flex items-center gap-1 ${SOURCE_COLORS[src]}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {SOURCE_LABELS[src]}
                    </span>
                  ))}
                </div>
              )}

              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-2 text-left text-gray-500 font-medium">지표</th>
                    <th className="py-2 text-left text-gray-500 font-medium">ISO</th>
                    <th className="py-2 text-left text-gray-500 font-medium">영역</th>
                    <th className="py-2 text-left text-gray-500 font-medium">근거</th>
                  </tr>
                </thead>
                <tbody>
                  {METRIC_DEFINITIONS.map((def) => (
                    <EvidenceRow
                      key={def.key}
                      metricKey={def.key}
                      dates={evidence ? evidence[def.key] || [] : []}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
