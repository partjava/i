'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
  const { data: session, update: updateSession } = useSession();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // 从API获取用户数据
  const fetchUserData = async () => {
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
      const userData = {
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || null,
        bio: '',
        location: '',
        website: '',
        github: ''
      };
      setUser(userData);
    } catch (error) {
      setUser(null);
      console.error('设置用户数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

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
    // 只有当session状态确定后再进行操作
    if (session === undefined) {
      // session还在加载中，不执行任何操作
      return;
    }
    
    if (session?.user) {
      fetchUserData();
    } else {
      // 清除用户数据
      setUser(null);
      setLoading(false);
      
      // 确保清除本地存储中的用户数据
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
        sessionStorage.removeItem('user_data');
      }
    }
  }, [session]);

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