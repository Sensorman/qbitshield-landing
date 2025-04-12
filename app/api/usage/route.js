import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookies().get(name)?.value;
        },
        set(name, value, options) {
          cookies().set({ name, value, ...options });
        },
        remove(name, options) {
          cookies().set({ name, value: '', ...options, maxAge: 0 });
        }
      }
    }
  );

  const {
  data: { session },
} = await supabase.auth.getSession()

console.log("🧠 Supabase session:", session)

if (!session?.user) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

const { data, error } = await supabase
  .from("usage")
  .select("*") // for debugging
  .eq("user_id", session.user.id)
  .maybeSingle()  // instead of .single()

console.log("📊 Usage row fetched:", data)

if (error) {
  return NextResponse.json({ error: error.message }, { status: 500 })
}

return NextResponse.json(data ?? {}, { status: 200 })
}