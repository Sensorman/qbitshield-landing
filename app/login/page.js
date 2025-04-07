// app/login/page.js
'use client'
import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<p className="text-white text-center">Loading login form...</p>}>
      <LoginForm />
    </Suspense>
  )
}