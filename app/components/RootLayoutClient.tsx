'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar, { SidebarProvider } from './Sidebar';
import BottomNavigation from './BottomNavigation';
import MobileGestureHandler from './MobileGestureHandler';
import NextAuthSessionProvider from '../providers/SessionProvider';
import { UserProvider } from '../providers/UserProvider';
import SimpleLearningTracker from './SimpleLearningTracker';
import PWAProvider from './PWAProvider';
import DevTools from './DevTools';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [mounted, setMounted] = useState(false);

  // 初始化主题 - 只在客户端执行
  useEffect(() => {
    setMounted(true);
    
    // 从 localStorage 读取主题设置
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.body.classList.remove('dark');
    } else {
      // 如果没有保存的主题，使用系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    }
    
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // 只有在用户没有手动设置主题时才跟随系统
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        if (e.matches) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <NextAuthSessionProvider>
      <UserProvider>
        <PWAProvider />
        <SimpleLearningTracker />
        <DevTools />
        <SidebarProvider>
          <MobileGestureHandler>
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-auto transition-all duration-300">
                  <div className="min-h-full pb-16 lg:pb-0">
                    {children}
                  </div>
                </main>
              </div>
              <BottomNavigation />
            </div>
          </MobileGestureHandler>
        </SidebarProvider>
      </UserProvider>
    </NextAuthSessionProvider>
  );
}