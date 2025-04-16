// app/not-found/page.tsx
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-gray-400 mt-2">Page not found.</p>
    </div>
  )
}