import { CustomSession } from 'app/_types/sessionTypes';
import { db } from 'database/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';

export async function GET() {
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const interviews = await db.interview.findMany({
        where: {
            userId: session.user.id,
        },
    });
    if (!interviews) {
        throw new Error('User does not create any interviews');
    }

    return NextResponse.json(interviews);
}
