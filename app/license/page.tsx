"use client";

import { motion } from "framer-motion";

export default function License() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center px-4 pb-10 pt-28 lg:min-h-screen lg:pb-0 lg:pt-0 xl:px-0">
			<div>
				<motion.h1
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
					className="mb-16 text-start font-[family-name:var(--font-clashdisplay-bold)] text-6xl text-purple-500"
				>
					Next Icons License
				</motion.h1>
			</div>

			<div>
				<motion.h1
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
					className="mb-2 text-start font-[family-name:var(--font-clashdisplay-semibold)] text-2xl uppercase text-gray-600 dark:text-gray-400"
				>
					MIT License
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="mb-6 text-start font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-gray-400"
				>
					Copyright (c) 21/12/2024 Alexandr Virgovič
				</motion.p>

				<motion.p
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="w-full max-w-5xl text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white"
				>
					Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the
					&quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge,
					publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
					subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial
					portions of the Software. THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
					LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
					COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
					OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE.
				</motion.p>
			</div>
		</div>
	);
}
