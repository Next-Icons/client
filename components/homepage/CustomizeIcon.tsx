"use client";

//prettier-ignore
import { Volume, Volume2, Volume3, VolumeX, Watch, Wifi, WifiOff, Wind, X, XCircle, XOctagon, XSquare, Youtube, Zap, ZapOff, ZoomIn, ZoomOut, Layers, Layout, LifeBuoy, Link2, Linkedin, Lock, Loader, RefreshCcw } from "@deemlol/next-icons";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export default function DynamicIconSection() {
	const { resolvedTheme } = useTheme();

	const [iconColor, setIconColor] = useState("#000000");
	const [mounted, setMounted] = useState(false);
	const [iconSize, setIconSize] = useState(24);

	useEffect(() => {
		setMounted(true);

		setIconColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
	}, [resolvedTheme]);

	if (!mounted) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.9 }}
			className="rounded-2xl bg-white p-4 shadow-xl dark:bg-[#161618] lg:p-6"
		>
			<div className="flex items-center lg:flex-row lg:justify-between">
				<h1 className="mb-6 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:mb-0 lg:text-4xl">Style as you please</h1>

				<motion.button
					onClick={() => {
						setIconColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
						setIconSize(24);
					}}
					whileTap={{ rotate: 180 }}
					className="flex items-center"
				>
					<RefreshCcw size={32} className="hidden text-black dark:text-white lg:block" />
				</motion.button>
			</div>

			<p className="mb-0 mt-2 hidden font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-gray-300 lg:mb-10 lg:block">
				Customize the icons to fit your needs, from the color to the size.
			</p>

			<div className="w-full max-w-xl space-y-6 lg:space-y-10">
				<div className="flex items-center justify-between">
					<label className="font-[family-name:var(--font-clashdisplay-medium)] text-xl text-black dark:text-white">Pick a color</label>

					<div className="flex items-center rounded-xl bg-[#e7e8ec] p-2 dark:bg-background">
						<input
							type="color"
							value={iconColor}
							onChange={e => setIconColor(e.target.value)}
							className="h-7 w-7 cursor-pointer rounded-full border-none bg-transparent outline-none"
						/>
					</div>
				</div>

				<div>
					<label className="font-[family-name:var(--font-clashdisplay-medium)] text-xl text-black dark:text-white">Size</label>

					<input
						type="range"
						min={16}
						max={48}
						step={4}
						value={iconSize}
						onChange={e => setIconSize(Number(e.target.value))}
						className="mt-3 w-full accent-purple-500"
					/>

					<div className="text-end font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-400">{iconSize}px</div>
				</div>
			</div>

			{/* prettier-ignore */}
			<div className="lg:mt-10 mt-6 grid grid-cols-4 lg:grid-cols-12 gap-2 lg:gap-4">
				{[Volume, Volume2, Volume3, VolumeX, Watch, Wifi, WifiOff, Wind, X, XCircle, XOctagon, XSquare, Youtube, Zap, ZapOff, ZoomIn, ZoomOut, Layers, Layout, LifeBuoy, Link2, Linkedin, Lock, Loader].map((Icon, index) => (
					<motion.div
						key={index}
						className="flex aspect-square items-center shadow-md justify-center rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-background p-2 hover:border-purple-300 dark:hover:border-purple-500"
						whileHover={{ scale: 1.05 }}
					>
						<Icon className="h-7 w-7" style={{ color: iconColor, width: iconSize, height: iconSize }} />
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
