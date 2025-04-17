'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data?.session) router.push('/dashboard')
      else router.push('/login?error=session')
    }
    checkSession()
  }, [router])

  return <p className="text-white">Verifying login...</p>
}