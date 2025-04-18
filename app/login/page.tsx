'use client'

import LoginForm from './LoginForm'

export default function LoginPage(): JSX.Element {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <LoginForm />
    </main>
  )
}