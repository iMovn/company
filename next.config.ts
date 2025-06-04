import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bật cache
  experimental: {
    useCache: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
      "framer-motion",
      "react-hook-form",
      "@hookform/resolvers",
      "zod",
    ],
  },

  // Bật nén gzip cho response HTML, JSON, v.v...
  compress: true,

  // Bật chế độ React strict
  reactStrictMode: true,

  // Cấu hình images từ domain ngoài
  images: {
    // Modern formats for better compression
    formats: ["image/webp"],

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

  // Webpack customization
  webpack: (config, { dev, isServer }) => {
    // SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // Production optimizations only
    if (!dev && !isServer) {
      // Advanced bundle splitting
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          // Framework chunks (React, Next.js)
          framework: {
            chunks: "all",
            name: "framework",
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // UI Library chunks
          ui: {
            name: "ui-libs",
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
            chunks: "all",
            priority: 30,
            enforce: true,
          },

          // Form libraries
          forms: {
            name: "form-libs",
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            chunks: "all",
            priority: 25,
            enforce: true,
          },

          // Utilities (lodash, date-fns, etc)
          utils: {
            name: "utils",
            test: /[\\/]node_modules[\\/](lodash|date-fns|clsx|classnames)[\\/]/,
            chunks: "all",
            priority: 20,
            enforce: true,
          },

          // Large libraries (split individually)
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
            enforce: false,
            // Split large vendors into separate chunks
            reuseExistingChunk: true,
          },

          // Default group
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };

      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

      // Minimize vendor bundle size
      config.optimization.providedExports = true;

      // Module concatenation for smaller bundles
      config.optimization.concatenateModules = true;

      // Analyze bundle in development
      if (process.env.ANALYZE === "true") {
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: `${isServer ? "server" : "client"}.html`,
            openAnalyzer: false,
          })
        );
      }
    }

    return config;
  },

  // Performance headers
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
};

// Bundle analyzer setup: npm i @next/bundle-analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
