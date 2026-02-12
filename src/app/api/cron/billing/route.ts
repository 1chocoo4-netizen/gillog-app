import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || ''
const TOSS_API_URL = 'https://api.tosspayments.com/v1'
const CRON_SECRET = process.env.CRON_SECRET || ''

export async function GET(request: Request) {
  // Vercel Cron 인증
  const authHeader = request.headers.get('authorization')
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)

  // endDate가 도래한 ACTIVE TOSS_PAYMENT 구독 (빌링키 있는 것만)
  const subscriptions = await prisma.subscription.findMany({
    where: {
      source: 'TOSS_PAYMENT',
      status: 'ACTIVE',
      endDate: { lte: now },
      tossBillingKey: { not: null },
    },
  })

  const results = []

  for (const sub of subscriptions) {
    if (!sub.tossBillingKey || !sub.tossCustomerKey) continue

    try {
      const orderId = `gillog-renew-${sub.id}-${Date.now()}`

      const res = await fetch(`${TOSS_API_URL}/billing/${sub.tossBillingKey}`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerKey: sub.tossCustomerKey,
          amount: 7900,
          orderId,
          orderName: '길로그 프리미엄 월간 구독 갱신',
        }),
      })

      if (res.ok) {
        const paymentData = await res.json()

        // 결제 기록
        await prisma.paymentRecord.create({
          data: {
            userId: sub.userId,
            tossPaymentKey: paymentData.paymentKey,
            amount: 7900,
            status: 'DONE',
            orderId,
            receiptUrl: paymentData.receipt?.url || null,
          },
        })

        // 구독 갱신 (30일 연장)
        const newEndDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        await prisma.subscription.update({
          where: { id: sub.id },
          data: { endDate: newEndDate },
        })

        results.push({ subId: sub.id, status: 'renewed' })
      } else {
        // 결제 실패: 3일간 재시도 (endDate + 3일 이내면 재시도, 이후 EXPIRED)
        if (sub.endDate < threeDaysFromNow) {
          // 아직 재시도 기간 내
          results.push({ subId: sub.id, status: 'retry_pending' })
        } else {
          // 3일 초과: 만료 처리
          await prisma.subscription.update({
            where: { id: sub.id },
            data: { status: 'EXPIRED' },
          })
          results.push({ subId: sub.id, status: 'expired' })
        }
      }
    } catch (error) {
      console.error(`Billing error for sub ${sub.id}:`, error)
      results.push({ subId: sub.id, status: 'error' })
    }
  }

  return NextResponse.json({
    processed: subscriptions.length,
    results,
  })
}
