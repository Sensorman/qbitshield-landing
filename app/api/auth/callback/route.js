// app/api/auth/callback/route.js

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request) {
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

  // Finalize login session
  await supabase.auth.getSession()

  // Clear redirectTo cookie
  cookies().set({ name: 'redirectTo', value: '', maxAge: 0 })

  // ✅ Redirect to dashboard
  const redirectTo = cookies().get('redirectTo')?.value || '/dashboard'
  return NextResponse.redirect(new URL(redirectTo, request.url))
}