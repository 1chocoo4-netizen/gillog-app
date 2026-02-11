import { NextResponse } from 'next/server'
import { DEMO_MILESTONE_DATA, DEMO_INSIGHTS, DEMO_SPARKLINE, DEMO_REGISTERED_USERS } from '@/lib/b2b/demoData'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const milestone = searchParams.get('milestone') || '500'

  const data = DEMO_MILESTONE_DATA[milestone] || DEMO_MILESTONE_DATA['5']

  return NextResponse.json({
    current: data.current,
    previous: data.previous,
    insights: DEMO_INSIGHTS,
    sparkline: DEMO_SPARKLINE,
    users: DEMO_REGISTERED_USERS,
    isDemo: true,
  })
}
