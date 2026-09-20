'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationItems, NavigationItems, NavigationItem } from '../data/navigation';

// 创建侧边栏上下文
const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  collapsed: boolean;
  toggleCollapsed: () => void;
  side: 'left' | 'right';
  setSide: (s: 'left' | 'right') => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
  collapsed: false,
  toggleCollapsed: () => {},
  side: 'left',
  setSide: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [side, setSideState] = useState<'left' | 'right'>('left');

  // 监听屏幕大小变化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // 桌面端默认打开
      } else {
        setIsOpen(false); // 移动端默认关闭
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 恢复持久化状态
  useEffect(() => {
    setCollapsed(localStorage.getItem('sidebar_collapsed') === '1');
    setSideState(localStorage.getItem('sidebar_side') === 'right' ? 'right' : 'left');
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', next ? '1' : '0');
      return next;
    });
  };

  const setSide = (s: 'left' | 'right') => {
    setSideState(s);
    localStorage.setItem('sidebar_side', s);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, collapsed, toggleCollapsed, side, setSide }}>
      {children}
    </SidebarContext.Provider>
  );
}

/* 桌面端占位（侧边栏悬浮后由它撑开布局；仅在侧边栏停靠在对应侧且未收起时有宽度） */
export function SidebarSpacer({ position }: { position: 'left' | 'right' }) {
  const { collapsed, side } = useSidebar();
  const show = !collapsed && side === position;
  return (
    <div
      aria-hidden="true"
      className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${show ? 'w-[19.5rem]' : 'w-0'}`}
    />
  );
}

/* 分类彩色图标（按分类名固定映射，未登记的走哈希兜底） */
const CATEGORY_ICONS: Record<string, { icon: string; color: string }> = {
  '计算机': { icon: '💻', color: '#0ea5e9' },
  '人工智能': { icon: '🤖', color: '#8b5cf6' },
  '网络安全': { icon: '🛡️', color: '#ef4444' },
  '软件工程': { icon: '⚙️', color: '#10b981' },
};
const FALLBACK_ICONS = [
  { icon: '📚', color: '#6366f1' },
  { icon: '🎯', color: '#f59e0b' },
  { icon: '🧩', color: '#ec4899' },
  { icon: '🔧', color: '#14b8a6' },
];
function categoryIcon(category: string) {
  if (CATEGORY_ICONS[category]) return CATEGORY_ICONS[category];
  let h = 0;
  for (const c of category) h = (h * 31 + c.charCodeAt(0)) % 997;
  return FALLBACK_ICONS[h % FALLBACK_ICONS.length];
}

/* 底部快捷入口 */
const QUICK_LINKS = [
  { label: '学习路线图', desc: '规划你的学习路径', icon: '🗺️', href: '/study' },
  { label: '编程挑战', desc: '星图关卡闯关', icon: '🏆', href: '/challenges' },
  { label: '我的笔记', desc: '记录与分享知识', icon: '📝', href: '/notes' },
  { label: '个人中心', desc: '成就与收藏', icon: '⭐', href: '/profile' },
];

const PANEL_W = 288; // 侧边栏宽度 w-72

export default function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const pathname = usePathname();
  const initialized = useRef(false);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { isOpen, setIsOpen, collapsed, toggleCollapsed, side, setSide } = useSidebar();
  const dragStartX = useRef(0);
  const dragActive = useRef(false);
  const offsetRef = useRef(0);
  const sideRef = useRef(side);
  useEffect(() => { sideRef.current = side; }, [side]);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleItem = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  // 移动端点击链接后关闭侧边栏
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!initialized.current && typeof window !== 'undefined') {
      setExpandedCategory(localStorage.getItem('sidebar_expandedCategory'));
      setExpandedItem(localStorage.getItem('sidebar_expandedItem'));
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) {
      if (expandedCategory !== null) {
        localStorage.setItem('sidebar_expandedCategory', expandedCategory);
      } else {
        localStorage.removeItem('sidebar_expandedCategory');
      }
      if (expandedItem !== null) {
        localStorage.setItem('sidebar_expandedItem', expandedItem);
      } else {
        localStorage.removeItem('sidebar_expandedItem');
      }
    }
  }, [expandedCategory, expandedItem]);

  // ===== 拖拽：抓标题栏移动，松手贴墙 =====
  const startDrag = (clientX: number) => {
    if (window.innerWidth < 1024 || collapsed) return;
    dragStartX.current = clientX;
    dragActive.current = true;
    offsetRef.current = 0;
    setDragging(true);
  };

  const moveDrag = (clientX: number) => {
    if (!dragActive.current) return;
    offsetRef.current = clientX - dragStartX.current;
    setDragOffset(offsetRef.current);
  };

  const endDrag = () => {
    if (!dragActive.current) return;
    dragActive.current = false;
    // 按面板最终中心点决定贴哪侧墙
    const dockedX = sideRef.current === 'left' ? 8 : window.innerWidth - 8 - PANEL_W;
    const centerX = dockedX + offsetRef.current + PANEL_W / 2;
    const next: 'left' | 'right' = centerX > window.innerWidth / 2 ? 'right' : 'left';
    if (next !== sideRef.current) setSide(next);
    offsetRef.current = 0;
    setDragOffset(0);
    setDragging(false);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: any) => {
      const x = e.touches ? e.touches[0].clientX : (e as MouseEvent).clientX;
      if (e.touches) e.preventDefault();
      moveDrag(x);
    };
    const onUp = () => endDrag();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as any, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as any);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [dragging]);

  // 根据当前路径自动展开对应的分类和项目
  useEffect(() => {
    if (pathname.startsWith('/study/')) {
      let found = false;

      Object.entries(navigationItems).forEach(([category, items]) => {
        if (found) return;

        items.forEach((item) => {
          if (found) return;

          if (item.subitems && item.subitems.length > 0) {
            const firstHref = item.subitems[0].href;
            const parts = firstHref.split('/');
            const homepage = parts.slice(0, -1).join('/');

            if (pathname === homepage || item.subitems.some(sub => pathname === sub.href)) {
              setExpandedCategory(category);
              setExpandedItem(item.name);
              found = true;
            }
          }
        });
      });
    }
  }, [pathname]);

  // 自动滚动到高亮项
  useEffect(() => {
    const ref = Object.values(itemRefs.current).find(
      (el) => el && el.classList.contains('text-gray-900')
    );
    if (ref) {
      ref.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [pathname]);

  // 拖拽中的内联位移（松手后恢复 class 过渡，贴墙动画由 left/right 切换完成）
  const dragStyle: React.CSSProperties = dragging
    ? {
        transform: `translateX(${dragOffset}px) scale(1.02)`,
        transition: 'none',
        left: side === 'left' ? 8 : undefined,
        right: side === 'right' ? 8 : undefined,
      }
    : {};

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 桌面端收起后的浮动展开按钮（跟随停靠侧） */}
      {collapsed && (
        <button
          onClick={toggleCollapsed}
          title="展开侧边栏"
          className={`hidden lg:flex fixed top-[4.75rem] z-40 w-9 h-9 rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-md items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-lg transition-all ${
            side === 'left' ? 'left-3' : 'right-3'
          }`}
        >
          <svg
            className={`w-4 h-4 ${side === 'right' ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* 侧边栏（可拖拽悬浮玻璃面板，松手贴墙） */}
      <div
        className={`
        fixed top-0 left-0 h-full w-72 z-50 transform transition-all duration-300 ease-in-out overflow-hidden
        backdrop-blur-2xl backdrop-saturate-150
        border border-white/70 shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-30
        lg:top-[4.5rem] lg:bottom-2 lg:h-auto lg:rounded-2xl lg:shadow-2xl
        ${side === 'left' ? 'lg:left-2 lg:right-auto' : 'lg:right-2 lg:left-auto'}
        ${collapsed ? 'lg:-translate-x-[110%] lg:opacity-0 lg:pointer-events-none' : ''}
        ${dragging ? 'lg:shadow-2xl' : ''}
      `}
        style={{
          ...(dragStyle),
          background: 'linear-gradient(165deg, rgba(255,255,255,0.12) 0%, rgba(238,243,250,0.08) 50%, rgba(255,255,255,0.1) 100%)',
        }}
      >
        {/* 顶部高光（液态玻璃反光） */}
        <div
          className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 60%, transparent)' }}
        />
        <div className="relative flex flex-col h-full w-72">
          {/* 头部（拖拽把手） */}
          <div
            onMouseDown={(e) => startDrag(e.clientX)}
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            className={`flex items-center justify-between px-4 py-4 border-b border-white/10 select-none ${
              dragging ? 'cursor-grabbing' : 'lg:cursor-grab'
            }`}
            title="拖动移动位置"
          >
            <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2 pointer-events-none">
              <span className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white text-xs shadow-sm">☰</span>
              分类导航
            </h2>
            <div className="flex items-center gap-1">
              {/* 移动端关闭按钮 */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* 桌面端收起按钮（箭头朝向停靠侧外侧） */}
              <button
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onClick={toggleCollapsed}
                title="收起侧边栏"
                className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-900/10 transition-colors"
              >
                <svg
                  className={`w-4 h-4 ${side === 'right' ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 导航内容 */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            {Object.entries(navigationItems).map(([category, items]: [string, NavigationItem[]]) => {
              const catOpen = expandedCategory === category;
              const { icon, color } = categoryIcon(category);
              return (
                <div key={category}>
                  {/* 一级：大分类 */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      catOpen
                        ? 'text-gray-900 bg-white/60'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                      style={{ background: `${color}1a` }}
                    >
                      {icon}
                    </span>
                    <span className="flex-1 text-left">{category}</span>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${catOpen ? 'rotate-90' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* 二级：技术列表（平滑展开动画） */}
                  <div className={`grid transition-all duration-300 ${catOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="ml-5 pl-4 border-l-2 border-white/10 space-y-0.5 my-1">
                        {items.map((item: NavigationItem) => {
                          const itemOpen = expandedItem === item.name;
                          return (
                            <div key={item.code}>
                              <button
                                onClick={() => toggleItem(item.name)}
                                className={`w-full flex items-center justify-between px-2.5 py-1.5 text-sm rounded-lg transition-colors ${
                                  itemOpen
                                    ? 'text-gray-900 font-semibold bg-white/70'
                                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                                }`}
                                ref={(el: HTMLButtonElement | null) => {
                                  if (el) itemRefs.current[item.name] = el;
                                }}
                              >
                                <span>{item.name}</span>
                                {item.subitems && item.subitems.length > 0 && (
                                  <svg
                                    className={`w-3 h-3 transition-transform duration-300 ${itemOpen ? 'rotate-90' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                )}
                              </button>

                              {/* 三级：章节列表（平滑展开动画） */}
                              {item.subitems && item.subitems.length > 0 && (
                                <div className={`grid transition-all duration-300 ${itemOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                  <div className="overflow-hidden">
                                    <div className="ml-3 space-y-0.5 my-0.5">
                                      {item.subitems.map((sub: { name: string; href: string }) => {
                                        const active = pathname === sub.href;
                                        return (
                                          <Link
                                            key={sub.name}
                                            href={sub.href}
                                            onClick={handleLinkClick}
                                            className={`flex items-center gap-2 px-2.5 py-1.5 text-sm rounded-lg transition-colors ${
                                              active
                                                ? 'bg-white/80 text-gray-900 font-semibold'
                                                : 'text-gray-500 hover:bg-white/50 hover:text-gray-900'
                                            }`}
                                          >
                                            <span
                                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${active ? 'bg-gray-800' : 'bg-gray-300'}`}
                                            />
                                            {sub.name}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* 底部快捷入口 */}
          <div className="px-3 py-3 border-t border-white/10 space-y-0.5">
            {QUICK_LINKS.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-white/70 text-gray-900'
                      : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base flex-shrink-0">{link.icon}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium leading-tight">{link.label}</span>
                    <span className="block text-[11px] text-gray-400 leading-tight">{link.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
