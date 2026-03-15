"use client";

import { GroteskBold, GroteskMedium, GroteskRoman } from "@/utils/fonts";

import { Layers, Feather, Download, PenTool, Heart, Code } from "@deemlol/next-icons";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";

//prettier-ignore
const FeatureCard = ({ title, description, icon: Icon, delay }: { title: string; description: string; icon: React.ElementType; delay: number; }) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
		const { left, top } = currentTarget?.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ delay }}
			className="group relative overflow-hidden rounded-xl border border-[#FFFFFF]/3 bg-[#111111]/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#bffb4f]/50"
			onMouseMove={handleMouseMove}
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
						radial-gradient(
							650px circle at ${mouseX}px ${mouseY}px,
							rgba(191, 251, 79, 0.15),
							transparent 80%
						)
					`,
				}}
			/>

			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-[#bffb4f]/5 text-[#bffb4f] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
				<Icon size={34} strokeWidth={1.5} />
			</div>

			<h3 className={`mb-2 text-start text-2xl tracking-wide text-[#ffffff] ${GroteskMedium.className}`}>
				{title}
			</h3>

			<p className={`relative z-10 text-justify text-base text-[#ffffff]/70 ${GroteskRoman.className}`}>
				{description}
			</p>

			<div className="absolute -right-12 -bottom-12 opacity-2 transition-all duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4 group-hover:opacity-10">
				<Icon size={200} strokeWidth={1.5} color="#bffb4f" />
			</div>
		</motion.div>
	);
};

export default function Features() {
	return (
		<section className="relative overflow-hidden px-4 pt-20 lg:pt-36 2xl:px-0">
			<div className="relative z-10 mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10"
				>
					<h2
						className={`mb-4 text-center text-[1.8rem] text-[#FFFFFF] lg:text-end lg:text-7xl ${GroteskBold.className}`}
					>
						Engineered for <span className="text-[#bffb4f]">perfection</span>
					</h2>

					<p
						className={`text-center text-lg text-[#ffffff]/60 lg:text-end lg:text-xl ${GroteskRoman.className}`}
					>
						Obsessive attention to detail, ensuring clarity and consistency across your entire project.
					</p>
				</motion.div>

				<div className="grid gap-6 lg:grid-cols-3">
					<FeatureCard
						title="Elegant Shapes"
						description="We design simple and unique icons based on a consistent grid system with strict geometric principles."
						icon={Heart}
						delay={0.1}
					/>
					<FeatureCard
						title="Lightweight"
						description="The vectors are optimized using a minimal number of anchor points to achieve the smallest possible file size."
						icon={Feather}
						delay={0.2}
					/>
					<FeatureCard
						title="Consistent"
						description="We maintain a consistent stroke weight and corner radius throughout the entire library."
						icon={Layers}
						delay={0.3}
					/>
					<FeatureCard
						title="Export Anywhere"
						description="You can export the icons in whichever format you need. Options include SVG, PNG, and JPEG."
						icon={Download}
						delay={0.4}
					/>
					<FeatureCard
						title="Recolor Instantly"
						description="With the color picker, you can change the color of the icons with one click and see the changes in real-time."
						icon={PenTool}
						delay={0.5}
					/>
					<FeatureCard
						title="Open Source"
						description="Everything is open source, meaning that anyone is free to use and contribute to it."
						icon={Code}
						delay={0.6}
					/>
				</div>
			</div>
		</section>
	);
}
