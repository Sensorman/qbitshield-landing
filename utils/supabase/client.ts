// utils/supabase/client.ts
import { createPagesBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createPagesBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}