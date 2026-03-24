import { DOMAIN_BASE_URL } from "@/utils/constants"

import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: DOMAIN_BASE_URL,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1.0
		},
		{
			url: `${DOMAIN_BASE_URL}/icons`,
			lastModified: new Date().toISOString(),
			changeFrequency: "daily",
			priority: 1.0
		},
		{
			url: `${DOMAIN_BASE_URL}/animated-icons`,
			lastModified: new Date().toISOString(),
			changeFrequency: "daily",
			priority: 1.0
		},
		{
			url: `${DOMAIN_BASE_URL}/contact`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 0.8
		},
		{
			url: `${DOMAIN_BASE_URL}/legal/privacy`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 0.8
		},
		{
			url: `${DOMAIN_BASE_URL}/legal/branding-guideline`,
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 0.7
		}
	]
}
