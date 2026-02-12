import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { getCoachSubscription } from '@/lib/subscription'

export async function GET() {
  const coachAuth = await requireCoachAPI()
  if (!coachAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const subscription = await getCoachSubscription(coachAuth.coachEmail)
    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('[b2b/subscription GET]', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
