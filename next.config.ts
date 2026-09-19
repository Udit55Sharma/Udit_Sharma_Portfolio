import type { NextConfig } from "next";

// STATIC_EXPORT=1 produces a pure static bundle in ./out for hosts like
// Cloudflare Pages. Left unset (the Vercel path) the project builds normally,
// so this flag cannot affect Udit's Vercel deployment.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        // The static exporter has no image optimisation server.
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
