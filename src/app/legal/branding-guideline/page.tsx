import BrandingGuidelineExport from "@/pages/BrandingGuidelineExport";
import { DOMAIN_BASE_URL } from "@/utils/constants";
import { siteConfig } from "@/utils/siteConfig";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	applicationName: siteConfig.applicationName,
	title: "Next Icons: Our Branding Guideline",
	description: "Official branding guideline for logo usage, color system, typography, and brand voice.",
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: "Next Icons: Our Branding Guideline",
		description: "Official branding guideline for logo usage, color system, typography, and brand voice.",
		images: `${DOMAIN_BASE_URL}/Logo.png`,
	},
	appleWebApp: {
		title: "Next Icons: Our Branding Guideline",
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		siteName: siteConfig.applicationName,
		title: "Next Icons: Our Branding Guideline",
		description: "Official branding guideline for logo usage, color system, typography, and brand voice.",
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

export default function BrandingGuidelinePage() {
	return <BrandingGuidelineExport />;
}
