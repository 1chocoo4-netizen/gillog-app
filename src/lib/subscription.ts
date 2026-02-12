import { prisma } from './db'

export type SubscriptionPlan = 'premium' | 'first_day' | 'free'

export interface SubscriptionInfo {
  plan: SubscriptionPlan
  dailyLimit: number
  source?: string
  expiresAt?: string // ISO string
}

/**
 * 사용자의 구독 상태를 판별한다.
 * 1. Subscription 테이블에서 ACTIVE & endDate > now → premium (5회/일)
 * 2. user.createdAt이 오늘(KST) → first_day (5회/일)
 * 3. 그 외 → free (1회/일)
 */
export async function getUserSubscription(userId: string): Promise<SubscriptionInfo> {
  const now = new Date()

  // 1. 활성 구독 확인 (ACTIVE 또는 CANCELLED(잔여기간), endDate가 가장 늦은 것 사용)
  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: { in: ['ACTIVE', 'CANCELLED'] },
      endDate: { gt: now },
    },
    orderBy: { endDate: 'desc' },
  })

  if (activeSubscription) {
    return {
      plan: 'premium',
      dailyLimit: 5,
      source: activeSubscription.source,
      expiresAt: activeSubscription.endDate.toISOString(),
    }
  }

  // 2. 첫날 사용자 확인 (KST 기준)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { createdAt: true },
  })

  if (user) {
    const kstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))
    const kstCreated = new Date(user.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }))

    const todayKST = new Date(kstNow.getFullYear(), kstNow.getMonth(), kstNow.getDate())
    const createdDateKST = new Date(kstCreated.getFullYear(), kstCreated.getMonth(), kstCreated.getDate())

    if (todayKST.getTime() === createdDateKST.getTime()) {
      return {
        plan: 'first_day',
        dailyLimit: 5,
      }
    }
  }

  // 3. 무료 사용자
  return {
    plan: 'free',
    dailyLimit: 1,
  }
}
