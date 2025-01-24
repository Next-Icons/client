"use client";

const CustomizeIcon = dynamic(() => import("@/components/home/CustomizeIcon"), { ssr: false });
import FeatureCard from "@/components/home/FeatureCard";

//prettier-ignore
import { Search, ChevronDown, Clipboard, ChevronLeft, ChevronRight, ChevronUp, Phone, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, Monitor } from "@deemlol/next-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
	const [iconCount, setIconCount] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("/api/allOurIcons", {
					method: "GET",
				});

				if (res.ok) {
					const data = await res.json();

					setIconCount(data.icons);
				} else {
					console.log("Failed to fetch the icon count");
				}
			} catch (err) {
				console.log("An error occurred while fetching the icon count");
				console.error(err);
			}
		};

		fetchData();
	}, []);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const handleSearchClick = () => {
		return router.push("/icons");
	};

	const titleContainer = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const titleItem = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-4 py-20 xl:px-0">
			<div className="w-full">
				<section className="relative py-10 lg:py-20">
					<div className="flex w-full flex-col items-center justify-between lg:flex-row lg:space-x-14">
						<div className="w-full lg:w-2/3">
							<motion.h1
								variants={titleContainer}
								initial="hidden"
								animate="visible"
								className="w-full max-w-xl text-start font-[family-name:var(--font-clashdisplay-bold)] text-6xl text-gray-900 dark:text-white lg:text-7xl"
							>
								<motion.span variants={titleItem}>Make</motion.span> <motion.span variants={titleItem}>your</motion.span>{" "}
								<motion.span variants={titleItem}>project</motion.span> <motion.span variants={titleItem}>better</motion.span>{" "}
								<motion.span variants={titleItem}>with</motion.span>
								<motion.span variants={titleItem} className="relative mx-0 inline-block stroke-current text-purple-500 lg:mx-2">
									Next Icons
									<motion.svg
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ duration: 2, ease: "easeInOut" }}
										className="absolute -bottom-0.5 max-h-2 w-full"
										viewBox="0 0 55 5"
										xmlns="http://www.w3.org/2000/svg"
										preserveAspectRatio="none"
									>
										<motion.path
											d="M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002"
											strokeWidth="2"
											fill="none"
											stroke="currentColor"
										/>
									</motion.svg>
								</motion.span>
							</motion.h1>

							<motion.div
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1.5 }}
								className="mt-16 flex w-full max-w-xl flex-col space-y-4 lg:mt-10 lg:flex-row lg:space-x-4 lg:space-y-0"
							>
								<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full lg:w-1/2">
									<Link
										href={"/icons"}
										className="flex items-center justify-center gap-2 rounded-2xl bg-purple-500 px-2 py-2 text-center font-[family-name:var(--font-clashdisplay-medium)] text-base text-white"
									>
										<Search size={24} />
										View All Icons
									</Link>
								</motion.div>

								<div className="w-full lg:w-1/2">
									<div className="flex items-center justify-between rounded-2xl bg-zinc-200 p-2.5 text-black dark:bg-[#161618] dark:text-white">
										<div className="w-full overflow-x-auto">
											<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
												<code className="space-x-2">
													<span className="text-zinc-500 dark:text-zinc-300">$</span>
													<span>npm i @deemlol/next-icons</span>
												</code>
											</pre>
										</div>

										<div className="ml-2 flex-shrink-0">
											<Clipboard
												className="cursor-pointer text-zinc-500 dark:text-zinc-300"
												size={18}
												onClick={() => {
													copyToClipboard(`npm i @deemlol/next-icons`);

													return toast.success("Successfully copied to clipboard", {
														className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
														duration: 5_000,
													});
												}}
											/>
										</div>
									</div>
								</div>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 1.5 }}
							className="mt-10 w-full rounded-2xl bg-white p-4 shadow-xl dark:bg-[#161618] lg:mt-0 lg:w-1/2"
						>
							<div className="relative mb-6">
								<Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />

								<input
									type="text"
									placeholder={`Search ${iconCount || "0"} icons...`}
									className="w-full cursor-pointer rounded-xl border bg-gray-100 py-2 pl-10 outline-none placeholder:text-gray-500 focus:ring-0 dark:border-gray-600 dark:bg-background dark:placeholder:text-gray-400"
									onClick={handleSearchClick}
									readOnly={true}
								/>
							</div>

							<div className="grid grid-cols-4 gap-4 lg:grid-cols-6">
								{[
									{ Icon: ChevronDown, name: "Chevron Down" },
									{ Icon: ChevronLeft, name: "Chevron Left" },
									{ Icon: ChevronRight, name: "Chevron Right" },
									{ Icon: ChevronUp, name: "Chevron Up" },
									{ Icon: Phone, name: "Phone" },
									{ Icon: PhoneCall, name: "Phone Call" },
									{ Icon: PhoneForwarded, name: "Phone Forwarded" },
									{ Icon: PhoneIncoming, name: "Phone Incoming" },
									{ Icon: PhoneMissed, name: "Phone Missed" },
									{ Icon: PhoneOff, name: "Phone Off" },
									{ Icon: PhoneOutgoing, name: "Phone Outgoing" },
									{ Icon: Monitor, name: "Monitor" },
								].map(({ Icon, name }) => (
									<motion.div
										key={name}
										className="group relative flex aspect-square items-center justify-center rounded-xl border border-gray-200 hover:border-purple-300 dark:border-gray-600 hover:dark:border-purple-500"
										whileHover={{ scale: 1.05 }}
									>
										<Icon className="h-6 w-6 text-gray-700 dark:text-white" />
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</section>

				<section className="py-10 lg:py-20">
					<FeatureCard />
				</section>

				<section className="py-10 lg:py-20">
					<CustomizeIcon />
				</section>
			</div>
		</div>
	);
}
