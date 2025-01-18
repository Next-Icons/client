import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	devIndicators: {
		buildActivity: false,
		appIsrStatus: false,
	},
};

export default nextConfig;
