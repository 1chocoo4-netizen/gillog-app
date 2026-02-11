import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
  const coachResult = await requireCoachAPI()
  if (!coachResult) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // 동의 상태 조회 (현재 코치가 요청한 것만)
    const consent = await prisma.dataConsent.findFirst({
      where: { userId: user.id, coachEmail: coachResult.coachEmail },
      orderBy: { requestedAt: 'desc' },
    })

    return NextResponse.json({
      user: {
        userId: user.id,
        name: user.name || '이름 없음',
        email: user.email,
        consentStatus: consent?.status || 'none',
      },
    })
  } catch (error) {
    console.error('GET /api/b2b/consent/search error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
