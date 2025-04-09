'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (!error) {
          setSubmitted(true);
          setTimeout(() => router.push('/login'), 3000);
        } else {
          alert('Error resetting password: ' + error.message);
        }
      }
    });
  }, [newPassword, router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl font-bold mb-4">🔑 Reset Password</h1>
      <input
        type="password"
        placeholder="New Password"
        className="p-2 text-black"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button
        onClick={() => setSubmitted(true)}
        className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
      >
        Submit
      </button>

      {submitted && <p className="mt-4 text-green-400">Redirecting to login...</p>}
    </div>
  );
}