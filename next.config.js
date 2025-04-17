import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {} // ✅ Required empty object for future Next.js features
  },

  webpack(config) {
    // Add support for @ path alias (e.g. @/utils/supabase/client)
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}

export default nextConfig