import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

// ========================================
// GET /api/coaching/sessions/[sessionId]
// 개별 세션 전체 대화 조회
// ========================================

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> },
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { sessionId } = await params

  try {
    const coachingSession = await prisma.coachingSession.findFirst({
      where: { id: sessionId, userId: session.user.id },
      include: {
        messages: {
          orderBy: { order: 'asc' },
          select: { role: true, content: true, order: true },
        },
      },
    })

    if (!coachingSession) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: coachingSession.id,
      mode: coachingSession.mode,
      createdAt: coachingSession.createdAt.toISOString(),
      messages: coachingSession.messages,
    })
  } catch (error) {
    console.error(`GET /api/coaching/sessions/${sessionId} error:`, error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
