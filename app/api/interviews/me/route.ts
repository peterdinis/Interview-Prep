import { db } from "@/db";
import { interviews } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { getUser } = getKindeServerSession();
		const user = await getUser();

		if (!user || !user.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const userInterviews = await db
			.select()
			.from(interviews)
			.where(eq(interviews.userId, user.id));

		return NextResponse.json({ interviews: userInterviews });
	} catch (error) {
		console.error("[INTERVIEWS_ME_GET]", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
