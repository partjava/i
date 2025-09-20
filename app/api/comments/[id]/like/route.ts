import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

// 点赞评论
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

    const commentId = parseInt(params.id)
    const userId = parseInt(session.user.id)

    // 创建评论点赞表（如果不存在）
    try {
      await executeQuery(`
        CREATE TABLE IF NOT EXISTS comment_likes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          comment_id INT NOT NULL,
          user_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_comment_like (comment_id, user_id),
          FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `)
    } catch (tableError) {
      console.log('评论点赞表可能已存在:', tableError)
    }

    // 检查是否已经点赞
    const existing = await executeQuery(
      'SELECT id FROM comment_likes WHERE comment_id = ? AND user_id = ?',
      [commentId, userId]
    ) as any[]

    if (existing.length > 0) {
      return NextResponse.json(
        { error: '已经点赞过了' },
        { status: 400 }
      )
    }

    // 添加点赞
    await executeQuery(
      'INSERT INTO comment_likes (comment_id, user_id) VALUES (?, ?)',
      [commentId, userId]
    )

    // 获取总点赞数
    const likeCount = await executeQuery(
      'SELECT COUNT(*) as count FROM comment_likes WHERE comment_id = ?',
      [commentId]
    ) as any[]

    return NextResponse.json({ 
      message: '点赞成功',
      likeCount: likeCount[0].count
    })

  } catch (error) {
    console.error('点赞评论失败:', error)
    return NextResponse.json(
      { error: '点赞失败' },
      { status: 500 }
    )
  }
}

// 取消点赞评论
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

    const commentId = parseInt(params.id)
    const userId = parseInt(session.user.id)

    // 删除点赞
    await executeQuery(
      'DELETE FROM comment_likes WHERE comment_id = ? AND user_id = ?',
      [commentId, userId]
    )

    // 获取总点赞数
    const likeCount = await executeQuery(
      'SELECT COUNT(*) as count FROM comment_likes WHERE comment_id = ?',
      [commentId]
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
