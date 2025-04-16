import { createBrowserSupabaseClient } from '@supabase/auth-helpers-react'

export function createClient() {
  return createBrowserSupabaseClient()
}