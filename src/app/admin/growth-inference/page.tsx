'use client'

import { useEffect, useState } from 'react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import InternalReport from './components/InternalReport'
import WhitePaper from './components/WhitePaper'
import AcademicPaper from './components/AcademicPaper'

// ========================================
// 타입 정의
// ========================================

type GrowthState =
  | '감정 과부하' | '동기-실행 괴리' | '회복 중'
  | '급성장' | '정체기' | '안정적 성장'

interface RecoveryCurvePoint {
  month: string
  avgRecoveryDays: number
  count: number
}

interface FailureEvent {
  gapStart: string
  gapEnd: string
  gapDays: number
  recoveryDays: number
  recoveryScore: number
}

interface InferenceResult {
  selfRegulationIndex: number
  executionResilienceIndex: number
  valueActionAlignment: number | null
  recoveryCurveScore: number
  recoveryCurveTrend: 'improving' | 'declining' | 'stable'
  recoveryCurveData: RecoveryCurvePoint[]
  growthState: GrowthState
  growthStateReason: string
  failureEvents: FailureEvent[]
  signals: string[]
}

interface UserInference {
  id: string
  inference: InferenceResult
  totalExecutions: number
  totalCheckins: number
  hasSurvey: boolean
}

export interface GrowthInferenceData {
  users: UserInference[]
  aggregates: {
    avgSelfRegulation: number
    avgResilience: number
    avgAlignment: number | null
    avgRecoveryTrend: number
    sdSelfRegulation?: number
    sdResilience?: number
    sdAlignment?: number | null
    sdRecoveryTrend?: number
    minSelfRegulation?: number
    maxSelfRegulation?: number
    minResilience?: number
    maxResilience?: number
    minAlignment?: number | null
    maxAlignment?: number | null
    minRecoveryTrend?: number
    maxRecoveryTrend?: number
  }
  stateDistribution: Record<GrowthState, number>
  metadata: {
    computedAt: string
    totalUsers: number
    usersWithCheckins: number
    usersWithSurveys: number
  }
  correlationMatrix?: {
    labels: string[]
    matrix: number[][]
  }
}

type TabKey = 'dashboard' | 'internal' | 'whitepaper' | 'academic'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'internal', label: '내부 연구 보고서' },
  { key: 'whitepaper', label: '외부 제출용 백서' },
  { key: 'academic', label: '학술 논문' },
]

// ========================================
// 상수
// ========================================

const STATE_COLORS: Record<GrowthState, string> = {
  '감정 과부하': '#F97316',
  '동기-실행 괴리': '#EF4444',
  '안정적 성장': '#22C55E',
  '정체기': '#6B7280',
  '회복 중': '#3B82F6',
  '급성장': '#8B5CF6',
}

const STATE_LABELS: GrowthState[] = [
  '안정적 성장', '정체기', '회복 중', '급성장', '동기-실행 괴리', '감정 과부하',
]

const AREA_LABELS: Record<string, string> = {
  career: '진로', community: '공동체', nonCognitive: '인성', learning: '학습', habit: '습관',
}

const TREND_LABELS = {
  improving: '개선 중',
  declining: '감소 중',
  stable: '안정',
}

const TREND_COLORS = {
  improving: '#22C55E',
  declining: '#EF4444',
  stable: '#6B7280',
}

// ========================================
// 유틸
// ========================================

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white">{children}</h3>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
}

function ProgressBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

function StateBadge({ state }: { state: GrowthState }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ backgroundColor: STATE_COLORS[state] + '22', color: STATE_COLORS[state] }}
    >
      {state}
    </span>
  )
}

// ========================================
// 페이지 컴포넌트
// ========================================

export default function GrowthInferencePage() {
  const [data, setData] = useState<GrowthInferenceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard')

  useEffect(() => {
    fetch('/api/admin/growth-inference')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-gray-400">데이터 로딩 중...</div>
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

  const selectedUser = data.users.find(u => u.id === selectedUserId)

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 헤더 */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-white">성장 추론 분석</h2>
        <p className="text-sm text-gray-400 mt-1">
          추론/패턴 기반 성장 분석 &middot; {data.metadata.totalUsers}명 &middot;{' '}
          체크인 {data.metadata.usersWithCheckins}명 &middot; 설문 {data.metadata.usersWithSurveys}명
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
      {activeTab === 'dashboard' && (
        <div className="p-6 space-y-6">
          <Section1Overview aggregates={data.aggregates} />
          <Section2StateDistribution stateDistribution={data.stateDistribution} totalUsers={data.metadata.totalUsers} />
          <Section3UserDetail
            users={data.users}
            selectedUserId={selectedUserId}
            onSelect={setSelectedUserId}
            selectedUser={selectedUser}
          />
          <Section4RecoveryCurve users={data.users} selectedUser={selectedUser} />
          <Section5ValueActionGap selectedUser={selectedUser} />
          {selectedUser && <Section6StateTimeline user={selectedUser} />}
          <div className="text-xs text-gray-600 text-right">
            산출 시각: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')}
          </div>
        </div>
      )}

      {activeTab === 'internal' && <InternalReport data={data} />}
      {activeTab === 'whitepaper' && <WhitePaper data={data} />}
      {activeTab === 'academic' && <AcademicPaper data={data} />}
    </div>
  )
}

// ========================================
// 섹션 1: 개요 카드 (4대 지표 평균)
// ========================================

function Section1Overview({ aggregates }: { aggregates: GrowthInferenceData['aggregates'] }) {
  const cards = [
    { label: '자기조절지수', value: aggregates.avgSelfRegulation, color: '#3B82F6' },
    { label: '실행탄력성', value: aggregates.avgResilience, color: '#F59E0B' },
    { label: '가치-행동 일치도', value: aggregates.avgAlignment, color: '#8B5CF6' },
    { label: '회복탄성', value: aggregates.avgRecoveryTrend, color: '#22C55E' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">{c.label}</p>
          <p className="text-2xl font-bold text-white mb-2">
            {c.value !== null ? c.value : '-'}
          </p>
          <ProgressBar value={c.value ?? 0} color={c.color} />
        </div>
      ))}
    </div>
  )
}

// ========================================
// 섹션 2: 성장 상태 분포 (도넛 차트)
// ========================================

function Section2StateDistribution({
  stateDistribution,
  totalUsers,
}: {
  stateDistribution: Record<GrowthState, number>
  totalUsers: number
}) {
  const pieData = STATE_LABELS
    .filter(s => stateDistribution[s] > 0)
    .map(s => ({
      name: s,
      value: stateDistribution[s],
      color: STATE_COLORS[s],
    }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <SectionTitle sub="6가지 성장 상태별 유저 분포">성장 상태 분포</SectionTitle>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 도넛 차트 */}
        <div className="w-full md:w-1/2 h-64">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  itemStyle={{ color: '#E5E7EB' }}
                  formatter={(value: number | undefined) => [`${value ?? 0}명 (${(((value ?? 0) / totalUsers) * 100).toFixed(1)}%)`, '']}
                />
                <Legend
                  formatter={(value: string) => <span className="text-xs text-gray-300">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-sm">데이터 없음</div>
          )}
        </div>

        {/* 상태별 테이블 */}
        <div className="w-full md:w-1/2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2">상태</th>
                <th className="text-right py-2">인원</th>
                <th className="text-right py-2">비율</th>
              </tr>
            </thead>
            <tbody>
              {STATE_LABELS.map(s => (
                <tr key={s} className="border-b border-gray-800/50">
                  <td className="py-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: STATE_COLORS[s] }} />
                    <span className="text-gray-300">{s}</span>
                  </td>
                  <td className="text-right text-gray-300">{stateDistribution[s]}</td>
                  <td className="text-right text-gray-400">
                    {totalUsers > 0 ? ((stateDistribution[s] / totalUsers) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ========================================
// 섹션 3: 개별 유저 상세
// ========================================

function Section3UserDetail({
  users,
  selectedUserId,
  onSelect,
  selectedUser,
}: {
  users: UserInference[]
  selectedUserId: string
  onSelect: (id: string) => void
  selectedUser?: UserInference
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <SectionTitle sub="익명 유저를 선택하여 개별 추론 결과를 확인합니다">개별 유저 상세</SectionTitle>

      <select
        value={selectedUserId}
        onChange={e => onSelect(e.target.value)}
        className="w-full md:w-64 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 mb-4"
      >
        <option value="">유저 선택...</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            {u.id} (실행 {u.totalExecutions}건 / 체크인 {u.totalCheckins}건)
          </option>
        ))}
      </select>

      {selectedUser ? (
        <div className="space-y-4">
          {/* 성장 상태 뱃지 */}
          <div className="flex items-center gap-3">
            <StateBadge state={selectedUser.inference.growthState} />
            <span className="text-sm text-gray-400">{selectedUser.inference.growthStateReason}</span>
          </div>

          {/* 4개 지표 프로그레스바 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MetricBar label="자기조절지수" value={selectedUser.inference.selfRegulationIndex} color="#3B82F6" />
            <MetricBar label="실행탄력성" value={selectedUser.inference.executionResilienceIndex} color="#F59E0B" />
            <MetricBar
              label="가치-행동 일치도"
              value={selectedUser.inference.valueActionAlignment}
              color="#8B5CF6"
            />
            <MetricBar label="회복탄성" value={selectedUser.inference.recoveryCurveScore} color="#22C55E" />
          </div>

          {/* 근거 신호 목록 */}
          {selectedUser.inference.signals.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2">근거 신호</p>
              <div className="flex flex-wrap gap-2">
                {selectedUser.inference.signals.map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 기본 정보 */}
          <div className="flex gap-4 text-xs text-gray-500">
            <span>실행: {selectedUser.totalExecutions}건</span>
            <span>체크인: {selectedUser.totalCheckins}건</span>
            <span>설문: {selectedUser.hasSurvey ? '있음' : '없음'}</span>
            <span>실패 이벤트: {selectedUser.inference.failureEvents.length}건</span>
            <span>회복 추세: {TREND_LABELS[selectedUser.inference.recoveryCurveTrend]}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500 py-8 text-center">유저를 선택하면 상세 추론 결과가 표시됩니다.</div>
      )}
    </div>
  )
}

function MetricBar({ label, value, color }: { label: string; value: number | null; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="text-gray-200 font-medium">{value !== null ? value : '-'}</span>
      </div>
      <ProgressBar value={value ?? 0} color={color} />
    </div>
  )
}

// ========================================
// 섹션 4: 회복탄성 변화 추이 (라인 차트)
// ========================================

function Section4RecoveryCurve({
  users,
  selectedUser,
}: {
  users: UserInference[]
  selectedUser?: UserInference
}) {
  // 전체 평균 또는 개인 데이터
  let chartData: RecoveryCurvePoint[] = []
  let trend: 'improving' | 'declining' | 'stable' = 'stable'

  if (selectedUser) {
    chartData = selectedUser.inference.recoveryCurveData
    trend = selectedUser.inference.recoveryCurveTrend
  } else {
    // 전체 유저의 월별 회복일수 평균
    const monthMap: Record<string, { sum: number; count: number }> = {}
    for (const u of users) {
      for (const pt of u.inference.recoveryCurveData) {
        if (!monthMap[pt.month]) monthMap[pt.month] = { sum: 0, count: 0 }
        monthMap[pt.month].sum += pt.avgRecoveryDays * pt.count
        monthMap[pt.month].count += pt.count
      }
    }
    chartData = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, { sum, count }]) => ({
        month,
        avgRecoveryDays: Math.round((sum / count) * 100) / 100,
        count,
      }))
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <SectionTitle sub={selectedUser ? `${selectedUser.id} 개인` : '전체 평균'}>
        회복탄성 변화 추이
      </SectionTitle>

      {selectedUser && (
        <div className="mb-3">
          <span
            className="text-xs px-2 py-0.5 rounded"
            style={{ backgroundColor: TREND_COLORS[trend] + '22', color: TREND_COLORS[trend] }}
          >
            {TREND_LABELS[trend]}
          </span>
        </div>
      )}

      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} label={{ value: '회복일수', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#E5E7EB' }}
                formatter={(value: number | undefined) => [`${value ?? 0}일`, '평균 회복일수']}
              />
              <Line
                type="monotone"
                dataKey="avgRecoveryDays"
                stroke={TREND_COLORS[trend]}
                strokeWidth={2}
                dot={{ fill: TREND_COLORS[trend], r: 4 }}
                name="평균 회복일수"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-sm text-gray-500">
          회복탄성 데이터가 없습니다. (실행 공백이 없거나 데이터 부족)
        </div>
      )}
    </div>
  )
}

// ========================================
// 섹션 5: 가치-행동 괴리 분석 (막대 차트)
// ========================================

function Section5ValueActionGap({ selectedUser }: { selectedUser?: UserInference }) {
  if (!selectedUser) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionTitle sub="유저를 선택하면 5개 영역별 설문 vs 실행 순위를 비교합니다">
          가치-행동 괴리 분석
        </SectionTitle>
        <div className="h-48 flex items-center justify-center text-sm text-gray-500">
          유저를 선택하면 분석 결과가 표시됩니다.
        </div>
      </div>
    )
  }

  if (selectedUser.inference.valueActionAlignment === null) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionTitle>가치-행동 괴리 분석</SectionTitle>
        <div className="h-48 flex items-center justify-center text-sm text-gray-500">
          이 유저는 설문 데이터가 없어 분석할 수 없습니다.
        </div>
      </div>
    )
  }

  // 간단히 일치도 점수와 설명 표시
  const alignment = selectedUser.inference.valueActionAlignment
  const color = alignment >= 60 ? '#22C55E' : alignment >= 40 ? '#F59E0B' : '#EF4444'
  const description = alignment >= 60
    ? '말(설문)과 행동(실행)이 비교적 일치합니다.'
    : alignment >= 40
      ? '말과 행동 사이에 약간의 괴리가 있습니다.'
      : '말과 행동 사이에 큰 괴리가 있습니다. 동기와 실제 행동의 방향이 다릅니다.'

  // 5개 영역 일치도 시각화 (Spearman 점수 기반 정보)
  const areas = ['career', 'community', 'nonCognitive', 'learning', 'habit'] as const

  // 영역별 막대 데이터 (설문 기반 vs 행동 기반 데이터가 API에서 분리되지 않으므로
  // 전체 일치도 점수를 중심으로 표시)
  const barData = areas.map(a => ({
    area: AREA_LABELS[a],
    areaKey: a,
  }))

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <SectionTitle sub={`${selectedUser.id} - Spearman 순위상관 기반`}>
        가치-행동 괴리 분석
      </SectionTitle>

      <div className="flex items-center gap-4 mb-4">
        <div className="text-3xl font-bold" style={{ color }}>{alignment}</div>
        <div>
          <p className="text-sm text-gray-300">일치도 점수</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      {/* 5개 영역 표시 */}
      <div className="space-y-2">
        {barData.map(b => (
          <div key={b.areaKey} className="flex items-center gap-3">
            <span className="w-16 text-xs text-gray-400 text-right">{b.area}</span>
            <div className="flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${alignment}%`, backgroundColor: color, opacity: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ========================================
// 섹션 6: 상태 전이 타임라인
// ========================================

function Section6StateTimeline({ user }: { user: UserInference }) {
  const events = user.inference.failureEvents

  if (events.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionTitle sub={`${user.id} - 실패 이벤트 기반 타임라인`}>상태 전이 타임라인</SectionTitle>
        <div className="h-32 flex items-center justify-center text-sm text-gray-500">
          실행 공백(실패 이벤트)이 없어 타임라인을 표시할 수 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <SectionTitle sub={`${user.id} - 실패 이벤트 기반 타임라인`}>상태 전이 타임라인</SectionTitle>

      <div className="flex items-center gap-1.5 flex-wrap">
        {events.map((ev, i) => {
          const score = ev.recoveryScore
          const dotColor = score >= 80 ? '#22C55E' : score >= 50 ? '#F59E0B' : '#EF4444'
          return (
            <div key={i} className="group relative">
              <div
                className="w-5 h-5 rounded-full border-2 cursor-pointer transition-transform hover:scale-125"
                style={{ backgroundColor: dotColor + '44', borderColor: dotColor }}
                title={`${ev.gapStart} ~ ${ev.gapEnd} (${ev.gapDays}일 공백, 회복점수 ${score})`}
              />
              {/* 호버 툴팁 */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 whitespace-nowrap z-10">
                <p>{ev.gapStart} ~ {ev.gapEnd}</p>
                <p>공백: {ev.gapDays}일 / 회복점수: {score}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 범례 */}
      <div className="flex gap-4 mt-3 text-xs text-gray-500">
        <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: '#22C55E' }} />빠른 회복 (80+)</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: '#F59E0B' }} />보통 (50-79)</span>
        <span><span className="inline-block w-2.5 h-2.5 rounded-full mr-1" style={{ backgroundColor: '#EF4444' }} />느린 회복 (0-49)</span>
      </div>

      {/* 현재 성장 상태 */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-gray-500">현재 상태:</span>
        <StateBadge state={user.inference.growthState} />
      </div>
    </div>
  )
}
