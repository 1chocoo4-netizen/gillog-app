import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/lesson/start - 레슨 세션 시작
export async function POST(request: NextRequest) {
  try {
    const { lessonNodeId, userId } = await request.json()

    if (!lessonNodeId || !userId) {
      return NextResponse.json(
        { error: 'lessonNodeId와 userId가 필요합니다' },
        { status: 400 }
      )
    }

    // 레슨 노드 조회
    const lessonNode = await prisma.lessonNode.findUnique({
      where: { id: lessonNodeId },
    })

    if (!lessonNode) {
      return NextResponse.json(
        { error: '레슨을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 월드 조회
    const world = await prisma.world.findUnique({
      where: { id: lessonNode.worldId },
    })

    // 코치 조회
    const coach = await prisma.coach.findUnique({
      where: { worldId: lessonNode.worldId },
    })

    if (!coach) {
      return NextResponse.json(
        { error: '코치를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 질문 조회
    const questions = await prisma.question.findMany({
      where: { worldId: lessonNode.worldId },
      orderBy: { order: 'asc' },
    })

    // 기존 진행 중인 세션 확인
    const existingSession = await prisma.lessonSession.findFirst({
      where: {
        userId,
        lessonNodeId,
        status: 'in_progress',
      },
    })

    if (existingSession) {
      return NextResponse.json({
        session: existingSession,
        lessonNode,
        world,
        coach,
        questions,
        isResumed: true,
      })
    }

    // 새 세션 생성
    const session = await prisma.lessonSession.create({
      data: {
        userId,
        worldId: lessonNode.worldId,
        coachId: coach.id,
        lessonNodeId,
        status: 'in_progress',
        xpEarned: 0,
      },
    })

    return NextResponse.json({
      session,
      lessonNode,
      world,
      coach,
      questions,
      isResumed: false,
    })
  } catch (error) {
    console.error('Lesson start error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
