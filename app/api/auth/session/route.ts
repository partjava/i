import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { cookies } from 'next/headers';

// 设置为动态路由，确保每次请求都重新计算
export const dynamic = 'force-dynamic';
export const revalidate = 0; // 禁用缓存

// 获取当前会话状态
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // 检查会话是否存在
    if (!session || !session.user?.id) {
      // 检查cookie是否存在但会话不存在的情况
      const cookieStore = cookies();
      const sessionCookie = cookieStore.get('next-auth.session-token');
      
      if (sessionCookie) {
        // 存在cookie但会话无效，清除cookie
        cookies().delete('next-auth.session-token');
      }
      
      return NextResponse.json({ 
        authenticated: false,
        message: '用户未登录'
      }, { 
        status: 200, // 改为200状态码，避免401错误
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        }
      });
    }
    
    // 会话有效，返回会话信息（不包含敏感数据）
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
      expires: session.expires,
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('会话检查错误:', error);
    return NextResponse.json({ 
      error: '会话检查失败',
      authenticated: false 
    }, { status: 500 });
  }
}

// 刷新会话
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ 
        success: false,
        message: '无法刷新会话，用户未登录'
      }, { status: 401 });
    }
    
    // 会话有效，返回成功信息
    return NextResponse.json({
      success: true,
      message: '会话已刷新',
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('刷新会话错误:', error);
    return NextResponse.json({ 
      success: false,
      error: '刷新会话失败'
    }, { status: 500 });
  }
}
