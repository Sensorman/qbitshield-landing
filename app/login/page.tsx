'use client'

import LoginForm from './LoginForm'

import type { ReactElement } from 'react'

export default function LoginPage(): ReactElement {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <LoginForm />
    </main>
  )
}