import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { getCoachSubscription } from '@/lib/subscription'

export async function POST() {
  const coachAuth = await requireCoachAPI()
  if (!coachAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const subscription = await getCoachSubscription(coachAuth.coachEmail)

    if (!subscription.canUpgrade) {
      return NextResponse.json(
        { error: '이미 프리미엄 플랜을 사용 중입니다' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: '결제 시스템을 준비 중입니다. 곧 이용 가능합니다.',
      status: 'pending',
    })
  } catch (error) {
    console.error('[b2b/subscription/upgrade POST]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
