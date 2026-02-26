import { NextResponse } from 'next/server'
import { requireCoachAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'
import {
  HINT_GROUPS,
  pickSafeWordsWithGroup,
  getTopWordsByGroups,
  joinWords,
} from '@/lib/b2b/safeWords'

interface ExecutionRecord {
  id: string
  date: string
  completedAt: string
  worldKey: string
  areaKey: string
  lessonTitle?: string
  executionText: string
  energy: number
}

const WORLD_LABELS: Record<string, string> = {
  cognition: '학습',
  selfDirected: '자기주도',
  habit: '습관',
  attitude: '태도',
  relationship: '관계',
  character: '인성',
}

export async function GET(request: Request) {
  const coachResult = await requireCoachAPI()
  if (!coachResult) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const milestone = parseInt(searchParams.get('milestone') || '5') || 5

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 })
  }

  const consent = await prisma.dataConsent.findFirst({
    where: { userId, coachEmail: coachResult.coachEmail, status: 'APPROVED' },
  })
  if (!consent) {
    return NextResponse.json({ error: 'Data consent not approved' }, { status: 403 })
  }

  try {
    const [userData, checkins] = await Promise.all([
      prisma.userData.findUnique({
        where: { userId },
        select: { history: true },
      }),
      prisma.checkin.findMany({
        where: { userId },
        select: { mood: true, note: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
      }),
    ])

    const history = (userData?.history as unknown as ExecutionRecord[]) || []
    const sorted = [...history]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())

    // 최근 2주 데이터 종합 (전체 월드)
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    const recentRecords = sorted.filter(
      (r) => new Date(r.completedAt) >= twoWeeksAgo
    )
    // 2주 내 데이터가 부족하면 마일스톤 기준으로 폴백
    const pool = recentRecords.length >= 3 ? recentRecords : sorted.slice(0, milestone)

    if (pool.length === 0) {
      return NextResponse.json({
        learning: '실행 기록이 아직 없습니다.',
        relationship: '실행 기록이 아직 없습니다.',
        attitude: '실행 기록이 아직 없습니다.',
      })
    }

    // ── 발전 분석: 전반부 vs 후반부 비교 ──
    const halfIdx = Math.floor(pool.length / 2)
    const firstHalf = pool.slice(halfIdx)   // 이전 기록 (오래된 쪽)
    const secondHalf = pool.slice(0, halfIdx) // 최근 기록

    // 글 깊이 변화
    const firstAvgLen = firstHalf.filter((r) => r.executionText).length > 0
      ? firstHalf.reduce((s, r) => s + (r.executionText?.length || 0), 0) / firstHalf.filter((r) => r.executionText).length
      : 0
    const secondAvgLen = secondHalf.filter((r) => r.executionText).length > 0
      ? secondHalf.reduce((s, r) => s + (r.executionText?.length || 0), 0) / secondHalf.filter((r) => r.executionText).length
      : 0
    const textGrowing = secondAvgLen > firstAvgLen * 1.2  // 20% 이상 길어짐
    const textDeep = secondAvgLen >= 60

    // 월드 다양성 변화
    const firstWorlds = new Set(firstHalf.map((r) => r.worldKey))
    const secondWorlds = new Set(secondHalf.map((r) => r.worldKey))
    const newWorlds = [...secondWorlds].filter((w) => !firstWorlds.has(w))
    const worldExpanding = newWorlds.length > 0

    // 에너지 변화
    const firstEnergy = firstHalf.length > 0
      ? firstHalf.reduce((s, r) => s + (r.energy || 0), 0) / firstHalf.length : 0
    const secondEnergy = secondHalf.length > 0
      ? secondHalf.reduce((s, r) => s + (r.energy || 0), 0) / secondHalf.length : 0
    const energyUp = secondEnergy > firstEnergy + 0.3

    // 연속 실행 여부
    const activeDates = new Set(pool.map((r) => r.date))
    const sortedDates = [...activeDates].sort().reverse()
    let streak = 0
    if (sortedDates.length > 0) {
      streak = 1
      for (let i = 0; i < sortedDates.length - 1; i++) {
        const curr = new Date(sortedDates[i])
        const next = new Date(sortedDates[i + 1])
        const diff = Math.floor((curr.getTime() - next.getTime()) / (1000 * 60 * 60 * 24))
        if (diff === 1) streak++
        else break
      }
    }

    // 월드별 분포
    const worldCounts: Record<string, number> = {}
    pool.forEach((r) => { worldCounts[r.worldKey] = (worldCounts[r.worldKey] || 0) + 1 })
    const topWorldNames = Object.entries(worldCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key]) => WORLD_LABELS[key] || key)

    // 체크인
    const recentCheckins = checkins.filter((c) => new Date(c.createdAt) >= twoWeeksAgo)
    const moodPool = recentCheckins.length >= 3 ? recentCheckins : checkins.slice(0, 10)
    const avgMood = moodPool.length > 0
      ? moodPool.reduce((s, c) => s + c.mood, 0) / moodPool.length : 0

    // 전체 텍스트 풀
    const allTexts = pool.filter((r) => r.executionText?.length >= 5).map((r) => r.executionText)
    const noteTexts = recentCheckins.filter((c) => c.note && c.note.length >= 5).map((c) => c.note!)
    const allPool = [...allTexts, ...noteTexts]

    // 영역별 안전 단어 추출
    const relationWords = getTopWordsByGroups(allPool, HINT_GROUPS.relationship, 3)
    const attitudeWords = getTopWordsByGroups(allPool, HINT_GROUPS.attitude, 3)

    // ═══ 학습 영역 힌트 (과목+활동 조합) ═══
    // 1) 텍스트마다 과목(subject)과 활동(activity)을 함께 추출
    const subjectActivity = new Map<string, { activities: Set<string>; count: number; totalLen: number }>()
    const standaloneActivities = new Map<string, number>() // 과목 없이 활동만 나온 경우

    for (const text of allTexts) {
      const words = pickSafeWordsWithGroup(text)
      const subjects = words.filter((w) => w.group === 'subject').map((w) => w.label)
      const activities = words.filter((w) => ['activity', 'hobby'].includes(w.group)).map((w) => w.label)

      if (subjects.length > 0) {
        for (const subj of subjects) {
          if (!subjectActivity.has(subj)) {
            subjectActivity.set(subj, { activities: new Set(), count: 0, totalLen: 0 })
          }
          const entry = subjectActivity.get(subj)!
          entry.count++
          entry.totalLen += text.length
          activities.forEach((a) => entry.activities.add(a))
        }
      } else if (activities.length > 0) {
        // 과목 없이 독서, 글쓰기 등 단독 활동
        for (const act of activities) {
          standaloneActivities.set(act, (standaloneActivities.get(act) || 0) + 1)
        }
      }
    }

    // 2) 과목별 서술 생성 (빈도순)
    const subjectRanking = [...subjectActivity.entries()]
      .sort((a, b) => b[1].count - a[1].count)
    const activityRanking = [...standaloneActivities.entries()]
      .sort((a, b) => b[1] - a[1])

    const lParts: string[] = []

    for (const [subject, data] of subjectRanking.slice(0, 2)) {
      const acts = [...data.activities]
      const avgLen = Math.round(data.totalLen / data.count)
      let desc = subject

      // 과목 + 활동 조합
      if (acts.length > 0) {
        desc += ` ${acts.slice(0, 2).join(', ')}`
      }

      // 깊이 판단
      if (avgLen >= 80) {
        lParts.push(`${desc}에 집중하고 있으며, 기록 내용이 상세해 깊이 있게 학습하고 있는 모습입니다.`)
      } else if (data.count >= 3) {
        lParts.push(`${desc}를 꾸준히 반복하며 실력을 다져가고 있습니다.`)
      } else {
        lParts.push(`${desc}에 관심을 보이며 학습을 시작하고 있습니다.`)
      }
    }

    // 3) 단독 활동 (독서, 글쓰기 등)
    for (const [activity, count] of activityRanking.slice(0, subjectRanking.length >= 2 ? 1 : 2)) {
      if (count >= 3) {
        lParts.push(`${activity}를 즐겨 하고 있어 자기주도적 학습 태도가 잘 형성되고 있습니다.`)
      } else if (count >= 2) {
        lParts.push(`${activity}를 통해 학습의 폭을 넓혀가고 있습니다.`)
      } else {
        lParts.push(`${activity} 활동도 경험하고 있습니다.`)
      }
    }

    // 4) 발전 상황
    if (textGrowing) {
      lParts.push(`최근 기록이 점점 풍부해지고 있어 사고력과 표현력이 함께 발전하고 있습니다.`)
    } else if (textDeep) {
      lParts.push(`자신의 학습 경험을 상세히 돌아보며 성찰하는 능력이 돋보입니다.`)
    }
    if (worldExpanding) {
      const newWorldName = WORLD_LABELS[newWorlds[0]] || newWorlds[0]
      lParts.push(`최근 ${newWorldName} 영역으로 관심을 넓혀가고 있어 학습 범위가 확장되고 있습니다.`)
    }

    // 5) 아무것도 없을 때
    if (lParts.length === 0) {
      if (topWorldNames.length > 0) {
        lParts.push(`${topWorldNames.join(', ')} 영역에서 활동하고 있으며 학습 경험을 쌓아가고 있습니다.`)
      } else {
        lParts.push('학습 관련 실행 기록이 아직 충분하지 않습니다.')
      }
    }
    const learningHint = lParts.join(' ')

    // ═══ 관계 영역 힌트 ═══
    const rParts: string[] = []
    if (relationWords.length > 0) {
      rParts.push(`${joinWords(relationWords)}과 관련된 활동을 경험하고 있습니다.`)
    }
    const hasRelWorld = (worldCounts['relationship'] || 0) + (worldCounts['character'] || 0) > 0
    if (hasRelWorld) {
      rParts.push(`관계·인성 영역에서 꾸준히 실행하고 있으며, 타인과의 상호작용에 관심을 기울이고 있습니다.`)
    }
    if (noteTexts.length > 0) {
      const noteRelWords = getTopWordsByGroups(noteTexts, ['relation'], 2)
      if (noteRelWords.length > 0) {
        rParts.push(`체크인에서도 ${joinWords(noteRelWords)}에 대해 스스로 돌아보는 모습이 나타납니다.`)
      }
    }
    if (energyUp) {
      rParts.push(`최근 활동 에너지가 높아지고 있어 주변과의 교류에 더 적극적인 흐름입니다.`)
    } else if (secondEnergy >= 4) {
      rParts.push(`활력 있는 상태로 활동하고 있어 또래와의 관계에서도 긍정적인 영향이 기대됩니다.`)
    } else if (secondEnergy < 3 && secondEnergy > 0) {
      rParts.push(`최근 에너지가 다소 낮은 편이어서, 편안한 관계 속에서 회복할 수 있도록 지지해주면 좋겠습니다.`)
    }
    if (rParts.length === 0) {
      rParts.push('관계 영역 관련 실행 기록이 아직 충분하지 않습니다.')
    }
    const relationshipHint = rParts.join(' ')

    // ═══ 태도 영역 힌트 ═══
    const aParts: string[] = []
    if (attitudeWords.length > 0) {
      aParts.push(`${joinWords(attitudeWords)}을 직접 실천하며 행동으로 옮기고 있습니다.`)
    }
    if (streak >= 5) {
      aParts.push(`연속으로 실행을 이어가고 있어 자기관리 능력이 크게 성장하고 있습니다.`)
    } else if (streak >= 3) {
      aParts.push(`꾸준히 실행을 이어가며 일관성 있는 태도가 자리잡아가고 있습니다.`)
    } else if (pool.length >= 3) {
      aParts.push(`자기 페이스에 맞춰 실행을 지속하고 있습니다.`)
    }
    if (avgMood >= 4) {
      aParts.push(`정서적으로 밝고 안정된 흐름 속에서 활동하고 있어, 긍정적인 태도가 잘 유지되고 있습니다.`)
    } else if (avgMood >= 3) {
      aParts.push(`비교적 안정된 정서 상태에서 활동을 이어가고 있습니다.`)
    } else if (avgMood > 0) {
      aParts.push(`감정 변화를 겪고 있는 시기이며, 따뜻한 격려와 공감이 도움이 될 수 있습니다.`)
    }
    if (worldExpanding && attitudeWords.length === 0) {
      aParts.push(`새로운 영역에 도전하는 모습에서 성장하려는 의지가 엿보입니다.`)
    }
    if (aParts.length === 0) {
      aParts.push('태도 영역 관련 실행 기록이 아직 충분하지 않습니다.')
    }
    const attitudeHint = aParts.join(' ')

    return NextResponse.json({
      learning: learningHint,
      relationship: relationshipHint,
      attitude: attitudeHint,
    })
  } catch (error) {
    console.error('GET /api/b2b/comment-hints error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
