import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email, name, company, phone } = await req.json();

  if (!email || !email.includes('@')) {
    return new Response('Invalid email', { status: 400 });
  }

  try {
    // Insert user but ignore duplicates
    await supabase
      .from('users')
      .upsert([{ email, name, company, phone }], { onConflict: 'email' });

    // Generate Supabase magic link
    const { data, error: otpError } = await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: 'https://qbitshield.com/login', // ✅ FIXED
  },
});

console.log("📨 OTP response data:", data);
console.log("❌ OTP error (if any):", otpError);

if (otpError || !data?.action_link) {
  return new Response(JSON.stringify({ error: 'Failed to generate magic link', otpError }), { status: 500 });
}

    if (otpError || !data?.action_link) {
      console.error('❌ Supabase OTP error:', otpError);
      return new Response('Failed to generate magic link', { status: 500 });
    }

    // Send email with Resend
    const emailResponse = await resend.emails.send({
      from: 'Will Daoud <will@qbitshield.com>',
      to: [email],
      subject: 'Your Magic Login Link',
      html: `
        <h2>🔐 Magic Link</h2>
        <p>Click below to sign in to your QbitShield dashboard and access your API key.</p>
        <p><a href="${data.action_link}" style="color: green;">🔑 Access Dashboard</a></p>
      `,
    });

    console.log("📧 Resend email response:", emailResponse);

    if (!emailResponse?.id) {
        return new Response(JSON.stringify({ error: 'Failed to send email', emailResponse }), { status: 500 });
    }

    if (!emailResponse?.id) {
      console.error('❌ Resend failed:', emailResponse);
      return new Response('Failed to send email', { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('🔥 Unexpected error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}