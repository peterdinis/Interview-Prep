import { db } from 'database/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const interviews = await db.interview.findMany();
    if (!interviews) {
        throw new Error('No interviews found');
    }

    return NextResponse.json(interviews);
}
