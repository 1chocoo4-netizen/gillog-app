import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 활성 TOSS_PAYMENT 구독 찾기
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      source: 'TOSS_PAYMENT',
      status: 'ACTIVE',
      endDate: { gt: new Date() },
    },
    orderBy: { endDate: 'desc' },
  })

  if (!subscription) {
    return NextResponse.json({ error: '활성 구독이 없습니다' }, { status: 404 })
  }

  // 상태를 CANCELLED로 변경 (endDate까지 사용 가능, 자동갱신만 중단)
  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'CANCELLED',
      cancelledAt: new Date(),
    },
  })

  return NextResponse.json({
    ok: true,
    message: '구독이 해지되었습니다. 잔여 기간까지 이용 가능합니다.',
    endDate: subscription.endDate.toISOString(),
  })
}
