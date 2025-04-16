'use client'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-react'

export function createClient() {
  return createBrowserSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}