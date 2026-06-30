'use client';

/**
 * useAuth.ts
 * 替代 next-auth/react 的 useSession Hook。
 * 
 * 接口设计与 useSession() 完全兼容：
 *   const { data: session, status } = useAuth();
 *   session.user.id / name / email / image
 *   status: 'loading' | 'authenticated' | 'unauthenticated'
 * 
 * 额外提供：
 *   signIn(email, password) → Promise<LoginResult>
 *   signOut() → void
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getStoredUser,
  getToken,
  login,
  logout,
  isAuthenticated,
  type JwtUser,
  type LoginResult,
} from '@shared/lib/auth-client';

// ─── Session 形状（与 NextAuth 兼容）────────────────────────────────────────

export interface AuthSession {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    username?: string;
    role?: string;
    vip?: boolean;
    vipLevel?: number;
    vipExpireTime?: string | null;
  };
  expires: string;
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface UseAuthReturn {
  /** 与 useSession().data 兼容 */
  data: AuthSession | null;
  /** 与 useSession().status 兼容 */
  status: AuthStatus;
  /** 登录，返回 { success, error? } */
  signIn: (emailOrUsername: string, password: string) => Promise<LoginResult>;
  /** 登出，清除 token 并跳转登录页 */
  signOut: (options?: { redirect?: boolean; callbackUrl?: string }) => void;
  /** 刷新用户信息（从 profile 接口重新拉取） */
  update: (updates?: Partial<JwtUser>) => void;
}

// ─── 工具函数 ───────────────────────────────────────────────────────────────

function buildSession(user: JwtUser): AuthSession {
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image ?? null,
      username: user.username,
      role: user.role,
      vip: user.vip,
      vipLevel: user.vipLevel,
      vipExpireTime: user.vipExpireTime,
    },
    // 伪造 30 天过期时间（实际由 Java token 控制）
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAuth(): UseAuthReturn {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [session, setSession] = useState<AuthSession | null>(null);

  // 初始化：从 localStorage 读取认证状态
  const initialize = useCallback(() => {
    if (typeof window === 'undefined') {
      setStatus('unauthenticated');
      return;
    }
    const user = getStoredUser();
    const token = getToken();
    if (user && token) {
      setSession(buildSession(user));
      setStatus('authenticated');
    } else {
      setSession(null);
      setStatus('unauthenticated');
    }
  }, []);

  useEffect(() => {
    initialize();

    // 监听 auth-change 事件（由 auth-client.ts 的 login/logout 触发）
    const handleAuthChange = (e: CustomEvent) => {
      const user = e.detail?.user as JwtUser | null;
      if (user) {
        setSession(buildSession(user));
        setStatus('authenticated');
      } else {
        setSession(null);
        setStatus('unauthenticated');
      }
    };

    window.addEventListener('auth-change', handleAuthChange as EventListener);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange as EventListener);
    };
  }, [initialize]);

  const signIn = useCallback(async (emailOrUsername: string, password: string): Promise<LoginResult> => {
    const result = await login(emailOrUsername, password);
    return result;
  }, []);

  const signOut = useCallback((options?: { redirect?: boolean; callbackUrl?: string }) => {
    logout();
    setSession(null);
    setStatus('unauthenticated');
    
    const shouldRedirect = options?.redirect !== false;
    if (shouldRedirect && typeof window !== 'undefined') {
      const url = options?.callbackUrl || '/auth/login';
      window.location.href = url;
    }
  }, []);

  const update = useCallback((updates?: Partial<JwtUser>) => {
    // 如果传入了 updates，直接更新 localStorage 中的用户信息
    if (updates) {
      const { updateStoredUser } = require('@shared/lib/auth-client');
      updateStoredUser(updates);
    }
    // 重新从 localStorage 读取并更新 session 状态
    initialize();
  }, [initialize]);

  return {
    data: session,
    status,
    signIn,
    signOut,
    update,
  };
}

// ─── 兼容性导出：方便从 next-auth/react 迁移 ────────────────────────────────

/**
 * 兼容 useSession 调用形式：
 *   const { data: session, status } = useSession();
 * 直接替换为：
 *   const { data: session, status } = useSession();  // 同名，无需改代码
 */
export const useSession = useAuth;

export default useAuth;
