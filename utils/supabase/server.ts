import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/ssr'

export function createClient() {
  return createServerComponentClient({ cookies })
}st