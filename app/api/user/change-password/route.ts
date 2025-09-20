import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { executeQuery } from '@/lib/database'
import bcrypt from 'bcryptjs'

// 修改密码
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
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ 
        error: '当前密码和新密码不能为空' 
      }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ 
        error: '新密码长度至少为6位' 
      }, { status: 400 })
    }

    // 获取用户当前密码
    const users = await executeQuery(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    ) as any[]

    if (users.length === 0) {
      return NextResponse.json({ 
        error: '用户不存在' 
      }, { status: 404 })
    }

    // 验证当前密码
    const isValidPassword = await bcrypt.compare(currentPassword, users[0].password)
    if (!isValidPassword) {
      return NextResponse.json({ 
        error: '当前密码错误' 
      }, { status: 400 })
    }

    // 加密新密码
    const hashedNewPassword = await bcrypt.hash(newPassword, 12)

    // 更新密码
    await executeQuery(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedNewPassword, userId]
    )

    return NextResponse.json({
      success: true,
      message: '密码修改成功'
    })

  } catch (error) {
    console.error('修改密码失败:', error)
    return NextResponse.json({ 
      error: '修改密码失败' 
    }, { status: 500 })
  }
}