// app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server' // 👈 make sure this works!

export async function GET(request: NextRequest) {
  const supabase = createClient()

  // 🧠 This handles the code exchange!
  await supabase.auth.exchangeCodeForSession(request)

  const redirectUrl = new URL(request.url)
  const redirectTo = redirectUrl.searchParams.get('redirect') || '/dashboard'

  return NextResponse.redirect(new URL(redirectTo, request.url))
}