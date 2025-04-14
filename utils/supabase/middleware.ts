'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function updateSession(request: NextRequest): Promise<any> {
  const cookieStore = cookies(); // ✅ Do not await

  const supabase = createClient(cookieStore)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user
}