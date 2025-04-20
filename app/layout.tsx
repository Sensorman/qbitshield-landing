import './globals.css'
import { SupabaseProvider } from '@/utils/supabase/provider'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'QbitShield',
  description: 'Quantum-Safe Key Infrastructure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          {children}
        </SupabaseProvider>
      </body>
    </html>
  )
}