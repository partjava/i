'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * 处理退出登录请求
 * 清除所有与身份验证相关的cookie
 */
export async function POST() {
  const cookieStore = cookies();
  
  // 获取所有cookie
  const allCookies = cookieStore.getAll();
  
  // 清除所有可能与身份验证相关的cookie
  for (const cookie of allCookies) {
    cookieStore.delete(cookie.name);
  }
  
  // 特别处理next-auth相关cookie
  cookieStore.delete('next-auth.session-token');
  cookieStore.delete('next-auth.csrf-token');
  cookieStore.delete('next-auth.callback-url');
  cookieStore.delete('__Secure-next-auth.session-token');
  cookieStore.delete('__Secure-next-auth.csrf-token');
  cookieStore.delete('__Host-next-auth.csrf-token');

  // 设置清除响应头
  const headers = new Headers();
  headers.append('Clear-Site-Data', '"cookies", "storage"');
  
  return new NextResponse(
    JSON.stringify({ 
      success: true, 
      message: '已成功退出登录',
      clearedCookies: allCookies.length
    }),
    {
      status: 200,
      headers: headers
    }
  );
}