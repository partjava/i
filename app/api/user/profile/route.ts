export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 根据用户ID获取个性化资料
    const userId = session.user.id;
    
    // 尝试从数据库获取用户资料
    try {
      const { executeQuery } = await import('@/app/lib/database');
      
      const userProfileResult = await executeQuery(
        `SELECT * FROM user_profiles WHERE user_id = ?`,
        [userId]
      );
      
      // 如果找到用户资料，返回数据库中的资料
      if (Array.isArray(userProfileResult) && userProfileResult.length > 0) {
        const userProfile = userProfileResult[0] as any; // 使用any类型避免类型错误
        
        const profile = {
          id: session.user.id,
          name: session.user.name || (userProfile.name as string || ''),
          email: session.user.email,
          image: session.user.image || (userProfile.avatar as string || ''),
          bio: (userProfile.bio as string) || '',
          location: (userProfile.location as string) || '',
          github: (userProfile.github as string) || '',
          website: (userProfile.website as string) || ''
        };
        
        return NextResponse.json(profile);
      }
    } catch (dbError) {
      console.error('数据库查询失败:', dbError);
      // 如果数据库查询失败，继续使用会话信息
    }
    
    // 如果没有找到用户资料或数据库查询失败，使用会话信息
    const profile = {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      image: session.user.image || '',
      bio: '',
      location: '',
      github: '',
      website: ''
    };
    
    return NextResponse.json(profile);
  } catch (error) {
    console.error('获取用户资料失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 检查用户会话
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 });
    }
    
    // 获取请求数据
    const data = await request.json();
    
    // 模拟更新用户资料
    const updatedProfile = {
      ...data,
      id: session.user.id,
      email: session.user.email
    };
    
    // 返回更新后的用户资料
    return NextResponse.json({
      success: true,
      message: '资料更新成功',
      user: updatedProfile
    });
  } catch (error) {
    console.error('更新用户资料失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}