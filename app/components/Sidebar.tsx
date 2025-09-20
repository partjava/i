'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from 'antd';
import { navigationItems, NavigationItems, NavigationItem } from '../data/navigation';

// 创建侧边栏上下文
const SidebarContext = createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {}
});

export const useSidebar = () => useContext(SidebarContext);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
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

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export default function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();
  const initialized = useRef(false);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { isOpen, setIsOpen } = useSidebar();

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const toggleItem = (itemName: string) => {
    if (expandedItem === itemName) {
      setExpandedItem(null);
    } else {
      setExpandedItem(itemName);
    }
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

  // 根据当前路径自动展开对应的分类和项目
  useEffect(() => {
    if (pathname.startsWith('/study/')) {
      let found = false;
      
      // 遍历所有分类和项目，找到匹配的路径
      Object.entries(navigationItems).forEach(([category, items]) => {
        if (found) return; // 如果已经找到，停止搜索
        
        items.forEach((item) => {
          if (found) return; // 如果已经找到，停止搜索
          
          if (item.subitems && item.subitems.length > 0) {
            // 检查是否是技术主页面路径
            const firstHref = item.subitems[0].href;
            const parts = firstHref.split('/');
            const homepage = parts.slice(0, -1).join('/');
            
            // 检查当前路径是否匹配技术主页面或子页面
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

  // 页面初始化时也执行一次自动展开逻辑
  useEffect(() => {
    if (initialized.current && pathname.startsWith('/study/')) {
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
  }, [initialized.current]);

  // 自动滚动到高亮项
  useEffect(() => {
    const ref = Object.values(itemRefs.current).find(
      (el) => el && el.classList.contains('text-blue-600')
    );
    if (ref) {
      ref.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* 侧边栏 */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
      `}>
        {/* 移动端关闭按钮 */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">导航菜单</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 桌面端标题 */}
        <div className="hidden lg:block px-4 py-5">
          <h2 className="text-lg font-medium text-gray-900">分类导航</h2>
        </div>





        {/* 导航内容 */}
        <nav className="mt-5 px-2 pb-20 overflow-y-auto h-full">
          {Object.entries(navigationItems).map(([category, items]: [string, NavigationItem[]]) => (
            <div key={category} className="mb-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
              >
                <span>{category}</span>
                <span className="transform transition-transform duration-200">
                  {expandedCategory === category ? '▼' : '▶'}
                </span>
              </button>
              {expandedCategory === category && (
                <div className="ml-4 mt-2">
                  {items.map((item: NavigationItem) => (
                    <div key={item.code}>
                      <button
                        onClick={() => toggleItem(item.name)}
                        className="w-full flex items-center justify-between px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        ref={(el: HTMLButtonElement | null) => {
                          if (el) {
                            itemRefs.current[item.name] = el;
                          }
                        }}
                      >
                        <span>{item.name}</span>
                        {item.subitems && (
                          <span>{expandedItem === item.name ? '▼' : '▶'}</span>
                        )}
                      </button>
                      {item.subitems && expandedItem === item.name && (
                        <div className="ml-4 mt-1">
                          {item.subitems.map((sub: { name: string; href: string }) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={handleLinkClick}
                              className={`block px-2 py-1 text-sm rounded hover:bg-blue-50 ${pathname === sub.href ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  );
} 