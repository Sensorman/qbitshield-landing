// middleware.js
import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function middleware(req) {
  const res = NextResponse.next()

  const supabase = createMiddlewareClient({
    req,
    res,
    cookies: {
      get(name) {
        return cookies().get(name)?.value
      },
      set(name, value, options) {
        cookies().set({ name, value, ...options })
      },
      remove(name, options) {
        cookies().set({ name, value: '', ...options, maxAge: 0 })
      },
    },
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log('📡 SESSION FROM MIDDLEWARE:', session)

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*'],
}