import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'

// 更新用户头像
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: '请先登录' 
      }, { status: 401 })
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ 
        error: '用户ID无效' 
      }, { status: 400 })
    }

    const body = await request.json()
    const { avatar } = body

    if (!avatar) {
      return NextResponse.json({ 
        error: '头像URL不能为空' 
      }, { status: 400 })
    }

    // 更新用户头像
    await executeQuery(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatar, userId]
    )

    return NextResponse.json({
      success: true,
      message: '头像更新成功'
    })

  } catch (error) {
    console.error('更新头像失败:', error)
    return NextResponse.json({ 
      error: '更新头像失败' 
    }, { status: 500 })
  }
}
