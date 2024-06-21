import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import { db } from '@/database/db';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login', // To provide a custom route path
    },
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
                // check to see if email and password is there
                if (!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password');
                }

                // check to see if user exists
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // if no user was found
                if (!user) {
                    throw new Error('No user found');
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password');
                }

                return user;
            },
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};

export default authOptions;
