'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { IntroCinematic } from '@/components/intro/IntroCinematic'

export default function IntroPage() {
  const router = useRouter()
  const [showAd, setShowAd] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (!showAd) return
    if (countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [showAd, countdown])

  const handleFinish = () => {
    setShowAd(true)
  }

  const handleCloseAd = () => {
    setShowAd(false)
    router.push('/login')
  }

  return (
    <>
      <IntroCinematic onFinish={handleFinish} />

      <AnimatePresence>
        {showAd && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={countdown <= 0 ? handleCloseAd : undefined}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* 스킵/닫기 버튼 */}
              <button
                onClick={handleCloseAd}
                className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm font-medium border border-white/20 active:scale-95 transition-transform"
              >
                {countdown > 0 ? (
                  <span className="text-white/70">{countdown}초 후 닫기</span>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span>닫기</span>
                  </>
                )}
              </button>

              {/* 광고 이미지 */}
              <Image
                src="/popup1.png.png"
                alt="광고"
                width={400}
                height={600}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
