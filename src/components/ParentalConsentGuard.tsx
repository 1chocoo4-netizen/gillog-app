'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { ParentalConsentModal } from '@/components/ParentalConsentModal'

/**
 * 하루 무료 체험 후 부모님 동의를 받지 않은 사용자에게
 * 자동으로 부모님 동의 모달을 표시하는 가드 컴포넌트
 */
export function ParentalConsentGuard() {
  const { data: session } = useSession()
  const [show, setShow] = useState(false)

  const checkParental = useCallback(async () => {
    try {
      const res = await fetch('/api/consent')
      if (!res.ok) return
      const data = await res.json()

      // 이미 부모님 동의 완료
      if (data.parentalConsent) return

      // 약관 동의를 아직 안 한 경우 (TermsConsentModal이 먼저 처리)
      if (!data.termsAgreed) return

      // 가입일로부터 1일 경과 확인
      const created = new Date(data.createdAt)
      const now = new Date()
      const hoursSinceCreated = (now.getTime() - created.getTime()) / (1000 * 60 * 60)

      if (hoursSinceCreated >= 24) {
        setShow(true)
      }
    } catch {
      // 무시
    }
  }, [])

  useEffect(() => {
    if (!session?.user) return
    // 세션에서 이미 동의 완료면 스킵
    if (session.user.parentalConsent) return
    checkParental()
  }, [session?.user, checkParental])

  return (
    <ParentalConsentModal
      isOpen={show}
      onClose={() => setShow(false)}
      onComplete={() => setShow(false)}
    />
  )
}
