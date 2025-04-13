// middleware.js
import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({
    req,
    res,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

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
  matcher: ['/dashboard'],
}