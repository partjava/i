'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
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
  EditOutlined,
  BellOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import {
  Home,
  PenLine,
  Network,
  User,
  Code2,
  Compass,
  Bot,
  Gamepad2,
  Sun,
  Moon,
} from 'lucide-react';
import { useLocale, UI_DICT } from '../lib/i18n';
import { useSidebar } from './Sidebar';
import SettingModal from './SettingModal';
// three.js + VRM 体积大（~1MB+），必须懒加载，避免拖累全站首屏（与 BottomNavigation 保持一致）
const AI3DRobot = dynamic(() => import('./AI3DRobot'), { ssr: false });
import StitchLogo from './StitchLogo';
import BrandLogo from './BrandLogo';
import SimpleLearningTracker from './SimpleLearningTracker';
import GlobalSearch from './GlobalSearch';
import VipModal from './VipModal';
import { navigationItems } from '../data/navigation';
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
  const [settingInitialTab, setSettingInitialTab] = useState<string>('general');
  const [showRobot, setShowRobot] = useState(false);
  const [robotPreloaded, setRobotPreloaded] = useState(false);
  const [showVip, setShowVip] = useState(false);
  const [companionBubble, setCompanionBubble] = useState<PetCompanionEventDetail | null>(null);
  const [isHejuSpeaking, setIsHejuSpeaking] = useState(false);
  const [isPyiGpt, setIsPyiGpt] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const locale = useLocale();
  const t = UI_DICT[locale].nav;
  const [studyMenuOpen, setStudyMenuOpen] = useState(false);
  const studyMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readNotifIds, setReadNotifIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hewei_read_notifications_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setReadNotifIds(parsed);
      }
    } catch {}
  }, []);

  const notifications = [
    {
      id: 'notif-page-memory',
      badge: 'AI 伴学升级',
      title: '页面专属记忆与 3D 禾硙书房已就绪',
      desc: '右下角 AI 助手现已按当前页面独立隔离上下文，3D 伴学书房支持素笺/墨砚双态切换。',
      time: '刚刚',
      actionLabel: '打开 3D 书房',
      onAction: () => setShowRobot(true),
    },
    {
      id: 'notif-challenges',
      badge: '星图闯关',
      title: '编程挑战星图与 AI 诊断热修复开放中',
      desc: '在挑战关卡中遇到报错，可一键唤起禾硙 AI 诊断生成双栏对比补丁。',
      time: '今日',
      actionLabel: '前往闯关',
      onAction: () => router.push('/challenges'),
    },
    {
      id: 'notif-library',
      badge: '教材与笔记',
      title: 'PDF 精装书架与一键提炼笔记草稿',
      desc: '阅读课程或 PDF 教材时，可随时将当前页代码与要点整理保存到笔记中心。',
      time: '常驻',
      actionLabel: '查看笔记',
      onAction: () => router.push('/notes'),
    },
  ];

  const unreadCount = notifications.filter(item => !readNotifIds.includes(item.id)).length;

  const markNotifRead = useCallback((id: string) => {
    setReadNotifIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem('hewei_read_notifications_v1', JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const markAllNotifsRead = useCallback(() => {
    const allIds = notifications.map(n => n.id);
    setReadNotifIds(allIds);
    try { localStorage.setItem('hewei_read_notifications_v1', JSON.stringify(allIds)); } catch {}
  }, []);

  useEffect(() => {
    const syncDark = () => setIsDark(document.body.classList.contains('dark'));
    syncDark();
    const observer = new MutationObserver(syncDark);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    window.addEventListener('partjava-settings-change', syncDark);
    return () => {
      observer.disconnect();
      window.removeEventListener('partjava-settings-change', syncDark);
    };
  }, []);

  const toggleThemeMode = useCallback(() => {
    const nextDark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', nextDark);
    setIsDark(nextDark);
    try {
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
      const raw = localStorage.getItem('user_settings');
      const parsed = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        'user_settings',
        JSON.stringify({ ...parsed, theme: nextDark ? 'dark' : 'light', darkMode: nextDark })
      );
    } catch {}
    window.dispatchEvent(
      new CustomEvent('partjava-settings-change', {
        detail: { theme: nextDark ? 'dark' : 'light', darkMode: nextDark },
      })
    );
  }, []);

  const openStudyMenu = useCallback(() => {
    if (studyMenuTimerRef.current) {
      clearTimeout(studyMenuTimerRef.current);
      studyMenuTimerRef.current = null;
    }
    setStudyMenuOpen(true);
  }, []);

  const scheduleCloseStudyMenu = useCallback(() => {
    if (studyMenuTimerRef.current) {
      clearTimeout(studyMenuTimerRef.current);
    }
    studyMenuTimerRef.current = setTimeout(() => {
      setStudyMenuOpen(false);
      studyMenuTimerRef.current = null;
    }, 180);
  }, []);

  useEffect(() => {
    setStudyMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setStudyMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (studyMenuTimerRef.current) clearTimeout(studyMenuTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPyiGpt(window.location.hostname.includes('pyigpt.com'));
    }
  }, []);

  const homeHref = isPyiGpt ? '/home' : '/';

  // 订阅全站「禾硙」主动伴学事件，直接赋能顶部导航栏 AI 助手按钮（无需右下角冗余悬浮球）
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
    `relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-[transform,color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] ${
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
      label: t.menuProfile,
      onClick: () => router.push('/profile'),
    },
    {
      key: 'notes',
      icon: <EditOutlined />,
      label: t.menuNotes,
      onClick: () => router.push('/notes'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t.menuSettings,
      onClick: () => {
        setSettingInitialTab('general');
        setSettingOpen(true);
      },
    },
    {
      key: 'vip',
      icon: <CrownOutlined style={{ color: '#D4AD72' }} />,
      label: t.menuVip,
      onClick: () => setShowVip(true),
    },
    {
      key: 'game',
      icon: <Gamepad2 className="w-3.5 h-3.5 text-[#D4AD72]" />,
      label: t.menuGame,
      onClick: () => router.push('/tools/game'),
    },
    // 如果具备管理员权限，动态增加”后台管理”入口链接
    ...(user?.role === 'ADMIN' || user?.role === 'OWNER' ? [
      {
        key: 'admin',
        icon: <SettingOutlined style={{ color: '#D4AD72' }} />,
        label: t.menuAdmin,
        onClick: () => router.push('/admin'),
      }
    ] : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t.menuLogout,
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

          {/* 禾硙 Brand Logo（点击直接重播 3D 品牌开场大片，随深浅色主题自动切换） */}
          <Tooltip title="重播 3D 品牌开场大片" placement="bottom">
            <button
              type="button"
              data-nav-replay-intro
              aria-label="重播 3D 品牌开场大片"
              onClick={() => window.dispatchEvent(new CustomEvent('hewei-replay-intro'))}
              className="relative flex items-center pr-1.5 shrink-0 cursor-pointer rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
            >
              <span className="inline-flex sm:hidden items-center">
                <BrandLogo variant="mark" className="w-10 h-10" priority />
              </span>
              <span className="hidden sm:inline-flex items-center">
                <BrandLogo variant="full" className="h-11 sm:h-12 w-auto drop-shadow-sm" priority />
              </span>
            </button>
          </Tooltip>

          {/* 分隔竖线 */}
          <span data-nav-divider className="hidden md:block w-px h-6 mx-2 bg-white/50 dark:bg-white/15" />

          {/* 桌面端导航链接（统一 Lucide 1.75px 线性图标） */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            <Link href={homeHref} data-nav-item aria-current={isActive(homeHref) ? 'page' : undefined} className={navItemClass(homeHref)}>
              <Home className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.home}</span>
            </Link>

            <Link href="/notes" data-nav-item aria-current={isActive('/notes') ? 'page' : undefined} className={navItemClass('/notes')}>
              <PenLine className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.notes}</span>
            </Link>

            <Link
              href="/knowledge-graph"
              data-nav-item
              data-nav-graph
              aria-current={isActive('/knowledge-graph') ? 'page' : undefined}
              aria-expanded={studyMenuOpen}
              onMouseEnter={openStudyMenu}
              onMouseLeave={scheduleCloseStudyMenu}
              onFocus={openStudyMenu}
              onClick={() => setStudyMenuOpen(false)}
              className={navItemClass('/knowledge-graph')}
            >
              <Network className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.graph}</span>
            </Link>

            <Link href="/profile" data-nav-item aria-current={isActive('/profile') ? 'page' : undefined} className={navItemClass('/profile')}>
              <User className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{session ? t.profile : t.data}</span>
            </Link>

            <Link href="/code/editor" data-nav-item aria-current={isActive('/code') ? 'page' : undefined} className={navItemClass('/code')}>
              <Code2 className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.code}</span>
            </Link>

            <Link href="/challenges" data-nav-item aria-current={isActive('/challenges') ? 'page' : undefined} className={navItemClass('/challenges')}>
              <Compass className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.challenges}</span>
            </Link>

            <button
              onClick={() => setShowRobot(true)}
              data-nav-item
              className="relative flex flex-col items-center justify-center px-2.5 py-1 rounded-2xl transition-[transform,color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] text-content-primary/85 hover:text-brand-primary hover:bg-white/30 dark:hover:bg-white/10"
              title={robotPreloaded ? '3D 伴学机器人已就绪' : '正在加载机器人...'}
            >
              <Bot className="w-4 h-4 mb-0.5" strokeWidth={1.75} />
              <span className="text-[11px] leading-tight">{t.robot}</span>
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
              placeholder={t.searchPlaceholder}
              size="middle"
            />
          </div>

          {/* 🐱 AI 学习助手：透明圆泡泡背景 + 像素黑猫 + 主动伴学情绪共振气泡 */}
          {!pathname?.startsWith('/study') && (
            <div className="relative flex-shrink-0">
              <Tooltip title="AI 学习助手（禾硙伴学中枢）">
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
                      'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(244, 245, 247, 0.42) 58%, rgba(212, 173, 114, 0.22) 100%)',
                    backdropFilter: 'blur(16px) saturate(160%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                    boxShadow:
                      '0 8px 24px rgba(15, 23, 42, 0.10), inset 0 2px 4px rgba(255, 255, 255, 0.92), inset 0 -2px 6px rgba(212, 173, 114, 0.22)',
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

              {/* 🐾 顶栏「禾硙」主动伴学弹出胶囊（墨砚金玻璃质感，锚点缩放） */}
              {companionBubble && (
                <div
                  className="absolute right-0 top-14 w-80 rounded-2xl p-3.5 shadow-2xl border backdrop-blur-xl z-50 origin-top-right animate-fadeIn transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    background:
                      companionBubble.type === 'celebrate'
                        ? 'linear-gradient(145deg, rgba(16, 42, 34, 0.96), rgba(14, 17, 22, 0.98))'
                        : 'linear-gradient(145deg, rgba(21, 25, 33, 0.97), rgba(14, 17, 22, 0.98))',
                    borderColor:
                      companionBubble.type === 'celebrate'
                        ? 'rgba(52, 211, 153, 0.42)'
                        : 'rgba(212, 173, 114, 0.42)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">
                        {companionBubble.type === 'celebrate' ? '🎉' : '🐾'}
                      </span>
                      <span className="text-xs font-bold text-[#F2EDE4]">
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

                  <p className="text-xs text-[#C5CBD6] leading-relaxed mb-3">
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
                          className="px-2.5 py-1 rounded-lg bg-[#D4AD72] hover:bg-[#E0BD86] text-[#0E1116] text-[11px] font-semibold transition-colors active:scale-[0.97]"
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
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F2EDE4] text-[11px] font-medium transition-colors active:scale-[0.97]"
                      >
                        🐱 召唤 3D 禾硙
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
                      className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#D4AD72] text-[11px] font-medium transition-colors active:scale-[0.97]"
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

        {/* 🏝️ 右侧：深浅主题一键切换 + 学习计时器 + 用户状态与通知液态玻璃胶囊 */}
        <div className="flex items-center gap-2 shrink-0">
          <Tooltip title={isDark ? t.themeToLight : t.themeToDark}>
            <button
              type="button"
              data-theme-toggle
              onClick={toggleThemeMode}
              aria-label={isDark ? t.themeToLight : t.themeToDark}
              className="h-10 w-10 rounded-full bg-surface-raised border border-line-subtle text-content-primary hover:border-brand-primary/45 hover:text-brand-primary shadow-sm flex items-center justify-center transition-[transform,border-color,color,background-color] duration-150 active:scale-[0.94] cursor-pointer shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#D4AD72] transition-transform duration-300 rotate-0" />
              ) : (
                <Moon className="w-4 h-4 text-brand-primary transition-transform duration-300 rotate-0" />
              )}
            </button>
          </Tooltip>
          <SimpleLearningTracker variant="navbar" />
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
              {/* 通知铃铛与交互式通知中心 */}
              <Dropdown
                open={notifOpen}
                onOpenChange={setNotifOpen}
                trigger={['click']}
                placement="bottomRight"
                dropdownRender={() => (
                  <div
                    data-notification-panel
                    className="w-80 sm:w-96 rounded-2xl border border-line-strong bg-surface-raised text-content-primary shadow-[0_20px_50px_rgba(15,29,51,0.22)] overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-3 border-b border-line-subtle bg-surface-muted/60">
                      <div className="flex items-center gap-2">
                        <BellOutlined className="text-brand-primary" />
                        <span className="text-xs sm:text-sm font-bold text-content-primary">消息通知</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-primary text-content-inverse">
                            {unreadCount} 条未读
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button
                            type="button"
                            onClick={markAllNotifsRead}
                            className="text-[11px] font-medium text-brand-primary hover:underline cursor-pointer"
                          >
                            全部已读
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setNotifOpen(false);
                            setSettingInitialTab('notification');
                            setSettingOpen(true);
                          }}
                          className="text-[11px] text-content-secondary hover:text-content-primary cursor-pointer"
                          title="通知偏好设置"
                        >
                          通知设置
                        </button>
                      </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-line-subtle">
                      {notifications.map(item => {
                        const isUnread = !readNotifIds.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              markNotifRead(item.id);
                              setNotifOpen(false);
                              item.onAction();
                            }}
                            className={`p-3.5 transition-colors cursor-pointer hover:bg-surface-muted/70 ${
                              isUnread ? 'bg-brand-soft/45' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-primary">
                                {isUnread && <span className="w-2 h-2 rounded-full bg-brand-primary inline-block" />}
                                {item.badge}
                              </span>
                              <span className="text-[11px] text-content-muted">{item.time}</span>
                            </div>
                            <div className="text-xs sm:text-[13px] font-semibold text-content-primary mb-1">
                              {item.title}
                            </div>
                            <p className="text-xs text-content-secondary leading-relaxed mb-2">
                              {item.desc}
                            </p>
                            <span className="inline-flex items-center text-[11px] font-semibold text-brand-primary hover:underline">
                              {item.actionLabel} →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              >
                <Tooltip title="通知">
                  <Badge count={unreadCount} size="small" offset={[-4, 4]}>
                    <Button
                      type="text"
                      aria-label="打开消息通知"
                      onClick={() => setNotifOpen(prev => !prev)}
                      icon={<BellOutlined />}
                      className="!rounded-full text-content-primary hover:text-brand-primary hover:!bg-white/35"
                    />
                  </Badge>
                </Tooltip>
              </Dropdown>

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
                className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-content-primary hover:text-brand-primary hover:bg-white/35 transition-[transform,color,background-color] duration-150 active:scale-[0.96]"
              >
                {t.login}
              </button>
              <button
                onClick={() => router.push('/auth/register')}
                className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-content-inverse bg-brand-primary hover:bg-brand-hover shadow-sm transition-[transform,background-color] duration-150 active:scale-[0.96]"
              >
                {t.register}
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* 悬停「图谱」展开的学习中心 4 栏体系课程矩阵（置于 overflow-hidden 胶囊之外防止裁切） */}
      <div
        data-study-mega-menu
        onMouseEnter={openStudyMenu}
        onMouseLeave={scheduleCloseStudyMenu}
        className={`hidden md:block absolute left-4 lg:left-6 top-[calc(100%-6px)] pt-2.5 z-50 w-[min(1080px,calc(100vw-2rem))] origin-top-left transition-[opacity,transform,visibility] ease-[cubic-bezier(0.23,1,0.32,1)] ${
          studyMenuOpen
            ? 'duration-200 opacity-100 visible translate-y-0 scale-100 pointer-events-auto'
            : 'duration-150 opacity-0 invisible -translate-y-1 scale-[0.985] pointer-events-none'
        }`}
      >
        <div className="rounded-2xl border border-line-strong bg-surface-raised shadow-[0_24px_60px_rgba(15,29,51,0.18)] p-5">
          <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-line-subtle">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-lg bg-brand-soft text-brand-primary text-xs font-bold">
                {t.megaBadge}
              </span>
              <span className="text-xs text-content-muted">
                {t.megaSub}
              </span>
            </div>
            <Link
              href="/knowledge-graph"
              onClick={() => setStudyMenuOpen(false)}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              {t.megaLink}
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-h-[68vh] overflow-y-auto pr-1">
            {Object.entries(navigationItems).map(([category, items]) => {
              const catTheme =
                category === '计算机'
                  ? {
                      dot: 'bg-[#1B3B6F] dark:bg-[#38BDF8]',
                      badge: 'bg-[#1B3B6F]/10 text-[#1B3B6F] border-[#1B3B6F]/20 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-400/25',
                      count: 'bg-[#1B3B6F]/10 text-[#1B3B6F] dark:bg-sky-500/15 dark:text-sky-300',
                    }
                  : category === '人工智能'
                  ? {
                      dot: 'bg-violet-600 dark:bg-violet-400',
                      badge: 'bg-violet-500/10 text-violet-700 border-violet-500/20 dark:bg-violet-500/15 dark:text-violet-300 dark:border-violet-400/25',
                      count: 'bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
                    }
                  : category === '网络安全'
                  ? {
                      dot: 'bg-amber-600 dark:bg-[#D4AD72]',
                      badge: 'bg-[#D4AD72]/15 text-[#9A7234] border-[#D4AD72]/35 dark:bg-[#D4AD72]/15 dark:text-[#E8CA96] dark:border-[#D4AD72]/30',
                      count: 'bg-[#D4AD72]/15 text-[#9A7234] dark:bg-[#D4AD72]/15 dark:text-[#E8CA96]',
                    }
                  : {
                      dot: 'bg-emerald-600 dark:bg-emerald-400',
                      badge: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-400/25',
                      count: 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
                    };
              return (
                <div key={category} className="min-w-0">
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-line-subtle">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${catTheme.dot}`} />
                      <h3 className="text-sm font-bold text-content-primary truncate">
                        {category}
                      </h3>
                    </div>
                    <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full shrink-0 ${catTheme.count}`}>
                      {items.length} 门
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {items.map((item) => {
                      const homepage =
                        item.subitems && item.subitems.length > 0
                          ? item.subitems[0].href.split('/').slice(0, -1).join('/')
                          : `/study/${item.name.toLowerCase()}`;
                      const lectureCount = item.subitems?.length || 0;
                      return (
                        <Link
                          key={item.code + item.name}
                          href={homepage}
                          onClick={() => setStudyMenuOpen(false)}
                          className="group flex items-center justify-between gap-2 text-content-secondary hover:text-content-primary text-[13.5px] transition-all py-1.5 px-2 rounded-xl border border-transparent hover:border-[#D4AD72]/40 hover:bg-surface-muted/80 dark:hover:bg-white/[0.06]"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border text-xs font-bold transition-transform group-hover:scale-105 ${catTheme.badge}`}
                            >
                              {item.code}
                            </span>
                            <span className="font-medium truncate group-hover:text-brand-primary dark:group-hover:text-[#D4AD72] transition-colors">
                              {item.name}
                            </span>
                          </div>
                          {lectureCount > 0 && (
                            <span className="text-[11px] font-mono text-content-muted shrink-0 tabular-nums">
                              {lectureCount} 讲
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <SettingModal
        open={settingOpen}
        onClose={() => setSettingOpen(false)}
        initialTab={settingInitialTab}
      />

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
