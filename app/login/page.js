// app/not-found/page.tsx

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-400">
        This page doesn’t exist or has been moved.
      </p>
    </div>
  )
}