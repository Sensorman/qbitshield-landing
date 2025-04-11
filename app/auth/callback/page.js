"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase.js"

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (data?.session) router.push("/dashboard")
      else router.push("/login?error=session")
    }
    checkSession()
  }, [])

  return <p className="text-white">Verifying login...</p>
}