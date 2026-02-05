import { NextRequest, NextResponse } from 'next/server'
import { findFirst, run } from '@/lib/db'
import { randomBytes } from 'crypto'

function cuid() {
  return 'c' + randomBytes(12).toString('hex').slice(0, 24)
}

interface Answer {
  id: string
  sessionId: string
  questionId: string
  userId: string
  rawText: string
  createdAt: string
}

interface LessonSession {
  id: string
  status: string
}

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
    const session = findFirst<LessonSession>(`
      SELECT id, status FROM LessonSession WHERE id = ?
    `, [sessionId])

    if (!session || session.status !== 'in_progress') {
      return NextResponse.json(
        { error: '유효하지 않은 세션입니다' },
        { status: 400 }
      )
    }

    // 기존 답변 확인
    const existingAnswer = findFirst<Answer>(`
      SELECT * FROM Answer WHERE sessionId = ? AND questionId = ?
    `, [sessionId, questionId])

    if (existingAnswer) {
      // 기존 답변 업데이트
      run(`
        UPDATE Answer SET rawText = ? WHERE id = ?
      `, [String(answer), existingAnswer.id])

      const updated = findFirst<Answer>(`
        SELECT * FROM Answer WHERE id = ?
      `, [existingAnswer.id])

      return NextResponse.json({ answer: updated, isUpdated: true })
    }

    // 새 답변 생성
    const answerId = cuid()
    const now = new Date().toISOString()

    run(`
      INSERT INTO Answer (id, sessionId, questionId, userId, rawText, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [answerId, sessionId, questionId, userId, String(answer), now])

    const newAnswer = findFirst<Answer>(`
      SELECT * FROM Answer WHERE id = ?
    `, [answerId])

    return NextResponse.json({ answer: newAnswer, isUpdated: false })
  } catch (error) {
    console.error('Answer submit error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}
