import { Google_Sans } from "next/font/google";

export const GoogleSansRegular = Google_Sans({
	weight: "400",
	style: "normal",
	display: "swap",
	subsets: ["latin"],
	adjustFontFallback: false,
	variable: "--font-google-sans-regular",
	preload: false,
});

export const GoogleSansMedium = Google_Sans({
	weight: "500",
	style: "normal",
	display: "swap",
	subsets: ["latin"],
	adjustFontFallback: false,
	variable: "--font-google-sans-medium",
	preload: false,
});

export const GoogleSansSemiBold = Google_Sans({
	weight: "600",
	style: "normal",
	display: "swap",
	subsets: ["latin"],
	adjustFontFallback: false,
	variable: "--font-google-sans-semi-bold",
	preload: false,
});

export const GoogleSansBold = Google_Sans({
	weight: "700",
	style: "normal",
	display: "swap",
	subsets: ["latin"],
	adjustFontFallback: false,
	variable: "--font-google-sans-bold",
	preload: false,
});
