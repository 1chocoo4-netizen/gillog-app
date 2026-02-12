import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { code } = await request.json()

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: '쿠폰 코드를 입력해주세요' }, { status: 400 })
  }

  // 쿠폰 조회
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() },
  })

  if (!coupon) {
    return NextResponse.json({ error: '존재하지 않는 쿠폰입니다' }, { status: 404 })
  }

  if (!coupon.isActive) {
    return NextResponse.json({ error: '비활성화된 쿠폰입니다' }, { status: 400 })
  }

  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return NextResponse.json({ error: '만료된 쿠폰입니다' }, { status: 400 })
  }

  if (coupon.currentUses >= coupon.maxUses) {
    return NextResponse.json({ error: '쿠폰 사용 한도에 도달했습니다' }, { status: 400 })
  }

  // 중복 사용 확인
  const existingRedemption = await prisma.couponRedemption.findUnique({
    where: { couponId_userId: { couponId: coupon.id, userId: session.user.id } },
  })

  if (existingRedemption) {
    return NextResponse.json({ error: '이미 사용한 쿠폰입니다' }, { status: 409 })
  }

  // 쿠폰 적용: Redemption 생성 + Coupon 사용 수 증가 + Subscription 생성
  const now = new Date()
  const endDate = new Date(now.getTime() + coupon.durationDays * 24 * 60 * 60 * 1000)

  const redemption = await prisma.couponRedemption.create({
    data: {
      couponId: coupon.id,
      userId: session.user.id,
    },
  })

  await prisma.coupon.update({
    where: { id: coupon.id },
    data: { currentUses: { increment: 1 } },
  })

  await prisma.subscription.create({
    data: {
      userId: session.user.id,
      source: 'COUPON',
      startDate: now,
      endDate,
      couponRedemptionId: redemption.id,
    },
  })

  return NextResponse.json({
    ok: true,
    message: `프리미엄이 ${coupon.durationDays}일간 활성화되었습니다!`,
    expiresAt: endDate.toISOString(),
  })
}
