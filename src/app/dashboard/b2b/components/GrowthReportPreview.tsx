'use client'

import type { GrowthReportData } from '@/lib/b2b/reportTypes'
import type { MetricKey } from '@/lib/b2b/types'
import { METRIC_DEFINITIONS } from '@/lib/b2b/isoMapping'
import {
  getGridPolygonPoints, getScorePolygonPoints,
  getLabelPositions, getAxisLines, METRIC_ORDER,
} from '@/lib/b2b/radarSvgPath'

const LABEL_MAP: Record<MetricKey, string> = {
  initiative: '실행력', consistency: '일관성', reflectiveness: '성찰',
  adaptability: '적응력', collaboration: '협력', goalClarity: '목표',
  emotionalAware: '정서', growthMindset: '성장',
}

function RadarChartSvg({ data }: { data: GrowthReportData }) {
  const cx = 150, cy = 150, maxR = 110
  const gridLevels = [0.25, 0.5, 0.75, 1.0]
  const labels = getLabelPositions(cx, cy, maxR + 22)
  const axes = getAxisLines(cx, cy, maxR)
  const currentPoints = getScorePolygonPoints(data.currentScores, cx, cy, maxR)

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
      {/* 배경 격자 */}
      {gridLevels.map((level) => (
        <polygon
          key={level}
          points={getGridPolygonPoints(cx, cy, maxR * level)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={0.5}
        />
      ))}
      {/* 축 라인 */}
      {axes.map((a, i) => (
        <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke="#e5e7eb" strokeWidth={0.5} />
      ))}
      {/* 이전 데이터 */}
      {data.previousScores && (
        <polygon
          points={getScorePolygonPoints(data.previousScores, cx, cy, maxR)}
          fill="rgba(148,163,184,0.15)"
          stroke="#94a3b8"
          strokeWidth={1}
        />
      )}
      {/* 현재 데이터 */}
      <polygon
        points={currentPoints}
        fill="rgba(99,102,241,0.2)"
        stroke="#6366f1"
        strokeWidth={1.5}
      />
      {/* 꼭짓점 점 */}
      {METRIC_ORDER.map((key, i) => {
        const ratio = (data.currentScores[key] || 0) / 100
        const angle = (2 * Math.PI * i) / 8 - Math.PI / 2
        const px = cx + maxR * ratio * Math.cos(angle)
        const py = cy + maxR * ratio * Math.sin(angle)
        return <circle key={key} cx={px} cy={py} r={3} fill="#6366f1" />
      })}
      {/* 라벨 */}
      {labels.map(({ key, x, y }) => (
        <text key={key} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
          className="text-[9px] fill-gray-500"
        >
          {LABEL_MAP[key]}
        </text>
      ))}
    </svg>
  )
}

export function GrowthReportPreview({ data }: { data: GrowthReportData }) {
  const overallDelta = data.previousOverallScore !== null
    ? data.overallScore - data.previousOverallScore
    : null

  const dateStr = new Date(data.generatedAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="bg-white text-gray-800 p-6 sm:p-8 max-w-[680px] mx-auto rounded-lg shadow-sm text-sm">
      {/* 헤더 */}
      <div className="flex justify-between items-center pb-3 mb-5 border-b-2 border-indigo-500">
        <div>
          <h1 className="text-lg font-bold text-indigo-600">실행 DNA 성장 리포트</h1>
          <p className="text-xs text-gray-400">gillog Growth Report</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{dateStr}</p>
          <p className="text-xs text-gray-400">{data.institutionName}</p>
        </div>
      </div>

      {/* 학생 정보 */}
      <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-md mb-5">
        <div>
          <p className="text-[10px] text-gray-400">이름</p>
          <p className="font-bold text-sm">{data.studentName}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">실행 횟수</p>
          <p className="font-bold text-sm">{data.executionCount.toLocaleString()}회</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">분석 기준</p>
          <p className="font-bold text-sm">실행 {data.milestone}회</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">기관</p>
          <p className="font-bold text-sm">{data.institutionName}</p>
        </div>
      </div>

      {/* 종합 점수 */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-5">
        <div>
          <p className="text-xs text-gray-400">종합 실행 지수</p>
          <p className="text-3xl font-bold text-indigo-500">{data.overallScore}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">/ 100점</p>
          {overallDelta !== null && (
            <p className={`text-sm font-bold ${overallDelta > 0 ? 'text-indigo-500' : overallDelta < 0 ? 'text-slate-500' : 'text-gray-400'}`}>
              {overallDelta > 0 ? '▲' : overallDelta < 0 ? '▼' : '–'} {Math.abs(overallDelta)}점
            </p>
          )}
        </div>
      </div>

      {/* 레이더 차트 */}
      <div className="mb-5">
        <RadarChartSvg data={data} />
      </div>

      {/* 역량별 상세 */}
      <h2 className="text-sm font-bold text-gray-800 mb-3">역량별 상세 분석</h2>
      <div className="grid grid-cols-2 gap-2 mb-5">
        {METRIC_DEFINITIONS.map((def) => {
          const current = data.currentScores[def.key]
          const prev = data.previousScores?.[def.key] ?? null
          const delta = prev !== null ? current - prev : null
          return (
            <div key={def.key} className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-xs font-bold text-gray-700">{def.label}</p>
              <p className="text-xl font-bold text-indigo-500">{current}</p>
              {delta !== null && (
                <p className={`text-xs font-bold ${delta > 0 ? 'text-indigo-500' : delta < 0 ? 'text-slate-500' : 'text-gray-400'}`}>
                  {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {Math.abs(delta)}점
                </p>
              )}
              <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{data.insights[def.key] || ''}</p>
            </div>
          )
        })}
      </div>

      {/* 담당자 코멘트 */}
      <h2 className="text-sm font-bold text-gray-800 mb-3">담당자 코멘트</h2>
      {data.comments.learning.trim() && (
        <div className="p-3 bg-gray-50 rounded-md border-l-[3px] border-l-indigo-500 mb-2">
          <p className="text-xs font-bold text-indigo-500 mb-1">학습 영역</p>
          <p className="text-xs text-gray-700 leading-relaxed">{data.comments.learning}</p>
        </div>
      )}
      {data.comments.relationship.trim() && (
        <div className="p-3 bg-gray-50 rounded-md border-l-[3px] border-l-indigo-500 mb-2">
          <p className="text-xs font-bold text-indigo-500 mb-1">관계 영역</p>
          <p className="text-xs text-gray-700 leading-relaxed">{data.comments.relationship}</p>
        </div>
      )}
      {data.comments.attitude.trim() && (
        <div className="p-3 bg-gray-50 rounded-md border-l-[3px] border-l-indigo-500 mb-2">
          <p className="text-xs font-bold text-indigo-500 mb-1">태도 영역</p>
          <p className="text-xs text-gray-700 leading-relaxed">{data.comments.attitude}</p>
        </div>
      )}
      {!data.comments.learning.trim() && !data.comments.relationship.trim() && !data.comments.attitude.trim() && (
        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-400">담당자 코멘트가 없습니다.</p>
        </div>
      )}

      {/* 푸터 */}
      <div className="mt-6 pt-3 border-t border-gray-200 flex justify-between">
        <p className="text-[10px] text-gray-400">gillog - 실행 DNA 성장 리포트</p>
        <p className="text-[10px] text-gray-400">ISO 30414 기반 8개 실행 역량 지표 분석</p>
      </div>
    </div>
  )
}
