"use client"

import { GoogleSansMedium, GoogleSansRegular } from "@/utils/fonts"
import ColorPicker from "@/components/icons/ColorPicker"

import { useWebHaptics } from "web-haptics/react"
import { X, Copy } from "@deemlol/next-icons"
import * as React from "react"
import Link from "next/link"

type IconType = React.ComponentType<{
	size?: number
	color?: string
	strokeWidth?: number
	className?: string
}>

type IconEntry = [string, IconType]

type AnimatedIconModalProps = {
	onClose: () => void
	selectedIcon: IconEntry
}

export default function AnimatedIconModal({ selectedIcon, onClose }: AnimatedIconModalProps) {
	const [copiedImport, setCopiedImport] = React.useState(false)
	const [copiedUsage, setCopiedUsage] = React.useState(false)
	const [strokeWidth, setStrokeWidth] = React.useState(1.5)
	const [color, setColor] = React.useState("#FFFFFF")
	const [size, setSize] = React.useState(128)
	const { trigger } = useWebHaptics()
	const [name, Icon] = selectedIcon

	const importCode = `import { ${name} } from "@deemlol/next-icons/animated"`
	const usageCode = `<${name} size={${size}} color="${color}" strokeWidth={${strokeWidth}} />`

	React.useEffect(() => {
		document.body.style.overflow = "hidden"

		return () => {
			document.body.style.overflow = "unset"
		}
	}, [])

	const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
		navigator?.clipboard?.writeText(text)

		setCopied(true)
		setTimeout(() => setCopied(false), 2_300)
	}

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
				<div
					onClick={onClose}
					className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity"
				/>

				<div className="relative w-full max-w-2xl transform rounded-xl border border-[#ffffff]/8 bg-[#111111] text-left shadow-xl transition-all sm:my-8">
					<div className="flex items-center justify-between border-b border-[#ffffff]/10 p-4">
						<h2
							className={`text-start text-2xl tracking-tight text-[#ffffff] ${GoogleSansMedium.className}`}
						>
							{name}
						</h2>

						<button
							onClick={() => {
								onClose()
								trigger("light")
							}}
							className="cursor-pointer p-2 text-[#ffffff]"
						>
							<X
								size={26}
								strokeWidth={1.5}
							/>
						</button>
					</div>

					<div className="p-4">
						<div
							className={`group relative mb-2 rounded-xl bg-[#0a0a0a] p-4 text-sm text-[#FFFFFF] ${GoogleSansRegular.className}`}
						>
							<span className="text-[#c678dd]">import</span> {"{ "}{" "}
							<span className="text-[#e06c75]">{name}</span> {" }"}{" "}
							<span className="text-[#c678dd]">from</span>{" "}
							<span className="text-[#98c379]">&quot;@deemlol/next-icons/animated&quot;;</span>
							<button
								onClick={() => {
									handleCopy(importCode, setCopiedImport)
									trigger("success")
								}}
								className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-lg bg-[#ffffff]/5 p-2 text-[#ffffff] opacity-100 transition-all duration-300 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
							>
								{copiedImport ? (
									<span className="text-xs text-[#bffb4f]">Copied</span>
								) : (
									<Copy
										size={16}
										strokeWidth={1.5}
									/>
								)}
							</button>
						</div>

						<p
							className={`mb-8 text-[10px] tracking-tight text-[#ffffff] lg:text-xs ${GoogleSansMedium.className}`}
						>
							Animated icons require{" "}
							<Link
								href="https://www.npmjs.com/package/framer-motion"
								target="_blank"
								rel="noreferrer noopener"
								className="text-[#bffb4f] underline underline-offset-4"
							>
								framer-motion
							</Link>{" "}
							to be installed in your project.
						</p>

						<div className="grid gap-10 md:grid-cols-[1fr_240px]">
							<div className="flex flex-col">
								<div className="flex aspect-square items-center justify-center rounded-lg border border-[#ffffff]/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]">
									<Icon
										size={size}
										color={color}
										strokeWidth={strokeWidth}
									/>
								</div>
							</div>

							<div className="space-y-8">
								<div>
									<label
										className={`mb-3 block text-base text-[#ffffff] ${GoogleSansMedium.className}`}
									>
										Sizes
									</label>

									<div className="grid grid-cols-4 gap-2">
										{[16, 20, 24, 28, 32, 36, 40, 48].map((s) => (
											<button
												key={s}
												onClick={() => {
													setSize(s)
													trigger("light")
												}}
												className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border transition-all duration-300 ${
													size === s
														? "border-[#bffb4f] bg-[#bffb4f]/10 text-[#bffb4f]"
														: "border-[#ffffff]/8 bg-[#ffffff]/4 text-[#ffffff] hover:bg-[#ffffff]/10"
												}`}
											>
												<span className={`text-center text-xs ${GoogleSansRegular.className}`}>
													{s}px
												</span>
											</button>
										))}
									</div>

									<div className="mt-3 flex items-center gap-2">
										<input
											type="range"
											min="12"
											max="128"
											value={size}
											onChange={(e) => {
												setSize(Number(e?.target?.value))
												trigger("light")
											}}
											className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
										/>

										<span
											className={`w-8 text-start text-xs text-[#ffffff] ${GoogleSansRegular.className}`}
										>
											{size}px
										</span>
									</div>
								</div>

								<div>
									<label
										className={`mb-3 block text-base text-[#ffffff] ${GoogleSansMedium.className}`}
									>
										Colors
									</label>

									<ColorPicker
										color={color}
										onChange={setColor}
									/>
								</div>

								<div>
									<label
										className={`mb-3 block text-base text-[#ffffff] ${GoogleSansMedium.className}`}
									>
										Stroke: {strokeWidth}px
									</label>

									<div className="flex items-center gap-2">
										<input
											type="range"
											min="0.5"
											max="4"
											step="0.5"
											value={strokeWidth}
											onChange={(e) => {
												setStrokeWidth(Number(e?.target?.value))
												trigger("light")
											}}
											className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-12">
							<label
								className={`mb-3 block text-sm text-[#ffffff] uppercase ${GoogleSansMedium.className}`}
							>
								Copy To Clipboard
							</label>

							<button
								onClick={() => {
									handleCopy(usageCode, setCopiedUsage)
									trigger("success")
								}}
								className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GoogleSansMedium.className}`}
							>
								{copiedUsage ? <span className="text-[#bffb4f]">Copied!</span> : "Copy JSX"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
