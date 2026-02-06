'use client'

import { useRouter } from 'next/navigation'
import { IntroCinematic } from '@/components/intro/IntroCinematic'

export default function IntroPage() {
  const router = useRouter()

  const handleFinish = () => {
    // 인트로 완료 후 메인 화면으로 이동
    router.push('/app')
  }

  return <IntroCinematic onFinish={handleFinish} />
}
