import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://customer-support-platform.onrender.com",
      },
    ];
  },
};

export default nextConfig;
