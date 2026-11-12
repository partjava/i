'use client';

import React from 'react';

export default function SiteFooter({ className = '' }: { className?: string }) {
  return (
    <footer
      className={`w-full py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400 select-none ${className}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {/* 版权信息 */}
        <span>© {new Date().getFullYear()} PartJava</span>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

        {/* 工信部 ICP 备案 */}
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline-offset-4 hover:underline"
        >
          鄂ICP备2025101495号-4
        </a>
        <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>

        {/* 全国公安机关互联网站安全管理服务平台备案 */}
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=42110002000517"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors underline-offset-4 hover:underline"
        >
          <img
            src="/images/beian-icon.png"
            alt="全国公安机关网络安全管理服务平台"
            className="w-4 h-4 object-contain shrink-0"
          />
          <span>鄂公网安备42110002000517号</span>
        </a>
      </div>
    </footer>
  );
}
