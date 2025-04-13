// /app/api/auth/callback/route.js
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options });
        },
        remove(name, options) {
          cookies().set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );

  // 👇 This finalizes the session by reading the code from URL and setting the cookie
  await supabase.auth.getSession();

  const redirectUrl = new URL(request.url);
  const target = redirectUrl.searchParams.get('redirect') || '/dashboard';
  return NextResponse.redirect(new URL(target, request.url));
}