import NotFoundExport from "@/pages/NotFoundExport";
import { DOMAIN_BASE_URL } from "@/utils/constants";
import { siteConfig } from "@/utils/siteConfig";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	applicationName: siteConfig.applicationName,
	title: "Next Icons: The requested page was not found",
	description: "The page you are looking for appears to be either non-existent or has been relocated.",
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: "Next Icons: The requested page was not found",
		description: "The page you are looking for appears to be either non-existent or has been relocated.",
		images: `${DOMAIN_BASE_URL}/Logo.png`,
	},
	appleWebApp: {
		title: "Next Icons: The requested page was not found",
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		siteName: siteConfig.applicationName,
		title: "Next Icons: The requested page was not found",
		description: "The page you are looking for appears to be either non-existent or has been relocated.",
		type: "website",
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
	creator: "NextIcons.com",
	publisher: "NextIcons.com",
};

export const viewport: Viewport = {
	initialScale: 1,
	minimumScale: 1,
	width: "device-width",
	themeColor: "#bffb4f",
};

export default function NotFound() {
	return <NotFoundExport />;
}
