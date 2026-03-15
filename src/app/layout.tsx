import { GroteskBlack, GroteskBold, GroteskLight, GroteskMedium, GroteskRoman, GroteskThin } from "@/utils/fonts";
import { DOMAIN_BASE_URL, EMAIL_ADDRESS } from "@/utils/constants";
import FooterExport from "@/components/layout/FooterExport";
import NavbarExport from "@/components/layout/NavbarExport";
import { siteConfig } from "@/utils/siteConfig";
import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	metadataBase: new URL(DOMAIN_BASE_URL),
	applicationName: siteConfig.applicationName,
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: [
		"react icons",
		"website icons",
		"web icons",
		"icon library",
		"customizable icons",
		"icons for projects",
		"icon sizes",
		"free icons",
		"app icons",
		"svg icons",
		"react",
		"nextjs",
		"icons",
		"svg",
		"next icons",
		"next icon",
		"nexticon",
		"next icon library",
		"next js icons",
		"icon next",
		"next js icons library",
		"nextjs icons",
		"icons next",
		"next js icon library",
		"lucide react",
		"nextjs icon library",
		"next.js icons",
		"next.js icon library",
		"icons for nextjs",
		"next js icon",
		"nextjs icon",
		"icons nextjs",
		"nextjs icons library",
		"icons next js",
		"icon next js",
		"icons for next js",
		"icons for next",
		"icon for nextjs",
		"icon next.js",
		"next.js icon",
		"icone next",
		"icon library nextjs",
		"react-icons next.js",
		"simbol next",
		"best icons library for nextjs",
		"best icons for nextjs",
		"what is next icon",
		"lightweight icon library for react",
	],
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: siteConfig.title,
		description: siteConfig.description,
		images: `${DOMAIN_BASE_URL}/Logo.png`,
	},
	appleWebApp: {
		title: siteConfig.title,
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		siteName: siteConfig.applicationName,
		title: siteConfig.title,
		description: siteConfig.description,
		type: "website",
		emails: EMAIL_ADDRESS,
		url: new URL(DOMAIN_BASE_URL),
		locale: "en",
		images: [
			{
				url: `${DOMAIN_BASE_URL}/Logo.png`,
				height: 512,
				width: 512,
				alt: "NextIcons",
				type: "image/png",
			},
		],
	},
	alternates: {
		canonical: "/",
	},
	creator: "NextIcons.com",
	publisher: "NextIcons.com",
	category: "Developer Tools",
	authors: [
		{
			name: "Alexandr Virgovič",
			url: "https://www.deemdev.com",
		},
	],
	icons: [
		{
			rel: "apple-touch-icon",
			type: "image/png",
			sizes: "180x180",
			url: "/favicons/apple-touch-icon.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "96x96",
			url: "/favicons/favicon-96x96.png",
		},
		{
			rel: "icon",
			type: "image/x-icon",
			sizes: "any",
			url: "/favicons/favicon.ico",
		},
		{
			rel: "icon",
			type: "image/svg+xml",
			sizes: "any",
			url: "/favicons/favicon.svg",
		},
	],
};

export const viewport: Viewport = {
	initialScale: 1,
	minimumScale: 1,
	width: "device-width",
	themeColor: "#bffb4f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				suppressHydrationWarning
				className={`bg-[#121212] ${GroteskBlack.className} ${GroteskBold.className} ${GroteskLight.className} ${GroteskMedium.className} ${GroteskRoman.className} ${GroteskThin.className} antialiased`}
			>
				<NavbarExport />
				<main>{children}</main>
				<FooterExport />
			</body>
		</html>
	);
}
