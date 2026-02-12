'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Crown, Zap, BookOpen, MessageCircle } from 'lucide-react'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import SubscriptionBadge from '@/components/SubscriptionBadge'
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'

const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''

const BENEFITS = [
  { icon: <Zap className="w-5 h-5" />, title: '하루 5회 실행', desc: '무료 1회 → 5회로 확장' },
  { icon: <MessageCircle className="w-5 h-5" />, title: 'AI 코칭 무제한', desc: '무제한 코칭 대화' },
  { icon: <BookOpen className="w-5 h-5" />, title: '전체 교육 콘텐츠', desc: '모든 레슨 잠금 해제' },
]

function SubscriptionContent() {
  const router = useRouter()
  const { subscriptionInfo, refreshSubscription } = useUserData()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const paymentWidgetRef = useRef<Awaited<ReturnType<Awaited<ReturnType<typeof loadTossPayments>>['widgets']>> | null>(null)
  const [widgetReady, setWidgetReady] = useState(false)

  useEffect(() => {
    if (!CLIENT_KEY || subscriptionInfo.plan === 'premium') return

    async function initWidget() {
      try {
        const tossPayments = await loadTossPayments(CLIENT_KEY)
        const widgets = tossPayments.widgets({ customerKey: `gillog-${Date.now()}` })
        paymentWidgetRef.current = widgets

        await widgets.setAmount({ currency: 'KRW', value: 9900 })

        await Promise.all([
          widgets.renderPaymentMethods({
            selector: '#payment-method',
            variantKey: 'DEFAULT',
          }),
          widgets.renderAgreement({
            selector: '#payment-agreement',
            variantKey: 'AGREEMENT',
          }),
        ])

        setWidgetReady(true)
      } catch (err) {
        console.error('Payment widget init error:', err)
        setError('결제 위젯을 로드할 수 없습니다')
      }
    }

    initWidget()
  }, [subscriptionInfo.plan])

  async function handlePayment() {
    if (!paymentWidgetRef.current) return
    setLoading(true)
    setError('')

    try {
      const orderId = `gillog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      await paymentWidgetRef.current.requestPayment({
        orderId,
        orderName: '길로그 프리미엄 월간 구독',
        successUrl: `${window.location.origin}/api/payments/billing?orderId=${orderId}`,
        failUrl: `${window.location.origin}/subscription?error=payment_failed`,
      })
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'USER_CANCEL') {
        setError('결제 중 오류가 발생했습니다')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    if (!confirm('정말 구독을 해지하시겠습니까? 잔여 기간까지는 계속 사용 가능합니다.')) return
    setCancelling(true)
    try {
      const res = await fetch('/api/payments/cancel', { method: 'POST' })
      if (res.ok) {
        await refreshSubscription()
      } else {
        const data = await res.json()
        setError(data.error || '해지 실패')
      }
    } catch {
      setError('네트워크 오류')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </button>
          <h1 className="text-white font-semibold">프리미엄</h1>
          <SubscriptionBadge info={subscriptionInfo} />
        </div>
      </header>

      <div className="pt-20 pb-12 px-4 max-w-lg mx-auto">
        {/* 프리미엄 혜택 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold">길로그 프리미엄</h2>
          </div>

          <div className="space-y-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 text-purple-200">{b.icon}</div>
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="text-sm text-purple-200">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 현재 프리미엄 상태 */}
        {subscriptionInfo.plan === 'premium' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">프리미엄 활성 중</h3>
            </div>
            {subscriptionInfo.expiresAt && (
              <p className="text-white/60 text-sm mb-4">
                만료일: {new Date(subscriptionInfo.expiresAt).toLocaleDateString('ko-KR')}
              </p>
            )}
            {subscriptionInfo.source === 'TOSS_PAYMENT' && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/20 disabled:opacity-50"
              >
                {cancelling ? '처리 중...' : '구독 해지 (잔여 기간 유지)'}
              </button>
            )}
            {subscriptionInfo.source && subscriptionInfo.source !== 'TOSS_PAYMENT' && (
              <p className="text-white/40 text-xs">
                {subscriptionInfo.source === 'B2B_GRANT' ? '기관에서 부여한 프리미엄' : '쿠폰으로 활성화된 프리미엄'}
              </p>
            )}
          </motion.div>
        ) : (
          <>
            {/* 가격 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6"
            >
              <div className="text-white/50 text-sm">월간 구독</div>
              <div className="text-3xl font-bold text-white mt-1">
                9,900<span className="text-lg text-white/60">원/월</span>
              </div>
            </motion.div>

            {/* 결제 위젯 */}
            <div className="space-y-4">
              <div id="payment-method" className="rounded-xl overflow-hidden" />
              <div id="payment-agreement" className="rounded-xl overflow-hidden" />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center mt-4">{error}</p>
            )}

            {/* 결제 버튼 */}
            <button
              onClick={handlePayment}
              disabled={loading || !widgetReady}
              className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
            >
              {loading ? '결제 진행 중...' : '월 9,900원으로 시작하기'}
            </button>
          </>
        )}
      </div>
    </main>
  )
}

export default function SubscriptionPage() {
  return (
    <AuthGuard>
      <SubscriptionContent />
    </AuthGuard>
  )
}
