"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Make sure this is at the top

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [usage, setUsage] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const waitForSession = async () => {
      let tries = 0;
      let session = null;

      while (!session && tries < 10) {
        const { data } = await supabase.auth.getSession();
        session = data?.session;
        if (!session) {
          tries++;
          await new Promise((r) => setTimeout(r, 500)); // Wait 500ms
        }
      }

      if (!session) {
        console.warn("❌ No session found after retries");
        router.replace("/login?error=session");
        return;
      }

      console.log("✅ Authenticated session:", session);
      setUser(session.user);
      await fetchUsage(session.user.id);
      setCheckingSession(false);
    };

    const fetchUsage = async (userId) => {
      try {
        const res = await fetch("/api/usage");
        const data = await res.json();
        setUsage(data);
        console.log("✅ Usage fetched:", data);
      } catch (err) {
        console.error("🚨 Usage fetch error:", err);
      }
    };

    waitForSession();
  }, []);

  if (checkingSession || !user || !usage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">🔐 Logging in and loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <img src="/Black-QbitShieldVectorLogo.png" alt="QbitShield Logo" width={150} />
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm underline text-gray-300 hover:text-white">Home</Link>
          <form method="POST" action="/api/logout">
            <button type="submit" className="text-sm text-red-500 hover:text-red-700">Logout</button>
          </form>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-400">🔐 API Dashboard</h1>

        <div className="bg-zinc-900 p-6 rounded mb-8 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-2">Your API Key</h2>
          <p className="bg-gray-800 p-2 rounded text-sm font-mono select-all">{usage.api_key}</p>
          <p className="text-zinc-400 text-sm mt-2">Use this key with the QbitShield SDK to generate quantum keys securely.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-zinc-900 p-6 rounded shadow text-center">
            <p className="text-zinc-400">Tier</p>
            <h3 className="text-xl font-bold text-white">{usage.tier}</h3>
          </div>
          <div className="bg-zinc-900 p-6 rounded shadow text-center">
            <p className="text-zinc-400">Used</p>
            <h3 className="text-xl font-bold text-white">{usage.usage_count} / {usage.limit}</h3>
          </div>
          <div className="bg-zinc-900 p-6 rounded shadow text-center">
            <p className="text-zinc-400">Remaining</p>
            <h3 className="text-xl font-bold text-white">{usage.limit - usage.usage_count}</h3>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">📘 How to Use</h3>
          <pre className="bg-zinc-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`pip install git+https://github.com/Sensorman/qbitshield-sdk.git

from qbitshield import client
key = client.generate_key("your-api-key")`}
          </pre>
        </div>
      </main>
    </div>
  );
}