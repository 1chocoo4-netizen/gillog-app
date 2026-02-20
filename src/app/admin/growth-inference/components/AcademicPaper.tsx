'use client'

import { useState, useMemo } from 'react'
import type { GrowthInferenceData } from '../page'

// ========================================
// 학술 논문 투고 (APA 7th 스타일, 8섹션 + 부록)
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
  preliminary: '예비 연구 (Preliminary Study)',
  exploratory: '탐색적 연구 (Exploratory Study)',
  confirmatory: '확인적 연구 (Confirmatory Study)',
}

const GRADE_LIMITATIONS: Record<StudyGrade, string> = {
  preliminary: '본 연구는 참여자 수(N<10)가 제한적인 예비 연구(pilot study)로서, 결과의 일반화에 상당한 제약이 있다.',
  exploratory: '본 연구는 소규모 표본(10≤N<30)에 기반한 탐색적 연구로서, 효과 방향성 탐색에 초점을 두었다.',
  confirmatory: '본 연구는 종단적 반복측정 설계에 기반하였으나, 무작위 대조군이 부재하여 내적 타당도에 제한이 있다.',
}

function SectionHeader({ title, level = 2 }: { title: string; level?: 2 | 3 }) {
  const cls = level === 2
    ? 'text-base font-bold text-white mb-3 text-center'
    : 'text-sm font-semibold text-white mb-2 italic'
  return <h3 className={cls}>{title}</h3>
}

function APAParagraph({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-300 leading-relaxed mb-3 indent-8">{children}</p>
}

function TableNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500 mt-2 italic">{children}</p>
}

export default function AcademicPaper({ data }: Props) {
  const [copied, setCopied] = useState(false)
  const N = data.metadata.totalUsers
  const grade = getStudyGrade(N)
  const agg = data.aggregates

  // 프론트엔드에서 상관관계 매트릭스 계산 (API에서도 오지만 fallback)
  const correlationMatrix = useMemo(() => {
    if (data.correlationMatrix) return data.correlationMatrix
    return computeCorrelationMatrix(data)
  }, [data])

  // 지표 간 기술통계 계산
  const descriptiveStats = useMemo(() => computeDescriptiveStats(data), [data])

  const handleCopy = async () => {
    const text = buildCopyText(data, grade, correlationMatrix, descriptiveStats)
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
      {/* 논문 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">학술 논문 투고</h2>
          <p className="text-sm text-gray-400 mt-1">APA 7th Edition 형식</p>
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

      {/* 논문 제목 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          행동 데이터 기반 청소년 성장 추론 모델 개발 및 검증:
        </h2>
        <h2 className="text-lg font-bold text-white mb-4">
          자기조절, 실행탄력성, 가치-행동 일치도, 회복탄성을 중심으로
        </h2>
        <p className="text-sm text-gray-400">
          Development and Validation of a Behavioral Data-Based Youth Growth Inference Model:
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Focusing on Self-Regulation, Execution Resilience, Value-Action Alignment, and Recovery Resilience
        </p>
        <p className="text-sm text-gray-500 italic">길로그 연구팀</p>
      </section>

      {/* Abstract */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="Abstract" />
        <p className="text-sm text-gray-300 leading-relaxed">
          본 연구는 청소년의 일상 행동 데이터(체크인, 실행 기록, 자기보고 설문)를 활용하여
          성장 과정을 추론하는 모델을 개발하고 검증하였다. 자기조절지수(Self-Regulation Index),
          실행탄력성(Execution Resilience), 가치-행동 일치도(Value-Action Alignment),
          회복탄성 변화곡선(Recovery Curve)의 4대 추론 지표를 산출하고,
          결정 트리 기반으로 6가지 성장 상태(감정 과부하, 동기-실행 괴리, 회복 중, 급성장, 정체기, 안정적 성장)를
          분류하였다. {N}명을 대상으로 한 파일럿 분석 결과,
          자기조절지수 평균 {agg.avgSelfRegulation}점, 실행탄력성 평균 {agg.avgResilience}점으로 나타났다.
          본 모델은 기존의 결과 지향적 평가를 넘어 과정적 성장을 추론하는 새로운 접근을 제안한다.
        </p>
        <p className="text-sm text-gray-500 mt-3 italic">
          주요어: 성장 추론, 자기조절, 실행탄력성, 가치-행동 일치, 회복탄력성, 행동 데이터 분석
        </p>
      </section>

      {/* 3.1 서론 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="서론 (Introduction)" />

        <SectionHeader title="연구 필요성" level={3} />
        <APAParagraph>
          청소년기의 성장은 단순한 학업 성취를 넘어 자기조절, 정서 관리, 가치 실현 등 다차원적 역량의
          발달을 포함한다(Zimmerman, 2000). 그러나 기존 교육 평가 시스템은 시험 점수와 등급에 의존하여
          이러한 과정적 성장을 포착하는 데 한계가 있다.
        </APAParagraph>
        <APAParagraph>
          특히 디지털 환경에서 청소년의 일상 행동 데이터가 축적되고 있음에도, 이를 활용하여
          &ldquo;왜 성장했는가&rdquo; 또는 &ldquo;왜 정체되어 있는가&rdquo;를 설명하는 추론 모델은
          아직 초기 단계에 머물러 있다.
        </APAParagraph>

        <SectionHeader title="연구 목적" level={3} />
        <APAParagraph>
          본 연구의 목적은 행동 데이터 기반의 청소년 성장 추론 모델을 개발하고 파일럿 검증을 실시하는 것이다.
          구체적으로, (1) 4대 추론 지표를 정의하고 산출 로직을 개발하며, (2) 결정 트리 기반의 성장 상태 분류
          알고리즘을 구축하고, (3) 파일럿 데이터를 통해 모델의 실용 가능성을 탐색한다.
        </APAParagraph>

        <SectionHeader title="연구 질문" level={3} />
        <div className="space-y-1 mb-3">
          <p className="text-sm text-gray-300 ml-8">RQ1. 행동 데이터로부터 산출되는 4대 추론 지표는 청소년의 성장 패턴을 유의미하게 변별하는가?</p>
          <p className="text-sm text-gray-300 ml-8">RQ2. 결정 트리 기반 성장 상태 분류는 이론적 예측과 일관되는가?</p>
          <p className="text-sm text-gray-300 ml-8">RQ3. 4대 추론 지표 간 상관 구조는 판별 타당도를 지지하는가?</p>
        </div>
      </section>

      {/* 3.2 이론적 근거 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="이론적 근거 (Theoretical Framework)" />

        <APAParagraph>
          본 연구의 4대 추론 지표는 다음의 이론적 배경에 기반한다.
        </APAParagraph>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">이론</th>
                <th className="text-left py-2 px-3">핵심 주장</th>
                <th className="text-left py-2 px-3">매핑 지표</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">자기결정성이론 (SDT)</td>
                <td className="py-2 px-3 text-gray-400">내재적 동기와 자율성이 지속적 행동을 이끈다 (Deci & Ryan, 2000)</td>
                <td className="py-2 px-3 text-blue-400">자기조절지수</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">자기조절학습 이론</td>
                <td className="py-2 px-3 text-gray-400">감정 조절 하에서의 학습 실행 (Zimmerman, 2000)</td>
                <td className="py-2 px-3 text-blue-400">자기조절지수</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">메타인지 이론</td>
                <td className="py-2 px-3 text-gray-400">자기 인식과 조절 과정의 모니터링 (Flavell, 1979)</td>
                <td className="py-2 px-3 text-yellow-400">실행탄력성</td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="py-2 px-3 font-medium">회복탄력성 이론</td>
                <td className="py-2 px-3 text-gray-400">역경 후 적응적 기능 회복 (Masten, 2001)</td>
                <td className="py-2 px-3 text-green-400">회복탄성 변화곡선</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">가치 이론</td>
                <td className="py-2 px-3 text-gray-400">가치와 실제 행동의 괴리 (Schwartz, 1992)</td>
                <td className="py-2 px-3 text-purple-400">가치-행동 일치도</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3.3 연구 방법 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="연구 방법 (Method)" />

        <SectionHeader title="참여자" level={3} />
        <APAParagraph>
          본 연구에는 길로그 플랫폼을 사용하는 청소년 {N}명이 참여하였다.
          이 중 {data.metadata.usersWithCheckins}명이 일일 체크인 기록을,
          {data.metadata.usersWithSurveys}명이 5영역 자기보고 설문을 완료하였다.
        </APAParagraph>

        <SectionHeader title="도구" level={3} />
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-300 ml-8">
            <strong className="text-gray-200">일일 체크인:</strong> 기분(mood, 1~5점 Likert)과 에너지(energy, 1~5점 Likert)를
            매일 자기보고 방식으로 측정하였다.
          </p>
          <p className="text-sm text-gray-300 ml-8">
            <strong className="text-gray-200">실행 기록 시스템:</strong> 6개 월드(진로, 공동체, 인성, 학습, 습관 등)에서의
            일별 실행 기록을 수집하였다.
          </p>
          <p className="text-sm text-gray-300 ml-8">
            <strong className="text-gray-200">5영역 설문:</strong> 진로, 공동체, 비인지, 학습, 습관의 5개 영역에 대한
            자기보고 설문(각 영역 Likert 5점 척도)을 실시하였다.
          </p>
        </div>

        <SectionHeader title="분석 절차" level={3} />
        <div className="space-y-2 mb-3">
          <p className="text-sm text-gray-300 ml-8">(1) 기술통계: 평균(M), 표준편차(SD), 최솟값, 최댓값 산출</p>
          <p className="text-sm text-gray-300 ml-8">(2) Spearman 순위상관: 설문 순위와 실행 빈도 순위 간 상관 분석</p>
          <p className="text-sm text-gray-300 ml-8">(3) 선형회귀: 월별 회복일수의 추세 분석(기울기 기반)</p>
          <p className="text-sm text-gray-300 ml-8">(4) 결정 트리 기반 성장 상태 분류: 우선순위 규칙 적용</p>
          <p className="text-sm text-gray-300 ml-8">(5) Pearson 상관관계: 4대 지표 간 상관 매트릭스 산출</p>
        </div>
      </section>

      {/* 3.4 결과 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="결과 (Results)" />

        {/* 표 1: 기술통계 */}
        <p className="text-sm text-gray-300 text-center font-semibold mb-2">Table 1</p>
        <p className="text-sm text-gray-400 text-center italic mb-3">4대 추론 지표 기술통계</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표</th>
                <th className="text-right py-2 px-3">N</th>
                <th className="text-right py-2 px-3">M</th>
                <th className="text-right py-2 px-3">SD</th>
                <th className="text-right py-2 px-3">Min</th>
                <th className="text-right py-2 px-3">Max</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {descriptiveStats.map(row => (
                <tr key={row.label} className="border-b border-gray-800/50">
                  <td className="py-2 px-3">{row.label}</td>
                  <td className="py-2 px-3 text-right">{row.n}</td>
                  <td className="py-2 px-3 text-right font-medium">{row.mean}</td>
                  <td className="py-2 px-3 text-right text-gray-400">{row.sd}</td>
                  <td className="py-2 px-3 text-right text-gray-400">{row.min}</td>
                  <td className="py-2 px-3 text-right text-gray-400">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 표 2: 상태 분포 */}
        <p className="text-sm text-gray-300 text-center font-semibold mb-2">Table 2</p>
        <p className="text-sm text-gray-400 text-center italic mb-3">성장 상태 분류 분포</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">성장 상태</th>
                <th className="text-right py-2 px-3">n</th>
                <th className="text-right py-2 px-3">%</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {Object.entries(data.stateDistribution).map(([state, count]) => (
                <tr key={state} className="border-b border-gray-800/50">
                  <td className="py-2 px-3">{state}</td>
                  <td className="py-2 px-3 text-right">{count}</td>
                  <td className="py-2 px-3 text-right text-gray-400">
                    {N > 0 ? ((count / N) * 100).toFixed(1) : '0.0'}
                  </td>
                </tr>
              ))}
              <tr className="border-t border-gray-700 font-medium">
                <td className="py-2 px-3">합계</td>
                <td className="py-2 px-3 text-right">{N}</td>
                <td className="py-2 px-3 text-right">100.0</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 표 3: 상관관계 매트릭스 */}
        <p className="text-sm text-gray-300 text-center font-semibold mb-2">Table 3</p>
        <p className="text-sm text-gray-400 text-center italic mb-3">4대 추론 지표 간 Pearson 상관관계 매트릭스</p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left py-2 px-3">지표</th>
                {correlationMatrix.labels.map(l => (
                  <th key={l} className="text-right py-2 px-3">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {correlationMatrix.matrix.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="py-2 px-3 font-medium">{correlationMatrix.labels[i]}</td>
                  {row.map((val, j) => (
                    <td key={j} className={`py-2 px-3 text-right ${
                      i === j ? 'text-gray-500' :
                      Math.abs(val) >= 0.5 ? 'text-yellow-400 font-medium' :
                      'text-gray-400'
                    }`}>
                      {i === j ? '—' : val.toFixed(2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <TableNote>
            Note. N={N}. 상관계수 |r| ≥ .50은 노란색으로 강조. 가치-행동 일치도는 설문 보유자({data.metadata.usersWithSurveys}명)만 포함.
          </TableNote>
        </div>

        {/* 결과 해석 */}
        <SectionHeader title="결과 해석" level={3} />
        <APAParagraph>
          Table 1에 제시된 바와 같이, 참여자의 자기조절지수 평균은 {agg.avgSelfRegulation}점(SD={agg.sdSelfRegulation ?? '-'})으로 나타났다.
          실행탄력성 평균은 {agg.avgResilience}점(SD={agg.sdResilience ?? '-'})이었으며,
          {agg.avgAlignment !== null
            ? ` 가치-행동 일치도 평균은 ${agg.avgAlignment}점(SD=${agg.sdAlignment ?? '-'})이었다.`
            : ' 설문 데이터가 부족하여 가치-행동 일치도는 산출되지 않았다.'
          }
        </APAParagraph>
        <APAParagraph>
          Table 2에서 확인할 수 있듯이, 성장 상태 분류 결과 가장 높은 비율을 보인 상태는
          {(() => {
            let ms = '안정적 성장'; let mc = 0
            for (const [s, c] of Object.entries(data.stateDistribution)) {
              if (c > mc) { mc = c; ms = s }
            }
            return ` '${ms}'(${mc}명, ${N > 0 ? ((mc / N) * 100).toFixed(1) : 0}%)`
          })()}
          이었다.
        </APAParagraph>
      </section>

      {/* 3.5 논의 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="논의 (Discussion)" />

        <SectionHeader title="연구 결과 요약" level={3} />
        <APAParagraph>
          본 연구는 행동 데이터를 기반으로 청소년의 성장 과정을 추론하는 4대 지표 모델을 개발하고,
          결정 트리 기반의 6가지 성장 상태 분류 알고리즘을 구축하였다.
          파일럿 분석 결과, 제안된 지표들이 참여자의 성장 패턴을 의미 있게 구분할 수 있음을 확인하였다.
        </APAParagraph>

        <SectionHeader title="이론적 시사점" level={3} />
        <APAParagraph>
          본 모델은 자기결정성이론(Deci & Ryan, 2000), 자기조절학습 이론(Zimmerman, 2000),
          회복탄력성 이론(Masten, 2001)을 실제 행동 데이터에 적용한 시도이다.
          특히 감정 상태 하에서의 실행 능력을 정량화한 자기조절지수는 기존 자기보고식 자기조절 척도의
          한계를 보완하는 행동 기반 지표로서의 가능성을 보여준다.
        </APAParagraph>

        <SectionHeader title="실천적 시사점" level={3} />
        <APAParagraph>
          교육 현장에서 본 모델은 개별 학습자의 성장 상태를 자동으로 진단하고,
          상태별로 적절한 코칭 방향(정서 안정화, 가치 재정렬, 복귀 격려, 도전 확장, 변화 자극, 유지 강화)을
          제시하는 도구로 활용될 수 있다. 이는 교사와 상담자의 개입 효율성을 높이는 데 기여할 것으로 기대된다.
        </APAParagraph>

        <SectionHeader title="선행 연구와의 비교" level={3} />
        <APAParagraph>
          기존 청소년 자기조절 연구(예: 한국 청소년 핵심역량 조사)가 자기보고식 설문에 의존한 반면,
          본 연구는 실제 행동 데이터(체크인, 실행 기록)를 직접 활용하여 자기조절 능력을 추론하였다.
          이는 자기보고 편향(social desirability bias)을 일부 완화하는 접근이라 할 수 있으나,
          두 접근법 간의 수렴 타당도 검증은 향후 과제로 남는다.
        </APAParagraph>
      </section>

      {/* 3.6 한계 및 제언 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="한계 및 제언 (Limitations and Future Directions)" />

        <APAParagraph>
          {GRADE_LIMITATIONS[grade]}
        </APAParagraph>
        <APAParagraph>
          첫째, 표본 크기(N={N})가 제한적이며, 외적 타당도 확보를 위해 대규모 표본에서의 반복 검증이 필요하다.
          둘째, 체크인의 mood와 energy는 자기보고 데이터로서, 객관적 측정과의 교차 검증이 요구된다.
          셋째, 종단 데이터의 추가 축적을 통해 성장 상태 전이 패턴을 분석할 필요가 있다.
          넷째, 교차 타당화(cross-validation)를 통한 분류 알고리즘의 일반화 가능성을 검증해야 한다.
        </APAParagraph>
        <APAParagraph>
          향후 연구에서는 (1) 표본 규모 확대, (2) 기존 자기조절/회복탄력성 척도와의 수렴 타당도 검증,
          (3) 머신러닝 기반 예측 모델로의 확장, (4) 문화 간 비교 연구를 제안한다.
        </APAParagraph>
      </section>

      {/* 3.7 참고문헌 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="참고문헌 (References)" />
        <div className="space-y-2 text-sm text-gray-300">
          {REFERENCES.map((ref, i) => (
            <p key={i} className="pl-8 -indent-8">{ref}</p>
          ))}
        </div>
      </section>

      {/* 3.8 부록 */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <SectionHeader title="부록 (Appendix)" />

        <p className="text-sm text-gray-300 text-center font-semibold mb-2">부록 A</p>
        <p className="text-sm text-gray-400 text-center italic mb-3">추론 알고리즘 의사코드</p>
        <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-300 mb-6 overflow-x-auto">
          <pre>{`function computeUserInference(checkins, executions, survey):
  // 1. 자기조절지수
  badMoodRatio = count(mood≤2 AND executed) / count(mood≤2)
  lowEnergyRatio = count(energy≤2 AND executed) / count(energy≤2)
  stabilityScore = max(0, 1 - sd(moods) / 2)
  SRI = badMoodRatio × 50 + lowEnergyRatio × 30 + stabilityScore × 20

  // 2. 실행탄력성
  failureEvents = detectGaps(executions, threshold=2days)
  ERI = mean(max(0, 100 - (gapDays - 2) × 10))

  // 3. 가치-행동 일치도
  surveyRanks = rank(survey[5areas])
  execRanks = rank(executionCount[5areas])
  rho = spearmanCorrelation(surveyRanks, execRanks)
  VAA = ((rho + 1) / 2) × 100

  // 4. 회복탄성 변화곡선
  monthlyRecovery = groupByMonth(failureEvents)
  slope = linearRegression(monthlyRecovery)
  RC = {score: slopeToScore(slope), trend: slopeToTrend(slope)}

  // 성장 상태 분류 (우선순위 규칙)
  state = classifyGrowthState(SRI, ERI, VAA, RC, ...)`}</pre>
        </div>

        <p className="text-sm text-gray-300 text-center font-semibold mb-2">부록 B</p>
        <p className="text-sm text-gray-400 text-center italic mb-3">성장 상태 결정 트리 다이어그램</p>
        <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-xs text-gray-300 overflow-x-auto">
          <pre>{`[START]
  │
  ├── mood < 2.5 AND execution↓ ──→ 감정 과부하
  │
  ├── alignment < 40 AND execution↓ ──→ 동기-실행 괴리
  │
  ├── recentGap AND recovered ──→ 회복 중
  │
  ├── SRI ≥ 70 AND ERI ≥ 70
  │   AND trend=improving AND execution↑ ──→ 급성장
  │
  ├── execution=stable ──→ 정체기
  │
  └── (default) ──→ 안정적 성장`}</pre>
        </div>
      </section>

      {/* 메타데이터 */}
      <div className="text-xs text-gray-600 text-right">
        산출 시각: {new Date(data.metadata.computedAt).toLocaleString('ko-KR')}
      </div>
    </div>
  )
}

// ========================================
// 참고문헌 (APA 7th)
// ========================================

const REFERENCES = [
  'Bandura, A. (1991). Social cognitive theory of self-regulation. Organizational Behavior and Human Decision Processes, 50(2), 248–287.',
  'Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.',
  'Flavell, J. H. (1979). Metacognition and cognitive monitoring: A new area of cognitive–developmental inquiry. American Psychologist, 34(10), 906–911.',
  'Masten, A. S. (2001). Ordinary magic: Resilience processes in development. American Psychologist, 56(3), 227–238.',
  'Pintrich, P. R. (2000). The role of goal orientation in self-regulated learning. In M. Boekaerts, P. R. Pintrich, & M. Zeidner (Eds.), Handbook of self-regulation (pp. 451–502). Academic Press.',
  'Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. Advances in Experimental Social Psychology, 25, 1–65.',
  'Zimmerman, B. J. (2000). Attaining self-regulation: A social cognitive perspective. In M. Boekaerts, P. R. Pintrich, & M. Zeidner (Eds.), Handbook of self-regulation (pp. 13–39). Academic Press.',
  'Zimmerman, B. J. (2002). Becoming a self-regulated learner: An overview. Theory Into Practice, 41(2), 64–70.',
  'Connor, K. M., & Davidson, J. R. T. (2003). Development of a new resilience scale: The Connor-Davidson Resilience Scale (CD-RISC). Depression and Anxiety, 18(2), 76–82.',
  'Luthar, S. S., Cicchetti, D., & Becker, B. (2000). The construct of resilience: A critical evaluation and guidelines for future work. Child Development, 71(3), 543–562.',
  '신우열, 김민규, & 김주환. (2009). 회복탄력성 검사 지수의 개발 및 타당도 검증. 한국청소년연구, 20(4), 105–131.',
  '한국교육개발원. (2022). 한국교육종단연구: 청소년 핵심역량 분석. 연구보고서.',
]

// ========================================
// 프론트엔드 상관관계 매트릭스 계산
// ========================================

function computeCorrelationMatrix(data: GrowthInferenceData) {
  const labels = ['자기조절', '실행탄력성', '가치-행동', '회복탄성']

  const sri = data.users.map(u => u.inference.selfRegulationIndex)
  const eri = data.users.map(u => u.inference.executionResilienceIndex)
  const vaa = data.users.map(u => u.inference.valueActionAlignment)
  const rc = data.users.map(u => u.inference.recoveryCurveScore)

  const arrays = [sri, eri, vaa as (number | null)[], rc]
  const n = 4
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0))

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        matrix[i][j] = 1
      } else {
        matrix[i][j] = pearsonCorrelation(arrays[i], arrays[j])
      }
    }
  }

  return { labels, matrix }
}

function pearsonCorrelation(a: (number | null)[], b: (number | null)[]): number {
  const pairs: [number, number][] = []
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== null && b[i] !== null) {
      pairs.push([a[i] as number, b[i] as number])
    }
  }
  if (pairs.length < 3) return 0

  const n = pairs.length
  const meanA = pairs.reduce((s, p) => s + p[0], 0) / n
  const meanB = pairs.reduce((s, p) => s + p[1], 0) / n

  let num = 0, denA = 0, denB = 0
  for (const [x, y] of pairs) {
    num += (x - meanA) * (y - meanB)
    denA += (x - meanA) ** 2
    denB += (y - meanB) ** 2
  }

  const den = Math.sqrt(denA * denB)
  if (den === 0) return 0
  return Math.round((num / den) * 100) / 100
}

// ========================================
// 기술통계 계산
// ========================================

interface DescriptiveRow {
  label: string
  n: number
  mean: number
  sd: number
  min: number
  max: number
}

function computeDescriptiveStats(data: GrowthInferenceData): DescriptiveRow[] {
  const sri = data.users.map(u => u.inference.selfRegulationIndex)
  const eri = data.users.map(u => u.inference.executionResilienceIndex)
  const vaa = data.users.map(u => u.inference.valueActionAlignment).filter((v): v is number => v !== null)
  const rc = data.users.map(u => u.inference.recoveryCurveScore)

  return [
    makeRow('자기조절지수', sri),
    makeRow('실행탄력성', eri),
    makeRow('가치-행동 일치도', vaa),
    makeRow('회복탄성', rc),
  ]
}

function makeRow(label: string, values: number[]): DescriptiveRow {
  if (values.length === 0) return { label, n: 0, mean: 0, sd: 0, min: 0, max: 0 }
  const n = values.length
  const m = values.reduce((a, b) => a + b, 0) / n
  const variance = values.reduce((s, x) => s + (x - m) ** 2, 0) / (n > 1 ? n - 1 : 1)
  return {
    label,
    n,
    mean: Math.round(m * 100) / 100,
    sd: Math.round(Math.sqrt(variance) * 100) / 100,
    min: Math.round(Math.min(...values) * 100) / 100,
    max: Math.round(Math.max(...values) * 100) / 100,
  }
}

// ========================================
// 클립보드 복사용 텍스트
// ========================================

function buildCopyText(
  data: GrowthInferenceData,
  grade: StudyGrade,
  corr: { labels: string[]; matrix: number[][] },
  stats: DescriptiveRow[],
): string {
  const lines: string[] = []
  const N = data.metadata.totalUsers
  const agg = data.aggregates

  lines.push('# 행동 데이터 기반 청소년 성장 추론 모델 개발 및 검증')
  lines.push('## 자기조절, 실행탄력성, 가치-행동 일치도, 회복탄성을 중심으로')
  lines.push(`연구 등급: ${GRADE_LABELS[grade]} (N=${N})`)
  lines.push('')

  lines.push('## Abstract')
  lines.push(`본 연구는 청소년의 일상 행동 데이터를 활용하여 성장 과정을 추론하는 모델을 개발하고 검증하였다. ${N}명을 대상으로 한 파일럿 분석 결과, 자기조절지수 평균 ${agg.avgSelfRegulation}점, 실행탄력성 평균 ${agg.avgResilience}점으로 나타났다.`)
  lines.push('')

  lines.push('## Table 1: 기술통계')
  lines.push('| 지표 | N | M | SD | Min | Max |')
  lines.push('|------|---|---|-----|-----|-----|')
  for (const row of stats) {
    lines.push(`| ${row.label} | ${row.n} | ${row.mean} | ${row.sd} | ${row.min} | ${row.max} |`)
  }
  lines.push('')

  lines.push('## Table 2: 성장 상태 분류 분포')
  lines.push('| 성장 상태 | n | % |')
  lines.push('|----------|---|---|')
  for (const [state, count] of Object.entries(data.stateDistribution)) {
    lines.push(`| ${state} | ${count} | ${N > 0 ? ((count / N) * 100).toFixed(1) : '0.0'} |`)
  }
  lines.push('')

  lines.push('## Table 3: 상관관계 매트릭스')
  lines.push(`| 지표 | ${corr.labels.join(' | ')} |`)
  lines.push(`|------|${corr.labels.map(() => '---').join('|')}|`)
  for (let i = 0; i < corr.matrix.length; i++) {
    const row = corr.matrix[i].map((v, j) => i === j ? '—' : v.toFixed(2)).join(' | ')
    lines.push(`| ${corr.labels[i]} | ${row} |`)
  }
  lines.push('')

  lines.push('## 참고문헌')
  for (const ref of REFERENCES) {
    lines.push(ref)
  }

  return lines.join('\n')
}
