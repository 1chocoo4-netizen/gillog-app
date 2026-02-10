import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/lesson/complete - 레슨 완료
export async function POST(request: NextRequest) {
  try {
    const { sessionId, userId } = await request.json()

    if (!sessionId || !userId) {
      return NextResponse.json(
        { error: 'sessionId와 userId가 필요합니다' },
        { status: 400 }
      )
    }

    // 세션 조회
    const session = await prisma.lessonSession.findUnique({
      where: { id: sessionId },
    })

    if (!session) {
      return NextResponse.json(
        { error: '세션을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    if (session.status === 'completed') {
      return NextResponse.json(
        { error: '이미 완료된 세션입니다' },
        { status: 400 }
      )
    }

    // 레슨 노드 조회
    const lessonNode = await prisma.lessonNode.findUnique({
      where: { id: session.lessonNodeId },
    })

    if (!lessonNode) {
      return NextResponse.json(
        { error: '레슨 노드를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 월드 조회
    const world = await prisma.world.findUnique({
      where: { id: session.worldId },
    })

    const xpReward = lessonNode.xpReward
    const now = new Date()

    // 트랜잭션으로 처리
    const result = await prisma.$transaction(async (tx) => {
      // 세션 완료 처리
      await tx.lessonSession.update({
        where: { id: sessionId },
        data: {
          status: 'completed',
          finishedAt: now,
          xpEarned: xpReward,
        },
      })

      // 보상 이벤트 기록
      await tx.rewardEvent.create({
        data: {
          userId,
          type: 'xp',
          value: xpReward,
          metaJson: JSON.stringify({
            source: 'lesson_complete',
            lessonNodeId: session.lessonNodeId,
            worldKey: world?.key,
          }),
        },
      })

      // 다음 레슨 잠금 해제
      const nextLesson = await tx.lessonNode.findUnique({
        where: {
          worldId_order: {
            worldId: session.worldId,
            order: lessonNode.order + 1,
          },
        },
      })

      if (nextLesson) {
        await tx.lessonNode.update({
          where: { id: nextLesson.id },
          data: { isLocked: false },
        })
      }

      return { nextLessonUnlocked: !!nextLesson }
    })

    return NextResponse.json({
      success: true,
      rewards: {
        xp: xpReward,
        nextLessonUnlocked: result.nextLessonUnlocked,
      },
    })
  } catch (error) {
    console.error('Lesson complete error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
