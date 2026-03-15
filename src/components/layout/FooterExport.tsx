"use client";

import { GroteskBlack, GroteskBold, GroteskLight, GroteskRoman } from "@/utils/fonts";
import { GITHUB_REPO_URL, NPM_PACKAGE_URL } from "@/utils/constants";

import { useWebHaptics } from "web-haptics/react";
import Image from "next/image";
import Link from "next/link";

type FooterLink = {
	name: string;
	href: string;
	badge?: string;
	external?: boolean;
};

type FooterSection = {
	title: string;
	links: FooterLink[];
};

const FOOTER_LINKS: FooterSection[] = [
	{
		title: "Product",
		links: [
			{ name: "All Icons", href: "/icons" },
			{ name: "Animated Icons", href: "#", badge: "Soon" },
			{ name: "UI Components", href: "#", badge: "Soon" },
		],
	},
	{
		title: "Legal",
		links: [
			{ name: "Privacy Policy", href: "/legal/privacy" },
			{
				name: "License",
				href: "https://github.com/Next-Icons/next-icons/blob/main/LICENCE",
				external: true,
			},
		],
	},
	{
		title: "Links",
		links: [
			{
				name: "Change Log",
				href: "https://github.com/Next-Icons/next-icons/blob/main/CHANGELOG.md",
				external: true,
			},
			{ name: "GitHub", href: GITHUB_REPO_URL, external: true },
			{ name: "NPMJs", href: NPM_PACKAGE_URL, external: true },
		],
	},
];

export default function FooterExport() {
	const currentYear = new Date().getFullYear();
	const { trigger } = useWebHaptics();

	return (
		<footer className="overflow-hidden border-t border-[#ffffff]/15 bg-[#111111] pt-10 pb-6">
			<div className="mx-auto max-w-7xl px-4 2xl:px-0">
				<div className="mb-10 grid gap-12 lg:grid-cols-12 lg:gap-24">
					<div className="lg:col-span-5">
						<Link
							href={"/"}
							className={`flex items-center gap-3 text-3xl tracking-wide text-[#ffffff] ${GroteskBlack.className}`}
							onClick={() => trigger("medium")}
						>
							<Image
								src="/Logo.png"
								alt="Next Icons Logo"
								width={40}
								height={40}
								priority={true}
								draggable={false}
							/>

							<span>Next Icons</span>
						</Link>

						<p
							className={`mt-4 max-w-sm text-base leading-relaxed text-[#ffffff]/70 ${GroteskRoman.className}`}
						>
							An open-source icon library for React and Next.js.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-7">
						{FOOTER_LINKS.map((column) => (
							<div key={column?.title}>
								<h3
									className={`mb-4 text-base tracking-wider text-[#ffffff] uppercase ${GroteskBold.className}`}
								>
									{column?.title}
								</h3>

								<ul className="space-y-4">
									{column?.links?.map((link) => (
										<li key={link?.name}>
											<Link
												href={link?.href}
												target={link?.external ? "_blank" : undefined}
												rel={link?.external ? "noopener noreferrer" : undefined}
												onClick={() => trigger("light")}
												className={`group flex w-fit items-center ${link?.badge ? "cursor-not-allowed opacity-100" : "transition-colors duration-300 hover:text-[#bffb4f]"} gap-2 text-sm text-[#ffffff]/70 ${GroteskRoman.className}`}
											>
												<span className={link?.badge ? "opacity-70" : ""}>{link?.name}</span>

												{link?.badge && (
													<span
														className={`rounded-full border border-[#bffb4f]/30 bg-[#bffb4f]/10 px-1.5 py-0.5 text-[10px] text-[#bffb4f] backdrop-blur-sm ${GroteskRoman.className}`}
													>
														{link?.badge}
													</span>
												)}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="border-t border-[#ffffff]/5 pt-6">
					<div className="flex flex-col items-start justify-between gap-4 md:flex-row lg:items-center">
						<p className={`text-start text-sm text-[#ffffff]/70 ${GroteskLight.className}`}>
							&copy; {currentYear} Next Icons. All rights reserved.
						</p>

						<div className={`flex flex-col items-center gap-4 sm:flex-row sm:gap-6`}>
							<Link
								href="https://startupfa.me/s/next-icons?utm_source=nexticons.com"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Featured on Startup Fame"
							>
								<Image
									src="/featured/startupfame.webp"
									alt="Next Icons - Featured on Startup Fame"
									width={240}
									height={37}
									priority={true}
									draggable={false}
								/>
							</Link>

							<Link
								href="https://twelve.tools"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Featured on Twelve Tools"
							>
								<Image
									src="/featured/twelvetools.svg"
									alt="Next Icons - Featured on Twelve Tools"
									width={160}
									height={37}
									priority={true}
									draggable={false}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
