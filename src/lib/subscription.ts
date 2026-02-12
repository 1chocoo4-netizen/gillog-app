import { prisma } from './db'

// ========================================
// 개인 구독
// ========================================

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

// ========================================
// B2B 코치 구독
// ========================================

export type CoachPlanType = 'free_trial' | 'premium' | 'expired'

export interface CoachSubscriptionInfo {
  plan: CoachPlanType
  trialDaysLeft: number
  premiumExpiresAt: string | null
  canUpgrade: boolean
  monthlyPrice: number
}

/**
 * 코치(기관)의 구독 상태를 판별한다.
 * 1. premiumEndDate > now → premium
 * 2. trialEndDate > now → free_trial
 * 3. 그 외 → expired
 */
export async function getCoachSubscription(coachEmail: string): Promise<CoachSubscriptionInfo> {
  const now = new Date()

  const sub = await prisma.coachSubscription.findUnique({
    where: { coachEmail },
  })

  if (!sub) {
    return {
      plan: 'expired',
      trialDaysLeft: 0,
      premiumExpiresAt: null,
      canUpgrade: true,
      monthlyPrice: 99000,
    }
  }

  // 1. 프리미엄 활성 확인
  if (sub.premiumEndDate && sub.premiumEndDate > now) {
    return {
      plan: 'premium',
      trialDaysLeft: 0,
      premiumExpiresAt: sub.premiumEndDate.toISOString(),
      canUpgrade: false,
      monthlyPrice: sub.monthlyPrice,
    }
  }

  // 2. 무료체험 활성 확인
  if (sub.trialEndDate > now) {
    const diffMs = sub.trialEndDate.getTime() - now.getTime()
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    return {
      plan: 'free_trial',
      trialDaysLeft: daysLeft,
      premiumExpiresAt: null,
      canUpgrade: true,
      monthlyPrice: sub.monthlyPrice,
    }
  }

  // 3. 만료
  return {
    plan: 'expired',
    trialDaysLeft: 0,
    premiumExpiresAt: null,
    canUpgrade: true,
    monthlyPrice: sub.monthlyPrice,
  }
}
