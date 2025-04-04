"use client";
import { useState } from 'react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/auth/email-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          company: company.trim()
        }),
      });

      if (res.ok) {
        setStatus('sent');
      } else {
        const errorData = await res.json();
        console.error('❌ API Error:', errorData);
        setStatus('error');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setStatus('error');
    }
  };

  const handleSocialLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.error('Google login error:', error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border border-gray-700 rounded bg-zinc-900 shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login to QbitShield</h1>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded"
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded"
        >
          {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
        </button>

        <button
          type="button"
          onClick={handleSocialLogin}
          className="flex items-center justify-center w-full px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200"
        >
          <FcGoogle className="mr-2 text-xl" /> Sign in with Google
        </button>

        {status === 'sent' && (
          <p className="text-green-400 text-sm text-center">
            ✅ Magic login link sent. Check your email.
          </p>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">
            ❌ Failed to send login link. Try again.
          </p>
        )}
      </form>

      <Link
        href="/"
        className="absolute bottom-6 text-sm underline text-gray-400 hover:text-white"
      >
        ← Back to Home
      </Link>
    </div>
  );
}