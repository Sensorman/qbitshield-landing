export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">QbitShield</h1>
        <a
          href="https://theqbitshield-api-258062438248.us-central1.run.app/docs"
          className="text-sm underline text-gray-300 hover:text-white"
        >
          View Live API
        </a>
      </header>

      <main className="p-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-green-300">
          Quantum-Safe Key Infrastructure
        </h2>
        <p className="text-lg mb-6 text-gray-300">
          QbitShield delivers cryptographically secure, high-entropy quantum keys through a proprietary QKD protocol. Validated on real quantum hardware (IonQ Aria-1), our API enables advanced quantum-safe key generation with enhanced randomness and security.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold text-white mb-2">🔐 Quantum Key Exchange</h3>
            <p className="text-gray-400">Generate quantum-safe keys with high entropy and low QBER using prime-based modulation.</p>
            <code className="block mt-2 bg-gray-800 text-green-300 p-2 rounded">GET /qkd/generate</code>
          </div>

          <div className="border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold text-white mb-2">📊 Proven Security</h3>
            <p className="text-gray-400">Tested on IonQ Aria-1 with entropy = 2.90 bits and QBER = 3.33% over 60 trials.</p>
          </div>

          <div className="border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold text-white mb-2">🛠 Developer Ready</h3>
            <p className="text-gray-400">Plug-and-play API access. RESTful interface with JSON key response.</p>
            <code className="block mt-2 bg-gray-800 text-green-300 p-2 rounded">GET /keys/keys</code>
          </div>

          <div className="border border-gray-600 p-4 rounded">
            <h3 className="text-xl font-semibold text-white mb-2">💡 Use Cases</h3>
            <ul className="text-gray-400 list-disc pl-5">
              <li>Web3 wallet key seeding</li>
              <li>Post-quantum VPN sessions</li>
              <li>Quantum-secure API authentication</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="mailto:will@qbitshield.com"
            className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded shadow"
          >
            Request Access
          </a>
        </div>

        <form
          action="https://formspree.io/f/myzejkba"
          method="POST"
          className="max-w-md mx-auto mt-10 p-6 border border-gray-700 rounded"
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