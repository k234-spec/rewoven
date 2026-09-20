import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.REWOVEN_BUILD_DIR || '.next',
  serverExternalPackages: ['node:sqlite'],
};

export default nextConfig;
