import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAPI } from '@/lib/admin-auth'
import { prisma } from '@/lib/db'

// ========================================
// GET /api/admin/ai-engine/recommendations
// 활성 추천 목록 (필터: dimension, priority, active)
// ========================================

export async function GET(request: NextRequest) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const dimension = searchParams.get('dimension')
    const priority = searchParams.get('priority')
    const active = searchParams.get('active') !== 'false' // 기본 true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = { isActive: active }
    if (dimension) where.dimension = dimension
    if (priority) where.priority = priority

    const recommendations = await prisma.aiRecommendation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    })

    return NextResponse.json({
      recommendations: recommendations.map(r => ({
        id: r.id,
        userId: r.userId,
        userName: r.user.name ?? r.user.email,
        dimension: r.dimension,
        dimensionScore: r.dimensionScore,
        type: r.type,
        priority: r.priority,
        title: r.title,
        description: r.description,
        resourceUrl: r.resourceUrl,
        isActive: r.isActive,
        resolvedAt: r.resolvedAt?.toISOString() ?? null,
        resolvedBy: r.resolvedBy,
        createdAt: r.createdAt.toISOString(),
      })),
      total: recommendations.length,
    })
  } catch (error) {
    console.error('GET /api/admin/ai-engine/recommendations error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}

// ========================================
// PATCH /api/admin/ai-engine/recommendations
// 추천 해결 처리
// ========================================

export async function PATCH(request: NextRequest) {
  const session = await requireAdminAPI()
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const updated = await prisma.aiRecommendation.update({
      where: { id },
      data: {
        isActive: false,
        resolvedAt: new Date(),
        resolvedBy: 'admin',
      },
    })

    return NextResponse.json({ success: true, id: updated.id })
  } catch (error) {
    console.error('PATCH /api/admin/ai-engine/recommendations error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: 'Internal Server Error', detail: message }, { status: 500 })
  }
}
