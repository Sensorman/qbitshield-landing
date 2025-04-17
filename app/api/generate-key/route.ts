import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // ignored in SSR
          }
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch usage
  const { data: usage, error: usageError } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (!usage || usage.usage_count >= usage.limit) {
    return NextResponse.json({ error: 'Usage limit reached' }, { status: 403 })
  }

  // Generate key from external API
  const apiRes = await fetch(
    'https://theqbitshield-api-258062438248.us-central1.run.app/qkd/generate',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${usage.api_key}`,
      },
    }
  )

  const keyData = await apiRes.json()

  // Update usage count
  await supabase
    .from('usage')
    .update({ usage_count: usage.usage_count + 1 })
    .eq('user_id', session.user.id)

  return NextResponse.json(keyData)
}