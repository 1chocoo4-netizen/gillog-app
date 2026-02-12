'use client'

import { useRouter } from 'next/navigation'

interface PaywallBannerProps {
  message?: string
}

export default function PaywallBanner({ message }: PaywallBannerProps) {
  const router = useRouter()

  return (
    <div className="mx-4 my-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white shadow-lg">
      <div className="mb-3 text-2xl">🔒</div>
      <h3 className="mb-2 text-lg font-bold">
        {message || '오늘의 무료 실행을 모두 사용했습니다'}
      </h3>
      <p className="mb-4 text-sm text-purple-100">
        프리미엄으로 업그레이드하면 매일 5회 실행, 무제한 코칭, 전체 교육 콘텐츠를 이용할 수 있습니다.
      </p>
      <ul className="mb-5 space-y-1.5 text-sm text-purple-100">
        <li>✓ 하루 5회 실행 (무료: 1회)</li>
        <li>✓ AI 코칭 무제한</li>
        <li>✓ 전체 교육 콘텐츠 잠금 해제</li>
      </ul>
      <button
        onClick={() => router.push('/subscription')}
        className="w-full rounded-xl bg-white py-3 text-center font-bold text-purple-700 transition-colors hover:bg-purple-50"
      >
        프리미엄 시작하기
      </button>
    </div>
  )
}
