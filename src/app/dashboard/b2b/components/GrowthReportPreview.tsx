'use client'

import type { GrowthReportData } from '@/lib/b2b/reportTypes'
import { METRIC_DEFINITIONS } from '@/lib/b2b/isoMapping'

export function GrowthReportPreview({ data }: { data: GrowthReportData }) {
  const overallDelta = data.previousOverallScore !== null
    ? data.overallScore - data.previousOverallScore
    : null

  const dateStr = new Date(data.generatedAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="max-w-[680px] mx-auto">
      {/* 페이지 1: 헤더 + 학생정보 + 종합점수 + 역량별 상세 */}
      <div data-pdf-page="1" className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-sm text-sm">
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

        {/* 역량별 상세 분석 */}
        <h2 className="text-sm font-bold text-gray-800 mb-3">역량별 상세 분석</h2>
        <div className="grid grid-cols-2 gap-2">
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
      </div>

      {/* 페이지 2: 담당자 코멘트 + 푸터 */}
      <div data-pdf-page="2" className="bg-white text-gray-800 p-6 sm:p-8 rounded-lg shadow-sm text-sm mt-4">
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
    </div>
  )
}
