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
            // ignore set error on server
          }
        },
      },
    }
  )

  // ✅ Extract the `code` param from the URL
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // ✅ Perform PKCE code exchange (this is crucial)
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const redirectTo = searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}