'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { FcGoogle } from "react-icons/fc"

export default function LoginForm() {
  const router = useRouter()
  const [from, setFrom] = useState('/dashboard')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      const url = new URLSearchParams(window.location.search)
      setFrom(url.get('from') || '/dashboard')
    }
  }, [router.isReady])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setError("Login failed. Please try again.")
      setLoading(false)
      return
    }

    console.log("✅ Login session:", session)
    router.push(from)
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://xyyrxmrhukiucdfurpku.supabase.co/auth/v1/callback?flowName=GeneralOAuthFlow'
      }
  })
    if (error) console.error("Google login failed:", error.message)
  }

  const handleForgotPassword = async () => {
    const email = prompt("Enter your email to reset password")
    if (!email) return

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://qbitshield.com/reset-password',
    })

    if (error) {
      alert('Reset failed: ' + error.message)
    } else {
      alert('Password reset email sent!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Log In</h1>

        <input type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded" />

        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded">
          Log In
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          <FcGoogle className="mr-2 text-xl" /> Log in with Google
        </button>

        <p className="text-sm text-center text-gray-400">
          Don’t have an account? <a href="/signup" className="text-blue-400 hover:underline">Sign up here</a>
        </p>

        <p className="text-sm text-center text-gray-400">
          <button
            onClick={handleForgotPassword}
            type="button"
            className="text-blue-400 hover:underline"
          >
            Forgot your password?
          </button>
        </p>

        {error && <p className="text-red-400 text-sm text-center">❌ {error}</p>}

        <p className="text-xs text-center text-gray-500 mt-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> • <a href="/terms" className="hover:underline">Terms of Service</a>
        </p>
      </form>
    </div>
  )
}