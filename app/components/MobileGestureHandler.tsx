'use client';

import { useEffect, useRef, useState } from 'react';
import { useSidebar } from './Sidebar';
import { useRouter } from 'next/navigation';

interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}

interface MobileGestureHandlerProps {
  children: React.ReactNode;
}

export default function MobileGestureHandler({ children }: MobileGestureHandlerProps) {
  const { isOpen, setIsOpen } = useSidebar();
  const router = useRouter();
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null);
  const [lastTap, setLastTap] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 手势配置
  const minSwipeDistance = 50;
  const maxVerticalOffset = 100;
  const maxSwipeTime = 300;
  const doubleTapDelay = 300;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    const now = Date.now();
    
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: now
    });
    setTouchEnd(null);

    // 检测双击
    if (now - lastTap < doubleTapDelay) {
      handleDoubleTap(touch.clientX, touch.clientY);
      setLastTap(0);
    } else {
      setLastTap(now);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });

    // 如果正在滑动侧边栏，阻止默认滚动
    const deltaX = touch.clientX - touchStart.x;
    if (Math.abs(deltaX) > 10 && touchStart.x < 50) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    const deltaTime = touchEnd.timestamp - touchStart.timestamp;

    // 检查是否是有效的水平滑动
    const isValidHorizontalSwipe = 
      absDeltaX > minSwipeDistance && 
      absDeltaY < maxVerticalOffset && 
      deltaTime < maxSwipeTime;

    // 检查是否是有效的垂直滑动
    const isValidVerticalSwipe = 
      absDeltaY > minSwipeDistance && 
      absDeltaX < maxVerticalOffset && 
      deltaTime < maxSwipeTime;

    if (isValidHorizontalSwipe) {
      // 从左边缘向右滑动 - 打开侧边栏
      if (deltaX > 0 && touchStart.x < 50 && !isOpen) {
        setIsOpen(true);
        vibrate(15);
      }
      // 向左滑动 - 关闭侧边栏或返回
      else if (deltaX < 0) {
        if (isOpen) {
          setIsOpen(false);
          vibrate(10);
        } else if (absDeltaX > 100) {
          // 大幅度左滑 - 返回上一页
          router.back();
          vibrate(10);
        }
      }
      // 向右滑动 - 返回上一页
      else if (deltaX > 0 && touchStart.x > 50 && absDeltaX > 100) {
        router.back();
        vibrate(10);
      }
    }

    // 垂直滑动 - 刷新页面
    if (isValidVerticalSwipe && deltaY > 0 && touchStart.y < 100) {
      // 下拉刷新（可选功能）
      // window.location.reload();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleDoubleTap = (x: number, y: number) => {
    // 双击顶部 - 滚动到顶部
    if (y < 100) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      vibrate(10);
    }
  };

  const vibrate = (duration: number) => {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 只在移动端添加触摸事件
    if (window.innerWidth < 1024) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, touchEnd, isOpen, lastTap]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {children}
      
      {/* 手势提示（首次访问时显示） */}
      {typeof window !== 'undefined' && !localStorage.getItem('gesture-hint-shown') && (
        <div className="fixed bottom-20 left-0 right-0 mx-4 p-4 bg-blue-600 text-white rounded-lg shadow-lg z-40 lg:hidden animate-bounce">
          <div className="text-sm font-medium mb-2">💡 手势提示</div>
          <div className="text-xs space-y-1">
            <div>• 从左边缘右滑：打开菜单</div>
            <div>• 右滑：返回上一页</div>
            <div>• 双击顶部：回到顶部</div>
          </div>
          <button
            onClick={() => {
              localStorage.setItem('gesture-hint-shown', 'true');
              const hint = document.querySelector('.animate-bounce');
              if (hint) {
                hint.classList.add('hidden');
              }
            }}
            className="mt-2 text-xs underline"
          >
            知道了
          </button>
        </div>
      )}
    </div>
  );
} 