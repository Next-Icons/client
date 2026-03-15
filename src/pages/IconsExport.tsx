"use client";

import { GroteskBold, GroteskRoman } from "@/utils/fonts";
import ColorPicker from "@/components/icons/ColorPicker";
import IconModal from "@/components/icons/IconModal";

import { Search, ChevronLeft, ChevronRight, Settings, RotateCcw, Mail } from "@deemlol/next-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import * as Icons from "@deemlol/next-icons";
import * as React from "react";
import Link from "next/link";

type IconType = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>;
type IconEntry = [string, IconType];

export default function IconsExport() {
	const [selectedIcon, setSelectedIcon] = React.useState<IconEntry | null>(null);
	const [globalColor, setGlobalColor] = React.useState("#FFFFFF");
	const [isCustomizing, setIsCustomizing] = React.useState(false);
	const [globalStroke, setGlobalStroke] = React.useState(1.5);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [currentPage, setCurrentPage] = React.useState(1);
	const [globalSize, setGlobalSize] = React.useState(38);
	const { trigger } = useWebHaptics();

	const allIcons = React.useMemo(() => {
		return Object.entries(Icons).filter(([n]) => n !== "default" && /^[A-Z]/.test(n)) as IconEntry[];
	}, []);

	const filteredIcons = React.useMemo(() => {
		return allIcons.filter(([n]) => n?.toLowerCase().includes(searchQuery?.toLowerCase()));
	}, [allIcons, searchQuery]);

	const totalPages = Math.ceil(filteredIcons?.length / 104);

	const currentIcons = React.useMemo(() => {
		const start = (currentPage - 1) * 104;
		return filteredIcons.slice(start, start + 104);
	}, [filteredIcons, currentPage]);

	React.useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		trigger("light");

		window?.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="min-h-screen px-4 pb-24 2xl:px-0"
		>
			<div className="mx-auto max-w-7xl">
				<div className="sticky top-18 z-30 mb-30 rounded-lg border border-[#FFFFFF]/5 bg-[#111111]/60 p-3 backdrop-blur-md transition-all duration-300 md:top-20">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="relative w-full max-w-sm">
							<Search
								size={22}
								strokeWidth={1.5}
								className="absolute top-1/2 left-4 -translate-y-1/2 text-[#ffffff]"
							/>

							<input
								type="text"
								placeholder={`Search ${allIcons?.length} icons...`}
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e?.target?.value);
									trigger("light");
								}}
								className={`w-full rounded-lg border border-[#ffffff]/5 bg-[#ffffff]/3 py-2.5 pr-4 pl-12 text-start text-base text-[#ffffff] backdrop-blur-md transition-all duration-300 outline-none focus:border-[#bffb4f]/50 ${GroteskRoman.className}`}
							/>
						</div>

						<button
							onClick={() => {
								setIsCustomizing(!isCustomizing);
								trigger("medium");
							}}
							className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 transition-all duration-300 ${
								isCustomizing
									? "border-none bg-[#bffb4f] text-[#000000]"
									: "border-[#ffffff]/5 bg-[#ffffff]/3 text-[#ffffff]"
							}`}
						>
							<Settings size={19} strokeWidth={1.5} />

							<span className={GroteskRoman.className}>Customize View</span>
						</button>
					</div>

					<AnimatePresence>
						{isCustomizing && (
							<motion.div
								initial={{ height: 0, opacity: 0, overflow: "hidden" }}
								animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
								exit={{ height: 0, opacity: 0, overflow: "hidden" }}
								transition={{ duration: 0.3, ease: "easeInOut" }}
							>
								<div className="mt-6 border-t border-[#ffffff]/6 pt-6">
									<div className="mb-6 flex items-end justify-end">
										<button
											onClick={() => {
												setGlobalSize(38);
												setGlobalStroke(1.5);
												setGlobalColor("#FFFFFF");
												trigger("medium");
											}}
											className={`flex cursor-pointer items-center gap-2 rounded-lg bg-[#ffffff]/6 px-4 py-1.5 text-xs text-[#ffffff]/80 transition-all duration-300 hover:bg-[#ffffff]/10 ${GroteskRoman.className}`}
										>
											<RotateCcw size={14} strokeWidth={1.5} />
											Reset to default
										</button>
									</div>

									<div className="grid gap-12 sm:grid-cols-3">
										<div>
											<label
												className={`mb-2 block text-start text-sm text-[#ffffff] ${GroteskRoman.className}`}
											>
												Size: {globalSize}px
											</label>

											<input
												type="range"
												min="16"
												max="64"
												step="4"
												value={globalSize}
												onChange={(e) => {
													setGlobalSize(Number(e?.target?.value));
													trigger("light");
												}}
												className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
											/>
										</div>

										<div>
											<label
												className={`mb-2 block text-start text-sm text-[#ffffff] ${GroteskRoman.className}`}
											>
												Stroke: {globalStroke}px
											</label>

											<input
												type="range"
												min="0.5"
												max="4"
												step="0.5"
												value={globalStroke}
												onChange={(e) => {
													setGlobalStroke(Number(e?.target?.value));
													trigger("light");
												}}
												className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
											/>
										</div>

										<div>
											<label
												className={`mb-2 block text-start text-sm text-[#ffffff] ${GroteskRoman.className}`}
											>
												Color
											</label>

											<ColorPicker color={globalColor} onChange={setGlobalColor} />
										</div>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				<div className="grid grid-cols-3 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
					{currentIcons.map(([name, Icon]) => (
						<button
							key={name}
							onClick={() => {
								setSelectedIcon([name, Icon]);
								trigger("medium");
							}}
							className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-[#ffffff]/4 bg-[#ffffff]/1 transition-all duration-300 hover:border-[#bffb4f]/60 hover:bg-[#bffb4f]/5"
						>
							<Icon
								size={globalSize}
								strokeWidth={globalStroke}
								color={globalColor}
								className="mb-3 transition-transform duration-300 group-hover:scale-125"
							/>

							<span
								className={`text-center text-[0.6rem] tracking-wider text-[#ffffff] sm:text-xs ${GroteskRoman.className}`}
							>
								{name}
							</span>
						</button>
					))}
				</div>

				{currentIcons?.length === 0 && (
					<div className="flex flex-col items-center justify-center py-14 lg:py-24">
						<h3
							className={`mb-4 text-center text-[1.48rem] text-[#bffb4f] lg:text-6xl ${GroteskBold.className}`}
						>
							Can&apos;t find what you&apos;re looking for?
						</h3>

						<p
							className={`mb-8 max-w-2xl text-justify text-base text-[#ffffff] lg:text-center lg:text-lg ${GroteskRoman.className}`}
						>
							We are happy to add new icons, as soon as possible. Feel free to request any new icon!
						</p>

						<Link
							href={"/contact"}
							onClick={() => {
								trigger("light");
							}}
							className={`flex items-center justify-center gap-3 rounded-lg bg-[#bffb4f] px-16 py-3 text-base text-[#000000] transition-all duration-300 hover:bg-[#bffb4f]/90 active:scale-95 lg:text-lg ${GroteskRoman.className}`}
						>
							<Mail size={22} strokeWidth={1.5} />
							<span>Request an icon</span>
						</Link>
					</div>
				)}

				{totalPages > 1 && (
					<div className="mt-14 flex justify-center gap-3">
						<button
							onClick={() => {
								handlePageChange(Math.max(1, currentPage - 1));
								trigger("medium");
							}}
							disabled={currentPage === 1}
							className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 text-[#ffffff] transition-colors hover:bg-[#ffffff]/8 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<ChevronLeft size={22} strokeWidth={1.5} />
						</button>

						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							let p = i + 1;

							if (totalPages > 5) {
								if (currentPage > 3) p = currentPage - 2 + i;
								if (p > totalPages) p = totalPages - (4 - i);
							}

							return (
								<button
									key={p}
									onClick={() => {
										handlePageChange(p);
										trigger("medium");
									}}
									className={`h-10 w-10 cursor-pointer rounded-lg border text-base transition-colors duration-300 ${
										currentPage === p
											? "border-none bg-[#bffb4f] text-[#000000]"
											: "border-[#ffffff]/8 bg-[#ffffff]/4 text-[#ffffff] hover:bg-[#ffffff]/8"
									} ${GroteskRoman.className}`}
								>
									{p}
								</button>
							);
						})}

						<button
							onClick={() => {
								handlePageChange(Math.min(totalPages, currentPage + 1));
								trigger("medium");
							}}
							disabled={currentPage === totalPages}
							className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 text-[#ffffff] transition-colors hover:bg-[#ffffff]/8 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<ChevronRight size={22} strokeWidth={1.5} />
						</button>
					</div>
				)}
			</div>

			{selectedIcon && <IconModal selectedIcon={selectedIcon} onClose={() => setSelectedIcon(null)} />}
		</motion.div>
	);
}
