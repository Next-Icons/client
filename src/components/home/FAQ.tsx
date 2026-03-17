"use client";

import { GoogleSansBold, GoogleSansRegular, GoogleSansSemiBold } from "@/utils/fonts";

import { ChevronDown, Disc } from "@deemlol/next-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useWebHaptics } from "web-haptics/react";
import * as React from "react";

type FaqItem = {
	question: string;
	answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
	{
		question: "Is Next Icons free to use?",
		answer: "Yes! Next Icons is completely free and open source. You can find the source code on GitHub.",
	},
	{
		question: "I can't find the icon I'm looking for?",
		answer: "We are sorry that we don't have the icon you're looking for. Next Icons is still in early development, and we are working hard to add more icons. If you have any suggestions for new icons, please let us know via our Contact Form. We will add it as soon as possible or you can add it yourself!",
	},
	{
		question: "Can I customize the icons?",
		answer: "Yes! Next Icons is designed to be highly customisable. You can easily adjust the size, color and other properties of the icons to suit your needs. Alternatively, you can download the SVG file and customise it further.",
	},
	{
		question: "Where can I report bugs or suggest new features?",
		answer: "You can report bugs or suggest new features by opening an issue on our GitHub repository, or by contacting us via our contact form. We welcome your feedback and contributions!",
	},
];

function FAQRow({
	item,
	index,
	isOpen,
	onToggle,
}: {
	item: FaqItem;
	index: number;
	isOpen: boolean;
	onToggle: () => void;
}) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 24 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ delay: index * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#ffffff]/5 bg-[#111111]"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_-10%,rgba(191,251,79,0.12),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

			<button
				type="button"
				onClick={onToggle}
				className="relative flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-start lg:px-6"
				aria-expanded={isOpen}
			>
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#bffb4f]/25 bg-[#bffb4f]/10 text-[#bffb4f]">
					<Disc size={22} strokeWidth={1.5} />
				</div>

				<span className={`flex-1 text-base text-[#ffffff] lg:text-xl ${GoogleSansSemiBold.className}`}>
					{item?.question}
				</span>

				<motion.span
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
					className="flex h-9 w-9 shrink-0 items-center justify-center text-[#ffffff]"
				>
					<ChevronDown size={24} strokeWidth={1.5} />
				</motion.span>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{
							height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
							opacity: { duration: 0.25, ease: "easeOut" },
						}}
						className="overflow-hidden"
					>
						<div className="px-5 pt-0 pb-5 lg:px-6 lg:pb-6">
							<div className="mb-4 h-px w-full bg-[#ffffff]/8" />

							<p
								className={`text-justify text-sm leading-relaxed tracking-tight text-[#ffffff] lg:text-base lg:tracking-normal ${GoogleSansRegular.className}`}
							>
								{item?.answer}
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

export default function FAQ() {
	const [openIndex, setOpenIndex] = React.useState(0);
	const { trigger } = useWebHaptics();

	return (
		<section className="relative overflow-hidden px-4 pt-10 pb-28 lg:pt-18 lg:pb-36 2xl:px-0">
			<div className="pointer-events-none absolute top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#bffb4f]/10 blur-[120px]" />

			<div className="mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10 lg:mb-12"
				>
					<h2
						className={`text-center text-[2.5rem] leading-none tracking-tight text-[#ffffff] lg:text-[5rem] ${GoogleSansBold.className}`}
					>
						Frequently Asked <span className="text-[#bffb4f]">Questions</span>
					</h2>
				</motion.div>

				<div className="mx-auto grid max-w-5xl gap-3 lg:gap-4">
					{FAQ_ITEMS.map((item, index) => (
						<FAQRow
							key={item.question}
							item={item}
							index={index}
							isOpen={openIndex === index}
							onToggle={() => {
								setOpenIndex((prev) => (prev === index ? -1 : index));
								trigger(openIndex === index ? "light" : "medium");
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
