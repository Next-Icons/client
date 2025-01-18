"use client";

import { SHOWCASE_PROJECTS } from "@/utils/constants";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Showcase() {
	return (
		<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }}>
			<h1 className="text-center font-[family-name:var(--font-clashdisplay-semibold)] text-6xl text-purple-500">Showcase</h1>

			<div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4">
				{SHOWCASE_PROJECTS.map(project => (
					<motion.div
						key={project.name}
						className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl dark:bg-[#161618]"
						whileHover="hover"
						initial="rest"
						animate="rest"
						variants={{
							rest: { y: 0 },
							hover: { y: -10 },
						}}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<motion.div
							className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-500/5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:from-purple-600/20 dark:to-blue-500/20"
							variants={{
								rest: { opacity: 0 },
								hover: { opacity: 1 },
							}}
						/>

						<Link href={project.url} target="_blank" rel="noopener noreferrer" className="relative z-10 flex items-center justify-center">
							<Image src={project.images.dark} alt={project.name} width={54} height={54} className="block dark:hidden" />
							<Image src={project.images.white} alt={project.name} width={54} height={54} className="hidden dark:block" />

							<h1 className="ml-4 font-[family-name:var(--font-clashdisplay-semibold)] text-5xl text-black dark:text-white">{project.name}</h1>
						</Link>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
