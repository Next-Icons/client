"use client";

import { GroteskBold, GroteskMedium, GroteskRoman } from "@/utils/fonts";
import Dropdown from "@/components/contact/Dropdown";

import { Check, Shield } from "@deemlol/next-icons";
import { useWebHaptics } from "web-haptics/react";
import { motion } from "framer-motion";
import * as React from "react";
import Link from "next/link";

const tagOptions = ["Bug", "Question", "Typo", "Showcase", "Suggest Icon", "Other"] as const;
type TagOption = (typeof tagOptions)[number];

type ContactFormData = {
	email: string;
	subject: string;
	tag: TagOption;
	message: string;
	consent: boolean;
	_honey: string;
};

type FormErrors = Partial<Record<keyof ContactFormData | "form", string>>;

async function solvePoW(challenge: string, difficulty: number): Promise<string> {
	const encoder = new TextEncoder();
	let nonce = 0;

	while (true) {
		const str = challenge + nonce;
		const data = encoder.encode(str);
		const hashBuffer = await crypto.subtle.digest("SHA-256", data);
		const hashArray = new Uint8Array(hashBuffer);

		let isValid = true;
		const fullBytes = Math.floor(difficulty / 2);

		for (let i = 0; i < fullBytes; i++) {
			if (hashArray[i] !== 0) {
				isValid = false;
				break;
			}
		}

		if (isValid && difficulty % 2 === 1) {
			if (hashArray[fullBytes] >= 16) {
				isValid = false;
			}
		}

		if (isValid) return nonce.toString();

		nonce++;
		if (nonce % 5000 === 0) {
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
	}
}

export default function ContactExport() {
	//prettier-ignore
	const [formData, setFormData] = React.useState<ContactFormData>({ email: "", subject: "", tag: tagOptions[0], message: "", consent: false, _honey: "" });
	const [captchaSolution, setCaptchaSolution] = React.useState<{ challenge: string; nonce: string } | null>(null);
	const [captchaStatus, setCaptchaStatus] = React.useState<"idle" | "solving" | "solved" | "error">("idle");
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [errors, setErrors] = React.useState<FormErrors>({});
	const { trigger } = useWebHaptics();

	const handleCaptchaVerify = async () => {
		if (captchaStatus === "solving" || captchaStatus === "solved") return;
		setCaptchaStatus("solving");

		try {
			const challengeRes = await fetch("/api/contact");

			if (!challengeRes?.ok) {
				setCaptchaStatus("error");

				setErrors({ form: "Failed to initialize verification" });
				return;
			}

			const { challenge, difficulty } = await challengeRes?.json();
			const nonce = await solvePoW(challenge, difficulty);

			setCaptchaSolution({ challenge, nonce });
			setCaptchaStatus("solved");
		} catch (err) {
			console.error("An error occurred while solving PoW:", err);
			setCaptchaStatus("error");
		}
	};

	const validateForm = (data: ContactFormData) => {
		const nextErrors: FormErrors = {};

		if (!data?.email?.trim()) {
			nextErrors.email = "Please enter your e-mail address";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email)) {
			nextErrors.email = "E-mail address is not in the correct format";
		} else if (data?.email?.trim().length < 5) {
			nextErrors.email = "E-mail address must be at least 5 characters long";
		} else if (data?.email?.trim().length > 50) {
			nextErrors.email = "E-mail address must not exceed 50 characters";
		}

		if (!data?.subject?.trim()) {
			nextErrors.subject = "Please enter a subject";
		} else if (data?.subject?.trim().length < 5) {
			nextErrors.subject = "Subject must be at least 5 characters long";
		} else if (data?.subject?.trim().length > 40) {
			nextErrors.subject = "Subject must not exceed 40 characters";
		}

		if (!tagOptions.includes(data?.tag)) {
			nextErrors.tag = "Please select a tag";
		}

		if (!data?.message?.trim()) {
			nextErrors.message = "Please enter a message";
		} else if (data?.message?.trim().length < 20) {
			nextErrors.message = "Message must be at least 20 characters long";
		} else if (data?.message?.trim().length > 400) {
			nextErrors.message = "Message must not exceed 400 characters";
		}

		if (!data?.consent) nextErrors.consent = "You must give your consent to submit";

		return nextErrors;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e?.currentTarget;
		const nextValue = type === "checkbox" ? (e?.currentTarget as HTMLInputElement).checked : value;

		setFormData((prev) => ({ ...prev, [name]: nextValue }));
		if (errors[name as keyof ContactFormData]) setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		const nextErrors = validateForm(formData);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) return;

		if (captchaStatus !== "solved" || !captchaSolution) {
			setErrors((prev) => ({ ...prev, captcha: "Please verify you are human" }));
			return;
		}

		setIsSubmitting(true);
		setErrors((prev) => ({ ...prev, form: undefined }));

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					formData,
					challenge: captchaSolution?.challenge,
					nonce: captchaSolution?.nonce,
				}),
			});

			const result = await res?.json().catch(() => null);

			if (!res?.ok) {
				setErrors((prev) => ({
					...prev,
					...(result?.errors ?? {}),
					form: result?.message ?? "Message could not be sent. Please try again.",
				}));

				return;
			}

			setIsSubmitted(true);
			setCaptchaStatus("idle");
			setCaptchaSolution(null);
			setFormData({ email: "", subject: "", tag: tagOptions[0], message: "", consent: false, _honey: "" });
		} catch {
			setErrors((prev) => ({ ...prev, form: "Message could not be sent. Please try again." }));
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className="flex min-h-screen flex-col items-center justify-center"
		>
			<div className="w-full px-4 pt-30 pb-30 lg:pt-0 lg:pb-0 2xl:px-0">
				<div className="mx-auto max-w-2xl">
					<h1
						className={`${GroteskBold.className} text-start text-[2.4rem] text-[#bffb4f] md:text-center md:text-[4.8rem]`}
					>
						Get in touch with us
					</h1>

					<p
						className={`${GroteskRoman.className} pb-14 text-start text-base text-[#ffffff] md:text-center md:text-xl`}
					>
						Do you have question, issues or suggestions?{" "}
						<span className="hidden md:inline">Our team is here to help you.</span>
					</p>

					{isSubmitted ? (
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							className="rounded-lg bg-[#bffb4f] p-6"
						>
							<h3
								className={`mb-2 text-center text-[1.47rem] text-[#000000] md:text-4xl ${GroteskMedium.className}`}
							>
								Thank you for your message!
							</h3>

							<p
								className={`text-justify text-sm text-[#000000] md:text-start md:text-base ${GroteskRoman.className}`}
							>
								Thank you for your message. It has been sent and We will get back to you as soon as
								possible using the contact information you provided. You can expect a response within 24
								hours.
							</p>

							<button
								type="button"
								onClick={() => {
									setIsSubmitted(false);
									trigger("light");
								}}
								className={`mt-6 cursor-pointer text-base text-[#000000] underline ${GroteskRoman.className}`}
							>
								Send another message
							</button>
						</motion.div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-5">
							{errors.form ? (
								<div
									className={`rounded-lg border border-[#f00c0c]/15 bg-[#ff6467]/10 px-4 py-2.5 text-sm text-[#ff6467] md:text-base ${GroteskRoman.className}`}
								>
									{errors?.form}
								</div>
							) : null}

							<div>
								<label
									htmlFor="email"
									className={`mb-2 block text-base text-[#ffffff] ${GroteskRoman.className}`}
								>
									E-mail Address <span className="text-[#ff6467]">*</span>
								</label>

								<input
									id="email"
									name="email"
									type="text"
									autoComplete="off"
									aria-label="Please enter your e-mail address"
									value={formData?.email}
									maxLength={50}
									onChange={handleChange}
									onClick={() => trigger("light")}
									className={`w-full rounded-lg border bg-[#ffffff]/4 px-4 py-3 text-base backdrop-blur-sm transition-all outline-none focus:border-[#bffb4f] focus:ring focus:ring-[#bffb4f]/40 ${errors?.email ? "border-[#ff6467] text-[#ff6467]" : "border-[#ffffff]/8 text-[#ffffff]"} ${GroteskRoman.className}`}
									placeholder="contact@nexticons.com"
								/>

								{errors?.email ? (
									<p
										className={`mt-1 text-sm tracking-wide text-[#ff6467] ${GroteskRoman.className}`}
									>
										{errors?.email}
									</p>
								) : null}
							</div>

							<div>
								<label
									htmlFor="subject"
									className={`mb-2 block text-base text-[#ffffff] ${GroteskRoman.className}`}
								>
									Subject <span className="text-[#ff6467]">*</span>
								</label>

								<input
									id="subject"
									name="subject"
									type="text"
									maxLength={40}
									aria-label="Please enter a subject"
									autoComplete="off"
									value={formData?.subject}
									onChange={handleChange}
									onClick={() => trigger("light")}
									className={`w-full rounded-lg border bg-[#ffffff]/4 px-4 py-3 text-base backdrop-blur-sm transition-all outline-none focus:border-[#bffb4f] focus:ring focus:ring-[#bffb4f]/40 ${errors?.subject ? "border-[#ff6467] text-[#ff6467]" : "border-[#ffffff]/8 text-[#ffffff]"} ${GroteskRoman.className}`}
									placeholder="What is your message about?"
								/>

								{errors?.subject ? (
									<p
										className={`mt-1 text-sm tracking-wide text-[#ff6467] ${GroteskRoman.className}`}
									>
										{errors?.subject}
									</p>
								) : null}
							</div>

							<div>
								<Dropdown
									label="Tag"
									value={formData?.tag}
									options={tagOptions}
									onChange={(value) =>
										setFormData((prev) => ({
											...prev,
											tag: value as TagOption,
										}))
									}
									error={errors?.tag}
								/>
							</div>

							<div>
								<input
									type="text"
									name="_honey"
									value={formData?._honey}
									onChange={handleChange}
									style={{ display: "none" }}
									tabIndex={-1}
									autoComplete="off"
								/>
							</div>

							<div>
								<label
									htmlFor="message"
									className={`mb-2 block text-base text-[#ffffff] ${GroteskRoman.className}`}
								>
									Message <span className="text-[#ff6467]">*</span>
								</label>

								<textarea
									id="message"
									name="message"
									autoComplete="off"
									aria-label="Please enter a message"
									maxLength={400}
									value={formData?.message}
									onChange={handleChange}
									rows={4}
									onClick={() => trigger("light")}
									className={`w-full resize-none rounded-lg border bg-[#ffffff]/4 px-4 py-3 text-base backdrop-blur-sm transition-all outline-none focus:border-[#bffb4f] focus:ring focus:ring-[#bffb4f]/40 ${errors?.message ? "border-[#ff6467] text-[#ff6467]" : "border-[#ffffff]/8 text-[#ffffff]"} ${GroteskRoman.className}`}
									placeholder="Describe the reason for your contact. Include all the details."
								/>

								<div className="flex items-start justify-between">
									{errors?.message ? (
										<p
											className={`mt-1 text-sm tracking-wide text-[#ff6467] ${GroteskRoman.className}`}
										>
											{errors?.message}
										</p>
									) : (
										<div />
									)}

									<div
										className={`mt-1 text-xs ${GroteskRoman.className} ${formData?.message?.length >= 400 ? "text-[#ff6467]" : "text-[#fafafa]/60"}`}
									>
										{formData?.message?.length}/400
									</div>
								</div>
							</div>

							<div
								onClick={() => {
									handleCaptchaVerify();
									trigger("success");
								}}
								className={`flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border bg-[#ffffff]/4 p-4 transition-all duration-300 ${
									captchaStatus === "solved"
										? "border-[#fafafa]/8"
										: captchaStatus === "error"
											? "border-[#ff6467]"
											: "border-[#fafafa]/8 hover:bg-[#fafafa]/8"
								}`}
							>
								<div className="flex items-center gap-3">
									<div
										className={`flex h-6 w-6 items-center justify-center rounded ${
											captchaStatus === "solving"
												? ""
												: `border ${captchaStatus === "solved" ? "border-[#fafafa] bg-[#fafafa]" : "border-[#fafafa]/50"}`
										}`}
									>
										{captchaStatus === "solved" && (
											<motion.div
												initial={{ opacity: 0, scale: 0.5 }}
												animate={{ opacity: 1, scale: 1 }}
											>
												<Check size={18} strokeWidth={1.5} color="#000000" />
											</motion.div>
										)}

										{captchaStatus === "solving" && (
											<div className="h-6 w-6 animate-spin rounded-full border-2 border-[#fafafa]/30 border-t-[#fafafa]" />
										)}
									</div>

									<span className={`text-sm text-[#fafafa] ${GroteskRoman.className}`}>
										{captchaStatus === "solved"
											? "Verification successful"
											: captchaStatus === "solving"
												? "Verifying..."
												: "Verify you are human"}
									</span>
								</div>

								<div className="flex flex-col items-end">
									<Shield color="#ffffff" strokeWidth={1.5} size={28} />
								</div>
							</div>

							<label
								className={`group flex cursor-pointer items-center gap-3 pt-2 text-sm text-[#ffffff] ${GroteskRoman.className}`}
								onClick={() => trigger("medium")}
							>
								<input
									type="checkbox"
									name="consent"
									checked={formData?.consent}
									onChange={handleChange}
									className="sr-only"
								/>

								<span
									className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${errors?.consent ? "border-[#ff6467]" : "border-[#ffffff]/50"} ${formData.consent ? "border-none bg-[#bffb4f]" : "bg-transparent"}`}
								>
									{formData?.consent ? <Check size={14} strokeWidth={1.5} color="#000000" /> : null}
								</span>

								<span
									className={`${errors?.consent ? "text-[#ff6467]" : "text-[#ffffff]"} ${GroteskRoman.className}`}
								>
									I have read and understood the{" "}
									<Link
										href="/legal/privacy"
										target="_blank"
										rel="noopener noreferrer"
										className={`underline underline-offset-4 ${errors?.consent ? "text-[#ff6467]" : "text-[#bffb4f]"}`}
										onClick={() => trigger("light")}
									>
										Privacy Policy
									</Link>
									.
								</span>
							</label>

							<button
								type="submit"
								disabled={isSubmitting || captchaStatus !== "solved"}
								onClick={() => trigger("success")}
								className={`w-full cursor-pointer rounded-lg bg-[#bffb4f] px-8 py-3 text-center text-[#000000] transition-all duration-300 hover:bg-[#bffb4f]/80 disabled:cursor-not-allowed disabled:opacity-60 ${GroteskRoman.className}`}
							>
								{isSubmitting ? "Sending..." : "Send Message"}
							</button>
						</form>
					)}
				</div>
			</div>
		</motion.div>
	);
}
