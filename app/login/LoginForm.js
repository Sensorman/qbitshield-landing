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
    router.push('/dashboard')
    router.refresh()
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://qbitshield.com/api/auth/callback?redirect=/dashboard'
      }
    });

    if (error) console.error("Google login failed:", error.message);
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'https://qbitshield.com/api/auth/callback?redirect=/dashboard'
      }
    });
    if (error) console.error("GitHub login failed:", error.message);
  };

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

        <button
          type="button"
          onClick={handleGitHubLogin}
          className="flex items-center justify-center w-full px-4 py-2 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800"
        >
          <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.65.5.5 5.77.5 12.29c0 5.2 3.44 9.6 8.21 11.17.6.1.82-.27.82-.6 0-.29-.01-1.07-.02-2.1-3.34.73-4.04-1.66-4.04-1.66-.55-1.43-1.35-1.8-1.35-1.8-1.1-.78.08-.77.08-.77 1.22.08 1.87 1.27 1.87 1.27 1.08 1.9 2.83 1.35 3.52 1.03.11-.8.42-1.35.76-1.66-2.66-.3-5.47-1.34-5.47-5.96 0-1.32.46-2.4 1.23-3.25-.12-.3-.53-1.5.12-3.12 0 0 1-.32 3.29 1.23A11.7 11.7 0 0 1 12 6.07c1.02.01 2.04.14 3 .4 2.28-1.55 3.27-1.23 3.27-1.23.66 1.62.24 2.82.12 3.12.77.85 1.22 1.93 1.22 3.25 0 4.63-2.82 5.65-5.5 5.95.43.38.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .33.21.71.83.59A11.79 11.79 0 0 0 23.5 12.3C23.5 5.77 18.35.5 12 .5z"/>
          </svg>
          Log in with GitHub
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