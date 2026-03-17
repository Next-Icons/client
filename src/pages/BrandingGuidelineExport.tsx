"use client";

import { GoogleSansBold, GoogleSansMedium, GoogleSansRegular, GoogleSansSemiBold } from "@/utils/fonts";
import { DOMAIN_BASE_URL, GITHUB_REPO_URL, NPM_PACKAGE_URL } from "@/utils/constants";

import { useWebHaptics } from "web-haptics/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BRAND_COLORS = [
	{ name: "Neon Lime", hex: "#bffb4f", usage: "Primary accent, CTA, focus" },
	{ name: "Deep Charcoal", hex: "#121212", usage: "Main background and surfaces" },
	{ name: "Graphite", hex: "#111111", usage: "Cards, elevated containers" },
	{ name: "White", hex: "#ffffff", usage: "Headings, high-contrast text" },
] as const;

const VOICE_EXAMPLES = [
	{
		title: "Do",
		text: "Use concise and confident language. Keep statements practical, direct, and focused.",
	},
	{
		title: "Avoid",
		text: "Avoid vague claims, excessive hype, and copy that hides practical value behind buzzwords.",
	},
] as const;

const BRAND_FONTS = [
	{ label: "Google Sans Regular", weight: "400", className: GoogleSansRegular.className },
	{ label: "Google Sans Medium", weight: "500", className: GoogleSansMedium.className },
	{ label: "Google Sans SemiBold", weight: "600", className: GoogleSansSemiBold.className },
	{ label: "Google Sans Bold", weight: "700", className: GoogleSansBold.className },
] as const;

const LOGO_RULES = [
	{
		title: "Minimum clear space",
		text: "Maintain clear space around the logo equal to at least 50% of logo height.",
	},
	{ title: "Minimum size", text: "Do not render the logo below 28px height in digital interfaces." },
	{
		title: "Background contrast",
		text: "Use the default logo on dark surfaces. Ensure sufficient contrast at all times.",
	},
] as const;

const LOGO_VARIANTS = [
	{
		title: "Color Logo",
		src: "/Logo.png",
		previewClassName: "bg-[#121212]",
	},
	{
		title: "White Logo",
		src: "/Logo-White.png",
		previewClassName: "bg-[#1a1a1a]",
	},
	{
		title: "Black Logo",
		src: "/Logo-Black.png",
		previewClassName: "bg-[#f3f4f6]",
	},
] as const;

const PROJECT_RESOURCES = [
	{ label: "Website", href: DOMAIN_BASE_URL },
	{ label: "GitHub", href: GITHUB_REPO_URL },
	{ label: "NPM Package", href: NPM_PACKAGE_URL },
] as const;

export default function BrandingGuidelineExport() {
	const { trigger } = useWebHaptics();

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="min-h-screen px-4 pt-30 pb-30 lg:pt-42 2xl:px-0"
		>
			<div className="mx-auto max-w-7xl">
				<div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<h1 className={`mb-4 text-4xl text-[#bffb4f] lg:text-[5rem] ${GoogleSansBold.className}`}>
							Branding Guideline
						</h1>

						<p
							className={`max-w-3xl text-base text-[#ffffff]/80 lg:text-lg ${GoogleSansRegular.className}`}
						>
							Use this page as a practical template for visual identity, brand voice, and logo usage
							rules.
						</p>
					</div>

					<Link
						href={DOMAIN_BASE_URL}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => trigger("light")}
						className={`inline-flex items-center justify-center rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-4 py-2.5 text-center text-[#ffffff] transition-all duration-300 hover:border-[#bffb4f]/40 hover:bg-[#bffb4f]/10 hover:text-[#bffb4f] ${GoogleSansMedium.className}`}
					>
						Open Website
					</Link>
				</div>

				<div className="mb-16 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="h-fit rounded-xl border border-[#ffffff]/8 bg-[#111111] p-6"
					>
						<h2 className={`mb-4 text-2xl text-[#ffffff] lg:text-3xl ${GoogleSansSemiBold.className}`}>
							Logo Variants
						</h2>

						<div className="grid gap-4">
							{LOGO_VARIANTS.map((variant) => (
								<div
									key={variant?.title}
									className="rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/2 p-3 text-[#ffffff]"
								>
									<div
										className={`mb-2 flex min-h-[110px] items-center justify-center rounded-lg ${variant.previewClassName}`}
									>
										{variant?.src ? (
											<Image
												src={variant?.src}
												alt={variant?.title}
												width={72}
												height={72}
												priority={true}
												draggable={false}
											/>
										) : (
											<span className={`text-sm text-[#ffffff] ${GoogleSansMedium.className}`}>
												This variant is not available.
											</span>
										)}
									</div>

									<div className="flex items-center justify-between gap-2">
										<div className={`text-sm text-[#ffffff] ${GoogleSansMedium.className}`}>
											{variant?.title}
										</div>

										{variant?.src ? (
											<Link
												href={variant?.src}
												download
												onClick={() => trigger("light")}
												className={`inline-flex items-center rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 px-2.5 py-1 text-xs text-[#ffffff] transition-all duration-300 hover:border-[#bffb4f]/40 hover:bg-[#bffb4f]/10 hover:text-[#bffb4f] ${GoogleSansMedium.className}`}
											>
												Download
											</Link>
										) : (
											<span
												className={`inline-flex items-center rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 px-2.5 py-1 text-xs text-[#ffffff] ${GoogleSansMedium.className}`}
											>
												Soon
											</span>
										)}
									</div>
								</div>
							))}
						</div>

						<div className="mt-5 rounded-xl border border-[#ffffff]/8 bg-[#121212] p-6">
							<div className="flex items-center gap-4">
								<Image
									src="/Logo.png"
									alt="Next Icons Logo"
									width={40}
									height={40}
									priority={true}
									draggable={false}
								/>

								<span className={`text-3xl text-[#ffffff] ${GoogleSansBold.className}`}>
									Next Icons
								</span>
							</div>
						</div>

						<div className="mt-5 grid gap-4">
							{LOGO_RULES.map((rule) => (
								<div
									key={rule?.title}
									className="rounded-xl border border-[#ffffff]/6 bg-[#ffffff]/3 px-4 py-3 text-[#ffffff]/80"
								>
									<div className={`mb-1 text-base text-[#ffffff] ${GoogleSansMedium.className}`}>
										{rule?.title}
									</div>

									<div className={`text-justify text-sm ${GoogleSansRegular.className}`}>
										{rule?.text}
									</div>
								</div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.08 }}
						className="rounded-xl border border-[#ffffff]/8 bg-[#111111] p-7 backdrop-blur-sm"
					>
						<h2 className={`mb-4 text-2xl text-[#ffffff] lg:text-3xl ${GoogleSansSemiBold.className}`}>
							Color Palette
						</h2>

						<div className="grid gap-4">
							{BRAND_COLORS.map((color) => (
								<div
									key={color?.hex}
									className="grid grid-cols-[70px_1fr] gap-4 rounded-lg border border-[#ffffff]/6 bg-[#ffffff]/3 p-3"
								>
									<div className="h-16 w-full rounded-lg" style={{ backgroundColor: color.hex }} />

									<div>
										<div className={`text-[#ffffff] ${GoogleSansMedium.className}`}>
											{color?.name}
										</div>

										<div className={`text-sm text-[#bffb4f] ${GoogleSansMedium.className}`}>
											{color?.hex}
										</div>

										<div className={`text-xs text-[#ffffff]/65 ${GoogleSansRegular.className}`}>
											{color?.usage}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 rounded-lg border border-[#ffffff]/6 bg-[#ffffff]/3 p-4">
							<div className={`mb-2 text-base text-[#ffffff] ${GoogleSansMedium.className}`}>
								Brand Font
							</div>

							<div className="grid gap-2">
								{BRAND_FONTS.map((font) => (
									<div
										key={font?.label}
										className="flex items-center justify-between rounded-lg border border-[#ffffff]/8 bg-[#111111] px-3 py-2"
									>
										<span className={`text-base text-[#ffffff] ${font.className}`}>
											{font?.label}
										</span>

										<span className={`text-xs text-[#bffb4f] ${GoogleSansMedium.className}`}>
											{font?.weight}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="mt-5 rounded-lg border border-[#ffffff]/6 bg-[#ffffff]/3 p-4">
							<div className={`mb-2 text-base text-[#ffffff] ${GoogleSansMedium.className}`}>
								Project Resources
							</div>

							<div className="grid gap-2">
								{PROJECT_RESOURCES.map((resource) => (
									<Link
										key={resource?.label}
										href={resource?.href}
										target="_blank"
										rel="noopener noreferrer"
										onClick={() => trigger("light")}
										className={`flex items-center justify-between rounded-lg border border-[#ffffff]/8 bg-[#111111] px-3 py-2 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#bffb4f]/40 hover:text-[#bffb4f] ${GoogleSansMedium.className}`}
									>
										<span>{resource?.label}</span>
										<span className="text-xs text-[#bffb4f]">Open</span>
									</Link>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				<div className="mb-10 grid gap-6 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="rounded-xl border border-[#ffffff]/8 bg-[#111111] p-6"
					>
						<h2 className={`mb-4 text-2xl text-[#ffffff] lg:text-3xl ${GoogleSansSemiBold.className}`}>
							Typography
						</h2>

						<div className="space-y-4">
							<div className="rounded-lg border border-[#ffffff]/4 bg-[#ffffff]/2 p-4">
								<div className={`mb-2 text-sm text-[#ffffff]/80 ${GoogleSansRegular.className}`}>
									Heading Style
								</div>

								<div className={`text-3xl text-[#ffffff] lg:text-4xl ${GoogleSansBold.className}`}>
									Build with clarity
								</div>
							</div>

							<div className="rounded-lg border border-[#ffffff]/4 bg-[#ffffff]/2 p-4">
								<div className={`mb-2 text-sm text-[#ffffff]/80 ${GoogleSansRegular.className}`}>
									Body Style
								</div>

								<p
									className={`text-justify text-xs tracking-tight text-[#ffffff]/80 lg:text-[0.9rem] ${GoogleSansRegular.className}`}
								>
									Use short, helpful sentences that communicate technical value quickly and clearly.
								</p>
							</div>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 18 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.08 }}
						className="rounded-xl border border-[#ffffff]/8 bg-[#111111] p-6"
					>
						<h2 className={`mb-4 text-2xl text-[#ffffff] lg:text-3xl ${GoogleSansSemiBold.className}`}>
							Brand Voice
						</h2>

						<div className="grid gap-4">
							{VOICE_EXAMPLES.map((entry) => (
								<div
									key={entry?.title}
									className="rounded-lg border border-[#ffffff]/4 bg-[#ffffff]/2 p-4 text-[#ffffff]"
								>
									<div className={`text-base text-[#bffb4f] ${GoogleSansMedium.className}`}>
										{entry?.title}
									</div>

									<p
										className={`text-justify text-sm tracking-tight text-[#ffffff]/80 ${GoogleSansRegular.className}`}
									>
										{entry?.text}
									</p>
								</div>
							))}
						</div>
					</motion.div>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 18 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="rounded-xl border border-[#bffb4f]/25 bg-[#bffb4f]/10 p-6"
				>
					<h2 className={`mb-2 text-2xl text-[#ffffff] lg:text-3xl ${GoogleSansSemiBold.className}`}>
						Implementation Notes
					</h2>

					<p
						className={`text-justify text-sm leading-relaxed tracking-tight text-[#ffffff] lg:text-base lg:tracking-normal ${GoogleSansRegular.className}`}
					>
						Keep all logos and visual assets centralized in one source folder and version them with clear
						naming. Before publishing updates, run a quick review for spacing, contrast, and consistency
						across website, docs, and social media headers. This will ensure a consistent brand experience
						for users and help maintain brand integrity.
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
}
