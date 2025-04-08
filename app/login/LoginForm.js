'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { FcGoogle } from "react-icons/fc"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push("/dashboard")
  }

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://qbitshield.com/auth/callback'
    }
  })

  if (error) {
    setError(error.message)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Log In</h1>

        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded" />

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
          <a href="#" onClick={() => alert('We’ll add reset password soon')} className="text-blue-400 hover:underline">
          Forgot your password?
          </a>
        </p>

        {error && <p className="text-red-400 text-sm text-center">❌ {error}</p>}
      </form>
    </div>
  )
}