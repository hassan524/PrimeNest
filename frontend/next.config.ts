import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  async headers() {
    return [
      {
        source: "/api/:path*", 
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://prime-nest-4q17.vercel.app", 
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
      {
        source: "/socket.io/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://prime-nest-4q17.vercel.app",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
