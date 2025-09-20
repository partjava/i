import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

// 删除笔记
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const noteId = parseInt(params.id, 10)
    if (isNaN(noteId)) {
      return NextResponse.json(
        { error: '笔记ID无效' },
        { status: 400 }
      )
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json(
        { error: '用户ID无效' },
        { status: 400 }
      )
    }

    // 检查笔记是否存在且属于当前用户
    const notes = await executeQuery(
      'SELECT id, author_id FROM notes WHERE id = ?',
      [noteId]
    ) as any[]

    if (notes.length === 0) {
      return NextResponse.json(
        { error: '笔记不存在' },
        { status: 404 }
      )
    }

    if (notes[0].author_id !== userId) {
      return NextResponse.json(
        { error: '无权删除此笔记' },
        { status: 403 }
      )
    }

    // 删除笔记
    await executeQuery(
      'DELETE FROM notes WHERE id = ? AND author_id = ?',
      [noteId, userId]
    )

    return NextResponse.json({
      success: true,
      message: '笔记删除成功'
    })

  } catch (error) {
    console.error('删除笔记失败:', error)
    return NextResponse.json(
      { error: '删除笔记失败' },
      { status: 500 }
    )
  }
}

// 获取单个笔记
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const noteId = parseInt(params.id, 10)
    if (isNaN(noteId)) {
      return NextResponse.json(
        { error: '笔记ID无效' },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)

    let query = `
      SELECT n.id, n.title, n.content, n.category, n.technology, n.subcategory, n.tags, 
             n.is_public, n.created_at, n.updated_at, n.author_id, u.name as author_name
      FROM notes n
      JOIN users u ON n.author_id = u.id
      WHERE n.id = ?
    `

    if (!session?.user?.id) {
      // 未登录用户只能查看公开笔记
      query += ' AND n.is_public = true'
    } else {
      // 已登录用户可以查看自己的笔记或公开笔记
      const userId = parseInt(session.user.id, 10)
      query += ` AND (n.is_public = true OR n.author_id = ?)`
    }

    const queryParams = [noteId]
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10)
      queryParams.push(userId)
    }

    const notes = await executeQuery(query, queryParams) as any[]

    if (notes.length === 0) {
      return NextResponse.json(
        { error: '笔记不存在或无权访问' },
        { status: 404 }
      )
    }

    const note = notes[0]

    // 处理tags字段
    let tags = []
    try {
      if (note.tags) {
        if (Array.isArray(note.tags)) {
          tags = note.tags
        } else if (typeof note.tags === 'string' && note.tags.trim()) {
          tags = JSON.parse(note.tags)
          if (!Array.isArray(tags)) {
            tags = []
          }
        }
      }
    } catch (e) {
      tags = []
    }

    return NextResponse.json({
      success: true,
      note: {
        id: note.id,
        _id: note.id.toString(),
        title: note.title,
        content: note.content,
        category: note.category,
        technology: note.technology,
        subcategory: note.subcategory,
        tags: tags,
        isPublic: Boolean(note.is_public),
        authorId: note.author_id,
        authorName: note.author_name,
        createdAt: note.created_at,
        updatedAt: note.updated_at
      }
    })

  } catch (error) {
    console.error('获取笔记失败:', error)
    return NextResponse.json(
      { error: '获取笔记失败' },
      { status: 500 }
    )
  }
}