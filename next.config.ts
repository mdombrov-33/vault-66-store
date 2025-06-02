import type { NextConfig } from "next";

//*  bodySizeLimit is used to pass the restriction of the body size for server actions.
//*  This is useful when uploading large files, such as images.
//*  Usage in this app: when creating a product, we upload an image file.
//*  if we don't set this, we will get an error: "Request body larger than maxBodyLength limit".
//*  Flow: we upload an image => check for body size => zod validation for size and type => save to database.
//*  If image is bigger than default 1MB, we will never get to the zod validation step.

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "opzuqgehxlasumgyysml.supabase.co",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
