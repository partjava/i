'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useAuth } from '@shared/hooks/useAuth';
import { useUser } from '../providers/UserProvider';
import { useRouter, usePathname } from 'next/navigation';
import { Button, Dropdown, Avatar, Badge, Tooltip } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  HomeOutlined,
  EditOutlined,
  BellOutlined,
  CodeOutlined,
  RobotOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useSidebar } from './Sidebar';
import SettingModal from './SettingModal';
// three.js + VRM 体积大（~1MB+），必须懒加载，避免拖累全站首屏（与 BottomNavigation 保持一致）
const AI3DRobot = dynamic(() => import('./AI3DRobot'), { ssr: false });
import StitchLogo from './StitchLogo';
import GlobalSearch from './GlobalSearch';
import VipModal from './VipModal';
import {
  PetCompanionEventDetail,
  speakWithHeju,
  stopHejuSpeech,
  subscribePetCompanionEvent,
  subscribePetSpeakingState,
} from '../lib/pet-companion-bus';

export default function Navbar() {
  const { data: session, status, signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { setIsOpen } = useSidebar();
  const [settingOpen, setSettingOpen] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [robotPreloaded, setRobotPreloaded] = useState(false);
  const [showVip, setShowVip] = useState(false);
  const [companionBubble, setCompanionBubble] = useState<PetCompanionEventDetail | null>(null);
  const [isHejuSpeaking, setIsHejuSpeaking] = useState(false);
  const [isPyiGpt, setIsPyiGpt] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPyiGpt(window.location.hostname.includes('pyigpt.com'));
    }
  }, []);

  const homeHref = isPyiGpt ? '/home' : '/';

  // 订阅全站「禾桔」主动伴学事件，直接赋能顶部导航栏 AI 助手按钮（无需右下角冗余悬浮球）
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const unsubEvent = subscribePetCompanionEvent(detail => {
      setCompanionBubble(detail);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setCompanionBubble(null);
      }, detail.durationMs || 9000);
    });
    const unsubSpeak = subscribePetSpeakingState(speaking => {
      setIsHejuSpeaking(speaking);
    });
    return () => {
      if (timer) clearTimeout(timer);
      unsubEvent();
      unsubSpeak();
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/' || href === '/home') {
      return isPyiGpt ? pathname === '/home' : (pathname === '/' || pathname === '/home');
    }
    if (href === '/challenges') {
      return isPyiGpt ? (pathname === '/challenges' || pathname === '/') : pathname?.startsWith('/challenges');
    }
    return pathname?.startsWith(href);
  };

  const navItemClass = (href: string) =>
    `relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-all duration-200 ${
      isActive(href)
        ? 'text-brand-primary font-semibold bg-white/45 dark:bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_rgba(15,23,42,0.06)] border border-white/75 dark:border-white/20'
        : 'text-content-primary/85 hover:text-brand-primary hover:bg-white/30 dark:hover:bg-white/10 border border-transparent'
    }`;

  // iOS 27 高透晶体液态玻璃胶囊公共样式（与左侧玻璃目录同系超低底色不透明度 + 顶部高光折射）
  const liquidIslandStyle: React.CSSProperties = {
    background:
      'var(--chrome-island-background, linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(238, 244, 252, 0.08) 50%, rgba(255, 255, 255, 0.12) 100%))',
    boxShadow:
      'var(--chrome-island-shadow, 0 10px 28px rgba(15, 23, 42, 0.08), inset 0 1.5px 0 rgba(255, 255, 255, 0.88), inset 0 -1px 0 rgba(255, 255, 255, 0.35))',
  };

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
        window.location.replace('/auth/login');
      }, 100);
    } catch (error) {
      console.error('退出失败', error);
      window.location.replace('/auth/login?error=true');
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'notes',
      icon: <EditOutlined />,
      label: '我的笔记',
      onClick: () => router.push('/notes'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => setSettingOpen(true),
    },
    // 如果具备管理员权限，动态增加”后台管理”入口链接
    ...(user?.role === 'ADMIN' || user?.role === 'OWNER' ? [
      {
        key: 'admin',
        icon: <SettingOutlined style={{ color: '#6366f1' }} />,
        label: '后台管理',
        onClick: () => router.push('/admin'),
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
    <nav className="sticky top-0 z-40 px-2.5 sm:px-4 lg:px-6 pt-2 pb-1.5 bg-transparent select-none">
      <div className="flex items-center justify-between gap-2.5 lg:gap-4">
        {/* 🏝️ 左岛：Logo + 桌面端导航矩阵（iOS 27 高透液态玻璃胶囊） */}
        <div
          className="relative flex items-center h-14 px-3 sm:px-4 rounded-full backdrop-blur-2xl backdrop-saturate-150 border border-white/75 dark:border-white/20 overflow-hidden"
          data-nav-island
          style={liquidIslandStyle}
        >
          {/* 顶部镜面折射高光带 */}
          <div
            data-glass-highlight
            className="absolute inset-x-4 top-0 h-5 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)',
            }}
          />

          {/* 移动端汉堡菜单 */}
          <button
            onClick={() => {
              setIsOpen(true);
              if (navigator.vibrate) {
                navigator.vibrate(10);
              }
            }}
            className="lg:hidden mr-2 p-2 rounded-full text-content-primary hover:bg-white/30 active:scale-95 transition-transform"
          >
            <MenuOutlined className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link href={homeHref} className="relative flex items-center space-x-2 pr-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-all duration-200 hover:scale-105 relative"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.22) 55%, rgba(186, 230, 253, 0.28) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)',
                boxShadow:
                  '0 4px 14px rgba(15, 23, 42, 0.08), inset 0 1.5px 3px rgba(255, 255, 255, 0.9)',
              }}
            >
              <StitchLogo size={24} />
            </div>
            <Image
              src="/images/logo-calligraphy-transparent.png"
              alt="PartJava"
              data-nav-wordmark
              width={921}
              height={601}
              className="h-6 sm:h-7 w-auto hidden sm:block drop-shadow-sm"
            />
          </Link>

          {/* 分隔竖线 */}
          <span data-nav-divider className="hidden md:block w-px h-6 mx-3 bg-white/50 dark:bg-white/15" />

          {/* 桌面端导航链接 */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <Link href={homeHref} data-nav-item aria-current={isActive(homeHref) ? 'page' : undefined} className={navItemClass(homeHref)}>
              <HomeOutlined className="text-base mb-0.5" />
              <span className="text-[11px] leading-tight">首页</span>
            </Link>

            <Link href="/notes" data-nav-item aria-current={isActive('/notes') ? 'page' : undefined} className={navItemClass('/notes')}>
              <EditOutlined className="text-base mb-0.5" />
              <span className="text-[11px] leading-tight">笔记</span>
            </Link>

            <Link href="/knowledge-graph" data-nav-item aria-current={isActive('/knowledge-graph') ? 'page' : undefined} className={navItemClass('/knowledge-graph')}>
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="text-[11px] leading-tight">图谱</span>
            </Link>

            <Link href="/profile" data-nav-item aria-current={isActive('/profile') ? 'page' : undefined} className={navItemClass('/profile')}>
              <UserOutlined className="text-base mb-0.5" />
              <span className="text-[11px] leading-tight">{session ? '资料' : '数据'}</span>
            </Link>

            <Link href="/code/editor" data-nav-item aria-current={isActive('/code') ? 'page' : undefined} className={navItemClass('/code')}>
              <CodeOutlined className="text-base mb-0.5" />
              <span className="text-[11px] leading-tight">代码</span>
            </Link>

            <Link href="/challenges" data-nav-item aria-current={isActive('/challenges') ? 'page' : undefined} className={navItemClass('/challenges')}>
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[11px] leading-tight">挑战</span>
            </Link>

            <Link href="/tools/game" data-nav-item aria-current={isActive('/tools/game') ? 'page' : undefined} className={navItemClass('/tools/game')}>
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h.01M6 12h.01M6 18h.01M12 6h.01M12 12h.01M12 18h.01M18 6h.01M18 12h.01M18 18h.01" />
              </svg>
              <span className="text-[11px] leading-tight">游戏</span>
            </Link>

            <button
              onClick={() => setShowRobot(true)}
              data-nav-item
              className="relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-all duration-200 text-content-primary/85 hover:text-brand-primary hover:bg-white/30 dark:hover:bg-white/10"
              title={robotPreloaded ? '机器人已就绪' : '正在加载机器人...'}
            >
              <svg className="w-4 h-4 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-[11px] leading-tight">机器人</span>
            </button>

            {/* 👑 VIP 会员入口 */}
            <button
              onClick={() => setShowVip(true)}
              className="relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-all duration-200 hover:scale-105 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/45 group"
              title="开通/续费 VIP 会员"
            >
              <div className="relative">
                <svg className="w-4 h-4 mb-0.5 text-amber-500 group-hover:text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2 3h10v1a1 1 0 01-1 1H8a1 1 0 01-1-1v-1z" />
                </svg>
                <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <span className="text-[11px] leading-tight text-amber-600 dark:text-amber-300 font-bold">VIP</span>
            </button>
          </div>
        </div>

        {/* 🏝️ 中岛：高透液态玻璃搜索胶囊 + 史迪仔 AI 助手 */}
        <div className="hidden md:flex items-center gap-2.5 flex-1 max-w-lg">
          <div
            className="flex-1 h-14 px-3 rounded-full backdrop-blur-2xl backdrop-saturate-150 border border-white/75 dark:border-white/20 relative overflow-hidden flex items-center"
            data-nav-island
          style={liquidIslandStyle}
          >
            <div
              data-glass-highlight
            className="absolute inset-x-4 top-0 h-5 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)',
              }}
            />
            <GlobalSearch
              className="w-full liquid-glass-search"
              placeholder="搜索课程、工具、笔记... (Ctrl+K)"
              size="middle"
            />
          </div>

          {/* 🐱 AI 学习助手：透明圆泡泡背景 + 像素黑猫 + 主动伴学情绪共振气泡 */}
          {!pathname?.startsWith('/study') && (
            <div className="relative flex-shrink-0">
              <Tooltip title="AI 学习助手（禾桔伴学中枢）">
                <button
                  onClick={() => {
                    setCompanionBubble(null);
                    window.dispatchEvent(new CustomEvent('toggle-ai-chat'));
                  }}
                  className={`w-16 h-12 rounded-[50%] flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group ${
                    companionBubble
                      ? companionBubble.type === 'celebrate'
                        ? 'ring-2 ring-emerald-400 animate-bounce'
                        : 'ring-2 ring-amber-400 animate-pulse'
                      : ''
                  }`}
                  style={{
                    width: 64, height: 48, minWidth: 64, borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.22) 55%, rgba(186, 230, 253, 0.32) 100%)',
                    backdropFilter: 'blur(16px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                    boxShadow:
                      '0 8px 24px rgba(15, 23, 42, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.95), inset 0 -2px 6px rgba(56, 189, 248, 0.25)',
                  }}
                  aria-label="打开AI助手"
                >
                  <span
                    className="absolute top-1.5 left-2.5 w-3.5 h-1.5 rounded-full bg-white/80 blur-[0.6px] rotate-[-25deg] pointer-events-none"
                  />
                  <StitchLogo size={42} className="scale-110" />
                  {isHejuSpeaking && (
                    <span className="absolute bottom-1 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-ping" />
                  )}
                </button>
              </Tooltip>

              {/* 🐾 顶栏「禾桔」主动伴学弹出胶囊（报错诊断提醒 / 通关庆贺 / 卡壳点拨） */}
              {companionBubble && (
                <div
                  className="absolute right-0 top-14 w-80 rounded-2xl p-3.5 shadow-2xl border backdrop-blur-xl z-50 transition-all"
                  style={{
                    background:
                      companionBubble.type === 'celebrate'
                        ? 'linear-gradient(145deg, rgba(6, 78, 59, 0.95), rgba(15, 23, 42, 0.96))'
                        : 'linear-gradient(145deg, rgba(30, 27, 75, 0.96), rgba(15, 23, 42, 0.96))',
                    borderColor:
                      companionBubble.type === 'celebrate'
                        ? 'rgba(52, 211, 153, 0.45)'
                        : 'rgba(129, 140, 248, 0.45)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">
                        {companionBubble.type === 'celebrate' ? '🎉' : '🐾'}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {companionBubble.title}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCompanionBubble(null)}
                      className="text-slate-400 hover:text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {companionBubble.message}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {companionBubble.promptToAsk && (
                        <button
                          type="button"
                          onClick={() => {
                            const prompt = companionBubble.promptToAsk;
                            setCompanionBubble(null);
                            window.dispatchEvent(
                              new CustomEvent('toggle-ai-chat', {
                                detail: { prompt, forceOpen: true },
                              })
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-[11px] font-semibold transition-colors"
                        >
                          💬 一键请教助教
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setCompanionBubble(null);
                          setShowRobot(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] font-medium transition-colors"
                      >
                        🐱 召唤 3D 禾桔
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (isHejuSpeaking) {
                          stopHejuSpeech();
                        } else {
                          speakWithHeju(companionBubble.message);
                        }
                      }}
                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 text-[11px] font-medium transition-colors"
                      title="语音播报"
                    >
                      {isHejuSpeaking ? '⏹ 停止' : '🔊 朗读'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🏝️ 右岛：用户状态与通知液态玻璃胶囊 */}
        <div
          className="relative flex items-center h-14 px-3 sm:px-3.5 rounded-full backdrop-blur-2xl backdrop-saturate-150 border border-white/75 dark:border-white/20 space-x-2 overflow-hidden"
          data-nav-island
          style={liquidIslandStyle}
        >
          <div
            data-glass-highlight
            className="absolute inset-x-3 top-0 h-5 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)',
            }}
          />
          {/* 移动端搜索按钮 */}
          <div className="sm:hidden">
            <Tooltip title="全局搜索">
              <Button
                type="text"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                onClick={() => router.push('/tools/search')}
                className="text-content-primary hover:text-brand-primary"
              />
            </Tooltip>
          </div>

          {status === 'loading' ? (
            <div className="flex items-center space-x-2 px-2">
              <div className="w-6 h-6 bg-white/50 rounded-full animate-pulse"></div>
              <div className="w-16 h-4 bg-white/50 rounded animate-pulse hidden md:block"></div>
            </div>
          ) : session && session.user ? (
            <>
              {/* 通知铃铛 */}
              <Tooltip title="通知">
                <Badge count={0} size="small">
                  <Button
                    type="text"
                    icon={<BellOutlined />}
                    className="!rounded-full text-content-primary hover:text-brand-primary hover:!bg-white/35"
                  />
                </Badge>
              </Tooltip>

              {/* 用户头像和菜单 */}
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <div data-nav-user className="flex items-center space-x-2 cursor-pointer py-1 pl-1 pr-2.5 rounded-full bg-white/30 hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20 border border-white/65 dark:border-white/20 transition-all">
                  <Avatar
                    size="small"
                    src={user?.image || session?.user?.image || undefined}
                    icon={!(user?.image || session?.user?.image) ? <UserOutlined className="text-slate-500 text-xs" /> : undefined}
                    style={{ backgroundColor: (user?.image || session?.user?.image) ? 'transparent' : '#f1f5f9' }}
                    className="shadow-sm border border-black/5 dark:border-white/10 overflow-hidden flex items-center justify-center shrink-0"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-content-primary hidden md:block">
                    {user?.name || session?.user?.name || session?.user?.email?.split('@')[0]}
                  </span>
                </div>
              </Dropdown>
            </>
          ) : (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => router.push('/auth/login')}
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-content-primary hover:text-brand-primary hover:bg-white/35 transition-all"
              >
                登录
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 shadow-sm transition-all"
              >
                注册
              </button>
            </div>
          )}
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
