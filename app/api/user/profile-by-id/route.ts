export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { executeQuery } from '@/lib/database'

// 通过ID获取用户资料（公开信息）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ 
        error: '用户ID不能为空' 
      }, { status: 400 })
    }

    const userId = parseInt(id, 10)
    if (isNaN(userId)) {
      return NextResponse.json({ 
        error: '用户ID无效' 
      }, { status: 400 })
    }

    // 从数据库获取用户公开信息
    const users = await executeQuery(
      'SELECT id, name, email, bio, location, website, github, avatar, created_at FROM users WHERE id = ?',
      [userId]
    ) as any[]

    if (users.length === 0) {
      return NextResponse.json({ 
        error: '用户不存在' 
      }, { status: 404 })
    }

    const user = users[0]

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.name,
        email: user.email, // 实际项目中可能需要隐藏邮箱
        bio: user.bio,
        location: user.location,
        website: user.website,
        github: user.github,
        avatar: user.avatar,
        createdAt: user.created_at
      }
    })

  } catch (error) {
    console.error('获取用户资料失败:', error)
    return NextResponse.json({ 
      error: '获取用户资料失败' 
    }, { status: 500 })
  }
}