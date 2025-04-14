// app/login/page.js
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      <LoginForm />
    </main>
  )
}