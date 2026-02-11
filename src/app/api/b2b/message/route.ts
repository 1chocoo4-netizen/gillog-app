import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

/** POST: 관리자가 사용자에게 메시지 전송 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { toUserId, fromName, message } = body

    if (!toUserId || !message) {
      return NextResponse.json({ error: 'toUserId and message are required' }, { status: 400 })
    }

    const dm = await prisma.directMessage.create({
      data: {
        toUserId,
        fromName: fromName || '담당자',
        message,
      },
    })

    return NextResponse.json({ message: dm })
  } catch (error) {
    console.error('POST /api/b2b/message error:', error)
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}

/** GET: 현재 로그인 사용자의 안 읽은 메시지 조회 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ messages: [] })
  }

  try {
    const messages = await prisma.directMessage.findMany({
      where: {
        toUserId: session.user.id,
        isRead: false,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('GET /api/b2b/message error:', error)
    return NextResponse.json({ messages: [] })
  }
}

/** PATCH: 메시지 읽음 처리 */
export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { messageId } = body

    if (!messageId) {
      return NextResponse.json({ error: 'messageId is required' }, { status: 400 })
    }

    const msg = await prisma.directMessage.findUnique({ where: { id: messageId } })
    if (!msg || msg.toUserId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.directMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PATCH /api/b2b/message error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
