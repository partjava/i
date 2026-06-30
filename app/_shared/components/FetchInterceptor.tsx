'use client';

/**
 * FetchInterceptor.tsx
 * 全局 fetch 拦截器：自动为所有 /api/ 请求注入 Authorization: Bearer <token>。
 * 使用 monkey-patch 方式，所有现有组件的 fetch('/api/...') 调用无需修改。
 * 同时处理 401 响应自动登出并跳转登录页。
 */

import { useEffect } from 'react';
import { getToken, logout } from '@shared/lib/auth-client';

// 保存原始 fetch 函数，避免重复 patch
const originalFetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;
let isPatched = false;

export default function FetchInterceptor() {
  useEffect(() => {
    if (isPatched || typeof window === 'undefined') return;
    isPatched = true;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      // 判断是否是 /api/ 请求（需要注入 token）
      const url = input instanceof Request ? input.url : String(input);
      const isApiRequest = url.startsWith('/api/') || url.includes('localhost:8080');

      let finalInit = init ?? {};

      if (isApiRequest) {
        const token = getToken();
        if (token) {
          finalInit = {
            ...finalInit,
            headers: {
              // 已有的 headers 优先（允许组件手动覆盖）
              Authorization: `Bearer ${token}`,
              ...((finalInit.headers as Record<string, string>) ?? {}),
            },
          };
        }
      }

      const response = await originalFetch(input, finalInit);

      // 处理 401：token 过期/无效，自动登出
      if (response.status === 401 && isApiRequest) {
        // 排除登录/注册接口本身
        const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');
        if (!isAuthEndpoint) {
          logout();
          window.location.href = '/auth/login?expired=true';
        }
      }

      return response;
    };

    return () => {
      // 组件卸载时恢复原始 fetch（开发环境 HMR 用）
      window.fetch = originalFetch;
      isPatched = false;
    };
  }, []);

  return null; // 无 UI 输出
}
