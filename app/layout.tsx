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
      </head>
      <body className="font-sans antialiased">
        <RootLayoutClient>
          {children}
        </RootLayoutClient>
      </body>
    </html>
  )
}