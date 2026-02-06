'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { SUBJECTS, SubjectKey } from '@/lib/teaching/types'
import { AuthGuard } from '@/components/AuthGuard'
import { getUserEnergy, getUserProgressKey } from '@/lib/auth'

interface SubjectProgress {
  [key: string]: {
    completed: number
    total: number
  }
}

function TeachingContent() {
  const router = useRouter()
  const [energy, setEnergy] = useState(50)
  const [progress, setProgress] = useState<SubjectProgress>({})

  useEffect(() => {
    setEnergy(getUserEnergy())

    // 진행도 불러오기 (사용자별)
    const progressKey = getUserProgressKey('teaching-progress')
    const savedProgress = progressKey ? localStorage.getItem(progressKey) : null
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress)
        // 과목별 진행도 계산
        const subjectProgress: SubjectProgress = {}
        SUBJECTS.forEach(subject => {
          const subjectItems = parsed.filter((p: { contentId: string }) =>
            p.contentId.startsWith(subject.key)
          )
          subjectProgress[subject.key] = {
            completed: subjectItems.filter((p: { completed: boolean }) => p.completed).length,
            total: 6  // Level 1-2, 각 3개
          }
        })
        setProgress(subjectProgress)
      } catch {
        setProgress({})
      }
    }
  }, [])

  const handleSubjectClick = (subjectKey: SubjectKey) => {
    router.push(`/teaching/${subjectKey}`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/world/cognition" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">티칭</h1>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Zap className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-20 pb-8 px-4">
        {/* 타이틀 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-1">과목 선택</h2>
          <p className="text-white/50 text-sm">배우고 싶은 과목을 선택하세요</p>
        </motion.div>

        {/* 과목 그리드 */}
        <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
          {SUBJECTS.map((subject, index) => {
            const subjectProgress = progress[subject.key] || { completed: 0, total: 6 }
            const progressPercent = (subjectProgress.completed / subjectProgress.total) * 100

            return (
              <motion.button
                key={subject.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleSubjectClick(subject.key)}
                className={`bg-gradient-to-br ${subject.gradient} border border-white/10 rounded-2xl p-4 text-left hover:border-white/20 transition-all active:scale-95`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-xl shadow-lg`}>
                    {subject.icon}
                  </div>
                  <span className="text-white font-semibold">{subject.label}</span>
                </div>

                {/* 진행률 바 */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ delay: index * 0.03 + 0.3, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                  />
                </div>
                <p className="text-white/40 text-xs mt-1.5">
                  {subjectProgress.completed}/{subjectProgress.total} 완료
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default function TeachingPage() {
  return (
    <AuthGuard>
      <TeachingContent />
    </AuthGuard>
  )
}
