import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/lesson/first - 첫 번째 잠금 해제된 레슨 노드 조회
export async function GET() {
  try {
    const lessonNode = await prisma.lessonNode.findFirst({
      where: { isLocked: false },
      orderBy: [
        { world: { order: 'asc' } },
        { order: 'asc' },
      ],
    })

    if (!lessonNode) {
      return NextResponse.json(
        { error: '사용 가능한 레슨이 없습니다' },
        { status: 404 }
      )
    }

    const world = await prisma.world.findUnique({
      where: { id: lessonNode.worldId },
    })

    const coach = await prisma.coach.findUnique({
      where: { worldId: lessonNode.worldId },
    })

    return NextResponse.json({
      lessonNode,
      world,
      coach,
    })
  } catch (error) {
    console.error('First lesson error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
