import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { executeQuery } from './database'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-for-development",
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码')
        }

        try {
          // 从数据库查询用户（同时支持邮箱和用户名登录）
          const users = await executeQuery(
            'SELECT * FROM users WHERE email = ? OR username = ?',
            [credentials.email, credentials.email]
          ) as any[]

          if (!users || users.length === 0) {
            throw new Error('用户不存在')
          }
          
          let authenticatedUser = null;

          for (const user of users) {
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);
            if (isValidPassword) {
              authenticatedUser = user;
              break;
            }
          }

          if (!authenticatedUser) {
            throw new Error('密码错误')
          }

          return {
            id: authenticatedUser.id.toString(),
            name: authenticatedUser.name,
            email: authenticatedUser.email,
            username: authenticatedUser.username, // 透传用户名
            role: authenticatedUser.role, // 透传角色
            // 避免在session中存储大图片数据，只存储路径
            image: authenticatedUser.avatar && authenticatedUser.avatar.length < 200 ? authenticatedUser.avatar : null
          }
        } catch (error) {
          throw error
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30天
    // 减少session大小，防止HTTP 431错误
    updateAge: 24 * 60 * 60, // 24小时更新一次
  },
  jwt: {
    // 减少JWT token大小
    maxAge: 30 * 24 * 60 * 60, // 30天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.username = (user as any).username // 透传用户名到 token
        token.role = (user as any).role // 透传角色到 token
        if (user.image) {
          token.image = user.image
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && token.id) {
        session.user.id = String(token.id)
        session.user.email = String(token.email)
        session.user.name = String(token.name)
        ;(session.user as any).username = String(token.username || '') // 透传用户名到 session
        ;(session.user as any).role = String(token.role || 'USER') // 强转 any 规避 TS 检查
        if (token.image) {
          session.user.image = token.image
        }
      }
      return session
    }
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        // 减少cookie大小限制
        maxAge: 30 * 24 * 60 * 60 // 30天
      }
    }
  },
  debug: false // 禁用调试模式
}