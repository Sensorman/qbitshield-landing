// app/api/auth/callback/route.js
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const res = NextResponse.redirect(new URL('/dashboard', request.url))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          try {
            return cookies().get(name)?.value
          } catch {
            return undefined
          }
        },
        set(name, value, options) {
          try {
            res.cookies.set(name, value, options)
          } catch {}
        },
        remove(name, options) {
          try {
            res.cookies.set(name, '', { ...options, maxAge: 0 })
          } catch {}
        },
      },
    }
  );

  await supabase.auth.getSession();

  const redirectUrl = new URL(request.url);
  const target = redirectUrl.searchParams.get("redirect");
  if (target && target.startsWith("/")) {
    return NextResponse.redirect(new URL(target, request.url));
  }

  return res;
}