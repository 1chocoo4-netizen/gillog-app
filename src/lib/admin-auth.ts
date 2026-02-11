import { auth } from './auth-config'
import { prisma } from './db'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'RESEARCHER')) {
    redirect('/')
  }

  return session
}

export async function requireAdminAPI() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user || (user.role !== 'ADMIN' && user.role !== 'RESEARCHER')) {
    return null
  }

  return session
}

/** 코치 인증: AllowedCoach에 등록된 이메일인지 확인, 코치 이메일 반환 */
export async function requireCoachAPI() {
  const session = await auth()

  if (!session?.user?.email) {
    return null
  }

  const coach = await prisma.allowedCoach.findUnique({
    where: { email: session.user.email },
  })

  if (!coach) {
    return null
  }

  return { session, coachEmail: coach.email }
}
