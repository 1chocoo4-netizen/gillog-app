import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

interface ExecutionRecord {
  id: string
}

/** GET: 현재 코치가 추가한 사용자만 조회 */
export async function GET() {
  const coachResult = await requireCoachAPI()
  if (!coachResult) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const consents = await prisma.dataConsent.findMany({
      where: {
        coachEmail: coachResult.coachEmail,
        status: { in: ['APPROVED', 'PENDING'] },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userData: {
              select: { history: true },
            },
            subscriptions: {
              where: {
                source: 'B2B_GRANT',
                status: 'ACTIVE',
                grantedByCoachEmail: coachResult.coachEmail,
                endDate: { gt: new Date() },
              },
              orderBy: { endDate: 'desc' },
              take: 1,
              select: { endDate: true },
            },
          },
        },
      },
      orderBy: { requestedAt: 'desc' },
    })

    const users = consents.map((c) => {
      const history = (c.user.userData?.history as unknown as ExecutionRecord[]) || []
      const activeSub = c.user.subscriptions?.[0]
      return {
        userId: c.user.id,
        name: c.user.name || '이름 없음',
        email: c.user.email,
        consentStatus: c.status,
        executionCount: Array.isArray(history) ? history.length : 0,
        premiumEndDate: activeSub ? activeSub.endDate.toISOString() : null,
      }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('GET /api/b2b/users error:', error)
    return NextResponse.json({ users: [] })
  }
}
