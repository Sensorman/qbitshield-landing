// middleware.js
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name, options) {
          response.cookies.set({ name, value: '', ...options, maxAge: 0 })
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  console.log('📡 SESSION FROM MIDDLEWARE:', session)

  if (!session?.user) {
    return NextResponse.redirect(new URL(`/login?error=session`, request.url))
  }

  return response
}

// Restrict this middleware only to protected routes
export const config = {
  matcher: ['/dashboard']
}