import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/app/lib/database';
import { createSuccessResponse, createErrorResponse } from '@/app/lib/api/utils';
import crypto from 'crypto';

// 设置为动态路由，确保每次请求都重新计算
export const dynamic = 'force-dynamic';

// 处理忘记密码请求
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return createErrorResponse('请提供电子邮件地址', undefined, 400);
    }

    // 检查用户是否存在
    const users = await executeQuery('SELECT id, name FROM users WHERE email = ?', [email]) as any[];
    
    if (!users || users.length === 0) {
      // 出于安全考虑，即使用户不存在也返回成功
      return createSuccessResponse(null, '如果该邮箱已注册，重置密码链接将发送到您的邮箱');
    }

    const user = users[0];
    
    // 生成重置令牌
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时后过期
    
    // 存储重置令牌
    await executeQuery(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [resetToken, resetTokenExpiry, user.id]
    );
    
    // 在实际应用中，这里应该发送包含重置链接的电子邮件
    // 为了演示，我们只返回成功消息
    
    return createSuccessResponse(
      { name: user.name },
      '重置密码链接已发送到您的邮箱'
    );
    
  } catch (error) {
    console.error('处理忘记密码请求失败:', error);
    return createErrorResponse('处理请求时出错', undefined, 500);
  }
}

// 获取密码重置页面状态
export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    
    if (!token) {
      return createErrorResponse('缺少重置令牌', undefined, 400);
    }
    
    // 检查令牌是否有效
    const users = await executeQuery(
      'SELECT id FROM users WHERE reset_token = ? AND reset_token_expires > ?',
      [token, new Date()]
    ) as any[];
    
    if (!users || users.length === 0) {
      return createErrorResponse('无效或已过期的重置令牌', undefined, 400);
    }
    
    return createSuccessResponse({ valid: true }, '令牌有效');
    
  } catch (error) {
    console.error('验证重置令牌失败:', error);
    return createErrorResponse('处理请求时出错', undefined, 500);
  }
}
