import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import { auth } from '@/lib/auth-config'

/** GET: 동의 상태 조회 */
export async function GET(request: Request) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  try {
    const consents = await prisma.dataConsent.findMany({
      where: { userId },
      orderBy: { requestedAt: 'desc' },
    })

    return NextResponse.json({ consents })
  } catch (error) {
    console.error('GET /api/b2b/consent error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/** POST: 동의 요청 생성 — 코치 이메일 자동 저장 */
export async function POST(request: Request) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const coachEmail = session.user?.email || null

  try {
    const body = await request.json()
    const { userId, institutionId } = body

    if (!userId || !institutionId) {
      return NextResponse.json(
        { error: 'userId and institutionId are required' },
        { status: 400 }
      )
    }

    const consent = await prisma.dataConsent.upsert({
      where: {
        userId_institutionId: { userId, institutionId },
      },
      update: {
        status: 'PENDING',
        requestedAt: new Date(),
        respondedAt: null,
        coachEmail,
      },
      create: {
        userId,
        institutionId,
        coachEmail,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ consent })
  } catch (error) {
    console.error('POST /api/b2b/consent error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

/** PATCH: 동의 상태 변경 (본인만 가능) */
export async function PATCH(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { consentId, status } = body

    if (!consentId || !['APPROVED', 'DENIED', 'REVOKED'].includes(status)) {
      return NextResponse.json(
        { error: 'consentId and valid status are required' },
        { status: 400 }
      )
    }

    // 본인의 동의만 변경 가능
    const consent = await prisma.dataConsent.findUnique({
      where: { id: consentId },
    })

    if (!consent || consent.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.dataConsent.update({
      where: { id: consentId },
      data: {
        status,
        respondedAt: new Date(),
      },
    })

    return NextResponse.json({ consent: updated })
  } catch (error) {
    console.error('PATCH /api/b2b/consent error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
