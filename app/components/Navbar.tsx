'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useUser } from '../providers/UserProvider';
import { useRouter } from 'next/navigation';
import { Button, Dropdown, Avatar, Badge, Tooltip } from 'antd';
import { 
  MenuOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined, 
  HomeOutlined, 
  BookOutlined,
  EditOutlined,
  BellOutlined,
  CodeOutlined,
  RobotOutlined
} from '@ant-design/icons';
import GlobalSearch from './GlobalSearch';
import { useSidebar } from './Sidebar';
import SettingModal from './SettingModal';

export default function Navbar() {
  const { data: session, status, update } = useSession();
  const { user } = useUser();
  const router = useRouter();
  const { setIsOpen } = useSidebar();
  const [settingOpen, setSettingOpen] = useState(false);

  // 强制检查session状态
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const sessionData = await response.json();
        if (!sessionData.user && session?.user) {
          // 前端有session但后端没有，强制退出登录
          await signOut({ redirect: false });
          router.push('/login');
        }
      } catch (error) {
        console.error('检查session失败:', error);
      }
    };

    if (status !== 'loading') {
      checkSession();
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    try {
      // 首先使用NextAuth库内置功能清除前端会话，但不重定向
      await signOut({ redirect: false });
      
      // 然后调用自定义API清除所有相关cookie
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        cache: 'no-store'
      });
      
      // 清除本地存储中可能存在的用户数据
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
        sessionStorage.removeItem('user_data');
        localStorage.removeItem('next-auth.session-token');
        sessionStorage.removeItem('next-auth.session-token');
        localStorage.removeItem('next-auth.callback-url');
        sessionStorage.removeItem('next-auth.callback-url');
        localStorage.removeItem('next-auth.csrf-token');
        sessionStorage.removeItem('next-auth.csrf-token');
        
        // 清除所有可能的身份验证cookie
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.split('=');
          if (name.trim().startsWith('next-auth') || name.trim().includes('token') || name.trim().includes('session')) {
            document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
            document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
          }
        });
      }
      
      // 强制清除会话状态
      if (update) {
        await update({ user: null });
      }
      
      // 最后才强制刷新页面（不使用路由跳转，完全重载页面）
      setTimeout(() => {
        window.location.replace('/login?expired=true');
      }, 100);
    } catch (error) {
      console.error('退出失败', error);
      // 强制刷新页面，即使有错误
      window.location.replace('/login?error=true');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: (
        <Link href="/profile">
          个人资料
        </Link>
      ),
    },
    {
      key: 'notes',
      icon: <EditOutlined />,
      label: (
        <Link href="/notes">
          我的笔记
        </Link>
      ),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => setSettingOpen(true),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleSignOut,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧：Logo + 移动端菜单按钮 */}
          <div className="flex items-center space-x-4 flex-1">
            {/* 移动端汉堡菜单 */}
            <button
              onClick={() => {
                setIsOpen(true);
                // 添加触摸反馈
                if (navigator.vibrate) {
                  navigator.vibrate(10);
                }
              }}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 active:scale-95 transition-transform"
            >
              <MenuOutlined className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PJ</span>
              </div>
              <span className="font-semibold text-xl text-gray-900 hidden sm:block">
                PartJava
              </span>
            </Link>

            {/* 桌面端导航链接 */}
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link 
                href="/" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <HomeOutlined className="text-lg mb-1" />
                <span className="text-xs">首页</span>
              </Link>
              <Link 
                href="/study" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <BookOutlined className="text-lg mb-1" />
                <span className="text-xs">学习</span>
              </Link>
              <Link 
                href="/notes" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <EditOutlined className="text-lg mb-1" />
                <span className="text-xs">笔记</span>
              </Link>
              {session && (
                <Link 
                  href="/profile" 
                  className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <UserOutlined className="text-lg mb-1" />
                  <span className="text-xs">资料</span>
                </Link>
              )}
              <Link 
                href="/code-editor" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <CodeOutlined className="text-lg mb-1" />
                <span className="text-xs">代码</span>
              </Link>
              <Link 
                href="/challenges" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">挑战</span>
              </Link>
              <Link 
                href="/search" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs">全局</span>
              </Link>
              <Link 
                href="/ai-chat" 
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a7 7 0 017 7v2a7 7 0 01-7 7 7 7 0 01-7-7V9a7 7 0 017-7zm0 2a5 5 0 00-5 5v2a5 5 0 005 5 5 5 0 005-5V9a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                <span className="text-xs">AI</span>
              </Link>
            </div>
          </div>

          {/* 中间：桌面端搜索框 */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <GlobalSearch 
              className="w-full"
              placeholder="搜索课程、工具、笔记..."
              size="middle"
            />
          </div>

          {/* 右侧：用户操作区域 */}
          <div className="flex items-center space-x-3">
            {/* 移动端搜索按钮 - 跳转到搜索页面 */}
            <div className="sm:hidden">
              <Tooltip title="全局搜索">
                <Button
                  type="text"
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                  onClick={() => router.push('/search')}
                  className="text-gray-600 hover:text-blue-600"
                />
              </Tooltip>
            </div>

            {status === 'loading' ? (
              // 加载状态 - 显示占位符
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden md:block"></div>
              </div>
            ) : session && session.user ? (
              <>
                {/* 通知铃铛 */}
                <Tooltip title="通知">
                  <Badge count={0} size="small">
                    <Button
                      type="text"
                      icon={<BellOutlined />}
                      className="text-gray-600 hover:text-blue-600"
                    />
                  </Badge>
                </Tooltip>

                {/* 用户头像和菜单 */}
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-gray-50">
                    <Avatar
                      size="small"
                      src={user?.image || session?.user?.image || undefined}
                      icon={!(user?.image || (session?.user?.image)) ? <UserOutlined /> : undefined}
                      className="bg-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                      {user?.name || session?.user?.name || session?.user?.email?.split('@')[0]}
                    </span>
                  </div>
                </Dropdown>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  type="text"
                  onClick={() => router.push('/login')}
                  className="text-gray-600 hover:text-blue-600"
                >
                  登录
                </Button>
                <Button
                  type="primary"
                  onClick={() => router.push('/register')}
                  size="small"
                >
                  注册
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 移动端搜索栏 */}
      <div className="sm:hidden border-t border-gray-200 p-3">
        <GlobalSearch 
          className="w-full"
          placeholder="搜索课程、工具、笔记..."
          size="small"
        />
      </div>
      <SettingModal open={settingOpen} onClose={() => setSettingOpen(false)} />
    </nav>
  );
}