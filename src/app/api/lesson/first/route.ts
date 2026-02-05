import { NextResponse } from 'next/server'
import { db, findFirst, findMany } from '@/lib/db'

interface LessonNode {
  id: string
  worldId: string
  order: number
  title: string
  subtitle: string | null
  isLocked: number
  xpReward: number
}

interface World {
  id: string
  key: string
  title: string
  subtitle: string
  description: string
  colorHex: string
  icon: string
  order: number
}

interface Coach {
  id: string
  worldId: string
  name: string
  tagline: string
  avatarSeed: string
}

// GET /api/lesson/first - 첫 번째 잠금 해제된 레슨 노드 조회
export async function GET() {
  try {
    // 첫 번째 잠금 해제된 레슨 찾기
    const lessonNode = findFirst<LessonNode>(`
      SELECT ln.* FROM LessonNode ln
      JOIN World w ON ln.worldId = w.id
      WHERE ln.isLocked = 0
      ORDER BY w."order" ASC, ln."order" ASC
      LIMIT 1
    `)

    if (!lessonNode) {
      return NextResponse.json(
        { error: '사용 가능한 레슨이 없습니다' },
        { status: 404 }
      )
    }

    // 월드 정보 조회
    const world = findFirst<World>(`
      SELECT * FROM World WHERE id = ?
    `, [lessonNode.worldId])

    // 코치 정보 조회
    const coach = findFirst<Coach>(`
      SELECT * FROM Coach WHERE worldId = ?
    `, [lessonNode.worldId])

    return NextResponse.json({
      lessonNode: {
        ...lessonNode,
        isLocked: lessonNode.isLocked === 1
      },
      world,
      coach
    })
  } catch (error) {
    console.error('First lesson error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
