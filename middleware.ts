import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?error=session')
  }

  const usageRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/usage`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` },
    cache: 'no-store',
  })

  const usage = await usageRes.json()

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome {user.email}</h1>
        <form method="post" action="/logout">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </form>
      </header>

      <main className="p-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">🔐 API Dashboard</h2>
        <p>Your API Key: <code>{usage.api_key}</code></p>
        <p>Tier: {usage.tier}</p>
        <p>Used: {usage.usage_count} / {usage.limit}</p>
        <p>Remaining: {usage.limit - usage.usage_count}</p>
      </main>
    </div>
  )
}