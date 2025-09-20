import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// 发送验证邮箱
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ 
        error: '请先登录' 
      }, { status: 401 })
    }

    // 暂时返回成功，实际需要集成邮件服务
    return NextResponse.json({
      success: true,
      message: '验证邮件已发送（功能暂未实现）'
    })

  } catch (error) {
    console.error('发送验证邮件失败:', error)
    return NextResponse.json({ 
      error: '发送验证邮件失败' 
    }, { status: 500 })
  }
}