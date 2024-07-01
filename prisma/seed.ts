import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      password: 'password456',
    },
  });

  // Create accounts
  await prisma.account.createMany({
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
  await prisma.session.createMany({
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
  await prisma.verificationToken.createMany({
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
  await prisma.interview.createMany({
    data: [
      {
        jobPosition: 'Software Engineer',
        jobDesc: 'Develop and maintain web applications',
        jobExperience: '3+ years in software development',
        mockInterview: 'Technical questions on algorithms and data structures',
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
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });