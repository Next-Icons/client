"use client";

import { Clipboard } from "@deemlol/next-icons";
import { toast } from "sonner";
import Link from "next/link";

export default function InstallationExport() {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<div>
			<aside className="hidden w-full max-w-xs overflow-y-auto px-4 py-6 2xl:fixed 2xl:flex">
				<nav className="space-y-10">
					<div>
						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-xl text-black dark:text-white">Introduction</h1>

						<ul className="space-y-4">
							<li>
								<Link href="/guide" className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-600 dark:text-gray-400">
									What is Next-Icons?
								</Link>
							</li>

							<li>
								<Link
									href="/guide/installation"
									className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-purple-500 underline underline-offset-2"
								>
									Installation & Usage
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-xl text-black dark:text-white">Basics</h1>

						<ul className="space-y-4">
							<li>
								<Link
									href="/guide/basics/color"
									className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-600 dark:text-gray-400"
								>
									Color
								</Link>
							</li>

							<li>
								<Link
									href="/guide/basics/śizing"
									className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-600 dark:text-gray-400"
								>
									Sizing
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</aside>

			<main className="mx-auto flex w-full max-w-6xl flex-col">
				<div className="flex-1">
					<section>
						<h1 className="mb-2 font-[family-name:var(--font-clashdisplay-semibold)] text-5xl text-purple-500">Installation</h1>

						<p className="mb-14 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-white lg:text-base">
							You can install Next-Icons using pnpm, yarn and npm
						</p>

						<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
							<div>
								<h1 className="mb-1.5 font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white">Using npm</h1>

								<div className="flex w-full max-w-lg items-center justify-between rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
									<div className="w-full overflow-x-auto">
										<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
											<code className="text-black dark:text-white">npm install @deemlol/next-icons</code>
										</pre>
									</div>

									<div className="ml-2 flex-shrink-0">
										<Clipboard
											className="cursor-pointer text-gray-500"
											size={20}
											onClick={() => {
												copyToClipboard(`npm install @deemlol/next-icons`);

												return toast.success("Successfully copied to clipboard", {
													className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
													duration: 5_000,
												});
											}}
										/>
									</div>
								</div>
							</div>

							<div>
								<h1 className="mb-1.5 font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white">Using pnpm</h1>

								<div className="flex w-full max-w-lg items-center justify-between rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
									<div className="w-full overflow-x-auto">
										<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
											<code className="text-black dark:text-white">pnpm install @deemlol/next-icons</code>
										</pre>
									</div>

									<div className="ml-2 flex-shrink-0">
										<Clipboard
											className="cursor-pointer text-gray-500"
											size={20}
											onClick={() => {
												copyToClipboard(`pnpm install @deemlol/next-icons`);

												return toast.success("Successfully copied to clipboard", {
													className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
													duration: 5_000,
												});
											}}
										/>
									</div>
								</div>
							</div>

							<div>
								<h1 className="mb-1.5 font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white">Using yarn</h1>

								<div className="flex w-full max-w-lg items-center justify-between rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
									<div className="w-full overflow-x-auto">
										<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
											<code className="text-black dark:text-white">yarn add @deemlol/next-icons</code>
										</pre>
									</div>

									<div className="ml-2 flex-shrink-0">
										<Clipboard
											className="cursor-pointer text-gray-500"
											size={20}
											onClick={() => {
												copyToClipboard(`yarn add @deemlol/next-icons`);

												return toast.success("Successfully copied to clipboard", {
													className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
													duration: 5_000,
												});
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						<h1 className="mb-2 mt-14 font-[family-name:var(--font-clashdisplay-semibold)] text-4xl text-purple-500">Usage</h1>

						<p className="mb-10 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-gray-600 dark:text-white lg:text-base">
							Here you can see how to use the icons in your code
						</p>

						<div className="flex w-full max-w-lg items-center justify-start rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
							<div className="w-full overflow-x-auto">
								<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
									<code className="text-black dark:text-white">
										<span className="text-red-500">{`import `}</span>
										<span className="text-gray-500">{`{`}</span> <span className="text-orange-500">{`Check`}</span>{" "}
										<span className="text-gray-500">{`}`}</span> {""}
										<span className="text-red-500">{`from `}</span>
										<span className="text-blue-500">{`"@deemlol/next-icons";`}</span>
										<br />
										<br />
										<span className="text-red-500">{`export default function `}</span>
										<span className="text-orange-500">{`Home `}</span>
										<span className="text-gray-500">{`() `}</span>
										<span className="text-gray-500">{`{`}</span>
										<br />
										<span className="ml-4 text-red-500">{`return `}</span>
										<span className="text-gray-500">{`<`}</span>
										<span className="text-blue-500">{`Check `}</span>
										<span className="text-gray-500">{`/>;`}</span>
										<br />
										<span className="text-gray-500">{`}`}</span>
									</code>
								</pre>
							</div>
						</div>

						<p className="mb-2 mt-10 font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white lg:text-lg">
							You can also include the whole icon pack:
						</p>

						<div className="flex w-full max-w-lg items-center justify-start rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
							<div className="w-full overflow-x-auto">
								<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
									<code className="text-black dark:text-white">
										<span className="text-red-500">{`import `}</span>
										<span className="text-blue-500">{`* `}</span>
										<span className="text-red-500">{`as `}</span>
										<span className="text-orange-500">{`Icon `}</span>
										<span className="text-red-500">{`from `}</span>
										<span className="text-blue-500">{`"@deemlol/next-icons";`}</span>
										<br />
										<br />
										<span className="text-red-500">{`export default function `}</span>
										<span className="text-orange-500">{`Home `}</span>
										<span className="text-gray-500">{`() `}</span>
										<span className="text-gray-500">{`{`}</span>
										<br />
										<span className="ml-4 text-red-500">{`return `}</span>
										<span className="text-gray-500">{`<`}</span>
										<span className="text-orange-500">{`Icon`}</span>
										<span className="text-gray-500">{`.`}</span>
										<span className="text-blue-500">{`Check `}</span>
										<span className="text-gray-500">{`/>;`}</span>
										<br />
										<span className="text-gray-500">{`}`}</span>
									</code>
								</pre>
							</div>
						</div>

						<p className="mb-2 mt-10 font-[family-name:var(--font-clashdisplay-medium)] text-base text-black dark:text-white lg:text-lg">
							Our icons can be also configured with props
						</p>

						<div className="mb-24 flex w-full max-w-lg items-center justify-start rounded-lg bg-zinc-200 p-3 dark:bg-[#161618] lg:p-4">
							<div className="w-full overflow-x-auto">
								<pre className="whitespace-pre-wrap font-[family-name:var(--font-clashdisplay-regular)] text-sm">
									<code className="text-black dark:text-white">
										<span className="text-blue-500">{`<`}</span>
										<span className="text-orange-500">{`Check `}</span>
										<span className="text-blue-500">{`size=`}</span>
										<span className="text-gray-500">{`{`}</span>
										<span className="text-blue-500">{`40`}</span>
										<span className="text-gray-500">{`} `}</span>
										<span className="text-blue-500">{`color=`}</span>
										<span className="text-blue-800">{`"#FF0000" `}</span>
										<span className="text-gray-500">{`/>`}</span>
									</code>
								</pre>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
