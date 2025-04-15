// app/supabase-provider.js
'use client'
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { createContext, useContext, useState, useEffect } from 'react'

const SupabaseContext = createContext()

export const SupabaseProvider = ({ children }) => {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  )

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)