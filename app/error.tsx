'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * 根级路由段错误边界（App Router 约定文件）
 * 任何页面内未捕获的客户端异常都会落到这里，避免整站白屏。
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 上报/记录错误（保留 digest 便于排查）
    console.error('[PartJava] 页面渲染异常:', error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f0] px-6">
      <div className="max-w-md w-full text-center py-16 px-8 rounded-3xl border border-[#8b7355]/25 bg-white/70 shadow-sm">
        <div className="text-5xl mb-4">🐾</div>
        <h1 className="text-2xl font-bold text-[#5c4033] mb-2">袋子打翻了墨水瓶</h1>
        <p className="text-sm text-[#8b7355] leading-relaxed mb-6">
          这个页面渲染时出了点小状况，内容暂时没能正常展示。
          <br />
          可以重试一次，或先回首页继续学习。
        </p>
        {error.digest && (
          <p className="text-xs text-[#a89279] mb-4 font-mono">错误标识：{error.digest}</p>
        )}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-xl bg-[#8b7355] text-[#faf6f0] text-sm font-medium hover:bg-[#5c4033] transition-colors"
          >
            重试一下
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-[#8b7355]/40 text-[#5c4033] text-sm font-medium hover:bg-[#8b7355]/10 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
