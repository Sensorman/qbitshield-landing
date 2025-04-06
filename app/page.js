"use client";
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch("/api/auth/email-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.trim(),
        name: name.trim(),
        company: company.trim()
      }),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="text-center mb-10">
        <Image
          src="/Black-QbitShieldVectorLogo.png"
          alt="QbitShield Logo"
          width={160}
          height={40}
          className="mx-auto"
        />
        <h1 className="text-4xl font-bold text-green-400 mt-4">Quantum-Safe Key Infrastructure</h1>
        <p className="text-gray-300 max-w-2xl mx-auto mt-4">
          QbitShield uses Prime Harmonic Modulation to generate quantum-secure API keys.
          Built for developers, researchers, and high-security environments.
        </p>
      </header>

      <main className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-green-300 text-center">Try It Now</h2>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-700 rounded p-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
          />

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600"
          >
            {status === 'loading' ? "Sending..." : "Send Login Link"}
          </button>

          {status === 'success' && (
            <p className="text-green-400 text-sm text-center">
              ✅ Magic link sent. Check your email.
            </p>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">
              ❌ Failed to send magic link. Try again.
            </p>
          )}
        </form>

        <section className="mt-16 text-center">
          <h3 className="text-xl font-bold text-green-300 mb-4">Pricing Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-700 rounded p-6">
              <h4 className="text-lg font-semibold">Free Tier</h4>
              <p className="text-green-400 text-2xl mt-2">$0</p>
              <p className="text-zinc-400 mt-2">Get started with 20 free API calls per month.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded p-6">
              <h4 className="text-lg font-semibold">Pro Tier</h4>
              <p className="text-green-400 text-2xl mt-2">$99</p>
              <p className="text-zinc-400 mt-2">Scale up with 10,000 calls/month and advanced support.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded p-6">
              <h4 className="text-lg font-semibold">Enterprise</h4>
              <p className="text-green-400 text-xl mt-2">Custom</p>
              <p className="text-zinc-400 mt-2">Contact sales for unlimited access and SLA support.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}