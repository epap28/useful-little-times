import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGitHubPages ? "/useful-little-times" : undefined,
  assetPrefix: isGitHubPages ? "/useful-little-times/" : undefined
};

export default nextConfig;
