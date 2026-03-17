"use client";

import { GroteskBold, GroteskMedium } from "@/utils/fonts";
import { useNpmStats } from "@/hooks/useNpmStats";

import { motion } from "framer-motion";
import * as React from "react";

export default function Stats() {
	const [animatedIconCount, setAnimatedIconCount] = React.useState(0);
	const { formattedDownloads } = useNpmStats("@deemlol/next-icons");
	const [iconCount, setIconCount] = React.useState(0);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allIcons", {
					method: "GET",
				});

				if (res?.ok) {
					const data = await res?.json();

					setIconCount(data?.icons || 0);
				} else {
					console.log("Failed to fetch the icon count");
				}
			} catch (err) {
				console.log("An error occurred while fetching the icon count");
				console.error(err);
			}
		};

		fetchData();
	}, []);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allAnimatedIcons", {
					method: "GET",
				});

				if (res?.ok) {
					const data = await res?.json();

					setAnimatedIconCount(data?.icons || 0);
				} else {
					console.log("Failed to fetch the animated icon count");
				}
			} catch (err) {
				console.log("An error occurred while fetching the animated icon count");
				console.error(err);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="relative z-10 border-y border-[#ffffff]/3 bg-[#111111]/50 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-4 py-14 2xl:px-0">
				<div className="grid grid-cols-3 gap-4 sm:gap-0">
					{[
						{ number: formattedDownloads || "0", label: "Downloads" },
						{ number: iconCount || "0", label: "Static Icons" },
						{ number: animatedIconCount || "0", label: "Animated Icons" },
					].map((stat, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							className={`flex flex-col items-center gap-3 ${
								i !== 2 ? "sm:border-r sm:border-[#ffffff]/5" : ""
							}`}
						>
							<span
								className={`text-center text-4xl text-[#bffb4f] lg:text-7xl ${GroteskBold.className}`}
							>
								{stat?.number}
							</span>

							<span
								className={`text-xs tracking-widest text-[#a1a1aa] uppercase lg:text-sm ${GroteskMedium.className}`}
							>
								{stat?.label}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
