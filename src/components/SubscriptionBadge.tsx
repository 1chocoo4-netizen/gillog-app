'use client'

import type { SubscriptionInfo } from '@/lib/UserDataProvider'

interface SubscriptionBadgeProps {
  info: SubscriptionInfo
}

export default function SubscriptionBadge({ info }: SubscriptionBadgeProps) {
  if (info.plan === 'premium') {
    const daysLeft = info.expiresAt
      ? (() => {
          // KST(UTC+9) 자정 기준으로 남은 일수 계산
          const KST_OFFSET = 9 * 60 * 60 * 1000
          const now = new Date(Date.now() + KST_OFFSET)
          const end = new Date(new Date(info.expiresAt).getTime() + KST_OFFSET)
          const todayKST = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
          const endKST = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())
          return Math.max(0, Math.round((endKST - todayKST) / (1000 * 60 * 60 * 24)))
        })()
      : null

    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
        프리미엄 ✓ {daysLeft !== null && `D-${daysLeft}`}
      </span>
    )
  }

  if (info.plan === 'first_day') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        첫날 무료 체험
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
      무료 플랜
    </span>
  )
}
