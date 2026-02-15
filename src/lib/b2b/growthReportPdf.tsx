import React from 'react'
import {
  Document, Page, Text, View, StyleSheet, Svg, Polygon, Line, Circle, Font,
} from '@react-pdf/renderer'
import fs from 'fs'
import path from 'path'
import type { GrowthReportData } from './reportTypes'
import type { MetricKey } from './types'
import { METRIC_DEFINITIONS } from './isoMapping'
import {
  getGridPolygonPoints, getScorePolygonPoints,
  getLabelPositions, getAxisLines, METRIC_ORDER,
} from './radarSvgPath'

// --- 한글 폰트 등록 (로컬 TTF 파일) ---
let fontsRegistered = false
export function registerFonts() {
  if (fontsRegistered) return
  const fontDir = path.join(process.cwd(), 'public', 'fonts')
  Font.register({
    family: 'NotoSansKR',
    fonts: [
      { src: path.join(fontDir, 'NotoSansKR-Regular.ttf'), fontWeight: 400 },
      { src: path.join(fontDir, 'NotoSansKR-Bold.ttf'), fontWeight: 700 },
    ],
  })
  fontsRegistered = true
}

const colors = {
  primary: '#6366f1',     // indigo-500
  primaryLight: '#a5b4fc', // indigo-300
  violet: '#8b5cf6',
  bg: '#ffffff',
  text: '#1f2937',         // gray-800
  textLight: '#6b7280',    // gray-500
  textMuted: '#9ca3af',    // gray-400
  border: '#e5e7eb',       // gray-200
  cardBg: '#f9fafb',       // gray-50
  positive: '#6366f1',     // indigo for positive
  negative: '#64748b',     // slate for negative
}

const s = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansKR',
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.bg,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  headerTitle: { fontSize: 18, fontWeight: 700, color: colors.primary },
  headerSub: { fontSize: 9, color: colors.textLight },
  // Student info
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 12,
    backgroundColor: colors.cardBg,
    borderRadius: 6,
  },
  infoLabel: { fontSize: 8, color: colors.textMuted, marginBottom: 2 },
  infoValue: { fontSize: 11, fontWeight: 700 },
  // Overall score
  overallBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: colors.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  overallScore: { fontSize: 32, fontWeight: 700, color: colors.primary },
  overallLabel: { fontSize: 9, color: colors.textLight },
  overallDelta: { fontSize: 11, fontWeight: 700 },
  // Section
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.text,
    marginBottom: 10,
    marginTop: 16,
  },
  // Metric cards
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metricCard: {
    width: '48%',
    padding: 10,
    backgroundColor: colors.cardBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 4,
  },
  metricName: { fontSize: 9, fontWeight: 700, color: colors.text, marginBottom: 3 },
  metricScore: { fontSize: 18, fontWeight: 700, color: colors.primary },
  metricInsight: { fontSize: 8, color: colors.textLight, marginTop: 4, lineHeight: 1.4 },
  metricDelta: { fontSize: 9, fontWeight: 700, marginTop: 2 },
  // Comments
  commentBox: {
    marginBottom: 8,
    padding: 12,
    backgroundColor: colors.cardBg,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  commentLabel: { fontSize: 9, fontWeight: 700, color: colors.primary, marginBottom: 4 },
  commentText: { fontSize: 9, color: colors.text, lineHeight: 1.5 },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerText: { fontSize: 7, color: colors.textMuted },
  // Radar
  radarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
})

// --- Radar Chart (SVG 프리미티브) ---
function RadarChart({ data }: { data: GrowthReportData }) {
  const cx = 130, cy = 130, maxR = 100
  const gridLevels = [0.25, 0.5, 0.75, 1.0]
  const labels = getLabelPositions(cx, cy, maxR + 18)
  const axes = getAxisLines(cx, cy, maxR)
  const currentPoints = getScorePolygonPoints(data.currentScores, cx, cy, maxR)

  const LABEL_MAP: Record<MetricKey, string> = {
    initiative: '실행력', consistency: '일관성', reflectiveness: '성찰',
    adaptability: '적응력', collaboration: '협력', goalClarity: '목표',
    emotionalAware: '정서', growthMindset: '성장',
  }

  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      {/* 배경 격자 */}
      {gridLevels.map((level) => (
        <Polygon
          key={level}
          points={getGridPolygonPoints(cx, cy, maxR * level)}
          stroke={colors.border}
          strokeWidth={0.5}
          fill="none"
        />
      ))}
      {/* 축 라인 */}
      {axes.map((a, i) => (
        <Line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={colors.border} strokeWidth={0.5} />
      ))}
      {/* 이전 데이터 */}
      {data.previousScores && (
        <Polygon
          points={getScorePolygonPoints(data.previousScores, cx, cy, maxR)}
          fill="rgba(148,163,184,0.15)"
          stroke="#94a3b8"
          strokeWidth={1}
        />
      )}
      {/* 현재 데이터 */}
      <Polygon
        points={currentPoints}
        fill="rgba(99,102,241,0.2)"
        stroke={colors.primary}
        strokeWidth={1.5}
      />
      {/* 꼭짓점 점 */}
      {METRIC_ORDER.map((key, i) => {
        const ratio = (data.currentScores[key] || 0) / 100
        const angle = (2 * Math.PI * i) / 8 - Math.PI / 2
        const px = cx + maxR * ratio * Math.cos(angle)
        const py = cy + maxR * ratio * Math.sin(angle)
        return <Circle key={key} cx={px} cy={py} r={2.5} fill={colors.primary} />
      })}
      {/* 라벨 */}
      {labels.map(({ key, x, y }) => (
        <Text key={key} x={x} y={y}
          style={{ fontSize: 7, fill: colors.textLight, textAnchor: 'middle' }}
        >
          {LABEL_MAP[key]}
        </Text>
      ))}
    </Svg>
  )
}

// --- PDF Document ---
export function GrowthReportDocument({ data }: { data: GrowthReportData }) {
  const overallDelta = data.previousOverallScore !== null
    ? data.overallScore - data.previousOverallScore
    : null

  const dateStr = new Date(data.generatedAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* 헤더 */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>실행 DNA 성장 리포트</Text>
            <Text style={s.headerSub}>gillog Growth Report</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.headerSub}>{dateStr}</Text>
            <Text style={s.headerSub}>{data.institutionName}</Text>
          </View>
        </View>

        {/* 학생 정보 */}
        <View style={s.infoRow}>
          <View>
            <Text style={s.infoLabel}>이름</Text>
            <Text style={s.infoValue}>{data.studentName}</Text>
          </View>
          <View>
            <Text style={s.infoLabel}>실행 횟수</Text>
            <Text style={s.infoValue}>{data.executionCount.toLocaleString()}회</Text>
          </View>
          <View>
            <Text style={s.infoLabel}>분석 기준</Text>
            <Text style={s.infoValue}>실행 {data.milestone}회</Text>
          </View>
          <View>
            <Text style={s.infoLabel}>기관</Text>
            <Text style={s.infoValue}>{data.institutionName}</Text>
          </View>
        </View>

        {/* 종합 점수 */}
        <View style={s.overallBox}>
          <View style={{ marginRight: 16 }}>
            <Text style={s.overallLabel}>종합 실행 지수</Text>
            <Text style={s.overallScore}>{data.overallScore}</Text>
          </View>
          <View>
            <Text style={s.overallLabel}>/ 100점</Text>
            {overallDelta !== null && (
              <Text style={[s.overallDelta, {
                color: overallDelta > 0 ? colors.positive : overallDelta < 0 ? colors.negative : colors.textMuted,
              }]}>
                {overallDelta > 0 ? '▲' : overallDelta < 0 ? '▼' : '–'} {Math.abs(overallDelta)}점
              </Text>
            )}
          </View>
        </View>

        {/* 레이더 차트 */}
        <View style={s.radarContainer}>
          <RadarChart data={data} />
        </View>
      </Page>

      {/* 2페이지: 역량별 상세 분석 */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>역량별 상세 분석</Text>
        <View style={s.metricGrid}>
          {METRIC_DEFINITIONS.map((def) => {
            const current = data.currentScores[def.key]
            const prev = data.previousScores?.[def.key] ?? null
            const delta = prev !== null ? current - prev : null
            return (
              <View key={def.key} style={s.metricCard}>
                <Text style={s.metricName}>{def.label}</Text>
                <Text style={s.metricScore}>{current}</Text>
                {delta !== null && (
                  <Text style={[s.metricDelta, {
                    color: delta > 0 ? colors.positive : delta < 0 ? colors.negative : colors.textMuted,
                  }]}>
                    {delta > 0 ? '▲' : delta < 0 ? '▼' : '–'} {Math.abs(delta)}점
                  </Text>
                )}
                <Text style={s.metricInsight}>{data.insights[def.key] || ''}</Text>
              </View>
            )
          })}
        </View>
      </Page>

      {/* 3페이지: 담당자 코멘트 */}
      <Page size="A4" style={s.page}>
        <Text style={s.sectionTitle}>담당자 코멘트</Text>

        {data.comments.learning.trim() && (
          <View style={s.commentBox}>
            <Text style={s.commentLabel}>학습 영역</Text>
            <Text style={s.commentText}>{data.comments.learning}</Text>
          </View>
        )}

        {data.comments.relationship.trim() && (
          <View style={s.commentBox}>
            <Text style={s.commentLabel}>관계 영역</Text>
            <Text style={s.commentText}>{data.comments.relationship}</Text>
          </View>
        )}

        {data.comments.attitude.trim() && (
          <View style={s.commentBox}>
            <Text style={s.commentLabel}>태도 영역</Text>
            <Text style={s.commentText}>{data.comments.attitude}</Text>
          </View>
        )}

        {!data.comments.learning.trim() && !data.comments.relationship.trim() && !data.comments.attitude.trim() && (
          <View style={s.commentBox}>
            <Text style={s.commentText}>담당자 코멘트가 없습니다.</Text>
          </View>
        )}

        {/* 푸터 */}
        <View style={s.footer}>
          <Text style={s.footerText}>gillog - 실행 DNA 성장 리포트</Text>
          <Text style={s.footerText}>
            본 리포트는 ISO 30414 기반 8개 실행 역량 지표를 분석한 결과입니다.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
