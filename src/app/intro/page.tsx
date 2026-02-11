'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { SplashScreen } from '@/components/intro/SplashScreen'
import { IntroCinematic } from '@/components/intro/IntroCinematic'

export default function IntroPage() {
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false)
  }, [])

  const handleFinish = () => {
    router.push('/login')
  }

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      </AnimatePresence>
      {!showSplash && <IntroCinematic onFinish={handleFinish} />}
    </>
  )
}
