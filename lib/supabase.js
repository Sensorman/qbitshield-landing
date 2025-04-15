// lib/supabase.js
import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

let supabase = null;

if (typeof window !== 'undefined' && !supabase) {
  supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export { supabase };