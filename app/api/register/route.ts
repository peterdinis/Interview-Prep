import * as bcrypt from 'bcrypt';
import { db } from 'database/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !password) {
        return new NextResponse('Missing Fields', { status: 400 });
    }

    const exist = await db.user.findUnique({
        where: {
            email,
        },
    });

    console.log('Exists', exist);

    if (exist) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return NextResponse.json(user);
}
