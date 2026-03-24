import localFont from "next/font/local"

export const GoogleSansRegular = localFont({
	src: "../../public/fonts/GoogleSans-Regular.ttf",
	style: "normal",
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-google-sans-regular",
	preload: false
})

export const GoogleSansMedium = localFont({
	src: "../../public/fonts/GoogleSans-Medium.ttf",
	style: "normal",
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-google-sans-medium",
	preload: false
})

export const GoogleSansSemiBold = localFont({
	src: "../../public/fonts/GoogleSans-SemiBold.ttf",
	style: "normal",
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-google-sans-semi-bold",
	preload: false
})

export const GoogleSansBold = localFont({
	src: "../../public/fonts/GoogleSans-Bold.ttf",
	style: "normal",
	display: "swap",
	adjustFontFallback: false,
	variable: "--font-google-sans-bold",
	preload: false
})
