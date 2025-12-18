'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

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
}

interface UserContextType {
  user: UserData | null;
  updateUser: (updates: Partial<UserData>) => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, update: updateSession, status } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 从API获取用户数据
  const fetchUserData = useCallback(async () => {
    // 检查session是否有效
    if (!session || !session.user || !session.user.email) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    // 暂时禁用API调用，直接使用session数据
    setLoading(true);
    try {
      // 使用session中的用户数据
      const userData: UserData = {
        id: session.user.id || session.user.email || '',
        name: session.user.name || session.user.email?.split('@')[0] || '用户',
        email: session.user.email || '',
        image: session.user.image || null,
        bio: '',
        location: '',
        website: '',
        github: ''
      };
      setUser(userData);
      console.log('用户数据已设置:', userData);
    } catch (error) {
      setUser(null);
      console.error('设置用户数据失败:', error);
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
    
    // 同时更新session中的用户信息
    if (updates.image !== undefined && session && session.user) {
      // 确保传递给updateSession的对象结构正确
      const sessionUpdate = {
        user: {
          ...session.user,
          image: updates.image
        }
      };
      updateSession(sessionUpdate);
    }
  };

  // 监听session变化
  useEffect(() => {
    console.log('UserProvider - Session状态变化:', { 
      status, 
      hasSession: !!session, 
      hasUser: !!session?.user,
      userEmail: session?.user?.email,
      userName: session?.user?.name 
    });
    
    // 等待 session 状态确定
    if (status === 'loading') {
      console.log('UserProvider - Session加载中，等待...');
      return;
    }
    
    if (status === 'authenticated' && session?.user) {
      console.log('UserProvider - 检测到已认证，获取用户数据...');
      fetchUserData();
    } else {
      console.log('UserProvider - 未认证，清除用户数据');
      // 清除用户数据
      setUser(null);
      setLoading(false);
      
      // 确保清除本地存储中的用户数据
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
        sessionStorage.removeItem('user_data');
      }
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