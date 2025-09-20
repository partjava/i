export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // 获取所有笔记（不过滤用户）
    const allNotes = await executeQuery(
      'SELECT id, title, category, technology, author_id, is_public, created_at FROM notes ORDER BY created_at DESC'
    ) as any[]

    // 获取所有用户
    const allUsers = await executeQuery(
      'SELECT id, name, email FROM users'
    ) as any[]

    // 如果有session，获取当前用户的笔记
    let currentUserNotes = null
    if (session?.user?.id) {
      currentUserNotes = await executeQuery(
        'SELECT id, title, category, technology, author_id, is_public, created_at FROM notes WHERE author_id = ?',
        [parseInt(session.user.id)]
      ) as any[]
    }

    return NextResponse.json({
      session: session,
      sessionUserId: session?.user?.id,
      allUsers: allUsers,
      allNotes: allNotes,
      currentUserNotes: currentUserNotes,
      notesCount: allNotes.length,
      currentUserNotesCount: currentUserNotes?.length || 0
    })

  } catch (error) {
    console.error('调试查询失败:', error)
    return NextResponse.json(
      { error: '调试查询失败', details: error },
      { status: 500 }
    )
  }
} 