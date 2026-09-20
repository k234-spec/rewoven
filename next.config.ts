import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.REWOVEN_BUILD_DIR || '.next',
  serverExternalPackages: ['node:sqlite'],
  experimental: {
    allowedDevOrigins: ['localhost:3000', 'localhost:3001', '*.ngrok-free.dev', '*.ngrok.app'],
  },
};

export default nextConfig;
