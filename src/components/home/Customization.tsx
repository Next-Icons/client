"use client";

import { GoogleSansBold, GoogleSansMedium, GoogleSansRegular } from "@/utils/fonts";

//prettier-ignore
import { Layers, Feather, Settings, Download, Search, PenTool, Monitor, Globe, CheckCircle, Sparkles2, ChevronRight, ChevronDown, Heart, ChevronLeft, ChevronUp, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, Zap, Box, RotateCcw, Code } from "@deemlol/next-icons";
import { useWebHaptics } from "web-haptics/react";
import { motion } from "framer-motion";
import * as React from "react";

const PREVIEW_ICONS = [
	Box,
	Zap,
	Settings,
	Search,
	Download,
	Layers,
	Globe,
	PenTool,
	Monitor,
	CheckCircle,
	Sparkles2,
	Heart,
	Phone,
	PhoneCall,
	PhoneForwarded,
	PhoneIncoming,
	Code,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Feather,
	Download,
	RotateCcw,
];

export default function Customization() {
	const [strokeWidth, setStrokeWidth] = React.useState(1.5);
	const [color, setColor] = React.useState("#bffb4f");
	const [size, setSize] = React.useState(32);
	const { trigger } = useWebHaptics();

	const codeSnippet = `<Icon \n    color="${color}"\n    size={${size}}\n    strokeWidth={${strokeWidth}}\n/>`;
	const PREVIEW_COLORS = ["#bffb4f", "#ffffff", "#3b82f6", "#a855f7", "#ef4444", "#f97316"];

	return (
		<section className="px-4 pt-28 pb-30 lg:pt-36 2xl:px-0">
			<div className="mx-auto max-w-7xl">
				<div className="mb-10">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className={`mb-4 text-center text-[2.4rem] tracking-tighter text-[#FFFFFF] lg:text-start lg:text-7xl lg:tracking-tight ${GoogleSansBold.className}`}
					>
						Style as you <span className="text-[#bffb4f]">please</span>
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
						className={`text-center text-base tracking-tight text-[#ffffff]/70 lg:text-start ${GoogleSansRegular.className}`}
					>
						Customize the icons to fit your needs, from the color to the size and stroke width.
					</motion.p>
				</div>

				<div className="grid gap-8 lg:grid-cols-[1fr_400px]">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						className="relative overflow-hidden rounded-xl border border-[#ffffff]/5 bg-[#111111] p-4 lg:p-10"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(191,251,79,0.05),transparent_80%)]" />

						<div className="relative z-10 grid grid-cols-4 gap-6 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
							{PREVIEW_ICONS.map((Icon, i) => (
								<motion.div
									key={i}
									layout
									className="flex aspect-square items-center justify-center rounded-xl bg-[#ffffff]/3 backdrop-blur-sm transition-colors duration-300 hover:bg-[#ffffff]/5"
								>
									<Icon
										color={color}
										size={size}
										strokeWidth={strokeWidth}
										className="transition-all duration-300"
									/>
								</motion.div>
							))}
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						className="flex flex-col gap-10"
					>
						<div className="relative flex flex-col gap-8 rounded-xl border border-[#ffffff]/5 bg-[#111111] p-8">
							<button
								onClick={() => {
									setColor("#bffb4f");
									setSize(32);
									setStrokeWidth(1.5);
									trigger("success");
								}}
								className="absolute top-6 right-6 flex cursor-pointer items-center justify-center transition-all duration-300 hover:rotate-180"
								aria-label="Reset to defaults"
							>
								<RotateCcw size={20} color="#ffffff" />
							</button>

							<div>
								<label className={`mb-4 block text-lg text-[#ffffff] ${GoogleSansMedium.className}`}>
									Pick a color
								</label>

								<div className="flex flex-wrap gap-4">
									{PREVIEW_COLORS.map((c) => (
										<button
											key={c}
											onClick={() => {
												setColor(c);
												trigger("light");
											}}
											className={`h-8 w-8 cursor-pointer rounded-full border-2 transition-transform duration-300 hover:scale-110 lg:h-10 lg:w-10 ${
												color === c ? "scale-110 border-[#ffffff]" : "border-transparent"
											}`}
											style={{ backgroundColor: c }}
											aria-label={`Select color ${c}`}
										/>
									))}
								</div>
							</div>

							<div>
								<div className="mb-4 flex items-center justify-between">
									<label
										htmlFor="icon-size-input"
										className={`block text-lg text-[#ffffff] ${GoogleSansMedium.className}`}
									>
										Size
									</label>

									<span className={`text-base text-[#ffffff]/80 ${GoogleSansMedium.className}`}>
										{size}px
									</span>
								</div>

								<input
									id="icon-size-input"
									type="range"
									min="16"
									max="48"
									step="4"
									value={size}
									onChange={(e) => {
										setSize(Number(e?.target?.value));
										trigger("light");
									}}
									className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#ffffff]/15 accent-[#bffb4f]"
								/>
							</div>

							<div>
								<div className="mb-4 flex items-center justify-between">
									<label
										htmlFor="icon-stroke-width-input"
										className={`block text-lg text-[#ffffff] ${GoogleSansMedium.className}`}
									>
										Stroke Width
									</label>

									<span className={`text-base text-[#ffffff]/80 ${GoogleSansMedium.className}`}>
										{strokeWidth}px
									</span>
								</div>

								<input
									id="icon-stroke-width-input"
									type="range"
									min="1"
									max="3"
									step="0.5"
									value={strokeWidth}
									onChange={(e) => {
										setStrokeWidth(Number(e?.target?.value));
										trigger("light");
									}}
									className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#ffffff]/15 accent-[#bffb4f]"
								/>
							</div>
						</div>

						<div className="relative overflow-hidden rounded-xl border border-[#ffffff]/5 bg-[#111111] p-6">
							<div className="mb-4">
								<span className={`text-base text-[#ffffff] ${GoogleSansMedium.className}`}>
									Code Preview
								</span>
							</div>

							<pre className={`text-sm text-[#bffb4f] ${GoogleSansMedium.className}`}>{codeSnippet}</pre>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
