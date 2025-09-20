export const dynamic = 'force-dynamic'
import { NextRequest } from 'next/server'
import { NoteService } from '../../lib/services/NoteService'
import { createSuccessResponse, createErrorResponse } from '../../lib/api/utils'

const noteService = new NoteService()

// 获取公开笔记列表 - 无需登录验证
export async function GET(request: NextRequest) {
  try {
    console.log('公开笔记API被调用')
    
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
      console.log('调用noteService.getPublicNotes')
      const result = await noteService.getPublicNotes({ page, limit })
      console.log('获取公开笔记成功:', { 
        noteCount: result.data?.length || 0,
        pagination: result.pagination
      })
      
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
    console.error('公开笔记API错误:', error)
    return createErrorResponse('服务器内部错误', undefined, 500)
  }
}
