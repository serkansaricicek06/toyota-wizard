/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img-optimize.toyota-europe.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tarot-power-85236521.figma.site',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.toyota.com.tr',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'http://127.0.0.1:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
