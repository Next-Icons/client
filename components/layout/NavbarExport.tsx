"use client";

import ThemeToggle from "@/components/layout/ThemeToggle";
import { Separator } from "@/components/ui/separator";

import { AlignRight, X } from "@deemlol/next-icons";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function NavbarExport() {
	const [isNavbarOpen, setIsNavbarOpen] = useState(false);

	const toggleNavbarMenu = () => {
		setIsNavbarOpen(!isNavbarOpen);
	};

	useEffect(() => {
		if (isNavbarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isNavbarOpen]);

	return (
		<>
			<nav className="fixed left-0 right-0 top-0 z-50 mx-auto w-full max-w-6xl rounded-3xl bg-transparent px-4 py-4 backdrop-blur-sm">
				<div className="mx-auto w-full max-w-7xl">
					<div className="flex items-center justify-between">
						<motion.div className="flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
							<Link href={"/"} className="flex items-center">
								<Image
									src={"/assets/NextIconsWhite.png"}
									alt="Next-Icons"
									width={36}
									height={36}
									priority={true}
									className="hidden dark:block"
								/>

								<Image
									src={"/assets/NextIconsBlack.png"}
									alt="Next-Icons"
									width={36}
									height={36}
									priority={true}
									className="block dark:hidden"
								/>

								<h1 className="ml-3 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-background dark:text-white">
									Next Icons
								</h1>
							</Link>
						</motion.div>

						<div className="flex items-center space-x-6">
							<motion.div
								className="hidden items-center space-x-8 lg:flex"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 }}
							>
								<Link
									href={"/icons"}
									className="font-[family-name:var(--font-clashdisplay-variable)] text-lg text-background transition-colors duration-300 hover:text-purple-500 dark:text-white dark:hover:text-purple-400"
								>
									Icons
								</Link>

								<Link
									href={"/license"}
									className="font-[family-name:var(--font-clashdisplay-regular)] text-lg text-background transition-colors duration-300 hover:text-purple-500 dark:text-white dark:hover:text-purple-400"
								>
									License
								</Link>

								<Link
									href={"https://github.com/Next-Icons/next-icons/releases"}
									rel="noopener noreferrer"
									target="_blank"
									className="font-[family-name:var(--font-clashdisplay-regular)] text-lg text-background transition-colors duration-300 hover:text-purple-500 dark:text-white dark:hover:text-purple-400"
								>
									Change Log
								</Link>
							</motion.div>

							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
								<Separator orientation="vertical" className="hidden h-7 lg:flex" />
							</motion.div>

							<motion.div className="hidden lg:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
								<ThemeToggle />
							</motion.div>

							<motion.div className="lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
								<button
									onClick={toggleNavbarMenu}
									className="inline-flex items-center justify-center text-background dark:text-white"
									aria-expanded={isNavbarOpen}
								>
									<span className="sr-only">Open Menu</span>

									<AlignRight size={36} />
								</button>
							</motion.div>
						</div>
					</div>
				</div>
			</nav>

			<div
				className={`fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col bg-white transition-transform duration-300 ease-in-out dark:bg-background lg:hidden ${
					isNavbarOpen ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div className="flex flex-1 flex-col px-4 py-4">
					<div className="flex items-center justify-between">
						<Link href={"/"} className="flex items-center">
							<Image src={"/assets/NextIconsWhite.png"} alt="Next-Icons" width={36} height={36} priority={true} className="hidden dark:block" />
							<Image src={"/assets/NextIconsBlack.png"} alt="Next-Icons" width={36} height={36} priority={true} className="block dark:hidden" />

							<h1 className="ml-3 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-background dark:text-white">Next Icons</h1>
						</Link>

						<button onClick={toggleNavbarMenu} className="inline-flex items-center justify-center text-background dark:text-white">
							<span className="sr-only">Close Menu</span>

							<X size={36} />
						</button>
					</div>

					<div className="mt-14 flex flex-col px-6">
						<Link
							href={"/icons"}
							className="mb-1.5 font-[family-name:var(--font-clashdisplay-variable)] text-2xl uppercase text-background dark:text-white"
						>
							Icons
						</Link>

						<div className="mb-6 h-[1px] bg-gray-600" />

						<Link
							href={"/license"}
							className="mb-1.5 font-[family-name:var(--font-clashdisplay-variable)] text-2xl uppercase text-background dark:text-white"
						>
							License
						</Link>

						<div className="mb-6 h-[1px] bg-gray-600" />

						<Link
							href={"https://github.com/Next-Icons/next-icons/releases"}
							rel="noopener noreferrer"
							target="_blank"
							className="mb-1.5 font-[family-name:var(--font-clashdisplay-variable)] text-2xl uppercase text-background dark:text-white"
						>
							Change Log
						</Link>

						<div className="h-[1px] bg-gray-600" />
					</div>

					<div className="flex flex-1 flex-col justify-end">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</>
	);
}
