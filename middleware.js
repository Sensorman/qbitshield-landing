// middleware.js
import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'

/** @type {import('next/server').NextFetchEvent} */
export async function middleware(req) {
  const res = NextResponse.next()

  // create Supabase client for middleware
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('📡 SESSION FROM MIDDLEWARE:', session)

  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('from', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
  matcher: ['/dashboard'],
}