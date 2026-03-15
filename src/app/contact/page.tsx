import { DOMAIN_BASE_URL } from "@/utils/constants";
import ContactExport from "@/pages/ContactExport";
import { siteConfig } from "@/utils/siteConfig";

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
	applicationName: siteConfig.applicationName,
	title: "Next Icons: Get in touch with our team members",
	description: "Do you have question, issues or suggestions? Our team is here to help you.",
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: "Next Icons: Get in touch with our team members",
		description: "Do you have question, issues or suggestions? Our team is here to help you.",
		images: `${DOMAIN_BASE_URL}/Logo.png`,
	},
	appleWebApp: {
		title: "Next Icons: Get in touch with our team members",
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		siteName: siteConfig.applicationName,
		title: "Next Icons: Get in touch with our team members",
		description: "Do you have question, issues or suggestions? Our team is here to help you.",
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

export default function ContactPage() {
	return <ContactExport />;
}
