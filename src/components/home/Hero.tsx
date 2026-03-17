"use client";

import { GoogleSansBold, GoogleSansMedium } from "@/utils/fonts";

//prettier-ignore
import { Layers, Settings, Download, Search, Monitor, CheckCircle, Sparkles2, ChevronRight, ChevronDown, Clipboard, ChevronLeft, ChevronUp, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Zap, Box } from "@deemlol/next-icons";
import { useWebHaptics } from "web-haptics/react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import * as React from "react";
import Link from "next/link";

const PREVIEW_ICONS = [
	{ icon: ChevronDown, name: "Chevron Down" },
	{ icon: ChevronLeft, name: "Chevron Left" },
	{ icon: ChevronRight, name: "Chevron Right" },
	{ icon: ChevronUp, name: "Chevron Up" },
	{ icon: Phone, name: "Phone" },
	{ icon: PhoneCall, name: "Phone Call" },
	{ icon: PhoneIncoming, name: "Phone Incoming" },
	{ icon: PhoneOutgoing, name: "Phone Outgoing" },
	{ icon: PhoneMissed, name: "Phone Missed" },
	{ icon: PhoneOff, name: "Phone Off" },
	{ icon: PhoneForwarded, name: "Phone Forwarded" },
	{ icon: Monitor, name: "Monitor" },
	{ icon: Download, name: "Download" },
	{ icon: Search, name: "Search" },
	{ icon: Settings, name: "Settings" },
	{ icon: Zap, name: "Zap" },
	{ icon: Box, name: "Box" },
	{ icon: Layers, name: "Layers" },
];

export default function Hero() {
	const [isCommandCopied, setIsCommandCopied] = React.useState(false);
	const [iconCount, setIconCount] = React.useState(0);
	const installCommand = "npm i @deemlol/next-icons";
	const { trigger } = useWebHaptics();
	const router = useRouter();

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

	const handleCopyInstallCommand = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const rect = e?.currentTarget?.getBoundingClientRect();

		const x = (rect?.left + rect?.width / 2) / window?.innerWidth;
		const y = (rect?.top + rect?.height / 2) / window?.innerHeight;
		await navigator?.clipboard?.writeText(installCommand);

		confetti({
			particleCount: 50,
			spread: 50,
			origin: { x, y },
			colors: ["#bffb4f", "#ffffff"],
			disableForReducedMotion: true,
			zIndex: 1000,
		});

		setIsCommandCopied(true);
		window.setTimeout(() => {
			setIsCommandCopied(false);
		}, 2_300);
	};

	return (
		<section className="overflow-hidden px-4 pt-36 pb-28 lg:pt-48 lg:pb-40 2xl:px-0">
			<div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1
						className={`mb-6 max-w-xl text-[2.9rem] leading-none text-[#ffffff] lg:text-[4.8rem] ${GoogleSansBold.className}`}
					>
						The icon library{" "}
						<span className="text-[3.6rem] text-[#bffb4f] lg:text-[6rem]">
							you&apos;ve been waiting for
						</span>
					</h1>

					<p
						className={`mb-6 max-w-xl text-justify text-base leading-relaxed tracking-tighter text-[#ffffff] lg:text-lg lg:tracking-tight ${GoogleSansMedium.className}`}
					>
						An open-source icon library for{" "}
						<Link
							href={"https://react.dev/"}
							target="_blank"
							rel="noopener noreferrer"
							className={`text-[#bffb4f] underline underline-offset-4`}
							onClick={() => trigger("light")}
						>
							React
						</Link>{" "}
						and{" "}
						<Link
							href={"https://nextjs.org/"}
							target="_blank"
							rel="noopener noreferrer"
							className={`text-[#bffb4f] underline underline-offset-4`}
							onClick={() => trigger("light")}
						>
							Next.js
						</Link>{" "}
						that is lightweight, designed for simplicity and seamless integration. Each icon is designed on
						a 24x24 pixels grid with a focus on consistency.
					</p>

					<div className="flex w-full max-w-xl flex-col gap-4 lg:flex-row">
						<Link
							href={"/icons"}
							className={`flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#bffb4f] px-4 py-3 text-base text-[#000000] backdrop-blur-md transition-all duration-300 hover:bg-[#bffb4f]/90 hover:text-[#000000] ${GoogleSansMedium.className}`}
							onClick={() => trigger("medium")}
						>
							<Sparkles2 size={20} strokeWidth={1.5} />
							Browse All Icons
						</Link>

						<button
							type="button"
							onClick={(e) => {
								handleCopyInstallCommand(e);
								trigger("success");
							}}
							className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-[#fafafa]/15 bg-[#161616] px-4 py-3 transition-colors duration-300 hover:border-[#bffb4f]"
							aria-label={isCommandCopied ? "Copied" : "Copy install command"}
						>
							<div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
								<span className={`text-[#bffb4f] ${GoogleSansMedium.className}`}>$</span>

								<span
									className={`truncate text-start text-base tracking-tight text-[#ffffff] ${GoogleSansMedium.className}`}
								>
									{installCommand}
								</span>
							</div>

							<span className="flex shrink-0 items-center justify-center text-[#ffffff]">
								{isCommandCopied ? (
									<CheckCircle size={18} strokeWidth={1.5} color="#bffb4f" />
								) : (
									<Clipboard size={18} strokeWidth={1.5} color="#ffffff" />
								)}
							</span>
						</button>

						<Link
							href={
								"https://chatgpt.com/?prompt=I%27m%20interested%20in%20learning%20more%20about%20how%20to%20use%20https%3A%2F%2Fwww.nexticons.com%20and%20incorporate%20it%20into%20my%20project"
							}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trigger("light")}
							className={`hidden w-fit cursor-pointer self-center rounded-lg border border-[#fafafa]/15 bg-[#161616] px-3 py-2 text-center text-xs text-[#ffffff] transition-colors duration-300 hover:border-[#bffb4f] hover:text-[#bffb4f] lg:inline-flex ${GoogleSansMedium.className}`}
						>
							Ask AI
						</Link>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.9, rotate: 12 }}
					animate={{ opacity: 1, scale: 1, rotate: 0 }}
					transition={{
						duration: 0.8,
						ease: [0.16, 1, 0.3, 1],
						delay: 0.2,
					}}
					className="relative z-10 mx-auto w-full max-w-[600px] rotate-0 lg:mr-0 lg:rotate-4"
				>
					<div className="absolute -inset-1 rounded-xl bg-linear-to-r from-[#bffb4f]/50 to-[#bffb4f]/30 opacity-50 blur-3xl" />

					<div className="relative overflow-hidden rounded-xl bg-[#bffb4f] p-5">
						<button
							type="button"
							onClick={() => {
								router.push("/icons");
								trigger("light");
							}}
							className="group mb-4 flex w-full cursor-pointer items-center gap-3 rounded-xl bg-[#ffffff] px-4 py-2 lg:py-3"
						>
							<Search size={22} strokeWidth={1.5} color="#000000" />

							<span
								className={`text-start text-base text-[#000000] lg:text-lg ${GoogleSansMedium.className}`}
							>
								Search {iconCount || 0} icons...
							</span>
						</button>

						<div className="grid grid-cols-6 gap-5">
							{PREVIEW_ICONS.map(({ icon: Icon, name }, i) => (
								<button
									key={i}
									type="button"
									aria-label={name}
									className="group relative flex aspect-square items-center justify-center rounded-xl transition-transform duration-300 hover:scale-200 lg:scale-150"
								>
									<Icon size={20} strokeWidth={1.5} color="#000000" />
								</button>
							))}
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
