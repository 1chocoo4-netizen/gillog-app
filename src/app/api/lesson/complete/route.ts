import { NextRequest, NextResponse } from 'next/server'
import { db, findFirst, run } from '@/lib/db'
import { randomBytes } from 'crypto'

function cuid() {
  return 'c' + randomBytes(12).toString('hex').slice(0, 24)
}

interface LessonSession {
  id: string
  userId: string
  worldId: string
  lessonNodeId: string
  status: string
  xpEarned: number
}

interface LessonNode {
  id: string
  worldId: string
  order: number
  xpReward: number
}

interface World {
  id: string
  key: string
}

interface User {
  id: string
  xp: number
  level: number
}

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
    const session = findFirst<LessonSession>(`
      SELECT * FROM LessonSession WHERE id = ?
    `, [sessionId])

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
    const lessonNode = findFirst<LessonNode>(`
      SELECT * FROM LessonNode WHERE id = ?
    `, [session.lessonNodeId])

    if (!lessonNode) {
      return NextResponse.json(
        { error: '레슨 노드를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 월드 조회
    const world = findFirst<World>(`
      SELECT * FROM World WHERE id = ?
    `, [session.worldId])

    const xpReward = lessonNode.xpReward
    const now = new Date().toISOString()

    // 트랜잭션으로 처리
    const transaction = db.transaction(() => {
      // 세션 완료 처리
      run(`
        UPDATE LessonSession
        SET status = 'completed', finishedAt = ?, xpEarned = ?
        WHERE id = ?
      `, [now, xpReward, sessionId])

      // 사용자 XP 증가
      run(`
        UPDATE User SET xp = xp + ?, lastActiveAt = ? WHERE id = ?
      `, [xpReward, now, userId])

      // 보상 이벤트 기록
      const rewardId = cuid()
      run(`
        INSERT INTO RewardEvent (id, userId, type, value, metaJson, createdAt)
        VALUES (?, ?, 'xp', ?, ?, ?)
      `, [rewardId, userId, xpReward, JSON.stringify({
        source: 'lesson_complete',
        lessonNodeId: session.lessonNodeId,
        worldKey: world?.key
      }), now])

      // 다음 레슨 잠금 해제
      const nextLesson = findFirst<LessonNode>(`
        SELECT * FROM LessonNode
        WHERE worldId = ? AND "order" = ?
      `, [session.worldId, lessonNode.order + 1])

      if (nextLesson) {
        run(`
          UPDATE LessonNode SET isLocked = 0 WHERE id = ?
        `, [nextLesson.id])
      }

      return { nextLesson }
    })

    const result = transaction()

    // 업데이트된 사용자 정보
    const updatedUser = findFirst<User>(`
      SELECT * FROM User WHERE id = ?
    `, [userId])

    if (!updatedUser) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    // 레벨업 체크
    const levelUpXp = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500]
    let leveledUp = false
    let newLevel = updatedUser.level

    while (newLevel < levelUpXp.length - 1 && updatedUser.xp >= levelUpXp[newLevel]) {
      newLevel++
      leveledUp = true
    }

    if (leveledUp) {
      run(`UPDATE User SET level = ? WHERE id = ?`, [newLevel, userId])

      const levelRewardId = cuid()
      run(`
        INSERT INTO RewardEvent (id, userId, type, value, metaJson, createdAt)
        VALUES (?, ?, 'levelUp', ?, ?, ?)
      `, [levelRewardId, userId, newLevel, JSON.stringify({ previousLevel: updatedUser.level }), now])
    }

    return NextResponse.json({
      success: true,
      rewards: {
        xp: xpReward,
        totalXp: updatedUser.xp,
        leveledUp,
        newLevel: leveledUp ? newLevel : updatedUser.level,
        nextLessonUnlocked: !!result.nextLesson
      }
    })
  } catch (error) {
    console.error('Lesson complete error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
