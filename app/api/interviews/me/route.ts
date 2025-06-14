import { NextResponse } from "next/server";
import { interviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

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
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}