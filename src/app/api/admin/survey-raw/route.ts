import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { decryptData } from '@/lib/survey-crypto'
import { SURVEY_QUESTIONS } from '@/lib/surveyQuestions'

export async function GET() {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const responses = await prisma.surveyResponse.findMany({
      select: {
        userHash: true,
        milestone: true,
        encryptedData: true,
        careerScore: true,
        communityScore: true,
        nonCognitiveScore: true,
        totalScore: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    const questionIds = SURVEY_QUESTIONS.map((q) => q.id)

    const decryptedResponses = responses.map((r) => {
      const decrypted = decryptData(r.encryptedData) as {
        answers: Record<string, number>
        timestamp: string
      } | null

      return {
        userHash: r.userHash,
        milestone: r.milestone,
        careerScore: r.careerScore,
        communityScore: r.communityScore,
        nonCognitiveScore: r.nonCognitiveScore,
        totalScore: r.totalScore,
        createdAt: r.createdAt,
        answers: decrypted?.answers ?? null,
      }
    })

    return NextResponse.json({
      responses: decryptedResponses,
      questions: SURVEY_QUESTIONS.map((q) => ({
        id: q.id,
        text: q.text,
        areaKey: q.areaKey,
      })),
      questionIds,
      totalCount: decryptedResponses.length,
    })
  } catch (error) {
    console.error('GET /api/admin/survey-raw error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
