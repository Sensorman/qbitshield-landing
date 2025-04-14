import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    // protect all routes except static assets and auth routes
    '/((?!_next/static|_next/image|favicon.ico|auth|login|signup).*)',
  ],
}