// app/not-found/page.tsx

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-400">This page doesn’t exist or has been moved.</p>


    import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-400">This page doesn’t exist or has been moved.</p>
      <Link
        href="/"
        className="mt-6 text-blue-400 hover:underline text-sm border border-blue-400 px-4 py-2 rounded"
      >
        ← Go Home
      </Link>
    </div>
  )
}
    </div>
  )
}