import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const url = new URL(request.url)
  const returnTo = url.searchParams.get('redirect') || '/dashboard'

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options })
        },
        remove(name, options) {
          cookies().set({ name, value: '', ...options, maxAge: 0 })
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  console.log("🔐 Finalizing session:", session)

  if (session?.user) {
    return NextResponse.redirect(new URL(returnTo, request.url))
  }

  return NextResponse.redirect(new URL('/login?error=session', request.url))
}