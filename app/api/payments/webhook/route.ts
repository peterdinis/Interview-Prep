import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
	const body = await req.json();

	if (body.event === "subscription.upgraded") {
		const userId = body.data.user_id; 

		await db
			.update(users)
			.set({ plan: "pro" })
			.where(eq(users.id, userId));
	}

	return new NextResponse(null, { status: 200 });
}
