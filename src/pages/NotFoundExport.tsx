"use client"

import { GoogleSansBold, GoogleSansMedium, GoogleSansRegular } from "@/utils/fonts"

import { ChevronLeft, Search, Box, Zap } from "@deemlol/next-icons"
import { useWebHaptics } from "web-haptics/react"
import { motion } from "framer-motion"
import Link from "next/link"

const NotFoundExport = () => {
	const { trigger } = useWebHaptics()

	return (
		<div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 2xl:px-0">
			<div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bffb4f]/3 blur-[150px]" />

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative"
			>
				<h1 className={`text-[8rem] leading-none text-[#bffb4f] lg:text-[18rem] ${GoogleSansBold.className}`}>
					404
				</h1>

				<motion.div
					initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
					animate={{ opacity: 1, scale: 1, rotate: 12 }}
					transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
					className="absolute -top-12 -right-10 hidden rounded-xl bg-[#bffb4f] p-4 shadow-2xl shadow-[#bffb4f] lg:block"
				>
					<Box
						size={56}
						color="#000000"
						strokeWidth={1.5}
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
					animate={{ opacity: 1, scale: 1, rotate: -6 }}
					transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
					className="absolute -bottom-4 -left-12 hidden rounded-xl bg-[#bffb4f] p-4 shadow-2xl shadow-[#bffb4f] lg:block"
				>
					<Zap
						size={32}
						color="#000000"
						strokeWidth={1.5}
					/>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.5 }}
			>
				<h2
					className={`mt-6 mb-4 text-center text-4xl text-[#ffffff] uppercase lg:mt-10 lg:text-7xl ${GoogleSansBold.className}`}
				>
					Page not found
				</h2>

				<p
					className={`mx-auto mb-6 max-w-2xl text-center text-base text-[#ffffff]/80 lg:text-lg ${GoogleSansRegular.className}`}
				>
					It looks like the page you&apos;re looking for either doesn&apos;t exist or has been moved.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className="mx-auto grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2"
			>
				<Link
					href={"/"}
					onClick={() => trigger("medium")}
					className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-[#bffb4f] px-4 py-3.5 text-base text-[#000000] transition-all duration-300 hover:bg-[#aeea44] hover:shadow-[0_0_20px_rgba(191,251,79,0.3)] active:scale-95 ${GoogleSansMedium.className}`}
				>
					<ChevronLeft
						size={20}
						className="transition-transform duration-300 group-hover:-translate-x-1"
						strokeWidth={1.5}
					/>

					<span>Go Back Home</span>
				</Link>

				<Link
					href={"/icons"}
					onClick={() => trigger("medium")}
					className={`group flex w-full items-center justify-center gap-2 rounded-xl border border-[#ffffff]/10 bg-[#ffffff]/3 px-4 py-3.5 text-base text-[#ffffff] backdrop-blur-sm transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/8 active:scale-95 ${GoogleSansMedium.className}`}
				>
					<Search
						size={20}
						className="transition-transform duration-300 group-hover:scale-110"
						strokeWidth={1.5}
					/>

					<span>Search Icons</span>
				</Link>
			</motion.div>
		</div>
	)
}

export default NotFoundExport
