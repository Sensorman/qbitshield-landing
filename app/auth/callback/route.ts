import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Always await cookies() when using advanced cookie store methods
  const cookieStore = await cookies()
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // Get all cookies for SSR session exchange
          async getAll() {
            return await cookieStore.getAll()
          },
          // Set all cookies returned by Supabase for session persistence
          async setAll(cookiesToSet) {
            for (const { name, value, options } of cookiesToSet) {
              await cookieStore.set(name, value, options)
            }
          }
        }
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      return NextResponse.redirect(
        new URL('/login?error=CouldNotAuthenticate', request.url)
      )
    }
  }

  const redirectTo = requestUrl.searchParams.get('redirect') || '/dashboard'
  return NextResponse.redirect(new URL(redirectTo, request.url))
}