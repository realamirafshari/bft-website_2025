/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
