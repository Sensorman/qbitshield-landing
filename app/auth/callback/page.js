'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function CallbackPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient()) // ✅ safe instantiation

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      console.log('🔐 Session:', data?.session)
      console.log('⚠️ Auth error:', error)

      if (data?.session) {
        router.push('/dashboard')
      } else {
        router.push('/login?error=session')
      }
    }

    checkSession()
  }, [router, supabase])

  return <p className="text-white">🔄 Verifying login...</p>
}