import { withSentryConfig } from '@sentry/nextjs'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy to Backend
        source: '/api/:path*',
        destination: process.env.API_URL + '/api/:path*',
      },
    ]
  },
}

export default withSentryConfig(nextConfig, {
  org: 'mobilab2u',
  project: 'mobilab2u-frontend',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
})
