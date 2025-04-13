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
          console.log("🍪 GET COOKIE:", name, val);
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
  console.log("⚠️ ERROR:", error);

  if (!session?.user) {
    console.log("🛑 No session found. Redirecting to login.");
    const loginUrl = new URL('/login?error=session', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ User authenticated:", session.user.email);
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply only to /dashboard and subroutes
};