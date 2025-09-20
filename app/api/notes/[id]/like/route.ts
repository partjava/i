import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery, ensureTableExists } from '@/lib/database'

// 点赞表SQL
const NOTE_LIKES_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS note_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (note_id, user_id),
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`;

// 点赞笔记
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

    // 创建点赞表（如果不存在）
    await ensureTableExists('note_likes', NOTE_LIKES_TABLE_SQL);

    // 检查是否已经点赞
    const existing = await executeQuery(
      'SELECT id FROM note_likes WHERE note_id = ? AND user_id = ?',
      [noteId, userId]
    ) as any[]

    if (existing.length > 0) {
      return NextResponse.json(
        { error: '已经点赞过了' },
        { status: 400 }
      )
    }

    // 添加点赞
    await executeQuery(
      'INSERT INTO note_likes (note_id, user_id) VALUES (?, ?)',
      [noteId, userId]
    )

    // 获取总点赞数
    const likeCount = await executeQuery(
      'SELECT COUNT(*) as count FROM note_likes WHERE note_id = ?',
      [noteId]
    ) as any[]

    return NextResponse.json({ 
      message: '点赞成功',
      likeCount: likeCount[0].count
    })

  } catch (error) {
    console.error('点赞失败:', error)
    return NextResponse.json(
      { error: '点赞失败' },
      { status: 500 }
    )
  }
}

// 取消点赞
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

    // 删除点赞
    await executeQuery(
      'DELETE FROM note_likes WHERE note_id = ? AND user_id = ?',
      [noteId, userId]
    )

    // 获取总点赞数
    const likeCount = await executeQuery(
      'SELECT COUNT(*) as count FROM note_likes WHERE note_id = ?',
      [noteId]
    ) as any[]

    return NextResponse.json({ 
      message: '取消点赞成功',
      likeCount: likeCount[0].count
    })

  } catch (error) {
    console.error('取消点赞失败:', error)
    return NextResponse.json(
      { error: '取消点赞失败' },
      { status: 500 }
    )
  }
} 