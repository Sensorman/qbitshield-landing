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

  const { data: { session }, error } = await supabase.auth.getSession();

  console.log("🔒 Middleware session check:", session);
  console.log("🧩 Supabase session error:", error);

  if (!session?.user) {
    return NextResponse.redirect(new URL(`/login?error=session`, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};