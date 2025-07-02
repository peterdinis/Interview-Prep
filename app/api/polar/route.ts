import { NextRequest, NextResponse } from "next/server";
import { polar } from "@/lib/polar";
import { updateUserPlan } from "@/lib/db"; // vlastná funkcia na update usera v DB

export async function POST(req: NextRequest) {
	const body = await req.json();

	if (body.type === "subscription.paid") {
		const { metadata } = body.data;
		const kindeUserId = metadata?.kindeUserId;

		if (kindeUserId) {
			await updateUserPlan(kindeUserId, "pro");
		}
	}

	return NextResponse.json({ received: true });
}