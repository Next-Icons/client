"use server";

import { blacklistedTempMails } from "@/utils/blacklistedTempMails";
import { EMAIL_ADDRESS } from "@/utils/constants";

import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import "dotenv/config";

const tagOptions = ["Bug", "Question", "Typo", "Showcase", "Suggest Icon", "Other"] as const;
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const POW_DIFFICULTY = 5;

type ContactPayload = {
	email: string;
	subject: string;
	message: string;
	consent: boolean;
	_honey?: string;
	tag: (typeof tagOptions)[number];
};

setInterval(() => {
	const now = Date.now();

	for (const [ip, data] of rateLimit?.entries()) {
		if (now - data?.timestamp > 60_000) {
			rateLimit?.delete(ip);
		}
	}
}, 60_000);

function getClientIp(req: NextRequest): string {
	return req?.headers?.get("x-forwarded-for")?.split(",")[0] || "unknown";
}

function checkRateLimit(ip: string, limit: number): boolean {
	const now = Date.now();
	const record = rateLimit?.get(ip);

	if (!record) {
		rateLimit.set(ip, { count: 1, timestamp: now });
		return true;
	}

	if (now - record?.timestamp > 60_000) {
		rateLimit.set(ip, { count: 1, timestamp: now });
		return true;
	}

	if (record?.count >= limit) return false;
	record.count++;

	return true;
}

function generateChallenge(ip: string): string {
	const payload = JSON.stringify({
		ts: Date.now(),
		ip: ip,
		rnd: crypto.randomBytes(8).toString("hex"),
	});

	const payloadB64 = Buffer.from(payload).toString("base64");

	const signature = crypto.createHmac("sha256", process.env.CAPTCHA_SECRET).update(payloadB64).digest("hex");
	return `${payloadB64}.${signature}`;
}

function verifyChallenge(token: string, ip: string): boolean {
	try {
		const parts = token.split(".");
		if (parts.length !== 2) return false;

		const [payloadB64, signature] = parts;

		const expectedSignature = crypto
			.createHmac("sha256", process.env.CAPTCHA_SECRET)
			.update(payloadB64)
			.digest("hex");

		if (signature !== expectedSignature) return false;

		const payload = JSON.parse(Buffer.from(payloadB64, "base64").toString());
		if (payload?.ip !== ip) return false;

		if (Date.now() - payload?.ts > 300_000) return false;
		return true;
	} catch {
		return false;
	}
}

function verifyPoW(challenge: string, nonce: string): boolean {
	const hash = crypto
		.createHash("sha256")
		.update(challenge + nonce)
		.digest("hex");

	return hash.startsWith("0".repeat(POW_DIFFICULTY));
}

function escapeHtml(unsafe: string) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export async function GET(req: NextRequest) {
	const ip = getClientIp(req);

	if (!checkRateLimit(ip, 10)) {
		return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
	}

	const challenge = generateChallenge(ip);

	return NextResponse.json(
		{
			challenge,
			difficulty: POW_DIFFICULTY,
		},
		{ status: 200 },
	);
}

export async function POST(req: NextRequest) {
	const errors: Record<string, string> = {};
	let data: ContactPayload | null = null;
	let challenge: string | undefined;
	let nonce: string | undefined;
	const ip = getClientIp(req);

	if (!checkRateLimit(ip + "_post", 3)) {
		return NextResponse.json({ message: "Too many submissions. Please try again later." }, { status: 429 });
	}

	try {
		const body = (await req?.json()) as { formData: ContactPayload; challenge: string; nonce: string };

		data = body?.formData;
		challenge = body?.challenge;
		nonce = body?.nonce;
	} catch {
		return NextResponse.json({ message: "Invalid data. Please try again." }, { status: 400 });
	}

	if (data?._honey) {
		return NextResponse.json({ message: "Your message has been sent successfully" }, { status: 200 });
	}

	if (!challenge || !nonce) {
		return NextResponse.json({ message: "Missing captcha solution" }, { status: 400 });
	}

	if (!verifyChallenge(challenge, ip)) {
		return NextResponse.json({ message: "Invalid or expired captcha. Please refresh the page." }, { status: 400 });
	}

	if (!verifyPoW(challenge, nonce)) {
		return NextResponse.json({ message: "Incorrect captcha solution" }, { status: 400 });
	}

	if (!data?.email?.trim()) {
		errors.email = "Please enter your e-mail address";
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data?.email)) {
		errors.email = "E-mail address is not in the correct format";
	} else if (data?.email?.trim().length < 5) {
		errors.email = "E-mail address must be at least 5 characters long";
	} else if (data?.email?.trim().length > 50) {
		errors.email = "E-mail address must not exceed 50 characters";
	} else if (blacklistedTempMails.includes(data?.email.split("@")[1])) {
		return NextResponse.json({ message: "Temporary e-mail addresses are not allowed" }, { status: 400 });
	}

	if (!data?.subject?.trim()) {
		errors.subject = "Please enter a subject";
	} else if (data?.subject?.trim().length < 5) {
		errors.subject = "Subject must be at least 5 characters long";
	} else if (data?.subject?.trim().length > 40) {
		errors.subject = "Subject must not exceed 40 characters";
	}

	if (!tagOptions.includes(data?.tag)) {
		errors.tag = "Please select a tag";
	}

	if (!data?.message?.trim()) {
		errors.message = "Please enter a message";
	} else if (data?.message?.trim().length < 20) {
		errors.message = "Message must be at least 20 characters long";
	} else if (data?.message?.trim().length > 400) {
		errors.message = "Message must not exceed 400 characters";
	}

	if (!data?.consent) errors.consent = "You must give your consent to submit";

	if (Object.keys(errors).length > 0) {
		return NextResponse.json({ message: "Correct the errors in the form and try again.", errors }, { status: 400 });
	}

	if (!process.env.EMAIL_AUTH_USER || !process.env.EMAIL_AUTH_PASS) {
		throw new Error("Please set EMAIL_AUTH_USER and EMAIL_AUTH_PASS in .env file.");
	}

	const transporter = createTransport({
		host: "smtp.seznam.cz",
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: `Contact Form <${process.env.EMAIL_AUTH_USER}>`,
			to: EMAIL_ADDRESS,
			subject: "New message from NextIcons.com Contact Form",
			html: `
				<div style="background-color: #121212; font-family: Arial, sans-serif; color: #ffffff; padding: 40px 0;">
					<div style="max-width: 600px; margin: 0 auto; background-color: #1e1e1e; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5); border: 1px solid #333;">
						<div style="background: #2a2a2a; padding: 30px; text-align: center; border-bottom: 1px solid #333;">
							<h2 style="margin: 0; font-size: 24px; color: #ffffff; letter-spacing: 1px;">New Contact Submission</h2>
						</div>

						<div style="padding: 40px 30px;">
							<div style="margin-bottom: 25px;">
								<p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; font-weight: 600;">E-mail Address</p>
								<p style="margin: 0; font-size: 16px; color: #ffffff;">
									<a href="mailto:${escapeHtml(data?.email)}" style="color: #ffffff; text-decoration: none;">${escapeHtml(data?.email)}</a>
								</p>
							</div>

							<div style="margin-bottom: 25px;">
								<p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; font-weight: 600;">Subject</p>
								<p style="margin: 0; font-size: 16px; color: #ffffff;">${escapeHtml(data?.subject)}</p>
							</div>

                            <div style="margin-bottom: 25px;">
								<p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; font-weight: 600;">Tag</p>
								<p style="margin: 0; font-size: 16px; color: #ffffff;">${escapeHtml(data?.tag)}</p>
							</div>

							<div style="margin-top: 35px;">
								<p style="margin: 0 0 15px 0; font-size: 11px; text-transform: uppercase; color: #888; letter-spacing: 1px; font-weight: 600;">Message</p>
								<div style="background-color: #252525; padding: 20px; border-radius: 8px; border: 1px solid #333; color: #ddd; line-height: 1.6; white-space: pre-wrap; word-break: break-word; overflow-wrap: break-word;">${escapeHtml(data?.message)}</div>
							</div>
						</div>
					</div>
				</div>
			`,
		});

		return NextResponse.json({ ok: true, message: "Your message has been sent successfully" }, { status: 200 });
	} catch {
		return NextResponse.json({ message: "Message could not be sent. Please try again." }, { status: 500 });
	}
}
