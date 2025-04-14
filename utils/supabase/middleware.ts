// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const cookieStore = cookies(); // ❌ DO NOT AWAIT

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        }
      }
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}