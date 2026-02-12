import { NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

// GET: 쿠폰 목록 조회
export async function GET() {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        redemptions: {
          select: { userId: true, redeemedAt: true },
        },
      },
    })

    return NextResponse.json(coupons)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coupons GET]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST: 쿠폰 생성
export async function POST(request: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { code, description, durationDays, maxUses, expiresAt } = body

    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: '쿠폰 코드를 입력해주세요' }, { status: 400 })
    }

    // 중복 코드 확인
    const existing = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } })
    if (existing) {
      return NextResponse.json({ error: '이미 존재하는 쿠폰 코드입니다' }, { status: 409 })
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        description: description || null,
        durationDays: durationDays || 30,
        maxUses: maxUses || 100,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    return NextResponse.json(coupon, { status: 201 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coupons POST]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PATCH: 쿠폰 수정/비활성화
export async function PATCH(request: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, isActive, description, maxUses, expiresAt } = body

    if (!id) {
      return NextResponse.json({ error: '쿠폰 ID가 필요합니다' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (description !== undefined) updateData.description = description
    if (maxUses !== undefined) updateData.maxUses = maxUses
    if (expiresAt !== undefined) updateData.expiresAt = expiresAt ? new Date(expiresAt) : null

    const coupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(coupon)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coupons PATCH]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE: 쿠폰 삭제
export async function DELETE(request: Request) {
  try {
    const session = await requireAdminAPI()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: '쿠폰 ID가 필요합니다' }, { status: 400 })
    }

    await prisma.coupon.delete({ where: { id } })

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[admin/coupons DELETE]', message, err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
