"use client";

import { GroteskMedium, GroteskRoman } from "@/utils/fonts";
import ColorPicker from "@/components/icons/ColorPicker";

import { useWebHaptics } from "web-haptics/react";
import { X, Copy } from "@deemlol/next-icons";
import * as React from "react";

type IconType = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number; className?: string }>;
type IconEntry = [string, IconType];

type IconModalProps = {
	onClose: () => void;
	selectedIcon: IconEntry;
};

export default function IconModal({ selectedIcon, onClose }: IconModalProps) {
	const [copiedImport, setCopiedImport] = React.useState(false);
	const [copiedUsage, setCopiedUsage] = React.useState(false);
	const [strokeWidth, setStrokeWidth] = React.useState(1.5);
	const [copiedSvg, setCopiedSvg] = React.useState(false);
	const previewRef = React.useRef<HTMLDivElement>(null);
	const [color, setColor] = React.useState("#FFFFFF");
	const [size, setSize] = React.useState(128);
	const { trigger } = useWebHaptics();
	const [name, Icon] = selectedIcon;

	const importCode = `import { ${name} } from "@deemlol/next-icons"`;
	const usageCode = `<${name} size={${size}} color="${color}" strokeWidth={${strokeWidth}} />`;

	React.useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
		navigator?.clipboard?.writeText(text);

		setCopied(true);
		setTimeout(() => setCopied(false), 2_300);
	};

	const handleCopySvg = () => {
		const svgElement = previewRef?.current?.querySelector("svg");

		if (svgElement) {
			navigator?.clipboard?.writeText(svgElement?.outerHTML);

			setCopiedSvg(true);
			setTimeout(() => setCopiedSvg(false), 2_300);
		}
	};

	const handleDownloadSvg = () => {
		const svgElement = previewRef?.current?.querySelector("svg");

		if (svgElement) {
			const svgData = svgElement?.outerHTML;
			const blob = new Blob([svgData], { type: "image/svg+xml" });
			const link = document?.createElement("a");
			const url = URL.createObjectURL(blob);

			link.href = url;
			link.download = `${name}.svg`;
			document?.body.appendChild(link);
			link?.click();
			document?.body.removeChild(link);
		}
	};

	const handleDownloadImage = (format: "png" | "jpeg") => {
		const svgElement = previewRef?.current?.querySelector("svg");
		if (!svgElement) return;

		const svgData = new XMLSerializer().serializeToString(svgElement);
		const canvas = document?.createElement("canvas");
		const ctx = canvas?.getContext("2d");
		const img = new Image();

		const scale = 4;
		canvas.width = size * scale;
		canvas.height = size * scale;

		img.onload = () => {
			if (ctx) {
				if (format === "jpeg") {
					ctx.fillStyle = "#FFFFFF";
					ctx.fillRect(0, 0, canvas?.width, canvas?.height);
				}

				ctx.scale(scale, scale);
				ctx.drawImage(img, 0, 0, size, size);

				const link = document?.createElement("a");
				link.href = canvas?.toDataURL(`image/${format === "jpeg" ? "jpeg" : "png"}`);
				link.download = `${name}.${format === "jpeg" ? "jpg" : "png"}`;
				link?.click();
			}
		};

		img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
				<div onClick={onClose} className="fixed inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity" />

				<div className="relative w-full max-w-2xl transform rounded-xl border border-[#ffffff]/8 bg-[#111111] text-left shadow-xl transition-all sm:my-8">
					<div className="flex items-center justify-between border-b border-[#ffffff]/10 p-4">
						<h2 className={`text-start text-2xl text-[#ffffff] ${GroteskMedium.className}`}>{name}</h2>

						<button
							onClick={() => {
								onClose();
								trigger("light");
							}}
							className="cursor-pointer p-2 text-[#ffffff]"
						>
							<X size={26} strokeWidth={1.5} />
						</button>
					</div>

					<div className="p-4">
						<div className="group relative mb-6 rounded-xl bg-[#0a0a0a] p-4 font-mono text-sm text-[#FFFFFF]">
							<span className="text-[#c678dd]">import</span> {"{ "}{" "}
							<span className="text-[#e06c75]">{name}</span> {" }"}{" "}
							<span className="text-[#c678dd]">from</span>{" "}
							<span className="text-[#98c379]">&quot;@deemlol/next-icons&quot;;</span>
							<button
								onClick={() => {
									handleCopy(importCode, setCopiedImport);
									trigger("success");
								}}
								className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-lg bg-[#ffffff]/5 p-2 text-[#ffffff] opacity-100 transition-all duration-300 focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
							>
								{copiedImport ? (
									<span className="text-xs text-[#bffb4f]">Copied</span>
								) : (
									<Copy size={16} strokeWidth={1.5} />
								)}
							</button>
						</div>

						<div className="grid gap-10 md:grid-cols-[1fr_240px]">
							<div className="flex flex-col">
								<div
									ref={previewRef}
									className="flex aspect-square items-center justify-center rounded-lg border border-[#ffffff]/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[30px_30px]"
									id="modal-icon-preview"
								>
									<Icon size={size} color={color} strokeWidth={strokeWidth} />
								</div>
							</div>

							<div className="space-y-8">
								<div>
									<label
										className={`mb-3 block text-base tracking-wider text-[#ffffff] ${GroteskRoman.className}`}
									>
										Sizes
									</label>

									<div className="grid grid-cols-4 gap-2">
										{[16, 20, 24, 28, 32, 36, 40, 48].map((s) => (
											<button
												key={s}
												onClick={() => {
													setSize(s);
													trigger("light");
												}}
												className={`flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border transition-all duration-300 ${
													size === s
														? "border-[#bffb4f] bg-[#bffb4f]/10 text-[#bffb4f]"
														: "border-[#ffffff]/8 bg-[#ffffff]/4 text-[#ffffff] hover:bg-[#ffffff]/10"
												}`}
											>
												<span className={`text-center text-xs ${GroteskRoman.className}`}>
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
												setSize(Number(e?.target?.value));
												trigger("light");
											}}
											className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
										/>

										<span
											className={`w-8 text-start text-xs text-[#ffffff] ${GroteskRoman.className}`}
										>
											{size}px
										</span>
									</div>
								</div>

								<div>
									<label
										className={`mb-3 block text-base tracking-wider text-[#ffffff] ${GroteskRoman.className}`}
									>
										Colors
									</label>

									<ColorPicker color={color} onChange={setColor} />
								</div>

								<div>
									<label
										className={`mb-3 block text-base tracking-wider text-[#ffffff] ${GroteskRoman.className}`}
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
												setStrokeWidth(Number(e?.target?.value));
												trigger("light");
											}}
											className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[#ffffff]/10 accent-[#bffb4f]"
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-12 grid gap-8 sm:grid-cols-2">
							<div>
								<label
									className={`mb-3 block text-sm tracking-wider text-[#ffffff] uppercase ${GroteskMedium.className}`}
								>
									Export As
								</label>

								<div className="grid grid-cols-3 gap-2">
									<button
										onClick={() => {
											handleDownloadSvg();
											trigger("success");
										}}
										className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GroteskRoman.className}`}
									>
										SVG
									</button>

									<button
										onClick={() => {
											handleDownloadImage("png");
											trigger("success");
										}}
										className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GroteskRoman.className}`}
									>
										PNG
									</button>

									<button
										onClick={() => {
											handleDownloadImage("jpeg");
											trigger("success");
										}}
										className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GroteskRoman.className}`}
									>
										JPG
									</button>
								</div>
							</div>

							<div>
								<label
									className={`mb-3 block text-sm tracking-wider text-[#ffffff] uppercase ${GroteskMedium.className}`}
								>
									Copy To Clipboard
								</label>

								<div className="grid grid-cols-2 gap-2">
									<button
										onClick={() => {
											handleCopySvg();
											trigger("success");
										}}
										className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GroteskRoman.className}`}
									>
										{copiedSvg ? <span className="text-[#bffb4f]">Copied!</span> : "Copy SVG"}
									</button>

									<button
										onClick={() => {
											handleCopy(usageCode, setCopiedUsage);
											trigger("success");
										}}
										className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#ffffff]/8 bg-[#ffffff]/4 px-3 py-2.5 text-sm text-[#ffffff] transition-all duration-300 hover:border-[#ffffff]/20 hover:bg-[#ffffff]/10 active:scale-95 ${GroteskRoman.className}`}
									>
										{copiedUsage ? <span className="text-[#bffb4f]">Copied!</span> : "Copy JSX"}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
