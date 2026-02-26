import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

// ========================================
// POST /api/coaching/sessions
// 코칭 대화 세션 + 메시지 일괄 저장
// ========================================

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { mode, messages } = await request.json() as {
      mode: string
      messages: { role: string; content: string }[]
    }

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages' }, { status: 400 })
    }

    const coachingSession = await prisma.coachingSession.create({
      data: {
        userId: session.user.id,
        mode: mode || 'text',
        messages: {
          create: messages.map((m, i) => ({
            role: m.role,
            content: m.content,
            order: i,
          })),
        },
      },
    })

    return NextResponse.json({ success: true, sessionId: coachingSession.id })
  } catch (error) {
    console.error('POST /api/coaching/sessions error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// ========================================
// GET /api/coaching/sessions
// 내 코칭 기록 목록 (최근 20개)
// ========================================

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sessions = await prisma.coachingSession.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
      include: {
        messages: {
          orderBy: { order: 'asc' },
          take: 4, // 미리보기용 (인사 + 유저 첫 메시지 확보)
          select: { role: true, content: true },
        },
        _count: { select: { messages: true } },
      },
    })

    return NextResponse.json({
      sessions: sessions.map(s => {
        // 첫 번째 유저 메시지를 주제로 사용
        const firstUserMsg = s.messages.find(m => m.role === 'user')
        return {
          id: s.id,
          mode: s.mode,
          createdAt: s.createdAt.toISOString(),
          messageCount: s._count.messages,
          preview: firstUserMsg?.content?.slice(0, 80) || '코칭 대화',
        }
      }),
    })
  } catch (error) {
    console.error('GET /api/coaching/sessions error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
