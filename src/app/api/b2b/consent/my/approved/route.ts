import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

/** GET: 현재 로그인 사용자의 APPROVED 동의 목록 조회 */
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ consents: [] })
  }

  try {
    const consents = await prisma.dataConsent.findMany({
      where: {
        userId: session.user.id,
        status: 'APPROVED',
      },
      select: {
        id: true,
        institutionId: true,
      },
      orderBy: { respondedAt: 'desc' },
    })

    return NextResponse.json({ consents })
  } catch (error) {
    console.error('GET /api/b2b/consent/my/approved error:', error)
    return NextResponse.json({ consents: [] })
  }
}
