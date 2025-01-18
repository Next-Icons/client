"use client";

import Link from "next/link";

export default function IntroductionExport() {
	return (
		<div>
			<aside className="hidden w-full max-w-xs overflow-y-auto px-4 py-6 2xl:fixed 2xl:flex">
				<nav className="space-y-10">
					<div>
						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-xl text-black dark:text-white">Introduction</h1>

						<ul className="space-y-4">
							<li>
								<Link
									href="/guide"
									className="font-[family-name:var(--font-clashdisplay-medium)] text-base text-purple-500 underline underline-offset-2"
								>
									What is Next-Icons?
								</Link>
							</li>

							<li>
								<Link
									href="/guide/installation"
									className="text-baset font-[family-name:var(--font-clashdisplay-medium)] text-gray-600 dark:text-gray-400"
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
						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">What is Next-Icons?</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							Next-Icons is an open-source icon component library that provides a collection of high-quality icons for your projects. The icons
							are designed to be easily customizable and are available in various sizes and colors. The library is built with performance in mind
							and is optimized for modern web development.
						</p>

						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">Avaliable Icons</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							Next-Icons provides a wide range of icons that cover various categories. We are constantly adding new icons to the library to meet
							the needs of our users. The icons are available in SVG format and can be easily customized to fit your design requirements. You can{" "}
							<Link href={"/contact"} className="text-blue-600 dark:text-blue-400">
								contact us
							</Link>{" "}
							if you have any icon requests.
						</p>

						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">Customizable</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							All our icons are made in the same style and size, so you can easily mix and match them to create your own unique designs.
						</p>

						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">Code Optimalization</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							Our code is optimazed for performance because we know how important it is to have a fast website. We use modern technologies to
							ensure that our icons are lightweight and load quickly on all devices. You can use our icons without worrying about slowing down
							your website.
						</p>

						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">Community</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							If you have any questions about Next-Icons, feel free to reach out to us! You can do it via our{" "}
							<Link href={"/contact"} className="text-blue-600 dark:text-blue-400">
								Contact Form
							</Link>{" "}
							or on our{" "}
							<Link href={"https://github.com/Next-Icons"} target="_blank" className="text-blue-600 dark:text-blue-400" rel="noopener noreferrer">
								GitHub
							</Link>
							.
						</p>

						<h1 className="mb-4 font-[family-name:var(--font-clashdisplay-semibold)] text-3xl text-purple-500 lg:text-4xl">All Resources</h1>

						<p className="mb-10 text-justify font-[family-name:var(--font-clashdisplay-regular)] text-base text-black dark:text-white">
							<Link href={"/guide"} className="text-blue-600 dark:text-blue-400">
								What is Next-Icons?
							</Link>{" "}
							<span>-</span>{" "}
							<Link href={"/guide/installation"} className="text-blue-600 dark:text-blue-400">
								Installation & Usage
							</Link>{" "}
							<span>-</span>{" "}
							<Link href={"/guide/basics/color"} className="text-blue-600 dark:text-blue-400">
								Color
							</Link>{" "}
							<span>-</span>{" "}
							<Link href={"/guide/basics/sizing"} className="text-blue-600 dark:text-blue-400">
								Sizing
							</Link>
						</p>
					</section>
				</div>
			</main>
		</div>
	);
}
