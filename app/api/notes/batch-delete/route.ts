import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { executeQuery } from '@/app/lib/database'
import { createSuccessResponse, createErrorResponse } from '@/app/lib/api/utils'

// 批量删除笔记
export async function POST(request: NextRequest) {
  try {
    // 检查用户是否已登录
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return createErrorResponse('请先登录', undefined, 401)
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return createErrorResponse('用户ID无效')
    }

    // 获取要删除的笔记ID列表
    const body = await request.json()
    const { noteIds } = body

    if (!noteIds || !Array.isArray(noteIds) || noteIds.length === 0) {
      return createErrorResponse('请提供要删除的笔记ID列表')
    }

    // 将所有ID转换为数字
    const numericIds = noteIds.map(id => {
      const numId = parseInt(id.toString(), 10)
      return isNaN(numId) ? null : numId
    }).filter(id => id !== null)

    if (numericIds.length === 0) {
      return createErrorResponse('没有有效的笔记ID')
    }

    // 检查这些笔记是否都属于当前用户
    const placeholders = numericIds.map(() => '?').join(',')
    const checkQuery = `SELECT id FROM notes WHERE id IN (${placeholders}) AND author_id = ?`
    const checkParams = [...numericIds, userId]
    
    const foundNotes = await executeQuery(checkQuery, checkParams) as any[]
    
    if (!foundNotes || foundNotes.length === 0) {
      return createErrorResponse('没有找到可删除的笔记')
    }

    if (foundNotes.length < numericIds.length) {
      console.warn(`请求删除 ${numericIds.length} 篇笔记，但只找到 ${foundNotes.length} 篇属于该用户的笔记`)
    }

    // 获取实际可以删除的笔记ID
    const validNoteIds = foundNotes.map(note => note.id)
    
    // 执行批量删除
    const deleteQuery = `DELETE FROM notes WHERE id IN (${validNoteIds.map(() => '?').join(',')}) AND author_id = ?`
    const deleteParams = [...validNoteIds, userId]
    
    const result = await executeQuery(deleteQuery, deleteParams) as any
    
    return createSuccessResponse({
      deletedCount: result.affectedRows || 0
    }, `成功删除 ${result.affectedRows || 0} 篇笔记`)

  } catch (error) {
    console.error('批量删除笔记失败:', error)
    return createErrorResponse('删除笔记失败', undefined, 500)
  }
}
