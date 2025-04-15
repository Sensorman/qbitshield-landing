// app/auth/callback/route.ts
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // ✅ use destructured object correctly (request is passed properly)
  await supabase.auth.exchangeCodeForSession({ request })

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}