'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ArrowLeft, Lock, Check } from 'lucide-react'
import Link from 'next/link'
import { LevelBadge } from '@/components/LevelBadge'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { getContentsByWorldAndChapter } from '@/lib/teaching/content'
import { LESSON_DATA } from '@/lib/teaching/lessonContent'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'

interface ContentProgress {
  contentId: string
  completed: boolean
}

function WorldTeachingContent() {
  const params = useParams()
  const router = useRouter()
  const worldKey = params.subject as WorldKey

  const { energy } = useUserData()
  const [progress, setProgress] = useState<ContentProgress[]>([])

  const worldConfig = WORLD_CONFIGS[worldKey]

  if (!worldConfig) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">월드를 찾을 수 없습니다</div>
  }

  // 챕터별 진행도 계산
  const getChapterProgress = (chapterKey: string) => {
    const contents = getContentsByWorldAndChapter(worldKey, chapterKey)
    const completed = contents.filter(c =>
      progress.some(p => p.contentId === c.id && p.completed)
    ).length
    return { completed, total: contents.length }
  }

  // 다음 할 콘텐츠 찾기
  const getNextContent = (chapterKey: string) => {
    const contents = getContentsByWorldAndChapter(worldKey, chapterKey)
    return contents.find(c =>
      !progress.some(p => p.contentId === c.id && p.completed)
    )
  }

  // 새 레슨 시스템이 있는지 확인
  const hasNewLesson = (chapterKey: string, chapterIndex: number) => {
    const lessons = LESSON_DATA[chapterKey]
    if (lessons && lessons.length > 0) return true
    // humanities 과목의 첫 번째 챕터는 새 레슨 시스템 사용
    if (worldKey === 'cognition' && chapterKey === 'humanities' && chapterIndex === 0) return true
    return false
  }

  const handleChapterClick = (chapterKey: string, chapterIndex: number) => {
    // 새 레슨 시스템 체크 (인문 1챕터)
    if (hasNewLesson(chapterKey, chapterIndex)) {
      router.push(`/teaching/${worldKey}/lesson/${chapterKey}-ch1`)
      return
    }

    // 기존 콘텐츠 시스템
    const nextContent = getNextContent(chapterKey)
    if (nextContent) {
      router.push(`/teaching/${worldKey}/${nextContent.id}`)
    }
  }

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/app" className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">돌아가기</span>
          </Link>
          <h1 className="text-white font-semibold">{worldConfig.label} 티칭</h1>
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
        {/* 월드 아이콘 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${worldConfig.color} flex items-center justify-center text-4xl shadow-lg`}>
            {worldConfig.icon}
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white font-bold text-xl mb-1"
        >
          {worldConfig.label} 훈련
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center text-white/50 text-sm mb-8"
        >
          {worldConfig.description}
        </motion.p>

        {/* 챕터 그리드 */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {worldConfig.chapters.map((chapter, index) => {
            const chapterProgress = getChapterProgress(chapter.key)
            const isComplete = chapterProgress.completed >= chapterProgress.total && chapterProgress.total > 0
            const hasOldContent = chapterProgress.total > 0
            const hasNewLessonContent = hasNewLesson(chapter.key, index)
            const hasContent = hasOldContent || hasNewLessonContent

            return (
              <motion.button
                key={chapter.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleChapterClick(chapter.key, index)}
                disabled={!hasContent && !hasNewLesson(chapter.key, index)}
                className={`relative p-4 rounded-2xl border transition-all ${
                  !hasContent
                    ? 'bg-white/5 border-white/10 opacity-50'
                    : isComplete
                    ? 'bg-green-500/20 border-green-500/30'
                    : `bg-gradient-to-br ${chapter.gradient} border-white/20 hover:border-white/30`
                }`}
              >
                {/* 챕터 아이콘 */}
                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                  !hasContent
                    ? 'bg-white/10'
                    : isComplete
                    ? 'bg-green-500'
                    : `bg-gradient-to-br ${chapter.color}`
                }`}>
                  {!hasContent ? (
                    <Lock className="w-5 h-5 text-white/50" />
                  ) : isComplete ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-2xl">{chapter.icon}</span>
                  )}
                </div>

                {/* 챕터 이름 */}
                <h3 className={`font-bold text-sm mb-1 ${hasContent ? 'text-white' : 'text-white/50'}`}>
                  {chapter.label}
                </h3>

                {/* 진행도 바 */}
                {hasContent && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isComplete ? 'bg-green-500' : `bg-gradient-to-r ${chapter.color}`}`}
                        style={{ width: `${(chapterProgress.completed / chapterProgress.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/40">
                      {chapterProgress.completed}/{chapterProgress.total}
                    </span>
                  </div>
                )}

                {/* 준비중 표시 */}
                {!hasContent && (
                  <span className="text-xs text-white/30">준비중</span>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default function WorldTeachingPage() {
  return (
    <AuthGuard>
      <WorldTeachingContent />
    </AuthGuard>
  )
}
