'use client';

import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HomeIntroSplash from './HomeIntroSplash';

export const REPLAY_INTRO_EVENT = 'hewei-replay-intro';
export const INTRO_PLAYED_STORAGE_KEY = 'hewei_intro_played';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// 模块级标记 + sessionStorage 会话标记：
// 仅当本次标签页会话初次直接打开域名首页（/ 或 /home）时自动播放一次；
// 站内点击「首页」返回、同会话刷新或从子页跳转首页不再重复播放，重播请点击左上角 Logo。
let hasResolvedEntryThisLoad = false;

function markIntroPlayedInSession(): void {
  try {
    sessionStorage.setItem(INTRO_PLAYED_STORAGE_KEY, '1');
  } catch {}
}

function hasPlayedIntroInSession(): boolean {
  try {
    return sessionStorage.getItem(INTRO_PLAYED_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export default function HomeIntroSplashHost() {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/home';

  // 与 SSR 保持一致（均为 null），避免水合不一致；真正需要的首屏遮罩由 app/layout.tsx 内联脚本同步控制
  const [activeMode, setActiveMode] = useState<'auto' | 'replay' | null>(null);
  const [replaySeq, setReplaySeq] = useState(0);

  // 首帧绘制前同步判定：仅当本标签页首次通过域名进入首页且未标记过时触发自动播放
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('intro') === '1') {
      hasResolvedEntryThisLoad = true;
      markIntroPlayedInSession();
      setReplaySeq((seq) => seq + 1);
      setActiveMode('replay');
      return;
    }

    if (hasResolvedEntryThisLoad) return;
    hasResolvedEntryThisLoad = true;

    const alreadyPlayed = hasPlayedIntroInSession();
    markIntroPlayedInSession();

    if (isHome && !alreadyPlayed) {
      setActiveMode('auto');
    } else if (document.documentElement.hasAttribute('data-hewei-intro-boot')) {
      document.documentElement.removeAttribute('data-hewei-intro-boot');
    }
  }, [isHome]);

  // 监听全站 Navbar 点击品牌 Logo 触发的「重播 3D 开场大片」事件
  useEffect(() => {
    const onReplay = () => {
      hasResolvedEntryThisLoad = true;
      markIntroPlayedInSession();
      setReplaySeq((seq) => seq + 1);
      setActiveMode('replay');
    };
    window.addEventListener(REPLAY_INTRO_EVENT, onReplay);
    return () => window.removeEventListener(REPLAY_INTRO_EVENT, onReplay);
  }, []);

  const handleFinish = useCallback(() => {
    setActiveMode(null);
  }, []);

  if (!activeMode) return null;

  return <HomeIntroSplash key={`${activeMode}-${replaySeq}`} mode={activeMode} onFinish={handleFinish} />;
}
