import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // SSR-safe silent fail
          }
        },
      },
    }
  )

  // ✅ Convert NextRequest to native Request (per Supabase docs)
  const requestUrl = new Request(request.url, {
    headers: request.headers,
    method: request.method,
  })

  // ✅ Exchange code for session properly
  await supabase.auth.exchangeCodeForSession(requestUrl)

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}