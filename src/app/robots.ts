import { DOMAIN_BASE_URL } from "@/utils/constants";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${DOMAIN_BASE_URL}/sitemap.xml`,
	};
}
