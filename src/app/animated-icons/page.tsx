import AnimatedIconsExport from "@/pages/AnimatedIconsExport"
import { DOMAIN_BASE_URL } from "@/utils/constants"
import { siteConfig } from "@/utils/siteConfig"

import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
	applicationName: siteConfig.applicationName,
	title: "Next Icons: Browse all our available animated icons",
	description: siteConfig.description,
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: "Next Icons: Browse all our available animated icons",
		description: siteConfig.description,
		images: `${DOMAIN_BASE_URL}/Logo.png`
	},
	appleWebApp: {
		title: "Next Icons: Browse all our available animated icons",
		statusBarStyle: "black-translucent"
	},
	openGraph: {
		siteName: siteConfig.applicationName,
		title: "Next Icons: Browse all our available animated icons",
		description: siteConfig.description,
		type: "website",
		locale: "en",
		images: [
			{
				url: `${DOMAIN_BASE_URL}/Logo.png`,
				height: 512,
				width: 512,
				alt: "NextIcons",
				type: "image/png"
			}
		]
	},
	creator: "NextIcons.com",
	publisher: "NextIcons.com"
}

export const viewport: Viewport = {
	initialScale: 1,
	minimumScale: 1,
	width: "device-width",
	themeColor: "#bffb4f"
}

export default function AnimatedIconsPage() {
	return <AnimatedIconsExport />
}
