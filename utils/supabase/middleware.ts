// middleware.ts
import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res: response })
  await supabase.auth.getSession()
  return response
}

export const config = {
  matcher: [
    /*
      Match routes you want middleware to protect
      Example: only protect /dashboard
    */
    '/dashboard/:path*',
  ],
}