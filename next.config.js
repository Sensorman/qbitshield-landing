import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {} // ✅ Must be an object, not true/false
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  }
}

export default nextConfig