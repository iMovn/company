import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bật cache
  experimental: {
    useCache: true,
    staleTimes: {
      dynamic: 60, // 60 seconds for dynamic pages
      static: 3600, // 1 hour for static pages
    },
    optimisticClientCache: true,
    optimizePackageImports: [
      "lucide-react",
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

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000, // 20KB
        maxSize: 150000, // 🔥 GIẢM từ 200KB xuống 150KB

        cacheGroups: {
          // 1️⃣ FRAMEWORK - Strict React only
          framework: {
            name: "framework",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 100,
            enforce: true,
            chunks: "all",
          },

          // 3️⃣ UI RADIX - Chia nhỏ UI components
          radixUi: {
            name: "radix-ui",
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            priority: 90,
            enforce: true,
            chunks: "all",
            maxSize: 100000, // Max 100KB per UI chunk
          },

          // 4️⃣ LUCIDE ICONS - Tách riêng icons
          lucideIcons: {
            name: "lucide-icons",
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            priority: 88,
            enforce: true,
            chunks: "all",
          },

          // 5️⃣ FORMS - Form handling
          forms: {
            name: "forms",
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            priority: 85,
            enforce: true,
            chunks: "all",
          },

          // 7️⃣ STYLING UTILITIES
          styling: {
            name: "styling",
            test: /[\\/]node_modules[\\/](clsx|class-variance-authority|classnames)[\\/]/,
            priority: 80,
            enforce: true,
            chunks: "all",
          },

          // 8️⃣ ANIMATION LIBRARIES
          animations: {
            name: "animations",
            test: /[\\/]node_modules[\\/](framer-motion|@react-spring)[\\/]/,
            priority: 78,
            enforce: true,
            chunks: "all",
          },

          // 9️⃣ TAILWIND & CSS
          tailwind: {
            name: "tailwind",
            test: /[\\/]node_modules[\\/](tailwindcss|@tailwindcss)[\\/]/,
            priority: 75,
            enforce: true,
            chunks: "all",
          },

          // 🔟 VENDOR - Other libraries
          vendors: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            priority: 50,
            minChunks: 2,
            chunks: "all",
            maxSize: 120000, // Max 120KB per vendor chunk
          },

          // 1️⃣1️⃣ COMMON APP CODE - Chia app code
          common: {
            name: "common",
            test: /[\\/]src[\\/]/,
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            chunks: "all",
            maxSize: 100000, // Max 100KB per common chunk
          },
        },
      };

      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.concatenateModules = true;

      // Minimize aggressively
      config.optimization.minimize = true;
    }
    return config;
  },
};

// Bundle analyzer setup: npm i @next/bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
