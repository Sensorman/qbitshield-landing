// middleware.js
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    req,
    res
  });

  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};