import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bật cache
  experimental: {
    useCache: true,
    optimisticClientCache: true,
    optimizePackageImports: [
      "lucide-react",
      "lucide",
      "@radix-ui/react-icons",
      "framer-motion",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
  },

  // ========== COMPILER OPTIMIZATIONS ==========
  compiler: {
    // Production optimizations
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,

    reactRemoveProperties: process.env.NODE_ENV === "production",

    // CSS optimizations
    styledComponents: true,
  },

  // Bật nén gzip cho response HTML, JSON, v.v...
  compress: true,
  // Bật chế độ React strict
  reactStrictMode: true,
  poweredByHeader: false,
  // Cấu hình images từ domain ngoài
  images: {
    // Modern formats for better compression
    formats: ["image/avif", "image/webp"],

    // Optimize for external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.shenlong.cloud",
        port: "",
        pathname: "/storage/**",
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different layouts
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize cache time for dynamic content
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    // SVG support Enable dangerous SVG for icons (if needed)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

// Bundle analyzer setup: npm i @next/bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
