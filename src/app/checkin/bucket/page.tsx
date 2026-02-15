'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Star, Check, Plus, X, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { BottomTabBar } from '@/components/BottomTabBar'
import { useUserData } from '@/lib/UserDataProvider'

interface BucketItem {
  id: string
  text: string
  completed: boolean
}

function BucketContent() {
  const router = useRouter()
  const { energy, addEnergy, bucketList, saveBucketList, addHistoryRecord } = useUserData()
  const [items, setItems] = useState<BucketItem[]>([])
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    if (bucketList.length > 0) {
      setItems(bucketList)
    } else {
      setItems(createDefaultItems())
    }
  }, [bucketList])

  function createDefaultItems(): BucketItem[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `bucket-${i + 1}`,
      text: '',
      completed: false,
    }))
  }

  function saveItems(newItems: BucketItem[]) {
    setItems(newItems)
    saveBucketList(newItems)
  }

  function handleTextChange(id: string, text: string) {
    const updated = items.map(item =>
      item.id === id ? { ...item, text } : item
    )
    saveItems(updated)
  }

  function handleComplete(id: string) {
    const item = items.find(i => i.id === id)
    if (!item || item.completed || !item.text.trim()) return

    const updated = items.map(i =>
      i.id === id ? { ...i, completed: true } : i
    )
    saveItems(updated)

    addEnergy(15)

    addHistoryRecord({
      worldKey: 'selfDirected',
      areaKey: 'selfDirected',
      lessonTitle: '버킷리스트 달성',
      executionText: `[버킷리스트] ${item.text}`,
      energy: 15,
    })

    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
      router.push('/dashboard')
    }, 1500)
  }

  function handleAdd() {
    const newItem: BucketItem = {
      id: `bucket-${Date.now()}`,
      text: '',
      completed: false,
    }
    saveItems([...items, newItem])
  }

  function handleDelete(id: string) {
    const updated = items.filter(i => i.id !== id)
    saveItems(updated)
  }

  const activeItems = items.filter(i => !i.completed)
  const completedItems = items.filter(i => i.completed)

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60 font-medium">{energy}</span>
            </div>
          </div>
          <h1 className="text-white font-semibold">버킷리스트</h1>
          <Link href="/checkin/monthly" className="flex items-center gap-1 hover:scale-105 transition-transform">
            <span className="text-white/50 text-xs font-medium">월간 목표</span>
            <ChevronRight className="w-5 h-5 text-white" />
          </Link>
        </div>
      </header>

      {/* 메인 */}
      <div className="pt-20 pb-32 px-4">
        <div className="max-w-md mx-auto">
          {/* 진행 상황 */}
          <div className="text-center mb-6">
            <p className="text-white/50 text-sm">
              {completedItems.length} / {items.length} 달성
            </p>
            <div className="w-full h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: items.length > 0 ? `${(completedItems.length / items.length) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* 버킷리스트 */}
          <div className="space-y-3">
            {activeItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleComplete(item.id)}
                    disabled={!item.text.trim()}
                    className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.text.trim()
                        ? 'border-amber-500 hover:bg-amber-500/20'
                        : 'border-white/20'
                    }`}
                  >
                  </button>

                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.text}
                      onChange={e => handleTextChange(item.id, e.target.value)}
                      placeholder="이루고 싶은 것을 적어주세요"
                      className="w-full bg-transparent text-white placeholder:text-white/25 focus:outline-none text-sm"
                    />
                  </div>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 추가 버튼 */}
          <button
            onClick={handleAdd}
            className="w-full mt-4 py-3 rounded-xl border border-dashed border-white/20 text-white/40 hover:text-white/60 hover:border-white/30 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            추가하기
          </button>

          {/* 완료된 항목 */}
          {completedItems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white/40 text-sm font-medium mb-3">달성 완료</h3>
              <div className="space-y-2">
                {completedItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-green-400 font-medium text-sm line-through flex-1">{item.text}</p>
                      <span className="text-green-400 text-xs font-medium">+15</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-white/30 text-xs text-center mt-6">
            버킷리스트를 달성하면 리포트에 기록되고 +15 에너지를 받아요
          </p>
        </div>
      </div>

      {/* 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl px-8 py-6 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 text-yellow-200" fill="currentColor" />
              <span className="text-3xl font-bold text-white">+15</span>
            </div>
            <p className="text-white/80">버킷리스트 달성!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabBar activeTab="/checkin" />
    </main>
  )
}

export default function BucketPage() {
  return (
    <AuthGuard>
      <BucketContent />
    </AuthGuard>
  )
}
