// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: 'QbitShield | Quantum Encryption Powered by Primes',
  description: 'QbitShield uses Prime Harmonic Modulation to deliver post-quantum secure keys for defense, infrastructure, and next-gen cybersecurity.',
  openGraph: {
    title: 'QbitShield',
    description: 'Quantum-safe key infrastructure powered by Prime Harmonic Modulation.',
    url: 'https://qbitshield.com',
    type: 'website',
    images: [
      {
        url: 'https://qbitshield.com/og-image.png', // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: 'QbitShield Cover Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QbitShield',
    description: 'Quantum encryption using prime numbers. Secure. Deterministic. Patent pending.',
    images: ['https://qbitshield.com/og-image.png'],
  },
};

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
  return (
    <html lang="en">
      <head>
        <meta property="og:title" content="QbitShield" />
        <meta
          property="og:description"
          content="Quantum-Safe Key Infrastructure. The next layer of cybersecurity."
        />
        <meta
          property="og:image"
          content="https://qbitshield.com/images/qbitshield-og-image.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://qbitshield.com" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}