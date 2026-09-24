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
    /* AVIF first: ~20-30% smaller than WebP, chosen automatically where supported. */
    formats: ["image/avif", "image/webp"],
    /* No consumer of this site renders an image wider than ~620 CSS px, and the widest source is
       1600 px. Capping here stops the optimizer from ever generating the 1920/2048/3840 variants,
       which were being requested for sub-620px decorative images. */
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
};

export default withNextIntl(nextConfig);
