import NextAuth from 'next-auth/next';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/database/db';

export interface User {
    id: number; // Adjust type based on your Prisma schema
    email: string;
    password: string;
    name?: string; // Optional, adjust based on your schema
    phone?: string; // Optional, adjust based on your schema
}

export default NextAuth({
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'John Smith',
                },
            },
            async authorize(credentials: any) {
                // Check for missing email or password
                if (!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password');
                }

                // Find user by email
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // User not found or password mismatch
                if (
                    !user ||
                    !(await bcrypt.compare(credentials.password, user.password))
                ) {
                    throw new Error('Incorrect email or password');
                }

                // Return user object (cast to User type for safety)
                return user;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Ensure environment variable is set
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login', // Replace with your login page path
    },
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (user) {
                // Add user information to token (optional)
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                name: token.name,
            };
            return session;
        },
    },
});
