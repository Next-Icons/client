"use client";

import { GroteskRoman } from "@/utils/fonts";

import { ChevronDown } from "@deemlol/next-icons";
import { useWebHaptics } from "web-haptics/react";
import * as React from "react";

export default function Dropdown({
	label,
	value,
	options,
	onChange,
	error,
}: {
	value: string;
	label: string;
	error?: string;
	options: readonly string[];
	onChange: (value: string) => void;
}) {
	const dropdownRef = React.useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const { trigger } = useWebHaptics();

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef?.current && !dropdownRef?.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative" ref={dropdownRef}>
			<label className={`mb-2 block text-base text-[#ffffff] ${GroteskRoman.className}`}>
				{label} <span className="text-[#ff6467]">*</span>
			</label>

			<button
				type="button"
				onClick={() => {
					setIsOpen((prev) => !prev);
					trigger("medium");
				}}
				className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#ffffff]/8 bg-[#ffffff]/4 px-4 py-3 text-start text-base text-[#ffffff] backdrop-blur-sm transition-all outline-none focus:border-[#bffb4f] focus:ring focus:ring-[#bffb4f]/40 ${error ? "border-[#ff6467] text-[#ff6467]" : ""} ${GroteskRoman.className}`}
			>
				<span className={value ? "text-[#ffffff]" : "text-[#ffffff]/80"}>{value || label}</span>

				<ChevronDown
					size={18}
					strokeWidth={1.5}
					className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${error ? "text-[#ff6467]" : "text-[#ffffff]"}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-[#ffffff]/8 bg-[#111111]">
					{options.map((option) => (
						<button
							type="button"
							key={option}
							onClick={() => {
								onChange(option);
								setIsOpen(false);
								trigger("medium");
							}}
							className={`w-full cursor-pointer px-4 py-3 text-start text-base transition-colors duration-300 hover:bg-[#bffb4f] hover:text-[#000000] ${value === option ? "bg-[#bffb4f] text-[#000000]" : "text-[#ffffff]"} ${GroteskRoman.className}`}
						>
							{option}
						</button>
					))}
				</div>
			)}

			{error ? <p className={`mt-1 text-sm text-[#ff6467] ${GroteskRoman.className}`}>{error}</p> : null}
		</div>
	);
}
