import { db } from '@/database/db';
import { NextResponse } from 'next/server';
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
    try {

        const { name, email, password, phone } = await request.json();

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters' },
                { status: 400 },
            );
        }

        const userFound = await db.user.findFirst({ 
            where: email
         });

        if (userFound) {
            return NextResponse.json(
                { message: 'Email already exists' },
                { status: 409 },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return NextResponse.json(
            {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
            { status: 201 },
        );
    } catch (error: any) {
        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 },
            );
        } else {
            console.error('Error during signup:', error);
            return NextResponse.error();
        }
    }
}