import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options })
        },
        remove(name, options) {
          cookies().set({ name, value: '', ...options, maxAge: 0 })
        }
      }
    }
  )

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch usage data
  const { data: usage, error: usageError } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (!usage || usage.usage_count >= usage.limit) {
    return NextResponse.json({ error: 'Usage limit reached' }, { status: 403 })
  }

  // Hit the live PB-QKD API
  const apiRes = await fetch("https://theqbitshield-api-258062438248.us-central1.run.app/qkd/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${usage.api_key}`
    }
  })

  const keyData = await apiRes.json()

  // Increment usage
  await supabase
    .from('usage')
    .update({ usage_count: usage.usage_count + 1 })
    .eq('user_id', session.user.id)

  return NextResponse.json(keyData)
}