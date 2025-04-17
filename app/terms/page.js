///Users/wd/qbitshield-landing/app/terms/page.js

"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
        Terms of Service
      </h1>
x
      <p className="mb-4 text-zinc-300">
        By accessing and using QbitShield, you agree to the following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">1. Use of the Service</h2>
      <p className="mb-4 text-zinc-400">
        QbitShield offers a cryptographic key distribution API. You agree to use it only for lawful and ethical purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">2. Account Security</h2>
      <p className="mb-4 text-zinc-400">
        You are responsible for maintaining the security of your login credentials and API keys. QbitShield is not liable for misuse resulting from compromised credentials.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">3. Limitation of Liability</h2>
      <p className="mb-4 text-zinc-400">
        We are not responsible for any loss or damage arising from the use or inability to use the service, even if we are advised of the possibility.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">4. Termination</h2>
      <p className="mb-4 text-zinc-400">
        We reserve the right to suspend or terminate accounts that violate these terms without notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-green-300">5. Changes</h2>
      <p className="mb-8 text-zinc-400">
        We may update these terms at any time. Continued use of the service constitutes your acceptance of the changes.
      </p>

      <Link href="/" className="text-sm text-gray-400 hover:text-white underline">
        ← Back to Home
      </Link>
    </div>
  );
}