'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { ArrowLeft, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { TIERS, TierKey, makeStageId, STAGE_CONTENT, getCompletedStages } from '@/lib/teaching/lessonData'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import { BottomTabBar } from '@/components/BottomTabBar'

function StageMapContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as WorldKey
  const chapterKey = params.id as string

  const worldConfig = WORLD_CONFIGS[worldKey]
  const chapter = worldConfig?.chapters.find(c => c.key === chapterKey)

  const { energy, addEnergy } = useUserData()
  const [completedStages, setCompletedStages] = useState<string[]>([])
  const [showEnergyAlert, setShowEnergyAlert] = useState(false)
  const [unlockTarget, setUnlockTarget] = useState<{ tierKey: TierKey; stageNumber: number } | null>(null)

  useEffect(() => {
    setCompletedStages(getCompletedStages())
  }, [])

  if (!worldConfig || !chapter) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">챕터를 찾을 수 없습니다</div>
  }

  const getStageStatus = (tierKey: TierKey, stageNumber: number): 'locked' | 'current' | 'completed' => {
    const stageId = makeStageId(chapterKey, tierKey, stageNumber)

    // 이미 완료한 스테이지
    if (completedStages.includes(stageId)) return 'completed'

    // 콘텐츠가 있는지 확인
    const hasContent = !!STAGE_CONTENT[stageId]

    // 첫 번째 스테이지는 항상 열림
    if (stageNumber === 1 && hasContent) return 'current'

    // 이전 스테이지가 완료되었으면 현재 스테이지 열림
    if (stageNumber > 1) {
      const prevStageId = makeStageId(chapterKey, tierKey, stageNumber - 1)
      if (completedStages.includes(prevStageId) && hasContent) return 'current'
    }

    return 'locked'
  }

  const isTierUnlocked = (tierKey: TierKey): boolean => {
    if (tierKey === 'bronze') return true

    // 이전 티어의 모든 10단계가 완료되었는지 확인
    const tierIndex = TIERS.findIndex(t => t.key === tierKey)
    if (tierIndex <= 0) return true
    const prevTier = TIERS[tierIndex - 1]
    for (let i = 1; i <= prevTier.stageCount; i++) {
      const prevStageId = makeStageId(chapterKey, prevTier.key, i)
      if (!completedStages.includes(prevStageId)) return false
    }
    return true
  }

  // 티어별 완료 수 계산
  const getTierCompletedCount = (tierKey: TierKey): number => {
    let count = 0
    for (let i = 1; i <= 10; i++) {
      const stageId = makeStageId(chapterKey, tierKey, i)
      if (completedStages.includes(stageId)) count++
    }
    return count
  }

  const handleStageClick = (tierKey: TierKey, stageNumber: number) => {
    const stageId = makeStageId(chapterKey, tierKey, stageNumber)
    const status = getStageStatus(tierKey, stageNumber)

    if (status === 'completed') {
      router.push(`/teaching/${worldKey}/lesson/${stageId}`)
      return
    }

    if (status === 'current') {
      if (energy < 5) {
        setShowEnergyAlert(true)
        setTimeout(() => setShowEnergyAlert(false), 2000)
        return
      }
      router.push(`/teaching/${worldKey}/lesson/${stageId}`)
      return
    }

    // locked 상태 - 콘텐츠가 있으면 10⚡ 시작 팝업
    const hasContent = !!STAGE_CONTENT[stageId]
    if (hasContent) {
      setUnlockTarget({ tierKey, stageNumber })
    }
  }

  const handleUnlockConfirm = () => {
    if (!unlockTarget) return
    const stageId = makeStageId(chapterKey, unlockTarget.tierKey, unlockTarget.stageNumber)
    if (energy < 10) {
      setUnlockTarget(null)
      setShowEnergyAlert(true)
      setTimeout(() => setShowEnergyAlert(false), 2000)
      return
    }
    addEnergy(-10)
    setUnlockTarget(null)
    router.push(`/teaching/${worldKey}/lesson/${stageId}?unlock=true`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href={`/teaching/${worldKey}`} className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">{chapter.icon}</span>
            <h1 className="text-white font-semibold">{chapter.label}</h1>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 티어 맵 */}
      <div className="pt-20 pb-24 px-4 max-w-md mx-auto">
        {TIERS.map((tier, tierIndex) => {
          const unlocked = isTierUnlocked(tier.key)
          const completedCount = getTierCompletedCount(tier.key)

          return (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tierIndex * 0.1 }}
              className="mb-8"
            >
              {/* 티어 헤더 */}
              <div className={`flex items-center gap-3 mb-4 ${!unlocked ? 'opacity-40' : ''}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-lg shadow-lg`}>
                  {tier.icon}
                </div>
                <div>
                  <h2 className="text-white font-bold">{tier.label}</h2>
                  <p className="text-white/40 text-xs">
                    {unlocked
                      ? completedCount > 0
                        ? `${completedCount}/${tier.stageCount} 완료`
                        : `${tier.stageCount}단계`
                      : '이전 단계를 완료하면 열려요'
                    }
                  </p>
                </div>
                <span className="ml-auto flex items-center gap-0.5 text-amber-400 text-xs font-medium">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />-5
                </span>
                {!unlocked && <Lock className="w-4 h-4 text-white/30" />}
              </div>

              {/* 스테이지 그리드 */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: tier.stageCount }, (_, i) => {
                  const stageNumber = i + 1
                  const stageId = makeStageId(chapterKey, tier.key, stageNumber)
                  const isCompleted = completedStages.includes(stageId)
                  const status = isCompleted ? 'completed' : (unlocked ? getStageStatus(tier.key, stageNumber) : 'locked')
                  const hasContent = !!STAGE_CONTENT[stageId]
                  const canUnlock = status === 'locked' && hasContent

                  return (
                    <motion.button
                      key={stageNumber}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleStageClick(tier.key, stageNumber)}
                      className={`
                        relative w-full aspect-square rounded-xl flex items-center justify-center
                        font-bold text-sm transition-all border
                        ${status === 'completed'
                          ? 'bg-green-500/20 border-green-500/40 text-green-400 shadow-lg'
                          : status === 'current'
                          ? `bg-gradient-to-br ${tier.color} border-white/40 text-white shadow-lg ring-2 ring-white/30 ring-offset-2 ring-offset-slate-900`
                          : canUnlock
                          ? 'bg-white/5 border-white/10 text-white/30 hover:border-yellow-500/40'
                          : 'bg-white/5 border-white/10 text-white/10 opacity-40'
                        }
                      `}
                    >
                      {status === 'completed' ? (
                        <span className="text-[10px] font-black tracking-wider">PASS</span>
                      ) : (
                        stageNumber
                      )}

                      {/* 현재 스테이지 표시 */}
                      {status === 'current' && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 10⚡ 시작 확인 팝업 */}
      <AnimatePresence>
        {unlockTarget && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setUnlockTarget(null)} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-8">
              <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-white/10 shadow-2xl">
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">스테이지 시작</h3>
                  <p className="text-white/50 text-sm">
                    10⚡ 에너지를 사용해서<br />이 스테이지를 바로 열 수 있어요
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 mb-5 flex items-center justify-between">
                  <span className="text-white/60 text-sm">현재 에너지</span>
                  <span className={`font-bold ${energy >= 10 ? 'text-yellow-400' : 'text-red-400'}`}>{energy}⚡</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setUnlockTarget(null)}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-medium text-sm">
                    취소
                  </button>
                  <button onClick={handleUnlockConfirm} disabled={energy < 10}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold text-sm disabled:opacity-40 flex items-center justify-center gap-1.5">
                    <Zap className="w-4 h-4" />10⚡ 시작
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 에너지 부족 알림 */}
      <AnimatePresence>
        {showEnergyAlert && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 z-50 bg-red-500/90 backdrop-blur-lg rounded-xl px-4 py-3 flex items-center gap-3 max-w-md mx-auto"
          >
            <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0" />
            <p className="text-white text-sm font-medium">에너지가 부족해요! (현재: {energy}⚡)</p>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabBar />
    </main>
  )
}

export default function StageMapPage() {
  return (
    <AuthGuard>
      <StageMapContent />
    </AuthGuard>
  )
}
