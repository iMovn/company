import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bật cache
  experimental: {
    useCache: true,
    optimizePackageImports: ["lucide-react"],
  },

  // Bật nén gzip cho response HTML, JSON, v.v...
  compress: true,

  // Bật chế độ React strict
  reactStrictMode: true,

  // Cấu hình images từ domain ngoài
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.shenlong.cloud",
      },
    ],
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
