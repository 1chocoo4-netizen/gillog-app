import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ allowed: false }, { status: 401 })
  }

  const coach = await prisma.allowedCoach.findUnique({
    where: { email: session.user.email },
  })

  return NextResponse.json({ allowed: !!coach })
}
