'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async () => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setMessage(error.message)
    else setMessage('✅ Your password has been reset. You can now log in.')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl mb-4">Reset Your Password</h1>
      <input
        type="password"
        placeholder="New Password"
        className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded mb-3 w-full max-w-sm"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-green-500 text-black px-6 py-2 rounded hover:bg-green-600"
      >
        Update Password
      </button>
      {message && <p className="mt-4 text-sm text-blue-400 text-center">{message}</p>}
    </div>
  )
}