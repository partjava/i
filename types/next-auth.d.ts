import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    email: string
    name: string
    image?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string
    email?: string
    image?: string
  }
} 