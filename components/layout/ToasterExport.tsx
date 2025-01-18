"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterExport() {
	const { theme } = useTheme();

	return (
		<Toaster theme={theme === "light" ? "light" : "dark"} richColors={true} expand={true} closeButton={true} visibleToasts={4} position="bottom-right" />
	);
}
