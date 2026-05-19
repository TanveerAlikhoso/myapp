const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@lumina/core', '@lumina/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, '../../node_modules'));
    return config;
  },
};

module.exports = nextConfig;
