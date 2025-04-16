// utils/supabase/client.ts
import { createBrowserClient } from '@supabase/auth-helpers-react'

export function createClient() {
  return createBrowserClient()
}