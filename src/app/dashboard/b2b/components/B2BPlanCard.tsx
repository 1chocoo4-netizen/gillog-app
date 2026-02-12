'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { CoachSubscriptionInfo } from '@/lib/subscription'

interface B2BPlanCardProps {
  subscription: CoachSubscriptionInfo | null
}

export function B2BPlanCard({ subscription }: B2BPlanCardProps) {
  const [upgradeMsg, setUpgradeMsg] = useState('')
  const [upgrading, setUpgrading] = useState(false)

  if (!subscription) return null

  async function handleUpgrade() {
    setUpgrading(true)
    setUpgradeMsg('')
    try {
      const res = await fetch('/api/b2b/subscription/upgrade', { method: 'POST' })
      const data = await res.json()
      setUpgradeMsg(data.message || data.error || '알 수 없는 오류')
    } catch {
      setUpgradeMsg('네트워크 오류가 발생했습니다')
    } finally {
      setUpgrading(false)
    }
  }

  const { plan, trialDaysLeft, premiumExpiresAt, monthlyPrice } = subscription

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 sm:p-5 ${
        plan === 'free_trial'
          ? 'bg-emerald-500/5 border-emerald-500/20'
          : plan === 'premium'
            ? 'bg-violet-500/5 border-violet-500/20'
            : 'bg-orange-500/5 border-orange-500/20'
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          {/* 아이콘 */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            plan === 'free_trial'
              ? 'bg-emerald-500/20'
              : plan === 'premium'
                ? 'bg-violet-500/20'
                : 'bg-orange-500/20'
          }`}>
            {plan === 'free_trial' && (
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {plan === 'premium' && (
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )}
            {plan === 'expired' && (
              <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            )}
          </div>

          {/* 텍스트 */}
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                plan === 'free_trial'
                  ? 'text-emerald-300'
                  : plan === 'premium'
                    ? 'text-violet-300'
                    : 'text-orange-300'
              }`}>
                {plan === 'free_trial' && '무료체험'}
                {plan === 'premium' && '프리미엄'}
                {plan === 'expired' && '구독 만료'}
              </span>
              {plan === 'free_trial' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                  D-{trialDaysLeft}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {plan === 'free_trial' && `${trialDaysLeft}일 남음 · 체험 종료 후 프리미엄 전환 필요`}
              {plan === 'premium' && premiumExpiresAt && `만료일: ${new Date(premiumExpiresAt).toLocaleDateString('ko-KR')}`}
              {plan === 'premium' && !premiumExpiresAt && '프리미엄 활성 중'}
              {plan === 'expired' && '구독이 만료되었습니다. 프리미엄으로 업그레이드해주세요.'}
            </p>
          </div>
        </div>

        {/* CTA 버튼 */}
        {(plan === 'free_trial' || plan === 'expired') && (
          <button
            onClick={handleUpgrade}
            disabled={upgrading}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              plan === 'expired'
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 border border-violet-500/30'
            } disabled:opacity-50`}
          >
            {upgrading ? '처리 중...' : plan === 'expired' ? '결제하기' : '업그레이드'}
          </button>
        )}
      </div>

      {/* 업그레이드 메시지 */}
      {upgradeMsg && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-center text-indigo-300 bg-indigo-500/10 rounded-lg py-2 px-3"
        >
          {upgradeMsg}
        </motion.p>
      )}

      {/* 가격 정보 */}
      {plan !== 'premium' && (
        <div className="mt-3 pt-3 border-t border-gray-800/50">
          <p className="text-[11px] text-gray-500">
            프리미엄: 월 {monthlyPrice.toLocaleString()}원 · 등록 사용자 프리미엄 부여 + 실행 DNA 분석
          </p>
        </div>
      )}
    </motion.div>
  )
}
