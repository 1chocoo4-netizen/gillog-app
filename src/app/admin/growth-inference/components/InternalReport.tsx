'use client'

import { useState } from 'react'
import type { GrowthInferenceData } from '../page'

// ========================================
// 내부 연구 보고서 (5섹션)
// ========================================

interface Props {
  data: GrowthInferenceData
}

// 연구 등급
type StudyGrade = 'preliminary' | 'exploratory' | 'confirmatory'

function getStudyGrade(N: number): StudyGrade {
  if (N >= 30) return 'confirmatory'
  if (N >= 10) return 'exploratory'
  return 'preliminary'
}

const GRADE_LABELS: Record<StudyGrade, string> = {
  preliminary: '예비 연구 (Preliminary)',
  exploratory: '탐색적 연구 (Exploratory)',
  confirmatory: '확인적 연구 (Confirmatory)',
}

function SectionHeader({ number, title, sub }: { number: string; title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-white">
        <span className="text-blue-400 mr-2">{number}</span>
        {title}
      </h3>
      {sub && <p className="text-xs text-gray-500 mt-0.5 ml-6">{sub}</p>}
    </div>
  )
}

export default function InternalReport({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const N = data.metadata.totalUsers
  const grade = getStudyGrade(N)
  const agg = data.aggregates

  // 인사이트 자동 생성
  const insights = generateInsights(data)

  // 전체 복사용 텍스트 생성
  const handleCopy = async () => {
    const text = buildCopyText(data, grade, insights)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 보고서 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">내부 연구 보고서</h2>
          <p className="text-sm text-gray-400 mt-1">길로그 성장 추론 지표 정의서 및 산정 논리</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
            grade === 'confirmatory' ? 'bg-green-900/40 text-green-400 border border-green-700/50' :
            grade === 'exploratory' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50' :
            'bg-gray-800 text-gray-400 border border-gray-700'
          }`}>
            {GRADE_LABELS[grade]} (N={N})
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
          >
            {copied ? '복사 완료!' : '전문 복사'}
          </button>
        </div>
      </div>

      {/* 1.1 성장지표 정의서 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1.1" title="성장지표 정의서" sub="4대 추론 지표 요약" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표명</th>
                <th className="text-left py-2 px-3">영문명</th>
                <th className="text-center py-2 px-3">범위</th>
                <th className="text-left py-2 px-3">측정 목적</th>
                <th className="text-left py-2 px-3">데이터 소스</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 font-medium">자기조절지수</td>
                <td className="py-2.5 px-3 text-gray-400">Self-Regulation Index</td>
                <td className="py-2.5 px-3 text-center">0~100</td>
                <td className="py-2.5 px-3">감정 상태에도 불구하고 실행하는 능력</td>
                <td className="py-2.5 px-3 text-gray-400">Checkin + ExecutionRecord</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 font-medium">실행탄력성</td>
                <td className="py-2.5 px-3 text-gray-400">Execution Resilience</td>
                <td className="py-2.5 px-3 text-center">0~100</td>
                <td className="py-2.5 px-3">실패 후 복귀하는 속도</td>
                <td className="py-2.5 px-3 text-gray-400">ExecutionRecord 시계열</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 font-medium">가치-행동 일치도</td>
                <td className="py-2.5 px-3 text-gray-400">Value-Action Alignment</td>
                <td className="py-2.5 px-3 text-center">0~100</td>
                <td className="py-2.5 px-3">말(설문)과 행동(실행)의 일치</td>
                <td className="py-2.5 px-3 text-gray-400">SurveyResponse + ExecutionRecord</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium">회복탄성 변화곡선</td>
                <td className="py-2.5 px-3 text-gray-400">Recovery Curve</td>
                <td className="py-2.5 px-3 text-center">0~100</td>
                <td className="py-2.5 px-3">회복 능력 자체의 성장 추세</td>
                <td className="py-2.5 px-3 text-gray-400">FailureEvent 월별 추세</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 1.2 지표별 구성요소 설명 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1.2" title="지표별 구성요소 설명" sub="각 지표의 입력 데이터, 가중치, 해석 기준" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 자기조절지수 */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-3">자기조절지수 (SRI)</h4>
            <div className="space-y-2 text-xs">
              <div><span className="text-gray-500">입력 데이터:</span> <span className="text-gray-300">Checkin(mood, energy), ExecutionRecord(date)</span></div>
              <div><span className="text-gray-500">가중치:</span> <span className="text-gray-300">기분나쁜날 실행비율(50%) + 에너지낮은날 실행비율(30%) + 감정안정도(20%)</span></div>
              <div><span className="text-gray-500">해석 기준:</span></div>
              <div className="flex gap-2 ml-2">
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded">0~30: 주의</span>
                <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded">30~70: 보통</span>
                <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded">70~100: 우수</span>
              </div>
              <div><span className="text-gray-500">엣지 케이스:</span> <span className="text-gray-300">체크인 없으면 0, 나쁜 날 없으면 중립(0.5) 적용</span></div>
            </div>
          </div>

          {/* 실행탄력성 */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-yellow-400 mb-3">실행탄력성 (ERI)</h4>
            <div className="space-y-2 text-xs">
              <div><span className="text-gray-500">입력 데이터:</span> <span className="text-gray-300">ExecutionRecord 시계열(일별 공백 감지)</span></div>
              <div><span className="text-gray-500">수식:</span> <span className="text-gray-300">mean(max(0, 100 - (공백일수 - 2) × 10))</span></div>
              <div><span className="text-gray-500">해석 기준:</span></div>
              <div className="flex gap-2 ml-2">
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded">0~30: 주의</span>
                <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded">30~70: 보통</span>
                <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded">70~100: 우수</span>
              </div>
              <div><span className="text-gray-500">엣지 케이스:</span> <span className="text-gray-300">실행 공백 없으면 80점(꾸준하나 탄력성 미검증)</span></div>
            </div>
          </div>

          {/* 가치-행동 일치도 */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-3">가치-행동 일치도 (VAA)</h4>
            <div className="space-y-2 text-xs">
              <div><span className="text-gray-500">입력 데이터:</span> <span className="text-gray-300">SurveyResponse(5영역 점수) + ExecutionRecord(worldKey)</span></div>
              <div><span className="text-gray-500">수식:</span> <span className="text-gray-300">((Spearman_rho + 1) / 2) × 100</span></div>
              <div><span className="text-gray-500">해석 기준:</span></div>
              <div className="flex gap-2 ml-2">
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded">0~40: 괴리</span>
                <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 rounded">40~60: 보통</span>
                <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded">60~100: 일치</span>
              </div>
              <div><span className="text-gray-500">엣지 케이스:</span> <span className="text-gray-300">설문 데이터 없으면 null 반환</span></div>
            </div>
          </div>

          {/* 회복탄성 변화곡선 */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-3">회복탄성 변화곡선 (RC)</h4>
            <div className="space-y-2 text-xs">
              <div><span className="text-gray-500">입력 데이터:</span> <span className="text-gray-300">FailureEvent 월별 집계 → 선형회귀</span></div>
              <div><span className="text-gray-500">수식:</span> <span className="text-gray-300">선형회귀 기울기 → improving(기울기&lt;-0.5) / declining(&gt;0.5) / stable</span></div>
              <div><span className="text-gray-500">해석 기준:</span></div>
              <div className="flex gap-2 ml-2">
                <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded">improving: 회복력 향상</span>
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded">declining: 회복력 감소</span>
              </div>
              <div><span className="text-gray-500">엣지 케이스:</span> <span className="text-gray-300">실패 이벤트 없으면 score=50, trend=stable</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.3 점수 산정 논리 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1.3" title="점수 산정 논리" sub="수식 및 성장 상태 결정 트리" />

        {/* 수식 */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
            <span className="text-blue-400 font-medium">자기조절</span>
            <span className="text-gray-400"> = </span>
            <span className="text-gray-300">(기분나쁜날_실행비율 × 50) + (에너지낮은날_실행비율 × 30) + (감정안정도 × 20)</span>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
            <span className="text-yellow-400 font-medium">실행탄력성</span>
            <span className="text-gray-400"> = </span>
            <span className="text-gray-300">mean(max(0, 100 - (공백일수 - 2) × 10))</span>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
            <span className="text-purple-400 font-medium">가치-행동</span>
            <span className="text-gray-400"> = </span>
            <span className="text-gray-300">((Spearman_rho + 1) / 2) × 100</span>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-sm">
            <span className="text-green-400 font-medium">회복탄성</span>
            <span className="text-gray-400"> = </span>
            <span className="text-gray-300">선형회귀 기울기 기반 (improving / declining / stable)</span>
          </div>
        </div>

        {/* 결정 트리 */}
        <h4 className="text-sm font-semibold text-gray-300 mb-3">성장 상태 분류 결정 트리</h4>
        <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
          <div className="text-orange-400">감정과부하? → mood&lt;2.5 AND 실행감소</div>
          <div className="text-gray-600 ml-2">↓ No</div>
          <div className="text-red-400">동기-실행괴리? → 일치도&lt;40 AND 실행감소</div>
          <div className="text-gray-600 ml-2">↓ No</div>
          <div className="text-blue-400">회복 중? → 최근공백 AND 복귀</div>
          <div className="text-gray-600 ml-2">↓ No</div>
          <div className="text-purple-400">급성장? → 조절≥70 AND 탄력≥70 AND improving AND 증가</div>
          <div className="text-gray-600 ml-2">↓ No</div>
          <div className="text-gray-400">정체기? → 실행안정</div>
          <div className="text-gray-600 ml-2">↓ No</div>
          <div className="text-green-400">안정적 성장 (기본값)</div>
        </div>
      </section>

      {/* 1.4 코칭 질문 매핑표 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1.4" title="코칭 질문 매핑표" sub="6가지 성장 상태별 코칭 전략" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">상태</th>
                <th className="text-left py-2 px-3">코칭 방향</th>
                <th className="text-left py-2 px-3">핵심 질문 예시</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {COACHING_MAP.map(row => (
                <tr key={row.state} className="border-b border-gray-800/50">
                  <td className="py-2.5 px-3">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: STATE_COLORS[row.state] + '22', color: STATE_COLORS[row.state] }}
                    >
                      {row.state}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-gray-400">{row.direction}</td>
                  <td className="py-2.5 px-3">
                    <div className="space-y-1">
                      {row.questions.map((q, i) => (
                        <div key={i} className="text-gray-300 text-xs">&ldquo;{q}&rdquo;</div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 1.5 현재 데이터 현황 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1.5" title="현재 데이터 현황" sub="API 데이터에서 자동 삽입" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">전체 참여자</p>
            <p className="text-2xl font-bold text-white">{data.metadata.totalUsers}명</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">체크인 보유</p>
            <p className="text-2xl font-bold text-white">{data.metadata.usersWithCheckins}명</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">설문 보유</p>
            <p className="text-2xl font-bold text-white">{data.metadata.usersWithSurveys}명</p>
          </div>
        </div>

        {/* 4대 지표 평균 */}
        <h4 className="text-sm font-semibold text-gray-300 mb-3">4대 지표 요약</h4>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표</th>
                <th className="text-right py-2 px-3">평균</th>
                <th className="text-right py-2 px-3">SD</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">자기조절지수</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgSelfRegulation}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdSelfRegulation ?? '-'}</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">실행탄력성</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgResilience}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdResilience ?? '-'}</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">가치-행동 일치도</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgAlignment ?? '-'}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdAlignment ?? '-'}</td>
              </tr>
              <tr>
                <td className="py-2 px-3">회복탄성</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgRecoveryTrend}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdRecoveryTrend ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 상태 분포 요약 */}
        <h4 className="text-sm font-semibold text-gray-300 mb-3">상태 분포 요약</h4>
        <div className="flex flex-wrap gap-3">
          {Object.entries(data.stateDistribution).map(([state, count]) => (
            <div key={state} className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2">
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: STATE_COLORS[state as keyof typeof STATE_COLORS] + '22', color: STATE_COLORS[state as keyof typeof STATE_COLORS] }}
              >
                {state}
              </span>
              <span className="text-sm text-gray-300 font-medium">{count}명</span>
              <span className="text-xs text-gray-500">
                ({N > 0 ? ((count / N) * 100).toFixed(1) : 0}%)
              </span>
            </div>
          ))}
        </div>

        {/* 자동 생성 인사이트 */}
        {insights.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">자동 생성 인사이트</h4>
            <div className="space-y-2">
              {insights.map((text, i) => (
                <div key={i} className="flex items-start gap-2 bg-blue-900/20 border border-blue-800/30 rounded-lg px-3 py-2">
                  <span className="text-blue-400 mt-0.5 text-xs">●</span>
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 메타데이터 */}
      <div className="text-xs text-gray-600 text-right">
        산출 시각: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')}
      </div>
    </div>
  )
}

// ========================================
// 상수 데이터
// ========================================

const STATE_COLORS: Record<string, string> = {
  '감정 과부하': '#F97316',
  '동기-실행 괴리': '#EF4444',
  '안정적 성장': '#22C55E',
  '정체기': '#6B7280',
  '회복 중': '#3B82F6',
  '급성장': '#8B5CF6',
}

const COACHING_MAP = [
  {
    state: '감정 과부하',
    direction: '정서 안정화 우선',
    questions: ['요즘 가장 힘든 것은?', '쉬는 것도 성장이라 생각하면?'],
  },
  {
    state: '동기-실행 괴리',
    direction: '가치 재정렬',
    questions: ['가장 중요하다고 생각하는 영역은?', '실제로 시간을 쓰는 곳은?'],
  },
  {
    state: '회복 중',
    direction: '복귀 격려',
    questions: ['다시 시작한 계기는?', '이번 공백에서 배운 것은?'],
  },
  {
    state: '급성장',
    direction: '도전 확장',
    questions: ['다음 목표는?', '아직 시도하지 않은 영역은?'],
  },
  {
    state: '정체기',
    direction: '변화 자극',
    questions: ['지금 루틴에서 바꾸고 싶은 것은?', '새로운 도전이 있다면?'],
  },
  {
    state: '안정적 성장',
    direction: '유지 강화',
    questions: ['가장 뿌듯한 변화는?', '이 패턴을 유지하는 비결은?'],
  },
]

// ========================================
// 인사이트 자동 생성
// ========================================

function generateInsights(data: GrowthInferenceData): string[] {
  const insights: string[] = []
  const N = data.metadata.totalUsers
  const dist = data.stateDistribution
  const agg = data.aggregates

  // 가장 많은 상태
  let maxState = '안정적 성장'
  let maxCount = 0
  for (const [state, count] of Object.entries(dist)) {
    if (count > maxCount) { maxCount = count; maxState = state }
  }
  if (N > 0) {
    insights.push(`참여자의 ${((maxCount / N) * 100).toFixed(0)}%가 '${maxState}' 상태로 가장 많은 비율을 차지합니다.`)
  }

  // 자기조절지수 평균 해석
  if (agg.avgSelfRegulation >= 70) {
    insights.push(`평균 자기조절지수 ${agg.avgSelfRegulation}점으로, 감정 상태에서도 비교적 실행을 잘 유지하고 있습니다.`)
  } else if (agg.avgSelfRegulation < 40) {
    insights.push(`평균 자기조절지수 ${agg.avgSelfRegulation}점으로, 감정 상태에 따른 실행 변동이 큰 편입니다.`)
  }

  // 실행탄력성 평균 해석
  if (agg.avgResilience >= 70) {
    insights.push(`평균 실행탄력성 ${agg.avgResilience}점으로, 실행 공백 후 빠른 복귀 패턴을 보입니다.`)
  }

  // 설문 참여율
  if (N > 0) {
    const surveyRate = (data.metadata.usersWithSurveys / N * 100).toFixed(0)
    insights.push(`설문 참여율 ${surveyRate}% (${data.metadata.usersWithSurveys}/${N}명) — 가치-행동 일치도 분석 가용 범위입니다.`)
  }

  return insights
}

// ========================================
// 클립보드 복사용 텍스트 생성
// ========================================

function buildCopyText(data: GrowthInferenceData, grade: StudyGrade, insights: string[]): string {
  const lines: string[] = []
  const agg = data.aggregates
  const N = data.metadata.totalUsers

  lines.push('# 길로그 성장 추론 — 내부 연구 보고서')
  lines.push(`연구 등급: ${GRADE_LABELS[grade]} (N=${N})`)
  lines.push(`산출 시각: ${new Date(data.metadata.computedAt).toLocaleString('ko-KR')}`)
  lines.push('')

  lines.push('## 1.1 성장지표 정의서')
  lines.push('| 지표명 | 영문명 | 범위 | 측정 목적 | 데이터 소스 |')
  lines.push('|--------|--------|------|----------|------------|')
  lines.push('| 자기조절지수 | Self-Regulation Index | 0~100 | 감정 상태에도 불구하고 실행하는 능력 | Checkin + ExecutionRecord |')
  lines.push('| 실행탄력성 | Execution Resilience | 0~100 | 실패 후 복귀하는 속도 | ExecutionRecord 시계열 |')
  lines.push('| 가치-행동 일치도 | Value-Action Alignment | 0~100 | 말(설문)과 행동(실행)의 일치 | SurveyResponse + ExecutionRecord |')
  lines.push('| 회복탄성 변화곡선 | Recovery Curve | 0~100 | 회복 능력 자체의 성장 추세 | FailureEvent 월별 추세 |')
  lines.push('')

  lines.push('## 1.3 점수 산정 논리')
  lines.push('- 자기조절 = (기분나쁜날_실행비율 × 50) + (에너지낮은날_실행비율 × 30) + (감정안정도 × 20)')
  lines.push('- 실행탄력성 = mean(max(0, 100 - (공백일수 - 2) × 10))')
  lines.push('- 가치-행동 = ((Spearman_rho + 1) / 2) × 100')
  lines.push('- 회복탄성 = 선형회귀 기울기 기반 (improving / declining / stable)')
  lines.push('')

  lines.push('## 1.5 현재 데이터 현황')
  lines.push(`- 전체 참여자: ${N}명`)
  lines.push(`- 체크인 보유: ${data.metadata.usersWithCheckins}명`)
  lines.push(`- 설문 보유: ${data.metadata.usersWithSurveys}명`)
  lines.push(`- 자기조절지수 평균: ${agg.avgSelfRegulation}`)
  lines.push(`- 실행탄력성 평균: ${agg.avgResilience}`)
  lines.push(`- 가치-행동 일치도 평균: ${agg.avgAlignment ?? '-'}`)
  lines.push(`- 회복탄성 평균: ${agg.avgRecoveryTrend}`)
  lines.push('')

  if (insights.length > 0) {
    lines.push('## 인사이트')
    for (const insight of insights) {
      lines.push(`- ${insight}`)
    }
  }

  return lines.join('\n')
}
