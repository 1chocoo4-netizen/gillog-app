import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { GrowthReportDocument } from '@/lib/b2b/growthReportPdf'
import type { GrowthReportData } from '@/lib/b2b/reportTypes'

export async function POST(request: Request) {
  const coachResult = await requireCoachAPI()
  if (!coachResult) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body: GrowthReportData = await request.json()

    // 필수 필드 검증
    if (!body.studentName || !body.currentScores || body.overallScore === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // PDF 생성
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(
      React.createElement(GrowthReportDocument, { data: body }) as any
    )

    // Base64로 변환하여 클라이언트에 반환
    const base64 = Buffer.from(pdfBuffer).toString('base64')

    return NextResponse.json({ pdf: base64 })
  } catch (error) {
    console.error('POST /api/b2b/growth-report error:', error)
    return NextResponse.json({ error: 'PDF 생성에 실패했습니다.' }, { status: 500 })
  }
}
