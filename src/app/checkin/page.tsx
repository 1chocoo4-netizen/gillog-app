'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Star, Check, Bell, X, Plus, ChevronRight, ChevronLeft, Sparkles, ArrowLeft, Trash2, Lightbulb, Camera, Loader2, ImageIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LevelBadge } from '@/components/LevelBadge'
import { AuthGuard } from '@/components/AuthGuard'
import { useUserData } from '@/lib/UserDataProvider'
import PaywallBanner from '@/components/PaywallBanner'
import DailyQuoteOverlay from './components/DailyQuoteOverlay'

// 6개 성장 영역
const GROWTH_AREAS = [
  { key: 'cognition', label: '인지(학습)', icon: '🧠', color: '#8b5cf6' },
  { key: 'selfDirected', label: '자기주도', icon: '🎯', color: '#06b6d4' },
  { key: 'habit', label: '습관', icon: '📚', color: '#22c55e' },
  { key: 'attitude', label: '태도', icon: '💪', color: '#f59e0b' },
  { key: 'relationship', label: '관계', icon: '🤝', color: '#ec4899' },
  { key: 'character', label: '인성', icon: '❤️', color: '#fb923c' },
]

// 월드별 레슨 목록
const WORLD_LESSONS: Record<string, { key: string; title: string }[]> = {
  cognition: [
    { key: 'korean', title: '국어' },
    { key: 'english', title: '영어' },
    { key: 'math', title: '수학' },
    { key: 'humanities', title: '인문' },
    { key: 'social', title: '사회' },
    { key: 'science', title: '과학' },
  ],
  selfDirected: [
    { key: 'time', title: '시간관리' },
    { key: 'selfAwareness', title: '자기인식' },
  ],
  habit: [
    { key: 'goodHabit', title: '좋은 습관 만들기' },
    { key: 'environment', title: '환경설정' },
  ],
  attitude: [
    { key: 'focus', title: '집중과 몰입' },
    { key: 'gratitude', title: '감사와 겸손' },
  ],
  relationship: [
    { key: 'communication', title: '소통' },
    { key: 'trust', title: '신뢰' },
  ],
  character: [
    { key: 'love', title: '사랑' },
    { key: 'emotion', title: '감정' },
    { key: 'mental', title: '멘탈' },
    { key: 'service', title: '봉사와 나눔' },
  ],
}

interface ExecutionItem {
  id: string
  areaKey: string
  subjectKey?: string
  lessonTitle?: string
  text: string
  aiRecord?: string
  photoUrl?: string
  completed: boolean
  createdAt: string
  alarmTime?: string
  isDaily?: boolean           // 매일 반복 실행 여부
  lastCompletedDate?: string  // 마지막 완료 날짜 "YYYY-MM-DD"
}

type AddStep = 'closed' | 'write' | 'selectWorld'

/** 로컬 시간 기준 "YYYY-MM-DD" (자정 기준 리셋용) */
function getLocalDateStr(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 실행 예문 랜덤 생성 (SMART 목표: 구체적+측정가능+달성가능+관련성+기한) */
function randomExecutionExample() {
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
  const when = pick(['오늘 저녁까지', '오늘 자기 전까지', '오늘 오후까지', '내일 아침까지', '오늘 중으로', '이번 주 금요일까지', '오늘 밤 10시까지', '내일 점심까지'])
  const templates = [
    // 독서
    () => `${when} ${pick(['죽음의 수용소에서', '어린 왕자', '데미안', '미움받을 용기', '아몬드', '원씽', '습관의 힘'])} ${pick(['30페이지', '50페이지', '1챕터', '2챕터', '20페이지'])} ${pick(['밑줄 치며 정독하고', '핵심 메모하며 읽고', '비판적으로 읽고'])} ${pick(['배운 점 3가지 정리하기', '핵심 문장 5개 기록하기', '느낀 점 1페이지 쓰기', '요약 노트 작성하기'])}`,
    // 운동
    () => `${when} ${pick(['달리기 3km', '줄넘기 500개', '스쿼트 50개 3세트', '플랭크 3분 3세트', '팔굽혀펴기 20개 3세트', '걷기 5000보', '자전거 30분', '버피 10개 5세트'])} ${pick(['쉬지 않고 완료하고', '자세 정확하게 하고', '기록 갱신 목표로'])} ${pick(['운동 기록 남기기', '완료 인증 사진 찍기', '세트별 기록 정리하기', '컨디션 변화 기록하기'])}`,
    // 공부
    () => `${when} ${pick(['수학 문제 20개', '영어 단어 50개', '국어 지문 3개', '과학 개념 5단원', '코딩 문제 3개', '모의고사 1회분'])} ${pick(['오답 노트 작성하며 풀고', '시간 재며 집중해서 풀고', '틀린 부분 3번 복습하고'])} ${pick(['정답률 기록하기', '핵심 정리 노트 만들기', '오답 원인 분석 적기', '취약 유형 3가지 정리하기'])}`,
    // 습관
    () => `${when} ${pick(['아침 기상 후', '저녁 식사 후', '자기 전', '점심시간에'])} ${pick(['명상 15분', '일기 1페이지', '감사일기 3가지', '독서 20분', '스트레칭 10분'])} ${pick(['집중해서 마치고', '꾸준히 실천하고', '방해 없이 완료하고'])} ${pick(['체크리스트에 기록하기', '실행 완료 인증하기', '느낀 점 한 줄 남기기'])}`,
    // 취미
    () => `${when} ${pick(['기타 코드 3개', '피아노 곡 1절', '그림 1장', '글쓰기 500자', '사진 5장', '새 레시피 1개'])} ${pick(['30분 집중해서', '1시간 동안', '40분간 몰입해서'])} ${pick(['연습하고 기록 남기기', '완성하고 인증하기', '과정 영상 찍어두기', '배운 점 3가지 정리하기'])}`,
  ]
  return templates[Math.floor(Math.random() * templates.length)]()
}

function ExecutionContent() {
  const router = useRouter()
  const { energy, addEnergy, executions, saveExecutions, updateLevelProgress, addHistoryRecord, history, subscriptionInfo } = useUserData()
  const [items, setItems] = useState<ExecutionItem[]>([])
  const [showReward, setShowReward] = useState(false)
  const [showDailyLimit, setShowDailyLimit] = useState(false)
  const [paywallDismissed, setPaywallDismissed] = useState(false)

  // 오늘 완료한 실행 수 (구독 상태에 따라 동적 한도)
  // groupId가 같은 기록은 1회로 카운트 (같은 실행을 여러 월드에 등록한 경우)
  const DAILY_LIMIT = subscriptionInfo.dailyLimit
  const today = getLocalDateStr()
  const todayRecords = history.filter(r => r.date === today)
  const todayCompletedCount = new Set(todayRecords.map(r => r.groupId || r.id)).size
  const dailyRemaining = Math.max(0, DAILY_LIMIT - todayCompletedCount)
  const [alarmModal, setAlarmModal] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState('09:00')

  // 투두 추가 관련 상태
  const [addStep, setAddStep] = useState<AddStep>('closed')
  const [selectedWorlds, setSelectedWorlds] = useState<string[]>([])
  const [learnedText, setLearnedText] = useState('')
  const [feltText, setFeltText] = useState('')
  const [missedText, setMissedText] = useState('')
  const [actionText, setActionText] = useState('')

  // 팁 모달
  const [showTip, setShowTip] = useState(false)

  // 매일 실행 패널
  const [showDailyPanel, setShowDailyPanel] = useState(false)

  // 사진 업로드
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isOcrLoading, setIsOcrLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [viewPhotoUrl, setViewPhotoUrl] = useState<string | null>(null)

  // 첫 방문 온보딩 툴팁 (useState 초기화로 첫 렌더에서 바로 표시)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window === 'undefined') return false
    return !localStorage.getItem('gillog-onboarding-checkin')
  })

  // 실행 예문 (마운트 시 1회 생성)
  const [actionPlaceholder] = useState(() => randomExecutionExample())

  // AI 기록 모드
  const [aiMode, setAiMode] = useState(false)
  const [aiRecordText, setAiRecordText] = useState('')

  // context에서 실행 항목 동기화
  useEffect(() => {
    setItems(executions)
  }, [executions])

  // 매일 실행 항목 일일 리셋
  // - 체크 완료한 항목 → 다음날 리셋 (다시 뜸)
  // - 체크 안 한 항목 → 그대로 남아있음
  useEffect(() => {
    const todayStr = getLocalDateStr()
    const needsReset = items.some(
      i => i.isDaily && i.completed && i.lastCompletedDate !== todayStr
    )
    if (needsReset) {
      const resetItems = items.map(i =>
        i.isDaily && i.completed && i.lastCompletedDate !== todayStr
          ? { ...i, completed: false }
          : i
      )
      saveItems(resetItems)
    }
  }, [items]) // eslint-disable-line react-hooks/exhaustive-deps

  // 이미지 압축 (maxPx: 최대 픽셀, quality: JPEG 품질)
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
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext('2d')
          if (!ctx) { reject(new Error('Canvas not supported')); return }
          ctx.drawImage(img, 0, 0, w, h)
          const dataUrl = canvas.toDataURL('image/jpeg', quality)
          resolve(dataUrl)
        } catch (err) {
          reject(err)
        }
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('이미지를 불러올 수 없습니다.'))
      }
      img.src = url
    })
  }

  // dataURL → File 변환
  function dataUrlToFile(dataUrl: string, fileName: string): File {
    const [header, base64] = dataUrl.split(',')
    const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg'
    const binary = atob(base64)
    const arr = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i)
    return new File([arr], fileName, { type: mime })
  }

  // 사진 선택 처리 + OCR 자동 실행
  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.')
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      alert('50MB 이하 파일만 업로드 가능합니다.')
      return
    }
    setPhotoFile(file)

    // 미리보기 + 압축 후 OCR
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
      .then(data => {
        if (data.text) {
          setLearnedText(prev => prev ? `${prev}\n${data.text}` : data.text)
        }
      })
      .catch(() => {})
      .finally(() => setIsOcrLoading(false))
  }

  // 사진 업로드 (GCS) - 압축 후 업로드
  async function uploadPhoto(): Promise<string | undefined> {
    if (!photoFile) return undefined
    setIsUploading(true)
    try {
      // 고화질 압축 (2400px) → 3.5MB 초과 시 단계별 재압축
      let fileToUpload: File
      try {
        let compressed = await compressImage(photoFile, 2400, 0.85)
        let file = dataUrlToFile(compressed, 'photo.jpg')
        // Vercel 4.5MB 제한 대비: 3.5MB 초과 시 재압축
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
        try {
          const err = await res.json()
          errMsg = err.error || errMsg
        } catch {
          errMsg = `업로드 실패 (${res.status})`
        }
        alert(errMsg)
        return undefined
      }
      const data = await res.json()
      return data.url
    } catch (e) {
      alert(`사진 업로드 중 오류: ${e instanceof Error ? e.message : '네트워크 오류'}`)
      return undefined
    } finally {
      setIsUploading(false)
    }
  }

  // 아이템 저장
  function saveItems(newItems: ExecutionItem[]) {
    setItems(newItems)
    saveExecutions(newItems)
  }

  // 매일 명언 → 오늘의 실행 등록 (선택한 월드별로 아이템 생성)
  function handleDailyQuoteRegister(text: string, worlds: string[]) {
    const createdAt = new Date().toISOString()
    const newItems: ExecutionItem[] = worlds.map(worldKey => ({
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${worldKey}`,
      areaKey: worldKey,
      text: `🚀 실행:${text}`,
      completed: false,
      createdAt,
    }))
    saveItems([...items, ...newItems])
  }

  // 체크 완료 처리 (하루 최대 5개)
  // 같은 텍스트+같은 생성시간의 형제 항목은 한번에 완료 (일일 1회 차감)
  function handleComplete(itemId: string) {
    const item = items.find(i => i.id === itemId)
    if (!item || item.completed) return

    // 일일 실행 제한 체크
    if (todayCompletedCount >= DAILY_LIMIT) {
      setShowDailyLimit(true)
      setTimeout(() => setShowDailyLimit(false), 3000)
      return
    }

    // 같은 텍스트+같은 생성시간의 형제 항목 찾기 (여러 월드에 등록된 동일 실행)
    const siblings = items.filter(i =>
      !i.completed && i.text === item.text && i.createdAt === item.createdAt
    )
    const siblingIds = new Set(siblings.map(s => s.id))

    const todayStr = getLocalDateStr()
    const updatedItems = items.map(i =>
      siblingIds.has(i.id)
        ? { ...i, completed: true, ...(i.isDaily ? { lastCompletedDate: todayStr } : {}) }
        : i
    )
    saveItems(updatedItems)

    // 에너지는 1회만 +5
    addEnergy(5)

    // 각 월드별 레벨 진행 + 히스토리 기록 (리포트 데이터용)
    const groupId = `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    siblings.forEach(sibling => {
      updateLevelProgress(sibling.areaKey, 1)
      addHistoryRecord({
        worldKey: sibling.areaKey,
        areaKey: sibling.areaKey,
        subjectKey: sibling.subjectKey,
        lessonTitle: sibling.lessonTitle,
        executionText: sibling.text,
        photoUrl: sibling.photoUrl,
        energy: 5,
        groupId,
      })
    })

    setShowReward(true)
    setTimeout(() => {
      setShowReward(false)
    }, 1500)
  }

  // 투두 추가 완료
  async function handleAddTodo() {
    if (selectedWorlds.length === 0 || !actionText.trim()) return

    // 사진이 있으면 먼저 업로드
    const photoUrl = await uploadPhoto()

    const combinedParts: string[] = []
    if (learnedText.trim()) combinedParts.push(`📖 배운 것: ${learnedText.trim()}`)
    if (feltText.trim()) combinedParts.push(`💭 느낀 것: ${feltText.trim()}`)
    if (missedText.trim()) combinedParts.push(`⚡ 놓친 것: ${missedText.trim()}`)
    combinedParts.push(`🚀 실행:${actionText.trim()}`)
    const combinedText = combinedParts.join('\n')

    const isDaily = actionText.includes('매일')
    const createdAt = new Date().toISOString()
    const newItems: ExecutionItem[] = selectedWorlds.map(worldKey => ({
      id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${worldKey}`,
      areaKey: worldKey,
      text: combinedText,
      aiRecord: aiRecordText.trim() || undefined,
      photoUrl: photoUrl || undefined,
      completed: false,
      createdAt,
      ...(isDaily ? { isDaily: true } : {}),
    }))

    saveItems([...items, ...newItems])

    // 초기화
    setAddStep('closed')
    setSelectedWorlds([])
    setLearnedText('')
    setFeltText('')
    setMissedText('')
    setActionText('')
    setAiRecordText('')
    setAiMode(false)
    setPhotoFile(null)
    setPhotoPreview(null)
  }

  // 알람 설정
  function handleSetAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: selectedTime } : i
    )
    saveItems(updatedItems)
    setAlarmModal(null)

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }

  // 알람 삭제
  function handleRemoveAlarm(itemId: string) {
    const updatedItems = items.map(i =>
      i.id === itemId ? { ...i, alarmTime: undefined } : i
    )
    saveItems(updatedItems)
  }

  // 아이템 삭제
  function handleDeleteItem(itemId: string) {
    const updatedItems = items.filter(i => i.id !== itemId)
    saveItems(updatedItems)
  }

  // 영역별로 아이템 그룹화
  const groupedItems = GROWTH_AREAS.map(area => ({
    ...area,
    items: items.filter(item => item.areaKey === area.key)
  }))

  const activeAreas = groupedItems.filter(area =>
    area.items.some(item => !item.completed)
  )

  return (
    <main className="min-h-screen bg-slate-900">
      {/* 매일 명언 오버레이 (하루 1회) */}
      <DailyQuoteOverlay onRegister={handleDailyQuoteRegister} />

      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/checkin/monthly" className="flex items-center gap-1 hover:scale-105 transition-transform">
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white/50 text-xs font-medium">월 목표</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-white font-semibold">실행</h1>
            <button
              onClick={() => setShowTip(true)}
              className="relative w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 text-[6px] text-slate-900 font-bold flex items-center justify-center">?</span>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <LevelBadge />
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-2.5 py-1.5">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-white/60 font-medium">{energy}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 오늘 남은 실행 횟수 */}
      <div className="pt-16 px-4">
        <div className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium ${
          dailyRemaining > 0
            ? 'bg-indigo-500/10 text-indigo-300'
            : 'bg-gray-800 text-gray-500'
        }`}>
          {dailyRemaining > 0
            ? `오늘 실행 가능 ${dailyRemaining}/${DAILY_LIMIT}회`
            : `오늘 실행 완료 (${DAILY_LIMIT}/${DAILY_LIMIT})`
          }
        </div>
      </div>

      {/* 성찰 문구 */}
      <div className="px-4 mt-6">
        <div className="max-w-lg mx-auto">
          <div className="relative py-6 px-5">
            {/* 좌측 세로 라인 */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-violet-500/0 via-violet-500/40 to-violet-500/0" />

            <div className="space-y-5 pl-4">
              <p className="text-white/50 text-[15px] leading-relaxed tracking-wide">
                실행하면 나한테 어떤 <span className="text-white/80 font-medium">도움</span>이 될까?
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed tracking-wide">
                오늘의 실행을 해낸 내 모습은 어떤 <span className="text-white/80 font-medium">모습</span>일까?
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed tracking-wide">
                그 모습을 가지고 어디로 <span className="text-white/80 font-medium">한발</span> 내딛을까?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 영역 */}
      <div className="pt-2 pb-6 px-4">
        <div className="max-w-lg mx-auto">
        {activeAreas.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-4">
              ⭐
            </div>
            <p className="text-white/60 text-sm mb-2">실행 항목이 없습니다</p>
            <p className="text-white/40 text-xs mb-6">아래 + 버튼을 눌러 직접 추가해보세요!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeAreas.map(area => (
              <div key={area.key}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{area.icon}</span>
                  <h2 className="text-white font-semibold">{area.label}</h2>
                  <span className="text-white/50 text-xs ml-auto">
                    {area.items.filter(i => !i.completed).length}개
                  </span>
                </div>

                <div className="space-y-2">
                  {area.items.filter(item => !item.completed).map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/5 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleComplete(item.id)}
                          disabled={!item.completed && dailyRemaining <= 0}
                          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors mt-0.5 ${
                            !item.completed && dailyRemaining <= 0
                              ? 'opacity-30 cursor-not-allowed'
                              : 'hover:bg-white/10'
                          }`}
                          style={{ borderColor: area.color }}
                        >
                          {item.completed && (
                            <Check className="w-5 h-5" style={{ color: area.color }} />
                          )}
                        </button>
                        <div className="flex-1">
                          <p className="text-white text-base leading-relaxed whitespace-pre-line">
                            {item.text}
                          </p>
                          {item.aiRecord && (
                            <p className="text-cyan-400/70 text-sm mt-1.5 whitespace-pre-line">
                              ✨ {item.aiRecord}
                            </p>
                          )}
                          {item.lessonTitle && (
                            <p className="text-sm mt-1" style={{ color: area.color }}>
                              📚 {item.lessonTitle}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2">
                            {item.photoUrl && (
                              <button
                                onClick={() => setViewPhotoUrl(item.photoUrl!)}
                                className="flex items-center gap-1 text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full hover:bg-blue-400/20 transition-colors"
                              >
                                <ImageIcon className="w-3 h-3" />
                                사진
                              </button>
                            )}
                            <p className="text-white/50 text-sm">
                              완료 시 +5 ⭐
                            </p>
                            {item.alarmTime ? (
                              <button
                                onClick={() => {
                                  setSelectedTime(item.alarmTime || '09:00')
                                  setAlarmModal(item.id)
                                }}
                                className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full"
                              >
                                <Bell className="w-3 h-3" />
                                {item.alarmTime}
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedTime('09:00')
                                  setAlarmModal(item.id)
                                }}
                                className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60"
                              >
                                <Bell className="w-3 h-3" />
                                알람
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-red-400/40 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* 실행 현황 그래프 */}
      {(() => {
        const worldCounts = GROWTH_AREAS.map(area => ({
          ...area,
          count: history.filter(r => r.worldKey === area.key).length,
        }))
        // 제곱근 스케일 + 기준점 1000: 5개는 바닥, 1000개에서야 꽉 참
        const maxRef = Math.max(...worldCounts.map(w => w.count), 1000)

        return (
          <div className="pt-2 pb-32 px-4">
            <div className="max-w-lg mx-auto">
              <div className="bg-white/5 rounded-2xl px-5 py-4 mt-2 relative">
                <div className="flex items-end justify-between gap-2" style={{ height: 110 }}>
                  {worldCounts.map((area, i) => {
                    const ratio = Math.sqrt(area.count) / Math.sqrt(maxRef)
                    const barHeight = area.count === 0 ? 4 : Math.max(ratio * 75, 6)

                    return (
                      <div key={area.key} className="flex-1 flex flex-col items-center gap-1">
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.08 + 0.3 }}
                          className="text-[13px] font-bold"
                          style={{ color: area.count > 0 ? area.color : 'rgba(255,255,255,0.2)' }}
                        >
                          {area.count}
                        </motion.span>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: barHeight, opacity: 1 }}
                          transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
                          className="w-full max-w-[32px] rounded-lg"
                          style={{
                            background: area.count === 0
                              ? 'rgba(255,255,255,0.05)'
                              : `linear-gradient(to top, ${area.color}30, ${area.color})`,
                          }}
                        />
                        <span className="text-[14px]">{area.icon}</span>
                      </div>
                    )
                  })}
                </div>

                {/* 매일 실행 아이콘 (오른쪽 위) */}
                {items.some(i => i.isDaily) && (
                  <>
                    <button
                      onClick={() => setShowDailyPanel(prev => !prev)}
                      className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 transition-colors"
                    >
                      <span className="text-xs">🔄</span>
                      <span className="text-[10px] text-emerald-400 font-medium">매일</span>
                      <span className="text-[10px] text-emerald-300 font-bold">
                        {items.filter(i => i.isDaily && i.completed && i.lastCompletedDate === getLocalDateStr()).length}
                        /{items.filter(i => i.isDaily).length}
                      </span>
                    </button>

                    {/* 매일 실행 패널 */}
                    <AnimatePresence>
                      {showDailyPanel && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-10 right-2 z-20 w-64 bg-slate-800 border border-emerald-500/20 rounded-xl p-3 shadow-2xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-emerald-400 font-semibold">🔄 매일 실행 항목</span>
                            <button onClick={() => setShowDailyPanel(false)} className="text-white/40 hover:text-white">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="space-y-1.5 max-h-40 overflow-y-auto">
                            {items.filter(i => i.isDaily).map(item => {
                              const todayDone = item.completed && item.lastCompletedDate === getLocalDateStr()
                              return (
                                <div key={item.id} className="flex items-center gap-2 py-1">
                                  {todayDone ? (
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                      <Check className="w-3 h-3 text-emerald-400" />
                                    </span>
                                  ) : (
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-white/20" />
                                  )}
                                  <span className={`flex-1 text-xs truncate ${todayDone ? 'text-white/40 line-through' : 'text-white/80'}`}>
                                    {item.text.split('\n').pop()?.replace('🚀 실행:', '') || item.text}
                                  </span>
                                  <button
                                    onClick={() => {
                                      const updated = items.map(i =>
                                        i.id === item.id ? { ...i, isDaily: undefined, lastCompletedDate: undefined } : i
                                      )
                                      saveItems(updated)
                                    }}
                                    className="flex-shrink-0 w-4 h-4 rounded-full hover:bg-red-500/20 flex items-center justify-center text-white/20 hover:text-red-400 transition-colors"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      })()}

      {/* 플로팅 추가 버튼 */}
      <div className="fixed bottom-24 right-4 z-40">
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="pointer-events-none"
            >
              {/* 펄스 링 */}
              <div className="absolute inset-0 -m-3 rounded-full border-2 border-violet-400/80 animate-ping" />
              <div className="absolute inset-0 -m-3 rounded-full border border-violet-400/40" />

              {/* 툴팁 */}
              <div className="absolute bottom-[calc(100%+16px)] right-0 w-64">
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-800/95 border border-violet-500/20 rounded-2xl p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-lg">✨</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">실행을 기록해보세요</p>
                      <p className="text-white/50 text-xs leading-relaxed">
                        보이지 않는 내 성장을<br />보이게 만들어 드릴게요
                      </p>
                    </div>
                  </div>
                  {/* 꼬리 화살표 */}
                  <div className="absolute -bottom-[6px] right-7 w-3 h-3 bg-slate-800 border-r border-b border-violet-500/20 rotate-45" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => {
            if (showOnboarding) {
              setShowOnboarding(false)
              localStorage.setItem('gillog-onboarding-checkin', 'true')
            }
            setAddStep('write')
          }}
          className={`relative z-10 w-14 h-14 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform ${showOnboarding ? 'shadow-violet-500/40 shadow-xl' : ''}`}
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* 투두 추가 모달 */}
      <AnimatePresence>
        {addStep !== 'closed' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAddStep('closed')}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-hidden"
            >
              <div className="bg-slate-800 rounded-t-3xl p-6 shadow-2xl border-t border-white/10 max-h-[80vh] overflow-y-auto">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold text-lg">
                    {addStep === 'write' && !aiMode && '✍️ 실행 계획 작성'}
                    {addStep === 'write' && aiMode && '✨ AI 기록 남기기'}
                    {addStep === 'selectWorld' && '🌍 월드 선택'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {addStep === 'write' && !aiMode && (
                      <>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoSelect}
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            photoFile
                              ? 'bg-green-500/20 border-green-500/30 text-green-400'
                              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" />
                          {photoFile ? '사진 ✓' : '사진'}
                        </button>
                        <button
                          onClick={() => setAiMode(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:from-cyan-500/30 hover:to-violet-500/30 transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          AI 기록
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { setAddStep('closed'); setAiMode(false) }}
                      className="text-white/50 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Step 1-A: AI 기록 모드 - 단일 메모장 */}
                {addStep === 'write' && aiMode && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setAiMode(false)}
                      className="text-white/50 text-sm flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      돌아가기
                    </button>

                    <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 rounded-xl p-3">
                      <p className="text-white/60 text-xs">
                        자유롭게 기록하세요. 배운점/느낀점/실행할점과 함께 저장됩니다.
                      </p>
                    </div>

                    <textarea
                      value={aiRecordText}
                      onChange={e => setAiRecordText(e.target.value)}
                      placeholder="AI 코칭에서 나눈 이야기, 떠오르는 생각 등을 자유롭게 적어주세요..."
                      rows={6}
                      className="w-full bg-white/5 border border-cyan-500/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 resize-none text-sm"
                      autoFocus
                    />

                    <button
                      onClick={() => setAiMode(false)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-bold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      기록 완료
                    </button>
                  </div>
                )}

                {/* Step 1-B: 직접 작성 모드 */}
                {addStep === 'write' && !aiMode && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs">📖</span>
                        배운 것
                        {isOcrLoading && (
                          <span className="flex items-center gap-1 text-cyan-400 text-xs font-normal">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            사진 텍스트 인식 중...
                          </span>
                        )}
                      </label>
                      <textarea
                        value={learnedText}
                        onChange={e => setLearnedText(e.target.value)}
                        placeholder="오늘 배운 내용을 적어주세요"
                        rows={Math.max(2, Math.min(learnedText.split('\n').length + 1, 8))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 resize-none text-sm"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">💭</span>
                        느낀 것
                      </label>
                      <textarea
                        value={feltText}
                        onChange={e => setFeltText(e.target.value)}
                        placeholder="느낀 점이나 깨달은 것을 적어주세요"
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 resize-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">⚡</span>
                        놓친 것, 방해하는 것, 규칙을 어긴 것
                      </label>
                      <textarea
                        value={missedText}
                        onChange={e => setMissedText(e.target.value)}
                        placeholder="실패를 기념하고 자원 삼아 기록하는 차원으로 실패 경험을 적어주세요"
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-rose-500/50 resize-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-white/80 text-sm font-medium mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-xs">🚀</span>
                        실행할 것
                        <span className="text-red-400 text-xs">*필수</span>
                      </label>
                      <p className="text-white/30 text-xs mb-2">내 보이지 않는 성장 기록을 위해 최대한 구체적으로 적어주세요</p>
                      <textarea
                        value={actionText}
                        onChange={e => setActionText(e.target.value)}
                        placeholder={actionPlaceholder}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 resize-none text-sm"
                      />
                    </div>

                    {/* 사진 미리보기 */}
                    {photoPreview && (
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="첨부 사진"
                          className="w-full max-h-40 object-cover rounded-xl border border-white/10"
                        />
                        <button
                          onClick={() => { setPhotoFile(null); setPhotoPreview(null) }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center"
                        >
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() => setAddStep('selectWorld')}
                      disabled={!actionText.trim()}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      다음: 월드 선택
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {/* Step 2: 월드 다중 선택 */}
                {addStep === 'selectWorld' && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setAddStep('write')}
                      className="text-white/50 text-sm mb-2 flex items-center gap-1"
                    >
                      ← 돌아가기
                    </button>

                    <p className="text-white/60 text-sm">
                      이 실행 계획을 어떤 월드에 추가할까요? (복수 선택 가능)
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {GROWTH_AREAS.map(area => {
                        const isSelected = selectedWorlds.includes(area.key)
                        return (
                          <button
                            key={area.key}
                            onClick={() => {
                              setSelectedWorlds(prev =>
                                isSelected
                                  ? prev.filter(k => k !== area.key)
                                  : [...prev, area.key]
                              )
                            }}
                            className={`p-4 rounded-xl border transition-all text-left ${
                              isSelected
                                ? 'bg-white/10 border-2'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                            }`}
                            style={isSelected ? { borderColor: area.color } : undefined}
                          >
                            <span className="text-2xl mb-2 block">{area.icon}</span>
                            <span className="text-white font-medium">{area.label}</span>
                            {isSelected && (
                              <span className="block mt-1 text-xs" style={{ color: area.color }}>
                                ✓ 선택됨
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* 미리보기 */}
                    {(learnedText.trim() || feltText.trim() || missedText.trim() || aiRecordText.trim() || photoPreview) && (
                      <div className="bg-white/5 rounded-xl p-3 space-y-1">
                        <p className="text-white/40 text-xs font-medium mb-2">미리보기</p>
                        {photoPreview && (
                          <img src={photoPreview} alt="" className="w-16 h-16 object-cover rounded-lg mb-2" />
                        )}
                        {learnedText.trim() && (
                          <p className="text-white/70 text-xs">📖 배운 것: {learnedText.trim()}</p>
                        )}
                        {feltText.trim() && (
                          <p className="text-white/70 text-xs">💭 느낀 것: {feltText.trim()}</p>
                        )}
                        {missedText.trim() && (
                          <p className="text-white/70 text-xs">⚡ 놓친 것: {missedText.trim()}</p>
                        )}
                        <p className="text-white/70 text-xs">🚀 실행:{actionText.trim()}</p>
                        {aiRecordText.trim() && (
                          <p className="text-cyan-400/70 text-xs">✨ AI 기록: {aiRecordText.trim()}</p>
                        )}
                      </div>
                    )}

                    <div className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/50 text-xs">
                        ⭐ 각 월드별로 투두가 생성됩니다 (완료 시 월드당 +5 에너지)
                      </p>
                    </div>

                    <button
                      onClick={handleAddTodo}
                      disabled={selectedWorlds.length === 0 || isUploading}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          사진 업로드 중...
                        </>
                      ) : selectedWorlds.length > 0
                        ? `${selectedWorlds.length}개 월드에 투두 추가하기`
                        : '월드를 선택해주세요'
                      }
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 알람 설정 모달 */}
      <AnimatePresence>
        {alarmModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAlarmModal(null)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-[30%] z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Bell className="w-5 h-5 text-yellow-400" />
                    알람 설정
                  </h3>
                  <button
                    onClick={() => setAlarmModal(null)}
                    className="text-white/50 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-white/10 text-white rounded-xl px-4 py-3 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/50 mb-4"
                />

                <div className="flex gap-2">
                  {items.find(i => i.id === alarmModal)?.alarmTime && (
                    <button
                      onClick={() => {
                        handleRemoveAlarm(alarmModal)
                        setAlarmModal(null)
                      }}
                      className="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-semibold"
                    >
                      삭제
                    </button>
                  )}
                  <button
                    onClick={() => handleSetAlarm(alarmModal)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold"
                  >
                    저장
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 보상 팝업 */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl px-8 py-6 text-center shadow-2xl"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 text-yellow-400" fill="currentColor" />
              <span className="text-3xl font-bold text-white">+5</span>
            </div>
            <p className="text-white/80">실행 완료!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 사진 보기 모달 */}
      <AnimatePresence>
        {viewPhotoUrl && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewPhotoUrl(null)}
              className="fixed inset-0 bg-black/80 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
            >
              <div className="relative max-w-lg w-full">
                <button
                  onClick={() => setViewPhotoUrl(null)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 backdrop-blur rounded-full flex items-center justify-center z-10"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <img
                  src={viewPhotoUrl}
                  alt="첨부 사진"
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 일일 제한 알림 */}
      <AnimatePresence>
        {showDailyLimit && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 border border-gray-700 rounded-xl px-5 py-3 text-center shadow-2xl"
          >
            <p className="text-sm text-gray-200 font-medium">오늘의 실행은 모두 완료했어요!</p>
            <p className="text-xs text-gray-400 mt-1">하루 최대 {DAILY_LIMIT}개까지 기록할 수 있습니다.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 무료 사용자 페이월 */}
      {subscriptionInfo.plan === 'free' && dailyRemaining <= 0 && !paywallDismissed && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50">
          <div className="w-full max-w-lg mx-auto relative">
            <button
              onClick={() => setPaywallDismissed(true)}
              className="absolute -top-2 right-6 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center z-10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <PaywallBanner />
            <button
              onClick={() => setPaywallDismissed(true)}
              className="w-full py-4 text-center text-gray-400 text-sm"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 도움말 모달 */}
      <AnimatePresence>
        {showTip && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTip(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-20 z-50 max-w-sm mx-auto"
            >
              <div className="bg-slate-800 rounded-2xl p-5 shadow-2xl border border-amber-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-white font-bold">목표 설정 팁</h3>
                  </div>
                  <button onClick={() => setShowTip(false)} className="text-white/40 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-amber-500/10 rounded-xl p-4 mb-4">
                  <p className="text-amber-300 font-medium text-sm text-center">
                    작은 실행들이 모여 성과를 만듭니다
                  </p>
                </div>

                <h4 className="text-white font-bold text-sm mb-3">SMART 기법으로 목표 세우기</h4>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">S</span>
                    <div>
                      <p className="text-white text-sm font-medium">Specific - 구체적으로</p>
                      <p className="text-white/40 text-xs">무엇을, 어떻게 할지 명확하게</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">M</span>
                    <div>
                      <p className="text-white text-sm font-medium">Measurable - 측정 가능하게</p>
                      <p className="text-white/40 text-xs">숫자나 기준으로 확인할 수 있게</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">A</span>
                    <div>
                      <p className="text-white text-sm font-medium">Achievable - 달성 가능하게</p>
                      <p className="text-white/40 text-xs">노력하면 이룰 수 있는 수준으로</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-400">R</span>
                    <div>
                      <p className="text-white text-sm font-medium">Relevant - 의미 있게</p>
                      <p className="text-white/40 text-xs">나에게 중요한 목표인지 확인</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-xs font-bold text-rose-400">T</span>
                    <div>
                      <p className="text-white text-sm font-medium">Time-bound - 기한을 정해서</p>
                      <p className="text-white/40 text-xs">언제까지 달성할지 정하기</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/5 rounded-xl p-3">
                  <p className="text-white/40 text-xs">
                    예시: &quot;이번 달 안에 매일 30분 영어 공부하기&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-lg border-t border-white/5">
        <div className="flex justify-around py-2">
          <TabItem href="/checkin" icon="⭐" label="실행" active />
          <TabItem href="/coaching" icon="💬" label="코칭" />
          <TabItem href="/app" icon="🗺️" label="월드" />
          <TabItem href="/dashboard" icon="📊" label="리포트" />
        </div>
        <div className="h-safe-area-inset-bottom" />
      </nav>
    </main>
  )
}

function TabItem({
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
        flex flex-col items-center gap-0.5 px-5 py-2.5 rounded-xl transition-colors min-w-[56px]
        ${active
          ? 'text-white'
          : 'text-white/40 hover:text-white/60'
        }
      `}
    >
      <span className="text-[22px]">{icon}</span>
      <span className={`text-[11px] font-semibold ${active ? 'text-white' : 'text-white/50'}`}>
        {label}
      </span>
    </Link>
  )
}

export default function ExecutionPage() {
  return (
    <AuthGuard>
      <ExecutionContent />
    </AuthGuard>
  )
}
