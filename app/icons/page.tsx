import IconsEntry from "@/components/icons/iconsEntry";
import { DOMAIN_BASE_URL } from "@/utils/constants";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Icons ~ NextIcons.com",
	description: "Free and open source icons designed to make your website visually consistent and simply beautiful",
	openGraph: {
		siteName: "NextIcons.com",
		title: "Icons ~ NextIcons.com",
		description: "Free and open source icons designed to make your website visually consistent and simply beautiful",
		locale: "en_US",
		type: "website",
		emails: "contact@nexticons.com",
		url: new URL(DOMAIN_BASE_URL),
	},
};

export default IconsEntry;
