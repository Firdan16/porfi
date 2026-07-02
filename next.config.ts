import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.vectorlogo.zone" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "www.gstatic.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
