"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [usage, setUsage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        fetchUsage();
      }
    });

    const fetchUsage = async () => {
      try {
        const res = await fetch("/api/usage", {
          headers: {
            "api-key": "test-api-key"
          }
        });
        const data = await res.json();
        setUsage(data);
      } catch (err) {
        console.error("Failed to load usage:", err);
      }
    };
  }, [router]); // ✅ Patch: Add router as a dependency

  if (!user || !usage) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">🔐 Checking session and loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <Image
          src="/Black-QbitShieldVectorLogo.png"
          alt="QbitShield Logo"
          width={150}
          height={50}
          priority
        />
        <Link href="/" className="text-sm underline text-gray-300 hover:text-white">
          Home
        </Link>
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
            <h3 className="text-xl font-bold text-white">{usage.remaining}</h3>
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