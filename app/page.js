import Image from 'next/image';

export default function Home() {
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
        <a
          href="https://theqbitshield-api-258062438248.us-central1.run.app/docs"
          className="text-sm underline text-gray-300 hover:text-white"
        >
          View Live API
        </a>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-green-300 text-center">
          Quantum-Safe Key Infrastructure
        </h2>
        <p className="text-lg mb-10 text-gray-300 text-center max-w-2xl mx-auto">
          QbitShield delivers cryptographically secure, high-entropy quantum keys through a proprietary QKD protocol.
          Validated on real quantum hardware (IonQ Aria-1), our API enables advanced quantum-safe key generation with
          enhanced randomness and security.
        </p>

        {/* 💸 Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Free Tier */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-center shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Free Tier</h3>
            <p className="text-zinc-400 mb-4">Get started with up to 25 secure quantum key generations per month.</p>
            <p className="text-3xl font-bold mb-4">$0<span className="text-sm font-normal text-zinc-400">/mo</span></p>
            <a href="/login" className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Start Free</a>
          </div>

          {/* Pro Tier */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-center shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold mb-2">Pro Tier</h3>
            <p className="text-zinc-400 mb-4">Scale up to 10,000 key requests per month with premium support.</p>
            <p className="text-3xl font-bold mb-4">$99<span className="text-sm font-normal text-zinc-400">/mo</span></p>
            <a
              href="https://buy.stripe.com/test_9AQaIB67hc3nfWU9AA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Subscribe
            </a>
          </div>

          {/* Enterprise Tier */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-center shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
            <p className="text-zinc-400 mb-4">Custom key volumes, SLAs, and integrations for high-security environments.</p>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <a
              href="mailto:will@qbitshield.com"
              className="inline-block px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
            >
              Contact Sales
            </a>
          </div>
        </div>

        {/* ✉️ Join Waitlist Form */}
        <form
          action="https://formspree.io/f/myzejkba"
          method="POST"
          className="max-w-md mx-auto mt-16 p-6 border border-gray-700 rounded"
        >
          <h3 className="text-xl text-white mb-4 font-semibold text-center">Join the Waitlist</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full mb-4 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full mb-4 px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded"
          >
            Submit
          </button>
        </form>
      </main>

      <footer className="text-center text-gray-500 text-sm py-6 border-t border-gray-700 mt-10">
        &copy; 2025 QbitShield LLC · Patent Pending
      </footer>
    </div>
  );
}
