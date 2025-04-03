"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/auth/email-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login to QbitShield</h1>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
        >
          {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
        </button>

        {status === 'sent' && (
          <p className="mt-4 text-green-400 text-sm text-center">
            ✅ Magic login link sent. Check your email.
          </p>
        )}

        {status === 'error' && (
          <p className="mt-4 text-red-400 text-sm text-center">
            ❌ Failed to send login link. Try again.
          </p>
        )}
      </form>
      <Link href="/" passHref>
        <a className="text-sm underline text-gray-300 hover:text-white">Home</a>
      </Link>
    </div>
  );
}