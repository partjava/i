import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery, ensureTableExists } from '@/lib/database'

// 收藏表SQL
const NOTE_BOOKMARKS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS note_bookmarks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_bookmark (note_id, user_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

// 收藏笔记
export async function POST(
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

    const noteId = parseInt(params.id)
    const userId = parseInt(session.user.id)

    // 创建收藏表（如果不存在）
    await ensureTableExists('note_bookmarks', NOTE_BOOKMARKS_TABLE_SQL);

    // 检查是否已经收藏
    const existing = await executeQuery(
      'SELECT id FROM note_bookmarks WHERE note_id = ? AND user_id = ?',
      [noteId, userId]
    ) as any[]

    if (existing.length > 0) {
      return NextResponse.json(
        { error: '已经收藏过了' },
        { status: 400 }
      )
    }

    // 添加收藏
    await executeQuery(
      'INSERT INTO note_bookmarks (note_id, user_id) VALUES (?, ?)',
      [noteId, userId]
    )

    // 获取总收藏数
    const bookmarkCount = await executeQuery(
      'SELECT COUNT(*) as count FROM note_bookmarks WHERE note_id = ?',
      [noteId]
    ) as any[]

    return NextResponse.json({ 
      message: '收藏成功',
      bookmarkCount: bookmarkCount[0].count
    })

  } catch (error) {
    console.error('收藏失败:', error)
    return NextResponse.json(
      { error: '收藏失败' },
      { status: 500 }
    )
  }
}

// 取消收藏
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

    const noteId = parseInt(params.id)
    const userId = parseInt(session.user.id)

    // 删除收藏
    await executeQuery(
      'DELETE FROM note_bookmarks WHERE note_id = ? AND user_id = ?',
      [noteId, userId]
    )

    // 获取总收藏数
    const bookmarkCount = await executeQuery(
      'SELECT COUNT(*) as count FROM note_bookmarks WHERE note_id = ?',
      [noteId]
    ) as any[]

    return NextResponse.json({ 
      message: '取消收藏成功',
      bookmarkCount: bookmarkCount[0].count
    })

  } catch (error) {
    console.error('取消收藏失败:', error)
    return NextResponse.json(
      { error: '取消收藏失败' },
      { status: 500 }
    )
  }
} 