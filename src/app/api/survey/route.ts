import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { hashUserId, encryptData } from '@/lib/survey-crypto'
import { SURVEY_AREAS, SURVEY_QUESTIONS } from '@/lib/surveyQuestions'

// GET: 완료된 마일스톤 목록 반환
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.userData.findUnique({
      where: { userId: session.user.id },
      select: { surveyMilestones: true },
    })

    const milestones = (userData?.surveyMilestones as number[]) ?? []

    return NextResponse.json({ surveyMilestones: milestones })
  } catch (error) {
    console.error('GET /api/survey error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST: 설문 응답 저장
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { answers, milestone } = body as { answers: Record<string, number>; milestone: number }

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers' }, { status: 400 })
    }

    const VALID_MILESTONES = [5, 100, 500]
    if (!milestone || !VALID_MILESTONES.includes(milestone)) {
      return NextResponse.json({ error: 'Invalid milestone' }, { status: 400 })
    }

    // 모든 30문항 응답 확인
    if (Object.keys(answers).length !== SURVEY_QUESTIONS.length) {
      return NextResponse.json({ error: '모든 문항에 답해주세요' }, { status: 400 })
    }

    // 영역별 점수 계산
    const areaScores: Record<string, number> = {}
    for (const area of SURVEY_AREAS) {
      const areaQuestions = SURVEY_QUESTIONS.filter(q => q.areaKey === area.key)
      const sum = areaQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0)
      const maxScore = areaQuestions.length * 5 // 각 문항 최대 5점
      // 보정 공식: ((합계/최대점수)^1.12) * 100
      const normalized = sum / maxScore
      areaScores[area.key] = Math.round(Math.pow(normalized, 1.12) * 100 * 10) / 10
    }

    // 총점 계산
    const totalSum = Object.values(answers).reduce((a, b) => a + b, 0)
    const totalMax = SURVEY_QUESTIONS.length * 5 // 150
    const totalScore = Math.round(Math.pow(totalSum / totalMax, 1.12) * 100 * 10) / 10

    // userId 해시 + 원본 응답 암호화
    const userHash = hashUserId(session.user.id)
    const encryptedData = encryptData({ answers, timestamp: new Date().toISOString() })

    // 현재 마일스톤 배열 조회
    const userData = await prisma.userData.findUnique({
      where: { userId: session.user.id },
      select: { surveyMilestones: true },
    })
    const currentMilestones = (userData?.surveyMilestones as number[]) ?? []

    if (currentMilestones.includes(milestone)) {
      return NextResponse.json({ error: '이미 완료된 마일스톤입니다' }, { status: 400 })
    }

    const updatedMilestones = [...currentMilestones, milestone].sort((a, b) => a - b)

    // DB 저장 (트랜잭션)
    await prisma.$transaction([
      prisma.surveyResponse.create({
        data: {
          userHash,
          milestone,
          encryptedData,
          careerScore: areaScores['career'] ?? 0,
          communityScore: areaScores['community'] ?? 0,
          nonCognitiveScore: areaScores['nonCognitive'] ?? 0,
          totalScore,
        },
      }),
      prisma.userData.update({
        where: { userId: session.user.id },
        data: { surveyMilestones: updatedMilestones },
      }),
    ])

    return NextResponse.json({
      success: true,
      scores: {
        career: areaScores['career'],
        community: areaScores['community'],
        nonCognitive: areaScores['nonCognitive'],
        total: totalScore,
      },
    })
  } catch (error) {
    console.error('POST /api/survey error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
