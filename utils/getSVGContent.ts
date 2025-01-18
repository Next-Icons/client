"use server";

import { DOMAIN_BASE_URL } from "@/utils/constants";

export async function getSVGContent(iconName: string) {
	try {
		const response = await fetch(`${DOMAIN_BASE_URL}/assets/icons/${iconName}.svg`);
		if (!response.ok) return null;

		const content = await response.text();
		return content;
	} catch (err) {
		console.log("An error occurred while fetching the SVG content");
		console.error(err);

		return null;
	}
}
