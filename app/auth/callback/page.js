"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"

export default function CallbackPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      console.log("🔍 Supabase session:", data?.session)
      console.log("⚠️ Supabase error (if any):", error)

      if (data?.session) {
        console.log("✅ Session found, redirecting to /dashboard")
        router.push("/dashboard")
      } else {
        console.warn("🚫 No session found, redirecting to /login")
        router.push("/login?error=session")
      }
    }

    checkSession()
  }, [supabase, router]) // ✅ Include dependencies

  return <p className="text-white">Verifying login...</p>
}