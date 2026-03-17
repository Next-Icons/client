"use client";

import { GroteskMedium, GroteskRoman } from "@/utils/fonts";

import { Search, Sparkles2, Type, GitHub, Email, List, NPMJs, PlayCircle } from "@deemlol/next-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import { useRouter } from "next/navigation";
import * as React from "react";

type SearchItem = {
	id: string;
	name: string;
	url: string;
	description: string;
	icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
	category: "Page" | "External" | "Component";
};

const SEARCH_ITEMS: SearchItem[] = [
	{
		id: "icons",
		name: "Explore Icons",
		url: "/icons",
		description: "Browse our collection of icons",
		icon: Sparkles2,
		category: "Page",
	},
	{
		id: "animated-icons",
		name: "Animated Icons",
		url: "/animated-icons",
		description: "Browse all of our animated icons",
		icon: PlayCircle,
		category: "Page",
	},
	{
		id: "contact",
		name: "Contact Us",
		url: "/contact",
		description: "Get in touch with our team",
		icon: Email,
		category: "Page",
	},
	{
		id: "privacy",
		name: "Privacy Policy",
		url: "/legal/privacy",
		description: "Read our privacy policy",
		icon: Type,
		category: "Page",
	},
	{
		id: "github",
		name: "GitHub Repository",
		url: "https://github.com/Next-Icons/next-icons",
		description: "Check out our source code",
		icon: GitHub,
		category: "External",
	},
	{
		id: "license",
		name: "License",
		url: "https://github.com/Next-Icons/next-icons/blob/main/LICENCE",
		description: "Read our license",
		icon: Type,
		category: "External",
	},
	{
		id: "changelog",
		name: "Change Log",
		url: "https://github.com/Next-Icons/next-icons/blob/main/CHANGELOG.md",
		description: "Check out our change log",
		icon: List,
		category: "External",
	},
	{
		id: "npm",
		name: "NPM Package",
		url: "https://www.npmjs.com/package/@deemlol/next-icons",
		description: "Check out our NPM package",
		icon: NPMJs,
		category: "External",
	},
];

const DEFAULT_SUGGESTIONS = SEARCH_ITEMS.slice(0, 3);

export default function GlobalSearch() {
	const [results, setResults] = React.useState<SearchItem[]>(DEFAULT_SUGGESTIONS);
	const [isFocused, setIsFocused] = React.useState(false);
	const searchRef = React.useRef<HTMLDivElement>(null);
	const [query, setQuery] = React.useState("");
	const { trigger } = useWebHaptics();
	const router = useRouter();

	React.useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (searchRef?.current && !searchRef?.current?.contains(e?.target as Node)) {
				setIsFocused(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	React.useEffect(() => {
		if (query?.trim() === "") {
			setResults(DEFAULT_SUGGESTIONS);
		} else {
			const filtered = SEARCH_ITEMS.filter(
				(item) =>
					item?.name?.toLowerCase()?.includes(query?.toLowerCase() || "") ||
					item?.description?.toLowerCase()?.includes(query?.toLowerCase() || ""),
			);
			setResults(filtered);
		}
	}, [query]);

	return (
		<div className="relative" ref={searchRef}>
			<div className="group relative hidden lg:block">
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
					<Search
						size={18}
						strokeWidth={1.5}
						className={`transition-colors duration-300 ${
							isFocused ? "text-[#000000]" : "text-[#ffffff] group-focus-within:text-[#000000]"
						}`}
					/>
				</div>

				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e?.target?.value)}
					onFocus={() => setIsFocused(true)}
					onClick={() => trigger("medium")}
					className={`block w-40 rounded-full border border-[#ffffff]/8 bg-[#ffffff]/4 py-2 pr-3 pl-10 text-sm text-[#ffffff] placeholder-[#ffffff] backdrop-blur-lg transition-all duration-300 focus:w-80 focus:border-none focus:bg-[#bffb4f] focus:text-[#000000] focus:shadow-2xl focus:shadow-[#bffb4f] focus:outline-none focus:placeholder:text-[#000000] ${GroteskRoman.className} ${
						isFocused ? "w-80 bg-[#bffb4f] text-[#000000] placeholder:text-[#000000]" : ""
					}`}
					placeholder="Search..."
				/>

				<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<span
						className={`flex h-5 w-5 items-center justify-center rounded bg-[#ffffff] text-xs text-[#000000] ${GroteskRoman.className} ${
							isFocused ? "opacity-0" : "opacity-100"
						}`}
					>
						/
					</span>
				</div>
			</div>

			<AnimatePresence>
				{isFocused && (
					<motion.div
						initial={{ opacity: 0, y: 10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full right-0 mt-2 w-80 overflow-hidden rounded-lg border border-[#ffffff]/10 bg-[#121212] p-2 shadow-2xl"
					>
						<div className="flex flex-col gap-2">
							{results?.length > 0 ? (
								<>
									<div
										className={`px-2 py-1 text-start text-xs text-[#ffffff]/60 ${GroteskRoman.className}`}
									>
										{query ? "Search Results" : "Suggested"}
									</div>

									{results?.map((item) => (
										<button
											key={item?.id}
											onClick={() => {
												trigger("light");

												if (item?.url?.startsWith("http")) {
													window.open(item?.url, "_blank", "noopener,noreferrer");
												} else {
													router.push(item?.url);
												}

												setIsFocused(false);
												setQuery("");
											}}
											className="group flex w-full cursor-pointer items-center gap-4 rounded-lg p-2 text-start transition-colors duration-300 hover:bg-[#bffb4f]"
										>
											<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1e1e1e] text-[#ffffff] transition-colors duration-300 group-hover:bg-[#000000] group-hover:text-[#bffb4f]">
												<item.icon size={20} strokeWidth={1.5} />
											</div>

											<div>
												<div
													className={`text-sm text-[#ffffff] group-hover:text-[#000000] ${GroteskMedium.className}`}
												>
													{item?.name}
												</div>

												<div
													className={`text-xs text-[#ffffff]/70 group-hover:text-[#000000]/70 ${GroteskRoman.className}`}
												>
													{item?.description}
												</div>
											</div>
										</button>
									))}
								</>
							) : (
								<div className={`p-4 text-center text-base text-[#ffffff] ${GroteskRoman.className}`}>
									No results found
								</div>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
