export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'

// 更新用户头像
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      console.log('POST /api/user/avatar - 未授权访问');
      return NextResponse.json({ 
        error: '请先登录' 
      }, { status: 401 })
    }

    const userId = parseInt(session.user.id, 10)
    if (isNaN(userId)) {
      console.log('POST /api/user/avatar - 用户ID无效:', session.user.id);
      return NextResponse.json({ 
        error: '用户ID无效' 
      }, { status: 400 })
    }

    const body = await request.json()
    const { image } = body  // 前端传的是image字段
    
    console.log('POST /api/user/avatar - 用户ID:', userId);
    console.log('POST /api/user/avatar - 接收到的图片数据长度:', image?.length || 0);

    if (!image) {
      console.log('POST /api/user/avatar - 头像数据为空');
      return NextResponse.json({ 
        error: '头像数据不能为空' 
      }, { status: 400 })
    }

    // 导入数据库操作函数
    const { executeQuery } = await import('@/app/lib/database');

    // 更新 users 表中的头像（users 表使用 image 字段）
    console.log('POST /api/user/avatar - 更新users表');
    const usersResult = await executeQuery(
      'UPDATE users SET image = ?, updated_at = NOW() WHERE id = ?',
      [image, userId]
    );
    console.log('POST /api/user/avatar - users表更新结果:', usersResult);

    // 同时更新user_profiles表
    const profileExists = await executeQuery(
      'SELECT id FROM user_profiles WHERE user_id = ?',
      [userId]
    );
    
    console.log('POST /api/user/avatar - user_profiles查询结果:', profileExists);

    if (Array.isArray(profileExists) && profileExists.length > 0) {
      console.log('POST /api/user/avatar - 更新user_profiles表');
      const profileResult = await executeQuery(
        'UPDATE user_profiles SET avatar = ?, updated_at = NOW() WHERE user_id = ?',
        [image, userId]
      );
      console.log('POST /api/user/avatar - user_profiles更新结果:', profileResult);
    } else {
      console.log('POST /api/user/avatar - 插入user_profiles表');
      const insertResult = await executeQuery(
        'INSERT INTO user_profiles (user_id, avatar, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [userId, image]
      );
      console.log('POST /api/user/avatar - user_profiles插入结果:', insertResult);
    }

    console.log('POST /api/user/avatar - 头像更新成功');
    
    return NextResponse.json({
      success: true,
      message: '头像更新成功',
      image: image
    })

  } catch (error) {
    console.error('POST /api/user/avatar - 更新头像失败:', error)
    return NextResponse.json({ 
      error: '更新头像失败',
      details: String(error)
    }, { status: 500 })
  }
}
