// middleware.js
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log('📡 SESSION FROM MIDDLEWARE:', session);

  // Protect /dashboard route
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session?.user) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('error', 'session');
    redirectUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard'],
};