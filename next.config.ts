import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ["192.168.31.24", "192.168.0.143", "localhost", "127.0.0.1", '192.168.0.235'],
  async redirects() {
    return [
      {
        source: "/sectors",
        destination: "/#sectors",
        permanent: false,
      },
      {
        source: "/sectors/:path*",
        destination: "/#sectors",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
