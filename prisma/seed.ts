import { db } from '../database/db';
import * as bcrypt from 'bcrypt';

const CUSTOMPASSWORD = process.env.CUSTOM_PASSWORD as unknown as string;

const hashedPassword = bcrypt.hash(CUSTOMPASSWORD, 12) as unknown as string;

async function main() {
    // Create users
    const user1 = await db.user.create({
        data: {
            email: 'alice@example.com',
            name: 'Alice',
            password: hashedPassword,
        },
    });

    const user2 = await db.user.create({
        data: {
            email: 'bob@example.com',
            name: 'Bob',
            password: hashedPassword,
        },
    });

    // Create accounts
    await db.account.createMany({
        data: [
            {
                userId: user1.id,
                type: 'oauth',
                provider: 'google',
                providerAccountId: 'alice-google',
            },
            {
                userId: user2.id,
                type: 'oauth',
                provider: 'github',
                providerAccountId: 'bob-github',
            },
        ],
    });

    // Create sessions
    await db.session.createMany({
        data: [
            {
                sessionToken: 'session-token-1',
                userId: user1.id,
                expires: new Date(Date.now() + 3600 * 1000),
            },
            {
                sessionToken: 'session-token-2',
                userId: user2.id,
                expires: new Date(Date.now() + 3600 * 1000),
            },
        ],
    });

    // Create verification tokens
    await db.verificationToken.createMany({
        data: [
            {
                identifier: 'identifier-1',
                token: 'token-1',
                expires: new Date(Date.now() + 3600 * 1000),
            },
            {
                identifier: 'identifier-2',
                token: 'token-2',
                expires: new Date(Date.now() + 3600 * 1000),
            },
        ],
    });

    // Create interviews
    await db.interview.createMany({
        data: [
            {
                jobPosition: 'Software Engineer',
                jobDesc: 'Develop and maintain web applications',
                jobExperience: '3+ years in software development',
                mockInterview:
                    'Technical questions on algorithms and data structures',
            },
            {
                jobPosition: 'Product Manager',
                jobDesc: 'Oversee product development and strategy',
                jobExperience: '5+ years in product management',
                mockInterview: 'Behavioral questions and case studies',
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await db.$disconnect();
    });
