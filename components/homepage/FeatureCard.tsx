"use client";

import { Smile, Code, Star, GitPullRequest, Codesandbox } from "@deemlol/next-icons";
import { motion } from "framer-motion";

export default function FeatureCard() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.9 }}
			className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
		>
			{[
				{
					icon: Smile,
					title: "Easy to use",
					description: "Next-Icons is designed to be easy to use for everyone, even for beginners.",
				},
				{
					icon: Code,
					title: "Customizable",
					description: "Everything is customizable, from the color to the size, you can make it your own.",
				},
				{
					icon: Star,
					title: "Clean & Consistent",
					description: "Every icon is designed to be clean and consistent with each other.",
				},
				{
					icon: GitPullRequest,
					title: "Open Source",
					description: "Everything from us is open source, you can contribute to the project.",
				},
				{
					icon: GitPullRequest,
					title: "Lightweight",
					description: "Our icons are very lightweight, so it won't affect your website's performance.",
				},
				{
					icon: Codesandbox,
					title: "Active Development",
					description: "We are actively developing Next-Icons, so you will get new icons very often.",
				},
			].map(({ icon: Icon, title, description }, index) => (
				<motion.div
					key={title}
					className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-xl dark:bg-[#161618] lg:p-5"
					whileHover="hover"
					initial="rest"
					animate="rest"
				>
					<motion.div
						className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-500/5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:from-purple-600/20 dark:to-blue-500/20"
						variants={{
							rest: { opacity: 0 },
							hover: { opacity: 1 },
						}}
					/>

					<motion.div
						className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-purple-500 opacity-5 dark:opacity-10 lg:h-24 lg:w-24"
						variants={{
							rest: {
								scale: 1,
								rotate: 0,
								opacity: 0.05,
							},
							hover: {
								scale: 1.2,
								rotate: index % 2 === 0 ? 10 : -10,
								opacity: 0.1,
							},
						}}
						transition={{ duration: 0.3 }}
					/>

					<div className="relative z-10">
						<motion.div
							className="mb-2 inline-block rounded-full bg-purple-100 p-2 dark:bg-purple-500/10 lg:p-3"
							variants={{
								rest: { scale: 1 },
								hover: { scale: 1.1 },
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						>
							<Icon size={40} className="text-purple-500" />
						</motion.div>

						<motion.h2
							className="mb-2 font-[family-name:var(--font-clashdisplay-medium)] text-2xl text-gray-900 dark:text-white"
							variants={{
								rest: { y: 0 },
								hover: { y: -2 },
							}}
							transition={{ type: "spring", stiffness: 400, damping: 10 }}
						>
							{title}
						</motion.h2>

						<motion.p
							className="text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-gray-600 dark:text-gray-300"
							variants={{
								rest: { opacity: 0.7 },
								hover: { opacity: 1 },
							}}
							transition={{ duration: 0.3 }}
						>
							{description}
						</motion.p>
					</div>
				</motion.div>
			))}
		</motion.div>
	);
}
