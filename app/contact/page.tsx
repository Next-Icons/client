import ContactEntry from "@/components/contact/ContactEntry";
import { DOMAIN_BASE_URL } from "@/utils/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Us ~ NextIcons.com",
	description: "Do you have question, issues or suggestions? Our team is here to help you",
	openGraph: {
		siteName: "NextIcons.com",
		title: "Contact Us ~ NextIcons.com",
		description: "Do you have question, issues or suggestions? Our team is here to help you",
		locale: "en_US",
		type: "website",
		emails: "contact@nexticons.com",
		url: new URL(DOMAIN_BASE_URL),
	},
};

export default ContactEntry;
