import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth-config'
import { prisma } from '@/lib/db'

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || ''
const TOSS_API_URL = 'https://api.tosspayments.com/v1'

export async function GET(request: Request) {
  // 토스에서 리디렉트로 온 결제 승인 처리
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { searchParams } = new URL(request.url)
  const paymentKey = searchParams.get('paymentKey')
  const orderId = searchParams.get('orderId')
  const amount = searchParams.get('amount')

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.redirect(new URL('/subscription?error=missing_params', request.url))
  }

  try {
    // 토스 결제 승인
    const confirmRes = await fetch(`${TOSS_API_URL}/payments/confirm`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) }),
    })

    if (!confirmRes.ok) {
      const errorData = await confirmRes.json()
      console.error('Toss confirm error:', errorData)
      return NextResponse.redirect(new URL('/subscription?error=confirm_failed', request.url))
    }

    const paymentData = await confirmRes.json()

    // 빌링키 발급 (자동결제용)
    let billingKey = null
    let customerKey = null

    if (paymentData.method === '카드') {
      customerKey = `gillog-${session.user.id}`
      try {
        const billingRes = await fetch(`${TOSS_API_URL}/billing/authorizations/issue`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authKey: paymentKey,
            customerKey,
          }),
        })
        if (billingRes.ok) {
          const billingData = await billingRes.json()
          billingKey = billingData.billingKey
        }
      } catch (e) {
        console.error('Billing key issue error:', e)
      }
    }

    // 결제 기록 저장
    await prisma.paymentRecord.create({
      data: {
        userId: session.user.id,
        tossPaymentKey: paymentKey,
        amount: Number(amount),
        status: 'DONE',
        orderId,
        receiptUrl: paymentData.receipt?.url || null,
      },
    })

    // 구독 생성 (30일)
    const now = new Date()
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        source: 'TOSS_PAYMENT',
        startDate: now,
        endDate,
        tossBillingKey: billingKey,
        tossCustomerKey: customerKey,
      },
    })

    return NextResponse.redirect(new URL('/subscription?success=true', request.url))
  } catch (error) {
    console.error('Billing API error:', error)
    return NextResponse.redirect(new URL('/subscription?error=server_error', request.url))
  }
}
