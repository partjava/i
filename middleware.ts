import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 检查是否在生产环境且请求是HTTP
  if (process.env.NODE_ENV === 'production' && 
      request.nextUrl.protocol === 'http:' &&
      request.nextUrl.hostname === 'www.partjava.com') {
    
    // 重定向到HTTPS
    const httpsUrl = new URL(request.url)
    httpsUrl.protocol = 'https:'
    httpsUrl.port = ''
    
    return NextResponse.redirect(httpsUrl.toString())
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}