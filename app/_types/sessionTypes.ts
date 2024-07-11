import { DefaultSession } from 'next-auth';

export type CustomSession = {
    user: {
        id: string;
    };
} & DefaultSession;
