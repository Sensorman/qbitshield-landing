'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const supabase = createClient()

  useEffect(() => {
    async function exchangeCode() {
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error('❌ Error exchanging code:', error.message)
          router.push('/login?error=exchange')
        } else {
          router.push('/dashboard')
        }
      }
    }

    exchangeCode()
  }, [code, supabase, router])

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <p>🔄 Logging you in...</p>
    </div>
  )
}