import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coaches = await prisma.allowedCoach.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const subscriptions = await prisma.coachSubscription.findMany()
    const subMap = new Map(subscriptions.map(s => [s.coachEmail, s]))

    const coachesWithSub = coaches.map(c => {
      const sub = subMap.get(c.email)
      return {
        ...c,
        subscription: sub ? {
          plan: sub.plan,
          trialEndDate: sub.trialEndDate?.toISOString() || null,
          premiumStartDate: sub.premiumStartDate?.toISOString() || null,
          premiumEndDate: sub.premiumEndDate?.toISOString() || null,
        } : null,
      }
    })

    return NextResponse.json({ coaches: coachesWithSub })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coaches GET]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { email, name } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const existing = await prisma.allowedCoach.findUnique({
      where: { email: normalizedEmail },
    })

    if (existing) {
      return NextResponse.json({ error: '이미 등록된 이메일입니다' }, { status: 409 })
    }

    const now = new Date()
    const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    const [coach] = await prisma.$transaction([
      prisma.allowedCoach.create({
        data: {
          email: normalizedEmail,
          name: name?.trim() || null,
        },
      }),
      prisma.coachSubscription.create({
        data: {
          coachEmail: normalizedEmail,
          plan: 'FREE_TRIAL',
          trialStartDate: now,
          trialEndDate: trialEnd,
        },
      }),
    ])

    return NextResponse.json({ coach }, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coaches POST]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'email is required' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()

    await prisma.coachSubscription.delete({
      where: { coachEmail: normalizedEmail },
    }).catch(() => null)

    await prisma.allowedCoach.delete({
      where: { email: normalizedEmail },
    }).catch(() => null)

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coaches DELETE]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
