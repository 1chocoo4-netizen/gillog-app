import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

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

    if (!userData) {
      // UserData가 없으면 생성
      const newData = await prisma.userData.create({
        data: { userId: session.user.id },
      })
      return NextResponse.json(newData)
    }

    return NextResponse.json(userData)
  } catch (error) {
    console.error('GET /api/user-data error:', error)
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
