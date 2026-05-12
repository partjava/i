import { NextRequest, NextResponse } from 'next/server'

const rateMap = new Map<string, { count: number; resetAt: number }>()

const LIMITS: Record<string, { max: number; windowMs: number }> = {
  '/api/ai/chat': { max: 30, windowMs: 60000 },
  '/api/ai/conversations': { max: 60, windowMs: 60000 },
  '/api/execute-code': { max: 20, windowMs: 60000 },
  '/api/auth/register': { max: 5, windowMs: 60000 },
  '/api/forgot-password': { max: 3, windowMs: 60000 },
  '/api/search': { max: 30, windowMs: 60000 },
  '/api/notes': { max: 60, windowMs: 60000 },
  '/api/comments': { max: 30, windowMs: 60000 },
  '/api/upload': { max: 10, windowMs: 60000 },
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.protocol === 'http:' &&
    request.nextUrl.hostname === 'www.partjava.com'
  ) {
    const u = new URL(request.url)
    u.protocol = 'https:'
    u.port = ''
    return NextResponse.redirect(u.toString())
  }

  const route = Object.entries(LIMITS).find(([prefix]) =>
    pathname.startsWith(prefix)
  )
  if (!route) return NextResponse.next()

  const [, { max, windowMs }] = route
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'anonymous'
  const id = `${ip}:${pathname}`
  const now = Date.now()
  let entry = rateMap.get(id)

  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + windowMs }
    rateMap.set(id, entry)
  }

  entry.count++

  if (entry.count > max) {
    const seconds = Math.ceil((entry.resetAt - now) / 1000)
    return new Response(
      JSON.stringify({ error: '请求过于频繁，请稍后再试', retryAfter: seconds }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(seconds),
        },
      }
    )
  }

  const res = NextResponse.next()
  res.headers.set('X-RateLimit-Limit', String(max))
  res.headers.set('X-RateLimit-Remaining', String(Math.max(0, max - entry.count)))
  res.headers.set('X-RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)))
  return res
}

export const config = { matcher: '/api/:path*' }
