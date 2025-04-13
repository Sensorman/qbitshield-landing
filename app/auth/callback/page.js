"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase.js"

export default function CallbackPage() {
  const router = useRouter()

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
  }, [])

  return <p className="text-white">Verifying login...</p>
}