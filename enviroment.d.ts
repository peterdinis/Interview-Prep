declare global {
	namespace NodeJS {
		interface ProcessEnv {
			KINDE_CLIENT_ID: string;
			KINDE_CLIENT_SECRET: string;
			KINDE_ISSUER_URL: string;
			KINDE_SITE_URL: string;
			KINDER_POST_LOGOUT_REDIRECT_URL: string;
			KINDE_POST_LOGIN_REDIRECT_URL: string;
			APP_URL: string;
			OPENAI_KEY: string;
			DATABASE_URL: string;
			UPSTASH_REDIS_RESET_TOKEN: string;
			UPSTASH_REDIS_RESET_URL: string;
		}
	}
}

export {};
