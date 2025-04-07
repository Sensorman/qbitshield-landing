// app/layout.js

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createBrowserClient } from "@supabase/ssr";
import { SupabaseProvider } from './supabase-provider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QbitShield",
  description: "Quantum-Safe Key Infrastructure",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SupabaseProvider client={supabase}>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
