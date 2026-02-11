'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from 'recharts'

// ========================================
// 타입 정의
// ========================================

interface DescriptiveStats {
  n: number; mean: number; sd: number; median: number; min: number; max: number; q1: number; q3: number
}

type Area = 'career' | 'community' | 'nonCognitive' | 'total'

interface PairedAreaResult {
  n: number; preMean: number; postMean: number; meanDiff: number; sdDiff: number; cohenD: number; interpretation: string
}

interface PairedAnalysis {
  from: number; to: number
  career: PairedAreaResult; community: PairedAreaResult; nonCognitive: PairedAreaResult; total: PairedAreaResult
}

interface AttritionFunnel {
  totalParticipants: number
  milestone5: { n: number; rate: number }
  milestone100: { n: number; retentionFrom5: number; pairedWith5: number }
  milestone500: { n: number; retentionFrom100: number; pairedWith100: number }
  completedAll: number
  overallRetention: number
}

interface Trajectory {
  id: string
  milestones: { milestone: number; career: number; community: number; nonCognitive: number; total: number }[]
}

interface GrowthResponse {
  descriptiveByMilestone: Record<string, Record<Area, DescriptiveStats>>
  pairedAnalysis: PairedAnalysis[]
  attritionFunnel: AttritionFunnel
  distribution: Record<string, Record<Area, { label: string; count: number }[]>>
  trajectories: Trajectory[]
  metadata: {
    totalResponses: number; uniqueParticipants: number
    dataCollectionRange: { from: string; to: string } | null
    milestones: number[]; areas: string[]
  }
}

// ========================================
// 유틸 컴포넌트
// ========================================

const AREA_LABELS: Record<Area, string> = {
  career: '진로', community: '공동체', nonCognitive: '인성', total: '총점',
}

const AREA_COLORS: Record<Area, string> = {
  career: '#3B82F6', community: '#10B981', nonCognitive: '#F59E0B', total: '#8B5CF6',
}

function CohenDBadge({ d, interpretation }: { d: number; interpretation: string }) {
  let color = 'text-gray-500'
  if (Math.abs(d) >= 0.8) color = 'text-green-400'
  else if (Math.abs(d) >= 0.5) color = 'text-blue-400'
  else if (Math.abs(d) >= 0.2) color = 'text-yellow-400'
  return (
    <span className={`${color} font-mono text-xs`}>
      {d > 0 ? '+' : ''}{d.toFixed(2)} ({interpretation})
    </span>
  )
}

function DiffBadge({ value }: { value: number }) {
  if (value === 0) return <span className="text-gray-500 font-mono text-xs">0.00</span>
  const color = value > 0 ? 'text-green-400' : 'text-red-400'
  return <span className={`${color} font-mono text-xs`}>{value > 0 ? '+' : ''}{value.toFixed(2)}</span>
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white">{children}</h3>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

// ========================================
// 메인 페이지
// ========================================

export default function GrowthAnalysisPage() {
  const [data, setData] = useState<GrowthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedArea, setSelectedArea] = useState<Area>('total')

  useEffect(() => {
    fetch('/api/admin/growth')
      .then((res) => { if (!res.ok) throw new Error('Failed to fetch'); return res.json() })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gray-400">연구 데이터를 분석하는 중...</div></div>
  if (error || !data) return <div className="flex items-center justify-center h-64"><div className="text-red-400">오류: {error || '데이터 없음'}</div></div>

  const milestones = data.metadata.milestones
  const hasData = data.metadata.totalResponses > 0

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 헤더 */}
      <div>
        <h2 className="text-2xl font-bold text-white">연구 데이터 분석</h2>
        <p className="text-sm text-gray-400 mt-1">반복측정 설계(Repeated Measures Design) 기반 성장 역량 설문 분석</p>
      </div>

      {/* 연구 개요 카드 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionTitle sub="Study Overview">연구 설계 개요</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xl font-bold text-white">{data.metadata.uniqueParticipants}</div>
            <div className="text-xs text-gray-400">총 참여자 (N)</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xl font-bold text-white">{data.metadata.totalResponses}</div>
            <div className="text-xs text-gray-400">총 응답 수</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xl font-bold text-white">{milestones.join(', ')}</div>
            <div className="text-xs text-gray-400">측정 시점 (회)</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xl font-bold text-white">3</div>
            <div className="text-xs text-gray-400">측정 영역</div>
          </div>
        </div>
        {data.metadata.dataCollectionRange && (
          <p className="text-xs text-gray-500 mt-3">
            데이터 수집 기간: {new Date(data.metadata.dataCollectionRange.from).toLocaleDateString('ko-KR')} ~ {new Date(data.metadata.dataCollectionRange.to).toLocaleDateString('ko-KR')}
          </p>
        )}
      </div>

      {!hasData ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
          아직 설문 응답 데이터가 없습니다. 학생들이 실행 마일스톤에 도달하면 자동으로 설문이 진행됩니다.
        </div>
      ) : (
        <>
          {/* ========================================
              1. 기술통계 테이블 (Descriptive Statistics)
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Table 1. Descriptive Statistics by Milestone">기술통계량</SectionTitle>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-2 text-gray-400">측정 시점</th>
                    <th className="text-left py-2 px-2 text-gray-400">영역</th>
                    <th className="text-center py-2 px-2 text-gray-400">N</th>
                    <th className="text-center py-2 px-2 text-gray-400">M</th>
                    <th className="text-center py-2 px-2 text-gray-400">SD</th>
                    <th className="text-center py-2 px-2 text-gray-400">Mdn</th>
                    <th className="text-center py-2 px-2 text-gray-400">Min</th>
                    <th className="text-center py-2 px-2 text-gray-400">Max</th>
                    <th className="text-center py-2 px-2 text-gray-400">Q1</th>
                    <th className="text-center py-2 px-2 text-gray-400">Q3</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((ms) => {
                    const msData = data.descriptiveByMilestone[ms]
                    if (!msData) return null
                    return (['career', 'community', 'nonCognitive', 'total'] as Area[]).map((area, areaIdx) => {
                      const s = msData[area]
                      if (!s || s.n === 0) return null
                      return (
                        <tr key={`${ms}-${area}`} className={`border-b border-gray-800/30 ${areaIdx === 0 ? 'border-t border-gray-700' : ''}`}>
                          {areaIdx === 0 && (
                            <td rowSpan={4} className="py-2 px-2 text-gray-200 font-semibold align-top">
                              {ms}회
                            </td>
                          )}
                          <td className="py-1.5 px-2" style={{ color: AREA_COLORS[area] }}>{AREA_LABELS[area]}</td>
                          <td className="py-1.5 px-2 text-center text-gray-300">{s.n}</td>
                          <td className="py-1.5 px-2 text-center text-white font-semibold">{s.mean.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-300">{s.sd.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-300">{s.median.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{s.min.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{s.max.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{s.q1.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{s.q3.toFixed(2)}</td>
                        </tr>
                      )
                    })
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================
              2. 마일스톤별 평균 비교 차트
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 1. Mean Score Comparison by Milestone">마일스톤별 평균 점수 비교</SectionTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={milestones
                    .filter((ms) => data.descriptiveByMilestone[ms]?.total?.n > 0)
                    .map((ms) => ({
                      name: `${ms}회 (N=${data.descriptiveByMilestone[ms]?.total?.n || 0})`,
                      진로: data.descriptiveByMilestone[ms]?.career?.mean || 0,
                      공동체: data.descriptiveByMilestone[ms]?.community?.mean || 0,
                      인성: data.descriptiveByMilestone[ms]?.nonCognitive?.mean || 0,
                    }))}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} formatter={(value, name) => [`${value}점`, name]} />
                  <Legend formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>} />
                  <Bar dataKey="진로" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="공동체" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="인성" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================
              3. 대응표본 분석 (Paired Sample Analysis)
              ======================================== */}
          {data.pairedAnalysis.some((p) => p.total.n > 0) && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <SectionTitle sub="Table 2. Paired Sample Analysis with Cohen's d Effect Size">대응표본 분석</SectionTitle>
              <p className="text-xs text-gray-500 mb-4">
                동일 참여자가 두 시점 모두 응답한 경우의 사전-사후 비교. Cohen&apos;s d: |d|&lt;0.2 무시, 0.2~0.5 작은, 0.5~0.8 중간, &ge;0.8 큰 효과
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-2 text-gray-400">비교 구간</th>
                      <th className="text-left py-2 px-2 text-gray-400">영역</th>
                      <th className="text-center py-2 px-2 text-gray-400">N(쌍)</th>
                      <th className="text-center py-2 px-2 text-gray-400">사전 M</th>
                      <th className="text-center py-2 px-2 text-gray-400">사후 M</th>
                      <th className="text-center py-2 px-2 text-gray-400">M diff</th>
                      <th className="text-center py-2 px-2 text-gray-400">SD diff</th>
                      <th className="text-center py-2 px-2 text-gray-400">Cohen&apos;s d</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.pairedAnalysis.filter((p) => p.total.n > 0).map((p) =>
                      (['career', 'community', 'nonCognitive', 'total'] as Area[]).map((area, areaIdx) => {
                        const a = p[area]
                        return (
                          <tr key={`${p.from}-${p.to}-${area}`} className={`border-b border-gray-800/30 ${areaIdx === 0 ? 'border-t border-gray-700' : ''}`}>
                            {areaIdx === 0 && (
                              <td rowSpan={4} className="py-2 px-2 text-gray-200 font-semibold align-top">
                                {p.from}회 → {p.to}회
                              </td>
                            )}
                            <td className="py-1.5 px-2" style={{ color: AREA_COLORS[area] }}>{AREA_LABELS[area]}</td>
                            <td className="py-1.5 px-2 text-center text-gray-300">{a.n}</td>
                            <td className="py-1.5 px-2 text-center text-gray-300">{a.preMean.toFixed(2)}</td>
                            <td className="py-1.5 px-2 text-center text-gray-300">{a.postMean.toFixed(2)}</td>
                            <td className="py-1.5 px-2 text-center"><DiffBadge value={a.meanDiff} /></td>
                            <td className="py-1.5 px-2 text-center text-gray-400">{a.sdDiff.toFixed(2)}</td>
                            <td className="py-1.5 px-2 text-center"><CohenDBadge d={a.cohenD} interpretation={a.interpretation} /></td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================
              4. 참여자 유지율 퍼널 (Attrition Funnel)
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 2. Participant Retention Funnel">참여자 유지율</SectionTitle>
            <div className="flex items-center justify-center gap-2 py-4">
              {/* 5회 */}
              <div className="text-center">
                <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg px-6 py-4 min-w-[120px]">
                  <div className="text-2xl font-bold text-blue-400">{data.attritionFunnel.milestone5.n}</div>
                  <div className="text-xs text-gray-400 mt-1">5회 설문</div>
                </div>
              </div>
              {/* 화살표 + 유지율 */}
              <div className="text-center px-2">
                <div className="text-xs text-gray-500">→</div>
                <div className="text-xs text-yellow-400">{data.attritionFunnel.milestone100.retentionFrom5}%</div>
                <div className="text-[10px] text-gray-600">유지율</div>
              </div>
              {/* 100회 */}
              <div className="text-center">
                <div className="bg-green-600/20 border border-green-600/40 rounded-lg px-6 py-4 min-w-[120px]">
                  <div className="text-2xl font-bold text-green-400">{data.attritionFunnel.milestone100.n}</div>
                  <div className="text-xs text-gray-400 mt-1">100회 설문</div>
                  <div className="text-[10px] text-gray-500">대응쌍: {data.attritionFunnel.milestone100.pairedWith5}</div>
                </div>
              </div>
              {/* 화살표 + 유지율 */}
              <div className="text-center px-2">
                <div className="text-xs text-gray-500">→</div>
                <div className="text-xs text-yellow-400">{data.attritionFunnel.milestone500.retentionFrom100}%</div>
                <div className="text-[10px] text-gray-600">유지율</div>
              </div>
              {/* 500회 */}
              <div className="text-center">
                <div className="bg-purple-600/20 border border-purple-600/40 rounded-lg px-6 py-4 min-w-[120px]">
                  <div className="text-2xl font-bold text-purple-400">{data.attritionFunnel.milestone500.n}</div>
                  <div className="text-xs text-gray-400 mt-1">500회 설문</div>
                  <div className="text-[10px] text-gray-500">대응쌍: {data.attritionFunnel.milestone500.pairedWith100}</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500">전체 3시점 완료: </span>
              <span className="text-xs font-semibold text-white">{data.attritionFunnel.completedAll}명</span>
              <span className="text-xs text-gray-500"> (전체 대비 {data.attritionFunnel.overallRetention}%)</span>
            </div>
          </div>

          {/* ========================================
              5. 점수 분포 히스토그램
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 3. Score Distribution by Milestone">점수 분포</SectionTitle>
            {/* 영역 선택 탭 */}
            <div className="flex gap-2 mb-4">
              {(['total', 'career', 'community', 'nonCognitive'] as Area[]).map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedArea === area
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                  }`}
                >
                  {AREA_LABELS[area]}
                </button>
              ))}
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={['0-20', '20-40', '40-60', '60-80', '80-100'].map((label, idx) => {
                    const row: Record<string, string | number> = { range: label }
                    for (const ms of milestones) {
                      const dist = data.distribution[ms]?.[selectedArea]
                      row[`${ms}회`] = dist?.[idx]?.count || 0
                    }
                    return row
                  })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" tick={{ fill: '#9CA3AF', fontSize: 11 }} label={{ value: '점수 범위', position: 'insideBottom', offset: -5, fill: '#6B7280', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} allowDecimals={false} label={{ value: '인원(명)', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                  <Legend formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>} />
                  <Bar dataKey="5회" fill="#3B82F6" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="100회" fill="#10B981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="500회" fill="#8B5CF6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================
              6. 개인 궤적 추적 (Individual Trajectories)
              ======================================== */}
          {data.trajectories.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <SectionTitle sub="Figure 4. Individual Growth Trajectories (Paired Samples)">개인별 성장 궤적</SectionTitle>
              <p className="text-xs text-gray-500 mb-4">2개 이상 마일스톤을 완료한 참여자의 총점 변화 (비식별 ID)</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={milestones.map((ms) => {
                    const point: Record<string, string | number> = { milestone: `${ms}회` }
                    data.trajectories.forEach((t) => {
                      const found = t.milestones.find((m) => m.milestone === ms)
                      if (found) point[t.id] = found.total
                    })
                    return point
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="milestone" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                    {data.trajectories.map((t, i) => (
                      <Line
                        key={t.id}
                        type="monotone"
                        dataKey={t.id}
                        stroke={`hsl(${(i * 37) % 360}, 70%, 60%)`}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ========================================
              7. 연구 요약 자동 생성
              ======================================== */}
          <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-5">
            <SectionTitle sub="Auto-generated Research Summary">연구 결과 요약 (자동 생성)</SectionTitle>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                본 연구에는 총 <strong className="text-white">{data.metadata.uniqueParticipants}명</strong>의 참여자가 설문에 응답하였으며,
                총 <strong className="text-white">{data.metadata.totalResponses}건</strong>의 응답이 수집되었다.
                {data.metadata.dataCollectionRange && (
                  <> 데이터 수집은 {new Date(data.metadata.dataCollectionRange.from).toLocaleDateString('ko-KR')}부터 {new Date(data.metadata.dataCollectionRange.to).toLocaleDateString('ko-KR')}까지 진행되었다.</>
                )}
              </p>

              {/* 마일스톤별 기술통계 요약 */}
              {milestones.map((ms) => {
                const s = data.descriptiveByMilestone[ms]?.total
                if (!s || s.n === 0) return null
                return (
                  <p key={ms}>
                    {ms}회 실행 시점(N={s.n})에서 전체 평균 점수는 <strong className="text-white">M={s.mean.toFixed(2)}</strong>(SD={s.sd.toFixed(2)})로 나타났다.
                  </p>
                )
              })}

              {/* 대응표본 요약 */}
              {data.pairedAnalysis.filter((p) => p.total.n > 0).map((p) => (
                <p key={`${p.from}-${p.to}`}>
                  {p.from}회에서 {p.to}회로의 변화를 대응표본(N={p.total.n})으로 분석한 결과,
                  총점 평균 차이는 <DiffBadge value={p.total.meanDiff} />점이었으며,
                  효과크기는 Cohen&apos;s d=<strong className="text-white">{p.total.cohenD.toFixed(2)}</strong>({p.total.interpretation})로 나타났다.
                </p>
              ))}

              {/* 유지율 요약 */}
              <p>
                참여자 유지율 분석 결과, 전체 3시점을 모두 완료한 참여자는
                <strong className="text-white"> {data.attritionFunnel.completedAll}명</strong>({data.attritionFunnel.overallRetention}%)이었다.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
