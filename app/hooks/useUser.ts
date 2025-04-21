'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

interface UseUserResult {
  user: User | null
  session: Session | null
  isLoading: boolean
}

export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession()
      console.log('👤 getUser:', data.session?.user, 'error:', error)

      if (data?.session) {
        setUser(data.session.user)
        setSession(data.session)
      }

      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setSession(session ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])


  return { user, session, isLoading }
}