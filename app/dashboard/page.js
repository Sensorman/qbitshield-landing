import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-6 border-b border-gray-700 flex justify-between items-center">
        <Image src="/Black-QbitShieldVectorLogo.png" alt="QbitShield Logo" width={150} height={50} priority />
        <a href="/" className="text-sm underline text-gray-300 hover:text-white">Home</a>
      </header>

      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-400">🔐 API Dashboard</h1>

        <div className="bg-zinc-900 p-6 rounded mb-8 border border-zinc-700">
          <h2 className="text-xl font-semibold mb-2">Your API Key</h2>
          <p className="bg-gray-800 p-2 rounded text-sm font-mono select-all">sk_test_XXXXXXXXXXXXXXXX</p>
          <p className="text-zinc-400 text-sm mt-2">Use this key with the official QbitShield SDK to start generating quantum keys.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-zinc-800 p-4 rounded">
            <p className="text-zinc-400 text-sm">Tier</p>
            <p className="text-2xl font-semibold">Free</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <p className="text-zinc-400 text-sm">Used</p>
            <p className="text-2xl font-semibold">4 / 25</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded">
            <p className="text-zinc-400 text-sm">Remaining</p>
            <p className="text-2xl font-semibold">21</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">📘 How to Use</h3>
          <pre className="bg-zinc-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`pip install git+https://github.com/Sensorman/qbitshield-sdk.git

from qbitshield import client
key = client.generate_key("your-api-key")`}
          </pre>
        </div>
      </main>
    </div>
  );
}