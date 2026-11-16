import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // app/global-not-found.tsx: [lang] is the root layout, so a 404 needs its own full-document page.
    globalNotFound: true,
  },
};

export default nextConfig;
