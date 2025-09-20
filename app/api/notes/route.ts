export const dynamic = 'force-dynamic'
import { NextRequest } from 'next/server'
import { NoteService } from '@/app/lib/services/NoteService'
import { handleApiError, createSuccessResponse, createErrorResponse } from '@/app/lib/api/middleware'
import { validateRequiredFields } from '@/app/lib/api/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const noteService = new NoteService()

// 获取笔记列表
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10)
      if (isNaN(userId)) {
        return createErrorResponse('用户ID无效')
      }

      const { searchParams } = request.nextUrl
      const page = parseInt(searchParams.get('page') || '1')
      const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)

      if (page < 1) {
        return createErrorResponse('页码必须大于0')
      }
      if (limit < 1 || limit > 100) {
        return createErrorResponse('每页数量必须在1-100之间')
      }

      const result = await noteService.getUserNotes(userId, { page, limit })
      return createSuccessResponse({
        notes: result.data || [],
        pagination: result.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      })
    }

    // 未登录用户获取公开笔记
    const { searchParams } = request.nextUrl
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100)

    if (page < 1) {
      return createErrorResponse('页码必须大于0')
    }
    if (limit < 1 || limit > 100) {
      return createErrorResponse('每页数量必须在1-100之间')
    }

    try {
      const result = await noteService.getPublicNotes({ page, limit })
      return createSuccessResponse({
        notes: result.data || [],
        pagination: result.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      })
    } catch (error) {
      console.error('获取公开笔记失败:', error)
      // 返回空结果集而不是错误，避免前端崩溃
      return createSuccessResponse({
        notes: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false
        }
      })
    }

  } catch (error) {
    return handleApiError(error)
  }
}

// 创建新笔记
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return createErrorResponse('请先登录', undefined, 401)
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return createErrorResponse('用户ID无效')
    }

    const body = await request.json()
    
    const validationError = validateRequiredFields(body, ['title', 'content'])
    if (validationError) {
      return createErrorResponse(validationError)
    }

    const noteId = await noteService.createNote(body, userId)
    return createSuccessResponse({ noteId }, '笔记创建成功')

  } catch (error) {
    return handleApiError(error)
  }
}
