// middleware.js
import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
  const response = NextResponse.next()

  const supabase = createMiddlewareClient({
    cookies: () => cookies(), // Correctly inject the cookie getter
  })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  console.log('📡 Middleware session:', session, error)

  if (!session?.user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard'],
}