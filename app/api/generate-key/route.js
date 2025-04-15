// app/api/generate-key/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  const {
    data: { session },
    error
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