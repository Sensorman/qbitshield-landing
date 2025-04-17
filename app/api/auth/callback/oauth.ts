// app/api/auth/callback/route.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value
        },
        set(name, value, options) {
          // 👇 ignored at runtime by SSR
        },
        remove(name, options) {
          // 👇 ignored at runtime by SSR
        },
      }
    }
  )

  // exchangeCodeForSession is no longer needed in new setup
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}