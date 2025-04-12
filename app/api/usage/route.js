import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request) {
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

  if (error || !session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error: queryError } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (queryError) {
    return NextResponse.json({ error: 'Usage not found' }, { status: 404 })
  }

  return NextResponse.json({
    tier: data.tier,
    usage_count: data.usage_count,
    limit: data.limit,
    remaining: data.limit - data.usage_count,
    api_key: data.api_key,
  })
}