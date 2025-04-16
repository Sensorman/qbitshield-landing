'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function SignupForm() {
  const router = useRouter()
  const [supabase] = useState(() => createClient()) // ✅ browser-safe only

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name }
      }
    })

    if (error) setError(error.message)
    else router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleSignup} className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />
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
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
        >
          Create Account
        </button>

        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in here
          </a>
        </p>

        {error && <p className="text-red-400 text-sm text-center">❌ {error}</p>}
      </form>
    </div>
  )
}