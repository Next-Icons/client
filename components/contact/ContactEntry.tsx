"use client";

import { Button } from "@/components/ui/button";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "@deemlol/next-icons";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Tags = "Bug" | "Question" | "Typo" | "Showcase" | "Suggest Icon" | "Other";

interface ContactFormData {
	email?: string;
	subject?: string;
	message?: string;
	tags?: Tags[];
}

interface ContactFormErrors {
	email?: string;
	subject?: string;
	message?: string;
	tags?: string;
}

export default function ContactEntry() {
	const initialFormState: ContactFormData = { email: "", subject: "", message: "", tags: [] };
	const tags: Tags[] = ["Bug", "Question", "Typo", "Showcase", "Suggest Icon", "Other"];
	const { resolvedTheme } = useTheme();

	const [contactFormData, setContactFormData] = useState(initialFormState);
	const [selectedTags, setSelectedTags] = useState<Tags[]>([]);
	const [errors, setErrors] = useState<ContactFormErrors>({});
	const [isTagMenuOpen, setIsTagMenuOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const turnstileRef = useRef<TurnstileInstance>(null);
	const tagMenuRef = useRef<HTMLDivElement>(null);

	const handleCloudFlareChallenge = async (token: string) => {
		await fetch(`/api/submitContact?token=${token}`);
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (tagMenuRef.current && !tagMenuRef.current.contains(event.target as Node)) {
				setIsTagMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	function handleContactFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = e.target;
		const newErrors = { ...errors };

		e.preventDefault();
		e.stopPropagation();

		delete newErrors[e.target.name as keyof typeof newErrors];

		setErrors(prev => ({ ...prev, [name]: undefined }));
		setContactFormData(prev => ({ ...prev, [name]: value }));
	}

	const validateContactForm = (): ContactFormErrors => {
		const newErrors: ContactFormErrors = {};

		if (!contactFormData.email) {
			newErrors.email = "E-mail is a required field";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFormData.email)) {
			newErrors.email = "Enter a valid e-mail address";
		}

		if (!contactFormData.subject) {
			newErrors.subject = "Subject is a required field";
		} else if (contactFormData.subject.length < 2) {
			newErrors.subject = "Subject must be at least 2 characters";
		} else if (contactFormData.subject.length > 256) {
			newErrors.subject = "Subject must be less than 256 characters";
		}

		if (!contactFormData.message) {
			newErrors.message = "Message is a required field";
		} else if (contactFormData.message.length < 30) {
			newErrors.message = "Message must be at least 30 characters";
		} else if (contactFormData.message.length > 1000) {
			newErrors.message = "Message must be less than 1000 characters";
		}

		if (!contactFormData.tags || contactFormData.tags.length === 0) {
			newErrors.tags = "You need to select an tag";
		}

		return newErrors;
	};

	const handleTagSelect = (tag: Tags) => {
		let updatedTags: Tags[];

		if (selectedTags.includes(tag)) {
			updatedTags = selectedTags.filter(selectedTag => selectedTag !== tag);
		} else {
			updatedTags = [...selectedTags, tag];
		}

		setSelectedTags(updatedTags);
		setContactFormData(prev => ({ ...prev, tags: updatedTags }));

		if (updatedTags.length > 0) {
			setErrors(prevErrors => ({ ...prevErrors, tags: undefined }));
		}
	};

	async function handleContactFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		const newErrors = validateContactForm();

		e.preventDefault();
		e.stopPropagation();
		setErrors(newErrors);

		try {
			if (Object.keys(newErrors).length == 0) {
				setIsSubmitting(true);

				const res = await fetch("/api/submitContact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contactFormData),
				});

				setIsSubmitting(false);

				if (res.ok) {
					setContactFormData(initialFormState);
					setSelectedTags([]);

					turnstileRef.current?.reset();

					return toast.success("Your message has been successfully submitted", {
						className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
						duration: 5_000,
					});
				} else {
					const errData = await res.json();

					return toast.error(errData.message, {
						className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
						duration: 5_000,
					});
				}
			}
		} catch {
			setIsSubmitting(false);

			return toast.error("An unexpected error occurred. Try again later!", {
				className: "font-[family-name:var(--font-clashdisplay-regular)] text-[15px]",
				duration: 5_000,
			});
		}
	}

	return (
		<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-row items-center justify-center px-4 pb-28 pt-28 xl:px-0 xl:pb-0 xl:pt-0">
			<form onSubmit={handleContactFormSubmit} className="w-full">
				<motion.h1
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-start font-[family-name:var(--font-clashdisplay-bold)] text-5xl text-purple-500 md:text-7xl"
				>
					Get in touch with us
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-2 text-start font-[family-name:var(--font-clashdisplay-regular)] text-gray-600 dark:text-gray-300 lg:text-justify lg:text-base"
				>
					Do you have question, issues or suggestions? Our team is here to help you!
				</motion.p>

				<div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
					<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
						<label
							htmlFor="email"
							className="mb-1.5 block font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-700 dark:text-white"
						>
							E-mail <span className="text-red-500">*</span>
						</label>

						<input
							type="text"
							name="email"
							className={`mb-2 block ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"} w-full rounded-xl border bg-gray-100 p-2 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-black shadow-lg outline-none placeholder:text-gray-500 dark:bg-[#161618] dark:text-white dark:placeholder:text-gray-400`}
							value={contactFormData.email}
							autoComplete="off"
							onChange={e => handleContactFormChange(e)}
							placeholder="john@example.com"
						/>

						{errors.email && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="mt-1 font-[family-name:var(--font-clashdisplay-medium)] text-sm text-red-500"
							>
								{errors.email}
							</motion.p>
						)}
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
						<label
							htmlFor="subject"
							className="mb-1.5 block font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-700 dark:text-white"
						>
							Subject <span className="text-red-500">*</span>
						</label>

						<input
							type="text"
							name="subject"
							className={`mb-2 block ${errors.subject ? "border-red-500" : "border-gray-300 dark:border-gray-600"} w-full rounded-xl border bg-gray-100 p-2 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-black shadow-lg outline-none placeholder:text-gray-500 dark:bg-[#161618] dark:text-white dark:placeholder:text-gray-400`}
							value={contactFormData.subject}
							autoComplete="off"
							onChange={e => handleContactFormChange(e)}
							placeholder="What is your message about?"
						/>

						{errors.subject && (
							<motion.p
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="mt-1 font-[family-name:var(--font-clashdisplay-medium)] text-sm text-red-500"
							>
								{errors.subject}
							</motion.p>
						)}
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
						<div className="relative w-full">
							<label
								htmlFor="tags"
								className="mb-1.5 block font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-700 dark:text-white"
							>
								Tags <span className="text-red-500">*</span>
							</label>

							<div className="relative" ref={tagMenuRef}>
								<button
									onClick={e => {
										e.preventDefault();
										e.stopPropagation();

										setIsTagMenuOpen(!isTagMenuOpen);
									}}
									className={`flex w-full items-center justify-between rounded-xl border ${
										errors.tags ? "border-red-500" : "border-gray-300 dark:border-gray-600"
									} bg-gray-100 px-2 py-2 text-start font-[family-name:var(--font-clashdisplay-regular)] text-sm shadow-lg outline-none dark:bg-[#161618]`}
								>
									<span className={`${selectedTags.length > 0 ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
										{selectedTags.length > 0 ? selectedTags.join(", ") : "Select a tag"}
									</span>

									<ChevronDown size={20} className={`text-gray-400 transition-transform duration-300 ${isTagMenuOpen ? "rotate-180" : ""}`} />
								</button>

								{isTagMenuOpen && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 20 }}
										transition={{ duration: 0.3 }}
										className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-[#161618]"
									>
										<ul>
											{tags.map((tag, index) => (
												<React.Fragment key={tag}>
													<li
														onClick={() => handleTagSelect(tag)}
														className={`cursor-pointer px-4 py-2 font-[family-name:var(--font-clashdisplay-medium)] text-sm ${
															selectedTags.includes(tag)
																? "bg-purple-500 text-white"
																: "text-black transition-colors duration-150 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
														}`}
													>
														<div className="flex items-center">
															<span className="mr-2">{selectedTags.includes(tag) ? <Check size={18} /> : ""}</span>
															{tag}
														</div>
													</li>

													{index < tags.length - 1 && (
														<hr
															className={`${selectedTags.includes(tag) ? "border-none" : "border-gray-300 dark:border-gray-700"}`}
														/>
													)}
												</React.Fragment>
											))}
										</ul>
									</motion.div>
								)}
							</div>

							{errors.tags && (
								<motion.p
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.3 }}
									className="mt-1 font-[family-name:var(--font-clashdisplay-medium)] text-sm text-red-500"
								>
									{errors.tags}
								</motion.p>
							)}
						</div>
					</motion.div>
				</div>

				<motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="mt-6">
					<label
						htmlFor="message"
						className="mb-1.5 block font-[family-name:var(--font-clashdisplay-medium)] text-base text-gray-700 dark:text-white"
					>
						Message <span className="text-red-500">*</span>
					</label>

					<textarea
						name="message"
						rows={6}
						className={`mb-2 block shadow-lg ${errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"} w-full rounded-xl border bg-gray-100 p-2 font-[family-name:var(--font-clashdisplay-regular)] text-sm text-black outline-none placeholder:text-gray-500 dark:bg-[#161618] dark:text-white dark:placeholder:text-gray-400`}
						value={contactFormData.message}
						autoComplete="off"
						onChange={e => handleContactFormChange(e)}
						placeholder="Describe very detailed message here about why do you contact us"
					/>

					{errors.message && (
						<motion.p
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="mt-1 font-[family-name:var(--font-clashdisplay-medium)] text-sm text-red-500"
						>
							{errors.message}
						</motion.p>
					)}
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }} className="mt-6">
					<Turnstile
						siteKey="0x4AAAAAAA5p5zDHmQpPyF_R"
						id="cf-turnstile-challenge"
						ref={turnstileRef}
						options={{
							theme: resolvedTheme === "light" ? "light" : "dark",
							language: "en",
							size: "normal",
						}}
						onError={() => {
							toast.error("Unable to verify if you are human", {
								className: "font-[family-name:var(--font-clashdisplay-regular)]",
								duration: 5_000,
							});
						}}
						onExpire={() => turnstileRef.current?.reset()}
						onSuccess={handleCloudFlareChallenge}
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.2 }}
					className="mt-6 w-full lg:max-w-xs"
				>
					{isSubmitting ? (
						<Button disabled={true} variant={"default"} className="flex w-full items-center justify-center">
							Sending...
						</Button>
					) : (
						<Button type="submit" variant={"default"} className="w-full">
							Send Message
						</Button>
					)}
				</motion.div>
			</form>
		</div>
	);
}
