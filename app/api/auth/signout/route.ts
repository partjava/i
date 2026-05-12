'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * 处理退出登录请求
 * 清除所有与身份验证相关的cookie
 */
export async function POST() {
  try {
    const cookieStore = cookies();
    
    const allCookies = cookieStore.getAll();
    
    for (const cookie of allCookies) {
      cookieStore.delete(cookie.name);
    }
    
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('next-auth.csrf-token');
    cookieStore.delete('next-auth.callback-url');
    cookieStore.delete('__Secure-next-auth.session-token');
    cookieStore.delete('__Secure-next-auth.csrf-token');
    cookieStore.delete('__Host-next-auth.csrf-token');

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
  } catch (error) {
    return NextResponse.json({ error: '退出登录失败' }, { status: 500 });
  }
}