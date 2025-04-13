// middleware.js
import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('📡 SESSION FROM MIDDLEWARE:', session)

  if (!session?.user) {
    return NextResponse.redirect(new URL('/login?error=session', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}