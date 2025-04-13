"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [checkingSession, setCheckingSession] = useState(true)
  const [usage, setUsage] = useState(null)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  useEffect(() => {
    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      console.log("🔑 Session from getSession():", session)

      if (!session?.user) {
        router.replace("/login?error=session")
        return
      }

      setUser(session.user)
      await fetchUsage()
      setCheckingSession(false)
    }

    const fetchUsage = async () => {
      try {
        const res = await fetch("/api/usage")
        const data = await res.json()
        console.log("📊 Usage data:", data)
        setUsage(data)
      } catch (err) {
        console.error("⚠️ Failed to fetch usage:", err)
      }
    }

    init()
  }, [router, supabase.auth])