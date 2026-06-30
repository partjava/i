'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { updateStoredUser } from '@shared/lib/auth-client';

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio?: string;
  location?: string;
  github?: string;
  twitter?: string;
  website?: string;
  role?: string;
  username?: string;
  vip?: boolean;       // 是否是 VIP 会员
  vipLevel?: number;   // 会员等级: 1=体验, 2=进阶, 3=永久共创
  vipExpireTime?: string | null; // 会员到期时间
}

interface UserContextType {
  user: UserData | null;
  updateUser: (updates: Partial<UserData>) => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 从API获取用户数据
  const fetchUserData = useCallback(async () => {
    if (!session || !session.user) {
      setUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // fetch 已由 FetchInterceptor 自动注入 Bearer Token
      const response = await fetch('/api/user/profile', {
        cache: 'no-store'
      });

      if (response.ok) {
        const profileData = await response.json();
        const userData: UserData = {
          id: session.user.id || '',
          name: profileData.name || session.user.name || '',
          email: session.user.email || '',
          image: profileData.avatar || profileData.image || session.user.image || null,
          bio: profileData.bio || '',
          location: profileData.location || '',
          website: profileData.website || '',
          github: profileData.github || '',
          role: profileData.role || session.user.role || 'USER',
          username: profileData.username || session.user.username || '',
          vip: profileData.vip || false,
          vipLevel: profileData.vipLevel || 0,
          vipExpireTime: profileData.vipExpireTime || null,
        };
        setUser(userData);
        // 同步更新 localStorage 中的用户信息
        updateStoredUser({
          name: userData.name,
          image: userData.image,
          role: userData.role,
          vip: userData.vip,
          vipLevel: userData.vipLevel,
          vipExpireTime: userData.vipExpireTime,
        });
      } else {
        // API 失败时降级用 session
        setUser({
          id: session.user.id || '',
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image || null,
          role: session.user.role || 'USER',
          username: session.user.username || ''
        });
      }
    } catch (error) {
      setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || null,
        role: session.user.role || 'USER',
        username: session.user.username || ''
      });
    } finally {
      setLoading(false);
    }
  }, [session]);

  // 刷新用户数据
  const refreshUser = async () => {
    setLoading(true);
    await fetchUserData();
  };

  // 更新用户数据
  const updateUser = (updates: Partial<UserData>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
    // 同步到 localStorage（持久化）
    updateStoredUser(updates as any);
  };

  // 监听 session 变化
  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (status === 'authenticated' && session?.user) {
      fetchUserData();
    } else {
      // 清除用户数据
      setUser(null);
      setLoading(false);
    }
  }, [session, status, fetchUserData]);

  return (
    <UserContext.Provider value={{ user, updateUser, refreshUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}