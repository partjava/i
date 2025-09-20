import { NextRequest } from 'next/server'
import { CommentService } from '@/app/lib/services/CommentService'
import { handleApiError, createSuccessResponse, createErrorResponse } from '@/app/lib/api/middleware'
import { validateRequiredFields } from '@/app/lib/api/utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

const commentService = new CommentService()

// 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return createErrorResponse('请先登录', undefined, 401)
    }

    const { searchParams } = request.nextUrl
    const noteId = searchParams.get('noteId')

    if (!noteId) {
      return createErrorResponse('缺少noteId参数')
    }

    const noteIdNum = parseInt(noteId, 10)
    if (isNaN(noteIdNum)) {
      return createErrorResponse('笔记ID无效')
    }

    const comments = await commentService.getCommentsByNoteId(noteIdNum)
    return createSuccessResponse({ comments })

  } catch (error) {
    return handleApiError(error)
  }
}

// 发布评论
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
    
    const validationError = validateRequiredFields(body, ['noteId', 'content'])
    if (validationError) {
      return createErrorResponse(validationError)
    }

    const { noteId, content, parentId } = body

    const commentId = await commentService.createComment(
      parseInt(noteId),
      userId,
      content,
      parentId ? parseInt(parentId) : undefined
    )

    return createSuccessResponse({ commentId }, '评论发布成功')

  } catch (error) {
    return handleApiError(error)
  }
}