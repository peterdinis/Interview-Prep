
import { NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { getKindeUser } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST() {
	const user = await getKindeUser();

	if (!user || !user.id || !user.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const checkout = await polar.checkout.create({
		productId: process.env.POLAR_PRODUCT_ID!, // napr. Pro plan
		successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgrade=success`,
		cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
		email: user.email,
		metadata: {
			kindeUserId: user.id,
		},
	});

	return NextResponse.json({ url: checkout.url });
}