'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  )

  return <>{children}</>  // We no longer need a context wrapper
}