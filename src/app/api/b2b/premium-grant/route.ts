import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { getCoachSubscription } from '@/lib/subscription'

export async function POST(request: Request) {
  const coachAuth = await requireCoachAPI()
  if (!coachAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 코치 구독 상태 확인 — 만료 시 차단
  const coachSub = await getCoachSubscription(coachAuth.coachEmail)
  if (coachSub.plan === 'expired') {
    return NextResponse.json(
      { error: '기관 구독이 만료되었습니다. 프리미엄 부여를 위해 구독을 갱신해주세요.' },
      { status: 403 }
    )
  }

  const { userId, months } = await request.json()

  if (!userId || !months || ![1, 3, 6, 12].includes(months)) {
    return NextResponse.json({ error: '유효하지 않은 요청입니다' }, { status: 400 })
  }

  // 사용자 동의 상태 확인 (APPROVED만 부여 가능)
  const consent = await prisma.dataConsent.findFirst({
    where: {
      userId,
      coachEmail: coachAuth.coachEmail,
      status: 'APPROVED',
    },
  })

  if (!consent) {
    return NextResponse.json({ error: '동의하지 않은 사용자입니다' }, { status: 403 })
  }

  const now = new Date()
  const endDate = new Date(now)
  endDate.setMonth(endDate.getMonth() + months)

  const subscription = await prisma.subscription.create({
    data: {
      userId,
      source: 'B2B_GRANT',
      startDate: now,
      endDate,
      grantedByCoachEmail: coachAuth.coachEmail,
    },
  })

  return NextResponse.json({
    ok: true,
    subscription: {
      id: subscription.id,
      endDate: subscription.endDate.toISOString(),
    },
    message: `${months}개월 프리미엄이 부여되었습니다`,
  })
}
