'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from './client'

type SupabaseContextType = {
  user: User | null
  session: Session | null
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  session: null,
})

export const SupabaseProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()

    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setUser(data.session?.user ?? null)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => getSession())

    getSession()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ user, session }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export const useSupabase = () => useContext(SupabaseContext)