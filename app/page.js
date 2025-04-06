"use client";
import { useState } from 'react';

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
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Sign In to Access Dashboard
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded"
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
    </div>
  );
}
