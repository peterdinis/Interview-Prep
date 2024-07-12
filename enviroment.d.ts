declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            NODE_ENV: 'development' | 'production';
            NEXTAUTH_SECRET: string;
            CUSTOM_PASSWORD: string;
            NEXT_PUBLIC_OPENAI_API_KEY: string;
        }
    }
}

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
