"use client";

import { GroteskRoman } from "@/utils/fonts";

import { motion, AnimatePresence } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import * as React from "react";

export default function ColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
	const [openDirection, setOpenDirection] = React.useState<"up" | "down">("down");
	const containerRef = React.useRef<HTMLDivElement>(null);
	const dropdownRef = React.useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const { trigger } = useWebHaptics();

	const updateDropdownDirection = React.useCallback(() => {
		if (!containerRef?.current) return;

		const rect = containerRef?.current?.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const dropdownHeight = dropdownRef?.current?.offsetHeight ?? 300;
		const spaceBelow = viewportHeight - rect.bottom;
		const spaceAbove = rect.top;
		const shouldOpenUp = spaceBelow < Math.min(240, dropdownHeight) && spaceAbove > spaceBelow;

		setOpenDirection(shouldOpenUp ? "up" : "down");
	}, []);

	React.useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef?.current && !containerRef?.current?.contains(e?.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	React.useEffect(() => {
		if (!isOpen) return;

		updateDropdownDirection();
		window.addEventListener("resize", updateDropdownDirection);
		window.addEventListener("scroll", updateDropdownDirection, true);

		return () => {
			window.removeEventListener("resize", updateDropdownDirection);
			window.removeEventListener("scroll", updateDropdownDirection, true);
		};
	}, [isOpen, updateDropdownDirection]);

	return (
		<div className="relative" ref={containerRef}>
			<button
				onClick={() => {
					setIsOpen(!isOpen);
					trigger("light");
				}}
				className={`flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg border border-white/8 bg-[#ffffff]/5 px-3 transition-all duration-300 hover:bg-[#ffffff]/8 ${
					isOpen ? "border-none ring ring-[#bffb4f]/80" : ""
				}`}
			>
				<div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />

				<span className={`flex-1 text-start text-base tracking-wider text-[#ffffff] ${GroteskRoman.className}`}>
					{color}
				</span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={dropdownRef}
						initial={{ opacity: 0, y: openDirection === "up" ? -10 : 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: openDirection === "up" ? -10 : 10, scale: 0.95 }}
						className={`absolute left-0 z-100 w-full min-w-[200px] overflow-hidden rounded-lg border border-[#ffffff]/10 bg-[#111111] p-4 backdrop-blur-sm ${
							openDirection === "up" ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"
						}`}
					>
						<div className="max-h-[60vh] space-y-5 overflow-y-auto overscroll-contain pr-1">
							<div>
								<label
									className={`mb-2 block text-base tracking-tight text-[#ffffff] ${GroteskRoman.className}`}
								>
									Hex Color
								</label>

								<div className="relative">
									<span className="absolute top-1/2 left-3 -translate-y-1/2 text-white/40">#</span>

									<input
										type="text"
										value={color?.replace("#", "")}
										onChange={(e) => {
											const val = e?.target?.value;

											if (/^[0-9A-Fa-f]*$/.test(val)) {
												onChange(`#${val}`);
											}

											trigger("light");
										}}
										maxLength={6}
										className={`w-full rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 py-2 pr-3 pl-7 text-sm tracking-wider text-[#ffffff] outline-none focus:border-[#bffb4f]/80 ${GroteskRoman.className}`}
									/>
								</div>
							</div>

							<div>
								<label
									className={`mb-2 block text-base tracking-tight text-[#ffffff] ${GroteskRoman.className}`}
								>
									Quick Select
								</label>

								<div className="grid grid-cols-5 gap-2">
									{[
										"#FFFFFF",
										"#bffb4f",
										"#3b82f6",
										"#ef4444",
										"#f59e0b",
										"#a855f7",
										"#ec4899",
										"#6366f1",
										"#14b8a6",
										"#f43f5e",
									].map((c) => (
										<button
											key={c}
											onClick={() => {
												onChange(c);
												trigger("light");
											}}
											className={`aspect-square w-full cursor-pointer rounded-md transition-transform duration-300 hover:scale-110 ${
												color === c ? "ring-2 ring-[#ffffff]" : ""
											}`}
											style={{ backgroundColor: c }}
										/>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
