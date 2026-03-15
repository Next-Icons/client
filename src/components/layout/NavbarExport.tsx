"use client";

import { GroteskBlack, GroteskMedium, GroteskRoman } from "@/utils/fonts";
import { GITHUB_REPO_NAME, GITHUB_REPO_URL } from "@/utils/constants";
import { useGithubStats } from "@/hooks/useGithubStats";
import GlobalSearch from "./GlobalSearch";

import { Menu, X, ChevronDown, GitHub, Sparkles2, PlayCircle, AppWindow, Type } from "@deemlol/next-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

type NavbarDropdownItem = {
	url: string;
	name: string;
	desc: string;
	disabled: boolean;
	icon: React.ComponentType<{ size?: number }>;
};

type NavbarLink = {
	name: string;
	href: string;
	disabled?: boolean;
	hasDropdown: boolean;
	dropdownItems?: NavbarDropdownItem[];
};

const NAVBAR_LINKS: NavbarLink[] = [
	{
		name: "Explore",
		href: "#",
		hasDropdown: true,
		dropdownItems: [
			{
				name: "Icons",
				icon: Sparkles2,
				desc: "Browse all of our icons",
				url: "/icons",
				disabled: false,
			},
			{
				name: "Animated Icons",
				icon: PlayCircle,
				desc: "Browse all of our animated icons",
				url: "#",
				disabled: true,
			},
			{
				name: "UI Components",
				icon: AppWindow,
				desc: "Browse all of our UI components",
				url: "#",
				disabled: true,
			},
		],
	},
	{
		name: "Legal",
		href: "#",
		hasDropdown: true,
		dropdownItems: [
			{
				name: "Privacy Policy",
				icon: Type,
				desc: "Read our privacy policy",
				url: "/legal/privacy",
				disabled: false,
			},
			{
				name: "Licence",
				icon: Type,
				desc: "Read our licence",
				url: "https://github.com/Next-Icons/next-icons/blob/main/LICENCE",
				disabled: false,
			},
		],
	},
	{ name: "Contact Us", href: "/contact", hasDropdown: false, disabled: false },
];

export default function NavbarExport() {
	const [activeMobileDropdown, setActiveMobileDropdown] = React.useState<string | null>("Explore");
	const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
	const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const { formattedStars, loading } = useGithubStats(GITHUB_REPO_NAME);
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const { trigger } = useWebHaptics();

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window?.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	React.useEffect(() => {
		if (!isMobileMenuOpen) {
			document.body.style.overflow = "";
			setActiveMobileDropdown(null);
			return;
		}

		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	return (
		<>
			<motion.nav
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				className={`fixed top-0 right-0 left-0 z-50 py-4 transition-colors duration-300 ${
					isScrolled ? "bg-[#121212]/40 backdrop-blur-md" : "bg-transparent"
				}`}
			>
				<div className="mx-auto max-w-7xl px-4 2xl:px-0">
					<div className="flex items-center justify-between">
						<Link href={"/"} className="group flex shrink-0 cursor-pointer items-center gap-3">
							<Image
								src={"/Logo.png"}
								alt="NextIcon"
								width={40}
								height={40}
								priority={true}
								draggable={false}
								preload={false}
							/>

							<h1 className={`${GroteskBlack.className} text-3xl tracking-wide text-[#ffffff]`}>
								Next Icons
							</h1>
						</Link>

						<div className="hidden items-center px-4 py-1.5 lg:flex">
							{NAVBAR_LINKS.map((link) => (
								<div
									key={link?.name}
									className="group relative"
									onMouseEnter={() => {
										if (timeoutRef?.current) {
											clearTimeout(timeoutRef?.current);
											timeoutRef.current = null;
										}

										setActiveDropdown(link?.name);
										setHoveredLink(link?.name);
									}}
									onMouseLeave={() => {
										timeoutRef.current = setTimeout(() => {
											setActiveDropdown(null);
											setHoveredLink(null);
										}, 400);
									}}
								>
									{link?.hasDropdown ? (
										<div
											className={`relative z-10 flex cursor-pointer items-center gap-2 px-6 py-1.5 text-base ${GroteskRoman.className} transition-colors duration-300 ${
												hoveredLink === link?.name ? "text-[#000000]" : "text-[#ffffff]"
											}`}
										>
											<span>{link?.name}</span>

											<ChevronDown
												size={18}
												strokeWidth={1.5}
												className={`transition-transform duration-300 ${
													activeDropdown === link?.name
														? "rotate-180 text-[#000000]"
														: "text-[#ffffff]"
												}`}
											/>

											{hoveredLink === link?.name && (
												<motion.div
													layoutId="navbar-pill"
													className="absolute inset-0 -z-10 rounded-full bg-[#bffb4f] shadow-2xl shadow-[#bffb4f] backdrop-blur-lg"
													transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
												/>
											)}
										</div>
									) : (
										<Link
											href={link?.href}
											className={`relative z-10 flex items-center gap-2 px-6 py-1.5 text-base ${GroteskRoman.className} transition-colors duration-300 ${
												hoveredLink === link?.name ? "text-[#000000]" : "text-[#ffffff]"
											}`}
										>
											<span>{link?.name}</span>

											{hoveredLink === link?.name && (
												<motion.div
													layoutId="navbar-pill"
													className="absolute inset-0 -z-10 rounded-full bg-[#bffb4f] shadow-2xl shadow-[#bffb4f] backdrop-blur-lg"
													transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
												/>
											)}
										</Link>
									)}

									<AnimatePresence>
										{link?.hasDropdown && activeDropdown === link?.name && (
											<motion.div
												initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
												animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
												exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(2px)" }}
												transition={{ duration: 0.2, ease: "easeOut" }}
												className="absolute top-full left-1/2 mt-4 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-[#bffb4f] p-1.5"
											>
												<div className="flex flex-col gap-1.5">
													{link?.dropdownItems?.map((item) => (
														<Link
															key={item?.name}
															href={item?.disabled ? "#" : item?.url}
															target={
																!item?.disabled && item?.url.startsWith("http")
																	? "_blank"
																	: undefined
															}
															rel={
																!item?.disabled && item?.url.startsWith("http")
																	? "noopener noreferrer"
																	: undefined
															}
															className={`group/item flex items-start gap-4 rounded-2xl p-3 transition-colors duration-300 ${
																item?.disabled
																	? "cursor-not-allowed opacity-60"
																	: "hover:bg-[#ffffff]"
															}`}
															onClick={(e) => item?.disabled && e?.preventDefault()}
														>
															<div
																className={`flex h-9 w-9 items-center justify-center rounded-lg bg-[#ffffff] text-[#000000] transition-colors duration-400 ${
																	!item?.disabled &&
																	"group-hover/item:bg-[#000000] group-hover/item:text-[#bffb4f]"
																}`}
															>
																<item.icon size={22} />
															</div>

															<div className="flex-1">
																<div className="flex items-center gap-2">
																	<div
																		className={`${GroteskMedium.className} text-start text-sm tracking-wide text-[#000000]`}
																	>
																		{item?.name}
																	</div>

																	{item?.disabled && (
																		<span
																			className={`rounded-full bg-[#000000] px-2 py-0.5 text-[10px] text-[#bffb4f] ${GroteskRoman.className}`}
																		>
																			Soon
																		</span>
																	)}
																</div>

																<div
																	className={`${GroteskRoman.className} text-start text-xs tracking-wide text-[#3f3f46]`}
																>
																	{item?.desc}
																</div>
															</div>
														</Link>
													))}
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							))}
						</div>

						<div className="hidden items-center gap-4 lg:flex">
							<GlobalSearch />

							<div className="mx-1 h-7 w-px bg-[#fafafa]/30"></div>

							<Link
								href={GITHUB_REPO_URL}
								target="_blank"
								rel="noopener noreferrer"
								className={`flex cursor-pointer items-center gap-2 text-lg text-[#ffffff] ${GroteskRoman.className}`}
							>
								<GitHub size={18} strokeWidth={1.5} />
								<span>{loading ? 0 : formattedStars}</span>
							</Link>
						</div>

						<div className="flex items-center lg:hidden">
							<button
								type="button"
								onClick={() => {
									setIsMobileMenuOpen(!isMobileMenuOpen);
									trigger("heavy");
								}}
								className="relative flex h-10 w-10 items-center justify-center focus:outline-none"
								aria-label="Open mobile menu"
							>
								<AnimatePresence mode="wait">
									<motion.span
										key="menu"
										initial={{ opacity: 0, scale: 0.75, rotate: isMobileMenuOpen ? -45 : 45 }}
										animate={{ opacity: 1, scale: 1, rotate: 0 }}
										exit={{ opacity: 0, scale: 0.75, rotate: isMobileMenuOpen ? 45 : -45 }}
										transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
										className="absolute inset-0 flex items-center justify-center"
									>
										<Menu size={34} color="#ffffff" strokeWidth={1.5} />
									</motion.span>
								</AnimatePresence>
							</button>
						</div>
					</div>
				</div>

				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							className="fixed inset-0 z-50 lg:hidden"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<motion.div
								initial={{ x: "100%" }}
								animate={{ x: 0 }}
								exit={{ x: "100%" }}
								transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
								className="ml-auto flex h-full w-full flex-col overflow-hidden bg-[#121212]"
								onClick={(e) => e?.stopPropagation()}
							>
								<div className="flex items-center justify-between px-4 py-4">
									<Link
										href={"/"}
										onClick={() => {
											setIsMobileMenuOpen(false);
											trigger("light");
										}}
										className="flex items-center gap-3"
									>
										<Image
											src={"/Logo.png"}
											alt="NextIcon"
											width={40}
											height={40}
											priority
											draggable={false}
											preload={false}
										/>

										<h1
											className={`${GroteskBlack.className} text-3xl tracking-wide text-[#ffffff]`}
										>
											Next Icons
										</h1>
									</Link>

									<button
										type="button"
										onClick={() => {
											setIsMobileMenuOpen(false);
											trigger("heavy");
										}}
										className="flex h-10 w-10 items-center justify-center"
										aria-label="Close mobile menu"
									>
										<X size={34} color="#ffffff" strokeWidth={1.5} />
									</button>
								</div>

								<div className="flex-1 space-y-6 overflow-y-auto px-4 pt-8 pb-8">
									{NAVBAR_LINKS.map((link) => (
										<div key={link?.name} className="border-b border-[#fafafa]/7 pb-1.5">
											{link?.hasDropdown ? (
												<button
													type="button"
													onClick={() => {
														setActiveMobileDropdown((prev) =>
															prev === link?.name ? null : link?.name,
														);
														trigger("medium");
													}}
													className={`flex w-full items-center justify-between py-2 text-start text-3xl leading-none tracking-wide text-[#ffffff] ${GroteskRoman.className}`}
												>
													<span>{link?.name}</span>

													<ChevronDown
														size={24}
														strokeWidth={1.5}
														className={`transition-transform duration-300 ${
															activeMobileDropdown === link?.name ? "rotate-180" : ""
														}`}
													/>
												</button>
											) : (
												<Link
													href={link?.href}
													onClick={() => setIsMobileMenuOpen(false)}
													className={`block py-2 text-start text-3xl leading-none tracking-wide text-[#ffffff] ${GroteskRoman.className}`}
												>
													{link?.name}
												</Link>
											)}

											{link?.hasDropdown && activeMobileDropdown === link?.name && (
												<div className="grid grid-cols-1 gap-2 pt-2 pb-1.5">
													{link?.dropdownItems?.map((item) => (
														<Link
															key={item?.name}
															href={item?.disabled ? "#" : item?.url}
															target={
																!item?.disabled && item?.url.startsWith("http")
																	? "_blank"
																	: undefined
															}
															rel={
																!item?.disabled && item?.url.startsWith("http")
																	? "noopener noreferrer"
																	: undefined
															}
															className={`group flex items-center gap-2 px-5 py-2 transition-all duration-300 ${
																item?.disabled ? "opacity-40" : ""
															}`}
															onClick={(e) => {
																if (item?.disabled) {
																	e?.preventDefault();
																	return;
																}

																setIsMobileMenuOpen(false);
															}}
														>
															<div className="flex flex-1 flex-col">
																<div className="flex items-center gap-2">
																	<span
																		className={`text-start text-xl tracking-wide text-[#ffffff] ${GroteskRoman.className}`}
																	>
																		{item?.name}
																	</span>

																	{item?.disabled && (
																		<span
																			className={`rounded-full border border-[#bffb4f]/20 bg-[#bffb4f]/10 px-2 py-0.5 text-[10px] text-[#bffb4f] ${GroteskMedium.className}`}
																		>
																			Soon
																		</span>
																	)}
																</div>

																<span
																	className={`text-sm text-[#ffffff]/50 ${GroteskRoman.className}`}
																>
																	{item?.desc}
																</span>
															</div>
														</Link>
													))}
												</div>
											)}
										</div>
									))}
								</div>

								<div className="px-4 pb-8">
									<div className="flex justify-end">
										<Link
											href={GITHUB_REPO_URL}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => {
												setIsMobileMenuOpen(false);
												trigger("medium");
											}}
											className={`inline-flex items-center gap-3 rounded-xl bg-[#bffb4f] px-4 py-1.5 text-lg text-[#000000] ${GroteskRoman.className}`}
										>
											<GitHub size={20} strokeWidth={1.5} />
											<span>{loading ? 0 : formattedStars}</span>
										</Link>
									</div>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</>
	);
}
