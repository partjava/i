'use client';

/**
 * SessionProvider.tsx
 * 已从 NextAuth SessionProvider 迁移为 JWT 认证，此组件保留为空壳以避免修改 import。
 */
export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}