export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { executeQuery } from '@/app/lib/database'
import { handleApiError, createSuccessResponse, createErrorResponse } from '@/app/lib/api/middleware'

// 用户学习追踪
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return createErrorResponse('请先登录', undefined, 401)
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return createErrorResponse('用户ID无效', undefined, 400)
    }

    const body = await request.json()
    const { activity, points = 1, category = 'general' } = body

    if (!activity || typeof activity !== 'string' || activity.trim() === '') {
      return createErrorResponse('活动名称不能为空', undefined, 400)
    }

    if (typeof points !== 'number' || points < 0) {
      return createErrorResponse('积分必须是非负数', undefined, 400)
    }

    if (typeof category !== 'string' || category.trim() === '') {
      return createErrorResponse('分类不能为空', undefined, 400)
    }

    // 记录学习活动
    await executeQuery(
      'INSERT INTO learning_stats (user_id, activity, points, category, created_at) VALUES (?, ?, ?, ?, NOW())',
      [userId, activity.trim(), points, category.trim()]
    )

    return createSuccessResponse(null, '学习记录已保存')

  } catch (error) {
    return handleApiError(error)
  }
}