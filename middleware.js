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
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.set({ name, value: '', ...options, maxAge: 0 });
        }
      }
    }
  );

  const { data: { session }, error } = await supabase.auth.getSession();

  console.log("🧠 [Middleware] Session:", session);
  console.log("❌ [Middleware] Error:", error);

  if (!session?.user) {
    console.log("🚫 [Middleware] No session. Redirecting to login...");
    const loginUrl = new URL('/login?error=session', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log("✅ [Middleware] Authenticated:", session.user.email);
  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect dashboard and all subroutes
};