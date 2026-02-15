import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@google-cloud/storage', '@react-pdf/renderer'],
  outputFileTracingIncludes: {
    '/api/b2b/growth-report': ['./public/fonts/**/*'],
  },
};

export default nextConfig;
