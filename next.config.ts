import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	output: "export",
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
};

export default nextConfig;
