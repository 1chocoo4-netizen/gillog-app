import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

// ========================================
// POST /api/coaching/glory/complete
// 코칭 완료 후 실행 등록 (Quest 테이블 연동)
// ========================================

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { sessionId, actionTitle, category, targetDate } = await request.json() as {
      sessionId: string
      actionTitle: string
      category?: string
      targetDate?: string
    }

    if (!sessionId || !actionTitle?.trim()) {
      return NextResponse.json({ error: 'sessionId and actionTitle required' }, { status: 400 })
    }

    // 세션 확인
    const glorySession = await prisma.glorySession.findFirst({
      where: { id: sessionId, userId: session.user.id, status: 'completed' },
    })

    if (!glorySession) {
      return NextResponse.json({ error: 'Completed session not found' }, { status: 404 })
    }

    // Quest에 실행 등록
    const quest = await prisma.quest.create({
      data: {
        userId: session.user.id,
        title: actionTitle.trim(),
        description: `THE GLORY 코칭에서 도출한 실행 계획`,
        category: category || 'personal',
        xpReward: 20,
        status: 'pending',
        dueDate: targetDate ? new Date(targetDate) : null,
      },
    })

    // 세션에 realAction 업데이트 (아직 안 되어 있으면)
    if (!glorySession.realAction) {
      await prisma.glorySession.update({
        where: { id: sessionId },
        data: { realAction: actionTitle.trim() },
      })
    }

    return NextResponse.json({
      success: true,
      questId: quest.id,
    })
  } catch (error) {
    console.error('POST /api/coaching/glory/complete error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
