/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Disable ESLint during builds (we run it separately in CI)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds (we run type-check separately)
    ignoreBuildErrors: false,
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
}

module.exports = nextConfig

