'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Star, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { SUBJECTS, SubjectKey } from '@/lib/teaching/types'
import { LESSON_DATA } from '@/lib/teaching/lessonContent'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import { BottomTabBar } from '@/components/BottomTabBar'

interface SubjectProgress {
  [key: string]: {
    completed: number
    total: number
  }
}

function TeachingContent() {
  const router = useRouter()
  const { energy } = useUserData()
  const [progress, setProgress] = useState<SubjectProgress>({})

  const handleSubjectClick = (subjectKey: SubjectKey) => {
    // 새 듀오링고 스타일 레슨이 있는지 확인
    const lessons = LESSON_DATA[subjectKey]
    if (lessons && lessons.length > 0) {
      // 새 레슨 시스템으로 이동
      router.push(`/teaching/cognition/lesson/${subjectKey}-ch1`)
      return
    }
    // 기존 시스템 (현재는 모두 cognition 월드 안의 과목들)
    router.push(`/teaching/cognition`)
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/world/cognition" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">학습</h1>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="pt-20 pb-24 px-4">
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

      <BottomTabBar activeTab="/app" />
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
