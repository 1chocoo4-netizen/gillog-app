import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/lesson/answer - 답변 제출
export async function POST(request: NextRequest) {
  try {
    const { sessionId, questionId, userId, answer } = await request.json()

    if (!sessionId || !questionId || !userId || answer === undefined) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다' },
        { status: 400 }
      )
    }

    // 세션 확인
    const session = await prisma.lessonSession.findUnique({
      where: { id: sessionId },
      select: { id: true, status: true },
    })

    if (!session || session.status !== 'in_progress') {
      return NextResponse.json(
        { error: '유효하지 않은 세션입니다' },
        { status: 400 }
      )
    }

    // 기존 답변 확인
    const existingAnswer = await prisma.answer.findFirst({
      where: { sessionId, questionId },
    })

    if (existingAnswer) {
      // 기존 답변 업데이트
      const updated = await prisma.answer.update({
        where: { id: existingAnswer.id },
        data: { rawText: String(answer) },
      })

      return NextResponse.json({ answer: updated, isUpdated: true })
    }

    // 새 답변 생성
    const newAnswer = await prisma.answer.create({
      data: {
        sessionId,
        questionId,
        userId,
        rawText: String(answer),
      },
    })

    return NextResponse.json({ answer: newAnswer, isUpdated: false })
  } catch (error) {
    console.error('Answer submit error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
