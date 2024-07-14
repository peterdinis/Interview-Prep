import { db } from 'database/db';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const { planId, userId } = await request.json(); // Include userId from the request

    try {
        // Retrieve the subscription for the user
        const subscription = await db.subscription.findUnique({
            where: { userId },
        });

        if (!subscription || subscription.attemps <= 0) {
            return NextResponse.json({ error: 'No attempts left.' }, { status: 400 });
        }

        // Decrement attempts
        await db.subscription.update({
            where: { userId },
            data: { attemps: subscription.attemps - 1 },
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: planId, // This should be the price ID from your Stripe dashboard
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}