import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js ecosystem for proper bundling
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
    ],
  },

  // Ignore TypeScript errors during build for faster iteration
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
