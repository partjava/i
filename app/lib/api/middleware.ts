import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { createErrorResponse } from './utils';

export async function requireAuth(request: NextRequest): Promise<{ userId: number; session: any }> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('请先登录');
  }

  const userId = parseInt(session.user.id, 10);
  if (isNaN(userId)) {
    throw new Error('用户ID无效');
  }

  return { userId, session };
}

export async function withAuth(
  request: NextRequest,
  handler: (userId: number, session: any) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const { userId, session } = await requireAuth(request);
    return await handler(userId, session);
  } catch (error) {
    if (error instanceof Error) {
      return createErrorResponse(error.message, undefined, 401);
    }
    return createErrorResponse('认证失败', undefined, 401);
  }
}

export async function withPagination(
  request: NextRequest,
  handler: (page: number, limit: number) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const { searchParams } = request.nextUrl;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 100);

    if (page < 1) {
      return createErrorResponse('页码必须大于0');
    }
    if (limit < 1 || limit > 100) {
      return createErrorResponse('每页数量必须在1-100之间');
    }

    return await handler(page, limit);
  } catch (error) {
    return handleApiError(error);
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  if (error instanceof Error) {
    // 数据库连接错误
    if (error.message.includes('ECONNREFUSED') || error.message.includes('ENOTFOUND')) {
      return createErrorResponse('数据库连接失败，请稍后重试', undefined, 503);
    }
    
    // 数据库查询错误
    if (error.message.includes('SQL') || error.message.includes('database')) {
      return createErrorResponse('数据查询失败，请稍后重试', undefined, 500);
    }
    
    // 认证错误
    if (error.message.includes('认证') || error.message.includes('登录')) {
      return createErrorResponse(error.message, undefined, 401);
    }
    
    // 参数验证错误
    if (error.message.includes('不能为空') || error.message.includes('无效')) {
      return createErrorResponse(error.message, undefined, 400);
    }
    
    return createErrorResponse(error.message, undefined, 500);
  }

  return createErrorResponse('服务器内部错误', undefined, 500);
}

export { createSuccessResponse, createErrorResponse } from './utils';