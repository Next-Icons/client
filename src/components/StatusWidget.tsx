"use client";

import * as React from "react";

interface StatusWidgetProps {
	theme?: "light" | "dark" | "custom";
	customColor?: string;
	monitorId?: string;
}

export default function StatusWidget({
	theme = "custom",
	customColor = "#111111",
	monitorId = "699e3c3af7cb1dca93a4581c",
}: StatusWidgetProps) {
	React.useEffect(() => {
		const s = document?.createElement("script");

		s.src = "https://quiccstatus.com/script.js";
		s.async = true;
		document?.body?.appendChild(s);

		return () => {
			try {
				document?.body?.removeChild(s);
			} catch {}
		};
	}, []);

	return (
		<div
			id="quiccstatus-widget"
			data-domain="status.deemdev.com"
			data-theme={theme}
			data-background-color={customColor}
			data-monitor={monitorId}
		/>
	);
}
