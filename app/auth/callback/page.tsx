'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

function CallbackHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirect') || '/dashboard'

  useEffect(() => {
    const supabase = createClient()

    const finishAuth = async () => {
      if (!code) {
        router.replace('/login?error=missing_code')
        return
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('❌ OAuth exchange failed:', error.message)
        router.replace('/login?error=auth')
      } else {
        router.replace(redirectTo)
      }
    }

    finishAuth()
  }, [code, redirectTo, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <p className="text-lg text-gray-400 animate-pulse">🔄 Finishing login...</p>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="text-white text-center mt-12">Loading...</p>}>
      <CallbackHandler />
    </Suspense>
  )
}

