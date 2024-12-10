import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features needed for MDX
  experimental: {
    mdxRs: true,
  },
  // Configure webpack to handle MDX files
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-mdx-remote/rsc': require.resolve('next-mdx-remote/rsc'),
    };
    return config;
  },
};

export default nextConfig;
