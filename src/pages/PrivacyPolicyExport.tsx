"use client"

import { GoogleSansBold, GoogleSansMedium, GoogleSansRegular, GoogleSansSemiBold } from "@/utils/fonts"
import { DOMAIN_BASE_URL, EMAIL_ADDRESS } from "@/utils/constants"

import { useWebHaptics } from "web-haptics/react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function PrivacyPolicyExport() {
	const { trigger } = useWebHaptics()

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="min-h-screen px-4 pt-30 pb-30 lg:pt-42 2xl:px-0"
		>
			<div className="mx-auto max-w-7xl">
				<h1 className={`mb-4 text-start text-5xl text-[#bffb4f] lg:text-7xl ${GoogleSansBold.className}`}>
					Privacy Policy
				</h1>

				<p className={`mb-12 text-start text-base text-[#ffffff]/60 ${GoogleSansRegular.className}`}>
					Last updated: March 15, 2026
				</p>

				<div className={`space-y-14 text-justify text-[#ffffff]/90 ${GoogleSansRegular.className}`}>
					<section>
						<p className="leading-relaxed">
							Welcome to Next Icons (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed
							to protecting your personal information and your right to privacy. This Privacy Policy
							explains what information we collect, how we use it, and your rights when you visit our
							website{" "}
							<Link
								href={DOMAIN_BASE_URL}
								className="text-[#bffb4f] hover:underline hover:underline-offset-4"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trigger("light")}
							>
								{DOMAIN_BASE_URL}
							</Link>{" "}
							(the &quot;Site&quot;).
						</p>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							1. Information We Collect
						</h2>

						<p className="mb-4 leading-relaxed">
							We collect minimal data necessary to provide our services and ensure the security of our
							website.
						</p>

						<h3 className={`mb-2 text-lg text-[#ffffff] ${GoogleSansMedium.className}`}>
							a) Information You Provide Voluntarily
						</h3>

						<ul className="mb-10 list-decimal pl-5 leading-relaxed">
							<li>
								<strong className="text-[#ffffff]">Contact Form:</strong> When you contact us via our
								form, we collect your E-mail Address, Subject, Message, and the &quot;Tag&quot;
								(category) of your inquiry. We also record your consent to process this data.
							</li>
						</ul>

						<h3 className={`mb-2 text-lg text-[#ffffff] ${GoogleSansMedium.className}`}>
							b) Automatically Collected Information
						</h3>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">
								<strong className="text-[#ffffff]">Security Data (IP Address):</strong> We transiently
								process your IP address to generate and verify a Proof-of-Work (PoW) challenge and to
								enforce rate limiting on our API. This is a security measure to prevent spam and
								automated abuse. This data is stored in temporary memory and is not persisted in a
								database.
							</li>

							<li>
								<strong className="text-[#ffffff]">External API Requests:</strong> Our website fetches
								public statistics (GitHub Stars, NPM Downloads) directly from your browser. These
								requests are made to GitHub and NPM registries, which may see your IP address as a
								result of these standard web requests.
							</li>
						</ul>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							2. How We Use Your Information
						</h2>

						<p className="mb-4 leading-relaxed">
							We use the information we collect for the following purposes:
						</p>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">
								<strong className="text-[#ffffff]">To communicate with you:</strong> To respond to your
								inquiries, bug reports, or feature requests submitted via the contact form.
							</li>

							<li className="mb-2">
								<strong className="text-[#ffffff]">To ensure security:</strong> To protect our website
								from spam, bots, and brute-force attacks using our custom Proof-of-Work and Rate
								Limiting systems.
							</li>

							<li>
								<strong className="text-[#ffffff]">To analyze trends:</strong> We monitor aggregate
								statistics (like stars and downloads) to understand the popularity of our project.
							</li>
						</ul>
					</section>

					<section>
						<h2 className={`mb-4 text-2xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							3. Cookies and Tracking Technologies
						</h2>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">
								<strong className="text-[#ffffff]">Essential Cookies:</strong> We do not currently use
								persistent tracking cookies.
							</li>

							<li className="mb-2">
								<strong className="text-[#ffffff]">Local Storage:</strong> We may use browser local
								storage to save your preferences (e.g., UI settings) locally on your device.
							</li>

							<li>
								<strong className="text-[#ffffff]">Third-Party Scripts:</strong> We do not use
								third-party tracking pixels or analytics services (like Google Analytics) that track
								your behavior across other websites.
							</li>
						</ul>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							4. Third-Party Services
						</h2>

						<p className="mb-4 leading-relaxed">
							We may share data with the following service providers solely for the purpose of operating
							our website:
						</p>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">
								<strong className="text-[#ffffff]">Vercel:</strong> Our hosting provider. They may
								process standard server logs (IP addresses) for security and performance monitoring.
							</li>

							<li className="mb-2">
								<strong className="text-[#ffffff]">Email Service Provider:</strong> When you send a
								message, it is transmitted via SMTP (using Nodemailer) to our email hosting provider
								(e.g., Seznam.cz) so we can receive and read it.
							</li>

							<li>
								<strong className="text-[#ffffff]">GitHub & NPM:</strong> As mentioned, your browser
								connects to these services to fetch public stats. Please refer to their respective
								privacy policies for details on how they handle API requests.
							</li>
						</ul>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							5. Data Retention
						</h2>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">
								<strong className="text-[#ffffff]">Contact Messages:</strong> Emails sent through our
								form are delivered to our mailbox and retained as long as necessary to resolve your
								inquiry or for record-keeping purposes. We do not store these messages in a database on
								our web server.
							</li>

							<li>
								<strong className="text-[#ffffff]">Security Logs:</strong> IP addresses used for rate
								limiting are held in memory and automatically cleared (typically within minutes).
							</li>
						</ul>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							6. Your Rights
						</h2>

						<p className="mb-4 leading-relaxed">
							Depending on your location (e.g., EEA/GDPR), you may have the following rights:
						</p>

						<ul className="list-decimal pl-5 leading-relaxed">
							<li className="mb-2">The right to access the personal information we hold about you.</li>
							<li className="mb-2">The right to request correction or deletion of your data.</li>
							<li className="mb-2">The right to withdraw consent (e.g., for us to contact you).</li>
						</ul>

						<p className="mt-4 leading-relaxed">
							To exercise these rights, please contact us at:{" "}
							<Link
								href={`mailto:${EMAIL_ADDRESS}`}
								className="text-[#bffb4f] hover:underline hover:underline-offset-4"
								onClick={() => trigger("light")}
							>
								{EMAIL_ADDRESS}
							</Link>
							.
						</p>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							7. Updates to This Policy
						</h2>

						<p className="leading-relaxed">
							We may update this Privacy Policy from time to time. The updated version will be indicated
							by an updated &quot;Revised&quot; date and will be effective as soon as it is accessible.
						</p>
					</section>

					<section>
						<h2 className={`mb-4 text-xl text-[#ffffff] md:text-3xl ${GoogleSansSemiBold.className}`}>
							8. Contact Us
						</h2>

						<p className="leading-relaxed">
							If you have questions or comments about this policy, you may email us at:{" "}
							<Link
								href={`mailto:${EMAIL_ADDRESS}`}
								className="mt-2 inline-block text-[#bffb4f] hover:underline hover:underline-offset-4"
								onClick={() => trigger("light")}
							>
								{EMAIL_ADDRESS}
							</Link>
							.
						</p>
					</section>
				</div>
			</div>
		</motion.div>
	)
}
