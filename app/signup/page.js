// app/signup/page.js
"use client"
import { Suspense } from 'react'
import SignupForm from './LoginForm'

export default function SignupPage() {
  return (
    <Suspense fallback={<p>Loading signup form...</p>}>
      <SignupForm />
    </Suspense>
  )
}
