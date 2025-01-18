import CookiesConsent from "@/components/CookiesConsent";
import ToasterExport from "@/components/layout/ToasterExport";
import NavbarExport from "@/components/layout/NavbarExport";
import FooterExport from "@/components/layout/FooterExport";
import { DOMAIN_BASE_URL } from "@/utils/constants";
import "../public/styles/globals.css";

import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

const ClashDisplayBold = localFont({
	src: "../public/fonts/ClashDisplay-Bold.ttf",
	variable: "--font-clashdisplay-bold",
	display: "swap",
});

const ClashDisplayExtraLight = localFont({
	src: "../public/fonts/ClashDisplay-Extralight.ttf",
	variable: "--font-clashdisplay-extralight",
	display: "swap",
});

const ClashDisplayLight = localFont({
	src: "../public/fonts/ClashDisplay-Light.ttf",
	variable: "--font-clashdisplay-light",
	display: "swap",
});

const ClashDisplayMedium = localFont({
	src: "../public/fonts/ClashDisplay-Medium.ttf",
	variable: "--font-clashdisplay-medium",
	display: "swap",
});

const ClashDisplayRegular = localFont({
	src: "../public/fonts/ClashDisplay-Regular.ttf",
	variable: "--font-clashdisplay-regular",
	display: "swap",
});

const ClashDisplaySemiBold = localFont({
	src: "../public/fonts/ClashDisplay-Semibold.ttf",
	variable: "--font-clashdisplay-semibold",
	display: "swap",
});

const ClashDisplayVariable = localFont({
	src: "../public/fonts/ClashDisplay-Variable.ttf",
	variable: "--font-clashdisplay-variable",
	display: "swap",
});

export const metadata: Metadata = {
	applicationName: "NextIcons.com",
	appleWebApp: {
		title: "NextIcons.com",
	},
	authors: [
		{
			name: "Alexandr Virgovič",
			url: "https://www.deemdev.xyz",
		},
	],
	title: "Next Icons ~ Icon library for React and Next.js",
	description: "Lightweight icon component library for React and Next.js, designed for simplicity and seamless integration.",
	keywords: ["next", "nextjs", "react", "icons", "svg", "next-icons", "react-icons", "nextjs-icons", "lucide-react"],
	openGraph: {
		siteName: "NextIcons.com",
		title: "Next Icons ~ Icon library for React and Next.js",
		description: "Lightweight icon component library for React and Next.js, designed for simplicity and seamless integration.",
		locale: "en_US",
		type: "website",
		emails: "contact@nexticons.com",
		url: new URL(DOMAIN_BASE_URL),
	},
	category: "Icons",
	robots: "index, follow",
	publisher: "Vercel",
	metadataBase: new URL(DOMAIN_BASE_URL),
};

export const viewport: Viewport = {
	initialScale: 1,
	minimumScale: 1,
	themeColor: "#a855f7",
	width: "device-width",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en_US" suppressHydrationWarning>
			<head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				<meta property="og:image" content="https://www.nexticons.com/assets/NextIconsWhite.png" />
				<meta property="og:image:width" content="512" />
				<meta property="og:image:height" content="512" />
				<meta property="og:image:type" content="image/png" />
				<meta property="twitter:card" content="summary" />

				<link rel="shortcut icon" type="images/x-icon" href="/assets/favicons/favicon.ico" />
				<link rel="apple-touch-icon" sizes="57x57" href="/assets/favicons/apple-icon-57x57.png" />
				<link rel="apple-touch-icon" sizes="60x60" href="/assets/favicons/apple-icon-60x60.png" />
				<link rel="apple-touch-icon" sizes="72x72" href="/assets/favicons/apple-icon-72x72.png" />
				<link rel="apple-touch-icon" sizes="76x76" href="/assets/favicons/apple-icon-76x76.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png" />
				<link rel="apple-touch-icon" sizes="114x114" href="/assets/favicons/apple-icon-114x114.png" />
				<link rel="apple-touch-icon" sizes="120x120" href="/assets/favicons/apple-icon-120x120.png" />
				<link rel="apple-touch-icon" sizes="144x144" href="/assets/favicons/apple-icon-144x144.png" />
				<link rel="apple-touch-icon" sizes="152x152" href="/assets/favicons/apple-icon-152x152.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-icon-180x180.png" />
				<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicons/android-icon-192x192.png" />
			</head>

			{/* prettier-ignore */}
			<body className={`${ClashDisplayBold.variable} bg-white dark:bg-[#121212] ${ClashDisplayExtraLight.variable} ${ClashDisplayLight.variable} ${ClashDisplayMedium.variable} ${ClashDisplayRegular.variable} ${ClashDisplaySemiBold.variable} ${ClashDisplayVariable.variable} antialiased`}>
				<ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem={false}>
					<NextTopLoader color="#a855f7" showSpinner={false} />
					<ToasterExport />
					<CookiesConsent />

					<NavbarExport />
					<main>{children}</main>
					<FooterExport />
				</ThemeProvider>
			</body>
		</html>
	);
}
