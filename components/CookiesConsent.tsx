"use client";

import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X } from "@deemlol/next-icons";

export default function CookiesConsent() {
	const [showCookiesConsent, setShowCookiesConsent] = useState(false);

	useEffect(() => {
		const cookiesConsent = localStorage.getItem("cookiesConsent");

		if (!cookiesConsent) {
			setShowCookiesConsent(true);
		}
	}, []);

	const handleAcceptCookies = () => {
		setShowCookiesConsent(false);
		localStorage.setItem("cookiesConsent", "accepted");
	};

	const handleDeclineCookies = () => {
		setShowCookiesConsent(false);
		localStorage.setItem("cookiesConsent", "rejected");
	};

	return (
		<AnimatePresence>
			{showCookiesConsent && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.5 }}
					className="fixed bottom-4 left-0 right-0 z-50 w-full px-4 lg:left-4 lg:max-w-md lg:px-0"
				>
					<div className="rounded-2xl bg-[#161618] p-4 shadow-xl">
						<div className="flex items-center justify-between">
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
								className="flex items-center space-x-2"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-8 w-8 text-purple-500"
								>
									<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
									<path d="M8.5 8.5v.01" />
									<path d="M16 15.5v.01" />
									<path d="M12 12v.01" />
									<path d="M11 17v.01" />
									<path d="M7 14v.01" />
								</svg>

								<h1 className="font-[family-name:var(--font-clashdisplay-semibold)] text-xl text-purple-500 lg:text-2xl">
									We are using cookies!
								</h1>
							</motion.div>

							<motion.button
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setShowCookiesConsent(false)}
							>
								<X className="h-7 w-7 text-white" />
							</motion.button>
						</div>

						<motion.p
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="mt-4 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-300"
						>
							We may place these for analysis of our visitor data, to improve our website and to give you a great website experience. Data is
							collected completely anonymously, and your identity is not shared with anyone. Thank you for helping us!
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="mt-4 flex w-full space-x-4"
						>
							<Button variant={"secondary"} onClick={handleDeclineCookies} className="w-1/2">
								Decline Cookies
							</Button>

							<Button variant={"default"} onClick={handleAcceptCookies} className="w-1/2">
								Accept Cookies
							</Button>
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
