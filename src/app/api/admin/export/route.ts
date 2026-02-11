import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { decryptData } from '@/lib/survey-crypto'
import { SURVEY_QUESTIONS } from '@/lib/surveyQuestions'

export async function GET(request: NextRequest) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const includeRaw = searchParams.get('raw') === 'true'

  try {
    const responses = await prisma.surveyResponse.findMany({
      select: {
        userHash: true,
        milestone: true,
        encryptedData: includeRaw,
        careerScore: true,
        communityScore: true,
        nonCognitiveScore: true,
        totalScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    const questionIds = SURVEY_QUESTIONS.map((q) => q.id)

    // CSV 헤더
    let header = 'userHash,milestone,careerScore,communityScore,nonCognitiveScore,totalScore,createdAt'
    if (includeRaw) {
      header += ',' + questionIds.join(',')
    }

    // CSV 행
    const rows = responses.map((r) => {
      const base = [
        r.userHash,
        r.milestone,
        r.careerScore,
        r.communityScore,
        r.nonCognitiveScore,
        r.totalScore,
        r.createdAt.toISOString(),
      ]

      if (includeRaw && 'encryptedData' in r) {
        const decrypted = decryptData(r.encryptedData as string) as {
          answers: Record<string, number>
        } | null
        const answers = decrypted?.answers ?? {}
        questionIds.forEach((qId) => {
          base.push(String(answers[qId] ?? ''))
        })
      }

      return base.join(',')
    })

    const csv = [header, ...rows].join('\n')
    const filename = includeRaw
      ? `gillog-survey-full-${new Date().toISOString().split('T')[0]}.csv`
      : `gillog-survey-export-${new Date().toISOString().split('T')[0]}.csv`

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('GET /api/admin/export error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
