import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set() {}, // not used here
        remove() {}, // not used here
      },
    }
  )

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user || error) {
    redirect('/login')
  }

  // ✅ Instead of fetch(), use Supabase directly
  const { data: usage, error: usageError } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (usageError || !usage) {
    redirect('/login?error=NoUsageData')
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <form method="post" action="/logout">
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
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