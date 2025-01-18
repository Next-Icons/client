"use server";

import fs from "fs/promises";
import path from "path";

export async function getSVGContent(iconName: string) {
	const filePath = path.join(process.cwd(), "public", "assets", "icons", `${iconName}.svg`);

	try {
		const content = await fs.readFile(filePath, "utf-8");

		return content;
	} catch {
		return null;
	}
}
