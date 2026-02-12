import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

const VALID_MONTHS = [1, 3, 6]

export async function POST(req: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { email, months } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    if (!VALID_MONTHS.includes(months)) {
      return NextResponse.json({ error: '유효하지 않은 기간입니다 (1, 3, 6개월)' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const now = new Date()
    let sub = await prisma.coachSubscription.findUnique({
      where: { coachEmail: normalizedEmail },
    })

    // 구독 레코드가 없으면 자동 생성
    if (!sub) {
      sub = await prisma.coachSubscription.create({
        data: {
          coachEmail: normalizedEmail,
          plan: 'FREE_TRIAL',
          trialStartDate: now,
          trialEndDate: now, // 즉시 만료 (프리미엄으로 전환할 것이므로)
        },
      })
    }

    // 이미 프리미엄이면 기존 만료일부터 연장, 아니면 지금부터
    const startFrom = sub.plan === 'PREMIUM' && sub.premiumEndDate && sub.premiumEndDate > now
      ? sub.premiumEndDate
      : now

    const endDate = new Date(startFrom.getTime() + months * 30 * 24 * 60 * 60 * 1000)

    await prisma.coachSubscription.update({
      where: { coachEmail: normalizedEmail },
      data: {
        plan: 'PREMIUM',
        premiumStartDate: sub.plan === 'PREMIUM' && sub.premiumStartDate ? sub.premiumStartDate : now,
        premiumEndDate: endDate,
      },
    })

    return NextResponse.json({
      ok: true,
      message: `${normalizedEmail}에 ${months}개월 프리미엄을 부여했습니다`,
      premiumEndDate: endDate.toISOString(),
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coaches/grant-premium POST]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
