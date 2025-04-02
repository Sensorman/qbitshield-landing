export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        action="/api/auth/email-login"
        method="POST"
        className="bg-zinc-900 p-8 rounded shadow max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-4">🔐 QbitShield Login</h1>
        <p className="text-zinc-400 mb-6">Enter your email to access your dashboard and API key.</p>

        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="w-full mb-4 px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
        >
          Send Login Link
        </button>
      </form>
    </div>
  );
}