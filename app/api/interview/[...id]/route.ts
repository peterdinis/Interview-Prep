import { db } from 'database/db';
import { NextResponse } from 'next/server';

export async function GET(request: { query: { id: string } }) {
    const { id } = request.query;

    try {
        const interview = await db.interview.findFirst({
            where: { id },
        });

        if (!interview) {
            throw new Error('Interview not found');
        }
        return NextResponse.json(interview);
    } catch (error) {
        return NextResponse.json('Interview not found', { status: 404 });
    }
}
