"use client"

import { GoogleSansBold, GoogleSansMedium } from "@/utils/fonts"
import { useNpmStats } from "@/hooks/useNpmStats"

import { motion } from "framer-motion"
import * as React from "react"

function formatCompactNumber(value: number): string {
	if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`
	return value.toString()
}

function useCountUp(target: number, duration = 1600): number {
	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		if (target <= 0) return setCount(0)

		let animationFrameId = 0
		let startTime = 0

		const animate = (time: number) => {
			if (startTime === 0) startTime = time

			const progress = Math.min((time - startTime) / duration, 1)
			const easedProgress = 1 - Math.pow(1 - progress, 3)
			const nextCount = Math.round(target * easedProgress)

			setCount(nextCount)

			if (progress < 1) {
				animationFrameId = window.requestAnimationFrame(animate)
			}
		}

		setCount(0)
		animationFrameId = window.requestAnimationFrame(animate)

		return () => {
			window.cancelAnimationFrame(animationFrameId)
		}
	}, [duration, target])

	return count
}

function AnimatedStatNumber({ value, compact }: { value: number; compact?: boolean }) {
	const animatedValue = useCountUp(value)

	return <>{compact ? formatCompactNumber(animatedValue) : animatedValue}</>
}

export default function Stats() {
	const [animatedIconCount, setAnimatedIconCount] = React.useState(0)
	const { downloads } = useNpmStats("@deemlol/next-icons")
	const [iconCount, setIconCount] = React.useState(0)

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allIcons", {
					method: "GET"
				})

				if (res?.ok) {
					const data = await res?.json()

					setIconCount(data?.icons || 0)
				} else {
					console.log("Failed to fetch the icon count")
				}
			} catch (err) {
				console.log("An error occurred while fetching the icon count")
				console.error(err)
			}
		}

		fetchData()
	}, [])

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allAnimatedIcons", {
					method: "GET"
				})

				if (res?.ok) {
					const data = await res?.json()

					setAnimatedIconCount(data?.icons || 0)
				} else {
					console.log("Failed to fetch the animated icon count")
				}
			} catch (err) {
				console.log("An error occurred while fetching the animated icon count")
				console.error(err)
			}
		}

		fetchData()
	}, [])

	return (
		<section className="relative z-10 border-y border-[#ffffff]/3 bg-[#111111]/50 backdrop-blur-sm">
			<div className="mx-auto max-w-7xl px-4 py-14 2xl:px-0">
				<div className="grid grid-cols-3 gap-4 sm:gap-0">
					{[
						{ value: downloads || 0, label: "Downloads", compact: true },
						{ value: iconCount || 0, label: "Static Icons" },
						{ value: animatedIconCount || 0, label: "Animated Icons" }
					].map((stat, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1, duration: 0.5 }}
							className={`flex flex-col items-center gap-3 ${
								i !== 2 ? "sm:border-r sm:border-[#ffffff]/5" : ""
							}`}
						>
							<span
								className={`text-center text-4xl tracking-tight text-[#bffb4f] lg:text-7xl ${GoogleSansBold.className}`}
							>
								<AnimatedStatNumber
									value={stat?.value}
									compact={stat?.compact}
								/>
							</span>

							<span
								className={`text-xs text-[#a1a1aa] uppercase lg:text-sm ${GoogleSansMedium.className}`}
							>
								{stat?.label}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
