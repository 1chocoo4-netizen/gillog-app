import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventType, data } = body

    switch (eventType) {
      case 'PAYMENT_STATUS_CHANGED': {
        const { paymentKey, status } = data
        if (paymentKey) {
          await prisma.paymentRecord.updateMany({
            where: { tossPaymentKey: paymentKey },
            data: { status },
          })
        }
        break
      }

      case 'BILLING_STATUS_CHANGED': {
        // 빌링키 상태 변경 (만료, 해지 등)
        console.log('Billing status changed:', data)
        break
      }

      default:
        console.log('Unknown webhook event:', eventType)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
