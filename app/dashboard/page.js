"use client";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login"); // ❌ Not logged in
      } else {
        setUser(session.user); // ✅ Logged in
      }
    });
  }, []);

  if (!user) {
    return <p className="text-white text-center mt-12">Checking session...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-4 text-green-400">🔐 Welcome to your API Dashboard</h2>
      <p className="mb-6">You're logged in as <strong>{user.email}</strong></p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-zinc-900 p-6 rounded shadow text-center">
          <p className="text-zinc-400">Tier</p>
          <h3 className="text-xl font-bold text-white">Free</h3>
        </div>
        <div className="bg-zinc-900 p-6 rounded shadow text-center">
          <p className="text-zinc-400">Used</p>
          <h3 className="text-xl font-bold text-white">4 / 25</h3>
        </div>
        <div className="bg-zinc-900 p-6 rounded shadow text-center">
          <p className="text-zinc-400">Remaining</p>
          <h3 className="text-xl font-bold text-white">21</h3>
        </div>
      </div>
    </div>
  );
}