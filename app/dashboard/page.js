"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [usage, setUsage] = useState(null);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const init = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      console.log("🔑 Session from getSession():", session);

      if (!session?.user) {
        router.replace("/login?error=session");
        return;
      }

      setUser(session.user);
      await fetchUsage();
      setCheckingSession(false);
    };

    const fetchUsage = async () => {
      try {
        const res = await fetch("/api/usage");
        const data = await res.json();
        console.log("📊 Usage data:", data);
        setUsage(data);
      } catch (err) {
        console.error("⚠️ Failed to fetch usage:", err);
      }
    };

    init();
  }, [router, supabase.auth]);

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">🔐 Checking session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <img src="/Black-QbitShieldVectorLogo.png" alt="QbitShield Logo" width={150} height={50} />
        <a href="/" className="text-sm text-gray-400 hover:text-white underline">Home</a>
      </header>

      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-400">🔐 API Dashboard</h1>

        <div className="bg-zinc-900 p-6 rounded mb-8 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-2">Your API Key</h2>
          <p className="bg-gray-800 p-2 rounded text-sm font-mono select-all">{usage?.api_key || "N/A"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded text-center">
            <p className="text-gray-400">Tier</p>
            <p className="text-xl font-bold">{usage?.tier || "-"}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded text-center">
            <p className="text-gray-400">Used</p>
            <p className="text-xl font-bold">{usage?.usage_count || "0"}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded text-center">
            <p className="text-gray-400">Remaining</p>
            <p className="text-xl font-bold">
              {usage?.limit ? usage.limit - usage.usage_count : "-"}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">📘 How to Use</h3>
          <pre className="bg-zinc-800 text-green-400 p-4 rounded text-sm">
            {`pip install git+https://github.com/Sensorman/qbitshield-sdk.git

from qbitshield import client
key = client.generate_key("your-api-key")`}
          </pre>
        </div>
      </main>
    </div>
  );
}