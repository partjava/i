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
        currentPageCount: result.data?.length || 0,
        totalPublicNotes: result.pagination?.total || 0,
        pagination: result.pagination
      })
      
      // 为未登录用户返回公开笔记，但不显示总笔记数量
      // 这样可以避免新用户看到所有笔记的总数并误认为是自己的笔记
      const paginationData = result.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false
      };
      
      // 返回完整的笔记数据和分页信息
      return createSuccessResponse({
        notes: result.data || [],
        pagination: paginationData
      })
    } catch (error) {
      console.error('获取公开笔记失败:', error)
      // 返回空结果集而不是错误，避免前端崩溃
      // 返回空结果集
      return createSuccessResponse({
        notes: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 1, // 至少显示一页
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
