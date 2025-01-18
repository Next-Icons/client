"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
	const [isMobile, setIsMobile] = useState(false);
	const [mounted, setMounted] = useState(false);

	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);

		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (!mounted) return null;

	if (isMobile) {
		return (
			<button
				onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
				className="flex items-center justify-between rounded-xl bg-gray-300 px-4 py-2 dark:bg-[#202127]"
			>
				<span className="font-[family-name:var(--font-clashdisplay-variable)] text-lg text-background dark:text-white">Appearance</span>

				{resolvedTheme === "dark" ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-background dark:text-white"
					>
						<circle cx="12" cy="12" r="4" />
						<path d="M12 2v2" />
						<path d="M12 20v2" />
						<path d="m4.93 4.93 1.41 1.41" />
						<path d="m17.66 17.66 1.41 1.41" />
						<path d="M2 12h2" />
						<path d="M20 12h2" />
						<path d="m6.34 17.66-1.41 1.41" />
						<path d="m19.07 4.93-1.41 1.41" />
					</svg>
				)}
			</button>
		);
	}

	return (
		<motion.button
			className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl border border-gray-400"
			onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
			whileTap={{ scale: 0.95 }}
			whileHover={{ scale: 1.05 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={resolvedTheme}
					initial={{ y: 20, opacity: 0, rotate: -30 }}
					animate={{
						y: 0,
						opacity: 1,
						rotate: 0,
						transition: {
							duration: 0.3,
							type: "spring",
							stiffness: 300,
							damping: 20,
						},
					}}
					exit={{
						y: -20,
						opacity: 0,
						rotate: 30,
						transition: { duration: 0.2 },
					}}
				>
					{resolvedTheme === "light" ? (
						<div className="h-7 w-7 rounded-full">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-full w-full p-1.5 text-background dark:text-white"
								animate={{
									rotate: [0, 15, -15, 0],
									scale: [1, 1.1, 1.1, 1],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatDelay: 3,
								}}
							>
								<circle cx="12" cy="12" r="4" />
								<path d="M12 2v2" />
								<path d="M12 20v2" />
								<path d="m4.93 4.93 1.41 1.41" />
								<path d="m17.66 17.66 1.41 1.41" />
								<path d="M2 12h2" />
								<path d="M20 12h2" />
								<path d="m6.34 17.66-1.41 1.41" />
								<path d="m19.07 4.93-1.41 1.41" />
							</motion.svg>
						</div>
					) : (
						<div className="h-7 w-7 rounded-full">
							<motion.svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-full w-full p-1.5 text-background dark:text-white"
								animate={{
									rotate: [0, 360],
									scale: [1, 1.1, 1],
								}}
								transition={{
									duration: 10,
									repeat: Infinity,
									repeatDelay: 2,
									ease: "linear",
								}}
							>
								<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
							</motion.svg>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</motion.button>
	);
}
