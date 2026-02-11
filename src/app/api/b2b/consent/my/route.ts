import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

/** GET: 현재 로그인 사용자의 PENDING 동의 요청 조회 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ consents: [] })
  }

  try {
    const consents = await prisma.dataConsent.findMany({
      where: {
        userId: session.user.id,
        status: 'PENDING',
      },
      orderBy: { requestedAt: 'desc' },
    })

    return NextResponse.json({ consents })
  } catch (error) {
    console.error('GET /api/b2b/consent/my error:', error)
    return NextResponse.json({ consents: [] })
  }
}
