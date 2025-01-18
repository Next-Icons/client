import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "#121212",
				white: "#f5f5f5",
			},
		},
	},
	darkMode: ["class"],
	plugins: [require("tailwindcss-animate")],
};

export default config;
