'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts'

// ========================================
// 타입 정의
// ========================================

interface DimensionStat {
  avg: number; stdDev: number; min: number; max: number
}

interface UserRanking {
  userId: string
  overallScore: number
  careerMaturity: number
  selfDirectedLearning: number
  behavioralPersistence: number
  communityContribution: number
  careerGoalConsistency: number
  computedAt: string
}

interface RecommendationItem {
  id: string
  userId: string
  userName?: string
  dimension: string
  dimensionScore: number
  type: string
  priority: string
  title: string
  description: string
  resourceUrl?: string | null
  createdAt: string
}

interface DashboardData {
  dimensionStats: Record<string, DimensionStat>
  distributions: Record<string, number[]>
  userRankings: UserRanking[]
  overallStats: { avg: number; stdDev: number; min: number; max: number }
  recommendationSummary: {
    total: number; high: number; medium: number; low: number
    byDimension: Record<string, number>
  }
  metadata: {
    computedAt: string | null
    totalUsers: number
    usersWithSnapshots: number
    totalSnapshots: number
  }
}

interface UserDetail {
  userId: string
  coachingSessionCount?: number
  latest: {
    careerMaturity: number
    selfDirectedLearning: number
    behavioralPersistence: number
    communityContribution: number
    careerGoalConsistency: number
    overallScore: number
    computedAt: string
  } | null
  delta: Record<string, number> | null
  history: Array<{
    computedAt: string
    careerMaturity: number
    selfDirectedLearning: number
    behavioralPersistence: number
    communityContribution: number
    careerGoalConsistency: number
    overallScore: number
  }>
  recommendations: RecommendationItem[]
}

// ========================================
// 상수
// ========================================

type DimKey = 'careerMaturity' | 'selfDirectedLearning' | 'behavioralPersistence' | 'communityContribution' | 'careerGoalConsistency'

const DIMENSIONS: { key: DimKey; label: string; color: string }[] = [
  { key: 'careerMaturity', label: '진로성숙도', color: '#3B82F6' },
  { key: 'selfDirectedLearning', label: '자기주도학습', color: '#8B5CF6' },
  { key: 'behavioralPersistence', label: '행동지속률', color: '#F59E0B' },
  { key: 'communityContribution', label: '공동체 기여도', color: '#22C55E' },
  { key: 'careerGoalConsistency', label: '진로목표 일관성', color: '#EC4899' },
]

const DIM_LABEL_MAP: Record<string, string> = Object.fromEntries(
  DIMENSIONS.map(d => [d.key, d.label])
)

const PRIORITY_COLORS: Record<string, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#6B7280',
}

const TYPE_LABELS: Record<string, string> = {
  coaching_adjust: '코칭 조정',
  resource: '리소스 추천',
  coach_flag: '코치 알림',
}

type TabKey = 'dashboard' | 'individual' | 'interventions'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'individual', label: '개별 분석' },
  { key: 'interventions', label: '개입 관리' },
]

// ========================================
// 유틸 컴포넌트
// ========================================

function ProgressBar({ value, color }: { value: number; color: string }) {
  const pct = Math.min(100, Math.max(0, value))
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

function scoreColor(score: number): string {
  if (score >= 70) return 'text-green-400'
  if (score >= 40) return 'text-yellow-400'
  return 'text-red-400'
}

function scoreBgColor(score: number): string {
  if (score >= 70) return 'bg-green-900/30 border-green-800'
  if (score >= 40) return 'bg-yellow-900/30 border-yellow-800'
  return 'bg-red-900/30 border-red-800'
}

function TrendArrow({ delta }: { delta: number | null | undefined }) {
  if (delta === null || delta === undefined) return <span className="text-gray-500">-</span>
  if (delta > 0) return <span className="text-green-400">+{delta.toFixed(1)} ▲</span>
  if (delta < 0) return <span className="text-red-400">{delta.toFixed(1)} ▼</span>
  return <span className="text-gray-500">0 ─</span>
}

// ========================================
// 메인 페이지
// ========================================

export default function AIEnginePage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')

  // 개별 분석
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null)
  const [userLoading, setUserLoading] = useState(false)

  // 개입 관리
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([])
  const [recLoading, setRecLoading] = useState(false)
  const [filterDim, setFilterDim] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string>('')

  // 재산출
  const [computing, setComputing] = useState(false)
  const [computeResult, setComputeResult] = useState<string | null>(null)

  // 대시보드 데이터 로드
  useEffect(() => {
    fetch('/api/admin/ai-engine')
      .then(async r => {
        if (!r.ok) {
          const body = await r.json().catch(() => ({}))
          throw new Error(body.detail || body.error || `HTTP ${r.status}`)
        }
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  // 개별 유저 상세 로드
  const loadUserDetail = useCallback((userId: string) => {
    if (!userId) return
    setUserLoading(true)
    fetch(`/api/admin/ai-engine/${userId}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then(setUserDetail)
      .catch(() => setUserDetail(null))
      .finally(() => setUserLoading(false))
  }, [])

  // 추천 목록 로드
  const loadRecommendations = useCallback(() => {
    setRecLoading(true)
    const params = new URLSearchParams()
    if (filterDim) params.set('dimension', filterDim)
    if (filterPriority) params.set('priority', filterPriority)
    fetch(`/api/admin/ai-engine/recommendations?${params}`)
      .then(r => r.json())
      .then(d => setRecommendations(d.recommendations || []))
      .catch(() => setRecommendations([]))
      .finally(() => setRecLoading(false))
  }, [filterDim, filterPriority])

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    if (activeTab === 'interventions') loadRecommendations()
  }, [activeTab, loadRecommendations])

  // 재산출
  const handleCompute = async () => {
    if (computing) return
    setComputing(true)
    setComputeResult(null)
    try {
      const r = await fetch('/api/admin/ai-engine/compute', { method: 'POST' })
      const d = await r.json()
      if (d.success) {
        setComputeResult(`${d.computed}명 계산 완료, ${d.recommendationsCreated}개 추천 생성`)
        // 새로고침
        const dashRes = await fetch('/api/admin/ai-engine')
        if (dashRes.ok) setData(await dashRes.json())
        loadRecommendations()
      } else {
        setComputeResult(`오류: ${d.error}`)
      }
    } catch (e) {
      setComputeResult(`오류: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setComputing(false)
    }
  }

  // 추천 해결
  const handleResolve = async (id: string) => {
    try {
      await fetch('/api/admin/ai-engine/recommendations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      loadRecommendations()
    } catch { /* ignore */ }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-gray-400">AI 성장엔진 데이터 로딩 중...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex-1 p-6">
        <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 text-red-400">
          데이터 로드 실패: {error || '알 수 없는 오류'}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 헤더 */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-white">AI 성장엔진</h2>
        <p className="text-sm text-gray-400 mt-1">
          5차원 메타 분석 &middot; 전체 {data.metadata.totalUsers}명 &middot;
          분석 완료 {data.metadata.usersWithSnapshots}명
          {data.metadata.computedAt && (
            <> &middot; 최종 산출: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')}</>
          )}
        </p>
      </div>

      {/* 탭 바 */}
      <div className="flex border-b border-gray-800 px-6">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
              activeTab === tab.key
                ? 'text-blue-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
            )}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="p-6 space-y-6">
        {activeTab === 'dashboard' && <DashboardTab data={data} />}
        {activeTab === 'individual' && (
          <IndividualTab
            rankings={data.userRankings}
            selectedUserId={selectedUserId}
            onSelectUser={(id) => { setSelectedUserId(id); loadUserDetail(id) }}
            userDetail={userDetail}
            userLoading={userLoading}
          />
        )}
        {activeTab === 'interventions' && (
          <InterventionsTab
            recommendations={recommendations}
            recLoading={recLoading}
            summary={data.recommendationSummary}
            filterDim={filterDim}
            filterPriority={filterPriority}
            onFilterDim={setFilterDim}
            onFilterPriority={setFilterPriority}
            onRefresh={loadRecommendations}
            onResolve={handleResolve}
            onCompute={handleCompute}
            computing={computing}
            computeResult={computeResult}
          />
        )}
      </div>
    </div>
  )
}

// ========================================
// 탭 1: 대시보드
// ========================================

function DashboardTab({ data }: { data: DashboardData }) {
  // 레이더 차트 데이터
  const radarData = DIMENSIONS.map(d => ({
    subject: d.label,
    value: data.dimensionStats[d.key]?.avg ?? 0,
    fullMark: 100,
  }))

  // 히스토그램 데이터
  const histBins = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-100']

  return (
    <>
      {/* 5차원 개요 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {DIMENSIONS.map(dim => {
          const stat = data.dimensionStats[dim.key]
          return (
            <div key={dim.key} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{dim.label}</p>
              <p className="text-2xl font-bold text-white mb-2">
                {stat?.avg ?? '-'}
              </p>
              <ProgressBar value={stat?.avg ?? 0} color={dim.color} />
              <p className="text-xs text-gray-500 mt-2">
                SD: {stat?.stdDev ?? '-'} &middot; {stat?.min ?? 0}~{stat?.max ?? 0}
              </p>
            </div>
          )
        })}
      </div>

      {/* 종합 점수 + 레이더 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-4">전체 평균 레이더</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                <Radar dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-300 mb-4">종합 점수 통계</h3>
          <div className="space-y-4 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">평균</span>
              <span className="text-white font-bold text-lg">{data.overallStats.avg}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">표준편차</span>
              <span className="text-gray-300">{data.overallStats.stdDev}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">범위</span>
              <span className="text-gray-300">{data.overallStats.min} ~ {data.overallStats.max}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">분석 완료</span>
              <span className="text-gray-300">{data.metadata.usersWithSnapshots}명</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">추천 현황</p>
              <div className="flex gap-3 mt-2">
                <span className="text-red-400 text-sm">긴급 {data.recommendationSummary.high}</span>
                <span className="text-yellow-400 text-sm">주의 {data.recommendationSummary.medium}</span>
                <span className="text-gray-400 text-sm">모니터링 {data.recommendationSummary.low}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 점수 분포 히스토그램 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-300 mb-4">차원별 점수 분포</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={histBins.map((label, i) => {
              const row: Record<string, string | number> = { range: label }
              for (const dim of DIMENSIONS) {
                row[dim.key] = data.distributions[dim.key]?.[i] ?? 0
              }
              return row
            })}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="range" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', fontSize: 12 }} />
              <Legend />
              {DIMENSIONS.map(dim => (
                <Bar key={dim.key} dataKey={dim.key} name={dim.label} fill={dim.color} opacity={0.8} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 유저 랭킹 테이블 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-300 mb-4">
          유저 랭킹 (상위 20명)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">유저 ID</th>
                <th className="py-2 px-3 text-right">종합</th>
                {DIMENSIONS.map(d => (
                  <th key={d.key} className="py-2 px-3 text-right" style={{ color: d.color }}>
                    {d.label.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.userRankings.slice(0, 20).map((user, i) => (
                <tr key={user.userId} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                  <td className="py-2 px-3 text-gray-500">{i + 1}</td>
                  <td className="py-2 px-3 text-gray-300 font-mono text-xs">{user.userId.slice(0, 12)}...</td>
                  <td className={`py-2 px-3 text-right font-bold ${scoreColor(user.overallScore)}`}>
                    {user.overallScore}
                  </td>
                  {DIMENSIONS.map(d => (
                    <td key={d.key} className={`py-2 px-3 text-right ${scoreColor(user[d.key])}`}>
                      {user[d.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.userRankings.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              아직 계산된 데이터가 없습니다. &quot;개입 관리&quot; 탭에서 &quot;재산출&quot; 버튼을 눌러주세요.
            </p>
          )}
        </div>
      </div>
    </>
  )
}

// ========================================
// 탭 2: 개별 분석
// ========================================

function IndividualTab({
  rankings, selectedUserId, onSelectUser, userDetail, userLoading,
}: {
  rankings: UserRanking[]
  selectedUserId: string
  onSelectUser: (id: string) => void
  userDetail: UserDetail | null
  userLoading: boolean
}) {
  // 개인 레이더 데이터
  const radarData = userDetail?.latest
    ? DIMENSIONS.map(d => ({
        subject: d.label,
        value: userDetail.latest![d.key as DimKey] ?? 0,
        fullMark: 100,
      }))
    : []

  return (
    <>
      {/* 유저 선택 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-300 mb-3">유저 선택</h3>
        <select
          value={selectedUserId}
          onChange={e => onSelectUser(e.target.value)}
          className="w-full md:w-96 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="">-- 유저를 선택하세요 --</option>
          {rankings.map(u => (
            <option key={u.userId} value={u.userId}>
              {u.userId.slice(0, 12)}... (종합: {u.overallScore})
            </option>
          ))}
        </select>
      </div>

      {userLoading && (
        <div className="text-gray-400 text-center py-8">유저 데이터 로딩 중...</div>
      )}

      {!userLoading && userDetail && userDetail.latest && (
        <>
          {/* 개인 레이더 + 차원 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-4">개인 레이더 차트</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6B7280', fontSize: 10 }} />
                    <Radar dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">종합 점수</span>
                  <span className={`text-2xl font-bold ${scoreColor(userDetail.latest.overallScore)}`}>
                    {userDetail.latest.overallScore}
                  </span>
                </div>
                {userDetail.delta && (
                  <div className="text-xs text-gray-500">
                    이전 대비: <TrendArrow delta={userDetail.delta.overallScore} />
                  </div>
                )}
              </div>

              {userDetail.coachingSessionCount != null && userDetail.coachingSessionCount > 0 && (
                <div className="bg-violet-900/20 border border-violet-700 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-violet-400">코칭 대화</span>
                    <span className="font-bold text-violet-300">{userDetail.coachingSessionCount}회</span>
                  </div>
                </div>
              )}

              {DIMENSIONS.map(dim => {
                const score = userDetail.latest![dim.key as DimKey]
                const delta = userDetail.delta?.[dim.key] ?? null
                return (
                  <div key={dim.key} className={`border rounded-xl p-3 ${scoreBgColor(score)}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: dim.color }}>{dim.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${scoreColor(score)}`}>{score}</span>
                        <TrendArrow delta={delta} />
                      </div>
                    </div>
                    <ProgressBar value={score} color={dim.color} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* 트렌드 라인 차트 */}
          {userDetail.history.length >= 2 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-4">차원별 변화 추이</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userDetail.history.map(h => ({
                    ...h,
                    date: new Date(h.computedAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', fontSize: 12 }} />
                    <Legend />
                    {DIMENSIONS.map(dim => (
                      <Line
                        key={dim.key}
                        type="monotone"
                        dataKey={dim.key}
                        name={dim.label}
                        stroke={dim.color}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 유저 추천 */}
          {userDetail.recommendations.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <h3 className="text-sm font-medium text-gray-300 mb-4">
                활성 추천 ({userDetail.recommendations.length}건)
              </h3>
              <div className="space-y-2">
                {userDetail.recommendations.map(rec => (
                  <div key={rec.id} className="border border-gray-700 rounded-lg p-3 flex items-start gap-3">
                    <span
                      className="inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: PRIORITY_COLORS[rec.priority] }}
                    />
                    <div>
                      <p className="text-sm text-white">{rec.title}</p>
                      <p className="text-xs text-gray-400 mt-1">{rec.description}</p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {DIM_LABEL_MAP[rec.dimension] ?? rec.dimension}
                        </span>
                        <span className="text-xs text-gray-600">&middot;</span>
                        <span className="text-xs text-gray-500">
                          {TYPE_LABELS[rec.type] ?? rec.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!userLoading && selectedUserId && userDetail && !userDetail.latest && (
        <div className="bg-gray-800 rounded-xl p-8 text-center text-gray-400">
          이 유저의 분석 데이터가 아직 없습니다. &quot;개입 관리&quot; 탭에서 재산출을 실행해주세요.
        </div>
      )}
    </>
  )
}

// ========================================
// 탭 3: 개입 관리
// ========================================

function InterventionsTab({
  recommendations, recLoading, summary,
  filterDim, filterPriority, onFilterDim, onFilterPriority,
  onRefresh, onResolve, onCompute, computing, computeResult,
}: {
  recommendations: RecommendationItem[]
  recLoading: boolean
  summary: DashboardData['recommendationSummary']
  filterDim: string
  filterPriority: string
  onFilterDim: (v: string) => void
  onFilterPriority: (v: string) => void
  onRefresh: () => void
  onResolve: (id: string) => void
  onCompute: () => void
  computing: boolean
  computeResult: string | null
}) {
  return (
    <>
      {/* 우선순위 카드 + 재산출 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4">
          <p className="text-xs text-red-400">긴급 (High)</p>
          <p className="text-3xl font-bold text-red-400 mt-1">{summary.high}</p>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4">
          <p className="text-xs text-yellow-400">주의 (Medium)</p>
          <p className="text-3xl font-bold text-yellow-400 mt-1">{summary.medium}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <p className="text-xs text-gray-400">모니터링 (Low)</p>
          <p className="text-3xl font-bold text-gray-300 mt-1">{summary.low}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
          <p className="text-xs text-gray-400">전체 재산출</p>
          <button
            onClick={onCompute}
            disabled={computing}
            className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm rounded-lg transition-colors"
          >
            {computing ? '계산 중...' : '재산출 실행'}
          </button>
          {computeResult && (
            <p className="text-xs text-green-400 mt-1">{computeResult}</p>
          )}
        </div>
      </div>

      {/* 필터 */}
      <div className="flex gap-3 items-center">
        <select
          value={filterDim}
          onChange={e => onFilterDim(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
        >
          <option value="">전체 차원</option>
          {DIMENSIONS.map(d => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
        <select
          value={filterPriority}
          onChange={e => onFilterPriority(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white"
        >
          <option value="">전체 우선순위</option>
          <option value="high">긴급</option>
          <option value="medium">주의</option>
          <option value="low">모니터링</option>
        </select>
        <button
          onClick={onRefresh}
          className="px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg transition-colors"
        >
          새로고침
        </button>
      </div>

      {/* 추천 테이블 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-sm font-medium text-gray-300 mb-4">
          활성 추천 ({recommendations.length}건)
        </h3>
        {recLoading ? (
          <p className="text-gray-500 text-center py-8">로딩 중...</p>
        ) : recommendations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">표시할 추천이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="py-2 px-3 text-left">우선순위</th>
                  <th className="py-2 px-3 text-left">유저</th>
                  <th className="py-2 px-3 text-left">차원</th>
                  <th className="py-2 px-3 text-right">점수</th>
                  <th className="py-2 px-3 text-left">유형</th>
                  <th className="py-2 px-3 text-left">제목</th>
                  <th className="py-2 px-3 text-center">액션</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map(rec => (
                  <tr key={rec.id} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="py-2 px-3">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: PRIORITY_COLORS[rec.priority] + '22',
                          color: PRIORITY_COLORS[rec.priority],
                        }}
                      >
                        {rec.priority === 'high' ? '긴급' : rec.priority === 'medium' ? '주의' : '모니터링'}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-gray-300 text-xs font-mono">
                      {(rec.userName || rec.userId).slice(0, 10)}
                    </td>
                    <td className="py-2 px-3 text-gray-300 text-xs">
                      {DIM_LABEL_MAP[rec.dimension] ?? rec.dimension}
                    </td>
                    <td className={`py-2 px-3 text-right font-bold ${scoreColor(rec.dimensionScore)}`}>
                      {rec.dimensionScore}
                    </td>
                    <td className="py-2 px-3 text-gray-400 text-xs">
                      {TYPE_LABELS[rec.type] ?? rec.type}
                    </td>
                    <td className="py-2 px-3 text-gray-300 text-xs max-w-xs truncate">
                      {rec.title}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => onResolve(rec.id)}
                        className="px-2 py-1 text-xs bg-green-800/30 text-green-400 border border-green-700 rounded hover:bg-green-800/50 transition-colors"
                      >
                        해결
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
