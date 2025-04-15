'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function LoginForm() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // ✅ universal
      },
    })

    if (error) {
      console.error(`${provider} login error:`, error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Log In</h1>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin('google')}
          className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          <FcGoogle className="mr-2 text-xl" /> Log in with Google
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin('github')}
          className="flex items-center justify-center w-full px-4 py-2 bg-zinc-800 text-white font-semibold rounded hover:bg-zinc-700"
        >
          <FaGithub className="mr-2 text-xl" /> Log in with GitHub
        </button>

        <button
          type="button"
          onClick={() => handleOAuthLogin('linkedin_oidc')}
          className="flex items-center justify-center w-full px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800"
        >
          <FaLinkedin className="mr-2 text-xl" /> Log in with LinkedIn
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center">❌ {error}</p>
        )}

        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up here
          </a>
        </p>

        <p className="text-xs text-center text-gray-500 mt-4">
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>{' '}
          •{' '}
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </p>
      </form>
    </div>
  )
}