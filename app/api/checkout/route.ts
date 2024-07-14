import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const { planId } = await request.json(); // Assume you pass planId from the frontend

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: planId, // This should be the price ID from your Stripe dashboard
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}