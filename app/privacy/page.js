"use client";

import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        Privacy Policy
      </h1>

      <p className="mb-4 text-zinc-300">
        QbitShield is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">1. Information We Collect</h2>
      <p className="mb-4 text-zinc-400">
        We collect personal information such as your name, email address, and company only for authentication and service personalization purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">2. How We Use Information</h2>
      <p className="mb-4 text-zinc-400">
        Information is used solely to enable secure access to the QbitShield platform and communicate with you regarding your account and service updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">3. Third-Party Services</h2>
      <p className="mb-4 text-zinc-400">
        We use trusted services like Supabase and Resend for secure authentication and email delivery. No data is sold or shared without consent.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">4. Data Security</h2>
      <p className="mb-4 text-zinc-400">
        We implement best-in-class encryption and security practices to protect your data both in transit and at rest.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">5. Contact</h2>
      <p className="mb-8 text-zinc-400">
        For any privacy-related inquiries, contact us at{" "}
        <a href="mailto:will@qbitshield.com" className="underline text-green-400">will@qbitshield.com</a>.
      </p>

      <Link href="/" className="text-sm text-gray-400 hover:text-white underline">
        ← Back to Home
      </Link>
    </div>
  );
}