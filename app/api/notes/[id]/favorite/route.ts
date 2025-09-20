import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

// 使用note_bookmarks表代替favorites表
async function ensureBookmarksTableExists() {
  try {
    // 检查表是否存在
    const result = await executeQuery(
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'note_bookmarks'"
    ) as any[];
    
    if (result[0].count === 0) {
      console.log('注意: note_bookmarks表不存在，请确保已运行数据库初始化脚本');
    }
  } catch (error) {
    console.log('检查note_bookmarks表失败:', error);
  }
}

// 添加或取消收藏
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
    if (isNaN(noteId)) {
      return NextResponse.json(
        { error: '无效的笔记ID' },
        { status: 400 }
      )
    }

    await ensureBookmarksTableExists()

    // 检查笔记是否存在
    const note = await executeQuery(
      'SELECT id FROM notes WHERE id = ?',
      [noteId]
    ) as any[]

    if (note.length === 0) {
      return NextResponse.json(
        { error: '笔记不存在' },
        { status: 404 }
      )
    }

    const userId = parseInt(session.user.id)

    // 检查是否已收藏
    const existingFavorite = await executeQuery(
      'SELECT id FROM note_bookmarks WHERE user_id = ? AND note_id = ?',
      [userId, noteId]
    ) as any[]

    if (existingFavorite.length > 0) {
      // 取消收藏
      await executeQuery(
        'DELETE FROM note_bookmarks WHERE user_id = ? AND note_id = ?',
        [userId, noteId]
      )
      return NextResponse.json({ 
        message: '已取消收藏',
        isFavorited: false 
      })
    } else {
      // 添加收藏
      await executeQuery(
        'INSERT INTO note_bookmarks (user_id, note_id) VALUES (?, ?)',
        [userId, noteId]
      )
      return NextResponse.json({ 
        message: '已添加收藏',
        isFavorited: true 
      })
    }

  } catch (error) {
    console.error('Favorite error:', error)
    return NextResponse.json(
      { error: '操作失败' },
      { status: 500 }
    )
  }
}

// 检查收藏状态
export async function GET(
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
    if (isNaN(noteId)) {
      return NextResponse.json(
        { error: '无效的笔记ID' },
        { status: 400 }
      )
    }

    await ensureBookmarksTableExists()

    const favorite = await executeQuery(
      'SELECT id FROM note_bookmarks WHERE user_id = ? AND note_id = ?',
      [parseInt(session.user.id), noteId]
    ) as any[]

    return NextResponse.json({ 
      isFavorited: favorite.length > 0 
    })

  } catch (error) {
    console.error('Check favorite error:', error)
    return NextResponse.json(
      { error: '检查收藏状态失败' },
      { status: 500 }
    )
  }
} 