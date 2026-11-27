'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import mobileStyles from './MobileLayout.module.css';
import chromeTheme from './ChromeTheme.module.css';
import Sidebar, { SidebarProvider, SidebarSpacer } from './Sidebar';
import BottomNavigation from './BottomNavigation';
import MobileGestureHandler from './MobileGestureHandler';
import NextAuthSessionProvider from '../providers/SessionProvider';
import { UserProvider } from '../providers/UserProvider';
import PWAProvider from './PWAProvider';
import DevTools from './DevTools';
import AiChat from './AiChat';
import CommandPalette from './CommandPalette';
import FetchInterceptor from './FetchInterceptor';
import HomeIntroSplashHost from './HomeIntroSplashHost';
import { StudyContentPageProvider } from './StudyContentPageContext';

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [mounted, setMounted] = useState(false);
  const [ambientFlow, setAmbientFlow] = useState(true);
  const pathname = usePathname() || '/';
  const ambientScene =
    pathname.startsWith('/study') || pathname.startsWith('/notes') || pathname.startsWith('/code')
      ? 'focus'
      : 'showcase';

  // 初始化主题 - 只在客户端执行
  useEffect(() => {
    setMounted(true);
    
    // 全局快捷键：Ctrl+K / Cmd+K 零延迟唤起全栈命令面板
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    
    // 应用全站字号设置
    const applyFontSizeSetting = (size: string | null) => {
      const root = document.documentElement;
      if (size === 'small') {
        root.style.fontSize = '14px';
      } else if (size === 'large') {
        root.style.fontSize = '18px';
      } else {
        root.style.fontSize = '16px';
      }
    };
    applyFontSizeSetting(localStorage.getItem('fontSize'));
    setAmbientFlow(localStorage.getItem('ambientFlow') !== 'false');

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

    // 监听设置页实时变更广播与跨标签页 storage 同步
    const handleSettingsChange = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, any>>).detail || {};
      if (detail.theme === 'dark') {
        document.body.classList.add('dark');
      } else if (detail.theme === 'light') {
        document.body.classList.remove('dark');
      }
      if (typeof detail.fontSize === 'string') {
        applyFontSizeSetting(detail.fontSize);
      }
      if (typeof detail.ambientFlow === 'boolean') {
        setAmbientFlow(detail.ambientFlow);
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme') {
        if (event.newValue === 'dark') document.body.classList.add('dark');
        else document.body.classList.remove('dark');
      } else if (event.key === 'fontSize') {
        applyFontSizeSetting(event.newValue);
      } else if (event.key === 'ambientFlow') {
        setAmbientFlow(event.newValue !== 'false');
      }
    };

    window.addEventListener('partjava-settings-change', handleSettingsChange);
    window.addEventListener('storage', handleStorageChange);
    
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
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('partjava-settings-change', handleSettingsChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <NextAuthSessionProvider>
      <StudyContentPageProvider>
        <FetchInterceptor />
        <UserProvider>
          <PWAProvider />
          <DevTools />
          <SidebarProvider>
            <MobileGestureHandler>
              <div data-theme-shell className={`${chromeTheme.shell} ${mobileStyles.layout} relative flex flex-col h-screen bg-surface-page overflow-hidden`}>
                {/* 禾硙流光背景层（低饱和慢流动光晕，透过液态玻璃呈现通透质感，阅读页自动减弱） */}
                <div
                  data-ambient-light
                  data-ambient-scene={ambientScene}
                  data-ambient-enabled={ambientFlow ? 'true' : 'false'}
                  className={chromeTheme.ambientLayer}
                  aria-hidden="true"
                >
                  <div className={`${chromeTheme.ambientOrb} ${chromeTheme.orbGold}`} />
                  <div className={`${chromeTheme.ambientOrb} ${chromeTheme.orbIndigo}`} />
                  <div className={`${chromeTheme.ambientOrb} ${chromeTheme.orbTeal}`} />
                  <div className={`${chromeTheme.ambientOrb} ${chromeTheme.orbMist}`} />
                </div>
                <Navbar />
                <div className="relative flex flex-1 overflow-hidden">
                  <SidebarSpacer position="left" />
                  <Sidebar />
                  <main className={`${mobileStyles.main} relative flex-1 overflow-auto transition-all duration-300`}>
                    <div className={`${mobileStyles.content} min-h-full pb-16 lg:pb-0`}>
                      {children}
                    </div>
                  </main>
                  <SidebarSpacer position="right" />
                </div>
                <AiChat />
                <CommandPalette />
                <BottomNavigation />
                <HomeIntroSplashHost />
              </div>
            </MobileGestureHandler>
          </SidebarProvider>
        </UserProvider>
      </StudyContentPageProvider>
    </NextAuthSessionProvider>
  );
}