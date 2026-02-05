'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Star, ArrowUp, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface RewardAnimationProps {
  isVisible: boolean
  xpEarned: number
  totalXp: number
  leveledUp: boolean
  newLevel: number
  worldColor?: string
  onComplete: () => void
}

export function RewardAnimation({
  isVisible,
  xpEarned,
  totalXp,
  leveledUp,
  newLevel,
  worldColor = 'var(--gl-primary)',
  onComplete
}: RewardAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-[var(--gl-bg-card)] rounded-3xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl"
          >
            {/* 축하 아이콘 */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: worldColor }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* 완료 메시지 */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-[var(--gl-text)] mb-2"
            >
              레슨 완료!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[var(--gl-text-muted)] mb-6"
            >
              오늘도 한 걸음 성장했어요
            </motion.p>

            {/* XP 획득 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-[var(--gl-accent)]/10 rounded-2xl p-4 mb-4"
            >
              <div className="flex items-center justify-center gap-2 text-[var(--gl-accent)]">
                <Zap className="w-6 h-6" />
                <span className="text-3xl font-bold">+{xpEarned} XP</span>
              </div>
              <p className="text-sm text-[var(--gl-text-muted)] mt-1">
                총 {totalXp} XP
              </p>
            </motion.div>

            {/* 레벨업 */}
            {leveledUp && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-[var(--gl-warning)]/10 rounded-2xl p-4 mb-4"
              >
                <div className="flex items-center justify-center gap-2 text-[var(--gl-warning)]">
                  <ArrowUp className="w-5 h-5" />
                  <span className="text-lg font-bold">레벨 업!</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-5 h-5 text-[var(--gl-warning)]" />
                  <span className="text-2xl font-bold text-[var(--gl-text)]">
                    Lv.{newLevel}
                  </span>
                </div>
              </motion.div>
            )}

            {/* 완료 버튼 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Button
                variant="primary"
                size="xl"
                fullWidth
                onClick={onComplete}
              >
                계속하기
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
