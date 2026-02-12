import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'
import { getUserSubscription } from '@/lib/subscription'

// GET: 현재 사용자의 모든 데이터 반환
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userData = await prisma.userData.findUnique({
      where: { userId: session.user.id },
    })

    const subscriptionInfo = await getUserSubscription(session.user.id)

    if (!userData) {
      const newData = await prisma.userData.create({
        data: { userId: session.user.id },
      })
      return NextResponse.json({ ...newData, subscriptionInfo })
    }

    // 경과 시간 기반 에너지 자동 회복 (10분당 +1, 최대 100)
    const now = new Date()
    const elapsed = now.getTime() - new Date(userData.energyUpdatedAt).getTime()
    const recovered = Math.floor(elapsed / (10 * 60 * 1000))

    if (recovered > 0 && userData.energy < 100) {
      const newEnergy = Math.min(100, userData.energy + recovered)
      const updated = await prisma.userData.update({
        where: { userId: session.user.id },
        data: { energy: newEnergy, energyUpdatedAt: now },
      })
      return NextResponse.json({ ...updated, subscriptionInfo })
    }

    return NextResponse.json({ ...userData, subscriptionInfo })
  } catch (error) {
    console.error('GET /api/user-data error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE: 회원 탈퇴 (모든 데이터 영구 삭제)
export async function DELETE() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.user.delete({
      where: { id: session.user.id },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('DELETE /api/user-data error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PATCH: 변경된 데이터 업데이트
export async function PATCH(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // 허용된 필드만 업데이트
    const allowedFields = ['energy', 'levelData', 'executions', 'history', 'bucketList', 'monthlyGoals', 'surveyMilestones']
    const updateData: Record<string, unknown> = {}

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    // energy가 변경되면 energyUpdatedAt도 갱신
    if (updateData.energy !== undefined) {
      updateData.energyUpdatedAt = new Date()
    }

    const userData = await prisma.userData.upsert({
      where: { userId: session.user.id },
      update: updateData,
      create: {
        userId: session.user.id,
        ...updateData,
      },
    })

    return NextResponse.json(userData)
  } catch (error) {
    console.error('PATCH /api/user-data error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
