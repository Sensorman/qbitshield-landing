import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const cookieStore = cookies() // ✅ no await!

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  // ✅ Supabase expects a plain Request object, not NextRequest
  const rawRequest = new Request(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'manual',
  })

  await supabase.auth.exchangeCodeForSession(rawRequest)

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}