// middleware.ts
import { type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createMiddlewareClient({
    req: request,
    res: response
  })

  // Refresh session if needed
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    // Run middleware on all routes except static/image assets & API routes
    '/((?!_next/static|_next/image|favicon.ico|api/).*)',
  ],
}