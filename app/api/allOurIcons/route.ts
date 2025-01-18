"use server";

import * as Icon from "@deemlol/next-icons";
import { NextResponse } from "next/server";

export async function GET() {
	const icons = Object.keys(Icon);

	try {
		return NextResponse.json({ icons: icons.length });
	} catch (err) {
		console.log("An error occurred while fetching icons");
		console.error(err);

		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
	}
}
