'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  HomeOutlined, 
  BookOutlined, 
  EditOutlined, 
  CodeOutlined, 
  UserOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Badge } from 'antd';

interface NavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  requireAuth?: boolean;
  badge?: number;
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const navItems: NavItem[] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
      href: '/',
    },
    {
      key: 'study',
      icon: <BookOutlined />,
      label: '学习',
      href: '/study',
    },
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: '搜索',
      href: '/search',
    },
    {
      key: 'code',
      icon: <CodeOutlined />,
      label: '代码',
      href: '/code-editor',
    },
    {
      key: 'ai',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'AI助手',
      href: '/ai-chat',
    },
    {
      key: 'challenges',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: '挑战',
      href: '/challenges',
    },
    {
      key: 'notes',
      icon: <EditOutlined />,
      label: '笔记',
      href: '/notes',
      requireAuth: true,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: session ? '我的' : '登录',
      href: session ? '/profile' : '/login',
    },
  ];

  const handleNavClick = (item: NavItem) => {
    // 添加触摸反馈
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    router.push(item.href);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <button
              key={item.key}
              onClick={() => handleNavClick(item)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
                ${active 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-100'
                }
                min-w-0 flex-1 relative
              `}
              style={{ minHeight: '56px' }}
            >
              <div className="relative">
                {item.badge ? (
                  <Badge count={item.badge} size="small" offset={[4, -4]}>
                    <div className={`text-lg ${active ? 'scale-110' : ''} transition-transform`}>
                      {item.icon}
                    </div>
                  </Badge>
                ) : (
                  <div className={`text-lg ${active ? 'scale-110' : ''} transition-transform`}>
                    {item.icon}
                  </div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium ${active ? 'text-blue-600' : 'text-gray-600'}`}>
                {item.label}
              </span>
              
              {/* 活动指示器 */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
} 