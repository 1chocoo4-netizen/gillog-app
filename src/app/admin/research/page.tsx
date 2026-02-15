'use client'

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line,
} from 'recharts'
import ResearchReport from './components/ResearchReport'

// ========================================
// 타입 정의
// ========================================

type ResearchArea = 'career' | 'community' | 'nonCognitive' | 'learning' | 'habit'

interface DescriptiveStats {
  n: number; mean: number; sd: number; median: number; min: number; max: number; q1: number; q3: number
}

interface SlopeResult {
  from: number; to: number; area: ResearchArea
  slope: number; acceleration: number; trend: 'accelerating' | 'decelerating' | 'steady'
}

interface GrowthItem {
  from: number; to: number; n: number
  deltaByArea: Record<ResearchArea, number>
  growthRateByArea: Record<ResearchArea, number>
  cohenDByArea: Record<ResearchArea, { d: number; interpretation: string }>
}

interface PairedItem {
  from: number; to: number
  [key: string]: unknown
}

interface IndividualCurve {
  id: string; totalExecutions: number; milestoneGroup: number
  dataPoints: {
    milestone: number
    survey: Record<ResearchArea, number>
    behavioral: Record<ResearchArea, number> | null
    integrated: Record<ResearchArea, number>
  }[]
}

interface ResearchData {
  subCompetencyStats: Record<number, Record<string, DescriptiveStats>>
  integratedScores: {
    surveyOnly: Record<number, Record<ResearchArea, number>>
    integrated: Record<number, Record<ResearchArea, number>>
  }
  growthAnalysis: GrowthItem[]
  thresholdAnalysis: { slopes: SlopeResult[] }
  individualCurves: IndividualCurve[]
  pairedAnalysis: PairedItem[]
  metadata: {
    computedAt: string
    totalParticipants: number
    milestoneDistribution: Record<number, number>
    milestones: number[]
    areas: string[]
    areaLabels: Record<ResearchArea, string>
  }
}

// ========================================
// 상수 & 유틸
// ========================================

const AREA_LABELS: Record<ResearchArea, string> = {
  career: '진로', community: '공동체', nonCognitive: '인성', learning: '학습', habit: '습관',
}

const AREA_COLORS: Record<ResearchArea, string> = {
  career: '#3B82F6', community: '#EC4899', nonCognitive: '#F59E0B', learning: '#8B5CF6', habit: '#22C55E',
}

const SUB_COMP_LABELS: Record<string, string> = {
  C1: '자기이해', C2: '진로탐색', C3: '진로설계', C4: '진로경험', C5: '진로실행',
  M1: '대인관계', M2: '공감/존중', M3: '참여/협력', M4: '갈등해결', M5: '시민의식',
  N1: '끈기/인내', N2: '자기주도', N3: '정서조절', N4: '도전정신', N5: '자기존중',
  L1: '학습동기', L2: '자기주도학습', L3: '학습집중', L4: '메타인지', L5: '지식전이',
  H1: '생활규칙', H2: '실행력', H3: '건강관리', H4: '자기통제', H5: '습관유지',
}

const AREA_SUB_IDS: Record<ResearchArea, string[]> = {
  career: ['C1', 'C2', 'C3', 'C4', 'C5'],
  community: ['M1', 'M2', 'M3', 'M4', 'M5'],
  nonCognitive: ['N1', 'N2', 'N3', 'N4', 'N5'],
  learning: ['L1', 'L2', 'L3', 'L4', 'L5'],
  habit: ['H1', 'H2', 'H3', 'H4', 'H5'],
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white">{children}</h3>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function TrendBadge({ trend }: { trend: string }) {
  if (trend === 'accelerating') return <span className="text-green-400 text-xs font-medium px-2 py-0.5 bg-green-900/30 rounded">가속</span>
  if (trend === 'decelerating') return <span className="text-red-400 text-xs font-medium px-2 py-0.5 bg-red-900/30 rounded">감속</span>
  return <span className="text-gray-400 text-xs font-medium px-2 py-0.5 bg-gray-800 rounded">유지</span>
}

// ========================================
// 메인 페이지
// ========================================

export default function ResearchDashboardPage() {
  const [data, setData] = useState<ResearchData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'surveyOnly' | 'integrated'>('integrated')
  const [selectedArea, setSelectedArea] = useState<ResearchArea>('career')
  const [selectedMilestone, setSelectedMilestone] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'report'>('dashboard')

  useEffect(() => {
    fetch('/api/admin/research')
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-gray-400">종단 연구 데이터를 분석하는 중...</div></div>
  if (error || !data) return <div className="flex items-center justify-center h-64"><div className="text-red-400">오류: {error || '데이터 없음'}</div></div>

  const milestones = data.metadata.milestones
  const hasData = data.metadata.totalParticipants > 0
  const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">종단 성장 연구 엔진</h2>
          <p className="text-sm text-gray-400 mt-1">
            설문 + 행동 로그 통합 분석 | 5개 영역 x 25개 하위역량 | 마일스톤 1/100/500/1000
          </p>
        </div>
        {/* 모드 전환 토글 */}
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setMode('surveyOnly')}
            className={`px-3 py-1.5 rounded text-xs transition-colors ${
              mode === 'surveyOnly' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Survey Only
          </button>
          <button
            onClick={() => setMode('integrated')}
            className={`px-3 py-1.5 rounded text-xs transition-colors ${
              mode === 'integrated' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Survey + Behavioral
          </button>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'dashboard'
              ? 'text-blue-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          대시보드
          {activeTab === 'dashboard' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'report'
              ? 'text-blue-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          제출용 리포트
          {activeTab === 'report' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
        </button>
      </div>

      {/* 리포트 탭 */}
      {activeTab === 'report' && (
        <ResearchReport data={data} mode={mode} />
      )}

      {/* 대시보드 탭 */}
      {activeTab === 'dashboard' && (
      <>
      {/* ========================================
          1. 연구 개요 카드
          ======================================== */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionTitle sub="Study Overview">연구 개요</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="text-xl font-bold text-white">{data.metadata.totalParticipants}</div>
            <div className="text-xs text-gray-400">총 참여자</div>
          </div>
          {milestones.map((ms) => (
            <div key={ms} className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xl font-bold text-white">{data.metadata.milestoneDistribution[ms] || 0}</div>
              <div className="text-xs text-gray-400">{ms}회 설문</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          분석 시각: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')} | 모드: {mode === 'integrated' ? 'Survey + Behavioral' : 'Survey Only'}
        </p>
      </div>

      {!hasData ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center text-gray-500">
          아직 연구 데이터가 없습니다. 설문 응답이 수집되면 자동으로 분석됩니다.
        </div>
      ) : (
        <>
          {/* ========================================
              2. 마일스톤별 성장률 비교 차트
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 1. Growth Rate by Milestone (Integrated Score)">마일스톤별 영역 평균 점수</SectionTitle>
            {/* 영역 필터 */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedArea === area
                      ? 'text-white font-medium border'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                  }`}
                  style={selectedArea === area ? { backgroundColor: `${AREA_COLORS[area]}30`, borderColor: `${AREA_COLORS[area]}60`, color: AREA_COLORS[area] } : undefined}
                >
                  {AREA_LABELS[area]}
                </button>
              ))}
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={milestones.map((ms) => {
                    const scores = mode === 'integrated' ? data.integratedScores.integrated : data.integratedScores.surveyOnly
                    return {
                      name: `${ms}회 (N=${data.metadata.milestoneDistribution[ms] || 0})`,
                      점수: scores[ms]?.[selectedArea] || 0,
                    }
                  })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                  <Bar dataKey="점수" fill={AREA_COLORS[selectedArea]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================
              3. 하위역량 레이더 차트
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 2. Sub-Competency Radar by Area & Milestone">하위역량 레이더 차트</SectionTitle>
            <div className="flex gap-4 mb-4 flex-wrap items-center">
              {/* 영역 선택 */}
              <div className="flex gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedArea === area
                        ? 'text-white font-medium border'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                    }`}
                    style={selectedArea === area ? { backgroundColor: `${AREA_COLORS[area]}30`, borderColor: `${AREA_COLORS[area]}60`, color: AREA_COLORS[area] } : undefined}
                  >
                    {AREA_LABELS[area]}
                  </button>
                ))}
              </div>
              {/* 마일스톤 선택 */}
              <select
                value={selectedMilestone}
                onChange={(e) => setSelectedMilestone(Number(e.target.value))}
                className="bg-gray-800 text-gray-300 text-xs border border-gray-700 rounded px-2 py-1.5"
              >
                {milestones.map((ms) => (
                  <option key={ms} value={ms}>{ms}회</option>
                ))}
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={AREA_SUB_IDS[selectedArea].map((id) => {
                    const stat = data.subCompetencyStats[selectedMilestone]?.[id]
                    return {
                      subject: SUB_COMP_LABELS[id] || id,
                      value: stat?.mean || 0,
                      fullMark: 100,
                    }
                  })}
                >
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                  <Radar
                    name={`${selectedMilestone}회`}
                    dataKey="value"
                    stroke={AREA_COLORS[selectedArea]}
                    fill={AREA_COLORS[selectedArea]}
                    fillOpacity={0.3}
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================
              4. 구간별 성장 기울기 (임계점 탐지)
              ======================================== */}
          {data.thresholdAnalysis.slopes.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <SectionTitle sub="Table 1. Growth Slope by Interval (Threshold Detection)">구간별 성장 기울기</SectionTitle>
              <p className="text-xs text-gray-500 mb-4">
                각 구간의 기울기(점수변화/실행횟수변화 x100)와 가속/감속 판별
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-2 text-gray-400">구간</th>
                      <th className="text-left py-2 px-2 text-gray-400">영역</th>
                      <th className="text-center py-2 px-2 text-gray-400">기울기</th>
                      <th className="text-center py-2 px-2 text-gray-400">가속도</th>
                      <th className="text-center py-2 px-2 text-gray-400">추세</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.thresholdAnalysis.slopes.map((s, i) => (
                      <tr key={i} className="border-b border-gray-800/30">
                        <td className="py-1.5 px-2 text-gray-300">{s.from} → {s.to}</td>
                        <td className="py-1.5 px-2" style={{ color: AREA_COLORS[s.area] }}>{AREA_LABELS[s.area]}</td>
                        <td className="py-1.5 px-2 text-center text-white">{s.slope.toFixed(4)}</td>
                        <td className="py-1.5 px-2 text-center text-gray-400">{s.acceleration.toFixed(4)}</td>
                        <td className="py-1.5 px-2 text-center"><TrendBadge trend={s.trend} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================
              5. 개인 성장 곡선
              ======================================== */}
          {data.individualCurves.length > 0 && data.individualCurves.some(c => c.dataPoints.length >= 2) && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <SectionTitle sub="Figure 3. Individual Growth Curves (De-identified)">개인 성장 곡선</SectionTitle>
              <p className="text-xs text-gray-500 mb-4">비식별 ID별 통합 점수 변화 ({AREA_LABELS[selectedArea]})</p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={milestones.map((ms) => {
                      const point: Record<string, string | number> = { milestone: `${ms}회` }
                      data.individualCurves
                        .filter(c => c.dataPoints.length >= 2)
                        .forEach((c) => {
                          const dp = c.dataPoints.find(d => d.milestone === ms)
                          if (dp) point[c.id] = Math.round(dp.integrated[selectedArea] * 10) / 10
                        })
                      return point
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="milestone" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                    {data.individualCurves
                      .filter(c => c.dataPoints.length >= 2)
                      .map((c, i) => (
                        <Line
                          key={c.id}
                          type="monotone"
                          dataKey={c.id}
                          stroke={`hsl(${(i * 37) % 360}, 70%, 60%)`}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          connectNulls
                        />
                      ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ========================================
              6. 모드 비교 (Survey Only vs Integrated)
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Figure 4. Survey Only vs Integrated Score Comparison">모드 비교: Survey Only vs Integrated</SectionTitle>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={milestones.map((ms) => ({
                    name: `${ms}회`,
                    'Survey Only': data.integratedScores.surveyOnly[ms]?.[selectedArea] || 0,
                    'Integrated': data.integratedScores.integrated[ms]?.[selectedArea] || 0,
                  }))}
                  barCategoryGap="25%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px', color: '#F3F4F6' }} />
                  <Legend formatter={(value) => <span style={{ color: '#D1D5DB', fontSize: '12px' }}>{value}</span>} />
                  <Bar dataKey="Survey Only" fill="#6B7280" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Integrated" fill={AREA_COLORS[selectedArea]} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ========================================
              7. 대응표본 분석 (성장률)
              ======================================== */}
          {data.growthAnalysis.some(g => g.n >= 2) && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <SectionTitle sub="Table 2. Paired Growth Analysis with Cohen&apos;s d">대응표본 성장 분석</SectionTitle>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-2 text-gray-400">비교 구간</th>
                      <th className="text-center py-2 px-2 text-gray-400">N(쌍)</th>
                      {areas.map(a => (
                        <th key={a} className="text-center py-2 px-2" style={{ color: AREA_COLORS[a] }}>{AREA_LABELS[a]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.growthAnalysis.filter(g => g.n >= 2).map((g) => (
                      <tr key={`${g.from}-${g.to}`} className="border-b border-gray-800/30">
                        <td className="py-1.5 px-2 text-gray-300">{g.from}회 → {g.to}회</td>
                        <td className="py-1.5 px-2 text-center text-gray-300">{g.n}</td>
                        {areas.map(a => (
                          <td key={a} className="py-1.5 px-2 text-center">
                            <div className={`${(g.deltaByArea[a] || 0) > 0 ? 'text-green-400' : (g.deltaByArea[a] || 0) < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                              {(g.deltaByArea[a] || 0) > 0 ? '+' : ''}{(g.deltaByArea[a] || 0).toFixed(1)}
                            </div>
                            {g.cohenDByArea[a] && (
                              <div className="text-gray-500 text-[10px]">
                                d={g.cohenDByArea[a].d.toFixed(2)}
                              </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================
              8. 하위역량 기술통계 테이블
              ======================================== */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <SectionTitle sub="Table 3. Sub-Competency Descriptive Statistics">하위역량 기술통계</SectionTitle>
            <div className="flex gap-2 mb-4">
              {milestones.map((ms) => (
                <button
                  key={ms}
                  onClick={() => setSelectedMilestone(ms)}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedMilestone === ms
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-600/50'
                      : 'bg-gray-800 text-gray-400 border border-gray-700 hover:text-gray-200'
                  }`}
                >
                  {ms}회
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-2 text-gray-400">영역</th>
                    <th className="text-left py-2 px-2 text-gray-400">하위역량</th>
                    <th className="text-center py-2 px-2 text-gray-400">N</th>
                    <th className="text-center py-2 px-2 text-gray-400">M</th>
                    <th className="text-center py-2 px-2 text-gray-400">SD</th>
                    <th className="text-center py-2 px-2 text-gray-400">Mdn</th>
                    <th className="text-center py-2 px-2 text-gray-400">Min</th>
                    <th className="text-center py-2 px-2 text-gray-400">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area) =>
                    AREA_SUB_IDS[area].map((id, idx) => {
                      const stat = data.subCompetencyStats[selectedMilestone]?.[id]
                      if (!stat || stat.n === 0) return null
                      return (
                        <tr key={id} className={`border-b border-gray-800/30 ${idx === 0 ? 'border-t border-gray-700' : ''}`}>
                          {idx === 0 && (
                            <td rowSpan={5} className="py-2 px-2 font-semibold align-top" style={{ color: AREA_COLORS[area] }}>
                              {AREA_LABELS[area]}
                            </td>
                          )}
                          <td className="py-1.5 px-2 text-gray-300">{SUB_COMP_LABELS[id]}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{stat.n}</td>
                          <td className="py-1.5 px-2 text-center text-white font-semibold">{stat.mean.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{stat.sd.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-400">{stat.median.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-500">{stat.min.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-center text-gray-500">{stat.max.toFixed(2)}</td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================
              9. 연구 요약 자동 생성
              ======================================== */}
          <div className="bg-blue-950/20 border border-blue-800/30 rounded-xl p-5">
            <SectionTitle sub="Auto-generated Research Summary">연구 결과 요약 (자동 생성)</SectionTitle>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3">
              <p>
                본 종단 연구에는 총 <strong className="text-white">{data.metadata.totalParticipants}명</strong>의 참여자가 포함되었으며,
                {milestones.map(ms => ` ${ms}회 시점 ${data.metadata.milestoneDistribution[ms] || 0}명`).join(',')}이 설문에 응답하였다.
                분석 모드는 {mode === 'integrated' ? '설문+행동 로그 통합(가중 60:40)' : '설문 단독'}으로 설정되었다.
              </p>

              {/* 마일스톤별 요약 */}
              {milestones.map((ms) => {
                const n = data.metadata.milestoneDistribution[ms] || 0
                if (n === 0) return null
                const scores = mode === 'integrated' ? data.integratedScores.integrated : data.integratedScores.surveyOnly
                const areaScores = scores[ms]
                if (!areaScores) return null
                const avgAll = Object.values(areaScores).reduce((a, b) => a + b, 0) / Object.values(areaScores).length
                return (
                  <p key={ms}>
                    {ms}회 시점(N={n})에서 5개 영역 평균은 <strong className="text-white">{avgAll.toFixed(1)}점</strong>으로,
                    {areas.map(a => ` ${AREA_LABELS[a]} ${(areaScores[a] || 0).toFixed(1)}`).join(',')}이었다.
                  </p>
                )
              })}

              {/* 성장 분석 요약 */}
              {data.growthAnalysis.filter(g => g.n >= 2).map((g) => {
                const maxGrowthArea = areas.reduce((max, a) =>
                  (g.growthRateByArea[a] || 0) > (g.growthRateByArea[max] || 0) ? a : max
                , areas[0])
                return (
                  <p key={`${g.from}-${g.to}`}>
                    {g.from}회 → {g.to}회 대응표본(N={g.n}) 분석 결과,
                    가장 큰 성장을 보인 영역은 <strong className="text-white">{AREA_LABELS[maxGrowthArea]}</strong>
                    (성장률 {(g.growthRateByArea[maxGrowthArea] || 0).toFixed(1)}%)이었다.
                  </p>
                )
              })}
            </div>
          </div>
        </>
      )}
      </>
      )}
    </div>
  )
}
