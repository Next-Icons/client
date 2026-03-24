"use client"

import { OUR_PARTNERS } from "@/utils/constants"
import { GoogleSansBold } from "@/utils/fonts"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Partners() {
	return (
		<section className="px-4 pt-20 lg:pt-46 2xl:px-0">
			<div className="mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-10"
				>
					<h2 className={`text-center text-5xl text-[#ffffff] lg:text-7xl ${GoogleSansBold.className}`}>
						Our <span className="text-[#bffb4f]">Partners</span>
					</h2>
				</motion.div>

				<div className="grid gap-0 sm:grid-cols-2 lg:gap-6">
					{OUR_PARTNERS.map((partner, index) => (
						<motion.div
							key={partner?.name}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.1 }}
							className="group flex min-h-[116px] items-center justify-center"
						>
							<Link
								href={partner?.url}
								target="_blank"
								rel="noopener noreferrer"
								className="relative h-14 w-full max-w-[200px] opacity-80 transition-opacity duration-300 group-hover:opacity-100 lg:max-w-[300px]"
							>
								<Image
									src={partner?.logo}
									alt={`${partner?.name} logo`}
									fill={true}
									className="object-contain"
									draggable={false}
									priority={true}
								/>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
