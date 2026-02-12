import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

// GET: 현재 사용자의 약관 동의 상태 조회
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인 필요' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      termsAgreedAt: true,
      privacyAgreedAt: true,
      parentalConsentAt: true,
      createdAt: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: '사용자 없음' }, { status: 404 })
  }

  return NextResponse.json({
    termsAgreed: !!user.termsAgreedAt,
    privacyAgreed: !!user.privacyAgreedAt,
    parentalConsent: !!user.parentalConsentAt,
    parentalConsentAt: user.parentalConsentAt,
    createdAt: user.createdAt,
  })
}

// POST: 약관 동의 처리
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인 필요' }, { status: 401 })
  }

  const body = await req.json()
  const { type } = body as { type: 'terms' | 'parental' }

  if (type === 'terms') {
    // 서비스 이용약관 + 개인정보 수집·이용 동시 동의
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        termsAgreedAt: new Date(),
        privacyAgreedAt: new Date(),
      },
    })
    return NextResponse.json({ ok: true, type: 'terms' })
  }

  if (type === 'parental') {
    // 부모님(법정대리인) 동의
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        parentalConsentAt: new Date(),
      },
    })
    return NextResponse.json({ ok: true, type: 'parental' })
  }

  return NextResponse.json({ error: '잘못된 요청' }, { status: 400 })
}

// DELETE: 부모님 동의 철회
export async function DELETE() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인 필요' }, { status: 401 })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { parentalConsentAt: null },
  })

  return NextResponse.json({ ok: true })
}
