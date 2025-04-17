// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createMiddlewareClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    getCookie: (name) => request.cookies.get(name)?.value,
    setCookie: (name, value, options) => {
      response.cookies.set({ name, value, ...options })
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/settings/:path*'],
}