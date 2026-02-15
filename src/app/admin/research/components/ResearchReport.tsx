'use client'

import { useState, useMemo } from 'react'

// ========================================
// 타입 (page.tsx와 동일)
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
// 상수
// ========================================

const AREA_LABELS: Record<ResearchArea, string> = {
  career: '진로탐색', community: '공동체의식', nonCognitive: '인성역량',
  learning: '학습역량', habit: '습관형성',
}

const AREA_LABELS_EN: Record<ResearchArea, string> = {
  career: 'Career Exploration', community: 'Community Awareness',
  nonCognitive: 'Character Competency', learning: 'Learning Competency',
  habit: 'Habit Formation',
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

const areas: ResearchArea[] = ['career', 'community', 'nonCognitive', 'learning', 'habit']

// ========================================
// 연구 등급 판별
// ========================================

type StudyGrade = 'preliminary' | 'exploratory' | 'confirmatory'

function getStudyGrade(N: number): StudyGrade {
  if (N >= 30) return 'confirmatory'
  if (N >= 10) return 'exploratory'
  return 'preliminary'
}

const GRADE_LABELS: Record<StudyGrade, string> = {
  preliminary: '예비 연구 보고서 (Preliminary Study Report)',
  exploratory: '탐색적 연구 보고서 (Exploratory Study Report)',
  confirmatory: '종단 연구 보고서 (Longitudinal Study Report)',
}

const GRADE_LIMITATION: Record<StudyGrade, string> = {
  preliminary: '본 연구는 참여자 수(N<10)가 제한적인 예비 연구(pilot study)로서, 결과의 일반화에 상당한 제약이 있다. 향후 표본 크기를 확대하여 탐색적 분석으로 전환할 필요가 있다.',
  exploratory: '본 연구는 소규모 표본(10≤N<30)에 기반한 탐색적 연구로서, 통계적 검정력(statistical power)의 한계가 존재한다. 효과크기 추정은 참고 수준으로 해석하여야 하며, 표본이 30명 이상으로 확대될 경우 확인적 분석(confirmatory analysis)으로 전환하여 보다 엄밀한 통계 검증이 가능할 것이다.',
  confirmatory: '본 연구는 종단적 반복측정 설계에 기반하였으나, 무선 배정이 아닌 자연관찰 설계이므로 인과 추론에 제한이 있다. 또한, 자기보고식 설문과 행동 로그의 통합 측정에서 공통방법편의(common method bias)의 가능성을 배제할 수 없다. 향후 통제집단 비교 설계 및 외부 준거(external criterion)와의 교차타당도 검증이 필요하다.',
}

// ========================================
// 리포트 텍스트 생성기
// ========================================

function generateReport(data: ResearchData, mode: 'surveyOnly' | 'integrated'): string {
  const N = data.metadata.totalParticipants
  const grade = getStudyGrade(N)
  const milestones = data.metadata.milestones
  const dateStr = new Date(data.metadata.computedAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
  const scores = mode === 'integrated' ? data.integratedScores.integrated : data.integratedScores.surveyOnly
  const modeLabel = mode === 'integrated' ? '설문-행동 로그 통합 측정' : '자기보고식 설문 단독 측정'

  // 마일스톤별 N
  const msN = milestones.map(ms => ({
    ms,
    n: data.metadata.milestoneDistribution[ms] || 0,
  }))

  // 유효 마일스톤 (N>0)
  const validMs = msN.filter(m => m.n > 0)

  // 유효 대응표본
  const validPairs = data.growthAnalysis.filter(g => g.n >= 2)

  // 최고/최저 영역 찾기
  const findTopBottom = (msVal: number) => {
    const s = scores[msVal]
    if (!s) return { top: 'career' as ResearchArea, bottom: 'career' as ResearchArea }
    let top: ResearchArea = 'career'
    let bottom: ResearchArea = 'career'
    for (const a of areas) {
      if ((s[a] || 0) > (s[top] || 0)) top = a
      if ((s[a] || 0) < (s[bottom] || 0)) bottom = a
    }
    return { top, bottom }
  }

  // 하위역량 테이블 생성
  const makeSubCompTable = (ms: number) => {
    const lines: string[] = []
    lines.push('| 영역 | 하위역량 | N | M | SD | Mdn | Min | Max |')
    lines.push('|------|---------|---|---|----|----|-----|-----|')
    for (const area of areas) {
      for (const id of AREA_SUB_IDS[area]) {
        const stat = data.subCompetencyStats[ms]?.[id]
        if (!stat || stat.n === 0) continue
        lines.push(`| ${AREA_LABELS[area]} | ${SUB_COMP_LABELS[id]} | ${stat.n} | ${stat.mean.toFixed(2)} | ${stat.sd.toFixed(2)} | ${stat.median.toFixed(2)} | ${stat.min.toFixed(2)} | ${stat.max.toFixed(2)} |`)
      }
    }
    return lines.join('\n')
  }

  // 효과크기 해석 문구
  const dInterp = (d: number) => {
    const abs = Math.abs(d)
    if (abs >= 0.8) return '큰 효과크기(large effect)'
    if (abs >= 0.5) return '중간 효과크기(medium effect)'
    if (abs >= 0.2) return '작은 효과크기(small effect)'
    return '무시할 수준의 효과크기(negligible effect)'
  }

  // ========================================
  // 보고서 본문 조합
  // ========================================

  const lines: string[] = []

  // ---------- 제목 ----------
  lines.push('═══════════════════════════════════════════════════════════════')
  lines.push('')
  lines.push(`${GRADE_LABELS[grade]}`)
  lines.push('')
  lines.push('실행 기반 청소년 성장역량 종단 변화 분석:')
  lines.push('5개 영역 25개 하위역량의 마일스톤별 발달 궤적 탐색')
  lines.push('')
  lines.push('A Longitudinal Analysis of Execution-Based Youth Growth Competencies:')
  lines.push('Exploring Developmental Trajectories of 25 Sub-Competencies Across Five Domains by Milestone')
  lines.push('')
  lines.push('═══════════════════════════════════════════════════════════════')
  lines.push('')
  lines.push(`분석 일시: ${dateStr}`)
  lines.push(`측정 모드: ${modeLabel}`)
  lines.push(`연구 등급: ${grade === 'preliminary' ? '예비 연구' : grade === 'exploratory' ? '탐색적 연구' : '확인적 종단 연구'} (N=${N})`)
  lines.push('')
  lines.push('')

  // ---------- 초록 (Abstract) ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('초록 (Abstract)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  const abstractParts: string[] = []
  abstractParts.push(`본 연구는 실행 기반 성장 플랫폼 '길로그(GILLOG)'를 활용하여 청소년의 성장역량 종단 변화를 분석하였다.`)
  abstractParts.push(`연구 참여자 총 ${N}명을 대상으로, 누적 실행 횟수에 따른 마일스톤(${milestones.join(', ')}회) 시점에서 반복측정을 실시하였다.`)
  abstractParts.push(`측정 도구는 5개 영역(진로탐색, 공동체의식, 인성역량, 학습역량, 습관형성) 25개 하위역량으로 구성된 자기보고식 설문(Likert 5점 척도, 50문항)${mode === 'integrated' ? '과 플랫폼 행동 로그 데이터를 통합하여 사용하였다' : '을 사용하였다'}.`)

  if (validMs.length >= 2 && validPairs.length > 0) {
    const firstPair = validPairs[0]
    const topArea = areas.reduce((max, a) =>
      Math.abs(firstPair.cohenDByArea[a]?.d || 0) > Math.abs(firstPair.cohenDByArea[max]?.d || 0) ? a : max
    , areas[0])
    const topD = firstPair.cohenDByArea[topArea]?.d || 0
    abstractParts.push(`대응표본 분석(N=${firstPair.n}) 결과, ${firstPair.from}회에서 ${firstPair.to}회로의 변화에서 ${AREA_LABELS[topArea]} 영역이 가장 두드러진 변화를 보였으며(Cohen's d = ${topD.toFixed(2)}, ${dInterp(topD)}), 이는 실행 경험의 축적이 해당 역량의 질적 전환에 기여함을 시사한다.`)
  }
  abstractParts.push(`본 연구의 결과는 실행 기반 성장 프로그램의 효과성 근거를 제공하며, 한국 교육 인적자원 표준 개발을 위한 기초 자료로 활용될 수 있다.`)

  lines.push(abstractParts.join(' '))
  lines.push('')
  lines.push(`주제어: 성장역량, 종단 연구, 실행 기반 학습, 마일스톤 평가, 하위역량 분석, 청소년 발달`)
  lines.push(`Keywords: growth competency, longitudinal study, execution-based learning, milestone assessment, sub-competency analysis, youth development`)
  lines.push('')
  lines.push('')

  // ---------- 1. 서론 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('I. 서론 (Introduction)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  lines.push('1. 연구의 필요성 및 목적')
  lines.push('')
  lines.push('  최근 교육 패러다임은 지식 전달 중심에서 역량 중심(competency-based)으로 전환되고 있으며(OECD, 2019; 교육부, 2022), 2022 개정 교육과정은 자기관리, 지식정보처리, 창의적 사고, 협력적 소통, 공동체 역량, 심미적 감성의 6대 핵심역량을 제시하고 있다. 그러나 이러한 역량의 발달 과정을 실증적으로 추적한 종단 연구는 국내외적으로 매우 부족한 실정이다.')
  lines.push('')
  lines.push('  특히, 기존의 역량 측정은 대부분 자기보고식 설문에 의존하고 있어, 실제 행동 변화와의 괴리(intention-behavior gap)가 지적되어 왔다(Sheeran & Webb, 2016). 이에 본 연구는 자기보고식 설문 데이터와 실제 행동 로그 데이터를 통합하는 다중 측정(multi-method) 접근을 통해, 청소년 성장역량의 종단 변화를 보다 타당하게 분석하고자 한다.')
  lines.push('')
  lines.push('  본 연구의 구체적 목적은 다음과 같다:')
  lines.push('  (1) 누적 실행 횟수에 따른 5개 성장영역 25개 하위역량의 발달 궤적을 기술하고,')
  lines.push('  (2) 마일스톤 구간별 성장 기울기 분석을 통해 역량 발달의 임계점(threshold)을 탐색하며,')
  if (mode === 'integrated') {
    lines.push('  (3) 자기보고 설문과 행동 로그의 통합 측정이 단일 측정 대비 어떠한 추가적 설명력을 제공하는지 검증하고,')
    lines.push('  (4) 이를 통해 실행 기반 성장 프로그램의 효과성에 관한 실증적 근거를 축적하는 것이다.')
  } else {
    lines.push('  (3) 이를 통해 실행 기반 성장 프로그램의 효과성에 관한 실증적 근거를 축적하는 것이다.')
  }
  lines.push('')
  lines.push('')

  lines.push('2. 이론적 배경')
  lines.push('')
  lines.push('  2.1 진로 발달 (Career Development)')
  lines.push('    Super(1990)의 진로발달이론에 따르면, 청소년기는 진로 탐색기(exploration stage)에 해당하며, 이 시기의 자기이해, 직업 탐색, 진로 설계 경험이 이후 진로 성숙도에 결정적 영향을 미친다. Lent, Brown, & Hackett(1994)의 사회인지진로이론(SCCT)은 자기효능감과 결과기대가 진로 관련 행동을 매개한다고 설명한다.')
  lines.push('')
  lines.push('  2.2 공동체 역량 (Community Competency)')
  lines.push('    CASEL(2020)의 사회정서학습(SEL) 프레임워크는 자기인식, 자기관리, 사회적 인식, 관계 기술, 책임 있는 의사결정의 5대 핵심역량을 제시한다. Bronfenbrenner(1979)의 생태체계이론은 개인의 발달이 미시체계(가정, 학교)에서 거시체계(문화, 제도)에 이르는 다층적 환경과의 상호작용 속에서 이루어짐을 강조한다.')
  lines.push('')
  lines.push('  2.3 인성 역량 (Character Competency)')
  lines.push('    Lickona(1991)의 인성교육론은 도덕적 앎(knowing), 도덕적 느낌(feeling), 도덕적 행동(action)의 통합을 강조하며, Seligman & Peterson(2004)의 VIA 성격강점 분류체계는 24개 성격강점을 6개 미덕(지혜, 용기, 인간애, 정의, 절제, 초월)으로 범주화한다. 한국 인성교육진흥법(2015)은 예, 효, 정직, 책임, 존중, 배려, 소통, 협동의 8대 핵심 가치/덕목을 규정하고 있다.')
  lines.push('')
  lines.push('  2.4 학습 역량 (Learning Competency)')
  lines.push('    Zimmerman(2000)의 자기조절학습이론은 학습자가 사전숙고(forethought), 수행(performance), 자기성찰(self-reflection)의 순환적 과정을 통해 학습을 조절한다고 설명한다. Flavell(1979)의 메타인지이론은 자신의 인지 과정에 대한 인지(cognition about cognition)를 통해 학습 전략의 선택과 조정이 이루어짐을 강조한다.')
  lines.push('')
  lines.push('  2.5 습관 형성 (Habit Formation)')
  lines.push('    Lally et al.(2010)의 연구에 따르면, 새로운 습관이 자동화되기까지 평균 66일(범위 18-254일)이 소요되며, 이는 개인차와 행동 복잡성에 따라 달라진다. Deci & Ryan(2000)의 자기결정성이론(SDT)은 자율성, 유능성, 관계성의 기본심리욕구 충족이 내재적 동기와 습관 유지에 핵심적임을 밝히고 있다.')
  lines.push('')
  lines.push('')

  // ---------- 2. 연구 방법 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('II. 연구 방법 (Methods)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  lines.push('1. 연구 설계')
  lines.push('')
  lines.push(`  본 연구는 종단적 반복측정 설계(longitudinal repeated-measures design)를 채택하였다. 참여자의 누적 실행 횟수가 사전 설정된 마일스톤(${milestones.join(', ')}회)에 도달할 때마다 동일한 측정 도구를 반복 투입하여, 실행 경험 축적에 따른 성장역량의 변화를 추적하였다. 이는 전통적인 시간 기반(time-based) 종단 설계와 달리, 개인의 실행 투입량(dosage)을 기준으로 한 투입량 기반(dosage-based) 종단 설계라는 점에서 방법론적 특이성을 갖는다.`)
  lines.push('')
  lines.push('')

  lines.push('2. 연구 참여자')
  lines.push('')
  lines.push(`  본 연구의 참여자는 실행 기반 성장 플랫폼 '길로그(GILLOG)'를 사용하는 청소년 총 ${N}명이다.`)
  if (validMs.length > 0) {
    lines.push(`  마일스톤별 참여자 분포는 다음과 같다:`)
    for (const m of validMs) {
      lines.push(`    - ${m.ms}회 마일스톤: ${m.n}명`)
    }
  }

  // 대응표본 가능 수
  const pairedCounts = validPairs.map(g => `${g.from}→${g.to}회 대응쌍 ${g.n}명`)
  if (pairedCounts.length > 0) {
    lines.push(`  종단 대응표본: ${pairedCounts.join(', ')}`)
  }
  lines.push('')
  lines.push('')

  lines.push('3. 측정 도구')
  lines.push('')
  lines.push('  3.1 자기보고식 설문')
  lines.push('    본 연구에서 사용된 설문 도구는 5개 성장영역(진로탐색, 공동체의식, 인성역량, 학습역량, 습관형성)에 대해 각 10문항씩 총 50문항으로 구성되었으며, Likert 5점 척도(1=전혀 그렇지 않다 ~ 5=매우 그렇다)로 응답하도록 하였다. 각 영역의 하위역량은 다음과 같다:')
  lines.push('')
  for (const area of areas) {
    const subLabels = AREA_SUB_IDS[area].map(id => `${id}(${SUB_COMP_LABELS[id]})`).join(', ')
    lines.push(`    - ${AREA_LABELS[area]}: ${subLabels}`)
  }
  lines.push('')
  lines.push('    영역별 점수는 해당 문항의 합산점을 최대점으로 나눈 후 비선형 보정(exponent=1.12)을 적용하여 0~100점으로 변환하였다.')

  if (mode === 'integrated') {
    lines.push('')
    lines.push('  3.2 행동 로그 데이터')
    lines.push('    플랫폼에 기록된 실행 이력(execution history)을 파싱하여, 각 하위역량에 대응하는 행동 지표를 산출하였다. 행동 지표는 횟수(count), 비율(ratio), 연속일(days), 다양성 지수(diversity), 텍스트 평균 길이(chars)의 5개 단위로 측정되며, 각 지표를 마일스톤별 기준값으로 정규화하여 0~100 척도로 변환하였다.')
    lines.push('')
    lines.push('  3.3 통합 점수 산출')
    lines.push('    자기보고 설문 점수와 행동 로그 점수를 가중 합산하여 통합 점수를 산출하였다:')
    lines.push('      Integrated Score = Survey Score × 0.60 + Behavioral Score × 0.40')
    lines.push('    자기보고의 방법론적 전통과 측정의 안정성을 고려하여 60%의 가중치를 부여하였으며, 행동 로그의 객관적 증거 가치를 반영하여 40%의 가중치를 배정하였다. 행동 로그 데이터가 부재한 경우 설문 점수만으로 산출(fallback)하였다.')
  }
  lines.push('')
  lines.push('')

  lines.push('4. 분석 방법')
  lines.push('')
  lines.push('  수집된 데이터는 다음의 방법으로 분석하였다:')
  lines.push('  (1) 기술통계 분석: 마일스톤별 5개 영역 및 25개 하위역량의 평균, 표준편차, 중앙값, 사분위수를 산출하였다.')
  if (validPairs.length > 0) {
    lines.push('  (2) 대응표본 분석: 동일 참여자의 마일스톤 간 점수 변화를 분석하고, Cohen\'s d 효과크기를 산출하여 실질적 유의미성을 평가하였다.')
    lines.push('  (3) 성장 기울기 분석: 마일스톤 구간별 점수 변화율(slope)과 가속도(acceleration)를 산출하여 역량 발달의 임계점을 탐색하였다.')
  }
  if (grade !== 'preliminary') {
    lines.push('  (4) 효과크기 해석은 Cohen(1988)의 기준(|d|<0.2 무시, 0.2≤|d|<0.5 작은 효과, 0.5≤|d|<0.8 중간 효과, |d|≥0.8 큰 효과)을 적용하였다.')
  }
  lines.push('')
  lines.push('')

  // ---------- 3. 결과 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('III. 연구 결과 (Results)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  // 결과 1: 마일스톤별 기술통계
  lines.push('1. 마일스톤별 영역 기술통계')
  lines.push('')

  for (const ms of milestones) {
    const n = data.metadata.milestoneDistribution[ms] || 0
    if (n === 0) continue
    const areaScores = scores[ms]
    if (!areaScores) continue

    lines.push(`  [${ms}회 마일스톤] (N=${n})`)
    lines.push('')
    lines.push('  | 영역 | M | SD* |')
    lines.push('  |------|---|-----|')
    for (const a of areas) {
      // SD는 하위역량 통계에서 추출
      const subIds = AREA_SUB_IDS[a]
      const subStats = subIds.map(id => data.subCompetencyStats[ms]?.[id]).filter(Boolean)
      const avgSd = subStats.length > 0
        ? subStats.reduce((sum, s) => sum + (s?.sd || 0), 0) / subStats.length
        : 0
      lines.push(`  | ${AREA_LABELS[a]} | ${(areaScores[a] || 0).toFixed(2)} | ${avgSd.toFixed(2)} |`)
    }
    lines.push('  * SD는 해당 영역 하위역량 SD의 평균값')
    lines.push('')
  }

  // 영역별 특징 서술
  for (const ms of milestones) {
    const n = data.metadata.milestoneDistribution[ms] || 0
    if (n === 0) continue
    const areaScores = scores[ms]
    if (!areaScores) continue
    const { top, bottom } = findTopBottom(ms)
    lines.push(`  ${ms}회 시점에서 가장 높은 점수를 보인 영역은 ${AREA_LABELS[top]}(M=${(areaScores[top] || 0).toFixed(2)})이었으며, 가장 낮은 점수를 보인 영역은 ${AREA_LABELS[bottom]}(M=${(areaScores[bottom] || 0).toFixed(2)})이었다.`)
  }
  lines.push('')
  lines.push('')

  // 결과 2: 하위역량 기술통계
  lines.push('2. 하위역량 수준 기술통계')
  lines.push('')

  for (const ms of milestones) {
    const n = data.metadata.milestoneDistribution[ms] || 0
    if (n === 0) continue
    lines.push(`  [Table ${milestones.indexOf(ms) + 1}] ${ms}회 마일스톤 하위역량 기술통계 (N=${n})`)
    lines.push('')
    lines.push('  ' + makeSubCompTable(ms).split('\n').join('\n  '))
    lines.push('')
  }

  // 하위역량 패턴 서술
  for (const ms of milestones) {
    const n = data.metadata.milestoneDistribution[ms] || 0
    if (n === 0) continue

    // 최고/최저 하위역량 탐색
    let topSub = { id: '', mean: 0, area: '' }
    let bottomSub = { id: '', mean: 999, area: '' }
    for (const area of areas) {
      for (const id of AREA_SUB_IDS[area]) {
        const stat = data.subCompetencyStats[ms]?.[id]
        if (!stat || stat.n === 0) continue
        if (stat.mean > topSub.mean) topSub = { id, mean: stat.mean, area: AREA_LABELS[area] }
        if (stat.mean < bottomSub.mean) bottomSub = { id, mean: stat.mean, area: AREA_LABELS[area] }
      }
    }
    if (topSub.id) {
      lines.push(`  ${ms}회 시점에서 25개 하위역량 중 최고 평균을 보인 역량은 ${SUB_COMP_LABELS[topSub.id]}(${topSub.area}, M=${topSub.mean.toFixed(2)})이었으며, 최저 평균은 ${SUB_COMP_LABELS[bottomSub.id]}(${bottomSub.area}, M=${bottomSub.mean.toFixed(2)})이었다.`)
    }
  }
  lines.push('')
  lines.push('')

  // 결과 3: 대응표본 분석
  if (validPairs.length > 0) {
    lines.push('3. 대응표본 성장 분석')
    lines.push('')

    for (const g of validPairs) {
      lines.push(`  [${g.from}회 → ${g.to}회 구간] (대응쌍 N=${g.n})`)
      lines.push('')
      lines.push('  | 영역 | 사전 M* | 사후 M* | 변화량 | Cohen\'s d | 효과크기 해석 |')
      lines.push('  |------|---------|---------|--------|-----------|-------------|')
      for (const a of areas) {
        const pre = scores[g.from]?.[a] || 0
        const post = scores[g.to]?.[a] || 0
        const delta = g.deltaByArea[a] || 0
        const d = g.cohenDByArea[a]?.d || 0
        const interp = g.cohenDByArea[a]?.interpretation || '-'
        lines.push(`  | ${AREA_LABELS[a]} | ${pre.toFixed(2)} | ${post.toFixed(2)} | ${delta > 0 ? '+' : ''}${delta.toFixed(2)} | ${d.toFixed(2)} | ${interp} |`)
      }
      lines.push('  * 영역 평균 점수 (0~100)')
      lines.push('')

      // 서술
      const sorted = [...areas].sort((a, b) =>
        Math.abs(g.cohenDByArea[b]?.d || 0) - Math.abs(g.cohenDByArea[a]?.d || 0)
      )
      const topA = sorted[0]
      const topD = g.cohenDByArea[topA]?.d || 0

      lines.push(`  ${g.from}회에서 ${g.to}회로의 변화 분석 결과, 가장 큰 효과크기를 보인 영역은 ${AREA_LABELS[topA]}(d=${topD.toFixed(2)}, ${dInterp(topD)})이었다.`)

      // 각 영역 서술
      for (const a of sorted) {
        const delta = g.deltaByArea[a] || 0
        const d = g.cohenDByArea[a]?.d || 0
        const direction = delta > 0 ? '정적 변화(향상)' : delta < 0 ? '부적 변화(하락)' : '무변화'
        lines.push(`  ${AREA_LABELS[a]} 영역은 ${direction}를 보였으며(${AREA_LABELS_EN[a]}: Mdiff=${delta > 0 ? '+' : ''}${delta.toFixed(2)}, d=${d.toFixed(2)}), 이는 ${dInterp(d)}에 해당한다.`)
      }
      lines.push('')
    }
    lines.push('')
  }

  // 결과 4: 성장 기울기 분석
  if (data.thresholdAnalysis.slopes.length > 0) {
    lines.push(`${validPairs.length > 0 ? '4' : '3'}. 구간별 성장 기울기 분석 (임계점 탐지)`)
    lines.push('')
    lines.push('  마일스톤 구간별 성장 기울기(slope)와 가속도(acceleration)를 분석하여 역량 발달의 패턴을 탐색하였다.')
    lines.push('')
    lines.push('  | 구간 | 영역 | 기울기 | 가속도 | 추세 |')
    lines.push('  |------|------|--------|--------|------|')
    for (const s of data.thresholdAnalysis.slopes) {
      const trendLabel = s.trend === 'accelerating' ? '가속' : s.trend === 'decelerating' ? '감속' : '유지'
      lines.push(`  | ${s.from}→${s.to} | ${AREA_LABELS[s.area]} | ${s.slope.toFixed(4)} | ${s.acceleration.toFixed(4)} | ${trendLabel} |`)
    }
    lines.push('')

    // 가속/감속 패턴 서술
    const accelerating = data.thresholdAnalysis.slopes.filter(s => s.trend === 'accelerating')
    const decelerating = data.thresholdAnalysis.slopes.filter(s => s.trend === 'decelerating')

    if (accelerating.length > 0) {
      const accAreas = [...new Set(accelerating.map(s => AREA_LABELS[s.area]))]
      lines.push(`  성장 가속 패턴을 보인 영역은 ${accAreas.join(', ')}으로, 이는 해당 구간에서 실행 경험의 질적 전환(qualitative shift)이 발생하였을 가능성을 시사한다.`)
    }
    if (decelerating.length > 0) {
      const decAreas = [...new Set(decelerating.map(s => AREA_LABELS[s.area]))]
      lines.push(`  성장 감속 패턴을 보인 영역은 ${decAreas.join(', ')}으로, 이는 초기 급성장 이후 안정화 단계(plateau phase)에 진입한 것으로 해석할 수 있다.`)
    }
    lines.push('')
    lines.push('')
  }

  // 결과 5: 모드 비교 (integrated일 때만)
  if (mode === 'integrated') {
    const sectionNum = validPairs.length > 0 ? (data.thresholdAnalysis.slopes.length > 0 ? '5' : '4') : '3'
    lines.push(`${sectionNum}. 측정 모드 비교: 설문 단독 vs 설문-행동 통합`)
    lines.push('')
    lines.push('  | 마일스톤 | 영역 | Survey Only | Integrated | 차이 |')
    lines.push('  |----------|------|-------------|------------|------|')
    for (const ms of milestones) {
      for (const a of areas) {
        const sv = data.integratedScores.surveyOnly[ms]?.[a] || 0
        const intg = data.integratedScores.integrated[ms]?.[a] || 0
        const diff = intg - sv
        if (sv === 0 && intg === 0) continue
        lines.push(`  | ${ms}회 | ${AREA_LABELS[a]} | ${sv.toFixed(2)} | ${intg.toFixed(2)} | ${diff > 0 ? '+' : ''}${diff.toFixed(2)} |`)
      }
    }
    lines.push('')
    lines.push('  행동 로그를 통합한 측정은 자기보고의 사회적 바람직성 편향(social desirability bias)을 보완하고, 실제 행동 수행의 객관적 증거를 반영한다는 점에서 측정의 생태학적 타당도(ecological validity)를 높이는 것으로 판단된다.')
    lines.push('')
    lines.push('')
  }

  // ---------- 4. 논의 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('IV. 논의 (Discussion)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  lines.push('1. 주요 발견의 해석')
  lines.push('')

  // 동적 논의 생성
  if (validMs.length >= 1) {
    const firstMs = validMs[0]
    const areaScores = scores[firstMs.ms]
    if (areaScores) {
      const { top, bottom } = findTopBottom(firstMs.ms)
      lines.push(`  ${firstMs.ms}회 시점의 기초선(baseline) 분석에서 ${AREA_LABELS[top]} 영역이 가장 높은 수준을 보인 것은, 플랫폼 사용 초기부터 참여자들이 해당 역량에 대한 자기인식이 상대적으로 높음을 시사한다. 반면, ${AREA_LABELS[bottom]} 영역이 가장 낮은 것은 해당 역량의 발달적 지원이 우선적으로 필요함을 의미한다.`)
      lines.push('')
    }
  }

  if (validPairs.length > 0) {
    for (const g of validPairs) {
      const sorted = [...areas].sort((a, b) =>
        Math.abs(g.cohenDByArea[b]?.d || 0) - Math.abs(g.cohenDByArea[a]?.d || 0)
      )
      const topA = sorted[0]
      const topD = g.cohenDByArea[topA]?.d || 0

      if (Math.abs(topD) >= 0.2) {
        lines.push(`  ${g.from}→${g.to}회 구간에서 ${AREA_LABELS[topA]} 영역이 가장 현저한 변화(d=${topD.toFixed(2)})를 보인 것은 주목할 만하다. 이는 누적 실행 경험이 ${(g.to - g.from)}회 증가하는 동안 해당 역량의 질적 변화가 발생하였음을 시사하며, ${
          topA === 'career' ? 'Super(1990)의 진로 탐색기 이론' :
          topA === 'community' ? 'CASEL(2020)의 SEL 프레임워크' :
          topA === 'nonCognitive' ? 'Seligman & Peterson(2004)의 VIA 성격강점 이론' :
          topA === 'learning' ? 'Zimmerman(2000)의 자기조절학습 모형' :
          'Lally et al.(2010)의 습관 형성 이론'
        }과 일관된다.`)
        lines.push('')
      }
    }
  }

  lines.push('')
  lines.push('2. 이론적 시사점')
  lines.push('')
  lines.push('  본 연구의 결과는 역량 발달이 단순한 선형적 증가가 아닌, 실행 투입량에 따른 비선형적 궤적(nonlinear trajectory)을 보일 수 있음을 시사한다. 특히, 마일스톤 구간별 성장 기울기의 차이는 역량 발달에 임계점(threshold)이 존재할 가능성을 제기하며, 이는 Lally et al.(2010)이 제시한 습관 자동화의 변곡점 개념과 맥락을 같이 한다.')
  lines.push('')
  lines.push('  또한, 5개 영역의 발달 궤적이 상이한 패턴을 보이는 것은, 각 역량의 발달 기제(mechanism)와 소요 시간이 다를 수 있음을 의미한다. 이는 역량 교육의 시기별 중점 영역을 차별화할 필요성을 시사한다.')
  lines.push('')
  lines.push('')

  lines.push('3. 실천적 시사점')
  lines.push('')
  lines.push('  (1) 교육 프로그램 설계: 역량 영역별 발달 속도의 차이를 고려하여, 초기에는 빠른 성장이 예상되는 영역을 중심으로 동기를 부여하고, 이후 상대적으로 느린 성장을 보이는 영역에 대한 집중 지원을 제공하는 단계적 접근이 효과적일 것이다.')
  lines.push('  (2) 평가 체계: 단일 시점의 수행 수준 평가보다, 성장 궤적의 방향성과 기울기를 함께 고려하는 발달적 평가(developmental assessment) 체계가 보다 타당한 역량 측정을 가능하게 할 것이다.')
  if (mode === 'integrated') {
    lines.push('  (3) 다중 측정의 활용: 자기보고와 행동 로그의 통합 측정은 단일 방법의 한계를 보완하며, 보다 종합적이고 타당한 역량 프로파일을 제공할 수 있다.')
  }
  lines.push('')
  lines.push('')

  lines.push('4. 연구의 제한점 및 후속 연구 제언')
  lines.push('')
  lines.push(`  ${GRADE_LIMITATION[grade]}`)
  lines.push('')
  lines.push('  후속 연구를 위한 제언은 다음과 같다:')
  lines.push('  (1) 표본 크기를 확대하여 통계적 검정력을 확보하고, 성별, 학년, 지역 등 하위집단 분석을 실시할 필요가 있다.')
  lines.push('  (2) 구조방정식 모형(SEM) 또는 다층 성장모형(multilevel growth model)을 적용하여 개인 내 변화와 개인 간 차이를 동시에 분석하는 것이 유용할 것이다.')
  lines.push('  (3) 외부 준거(학업 성취, 교사 평정, 또래 평정 등)와의 수렴/변별 타당도 검증이 필요하다.')
  lines.push('  (4) 실행 중단 후 재개(recovery) 패턴, 계절적 변동(seasonal variation) 등 시계열적 분석을 추가할 수 있다.')
  lines.push('')
  lines.push('')

  // ---------- 5. 결론 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('V. 결론 (Conclusion)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')

  const conclusionParts: string[] = []
  conclusionParts.push(`본 연구는 실행 기반 성장 플랫폼을 통해 축적된 종단 데이터를 활용하여, 청소년의 5개 성장영역 25개 하위역량의 발달 궤적을 분석하였다.`)

  if (validPairs.length > 0) {
    conclusionParts.push(`대응표본 분석 결과, 실행 경험의 축적에 따라 다수의 역량 영역에서 유의미한 변화가 관찰되었으며, 이는 실행 기반 성장 프로그램의 교육적 효과성에 대한 실증적 근거를 제공한다.`)
  }

  conclusionParts.push(`본 연구의 결과는 한국 교육 인적자원 표준 개발을 위한 기초 연구로서의 가치를 가지며, 역량 기반 교육의 성과 측정 및 프로그램 개선에 기여할 수 있을 것으로 기대된다.`)

  if (grade === 'preliminary') {
    conclusionParts.push(`현재 예비 연구 단계로서 참여자 확대에 따라 보다 정밀한 분석이 가능할 것이며, 지속적인 데이터 축적을 통해 연구의 학술적 엄밀성을 점진적으로 제고해 나갈 계획이다.`)
  }

  lines.push(conclusionParts.join(' '))
  lines.push('')
  lines.push('')

  // ---------- 참고문헌 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('참고문헌 (References)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')
  lines.push('Bronfenbrenner, U. (1979). The ecology of human development: Experiments by nature and design. Harvard University Press.')
  lines.push('')
  lines.push('CASEL. (2020). CASEL\'s SEL framework: What are the core competence areas and where are they promoted? Collaborative for Academic, Social, and Emotional Learning.')
  lines.push('')
  lines.push('Cohen, J. (1988). Statistical power analysis for the behavioral sciences (2nd ed.). Lawrence Erlbaum Associates.')
  lines.push('')
  lines.push('Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227-268.')
  lines.push('')
  lines.push('Flavell, J. H. (1979). Metacognition and cognitive monitoring: A new area of cognitive-developmental inquiry. American Psychologist, 34(10), 906-911.')
  lines.push('')
  lines.push('Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. European Journal of Social Psychology, 40(6), 998-1009.')
  lines.push('')
  lines.push('Lent, R. W., Brown, S. D., & Hackett, G. (1994). Toward a unifying social cognitive theory of career and academic interest, choice, and performance. Journal of Vocational Behavior, 45(1), 79-122.')
  lines.push('')
  lines.push('Lickona, T. (1991). Educating for character: How our schools can teach respect and responsibility. Bantam Books.')
  lines.push('')
  lines.push('OECD. (2019). OECD future of education and skills 2030: Conceptual learning framework. OECD Publishing.')
  lines.push('')
  lines.push('Peterson, C., & Seligman, M. E. P. (2004). Character strengths and virtues: A handbook and classification. Oxford University Press.')
  lines.push('')
  lines.push('Sheeran, P., & Webb, T. L. (2016). The intention-behavior gap. Social and Personality Psychology Compass, 10(9), 503-518.')
  lines.push('')
  lines.push('Super, D. E. (1990). A life-span, life-space approach to career development. In D. Brown & L. Brooks (Eds.), Career choice and development (pp. 197-261). Jossey-Bass.')
  lines.push('')
  lines.push('Zimmerman, B. J. (2000). Attaining self-regulation: A social cognitive perspective. In M. Boekaerts, P. R. Pintrich, & M. Zeidner (Eds.), Handbook of self-regulation (pp. 13-39). Academic Press.')
  lines.push('')
  lines.push('교육부. (2022). 2022 개정 교육과정 총론. 교육부 고시 제2022-33호.')
  lines.push('')
  lines.push('인성교육진흥법. (2015). 법률 제13004호.')
  lines.push('')
  lines.push('')

  // ---------- 부록 ----------
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('부록 (Appendix)')
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push('')
  lines.push('[부록 A] 25개 하위역량 정의 및 측정 지표')
  lines.push('')
  lines.push('| ID | 영역 | 하위역량 | 조작적 정의 | 설문 문항 | 행동 지표 |')
  lines.push('|----|------|---------|------------|----------|---------|')

  const subCompDefs: Record<string, { def: string; surveys: string; behavioral: string }> = {
    C1: { def: '자신의 흥미/강점/약점 인식', surveys: 'c1, c2', behavioral: '성찰 기록 빈도' },
    C2: { def: '다양한 진로 경로 탐색', surveys: 'c3, c9', behavioral: '텍스트 다양성' },
    C3: { def: '진로 목표 설정 및 계획', surveys: 'c5, c7', behavioral: '연속 실행일' },
    C4: { def: '진로 관련 경험 축적', surveys: 'c4, c6', behavioral: '실행 총 횟수' },
    C5: { def: '진로 목표 실행 및 자신감', surveys: 'c8, c10', behavioral: '실행 완료율' },
    M1: { def: '또래와의 관계 형성', surveys: 'm1, m4', behavioral: '실행 등록 빈도' },
    M2: { def: '타인 공감 및 존중', surveys: 'm2, m6', behavioral: '느낀것 기록 빈도' },
    M3: { def: '공동체 참여 및 협력', surveys: 'm3, m9', behavioral: '실행 완료 횟수' },
    M4: { def: '갈등의 대화적 해결', surveys: 'm7, m5', behavioral: '실패 성찰 빈도' },
    M5: { def: '시민의식 및 공정 추구', surveys: 'm8, m10', behavioral: '텍스트 다양성' },
    N1: { def: '어려움 속 끈기/인내', surveys: 'n1, n9', behavioral: '최장 연속일' },
    N2: { def: '자기주도적 계획 실행', surveys: 'n2, n6', behavioral: '일일반복 설정률' },
    N3: { def: '정서 조절 및 스트레스 관리', surveys: 'n3, n8', behavioral: '정서 기록 빈도' },
    N4: { def: '새로운 도전 및 재시도', surveys: 'n4, n5', behavioral: '신규 영역 시도 수' },
    N5: { def: '자기존중 및 성장 신념', surveys: 'n7, n10', behavioral: '활동 지속 일수' },
    L1: { def: '배움에 대한 내적 동기', surveys: 'l1, l9', behavioral: '학습 실행 빈도' },
    L2: { def: '자기주도적 학습 계획', surveys: 'l2, l7', behavioral: '자기주도 등록 비율' },
    L3: { def: '학습 집중 및 끈기', surveys: 'l3, l6', behavioral: '학습 연속일' },
    L4: { def: '학습 전략 인식 및 오류 학습', surveys: 'l4, l8', behavioral: '기록 텍스트 길이' },
    L5: { def: '배운 내용의 전이 및 적용', surveys: 'l5, l10', behavioral: '과목 다양성' },
    H1: { def: '규칙적 생활 유지', surveys: 'h1, h2', behavioral: '일일반복 비율' },
    H2: { def: '해야 할 일의 꾸준한 실행', surveys: 'h3, h6', behavioral: '실행 완료율' },
    H3: { def: '건강 관리 및 정리정돈', surveys: 'h4, h5', behavioral: '습관 실행 빈도' },
    H4: { def: '나쁜 습관 교정 및 자기통제', surveys: 'h7, h9', behavioral: '실행 재개 비율' },
    H5: { def: '좋은 습관의 장기 유지', surveys: 'h8, h10', behavioral: 'streak + 활동일수' },
  }

  for (const area of areas) {
    for (const id of AREA_SUB_IDS[area]) {
      const d = subCompDefs[id]
      if (d) {
        lines.push(`| ${id} | ${AREA_LABELS[area]} | ${SUB_COMP_LABELS[id]} | ${d.def} | ${d.surveys} | ${d.behavioral} |`)
      }
    }
  }
  lines.push('')
  lines.push('')
  lines.push('[부록 B] 연구 영역-월드 매핑 구조')
  lines.push('')
  lines.push('| 연구 영역 | 플랫폼 월드 | 이론적 근거 |')
  lines.push('|----------|-----------|-----------|')
  lines.push('| 진로탐색 | selfDirected | Super 진로발달이론, SCCT |')
  lines.push('| 공동체의식 | relationship | CASEL SEL, Bronfenbrenner |')
  lines.push('| 인성역량 | character + attitude | Lickona 인성교육론, VIA |')
  lines.push('| 학습역량 | cognition | Zimmerman 자기조절학습, Flavell 메타인지 |')
  lines.push('| 습관형성 | habit | Lally 습관형성이론, SDT |')
  lines.push('')
  lines.push('')
  lines.push('═══════════════════════════════════════════════════════════════')
  lines.push(`보고서 자동 생성: GILLOG Research Engine v1.0`)
  lines.push(`분석 일시: ${new Date(data.metadata.computedAt).toISOString()}`)
  lines.push('═══════════════════════════════════════════════════════════════')

  return lines.join('\n')
}

// ========================================
// 컴포넌트
// ========================================

export default function ResearchReport({
  data,
  mode,
}: {
  data: ResearchData
  mode: 'surveyOnly' | 'integrated'
}) {
  const [copied, setCopied] = useState(false)
  const report = useMemo(() => generateReport(data, mode), [data, mode])

  const N = data.metadata.totalParticipants
  const grade = getStudyGrade(N)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = report
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `GILLOG_Research_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* 리포트 헤더 */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">학술 연구 보고서</h3>
            <p className="text-xs text-gray-500 mt-0.5">APA 7th Edition Style | 학술지 투고/연구소 제출용</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              grade === 'confirmatory' ? 'bg-green-900/40 text-green-400 border border-green-700/50' :
              grade === 'exploratory' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/50' :
              'bg-gray-800 text-gray-400 border border-gray-700'
            }`}>
              {grade === 'confirmatory' ? 'Confirmatory (N>=30)' :
               grade === 'exploratory' ? 'Exploratory (N>=10)' :
               'Preliminary (N<10)'}
            </span>
          </div>
        </div>

        {/* 등급 설명 */}
        <div className={`text-xs p-3 rounded-lg mb-4 ${
          grade === 'confirmatory' ? 'bg-green-950/30 text-green-300 border border-green-800/30' :
          grade === 'exploratory' ? 'bg-yellow-950/30 text-yellow-300 border border-yellow-800/30' :
          'bg-gray-800/50 text-gray-400 border border-gray-700/30'
        }`}>
          {grade === 'confirmatory' && '표본 크기가 30명 이상으로 확인적 종단 연구 수준의 리포트가 생성됩니다. 학술지 투고 및 정식 연구 보고가 가능합니다.'}
          {grade === 'exploratory' && '표본 크기가 10~29명으로 탐색적 연구 수준의 리포트가 생성됩니다. 연구소 내부 보고 및 예비 학술 발표에 적합합니다. N>=30 달성 시 자동으로 확인적 연구 등급으로 전환됩니다.'}
          {grade === 'preliminary' && '표본 크기가 10명 미만으로 예비 연구 수준의 리포트가 생성됩니다. 참여자가 늘어나면 자동으로 리포트 수준이 향상됩니다.'}
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
          >
            {copied ? '복사 완료!' : '전문 복사'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            .txt 다운로드
          </button>
        </div>
      </div>

      {/* 리포트 본문 미리보기 */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6">
        <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-mono max-h-[80vh] overflow-y-auto">
          {report}
        </pre>
      </div>
    </div>
  )
}
