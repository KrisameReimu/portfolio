import path from "node:path";
import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: path.resolve(import.meta.dirname, "..", ".."),
  images: {
    unoptimized: true
  },
  typedRoutes: false
};

export default nextConfig;
