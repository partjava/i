import './_shared/styles/globals.css'
import type { Metadata, Viewport } from 'next'
import RootLayoutClient from './_shared/components/RootLayoutClient'
import 'antd/dist/reset.css'
import 'katex/dist/katex.min.css'

export const metadata: Metadata = {
  title: '禾硙 Unolgy - 编程学习与开发工具导航平台',
  description: '集成笔记管理、学习路径、编程挑战和AI助手的一站式学习平台。提供200+开发工具官网直达、算法刷题、技术文档等资源，让编程学习更高效。',
  keywords: ['禾硙', 'Unolgy', '编程学习', '开发工具', '算法刷题', '在线评测', '3D算法可视化', '技术笔记', 'AI助手'],
  authors: [{ name: '禾硙 Unolgy Team' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '禾硙 Unolgy',
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon-180x180.png',
  },
  openGraph: {
    title: '禾硙 Unolgy - 编程学习与开发工具导航平台',
    description: '集成笔记管理、学习路径、编程挑战和AI助手的一站式学习平台',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B3B6F',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <meta name="application-name" content="禾硙 Unolgy" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="禾硙 Unolgy" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1B3B6F" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />

        {/* Splash Screens */}
        <link rel="apple-touch-startup-image" href="/icons/icon-512x512.png" />

        {/* 首页同步揭幕幕布样式与首帧脚本（仅在首页首屏挂载期间生效，杜绝 3D WebGL 编译前闪出裸首页） */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #hewei-boot-curtain {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                background: radial-gradient(circle at 50% 45%, #ffffff 0%, #f1f5f9 72%);
                pointer-events: none;
              }
              html[data-hewei-theme="dark"] #hewei-boot-curtain {
                background: radial-gradient(circle at 50% 45%, #0f1c38 0%, #070d1b 72%);
              }
              html[data-hewei-intro-boot="1"] #hewei-boot-curtain {
                display: flex;
                opacity: 1;
                pointer-events: auto;
              }
              html[data-hewei-intro-boot="fade"] #hewei-boot-curtain {
                display: flex;
                opacity: 0;
                pointer-events: none;
                transition: opacity 240ms cubic-bezier(0.22, 1, 0.36, 1);
              }
              @keyframes hewei-curtain-pulse {
                0%, 100% { opacity: 0.72; transform: scale(0.97); }
                50% { opacity: 1; transform: scale(1.03); }
              }
              #hewei-boot-curtain img {
                width: 64px;
                height: 64px;
                object-fit: contain;
                filter: drop-shadow(0 0 18px rgba(216, 172, 75, 0.48));
                animation: hewei-curtain-pulse 1.6s ease-in-out infinite;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname,s=location.search||'';var replay=s.indexOf('intro=1')!==-1;var played=false;try{played=sessionStorage.getItem('hewei_intro_played')==='1';}catch(e){}if(replay||((p==='/'||p==='/home')&&!played)){var r=document.documentElement;var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){r.setAttribute('data-hewei-theme','dark');}r.setAttribute('data-hewei-intro-boot','1');setTimeout(function(){if(r.getAttribute('data-hewei-intro-boot')==='1'){r.setAttribute('data-hewei-intro-boot','fade');setTimeout(function(){if(r.getAttribute('data-hewei-intro-boot')==='fade'){r.removeAttribute('data-hewei-intro-boot');}},260);}},1800);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <div id="hewei-boot-curtain" aria-hidden="true" suppressHydrationWarning>
          <img src="/images/heauio/logo-grain.png" alt="" draggable={false} />
        </div>
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}