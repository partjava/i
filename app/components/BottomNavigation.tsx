'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  HomeOutlined, 
  BookOutlined, 
  EditOutlined, 
  CodeOutlined, 
  UserOutlined,
  SearchOutlined,
  AppstoreOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { Badge, Drawer } from 'antd';

const AI3DRobot = dynamic(() => import('./AI3DRobot'), { ssr: false });

interface NavItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  href: string;
  requireAuth?: boolean;
  badge?: number;
  primary?: boolean;
}

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [moreOpen, setMoreOpen] = useState(false);
  const [showRobot, setShowRobot] = useState(false);

  // 主要导航项（显示在底部栏）
  const primaryNavItems: NavItem[] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
      href: '/',
      primary: true,
    },
    {
      key: 'study',
      icon: <BookOutlined />,
      label: '学习',
      href: '/study',
      primary: true,
    },
    {
      key: 'notes',
      icon: <EditOutlined />,
      label: '笔记',
      href: '/notes',
      requireAuth: true,
      primary: true,
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: session ? '我的' : '数据',
      href: '/profile',
      primary: true,
    },
  ];

  // 更多导航项（在抽屉中显示）
  const moreNavItems: NavItem[] = [
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: '全局搜索',
      href: '/search',
    },
    {
      key: 'code',
      icon: <CodeOutlined />,
      label: '代码编辑器',
      href: '/code-editor',
    },
    {
      key: 'ai',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'AI 助手',
      href: '/ai-chat',
    },
    {
      key: 'challenges',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: '编程挑战',
      href: '/challenges',
    },
  ];

  const handleNavClick = (item: NavItem) => {
    // 添加触摸反馈
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    setMoreOpen(false);
    router.push(item.href);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* 底部导航栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden shadow-lg">
        <div className="flex items-center justify-around px-1 py-2 pb-safe">
          {primaryNavItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className={`
                  flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200
                  ${active 
                    ? 'text-blue-600 bg-blue-50 scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-100 active:scale-95'
                  }
                  min-w-0 flex-1 relative touch-manipulation
                `}
                style={{ minHeight: '60px', minWidth: '60px' }}
              >
                <div className="relative">
                  {item.badge ? (
                    <Badge count={item.badge} size="small" offset={[4, -4]}>
                      <div className={`text-xl ${active ? 'scale-110' : ''} transition-transform`}>
                        {item.icon}
                      </div>
                    </Badge>
                  ) : (
                    <div className={`text-xl ${active ? 'scale-110' : ''} transition-transform`}>
                      {item.icon}
                    </div>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${active ? 'text-blue-600' : 'text-gray-600'}`}>
                  {item.label}
                </span>
                
                {/* 活动指示器 */}
                {active && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
          
          {/* 袋子 AI 按钮 - 悬浮在中间 */}
          <div className="relative flex flex-col items-center justify-center" style={{ minWidth: '60px' }}>
            <button
              onClick={() => {
                if (navigator.vibrate) navigator.vibrate(10);
                setShowRobot(true);
              }}
              className="absolute -top-7 flex flex-col items-center justify-center touch-manipulation"
              style={{ transform: 'translateY(-50%)' }}
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg border-4 border-white"
                style={{ boxShadow: '0 4px 20px rgba(99,102,241,0.5)' }}>
                <span className="text-2xl">🤖</span>
              </div>
              <span className="text-xs mt-1 font-medium text-purple-600">袋子</span>
            </button>
          </div>

          {/* 更多按钮 */}
          <button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(10);
              setMoreOpen(true);
            }}
            className="flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 active:bg-gray-100 active:scale-95 min-w-0 flex-1 touch-manipulation"
            style={{ minHeight: '60px', minWidth: '60px' }}
          >
            <div className="text-xl">
              <AppstoreOutlined />
            </div>
            <span className="text-xs mt-1 font-medium text-gray-600">
              更多
            </span>
          </button>
        </div>
      </div>

      {/* 更多功能抽屉 */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">更多功能</span>
            <button
              onClick={() => setMoreOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
            >
              <CloseOutlined />
            </button>
          </div>
        }
        placement="bottom"
        onClose={() => setMoreOpen(false)}
        open={moreOpen}
        height="auto"
        closable={false}
        className="mobile-drawer"
        styles={{
          body: { padding: '16px' }
        }}
      >
        <div className="grid grid-cols-4 gap-4 pb-4">
          {moreNavItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200
                  ${active 
                    ? 'text-blue-600 bg-blue-50 shadow-md' 
                    : 'text-gray-700 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 active:scale-95'
                  }
                  touch-manipulation
                `}
                style={{ minHeight: '90px' }}
              >
                <div className={`text-2xl mb-2 ${active ? 'scale-110' : ''} transition-transform`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-medium text-center ${active ? 'text-blue-600' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* 快捷操作 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm font-semibold text-gray-500 mb-3">快捷操作</div>
          <div className="space-y-2">
            <button
              onClick={() => {
                setMoreOpen(false);
                router.push('/notes/new');
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 active:scale-98 transition-all touch-manipulation"
            >
              <span className="font-medium">创建新笔记</span>
              <EditOutlined className="text-lg" />
            </button>
            
            {session && (
              <button
                onClick={() => {
                  setMoreOpen(false);
                  router.push('/profile');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-98 transition-all touch-manipulation"
              >
                <span className="font-medium">查看学习统计</span>
                <UserOutlined className="text-lg" />
              </button>
            )}
          </div>
        </div>
      </Drawer>

      {/* 袋子 AI 机器人弹窗 */}
      {showRobot && <AI3DRobot onClose={() => setShowRobot(false)} />}

      <style jsx global>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        .mobile-drawer .ant-drawer-body {
          padding-bottom: calc(16px + env(safe-area-inset-bottom));
        }
        
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        .active\\:scale-95:active {
          transform: scale(0.95);
        }
        
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
} 