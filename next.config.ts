import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@google-cloud/storage', '@react-pdf/renderer'],
};

export default nextConfig;
