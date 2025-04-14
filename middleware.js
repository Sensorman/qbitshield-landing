// middleware.js
import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({
    cookies,
  })

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  console.log('📡 SESSION FROM MIDDLEWARE:', session, error)

  if (!session?.user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard'],
}