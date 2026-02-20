'use client'

import { useState } from 'react'
import type { GrowthInferenceData } from '../page'

// ========================================
// 외부 제출용 백서 (8섹션)
// ========================================

interface Props {
  data: GrowthInferenceData
}

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

const STATE_COLORS: Record<string, string> = {
  '감정 과부하': '#F97316',
  '동기-실행 괴리': '#EF4444',
  '안정적 성장': '#22C55E',
  '정체기': '#6B7280',
  '회복 중': '#3B82F6',
  '급성장': '#8B5CF6',
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <h3 className="text-base font-semibold text-white mb-4">
      <span className="text-blue-400 mr-2">{number}.</span>
      {title}
    </h3>
  )
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-300 leading-relaxed mb-3">{children}</p>
}

export default function WhitePaper({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const N = data.metadata.totalUsers
  const grade = getStudyGrade(N)
  const agg = data.aggregates

  const handleCopy = async () => {
    const text = buildCopyText(data, grade)
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

  // 가장 많은 상태
  let maxState = '안정적 성장'
  let maxCount = 0
  for (const [state, count] of Object.entries(data.stateDistribution)) {
    if (count > maxCount) { maxCount = count; maxState = state }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 백서 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">길로그 성장 추론 시스템 백서</h2>
          <p className="text-sm text-gray-400 mt-1">외부 제출용 &middot; 행동 데이터 기반 청소년 성장 분석 모델</p>
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

      {/* 2.1 요약 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="1" title="요약 (Executive Summary)" />
        <Paragraph>
          길로그 성장 추론 시스템은 청소년의 일상 체크인, 실행 기록, 자기보고 설문 데이터를
          통합 분석하여 4가지 추론 지표(자기조절지수, 실행탄력성, 가치-행동 일치도, 회복탄성 변화곡선)를
          산출하고, 이를 기반으로 6가지 성장 상태를 자동 분류하는 모델입니다.
        </Paragraph>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">참여자</p>
            <p className="text-xl font-bold text-white">{N}명</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">자기조절 평균</p>
            <p className="text-xl font-bold text-white">{agg.avgSelfRegulation}</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">최다 상태</p>
            <p className="text-xl font-bold" style={{ color: STATE_COLORS[maxState] }}>{maxState}</p>
            <p className="text-xs text-gray-500">{N > 0 ? ((maxCount / N) * 100).toFixed(0) : 0}%</p>
          </div>
        </div>
      </section>

      {/* 2.2 연구 배경 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="2" title="연구 배경" />
        <Paragraph>
          기존 교육 평가 시스템은 시험 점수와 등급을 중심으로 한 결과 지향적 평가에 의존하고 있습니다.
          이러한 접근은 학습자의 과정적 성장, 감정 상태, 실패 후 회복 능력 등을 반영하지 못하는 한계를 가집니다.
        </Paragraph>
        <Paragraph>
          특히 &ldquo;왜 성장했는가&rdquo; 또는 &ldquo;왜 정체되어 있는가&rdquo;를 설명할 수 있는
          추론 기반 모델이 부재합니다. 길로그는 이 격차를 해소하기 위해 행동 데이터와 감정 데이터를
          결합한 패턴 인식 기반의 성장 추론 시스템을 개발하였습니다.
        </Paragraph>
        <Paragraph>
          본 시스템은 단순 빈도 통계를 넘어, 감정 조절 하에서의 실행 능력, 실패 후 복귀 패턴,
          가치와 행동의 일치도 등을 추론 지표로 산출하여 개인화된 성장 진단과 코칭 방향을 제시합니다.
        </Paragraph>
      </section>

      {/* 2.3 기존 연구 비교 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="3" title="기존 연구 비교" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">구분</th>
                <th className="text-left py-2 px-3">전통적 교육 평가</th>
                <th className="text-left py-2 px-3">길로그 기술통계</th>
                <th className="text-left py-2 px-3 text-blue-400">길로그 성장추론</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 text-gray-400">분석 방법</td>
                <td className="py-2.5 px-3">시험 점수</td>
                <td className="py-2.5 px-3">행동 빈도 통계</td>
                <td className="py-2.5 px-3 text-blue-300">패턴 인식 + 상태 분류</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 text-gray-400">감정 반영</td>
                <td className="py-2.5 px-3">미반영</td>
                <td className="py-2.5 px-3">미반영</td>
                <td className="py-2.5 px-3 text-blue-300">핵심 변수로 활용</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2.5 px-3 text-gray-400">실패 처리</td>
                <td className="py-2.5 px-3">감점 요인</td>
                <td className="py-2.5 px-3">이탈률만 측정</td>
                <td className="py-2.5 px-3 text-blue-300">회복 능력 측정</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-gray-400">출력</td>
                <td className="py-2.5 px-3">등급/석차</td>
                <td className="py-2.5 px-3">평균/편차/효과크기</td>
                <td className="py-2.5 px-3 text-blue-300">상태 진단 + 코칭 방향</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 2.4 모델 설계 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="4" title="모델 설계" />

        <h4 className="text-sm font-semibold text-gray-300 mb-3">4대 지표 구조</h4>
        <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-300 mb-4">
          <div className="text-center mb-2 text-gray-500">[ 데이터 파이프라인 ]</div>
          <div className="text-center">Checkin(mood, energy) ─┐</div>
          <div className="text-center">ExecutionRecord(date) ─┤→ Inference Engine →  State Classification</div>
          <div className="text-center">SurveyResponse(scores)─┘</div>
          <div className="mt-3 text-center text-gray-500">↓</div>
          <div className="grid grid-cols-4 gap-2 mt-2 text-center">
            <div className="bg-blue-900/30 rounded p-2 text-blue-400">자기조절지수</div>
            <div className="bg-yellow-900/30 rounded p-2 text-yellow-400">실행탄력성</div>
            <div className="bg-purple-900/30 rounded p-2 text-purple-400">가치-행동 일치도</div>
            <div className="bg-green-900/30 rounded p-2 text-green-400">회복탄성</div>
          </div>
        </div>

        <h4 className="text-sm font-semibold text-gray-300 mb-3">6가지 성장 상태 의사결정 트리</h4>
        <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-300 space-y-1">
          <div>1. <span className="text-orange-400">감정 과부하</span> ← mood&lt;2.5 AND 실행 감소</div>
          <div>2. <span className="text-red-400">동기-실행 괴리</span> ← 일치도&lt;40 AND 실행 감소</div>
          <div>3. <span className="text-blue-400">회복 중</span> ← 최근 공백 AND 복귀 감지</div>
          <div>4. <span className="text-purple-400">급성장</span> ← 조절≥70 AND 탄력≥70 AND improving AND 실행 증가</div>
          <div>5. <span className="text-gray-400">정체기</span> ← 실행 추세 안정</div>
          <div>6. <span className="text-green-400">안정적 성장</span> ← 기본값</div>
        </div>
      </section>

      {/* 2.5 파일럿 결과 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="5" title="파일럿 결과" />

        <h4 className="text-sm font-semibold text-gray-300 mb-3">참여 현황</h4>
        <Paragraph>
          본 파일럿에는 총 {N}명의 참여자가 포함되었으며, 이 중 {data.metadata.usersWithCheckins}명이
          일일 체크인 기록을, {data.metadata.usersWithSurveys}명이 5영역 설문을 완료하였습니다.
        </Paragraph>

        <h4 className="text-sm font-semibold text-gray-300 mb-3">지표 분포</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표</th>
                <th className="text-right py-2 px-3">평균(M)</th>
                <th className="text-right py-2 px-3">표준편차(SD)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">자기조절지수</td>
                <td className="py-2 px-3 text-right">{agg.avgSelfRegulation}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdSelfRegulation ?? '-'}</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">실행탄력성</td>
                <td className="py-2 px-3 text-right">{agg.avgResilience}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdResilience ?? '-'}</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">가치-행동 일치도</td>
                <td className="py-2 px-3 text-right">{agg.avgAlignment ?? '-'}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdAlignment ?? '-'}</td>
              </tr>
              <tr>
                <td className="py-2 px-3">회복탄성</td>
                <td className="py-2 px-3 text-right">{agg.avgRecoveryTrend}</td>
                <td className="py-2 px-3 text-right text-gray-400">{agg.sdRecoveryTrend ?? '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-semibold text-gray-300 mb-3">상태 분류 결과</h4>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">성장 상태</th>
                <th className="text-right py-2 px-3">인원</th>
                <th className="text-right py-2 px-3">비율</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {Object.entries(data.stateDistribution).map(([state, count]) => (
                <tr key={state} className="border-b border-gray-800/50">
                  <td className="py-2 px-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: STATE_COLORS[state] }} />
                    {state}
                  </td>
                  <td className="py-2 px-3 text-right">{count}명</td>
                  <td className="py-2 px-3 text-right text-gray-400">
                    {N > 0 ? ((count / N) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h4 className="text-sm font-semibold text-gray-300 mb-3">주요 발견</h4>
        <div className="space-y-2">
          <Paragraph>
            &bull; 전체 참여자 중 &lsquo;{maxState}&rsquo; 상태가 {maxCount}명({N > 0 ? ((maxCount / N) * 100).toFixed(0) : 0}%)으로 가장 높은 비율을 보입니다.
          </Paragraph>
          <Paragraph>
            &bull; 평균 자기조절지수는 {agg.avgSelfRegulation}점, 실행탄력성은 {agg.avgResilience}점으로 나타났습니다.
          </Paragraph>
          {agg.avgAlignment !== null && (
            <Paragraph>
              &bull; 설문 참여자({data.metadata.usersWithSurveys}명)의 가치-행동 일치도 평균은 {agg.avgAlignment}점입니다.
            </Paragraph>
          )}
        </div>
      </section>

      {/* 2.6 개선 과정 및 로드맵 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="6" title="개선 과정 및 로드맵" />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-20 shrink-0">
              <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">Phase 1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">현재</p>
              <p className="text-xs text-gray-400">4대 지표 산출 + 결정 트리 기반 성장 상태 분류</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-20 shrink-0">
              <span className="text-xs px-2 py-1 bg-purple-900/30 text-purple-400 rounded-full">Phase 2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">예측 모델</p>
              <p className="text-xs text-gray-400">이탈 예측, 개입 시점 추천, 종단 패턴 분석</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-20 shrink-0">
              <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">Phase 3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">개인화 코칭</p>
              <p className="text-xs text-gray-400">성장 상태별 코칭 메시지 자동 생성, 개인화 추천</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2.7 한계점 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="7" title="한계점" />
        <div className="space-y-2">
          <Paragraph>
            <strong className="text-gray-200">표본 크기 한계:</strong> 현재 {N}명의 데이터로 분석하였으며,
            통계적 검정력 확보를 위해 추가 데이터 수집이 필요합니다.
          </Paragraph>
          <Paragraph>
            <strong className="text-gray-200">자기보고 편향:</strong> 체크인의 mood와 energy는 자기보고 데이터로,
            사회적 바람직성 편향이 개입할 수 있습니다.
          </Paragraph>
          <Paragraph>
            <strong className="text-gray-200">인과 추론 불가:</strong> 본 분석은 행동 패턴과 성장 상태 간의
            상관관계를 탐색하는 것으로, 인과적 관계를 주장하지 않습니다.
          </Paragraph>
          <Paragraph>
            <strong className="text-gray-200">문화적 맥락 미반영:</strong> 현재 모델은 한국 청소년에 한정되며,
            다른 문화권에의 일반화는 추가 검증이 필요합니다.
          </Paragraph>
        </div>
      </section>

      {/* 2.8 비교 벤치마크 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <SectionHeader number="8" title="비교 벤치마크" />
        <Paragraph>
          기존 청소년 자기조절/회복탄력성 연구에서 보고된 참고값과 비교합니다.
        </Paragraph>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표</th>
                <th className="text-right py-2 px-3">선행연구 참고값</th>
                <th className="text-right py-2 px-3">길로그 결과</th>
                <th className="text-left py-2 px-3">비고</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">자기조절</td>
                <td className="py-2 px-3 text-right text-gray-400">M=3.2 (5점 척도 환산)</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgSelfRegulation}</td>
                <td className="py-2 px-3 text-xs text-gray-500">척도 상이, 직접 비교 불가</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3">회복탄력성</td>
                <td className="py-2 px-3 text-right text-gray-400">M=3.4 (5점 척도 환산)</td>
                <td className="py-2 px-3 text-right font-medium">{agg.avgResilience}</td>
                <td className="py-2 px-3 text-xs text-gray-500">행동 기반 vs 자기보고</td>
              </tr>
              <tr>
                <td className="py-2 px-3">실행 지속</td>
                <td className="py-2 px-3 text-right text-gray-400">학습 지속률 60~70%</td>
                <td className="py-2 px-3 text-right font-medium">-</td>
                <td className="py-2 px-3 text-xs text-gray-500">온라인 학습 이탈률 참고</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * 선행연구 참고: 한국교육개발원(2022) 청소년 핵심역량 조사, 신우열 외(2009) 한국형 회복탄력성 척도 등.
          척도 단위가 상이하여 직접적 비교보다는 방향성 참고 목적임.
        </p>
      </section>

      {/* 메타데이터 */}
      <div className="text-xs text-gray-600 text-right">
        산출 시각: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')}
      </div>
    </div>
  )
}

// ========================================
// 클립보드 복사용 텍스트
// ========================================

function buildCopyText(data: GrowthInferenceData, grade: StudyGrade): string {
  const lines: string[] = []
  const N = data.metadata.totalUsers
  const agg = data.aggregates

  lines.push('# 길로그 성장 추론 시스템 백서')
  lines.push(`연구 등급: ${GRADE_LABELS[grade]} (N=${N})`)
  lines.push(`산출 시각: ${new Date(data.metadata.computedAt).toLocaleString('ko-KR')}`)
  lines.push('')

  lines.push('## 1. 요약 (Executive Summary)')
  lines.push('길로그 성장 추론 시스템은 청소년의 일상 체크인, 실행 기록, 자기보고 설문 데이터를 통합 분석하여')
  lines.push('4가지 추론 지표를 산출하고, 6가지 성장 상태를 자동 분류하는 모델입니다.')
  lines.push('')

  lines.push('## 2. 연구 배경')
  lines.push('기존 교육 평가 시스템은 시험 점수 중심의 결과 지향적 평가에 의존하고 있으며,')
  lines.push('"왜 성장했는가"를 설명할 수 있는 추론 기반 모델이 부재합니다.')
  lines.push('')

  lines.push('## 3. 기존 연구 비교')
  lines.push('| 구분 | 전통적 교육 평가 | 길로그 기술통계 | 길로그 성장추론 |')
  lines.push('|------|----------------|---------------|---------------|')
  lines.push('| 분석 | 시험 점수 | 행동 빈도 통계 | 패턴 인식 + 상태 분류 |')
  lines.push('| 감정 | 미반영 | 미반영 | 핵심 변수 |')
  lines.push('| 실패 | 감점 요인 | 이탈률만 | 회복 능력 측정 |')
  lines.push('| 출력 | 등급/석차 | 평균/편차/효과크기 | 상태 진단 + 코칭 방향 |')
  lines.push('')

  lines.push('## 5. 파일럿 결과')
  lines.push(`- 참여자: ${N}명 (체크인 ${data.metadata.usersWithCheckins}명, 설문 ${data.metadata.usersWithSurveys}명)`)
  lines.push(`- 자기조절지수: M=${agg.avgSelfRegulation}`)
  lines.push(`- 실행탄력성: M=${agg.avgResilience}`)
  lines.push(`- 가치-행동 일치도: M=${agg.avgAlignment ?? '-'}`)
  lines.push(`- 회복탄성: M=${agg.avgRecoveryTrend}`)
  lines.push('')

  lines.push('### 상태 분류 결과')
  for (const [state, count] of Object.entries(data.stateDistribution)) {
    lines.push(`- ${state}: ${count}명 (${N > 0 ? ((count / N) * 100).toFixed(1) : 0}%)`)
  }
  lines.push('')

  lines.push('## 7. 한계점')
  lines.push(`- 표본 크기 한계 (N=${N})`)
  lines.push('- 자기보고 편향 (체크인 mood/energy)')
  lines.push('- 인과 추론 불가 (상관관계만)')
  lines.push('- 문화적 맥락 미반영')

  return lines.join('\n')
}
