'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronRight, Check, X, Sparkles, CheckCircle, Star, Camera, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { WORLD_CONFIGS, WorldKey } from '@/lib/teaching/worldTypes'
import { getStage, parseStageId, getTierConfig, LessonCard, markStageCompleted, isStageCompleted } from '@/lib/teaching/lessonData'
import { AuthGuard } from '@/components/AuthGuard'
import { LevelBadge } from '@/components/LevelBadge'
import { useUserData } from '@/lib/UserDataProvider'
import { BottomTabBar } from '@/components/BottomTabBar'

// ── 6개 성장 영역 ──
const GROWTH_AREAS = [
  { key: 'cognition', label: '인지(학습)', icon: '🧠', color: '#8b5cf6' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { key: 'habit', label: '습관', icon: '📚', color: '#22c55e' },
  { key: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { key: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { key: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

/** 실행 예문 랜덤 생성 (SMART 목표) */
function randomExecutionExample() {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
  const when = pick(['오늘 저녁까지', '오늘 자기 전까지', '오늘 오후까지', '내일 아침까지', '오늘 중으로', '이번 주 금요일까지', '오늘 밤 10시까지', '내일 점심까지'])
  const templates = [
    () => `${when} ${pick(['죽음의 수용소에서', '어린 왕자', '데미안', '미움받을 용기', '아몬드', '원씽', '습관의 힘'])} ${pick(['30페이지', '50페이지', '1챕터', '2챕터', '20페이지'])} ${pick(['밑줄 치며 정독하고', '핵심 메모하며 읽고', '비판적으로 읽고'])} ${pick(['배운 점 3가지 정리하기', '핵심 문장 5개 기록하기', '느낀 점 1페이지 쓰기', '요약 노트 작성하기'])}`,
    () => `${when} ${pick(['달리기 3km', '줄넘기 500개', '스쿼트 50개 3세트', '플랭크 3분 3세트', '팔굽혀펴기 20개 3세트', '걷기 5000보', '자전거 30분', '버피 10개 5세트'])} ${pick(['쉬지 않고 완료하고', '자세 정확하게 하고', '기록 갱신 목표로'])} ${pick(['운동 기록 남기기', '완료 인증 사진 찍기', '세트별 기록 정리하기', '컨디션 변화 기록하기'])}`,
    () => `${when} ${pick(['수학 문제 20개', '영어 단어 50개', '국어 지문 3개', '과학 개념 5단원', '코딩 문제 3개', '모의고사 1회분'])} ${pick(['오답 노트 작성하며 풀고', '시간 재며 집중해서 풀고', '틀린 부분 3번 복습하고'])} ${pick(['정답률 기록하기', '핵심 정리 노트 만들기', '오답 원인 분석 적기', '취약 유형 3가지 정리하기'])}`,
    () => `${when} ${pick(['아침 기상 후', '저녁 식사 후', '자기 전', '점심시간에'])} ${pick(['명상 15분', '일기 1페이지', '감사일기 3가지', '독서 20분', '스트레칭 10분'])} ${pick(['집중해서 마치고', '꾸준히 실천하고', '방해 없이 완료하고'])} ${pick(['체크리스트에 기록하기', '실행 완료 인증하기', '느낀 점 한 줄 남기기'])}`,
    () => `${when} ${pick(['기타 코드 3개', '피아노 곡 1절', '그림 1장', '글쓰기 500자', '사진 5장', '새 레시피 1개'])} ${pick(['30분 집중해서', '1시간 동안', '40분간 몰입해서'])} ${pick(['연습하고 기록 남기기', '완성하고 인증하기', '과정 영상 찍어두기', '배운 점 3가지 정리하기'])}`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]()
}

// ── 개별 카드 컴포넌트 ──

function ConceptCardView({ card }: { card: Extract<LessonCard, { type: 'concept' }> }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">💡</span>
      </div>
      <h2 className="text-2xl font-bold text-white mb-6">{card.title}</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <p className="text-white/90 text-lg leading-relaxed whitespace-pre-line">{card.description}</p>
      </div>
    </div>
  )
}

function SummaryCardView({ card }: { card: Extract<LessonCard, { type: 'summary' }> }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white text-center mb-6">핵심 키워드</h2>
      <div className="space-y-3">
        {card.keywords.map((kw, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4"
          >
            <span className="text-3xl">{kw.icon}</span>
            <div>
              <h3 className="text-white font-bold">{kw.label}</h3>
              <p className="text-white/50 text-sm">{kw.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ExampleCardView({ card }: { card: Extract<LessonCard, { type: 'example' }> }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white text-center mb-6">어떤 차이가 있을까?</h2>
      <div className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <X className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-bold text-sm">{card.bad.label}</span>
          </div>
          <p className="text-white/80 whitespace-pre-line">{card.bad.story}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-bold text-sm">{card.good.label}</span>
          </div>
          <p className="text-white/80 whitespace-pre-line">{card.good.story}</p>
        </div>
      </div>
    </div>
  )
}

function OXCardView({ card, selected, onSelect }: {
  card: Extract<LessonCard, { type: 'ox' }>
  selected: boolean | null
  onSelect: (v: boolean) => void
}) {
  const answered = selected !== null
  const isCorrect = selected === card.answer

  return (
    <div>
      <h2 className="text-lg font-bold text-white text-center mb-2">OX 퀴즈</h2>
      <p className="text-white/50 text-sm text-center mb-6">맞으면 O, 틀리면 X를 눌러봐!</p>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
        <p className="text-white text-center font-medium">{card.statement}</p>
      </div>
      <div className="flex gap-4 justify-center mb-6">
        <button onClick={() => onSelect(true)} disabled={answered}
          className={`w-20 h-20 rounded-2xl text-3xl font-bold flex items-center justify-center transition-all border-2
            ${answered && selected === true ? (isCorrect ? 'bg-green-500/30 border-green-500 text-green-400' : 'bg-red-500/30 border-red-500 text-red-400') : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}>
          O
        </button>
        <button onClick={() => onSelect(false)} disabled={answered}
          className={`w-20 h-20 rounded-2xl text-3xl font-bold flex items-center justify-center transition-all border-2
            ${answered && selected === false ? (isCorrect ? 'bg-green-500/30 border-green-500 text-green-400' : 'bg-red-500/30 border-red-500 text-red-400') : 'bg-white/5 border-white/20 text-white hover:bg-white/10'}`}>
          X
        </button>
      </div>
      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`}>{isCorrect ? '정답! 🎉' : '아쉽지만 오답!'}</p>
            <p className="text-white/70 text-sm whitespace-pre-line">{card.feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MultipleChoiceCardView({ card, selected, onSelect }: {
  card: Extract<LessonCard, { type: 'multipleChoice' }>
  selected: number | null
  onSelect: (v: number) => void
}) {
  const answered = selected !== null
  const isCorrect = selected === card.correctIndex

  return (
    <div>
      <h2 className="text-lg font-bold text-white text-center mb-6">{card.question}</h2>
      <div className="space-y-3 mb-6">
        {card.options.map((opt, i) => {
          const isSelected = selected === i
          const isAnswer = i === card.correctIndex
          return (
            <button key={i} onClick={() => onSelect(i)} disabled={answered}
              className={`w-full text-left p-4 rounded-xl border transition-all
                ${answered ? isAnswer ? 'bg-green-500/20 border-green-500/40 text-white' : isSelected ? 'bg-red-500/20 border-red-500/40 text-white/60' : 'bg-white/5 border-white/10 text-white/40'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}>
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border
                  ${answered && isAnswer ? 'bg-green-500 border-green-500 text-white' : answered && isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-white/30'}`}>
                  {answered && isAnswer ? <Check className="w-4 h-4" /> : answered && isSelected ? <X className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm">{opt}</span>
              </div>
            </button>
          )
        })}
      </div>
      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl p-4 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
            <p className={`font-bold mb-1 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`}>{isCorrect ? '정답! 🎉' : '아쉽지만 오답!'}</p>
            <p className="text-white/70 text-sm whitespace-pre-line">{card.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FeedbackCardView({ card }: { card: Extract<LessonCard, { type: 'feedback' }> }) {
  return (
    <div className="text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
        className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">🌟</span>
      </motion.div>
      <h2 className="text-xl font-bold text-white mb-4">오늘 배운 것</h2>
      <div className="bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 rounded-2xl p-6 mb-6">
        <p className="text-white font-medium text-lg">{card.summary}</p>
      </div>
      <p className="text-white/70 whitespace-pre-line">{card.message}</p>
    </div>
  )
}

function MissionCardView({ card, checked, onCheck }: {
  card: Extract<LessonCard, { type: 'mission' }>
  checked: boolean
  onCheck: () => void
}) {
  return (
    <div className="text-center">
      <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">오늘의 실천 미션</h2>
      <p className="text-white/50 text-sm mb-6">작은 실천이 큰 변화를 만들어!</p>
      <button onClick={onCheck}
        className={`w-full rounded-2xl p-6 border transition-all text-left ${checked ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
        <div className="flex items-start gap-4">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${checked ? 'bg-green-500' : 'bg-white/10 border border-white/20'}`}>
            {checked && <Check className="w-5 h-5 text-white" />}
          </div>
          <p className={`font-medium whitespace-pre-line ${checked ? 'text-green-400' : 'text-white'}`}>{card.mission}</p>
        </div>
      </button>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-white/50 text-sm mt-6">
        {card.encouragement}
      </motion.p>
    </div>
  )
}

// ── 카드 라벨 ──
const CARD_LABELS: Record<string, string> = {
  concept: '개념',
  summary: '핵심 요약',
  example: '사례',
  ox: 'OX 퀴즈',
  multipleChoice: '문제',
  feedback: '정리',
  mission: '실천 미션',
}

// ── 메인 레슨 페이지 ──

type ExecStep = 'closed' | 'write' | 'selectWorld'

function LessonContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const worldKey = params.subject as WorldKey
  const lessonId = params.lessonId as string
  const isUnlockMode = searchParams.get('unlock') === 'true'

  const parsed = parseStageId(lessonId)
  const stage = getStage(lessonId)
  const tier = parsed ? getTierConfig(parsed.tierKey) : null
  const worldConfig = WORLD_CONFIGS[worldKey]

  const { energy, addEnergy, executions, saveExecutions, updateLevelProgress, addHistoryRecord } = useUserData()

  // 카드 상태
  const [currentCard, setCurrentCard] = useState(0)
  const [oxAnswer, setOxAnswer] = useState<boolean | null>(null)
  const [mcAnswer, setMcAnswer] = useState<number | null>(null)
  const [missionChecked, setMissionChecked] = useState(false)

  // 보상 팝업
  const [showReward, setShowReward] = useState(false)

  // 실행 기록 모달 상태
  const [execStep, setExecStep] = useState<ExecStep>('closed')
  const [selectedWorlds, setSelectedWorlds] = useState<string[]>([])
  const [learnedText, setLearnedText] = useState(stage?.title ? `${stage.title}` : '')
  const [feltText, setFeltText] = useState('')
  const [actionText, setActionText] = useState('')
  const [actionPlaceholder] = useState(() => randomExecutionExample())
  const [aiMode, setAiMode] = useState(false)
  const [aiRecordText, setAiRecordText] = useState('')

  // 에너지 차감 (첫 도전만, 복습은 무료, unlock은 이미 맵에서 차감)
  const [energyDeducted, setEnergyDeducted] = useState(false)
  useEffect(() => {
    if (!lessonId || energyDeducted) return
    const alreadyCompleted = isStageCompleted(lessonId)
    if (!alreadyCompleted && !isUnlockMode) {
      addEnergy(-5)
      setEnergyDeducted(true)
    }
  }, [lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  // 사진 업로드
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isOcrLoading, setIsOcrLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!stage || !parsed || !tier || !worldConfig) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <p className="text-white/30 mb-4">레슨 준비중</p>
        <button onClick={() => router.back()} className="text-white/50 text-sm underline">돌아가기</button>
      </main>
    )
  }

  const cards = stage.cards
  const card = cards[currentCard]
  const totalCards = cards.length
  const progress = ((currentCard + 1) / totalCards) * 100

  const canProceed = (): boolean => {
    if (!card) return false
    switch (card.type) {
      case 'ox': return oxAnswer !== null
      case 'multipleChoice': return mcAnswer !== null
      default: return true
    }
  }

  // ── 학습 완료 처리 ──
  const handleLessonComplete = () => {
    // +2 에너지 지급
    addEnergy(2)
    updateLevelProgress(worldKey, 1)

    // 진행도 저장
    markStageCompleted(lessonId)

    // 보상 팝업 → 실행 기록 모달
    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
      setSelectedWorlds([worldKey])
      setExecStep('write')
    }, 1500)
  }

  const handleNext = () => {
    if (currentCard < totalCards - 1) {
      setCurrentCard(prev => prev + 1)
    } else {
      handleLessonComplete()
    }
  }

  // ── 사진 관련 ──
  function compressImage(file: File, maxPx = 1600, quality = 0.8): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        URL.revokeObjectURL(url)
        try {
          const canvas = document.createElement('canvas')
          let w = img.width, h = img.height
          if (w > maxPx || h > maxPx) {
            if (w > h) { h = Math.round(h * maxPx / w); w = maxPx }
            else { w = Math.round(w * maxPx / h); h = maxPx }
          }
          canvas.width = w; canvas.height = h
          const ctx = canvas.getContext('2d')
          if (!ctx) { reject(new Error('Canvas not supported')); return }
          ctx.drawImage(img, 0, 0, w, h)
          resolve(canvas.toDataURL('image/jpeg', quality))
        } catch (err) { reject(err) }
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('이미지를 불러올 수 없습니다.'))
      }
      img.src = url
    })
  }

  function dataUrlToFile(dataUrl: string, fileName: string): File {
    const [header, base64] = dataUrl.split(',')
    const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
    const binary = atob(base64)
    const arr = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i)
    return new File([arr], fileName, { type: mime })
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/') || file.size > 50 * 1024 * 1024) return
    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)

    setIsOcrLoading(true)
    compressImage(file).then(compressedDataUrl => {
      const base64 = compressedDataUrl.split(',')[1]
      return fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType: 'image/jpeg' }),
      })
    })
      .then(res => res.json())
      .then(data => { if (data.text) setLearnedText(prev => prev ? `${prev}\n${data.text}` : data.text) })
      .catch(() => {})
      .finally(() => setIsOcrLoading(false))
  }

  async function uploadPhoto(): Promise<string | undefined> {
    if (!photoFile) return undefined
    setIsUploading(true)
    try {
      let fileToUpload: File
      try {
        let compressed = await compressImage(photoFile, 2400, 0.85)
        let file = dataUrlToFile(compressed, 'photo.jpg')
        if (file.size > 3.5 * 1024 * 1024) {
          compressed = await compressImage(photoFile, 1800, 0.75)
          file = dataUrlToFile(compressed, 'photo.jpg')
        }
        if (file.size > 3.5 * 1024 * 1024) {
          compressed = await compressImage(photoFile, 1400, 0.65)
          file = dataUrlToFile(compressed, 'photo.jpg')
        }
        fileToUpload = file
      } catch {
        if (photoFile.size > 4 * 1024 * 1024) {
          alert('사진을 처리할 수 없습니다. 다른 사진을 선택해주세요.')
          return undefined
        }
        fileToUpload = photoFile
      }
      const formData = new FormData()
      formData.append('file', fileToUpload)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        let errMsg = '사진 업로드 실패'
        try { const err = await res.json(); errMsg = err.error || errMsg } catch { errMsg = `업로드 실패 (${res.status})` }
        alert(errMsg)
        return undefined
      }
      const data = await res.json()
      return data.url
    } catch (e) {
      alert(`사진 업로드 중 오류: ${e instanceof Error ? e.message : '네트워크 오류'}`)
      return undefined
    }
    finally { setIsUploading(false) }
  }

  // ── 실행 기록 저장 ──
  async function handleAddTodo() {
    if (selectedWorlds.length === 0 || !actionText.trim()) return

    const photoUrl = await uploadPhoto()

    const combinedParts: string[] = []
    if (learnedText.trim()) combinedParts.push(`📖 배운 것: ${learnedText.trim()}`)
    if (feltText.trim()) combinedParts.push(`💭 느낀 것: ${feltText.trim()}`)
    combinedParts.push(`🚀 실행:${actionText.trim()}`)
    const combinedText = combinedParts.join('\n')

    const newItems = selectedWorlds.map(wk => ({
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${wk}`,
      areaKey: wk,
      lessonTitle: stage?.title ?? '',
      text: combinedText,
      aiRecord: aiRecordText.trim() || undefined,
      photoUrl: photoUrl || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    }))

    saveExecutions([...executions, ...newItems])
    setExecStep('closed')
    router.push(`/teaching/${worldKey}/${parsed?.chapterKey ?? ''}`)
  }

  function handleSkipExec() {
    setExecStep('closed')
    router.push(`/teaching/${worldKey}/${parsed?.chapterKey ?? ''}`)
  }

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href={`/teaching/${worldKey}/${parsed.chapterKey}`} className="flex items-center gap-2 text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">나가기</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm">{tier.icon}</span>
            <span className="text-white text-sm font-medium">{tier.label} {parsed.stageNumber}단계</span>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60">{energy}</span>
            </div>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div className={`h-full rounded-full bg-gradient-to-r ${tier.color}`} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
      </header>

      {/* 카드 영역 */}
      <div className="flex-1 pt-24 pb-36 px-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div key={currentCard} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.25 }} className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${tier.gradient} text-white/70 border border-white/10`}>
                {currentCard + 1}/{totalCards} · {CARD_LABELS[card.type] || card.type}
              </span>
            </div>
            {card.type === 'concept' && <ConceptCardView card={card} />}
            {card.type === 'summary' && <SummaryCardView card={card} />}
            {card.type === 'example' && <ExampleCardView card={card} />}
            {card.type === 'ox' && <OXCardView card={card} selected={oxAnswer} onSelect={setOxAnswer} />}
            {card.type === 'multipleChoice' && <MultipleChoiceCardView card={card} selected={mcAnswer} onSelect={setMcAnswer} />}
            {card.type === 'feedback' && <FeedbackCardView card={card} />}
            {card.type === 'mission' && <MissionCardView card={card} checked={missionChecked} onCheck={() => setMissionChecked(!missionChecked)} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 버튼 */}
      {execStep === 'closed' && !showReward && (
        <div className="fixed bottom-16 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 px-4 py-4">
          <button onClick={handleNext} disabled={!canProceed()}
            className={`w-full py-4 rounded-xl bg-gradient-to-r ${tier.color} text-white font-bold flex items-center justify-center gap-2 disabled:opacity-40 max-w-lg mx-auto transition-opacity`}>
            {currentCard === totalCards - 1 ? (<><CheckCircle className="w-5 h-5" />학습 완료</>) : (<>다음<ChevronRight className="w-5 h-5" /></>)}
          </button>
        </div>
      )}

      {/* +2 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl px-12 py-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
                <span className="text-4xl font-bold text-white">+2</span>
              </div>
              <p className="text-white/80">학습 완료!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 실행 기록 모달 (실행 페이지 + 버튼과 동일) */}
      <AnimatePresence>
        {execStep !== 'closed' && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleSkipExec} className="fixed inset-0 bg-black/60 z-50" />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden">
              <div className="bg-slate-800 rounded-t-3xl p-6 shadow-2xl border-t border-white/10 max-h-[85vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">
                    {execStep === 'write' && !aiMode && '✍️ 실행 계획 작성'}
                    {execStep === 'write' && aiMode && '✨ AI 기록 남기기'}
                    {execStep === 'selectWorld' && '🌍 월드 선택'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {execStep === 'write' && !aiMode && (
                      <>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />
                        <button onClick={() => fileInputRef.current?.click()}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            photoFile ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}`}>
                          <Camera className="w-3.5 h-3.5" />
                          {photoFile ? '사진 ✓' : '사진'}
                        </button>
                        <button onClick={() => setAiMode(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:from-cyan-500/30 hover:to-violet-500/30 transition-all">
                          <Sparkles className="w-3.5 h-3.5" />
                          AI 기록
                        </button>
                      </>
                    )}
                    <button onClick={handleSkipExec} className="text-white/50 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* AI 기록 모드 */}
                {execStep === 'write' && aiMode && (
                  <div className="space-y-4">
                    <button onClick={() => setAiMode(false)} className="text-white/50 text-sm flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" />돌아가기
                    </button>
                    <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-3">
                      <p className="text-white/60 text-xs">자유롭게 기록하세요. 배운점/느낀점/실행할점과 함께 저장됩니다.</p>
                    </div>
                    <textarea value={aiRecordText} onChange={e => setAiRecordText(e.target.value)}
                      placeholder="AI 코칭에서 나눈 이야기, 떠오르는 생각 등을 자유롭게 적어주세요..."
                      rows={6} autoFocus
                      className="w-full bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 resize-none text-sm" />
                    <button onClick={() => setAiMode(false)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />기록 완료
                    </button>
                  </div>
                )}

                {/* 직접 작성 모드 */}
                {execStep === 'write' && !aiMode && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">📖</span>
                        배운 것
                        {isOcrLoading && (
                          <span className="flex items-center gap-1 text-cyan-400 text-xs font-normal">
                            <Loader2 className="w-3 h-3 animate-spin" />사진 텍스트 인식 중...
                          </span>
                        )}
                      </label>
                      <textarea value={learnedText} onChange={e => setLearnedText(e.target.value)}
                        placeholder="오늘 배운 내용을 적어주세요"
                        rows={Math.max(2, Math.min(learnedText.split('\n').length + 1, 8))} autoFocus
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 resize-none text-sm" />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">💭</span>
                        느낀 것
                      </label>
                      <textarea value={feltText} onChange={e => setFeltText(e.target.value)}
                        placeholder="느낀 점이나 깨달은 것을 적어주세요" rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 resize-none text-sm" />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">🚀</span>
                        실행할 것
                        <span className="text-red-400 text-xs">*필수</span>
                      </label>
                      <p className="text-white/30 text-xs mb-2">내 보이지 않는 성장 기록을 위해 최대한 구체적으로 적어주세요</p>
                      <textarea value={actionText} onChange={e => setActionText(e.target.value)}
                        placeholder={actionPlaceholder} rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 resize-none text-sm" />
                    </div>
                    {photoPreview && (
                      <div className="relative">
                        <img src={photoPreview} alt="첨부 사진" className="w-full max-h-40 object-cover rounded-xl border border-white/10" />
                        <button onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    )}
                    <button onClick={() => setExecStep('selectWorld')} disabled={!actionText.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                      다음: 월드 선택<ChevronRight className="w-5 h-5" />
                    </button>
                    <button onClick={handleSkipExec} className="w-full py-3 text-white/40 text-sm">
                      나중에 하기
                    </button>
                  </div>
                )}

                {/* 월드 선택 */}
                {execStep === 'selectWorld' && (
                  <div className="space-y-4">
                    <button onClick={() => setExecStep('write')} className="text-white/50 text-sm mb-2 flex items-center gap-1">
                      ← 돌아가기
                    </button>
                    <p className="text-white/60 text-sm">이 실행 계획을 어떤 월드에 추가할까요? (복수 선택 가능)</p>
                    <div className="grid grid-cols-2 gap-3">
                      {GROWTH_AREAS.map(area => {
                        const isSelected = selectedWorlds.includes(area.key)
                        return (
                          <button key={area.key}
                            onClick={() => setSelectedWorlds(prev => isSelected ? prev.filter(k => k !== area.key) : [...prev, area.key])}
                            className={`p-4 rounded-xl border transition-all text-left ${isSelected ? 'bg-white/10 border-2' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            style={isSelected ? { borderColor: area.color } : undefined}>
                            <span className="text-2xl mb-2 block">{area.icon}</span>
                            <span className="text-white font-medium">{area.label}</span>
                            {isSelected && <span className="block mt-1 text-xs" style={{ color: area.color }}>✓ 선택됨</span>}
                          </button>
                        )
                      })}
                    </div>
                    {(learnedText.trim() || feltText.trim() || aiRecordText.trim() || photoPreview) && (
                      <div className="bg-white/5 rounded-xl p-3 space-y-1">
                        <p className="text-white/40 text-xs font-medium mb-2">미리보기</p>
                        {photoPreview && <img src={photoPreview} alt="" className="w-16 h-16 object-cover rounded-lg mb-2" />}
                        {learnedText.trim() && <p className="text-white/70 text-xs">📖 배운 것: {learnedText.trim()}</p>}
                        {feltText.trim() && <p className="text-white/70 text-xs">💭 느낀 것: {feltText.trim()}</p>}
                        <p className="text-white/70 text-xs">🚀 실행:{actionText.trim()}</p>
                        {aiRecordText.trim() && <p className="text-cyan-400/70 text-xs">✨ AI 기록: {aiRecordText.trim()}</p>}
                      </div>
                    )}
                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/50 text-xs">⭐ 각 월드별로 투두가 생성됩니다 (완료 시 월드당 +5 에너지)</p>
                    </div>
                    <button onClick={handleAddTodo} disabled={selectedWorlds.length === 0 || isUploading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2">
                      {isUploading ? (<><Loader2 className="w-5 h-5 animate-spin" />사진 업로드 중...</>)
                        : selectedWorlds.length > 0 ? `${selectedWorlds.length}개 월드에 투두 추가하기` : '월드를 선택해주세요'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomTabBar />
    </main>
  )
}

export default function LessonPage() {
  return (
    <AuthGuard>
      <Suspense fallback={<div className="min-h-screen bg-slate-900" />}>
        <LessonContent />
      </Suspense>
    </AuthGuard>
  )
}
