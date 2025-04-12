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

  // ⏳ Wait for login session to be set
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // ✅ Debug logging
  console.log("🔐 Callback session:", session)

  // 🧭 Check session and redirect properly
  if (session?.user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/login?error=session', request.url))
}