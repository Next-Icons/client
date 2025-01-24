"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import IconViewer from "@/components/icons/IconViewer";

import { motion, AnimatePresence } from "framer-motion";
import * as Icon from "@deemlol/next-icons";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function IconsEntry() {
	const [hexInputError, setHexInputError] = useState("");
	const [iconColor, setIconColor] = useState("#000000");
	const [currentPage, setCurrentPage] = useState(1);
	const [mounted, setMounted] = useState(false);
	const [iconCount, setIconCount] = useState(0);
	const [iconSize, setIconSize] = useState(36);
	const [search, setSearch] = useState("");
	const { resolvedTheme } = useTheme();

	const validateHex = (value: string) => {
		const isValid = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

		if (!value) {
			setHexInputError("Please enter a hex color");
		} else if (!isValid) {
			setHexInputError("Invalid Hex Color");
		} else {
			setHexInputError("");
		}

		return isValid;
	};

	const handleHexInputChange = (value: string) => {
		setIconColor(value);

		if (validateHex(value)) {
			setHexInputError("");
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allOurIcons", {
					method: "GET",
				});

				if (res.ok) {
					const data = await res.json();

					setIconCount(data.icons);
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

	useEffect(() => {
		setMounted(true);

		setIconColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
	}, [resolvedTheme]);

	const icons = Object.entries(Icon);
	const itemsPerPage = 48;

	const filteredIcons = icons.filter(([name]) => {
		const matchesSearch = name.toLowerCase().includes(search.toLowerCase());

		return matchesSearch;
	});

	const startIndex = (currentPage - 1) * itemsPerPage;
	const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);
	const paginatedIcons = filteredIcons.slice(startIndex, startIndex + itemsPerPage);

	const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(page => {
		return page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2);
	});

	if (!mounted) return null;

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col justify-center px-4 pb-40 pt-32 2xl:px-0">
			<motion.h1
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-start font-[family-name:var(--font-clashdisplay-bold)] text-[40px] text-black dark:text-white lg:text-end lg:text-5xl"
			>
				Browse through our <span className="text-purple-500">{iconCount || "0"}</span> icons
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="mt-2 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-gray-300 lg:text-end lg:text-base"
			>
				Free and open source icons designed to make your website visually consistent and simply beautiful
			</motion.p>

			<div className="pt-10">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
					<div className="mb-2 flex flex-row gap-4">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="relative flex-grow"
						>
							<input
								type="text"
								placeholder={`Search ${iconCount || "0"} icons...`}
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="border:ring-gray-300 w-full rounded-2xl border bg-gray-100 px-4 py-2 pl-10 font-[family-name:var(--font-clashdisplay-regular)] shadow-md placeholder:text-gray-500 focus:outline-none focus:ring-0 dark:border-none dark:bg-[#161618] dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-1 dark:focus:ring-gray-600"
							/>

							<Icon.Search className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400" size={20} />
						</motion.div>

						<Popover>
							<PopoverTrigger asChild={true}>
								<button className="flex items-center justify-center">
									<Icon.Settings size={28} className="text-gray-600 dark:text-gray-200" />
								</button>
							</PopoverTrigger>

							<PopoverContent
								align="end"
								className="z-50 w-full max-w-xs rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-lg dark:border-gray-800 dark:bg-[#161618]"
								sideOffset={6}
							>
								<div className="space-y-6">
									<div>
										<h1 className="font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-3xl">
											Customize Icon
										</h1>
									</div>

									<div className="space-y-4">
										<div>
											<label className="font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
												Size
											</label>

											<input
												type="range"
												min={16}
												max={48}
												step={4}
												value={iconSize}
												onChange={e => setIconSize(Number(e.target.value))}
												className="w-full accent-purple-500"
											/>

											<div className="text-end font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-500 dark:text-gray-400">
												{iconSize}px
											</div>
										</div>

										<div>
											<label className="font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
												Pick a color
											</label>

											<div className="flex items-center gap-2">
												<input
													type="color"
													value={iconColor}
													onChange={e => handleHexInputChange(e.target.value)}
													className="h-9 w-9 cursor-pointer rounded-lg border border-gray-300 bg-transparent p-1 dark:border-gray-700"
												/>

												<input
													type="text"
													maxLength={7}
													value={iconColor}
													onChange={e => handleHexInputChange(e.target.value)}
													className={`flex rounded-lg border bg-transparent px-3 py-1.5 font-[family-name:var(--font-clashdisplay-regular)] text-sm outline-none focus:ring-0 ${hexInputError ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`}
												/>
											</div>

											{hexInputError && (
												<p className="mt-1.5 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-red-500">
													{hexInputError}
												</p>
											)}
										</div>

										<div className="flex w-full items-center justify-center pt-4">
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												onClick={() => {
													setIconColor(resolvedTheme === "light" ? "#000000" : "#ffffff");
													setHexInputError("");
													setIconSize(36);
												}}
												className="flex w-full items-center justify-center rounded-lg bg-purple-500 px-4 py-2 font-[family-name:var(--font-clashdisplay-medium)] text-white"
											>
												<Icon.RefreshCcw size={24} className="mr-2" /> Reset To Default
											</motion.button>
										</div>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					</div>

					{search ? (
						<p className="mb-2 font-[family-name:var(--font-clashdisplay-medium)] text-lg text-black dark:text-white">
							Search results for &quot;{search}&quot;
						</p>
					) : (
						<p className="mb-2 font-[family-name:var(--font-clashdisplay-medium)] text-lg text-black dark:text-white">All Icons</p>
					)}

					<AnimatePresence>
						<motion.div
							className="mb-6 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, delay: 0.5 }}
						>
							{paginatedIcons.map(([name, IconComponent]) => (
								<IconViewer key={name} name={name}>
									<motion.div
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5 }}
										className="flex aspect-square cursor-pointer items-center justify-center rounded-2xl border border-gray-300 bg-white p-4 hover:bg-black/5 dark:border-none dark:bg-[#161618] dark:hover:bg-white/5"
									>
										<IconComponent style={{ color: iconColor, width: iconSize, height: iconSize }} />
									</motion.div>
								</IconViewer>
							))}
						</motion.div>
					</AnimatePresence>

					{filteredIcons.length === 0 && (
						<div className="flex flex-col items-center justify-center py-10 lg:items-start lg:justify-start lg:py-28">
							<motion.h1
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="mb-2 font-[family-name:var(--font-clashdisplay-semibold)] text-4xl text-purple-500"
							>
								Can&apos;t find what you&apos;re looking for?
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
								className="font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-gray-300"
							>
								We are happy to add new icons, as soon as possible. Feel free to request any new icon
							</motion.p>

							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.05 }}
								className="mt-10 flex w-full items-center justify-center lg:items-start lg:justify-start"
							>
								<Link
									href="/contact"
									className="flex w-full items-center justify-center rounded-2xl bg-purple-500 px-6 py-2 font-[family-name:var(--font-clashdisplay-medium)] text-white lg:max-w-md"
								>
									<Icon.Mail size={24} className="mr-2" />
									Request an icon
								</Link>
							</motion.div>
						</div>
					)}

					{filteredIcons.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center justify-between gap-4 sm:flex-row"
						>
							<span className="order-2 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-gray-400 sm:order-1">
								Page {currentPage} of {totalPages}
							</span>

							<div className="order-1 flex gap-2 sm:order-2">
								{visiblePages.map(page => (
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										key={page}
										onClick={() => setCurrentPage(page)}
										className={`flex h-8 w-8 items-center justify-center rounded-lg font-[family-name:var(--font-clashdisplay-regular)] ${
											currentPage === page ? "bg-purple-500 text-white" : "bg-gray-700 text-white dark:bg-white/10"
										}`}
									>
										{page}
									</motion.button>
								))}
							</div>
						</motion.div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
