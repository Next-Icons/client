"use client";

import { Button } from "@/components/ui/button";

import { ExternalLink, Codesandbox } from "@deemlol/next-icons";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-start justify-center px-4 md:items-center">
			<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
				<h1 className="text-start font-[family-name:var(--font-clashdisplay-bold)] text-4xl uppercase text-gray-600 dark:text-gray-300 md:text-center">
					404
				</h1>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
				<h1 className="mt-10 text-start font-[family-name:var(--font-clashdisplay-bold)] text-4xl uppercase text-background dark:text-white md:mt-4 md:text-center md:text-7xl">
					Page Not Found
				</h1>

				<p className="mt-3 text-start font-[family-name:var(--font-clashdisplay-variable)] text-base dark:text-gray-300 md:text-center">
					The page you are looking for does not exist, or has been moved.
				</p>
			</motion.div>

			<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 flex w-full max-w-md gap-4">
				<Button variant={"default"} size={"lg"} className="w-1/2">
					<ExternalLink />
					<Link href={"/"}>Back to home</Link>
				</Button>

				<Button variant={"secondary"} size={"lg"} className="w-1/2">
					<Codesandbox />
					<Link href={"/icons"}>Our Icons</Link>
				</Button>
			</motion.div>
		</div>
	);
}
