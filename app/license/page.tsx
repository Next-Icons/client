import LicenseEntry from "@/components/license/LicenseEntry";
import { DOMAIN_BASE_URL } from "@/utils/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "License ~ NextIcons.com",
	description: "Free and open source icon component library, licensed under the MIT License",
	openGraph: {
		siteName: "NextIcons.com",
		title: "License ~ NextIcons.com",
		description: "Free and open source icon component library, licensed under the MIT License",
		locale: "en_US",
		type: "website",
		emails: "contact@nexticons.com",
		url: new URL(DOMAIN_BASE_URL),
	},
};

export default LicenseEntry;
