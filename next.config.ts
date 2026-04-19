import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Smaller, more stable imports for Framer Motion (fewer flaky Webpack chunks in `next dev --webpack`).
   */
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  /** Avoid a second metadata route for favicon; `/favicon.ico` hits the same asset as `<link rel="icon">`. */
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
