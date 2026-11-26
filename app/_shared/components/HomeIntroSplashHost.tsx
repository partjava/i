'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HomeIntroSplash from './HomeIntroSplash';

export const REPLAY_INTRO_EVENT = 'hewei-replay-intro';

// 模块级内存标记：每次整页打开或刷新重置，SPA 内来回切页不重复打扰
let hasAutoPlayedThisLoad = false;

export default function HomeIntroSplashHost() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/home';

  // 与服务端 SSR 保持一致的同步初始值，首帧直接包含开场遮罩，消除先闪裸首页的时间差
  const [activeMode, setActiveMode] = useState<'auto' | 'replay' | null>(() => {
    if (typeof window === 'undefined') {
      return isHome ? 'auto' : null;
    }
    if (isHome && !hasAutoPlayedThisLoad) {
      hasAutoPlayedThisLoad = true;
      return 'auto';
    }
    return null;
  });

  // 处理从 /auth/login 等子页 SPA 跳转进首页，以及 ?intro=1 导演模式参数
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === '1') {
      hasAutoPlayedThisLoad = true;
      setActiveMode('replay');
      return;
    }

    if (!isHome || hasAutoPlayedThisLoad) return;

    hasAutoPlayedThisLoad = true;
    setActiveMode('auto');
  }, [isHome]);

  // 监听全站 Navbar「重播 3D 开场大片」事件
  useEffect(() => {
    const onReplay = () => {
      hasAutoPlayedThisLoad = true;
      setActiveMode('replay');
    };
    window.addEventListener(REPLAY_INTRO_EVENT, onReplay);
    return () => window.removeEventListener(REPLAY_INTRO_EVENT, onReplay);
  }, []);

  const handleFinish = useCallback(() => {
    setActiveMode(null);
  }, []);

  if (!activeMode) return null;

  return <HomeIntroSplash key={activeMode} mode={activeMode} onFinish={handleFinish} />;
}
