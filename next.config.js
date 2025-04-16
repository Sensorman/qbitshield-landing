// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  webpack(config) {
    config.resolve.alias['@'] = require('path').resolve(__dirname);
    return config;
  }
};

export default nextConfig;