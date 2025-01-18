"use server";

import { blacklistedMails } from "@/utils/blacklistedMails";
import generateUUID from "@/utils/generateUUID";

import type { NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import { NextResponse } from "next/server";
import "dotenv/config";

let solves: string[] = [];
setInterval(() => {
	solves = [];
}, 60_000 * 5);

export async function GET(req: NextRequest) {
	const token = req.nextUrl.searchParams.get("token");

	if (!token) {
		return new Response(null, { status: 400 });
	}

	const contactFormData = new FormData();
	const ip = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "127.0.0.1";

	contactFormData.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
	contactFormData.append("response", token);
	contactFormData.append("remoteip", ip);

	const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: contactFormData,
	});

	const cfResponse = await result.json();

	if (!cfResponse) {
		return new Response(null, { status: 400 });
	}

	const id = generateUUID();
	solves.push(id);

	return new Response(null, {
		status: 200,
		headers: {
			"set-cookie": "nextIconsCaptch=" + id,
		},
	});
}

export async function POST(req: NextRequest) {
	const { email, subject, message, tags } = await req.json();

	if (!solves.includes(req?.cookies?.get("nextIconsCaptch")?.value || "")) {
		return NextResponse.json({ message: "Unable to verify if you are human", success: false }, { status: 400 });
	}

	if (!email) {
		return NextResponse.json({ message: "E-mail is a required field", success: false }, { status: 400 });
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return NextResponse.json({ message: "Enter a valid e-mail address", success: false }, { status: 400 });
	}

	if (!subject) {
		return NextResponse.json({ message: "Subject is a required field", success: false }, { status: 400 });
	} else if (subject.length < 2) {
		return NextResponse.json({ message: "Subject must be at least 2 characters", success: false }, { status: 400 });
	} else if (subject.length > 256) {
		return NextResponse.json({ message: "Subject must be less than 256 characters", success: false }, { status: 400 });
	}

	if (!message) {
		return NextResponse.json({ message: "Message is a required field", success: false }, { status: 400 });
	} else if (message.length < 30) {
		return NextResponse.json({ message: "Message must be at least 30 characters", success: false }, { status: 400 });
	} else if (message.length > 1000) {
		return NextResponse.json({ message: "Message must be less than 1000 characters", success: false }, { status: 400 });
	}

	if (!Array.isArray(tags) || tags.length === 0) {
		return NextResponse.json({ message: "You need to select an tag", success: false }, { status: 400 });
	}

	if (blacklistedMails.includes(email.split("@")[1].toLowerCase())) {
		return NextResponse.json({ message: "E-mail addresses from this domain are not allowed", success: false }, { status: 400 });
	}

	const transporter = createTransport({
		host: "smtp.seznam.cz",
		port: 465,
		auth: {
			user: process.env.EMAIL_AUTH_USER,
			pass: process.env.EMAIL_AUTH_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: process.env.EMAIL_AUTH_USER,
			to: process.env.EMAIL_AUTH_USER,
			replyTo: email,
			subject: subject,
			html: `
            <div style="background-color: #f5f5f5; padding: 20px; text-align: left;">
                <img src="cid:nexticonslogo" alt="Next Icons" style="max-width: 100px; margin-bottom: 20px;" />

                <h1 style="color: #000000; font-size: 36px; font-weight: bold; margin-bottom: 6px;">
                    New Contact Form Submission
                </h1>
    
                <p style="font-size: 16px; color: #000000; font-weight: 300; margin-bottom: 20px;">
                    A new user has submitted a message through the contact form
                </p>

                <div style="padding: 15px; background-color: #ffffff; border: 1px solid #cccccc;">
                    <div style="padding: 10px; border: 1px solid #e0e0e0; margin-bottom: 10px; color: #000000; background-color: #f9f9f9;">
                        <p style="font-size: 16px; margin: 5px 0;">Subject: <strong>${subject}</strong></p>
                        <p style="font-size: 16px; margin: 5px 0;">Email: <strong>${email}</strong></p>
                        <p style="font-size: 16px; margin: 5px 0;">Tags: <strong>${tags}</strong></p>
                    </div>

                <div style="padding: 10px; border: 1px solid #e0e0e0; background-color: #f9f9f9;">
                    <p style="font-size: 16px; color: #000000; word-wrap: break-word; white-space: pre-wrap;">
                        ${message}
                    </p>
                </div>
            </div>
        </div>
`,
			attachments: [
				{
					filename: "NextIconsBlack.png",
					path: `${process.cwd()}/public/assets/NextIconsBlack.png`,
					cid: "nexticonslogo",
				},
			],
		});

		return NextResponse.json({ message: "Your message has been successfully submitted", success: true }, { status: 200 });
	} catch (err) {
		console.log("An error occurred while sending the contact e-mail");
		console.error(err);

		return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
	}
}
