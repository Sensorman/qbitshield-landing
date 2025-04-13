import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/ssr';

export async function middleware(request) {
  const response = NextResponse.next();

  const supabase = createMiddlewareClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    request,
    response
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isProtected = request.nextUrl.pathname.startsWith('/dashboard');

  if (isProtected && !session) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}