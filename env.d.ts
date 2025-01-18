declare namespace NodeJS {
	interface ProcessEnv {
		EMAIL_AUTH_USER: string;
		EMAIL_AUTH_PASS: string;
		CLOUDFLARE_TURNSTILE_SECRET_KEY: string;
	}
}
