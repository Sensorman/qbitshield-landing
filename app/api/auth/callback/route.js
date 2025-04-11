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

  // This finalizes the OAuth login
  await supabase.auth.getSession()

  return NextResponse.redirect(new URL('/dashboard', request.url))
}