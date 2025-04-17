import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // 🧠 Await the cookieStore!
  const cookieStore = cookies() // ❌ old code (Promise<...>)

  // ✅ FIX HERE
  const allCookies = await cookieStore

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return allCookies.get(name)?.value // ✅ now it's safe
        },
        set() {},
        remove() {},
      },
    }
  )

  await supabase.auth.exchangeCodeForSession(request)

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}