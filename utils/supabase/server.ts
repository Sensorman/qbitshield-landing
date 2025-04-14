import { createServerClient } from '@supabase/ssr'
import { cookies as defaultCookies } from 'next/headers'

export async function createClient(cookieStoreArg?: Awaited<ReturnType<typeof defaultCookies>>) {
  const cookieStore = cookieStoreArg ?? await defaultCookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options) {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 })
        },
      },
    }
  )
}