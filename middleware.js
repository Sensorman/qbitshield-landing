import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const isProtected = req.nextUrl.pathname.startsWith('/dashboard')

    if (isProtected && !session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('from', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return res
  } catch (err) {
    console.error("❌ Middleware failed:", err)
    return new Response("Internal error in middleware", { status: 500 })
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}