import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

// POST: 일일 감정 체크인 저장
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: '로그인 필요' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { mood, energy, note } = body

    // 유효성 검증
    if (typeof mood !== 'number' || mood < 1 || mood > 5) {
      return NextResponse.json({ error: 'mood는 1~5 사이 정수여야 합니다' }, { status: 400 })
    }
    if (typeof energy !== 'number' || energy < 1 || energy > 5) {
      return NextResponse.json({ error: 'energy는 1~5 사이 정수여야 합니다' }, { status: 400 })
    }

    const checkin = await prisma.checkin.create({
      data: {
        userId: session.user.id,
        mood: Math.round(mood),
        energy: Math.round(energy),
        note: typeof note === 'string' ? note.slice(0, 500) : null,
      },
    })

    return NextResponse.json({ id: checkin.id })
  } catch (error) {
    console.error('POST /api/checkin error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
