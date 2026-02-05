'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, ChevronRight, Lock, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { WORLDS_ARRAY, XP_CONFIG, MESSAGES, WORLDS } from '@/lib/constants'

interface FirstLessonData {
  lessonNode: {
    id: string
    title: string
    subtitle: string | null
    xpReward: number
  }
  world: {
    key: string
    title: string
  }
  coach: {
    name: string
  }
}

export default function AppHomePage() {
  const router = useRouter()
  const [firstLesson, setFirstLesson] = useState<FirstLessonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [energy, setEnergy] = useState(50) // 번개 에너지 (최대 100)

  // 레슨 시작 (번개 2개 소모)
  const handleStartLesson = () => {
    if (energy >= 2) {
      setEnergy(prev => prev - 2)
      const lessonUrl = firstLesson ? `/lesson/${firstLesson.lessonNode.id}` : '/lesson/1'
      router.push(lessonUrl)
    }
  }

  useEffect(() => {
    async function fetchFirstLesson() {
      try {
        const res = await fetch('/api/lesson/first')
        if (res.ok) {
          const data = await res.json()
          setFirstLesson(data)
        }
      } catch (e) {
        console.error('Failed to fetch first lesson:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchFirstLesson()
  }, [])

  // 더미 데이터 (나중에 API로 대체)
  const user = {
    name: '길로',
    level: 1,
    xp: 50,
    xpToNextLevel: XP_CONFIG.levelUpXp[1], // 100
    streakDays: 7,
  }

  // 월드별 진행 상태 (더미)
  const worldProgress: Record<string, { completed: number; total: number; unlocked: boolean }> = {
    cognition: { completed: 0, total: 5, unlocked: true },
    selfDirected: { completed: 0, total: 5, unlocked: true },
    habit: { completed: 0, total: 5, unlocked: true },
    attitude: { completed: 0, total: 5, unlocked: false },
    expression: { completed: 0, total: 5, unlocked: false },
    character: { completed: 0, total: 5, unlocked: false },
  }

  // 오늘의 추천 레슨
  const todayWorldKey = firstLesson?.world.key || 'cognition'
  const todayWorld = WORLDS[todayWorldKey as keyof typeof WORLDS] || WORLDS_ARRAY[0]

  return (
    <main className="gl-screen bg-[var(--gl-bg)]">
      {/* 헤더 - XP/스트릭 */}
      <header className="sticky top-0 z-20 bg-[var(--gl-bg-card)] border-b border-[var(--gl-border)] px-4 py-3">
        <div className="gl-container flex items-center justify-between">
          {/* 레벨 표시 */}
          <div className="w-10 h-10 rounded-full bg-[var(--gl-primary)] flex items-center justify-center">
            <span className="text-white font-bold text-sm">Lv.{user.level}</span>
          </div>

          {/* 번개 에너지 게이지 */}
          <div className="flex-1 ml-3">
            <div className="flex items-center gap-1 text-sm font-medium text-[var(--gl-text)]">
              <Zap className="w-4 h-4 text-[var(--gl-accent)]" />
              <span>{energy} / 100</span>
            </div>
            <ProgressBar
              value={energy}
              max={100}
              size="sm"
              animated={false}
            />
          </div>

        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="gl-container py-6">
          {/* 환영 메시지 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-4 mb-8"
          >
            <p className="text-2xl font-semibold text-[var(--gl-primary)] italic">
              {MESSAGES.welcome}
            </p>
          </motion.div>

          {/* 오늘의 레슨 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card
              variant="world"
              worldColor={todayWorld.colorHex}
              className="p-5"
            >
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-white/70" />
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium mb-1">
                        오늘의 레슨
                      </p>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {firstLesson?.lessonNode.title || '나의 감정 알아차리기'}
                      </h2>
                      <p className="text-white/70 text-sm">
                        지연아 사랑해 너밖에 없어 널 만난건 엄청난 행운이야
                      </p>
                    </div>
                    <div className="text-4xl">{todayWorld.icon}</div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-white/90">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">+{firstLesson?.lessonNode.xpReward || 20} XP</span>
                    </div>
                    <Link href={firstLesson ? `/lesson/${firstLesson.lessonNode.id}` : '/lesson/1'}>
                      <Button variant="secondary" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                        시작하기 <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </Card>
          </motion.div>

          {/* 성장 월드 맵 */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[var(--gl-text)] mb-4">
              성장 월드
            </h2>
          </div>

          {/* 월드 노드들 - 세로 스크롤 경로 */}
          <div className="relative">
            {/* 연결선 */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[var(--gl-border)]" />

            <div className="space-y-4">
              {WORLDS_ARRAY.map((world, index) => {
                const progress = worldProgress[world.key]
                const isUnlocked = progress.unlocked
                const isCompleted = progress.completed === progress.total
                const progressPercent = (progress.completed / progress.total) * 100

                return (
                  <motion.div
                    key={world.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={isUnlocked ? `/world/${world.key}` : '#'}
                      className={!isUnlocked ? 'pointer-events-none' : ''}
                    >
                      <Card
                        hoverable={isUnlocked}
                        variant="elevated"
                        className={`
                          relative pl-20 pr-4 py-4
                          ${!isUnlocked ? 'opacity-50' : ''}
                        `}
                      >
                        {/* 월드 아이콘 노드 */}
                        <div
                          className={`
                            absolute left-4 top-1/2 -translate-y-1/2
                            w-12 h-12 rounded-full flex items-center justify-center text-2xl
                            border-4 border-[var(--gl-bg-card)] shadow-md z-10
                            ${isCompleted
                              ? 'bg-[var(--gl-success)]'
                              : isUnlocked
                                ? ''
                                : 'bg-[var(--gl-text-light)]'
                            }
                          `}
                          style={isUnlocked && !isCompleted ? { backgroundColor: world.colorHex } : {}}
                        >
                          {!isUnlocked ? (
                            <Lock className="w-5 h-5 text-white" />
                          ) : isCompleted ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <span>{world.icon}</span>
                          )}
                        </div>

                        {/* 콘텐츠 */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[var(--gl-text)]">
                              {world.title}
                            </h3>
                            <p className="text-sm text-[var(--gl-text-muted)] truncate">
                              {world.subtitle}
                            </p>
                            {isUnlocked && (
                              <div className="mt-2">
                                <ProgressBar
                                  value={progressPercent}
                                  size="sm"
                                  variant="world"
                                  worldColor={world.colorHex}
                                  animated={false}
                                />
                                <p className="text-xs text-[var(--gl-text-muted)] mt-1">
                                  {progress.completed}/{progress.total} 완료
                                </p>
                              </div>
                            )}
                          </div>
                          {isUnlocked && (
                            <ChevronRight className="w-5 h-5 text-[var(--gl-text-muted)] flex-shrink-0" />
                          )}
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 고정 CTA */}
      <div className="gl-bottom-cta">
        <div className="gl-container">
          <Button
            variant="primary"
            size="xl"
            fullWidth
            disabled={loading || energy < 2}
            onClick={handleStartLesson}
          >
            {loading ? '로딩 중...' : (
              <span className="flex items-center justify-center gap-2">
                오늘의 레슨 시작하기
                <span className="flex items-center gap-0.5 bg-white/20 px-2 py-0.5 rounded-full text-sm">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  <Zap className="w-4 h-4" fill="currentColor" />
                </span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-20 left-0 right-0 z-10">
        <div className="gl-container">
          <div className="bg-[var(--gl-bg-card)] rounded-full shadow-lg border border-[var(--gl-border)] flex justify-around py-2 px-4">
            <NavItem href="/app" icon="🗺️" label="월드" active />
            <NavItem href="/checkin" icon="✅" label="체크인" />
            <NavItem href="/dashboard" icon="📊" label="리포트" />
            <NavItem href="/profile" icon="👤" label="프로필" />
          </div>
        </div>
      </nav>
    </main>
  )
}

function NavItem({
  href,
  icon,
  label,
  active = false
}: {
  href: string
  icon: string
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center px-4 py-1.5 rounded-full transition-colors
        ${active
          ? 'bg-[var(--gl-primary)]/10 text-[var(--gl-primary)]'
          : 'text-[var(--gl-text-muted)] hover:text-[var(--gl-text)]'
        }
      `}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium mt-0.5">{label}</span>
    </Link>
  )
}
