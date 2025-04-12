import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 })
        }
      }
    }
  )

  // Finalize login session
  await supabase.auth.getSession()

  // 👇 Check if redirectTo cookie exists, fallback to dashboard
  const redirectTo = cookieStore.get('redirectTo')?.value || '/dashboard'
  return NextResponse.redirect(new URL(redirectTo, request.url))
}