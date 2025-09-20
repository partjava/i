'use client';

import { useEffect, useRef, useState } from 'react';
import { useSidebar } from './Sidebar';

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
  const [touchStart, setTouchStart] = useState<TouchPoint | null>(null);
  const [touchEnd, setTouchEnd] = useState<TouchPoint | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 最小滑动距离
  const minSwipeDistance = 50;
  // 最大垂直偏移
  const maxVerticalOffset = 100;
  // 最大滑动时间
  const maxSwipeTime = 300;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = Math.abs(touchEnd.y - touchStart.y);
    const deltaTime = touchEnd.timestamp - touchStart.timestamp;

    // 检查是否是有效的水平滑动
    const isValidSwipe = 
      Math.abs(deltaX) > minSwipeDistance && 
      deltaY < maxVerticalOffset && 
      deltaTime < maxSwipeTime;

    if (isValidSwipe) {
      // 从左边缘向右滑动 - 打开侧边栏
      if (deltaX > 0 && touchStart.x < 50 && !isOpen) {
        setIsOpen(true);
        // 触摸反馈
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
      // 向左滑动 - 关闭侧边栏
      else if (deltaX < 0 && isOpen) {
        setIsOpen(false);
        // 触摸反馈
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 只在移动端添加触摸事件
    if (window.innerWidth < 1024) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [touchStart, touchEnd, isOpen]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {children}
    </div>
  );
} 