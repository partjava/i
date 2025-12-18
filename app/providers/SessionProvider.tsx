'use client'

import { SessionProvider } from 'next-auth/react'

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider 
      refetchInterval={0} // 禁用自动刷新，手动控制
      refetchOnWindowFocus={true} // 窗口获得焦点时刷新
      refetchWhenOffline={false} // 离线时不刷新
    >
      {children}
    </SessionProvider>
  )
} 