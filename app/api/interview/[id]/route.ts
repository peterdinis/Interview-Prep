import { db } from 'database/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    try {
        const interview = await db.interview.findFirst({
            where: { id },
        });

        if (!interview) {
            return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
        }

        return NextResponse.json(interview);
    } catch (error) {
        console.error("Error fetching interview:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}