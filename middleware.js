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
          const val = req.cookies.get(name)?.value;
          console.log("🍪 GET COOKIE:", name, val?.slice(0, 20));
          return val;
        },
        set(name, value, options) {
          console.log("🍪 SET COOKIE:", name);
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          console.log("❌ REMOVE COOKIE:", name);
          res.cookies.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );

  const { data: { session }, error } = await supabase.auth.getSession();

  console.log("📡 SESSION:", session);
  if (error) console.log("⚠️ Supabase getSession error:", error.message);

  if (!session?.user) {
    console.log("🔒 Unauthorized, redirecting to login.");
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('error', 'session');
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ Middleware: User session verified", session.user.email);
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};