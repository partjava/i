'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/hooks/useAuth';
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
  RobotOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import GlobalSearch from './GlobalSearch';
import { useSidebar } from './Sidebar';
import SettingModal from './SettingModal';
import AI3DRobot from './AI3DRobot';
import StitchLogo from './StitchLogo';
import VipModal from './VipModal';

export default function Navbar() {
  const { data: session, status, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { setIsOpen } = useSidebar();
  const [settingOpen, setSettingOpen] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [robotPreloaded, setRobotPreloaded] = useState(false);
  const [showVip, setShowVip] = useState(false);

  // JWT 认证无需轮询 session 检查，401 由 FetchInterceptor 处理
  useEffect(() => {
    // 无操作：FetchInterceptor 自动处理 token 过期跳转
  }, []);

  // 预加载机器人资源
  useEffect(() => {
    const preloadRobot = () => {
      // 模拟预加载完成
      setTimeout(() => {
        setRobotPreloaded(true);
      }, 1000);
    };

    preloadRobot();
  }, []);

  const handleSignOut = async () => {
    try {
      signOut({ redirect: false });
      setTimeout(() => {
        window.location.replace('/login');
      }, 100);
    } catch (error) {
      console.error('退出失败', error);
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
    // 如果具备管理员权限，动态增加“后台管理”入口链接
    ...(user?.role === 'ADMIN' ? [
      {
        key: 'admin',
        icon: <SettingOutlined style={{ color: '#6366f1' }} />,
        label: (
          <Link href="/admin" className="font-semibold text-indigo-600 dark:text-indigo-400">
            后台管理
          </Link>
        ),
      }
    ] : []),
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
    <nav className="bg-surface-raised shadow-sm border-b border-line-subtle sticky top-0 z-40">
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
              className="lg:hidden p-2 rounded-md text-content-muted hover:text-content-primary hover:bg-control-fill-hover active:scale-95 transition-transform"
            >
              <MenuOutlined className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden bg-surface-muted">
                <StitchLogo size={32} />
              </div>
              <span className="font-semibold text-xl text-content-primary hidden sm:block">
                PartJava
              </span>
            </Link>

            {/* 桌面端导航链接 */}
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <Link
                href="/"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <HomeOutlined className="text-lg mb-1" />
                <span className="text-xs">首页</span>
              </Link>

              <Link
                href="/study"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <BookOutlined className="text-lg mb-1" />
                <span className="text-xs">学习</span>
              </Link>

              <Link
                href="/notes"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <EditOutlined className="text-lg mb-1" />
                <span className="text-xs">笔记</span>
              </Link>
              <Link
                href="/profile"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <UserOutlined className="text-lg mb-1" />
                <span className="text-xs">{session ? '资料' : '数据'}</span>
              </Link>
              <Link
                href="/code-editor"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <CodeOutlined className="text-lg mb-1" />
                <span className="text-xs">代码</span>
              </Link>
              <Link
                href="/challenges"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">挑战</span>
              </Link>
              <Link
                href="/search"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-xs">全局</span>
              </Link>
              <Link
                href="/game"
                className="flex flex-col items-center text-content-secondary hover:text-brand-primary transition-colors"
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h.01M6 12h.01M6 18h.01M12 6h.01M12 12h.01M12 18h.01M18 6h.01M18 12h.01M18 18h.01" />
                </svg>
                <span className="text-xs">游戏</span>
              </Link>
              <button
                onClick={() => setShowRobot(true)}
                className={`flex flex-col items-center transition-all duration-200 transform hover:scale-105 text-content-secondary hover:text-brand-primary`}
                title={robotPreloaded ? "机器人已就绪" : "正在加载机器人..."}
              >
                <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs">机器人</span>
              </button>
              {/* 👑 VIP 会员入口 */}
              <button
                onClick={() => setShowVip(true)}
                className="flex flex-col items-center transition-all duration-200 transform hover:scale-110 relative group"
                title="开通/续费 VIP 会员"
              >
                <div className="relative">
                  <svg className="w-5 h-5 mb-1 text-yellow-400 group-hover:text-yellow-300 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2 3h10v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1z"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                </div>
                <span className="text-xs text-yellow-400 group-hover:text-yellow-300 font-semibold">VIP</span>
              </button>
            </div>
          </div>

          {/* 中间：桌面端搜索框 */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <GlobalSearch
              className="w-full"
              placeholder="搜索... (Ctrl+K)"
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
                  className="text-content-secondary hover:text-brand-primary"
                />
              </Tooltip>
            </div>

            {status === 'loading' ? (
              // 加载状态 - 显示占位符
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-line-strong rounded-full animate-pulse"></div>
                <div className="w-16 h-4 bg-line-strong rounded animate-pulse hidden md:block"></div>
              </div>
            ) : session && session.user ? (
              <>
                {/* 通知铃铛 */}
                <Tooltip title="通知">
                  <Badge count={0} size="small">
                    <Button
                      type="text"
                      icon={<BellOutlined />}
                      className="text-content-secondary hover:text-brand-primary"
                    />
                  </Badge>
                </Tooltip>

                {/* 用户头像和菜单 */}
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <div className="flex items-center space-x-2 cursor-pointer p-1 rounded-lg hover:bg-control-fill-hover">
                    <Avatar
                      size="small"
                      src={user?.image || session?.user?.image || undefined}
                      icon={!(user?.image || (session?.user?.image)) ? <UserOutlined /> : undefined}
                      className="bg-brand-primary"
                    />
                    <span className="text-sm font-medium text-content-secondary hidden md:block">
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
                  className="text-content-secondary hover:text-brand-primary"
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

      <SettingModal open={settingOpen} onClose={() => setSettingOpen(false)} />

      {/* AI 3D机器人 */}
      {showRobot && (
        <AI3DRobot onClose={() => setShowRobot(false)} />
      )}

      {/* 👑 VIP 会员弹窗 */}
      <VipModal
        open={showVip}
        onClose={() => setShowVip(false)}
        currentVipLevel={(user as any)?.vipLevel || 0}
        onActivated={() => window.location.reload()}
      />
    </nav>
  );
}
