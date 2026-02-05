import { NextRequest, NextResponse } from 'next/server'
import { findFirst, findMany, run } from '@/lib/db'
import { randomBytes } from 'crypto'

function cuid() {
  return 'c' + randomBytes(12).toString('hex').slice(0, 24)
}

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
}

interface Coach {
  id: string
  worldId: string
  name: string
  tagline: string
  avatarSeed: string
}

interface Question {
  id: string
  worldId: string
  coachId: string
  prompt: string
  type: string
  optionsJson: string | null
  order: number
}

interface LessonSession {
  id: string
  userId: string
  worldId: string
  coachId: string
  lessonNodeId: string
  status: string
  startedAt: string
  finishedAt: string | null
  xpEarned: number
}

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
    const lessonNode = findFirst<LessonNode>(`
      SELECT * FROM LessonNode WHERE id = ?
    `, [lessonNodeId])

    if (!lessonNode) {
      return NextResponse.json(
        { error: '레슨을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 월드 조회
    const world = findFirst<World>(`
      SELECT * FROM World WHERE id = ?
    `, [lessonNode.worldId])

    // 코치 조회
    const coach = findFirst<Coach>(`
      SELECT * FROM Coach WHERE worldId = ?
    `, [lessonNode.worldId])

    if (!coach) {
      return NextResponse.json(
        { error: '코치를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 질문 조회
    const questions = findMany<Question>(`
      SELECT * FROM Question WHERE worldId = ? ORDER BY "order" ASC
    `, [lessonNode.worldId])

    // 기존 진행 중인 세션 확인
    const existingSession = findFirst<LessonSession>(`
      SELECT * FROM LessonSession
      WHERE userId = ? AND lessonNodeId = ? AND status = 'in_progress'
    `, [userId, lessonNodeId])

    if (existingSession) {
      return NextResponse.json({
        session: existingSession,
        lessonNode: { ...lessonNode, isLocked: lessonNode.isLocked === 1 },
        world,
        coach,
        questions,
        isResumed: true
      })
    }

    // 새 세션 생성
    const sessionId = cuid()
    const now = new Date().toISOString()

    run(`
      INSERT INTO LessonSession (id, userId, worldId, coachId, lessonNodeId, status, startedAt, xpEarned)
      VALUES (?, ?, ?, ?, ?, 'in_progress', ?, 0)
    `, [sessionId, userId, lessonNode.worldId, coach.id, lessonNodeId, now])

    const session = findFirst<LessonSession>(`
      SELECT * FROM LessonSession WHERE id = ?
    `, [sessionId])

    return NextResponse.json({
      session,
      lessonNode: { ...lessonNode, isLocked: lessonNode.isLocked === 1 },
      world,
      coach,
      questions,
      isResumed: false
    })
  } catch (error) {
    console.error('Lesson start error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
