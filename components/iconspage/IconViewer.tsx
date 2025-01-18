"use client";

import { getSVGContent } from "@/utils/getSVGContent";

import { Clipboard, Download, X } from "@deemlol/next-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface IconViewerProps {
	name: string;
	children: React.ReactNode;
}

export default function IconViewer({ name, children }: IconViewerProps) {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const sizes = [16, 20, 24, 28, 32, 36];

	const colors = [
		{ name: "blue", class: "text-blue-500" },
		{ name: "purple", class: "text-purple-500" },
		{ name: "green", class: "text-green-500" },
		{ name: "yellow", class: "text-yellow-500" },
	];

	const IconComponent = ({ size, className }: { size: number; className?: string }) => {
		const Component = require("@deemlol/next-icons")[name];

		return <Component size={size} className={className} />;
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const handleDownload = useCallback(async () => {
		const svgContent = await getSVGContent(name);

		if (svgContent) {
			const blob = new Blob([svgContent], { type: "image/svg+xml" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");

			a.href = url;
			a.download = `${name}.svg`;

			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);

			URL.revokeObjectURL(url);
		} else {
			return toast.error("Failed to download SVG", {
				className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
				duration: 5_000,
			});
		}
	}, [name]);

	const handleCopySvg = useCallback(async () => {
		const svgContent = await getSVGContent(name);

		if (svgContent) {
			await navigator.clipboard.writeText(svgContent);

			return toast.success("Successfully copied SVG to clipboard", {
				className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
				duration: 5_000,
			});
		} else {
			return toast.error("Failed to copy SVG", {
				className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
				duration: 5_000,
			});
		}
	}, [name]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative">
			<div onClick={() => setIsOpen(true)}>{children}</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 pb-10 pt-10 lg:pt-28"
					>
						<motion.div
							initial={{ scale: 0.95 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.95 }}
							ref={modalRef}
							className="relative mx-4 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-[#161618]"
						>
							<div className="flex items-center justify-between border-b border-zinc-400 px-4 py-4 dark:border-zinc-800 lg:px-8">
								<h2 className="font-[family-name:var(--font-clashdisplay-medium)] text-2xl text-black dark:text-white">{name}</h2>

								<motion.button
									onClick={() => setIsOpen(false)}
									className="text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-300"
									whileTap={{ scale: 0.95 }}
								>
									<X size={24} />
								</motion.button>
							</div>

							<div className="space-y-4 p-4 lg:space-y-6 lg:p-6">
								<div className="flex items-center justify-between rounded-lg bg-zinc-200 p-3 dark:bg-background lg:p-4">
									<div className="w-full overflow-x-auto">
										<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
											<code>
												<span className="text-purple-700 dark:text-purple-500">import</span>{" "}
												<span className="text-red-600 dark:text-red-400">&#123; {name} &#125;</span>{" "}
												<span className="text-purple-700 dark:text-purple-500">from</span>{" "}
												<span className="text-green-700 dark:text-green-500">&quot;@deemlol/next-icons&quot;</span>
											</code>
										</pre>
									</div>

									<div className="ml-2 flex-shrink-0">
										<Clipboard
											className="cursor-pointer text-gray-500"
											size={20}
											onClick={() => {
												copyToClipboard(`import { ${name} } from "@deemlol/next-icons";`);

												return toast.success("Successfully copied to clipboard", {
													className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
													duration: 5_000,
												});
											}}
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
									<div className="flex items-start justify-start lg:justify-center">
										<div className="rounded-lg border border-zinc-300 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:26px_26px] p-4 dark:border-zinc-800 lg:p-6">
											<IconComponent size={200} className="text-black dark:text-white" />
										</div>
									</div>

									<div className="space-y-4 lg:space-y-6">
										<div className="space-y-2">
											<h1 className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white">Sizes</h1>

											<div className="flex flex-wrap items-end gap-6">
												{sizes.map(size => (
													<div key={size} className="flex flex-col items-center gap-2">
														<IconComponent size={size} className="text-black dark:text-white" />

														<span className="font-[family-name:var(--font-clashdisplay-regular)] text-xs text-gray-600 dark:text-gray-300">
															{size}px
														</span>
													</div>
												))}
											</div>
										</div>

										<div className="space-y-2">
											<h3 className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white">Colors</h3>

											<div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
												{colors.map(color => (
													<div
														key={color.name}
														className="flex flex-col items-center gap-2 rounded-lg bg-zinc-100 p-2 shadow-lg dark:bg-background dark:shadow-none lg:p-3"
													>
														<IconComponent size={24} className={color.class} />

														<span className="font-[family-name:var(--font-clashdisplay-regular)] text-sm capitalize text-gray-600 dark:text-gray-300">
															{color.name}
														</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								<div className="pt-2 lg:pt-4">
									<h1 className="mb-2 font-[family-name:var(--font-clashdisplay-medium)] text-2xl text-black dark:text-white lg:mb-4">
										Icon Usage
									</h1>

									<div className="flex items-center justify-between rounded-lg bg-zinc-200 p-3 dark:bg-background lg:p-4">
										<div className="w-full overflow-x-auto">
											<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
												<code>
													<span className="text-gray-600 dark:text-gray-300">&lt;</span>
													<span className="text-blue-700 dark:text-blue-400">{name}</span>
													<span className="text-green-700 dark:text-green-400"> size</span>
													<span className="text-pink-700 dark:text-pink-500">=&#123;</span>
													<span className="text-purple-700 dark:text-purple-500">24</span>
													<span className="text-pink-700 dark:text-pink-500">&#125;</span>
													<span className="text-green-700 dark:text-green-400"> color</span>
													<span className="text-yellow-700 dark:text-yellow-500">=&quot;</span>
													<span className="text-yellow-700 dark:text-yellow-500">#FFFFFF</span>
													<span className="text-yellow-700 dark:text-yellow-500">&quot;</span>
													<span className="text-gray-600 dark:text-gray-300"> /&gt;</span>
												</code>
											</pre>
										</div>

										<div className="ml-2 flex-shrink-0">
											<Clipboard
												className="cursor-pointer text-gray-500"
												size={20}
												onClick={() => {
													copyToClipboard(`<${name} size={24} color="#FFFFFF" />`);

													return toast.success("Successfully copied to clipboard", {
														className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
														duration: 5_000,
													});
												}}
											/>
										</div>
									</div>
								</div>

								<div className="pt-2 lg:pt-4">
									<div className="mx-auto flex w-full flex-col items-center justify-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
										<button
											onClick={handleDownload}
											className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-purple-500 px-4 py-2.5 font-[family-name:var(--font-clashdisplay-medium)] text-white lg:w-1/2"
										>
											Download SVG <Download size={20} />
										</button>

										<button
											onClick={handleCopySvg}
											className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-200 px-4 py-2.5 font-[family-name:var(--font-clashdisplay-medium)] text-black lg:w-1/2"
										>
											Copy SVG <Clipboard size={20} />
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
