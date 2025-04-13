// middleware.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          try {
            return req.cookies?.get(name)?.value;
          } catch {
            return undefined;
          }
        },
        set(name, value, options) {
          try {
            res.cookies.set(name, value, options);
          } catch {}
        },
        remove(name, options) {
          try {
            res.cookies.set(name, '', { ...options, maxAge: 0 });
          } catch {}
        }
      }
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isProtected = req.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};